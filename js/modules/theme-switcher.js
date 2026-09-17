/* ==========================================================================
   THE 1 METHOD STORE — MULTI-BRAND SWITCHER CONTROLLER
   Demonstrates how one modular system serves both The 1 Method & Vanguard Labs
   ========================================================================== */

const BRAND_STORAGE_KEY = 'the1method_active_brand';

export const BRANDS = {
  'the1method': {
    id: 'the1method',
    name: 'The 1 Method',
    tagline: 'Academy of Spiritual Medicine',
    iconLetter: '1',
    buttonText: 'Brand: The 1 Method (Navy & Cobalt)'
  },
  'vanguard': {
    id: 'vanguard',
    name: 'Somatic Vanguard',
    tagline: 'Clinical Laboratories & Diagnostics',
    iconLetter: 'V',
    buttonText: 'Brand: Somatic Vanguard (Emerald & Obsidian)'
  }
};

export function initThemeSwitcher() {
  const currentBrand = localStorage.getItem(BRAND_STORAGE_KEY) || 'the1method';
  applyBrand(currentBrand);

  const toggleBtns = document.querySelectorAll('.brand-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const active = localStorage.getItem(BRAND_STORAGE_KEY) || 'the1method';
      const nextBrand = active === 'the1method' ? 'vanguard' : 'the1method';
      localStorage.setItem(BRAND_STORAGE_KEY, nextBrand);
      applyBrand(nextBrand);
    });
  });
}

export function applyBrand(brandId) {
  const brandConfig = BRANDS[brandId] || BRANDS.the1method;
  document.body.setAttribute('data-brand', brandId);

  // Update brand text in headers
  document.querySelectorAll('.store-brand-title').forEach(el => {
    el.textContent = brandConfig.name;
  });

  document.querySelectorAll('.store-brand-tagline').forEach(el => {
    el.textContent = brandConfig.tagline;
  });

  document.querySelectorAll('.store-brand-logo-icon').forEach(el => {
    el.textContent = brandConfig.iconLetter;
  });

  document.querySelectorAll('.brand-toggle-btn').forEach(btn => {
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:14px;">palette</span> ${brandConfig.name}`;
  });

  window.dispatchEvent(new CustomEvent('brand:changed', { detail: { brand: brandId, config: brandConfig } }));
}
