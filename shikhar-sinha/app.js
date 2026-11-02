// Shikhar Sinha Music Player & Lyrics Highlight Logic
let isSsPlaying = false;
let ssInterval = null;
let ssProgVal = 30;

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

function toggleSsPlay() {
  const btn = document.getElementById('ssPlayBtn');
  const bar = document.getElementById('ssProg');

  isSsPlaying = !isSsPlaying;
  if (isSsPlaying) {
    btn.innerHTML = '&#10074;&#10074;';
    ssInterval = setInterval(() => {
      ssProgVal += 1;
      if (ssProgVal > 100) ssProgVal = 0;
      if (bar) bar.style.width = `${ssProgVal}%`;
    }, 400);
  } else {
    btn.innerHTML = '&#9658;';
    clearInterval(ssInterval);
  }
}

function submitCollab() {
  const name = document.getElementById('cName').value;
  const type = document.getElementById('cType').value;
  const city = document.getElementById('cCity').value;
  const details = document.getElementById('cDetails').value;

  const msg = encodeURIComponent(
    `Hello Shikhar Sinha Music,\n\nI want to discuss a collaboration / project:\n• Name: ${name}\n• Category: ${type}\n• City: ${city}\n• Details: ${details}\n\nLet's connect on ideas and music.`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
