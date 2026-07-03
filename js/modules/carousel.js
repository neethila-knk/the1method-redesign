/* Touch & Drag Horizontal Scroll Carousel Module */
export function initCarousel() {
  // Lecture Library Carousel Track
  const lectureTrack = document.querySelector('.carousel-track');
  if (lectureTrack) {
    setupCarousel(lectureTrack, '[data-carousel-prev]', '[data-carousel-next]');
  }

  // Testimonials Carousel Track
  const testimonialTrack = document.querySelector('.testimonials-carousel-track');
  if (testimonialTrack) {
    setupCarousel(testimonialTrack, '[data-testimonials-prev]', '[data-testimonials-next]');
  }
}

function setupCarousel(track, prevSelector, nextSelector) {
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Navigation buttons
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);

  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -450, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: 450, behavior: 'smooth' });
  });
}
