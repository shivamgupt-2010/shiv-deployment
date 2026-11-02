// DJ Koyel Mix Player & Vinyl Spinning Logic
let isDjPlaying = false;
let djInterval = null;
let djProgVal = 45;

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

function toggleDjPlay() {
  const btn = document.getElementById('djPlayBtn');
  const platter = document.getElementById('vinylPlatter');
  const bar = document.getElementById('mixProg');

  isDjPlaying = !isDjPlaying;
  if (isDjPlaying) {
    btn.innerHTML = '&#10074;&#10074;';
    if (platter) platter.classList.add('spinning');
    djInterval = setInterval(() => {
      djProgVal += 0.5;
      if (djProgVal > 100) djProgVal = 0;
      if (bar) bar.style.width = `${djProgVal}%`;
    }, 500);
  } else {
    btn.innerHTML = '&#9658;';
    if (platter) platter.classList.remove('spinning');
    clearInterval(djInterval);
  }
}

function selectMix(index, title, genre, duration, rowElem) {
  document.querySelectorAll('.mix-item').forEach(r => r.classList.remove('active'));
  if (rowElem) rowElem.classList.add('active');

  const titleElem = document.getElementById('currentMixTitle');
  const genreElem = document.getElementById('currentMixGenre');
  const timeElem = document.getElementById('mixTime');
  const bar = document.getElementById('mixProg');

  if (titleElem) titleElem.textContent = title;
  if (genreElem) genreElem.textContent = genre;
  if (timeElem) timeElem.textContent = duration;

  djProgVal = 0;
  if (bar) bar.style.width = '0%';

  if (!isDjPlaying) {
    toggleDjPlay();
  }
}

function submitDjBooking() {
  const client = document.getElementById('djClient').value;
  const eventType = document.getElementById('djEvent').value;
  const city = document.getElementById('djCity').value;
  const date = document.getElementById('djDate').value;

  const msg = encodeURIComponent(
    `Hello DJ Koyel Bookings Team,\n\nWe would like to book a DJ set:\n• Client / Venue: ${client}\n• Event Type: ${eventType}\n• City / Venue: ${city}\n• Date: ${date}\n\nPlease share commercial quotes and technical rider availability.`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
