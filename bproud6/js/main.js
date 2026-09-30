/* B Proud Company s.r.o. – interakce stránky (navigace, menu, animace) */
(() => {
  document.documentElement.classList.add('js');
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 60);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById('burger');
  const overlay = document.getElementById('overlay');
  const setMenu = open => {
    burger.classList.toggle('x', open);
    burger.setAttribute('aria-expanded', open);
    nav.classList.toggle('menu-open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!overlay.classList.contains('open')));
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) setMenu(false); });

  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const applyTheme = theme => {
    root.dataset.theme = theme;
    const light = theme === 'light';
    toggle.setAttribute('aria-label', light ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim');
    toggle.title = toggle.getAttribute('aria-label');
    if (themeMeta) themeMeta.content = light ? '#f6f5f2' : '#0f1113';
  };
  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* bez uložení */ }
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .1 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  document.getElementById('ftyear').textContent = new Date().getFullYear();
})();
