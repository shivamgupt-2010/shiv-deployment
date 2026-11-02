// Siddhant Sharma / Classic Kid Sid Interactive Logic
let isRockPlaying = false;
let rockInterval = null;
let rockProgressVal = 40;

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

function toggleRockPlay() {
  const btn = document.getElementById('rockPlayBtn');
  const bar = document.getElementById('rockProgress');

  isRockPlaying = !isRockPlaying;
  if (isRockPlaying) {
    btn.innerHTML = '&#10074;&#10074;';
    rockInterval = setInterval(() => {
      rockProgressVal += 1.5;
      if (rockProgressVal > 100) rockProgressVal = 0;
      if (bar) bar.style.width = `${rockProgressVal}%`;
    }, 350);
  } else {
    btn.innerHTML = '&#9658;';
    clearInterval(rockInterval);
  }
}

function changeRockTrack(index, title, duration, rowElem) {
  document.querySelectorAll('.rock-track-row').forEach(r => r.classList.remove('active'));
  if (rowElem) rowElem.classList.add('active');

  const titleElem = document.getElementById('currentRockTrack');
  const timeElem = document.getElementById('rockTime');
  const bar = document.getElementById('rockProgress');

  if (titleElem) titleElem.textContent = title;
  if (timeElem) timeElem.textContent = duration;

  rockProgressVal = 0;
  if (bar) bar.style.width = '0%';

  if (!isRockPlaying) {
    toggleRockPlay();
  }
}

function rsvpGig(gigName) {
  const msg = encodeURIComponent(
    `Hello Classic Kid Sid Team,\n\nI want to inquire about tickets / guest passes for:\n• Tour Date / Venue: ${gigName}\n\nPlease share booking and entry details!`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

function submitRockBooking() {
  const org = document.getElementById('orgName').value;
  const city = document.getElementById('gigCity').value;
  const date = document.getElementById('gigDate').value;
  const set = document.getElementById('setLength').value;

  const msg = encodeURIComponent(
    `Hello Classic Kid Sid Management,\n\nWe would like to book Siddhant Sharma for a live rock performance:\n• Event / Org: ${org}\n• Location: ${city}\n• Date: ${date}\n• Set Type: ${set}\n\nPlease send us performance availability and rider specs.`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
