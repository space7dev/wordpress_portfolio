const horizontalWork = document.querySelector('[data-horizontal-work]');

if (horizontalWork) {
  const viewport = horizontalWork.querySelector('[data-work-viewport]');
  const track = horizontalWork.querySelector('[data-work-track]');
  const slides = [...horizontalWork.querySelectorAll('[data-work-slide]')];
  const mobileLayout = window.matchMedia('(max-width: 820px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let horizontalTravel = 0;
  let updateFrame;

  function usesNativeScrolling() {
    return mobileLayout.matches || reducedMotion.matches;
  }

  function updatePosition() {
    window.cancelAnimationFrame(updateFrame);
    updateFrame = window.requestAnimationFrame(() => {
      if (usesNativeScrolling()) {
        track.style.transform = '';
        return;
      }

      const bounds = horizontalWork.getBoundingClientRect();
      const scrollRange = Math.max(1, horizontalWork.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / scrollRange));
      track.style.transform = `translate3d(${-horizontalTravel * progress}px, 0, 0)`;
    });
  }

  function measureWorkSection() {
    if (usesNativeScrolling()) {
      horizontalTravel = 0;
      horizontalWork.classList.remove('is-scroll-driven');
      horizontalWork.style.removeProperty('--horizontal-travel');
      track.style.transform = '';
      return;
    }

    horizontalTravel = Math.max(0, track.scrollWidth - viewport.clientWidth);
    horizontalWork.style.setProperty('--horizontal-travel', `${horizontalTravel}px`);
    horizontalWork.classList.toggle('is-scroll-driven', horizontalTravel > 0);
    updatePosition();
  }

  function moveByPanel(direction) {
    const distance = slides[0]?.getBoundingClientRect().width || window.innerWidth * 0.8;
    if (usesNativeScrolling()) {
      viewport.scrollBy({ left: distance * direction, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    } else {
      window.scrollBy({ top: distance * direction, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  }

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveByPanel(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveByPanel(1);
    }
  });

  window.addEventListener('scroll', updatePosition, { passive: true });
  window.addEventListener('resize', measureWorkSection, { passive: true });
  mobileLayout.addEventListener?.('change', measureWorkSection);
  reducedMotion.addEventListener?.('change', measureWorkSection);

  if ('ResizeObserver' in window) {
    const workResizeObserver = new ResizeObserver(measureWorkSection);
    workResizeObserver.observe(track);
    workResizeObserver.observe(viewport);
  }

  horizontalWork.classList.add('is-enhanced');
  measureWorkSection();
}
