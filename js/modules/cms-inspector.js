/* CMS Inspector Overlay & Live Preview Inspector Tool */
export function initCMSInspector() {
  const toggleBtn = document.getElementById('cms-mode-toggle');
  const toolbar = document.querySelector('.cms-toolbar');
  const cmsModal = document.getElementById('cms-field-modal');

  if (!toggleBtn) return;

  let cmsActive = false;

  toggleBtn.addEventListener('click', () => {
    cmsActive = !cmsActive;
    document.body.classList.toggle('cms-mode-active', cmsActive);
    toolbar?.classList.toggle('active', cmsActive);
    toggleBtn.innerHTML = cmsActive
      ? '<span class="material-symbols-outlined" style="font-size:16px;">visibility_off</span> Exit CMS Inspector'
      : '<span class="material-symbols-outlined" style="font-size:16px;">dashboard_customize</span> Inspect CMS Fields';
  });

  // Handle clicking on any CMS field when inspector mode is active
  document.addEventListener('click', (e) => {
    if (!cmsActive) return;

    const cmsField = e.target.closest('[data-cms-field]');
    if (cmsField) {
      e.preventDefault();
      e.stopPropagation();

      const fieldId = cmsField.getAttribute('data-cms-field');
      const sectionId = cmsField.closest('[data-cms-section]')?.getAttribute('data-cms-section') || 'global';
      const currentVal = cmsField.innerText.trim() || cmsField.getAttribute('src') || '';

      openCMSFieldModal(sectionId, fieldId, currentVal, cmsField);
    }
  });

  function openCMSFieldModal(sectionId, fieldId, currentVal, targetEl) {
    if (!cmsModal) return;

    const titleEl = cmsModal.querySelector('.cms-modal-field-title');
    const inputEl = cmsModal.querySelector('.cms-modal-field-input');
    const saveBtn = cmsModal.querySelector('.cms-modal-save-btn');

    if (titleEl) titleEl.textContent = `${sectionId}.${fieldId}`;
    if (inputEl) inputEl.value = currentVal;

    cmsModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Live update on save click
    const handleSave = () => {
      const newVal = inputEl.value;
      if (targetEl.tagName === 'IMG') {
        targetEl.src = newVal;
      } else {
        targetEl.textContent = newVal;
      }
      cmsModal.classList.remove('active');
      document.body.style.overflow = '';
      saveBtn.removeEventListener('click', handleSave);
    };

    saveBtn.onclick = handleSave;
  }
}
