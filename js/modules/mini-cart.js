/* ==========================================================================
   THE 1 METHOD STORE — SLIDE-OUT MINI-CART DRAWER
   Interactive drawer, reactive re-rendering, instant checkout link
   ========================================================================== */

import { Cart } from './cart.js';

export function initMiniCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.querySelector('.cart-drawer-overlay');
  const openBtns = document.querySelectorAll('[data-open-cart]');
  const closeBtn = document.querySelector('.cart-drawer-close');

  if (!drawer || !overlay) return;

  function openDrawer() {
    renderMiniCart();
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  overlay.addEventListener('click', closeDrawer);

  // Re-render when cart updates
  window.addEventListener('cart:updated', (e) => {
    updateBadgeCounts(e.detail.count);
    if (drawer.classList.contains('open')) {
      renderMiniCart();
    }
  });

  // Initial badge count
  updateBadgeCounts(Cart.getItemCount());

  // Listen for custom trigger to open cart (e.g. after Add to Cart)
  window.addEventListener('cart:open-drawer', () => {
    openDrawer();
  });
}

function updateBadgeCounts(count) {
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    badge.classList.remove('bump');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bump');
  });
}

export function renderMiniCart() {
  const itemsContainer = document.querySelector('.cart-drawer-items');
  const footerContainer = document.querySelector('.cart-drawer-footer');
  if (!itemsContainer || !footerContainer) return;

  const items = Cart.getItems();
  const totals = Cart.getTotals();

  if (items.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-drawer-empty">
        <span class="material-symbols-outlined">shopping_bag</span>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 0.5rem;">Your Cart is Empty</h4>
        <p style="font-size: 0.875rem; color: var(--color-outline); margin-bottom: 1.5rem;">Discover our clinical apparatus, masterclasses, and publications.</p>
        <a href="catalog.html" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.875rem;">Explore Catalog</a>
      </div>
    `;
    footerContainer.style.display = 'none';
    return;
  }

  footerContainer.style.display = 'flex';

  // Shipping progress indicator
  const shippingMsg = totals.isFreeShippingQualified
    ? `<span style="color: var(--color-stock-in); font-weight: 600;">✓ You have unlocked FREE Global Shipping!</span>`
    : `Add <strong>$${totals.amountToFreeShipping.toFixed(2)}</strong> more to qualify for <strong>FREE Shipping</strong>`;

  let itemsHtml = `
    <div style="background: var(--color-surface-low); border: 1px solid var(--color-card-border); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 0.5rem; font-size: 0.8125rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom: 0.35rem;">
        <span>${shippingMsg}</span>
        <span style="font-weight: 700;">${totals.freeShippingProgress}%</span>
      </div>
      <div style="width: 100%; height: 5px; background: var(--color-surface-container); border-radius: 4px; overflow:hidden;">
        <div style="width: ${totals.freeShippingProgress}%; height: 100%; background: var(--color-secondary); transition: width 0.3s ease;"></div>
      </div>
    </div>
  `;

  items.forEach(item => {
    const isLowStock = item.maxStock <= 3;
    const stockAlertHtml = isLowStock
      ? `<span style="color: var(--color-stock-low); font-size: 0.7rem; font-weight: 700; margin-top: 0.25rem;">⚠️ Only ${item.maxStock} left in stock!</span>`
      : '';

    itemsHtml += `
      <div class="cart-item-card" data-item-id="${item.cartItemId}">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-details">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 0.5rem;">
            <h5 class="cart-item-title">${item.title}</h5>
            <button class="cart-item-remove-btn" data-remove="${item.cartItemId}" title="Remove item">
              <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
            </button>
          </div>
          <span class="cart-item-variant-pill">${item.format} • ${item.language || item.color}</span>
          ${stockAlertHtml}
          
          <div class="cart-item-pricing-row">
            <span class="cart-item-unit-price">$${(item.price * item.quantity).toFixed(2)}</span>
            
            <div class="qty-stepper" style="height: 32px;">
              <button class="qty-btn" data-qty-dec="${item.cartItemId}" style="width: 30px; font-size: 0.9rem;">-</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly style="width: 36px; font-size: 0.85rem;">
              <button class="qty-btn" data-qty-inc="${item.cartItemId}" style="width: 30px; font-size: 0.9rem;">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  itemsContainer.innerHTML = itemsHtml;

  // Footer totals
  footerContainer.innerHTML = `
    <div class="drawer-subtotal-row">
      <span style="font-weight: 600; color: var(--color-on-surface-variant);">Subtotal:</span>
      <span class="drawer-subtotal-val">$${totals.subtotal.toFixed(2)}</span>
    </div>
    ${totals.discountAmount > 0 ? `
      <div style="display:flex; justify-content:space-between; font-size: 0.875rem; color: var(--color-stock-in); font-weight: 600;">
        <span>Coupon (${totals.promo.code}):</span>
        <span>-$${totals.discountAmount.toFixed(2)}</span>
      </div>
    ` : ''}
    <p class="drawer-shipping-note">Taxes & shipping calculated at final checkout</p>
    
    <div style="display:flex; flex-direction:column; gap: 0.65rem;">
      <a href="checkout.html" class="btn btn-primary" style="width: 100%; height: 46px; font-size: 0.95rem;">
        <span class="material-symbols-outlined" style="font-size: 20px;">lock</span> Proceed to Checkout
      </a>
      <a href="cart.html" class="btn btn-outline" style="width: 100%; height: 42px; font-size: 0.875rem;">
        View Full Cart (${totals.subtotal > 0 ? '$' + totals.subtotal.toFixed(2) : '$0.00'})
      </a>
    </div>
  `;

  // Bind item controls
  bindDrawerEvents(itemsContainer);
}

function bindDrawerEvents(container) {
  // Remove buttons
  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove');
      Cart.removeItem(id);
    });
  });

  // Dec buttons
  container.querySelectorAll('[data-qty-dec]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-qty-dec');
      const item = Cart.getItems().find(i => i.cartItemId === id);
      if (item) {
        Cart.updateQuantity(id, item.quantity - 1);
      }
    });
  });

  // Inc buttons
  container.querySelectorAll('[data-qty-inc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-qty-inc');
      const item = Cart.getItems().find(i => i.cartItemId === id);
      if (item) {
        const res = Cart.updateQuantity(id, item.quantity + 1);
        if (res && res.capped) {
          alert(res.message);
        }
      }
    });
  });
}
