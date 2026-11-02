// Punya Music Player & Interactivity Logic
let isPunyaPlaying = false;
let punyaInterval = null;
let punyaProgVal = 35;

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

function togglePunyaPlay() {
  const btn = document.getElementById('pPlayBtn');
  const bar = document.getElementById('pProg');

  isPunyaPlaying = !isPunyaPlaying;
  if (isPunyaPlaying) {
    btn.innerHTML = '&#10074;&#10074;';
    punyaInterval = setInterval(() => {
      punyaProgVal += 1;
      if (punyaProgVal > 100) punyaProgVal = 0;
      if (bar) bar.style.width = `${punyaProgVal}%`;
    }, 400);
  } else {
    btn.innerHTML = '&#9658;';
    clearInterval(punyaInterval);
  }
}

function selectPunyaTrack(index, title, duration, rowElem) {
  document.querySelectorAll('.track-row').forEach(r => r.classList.remove('active'));
  if (rowElem) rowElem.classList.add('active');

  const titleElem = document.getElementById('currentPunyaTitle');
  const timeElem = document.getElementById('pTime');
  const bar = document.getElementById('pProg');

  if (titleElem) titleElem.textContent = title;
  if (timeElem) timeElem.textContent = duration;

  punyaProgVal = 0;
  if (bar) bar.style.width = '0%';

  if (!isPunyaPlaying) {
    togglePunyaPlay();
  }
}

function submitPunyaBooking() {
  const host = document.getElementById('pHost').value;
  const city = document.getElementById('pCity').value;
  const format = document.getElementById('pEventFormat').value;
  const date = document.getElementById('pDate').value;

  const msg = encodeURIComponent(
    `Hello Punya Music Management,\n\nWe would like to book a live soulful acoustic session:\n• Host: ${host}\n• Location: ${city}\n• Format: ${format}\n• Proposed Date: ${date}\n\nPlease share artist fee structure and sound requirements.`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
