# Setting up the club Google Sheet

The website reads its changing content from one Google Sheet. You update the Sheet; the
website updates itself. Nobody needs to touch the website.

The Sheet has six tabs, plus a "How to" tab:

| Tab | What it drives on the website |
|---|---|
| Fixtures | The fixtures and results lists, and the "Next match" countdown |
| News | The news cards under "Right now" |
| Lotto | The jackpot, the last draw's numbers and the result |
| Directory | The business directory panel: local businesses and sponsors |
| Club | The lotto draw rule, membership prices, the family cap, the ticker messages and the shop note |
| Pages | The text of the club pages: Academy, Juvenile, Committee, Welfare and the rest |

Setup takes about 15 minutes and is done once. A script does most of it.

## 1. Create the Sheet and run the setup script

1. Go to [sheets.new](https://sheets.new) to make a blank Sheet. Name it "Blessington GAA website".
2. Choose **Extensions > Apps Script**. A code editor opens in a new tab.
3. Delete the few lines already in the editor. Open `sheet-template/setup.gs`, copy all of it, and paste it in.
4. Select **Save** (the disk icon).
5. In the function list at the top, choose **setUpWebsiteSheet**, then select **Run**.
6. Google asks for permission. Choose your account, then **Advanced > Go to project (unsafe)**.
   If Google lists the permissions with tick boxes, tick **Select all**. Then select **Allow**.
   Google shows this warning for any script that isn't published in its store. The script runs only in your Sheet.
7. Go back to the Sheet tab. After about a minute, a "Done" box shows the links to two phone forms. Select **OK**.
   If no box shows, reload the Sheet and choose **Website > Set up or repair the Sheet**. It is safe to run again.

The script:

- makes the six tabs with the right headings, and a "How to" tab
- fills the Club and Pages tabs with the text the website shows today, so you edit rather than retype
- sets Irish dates, so `7/2/2027` means 7 February
- adds dropdowns and date checks, and turns a row red when something in it is wrong
- protects the heading row: the Sheet warns you before anyone changes a heading
- makes two phone forms, "Post news" and "Add a result"

The Sheet also gets a **Website** menu. Use **Website > Set up or repair the Sheet** if the
checks ever stop working. It never deletes rows.

## 2. Add the first rows

Fixtures, News, Lotto and Directory start empty. Before you publish:

- add the coming fixtures
- add one or two news stories
- add the last lotto draw. Until there is one draw, the website says the lotto is unavailable.
- add the directory businesses that have agreed to be listed

## 3. Publish each tab

Publish each of the six tabs on its own, so that each tab gets its own link.
Don't publish the "How to" tab.

1. Choose **File > Share > Publish to web**.
2. In the first dropdown, choose the tab, for example **Fixtures**. Don't leave it on "Entire document".
3. In the second dropdown, choose **Comma-separated values (.csv)**.
4. Select **Publish**, then **OK**.
5. Copy the link. It ends in `output=csv`.
6. Repeat for News, Lotto, Directory, Club and Pages.

Send the six links to Patrick. He pastes them into `CLUB.sheets` at the top of the script in `index.html`:

```js
sheets: { fixtures: 'https://docs.google.com/...', news: '...', lotto: '...', directory: '...', club: '...', pages: '...' },
```

A published tab can be read by anyone who has the link.
Don't put private phone numbers, children's names or anything private in the Sheet.
The Directory tab is the exception for business contact details: list only what each business has agreed to publish.
The Pages tab holds the contacts the club pages show today. Check each person is happy to be listed.

## Using the Sheet week to week

Changes show on the website within about five minutes. Visitors may need to refresh the page.

### On your phone: the two forms

The links are on the "How to" tab. Open each one on your phone and add it to your home screen.

- **Post news** adds a row to the News tab: headline, summary, tag, an optional link and an optional date.
- **Add a result** lists the games from the last three weeks that have no score. Pick the game, type the
  score and pick Win, Loss or Draw. The score goes into that game's row.

Sign in with a Google account that can edit the Sheet. A post from any other account is ignored,
so a stranger who finds a form link can't post to the website. To let another person post, share the
Sheet with them as an editor.

The list of games in "Add a result" refreshes when the Fixtures tab changes, after each result, and every
morning. To refresh it by hand, choose **Website > Refresh the result form**.

### Red rows

A red row has a problem, for example a date the website can't read, a result with no score, or a
setting name the website doesn't know. The website may skip that row. Fix the cell and the red goes.

### Fixtures

- Add one row for each game. Leave **Score** and **Result** empty.
- After the game, type the score into the same row and pick the result, or use the "Add a result" form. Don't move the row. The website moves the game from "Upcoming" to "Results" itself.
- **Section** decides which filter button a game appears under. **Team** is free text and is what visitors read, for example `U14 Boys` or `Adult Men - League`.
- **Time** is 24-hour, for example `14:00`. `2pm` also works.
- **Score** puts the Blessington score first, for example `2-11 v 1-09`.
- A game with no score, on a day that has passed, shows as "Result to come".
- Old rows can stay. Delete them at the end of the season if the list gets long.

### News

- Add one row for each story, or use the "Post news" form. The two newest rows, by date, show on the website.
- **Headline** is needed. Keep it short, about six words.
- **Summary** is one or two sentences.
- **Link** is optional. Paste a full web address that starts with `https://`, for example a Facebook post.
- If there are fewer than two stories, standing club cards fill the gap.

### Lotto

- After each draw, add one row.
- **Draw date** is the date of the draw you are reporting.
- **Numbers** are the numbers drawn, with spaces between them, for example `4 9 17 22`.
- **Next jackpot** is the jackpot for the next draw. Digits only, for example `8400`.
- **Result** is short text, for example `No winner` or `One winner`.
- **Next draw** is normally empty. The website works out the next draw from the rule on the Club tab. Fill it in only when a draw moves, for example at Christmas.

### Directory

- Add one row for each business. **Name** and **Category** are needed. Every other cell is optional.
- **Category** becomes a filter button. Pick one from the list, or type a new one. Spell it the same way every time.
- **Tier** decides the order. A `Main sponsor` comes first, with a gold border. A `Sponsor` comes next, then a `Member` business.
- **Phone** shows a "Call" button. Type it the way people read it, for example `045 123 456`.
- **Website**, **Facebook** and **Instagram** are full web addresses. `www.example.ie` also works.
- **Address** shows a "Map" button that opens Google Maps.
- **Logo** is optional. Paste a web address of the logo image that starts with `https://`. With no logo, the card shows the business's initials.
- To remove a business, delete its row.

### Club

Change the **Value** column only. The setting names must stay exactly as they are.

| Setting | Value |
|---|---|
| Lotto first draw | Any one past draw date. The website counts forward from it. |
| Lotto days between draws | `14` for a fortnightly draw, `7` for weekly |
| Lotto draw time | 24-hour, for example `20:00`. Empty counts down to the draw day. |
| Lotto match 3 prize | Digits only, for example `300` |
| Family cap | The most a family pays, digits only |
| Price: Adult (and the other `Price:` rows) | The price of that membership type, digits only. A new membership type needs a website change. |
| Ticker | One message for the scrolling strip under the video. Add a row for each message. |
| Shop note | The note under the shop buttons. Empty hides it. |

### Pages

One row is one piece of a club page.

- **Page** is the page title, for example `Committee`. A new page needs a website change.
- **Section** is a heading on the page. `Intro` is the opening text, with no heading.
  `To come` rows show as "Content to come from the club". Delete one when it's done.
- **Label** and **Text**: with a Label, the row is a line in a two-column list, for example `Chairperson` and a name.
  A Label of `-` makes a bullet point. An empty Label makes a paragraph.
- Rows show in the order they are in the tab.
- A page with no rows in the tab keeps the text built into the website.

Buttons and links on the pages are part of the website. Ask Patrick to change them.

## If something goes wrong

| What you see on the website | What it means | What to do |
|---|---|---|
| A "sample" label | That tab's link has not been pasted into the website yet | Send Patrick the link |
| "Fixtures are unavailable right now" or "The directory is unavailable right now" | The website can't read the tab | Check that the tab is still published as CSV, and that the heading row has not changed |
| "This page may be out of date" on a club page | The website can't read the Pages tab | Check that the Pages tab is still published as CSV |
| A game is missing | The website can't read that row's date | Look for a red row |
| A game is under the wrong filter | The Section cell is wrong | Pick the right option from the dropdown |
| A form post didn't appear | It was sent from an account that can't edit the Sheet, or the tab isn't published | Post again signed in with your editor account |

The website never shows broken data. If it can't read a tab, it tells visitors to check the club
Facebook page. If it can't read the Club tab, it uses the settings built into the website.
