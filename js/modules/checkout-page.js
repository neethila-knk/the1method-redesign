/* ==========================================================================
   THE 1 METHOD STORE — CHECKOUT FLOW CONTROLLER (checkout.html)
   Guided 3-step wizard, address validation, simulation toggle, order persistence
   Adheres 100% to core design system tokens and component classes
   ========================================================================== */

import { Cart, SHIPPING_METHODS } from './cart.js';

export function initCheckoutPage() {
  const checkoutLayout = document.getElementById('checkout-page-layout');
  if (!checkoutLayout) return;

  let items = Cart.getItems();
  if (items.length === 0) {
    Cart.addItem('prod-01', 'v-01-clin', 1);
    items = Cart.getItems();
  }

  let currentStep = 1; // 1: Customer Info, 2: Shipping Details, 3: Payment
  let simulatePaymentFailure = false;

  renderCheckoutSummary();
  bindStepNavigation();
  bindCardFormatting();
  bindPaymentSubmission();

  function renderCheckoutSummary() {
    const summaryContainer = document.getElementById('checkout-summary-container');
    if (!summaryContainer) return;

    const totals = Cart.getTotals();
    const cartItems = Cart.getItems();
    const itemCount = Cart.getItemCount();

    summaryContainer.innerHTML = `
      <h3 class="order-summary-title" style="display: flex; align-items: center; justify-content: space-between;">
        <span>Order Summary</span>
        <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; background: var(--color-surface-container); padding: 0.2rem 0.65rem; border-radius: var(--radius-full); color: var(--color-secondary);">
          ${itemCount} ${itemCount === 1 ? 'item' : 'items'}
        </span>
      </h3>

      <div style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.875rem; margin-bottom: 1.25rem; padding-right: 0.25rem;">
        ${cartItems.map(item => `
          <div style="display: flex; gap: 0.875rem; align-items: center;">
            <div style="position: relative; width: 52px; height: 52px; min-width: 52px; flex-shrink: 0;">
              <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-card-border); display: block;">
              <span style="position: absolute; top: -6px; right: -6px; background: var(--color-secondary); color: #fff; font-size: 0.65rem; font-weight: 700; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.18); border: 1.5px solid var(--color-card-bg); z-index: 2;">
                ${item.quantity}
              </span>
            </div>
            <div style="flex: 1; min-width: 0;">
              <h5 style="font-family: var(--font-serif); font-size: 0.875rem; font-weight: 600; line-height: 1.35; margin: 0 0 0.2rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" title="${item.title}">${item.title}</h5>
              <p style="font-size: 0.75rem; color: var(--color-secondary); font-weight: 500; margin: 0;">${item.format} • ${item.language || item.color}</p>
            </div>
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-on-surface); white-space: nowrap; flex-shrink: 0; margin-left: 0.5rem;">
              $${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="summary-calc-list" style="margin-bottom: 1.25rem;">
        <div class="summary-calc-row">
          <span>Subtotal:</span>
          <span style="font-weight: 600;">$${totals.subtotal.toFixed(2)}</span>
        </div>
        ${totals.discountAmount > 0 ? `
          <div class="summary-calc-row discount">
            <span>Coupon (${totals.promo.code}):</span>
            <span>-$${totals.discountAmount.toFixed(2)}</span>
          </div>
        ` : ''}
        <div class="summary-calc-row">
          <span>Shipping (${totals.shippingMethod.name}):</span>
          <span style="font-weight: 600;">
            ${totals.shippingCost === 0 ? '<span style="color:var(--color-stock-in);">FREE</span>' : '$' + totals.shippingCost.toFixed(2)}
          </span>
        </div>
        <div class="summary-calc-row">
          <span>Estimated Tax:</span>
          <span>$${totals.estimatedTax.toFixed(2)}</span>
        </div>
        <div class="summary-calc-row grand-total">
          <span>Total:</span>
          <span style="font-size: 1.35rem;">$${totals.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding-top: 0.875rem; border-top: 1px solid var(--color-card-border);">
        <span class="material-symbols-outlined" style="font-size: 15px; color: var(--color-stock-in);">lock</span>
        <span style="font-size: 0.725rem; font-weight: 600; color: var(--color-outline); text-transform: uppercase; letter-spacing: 0.05em;">Bank-Grade 256-Bit SSL Encrypted</span>
      </div>
    `;
  }

  function updateStepperProgress() {
    const fill = document.getElementById('checkout-stepper-fill');
    if (!fill) return;
    if (currentStep === 1) fill.style.width = '0%';
    else if (currentStep === 2) fill.style.width = '50%';
    else if (currentStep === 3) fill.style.width = '100%';
  }

  function bindStepNavigation() {
    const step1Panel = document.getElementById('step-1-panel');
    const step2Panel = document.getElementById('step-2-panel');
    const step3Panel = document.getElementById('step-3-panel');

    const toStep2Btn = document.getElementById('btn-to-step-2');
    const toStep3Btn = document.getElementById('btn-to-step-3');
    const backToStep1Btn = document.getElementById('btn-back-to-step-1');
    const backToStep2Btn = document.getElementById('btn-back-to-step-2');

    toStep2Btn?.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('checkout-email')?.value.trim();
      const firstName = document.getElementById('checkout-fname')?.value.trim();
      const lastName = document.getElementById('checkout-lname')?.value.trim();

      if (!email || !firstName || !lastName) {
        alert('Please fill out all required customer information fields.');
        return;
      }

      currentStep = 2;
      updateStepUI();
    });

    toStep3Btn?.addEventListener('click', (e) => {
      e.preventDefault();
      const address = document.getElementById('checkout-address')?.value.trim();
      const city = document.getElementById('checkout-city')?.value.trim();
      const zip = document.getElementById('checkout-zip')?.value.trim();

      if (!address || !city || !zip) {
        alert('Please fill out all required shipping address fields.');
        return;
      }

      currentStep = 3;
      updateStepUI();
    });

    backToStep1Btn?.addEventListener('click', (e) => {
      e.preventDefault();
      currentStep = 1;
      updateStepUI();
    });

    backToStep2Btn?.addEventListener('click', (e) => {
      e.preventDefault();
      currentStep = 2;
      updateStepUI();
    });

    // Shipping method options
    document.querySelectorAll('.shipping-method-option').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.shipping-method-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        const radio = option.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        const methodId = option.getAttribute('data-method-id');
        Cart.setShippingMethod(methodId);
        renderCheckoutSummary();
      });
    });

    // QA Simulation toggle for payment decline
    const simCheckbox = document.getElementById('sim-error-toggle');
    if (simCheckbox) {
      simCheckbox.addEventListener('change', (e) => {
        simulatePaymentFailure = e.target.checked;
      });
    }

    function updateStepUI() {
      // Stepper indicators
      document.querySelectorAll('.checkout-stepper .step-item').forEach(el => {
        const stepNum = parseInt(el.getAttribute('data-step'), 10);
        el.classList.toggle('active', stepNum === currentStep);
        el.classList.toggle('completed', stepNum < currentStep);

        const circleContent = el.querySelector('.step-circle-content') || el.querySelector('.step-circle');
        if (circleContent) {
          if (stepNum < currentStep) {
            circleContent.innerHTML = '<span class="material-symbols-outlined" style="font-size: 18px; line-height: 1;">check</span>';
          } else {
            circleContent.textContent = stepNum;
          }
        }
      });

      updateStepperProgress();

      // Switch active step panel
      if (step1Panel) step1Panel.style.display = currentStep === 1 ? 'block' : 'none';
      if (step2Panel) step2Panel.style.display = currentStep === 2 ? 'block' : 'none';
      if (step3Panel) step3Panel.style.display = currentStep === 3 ? 'block' : 'none';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function bindCardFormatting() {
    const cardInput = document.getElementById('card-number-input');
    const expiryInput = document.getElementById('card-expiry-input');
    const cvcInput = document.getElementById('card-cvc-input');

    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = val;
      });
    }

    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
          val = val.substring(0, 2) + ' / ' + val.substring(2);
        }
        e.target.value = val;
      });
    }

    if (cvcInput) {
      cvcInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
      });
    }

    // Payment method tabs
    document.querySelectorAll('.payment-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.payment-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.getAttribute('data-payment-tab');
        const ccBox = document.getElementById('payment-cc-box');
        const walletBox = document.getElementById('payment-wallet-box');
        const wireBox = document.getElementById('payment-wire-box');

        if (ccBox) ccBox.style.display = tab === 'card' ? 'block' : 'none';
        if (walletBox) walletBox.style.display = tab === 'wallet' ? 'block' : 'none';
        if (wireBox) wireBox.style.display = tab === 'wire' ? 'block' : 'none';
      });
    });
  }

  function bindPaymentSubmission() {
    const payBtn = document.getElementById('btn-place-order');
    const errorAlert = document.getElementById('checkout-payment-error');

    if (!payBtn) return;

    payBtn.addEventListener('click', (e) => {
      e.preventDefault();

      payBtn.disabled = true;
      payBtn.innerHTML = `<span class="material-symbols-outlined spin" style="font-size: 18px;">progress_activity</span> Processing Secure Payment...`;
      if (errorAlert) errorAlert.classList.remove('visible');

      setTimeout(() => {
        if (simulatePaymentFailure) {
          payBtn.disabled = false;
          payBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">lock</span> Place Order & Pay`;
          if (errorAlert) {
            errorAlert.classList.add('visible');
            errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }

        // Happy path: generate complete order snapshot
        const totals = Cart.getTotals();
        const customer = {
          email: document.getElementById('checkout-email')?.value.trim() || 'dr.vance@clinic.org',
          firstName: document.getElementById('checkout-fname')?.value.trim() || 'Dr. Julian',
          lastName: document.getElementById('checkout-lname')?.value.trim() || 'Vance',
          clinic: document.getElementById('checkout-clinic')?.value.trim() || '',
          address: document.getElementById('checkout-address')?.value.trim() || '14 Harley Street, Suite 402',
          city: document.getElementById('checkout-city')?.value.trim() || 'London',
          zip: document.getElementById('checkout-zip')?.value.trim() || 'W1G 9PQ',
          country: document.getElementById('checkout-country')?.value || 'United Kingdom'
        };

        const randomOrderNum = Math.floor(100000 + Math.random() * 900000);
        const orderData = {
          orderNumber: `TM-${randomOrderNum}`,
          timestamp: new Date().toISOString(),
          customer,
          items: Cart.getItems(),
          totals: totals,
          paymentMethod: 'Credit Card (•••• 4242)'
        };

        localStorage.setItem('the1method_last_order', JSON.stringify(orderData));
        Cart.clearCart();

        window.location.href = 'confirmation.html';
      }, 1200);
    });
  }
}
