// ==========================================================================
// Lakshmi Saree Sansar — Client Interaction Controller
// Engineered by SHIV Web Studio (+91 6267686575)
// ==========================================================================

let simulatedCart = [];
let currentModalProductId = null;

// Complete Product Registry for Interactive Modals and Cart
window.LSS_PRODUCTS = [
  {
    id: 'lss-01',
    category: 'banarasi',
    category_name: 'Royal Banarasi',
    title: 'Imperial Shahi Banarasi Katan Silk',
    price: 'Rs. 18,500',
    fabric: 'Pure 100% Katan Silk • Real Antique Gold & Copper Zari',
    zari: 'Antique Gold & Copper tested metallic threads',
    color: 'Deep Wine Crimson & Champagne Gold',
    desc: 'Archival Banarasi masterpiece handwoven across 38 days in Varanasi. Features royal floral jaal work on lustrous katan silk selvedge.',
    tag: 'Bridal Heirloom',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lss-02',
    category: 'kanjivaram',
    category_name: 'Kanjivaram Weaves',
    title: 'Maharani Kanjivaram Temple Silk',
    price: 'Rs. 24,900',
    fabric: 'Triple-ply Mulberry Silk • 24K Gold Korvai Border',
    zari: '24K Micro-Plated Gold Korvai Weave',
    color: 'Royal Emerald Green & Amber Sunset Gold',
    desc: 'Pure south Indian temple silk woven with traditional Korvai interlocking technique. Gopuram architectural motifs adorn the grand royal pallu.',
    tag: 'Muhurtham Signature',
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lss-03',
    category: 'chanderi',
    category_name: 'Chanderi Tissue',
    title: 'Gossamer Chanderi Gold Tissue Saree',
    price: 'Rs. 12,800',
    fabric: 'Silk Warp with Micro Zari Weft • Featherweight 420g',
    zari: 'Featherlight Metallic Gold Luster',
    color: 'Champagne Gold & Warm Ivory',
    desc: 'Ethereal featherlight drape woven in Madhya Pradesh heritage clusters. Translucent gold luster reflecting ambient festive lighting.',
    tag: 'Cocktail & Sangeet',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lss-04',
    category: 'organza',
    category_name: 'Modern Organza',
    title: 'Handcrafted Zardozi Organza Saree',
    price: 'Rs. 14,200',
    fabric: 'Pure Glass Organza • Scalloped Needlework & Moti',
    zari: 'Delicate Muted Silver & Champagne Moti',
    color: 'Blush Rose Petal & Muted Silver',
    desc: 'Contemporary luxury crafted for the modern bride. Scalloped floral embroidered borders hand-finished with seed pearls and micro-dabka.',
    tag: 'Pastel Reception',
    img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lss-05',
    category: 'banarasi',
    category_name: 'Royal Banarasi',
    title: 'Bridal Swarna Shikargah Banarasi',
    price: 'Rs. 22,000',
    fabric: '100% Katan Silk • Royal Hunting Jaal Pattern',
    zari: 'Intricate Antique Sonarupa Zari',
    color: 'Vermilion Sindoor Red & Antique Gold',
    desc: 'Legendary Shikargah weave depicting royal animal figurines and scrolling vines across an intense vermilion silk canvas.',
    tag: 'Archival Collector',
    img: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lss-06',
    category: 'bridal',
    category_name: 'Bridal Trousseau',
    title: 'Regal Rajputana Raw Silk Trousseau Saree',
    price: 'Rs. 28,500',
    fabric: 'Heavy Handloom Raw Silk • Marodi Needlework & Dabka',
    zari: 'Heavy Antique Zardozi Work',
    color: 'Regal Magenta & Antique Gold',
    desc: 'Opulent ceremonial trousseau drape encrusted with hand-stitched dabka, sequins, and gota patti borders crafted for wedding ceremonies.',
    tag: 'Royal Trousseau',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  }
];

// 1. Fabric Opening Animation Dismissal
function dismissFabricReveal() {
  const overlay = document.getElementById('fabric-reveal');
  if (overlay) {
    overlay.classList.add('hidden');
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 450);
  }
}

// 2. Mobile Navigation Toggle
function toggleMobileNav() {
  const nav = document.getElementById('nav-menu');
  if (nav) {
    nav.classList.toggle('open');
  }
}

// 3. Collection Filter Tabs
function filterSarees(category, btn) {
  document.querySelectorAll('.filter-tab, .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.saree-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-cat') || card.getAttribute('data-category');
    if (category === 'all' || cat === category) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.35s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterByCollection(category) {
  const arrivals = document.getElementById('new-arrivals') || document.getElementById('saree-grid');
  if (arrivals) {
    arrivals.scrollIntoView({ behavior: 'smooth' });
  }
  const btn = document.querySelector(`.filter-tab[onclick*="${category}"], .filter-btn[data-filter="${category}"]`);
  filterSarees(category, btn);
}

// 4. Product Modal Logic
function openProductModal(productId) {
  const products = window.LSS_PRODUCTS || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;

  const grid = document.getElementById('modal-grid-content');
  if (grid) {
    grid.innerHTML = `
      <div class="modal-img-wrap" style="position:relative; overflow:hidden; border-radius:6px; min-height:360px;">
        <img src="${product.img}" alt="${product.title}" style="width:100%; height:100%; max-height:450px; object-fit:cover; display:block;">
        <span class="badge-tag" style="position:absolute; top:1rem; left:1rem; z-index:2;">${product.tag}</span>
      </div>
      <div class="modal-details" style="padding:1.8rem; display:flex; flex-direction:column; justify-content:space-between; background:#160306;">
        <div>
          <span class="saree-cat" style="color:var(--color-gold); font-size:0.75rem; font-weight:700; letter-spacing:0.15em;">${product.category_name.toUpperCase()}</span>
          <h2 style="font-family:var(--font-serif-title); color:#fff; font-size:1.5rem; margin:0.4rem 0 0.8rem; line-height:1.3;">${product.title}</h2>
          <div style="font-size:1.4rem; color:var(--color-gold); font-weight:700; font-family:var(--font-serif-title); margin-bottom:1rem;">${product.price}</div>
          <div style="font-size:0.85rem; color:var(--color-beige); margin-bottom:1.2rem; line-height:1.7;">
            <p style="margin-bottom:0.4rem;"><strong>🧵 Fabric:</strong> ${product.fabric}</p>
            <p style="margin-bottom:0.4rem;"><strong>✨ Zari Weave:</strong> ${product.zari}</p>
            <p style="margin-bottom:0.4rem;"><strong>🎨 Palette:</strong> ${product.color}</p>
            <p style="margin-top:0.8rem; color:#fdfbf7; opacity:0.9;">${product.desc}</p>
          </div>
        </div>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--color-border);">
          <button class="btn-primary" onclick="addToSimulatedCart('${product.id}'); closeProductModal(); toggleCartDrawer();" style="flex:1; padding:0.75rem 1rem;">+ Add to Bridal Bag</button>
          <a href="https://wa.me/916267686575?text=${encodeURIComponent('Namaste Lakshmi Saree Sansar, I am inquiring about ' + product.title + ' (' + product.price + ') at Shraja Mall, Burhar')}" target="_blank" class="btn-wa-card" style="padding:0.75rem 1.2rem; font-size:1rem; text-decoration:none;" title="Inquire on WhatsApp">💬 WhatsApp Stylist</a>
        </div>
      </div>
    `;
  }

  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
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
    if (cart && (cart.classList.contains('active') || cart.classList.contains('open'))) {
      toggleCartDrawer();
    }
  }
});

// 5. Simulated Shopping Bag (Cart) Drawer
function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.toggle('active');
    drawer.classList.toggle('open');
    const isHidden = drawer.getAttribute('aria-hidden') === 'true';
    drawer.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
  }
}

function addToSimulatedCart(productId) {
  const products = window.LSS_PRODUCTS || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  simulatedCart.push(product);
  updateCartUI();
  
  // Provide quick feedback & open drawer
  toggleCartDrawer();
}

function removeFromCart(index) {
  simulatedCart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const count = simulatedCart.length;
  
  const headerCount = document.getElementById('header-bag-count');
  const bagCount = document.getElementById('bag-count');
  const cartCount = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-count');
  
  if (headerCount) headerCount.textContent = count;
  if (bagCount) bagCount.textContent = count;
  if (cartCount) cartCount.textContent = count;
  if (drawerCount) drawerCount.textContent = `${count} item${count === 1 ? '' : 's'}`;

  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');
  const totalAmount = document.getElementById('cart-total-amount');
  const drawerSubtotal = document.getElementById('drawer-subtotal');

  if (count === 0) {
    if (container) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 1rem; display:block; color:var(--color-gold);"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>Your bridal trousseau bag is currently empty.</p>
          <a href="collections.html" class="btn-primary" style="margin-top:1.5rem; display:inline-block;" onclick="toggleCartDrawer()">Explore Master Treasury &rarr;</a>
        </div>
      `;
    }
    if (footer) footer.style.display = 'none';
    if (totalAmount) totalAmount.textContent = 'Rs. 0';
    if (drawerSubtotal) drawerSubtotal.textContent = 'Rs. 0';
    return;
  }

  let totalNum = 0;
  let itemsHtml = '';

  simulatedCart.forEach((item, idx) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    totalNum += num;

    itemsHtml += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.title}</h4>
          <span class="cart-item-price">${item.price}</span>
          <br>
          <button class="cart-remove-btn" onclick="removeFromCart(${idx})">✕ Remove from Bag</button>
        </div>
      </div>
    `;
  });

  if (container) container.innerHTML = itemsHtml;
  if (footer) footer.style.display = 'block';
  const formattedTotal = `Rs. ${totalNum.toLocaleString('en-IN')}`;
  if (totalAmount) totalAmount.textContent = formattedTotal;
  if (drawerSubtotal) drawerSubtotal.textContent = formattedTotal;
}

function triggerSimulatedCheckout() {
  if (simulatedCart.length === 0) {
    alert("Your shopping bag is empty! Please choose a saree to test the checkout flow.");
    return;
  }

  const itemsList = simulatedCart.map(i => `• ${i.title} (${i.price})`).join('\n');
  const phone = "916267686575";
  const msg = `Namaste Lakshmi Saree Sansar, I saw the demo website created by SHIV.\nI have curated the following sarees in my bag:\n\n${itemsList}\n\nI would like to inquire about their availability and arrange an in-store drape trial at Shraja Mall, Burhar.`;
  
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// 6. Appointment Booking Form Handler
function handleAppointmentSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('app-name').value.trim();
  const phone = document.getElementById('app-phone').value.trim();
  const date = document.getElementById('app-date').value;
  const occasion = document.getElementById('app-occasion').value;
  const notes = document.getElementById('app-notes') ? document.getElementById('app-notes').value.trim() : '';

  let msg = `*VIP Drape Appointment Booking — Lakshmi Saree Sansar*\n`;
  msg += `(Inquiry via SHIV Demo Website)\n\n`;
  msg += `👤 *Client Name:* ${name}\n`;
  msg += `📞 *WhatsApp:* ${phone}\n`;
  msg += `📅 *Date of Visit:* ${date || 'Flexible / Walk-in'}\n`;
  msg += `✨ *Occasion:* ${occasion}\n`;
  if (notes) msg += `📝 *Notes/Preferences:* ${notes}\n\n`;
  msg += `_I saw the demo website of Lakshmi Saree Sansar, I want to know the details of websites made by SHIV._`;

  const waUrl = `https://wa.me/916267686575?text=${encodeURIComponent(msg)}`;

  const msgBox = document.getElementById('form-msg');
  if (msgBox) {
    msgBox.style.display = 'block';
    msgBox.innerHTML = `✓ Thank you, ${name}! Redirecting to WhatsApp to confirm your appointment at Shraja Mall...`;
  }

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 700);
}

// 7. VIP 9-Page Flagship Interactive Controllers
let currentTryonTone = 'Fair / Rose Porcelain';
let currentTryonSareeName = 'Imperial Shahi Banarasi Katan Silk';
let currentTryonSareePrice = 'Rs. 18,500';
let currentTryonStyle = 'Classic Pleated Nivi Drape';

function setMannequinTone(hex, label, btn) {
  document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentTryonTone = label;
  
  const face = document.getElementById('svg-face');
  const neck = document.getElementById('svg-neck');
  if (face) face.setAttribute('fill', hex);
  if (neck) neck.setAttribute('fill', hex);
  
  updateTryonSummary();
}

function selectTryonSaree(id, skirtHex, zariHex, name, price, el) {
  document.querySelectorAll('.fabric-opt').forEach(opt => opt.classList.remove('active'));
  if (el) el.classList.add('active');
  
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
  if (btn) btn.classList.add('active');
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
  const msg = encodeURIComponent(`Namaste Lakshmi Saree Sansar,
I simulated a custom drape on your AI Virtual Studio:
- Saree: ${currentTryonSareeName} (${currentTryonSareePrice})
- Style: ${currentTryonStyle}
- Complexion: ${currentTryonTone}
Please arrange a physical drape trial at your Shraja Mall boutique in Burhar.`);
  window.open(`https://wa.me/916267686575?text=${msg}`, '_blank');
}

// 8. Custom Atelier Calculation
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
  const fab = document.getElementById('sum-fabric') ? document.getElementById('sum-fabric').textContent : '';
  const zar = document.getElementById('sum-zari') ? document.getElementById('sum-zari').textContent : '';
  const mot = document.getElementById('sum-motif') ? document.getElementById('sum-motif').textContent : '';
  const mono = document.getElementById('sum-monogram') ? document.getElementById('sum-monogram').textContent : '';
  const total = document.getElementById('custom-total-display') ? document.getElementById('custom-total-display').textContent : '';
  
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

// 9. Auto-initialization
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(dismissFabricReveal, 800);
  
  if (document.getElementById('custom-fabric')) {
    calculateCustomPrice();
  }
  
  if (document.getElementById('svg-face')) {
    updateTryonSummary();
  }
  
  updateCartUI();
});
