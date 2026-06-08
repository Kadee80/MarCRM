#!/usr/bin/env node
/**
 * check-unimported.cjs — find scrape reports that haven't been imported into Neon yet.
 *
 * Usage:  cd MarCRM && node scripts/check-unimported.cjs
 *
 * How it works: every import script dedupes by exact Company.name, so a scrape
 * report is considered "imported" when its lead names already exist in the DB.
 * This script reads every reports/*.json, fetches all Company names from Neon,
 * and classifies each scrape report as IMPORTED / PARTIAL / NOT IMPORTED.
 *
 * Requires DATABASE_URL pointing at Neon (run locally, not from the sandbox).
 */

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const REPORTS_DIR = path.join(__dirname, "..", "reports");

function leadNames(json) {
  // daily / legal-freelance / pr-freelance reports all use { leads: [{ name }] }
  if (!json || !Array.isArray(json.leads)) return [];
  return json.leads.map((l) => l && l.name).filter(Boolean);
}

async function main() {
  const files = fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  // Pull every company name from the DB once.
  const companies = await prisma.company.findMany({ select: { name: true } });
  const dbNames = new Set(companies.map((c) => c.name));
  console.log(`DB has ${dbNames.size} companies.\n`);

  const notImported = [];
  const partial = [];
  const imported = [];
  const empty = [];

  for (const file of files) {
    let json;
    try {
      json = JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, file), "utf8"));
    } catch (e) {
      console.log(`⚠️  Could not parse ${file}: ${e.message}`);
      continue;
    }
    const names = leadNames(json);
    if (names.length === 0) {
      empty.push(file);
      continue;
    }
    const present = names.filter((n) => dbNames.has(n)).length;
    const row = { file, total: names.length, present, missing: names.length - present };
    if (present === 0) notImported.push(row);
    else if (present < names.length) partial.push(row);
    else imported.push(row);
  }

  const fmt = (r) => `  ${r.file}  —  ${r.present}/${r.total} in DB (${r.missing} missing)`;

  console.log(`========================================================`);
  console.log(`❌ NOT IMPORTED  (${notImported.length})  — run these import scripts`);
  console.log(`========================================================`);
  notImported.forEach((r) => console.log(fmt(r)));

  console.log(`\n========================================================`);
  console.log(`🟡 PARTIAL  (${partial.length})  — some leads missing (may be intentional de-dupe, or an interrupted import)`);
  console.log(`========================================================`);
  partial.forEach((r) => console.log(fmt(r)));

  console.log(`\n========================================================`);
  console.log(`✅ IMPORTED  (${imported.length})`);
  console.log(`========================================================`);
  imported.forEach((r) => console.log(fmt(r)));

  if (empty.length) {
    console.log(`\n(ℹ️  ${empty.length} report(s) had 0 leads: ${empty.join(", ")})`);
  }

  // Map a report file to its matching import script name.
  const toImportScript = (file) => {
    const date = (file.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || "";
    if (file.startsWith("daily-scrape")) return `scripts/import-${date}.cjs`;
    if (file.startsWith("legal-freelance")) return `scripts/import-legal-freelance-${date}.cjs`;
    if (file.startsWith("pr-freelance")) return `scripts/import-pr-freelance-${date}.cjs`;
    return "(unknown)";
  };

  if (notImported.length) {
    console.log(`\n--- Suggested commands (only run those whose script exists) ---`);
    notImported.forEach((r) => console.log(`node ${toImportScript(r.file)}`));
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("Fatal:", err);
  await prisma.$disconnect();
  process.exit(1);
});
