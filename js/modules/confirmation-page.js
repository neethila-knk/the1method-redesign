/* ==========================================================================
   THE 1 METHOD STORE — ORDER CONFIRMATION & RECEIPT (confirmation.html)
   Itemized historical product records, print invoice, customer next steps
   Adheres 100% to core design system tokens and component classes
   ========================================================================== */

export function initConfirmationPage() {
  const container = document.getElementById('confirmation-page-container');
  if (!container) return;

  const rawOrder = localStorage.getItem('the1method_last_order');
  let order;

  if (rawOrder) {
    try {
      order = JSON.parse(rawOrder);
    } catch {
      order = null;
    }
  }

  // Fallback demo order if visited directly without prior checkout submission
  if (!order) {
    order = {
      orderNumber: 'TM-894120',
      timestamp: new Date().toISOString(),
      customer: {
        firstName: 'Dr. Julian',
        lastName: 'Vance',
        clinic: 'Vance Orthopedic & Somatic Rehabilitation',
        email: 'dr.vance@clinic.org',
        address: '14 Harley Street, Suite 402',
        city: 'London',
        zip: 'W1G 9PQ',
        country: 'United Kingdom'
      },
      items: [
        {
          title: 'The 1 Method Complete Clinical Diagnostics Kit',
          format: 'Clinical Master Set',
          language: 'English',
          color: 'Navy & Brass',
          price: 285.00,
          quantity: 1,
          image: 'assets/images/course-spiritual-medicine.jpg'
        },
        {
          title: 'Spiritual Medicine & Clinical Rehabilitation: The Definitive Volume',
          format: 'Clinical Hardcover + Plates',
          language: 'English',
          color: 'Deep Navy Cloth',
          price: 68.00,
          quantity: 1,
          image: 'assets/images/founder-osie-book.jpg'
        }
      ],
      totals: {
        subtotal: 353.00,
        discountAmount: 0.00,
        shippingCost: 0.00,
        shippingMethod: { name: 'Insured Global Standard Courier' },
        estimatedTax: 17.65,
        grandTotal: 370.65
      },
      paymentMethod: 'Credit Card (•••• 4242)'
    };
  }

  renderConfirmation(order);

  document.getElementById('btn-print-invoice')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.print();
  });
}

function renderConfirmation(order) {
  // Order reference & date
  const orderRefEl = document.getElementById('conf-order-number');
  const orderDateEl = document.getElementById('conf-order-date');
  const customerEmailEl = document.getElementById('conf-customer-email');

  if (orderRefEl) orderRefEl.textContent = order.orderNumber;
  if (orderDateEl) {
    const d = order.timestamp ? new Date(order.timestamp) : new Date();
    orderDateEl.textContent = d.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  }
  if (customerEmailEl && order.customer?.email) {
    customerEmailEl.textContent = order.customer.email;
  }

  // Itemized table (historical snapshot)
  const itemsContainer = document.getElementById('conf-items-list');
  if (itemsContainer && Array.isArray(order.items)) {
    itemsContainer.innerHTML = order.items.map(item => {
      const variantDetails = [item.format, item.language, item.color].filter(Boolean).join(' • ');
      return `
        <div class="confirmation-item-row">
          <div class="confirmation-item-thumb">
            <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/images/course-spiritual-medicine.jpg'">
          </div>
          <div class="confirmation-item-info">
            <h4 class="confirmation-item-title">${item.title}</h4>
            ${variantDetails ? `<p class="confirmation-item-variant">${variantDetails}</p>` : ''}
            <span class="confirmation-item-qty">Qty: ${item.quantity} × $${Number(item.price).toFixed(2)}</span>
          </div>
          <div class="confirmation-item-total">
            $${(Number(item.price) * Number(item.quantity)).toFixed(2)}
          </div>
        </div>
      `;
    }).join('');
  }

  // Financial calculation breakdown
  const subtotalEl = document.getElementById('conf-subtotal');
  const discountEl = document.getElementById('conf-discount');
  const discountRow = document.getElementById('conf-discount-row');
  const shippingEl = document.getElementById('conf-shipping');
  const taxEl = document.getElementById('conf-tax');
  const grandTotalEl = document.getElementById('conf-grand-total');

  const totals = order.totals || {};
  if (subtotalEl) subtotalEl.textContent = `$${Number(totals.subtotal || 0).toFixed(2)}`;

  if (totals.discountAmount > 0 && discountEl && discountRow) {
    discountRow.style.display = 'flex';
    discountEl.textContent = `-$${Number(totals.discountAmount).toFixed(2)}`;
  } else if (discountRow) {
    discountRow.style.display = 'none';
  }

  if (shippingEl) {
    shippingEl.textContent = (totals.shippingCost === 0 || totals.shippingCost === undefined)
      ? 'FREE'
      : `$${Number(totals.shippingCost).toFixed(2)}`;
  }

  if (taxEl) taxEl.textContent = `$${Number(totals.estimatedTax || 0).toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `$${Number(totals.grandTotal || 0).toFixed(2)}`;

  // Shipping details
  const shippingDetailsEl = document.getElementById('conf-shipping-address');
  if (shippingDetailsEl && order.customer) {
    const c = order.customer;
    shippingDetailsEl.innerHTML = `
      <strong style="color: var(--color-on-surface); font-size: 0.95rem;">${c.firstName || ''} ${c.lastName || ''}</strong><br>
      ${c.clinic ? `<span style="color: var(--color-secondary); font-weight: 600;">${c.clinic}</span><br>` : ''}
      ${c.address || ''}<br>
      ${[c.city, c.zip].filter(Boolean).join(', ')}<br>
      ${c.country || ''}<br>
      <div style="margin-top: 0.65rem; display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8125rem; color: var(--color-secondary); font-weight: 600; background: var(--color-surface-container); padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
        <span class="material-symbols-outlined" style="font-size: 15px;">local_shipping</span>
        <span>${totals.shippingMethod?.name || 'Insured Global Standard Courier'}</span>
      </div>
    `;
  }

  // Payment details
  const paymentDetailsEl = document.getElementById('conf-payment-summary');
  if (paymentDetailsEl) {
    paymentDetailsEl.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <strong style="color: var(--color-on-surface);">Status:</strong>
          <span style="color: var(--color-stock-in); font-weight: 700; background: var(--color-stock-in-bg); padding: 0.15rem 0.55rem; border-radius: var(--radius-full); font-size: 0.775rem;">Paid & Verified</span>
        </div>
        <div><strong style="color: var(--color-on-surface);">Method:</strong> ${order.paymentMethod || 'Credit Card (•••• 4242)'}</div>
        <div><strong style="color: var(--color-on-surface);">Billed To:</strong> ${order.customer?.email || 'dr.vance@clinic.org'}</div>
      </div>
    `;
  }
}
