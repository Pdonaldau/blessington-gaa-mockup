# Sponsor list check

Checked 2026-11-13 against [blessingtongaa.ie](https://blessingtongaa.ie).
Nothing in `CLUB.sponsors` was added or removed. Patrick confirms each difference below with the club.

## How the check was done

The current site shows sponsors as logo images with no names and no alt text.
The only clue to each sponsor is the image file name, for example `aif.png`.
So each match below is a best reading of a file name, not a confirmed name.

Sponsors appear in four places on the current site:

- The logo strip on the home page.
- The Sponsors page.
- The Adult Mens and Adult Womens team pages.
- The Academy and Inclusion All Stars pages.

## Names that match

| In `CLUB.sponsors` | Logo file on the current site | Where it appears |
|---|---|---|
| All In Fitness | `aif.png` | Home, Sponsors page, adult team pages |
| Brew 21 | `brew.png` | Home, Sponsors page, adult team pages |
| Renault | `renault.png` | Home |
| Dacia | `dacia.png` | Home |
| Grant Thornton | `grantthornton.png` | Home |
| Credit Union | `creditunion.png` | Home |
| BD Safety | `bdsafety.png` | Home |
| Kärcher | `karcher.png` | Home |
| Sports Direct | `Sports_Direct_Logo_Colour_RGB.png` | Home, Sponsors page |
| Glenveagh | `glenveagh.png` | Home |
| DAR | `dar.png` | Home |

## Differences to confirm

| # | Difference | Question for the club |
|---|---|---|
| 1 | The home page strip has a logo file named `heartss.png`. No name in `CLUB.sponsors` matches it. | Who is this sponsor, and should the name be added? |
| 2 | MyCabin is in `CLUB.sponsors`. Its logo is on the Sponsors page and the adult team pages, but not in the home page strip. | Is MyCabin a current sponsor? |
| 3 | Infinity Motors is shown as the Academy sponsor on the Academy page. It is not in `CLUB.sponsors`. | Should Infinity Motors be added? |
| 4 | The Inclusion All Stars page thanks Poulaphuca pitch and putt for sponsoring hoodies "last season". It is not in `CLUB.sponsors`. | Is this sponsorship current? |
| 5 | The Sponsors page calls Sports Direct the "official club sponsor" of the juvenile club. The mockup lists all sponsors equally. | Should Sports Direct be shown first or larger? |

## Names to confirm

The file names don't give the full trading name. Confirm these three:

- **Brew 21**: the file is only `brew.png`.
- **Credit Union**: the file is only `creditunion.png`. Which credit union is it?
- **DAR**: the file is only `dar.png`. What is the full name?

## When confirmed

Edit the `sponsors` list in the `CLUB` object at the top of the script in `index.html`. Then delete this file.
