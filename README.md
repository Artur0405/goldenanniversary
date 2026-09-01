# Ոսկե Հարսանիք — Golden Anniversary Invitation

A premium, fully responsive 50th wedding anniversary invitation website.
Plain **HTML5 + CSS3 + vanilla JavaScript** — no frameworks, no build step.
All guest-facing text is in **Armenian**.

```
hraviratoms/
├── index.html                 ← all page content & text
├── css/style.css              ← the entire design system
├── js/script.js               ← animations (CONFIG block at the top)
└── images/                    ← put the real photos here (see images/README.md)
```

Open `index.html` in a browser and it works immediately — no server required.

---

## 1. What to replace

Every spot that needs your real details is marked in the source with a
`<!-- REPLACE: ... -->` comment. Search for `REPLACE` in `index.html`.

| What | Where |
|---|---|
| **Couple's names** (`Արամ & Անահիտ`) | `index.html` — envelope card, hero, footer (3 places) |
| **Years** (`1976 — 2026`) | envelope card, hero, footer |
| **Date / time / venue / dress code** | `index.html` → hero `.hero__meta` and the four `.detail` cards |
| **Google Maps link** | `.detail__link` `href` in the Վայր card |
| **Story / timeline text and years** | `#story` section — five `.timeline__item` blocks |
| **Numbers** (50 years, 3 children, 7 grandchildren, 18 262 days) | `.stat` items — edit both the `data-count` attribute and the Armenian label |
| **Gallery captions** | `<figcaption class="photo-frame__cap">` |
| **Countdown target date** | `js/script.js` → `CONFIG.EVENT_DATE` |
| **Page title / browser tab** | `<title>` in `index.html` |

> ⚠️ `CONFIG.EVENT_DATE` uses a **zero-based month**:
> `new Date(2026, 9, 12, 18, 0)` = **12 October 2026, 18:00**.
> 0 = January, 9 = October, 11 = December.

---

## 2. Photos

Drop the real photographs into `images/` with the file names listed in
[`images/README.md`](images/README.md) — `story-1.jpg … story-5.jpg`,
`gallery-1.jpg … gallery-6.jpg`, `quote.jpg`.

Nothing else needs changing: each `<img>` already points at its final path, and
a decorative gold placeholder (with the expected file name printed on it) is
shown for any photo that is not there yet. Once a photo loads it fades in,
gains a hover zoom, and becomes clickable (opens in a lightbox).

To use different names or formats, edit the `src` attribute of the relevant
`<img>` in `index.html`. `quote.jpg` is the one exception — it is a CSS
background, set in `css/style.css`, section **9. QUOTE (PARALLAX)**.

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
event details and countdown → parallax quote band → story timeline →
statistics → photo gallery → footer.

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
