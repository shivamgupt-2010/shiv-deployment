// Galaxy Hair Salon Interactivity & Price Estimator
document.addEventListener('DOMContentLoaded', () => {
  // 1. Startup Intro Timer (under 900ms, skippable)
  const overlay = document.getElementById('startup-overlay');
  const skipBtn = document.getElementById('skip-intro');

  function dismissIntro() {
    if (overlay && !overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
      setTimeout(() => overlay.remove(), 400);
    }
  }

  // Dismiss automatically after 880ms
  const introTimer = setTimeout(dismissIntro, 880);

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(introTimer);
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
    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // 3. Dynamic Price Calculator
  const calcContainer = document.getElementById('calcOptions');
  const totalPriceElem = document.getElementById('totalPrice');
  const selectedListElem = document.getElementById('selectedItemsList');
  const bookEstimateBtn = document.getElementById('bookEstimateBtn');

  function updateEstimate() {
    if (!calcContainer || !totalPriceElem) return;
    const checkedBoxes = calcContainer.querySelectorAll('input[type="checkbox"]:checked');
    let total = 0;
    const selectedNames = [];

    checkedBoxes.forEach(cb => {
      total += parseInt(cb.value, 10);
      selectedNames.push(cb.getAttribute('data-name'));
    });

    totalPriceElem.textContent = `₹${total.toLocaleString('en-IN')}`;

    if (selectedListElem) {
      if (selectedNames.length > 0) {
        selectedListElem.innerHTML = `<strong>Selected (${selectedNames.length}):</strong> ${selectedNames.join(', ')}`;
      } else {
        selectedListElem.textContent = 'Please select at least one service above.';
      }
    }

    if (bookEstimateBtn) {
      bookEstimateBtn.onclick = () => {
        const text = encodeURIComponent(
          `Hello Galaxy Hair Salon Burhar,\nI calculated a package on your website:\n- Services: ${selectedNames.join(', ')}\n- Estimated Total: ₹${total.toLocaleString('en-IN')}\nI would like to check availability for an appointment.`
        );
        window.open(`https://wa.me/919644764702?text=${text}`, '_blank');
      };
    }
  }

  if (calcContainer) {
    calcContainer.addEventListener('change', updateEstimate);
    updateEstimate(); // initial run
  }

  // Update Year
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
