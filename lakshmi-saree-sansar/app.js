// ==========================================================================
// Lakshmi Saree Sansar — Client Interaction Controller
// Engineered by SHIV Web Studio (+91 6267686575)
// ==========================================================================

let simulatedCart = [];
let currentModalProductId = null;

// 1. Fabric Opening Animation Dismissal
function dismissFabricReveal() {
  const overlay = document.getElementById('fabric-reveal');
  if (overlay) {
    overlay.classList.add('hidden');
    setTimeout(() => overlay.remove(), 450);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Auto-dismiss within 800ms respecting prefers-reduced-motion
  setTimeout(dismissFabricReveal, 800);
});

// 2. Mobile Navigation Toggle
function toggleMobileNav() {
  const nav = document.getElementById('nav-menu');
  if (nav) {
    const isFlex = nav.style.display === 'flex';
    nav.style.display = isFlex ? 'none' : 'flex';
    if (!isFlex) {
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '100%';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#fdfbf7';
      nav.style.padding = '1.5rem';
      nav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
      nav.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    }
  }
}

// 3. Collection Filter Tabs
function filterSarees(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.saree-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterByCollection(category) {
  const arrivals = document.getElementById('new-arrivals');
  if (arrivals) {
    arrivals.scrollIntoView({ behavior: 'smooth' });
  }
  const btn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
  filterSarees(category, btn);
}

// 4. Product Modal Logic
function openProductModal(productId) {
  const products = window.LSS_PRODUCTS || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;

  document.getElementById('modal-img').src = product.img;
  document.getElementById('modal-img').alt = product.title;
  document.getElementById('modal-tag').textContent = product.tag;
  document.getElementById('modal-cat').textContent = product.category_name.toUpperCase();
  document.getElementById('modal-title').textContent = product.title;
  document.getElementById('modal-price').textContent = product.price;
  document.getElementById('modal-fabric').textContent = product.fabric;
  document.getElementById('modal-zari').textContent = product.zari;
  document.getElementById('modal-color').textContent = product.color;
  document.getElementById('modal-desc').textContent = product.desc;

  const phone = window.SHIV_PHONE || "916267686575";
  const msg = `Namaste Lakshmi Saree Sansar, I saw the demo website created by SHIV. I want to inquire about availability and drape details for: *${product.title}* (${product.price}).`;
  document.getElementById('modal-wa-btn').href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  const modal = document.getElementById('product-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal on click outside or Escape
window.addEventListener('click', (e) => {
  const modal = document.getElementById('product-modal');
  if (e.target === modal) {
    closeProductModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
    const cart = document.getElementById('cart-drawer');
    if (cart && cart.classList.contains('open')) {
      toggleCartDrawer();
    }
  }
});

// 5. Simulated Shopping Bag (Cart) Drawer
function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

function addToSimulatedCart(productId) {
  const products = window.LSS_PRODUCTS || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  simulatedCart.push(product);
  updateCartUI();
  
  // Quick visual feedback
  const bagBtn = document.querySelector(`.saree-card[data-id="${productId}"] .btn-card-bag`);
  if (bagBtn) {
    const orig = bagBtn.innerHTML;
    bagBtn.innerHTML = '✓';
    bagBtn.style.background = '#d4af37';
    bagBtn.style.color = '#000';
    setTimeout(() => {
      bagBtn.innerHTML = orig;
      bagBtn.style.background = '';
      bagBtn.style.color = '';
    }, 1000);
  }
}

function addCurrentToBag() {
  if (currentModalProductId) {
    addToSimulatedCart(currentModalProductId);
    closeProductModal();
    toggleCartDrawer();
  }
}

function removeFromCart(index) {
  simulatedCart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const countBadge = document.getElementById('bag-count');
  const drawerCount = document.getElementById('drawer-count');
  const container = document.getElementById('cart-items-container');
  const subtotalElem = document.getElementById('drawer-subtotal');

  if (countBadge) countBadge.textContent = simulatedCart.length;
  if (drawerCount) drawerCount.textContent = `${simulatedCart.length} item${simulatedCart.length === 1 ? '' : 's'}`;

  if (simulatedCart.length === 0) {
    if (container) {
      container.innerHTML = `
        <div class="empty-cart-state" id="empty-cart-msg">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>Your bag is currently empty.</p>
          <a href="#new-arrivals" class="btn btn-outline-dark btn-sm" onclick="toggleCartDrawer()">Discover Sarees</a>
        </div>
      `;
    }
    if (subtotalElem) subtotalElem.textContent = 'Rs. 0';
    return;
  }

  let totalNum = 0;
  let itemsHtml = '';

  simulatedCart.forEach((item, idx) => {
    // Extract numerical price for subtotal estimation
    const num = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    totalNum += num;

    itemsHtml += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.title}</h4>
          <span class="cart-item-price">${item.price}</span>
          <br>
          <button class="cart-remove-btn" onclick="removeFromCart(${idx})">Remove from bag</button>
        </div>
      </div>
    `;
  });

  if (container) container.innerHTML = itemsHtml;
  if (subtotalElem) subtotalElem.textContent = `Rs. ${totalNum.toLocaleString('en-IN')}`;
}

function triggerSimulatedCheckout() {
  if (simulatedCart.length === 0) {
    alert("Your shopping bag is empty! Please choose a saree to test the checkout flow.");
    return;
  }

  const itemsList = simulatedCart.map(i => `• ${i.title} (${i.price})`).join('\\n');
  const phone = window.SHIV_PHONE || "916267686575";
  const msg = `Namaste Lakshmi Saree Sansar, I saw the demo website created by SHIV. I have curated the following sarees in my bag:\\n\\n${itemsList}\\n\\nI would like to inquire about their availability and arrange an in-store drape trial at Shraja Mall, Burhar.`;
  
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  
  const confirmed = confirm(
    "⚡ DEMO CHECKOUT SPECIMEN\\n\\n" +
    "This is an independent portfolio showcase built by SHIV Web Studio.\\n" +
    "No real monetary charges are processed on this website.\\n\\n" +
    "Would you like to forward this simulated bag to WhatsApp (+91 6267686575) to connect with the developer?"
  );

  if (confirmed) {
    window.open(waUrl, '_blank');
  }
}

// 6. Appointment Booking Form Handler
function handleAppointmentSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('app-name').value.trim();
  const phone = document.getElementById('app-phone').value.trim();
  const date = document.getElementById('app-date').value;
  const occasion = document.getElementById('app-occasion').value;
  const notes = document.getElementById('app-notes').value.trim();

  let msg = `*VIP Drape Appointment Booking — Lakshmi Saree Sansar*\\n`;
  msg += `(Inquiry via SHIV Demo Website)\\n\\n`;
  msg += `👤 *Client Name:* ${name}\\n`;
  msg += `📞 *WhatsApp:* ${phone}\\n`;
  msg += `📅 *Date of Visit:* ${date || 'Flexible / Walk-in'}\\n`;
  msg += `✨ *Occasion:* ${occasion}\\n`;
  if (notes) msg += `📝 *Notes/Preferences:* ${notes}\\n\\n`;
  msg += `_I saw the demo website of Lakshmi Saree Sansar, I want to know the details of websites made by SHIV._`;

  const devPhone = window.SHIV_PHONE || "916267686575";
  const waUrl = `https://wa.me/${devPhone}?text=${encodeURIComponent(msg)}`;

  const msgBox = document.getElementById('form-msg');
  if (msgBox) {
    msgBox.style.display = 'block';
    msgBox.innerHTML = `✓ Thank you, ${name}! Redirecting to WhatsApp to confirm your appointment at Shraja Mall...`;
  }

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 700);
}

// ==========================================================================
// VIP 9-Page Flagship Interactive Controllers
// ==========================================================================

let currentTryonTone = 'Fair / Rose Porcelain';
let currentTryonSareeName = 'Imperial Shahi Banarasi Katan Silk';
let currentTryonSareePrice = 'Rs. 18,500';
let currentTryonStyle = 'Classic Pleated Nivi Drape';

function setMannequinTone(hex, label, btn) {
  document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentTryonTone = label;
  
  const face = document.getElementById('svg-face');
  const neck = document.getElementById('svg-neck');
  if (face) face.setAttribute('fill', hex);
  if (neck) neck.setAttribute('fill', hex);
  
  updateTryonSummary();
}

function selectTryonSaree(id, skirtHex, zariHex, name, price, el) {
  document.querySelectorAll('.fabric-opt').forEach(opt => opt.classList.remove('active'));
  el.classList.add('active');
  
  currentTryonSareeName = name;
  currentTryonSareePrice = price;
  
  const pleats = document.getElementById('svg-pleats');
  const border = document.getElementById('svg-border');
  const pallu = document.getElementById('svg-pallu');
  
  if (pleats) pleats.setAttribute('fill', skirtHex);
  if (border) border.setAttribute('fill', zariHex);
  if (pallu) pallu.setAttribute('fill', zariHex);
  
  updateTryonSummary();
}

function setDrapeStyle(styleKey, styleLabel, btn) {
  document.querySelectorAll('.drape-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentTryonStyle = styleLabel;
  
  const pallu = document.getElementById('svg-pallu');
  if (pallu) {
    if (styleKey === 'gujarati') {
      pallu.setAttribute('d', 'M130 130 C160 160 170 240 155 320 C145 380 135 410 135 410 L125 405 C125 405 135 360 140 300 C145 240 135 180 125 130 Z');
    } else if (styleKey === 'cape') {
      pallu.setAttribute('d', 'M115 125 C100 150 90 280 100 420 L110 420 C110 280 115 160 130 130 Z');
    } else {
      pallu.setAttribute('d', 'M125 130 C110 160 100 240 115 320 C125 380 135 410 135 410 L145 405 C145 405 135 360 130 300 C125 240 135 180 145 130 Z');
    }
  }
  
  updateTryonSummary();
}

function updateTryonSummary() {
  const nameEl = document.getElementById('status-saree-name');
  const styleEl = document.getElementById('status-drape-style');
  const priceEl = document.getElementById('status-saree-price');
  
  if (nameEl) nameEl.textContent = currentTryonSareeName;
  if (priceEl) priceEl.textContent = currentTryonSareePrice;
  if (styleEl) styleEl.textContent = `Style: ${currentTryonStyle} • Complexion: ${currentTryonTone}`;
}

function orderCurrentTryonLook() {
  const msg = encodeURIComponent(`Namaste Lakshmi Saree Sansar, I simulated a custom look on your AI Try-on Studio:
- Saree: ${currentTryonSareeName} (${currentTryonSareePrice})
- Style: ${currentTryonStyle}
- Complexion: ${currentTryonTone}
Please confirm availability and booking for an in-store trial at Shraja Mall.`);
  window.open(`https://wa.me/916267686575?text=${msg}`, '_blank');
}

// Custom Atelier Calculation
function calculateCustomPrice() {
  const fabricSelect = document.getElementById('custom-fabric');
  const zariSelect = document.getElementById('custom-zari');
  const motifSelect = document.getElementById('custom-motif');
  const monogramInput = document.getElementById('custom-monogram');
  
  if (!fabricSelect || !zariSelect || !motifSelect) return;
  
  const fCost = parseInt(fabricSelect.value) || 0;
  const zCost = parseInt(zariSelect.value) || 0;
  const mCost = parseInt(motifSelect.value) || 0;
  const monoCost = monogramInput && monogramInput.value.trim().length > 0 ? 1500 : 0;
  
  const total = fCost + zCost + mCost + monoCost;
  
  const totalDisp = document.getElementById('custom-total-display');
  if (totalDisp) totalDisp.textContent = `Rs. ${total.toLocaleString('en-IN')}`;
  
  const sumFab = document.getElementById('sum-fabric');
  const sumZar = document.getElementById('sum-zari');
  const sumMot = document.getElementById('sum-motif');
  const sumMono = document.getElementById('sum-monogram');
  
  if (sumFab) sumFab.textContent = fabricSelect.options[fabricSelect.selectedIndex].getAttribute('data-name');
  if (sumZar) sumZar.textContent = zariSelect.options[zariSelect.selectedIndex].getAttribute('data-name');
  if (sumMot) sumMot.textContent = motifSelect.options[motifSelect.selectedIndex].getAttribute('data-name');
  if (sumMono) sumMono.textContent = monogramInput && monogramInput.value.trim() ? monogramInput.value.trim() : 'None';
}

function submitCustomWeave() {
  const name = document.getElementById('client-name').value;
  const phone = document.getElementById('client-phone').value;
  const fab = document.getElementById('sum-fabric').textContent;
  const zar = document.getElementById('sum-zari').textContent;
  const mot = document.getElementById('sum-motif').textContent;
  const mono = document.getElementById('sum-monogram').textContent;
  const total = document.getElementById('custom-total-display').textContent;
  
  const msg = encodeURIComponent(`Namaste Master Weaver at Lakshmi Saree Sansar,
I configured a Custom Bespoke Weave:
- Client: ${name} (${phone})
- Base Silk: ${fab}
- Zari: ${zar}
- Pallu Motif: ${mot}
- Monogram: ${mono}
- Estimated Total: ${total}
Please review this specification and advise on yarn procurement and weaving schedule.`);

  window.open(`https://wa.me/916267686575?text=${msg}`, '_blank');
}

function submitVipAppointment() {
  const name = document.getElementById('vip-name').value;
  const phone = document.getElementById('vip-phone').value;
  const date = document.getElementById('vip-date').value;
  const time = document.getElementById('vip-time').value;
  const ceremony = document.getElementById('vip-ceremony').value;
  const refreshment = document.getElementById('vip-refreshment').value;
  
  const msg = encodeURIComponent(`Namaste Lakshmi Saree Sansar Concierge,
I would like to reserve a VIP Bridal Draping Suite:
- Patron: ${name} (${phone})
- Preferred Date: ${date}
- Time Slot: ${time}
- Ceremony: ${ceremony}
- Hospitality: ${refreshment}
Please confirm my family's private suite reservation at Shraja Mall, Burhar.`);

  alert(`Thank you, ${name}! Your private bridal suite reservation request has been registered. You will now be transferred to our WhatsApp concierge for instant confirmation.`);
  window.open(`https://wa.me/916267686575?text=${msg}`, '_blank');
}

function submitInStoreInquiry() {
  const name = document.getElementById('contact-name').value;
  const phone = document.getElementById('contact-phone').value;
  const topic = document.getElementById('contact-topic').value;
  const details = document.getElementById('contact-msg').value;
  
  const msg = encodeURIComponent(`Namaste Lakshmi Saree Sansar Stylist,
- From: ${name} (${phone})
- Topic: ${topic}
- Details: ${details}
Inquiry sent via official store portal.`);

  window.open(`https://wa.me/916267686575?text=${msg}`, '_blank');
}
