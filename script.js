// ---------- mobile back button ----------
(function injectMobileBackButton() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  if (currentPage === 'index.html') return;
  if (document.getElementById('mobileBackBtn')) return;

  const backBtn = document.createElement('button');
  backBtn.id = 'mobileBackBtn';
  backBtn.className = 'mobile-back';
  backBtn.type = 'button';
  backBtn.setAttribute('aria-label', 'Voltar para a página anterior');
  backBtn.textContent = '← Voltar';
  backBtn.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });

  document.body.prepend(backBtn);
})();

// ---------- mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => siteNav.classList.remove('open'));
  });
}

// ---------- highlight the current page in the nav ----------
(function highlightActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });
})();

// ---------- generic tab switcher: data-tab-group / data-tab-target ----------
// Click a [data-tab-trigger] to show the matching [data-tab-panel] and hide siblings.
document.querySelectorAll('[data-tab-trigger]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const group = trigger.closest('[data-tab-group]');
    if (!group) return;
    const targetId = trigger.getAttribute('data-tab-trigger');

    group.querySelectorAll('[data-tab-trigger]').forEach(t => t.classList.remove('active'));
    trigger.classList.add('active');

    group.querySelectorAll('[data-tab-panel]').forEach(panel => {
      panel.style.display = (panel.getAttribute('data-tab-panel') === targetId) ? 'block' : 'none';
    });
  });
});
