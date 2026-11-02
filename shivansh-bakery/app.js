// Shivansh Bakery Client Logic & Cake Estimator
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

  // Run initial cake calc
  calcCake();
});

function calcCake() {
  const flavourSelect = document.getElementById('cakeFlavour');
  const weightSelect = document.getElementById('cakeWeight');
  const msgInput = document.getElementById('cakeMessage');

  const previewFlavour = document.getElementById('previewFlavourName');
  const previewWeight = document.getElementById('previewWeightLabel');
  const previewMsg = document.getElementById('previewMsg');
  const previewTotal = document.getElementById('cakeTotal');
  const tierTwo = document.getElementById('tierTwo');

  if (!flavourSelect || !weightSelect) return;

  const selectedOpt = flavourSelect.options[flavourSelect.selectedIndex];
  const ratePerHalfKg = parseFloat(selectedOpt.getAttribute('data-rate')) || 450;
  const weightVal = parseFloat(weightSelect.value);

  // Rate formula: (weight / 0.5) * ratePerHalfKg
  const calculatedTotal = Math.round((weightVal / 0.5) * ratePerHalfKg);

  if (previewFlavour) previewFlavour.textContent = selectedOpt.text.split('(')[0].trim();
  if (previewWeight) previewWeight.textContent = `${weightVal} Kg • 100% Fresh & Eggless`;
  if (previewTotal) previewTotal.textContent = `₹${calculatedTotal.toLocaleString('en-IN')}`;

  if (previewMsg) {
    const text = msgInput && msgInput.value.trim() ? msgInput.value.trim() : 'Happy Celebration';
    previewMsg.textContent = `"${text}"`;
  }

  if (tierTwo) {
    if (weightVal >= 2.0) {
      tierTwo.classList.add('show');
    } else {
      tierTwo.classList.remove('show');
    }
  }
}

function submitCustomCake() {
  const flavourSelect = document.getElementById('cakeFlavour');
  const weightSelect = document.getElementById('cakeWeight');
  const msgInput = document.getElementById('cakeMessage');
  const dateInput = document.getElementById('deliveryDate');
  const totalElem = document.getElementById('cakeTotal');

  const flavour = flavourSelect.options[flavourSelect.selectedIndex].text.split('(')[0].trim();
  const weight = weightSelect.options[weightSelect.selectedIndex].text;
  const msg = msgInput.value.trim() || 'No message';
  const date = dateInput ? dateInput.value : 'Immediate';
  const total = totalElem ? totalElem.textContent : 'Quote';

  const orderText = encodeURIComponent(
    `Hello Shivansh Bakery Shahdol,\n\nI want to place a custom cake order:\n• Flavour: ${flavour}\n• Weight/Size: ${weight}\n• Message on Cake: "${msg}"\n• Required Date: ${date}\n• Estimated Total: ${total}\n\nPlease confirm availability and preparation time.`
  );

  window.open(`https://wa.me/919424353421?text=${orderText}`, '_blank');
}

function orderCake(cakeName, size) {
  const orderText = encodeURIComponent(
    `Hello Shivansh Bakery Shahdol,\n\nI would like to order:\n• Cake: ${cakeName}\n• Size: ${size}\n\nPlease let me know when this can be picked up or delivered in Shahdol.`
  );
  window.open(`https://wa.me/919424353421?text=${orderText}`, '_blank');
}
