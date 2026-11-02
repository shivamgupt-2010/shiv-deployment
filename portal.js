// SHIV Web Studio - Master Showcase Portal Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Year
  const yearElem = document.getElementById('curYear');
  if (yearElem) yearElem.textContent = new Date().getFullYear();

  // 2. Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.prospect-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      filterCards(filter);
    });
  });

  function filterCards(filterVal) {
    const query = (document.getElementById('searchInput').value || '').toLowerCase().trim();
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const matchCat = filterVal === 'all' || cat === filterVal;
      const matchQuery = !query || name.includes(query);

      if (matchCat && matchQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // 3. Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const activeTab = document.querySelector('.filter-tab.active');
      const filter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
      filterCards(filter);
    });
  }

  // 4. Device Switchers in Modal
  const devBtns = document.querySelectorAll('.dev-btn');
  const viewport = document.getElementById('deviceViewport');

  devBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      devBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const width = btn.getAttribute('data-width');
      if (viewport) {
        viewport.style.width = width;
      }
    });
  });
});

function openPreview(urlPath, siteName) {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  const nameElem = document.getElementById('modalSiteName');
  const urlElem = document.getElementById('modalSiteUrl');
  const extLink = document.getElementById('modalExternalLink');

  if (modal && iframe) {
    if (nameElem) nameElem.textContent = siteName;
    if (urlElem) urlElem.textContent = `/${urlPath}`;
    if (extLink) extLink.href = urlPath;
    iframe.src = urlPath;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closePreview() {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (iframe) iframe.src = 'about:blank';
    document.body.style.overflow = '';
  }
}

// Close on backdrop click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('previewModal');
  if (e.target === modal) {
    closePreview();
  }
});
