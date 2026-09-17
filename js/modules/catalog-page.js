/* ==========================================================================
   THE 1 METHOD STORE — CATALOG PAGE CONTROLLER (catalog.html)
   Multi-category filtering, price sliders, sorting, search, grid/list view
   ========================================================================== */

import { PRODUCTS_DATABASE, STORE_CATEGORIES } from './store-data.js';
import { Cart } from './cart.js';

export function initCatalogPage() {
  const gridContainer = document.getElementById('catalog-products-grid');
  if (!gridContainer) return;

  // State
  const state = {
    categories: [],
    minPrice: 0,
    maxPrice: 3000,
    stockFilter: 'all', // all, in-stock, low-stock
    searchQuery: '',
    sortBy: 'featured', // featured, price-asc, price-desc, newest, rating, bestseller
    viewMode: 'grid' // grid, list
  };

  // Read URL parameters on initial load
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const initialSearch = urlParams.get('search');
  if (initialCategory) state.categories.push(initialCategory);
  if (initialSearch) state.searchQuery = initialSearch;

  // Bind controls
  bindFilters(state, applyAndRender);
  bindControls(state, applyAndRender);

  // Initial render
  applyAndRender();

  function applyAndRender() {
    const filtered = filterProducts(state);
    const sorted = sortProducts(filtered, state.sortBy);
    renderProducts(gridContainer, sorted, state.viewMode);
    renderActiveFilterChips(state, applyAndRender);
    updateResultCount(sorted.length, PRODUCTS_DATABASE.length);
  }
}

function filterProducts(state) {
  return PRODUCTS_DATABASE.filter(product => {
    // 1. Category Filter (multi-category logic)
    if (state.categories.length > 0) {
      const matchesAnyCategory = product.categories.some(c => state.categories.includes(c));
      if (!matchesAnyCategory) return false;
    }

    // 2. Price Range Filter
    if (product.basePrice < state.minPrice || product.basePrice > state.maxPrice) {
      return false;
    }

    // 3. Stock Status Filter
    if (state.stockFilter === 'in-stock') {
      const hasStock = product.variants.some(v => v.stock > 0);
      if (!hasStock) return false;
    } else if (state.stockFilter === 'low-stock') {
      const hasLowStock = product.variants.some(v => v.stock > 0 && v.stock <= 3);
      if (!hasLowStock) return false;
    }

    // 4. Search Filter
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchesText = product.title.toLowerCase().includes(q) ||
                          product.subtitle.toLowerCase().includes(q) ||
                          product.sku.toLowerCase().includes(q) ||
                          product.shortDesc.toLowerCase().includes(q);
      if (!matchesText) return false;
    }

    return true;
  });
}

function sortProducts(products, sortBy) {
  const list = [...products];
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.basePrice - b.basePrice);
    case 'price-desc':
      return list.sort((a, b) => b.basePrice - a.basePrice);
    case 'newest':
      return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating);
    case 'bestseller':
      return list.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    case 'featured':
    default:
      return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

function renderProducts(container, products, viewMode) {
  container.className = `products-grid ${viewMode === 'list' ? 'list-view' : ''}`;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="catalog-empty-state" style="grid-column: 1 / -1;">
        <span class="material-symbols-outlined empty-state-icon">filter_alt_off</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No Products Match Your Criteria</h3>
        <p style="color: var(--color-outline); margin-bottom: 1.5rem; font-size: 0.95rem;">Try adjusting or clearing your filters to see more results.</p>
        <button class="btn btn-primary" id="btn-reset-empty-filters">Reset All Filters</button>
      </div>
    `;

    document.getElementById('btn-reset-empty-filters')?.addEventListener('click', () => {
      document.getElementById('btn-clear-all-filters')?.click();
    });
    return;
  }

  container.innerHTML = products.map(product => {
    const defaultVariant = product.variants[0];
    const isOutOfStock = defaultVariant.stock <= 0;
    const isLowStock = defaultVariant.stock > 0 && defaultVariant.stock <= 3;
    const discountAmount = defaultVariant.originalPrice > defaultVariant.price
      ? Math.round(((defaultVariant.originalPrice - defaultVariant.price) / defaultVariant.originalPrice) * 100)
      : 0;

    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-card-media">
          <div class="product-badges-stack">
            ${product.bestseller ? '<span class="product-badge badge-bestseller">Bestseller</span>' : ''}
            ${discountAmount > 0 ? `<span class="product-badge badge-sale">-${discountAmount}%</span>` : ''}
            ${product.isNew ? '<span class="product-badge badge-new">New</span>' : ''}
            ${isOutOfStock ? '<span class="product-badge badge-out-of-stock">Out of Stock</span>' : ''}
            ${isLowStock ? '<span class="product-badge badge-low-stock">Low Stock</span>' : ''}
          </div>

          <a href="product.html?id=${product.id}">
            <img src="${product.images[0]}" alt="${product.title}" class="product-card-img" loading="lazy">
            <img src="${product.images[1] || product.images[0]}" alt="${product.title} Alternate Angle" class="product-card-hover-img" loading="lazy">
          </a>

          <div class="product-quick-actions">
            <button class="btn-quick-view" data-quick-view="${product.id}">
              <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span> Quick View
            </button>
          </div>
        </div>

        <div class="product-card-body">
          <div class="product-card-categories">
            ${product.categories.map(c => {
              const cat = STORE_CATEGORIES.find(item => item.id === c);
              return cat ? cat.name : c;
            }).join(' • ')}
          </div>

          <h3 class="product-card-title">
            <a href="product.html?id=${product.id}">${product.title}</a>
          </h3>

          <div class="product-card-rating">
            <div class="stars-row">
              ${renderStars(product.rating)}
            </div>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>

          <div class="product-card-pricing-row">
            <div>
              <div class="price-box">
                <span class="price-current">$${defaultVariant.price.toFixed(2)}</span>
                ${defaultVariant.originalPrice > defaultVariant.price ? `
                  <span class="price-original">$${defaultVariant.originalPrice.toFixed(2)}</span>
                  <span class="price-discount-tag">-${discountAmount}%</span>
                ` : ''}
              </div>
              <div class="product-card-stock-dot" style="margin-top: 0.25rem;">
                <span class="stock-indicator-dot ${isOutOfStock ? 'out' : (isLowStock ? 'low' : 'in')}"></span>
                <span style="color: ${isOutOfStock ? 'var(--color-stock-out)' : (isLowStock ? 'var(--color-stock-low)' : 'var(--color-stock-in)')};">
                  ${isOutOfStock ? 'Out of Stock' : (isLowStock ? `Only ${defaultVariant.stock} left` : 'In Stock')}
                </span>
              </div>
            </div>

            <button class="btn-card-quick-add" data-card-add="${product.id}" data-variant-id="${defaultVariant.id}" title="${isOutOfStock ? 'Out of Stock' : 'Quick Add to Cart'}" ${isOutOfStock ? 'disabled' : ''}>
              <span class="material-symbols-outlined" style="font-size: 19px;">${isOutOfStock ? 'block' : 'add_shopping_cart'}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Bind direct Add to Cart buttons on cards
  container.querySelectorAll('[data-card-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-card-add');
      const vId = btn.getAttribute('data-variant-id');
      btn.innerHTML = `<span class="material-symbols-outlined spin" style="font-size: 16px;">progress_activity</span>`;
      btn.disabled = true;

      setTimeout(() => {
        Cart.addItem(pId, vId, 1);
        btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-stock-in);">check</span>`;
        setTimeout(() => {
          btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 19px;">add_shopping_cart</span>`;
          btn.disabled = false;
        }, 1200);
        window.dispatchEvent(new CustomEvent('cart:open-drawer'));
      }, 250);
    });
  });
}

function renderStars(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<span class="material-symbols-outlined">star</span>';
    } else {
      starsHtml += '<span class="material-symbols-outlined">star_half</span>';
    }
  }
  return starsHtml;
}

function bindFilters(state, onUpdate) {
  // Category checkboxes
  const categoryCheckboxes = document.querySelectorAll('.catalog-category-checkbox');
  categoryCheckboxes.forEach(cb => {
    // Sync initial from state
    if (state.categories.includes(cb.value)) cb.checked = true;

    cb.addEventListener('change', () => {
      if (cb.checked) {
        if (!state.categories.includes(cb.value)) state.categories.push(cb.value);
      } else {
        state.categories = state.categories.filter(c => c !== cb.value);
      }
      onUpdate();
    });
  });

  // Price Dual Range & Inputs
  const maxPriceInput = document.getElementById('filter-price-max-input');
  const priceRangeSlider = document.getElementById('filter-price-slider');

  if (priceRangeSlider && maxPriceInput) {
    priceRangeSlider.addEventListener('input', (e) => {
      state.maxPrice = parseFloat(e.target.value);
      maxPriceInput.value = state.maxPrice;
      onUpdate();
    });

    maxPriceInput.addEventListener('change', (e) => {
      const val = parseFloat(e.target.value) || 3000;
      state.maxPrice = val;
      priceRangeSlider.value = val;
      onUpdate();
    });
  }

  // Stock Radio Filters
  const stockRadios = document.querySelectorAll('input[name="filter-stock"]');
  stockRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      state.stockFilter = radio.value;
      onUpdate();
    });
  });

  // Clear All Button
  const clearBtn = document.getElementById('btn-clear-all-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.categories = [];
      state.minPrice = 0;
      state.maxPrice = 3000;
      state.stockFilter = 'all';
      state.searchQuery = '';

      categoryCheckboxes.forEach(cb => cb.checked = false);
      if (priceRangeSlider) priceRangeSlider.value = 3000;
      if (maxPriceInput) maxPriceInput.value = 3000;
      const allStockRadio = document.querySelector('input[name="filter-stock"][value="all"]');
      if (allStockRadio) allStockRadio.checked = true;
      const searchInput = document.getElementById('catalog-search-input');
      if (searchInput) searchInput.value = '';

      onUpdate();
    });
  }
}

function bindControls(state, onUpdate) {
  // Sorting select
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      onUpdate();
    });
  }

  // View mode toggles
  const gridBtn = document.getElementById('view-grid-btn');
  const listBtn = document.getElementById('view-list-btn');

  if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
      state.viewMode = 'grid';
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      onUpdate();
    });

    listBtn.addEventListener('click', () => {
      state.viewMode = 'list';
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      onUpdate();
    });
  }

  // Catalog search input
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    if (state.searchQuery) searchInput.value = state.searchQuery;

    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      onUpdate();
    });
  }

  // Mobile Filter Drawer Toggle
  const mobileFilterBtn = document.querySelector('.btn-mobile-filter');
  const sidebar = document.querySelector('.catalog-sidebar');
  if (mobileFilterBtn && sidebar) {
    mobileFilterBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    // Close button inside mobile sidebar
    sidebar.querySelector('.filter-close-btn')?.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
    });
  }
}

function renderActiveFilterChips(state, onUpdate) {
  const container = document.getElementById('catalog-active-chips');
  if (!container) return;

  const chips = [];

  state.categories.forEach(catId => {
    const found = STORE_CATEGORIES.find(c => c.id === catId);
    chips.push({
      label: found ? found.name : catId,
      remove: () => {
        state.categories = state.categories.filter(c => c !== catId);
        const cb = document.querySelector(`.catalog-category-checkbox[value="${catId}"]`);
        if (cb) cb.checked = false;
        onUpdate();
      }
    });
  });

  if (state.maxPrice < 3000) {
    chips.push({
      label: `Under $${state.maxPrice}`,
      remove: () => {
        state.maxPrice = 3000;
        const slider = document.getElementById('filter-price-slider');
        const input = document.getElementById('filter-price-max-input');
        if (slider) slider.value = 3000;
        if (input) input.value = 3000;
        onUpdate();
      }
    });
  }

  if (state.stockFilter !== 'all') {
    chips.push({
      label: state.stockFilter === 'in-stock' ? 'In Stock Only' : 'Low Stock Only',
      remove: () => {
        state.stockFilter = 'all';
        const r = document.querySelector('input[name="filter-stock"][value="all"]');
        if (r) r.checked = true;
        onUpdate();
      }
    });
  }

  if (state.searchQuery) {
    chips.push({
      label: `"${state.searchQuery}"`,
      remove: () => {
        state.searchQuery = '';
        const input = document.getElementById('catalog-search-input');
        if (input) input.value = '';
        onUpdate();
      }
    });
  }

  if (chips.length === 0) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = chips.map((chip, idx) => `
    <span class="filter-chip">
      ${chip.label}
      <button data-chip-idx="${idx}"><span class="material-symbols-outlined" style="font-size:14px;">close</span></button>
    </span>
  `).join('') + `
    <button id="btn-clear-chips" style="font-size: 0.8125rem; color: var(--color-secondary); font-weight:600; text-decoration:underline; cursor:pointer;">
      Clear All
    </button>
  `;

  container.querySelectorAll('[data-chip-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-chip-idx'), 10);
      chips[idx].remove();
    });
  });

  document.getElementById('btn-clear-chips')?.addEventListener('click', () => {
    document.getElementById('btn-clear-all-filters')?.click();
  });
}

function updateResultCount(showing, total) {
  const countEl = document.getElementById('catalog-results-count');
  if (countEl) {
    countEl.textContent = `Showing ${showing} of ${total} products`;
  }
}
