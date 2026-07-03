/* Interactive Modals & Video Lightbox Module */
export function initModals() {
  const modals = document.querySelectorAll('.modal');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('.modal-close, [data-close-modal]');

  // Open modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        // If opening video modal, update title and YouTube iframe src
        const videoTitle = btn.getAttribute('data-video-title');
        const videoId = btn.getAttribute('data-video-id') || 'qUlAZJArxrw';

        if (videoTitle && targetModal.querySelector('.modal-video-title')) {
          targetModal.querySelector('.modal-video-title').textContent = videoTitle;
        }

        const iframe = targetModal.querySelector('.modal-video-iframe');
        if (iframe && videoId) {
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }

        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear iframe src to stop YouTube video playback
    const iframe = modal.querySelector('.modal-video-iframe');
    if (iframe) {
      iframe.src = '';
    }

    // Pause any playing HTML5 video inside modal
    const video = modal.querySelector('video');
    if (video) video.pause();
  }

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  // Close when clicking overlay
  modals.forEach(modal => {
    const overlay = modal.querySelector('.modal-overlay');
    overlay?.addEventListener('click', () => closeModal(modal));
  });

  // Esc key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) closeModal(modal);
      });
    }
  });

  // Multi-step Application Form Handler inside Modal
  const appForm = document.getElementById('academy-app-form');
  if (appForm) {
    appForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = appForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Application...';

      setTimeout(() => {
        appForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <span class="material-symbols-outlined" style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;">check_circle</span>
            <h3 style="margin-bottom: 0.5rem;">Application Submitted!</h3>
            <p style="color: var(--color-on-surface-variant);">Thank you for applying to The 1 Method Academy. Our admissions faculty will review your credentials and reach out within 48 hours.</p>
          </div>
        `;
      }, 1200);
    });
  }
}
