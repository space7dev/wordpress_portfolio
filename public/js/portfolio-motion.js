const preloader = document.querySelector('[data-preloader]');
const preloaderBar = document.querySelector('[data-preloader-bar]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (preloader) {
  if (preloaderBar) requestAnimationFrame(() => { preloaderBar.style.width = '100%'; });
  window.setTimeout(() => preloader.classList.add('is-complete'), reducedMotion ? 0 : 850);
}

const revealItems = document.querySelectorAll('.scroll-reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const typingTarget = document.querySelector('[data-typing-text]');
if (typingTarget && !reducedMotion) {
  const phrases = ['crafted differently.', 'built for people.', 'made to perform.'];
  let phraseIndex = 0;
  let letterIndex = phrases[0].length;
  let deleting = true;

  function typeNext() {
    const phrase = phrases[phraseIndex];
    letterIndex += deleting ? -1 : 1;
    typingTarget.textContent = phrase.slice(0, letterIndex);

    if (deleting && letterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    } else if (!deleting && letterIndex === phrases[phraseIndex].length) {
      deleting = true;
      window.setTimeout(typeNext, 1500);
      return;
    }
    window.setTimeout(typeNext, deleting ? 45 : 75);
  }
  window.setTimeout(typeNext, 1900);
}

