// DVR Sound & Event App Script
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
  const curYear = document.getElementById('curYear');
  if (curYear) {
    curYear.textContent = new Date().getFullYear();
  }
});

function selectPackage(pkgName) {
  const typeSelect = document.getElementById('eventType');
  if (typeSelect) {
    for (let i = 0; i < typeSelect.options.length; i++) {
      if (typeSelect.options[i].text.toLowerCase().includes(pkgName.toLowerCase())) {
        typeSelect.selectedIndex = i;
        break;
      }
    }
  }
  const quoteSec = document.getElementById('quote');
  if (quoteSec) {
    quoteSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function submitQuote() {
  const eventType = document.getElementById('eventType').value;
  const guestCount = document.getElementById('guestCount').value;
  const eventLocation = document.getElementById('eventLocation').value;
  const eventDate = document.getElementById('eventDate').value;

  const extras = [];
  if (document.getElementById('addLedWall').checked) extras.push('P3 HD LED Video Wall');
  if (document.getElementById('addDryIce').checked) extras.push('Dry Ice Cloud / Cold Pyro');
  if (document.getElementById('addTruss').checked) extras.push('Aluminum Box Truss');

  const extrasStr = extras.length > 0 ? extras.join(', ') : 'Standard Audio-Visual Package';

  const msg = encodeURIComponent(
    `Hello DVR Sound & Event Shahdol,\n\nI would like an event sound & stage lighting quote:\n• Event Type: ${eventType}\n• Expected Gathering: ${guestCount}\n• Venue / Location: ${eventLocation}\n• Date: ${eventDate}\n• Add-ons Requested: ${extrasStr}\n\nPlease let me know package pricing and availability.`
  );

  window.open(`https://wa.me/?text=${msg}`, '_blank');
}
