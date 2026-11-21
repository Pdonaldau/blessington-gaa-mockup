// Export CLUB.pages from index.html into Pages-tab rows (CSV), so the PRO starts with today's content.
const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync(process.argv[2], 'utf8');
const start = html.indexOf('const CLUB = {'), end = html.indexOf('\n};', start) + 3;
const ctx = {}; vm.runInNewContext(html.slice(start, end).replace('const CLUB', 'this.CLUB'), ctx);
const C = ctx.CLUB, rows = [['Page', 'Section', 'Label', 'Text']];
for (const [k, p] of Object.entries(C.pages)) {
  for (const x of p.p || []) rows.push([p.t, 'Intro', '', x]);
  for (const s of p.sec || []) {
    if (s.p) rows.push([p.t, s.h, '', s.p]);
    for (const [a, b] of s.rows || []) rows.push([p.t, s.h, a, b]);
    for (const x of s.list || []) rows.push([p.t, s.h, '-', x]);
  }
  for (const s of p.sec || []) for (const x of s.todo || []) rows.push([p.t, 'To come', '', x]);
  for (const x of p.todo || []) rows.push([p.t, 'To come', '', x]);
}
const q = v => /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
const csv = rows.map(r => r.map(q).join(',')).join('\n') + '\n';
fs.writeFileSync(process.argv[3], csv);
if (process.argv[4]) fs.writeFileSync(process.argv[4], JSON.stringify(rows));
console.log(rows.length - 1, 'rows');
