/* ==========================================================================
   THE 1 METHOD STORE — MULTILINGUAL & NATIVE RTL ENGINE
   Full LTR (English, Spanish) and RTL (Hebrew עברית) layout mirroring
   ========================================================================== */

const STORAGE_LANG_KEY = 'the1method_lang';

export const TRANSLATIONS = {
  en: {
    dir: 'ltr',
    name: 'English',
    announcement: 'Free Global Insured Delivery on Academic Orders Over $150',
    brandSwitcher: 'Brand: The 1 Method',
    navHome: 'Academy Home',
    navStore: 'Store Home',
    navShopAll: 'Shop All Catalog',
    navCategories: 'Categories',
    navBestsellers: 'Bestsellers',
    navPassports: 'Passports & Pass',
    searchPlaceholder: 'Search clinical tools, books, passes...',
    cart: 'Cart',
    checkout: 'Checkout',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    notifyStock: 'Notify When Available',
    inStock: 'In Stock — Ready to ship',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    filters: 'Filters',
    clearFilters: 'Clear All Filters',
    sortBy: 'Sort by',
    viewDetails: 'View Details',
    quickView: 'Quick View',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    taxes: 'Taxes',
    total: 'Total',
    freeShippingUnlocked: 'You have unlocked FREE Global Shipping!',
    emptyCartTitle: 'Your Cart is Empty',
    exploreCatalog: 'Explore Catalog',
    proceedCheckout: 'Proceed to Checkout',
    orderSummary: 'Order Summary',
    stepCustomer: 'Customer Info',
    stepShipping: 'Shipping Address',
    stepPayment: 'Payment Method',
    placeOrder: 'Place Order & Pay',
    orderConfirmed: 'Order Confirmed!',
    thankYou: 'Thank you for your order.',
    printInvoice: 'Print Invoice',
    continueShopping: 'Continue Shopping'
  },
  es: {
    dir: 'ltr',
    name: 'Español',
    announcement: 'Envío global asegurado gratuito en pedidos académicos superiores a $150',
    brandSwitcher: 'Marca: The 1 Method',
    navHome: 'Inicio Academia',
    navStore: 'Inicio Tienda',
    navShopAll: 'Todo el Catálogo',
    navCategories: 'Categorías',
    navBestsellers: 'Más Vendidos',
    navPassports: 'Pases y Certificaciones',
    searchPlaceholder: 'Buscar herramientas clínicas, libros, pases...',
    cart: 'Carrito',
    checkout: 'Finalizar Compra',
    addToCart: 'Añadir al Carrito',
    buyNow: 'Comprar Ahora',
    notifyStock: 'Avisar cuando esté disponible',
    inStock: 'En Stock — Listo para enviar',
    lowStock: 'Stock Bajo',
    outOfStock: 'Agotado',
    filters: 'Filtros',
    clearFilters: 'Borrar Filtros',
    sortBy: 'Ordenar por',
    viewDetails: 'Ver Detalles',
    quickView: 'Vista Rápida',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    taxes: 'Impuestos',
    total: 'Total',
    freeShippingUnlocked: '¡Has desbloqueado Envío Global GRATUITO!',
    emptyCartTitle: 'Tu Carrito está Vacío',
    exploreCatalog: 'Explorar Catálogo',
    proceedCheckout: 'Proceder al Pago',
    orderSummary: 'Resumen del Pedido',
    stepCustomer: 'Datos de Contacto',
    stepShipping: 'Dirección de Envío',
    stepPayment: 'Método de Pago',
    placeOrder: 'Realizar Pedido y Pagar',
    orderConfirmed: '¡Pedido Confirmado!',
    thankYou: 'Gracias por tu compra.',
    printInvoice: 'Imprimir Factura',
    continueShopping: 'Continuar Comprando'
  },
  he: {
    dir: 'rtl',
    name: 'עברית (RTL)',
    announcement: 'משלוח בינלאומי מבוטח חינם בהזמנות אקדמיות מעל $150',
    brandSwitcher: 'מותג: The 1 Method',
    navHome: 'בית האקדמיה',
    navStore: 'חנות ראשית',
    navShopAll: 'כל המוצרים',
    navCategories: 'קטגוריות',
    navBestsellers: 'הנמכרים ביותר',
    navPassports: 'מנויים ותעודות',
    searchPlaceholder: 'חיפוש כלים קליניים, ספרים, סדנאות...',
    cart: 'עגלת קניות',
    checkout: 'לתשלום',
    addToCart: 'הוסף לסל',
    buyNow: 'רכישה מהירה',
    notifyStock: 'עדכן אותי כשחוזר למלאי',
    inStock: 'במלאי — מוכן למשלוח',
    lowStock: 'מלאי מוגבל',
    outOfStock: 'אזל מהמלאי',
    filters: 'סינון מוצרים',
    clearFilters: 'נקה את כל הסינונים',
    sortBy: 'מיון לפי',
    viewDetails: 'צפה בפרטים',
    quickView: 'מבט מהיר',
    subtotal: 'סכום ביניים',
    shipping: 'משלוח',
    taxes: 'מיסים',
    total: 'סה״כ לתשלום',
    freeShippingUnlocked: 'הנך זכאי למשלוח בינלאומי חינם!',
    emptyCartTitle: 'עגלת הקניות שלך ריקה',
    exploreCatalog: 'לעיון בקטלוג',
    proceedCheckout: 'מעבר לתשלום מאובטח',
    orderSummary: 'סיכום הזמנה',
    stepCustomer: 'פרטי לקוח',
    stepShipping: 'כתובת משלוח',
    stepPayment: 'אמצעי תשלום',
    placeOrder: 'בצע הזמנה ושלם',
    orderConfirmed: 'ההזמנה אושרה בהצלחה!',
    thankYou: 'תודה רבה על הזמנתך.',
    printInvoice: 'הדפס קבלה',
    continueShopping: 'המשך בקניות'
  }
};

export function initI18n() {
  const currentLang = localStorage.getItem(STORAGE_LANG_KEY) || 'en';
  applyLanguage(currentLang);

  // 1. Native selects (fallback)
  const langSelects = document.querySelectorAll('.lang-selector');
  langSelects.forEach(select => {
    select.value = currentLang;
    select.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  });

  // 2. Custom Luxury Language Dropdown Toggle
  document.querySelectorAll('.lang-switch-wrap').forEach(wrap => {
    const btn = wrap.querySelector('.lang-switch-btn');
    const menu = wrap.querySelector('.lang-dropdown-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });

    wrap.querySelectorAll('.lang-opt-btn').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = opt.getAttribute('data-lang');
        setLanguage(lang);
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Click outside closes dropdown
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.lang-switch-wrap.open').forEach(wrap => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('open');
        wrap.querySelector('.lang-switch-btn')?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-switch-wrap.open').forEach(wrap => {
        wrap.classList.remove('open');
        wrap.querySelector('.lang-switch-btn')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 3. Mobile Drawer Language Chips
  document.querySelectorAll('.drawer-lang-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const lang = chip.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
}

export function setLanguage(newLang) {
  localStorage.setItem(STORAGE_LANG_KEY, newLang);
  applyLanguage(newLang);
}

export function applyLanguage(langCode) {
  const langConfig = TRANSLATIONS[langCode] || TRANSLATIONS.en;
  const isRtl = langConfig.dir === 'rtl';

  document.documentElement.lang = langCode;
  document.documentElement.dir = langConfig.dir;

  // Update text for elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langConfig[key]) {
      el.textContent = langConfig[key];
    }
  });

  // Update placeholder for elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (langConfig[key]) {
      el.placeholder = langConfig[key];
    }
  });

  // Update custom luxury language toggle labels & active state
  const displayCode = langCode === 'he' ? 'עב' : langCode.toUpperCase();
  document.querySelectorAll('.current-lang-code').forEach(el => {
    el.textContent = displayCode;
  });

  document.querySelectorAll('.lang-opt-btn').forEach(opt => {
    const optLang = opt.getAttribute('data-lang');
    opt.classList.toggle('active', optLang === langCode);
  });

  document.querySelectorAll('.drawer-lang-chip').forEach(chip => {
    const chipLang = chip.getAttribute('data-lang');
    chip.classList.toggle('active', chipLang === langCode);
  });

  // Keep select dropdowns in sync
  document.querySelectorAll('.lang-selector').forEach(select => {
    select.value = langCode;
  });

  // Dispatch event for components that need custom re-render in RTL (e.g. carousels or cards)
  window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: langCode, isRtl } }));
}
