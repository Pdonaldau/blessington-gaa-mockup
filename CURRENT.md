# CURRENT — Blessington GAA mockup

Updated 2026-11-13. Live site last checked against this file: 2026-11-13.

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
The site runs on labelled sample data until Patrick pastes the Sheet links.

## Next step

Patrick's part. Nothing else is blocked on code.

1. Create the Google Sheet from `sheet-template/`, following `SHEET-SETUP.md`. Paste the three links into `CLUB.sheets`.
2. Confirm the lotto draw day, time and fortnightly rhythm. Set `CLUB.lotto.drawTime`.
3. Confirm the sponsor differences in `SPONSORS-CHECK.md`.
4. Get the Children's Officer contact and the current committee list from the PRO.
5. Go through "Facts to confirm" in `LAUNCH.md` with the PRO.

Stop condition: the committee says yes or no. On yes, work through `LAUNCH.md`.

## Rules that must hold

- Static site, one `index.html`, no build step.
- Club settings stay in the `CLUB` object at the top of the script, so the site can be reused for another club.
- The `noindex, nofollow` robots tag stays until the club approves launch.
- All Sheet text is escaped with `esc()` before it reaches the page. Sheet links pass through `safeLink()`.
- A Sheet link that fails shows the "check Facebook" message, never broken or stale data.
- Never invent club facts. A gap is shown as "Content to come from the club" (a `todo:` entry in `CLUB.pages`).
- Sample data is always labelled "sample" on the page.
- The hero footage (`media/hero-reel-v2.mp4`) is fixed behind the whole page, and the page scrolls over it. Every section after the hero needs a solid background, or the footage shows through.
- Encode any new reel as H.264 Main profile, `yuv420p`. The first encode came out as 4:4:4, and desktop Chrome and Edge showed only the poster frame. Give a re-encoded reel a new file name, so browsers can't reuse a cached copy.
- Put no blend modes, filters or transforms on the hero `<video>`. Those stopped the video painting on a desktop PC. The greyscale is baked into the file. The raw clips in `vid_assets/` are git-ignored.

## Decisions in force

- **One Fixtures tab, not separate Fixtures and Results tabs.** A row with a score is a result. The PRO types a score and never moves a row. So `CLUB.sheets` has three links: `fixtures`, `news`, `lotto`.
- **Club pages are in-page panels, not separate HTML files.** Any link to `#page-<key>` opens the panel built from `CLUB.pages.<key>`.
- **No "next" date is typed.** Next match is the earliest upcoming fixture. Next lotto draw comes from `CLUB.lotto.firstDraw` plus `everyDays` (14). A "Next draw" cell in the Lotto sheet overrides the rule.
- **Sample fixtures are dated relative to today**, so the demo never goes stale.
- **"Right now" shows the two newest News rows.** `CLUB.pinned` cards fill any gap.
- **The Welfare panel names no Children's Officer.** The current site names two different people. Only the role email is shown.

## How to test

There are no automated tests. Serve the folder and open it in a browser:

```powershell
py -3 -m http.server 8765 --bind 127.0.0.1
```

Check three states: Sheet links empty, links working, and one link broken.
To test working links without a real Sheet, point `CLUB.sheets` at the files in `sheet-template/` in a scratch copy. Don't commit that change.
Opening `index.html` straight from disk can't fetch a Sheet, so use the local server.
