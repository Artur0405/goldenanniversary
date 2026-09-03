# images/

Eight photographs, all of them shown on the site. They appear **without any
caption or text overlay** — alt text is present for screen readers only.

| File | Where it appears | Orientation |
|---|---|---|
| `Photo_1.jpeg` | Gallery · portrait band, 1st | portrait |
| `Photo_2.jpeg` | Gallery · portrait band, 2nd | portrait |
| `Photo_3.jpeg` | Gallery · portrait band, 3rd | portrait |
| `Photo_7.webp` | Gallery · portrait band, 4th | portrait |
| `Photo_4.jpeg` | Gallery · landscape row 1, left | landscape |
| `Photo_5.jpeg` | Gallery · landscape row 1, right **and** the parallax band behind the quote | landscape |
| `Photo_6.jpeg` | Gallery · landscape row 2, left | landscape |
| `Photo_8.jpeg` | Gallery · landscape row 2, right | landscape |

## Layout logic

The gallery is a 12-column grid in homogeneous bands, so it always ends flush —
no ragged edge and no empty cells:

* **Band A** — four portrait tiles (`span 3`, ratio `2 / 3`)
* **Bands B & C** — two rows of two large landscape tiles (`span 6`, ratio `3 / 2`)

Rows per breakpoint: `4, 2, 2` above 860px · `2, 2, 2, 2` on tablets ·
one per row on phones.

## Adding or swapping photos

* **To swap a photo:** replace the file, keeping the same name. If the new photo
  has a different orientation, move its `<figure>` into the matching band so the
  row stays homogeneous.
* **To add photos:** copy an existing `<figure>` in the `.gallery` block of
  `index.html` and give it the right class — `gallery__item--portrait`
  (`span 3`) or `gallery__item--land-lg` (`span 6`). Keep portraits a multiple
  of 4 and landscapes a multiple of 2 so every row fills completely.
* Set `width` and `height` on the `<img>` to the file's real pixel size — it
  reserves space and prevents layout shift while the photo loads.
* The photo behind the quote is a CSS background, set in `css/style.css`,
  section **9. QUOTE (PARALLAX)**.

## Tips

* Keep files at roughly **200–500 KB** each; long edge ≈ 1600 px is plenty.
  `Photo_7.webp` is the heaviest at 564 KB and could be compressed further.
* Tiles crop with `object-fit: cover`, so keep faces near the centre of frame.
* A photo whose file is missing removes its own tile automatically rather than
  leaving an empty gap.
* Clicking a photo opens it full-size in a lightbox (`Esc` closes it).
