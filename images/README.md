# images/

The real photographs live here. Nine are currently in use, and **every one of
them appears on the site**.

| File | Where it appears | Orientation |
|---|---|---|
| `Photo_1.jpeg` | Gallery · portrait band, 1st | portrait |
| `Photo_2.jpeg` | Gallery · portrait band, 2nd | portrait |
| `Photo_3.jpeg` | Gallery · portrait band, 3rd | portrait |
| `Photo_7.webp` | Gallery · portrait band, 4th | portrait |
| `Photo_4.jpeg` | Gallery · landscape band, 1st | landscape |
| `Photo_5.jpeg` | Gallery · landscape band, 2nd | landscape |
| `Photo_6.jpeg` | Gallery · landscape band, 3rd | landscape |
| `Photo_8.jpeg` | Gallery · large band, left | landscape |
| `Photo_9.jpeg` | Gallery · large band, right **and** the full-width parallax band behind the quote | landscape |

## Layout logic

The gallery is a banded grid, so every row is homogeneous and the block always
ends flush — no ragged edge:

* **Band A** — four portrait tiles (`2 / 3`)
* **Band B** — three landscape tiles (`3 / 2`)
* **Band C** — two large landscape tiles (`3 / 2`)

On tablets it drops to two columns (the last photo spans the full width to
close the grid), and on phones to a single column.

## Adding or swapping photos

* **To swap a photo:** replace the file, keeping the same name. Nothing else
  changes. If the new photo has a different orientation, move its `<figure>`
  into the matching band in `index.html` so the row stays homogeneous.
* **To add photos:** copy an existing `<figure>` in the `.gallery` block of
  `index.html` and give it the right class —
  `gallery__item--portrait`, `gallery__item--land`, or `gallery__item--land-lg`.
  Keep band A at a multiple of 4, band B at a multiple of 3, and band C at a
  multiple of 2, so each row fills completely.
* Set `width` and `height` on the `<img>` to the file's real pixel size — it
  reserves space and prevents layout shift while the photo loads.
* The photo behind the quote is a CSS background, set in `css/style.css`,
  section **9. QUOTE (PARALLAX)**.
* Captions are the `<figcaption class="photo-frame__cap">` next to each photo.

## Tips

* Keep files at roughly **200–500 KB** each; long edge ≈ 1600 px is plenty.
  `Photo_7.webp` is the heaviest at 564 KB and could be compressed further.
* Tiles crop with `object-fit: cover`, so keep faces near the centre of frame.
* A photo whose file is missing removes its own tile automatically rather than
  leaving an empty gap.
