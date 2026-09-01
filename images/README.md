# images/

Drop the real photographs here using **exactly these file names**. Any file that
is missing simply shows an elegant gold placeholder instead — nothing breaks.

| File name          | Where it appears                    | Suggested size / crop        |
|--------------------|-------------------------------------|------------------------------|
| `story-1.jpg`      | Timeline · 1974 «Առաջին հանդիպումը»  | 1200 × 900 (4:3, landscape)  |
| `story-2.jpg`      | Timeline · 1976 «Մեր հարսանիքի օրը»  | 1200 × 900 (4:3)             |
| `story-3.jpg`      | Timeline · 1979 «Ընտանիքի ծնունդը»   | 1200 × 900 (4:3)             |
| `story-4.jpg`      | Timeline · 2005 «Թոռների ժամանակը»   | 1200 × 900 (4:3)             |
| `story-5.jpg`      | Timeline · 2026 «Ոսկե հարսանիք»      | 1200 × 900 (4:3)             |
| `gallery-1.jpg`    | Gallery · tall tile (left column)    | 900 × 1400 (portrait)        |
| `gallery-2.jpg`    | Gallery                              | 1200 × 900                   |
| `gallery-3.jpg`    | Gallery                              | 1200 × 900                   |
| `gallery-4.jpg`    | Gallery · wide tile (2 columns)      | 1800 × 900 (panoramic)       |
| `gallery-5.jpg`    | Gallery                              | 1200 × 900                   |
| `gallery-6.jpg`    | Gallery                              | 1200 × 900                   |
| `quote.jpg`        | Full-width parallax band behind the quote | 2000 × 1200, works best with a calm, low-contrast photo (a dark gold veil is laid over it) |

## Tips

* **JPG, ~200–500 KB each.** Large photos slow the page down badly on phones —
  resize before uploading (long edge ≈ 1600 px is plenty).
* Faces should sit near the **centre** of the frame: tiles are cropped with
  `object-fit: cover`, so the edges may be trimmed on narrow screens.
* Prefer `.jpg`. If you use another extension (`.png`, `.jpeg`, `.webp`), update
  the `src` attributes in `index.html` — and, for `quote.jpg`, the
  `background-image` URL in `css/style.css` (section 10).
* Captions live in `index.html` next to each photo (`<figcaption class="photo-frame__cap">`).
