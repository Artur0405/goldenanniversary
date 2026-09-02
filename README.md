# Ոսկե Հարսանիք — Golden Anniversary Invitation

A premium, fully responsive 50th wedding anniversary invitation website.
Plain **HTML5 + CSS3 + vanilla JavaScript** — no frameworks, no build step.
All guest-facing text is in **Armenian**.

```
hraviratoms/
├── index.html                 ← all page content & text
├── css/style.css              ← the entire design system
├── js/script.js               ← animations (CONFIG block at the top)
└── images/                    ← the photographs (see images/README.md)
```

Open `index.html` in a browser and it works immediately — no server required.

---

## 1. What to replace

Every spot that needs your real details is marked in the source with a
`<!-- REPLACE: ... -->` comment. Search for `REPLACE` in `index.html`.

| What | Where |
|---|---|
| **Couple's names** (`Սուրիկ & Արևիկ`) | `index.html` — envelope card, hero, invitation signature, footer |
| **Years** (`1976 — 2026`) | envelope card, hero, footer |
| **Date / time / venue** | `index.html` → hero `.hero__meta` and the three `.detail` cards |
| **Map link** (Yandex Maps) | `.detail__link` `href` in the Վայր card |
| **Numbers** (50 years, 3 children, 7 grandchildren, 18 262 days) | `.stat` items — edit both the `data-count` attribute and the Armenian label |
| **Gallery captions** | `<figcaption class="photo-frame__cap">` — one per photo |
| **Countdown target date** | `js/script.js` → `CONFIG.EVENT_DATE` |
| **Page title / browser tab** | `<title>` in `index.html` |

> ⚠️ `CONFIG.EVENT_DATE` uses a **zero-based month**:
> `new Date(2026, 8, 24, 17, 30)` = **24 September 2026, 17:30**.
> 0 = January, 8 = September, 11 = December.
> Change the date in three places: `CONFIG.EVENT_DATE`, the hero line, and the
> Ամսաթիվ card (including its weekday, currently `Հինգշաբթի`).

---

## 2. Photos

The nine real photographs in `images/` are all in use — see
[`images/README.md`](images/README.md) for which photo sits where and how to
swap or add more.

The gallery is a banded grid (four portraits, then three landscapes, then two
large landscapes) so every row is homogeneous and the block ends flush. Photos
fade in as they load, zoom gently on hover, and open in a lightbox when
clicked. `Photo_9.jpeg` does double duty as the parallax band behind the quote,
set in `css/style.css`, section **9. QUOTE (PARALLAX)**.

---

## 3. Deploying the site

Any static host works — the site is just files.

* **Netlify (easiest):** <https://app.netlify.com/drop> → drag the whole
  `hraviratoms` folder onto the page. Live in seconds, free HTTPS.
* **GitHub Pages:** push the folder to a repo → *Settings → Pages* →
  Source: `main` / root.
* **Vercel / Cloudflare Pages:** import the folder, no build command, output
  directory = the project root.
* **Own hosting:** upload `index.html`, `css/`, `js/`, `images/` via FTP,
  keeping the folder structure. (The `README.md` files are documentation only —
  they don't need to be uploaded.)

Send guests the resulting link, e.g. `https://voske-harsaniq.netlify.app`.

### Testing on your phone during development

From the project folder, run `python3 -m http.server 8811 --bind 0.0.0.0`,
then open `http://<your-mac-ip>:8811/index.html` on a phone connected to the
same Wi-Fi. (`ipconfig getifaddr en0` prints the IP.)

---

## 4. What's inside

**Page sections** — envelope opening animation → hero → invitation message,
event details and countdown → parallax quote band → statistics → photo gallery
→ footer.

**Experience**
* Envelope opening animation with a wax seal — the invitation card lifts out of the envelope
* Floating golden particles (canvas, disabled on `prefers-reduced-motion`)
* Scroll-reveal for every section, staggered with `data-delay`
* Live countdown to the celebration, with an Armenian "today is the day" state
* Animated statistics counters
* Parallax quote band
* Photo lightbox with keyboard support (`Esc` to close)

**Accessibility & robustness**
* Semantic HTML, `lang="hy"`, ARIA labels, visible focus rings
* Full `prefers-reduced-motion` support (all animation disabled)
* Print stylesheet
* Fonts: *Noto Serif Armenian* + *Noto Sans Armenian* (complete Armenian
  coverage) with *Cormorant Garamond* for numerals
* Tested layout breakpoints: 980 px, 860 px, 560 px
