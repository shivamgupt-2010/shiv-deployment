// Annkur R Pathakk Studio Console Logic
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

function toggleStem(btnId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      btn.classList.add('muted');
      btn.textContent = 'MUTED';
    } else {
      btn.classList.remove('muted');
      btn.classList.add('active');
      btn.textContent = 'ACTIVE';
    }
  }
}

function submitCommission() {
  const name = document.getElementById('cName').value;
  const project = document.getElementById('cProject').value;
  const timeline = document.getElementById('cTimeline').value;
  const budget = document.getElementById('cBudget').value;

  const msg = encodeURIComponent(
    `Hello Annkur R Pathakk Studio,\n\nI want to commission a music project:\n• Client: ${name}\n• Project Type: ${project}\n• Timeline: ${timeline}\n• Estimated Budget: ${budget}\n\nPlease share studio availability and consultation scheduling.`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
