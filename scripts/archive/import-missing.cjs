#!/usr/bin/env node
/**
 * import-missing.cjs — detect scrape reports that aren't in Neon yet and run
 * their matching import scripts, in chronological order.
 *
 * Usage:
 *   cd MarCRM && node scripts/import-missing.cjs              # import NOT-IMPORTED reports
 *   cd MarCRM && node scripts/import-missing.cjs --dry-run    # show what would run, do nothing
 *   cd MarCRM && node scripts/import-missing.cjs --include-partial  # also re-run PARTIAL reports
 *
 * Detection: every import script dedupes by exact Company.name, so a report is
 * "imported" when its lead names already exist in the DB. Re-running an import is
 * always safe — existing companies are skipped — so this orchestrator only adds
 * what's missing.
 *
 * Requires DATABASE_URL pointing at Neon (run locally, not from the sandbox).
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const REPORTS_DIR = path.join(__dirname, "..", "reports");
const SCRIPTS_DIR = __dirname;

const DRY_RUN = process.argv.includes("--dry-run");
const INCLUDE_PARTIAL = process.argv.includes("--include-partial");

function leadNames(json) {
  if (!json || !Array.isArray(json.leads)) return [];
  return json.leads.map((l) => l && l.name).filter(Boolean);
}

function importScriptFor(file) {
  const date = (file.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || "";
  if (file.startsWith("daily-scrape")) return `import-${date}.cjs`;
  if (file.startsWith("legal-freelance")) return `import-legal-freelance-${date}.cjs`;
  if (file.startsWith("pr-freelance")) return `import-pr-freelance-${date}.cjs`;
  return null;
}

// Order daily -> pr-freelance -> legal-freelance within the same date (any order is safe).
function typeRank(file) {
  if (file.startsWith("daily-scrape")) return 0;
  if (file.startsWith("pr-freelance")) return 1;
  if (file.startsWith("legal-freelance")) return 2;
  return 3;
}

async function main() {
  const files = fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const companies = await prisma.company.findMany({ select: { name: true } });
  const dbNames = new Set(companies.map((c) => c.name));
  console.log(`DB has ${dbNames.size} companies.\n`);

  const targets = []; // { file, script, status, present, total }

  for (const file of files) {
    let json;
    try {
      json = JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, file), "utf8"));
    } catch (e) {
      console.log(`⚠️  Skipping unparseable ${file}: ${e.message}`);
      continue;
    }
    const names = leadNames(json);
    if (names.length === 0) continue; // nothing to import
    const present = names.filter((n) => dbNames.has(n)).length;
    let status;
    if (present === 0) status = "NOT_IMPORTED";
    else if (present < names.length) status = "PARTIAL";
    else status = "IMPORTED";

    if (status === "IMPORTED") continue;
    if (status === "PARTIAL" && !INCLUDE_PARTIAL) continue;

    const script = importScriptFor(file);
    targets.push({ file, script, status, present, total: names.length });
  }

  // Chronological, then daily/pr/legal within a date.
  targets.sort((a, b) => {
    const da = (a.file.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || "";
    const db = (b.file.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || "";
    if (da !== db) return da < db ? -1 : 1;
    return typeRank(a.file) - typeRank(b.file);
  });

  await prisma.$disconnect();

  if (targets.length === 0) {
    console.log("🎉 Nothing to import — every scrape report is already in the DB.");
    return;
  }

  console.log(`Found ${targets.length} report(s) to import${INCLUDE_PARTIAL ? " (including PARTIAL)" : ""}:\n`);
  targets.forEach((t) =>
    console.log(`  [${t.status}] ${t.file}  (${t.present}/${t.total} in DB)  ->  scripts/${t.script || "??? no matching script"}`),
  );
  console.log("");

  if (DRY_RUN) {
    console.log("Dry run — nothing executed.");
    return;
  }

  let ran = 0;
  let missingScript = 0;
  let failed = 0;

  for (const t of targets) {
    if (!t.script) {
      console.log(`\n⏭️  No script name resolved for ${t.file} — skipping.`);
      missingScript += 1;
      continue;
    }
    const scriptPath = path.join(SCRIPTS_DIR, t.script);
    if (!fs.existsSync(scriptPath)) {
      console.log(`\n⏭️  Import script not found: scripts/${t.script} (report ${t.file}) — skipping.`);
      missingScript += 1;
      continue;
    }
    console.log(`\n▶️  Running scripts/${t.script}  (for ${t.file})`);
    try {
      execFileSync("node", [scriptPath], { stdio: "inherit", cwd: path.join(__dirname, "..") });
      ran += 1;
    } catch (e) {
      console.error(`❌ scripts/${t.script} exited with an error.`);
      failed += 1;
    }
  }

  console.log(`\n=== import-missing summary ===`);
  console.log(`Scripts run OK:      ${ran}`);
  console.log(`Skipped (no script): ${missingScript}`);
  console.log(`Failed:              ${failed}`);
  if (missingScript) {
    console.log(`\nℹ️  Reports with no matching import script need their .cjs generated before they can be imported.`);
  }
}

main().catch(async (err) => {
  console.error("Fatal:", err);
  try {
    await prisma.$disconnect();
  } catch (_) {}
  process.exit(1);
});
