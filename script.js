// Sticky-header shadow on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile drawer
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', String(open));
  if (open) drawer.removeAttribute('hidden');
  else drawer.setAttribute('hidden', '');
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('hidden', '');
}));

// Language toggle (visual only)
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});

// Reveal-on-scroll for major sections
const targets = document.querySelectorAll(
  '.section-head, .why-card, .steps li, .uni-card, .schol-card, .story, .cta-card, .for-uni-row > *'
);
targets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

targets.forEach(el => io.observe(el));

// Prevent fake form submission
document.querySelectorAll('form').forEach(f => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = f.querySelector('button[type="submit"]');
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = 'Mockup — wire this up to KUAC backend';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2200);
  });
});
