/* ==========================================================================
   THE 1 METHOD STORE — MAIN JAVASCRIPT ENTRY BUNDLE
   Central initialization for all e-commerce modules, CMS inspector, and state
   ========================================================================== */

import { initNav } from './modules/nav.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initAccordion } from './modules/accordion.js';
import { initModals } from './modules/modal.js';
import { initCMSInspector } from './modules/cms-inspector.js';

import { initMiniCart } from './modules/mini-cart.js';
import { initQuickView } from './modules/quick-view.js';
import { initSearchModal } from './modules/search-modal.js';
import { initI18n } from './modules/i18n-rtl.js';
import { initThemeSwitcher } from './modules/theme-switcher.js';

import { initCatalogPage } from './modules/catalog-page.js';
import { initProductPage } from './modules/product-page.js';
import { initCartPage } from './modules/cart-page.js';
import { initCheckoutPage } from './modules/checkout-page.js';
import { initConfirmationPage } from './modules/confirmation-page.js';

document.addEventListener('DOMContentLoaded', () => {
  // Global modules active on all store pages
  initNav();
  initScrollReveal();
  initAccordion();
  initModals();
  initMiniCart();
  initQuickView();
  initSearchModal();
  initI18n();
  initThemeSwitcher();
  initCMSInspector();

  // Page-specific controllers
  initCatalogPage();
  initProductPage();
  initCartPage();
  initCheckoutPage();
  initConfirmationPage();

  console.log('⚡ The 1 Method E-Commerce Design System Initialized (CMS Ready, Responsive, Multilingual + RTL).');
});
