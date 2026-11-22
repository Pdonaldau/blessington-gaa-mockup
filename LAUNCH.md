# Launch checklist

Do these steps only after the club committee approves the rebuild.
Until then the site stays a concept: hidden from search engines and labelled as a mockup.

All settings named below are in `index.html`. Club settings are in the `CLUB` object at the top of the script.

## 1. Confirm the content

- [ ] Every "Content to come from the club" slot is filled. Search `index.html` for `todo:` to find them all.
- [ ] The club has confirmed the facts listed under [Facts to confirm](#facts-to-confirm).
- [ ] The sponsor list is confirmed and `SPONSORS-CHECK.md` is deleted.
- [ ] The club has set the Sponsors Directory listing fee and tiers, replacing the `todo` in `CLUB.directory`. Every business in the Directory tab has agreed to its listing.
- [ ] A native Irish speaker has checked the Irish menu text. It is in the `i18n` object in the script.
- [ ] The PRO and every person named in a panel agree to their name and phone number being on the site.
- [ ] `CLUB.membership`, `CLUB.familyCap` and the "2026 membership" wording match the season on sale.

## 2. Confirm the Sheet links

- [ ] `CLUB.sheet` has the Sheet's published link (Entire document, ends in `pubhtml`), and the tabs are still named Fixtures, News, Lotto, Directory, Club and Pages. See `SHEET-SETUP.md`.
- [ ] The two phone forms post from the PRO's phone, and a post from a non-editor account is ignored.
- [ ] No "sample" label shows anywhere on the page. A "sample" label means that tab's link is empty.
- [ ] The PRO has added a real row to each tab and seen it appear on the site.
- [ ] `CLUB.lotto.firstDraw` is a real draw date and `CLUB.lotto.everyDays` matches how often the draw runs.
- [ ] `CLUB.lotto.drawTime` is set, if the club wants the countdown to run to the draw time and not just the draw day.

## 3. Remove the concept labels

- [ ] Delete the robots line from the `<head>`: `<meta name="robots" content="noindex, nofollow">`.
- [ ] Delete the footer note: `<span>Concept mockup · not the official site</span>`.
- [ ] Rewrite `README.md`. It says the site is a concept and not the official club site.
- [ ] Decide what happens to the sample data. With all four Sheet links set it never shows, so it can stay as a safety net or be deleted: `SAMPLE_FIXTURES`, `SAMPLE_NEWS`, `SAMPLE_BIZ` and `CLUB.lotto.sample`.

## 4. Move everything off Squarespace

The current site is on Squarespace. Anything still loaded from it breaks when the club cancels that plan.

- [ ] **Club crest.** The header loads the crest from `images.squarespace-cdn.com`. Save the image into this repo, for example as `assets/crest.png`, and point the `<img>` in the header at it.
- [ ] **Safeguarding documents.** The Welfare panel links to two PDFs on `blessingtongaa.ie/s/`. Copy them into this repo and update the links in `CLUB.pages.welfare`.
- [ ] **Injury claim forms.** The Player insurance panel links to four PDFs on `blessingtongaa.ie/s/`. Copy them into this repo and update the links in `CLUB.pages.insurance`.
- [ ] **Other downloads.** The current site also hosts the club constitution. Decide whether the new site needs it.
- [ ] **Forms.** The current site has forms built into Squarespace. They stop working when the plan is cancelled, and this site can't hold a form because it has no server. Rebuild each one in Google Forms, owned by a club Google account, and link to it from the site:
  - [ ] **Contact form.** The home page tells volunteers to use it. Until it is rebuilt, the site sends people to the PRO's email.
  - [ ] **Claims and expenses form** for coaches.
  - [ ] **LGFA challenge match request form.** Permission is needed so players and coaches are covered by the LGFA injury fund, so this one must work on launch day.
  - [ ] **Camp registration form**, if camps still use it. The Easter camp page already sends people to Clubforce.
  - [ ] Each form sends its answers to the right club officer, not to a personal account.
  - [ ] Each form that asks for names, phone numbers or children's details says who sees the answers and how long they are kept.
- [ ] **Old addresses.** List the current site's page addresses that people have bookmarked or shared, for example `/lotto` and `/membership`. GitHub Pages can't redirect them, so tell the club which ones will stop working.

## 5. Connect the club's domain

- [ ] In the repo, go to **Settings > Pages > Custom domain**, enter `blessingtongaa.ie` and save. This adds a `CNAME` file to the repo.
- [ ] At the domain registrar, point the domain at GitHub Pages. Follow GitHub's guide: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- [ ] Wait for the DNS check in **Settings > Pages** to pass, then select **Enforce HTTPS**.
- [ ] Check that both `blessingtongaa.ie` and `www.blessingtongaa.ie` open the new site.
- [ ] Check that club email addresses still work. Changing the website records must not change the mail records.
- [ ] Only then cancel the Squarespace plan.

## 6. Add Search Console

- [ ] Add the domain as a property in [Google Search Console](https://search.google.com/search-console) and verify it with the DNS record that Google gives you.
- [ ] Use **URL inspection** on the home page and select **Request indexing**.
- [ ] A week later, check that the home page is indexed and that no "noindex" warning shows.

## 7. Check the live site

- [ ] Open the site on a phone and on a desktop. Nothing overlaps or runs off the screen.
- [ ] The browser console shows no errors.
- [ ] Every link works. No link points to `#` alone.
- [ ] The three shop links, the Clubforce membership link and the Clubforce lotto link open the right pages.
- [ ] The page title and description in the `<head>` are right for search results.

## 8. Hand over to the club

After launch the club keeps the Sheet up to date. Bixbo changes only the website itself:
new pages or sections, design, membership types, the domain, and fixes.

### Move ownership to the club

- [ ] The club has a role Google account that isn't tied to one person, for example `pro.blessingtongaa@gmail.com`. Its password is kept by the secretary as well as the PRO.
- [ ] In Apps Script, open **Triggers** (the clock icon) and delete every trigger listed under Patrick's account. If you skip this, each form post is handled twice: once as Patrick and once as the club.
- [ ] Transfer ownership of the Sheet and of the two forms ("post news" and "add a result") to the club account: **Share**, set the club account as an editor, then change its role to **Owner**. The club account accepts each transfer from its email.
- [ ] Signed in as the club account, open the Sheet and choose **Website > Set up or repair the Sheet**. Approve the Google permission screen (**Advanced > Go to project > Select all > Allow**). The form handlers and the daily refresh now run as the club.
- [ ] Post one test story from the "Post news" form, signed in as the club account. It appears once in the News tab. Delete the test row.
- [ ] The Sheet is still published (**File > Share > Publish to web** says "published"), and the link in `CLUB.sheet` hasn't changed.

### Add editors

- [ ] Share the Sheet as an editor with 2 or 3 people, for example the PRO, the secretary and the lotto organiser. One person leaving must not stop updates.
- [ ] Each editor opens both form links once, signed in to the Google account they shared with. Only editors' posts count.
- [ ] Decide whether Patrick keeps editor access for support. If not, remove it after the handover call.

### Hold a 20-minute handover call

- [ ] Show the PRO, on their phone: post a news story, and add a result with the "Add a result" form.
- [ ] Add one fixture row together in the Fixtures tab, and show a red row and how to fix it.
- [ ] Point out the "How to" tab and the **Website** menu.
- [ ] Save both form links to the PRO's phone home screen.
- [ ] Agree who adds fixtures each week, and who adds the lotto row after each draw.

### Keep it fresh

Fixtures are the most work and change the most. If they fall behind, the site shows old games.

- [ ] Agree a monthly check-in: Patrick looks at the site and messages the PRO if fixtures or the lotto look stale.
- [ ] Check whether Foireann or ClubZap offer a public fixtures feed that could fill the Fixtures tab automatically (see the template's `BACKLOG.md`).

## Facts to confirm

These claims are on the page but could not be matched to the current club site on 2026-11-13.

| Where on the page | Claim | What the current site says |
|---|---|---|
| Hero, and the story timeline | "Four county senior titles" | The Our Club page says "(3)" but then lists four years: 1915, 1983, 2021, 2023 |
| Story timeline, 2026 | Planning permission granted for the new clubhouse | The Development page describes the plan but gives no planning status |
| Ticker | "New clubhouse approved" | Same as above |
| Sample news card | "Planning granted by Wicklow County Council" | Same as above. The card is labelled "sample" and goes when the News sheet is live |
| Story timeline, 2020 | Inclusion All-Stars began in 2020 | The Healthy Club page says All-Stars started during the club's Healthy Club Project, which began in December 2019 and ran 18 months. So 2020 or 2021 |
| Story timeline, 1940s | St. Mark's Cross was moved when the valley was flooded | The Our Club page confirms the story but gives no date |
| Pathways, "My child" | "Garda-vetted coaches" | The Child Protection page says the Children's Officer oversees vetting. It does not say that every coach is vetted |
| Lotto section | The draw is on Tuesdays | The Lotto page says "bi-weekly". Tuesday comes from the two draw dates shown, 27 October and 10 November 2026 |
| Academy panel | No price is shown | The Academy page says €50 for 2025. The Membership page says "Academy Child €60" for 2026 |
| Welfare panel | No Children's Officer is named | The Executive Committee page names Rachel O'Donovan. The Child Protection page names Laura Power |
| Committee panel | The 2025 committee | The Executive Committee page is headed 2025 |
