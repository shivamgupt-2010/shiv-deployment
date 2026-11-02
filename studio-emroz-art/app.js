// App Interaction Script for Studio Emroz Art
// Engineered by SHIV Web Studio (+91 6267686575)

function dismissStartup() {
  const overlay = document.getElementById('startup-screen');
  if (overlay) {
    overlay.classList.add('hidden');
    setTimeout(() => overlay.remove(), 400);
  }
}

// Auto-dismiss startup screen after 850ms
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(dismissStartup, 850);
});

// Interactive Form to WhatsApp routing
function handleFormSubmit(event, businessName) {
  event.preventDefault();
  
  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const pref = document.getElementById('cust-pref').value;
  const date = document.getElementById('cust-date').value;
  const notes = document.getElementById('cust-notes').value.trim();
  
  let msg = `*Inquiry for ${businessName} (via SHIV Demo Website)*\n\n`;
  msg += `👤 *Client Name:* ${name}\n`;
  msg += `📞 *Phone/WA:* ${phone}\n`;
  msg += `📌 *Requirement:* ${pref}\n`;
  if (date) msg += `📅 *Preferred Date:* ${date}\n`;
  if (notes) msg += `📝 *Notes:* ${notes}\n\n`;
  msg += `_I saw the demo website of ${businessName}, I want to know the details of websites made by SHIV._`;
  
  const waUrl = `https://wa.me/916267686575?text=${encodeURIComponent(msg)}`;
  
  const feedback = document.getElementById('form-feedback');
  if (feedback) {
    feedback.style.display = 'block';
    feedback.innerHTML = `✓ Thank you ${name}! Opening WhatsApp to send your inquiry directly...`;
  }
  
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);
}
