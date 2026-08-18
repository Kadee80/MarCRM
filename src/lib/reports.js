import fs from "fs";
import path from "path";

/**
 * Report file naming: <type-prefix>-YYYY-MM-DD.json in the repo's reports/ directory.
 *
 * Historically only `daily-scrape-*` was read, which silently hid every freelance report
 * (128 files as of Aug 2026). Anything matching the date-suffixed pattern is now included.
 */
const REPORT_FILE = /^(.+?)-(\d{4}-\d{2}-\d{2})(?:-(.+))?\.json$/;

const TYPE_LABELS = {
  "daily-scrape": "Daily",
  "pr-freelance-scrape": "PR Freelance",
  "legal-freelance-scrape": "Legal Freelance",
};

function labelFor(type) {
  if (TYPE_LABELS[type]) return TYPE_LABELS[type];
  // Unknown prefix — make something readable rather than dropping the report.
  return type
    .replace(/-scrape$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Read every report in `reportsDir`, newest first.
 *
 * A single malformed file must not take down the whole tab, so parse failures are
 * collected onto the report entry instead of thrown.
 *
 * @param {string} reportsDir
 * @returns {Array<{filename: string, type: string, typeLabel: string, date: string,
 *                  totalLeads: number, leads: Array, note: string, error?: string}>}
 */
export function loadReports(reportsDir) {
  if (!fs.existsSync(reportsDir)) return [];

  const reports = [];

  for (const filename of fs.readdirSync(reportsDir)) {
    const match = filename.match(REPORT_FILE);
    if (!match) continue;

    // `variant` catches one-off files like daily-scrape-2026-04-27-targeted.json.
    // The old route included those but derived a broken date ("2026-04-27-targeted") from them.
    const [, type, date, variant] = match;
    const suffix = variant ? ` · ${variant.replace(/-/g, " ")}` : "";

    try {
      const raw = fs.readFileSync(path.join(reportsDir, filename), "utf-8");
      const data = JSON.parse(raw);

      // Older reports used `newLeads`; sync-all-leads.cjs tolerates both, so this does too.
      const leads = data.leads || data.newLeads || [];

      reports.push({
        filename,
        type,
        typeLabel: labelFor(type) + suffix,
        date: data.scrapeDate || date,
        totalLeads: data.totalLeads ?? leads.length,
        leads,
        note: data.note || "",
      });
    } catch (err) {
      reports.push({
        filename,
        type,
        typeLabel: labelFor(type) + suffix,
        date,
        totalLeads: 0,
        leads: [],
        note: "",
        error: `Could not read this report: ${err.message}`,
      });
    }
  }

  // Newest first; within a day, a stable order so the UI doesn't shuffle between loads.
  return reports.sort(
    (a, b) => b.date.localeCompare(a.date) || a.filename.localeCompare(b.filename)
  );
}
