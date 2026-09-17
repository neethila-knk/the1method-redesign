/* ==========================================================================
   THE 1 METHOD STORE — QUICK VIEW MODAL CONTROLLER
   Fast product previews directly from product cards across any page
   ========================================================================== */

import { getProductById } from './store-data.js';
import { Cart } from './cart.js';

export function initQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');
  const contentBox = modal.querySelector('.quick-view-content');

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-quick-view]');
    if (!trigger) return;

    e.preventDefault();
    const prodId = trigger.getAttribute('data-quick-view');
    const product = getProductById(prodId);
    if (!product) return;

    renderQuickViewContent(contentBox, product);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

function renderQuickViewContent(container, product) {
  let activeVariant = product.variants[0];
  let qty = 1;

  function updateView() {
    const isOutOfStock = activeVariant.stock <= 0;
    const isLowStock = activeVariant.stock > 0 && activeVariant.stock <= 3;
    const stockClass = isOutOfStock ? 'out-of-stock' : (isLowStock ? 'low-stock' : 'in-stock');
    const stockText = isOutOfStock
      ? 'Out of Stock'
      : (isLowStock ? `Low Stock — Only ${activeVariant.stock} left` : 'In Stock — Ready to ship');

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; align-items: flex-start;">
        <div>
          <div style="border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface-low); aspect-ratio: 1/1; border: 1px solid var(--color-card-border); margin-bottom: 0.75rem;">
            <img src="${product.images[activeVariant.imageIndex || 0]}" alt="${product.title}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <a href="product.html?id=${product.id}" class="btn btn-outline" style="width: 100%; font-size: 0.8125rem; padding: 0.5rem;">
            View Full Product Details →
          </a>
        </div>

        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-secondary); font-weight: 700;">
            ${product.categories.join(' • ')}
          </span>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-top: 0.35rem; margin-bottom: 0.75rem; line-height: 1.25;">
            ${product.title}
          </h3>

          <div style="display:flex; align-items:baseline; gap: 0.75rem; margin-bottom: 1rem;">
            <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-on-surface); font-family: var(--font-sans);">
              $${activeVariant.price.toFixed(2)}
            </span>
            ${activeVariant.originalPrice > activeVariant.price ? `
              <span style="font-size: 1.05rem; color: var(--color-outline); text-decoration: line-through;">
                $${activeVariant.originalPrice.toFixed(2)}
              </span>
              <span class="price-discount-tag">Save $${(activeVariant.originalPrice - activeVariant.price).toFixed(2)}</span>
            ` : ''}
          </div>

          <div class="pdp-stock-status-box ${stockClass}" style="margin-bottom: 1.25rem;">
            <span class="stock-indicator-dot ${isOutOfStock ? 'out' : (isLowStock ? 'low' : 'in')}"></span>
            <span>${stockText}</span>
          </div>

          <p style="font-size: 0.875rem; color: var(--color-on-surface-variant); line-height: 1.5; margin-bottom: 1.25rem;">
            ${product.shortDesc}
          </p>

          <div style="margin-bottom: 1.25rem;">
            <label style="display:block; font-size: 0.8125rem; font-weight: 700; margin-bottom: 0.5rem;">
              Select Format / Option:
            </label>
            <div class="variant-pill-list">
              ${product.variants.map(v => `
                <button class="variant-pill-btn ${v.id === activeVariant.id ? 'active' : ''} ${v.stock <= 0 ? 'disabled' : ''}" data-qv-variant="${v.id}">
                  ${v.format} (${v.language || v.color})
                </button>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1.5rem;">
            <div class="qty-stepper" style="height: 44px;">
              <button class="qty-btn" id="qv-qty-dec">-</button>
              <input type="text" class="qty-input" id="qv-qty-val" value="${qty}" readonly>
              <button class="qty-btn" id="qv-qty-inc">+</button>
            </div>

            <button class="btn btn-primary" id="qv-add-cart-btn" style="flex: 1; height: 44px; font-size: 0.9rem;" ${isOutOfStock ? 'disabled' : ''}>
              ${isOutOfStock ? 'Out of Stock' : '<span class="material-symbols-outlined" style="font-size: 18px;">shopping_cart</span> Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind Variant selection inside quick view
    container.querySelectorAll('[data-qv-variant]').forEach(btn => {
      btn.addEventListener('click', () => {
        const vId = btn.getAttribute('data-qv-variant');
        const found = product.variants.find(v => v.id === vId);
        if (found) {
          activeVariant = found;
          qty = 1;
          updateView();
        }
      });
    });

    // Qty controls
    const decBtn = container.querySelector('#qv-qty-dec');
    const incBtn = container.querySelector('#qv-qty-inc');
    const qtyVal = container.querySelector('#qv-qty-val');
    const addBtn = container.querySelector('#qv-add-cart-btn');

    if (decBtn) {
      decBtn.addEventListener('click', () => {
        if (qty > 1) {
          qty--;
          qtyVal.value = qty;
        }
      });
    }

    if (incBtn) {
      incBtn.addEventListener('click', () => {
        if (qty < activeVariant.stock) {
          qty++;
          qtyVal.value = qty;
        } else {
          alert(`Maximum available stock is ${activeVariant.stock}`);
        }
      });
    }

    if (addBtn && !isOutOfStock) {
      addBtn.addEventListener('click', () => {
        addBtn.innerHTML = `<span class="material-symbols-outlined spin" style="font-size: 18px;">progress_activity</span> Adding...`;
        addBtn.disabled = true;

        setTimeout(() => {
          Cart.addItem(product.id, activeVariant.id, qty);
          document.getElementById('quick-view-modal')?.classList.remove('active');
          document.body.style.overflow = '';
          window.dispatchEvent(new CustomEvent('cart:open-drawer'));
        }, 300);
      });
    }
  }

  updateView();
}
