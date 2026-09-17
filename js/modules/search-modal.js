/* ==========================================================================
   THE 1 METHOD STORE — LIVE SEARCH OVERLAY CONTROLLER
   Instant typeahead search across titles, descriptions, and categories
   ========================================================================== */

import { PRODUCTS_DATABASE } from './store-data.js';

export function initSearchModal() {
  const modal = document.getElementById('search-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');
  const searchInput = modal.querySelector('#search-modal-input');
  const resultsContainer = modal.querySelector('.search-results-list');
  const openBtns = document.querySelectorAll('[data-open-search]');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
    renderInitialSuggestions();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        renderInitialSuggestions();
        return;
      }

      const matches = PRODUCTS_DATABASE.filter(p => {
        return p.title.toLowerCase().includes(query) ||
               p.subtitle.toLowerCase().includes(query) ||
               p.sku.toLowerCase().includes(query) ||
               p.categories.some(c => c.toLowerCase().includes(query));
      });

      renderResults(matches, query);
    });
  }

  function renderInitialSuggestions() {
    if (!resultsContainer) return;
    const popular = PRODUCTS_DATABASE.slice(0, 4);

    resultsContainer.innerHTML = `
      <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-outline); font-weight: 700; margin-bottom: 0.5rem;">
        Popular Academy Products
      </p>
      ${popular.map(p => createResultItem(p)).join('')}
    `;
  }

  function renderResults(matches, query) {
    if (!resultsContainer) return;

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align:center; padding: 2.5rem 1rem; color: var(--color-outline);">
          <span class="material-symbols-outlined" style="font-size: 36px; margin-bottom: 0.5rem;">search_off</span>
          <p style="font-size: 0.95rem; color: var(--color-on-surface);">No products found for "${query}"</p>
          <p style="font-size: 0.8125rem;">Try searching for "kit", "book", "spine", or "masterclass"</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-secondary); font-weight: 700; margin-bottom: 0.5rem;">
        Found ${matches.length} Result${matches.length > 1 ? 's' : ''}
      </p>
      ${matches.map(p => createResultItem(p)).join('')}
    `;
  }

  function createResultItem(product) {
    return `
      <a href="product.html?id=${product.id}" class="search-result-item">
        <div style="width: 52px; height: 52px; min-width: 52px; border-radius: var(--radius-sm); overflow:hidden; background: var(--color-surface-low);">
          <img src="${product.images[0]}" alt="${product.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div style="flex:1;">
          <h5 style="font-family: var(--font-serif); font-size: 0.95rem; font-weight: 600; color: var(--color-on-surface); margin-bottom: 0.15rem;">
            ${product.title}
          </h5>
          <span style="font-size: 0.75rem; color: var(--color-secondary); font-weight: 600; text-transform: uppercase;">
            ${product.categories[0]}
          </span>
        </div>
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-on-surface);">
          $${product.basePrice.toFixed(2)}
        </div>
      </a>
    `;
  }
}
