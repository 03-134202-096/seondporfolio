/**
 * DeepDivers website inquiries → Google Sheet + client confirmation email.
 *
 * Runs as a Google Apps Script web app owned by teamdeepdivers@gmail.com (free).
 * The website's /api/contact route POSTs every quote request here.
 *
 * One-time setup (signed in as teamdeepdivers@gmail.com):
 *  1. Create a Google Sheet named "DeepDivers website inquiries".
 *  2. In the Sheet: Extensions → Apps Script. Replace the code with this file. Save.
 *  3. Project Settings → Script properties → add SHARED_SECRET = a long random string.
 *  4. Deploy → New deployment → type "Web app":
 *       Execute as: Me (teamdeepdivers@gmail.com)
 *       Who has access: Anyone
 *     Authorise when asked, then copy the Web app URL (ends in /exec).
 *  5. In Vercel → Project → Settings → Environment Variables (Production), add:
 *       INQUIRY_WEBHOOK_URL    = the /exec URL
 *       INQUIRY_WEBHOOK_SECRET = the same SHARED_SECRET
 *     then redeploy. Send one test inquiry with "TEST" in the name.
 */

var SHEET_NAME = 'Inquiries';
var TEAM_EMAIL = 'teamdeepdivers@gmail.com';
var HEADERS = [
  'Received (UTC)', 'Name', 'Email', 'Service', 'Budget', 'Payment structure',
  'Timeline', 'Message', 'Attachment', 'Team email sent', 'Confirmation sent', 'Status',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (!secret || data.secret !== secret) {
      return json_({ ok: false, error: 'unauthorised' });
    }

    var sheet = getSheet_();
    var confirmationSent = false;
    if (isEmail_(data.email)) {
      try {
        sendConfirmation_(data);
        confirmationSent = true;
      } catch (err) {
        console.error('Confirmation email failed: ' + err);
      }
    }

    // Backup notification when the website's own notification email failed
    if (!data.emailNotificationSent) {
      MailApp.sendEmail({
        to: TEAM_EMAIL,
        replyTo: isEmail_(data.email) ? data.email : TEAM_EMAIL,
        subject: 'New Quote Request (backup): ' + (data.service || '') + ' - from ' + (data.name || ''),
        body: summary_(data),
      });
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      clean_(data.name), clean_(data.email), clean_(data.service), clean_(data.budget),
      clean_(data.paymentStructure), clean_(data.timeline), clean_(data.message),
      clean_(data.attachmentName), data.emailNotificationSent ? 'yes' : 'no (backup sent)',
      confirmationSent ? 'yes' : 'no', 'New',
    ]);

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function sendConfirmation_(data) {
  var firstName = String(data.name || '').split(' ')[0] || 'there';
  var body =
    'Hi ' + firstName + ',\n\n' +
    'Thank you for contacting DeepDivers. We have received your request' +
    (data.service ? ' for "' + data.service + '"' : '') + '.\n\n' +
    'A member of our team will review the details and reply with a quote, usually within 24 hours. ' +
    'If you need to add files or details, simply reply to this email.\n\n' +
    'Your request:\n' + summary_(data) + '\n\n' +
    'Best regards,\nTeam DeepDivers\n' +
    'https://deepdivers.services · ' + TEAM_EMAIL + ' · WhatsApp +92 312 5065538';

  MailApp.sendEmail({
    to: data.email,
    replyTo: TEAM_EMAIL,
    name: 'DeepDivers',
    subject: 'We received your request – DeepDivers',
    body: body,
  });
}

function summary_(data) {
  return [
    'Name: ' + clean_(data.name),
    'Email: ' + clean_(data.email),
    'Service: ' + clean_(data.service),
    'Budget: ' + (clean_(data.budget) || 'Not specified'),
    'Payment structure: ' + (clean_(data.paymentStructure) || 'Not specified'),
    'Timeline: ' + (clean_(data.timeline) || 'Not specified'),
    'Attachment: ' + (clean_(data.attachmentName) || 'None'),
    '',
    'Project details:',
    clean_(data.message),
  ].join('\n');
}

function clean_(value) {
  // Stop spreadsheet formula injection and keep cells a sensible size
  var s = String(value == null ? '' : value).slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
