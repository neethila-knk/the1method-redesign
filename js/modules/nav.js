/* Navigation & Mobile Drawer Module with Active Link Controller */
export function initNav() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-close, .mobile-drawer .nav-link').forEach(el => {
    el.addEventListener('click', closeDrawer);
  });

  // Active Link Controller
  initActiveNav();
}

function initActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const rawPage = currentPath.split('/').pop().split('?')[0].split('#')[0];
  const pageName = rawPage || 'index.html';

  const isStorePage = pageName.includes('store') ||
                      pageName.includes('catalog') ||
                      pageName.includes('product') ||
                      pageName.includes('cart') ||
                      pageName.includes('checkout') ||
                      pageName.includes('confirmation');

  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-drawer .nav-link');

  function highlightSection(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === `#${id}` || href.endsWith(`#${id}`)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (isStorePage) {
    // Desktop navbar: highlight Store link across all store pages
    navLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (link.closest('.nav-menu')) {
        if (href.includes('store.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else {
        // Mobile drawer: specific page highlight
        if (
          (pageName.includes('catalog') && href.includes('catalog.html')) ||
          (pageName.includes('cart') && href.includes('cart.html')) ||
          (pageName.includes('store') && href.includes('store.html')) ||
          (pageName.includes('checkout') && href.includes('checkout.html')) ||
          (pageName.includes('confirmation') && href.includes('store.html'))
        ) {
          link.classList.add('active');
        } else if (pageName.includes('product') && href.includes('catalog.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
    return;
  }

  // On index.html
  const sectionIds = ['methodology', 'academy', 'healing', 'community', 'journal'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function handleScroll() {
    if (sections.length === 0) return;
    const scrollPosition = window.scrollY + 120; // offset for fixed navbar

    // If near the bottom of the page, activate the last section
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50)) {
      highlightSection(sections[sections.length - 1].id);
      return;
    }

    let currentSectionId = null;
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = sec.id;
        break;
      } else if (scrollPosition >= top) {
        currentSectionId = sec.id;
      }
    }

    if (currentSectionId) {
      highlightSection(currentSectionId);
    } else if (window.scrollY < 200) {
      // In top hero banner
      navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#') || href.includes('#')) {
          link.classList.remove('active');
        }
      });
    }
  }

  // Instant response on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.includes('#')) {
        const id = href.split('#')[1];
        if (id) {
          highlightSection(id);
        }
      }
    });
  });

  // Check on load
  if (window.location.hash) {
    const hashId = window.location.hash.replace('#', '');
    if (sectionIds.includes(hashId)) {
      highlightSection(hashId);
    } else {
      handleScroll();
    }
  } else {
    handleScroll();
  }

  // Scroll event with requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

