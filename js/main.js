/* Main JavaScript Bundle Initializer */
import { initNav } from './modules/nav.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initAccordion } from './modules/accordion.js';
import { initModals } from './modules/modal.js';
import { initCarousel } from './modules/carousel.js';
import { initCMSInspector } from './modules/cms-inspector.js';
import { initI18n } from './modules/i18n-rtl.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initAccordion();
  initModals();
  initCarousel();
  initCMSInspector();
  initI18n();

  console.log('⚡ The 1 Method Global Academy App Initialized with CMS-Ready Modules.');
});
