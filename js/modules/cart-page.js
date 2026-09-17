/* ==========================================================================
   THE 1 METHOD STORE — FULL CART PAGE CONTROLLER (cart.html)
   Line items table, stock bounds, shipping selection, promo code validation
   ========================================================================== */

import { Cart, SHIPPING_METHODS } from './cart.js';

export function initCartPage() {
  const container = document.getElementById('cart-page-container');
  if (!container) return;

  renderCartPage();

  window.addEventListener('cart:updated', () => {
    renderCartPage();
  });
}

function renderCartPage() {
  const items = Cart.getItems();
  const totals = Cart.getTotals();
  const tableContainer = document.getElementById('cart-table-body');
  const summaryContainer = document.getElementById('cart-summary-card');
  const emptyStateContainer = document.getElementById('cart-page-empty');
  const layoutContainer = document.getElementById('cart-main-layout');

  if (items.length === 0) {
    if (layoutContainer) layoutContainer.style.display = 'none';
    if (emptyStateContainer) emptyStateContainer.style.display = 'block';
    return;
  }

  if (layoutContainer) layoutContainer.style.display = 'grid';
  if (emptyStateContainer) emptyStateContainer.style.display = 'none';

  // Render Table Rows
  if (tableContainer) {
    tableContainer.innerHTML = items.map(item => {
      const isLowStock = item.maxStock <= 3;
      return `
        <div class="cart-table-row" data-item-id="${item.cartItemId}">
          <div class="cart-row-product">
            <div class="cart-row-thumb">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div>
              <h4 style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 0.25rem;">
                <a href="product.html?id=${item.productId}">${item.title}</a>
              </h4>
              <p style="font-size: 0.8125rem; color: var(--color-secondary); font-weight: 600; margin-bottom: 0.35rem;">
                ${item.format} • ${item.language || item.color}
              </p>
              ${isLowStock ? `
                <span style="display:inline-block; font-size: 0.725rem; font-weight: 700; color: var(--color-stock-low);">
                  ⚠️ Low Stock: Only ${item.maxStock} units remaining
                </span>
              ` : ''}
              <div style="margin-top: 0.5rem;">
                <button class="cart-item-remove-btn" data-remove="${item.cartItemId}" style="font-size: 0.8125rem; gap: 0.25rem;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">delete</span> Remove
                </button>
              </div>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 1rem; color: var(--color-on-surface);">
            $${item.price.toFixed(2)}
          </div>

          <div>
            <div class="qty-stepper">
              <button class="qty-btn" data-qty-dec="${item.cartItemId}">-</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly>
              <button class="qty-btn" data-qty-inc="${item.cartItemId}">+</button>
            </div>
          </div>

          <div style="font-weight: 700; font-size: 1.15rem; color: var(--color-on-surface); text-align: right;">
            $${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      `;
    }).join('');

    bindTableEvents(tableContainer);
  }

  // Render Order Summary
  if (summaryContainer) {
    summaryContainer.innerHTML = `
      <h3 class="order-summary-title">Order Summary</h3>

      <div class="summary-calc-list">
        <div class="summary-calc-row">
          <span>Items Subtotal (${Cart.getItemCount()} items):</span>
          <span style="font-weight: 700;">$${totals.subtotal.toFixed(2)}</span>
        </div>

        ${totals.discountAmount > 0 ? `
          <div class="summary-calc-row discount">
            <span>Coupon Discount (${totals.promo.code}):</span>
            <span>-$${totals.discountAmount.toFixed(2)}</span>
          </div>
        ` : ''}

        <div class="summary-calc-row">
          <span>Shipping Method:</span>
          <span style="font-weight: 600;">
            ${totals.shippingCost === 0 ? '<span style="color: var(--color-stock-in);">FREE</span>' : '$' + totals.shippingCost.toFixed(2)}
          </span>
        </div>

        <div style="margin: 0.5rem 0;">
          <label style="font-size: 0.8125rem; font-weight: 600; color: var(--color-outline); display:block; margin-bottom: 0.35rem;">
            Estimated Delivery Method:
          </label>
          <select id="cart-shipping-select" class="form-input" style="padding: 0.5rem; font-size: 0.875rem;">
            ${SHIPPING_METHODS.map(m => `
              <option value="${m.id}" ${m.id === totals.shippingMethod.id ? 'selected' : ''}>
                ${m.name} (${m.id === 'standard' && totals.subtotal >= 150 ? 'FREE' : '$' + m.price.toFixed(2)})
              </option>
            `).join('')}
          </select>
        </div>

        <div class="summary-calc-row">
          <span>Estimated Tax (5%):</span>
          <span>$${totals.estimatedTax.toFixed(2)}</span>
        </div>

        <div class="summary-calc-row grand-total">
          <span>Estimated Total:</span>
          <span>$${totals.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <!-- Coupon Code Section -->
      <div style="margin-bottom: 1.5rem;">
        <label style="font-size: 0.8125rem; font-weight: 700; display:block; margin-bottom: 0.5rem;">
          Promotional / Academic Coupon:
        </label>
        ${totals.promo ? `
          <div class="applied-coupon-pill">
            <span>✓ Code <strong>${totals.promo.code}</strong> applied (${totals.promo.discountPercent}% OFF)</span>
            <button id="btn-remove-coupon" style="background:none; border:none; color:inherit; cursor:pointer; font-size: 1.1rem; line-height: 1;">×</button>
          </div>
        ` : `
          <div class="promo-code-box">
            <input type="text" id="cart-promo-input" class="promo-code-input" placeholder="e.g. WELCOME20">
            <button class="btn btn-outline" id="btn-apply-coupon" style="padding: 0 1.25rem;">Apply</button>
          </div>
          <p style="font-size: 0.75rem; color: var(--color-outline);">Try test codes: <strong>WELCOME20</strong> or <strong>OSIE10</strong></p>
        `}
      </div>

      <div style="display:flex; flex-direction:column; gap: 0.875rem;">
        <a href="checkout.html" class="btn btn-primary" style="height: 50px; font-size: 1rem; width: 100%;">
          <span class="material-symbols-outlined" style="font-size: 20px;">lock</span> Proceed to Checkout
        </a>
        <a href="catalog.html" class="btn btn-outline" style="height: 44px; font-size: 0.875rem; width: 100%;">
          ← Continue Shopping
        </a>
      </div>

      <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--color-card-border); text-align: center;">
        <div style="display:flex; justify-content:center; align-items:center; gap: 0.5rem; font-size: 0.775rem; color: var(--color-outline);">
          <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-stock-in);">verified_user</span>
          <span>256-Bit SSL Encrypted Checkout Guarantee</span>
        </div>
      </div>
    `;

    // Bind shipping selector
    document.getElementById('cart-shipping-select')?.addEventListener('change', (e) => {
      Cart.setShippingMethod(e.target.value);
    });

    // Bind promo code
    document.getElementById('btn-apply-coupon')?.addEventListener('click', () => {
      const input = document.getElementById('cart-promo-input');
      const res = Cart.applyPromo(input?.value);
      if (!res.success) {
        alert(res.message);
      }
    });

    document.getElementById('btn-remove-coupon')?.addEventListener('click', () => {
      Cart.removePromo();
    });
  }
}

function bindTableEvents(container) {
  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove');
      Cart.removeItem(id);
    });
  });

  container.querySelectorAll('[data-qty-dec]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-qty-dec');
      const item = Cart.getItems().find(i => i.cartItemId === id);
      if (item) Cart.updateQuantity(id, item.quantity - 1);
    });
  });

  container.querySelectorAll('[data-qty-inc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-qty-inc');
      const item = Cart.getItems().find(i => i.cartItemId === id);
      if (item) {
        const res = Cart.updateQuantity(id, item.quantity + 1);
        if (res && res.capped) alert(res.message);
      }
    });
  });
}
