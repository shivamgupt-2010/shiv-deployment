// Fitness Gym 27 Logic & Interactive BMI Calculator
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

  // 3. BMI & Calorie Calculator
  const weightInput = document.getElementById('userWeight');
  const heightInput = document.getElementById('userHeight');
  const ageInput = document.getElementById('userAge');
  const activityInput = document.getElementById('userActivity');

  const bmiOutput = document.getElementById('bmiOutput');
  const bmiStatus = document.getElementById('bmiStatus');
  const calOutput = document.getElementById('calOutput');

  function calculateFitness() {
    if (!weightInput || !heightInput) return;
    const w = parseFloat(weightInput.value);
    const h = parseFloat(heightInput.value) / 100; // meters
    const age = parseFloat(ageInput.value) || 25;
    const act = parseFloat(activityInput.value) || 1.375;

    if (w > 0 && h > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      bmiOutput.textContent = bmi;

      let status = 'Normal Weight';
      let statusColor = '#ccff00';
      if (bmi < 18.5) {
        status = 'Underweight (Mass Gain Focus)';
        statusColor = '#38bdf8';
      } else if (bmi >= 18.5 && bmi < 25) {
        status = 'Optimal Healthy Weight';
        statusColor = '#ccff00';
      } else if (bmi >= 25 && bmi < 30) {
        status = 'Overweight (Fat Loss & Conditioning)';
        statusColor = '#fbbf24';
      } else {
        status = 'High Body Mass (Structured Shred)';
        statusColor = '#f87171';
      }

      bmiStatus.textContent = status;
      bmiStatus.style.color = statusColor;

      // Harris-Benedict BMR approximation:
      // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5
      const bmr = (10 * w) + (6.25 * (h * 100)) - (5 * age) + 5;
      const tdee = Math.round(bmr * act);
      calOutput.textContent = `~${tdee.toLocaleString('en-IN')}`;
    }
  }

  [weightInput, heightInput, ageInput, activityInput].forEach(elem => {
    if (elem) elem.addEventListener('input', calculateFitness);
  });
  calculateFitness(); // Initial calculation

  // 4. Year
  const yearElem = document.getElementById('yearVal');
  if (yearElem) yearElem.textContent = new Date().getFullYear();
});
