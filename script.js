/* KUAC redesign — interactions */

const masthead = document.getElementById('masthead');
const hero = document.querySelector('.hero');

// Flip masthead from over-dark-photo to light-fixed when we scroll past the hero
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) masthead.classList.remove('is-light');
      else masthead.classList.add('is-light');
    });
  },
  { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
);
if (hero) heroObserver.observe(hero);

// Mobile drawer
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', String(open));
  if (open) drawer.removeAttribute('hidden');
  else drawer.setAttribute('hidden', '');
});
drawer.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('hidden', '');
  })
);

// Language toggle (visual only)
document.querySelectorAll('.lang button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang button').forEach((b) => b.classList.remove('is-on'));
    btn.classList.add('is-on');
  });
});

// Reveal on scroll
const revealTargets = document.querySelectorAll(
  '.section-mast, .split, .timeline li, .uni-tile, .band-list article, .story-feature, .story-card, .apply-grid, .feature-stats > *'
);
revealTargets.forEach((el) => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// Block fake form submissions
document.querySelectorAll('form').forEach((f) => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = f.querySelector('button[type="submit"]');
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = 'Mockup — wire to KUAC backend';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 2200);
  });
});
