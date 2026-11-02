// Yogi M Acoustic Player Logic
let isYogiPlaying = false;
let yogiInterval = null;
let yogiProgVal = 35;

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

function toggleYogiPlay() {
  const btn = document.getElementById('yogiPlayBtn');
  const bar = document.getElementById('yogiProg');

  isYogiPlaying = !isYogiPlaying;
  if (isYogiPlaying) {
    btn.innerHTML = '&#10074;&#10074;';
    yogiInterval = setInterval(() => {
      yogiProgVal += 1;
      if (yogiProgVal > 100) yogiProgVal = 0;
      if (bar) bar.style.width = `${yogiProgVal}%`;
    }, 400);
  } else {
    btn.innerHTML = '&#9658;';
    clearInterval(yogiInterval);
  }
}

function selectYogiTrack(index, title, duration, rowElem) {
  document.querySelectorAll('.song-row').forEach(r => r.classList.remove('active'));
  if (rowElem) rowElem.classList.add('active');

  const titleElem = document.getElementById('currentYogiSong');
  const timeElem = document.getElementById('yogiTime');
  const bar = document.getElementById('yogiProg');

  if (titleElem) titleElem.textContent = title;
  if (timeElem) timeElem.textContent = duration;

  yogiProgVal = 0;
  if (bar) bar.style.width = '0%';

  if (!isYogiPlaying) {
    toggleYogiPlay();
  }
}

function submitYogiBooking() {
  const host = document.getElementById('hostName').value;
  const city = document.getElementById('hostCity').value;
  const format = document.getElementById('gigFormat').value;
  const date = document.getElementById('gigDate').value;

  const msg = encodeURIComponent(
    `Hello Yogi M Music Management,\n\nWe would like to book an acoustic live session:\n• Host: ${host}\n• Location: ${city}\n• Show Format: ${format}\n• Proposed Date: ${date}\n\nPlease share artist availability and performance fee details.`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
