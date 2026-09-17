/* ==========================================================================
   THE 1 METHOD STORE — REACTIVE CART ENGINE
   localStorage persistence, stock bounds, promo coupons, live event dispatch
   ========================================================================== */

import { getProductById } from './store-data.js';

const CART_STORAGE_KEY = 'the1method_cart_items';
const PROMO_STORAGE_KEY = 'the1method_applied_promo';
const SHIPPING_STORAGE_KEY = 'the1method_shipping_method';

export const PROMO_COUPONS = {
  'OSIE10': { code: 'OSIE10', discountPercent: 10, description: '10% Practitioner Academic Discount' },
  'WELCOME20': { code: 'WELCOME20', discountPercent: 20, description: '20% Welcome to The 1 Method Discount' }
};

export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Insured Global Standard Courier', days: '3-5 Business Days', price: 0.00, thresholdFree: 150.00 },
  { id: 'express', name: 'Priority Express Air Freight', days: '1-2 Business Days', price: 15.00 },
  { id: 'intl', name: 'Diplomatic White-Glove Tracked', days: '2-4 Days Worldwide', price: 35.00 }
];

export const Cart = {
  getItems() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    this.notify();
  },

  getItemCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  addItem(productId, variantId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return { success: false, message: 'Product not found' };

    const variant = product.variants.find(v => v.id === variantId) || product.variants[0];
    if (!variant) return { success: false, message: 'Variant not found' };

    if (variant.stock <= 0) {
      return { success: false, message: 'This variant is currently out of stock.' };
    }

    const cart = this.getItems();
    const existingIndex = cart.findIndex(item => item.productId === productId && item.variantId === variant.id);

    const targetQty = Math.max(1, parseInt(quantity, 10));

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const newTotal = currentQty + targetQty;

      if (newTotal > variant.stock) {
        cart[existingIndex].quantity = variant.stock;
        this.saveItems(cart);
        return {
          success: true,
          capped: true,
          item: cart[existingIndex],
          message: `Only ${variant.stock} units available in stock. Cart updated to maximum available.`
        };
      } else {
        cart[existingIndex].quantity = newTotal;
        this.saveItems(cart);
        return { success: true, capped: false, item: cart[existingIndex] };
      }
    } else {
      const addedQty = Math.min(targetQty, variant.stock);
      const newItem = {
        cartItemId: `${productId}_${variant.id}_${Date.now()}`,
        productId: product.id,
        variantId: variant.id,
        title: product.title,
        sku: variant.sku || product.sku,
        format: variant.format,
        language: variant.language,
        color: variant.color,
        colorHex: variant.colorHex,
        price: variant.price,
        originalPrice: variant.originalPrice || variant.price,
        image: product.images[variant.imageIndex || 0],
        maxStock: variant.stock,
        quantity: addedQty
      };

      cart.push(newItem);
      this.saveItems(cart);
      return { success: true, item: newItem };
    }
  },

  updateQuantity(cartItemId, newQty) {
    const cart = this.getItems();
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (!item) return { success: false };

    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) {
      return this.removeItem(cartItemId);
    }

    if (qty > item.maxStock) {
      item.quantity = item.maxStock;
      this.saveItems(cart);
      return { success: true, capped: true, message: `Maximum available stock is ${item.maxStock}.` };
    }

    item.quantity = qty;
    this.saveItems(cart);
    return { success: true, capped: false };
  },

  removeItem(cartItemId) {
    let cart = this.getItems();
    cart = cart.filter(i => i.cartItemId !== cartItemId);
    this.saveItems(cart);
    return { success: true };
  },

  clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    this.notify();
  },

  getPromo() {
    const code = localStorage.getItem(PROMO_STORAGE_KEY);
    return PROMO_COUPONS[code] || null;
  },

  applyPromo(rawCode) {
    const code = (rawCode || '').trim().toUpperCase();
    if (PROMO_COUPONS[code]) {
      localStorage.setItem(PROMO_STORAGE_KEY, code);
      this.notify();
      return { success: true, promo: PROMO_COUPONS[code] };
    }
    return { success: false, message: 'Invalid coupon code. Try OSIE10 or WELCOME20' };
  },

  removePromo() {
    localStorage.removeItem(PROMO_STORAGE_KEY);
    this.notify();
  },

  getShippingMethod() {
    const saved = localStorage.getItem(SHIPPING_STORAGE_KEY) || 'standard';
    return SHIPPING_METHODS.find(m => m.id === saved) || SHIPPING_METHODS[0];
  },

  setShippingMethod(methodId) {
    const method = SHIPPING_METHODS.find(m => m.id === methodId);
    if (method) {
      localStorage.setItem(SHIPPING_STORAGE_KEY, method.id);
      this.notify();
    }
  },

  getTotals() {
    const items = this.getItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const promo = this.getPromo();
    const discountAmount = promo ? (subtotal * (promo.discountPercent / 100)) : 0;

    const shippingMethod = this.getShippingMethod();
    // Standard shipping is free over $150
    let shippingCost = shippingMethod.price;
    if (shippingMethod.id === 'standard' && subtotal >= 150.00) {
      shippingCost = 0.00;
    }

    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const estimatedTax = taxableAmount > 0 ? taxableAmount * 0.05 : 0; // 5% flat estimated tax

    const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

    // Free shipping threshold calculation
    const freeShippingThreshold = 150.00;
    const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

    return {
      subtotal,
      promo,
      discountAmount,
      shippingMethod,
      shippingCost,
      estimatedTax,
      grandTotal,
      freeShippingThreshold,
      amountToFreeShipping,
      freeShippingProgress,
      isFreeShippingQualified: subtotal >= freeShippingThreshold
    };
  },

  notify() {
    const event = new CustomEvent('cart:updated', {
      detail: {
        items: this.getItems(),
        count: this.getItemCount(),
        totals: this.getTotals()
      }
    });
    window.dispatchEvent(event);
  }
};
