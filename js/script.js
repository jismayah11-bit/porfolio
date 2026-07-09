/* =========================================================
   PORTFOLIO — Scripts
   - Thèmes (dark/light, persistance, détection système)
   - Menu mobile
   - Reveal au scroll (IntersectionObserver)
   - Particules canvas (légères, mobile-friendly)
   - Formulaire de contact (validation basique)
   ========================================================= */

(() => {
  'use strict';

  /* ---------- THÈMES ---------- */
  const THEME_KEY = 'portfolio-theme';
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#eef1f7' : '#070912');
  };

  const stored = localStorage.getItem(THEME_KEY);
  applyTheme(stored || getSystemTheme());

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  // Suivi du thème système si l'utilisateur n'a pas choisi
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'light' : 'dark');
  });

  /* ---------- MENU MOBILE ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    if (open) {
      mobileMenu.hidden = true;
    } else {
      mobileMenu.hidden = false;
    }
  });

  mobileMenu?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      mobileMenu.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- REVEAL AU SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));

  /* ---------- ICÔNES FLOTTANTES CANVAS ---------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas?.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particles = [];
  let raf;

  // Logos de logiciels (via CDN Simple Icons, SVG colorés par marque)
  const ICON_SOURCES = [
    { slug: 'adobephotoshop',     color: '31A8FF' },
    { slug: 'adobepremierepro',   color: '9999FF' },
    { slug: 'adobeillustrator',   color: 'FF9A00' },
    { slug: 'adobeaftereffects',  color: '9999FF' },
    { slug: 'adobeindesign',      color: 'FF3366' },
    { slug: 'adobelightroom',     color: '31A8FF' },
    { slug: 'canva',              color: '00C4CC' },
    { slug: 'figma',              color: 'F24E1E' },
    { slug: 'sketch',             color: 'F7B500' },
    { slug: 'blender',            color: 'F5792A' },
    { slug: 'davinciresolve',     color: 'FF6B6B' },
  ];

  const iconImages = ICON_SOURCES.map((i) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `https://cdn.simpleicons.org/${i.slug}/${i.color}`;
    return img;
  });

  const resizeCanvas = () => {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const initParticles = () => {
    const count = window.innerWidth < 768 ? 14 : 26;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 22 + 22,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.35 + 0.4,
      rot: (Math.random() - 0.5) * 0.4,
      vr: (Math.random() - 0.5) * 0.003,
      icon: iconImages[Math.floor(Math.random() * iconImages.length)],
    }));
  };

  const drawParticles = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      if (p.x < -p.size) p.x = window.innerWidth + p.size;
      if (p.x > window.innerWidth + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = window.innerHeight + p.size;
      if (p.y > window.innerHeight + p.size) p.y = -p.size;
      if (!p.icon.complete || p.icon.naturalWidth === 0) return;
      ctx.save();
      ctx.globalAlpha = p.o;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.drawImage(p.icon, -p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(drawParticles);
  };

  if (canvas && !reduceMotion) {
    resizeCanvas();
    initParticles();
    drawParticles();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      resizeCanvas();
      initParticles();
      drawParticles();
    });
    iconImages.forEach((img) => { img.onload = () => {}; });
  }

  /* ---------- FORMULAIRE ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) {
      status.textContent = 'Merci de remplir tous les champs.';
      status.style.color = 'tomato';
      return;
    }
    status.style.color = '';
    status.textContent = 'Message envoyé avec succès ! Je vous réponds rapidement.';
    form.reset();
  });

  /* ---------- ANNÉE FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
