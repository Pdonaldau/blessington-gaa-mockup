# Setting up the club Google Sheet

The website reads fixtures, results, news and the lotto from one Google Sheet.
You update the Sheet; the website updates itself. Nobody needs to touch the website.

The Sheet has three tabs:

| Tab | What it drives on the website |
|---|---|
| Fixtures | The fixtures and results lists, and the "Next match" countdown |
| News | The news cards under "Right now" |
| Lotto | The jackpot, the last draw's numbers and the result |

Setup takes about 15 minutes and is done once.

## 1. Create the Sheet

1. Go to [sheets.new](https://sheets.new) to make a blank Sheet. Name it "Blessington GAA website".
2. For each file in the `sheet-template` folder (`fixtures.csv`, `news.csv`, `lotto.csv`):
   1. Choose **File > Import > Upload** and pick the file.
   2. Under **Import location**, choose **Insert new sheet(s)**. Select **Import data**.
3. Rename the three new tabs to **Fixtures**, **News** and **Lotto**. Delete the empty first tab.

Each tab now has the right column headings and two example rows.
Keep the headings exactly as they are. Replace the example rows with real ones.

## 2. Set the date format

Do this on the **Date** column of Fixtures and News, and on **Draw date** and **Next draw** of Lotto.

1. Select the column by clicking its letter.
2. Choose **Format > Number > Custom date and time**.
3. Clear the box, type `yyyy-mm-dd` and select **Apply**.

A date now looks like `2027-02-07`. You can still type `7/2/2027` and the Sheet converts it.

The website also understands `07/02/2027`, read the Irish way with the day first.

## 3. Add the dropdowns

Dropdowns stop spelling mistakes. Do each one like this:

1. Select the column by clicking its letter.
2. Choose **Data > Data validation > Add rule**.
3. Under **Criteria**, choose **Dropdown** and add the options below.
4. Select **Done**.

| Tab | Column | Options |
|---|---|---|
| Fixtures | Section | `Men`, `Ladies`, `Juvenile`, `Hurling` |
| Fixtures | Home or Away | `Home`, `Away` |
| Fixtures | Result | `W`, `L`, `D` |

The Sheet shows a warning on the heading cell, because "Section" is not one of the options. You can ignore the warning.

**Section** decides which filter button a game appears under on the website.
**Team** is free text and is what visitors read, for example `U14 Boys` or `Adult Men - League`.

## 4. Publish each tab

Publish each of the three tabs on its own, so that each tab gets its own link.

1. Choose **File > Share > Publish to web**.
2. In the first dropdown, choose the tab, for example **Fixtures**. Don't leave it on "Entire document".
3. In the second dropdown, choose **Comma-separated values (.csv)**.
4. Select **Publish**, then **OK**.
5. Copy the link. It ends in `output=csv`.
6. Repeat for the News tab and the Lotto tab.

Send the three links to Patrick. He pastes them into `CLUB.sheets` at the top of the script in `index.html`:

```js
sheets: { fixtures: 'https://docs.google.com/...', news: 'https://docs.google.com/...', lotto: 'https://docs.google.com/...' },
```

A published tab can be read by anyone who has the link.
Don't put phone numbers, children's names or anything private in the Sheet.

## Using the Sheet week to week

Changes show on the website within about five minutes. Visitors may need to refresh the page.

### Fixtures

- Add one row for each game. Leave **Score** and **Result** empty.
- After the game, type the score into the same row and pick the result. Don't move the row. The website moves the game from "Upcoming" to "Results" itself.
- **Time** is 24-hour, for example `14:00`. `2pm` also works.
- **Score** is free text. Put the Blessington score first, for example `2-11 v 1-09`.
- A game with no score, on a day that has passed, shows as "Result to come".
- Old rows can stay. Delete them at the end of the season if the list gets long.

### News

- Add one row for each story. The two newest rows, by date, show on the website.
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
- **Next draw** is normally empty. The website works out the next draw from the fortnightly rule. Fill it in only when a draw moves, for example at Christmas.

## If something goes wrong

| What you see on the website | What it means | What to do |
|---|---|---|
| A "sample" label | That tab's link has not been pasted into the website yet | Send Patrick the link |
| "Fixtures are unavailable right now" | The website can't read the tab | Check that the tab is still published as CSV, and that the heading row has not changed |
| A game is missing | The website can't read that row's date | Check the Date cell |
| A game is under the wrong filter | The Section cell is wrong | Pick the right option from the dropdown |

The website never shows broken data. If it can't read a tab, it tells visitors to check the club Facebook page.
