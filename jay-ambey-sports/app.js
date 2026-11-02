// Jay Ambey Sport's Center Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Startup dismiss (<900ms)
  const overlay = document.getElementById('startup-overlay');
  const skipBtn = document.getElementById('skip-intro');

  function dismissIntro() {
    if (overlay && !overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
      setTimeout(() => overlay.remove(), 350);
    }
  }

  const timer = setTimeout(dismissIntro, 850);
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(timer);
      dismissIntro();
    });
  }

  // 2. Mobile Nav Toggle
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // 3. Year
  const yearElem = document.getElementById('year');
  if (yearElem) yearElem.textContent = new Date().getFullYear();
});

function inquireProduct(productName) {
  const msg = encodeURIComponent(
    `Hello Jay Ambey Sport's Center Dhanpuri,\n\nI am inquiring about:\n• Product: ${productName}\n• Location: MP SH 9A, Imam Bada, Azad Chowk\n\nIs this currently available in stock? What are the available sizes/variants and best price?`
  );
  window.open(`https://wa.me/916267686575?text=${msg}`, '_blank');
}
