// SHIV Web Studio - Master Showcase Portal Interactive Controller
let currentCategory = 'all';

function setCategoryFilter(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterProspects();
}

function filterProspects() {
  const query = (document.getElementById('prospect-search').value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.prospect-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const cardData = (card.getAttribute('data-name') || '').toLowerCase();
    
    const matchesCat = (currentCategory === 'all') || (cardCat === currentCategory);
    const matchesQuery = !query || cardData.includes(query);

    if (matchesCat && matchesQuery) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countElem = document.getElementById('results-count');
  if (countElem) {
    if (visibleCount === 36 && currentCategory === 'all' && !query) {
      countElem.textContent = 'Showing all 36 websites';
    } else {
      countElem.textContent = `Showing ${visibleCount} of 36 websites`;
    }
  }
}

// Modal Viewport Controller
function openPreview(urlPath, siteName) {
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  const titleElem = document.getElementById('preview-title');
  const extLink = document.getElementById('preview-ext-link');

  if (modal && iframe) {
    if (titleElem) titleElem.textContent = `${siteName} (Interactive Simulation)`;
    if (extLink) extLink.href = urlPath;
    iframe.src = urlPath;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closePreview() {
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  if (modal) {
    modal.style.display = 'none';
    if (iframe) iframe.src = 'about:blank';
    document.body.style.overflow = '';
  }
}

function setViewport(width, btn) {
  document.querySelectorAll('.vp-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  const wrapper = document.getElementById('iframe-wrapper');
  if (wrapper) {
    if (typeof width === 'number') {
      wrapper.style.width = width + 'px';
      wrapper.style.maxWidth = '100%';
    } else {
      wrapper.style.width = '100%';
      wrapper.style.maxWidth = '100%';
    }
  }
}

// Close modal on backdrop click or Escape key
window.addEventListener('click', (e) => {
  const modal = document.getElementById('preview-modal');
  if (e.target === modal) {
    closePreview();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePreview();
  }
});
