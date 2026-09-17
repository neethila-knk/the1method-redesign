/* ==========================================================================
   THE 1 METHOD STORE — PRODUCT DETAIL PAGE (PDP) CONTROLLER
   Multi-image gallery, zoom lightbox, dynamic variant matrix, inventory states
   ========================================================================== */

import { getProductById, getRelatedProducts, PRODUCTS_DATABASE } from './store-data.js';
import { Cart } from './cart.js';

export function initProductPage() {
  const pdpContainer = document.getElementById('pdp-container');
  if (!pdpContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'prod-01';
  const product = getProductById(productId) || PRODUCTS_DATABASE[0];

  renderPDP(pdpContainer, product);
  initZoomModal();
  initStickyMobileBar(product);
}

function renderPDP(container, product) {
  let activeVariant = product.variants[0];
  let currentQty = 1;
  let activeImageIndex = activeVariant.imageIndex || 0;

  // Breadcrumbs & Title
  document.title = `${product.title} | The 1 Method Store`;
  const breadcrumbCategory = document.getElementById('pdp-breadcrumb-category');
  const breadcrumbTitle = document.getElementById('pdp-breadcrumb-title');
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = product.categories[0];
    breadcrumbCategory.href = `catalog.html?category=${product.categories[0]}`;
  }
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = product.title;
  }

  function updatePDPInteractiveState() {
    const isOutOfStock = activeVariant.stock <= 0;
    const isLowStock = activeVariant.stock > 0 && activeVariant.stock <= 3;
    const stockClass = isOutOfStock ? 'out-of-stock' : (isLowStock ? 'low-stock' : 'in-stock');
    const stockText = isOutOfStock
      ? 'Currently Out of Stock'
      : (isLowStock ? `Low Stock — Only ${activeVariant.stock} items remaining!` : 'In Stock — Ready for immediate worldwide dispatch');

    // Update Main Image
    const mainImgEl = document.getElementById('pdp-main-image');
    if (mainImgEl) {
      mainImgEl.src = product.images[activeImageIndex] || product.images[0];
    }

    // Update Active Thumbnail
    document.querySelectorAll('.pdp-thumbnail-item').forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === activeImageIndex);
    });

    // Update Price
    const priceCurrentEl = document.getElementById('pdp-price-val');
    const priceOriginalEl = document.getElementById('pdp-price-orig');
    const discountBadgeEl = document.getElementById('pdp-discount-tag');

    if (priceCurrentEl) priceCurrentEl.textContent = `$${activeVariant.price.toFixed(2)}`;
    if (priceOriginalEl) {
      if (activeVariant.originalPrice > activeVariant.price) {
        priceOriginalEl.style.display = 'inline';
        priceOriginalEl.textContent = `$${activeVariant.originalPrice.toFixed(2)}`;
      } else {
        priceOriginalEl.style.display = 'none';
      }
    }
    if (discountBadgeEl) {
      if (activeVariant.originalPrice > activeVariant.price) {
        const pct = Math.round(((activeVariant.originalPrice - activeVariant.price) / activeVariant.originalPrice) * 100);
        discountBadgeEl.style.display = 'inline-block';
        discountBadgeEl.textContent = `SAVE ${pct}% ($${(activeVariant.originalPrice - activeVariant.price).toFixed(2)})`;
      } else {
        discountBadgeEl.style.display = 'none';
      }
    }

    // Update SKU
    const skuEl = document.getElementById('pdp-sku-val');
    if (skuEl) skuEl.textContent = activeVariant.sku || product.sku;

    // Update Stock Status Box
    const stockBox = document.getElementById('pdp-stock-box');
    if (stockBox) {
      stockBox.className = `pdp-stock-status-box ${stockClass}`;
      stockBox.innerHTML = `
        <span class="stock-indicator-dot ${isOutOfStock ? 'out' : (isLowStock ? 'low' : 'in')}"></span>
        <span>${stockText}</span>
      `;
    }

    // Update Quantity ceiling
    const qtyInput = document.getElementById('pdp-qty-input');
    if (qtyInput) {
      if (currentQty > activeVariant.stock && activeVariant.stock > 0) {
        currentQty = activeVariant.stock;
      }
      qtyInput.value = isOutOfStock ? 0 : currentQty;
    }

    // Update Add to Cart / Buy Now Buttons
    const addBtn = document.getElementById('pdp-add-cart-btn');
    const buyBtn = document.getElementById('pdp-buy-now-btn');
    const notifyBtn = document.getElementById('pdp-notify-btn');

    if (isOutOfStock) {
      if (addBtn) addBtn.style.display = 'none';
      if (buyBtn) buyBtn.style.display = 'none';
      if (notifyBtn) notifyBtn.style.display = 'flex';
    } else {
      if (addBtn) {
        addBtn.style.display = 'inline-flex';
        addBtn.disabled = false;
        addBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 20px;">shopping_cart</span> Add to Cart`;
      }
      if (buyBtn) buyBtn.style.display = 'inline-flex';
      if (notifyBtn) notifyBtn.style.display = 'none';
    }

    // Sync Sticky Mobile Bar
    syncStickyMobileBar(product, activeVariant, isOutOfStock);
  }

  // Bind Gallery Thumbnails Click
  document.querySelectorAll('.pdp-thumbnail-item').forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      activeImageIndex = idx;
      updatePDPInteractiveState();
    });
  });

  // Bind Zoom Lightbox Trigger
  const zoomBtn = document.querySelector('.pdp-zoom-btn');
  const mainImgWrapper = document.querySelector('.pdp-main-image-box');
  if (zoomBtn && mainImgWrapper) {
    const handleZoomOpen = () => {
      const zoomModal = document.getElementById('image-zoom-modal');
      const zoomImg = document.getElementById('zoom-modal-image');
      if (zoomModal && zoomImg) {
        zoomImg.src = product.images[activeImageIndex] || product.images[0];
        zoomModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };
    zoomBtn.addEventListener('click', handleZoomOpen);
    mainImgWrapper.addEventListener('click', (e) => {
      if (e.target !== zoomBtn && !zoomBtn.contains(e.target)) handleZoomOpen();
    });
  }

  // Bind Variant Pill Buttons
  document.querySelectorAll('.pdp-variant-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const variantId = btn.getAttribute('data-variant-id');
      const found = product.variants.find(v => v.id === variantId);
      if (found) {
        activeVariant = found;
        document.querySelectorAll('.pdp-variant-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // If variant specifies an image index, jump to that image
        if (found.imageIndex !== undefined) {
          activeImageIndex = found.imageIndex;
        }

        updatePDPInteractiveState();
      }
    });
  });

  // Bind Swatches
  document.querySelectorAll('.pdp-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const variantId = btn.getAttribute('data-variant-id');
      const found = product.variants.find(v => v.id === variantId);
      if (found) {
        activeVariant = found;
        document.querySelectorAll('.pdp-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (found.imageIndex !== undefined) {
          activeImageIndex = found.imageIndex;
        }

        updatePDPInteractiveState();
      }
    });
  });

  // Bind Quantity Steppers
  const decBtn = document.getElementById('pdp-qty-dec');
  const incBtn = document.getElementById('pdp-qty-inc');
  const qtyInput = document.getElementById('pdp-qty-input');

  if (decBtn && incBtn && qtyInput) {
    decBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyInput.value = currentQty;
      }
    });

    incBtn.addEventListener('click', () => {
      if (activeVariant.stock <= 0) return;
      if (currentQty < activeVariant.stock) {
        currentQty++;
        qtyInput.value = currentQty;
      } else {
        alert(`Maximum available inventory for this variant is ${activeVariant.stock}.`);
      }
    });
  }

  // Bind Add to Cart
  const addCartBtn = document.getElementById('pdp-add-cart-btn');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      if (activeVariant.stock <= 0) return;

      addCartBtn.innerHTML = `<span class="material-symbols-outlined spin" style="font-size:20px;">progress_activity</span> Adding...`;
      addCartBtn.disabled = true;

      setTimeout(() => {
        Cart.addItem(product.id, activeVariant.id, currentQty);
        addCartBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px;">check_circle</span> Added to Cart!`;

        setTimeout(() => {
          addCartBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px;">shopping_cart</span> Add to Cart`;
          addCartBtn.disabled = false;
        }, 1500);

        // Open slide-out mini-cart drawer
        window.dispatchEvent(new CustomEvent('cart:open-drawer'));
      }, 350);
    });
  }

  // Bind Buy Now (Direct to Checkout)
  const buyNowBtn = document.getElementById('pdp-buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if (activeVariant.stock <= 0) return;
      Cart.addItem(product.id, activeVariant.id, currentQty);
      window.location.href = 'checkout.html';
    });
  }

  // Bind Out of Stock Notify Button
  const notifyBtn = document.getElementById('pdp-notify-btn');
  if (notifyBtn) {
    notifyBtn.addEventListener('click', () => {
      const email = prompt('Enter your professional email to receive notification when this item returns to stock:');
      if (email) {
        alert(`Thank you! We will notify ${email} the moment this item becomes available.`);
      }
    });
  }

  // Render Related Products Grid
  renderRelatedProductsGrid(product.id);

  // Initial render state
  updatePDPInteractiveState();
}

function renderRelatedProductsGrid(currentId) {
  const container = document.getElementById('pdp-related-grid');
  if (!container) return;

  const related = getRelatedProducts(currentId, 3);
  container.innerHTML = related.map(p => {
    const v = p.variants[0];
    const originalPriceHtml = v.originalPrice ? `<span class="price-original">$${v.originalPrice.toFixed(2)}</span>` : '';
    return `
      <article class="product-card">
        <div class="product-card-media">
          <a href="product.html?id=${p.id}">
            <img src="${p.images[0]}" alt="${p.title}" class="product-card-img" loading="lazy">
            ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.title}" class="product-card-hover-img" loading="lazy">` : ''}
          </a>
          <div class="product-quick-actions">
            <button class="btn-quick-view" data-quick-view="${p.id}">
              <span class="material-symbols-outlined" style="font-size: 15px;">visibility</span> Quick View
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <div class="product-card-categories">${p.categories[0]}</div>
          <h4 class="product-card-title"><a href="product.html?id=${p.id}">${p.title}</a></h4>
          <div class="product-card-pricing-row">
            <div class="price-box">
              <span class="price-current">$${v.price.toFixed(2)}</span>
              ${originalPriceHtml}
            </div>
            <button class="btn-card-quick-add" data-card-add="${p.id}" data-variant-id="${v.id}" title="Quick Add to Cart" aria-label="Quick Add ${p.title} to Cart">
              <span class="material-symbols-outlined" style="font-size: 18px;">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function initZoomModal() {
  const zoomModal = document.getElementById('image-zoom-modal');
  if (!zoomModal) return;

  const overlay = zoomModal.querySelector('.modal-overlay');
  const closeBtn = zoomModal.querySelector('.modal-close');

  function closeZoom() {
    zoomModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (overlay) overlay.addEventListener('click', closeZoom);
  if (closeBtn) closeBtn.addEventListener('click', closeZoom);
}

function initStickyMobileBar(product) {
  const stickyBar = document.querySelector('.mobile-sticky-pdp-bar');
  const purchaseBox = document.querySelector('.pdp-info-box');
  if (!stickyBar || !purchaseBox) return;

  window.addEventListener('scroll', () => {
    const rect = purchaseBox.getBoundingClientRect();
    if (rect.bottom < 100) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });

  const stickyBtn = document.getElementById('mobile-sticky-add-btn');
  if (stickyBtn) {
    stickyBtn.addEventListener('click', () => {
      document.getElementById('pdp-add-cart-btn')?.click();
    });
  }
}

function syncStickyMobileBar(product, variant, isOutOfStock) {
  const stickyPrice = document.getElementById('mobile-sticky-price');
  const stickyBtn = document.getElementById('mobile-sticky-add-btn');
  if (stickyPrice) stickyPrice.textContent = `$${variant.price.toFixed(2)}`;
  if (stickyBtn) {
    stickyBtn.disabled = isOutOfStock;
    stickyBtn.textContent = isOutOfStock ? 'Out of Stock' : 'Add to Cart';
  }
}
