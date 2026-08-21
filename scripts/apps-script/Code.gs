/**
 * MarCRM → Command Center bridge.
 *
 * A Google Apps Script web app that appends starred leads from MarCRM into the two
 * Command Center trackers. Deployed once, called by `node scripts/push-starred.cjs`.
 *
 * Why a web app and not the Sheets API: no GCP project, no service-account JSON, no extra
 * npm dependency. Setup is five clicks in the Sheets UI. See scripts/PUSH-STARRED-SETUP.md.
 *
 * It is idempotent: rows are deduplicated by company name against what is already in the
 * sheet, so running the push twice adds nothing the second time.
 *
 * It also respects the LEGEND block at the bottom of each sheet — new rows go into the blank
 * data region above it, and the legend is pushed down only if the blanks run out.
 */

// ─── Config ────────────────────────────────────────────────────────────────────
// Replace SHARED_TOKEN with the same random string you put in .env as SHEETS_WEBAPP_TOKEN.
// The deployment URL has to be readable by "Anyone", so this token is what actually
// authenticates the caller. Treat it like a password.
var SHARED_TOKEN = 'REPLACE_ME_WITH_A_LONG_RANDOM_STRING';

var SHEET_IDS = {
  application: '19B8corUsE9tsqpNQ65c8g0x-i2URtTHVFDUwKUqIw04', // Application Tracker (Master)
  bd: '1SQ6NwY-47_VI6JsaLq2U3lH6HJ021cB0ZqIQZNsFVTw'           // Business Development Pipeline (Master)
};

// Which column holds the company name (1-indexed). Both trackers use column B.
var COMPANY_COL = 2;

// ─── Entry point ───────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (!body.token || body.token !== SHARED_TOKEN) {
      return json({ ok: false, error: 'bad token' });
    }
    var sheetId = SHEET_IDS[body.target];
    if (!sheetId) {
      return json({ ok: false, error: 'unknown target: ' + body.target });
    }
    var rows = body.rows || [];
    if (!rows.length) {
      return json({ ok: true, added: 0, skipped: 0, addedNames: [], skippedNames: [] });
    }

    var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
    var result = appendNewRows(sheet, rows);
    return json({ ok: true, added: result.added.length, skipped: result.skipped.length,
                  addedNames: result.added, skippedNames: result.skipped });

  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// ─── Core ──────────────────────────────────────────────────────────────────────
function appendNewRows(sheet, rows) {
  var lastRow = Math.max(sheet.getLastRow(), 1);
  var colA = sheet.getRange(1, 1, lastRow, 1).getValues();

  // The data region runs from row 2 up to (but not including) the LEGEND row.
  var legendRow = lastRow + 1;
  for (var i = 0; i < colA.length; i++) {
    if (String(colA[i][0]).trim().toUpperCase() === 'LEGEND') {
      legendRow = i + 1;
      break;
    }
  }

  var dataHeight = Math.max(legendRow - 2, 0);
  var names = dataHeight > 0
    ? sheet.getRange(2, COMPANY_COL, dataHeight, 1).getValues()
    : [];

  // Existing company names, lowercased, for dedup.
  var seen = {};
  for (var j = 0; j < names.length; j++) {
    var n = String(names[j][0]).trim().toLowerCase();
    if (n) seen[n] = true;
  }

  // First blank row in the data region is where we start writing.
  var writeRow = legendRow;
  for (var k = 0; k < names.length; k++) {
    if (!String(names[k][0]).trim()) { writeRow = k + 2; break; }
  }

  var fresh = [], added = [], skipped = [];
  for (var r = 0; r < rows.length; r++) {
    var company = String(rows[r][COMPANY_COL - 1] || '').trim();
    var key = company.toLowerCase();
    if (!company || seen[key]) { skipped.push(company || '(unnamed)'); continue; }
    seen[key] = true;
    fresh.push(rows[r]);
    added.push(company);
  }
  if (!fresh.length) return { added: added, skipped: skipped };

  // Make room if the blank rows above the legend run out, so the legend is never overwritten.
  var blanksAvailable = Math.max(legendRow - writeRow, 0);
  if (fresh.length > blanksAvailable) {
    sheet.insertRowsBefore(legendRow, fresh.length - blanksAvailable);
  }

  var width = sheet.getLastColumn();
  var padded = fresh.map(function (row) {
    var out = row.slice(0, width);
    while (out.length < width) out.push('');
    return out;
  });

  sheet.getRange(writeRow, 1, padded.length, width).setValues(padded);
  return { added: added, skipped: skipped };
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: run this once from the Apps Script editor to confirm both sheets are reachable
// and to trigger the authorization prompt before the first real push.
function testConnection() {
  Object.keys(SHEET_IDS).forEach(function (k) {
    var s = SpreadsheetApp.openById(SHEET_IDS[k]).getSheets()[0];
    Logger.log(k + ' → ' + s.getParent().getName() + ' (' + s.getLastRow() + ' rows)');
  });
}
