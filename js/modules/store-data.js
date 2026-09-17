/* ==========================================================================
   THE 1 METHOD STORE — CATALOG DATA REPOSITORY
   Multi-category products, multi-attribute variants, inventory tracking
   ========================================================================== */

export const STORE_CATEGORIES = [
  { id: 'clinical-kits', name: 'Clinical Kits & Apparatus', icon: 'medical_services', count: 4 },
  { id: 'publications', name: 'Books & Clinical Guides', icon: 'menu_book', count: 4 },
  { id: 'masterclasses', name: 'Masterclass & Passports', icon: 'school', count: 3 },
  { id: 'somatic-tools', name: 'Somatic & Spinal Tools', icon: 'accessibility_new', count: 4 },
  { id: 'apparel-gear', name: 'Practitioner Apparel & Gear', icon: 'apparel', count: 3 }
];

export const PRODUCTS_DATABASE = [
  {
    id: 'prod-01',
    sku: 'TM-KIT-01',
    title: 'The 1 Method Complete Clinical Diagnostics Kit',
    subtitle: 'Professional somatic assessment tools, tuning frequencies, and anatomical calipers',
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
      {
        id: 'v-01-clin',
        format: 'Clinical Master Set',
        language: 'English',
        color: 'Navy & Brass',
        colorHex: '#0b1c30',
        price: 285.00,
        originalPrice: 340.00,
        stock: 8,
        stockStatus: 'in-stock',
        sku: 'TM-KIT-01-ENG',
        imageIndex: 0
      },
      {
        id: 'v-01-deluxe',
        format: 'Practitioner Deluxe Case',
        language: 'English',
        color: 'Obsidian Slate',
        colorHex: '#1e293b',
        price: 360.00,
        originalPrice: 420.00,
        stock: 2,
        stockStatus: 'low-stock',
        sku: 'TM-KIT-01-DLX',
        imageIndex: 1
      },
      {
        id: 'v-01-heb',
        format: 'Clinical Master Set',
        language: 'Hebrew (עברית)',
        color: 'Navy & Brass',
        colorHex: '#0b1c30',
        price: 285.00,
        originalPrice: 340.00,
        stock: 5,
        stockStatus: 'in-stock',
        sku: 'TM-KIT-01-HEB',
        imageIndex: 2
      },
      {
        id: 'v-01-ltd',
        format: 'Founder Signature Edition',
        language: 'Multilingual',
        color: 'Celestial Gold',
        colorHex: '#d4af37',
        price: 495.00,
        originalPrice: 550.00,
        stock: 0,
        stockStatus: 'out-of-stock',
        sku: 'TM-KIT-01-LTD',
        imageIndex: 3
      }
    ],
    shortDesc: 'Engineered specifically for certified practitioners of The 1 Method. Includes high-frequency somatic mapping calibers, weighted diagnostic tuning forks, and patient assessment journals.',
    fullDesc: 'The 1 Method Complete Clinical Diagnostics Kit bridges clinical orthopedic assessment with subtle vibrational diagnostics. Developed by Osie Steinberg over twenty-five years of patient rehabilitation, each precision instrument is calibrated to assist in detecting fascial restrictions, trauma entrapment, and spinal bio-energetic misalignments.',
    specs: [
      { label: 'Components', value: '4 Harmonic Diagnostic Forks (128Hz, 256Hz, 512Hz, 432Hz), Somatic Caliper, Leather Journal' },
      { label: 'Materials', value: 'Aerospace-Grade Anodized Aluminum, Surgical Steel, Top-Grain Leather' },
      { label: 'Accreditation', value: 'Approved for CEU Practical Demonstration across 42 countries' },
      { label: 'Warranty', value: 'Lifetime Guarantee on Frequency Calibration' }
    ]
  },
  {
    id: 'prod-02',
    sku: 'TM-BK-01',
    title: 'Spiritual Medicine & Clinical Rehabilitation: The Definitive Volume',
    subtitle: 'Hardcover Monograph by Osie Steinberg with clinical case studies & anatomical plates',
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
      'assets/images/article-somatic-resonance.jpg'
    ],
    variants: [
      {
        id: 'v-02-hard',
        format: 'Clinical Hardcover + Plates',
        language: 'English',
        color: 'Deep Navy Cloth',
        colorHex: '#0b1c30',
        price: 68.00,
        originalPrice: 85.00,
        stock: 14,
        stockStatus: 'in-stock',
        sku: 'TM-BK-01-HC',
        imageIndex: 0
      },
      {
        id: 'v-02-heb',
        format: 'Clinical Hardcover + Plates',
        language: 'Hebrew (עברית)',
        color: 'Deep Navy Cloth',
        colorHex: '#0b1c30',
        price: 68.00,
        originalPrice: 85.00,
        stock: 3,
        stockStatus: 'low-stock',
        sku: 'TM-BK-01-HC-HEB',
        imageIndex: 1
      },
      {
        id: 'v-02-leather',
        format: 'Leatherbound Collector Box',
        language: 'English',
        color: 'Burgundy Leather',
        colorHex: '#581c1c',
        price: 150.00,
        originalPrice: 175.00,
        stock: 1,
        stockStatus: 'low-stock',
        sku: 'TM-BK-01-LTH',
        imageIndex: 2
      },
      {
        id: 'v-02-dig',
        format: 'Digital Interactive E-Book',
        language: 'Multilingual',
        color: 'Digital Edition',
        colorHex: '#3b82f6',
        price: 39.00,
        originalPrice: 49.00,
        stock: 999,
        stockStatus: 'in-stock',
        sku: 'TM-BK-01-DIG',
        imageIndex: 0
      }
    ],
    shortDesc: 'The seminal textbook codifying Osie Steinberg’s revolutionary framework connecting structural physiotherapy, neurological patterning, and vibrational medicine.',
    fullDesc: 'Over 540 pages with full-color anatomical illustrations, radiographic correlation plates, and step-by-step clinical protocols. Essential reading for physicians, osteopaths, physical therapists, and bio-field researchers.',
    specs: [
      { label: 'Pages', value: '544 Pages with 86 Full-Color Anatomical Diagrams' },
      { label: 'Publisher', value: 'Academy of Spiritual Medicine Press' },
      { label: 'ISBN', value: '978-0-982145-12-8' },
      { label: 'Binding', value: 'Foil-Stamped Linen Hardcover with Ribbon Bookmark' }
    ]
  },
  {
    id: 'prod-03',
    sku: 'TM-SPN-01',
    title: 'Bio-Somatic Spinal Alignment Wedge & Decompression Roll',
    subtitle: 'Ergonomic therapeutic support for restorative vertebral decompression and fascia release',
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
      'assets/images/transformation-path.jpg'
    ],
    variants: [
      {
        id: 'v-03-std',
        format: 'Standard Density (General Clinic)',
        language: 'Universal',
        color: 'Midnight Blue',
        colorHex: '#1e3a8a',
        price: 110.00,
        originalPrice: 135.00,
        stock: 19,
        stockStatus: 'in-stock',
        sku: 'TM-SPN-01-STD',
        imageIndex: 0
      },
      {
        id: 'v-03-frm',
        format: 'Firm Density (Deep Structural)',
        language: 'Universal',
        color: 'Carbon Slate',
        colorHex: '#334155',
        price: 125.00,
        originalPrice: 150.00,
        stock: 3,
        stockStatus: 'low-stock',
        sku: 'TM-SPN-01-FRM',
        imageIndex: 1
      },
      {
        id: 'v-03-trv',
        format: 'Travel Inflatable Edition',
        language: 'Universal',
        color: 'Pure Bone',
        colorHex: '#f1f5f9',
        price: 85.00,
        originalPrice: 99.00,
        stock: 0,
        stockStatus: 'out-of-stock',
        sku: 'TM-SPN-01-TRV',
        imageIndex: 2
      }
    ],
    shortDesc: 'Designed according to the exact geometric arch specifications utilized in The 1 Method spinal protocols. Helps unburden thoracic load and release somatic tension along the neural axis.',
    fullDesc: 'Crafted with multi-zone high-density bio-foam covered in antimicrobial medical grade fabric. Enables passive traction, facilitating autonomic nervous system regulation and spontaneous tissue unwinding.',
    specs: [
      { label: 'Dimensions', value: '48cm L x 22cm W x 14cm H' },
      { label: 'Weight Limit', value: 'Tested up to 350 lbs (160 kg)' },
      { label: 'Cover', value: 'Water-resistant, wipeable medical polyurethane' },
      { label: 'Origin', value: 'Manufactured in Germany' }
    ]
  },
  {
    id: 'prod-04',
    sku: 'TM-MST-01',
    title: 'Global Masterclass Annual Digital Academic Passport',
    subtitle: '12 Months unrestricted access to 180+ clinical lectures, live monthly symposiums & CEUs',
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
      'assets/images/article-visionary-states.jpg'
    ],
    variants: [
      {
        id: 'v-04-ind',
        format: 'Individual Clinician Pass',
        language: 'Multilingual (Subtitles in EN, ES, HE)',
        color: 'Standard Access',
        colorHex: '#3755c3',
        price: 480.00,
        originalPrice: 600.00,
        stock: 999,
        stockStatus: 'in-stock',
        sku: 'TM-MST-01-IND',
        imageIndex: 0
      },
      {
        id: 'v-04-inst',
        format: 'Clinic Team License (Up to 5 Users)',
        language: 'Multilingual (Subtitles in EN, ES, HE)',
        color: 'Institutional License',
        colorHex: '#0b1c30',
        price: 1450.00,
        originalPrice: 1800.00,
        stock: 50,
        stockStatus: 'in-stock',
        sku: 'TM-MST-01-INST',
        imageIndex: 1
      }
    ],
    shortDesc: 'Immediate digital access to the full video archive of The 1 Method Academy, monthly live case examinations with Osie Steinberg, and downloadable clinical intake matrices.',
    fullDesc: 'Unlock the entire pedagogical vault. Features on-demand high-definition streaming of surgical recoveries, deep tissue somatic integration, and psychiatric hospital integration case files.',
    specs: [
      { label: 'Access Period', value: '1 Full Year from Date of Enrolment' },
      { label: 'CEU Accreditation', value: '36 Continuous Education Hours' },
      { label: 'Platform', value: 'Web, iOS, Android streaming' },
      { label: 'Live Sessions', value: 'Every 2nd Tuesday at 18:00 GMT' }
    ]
  },
  {
    id: 'prod-05',
    sku: 'TM-APP-01',
    title: 'Practitioner Somatic Linen Lab Tunic',
    subtitle: 'Breathable organic European flax tailored for ergonomic mobility during clinical bodywork',
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
      {
        id: 'v-05-s-navy',
        format: 'Size: Small',
        language: 'Universal',
        color: 'Deep Academy Navy',
        colorHex: '#0b1c30',
        price: 135.00,
        originalPrice: 160.00,
        stock: 6,
        stockStatus: 'in-stock',
        sku: 'TM-APP-S-NVY',
        imageIndex: 0
      },
      {
        id: 'v-05-m-navy',
        format: 'Size: Medium',
        language: 'Universal',
        color: 'Deep Academy Navy',
        colorHex: '#0b1c30',
        price: 135.00,
        originalPrice: 160.00,
        stock: 12,
        stockStatus: 'in-stock',
        sku: 'TM-APP-M-NVY',
        imageIndex: 0
      },
      {
        id: 'v-05-l-navy',
        format: 'Size: Large',
        language: 'Universal',
        color: 'Deep Academy Navy',
        colorHex: '#0b1c30',
        price: 135.00,
        originalPrice: 160.00,
        stock: 2,
        stockStatus: 'low-stock',
        sku: 'TM-APP-L-NVY',
        imageIndex: 0
      },
      {
        id: 'v-05-xl-bone',
        format: 'Size: XL',
        language: 'Universal',
        color: 'Raw Natural Flax',
        colorHex: '#e5e7eb',
        price: 135.00,
        originalPrice: 160.00,
        stock: 0,
        stockStatus: 'out-of-stock',
        sku: 'TM-APP-XL-FLX',
        imageIndex: 1
      }
    ],
    shortDesc: 'Designed specifically for practitioners who spend long hours at the treatment couch. Gusseted underarm seams and breathable natural flax guarantee unrestricted freedom of movement.',
    fullDesc: '100% pre-washed Belgian linen. Hypoallergenic, static-free, and thermo-regulating. Features discreet deep pockets for clinical diagnostic tools and reinforced mandarin collar.',
    specs: [
      { label: 'Fabric', value: '100% European Certified Organic Flax (220 GSM)' },
      { label: 'Care', value: 'Machine Wash Cold, Hang Dry' },
      { label: 'Fit', value: 'Tailored Relaxed Kimono Cut' },
      { label: 'Details', value: 'Hand-sewn horn buttons' }
    ]
  },
  {
    id: 'prod-06',
    sku: 'TM-SND-01',
    title: 'Harmonic Somatic Tuning Stethoscope',
    subtitle: 'Acoustic amplifier designed to listen to subtle fascial fluid dynamics and respiratory pulses',
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
      {
        id: 'v-06-std',
        format: 'Standard Dual-Bell Acoustic',
        language: 'Universal',
        color: 'Matte Titanium & Navy',
        colorHex: '#0b1c30',
        price: 195.00,
        originalPrice: 230.00,
        stock: 7,
        stockStatus: 'in-stock',
        sku: 'TM-SND-STD',
        imageIndex: 0
      },
      {
        id: 'v-06-gld',
        format: 'Gold Electroplate Diaphragm',
        language: 'Universal',
        color: 'Champagne Gold',
        colorHex: '#d4af37',
        price: 245.00,
        originalPrice: 280.00,
        stock: 2,
        stockStatus: 'low-stock',
        sku: 'TM-SND-GLD',
        imageIndex: 1
      }
    ],
    shortDesc: 'Provides ultra-sensitive acoustic isolation for tracking visceral peristalsis, craniosacral rhythms, and deep lymphatic fluid transitions.',
    fullDesc: 'Featuring an ultra-thin composite diaphragm tuned to low-frequency biological oscillations typically lost by conventional cardiovascular stethoscopes.',
    specs: [
      { label: 'Chestpiece', value: 'Handcrafted Machined Titanium Alloy' },
      { label: 'Tubing', value: 'Dual-lumen latex-free silicone' },
      { label: 'Sensitivity', value: 'Optimized between 20Hz - 800Hz' }
    ]
  },
  {
    id: 'prod-07',
    sku: 'TM-BK-02',
    title: 'Clinical Protocol Cards: 50 Somatic Trauma Interventions',
    subtitle: 'Flashcards boxed set with clinical decision trees, emergency somatic releases, and safety bounds',
    categories: ['publications', 'clinical-kits'],
    featured: false,
    bestseller: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 189,
    basePrice: 45.00,
    originalPrice: 55.00,
    images: [
      'assets/images/private-healing-book.jpg',
      'assets/images/article-aristotle.jpg'
    ],
    variants: [
      {
        id: 'v-07-eng',
        format: '50-Card Heavyweight Box',
        language: 'English',
        color: 'Ivory & Gold Box',
        colorHex: '#fef3c7',
        price: 45.00,
        originalPrice: 55.00,
        stock: 25,
        stockStatus: 'in-stock',
        sku: 'TM-CRD-ENG',
        imageIndex: 0
      },
      {
        id: 'v-07-heb',
        format: '50-Card Heavyweight Box',
        language: 'Hebrew (עברית)',
        color: 'Ivory & Gold Box',
        colorHex: '#fef3c7',
        price: 45.00,
        originalPrice: 55.00,
        stock: 11,
        stockStatus: 'in-stock',
        sku: 'TM-CRD-HEB',
        imageIndex: 1
      },
      {
        id: 'v-07-es',
        format: '50-Card Heavyweight Box',
        language: 'Spanish (Español)',
        color: 'Ivory & Gold Box',
        colorHex: '#fef3c7',
        price: 45.00,
        originalPrice: 55.00,
        stock: 0,
        stockStatus: 'out-of-stock',
        sku: 'TM-CRD-ES',
        imageIndex: 0
      }
    ],
    shortDesc: 'Pocket-sized clinical guides designed for instant chairside reference during complex patient treatments.',
    fullDesc: 'Laminated, tear-proof matte cards. Each card details an anatomical diagram, step-by-step hand placements, expected vegetative nervous feedback, and patient re-grounding procedures.',
    specs: [
      { label: 'Card Count', value: '50 Large Cards (12cm x 8cm)' },
      { label: 'Paper', value: '450gsm Waterproof Synthetic Paper' },
      { label: 'Packaging', value: 'Rigid Magnetic Clasp Presentation Box' }
    ]
  },
  {
    id: 'prod-08',
    sku: 'TM-MST-02',
    title: 'The Athens Intensive: 3-Day Somatic Spinal Residency Pass',
    subtitle: 'Exclusive in-person clinical certification intensive with Osie Steinberg in Athens, Greece',
    categories: ['masterclasses'],
    featured: true,
    bestseller: false,
    isNew: true,
    rating: 5.0,
    reviewsCount: 52,
    basePrice: 1850.00,
    originalPrice: 2200.00,
    images: [
      'assets/images/transformation-path.jpg',
      'assets/images/lecture-retreat.jpg',
      'assets/images/founder-osie.jpg'
    ],
    variants: [
      {
        id: 'v-08-std',
        format: 'Residency Tuition Only',
        language: 'English with Live Translation',
        color: 'Clinical Pass',
        colorHex: '#0b1c30',
        price: 1850.00,
        originalPrice: 2200.00,
        stock: 4,
        stockStatus: 'low-stock',
        sku: 'TM-ATH-TUT',
        imageIndex: 0
      },
      {
        id: 'v-08-vip',
        format: 'Residency Tuition + 5-Star Seaside Lodging',
        language: 'English with Live Translation',
        color: 'All-Inclusive Pass',
        colorHex: '#d4af37',
        price: 2950.00,
        originalPrice: 3400.00,
        stock: 1,
        stockStatus: 'low-stock',
        sku: 'TM-ATH-VIP',
        imageIndex: 1
      }
    ],
    shortDesc: 'Direct, hands-on clinical mentoring alongside Osie Steinberg. Rigorous examination in spinal trauma de-escalation and energetic realignment.',
    fullDesc: 'Includes full lab materials, official European board certification, catered lunches, and invitation to the private Alumni Vanguard Network.',
    specs: [
      { label: 'Dates', value: 'October 14-16, 2026' },
      { label: 'Location', value: 'The 1 Method Mediterranean Center, Athens' },
      { label: 'Prerequisites', value: 'Licensed Health Practitioner or Academy Core Graduate' }
    ]
  }
];

// Helper methods to query store data
export function getProductById(id) {
  return PRODUCTS_DATABASE.find(p => p.id === id) || null;
}

export function getFeaturedProducts() {
  return PRODUCTS_DATABASE.filter(p => p.featured);
}

export function getBestsellers() {
  return PRODUCTS_DATABASE.filter(p => p.bestseller);
}

export function getNewArrivals() {
  return PRODUCTS_DATABASE.filter(p => p.isNew);
}

export function getRelatedProducts(currentId, limit = 4) {
  const current = getProductById(currentId);
  if (!current) return PRODUCTS_DATABASE.slice(0, limit);

  return PRODUCTS_DATABASE
    .filter(p => p.id !== currentId && p.categories.some(c => current.categories.includes(c)))
    .slice(0, limit);
}
