# CURRENT — Blessington GAA mockup

Updated 2026-11-22. Live site last checked against this file: 2026-11-22.

## Goal now

Win the Blessington GAA committee's approval for a website rebuild.
The PRO has seen the concept and liked it. The committee sees it next.

- Repo: `Pdonaldau/blessington-gaa-mockup`, GitHub Pages from `main`, root folder.
- Live: https://pdonaldau.github.io/blessington-gaa-mockup/
- It replaces https://blessingtongaa.ie, which is on Squarespace.

**A push to `main` publishes at once. There is no staging.**

## State

The six tasks in the 2026-11-13 to-do list are done and pushed.
The hero now has archive footage of club players as a fixed backdrop. Patrick confirmed it plays on his PC and his phone.
A sponsors directory panel (`#page-directory`, titled "Sponsors Directory" since 2026-11-22) was added on 2026-11-18. The PRO sent the Listry GAA directory (a WordPress plugin page by Pallas Marketing) as an example of what the club wants.
The site reads real club data from the Sheet (connected 2026-11-22).

## Next step

The real Sheet exists: "Blessington GAA website" in Patrick's Drive, set up 2026-11-22
(six tabs, How to, both forms), and published as Entire document the same day. Its link:
`https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5qFrzFGQ0QM6s2HwgZxZFVXMsPjZ4Fzg0sy7imQNs3-reCRDaFnjcbFRh7z9PvABM2_eqHMdsco-W/pubhtml`.
The site reads it through `CLUB.sheet` (one link; tabs found by name). **Connected and live
since 2026-11-22**: no "sample" labels show.

What the Sheet holds (filled 2026-11-22 from public sources):
- Fixtures: 50 Blessington games, 10 Aug to 27 Nov 2026, copied once from the Wicklow GAA
  team page (officialwicklowgaa.ie/fixtures-results/team/blessington/be6c7b09-4f88-532b-6c6b-35bbcd522248/).
  Home or Away is by venue (Home only at Blessington). The conceded U14 game is left out.
  Nobody at the club keeps this tab up to date yet. The club's fixtures are kept by
  Graham Keogh (club web admin); Patrick won't contact him before the committee decides.
- Lotto: the 27 Oct 2026 draw. News: the 20 Nov 2026 Senior Ladies management post.
- Directory: empty, needs each business's agreement.

In order:

1. **Keep fixtures fresh until the committee meets**: recopy from the Wicklow GAA page by
   hand when needed. Don't scrape it automatically (fragile, no permission).
2. **After a yes: automatic fixtures** from the Foireann Open Data API (see the template's
   `BACKLOG.md`). The club must request the API key.
3. **Template port of the Pages starter rows**: the script fetches `club.csv` and `pages.csv`
   from the live site. That works for Blessington (both filled on 2026-11-22) but not for
   Cloudflare mockups, where `.assetsignore` hides the CSVs. Fix when porting.
4. **Before the committee** (Patrick, with the PRO): "Facts to confirm" in `LAUNCH.md`;
   lotto draw day, time and rhythm (Club tab); sponsor differences in `SPONSORS-CHECK.md`;
   Children's Officer contact and current committee; directory fee, tiers and first businesses.
5. **After a yes**: `LAUNCH.md`, then port the editing upgrades to the template, then a
   Bixbo client tracker (see the template's `BACKLOG.md` for the onboarding and CRM decisions).

Not yet tested: a form post from a non-editor account (it should be ignored).

Stop condition: the committee says yes or no. On yes, work through `LAUNCH.md`.

## Rules that must hold

- Static site, one `index.html`, no build step.
- Club settings stay in the `CLUB` object at the top of the script, so the site can be reused for another club.
- The `noindex, nofollow` robots tag stays until the club approves launch.
- All Sheet text is escaped with `esc()` before it reaches the page. Sheet links pass through `safeLink()`.
- A Sheet link that fails shows the "check Facebook" message, never broken or stale data.
- Never invent club facts. A gap is shown as "Content to come from the club" (a `todo:` entry in `CLUB.pages`).
- Sample data is always labelled "sample" on the page.
- The hero footage (`media/hero-reel-v2.mp4`) is the fixed background of the whole page. Sections use one see-through blue tint, `rgba(15,32,72,.6)`, so the footage shows between blocks. Cards, panels and strips are solid. Rules are in the FOOTAGE BACKDROP block at the end of the styles. A new section uses the same tint, and a new card needs a solid background.
- Encode any new reel as H.264 Main profile, `yuv420p`. The first encode came out as 4:4:4, and desktop Chrome and Edge showed only the poster frame. Give a re-encoded reel a new file name, so browsers can't reuse a cached copy.
- Put no blend modes, filters or transforms on the hero `<video>`. Those stopped the video painting on a desktop PC. The greyscale is baked into the file. The raw clips in `vid_assets/` are git-ignored.

## Decisions in force

- **One Fixtures tab, not separate Fixtures and Results tabs.** A row with a score is a result. The PRO types a score and never moves a row. The Sheet has six tabs: Fixtures, News, Lotto, Directory, Club, Pages.
- **Fixtures filter by code, then by age** (2026-11-22). The Section column is the code: Football, Ladies Football, Hurling or Camogie. Buttons show for the codes in `CLUB.codes` (Blessington: football, ladies, hurling; no camogie found on the club site), plus any code that has games in the Sheet. A second row filters All ages, Adult or Juvenile. Juvenile is read from Section and Team: U18 or younger, Minor, Academy, boys, girls. U19 and older count as adult. Old Section values (Men, Ladies, Juvenile, Hurling) still work. Each list shows 5 games, then "Show all N". The real Sheet's script and Section column were updated to match on 2026-11-22. The template has its own `CLUB.fixtureTabs` version and needs this port.
- **One published link for the whole Sheet** (2026-11-22). `CLUB.sheet` holds the "Entire document" publish link. The site fetches its `pubhtml` page (Google allows this cross-site), reads each tab's name and gid, and fetches `pub?gid=…&single=true&output=csv` per tab. `pub?sheet=Name` does not work: Google ignores it and returns the first tab. A link in `CLUB.sheets.<tab>` still overrides one tab. A tab missing from the Sheet shows "down", not samples.
- **The club edits in the Sheet, not the code** (2026-11-21). `sheet-template/setup.gs` builds the Sheet: tabs, Irish locale, dropdowns, date checks, red rows, warning-protected headings, a "How to" tab, and two phone forms ("Post news", "Add a result"). Form posts count only from accounts that can edit the Sheet. The Club tab overrides a whitelist of settings (lotto rule, `Price:` rows, family cap, ticker, shop note). The Pages tab rebuilds the text of any panel it has rows for, and drops that panel's "from the current club site" note. Links and buttons stay in `CLUB.pages`. If Club fails, `CLUB` is used; if Pages fails, the panel shows its `CLUB.pages` text with a "may be out of date" note. The starter Club and Pages rows are `sheet-template/club.csv` and `pages.csv`, fetched by the script from the live site. If `CLUB.pages` changes before the Sheet exists, regenerate `pages.csv` with `node sheet-template/export-pages.js index.html sheet-template/pages.csv`.
- **Club pages are in-page panels, not separate HTML files.** Any link to `#page-<key>` opens the panel built from `CLUB.pages.<key>`.
- **No "next" date is typed.** Next match is the earliest upcoming fixture. Next lotto draw comes from `CLUB.lotto.firstDraw` plus `everyDays` (14). A "Next draw" cell in the Lotto sheet overrides the rule.
- **Sample fixtures are dated relative to today**, so the demo never goes stale.
- **"Right now" shows the two newest News rows.** `CLUB.pinned` cards fill any gap.
- **The Sponsors Directory is a panel, fed from the Directory sheet tab.** While the tab has no rows, the labelled sample listings show, so the panel is never empty. Not a WordPress directory like the Listry example. Columns: Name, Category, Tier, Description, Phone, Email, Website, Address, Logo, Facebook, Instagram. Cards are compact rows (logo, name, tier, category); a tap opens the description and Call/Website/Map buttons in place. Main sponsors come first, with a gold border. Sample listings are made-up businesses named "Sample …" with the dead number 01 000 0000, never real local businesses. Sponsor names in the marquee link to the panel.
- **Sponsor logos are copies in `media/sponsors/`, not links to Squarespace.** They were copied from blessingtongaa.ie on 2026-11-18, so they keep working after the old site closes. They scroll in a slim strip under the news ticker that opens the directory. On phones the "Our sponsors" label hangs below the strip as a tab, so the logos get the full width. `CLUB.sponsors` entries are `[name, logo file, 1 for a white tile]`.
- **A reusable template lives at `C:\Users\pdona\Desktop\gaa-club-template`**, copied from this repo at `8123d1e` on 2026-11-19, for pitching to other clubs. It has its own git repo, on GitHub at `Pdonaldau/gaa-club-template`. When this site changes, decide whether the change belongs in the template too.
- **The Welfare panel names no Children's Officer.** The current site names two different people. Only the role email is shown.

## How to test

There are no automated tests. Serve the folder and open it in a browser:

```powershell
py -3 -m http.server 8765 --bind 127.0.0.1
```

Check three states: Sheet links empty, links working, and one link broken.
To test working links without a real Sheet, point `CLUB.sheets` at the files in `sheet-template/` (or `CLUB.sheet` at the real published Sheet) in a scratch copy. Don't commit that change.
Opening `index.html` straight from disk can't fetch a Sheet, so use the local server.
