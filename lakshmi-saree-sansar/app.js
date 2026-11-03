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
