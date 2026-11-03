// SHIV Web Studio - Master Showcase Portal Interactive Controller
let currentCategory = 'all';
const prefetchedUrls = new Set();

// High-speed resource prefetcher for demo websites
function prefetchDemo(url) {
  if (!url || prefetchedUrls.has(url)) return;
  prefetchedUrls.add(url);
  try {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'document';
    link.href = url;
    document.head.appendChild(link);
  } catch (e) {
    // Graceful fallback
  }
}

function setCategoryFilter(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.getAttribute('data-filter') === cat) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
  filterProspects();
}

function filterProspects() {
  const searchInput = document.getElementById('prospect-search');
  const clearBtn = document.getElementById('search-clear-btn');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
  
  if (clearBtn) {
    clearBtn.style.display = query ? 'block' : 'none';
  }

  const cards = document.querySelectorAll('.prospect-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    const cardTier = (card.getAttribute('data-tier') || '').toLowerCase();
    const cardData = (card.getAttribute('data-name') || '').toLowerCase();
    
    const matchesCat = (currentCategory === 'all') 
                    || (cardCat === currentCategory) 
                    || (cardTier === currentCategory);
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
    if (visibleCount === 37 && currentCategory === 'all' && !query) {
      countElem.textContent = 'Showing all 37 websites';
    } else {
      countElem.textContent = `Showing ${visibleCount} of 37 websites`;
    }
  }
}

function clearSearch() {
  const searchInput = document.getElementById('prospect-search');
  const clearBtn = document.getElementById('search-clear-btn');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  if (clearBtn) {
    clearBtn.style.display = 'none';
  }
  filterProspects();
}

// Modal Viewport Controller with High-Speed Loader
function openPreview(urlPath, siteName) {
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  const titleElem = document.getElementById('preview-title');
  const extLink = document.getElementById('preview-ext-link');

  if (modal && iframe) {
    if (titleElem) titleElem.textContent = `${siteName} (Live Simulator)`;
    if (extLink) extLink.href = urlPath;
    
    // Set src and display
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
      wrapper.style.maxWidth = '95%';
      wrapper.classList.add('is-mobile-frame');
    } else {
      wrapper.style.width = '100%';
      wrapper.style.maxWidth = '100%';
      wrapper.classList.remove('is-mobile-frame');
    }
  }
}

// Attach automatic hover prefetch to all card preview triggers
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.card-actions button, .card-actions a');
  triggers.forEach(el => {
    el.addEventListener('mouseenter', () => {
      const card = el.closest('.prospect-card');
      if (card) {
        const previewBtn = card.querySelector('button[onclick*="openPreview"]');
        if (previewBtn) {
          const match = previewBtn.getAttribute('onclick').match(/openPreview\(['"]([^'"]+)['"]/);
          if (match && match[1]) {
            prefetchDemo(match[1]);
          }
        }
      }
    });
    el.addEventListener('touchstart', () => {
      const card = el.closest('.prospect-card');
      if (card) {
        const previewBtn = card.querySelector('button[onclick*="openPreview"]');
        if (previewBtn) {
          const match = previewBtn.getAttribute('onclick').match(/openPreview\(['"]([^'"]+)['"]/);
          if (match && match[1]) {
            prefetchDemo(match[1]);
          }
        }
      }
    }, { passive: true });
  });
});

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
