/* ==========================================================================
   Ոսկե Հարսանիք — Golden Anniversary Invitation
   script.js  ·  vanilla JavaScript, no dependencies
   --------------------------------------------------------------------------
   ⚙️  CONFIGURATION — edit the CONFIG block below only.
   ========================================================================== */

'use strict';

const CONFIG = {

  /* ------------------------------------------------------------------
     1) EVENT DATE & TIME (used by the countdown)
     Format: new Date(year, monthIndex, day, hour, minute)
     ⚠️ monthIndex is ZERO-BASED: 0 = January ... 9 = October ... 11 = December
     Below: 12 October 2026, 18:00
  ------------------------------------------------------------------ */
  EVENT_DATE: new Date(2026, 9, 12, 18, 0, 0),

  /* 2) Number of floating golden particles (0 disables them) */
  PARTICLE_COUNT: 34
};

/* ==========================================================================
   Helpers
   ========================================================================== */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Armenian digits are the same as Latin, but keep numbers padded nicely */
const pad2 = n => String(n).padStart(2, '0');

/* ==========================================================================
   1. OPENING ANIMATION (envelope)
   ========================================================================== */
function initOpening() {
  const opening = $('#opening');
  const openBtn = $('#openBtn');
  if (!opening || !openBtn) return;

  const reveal = () => {
    opening.classList.add('is-opening');
    openBtn.disabled = true;

    // Unlock the page shortly after the envelope starts opening
    window.setTimeout(() => {
      document.body.classList.remove('is-locked');
      opening.classList.add('is-closed');
      startHeroReveal();
      $('#particles') && $('#particles').classList.add('is-on');
    }, prefersReducedMotion ? 100 : 1500);

    // Remove overlay from the DOM once it has faded out
    window.setTimeout(() => opening.remove(), prefersReducedMotion ? 400 : 2800);
  };

  openBtn.addEventListener('click', reveal);

  // Enter / Space anywhere also opens the invitation
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      if (document.body.classList.contains('is-locked')) {
        e.preventDefault();
        reveal();
        document.removeEventListener('keydown', onKey);
      }
    }
  });
}

/* Stagger the hero content in after the envelope opens */
function startHeroReveal() {
  $$('#hero .reveal').forEach(el => el.classList.add('is-visible'));
}

/* ==========================================================================
   2. SCROLL REVEAL
   ========================================================================== */
function initReveal() {
  const items = $$('.reveal').filter(el => !el.closest('#hero'));

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(el => io.observe(el));
}

/* ==========================================================================
   3. COUNTDOWN
   ========================================================================== */
function initCountdown() {
  const box = $('#countdown');
  if (!box) return;

  const els = {
    days:    $('#cdDays'),
    hours:   $('#cdHours'),
    minutes: $('#cdMinutes'),
    seconds: $('#cdSeconds')
  };

  const tick = () => {
    const diff = CONFIG.EVENT_DATE.getTime() - Date.now();

    if (diff <= 0) {
      box.classList.add('is-done');
      window.clearInterval(timer);
      return;
    }

    const s = Math.floor(diff / 1000);
    els.days.textContent    = pad2(Math.floor(s / 86400));
    els.hours.textContent   = pad2(Math.floor(s / 3600) % 24);
    els.minutes.textContent = pad2(Math.floor(s / 60) % 60);
    els.seconds.textContent = pad2(s % 60);
  };

  tick();
  const timer = window.setInterval(tick, 1000);
}

/* ==========================================================================
   4. ANIMATED STAT COUNTERS
   ========================================================================== */
function initCounters() {
  const nums = $$('.stat__num');
  if (!nums.length) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    nums.forEach(el => { el.textContent = formatNum(Number(el.dataset.count)); });
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => io.observe(el));
}

function formatNum(n) {
  // Thin space as thousands separator — reads well in Armenian typography
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function countUp(el) {
  const target   = Number(el.dataset.count) || 0;
  const duration = 1800;
  const start    = performance.now();

  const step = now => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
    el.textContent = formatNum(Math.round(target * eased));
    if (p < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   5. PARALLAX
   ========================================================================== */
function initParallax() {
  const layers = $$('[data-parallax]');
  if (!layers.length || prefersReducedMotion) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    layers.forEach(layer => {
      const rect = layer.parentElement.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const speed  = parseFloat(layer.dataset.parallax) || 0.15;
      const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ==========================================================================
   6. FLOATING GOLDEN PARTICLES
   ========================================================================== */
function initParticles() {
  const canvas = $('#particles');
  if (!canvas || prefersReducedMotion || CONFIG.PARTICLE_COUNT <= 0) return;

  const ctx = canvas.getContext('2d');
  let w, h, dpr, particles = [];

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const make = () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.9 + 0.5,
    vy: -(Math.random() * 0.22 + 0.05),
    vx: (Math.random() - 0.5) * 0.14,
    a: Math.random() * 0.45 + 0.12,
    tw: Math.random() * Math.PI * 2,
    tws: Math.random() * 0.02 + 0.006
  });

  const seed = () => {
    // Fewer particles on small screens
    const count = window.innerWidth < 700
      ? Math.round(CONFIG.PARTICLE_COUNT * 0.55)
      : CONFIG.PARTICLE_COUNT;
    particles = Array.from({ length: count }, make);
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.tw += p.tws;

      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0, `rgba(214, 178, 88, ${alpha})`);
      grad.addColorStop(1, 'rgba(214, 178, 88, 0)');

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    });
    window.requestAnimationFrame(draw);
  };

  resize();
  seed();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => { resize(); seed(); }, 200);
  }, { passive: true });
}

/* ==========================================================================
   7. LIGHTBOX (only for photos that actually loaded)
   ========================================================================== */
function initLightbox() {
  const box   = $('#lightbox');
  const img   = $('#lightboxImg');
  const cap   = $('#lightboxCap');
  const close = $('#lightboxClose');
  if (!box || !img) return;

  let lastFocused = null;

  const open = (src, alt, caption) => {
    lastFocused = document.activeElement;
    img.src = src;
    img.alt = alt || '';
    cap.textContent = caption || '';
    box.hidden = false;
    document.body.classList.add('is-locked');
    window.requestAnimationFrame(() => box.classList.add('is-open'));
    close.focus();
  };

  const hide = () => {
    box.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    window.setTimeout(() => { box.hidden = true; img.src = ''; }, 400);
    lastFocused && lastFocused.focus();
  };

  document.addEventListener('click', e => {
    const frame = e.target.closest('.photo-frame');
    if (!frame) return;
    const photo = frame.querySelector('.photo.is-loaded');
    if (!photo) return;                       // placeholder → nothing to zoom
    const caption = frame.querySelector('.photo-frame__cap');
    open(photo.currentSrc || photo.src, photo.alt, caption ? caption.textContent : photo.alt);
  });

  close.addEventListener('click', hide);
  box.addEventListener('click', e => {
    // Click on the dark backdrop (not on the image or the close button) closes it
    if (e.target === box || e.target === $('.lightbox__fig', box)) hide();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !box.hidden) hide();
  });
}

/* ==========================================================================
   8. SMOOTH ANCHOR SCROLLING
   ========================================================================== */
function initAnchors() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* ==========================================================================
   9. PHOTO PLACEHOLDER SAFETY NET
   Images that failed before this script ran are removed here so the
   elegant placeholder underneath stays visible.
   ========================================================================== */
function initPhotos() {
  $$('.photo-frame .photo').forEach(img => {
    if (img.complete) {
      if (img.naturalWidth === 0) img.remove();
      else img.classList.add('is-loaded');
    }
  });
}

/* ==========================================================================
   BOOT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initPhotos();
  initOpening();
  initReveal();
  initCountdown();
  initCounters();
  initParallax();
  initParticles();
  initLightbox();
  initAnchors();

  // If the opening overlay is missing (e.g. removed by the author), unlock now
  if (!$('#opening')) {
    document.body.classList.remove('is-locked');
    startHeroReveal();
    $('#particles') && $('#particles').classList.add('is-on');
  }
});
