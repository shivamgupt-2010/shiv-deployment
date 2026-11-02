// Romi Mukherjee Audio Simulation & Interactivity
let isPlaying = false;
let playInterval = null;
let currentProgress = 35;

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

function togglePlay() {
  const playIcon = document.getElementById('playIcon');
  const waveProgress = document.getElementById('waveProgress');

  isPlaying = !isPlaying;
  if (isPlaying) {
    playIcon.innerHTML = '&#10074;&#10074;';
    playInterval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress > 100) currentProgress = 0;
      if (waveProgress) waveProgress.style.width = `${currentProgress}%`;
    }, 400);
  } else {
    playIcon.innerHTML = '&#9658;';
    clearInterval(playInterval);
  }
}

function selectTrack(index, title, genre, duration, rowElem) {
  document.querySelectorAll('.track-row').forEach(r => r.classList.remove('active'));
  if (rowElem) rowElem.classList.add('active');

  const titleElem = document.getElementById('currentTrackTitle');
  const genreElem = document.getElementById('currentTrackGenre');
  const timeElem = document.getElementById('trackTime');
  const waveProgress = document.getElementById('waveProgress');

  if (titleElem) titleElem.textContent = title;
  if (genreElem) genreElem.textContent = genre;
  if (timeElem) timeElem.textContent = duration;

  currentProgress = 0;
  if (waveProgress) waveProgress.style.width = '0%';

  if (!isPlaying) {
    togglePlay();
  }
}

function submitBooking() {
  const name = document.getElementById('bName').value;
  const type = document.getElementById('bType').value;
  const city = document.getElementById('bCity').value;
  const date = document.getElementById('bDate').value;
  const notes = document.getElementById('bNotes').value;

  const msg = encodeURIComponent(
    `Hello Romi Mukherjee Management,\n\nI would like to inquire about booking a performance:\n• Organizer / Name: ${name}\n• Event Format: ${type}\n• City / Venue: ${city}\n• Date: ${date}\n• Notes: ${notes || 'N/A'}\n\nPlease share availability, tech rider requirements, and commercial quote.`
  );

  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
