/* ==========================================================================
   THE 1 METHOD STORE — STANDALONE DESIGN SYSTEM CONTROLLER
   Self-contained, Adaptive CSS Tokens, LTR & RTL, In-Place Checkout
   ========================================================================== */

// 01. Embedded Catalog Repository
const PRODUCTS_CATALOG = [
  {
    id: 'prod-01',
    sku: 'TM-KIT-01',
    title: {
      en: 'The 1 Method Complete Clinical Diagnostics Kit',
      es: 'Kit Completo de Diagnóstico Clínico The 1 Method',
      he: 'ערכת אבחון קלינית מקיפה של The 1 Method'
    },
    subtitle: {
      en: 'Professional somatic assessment tools, tuning frequencies, and anatomical calipers',
      es: 'Herramientas profesionales de evaluación somática, frecuencias y calibres anatómicos',
      he: 'כלי הערכה סומטית מקצועיים, תדרי כוונון ומדדים אנטומיים'
    },
    categories: ['clinical-kits', 'somatic-tools'],
    featured: true,
    bestseller: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 128,
    basePrice: 285.00,
    originalPrice: 340.00,
    images: [
      'assets/images/course-spiritual-medicine.jpg',
      'assets/images/lecture-spine.jpg',
      'assets/images/lecture-mapping.jpg',
      'assets/images/private-healing.jpg'
    ],
    variants: [
      { id: 'v-01-clin', format: 'Clinical Master Set', language: 'English', color: 'Navy & Brass', price: 285.00, originalPrice: 340.00, stock: 8, imageIndex: 0 },
      { id: 'v-01-deluxe', format: 'Practitioner Deluxe Case', language: 'English', color: 'Obsidian Slate', price: 360.00, originalPrice: 420.00, stock: 3, imageIndex: 1 },
      { id: 'v-01-heb', format: 'Clinical Master Set', language: 'Hebrew (עברית)', color: 'Navy & Brass', price: 285.00, originalPrice: 340.00, stock: 5, imageIndex: 2 }
    ],
    shortDesc: {
      en: 'Engineered specifically for certified practitioners of The 1 Method. Includes high-frequency somatic mapping calipers, weighted diagnostic tuning forks, and clinical assessment journals.',
      es: 'Diseñado para profesionales certificados. Incluye calibres de mapeo somático, diapasones ponderados y diarios de evaluación clínica.',
      he: 'פותח במיוחד עבור מטפלים מוסמכים בשיטת The 1 Method. כולל קליפרים למיפוי סומטי, קולנים אבחוניים ויומני הערכה קליניים.'
    },
    specs: [
      { label: 'Components', value: '4 Harmonic Diagnostic Forks (128Hz, 256Hz, 512Hz, 432Hz), Somatic Caliper' },
      { label: 'Materials', value: 'Aerospace-Grade Anodized Aluminum, Surgical Steel' },
      { label: 'Accreditation', value: 'Approved for CEU Practical Demonstration across 42 countries' }
    ]
  },
  {
    id: 'prod-02',
    sku: 'TM-BK-01',
    title: {
      en: 'Spiritual Medicine & Clinical Rehabilitation: The Definitive Volume',
      es: 'Medicina Espiritual y Rehabilitación Clínica: El Volumen Definitivo',
      he: 'רפואה רוחנית ושיקום קליני: הכרך השלם מאת אוסי שטיינברג'
    },
    subtitle: {
      en: 'Hardcover clinical monograph by Osie Steinberg with anatomical plates and case studies',
      es: 'Monografía clínica de tapa dura por Osie Steinberg con láminas anatómicas',
      he: 'מונוגרפיה קלינית בכריכה קשה מאת אוסי שטיינברג עם לוחות אנטומיים ומחקרי מקרה'
    },
    categories: ['publications'],
    featured: true,
    bestseller: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 246,
    basePrice: 68.00,
    originalPrice: 85.00,
    images: [
      'assets/images/founder-osie-book.jpg',
      'assets/images/private-healing-book.jpg',
      'assets/images/article-aristotle.jpg'
    ],
    variants: [
      { id: 'v-02-hard', format: 'Collector Cloth Hardcover', language: 'English', color: 'Gold Foil Linen', price: 68.00, originalPrice: 85.00, stock: 24, imageIndex: 0 },
      { id: 'v-02-heb', format: 'Collector Cloth Hardcover', language: 'Hebrew (עברית)', color: 'Gold Foil Linen', price: 68.00, originalPrice: 85.00, stock: 15, imageIndex: 1 },
      { id: 'v-02-digi', format: 'Global Digital Academic Edition', language: 'Bilingual (EN/HE)', color: 'Instant PDF/ePub', price: 42.00, originalPrice: 50.00, stock: 999, imageIndex: 2 }
    ],
    shortDesc: {
      en: 'The seminal textbook synthesizing three decades of clinical physiotherapy, metaphysical consciousness, and somatic cellular restoration by Osie Steinberg.',
      es: 'El libro de texto seminal que sintetiza tres décadas de fisioterapia clínica y restauración somática por Osie Steinberg.',
      he: 'ספר הלימוד היסודי המסכם שלושה עשורים של פיזיותרפיה קלינית, מודעות מטאפיזית ושיקום תאי-סומטי מאת אוסי שטיינברג.'
    },
    specs: [
      { label: 'Pages', value: '488 Smyth-Sewn Archive Pages with 64 Full-Color Anatomical Plates' },
      { label: 'Publisher', value: 'Academy of Spiritual Medicine Academic Press, 1st Edition' }
    ]
  },
  {
    id: 'prod-03',
    sku: 'TM-WEDGE-01',
    title: {
      en: 'Bio-Somatic Spinal Alignment Wedge & Decompression Roll',
      es: 'Cuña de Alineación Espinal Bio-Somática y Rollo de Descompresión',
      he: 'טריז יישור עמוד שדרה ביו-סומטי וגליל שחרור עומסים'
    },
    subtitle: {
      en: 'Anatomically calibrated spinal traction bolster for suboccipital and sacral fascial release',
      es: 'Refuerzo de tracción espinal calibrado anatómicamente para liberación fascial',
      he: 'בולסטר מתיחה מכויל לשחרור פאציאלי סקראלי וסוב-אוקסיפיטלי'
    },
    categories: ['somatic-tools', 'clinical-kits'],
    featured: true,
    bestseller: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 74,
    basePrice: 110.00,
    originalPrice: 135.00,
    images: [
      'assets/images/lecture-spine.jpg',
      'assets/images/course-rehabilitation.jpg',
      'assets/images/course-spiritual-medicine.jpg'
    ],
    variants: [
      { id: 'v-03-std', format: 'High-Density Studio Contour', language: 'Universal', color: 'Midnight Indigo', price: 110.00, originalPrice: 135.00, stock: 12, imageIndex: 0 },
      { id: 'v-03-trav', format: 'Travel Compact Edition', language: 'Universal', color: 'Slate Grey', price: 92.00, originalPrice: 115.00, stock: 4, imageIndex: 1 }
    ],
    shortDesc: {
      en: 'Precisely angled to restore natural lumbar lordosis and cervical curve while facilitating breath-synchronized spinal decompression in clinical practice.',
      es: 'Angulado con precisión para restaurar la lordosis lumbar natural y la curva cervical durante la práctica clínica.',
      he: 'בזווית מדויקת לשחזור הלורדוזה המותנית והעקומה הצווארית תוך הפחתת לחצים סנכרונית לנשימה בקליניקה.'
    },
    specs: [
      { label: 'Density', value: '70-ILD Medical Grade Polyurethane with Memory Foam Top Layer' },
      { label: 'Cover', value: 'Removable Antimicrobial Organic Bamboo Jacquard' }
    ]
  },
  {
    id: 'prod-04',
    sku: 'TM-PASS-2026',
    title: {
      en: 'Global Masterclass Annual Digital Academic Passport',
      es: 'Pasaporte Académico Digital Anual para Masterclasses',
      he: 'דרכון אקדמי דיגיטלי שנתי למאסטר-קלאס בינלאומי'
    },
    subtitle: {
      en: 'All-inclusive 12-month pass to live international clinical lectures and archival streams',
      es: 'Pase anual con acceso a conferencias clínicas internacionales en vivo y grabadas',
      he: 'כרטיס שנתי הכולל גישה לכל הרצאות הקליניקה הבינלאומיות בשידור חי ובארכיון'
    },
    categories: ['masterclasses'],
    featured: true,
    bestseller: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 312,
    basePrice: 480.00,
    originalPrice: 600.00,
    images: [
      'assets/images/lecture-retreat.jpg',
      'assets/images/course-consciousness.jpg',
      'assets/images/transformation-path.jpg'
    ],
    variants: [
      { id: 'v-04-ind', format: 'Individual Practitioner Pass', language: 'Multilingual', color: 'Digital Pass', price: 480.00, originalPrice: 600.00, stock: 999, imageIndex: 0 },
      { id: 'v-04-clin', format: 'Clinic Team Multi-License', language: 'Multilingual', color: 'Institutional', price: 1150.00, originalPrice: 1400.00, stock: 18, imageIndex: 1 }
    ],
    shortDesc: {
      en: 'Unrestricted digital credential granting admission to 24 live clinical masterclasses conducted by Osie Steinberg, accompanied by accredited continuing education transcripts.',
      es: 'Credencial digital con acceso a 24 masterclasses clínicas en vivo impartidas por Osie Steinberg.',
      he: 'תעודה דיגיטלית המעניקה כניסה ל-24 סדנאות מאסטר-קלאס קליניות בשידור חי בהנחיית אוסי שטיינברג.'
    },
    specs: [
      { label: 'Duration', value: '12 Months Full Digital Access' },
      { label: 'Accreditation', value: '48 CEU Practical Contact Hours' }
    ]
  },
  {
    id: 'prod-05',
    sku: 'TM-APP-01',
    title: {
      en: 'Practitioner Somatic Linen Lab Tunic',
      es: 'Túnica de Lino para Profesionales Somáticos',
      he: 'טוניקת פשתן קלינית למטפלים סומטיים'
    },
    subtitle: {
      en: 'Breathable stonewashed European linen clinical attire tailored for unconstrained bodywork',
      es: 'Ropa clínica de lino europeo lavado a la piedra para trabajo corporal sin restricciones',
      he: 'לבוש קליני מפשתן אירופאי שטוף אבן, מותאם לעבודת גוף וטיפול ללא מגבלות תנועה'
    },
    categories: ['apparel-gear'],
    featured: false,
    bestseller: false,
    isNew: true,
    rating: 4.7,
    reviewsCount: 43,
    basePrice: 135.00,
    originalPrice: 160.00,
    images: [
      'assets/images/private-healing.jpg',
      'assets/images/course-spiritual-medicine.jpg'
    ],
    variants: [
      { id: 'v-05-m-navy', format: 'Size M / Medium Fit', language: 'Universal', color: 'Deep Academy Navy', price: 135.00, originalPrice: 160.00, stock: 6, imageIndex: 0 },
      { id: 'v-05-l-navy', format: 'Size L / Relaxed Fit', language: 'Universal', color: 'Deep Academy Navy', price: 135.00, originalPrice: 160.00, stock: 9, imageIndex: 0 }
    ],
    shortDesc: {
      en: 'Tailored for practitioners requiring complete fluidity of motion during intensive somatic adjustments.',
      es: 'Confeccionada para permitir máxima fluidez de movimiento en sesiones de ajuste corporal.',
      he: 'מעוצבת למטפלים הדורשים חופש תנועה מוחלט בעת טיפולי גוף ממושכים.'
    },
    specs: [
      { label: 'Fabric', value: '100% Certified Oeko-Tex European Pre-Washed Flax Linen (220 GSM)' }
    ]
  },
  {
    id: 'prod-06',
    sku: 'TM-STETH-01',
    title: {
      en: 'Harmonic Somatic Tuning Stethoscope',
      es: 'Estetoscopio de Resonancia Somática Armónica',
      he: 'סטטוסקופ תדרי תהודה סומטי'
    },
    subtitle: {
      en: 'Dual-head diagnostic listening instrument calibrated for subtle fascial rhythm and breath flow',
      es: 'Instrumento de escucha diagnóstica calibrado para ritmo fascial sutil y flujo respiratorio',
      he: 'מכשיר האזנה אבחוני בעל ראש כפול המכויל למקצבים פאציאליים וזרימת נשימה'
    },
    categories: ['clinical-kits', 'somatic-tools'],
    featured: false,
    bestseller: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 37,
    basePrice: 195.00,
    originalPrice: 230.00,
    images: [
      'assets/images/lecture-mapping.jpg',
      'assets/images/course-rehabilitation.jpg'
    ],
    variants: [
      { id: 'v-06-std', format: 'Standard Clinical Acoustic Chestpiece', language: 'Universal', color: 'Matte Titanium & Navy', price: 195.00, originalPrice: 230.00, stock: 7, imageIndex: 0 }
    ],
    shortDesc: {
      en: 'Specially damped chestpiece engineered to register micro-vibrational responses and thoracic fascial glide.',
      es: 'Campana amortiguada diseñada para registrar micro-vibraciones y deslizamiento fascial torácico.',
      he: 'פעמון בעל שיכוך מיוחד שנועד לקלוט תגובות מיקרו-ויברציה וגלישת פאציה בית-חזיתית.'
    },
    specs: [
      { label: 'Acoustic Sensitivity', value: 'Enhanced low frequency range (20Hz - 250Hz)' }
    ]
  }
];

// 02. Multilingual Translations
const TRANSLATIONS = {
  en: {
    sectionTag: 'Curated Store & Apparatus',
    sectionTitle: 'Official Clinical Instruments',
    allProducts: 'All Products',
    catClinical: 'Clinical Diagnostic Kits',
    catPublications: 'Books & Monographs',
    catMasterclasses: 'Masterclasses & Passes',
    catSomatic: 'Somatic Spinal Tools',
    catApparel: 'Practitioner Gear',
    searchPlaceholder: 'Search tools, books, passes...',
    sortFeatured: 'Featured Highlights',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRating: 'Highest Customer Rating',
    quickView: 'Quick View',
    quickAdd: 'Quick Add',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    cart: 'Cart',
    filterByCategory: 'Filter by Category',
    activeFilterPrefix: 'Category Filter',
    clearFilter: 'Show All Products',
    cartEmpty: 'Your shopping cart is currently empty.',
    freeShippingGoal: 'Add {amount} more for FREE Worldwide Courier Delivery!',
    freeShippingUnlocked: '🎉 You have unlocked FREE Worldwide Courier Delivery!',
    promoPlaceholder: 'PROMO CODE (e.g. WELCOME20)',
    applyPromo: 'Apply',
    subtotal: 'Subtotal',
    discount: 'Discount',
    shipping: 'Shipping',
    freeShipping: 'FREE',
    tax: 'Estimated Tax',
    total: 'Total',
    checkout: 'Proceed to Checkout',
    close: 'Close',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    format: 'Format & Edition',
    specifications: 'Clinical Specifications',
    guarantee: 'Insured Shipping & 30-Day Guarantee',
    guaranteeText: 'Every instrument is manufactured under clinical physiotherapy tolerances with insured worldwide diplomatic tracking and a full 30-day clinical practice guarantee.',
    trust1Title: 'Worldwide Insured Transit',
    trust1Desc: 'Tracked diplomatic courier shipping to 42 countries worldwide.',
    trust2Title: 'Accredited Clinical Quality',
    trust2Desc: 'Every instrument manufactured to strict physiotherapy tolerances.',
    trust3Title: '30-Day Clinical Guarantee',
    trust3Desc: 'Try in your clinical practice with full satisfaction guarantee.',
    trust4Title: '256-Bit SSL Encrypted',
    trust4Desc: 'Bank-grade security and immediate digital invoice receipt delivery.',
    checkoutTitle: 'Express Secure Checkout',
    stepContact: '1. Contact & Delivery',
    stepShipping: '2. Courier Shipping',
    stepPayment: '3. Payment Method',
    fullName: 'Full Name',
    email: 'Email Address',
    street: 'Street Address',
    city: 'City',
    postalCode: 'Postal Code',
    completeOrder: 'Complete Order & Pay',
    processingOrder: 'Securing transaction with 256-bit encryption...',
    orderSuccessTitle: 'Thank You for Your Order!',
    orderSuccessDesc: 'Your order has been confirmed. A tracked shipping notice and receipt have been dispatched to your email.',
    orderId: 'Order ID',
    continueShopping: 'Continue Shopping',
    addedToCart: 'Added to cart!'
  },
  es: {
    sectionTag: 'Tienda y Aparatos Oficiales',
    sectionTitle: 'Instrumentos Clínicos de Precisión',
    allProducts: 'Todos los Productos',
    catClinical: 'Kits Clínicos de Diagnóstico',
    catPublications: 'Libros y Monografías',
    catMasterclasses: 'Masterclasses y Pases',
    catSomatic: 'Herramientas Somáticas',
    catApparel: 'Equipo de Práctica',
    searchPlaceholder: 'Buscar herramientas, libros...',
    sortFeatured: 'Destacados',
    sortPriceAsc: 'Precio: Menor a Mayor',
    sortPriceDesc: 'Precio: Mayor a Menor',
    sortRating: 'Mejor Calificados',
    quickView: 'Vista Rápida',
    quickAdd: 'Añadir Rápido',
    inStock: 'En Stock',
    lowStock: 'Stock Bajo',
    outOfStock: 'Agotado',
    cart: 'Carrito',
    filterByCategory: 'Filtrar por Categoría',
    activeFilterPrefix: 'Filtro de Categoría',
    clearFilter: 'Mostrar Todos los Productos',
    cartEmpty: 'Tu carrito de compras está vacío actualmente.',
    freeShippingGoal: '¡Agrega {amount} más para Envío Global GRATIS!',
    freeShippingUnlocked: '🎉 ¡Has desbloqueado Envío Global GRATUITO!',
    promoPlaceholder: 'CÓDIGO (ej. WELCOME20)',
    applyPromo: 'Aplicar',
    subtotal: 'Subtotal',
    discount: 'Descuento',
    shipping: 'Envío',
    freeShipping: 'GRATIS',
    tax: 'Impuestos Estimados',
    total: 'Total',
    checkout: 'Proceder al Pago',
    close: 'Cerrar',
    quantity: 'Cantidad',
    addToCart: 'Añadir al Carrito',
    buyNow: 'Comprar Ahora',
    format: 'Formato y Edición',
    specifications: 'Especificaciones Clínicas',
    guarantee: 'Envío Asegurado y Garantía 30 Días',
    guaranteeText: 'Cada instrumento se fabrica bajo tolerancias de fisioterapia clínica con seguimiento asegurado y garantía de 30 días.',
    trust1Title: 'Envío Asegurado Mundial',
    trust1Desc: 'Envíos por mensajería diplomática rastreada a 42 países.',
    trust2Title: 'Calidad Clínica Acreditada',
    trust2Desc: 'Fabricación bajo estrictas tolerancias de fisioterapia.',
    trust3Title: 'Garantía Clínica de 30 Días',
    trust3Desc: 'Pruebe en su práctica clínica con total satisfacción.',
    trust4Title: 'Encriptación SSL 256-Bit',
    trust4Desc: 'Seguridad bancaria y recibo digital inmediato.',
    checkoutTitle: 'Pago Seguro y Rápido',
    stepContact: '1. Contacto y Entrega',
    stepShipping: '2. Mensajería de Envío',
    stepPayment: '3. Método de Pago',
    fullName: 'Nombre Completo',
    email: 'Correo Electrónico',
    street: 'Dirección de Entrega',
    city: 'Ciudad',
    postalCode: 'Código Postal',
    completeOrder: 'Finalizar Pedido y Pagar',
    processingOrder: 'Procesando transacción segura...',
    orderSuccessTitle: '¡Gracias por su Compra!',
    orderSuccessDesc: 'Su pedido ha sido confirmado y enviado a su correo electrónico.',
    orderId: 'ID del Pedido',
    continueShopping: 'Seguir Comprando',
    addedToCart: '¡Añadido al carrito con éxito!'
  },
  he: {
    sectionTag: 'החנות והמכשירים הרשמיים',
    sectionTitle: 'מכשור קליני ומונוגרפיות אקדמיות',
    allProducts: 'כל המוצרים',
    catClinical: 'ערכות אבחון קליניות',
    catPublications: 'ספרים ומונוגרפיות',
    catMasterclasses: 'סדנאות ודרכונים',
    catSomatic: 'כלים סומטיים לעמוד השדרה',
    catApparel: 'לבוש וציוד מטפלים',
    searchPlaceholder: 'חיפוש מכשירים, ספרים...',
    sortFeatured: 'מומלצים נבחרים',
    sortPriceAsc: 'מחיר: מהנמוך לגבוה',
    sortPriceDesc: 'מחיר: מהגבוה לנמוך',
    sortRating: 'דירוג לקוחות הגבוה ביותר',
    quickView: 'מבט מהיר',
    quickAdd: 'הוספה מהירה',
    inStock: 'במלאי',
    lowStock: 'מלאי מוגבל',
    outOfStock: 'אזל מהמלאי',
    cart: 'עגלת קניות',
    filterByCategory: 'סנן לפי קטגוריה',
    activeFilterPrefix: 'סינון לפי קטגוריה',
    clearFilter: 'הצג את כל המוצרים',
    cartEmpty: 'עגלת הקניות שלך ריקה כעת.',
    freeShippingGoal: 'הוסף עוד {amount} לקבלת משלוח בינלאומי חינם!',
    freeShippingUnlocked: '🎉 זכית במשלוח בינלאומי מבוטח חינם!',
    promoPlaceholder: 'קוד קופון (למשל WELCOME20)',
    applyPromo: 'הפעל',
    subtotal: 'סכום ביניים',
    discount: 'הנחה',
    shipping: 'משלוח',
    freeShipping: 'חינם',
    tax: 'מס משוער',
    total: 'סך הכל',
    checkout: 'מעבר לתשלום מאובטח',
    close: 'סגור',
    quantity: 'כמות',
    addToCart: 'הוסף לסל',
    buyNow: 'רכישה מיידית',
    format: 'מהדורה ופורמט',
    specifications: 'מפרט קליני',
    guarantee: 'משלוח מבוטח ואחריות קלינית 30 יום',
    guaranteeText: 'כל מכשיר מיוצר בדיוק מרבי לפי תקני פיזיותרפיה קלינית ומגיע עם ביטוח מלא ואחריות התנסות של 30 יום.',
    trust1Title: 'משלוח בינלאומי מבוטח',
    trust1Desc: 'שליח דיפלומטי במעקב מלא ל-42 מדינות ברחבי העולם.',
    trust2Title: 'איכות קלינית מוסמכת',
    trust2Desc: 'כל מכשיר מיוצר בדיוק קפדני לפי תקני פיזיותרפיה.',
    trust3Title: 'אחריות קלינית 30 יום',
    trust3Desc: 'התנסו בקליניקה שלכם עם אחריות שביעות רצון מלאה.',
    trust4Title: 'אבטחת SSL 256-Bit',
    trust4Desc: 'אבטחה בדרגת בנקים ומשלוח קבלה דיגיטלית מיידית.',
    checkoutTitle: 'תשלום מאובטח ומהיר',
    stepContact: '1. פרטי לקוח וכתובת',
    stepShipping: '2. שיטת משלוח',
    stepPayment: '3. פרטי תשלום',
    fullName: 'שם מלא',
    email: 'כתובת דוא״ל',
    street: 'רחוב ומספר בית',
    city: 'עיר',
    postalCode: 'מיקוד',
    completeOrder: 'בצע הזמנה ושלם',
    processingOrder: 'מעבד עסקה מאובטחת בהצפנת 256-bit...',
    orderSuccessTitle: 'תודה על הזמנתך!',
    orderSuccessDesc: 'ההזמנה נקלטה בהצלחה. קבלה ופרטי מעקב נשלחו לאימייל שלך.',
    orderId: 'מספר הזמנה',
    continueShopping: 'המשך בחנות',
    addedToCart: 'נוסף לסל בהצלחה!'
  }
};

const PROMO_COUPONS = {
  'WELCOME20': { code: 'WELCOME20', discountPercent: 20 },
  'OSIE10': { code: 'OSIE10', discountPercent: 10 }
};

// 03. Standalone Store Component
class The1MethodStoreComponent {
  constructor(options = {}) {
    this.container = typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

    if (!this.container) {
      console.warn('The1MethodStore: Container not found.');
      return;
    }

    // Determine initial language & direction
    const attrLang = this.container.getAttribute('data-lang');
    const attrDir = this.container.getAttribute('data-dir') || this.container.getAttribute('dir');
    const docDir = document.documentElement.dir || 'ltr';
    const docLang = document.documentElement.lang ? document.documentElement.lang.slice(0, 2) : 'en';

    this.lang = options.lang || attrLang || (docLang === 'he' || docLang === 'es' ? docLang : 'en');
    this.dir = options.dir || attrDir || (this.lang === 'he' ? 'rtl' : docDir);
    this.theme = options.theme || this.container.getAttribute('data-theme') || 'auto';

    // Apply custom design system tokens if provided in options
    if (options.colors) {
      if (options.colors.primary) this.container.style.setProperty('--color-primary', options.colors.primary);
      if (options.colors.secondary) this.container.style.setProperty('--color-secondary', options.colors.secondary);
      if (options.colors.surface) this.container.style.setProperty('--color-surface', options.colors.surface);
      if (options.colors.cardBg) this.container.style.setProperty('--color-card-bg', options.colors.cardBg);
    }
    if (options.fonts) {
      if (options.fonts.sans) this.container.style.setProperty('--font-sans', options.fonts.sans);
      if (options.fonts.serif) this.container.style.setProperty('--font-serif', options.fonts.serif);
    }

    this.activeCategory = options.defaultCategory || 'all';
    this.searchQuery = '';
    this.sortCriteria = 'featured';

    this.activeModalProduct = null;
    this.activeModalVariant = null;
    this.activeModalQty = 1;
    this.activeGalleryImgIndex = 0;

    // Checkout Flow State
    this.checkoutStep = 1;
    this.selectedShippingMethod = 'std';
    this.lastOrderData = null;

    // Cart state from localStorage
    this.cartItems = this.loadCart();
    this.appliedPromo = null;

    this.initDOM();
    this.bindEvents();
    this.render();
  }

  t(key) {
    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  }

  loadCart() {
    try {
      return JSON.parse(localStorage.getItem('t1m_standalone_cart')) || [];
    } catch {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem('t1m_standalone_cart', JSON.stringify(this.cartItems));
    this.updateCartBadge();
    this.renderCartDrawer();
    window.dispatchEvent(new CustomEvent('t1m:cart:updated', { detail: { items: this.cartItems } }));
  }

  setLanguage(lang, dir) {
    this.lang = lang;
    this.dir = dir || (lang === 'he' ? 'rtl' : 'ltr');
    this.container.setAttribute('data-lang', this.lang);
    this.container.setAttribute('dir', this.dir);
    this.container.classList.toggle('t1m-rtl', this.dir === 'rtl');
    this.render();
  }

  setTheme(theme) {
    this.theme = theme;
    if (theme === 'auto') {
      this.container.removeAttribute('data-theme');
    } else {
      this.container.setAttribute('data-theme', theme);
    }
  }

  setDesignTokens(tokens = {}) {
    if (tokens.primary) this.container.style.setProperty('--color-primary', tokens.primary);
    if (tokens.secondary) this.container.style.setProperty('--color-secondary', tokens.secondary);
    if (tokens.surface) this.container.style.setProperty('--color-surface', tokens.surface);
    if (tokens.cardBg) this.container.style.setProperty('--color-card-bg', tokens.cardBg);
    if (tokens.fontSans) this.container.style.setProperty('--font-sans', tokens.fontSans);
    if (tokens.fontSerif) this.container.style.setProperty('--font-serif', tokens.fontSerif);
  }

  getCalculations() {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountPercent = this.appliedPromo ? this.appliedPromo.discountPercent : 0;
    const discountAmount = (subtotal * discountPercent) / 100;
    const taxableSubtotal = Math.max(0, subtotal - discountAmount);

    let shippingCost = 0;
    if (this.selectedShippingMethod === 'exp') shippingCost = 15.00;
    else if (this.selectedShippingMethod === 'dip') shippingCost = 35.00;
    else {
      shippingCost = taxableSubtotal >= 150 ? 0.00 : 12.00;
    }

    const estimatedTax = taxableSubtotal * 0.05;
    const total = taxableSubtotal + shippingCost + estimatedTax;

    return {
      subtotal,
      discountAmount,
      shippingCost,
      estimatedTax,
      total,
      itemCount: this.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    };
  }

  initDOM() {
    this.container.className = `t1m-standalone-store ${this.dir === 'rtl' ? 't1m-rtl' : ''}`;
    this.container.setAttribute('dir', this.dir);
    this.container.setAttribute('data-lang', this.lang);
    if (this.theme !== 'auto') {
      this.container.setAttribute('data-theme', this.theme);
    }

    this.container.innerHTML = `
      <div class="t1m-store-inner">
        <!-- Store Controls & Section Header -->
        <div class="t1m-toolbar-wrap">
          <div class="t1m-toolbar-top">
            <div class="t1m-section-heading-group">
              <span class="t1m-section-tag">${this.t('sectionTag')}</span>
              <h2 class="t1m-section-title">${this.t('sectionTitle')}</h2>
            </div>

            <div class="t1m-toolbar-actions">
              <!-- Live Language Pills -->
              <div class="t1m-lang-pills">
                <button class="t1m-lang-btn ${this.lang === 'en' ? 'active' : ''}" data-store-lang="en">EN</button>
                <button class="t1m-lang-btn ${this.lang === 'es' ? 'active' : ''}" data-store-lang="es">ES</button>
                <button class="t1m-lang-btn ${this.lang === 'he' ? 'active' : ''}" data-store-lang="he">עברית</button>
              </div>

              <!-- Cart Trigger -->
              <button class="t1m-cart-btn" id="t1m-cart-trigger-btn" aria-label="Open Cart">
                <span class="material-symbols-outlined" style="font-size:18px;">shopping_bag</span>
                <span>${this.t('cart')}</span>
                <span class="t1m-cart-badge" id="t1m-cart-badge-count">0</span>
              </button>
            </div>
          </div>

          <!-- Filter & Search Controls Row (100% Mobile Responsive, No Horizontal Bar) -->
          <div class="t1m-controls-row">
            <!-- Search Box -->
            <div class="t1m-search-wrap">
              <span class="material-symbols-outlined t1m-search-icon">search</span>
              <input type="text" class="t1m-search-input" id="t1m-search-input" placeholder="${this.t('searchPlaceholder')}">
            </div>

            <!-- Dropdowns Cluster: Category Dropdown & Sort Dropdown -->
            <div class="t1m-dropdowns-cluster">
              <!-- Category Selector Dropdown -->
              <div class="t1m-custom-select-wrap" id="t1m-category-select-wrap">
                <span class="material-symbols-outlined t1m-select-leading-icon">category</span>
                <select class="t1m-select-field" id="t1m-category-select" aria-label="${this.t('filterByCategory')}">
                  <!-- Dynamically populated options -->
                </select>
                <span class="material-symbols-outlined t1m-select-trailing-arrow">expand_more</span>
              </div>

              <!-- Sort Dropdown -->
              <div class="t1m-custom-select-wrap">
                <span class="material-symbols-outlined t1m-select-leading-icon">swap_vert</span>
                <select class="t1m-select-field" id="t1m-sort-select" aria-label="Sort products">
                  <option value="featured">${this.t('sortFeatured')}</option>
                  <option value="price-asc">${this.t('sortPriceAsc')}</option>
                  <option value="price-desc">${this.t('sortPriceDesc')}</option>
                  <option value="rating">${this.t('sortRating')}</option>
                </select>
                <span class="material-symbols-outlined t1m-select-trailing-arrow">expand_more</span>
              </div>
            </div>
          </div>

          <!-- Active Filter Status Bar (Clean, Space-Saving, Zero Horizontal Scrolling) -->
          <div class="t1m-active-filter-bar" id="t1m-active-filter-bar" style="display:none;"></div>
        </div>

        <!-- Product Cards Grid -->
        <div class="t1m-product-grid" id="t1m-product-grid"></div>

        <!-- Trust & Value Strip -->
        <div class="t1m-trust-bar">
          <div class="t1m-trust-grid">
            <div class="t1m-trust-item">
              <div class="t1m-trust-icon"><span class="material-symbols-outlined">local_shipping</span></div>
              <div>
                <h4 class="t1m-trust-title">${this.t('trust1Title')}</h4>
                <p class="t1m-trust-desc">${this.t('trust1Desc')}</p>
              </div>
            </div>

            <div class="t1m-trust-item">
              <div class="t1m-trust-icon"><span class="material-symbols-outlined">verified</span></div>
              <div>
                <h4 class="t1m-trust-title">${this.t('trust2Title')}</h4>
                <p class="t1m-trust-desc">${this.t('trust2Desc')}</p>
              </div>
            </div>

            <div class="t1m-trust-item">
              <div class="t1m-trust-icon"><span class="material-symbols-outlined">published_with_changes</span></div>
              <div>
                <h4 class="t1m-trust-title">${this.t('trust3Title')}</h4>
                <p class="t1m-trust-desc">${this.t('trust3Desc')}</p>
              </div>
            </div>

            <div class="t1m-trust-item">
              <div class="t1m-trust-icon"><span class="material-symbols-outlined">lock</span></div>
              <div>
                <h4 class="t1m-trust-title">${this.t('trust4Title')}</h4>
                <p class="t1m-trust-desc">${this.t('trust4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- In-Place Product Quick-View Modal -->
      <div class="t1m-modal-backdrop" id="t1m-product-modal">
        <div class="t1m-modal-dialog">
          <button class="t1m-modal-close" id="t1m-modal-close-btn" aria-label="Close">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div id="t1m-modal-body"></div>
        </div>
      </div>

      <!-- Slide-Out Cart Drawer -->
      <div class="t1m-drawer-backdrop" id="t1m-drawer-backdrop"></div>
      <aside class="t1m-cart-drawer" id="t1m-cart-drawer">
        <div class="t1m-drawer-header">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="material-symbols-outlined" style="color:var(--t1m-secondary);">shopping_bag</span>
            <h3 style="font-family:var(--t1m-font-serif); margin:0; font-size:1.25rem;">${this.t('cart')}</h3>
          </div>
          <button class="t1m-modal-close" id="t1m-drawer-close-btn" style="position:static;" aria-label="Close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="t1m-free-shipping-meter" id="t1m-free-shipping-meter"></div>
        <div class="t1m-drawer-items" id="t1m-drawer-items"></div>
        <div class="t1m-drawer-footer" id="t1m-drawer-footer"></div>
      </aside>

      <!-- In-Place Checkout Modal -->
      <div class="t1m-modal-backdrop" id="t1m-checkout-modal">
        <div class="t1m-modal-dialog t1m-checkout-dialog">
          <button class="t1m-modal-close" id="t1m-checkout-close-btn" aria-label="Close">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div id="t1m-checkout-body"></div>
        </div>
      </div>

      <!-- Floating Sticky Cart Launcher -->
      <div class="t1m-floating-launcher" id="t1m-floating-launcher" title="View Shopping Cart">
        <div class="t1m-launcher-icon">
          <span class="material-symbols-outlined" style="font-size:18px;">shopping_bag</span>
          <span class="t1m-launcher-badge" id="t1m-floating-badge">0</span>
        </div>
        <span style="font-size:0.825rem; font-weight:700;" id="t1m-floating-total">$0.00</span>
      </div>
    `;
  }

  bindEvents() {
    // Language pill buttons
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-store-lang]');
      if (btn) {
        const selectedLang = btn.getAttribute('data-store-lang');
        this.setLanguage(selectedLang);
      }
    });

    // Category dropdown change
    const categorySelect = this.container.querySelector('#t1m-category-select');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.activeCategory = e.target.value;
        this.updateActiveFilterUI();
        this.renderProducts();
      });
    }

    // Clear filter button & category tag clicks
    this.container.addEventListener('click', (e) => {
      const clearBtn = e.target.closest('#t1m-clear-filter-btn');
      if (clearBtn) {
        this.activeCategory = 'all';
        this.updateActiveFilterUI();
        this.renderProducts();
      }

      const catTag = e.target.closest('[data-store-filter-cat]');
      if (catTag) {
        const catId = catTag.getAttribute('data-store-filter-cat');
        if (catId) {
          this.activeCategory = catId;
          this.updateActiveFilterUI();
          this.renderProducts();
        }
      }
    });

    // Search
    const searchInput = this.container.querySelector('#t1m-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProducts();
      });
    }

    // Sort
    const sortSelect = this.container.querySelector('#t1m-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortCriteria = e.target.value;
        this.renderProducts();
      });
    }

    // Cart Drawer Toggle
    const cartTrigger = this.container.querySelector('#t1m-cart-trigger-btn');
    const floatingLauncher = this.container.querySelector('#t1m-floating-launcher');
    const drawerClose = this.container.querySelector('#t1m-drawer-close-btn');
    const drawerBackdrop = this.container.querySelector('#t1m-drawer-backdrop');

    const openCart = () => this.toggleCartDrawer(true);
    const closeCart = () => this.toggleCartDrawer(false);

    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    if (floatingLauncher) floatingLauncher.addEventListener('click', openCart);
    if (drawerClose) drawerClose.addEventListener('click', closeCart);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeCart);

    // Modal Close
    const modalClose = this.container.querySelector('#t1m-modal-close-btn');
    const modalBackdrop = this.container.querySelector('#t1m-product-modal');
    if (modalClose) modalClose.addEventListener('click', () => this.toggleProductModal(false));
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.toggleProductModal(false);
      });
    }

    // Checkout Close
    const checkoutClose = this.container.querySelector('#t1m-checkout-close-btn');
    const checkoutModal = this.container.querySelector('#t1m-checkout-modal');
    if (checkoutClose) checkoutClose.addEventListener('click', () => this.toggleCheckoutModal(false));
    if (checkoutModal) {
      checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) this.toggleCheckoutModal(false);
      });
    }

    // Product Card Quick Actions
    this.container.addEventListener('click', (e) => {
      const viewTrigger = e.target.closest('[data-store-view]');
      if (viewTrigger) {
        const prodId = viewTrigger.getAttribute('data-store-view');
        const prod = PRODUCTS_CATALOG.find(p => p.id === prodId);
        if (prod) this.openProductModal(prod);
      }

      const quickAddBtn = e.target.closest('[data-store-quickadd]');
      if (quickAddBtn) {
        const prodId = quickAddBtn.getAttribute('data-store-quickadd');
        const prod = PRODUCTS_CATALOG.find(p => p.id === prodId);
        if (prod && prod.variants.length > 0) {
          this.addToCart(prod, prod.variants[0], 1);
        }
      }
    });

    // Auto-sync with host site language events
    window.addEventListener('i18n:changed', (e) => {
      if (e.detail && e.detail.lang) {
        this.setLanguage(e.detail.lang, e.detail.isRtl ? 'rtl' : 'ltr');
      }
    });
  }

  toggleCartDrawer(open) {
    const drawer = this.container.querySelector('#t1m-cart-drawer');
    const backdrop = this.container.querySelector('#t1m-drawer-backdrop');
    if (drawer && backdrop) {
      if (open) {
        drawer.classList.add('active');
        backdrop.classList.add('active');
        this.renderCartDrawer();
      } else {
        drawer.classList.remove('active');
        backdrop.classList.remove('active');
      }
    }
  }

  toggleProductModal(open) {
    const modal = this.container.querySelector('#t1m-product-modal');
    if (modal) modal.classList.toggle('active', !!open);
  }

  toggleCheckoutModal(open) {
    const modal = this.container.querySelector('#t1m-checkout-modal');
    if (modal) {
      modal.classList.toggle('active', !!open);
      if (open) {
        this.checkoutStep = 1;
        this.renderCheckout();
      }
    }
  }

  addToCart(product, variant, quantity = 1) {
    const existingIndex = this.cartItems.findIndex(i => i.productId === product.id && i.variantId === variant.id);
    const title = product.title[this.lang] || product.title.en;

    if (existingIndex > -1) {
      this.cartItems[existingIndex].quantity += quantity;
    } else {
      this.cartItems.push({
        productId: product.id,
        variantId: variant.id,
        title,
        format: variant.format,
        language: variant.language,
        color: variant.color,
        price: variant.price,
        image: product.images[variant.imageIndex || 0],
        maxStock: variant.stock,
        quantity
      });
    }

    this.saveCart();
    this.toggleCartDrawer(true);
  }

  updateCartBadge() {
    const { itemCount, total } = this.getCalculations();
    const badge = this.container.querySelector('#t1m-cart-badge-count');
    const floatBadge = this.container.querySelector('#t1m-floating-badge');
    const floatTotal = this.container.querySelector('#t1m-floating-total');

    if (badge) badge.textContent = itemCount;
    if (floatBadge) floatBadge.textContent = itemCount;
    if (floatTotal) floatTotal.textContent = `$${total.toFixed(2)}`;
  }

  render() {
    this.renderCategories();
    this.renderProducts();
    this.updateCartBadge();
    this.renderCartDrawer();
  }

  renderCategories() {
    const select = this.container.querySelector('#t1m-category-select');

    const categories = [
      { id: 'all', label: this.t('allProducts'), count: PRODUCTS_CATALOG.length },
      { id: 'clinical-kits', label: this.t('catClinical'), count: PRODUCTS_CATALOG.filter(p => p.categories.includes('clinical-kits')).length },
      { id: 'publications', label: this.t('catPublications'), count: PRODUCTS_CATALOG.filter(p => p.categories.includes('publications')).length },
      { id: 'masterclasses', label: this.t('catMasterclasses'), count: PRODUCTS_CATALOG.filter(p => p.categories.includes('masterclasses')).length },
      { id: 'somatic-tools', label: this.t('catSomatic'), count: PRODUCTS_CATALOG.filter(p => p.categories.includes('somatic-tools')).length },
      { id: 'apparel-gear', label: this.t('catApparel'), count: PRODUCTS_CATALOG.filter(p => p.categories.includes('apparel-gear')).length }
    ];

    // Populate Category Dropdown
    if (select) {
      select.innerHTML = categories.map(cat => `
        <option value="${cat.id}" ${this.activeCategory === cat.id ? 'selected' : ''}>
          ${cat.label} (${cat.count})
        </option>
      `).join('');
      select.value = this.activeCategory;
    }

    this.updateActiveFilterUI(categories);
  }

  updateActiveFilterUI(categoriesList) {
    const selectWrap = this.container.querySelector('#t1m-category-select-wrap');
    const select = this.container.querySelector('#t1m-category-select');
    const filterBar = this.container.querySelector('#t1m-active-filter-bar');

    if (select && select.value !== this.activeCategory) {
      select.value = this.activeCategory;
    }

    if (selectWrap) {
      selectWrap.classList.toggle('has-active-filter', this.activeCategory !== 'all');
    }

    if (!filterBar) return;

    if (this.activeCategory === 'all') {
      filterBar.style.display = 'none';
      filterBar.innerHTML = '';
    } else {
      const cats = categoriesList || [
        { id: 'clinical-kits', label: this.t('catClinical') },
        { id: 'publications', label: this.t('catPublications') },
        { id: 'masterclasses', label: this.t('catMasterclasses') },
        { id: 'somatic-tools', label: this.t('catSomatic') },
        { id: 'apparel-gear', label: this.t('catApparel') }
      ];
      const activeCat = cats.find(c => c.id === this.activeCategory);
      const label = activeCat ? activeCat.label : this.activeCategory;
      const count = PRODUCTS_CATALOG.filter(p => p.categories.includes(this.activeCategory)).length;

      filterBar.style.display = 'flex';
      filterBar.innerHTML = `
        <div class="t1m-active-filter-info">
          <span class="material-symbols-outlined" style="font-size:16px; color:var(--t1m-secondary);">filter_alt</span>
          <span>${this.t('activeFilterPrefix')}: <strong>${label}</strong> (${count})</span>
        </div>
        <button type="button" class="t1m-clear-filter-btn" id="t1m-clear-filter-btn" title="${this.t('clearFilter')}">
          <span>${this.t('clearFilter')}</span>
          <span class="material-symbols-outlined" style="font-size:14px;">close</span>
        </button>
      `;
    }
  }

  renderProducts() {
    const grid = this.container.querySelector('#t1m-product-grid');
    if (!grid) return;

    let filtered = PRODUCTS_CATALOG.filter(prod => {
      const matchCat = this.activeCategory === 'all' || prod.categories.includes(this.activeCategory);
      const title = (prod.title[this.lang] || prod.title.en).toLowerCase();
      const subtitle = (prod.subtitle[this.lang] || prod.subtitle.en).toLowerCase();
      const matchSearch = !this.searchQuery || title.includes(this.searchQuery) || subtitle.includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (this.sortCriteria === 'price-asc') filtered.sort((a, b) => a.basePrice - b.basePrice);
    else if (this.sortCriteria === 'price-desc') filtered.sort((a, b) => b.basePrice - a.basePrice);
    else if (this.sortCriteria === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    grid.innerHTML = filtered.map(prod => {
      const title = prod.title[this.lang] || prod.title.en;
      const primaryVariant = prod.variants[0] || {};
      const isLowStock = primaryVariant.stock > 0 && primaryVariant.stock <= 4;
      const isOutOfStock = primaryVariant.stock <= 0;
      const stockDotClass = isOutOfStock ? 'out-of-stock' : (isLowStock ? 'low-stock' : 'in-stock');
      const stockText = isOutOfStock ? this.t('outOfStock') : (isLowStock ? `${this.t('lowStock')} (${primaryVariant.stock})` : this.t('inStock'));

      const catBadges = prod.categories.map(catKey => {
        let label = catKey;
        if (catKey === 'clinical-kits') label = this.t('catClinical');
        else if (catKey === 'publications') label = this.t('catPublications');
        else if (catKey === 'masterclasses') label = this.t('catMasterclasses');
        else if (catKey === 'somatic-tools') label = this.t('catSomatic');
        else if (catKey === 'apparel-gear') label = this.t('catApparel');
        return `<span class="t1m-card-cat-clickable" data-store-filter-cat="${catKey}" title="Filter by ${label}">${label}</span>`;
      }).join(' <span class="t1m-cat-sep">•</span> ');

      return `
        <article class="t1m-product-card">
          <div class="t1m-card-media" data-store-view="${prod.id}">
            <div class="t1m-badge-stack">
              ${prod.bestseller ? `<span class="t1m-badge t1m-badge-bestseller">Bestseller</span>` : ''}
              ${prod.isNew ? `<span class="t1m-badge t1m-badge-new">New</span>` : ''}
              ${prod.originalPrice ? `<span class="t1m-badge t1m-badge-sale">-${Math.round((1 - prod.basePrice / prod.originalPrice) * 100)}%</span>` : ''}
            </div>

            <img src="${prod.images[0]}" alt="${title}" class="t1m-card-img" loading="lazy">
            ${prod.images[1] ? `<img src="${prod.images[1]}" alt="${title}" class="t1m-card-img-hover" loading="lazy">` : ''}

            <div class="t1m-card-hover-actions">
              <button class="t1m-btn-quick-view" data-store-view="${prod.id}">
                <span class="material-symbols-outlined" style="font-size:15px;">visibility</span>
                <span>${this.t('quickView')}</span>
              </button>
            </div>
          </div>

          <div class="t1m-card-body">
            <span class="t1m-card-cat-label">${catBadges}</span>
            <h3 class="t1m-card-title" data-store-view="${prod.id}">${title}</h3>

            <div class="t1m-card-rating">
              <span class="t1m-stars">★★★★★</span>
              <span>${prod.rating} (${prod.reviewsCount})</span>
            </div>

            <div class="t1m-card-pricing-row">
              <div>
                <div class="t1m-price-box">
                  <span class="t1m-price-current">$${prod.basePrice.toFixed(2)}</span>
                  ${prod.originalPrice ? `<span class="t1m-price-original">$${prod.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="t1m-stock-status">
                  <span class="t1m-stock-dot ${stockDotClass}"></span>
                  <span>${stockText}</span>
                </div>
              </div>

              <button class="t1m-btn-quick-add" data-store-quickadd="${prod.id}" title="${this.t('quickAdd')}" ${isOutOfStock ? 'disabled' : ''}>
                <span class="material-symbols-outlined" style="font-size:18px;">add_shopping_cart</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  openProductModal(product) {
    this.activeModalProduct = product;
    this.activeModalVariant = product.variants[0];
    this.activeModalQty = 1;
    this.activeGalleryImgIndex = this.activeModalVariant.imageIndex || 0;

    this.renderModalContent();
    this.toggleProductModal(true);
  }

  renderModalContent() {
    const modalBody = this.container.querySelector('#t1m-modal-body');
    const prod = this.activeModalProduct;
    const variant = this.activeModalVariant;
    if (!modalBody || !prod || !variant) return;

    const title = prod.title[this.lang] || prod.title.en;
    const shortDesc = prod.shortDesc[this.lang] || prod.shortDesc.en;

    modalBody.innerHTML = `
      <div class="t1m-modal-grid">
        <div>
          <div class="t1m-gallery-main">
            <img src="${prod.images[this.activeGalleryImgIndex] || prod.images[0]}" alt="${title}">
          </div>
          <div class="t1m-gallery-thumbs">
            ${prod.images.map((img, idx) => `
              <div class="t1m-gallery-thumb ${idx === this.activeGalleryImgIndex ? 'active' : ''}" data-thumb="${idx}">
                <img src="${img}" alt="Thumb ${idx}">
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--t1m-secondary); font-weight:700;">
            ${prod.categories.join(' • ')}
          </span>
          <h2 class="t1m-modal-title">${title}</h2>

          <div class="t1m-card-rating" style="margin-bottom:0.75rem;">
            <span class="t1m-stars">★★★★★</span>
            <span>${prod.rating} / 5.0 (${prod.reviewsCount} reviews)</span>
          </div>

          <div style="display:flex; align-items:baseline; gap:0.75rem; margin-bottom:1rem; padding:0.5rem 0; border-top:1px solid var(--t1m-border); border-bottom:1px solid var(--t1m-border);">
            <span style="font-size:1.6rem; font-weight:700; color:var(--t1m-on-surface);">$${variant.price.toFixed(2)}</span>
            ${variant.originalPrice ? `<span style="font-size:1rem; text-decoration:line-through; color:var(--t1m-outline);">$${variant.originalPrice.toFixed(2)}</span>` : ''}
          </div>

          <p style="font-size:0.875rem; color:var(--t1m-on-surface-variant); line-height:1.6; margin-bottom:1.25rem;">
            ${shortDesc}
          </p>

          <!-- Variants -->
          <div style="margin-bottom:1.25rem;">
            <div style="font-size:0.8rem; font-weight:600; margin-bottom:0.4rem; color:var(--t1m-on-surface);">
              ${this.t('format')}: <span style="color:var(--t1m-secondary);">${variant.format}</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
              ${prod.variants.map(v => `
                <button class="t1m-variant-chip ${v.id === variant.id ? 'active' : ''}" data-v="${v.id}">
                  ${v.format} (${v.language})
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity & CTAs -->
          <div style="display:flex; gap:0.75rem; margin-top:1.5rem;">
            <div class="t1m-stepper">
              <button class="t1m-stepper-btn" id="t1m-qty-dec">−</button>
              <span style="min-width:32px; text-align:center; font-weight:700; font-size:0.85rem;" id="t1m-qty-val">${this.activeModalQty}</span>
              <button class="t1m-stepper-btn" id="t1m-qty-inc">+</button>
            </div>

            <button class="t1m-btn-add" id="t1m-modal-add-btn">
              <span class="material-symbols-outlined" style="font-size:18px;">add_shopping_cart</span>
              <span>${this.t('addToCart')}</span>
            </button>

            <button class="t1m-btn-buy" id="t1m-modal-buy-btn">
              ${this.t('buyNow')}
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind Gallery Thumbs
    modalBody.querySelectorAll('[data-thumb]').forEach(el => {
      el.addEventListener('click', () => {
        this.activeGalleryImgIndex = parseInt(el.getAttribute('data-thumb'), 10);
        this.renderModalContent();
      });
    });

    // Bind Variants
    modalBody.querySelectorAll('[data-v]').forEach(el => {
      el.addEventListener('click', () => {
        const vId = el.getAttribute('data-v');
        const v = prod.variants.find(item => item.id === vId);
        if (v) {
          this.activeModalVariant = v;
          this.activeGalleryImgIndex = v.imageIndex || 0;
          this.renderModalContent();
        }
      });
    });

    // Quantity Stepper
    modalBody.querySelector('#t1m-qty-dec')?.addEventListener('click', () => {
      if (this.activeModalQty > 1) {
        this.activeModalQty--;
        modalBody.querySelector('#t1m-qty-val').textContent = this.activeModalQty;
      }
    });

    modalBody.querySelector('#t1m-qty-inc')?.addEventListener('click', () => {
      if (this.activeModalQty < variant.stock) {
        this.activeModalQty++;
        modalBody.querySelector('#t1m-qty-val').textContent = this.activeModalQty;
      }
    });

    // Add to Cart
    modalBody.querySelector('#t1m-modal-add-btn')?.addEventListener('click', () => {
      this.addToCart(prod, variant, this.activeModalQty);
      this.toggleProductModal(false);
    });

    // Buy Now
    modalBody.querySelector('#t1m-modal-buy-btn')?.addEventListener('click', () => {
      this.addToCart(prod, variant, this.activeModalQty);
      this.toggleProductModal(false);
      this.toggleCartDrawer(false);
      this.toggleCheckoutModal(true);
    });
  }

  renderCartDrawer() {
    const itemsContainer = this.container.querySelector('#t1m-drawer-items');
    const footerContainer = this.container.querySelector('#t1m-drawer-footer');
    const meter = this.container.querySelector('#t1m-free-shipping-meter');
    if (!itemsContainer || !footerContainer) return;

    const { subtotal, discountAmount, shippingCost, estimatedTax, total } = this.getCalculations();

    if (meter) {
      const progress = Math.min(100, (subtotal / 150) * 100);
      const remaining = Math.max(0, 150 - subtotal);
      meter.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-weight:600;">
          <span>${remaining > 0 ? this.t('freeShippingGoal').replace('{amount}', `$${remaining.toFixed(2)}`) : this.t('freeShippingUnlocked')}</span>
          <span style="color:var(--t1m-stock-in);">${progress.toFixed(0)}%</span>
        </div>
        <div class="t1m-meter-track">
          <div class="t1m-meter-fill" style="width:${progress}%;"></div>
        </div>
      `;
    }

    if (this.cartItems.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--t1m-on-surface-variant);">
          <span class="material-symbols-outlined" style="font-size: 3rem; opacity: 0.3; margin-bottom: 0.5rem;">shopping_bag</span>
          <p style="font-size: 0.95rem;">${this.t('cartEmpty')}</p>
        </div>
      `;
      footerContainer.innerHTML = '';
      return;
    }

    itemsContainer.innerHTML = this.cartItems.map((item, idx) => `
      <div class="t1m-cart-item">
        <img src="${item.image}" alt="${item.title}" class="t1m-cart-item-img">
        <div style="flex:1; min-width:0;">
          <h4 style="font-family:var(--t1m-font-serif); font-size:0.875rem; margin:0 0 0.2rem 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${item.title}
          </h4>
          <div style="font-size:0.75rem; color:var(--t1m-secondary); margin-bottom:0.35rem;">
            ${item.format} • ${item.language || item.color}
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="t1m-stepper">
              <button class="t1m-stepper-btn" data-c-act="dec" data-c-idx="${idx}">−</button>
              <span style="min-width:24px; text-align:center; font-size:0.8rem; font-weight:700;">${item.quantity}</span>
              <button class="t1m-stepper-btn" data-c-act="inc" data-c-idx="${idx}">+</button>
            </div>
            <span style="font-weight:700; font-size:0.9rem;">$${(item.price * item.quantity).toFixed(2)}</span>
            <button style="background:none; border:none; color:var(--t1m-outline); cursor:pointer;" data-c-act="del" data-c-idx="${idx}">
              <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    footerContainer.innerHTML = `
      <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
        <input type="text" class="t1m-input" id="t1m-cart-promo" placeholder="${this.t('promoPlaceholder')}" value="${this.appliedPromo ? this.appliedPromo.code : ''}" style="text-transform:uppercase;">
        <button class="t1m-cart-btn" id="t1m-cart-promo-apply" style="padding:0.45rem 0.9rem; font-size:0.8rem;">${this.t('applyPromo')}</button>
      </div>

      <div style="display:flex; justify-content:space-between; font-size:0.825rem; margin-bottom:0.3rem;">
        <span>${this.t('subtotal')}</span>
        <span style="font-weight:600;">$${subtotal.toFixed(2)}</span>
      </div>
      ${discountAmount > 0 ? `
        <div style="display:flex; justify-content:space-between; font-size:0.825rem; margin-bottom:0.3rem; color:var(--t1m-stock-in);">
          <span>${this.t('discount')} (${this.appliedPromo.code})</span>
          <span>-$${discountAmount.toFixed(2)}</span>
        </div>
      ` : ''}
      <div style="display:flex; justify-content:space-between; font-size:0.825rem; margin-bottom:0.3rem;">
        <span>${this.t('shipping')}</span>
        <span>${shippingCost === 0 ? `<span style="color:var(--t1m-stock-in); font-weight:700;">${this.t('freeShipping')}</span>` : `$${shippingCost.toFixed(2)}`}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.825rem; margin-bottom:0.6rem;">
        <span>${this.t('tax')}</span>
        <span>$${estimatedTax.toFixed(2)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:1.15rem; font-weight:700; border-top:1px solid var(--t1m-border); padding-top:0.6rem;">
        <span>${this.t('total')}</span>
        <span style="color:var(--t1m-secondary);">$${total.toFixed(2)}</span>
      </div>

      <button class="t1m-btn-checkout" id="t1m-checkout-start-btn">
        <span>${this.t('checkout')}</span>
        <span class="material-symbols-outlined t1m-dir-flip" style="font-size:18px;">arrow_forward</span>
      </button>
    `;

    // Item Actions
    itemsContainer.querySelectorAll('[data-c-act]').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.getAttribute('data-c-act');
        const idx = parseInt(btn.getAttribute('data-c-idx'), 10);
        if (act === 'inc') this.cartItems[idx].quantity++;
        else if (act === 'dec') {
          if (this.cartItems[idx].quantity > 1) this.cartItems[idx].quantity--;
          else this.cartItems.splice(idx, 1);
        } else if (act === 'del') this.cartItems.splice(idx, 1);
        this.saveCart();
      });
    });

    // Promo
    footerContainer.querySelector('#t1m-cart-promo-apply')?.addEventListener('click', () => {
      const code = footerContainer.querySelector('#t1m-cart-promo').value.trim().toUpperCase();
      if (PROMO_COUPONS[code]) {
        this.appliedPromo = PROMO_COUPONS[code];
      } else if (code) {
        alert(`Coupon ${code} invalid. Try WELCOME20.`);
        this.appliedPromo = null;
      } else {
        this.appliedPromo = null;
      }
      this.renderCartDrawer();
    });

    // Trigger Checkout
    footerContainer.querySelector('#t1m-checkout-start-btn')?.addEventListener('click', () => {
      this.toggleCartDrawer(false);
      this.toggleCheckoutModal(true);
    });
  }

  renderCheckout() {
    const body = this.container.querySelector('#t1m-checkout-body');
    if (!body) return;

    if (this.checkoutStep === 4 && this.lastOrderData) {
      body.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem;">
          <span class="material-symbols-outlined" style="font-size:3rem; color:var(--t1m-stock-in); margin-bottom:0.75rem;">verified</span>
          <h2 style="font-family:var(--t1m-font-serif); margin:0 0 0.5rem 0;">${this.t('orderSuccessTitle')}</h2>
          <div style="display:inline-block; background:var(--t1m-surface-container); padding:0.35rem 0.85rem; border-radius:var(--t1m-radius-full); font-family:monospace; margin-bottom:1rem; font-weight:700; color:var(--t1m-secondary);">
            ${this.t('orderId')}: ${this.lastOrderData.orderId}
          </div>
          <p style="font-size:0.9rem; color:var(--t1m-on-surface-variant); max-width:480px; margin:0 auto 1.5rem;">
            ${this.t('orderSuccessDesc')}
          </p>
          <button class="t1m-cart-btn" id="t1m-checkout-done-btn" style="margin:0 auto;">
            ${this.t('continueShopping')}
          </button>
        </div>
      `;
      body.querySelector('#t1m-checkout-done-btn')?.addEventListener('click', () => {
        this.toggleCheckoutModal(false);
      });
      return;
    }

    const { total } = this.getCalculations();

    body.innerHTML = `
      <h3 style="font-family:var(--t1m-font-serif); font-size:1.35rem; margin:0 0 1.25rem 0;">${this.t('checkoutTitle')}</h3>

      <div class="t1m-checkout-stepper">
        <div class="t1m-step-badge ${this.checkoutStep === 1 ? 'active' : (this.checkoutStep > 1 ? 'completed' : '')}">
          <span class="t1m-step-num">1</span>
          <span>${this.t('stepContact')}</span>
        </div>
        <div class="t1m-step-badge ${this.checkoutStep === 2 ? 'active' : (this.checkoutStep > 2 ? 'completed' : '')}">
          <span class="t1m-step-num">2</span>
          <span>${this.t('stepShipping')}</span>
        </div>
        <div class="t1m-step-badge ${this.checkoutStep === 3 ? 'active' : ''}">
          <span class="t1m-step-num">3</span>
          <span>${this.t('stepPayment')}</span>
        </div>
      </div>

      <form id="t1m-checkout-flow-form">
        ${this.checkoutStep === 1 ? `
          <div class="t1m-form-grid">
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">${this.t('fullName')} *</label>
              <input type="text" class="t1m-input" required value="Dr. Sarah Jenkins">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">${this.t('email')} *</label>
              <input type="email" class="t1m-input" required value="sarah@somatic-clinic.org">
            </div>
            <div class="t1m-form-full" style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">${this.t('street')} *</label>
              <input type="text" class="t1m-input" required value="742 Evergreen Suite 4">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">${this.t('city')} *</label>
              <input type="text" class="t1m-input" required value="London">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">${this.t('postalCode')} *</label>
              <input type="text" class="t1m-input" required value="EC1A 1BB">
            </div>
          </div>
        ` : ''}

        ${this.checkoutStep === 2 ? `
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <label style="display:flex; align-items:center; justify-content:space-between; padding:0.85rem; border:1px solid var(--t1m-border); border-radius:var(--t1m-radius-sm); cursor:pointer;">
              <div>
                <div style="font-weight:600; font-size:0.875rem;">Insured Global Standard Courier</div>
                <div style="font-size:0.75rem; color:var(--t1m-on-surface-variant);">Tracked transit (3-5 business days)</div>
              </div>
              <span style="font-weight:700; color:var(--t1m-stock-in);">${this.getCalculations().shippingCost === 0 ? 'FREE' : '$12.00'}</span>
            </label>
          </div>
        ` : ''}

        ${this.checkoutStep === 3 ? `
          <div class="t1m-form-grid">
            <div class="t1m-form-full" style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">Card Number</label>
              <input type="text" class="t1m-input" value="4532 •••• •••• 4242">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">Expiry</label>
              <input type="text" class="t1m-input" value="08/28">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.775rem; font-weight:600;">CVC</label>
              <input type="text" class="t1m-input" value="882">
            </div>
          </div>
        ` : ''}

        <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--t1m-border); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.75rem; color:var(--t1m-on-surface-variant);">${this.t('total')}</div>
            <div style="font-size:1.35rem; font-weight:700; color:var(--t1m-secondary);">$${total.toFixed(2)}</div>
          </div>

          <div style="display:flex; gap:0.5rem;">
            ${this.checkoutStep > 1 ? `
              <button type="button" class="t1m-btn-quick-view" id="t1m-checkout-back-btn" style="padding:0.6rem 1rem;">Back</button>
            ` : ''}
            <button type="submit" class="t1m-cart-btn" id="t1m-checkout-submit-btn">
              <span>${this.checkoutStep === 3 ? this.t('completeOrder') : 'Continue →'}</span>
            </button>
          </div>
        </div>
      </form>
    `;

    body.querySelector('#t1m-checkout-back-btn')?.addEventListener('click', () => {
      if (this.checkoutStep > 1) {
        this.checkoutStep--;
        this.renderCheckout();
      }
    });

    body.querySelector('#t1m-checkout-flow-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.checkoutStep < 3) {
        this.checkoutStep++;
        this.renderCheckout();
      } else {
        const btn = body.querySelector('#t1m-checkout-submit-btn');
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = `<span class="material-symbols-outlined" style="animation:spin 1s infinite linear; font-size:16px;">progress_activity</span> ${this.t('processingOrder')}`;
        }
        setTimeout(() => {
          this.lastOrderData = {
            orderId: `T1M-${Math.floor(100000 + Math.random() * 900000)}`,
            items: [...this.cartItems],
            total: this.getCalculations().total
          };
          this.cartItems = [];
          this.appliedPromo = null;
          this.saveCart();
          this.checkoutStep = 4;
          this.renderCheckout();
        }, 1200);
      }
    });
  }
}

// Global API
window.The1MethodStore = {
  instance: null,
  init(options = {}) {
    const defaultSelector = '#t1m-standalone-store';
    const container = options.container || defaultSelector;
    this.instance = new The1MethodStoreComponent({ ...options, container });
    return this.instance;
  },
  setLanguage(lang, dir) {
    if (this.instance) this.instance.setLanguage(lang, dir);
  },
  setTheme(theme) {
    if (this.instance) this.instance.setTheme(theme);
  },
  setDesignTokens(tokens) {
    if (this.instance) this.instance.setDesignTokens(tokens);
  }
};

// Auto-boot if container exists
document.addEventListener('DOMContentLoaded', () => {
  const mount = document.querySelector('#t1m-standalone-store, [data-t1m-store]');
  if (mount && !window.The1MethodStore.instance) {
    window.The1MethodStore.init({ container: mount });
  }
});
