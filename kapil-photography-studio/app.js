// Kapil Photography Studio Client Interaction Controller
function dismissStartup() {
  const screen = document.getElementById('startup-screen');
  if (screen) {
    screen.classList.add('hidden');
    setTimeout(() => screen.remove(), 400);
  }
}

// Automatically dismiss startup screen after 850ms
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(dismissStartup, 850);
});

// Form Handler with Direct WhatsApp Redirection
function handleInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const service = document.getElementById('service-tier').value;
  const date = document.getElementById('preferred-date').value || 'Flexible';
  const notes = document.getElementById('client-notes').value.trim() || 'None';

  const message = `*Inquiry for Kapil Photography Studio*\n` +
                  `👤 *Name:* ${name}\n` +
                  `📞 *Phone:* ${phone}\n` +
                  `🏷️ *Service:* ${service}\n` +
                  `📅 *Preferred Date:* ${date}\n` +
                  `📝 *Notes:* ${notes}\n\n` +
                  `_Sent via Kapil Photography Studio Official Web Showcase (Engineered by SHIV)_`;

  const waUrl = `https://wa.me/916267686575?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}
