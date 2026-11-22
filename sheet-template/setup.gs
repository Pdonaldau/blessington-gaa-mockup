/**
 * Blessington GAA website: Sheet setup script.
 *
 * Paste this whole file into the Sheet (Extensions > Apps Script), save, then run
 * setUpWebsiteSheet once. It is safe to run again: it repairs the checks and never
 * deletes rows. See SHEET-SETUP.md.
 *
 * What it does:
 *  - makes the six tabs the website reads, with the right headings
 *  - fills the Club and Pages tabs with the text the website shows today
 *  - adds dropdowns, date checks, protected headings, and red highlighting on bad rows
 *  - adds a "How to" tab
 *  - makes two phone forms: "Post news" and "Add a result"
 */

// Where the starter Club and Pages rows are published. Empty = headings only.
const STARTER_URL = 'https://pdonaldau.github.io/blessington-gaa-mockup/sheet-template/';
const CLUB_NAME = 'Blessington GAA';

const TABS = {
  Fixtures:  ['Date', 'Time', 'Section', 'Team', 'Opponent', 'Home or Away', 'Score', 'Result'],
  News:      ['Date', 'Tag', 'Headline', 'Summary', 'Link'],
  Lotto:     ['Draw date', 'Numbers', 'Next jackpot', 'Result', 'Next draw'],
  Directory: ['Name', 'Category', 'Tier', 'Description', 'Phone', 'Email', 'Website', 'Address', 'Logo', 'Facebook', 'Instagram'],
  Club:      ['Setting', 'Value'],
  Pages:     ['Page', 'Section', 'Label', 'Text']
};
const STARTER = { Club: 'club.csv', Pages: 'pages.csv' };

const SECTIONS = ['Men', 'Ladies', 'Juvenile', 'Hurling'];
const NEWS_TAGS = ['Club news', 'Match report', 'Fundraising', 'Juvenile', 'Ladies', 'Development', 'Lotto'];
const TIERS = ['Main sponsor', 'Sponsor', 'Member'];
const RED = '#f4c7c3';


function setUpWebsiteSheet() {
  const ss = SpreadsheetApp.getActive();
  // Irish dates: 7/2/2027 is 7 February.
  ss.setSpreadsheetLocale('en_IE');
  ss.setSpreadsheetTimeZone('Europe/Dublin');

  Object.keys(TABS).forEach(name => setUpTab_(ss, name));
  checksFixtures_(ss.getSheetByName('Fixtures'));
  checksNews_(ss.getSheetByName('News'));
  checksLotto_(ss.getSheetByName('Lotto'));
  checksDirectory_(ss.getSheetByName('Directory'));
  checksClub_(ss.getSheetByName('Club'));
  checksPages_(ss.getSheetByName('Pages'));

  const blank = ss.getSheetByName('Sheet1');
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);

  const forms = setUpForms_(ss);
  writeHowTo_(ss, forms);
  onOpen();
  // Save everything before the Done box: the box waits for OK, and a run stopped there loses unsaved writes.
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('Done',
    'The Sheet is ready.\n\nPost news form:\n' + forms.news + '\n\nAdd a result form:\n' + forms.result +
    '\n\nBoth links are also on the "How to" tab. Save them to your phone home screen.\n\n' +
    'Next: publish each tab as CSV (SHEET-SETUP.md, step 3).', SpreadsheetApp.getUi().ButtonSet.OK);
}

// Kept below setUpWebsiteSheet on purpose: the editor's Run button picks the first function in the file.
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Website')
    .addItem('Set up or repair the Sheet', 'setUpWebsiteSheet')
    .addItem('Refresh the result form', 'refreshResultForm')
    .addToUi();
}

/* ---------- tabs ---------- */

function setUpTab_(ss, name) {
  const head = TABS[name];
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);

  if (sh.getLastRow() === 0) {
    const rows = starterRows_(name);
    if (rows && rows.length > 1 && rows[0].join() === head.join()) {
      sh.getRange(1, 1, rows.length, head.length).setNumberFormat('@').setValues(rows);
    } else {
      sh.getRange(1, 1, 1, head.length).setValues([head]);
    }
  } else {
    const have = sh.getRange(1, 1, 1, head.length).getDisplayValues()[0];
    if (have.join() !== head.join()) {
      throw new Error('The headings on the ' + name + ' tab have changed. They must be: ' + head.join(', ') +
        '. Put them back, then run this again.');
    }
  }

  // Start each run clean, so running it twice never doubles a rule.
  sh.getRange(2, 1, sh.getMaxRows() - 1, sh.getMaxColumns()).clearDataValidations();
  sh.clearConditionalFormatRules();
  sh.getProtections(SpreadsheetApp.ProtectionType.RANGE)
    .filter(p => p.getDescription() === 'Website headings').forEach(p => p.remove());

  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, head.length).setFontWeight('bold').setBackground('#0f2048').setFontColor('#ffffff');
  sh.getRange(1, 1, 1, head.length).protect().setDescription('Website headings').setWarningOnly(true);
  head.forEach((h, i) => {
    const wide = /Summary|Description|Text|Value|Headline|Team|Address/.test(h);
    sh.setColumnWidth(i + 1, wide ? 320 : 130);
    if (wide) sh.getRange(2, i + 1, sh.getMaxRows() - 1, 1).setWrap(true);
  });
}

function starterRows_(name) {
  if (!STARTER_URL || !STARTER[name]) return null;
  try {
    const res = UrlFetchApp.fetch(STARTER_URL + STARTER[name], { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) return null;
    return Utilities.parseCsv(res.getContentText('UTF-8'));
  } catch (e) {
    return null;
  }
}

/* ---------- checks ---------- */

function col_(sh, name) { return TABS[sh.getName()].indexOf(name) + 1; }
function body_(sh, name) { return sh.getRange(2, col_(sh, name), sh.getMaxRows() - 1, 1); }
function letter_(sh, name) { return String.fromCharCode(64 + col_(sh, name)); }
function lastLetter_(sh) { return String.fromCharCode(64 + TABS[sh.getName()].length); }

function dropdown_(range, list, strict, help) {
  range.setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(list, true).setAllowInvalid(!strict).setHelpText(help).build());
}

function dateColumn_(sh, name) {
  const r = body_(sh, name);
  r.setNumberFormat('yyyy-mm-dd');
  r.setDataValidation(SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false)
    .setHelpText('A date, for example 7/2/2027. It shows as 2027-02-07.').build());
}

// Red highlighting on the whole row width when the formula is true. Formulas are written for row 2.
function redRows_(sh, formulas) {
  const range = sh.getRange('A2:' + lastLetter_(sh) + sh.getMaxRows());
  const rules = formulas.map(f => SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(f).setBackground(RED).setRanges([range]).build());
  sh.setConditionalFormatRules(sh.getConditionalFormatRules().concat(rules));
}

function anyIn_(sh) { return 'COUNTA($A2:$' + lastLetter_(sh) + '2)>0'; }

function checksFixtures_(sh) {
  dateColumn_(sh, 'Date');
  body_(sh, 'Time').setNumberFormat('HH:mm');
  dropdown_(body_(sh, 'Section'), SECTIONS, true, 'Decides which filter button the game is under.');
  dropdown_(body_(sh, 'Home or Away'), ['Home', 'Away'], true, 'Home or Away.');
  dropdown_(body_(sh, 'Result'), ['W', 'L', 'D'], true, 'W, L or D. Leave empty until the game is played.');
  const A = letter_(sh, 'Date'), B = letter_(sh, 'Time'), T = letter_(sh, 'Team'), O = letter_(sh, 'Opponent'),
        S = letter_(sh, 'Score'), R = letter_(sh, 'Result');
  redRows_(sh, [
    '=AND(' + anyIn_(sh) + ',OR($' + A + '2="",$' + T + '2="",$' + O + '2=""))',
    '=AND($' + B + '2<>"",NOT(ISNUMBER($' + B + '2)),NOT(REGEXMATCH(TO_TEXT($' + B + '2),"^\\d{1,2}([:.]\\d{2})?\\s*([aApP][mM])?$")))',
    '=AND($' + R + '2<>"",$' + S + '2="")',
    '=AND($' + S + '2<>"",NOT(REGEXMATCH(TO_TEXT($' + S + '2),"^\\s*\\d+\\s*-\\s*\\d+\\s*v\\s*\\d+\\s*-\\s*\\d+\\s*$")))'
  ]);
}

function checksNews_(sh) {
  dateColumn_(sh, 'Date');
  dropdown_(body_(sh, 'Tag'), NEWS_TAGS, false, 'Pick one, or type your own.');
  const H = letter_(sh, 'Headline'), L = letter_(sh, 'Link');
  redRows_(sh, [
    '=AND(' + anyIn_(sh) + ',OR($A2="",$' + H + '2=""))',
    '=LEN($' + H + '2)>80',
    '=AND($' + L + '2<>"",NOT(REGEXMATCH($' + L + '2,"^https?://\\S+$")))'
  ]);
}

function checksLotto_(sh) {
  dateColumn_(sh, 'Draw date');
  dateColumn_(sh, 'Next draw');
  body_(sh, 'Numbers').setNumberFormat('@');
  body_(sh, 'Next jackpot').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireNumberGreaterThanOrEqualTo(0).setAllowInvalid(false).setHelpText('Digits only, for example 8400.').build());
  const N = letter_(sh, 'Numbers'), J = letter_(sh, 'Next jackpot');
  redRows_(sh, [
    '=AND(' + anyIn_(sh) + ',OR($A2="",$' + N + '2="",$' + J + '2=""))',
    '=AND($' + N + '2<>"",NOT(REGEXMATCH(TO_TEXT($' + N + '2),"^\\s*\\d{1,2}(\\s+\\d{1,2}){3,7}\\s*$")))'
  ]);
}

function checksDirectory_(sh) {
  dropdown_(body_(sh, 'Tier'), TIERS, true, 'Main sponsor comes first, then Sponsor, then Member.');
  const used = body_(sh, 'Category').getDisplayValues().map(r => r[0]).filter(String);
  const cats = Array.from(new Set(used.concat(['Food & drink', 'Trades & construction', 'Health & fitness',
    'Professional services', 'Home & garden', 'Motoring', 'Retail']))).sort();
  dropdown_(body_(sh, 'Category'), cats, false, 'Pick one, or type a new category. Spell it the same way every time.');
  ['Phone', 'Email', 'Website', 'Logo', 'Facebook', 'Instagram'].forEach(c => body_(sh, c).setNumberFormat('@'));
  const C = letter_(sh, 'Category'), E = letter_(sh, 'Email');
  redRows_(sh, [
    '=AND(' + anyIn_(sh) + ',OR($A2="",$' + C + '2=""))',
    '=AND($' + E + '2<>"",NOT(REGEXMATCH($' + E + '2,"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")))'
  ]);
}

function checksClub_(sh) {
  body_(sh, 'Value').setNumberFormat('@');
  redRows_(sh, [
    '=AND($A2<>"",NOT(REGEXMATCH(LOWER($A2),"^(lotto first draw|lotto days between draws|lotto draw time|lotto match 3 prize|family cap|ticker|shop note|price: .+)$")))'
  ]);
}

function checksPages_(sh) {
  const pages = Array.from(new Set(body_(sh, 'Page').getDisplayValues().map(r => r[0]).filter(String)));
  if (pages.length) dropdown_(body_(sh, 'Page'), pages, false, 'The page this row belongs to. A new page name needs a website change.');
  redRows_(sh, ['=AND(' + anyIn_(sh) + ',OR($A2="",$D2=""))']);
}

/* ---------- How to tab ---------- */

function writeHowTo_(ss, forms) {
  let sh = ss.getSheetByName('How to');
  if (!sh) sh = ss.insertSheet('How to', 0);
  sh.clear();
  const lines = [
    [CLUB_NAME + ' website: how this Sheet works'],
    ['The website reads the tabs of this Sheet. Change a tab and the website updates within about five minutes.'],
    ['Keep the headings in row 1 exactly as they are. A red row has a problem: the website may skip it.'],
    [''],
    ['On your phone'],
    ['Post news: ' + forms.news],
    ['Add a result: ' + forms.result],
    ['Sign in with a Google account that can edit this Sheet. Posts from other accounts are ignored.'],
    [''],
    ['Fixtures: one row per game. After the game, type the score in the same row, Blessington first (2-11 v 1-09), and pick W, L or D. Never move the row.'],
    ['News: one row per story. The two newest show on the website. Keep the headline to about six words.'],
    ['Lotto: one row after each draw. Next jackpot is digits only. Leave Next draw empty unless a draw moves.'],
    ['Directory: one row per business. List only details each business has agreed to publish.'],
    ['Club: lotto rule, membership prices, family cap, the ticker messages and the shop note. Change the Value column only.'],
    ['Pages: the text of the club pages. Section "Intro" is the opening text. "To come" rows show as "Content to come from the club": delete one when it is done. A Label of "-" makes a bullet point.'],
    [''],
    ['Everything here is public once published. No private phone numbers, no children\'s names.']
  ];
  sh.getRange(1, 1, lines.length, 1).setValues(lines).setWrap(true);
  sh.setColumnWidth(1, 900);
  sh.getRange('A1').setFontSize(14).setFontWeight('bold');
  sh.getRange('A5').setFontWeight('bold');
}

/* ---------- phone forms ---------- */

function setUpForms_(ss) {
  const props = PropertiesService.getDocumentProperties();
  const news = openOrMake_(props, 'newsForm', () => makeNewsForm_());
  const result = openOrMake_(props, 'resultForm', () => makeResultForm_());

  // One trigger per job. Old ones are removed first, so a second run never doubles them.
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onNewsForm').forForm(news).onFormSubmit().create();
  ScriptApp.newTrigger('onResultForm').forForm(result).onFormSubmit().create();
  ScriptApp.newTrigger('onSheetEdit').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('refreshResultForm').timeBased().everyDays(1).atHour(6).create();
  refreshResultForm();
  return { news: news.getPublishedUrl(), result: result.getPublishedUrl() };
}

function openOrMake_(props, key, make) {
  const id = props.getProperty(key);
  if (id) { try { return FormApp.openById(id); } catch (e) { /* deleted: make a new one */ } }
  const f = make();
  props.setProperty(key, f.getId());
  return f;
}

// Only signed-in respondents, so a post can be checked against the Sheet's editors.
function signedIn_(form) {
  try { form.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED); }
  catch (e) { form.setCollectEmail(true); }
}

function makeNewsForm_() {
  const f = FormApp.create(CLUB_NAME + ': post news');
  signedIn_(f);
  f.setDescription('Adds a story to the News tab. The two newest stories show on the website within about five minutes.');
  f.setConfirmationMessage('Posted. It shows on the website within about five minutes.');
  f.addTextItem().setTitle('Headline').setHelpText('About six words.').setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextLengthLessThanOrEqualTo(80).build());
  f.addParagraphTextItem().setTitle('Summary').setHelpText('One or two sentences.').setRequired(true);
  f.addListItem().setTitle('Tag').setChoiceValues(NEWS_TAGS).setRequired(true);
  f.addTextItem().setTitle('Link').setHelpText('Optional. A full web address, for example a Facebook post.')
    .setValidation(FormApp.createTextValidation().requireTextIsUrl().build());
  f.addDateItem().setTitle('Date').setHelpText('Leave empty for today.');
  return f;
}

function makeResultForm_() {
  const f = FormApp.create(CLUB_NAME + ': add a result');
  signedIn_(f);
  f.setDescription('Adds the score to a game on the Fixtures tab. Only games from the last three weeks with no score are listed.');
  f.setConfirmationMessage('Saved. The result shows on the website within about five minutes.');
  f.addListItem().setTitle('Game').setRequired(true).setChoiceValues(['No games are waiting for a score']);
  f.addTextItem().setTitle('Score').setHelpText('Blessington first, for example 2-11 v 1-09.').setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('\\s*\\d+\\s*-\\s*\\d+\\s*v\\s*\\d+\\s*-\\s*\\d+\\s*').build());
  f.addMultipleChoiceItem().setTitle('Result').setChoiceValues(['Win', 'Loss', 'Draw']).setRequired(true);
  return f;
}

function allowed_(response) {
  const who = String(response.getRespondentEmail() || '').toLowerCase();
  if (!who) return false;
  const ss = SpreadsheetApp.getActive();
  const ok = ss.getEditors().map(u => u.getEmail().toLowerCase());
  ok.push(String(Session.getEffectiveUser().getEmail()).toLowerCase());
  return ok.indexOf(who) >= 0;
}

function answers_(response) {
  const a = {};
  response.getItemResponses().forEach(r => { a[r.getItem().getTitle()] = r.getResponse(); });
  return a;
}

function onNewsForm(e) {
  if (!allowed_(e.response)) { console.warn('News post ignored: not a Sheet editor'); return; }
  const a = answers_(e.response);
  const sh = SpreadsheetApp.getActive().getSheetByName('News');
  const date = a['Date'] ? toDate_(a['Date']) : new Date();
  sh.appendRow([date, a['Tag'] || 'Club news', a['Headline'], a['Summary'], a['Link'] || '']);
  // appendRow stamps a date-time; the website wants the date alone.
  sh.getRange(sh.getLastRow(), 1).setNumberFormat('yyyy-mm-dd');
}

// Labels for games waiting for a score: "Sat 22 Nov · U14 Boys v Kilbride".
function gameLabel_(row) {
  const d = toDate_(row[0]);
  if (!d) return '';
  return Utilities.formatDate(d, 'Europe/Dublin', 'EEE d MMM') + ' · ' + row[3] + ' v ' + row[4];
}

function waitingGames_() {
  const sh = SpreadsheetApp.getActive().getSheetByName('Fixtures');
  const n = sh.getLastRow() - 1;
  if (n < 1) return [];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const from = new Date(today.getTime() - 21 * 864e5), to = new Date(today.getTime() + 864e5);
  return sh.getRange(2, 1, n, 8).getValues().map((r, i) => ({ row: i + 2, r }))
    .filter(x => { const d = toDate_(x.r[0]); return d && d >= from && d <= to && !String(x.r[6]).trim(); })
    .map(x => ({ row: x.row, label: gameLabel_(x.r) }))
    .filter(x => x.label);
}

function refreshResultForm() {
  const id = PropertiesService.getDocumentProperties().getProperty('resultForm');
  if (!id) return;
  const item = FormApp.openById(id).getItems(FormApp.ItemType.LIST)[0].asListItem();
  const labels = Array.from(new Set(waitingGames_().map(g => g.label)));
  item.setChoiceValues(labels.length ? labels : ['No games are waiting for a score']);
}

function onSheetEdit(e) {
  if (e && e.range && e.range.getSheet().getName() === 'Fixtures') refreshResultForm();
}

function onResultForm(e) {
  if (!allowed_(e.response)) { console.warn('Result ignored: not a Sheet editor'); return; }
  const a = answers_(e.response);
  const game = waitingGames_().find(g => g.label === a['Game']);
  if (game) {
    const sh = SpreadsheetApp.getActive().getSheetByName('Fixtures');
    sh.getRange(game.row, 7, 1, 2).setValues([[String(a['Score']).trim(), String(a['Result']).charAt(0)]]);
  }
  refreshResultForm();
}

// A Date, "2027-02-07" or "7/2/2027" (day first) as a Date, else null.
function toDate_(v) {
  if (v instanceof Date) return isNaN(v) ? null : v;
  const s = String(v || '').trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2}|\d{4})$/);
  if (m) return new Date(m[3].length === 2 ? 2000 + +m[3] : +m[3], +m[2] - 1, +m[1]);
  return null;
}
