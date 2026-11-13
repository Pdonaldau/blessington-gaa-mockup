# Sponsor list check

First checked 2026-11-13 against [blessingtongaa.ie](https://blessingtongaa.ie). Updated 2026-11-13 with Patrick's answers.

The current site shows sponsors as logo images with no names and no alt text.
The only clue to each sponsor is the image file name, for example `aif.png`.

## Confirmed and applied

These changes are now in `CLUB.sponsors` in `index.html`.

| Logo file on the current site | Name on the mockup | Note |
|---|---|---|
| `creditunion.png` | Blessington Credit Union | Was "Credit Union" |
| `dar.png` | DAR Golf Construction | Full name is DAR Golf Construction Ltd. "Ltd" is left off the sponsor strip |
| `heartss.png` | Hearts.ie | Defibrillator supplier. Added |
| `brew.png` | Brew 21 | Brew 21 coffee shop, Blessington. No change |

These names were already right and match a logo on the current home page:
All In Fitness, Renault, Dacia, Grant Thornton, BD Safety, Kärcher, Sports Direct, Glenveagh.

## Still to confirm

| # | Difference | Question for the club |
|---|---|---|
| 1 | MyCabin is in `CLUB.sponsors`. Its logo is on the Sponsors page and the adult team pages, but not in the home page strip. | Is MyCabin a current sponsor? |
| 2 | Infinity Motors sponsors the Academy jerseys (Academy page and "Blesso Blues Infinity" page). It is not in `CLUB.sponsors`. | Should Infinity Motors be added? |
| 3 | The Inclusion All Stars page thanks Poulaphuca pitch and putt for sponsoring hoodies "last season". It is not in `CLUB.sponsors`. | Is this sponsorship current? |
| 4 | The Sponsors page calls Sports Direct the "official club sponsor" of the juvenile club. The mockup lists all sponsors equally. | Should Sports Direct be shown first or larger? |

## When confirmed

Edit the `sponsors` list in the `CLUB` object at the top of the script in `index.html`. Then delete this file.
