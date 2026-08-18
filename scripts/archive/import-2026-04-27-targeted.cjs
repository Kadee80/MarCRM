const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const reportPath = path.join(__dirname, "..", "reports", "daily-scrape-2026-04-27-targeted.json");
  const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

  console.log(`\nImporting ${report.totalLeads} targeted leads from ${report.scrapeDate}...`);
  console.log(`Focus: ${report.scrapeNote}\n`);

  let created = 0;
  let skipped = 0;

  for (const lead of report.leads) {
    // Check if company already exists
    const existing = await prisma.company.findFirst({
      where: { name: { equals: lead.name, mode: "insensitive" } },
    });

    if (existing) {
      console.log(`  SKIP: ${lead.name} (already in DB)`);
      skipped++;
      continue;
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website || "",
        pipeline: lead.pipeline,
        industry: lead.industry || "",
        size: "",
        revenue: "",
        location: lead.location || "",
        fundingStage: lead.fundingStage || "",
        techStack: JSON.stringify([]),
        stage: "Targeted",
        fitScore: lead.fitScore || 0,
        intentScore: lead.intentScore || 0,
        fitDetails: JSON.stringify(lead.fitDetails || {}),
        intentDetails: JSON.stringify(lead.intentDetails || {}),
        starred: (lead.fitScore + lead.intentScore) >= 80,
        notes: lead.notes || "",
        source: `Scrape (${lead.source || "Indeed/CareerBuilder"})`,
        lastActivity: report.scrapeDate,
      },
    });

    // Create contacts
    for (const contact of (lead.contacts || [])) {
      if (!contact.name || contact.name.startsWith("Unknown")) continue;
      await prisma.contact.create({
        data: {
          name: contact.name,
          title: contact.title || "",
          email: contact.email || "",
          phone: "",
          linkedin: contact.linkedin || "",
          persona: contact.title || "",
          decisionMaker: /CEO|CMO|CIO|CTO|VP|Founder|Director|Head/i.test(contact.title || ""),
          companyId: company.id,
        },
      });
    }

    // Create scrape result
    await prisma.scrapeResult.create({
      data: {
        url: `https://${lead.website}`,
        source: "job_boards",
        pipeline: lead.pipeline,
        resultData: JSON.stringify(lead),
        matchedSignals: JSON.stringify(lead.signals || []),
        imported: true,
      },
    });

    console.log(`  ADD: ${lead.name} (${lead.pipeline}) — Fit ${lead.fitScore} / Intent ${lead.intentScore} = ${lead.fitScore + lead.intentScore}`);
    created++;
  }

  console.log(`\nDone! Created ${created}, skipped ${skipped} (already existed).`);
}

main()
  .catch((e) => {
    console.error("Import failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
