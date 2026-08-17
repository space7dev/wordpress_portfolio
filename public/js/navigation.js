const button = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-navigation]');
const header = document.querySelector('[data-header]');

function closeMenu({ restoreFocus = false } = {}) {
  if (!button || !navigation) return;
  button.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (restoreFocus) button.focus();
}

if (button && navigation && header) {
  header.classList.add('is-enhanced');

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
      return;
    }

    button.setAttribute('aria-expanded', 'true');
    navigation.classList.add('is-open');
    document.body.classList.add('menu-open');
    requestAnimationFrame(() => navigation.querySelector('a')?.focus());
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });

  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}
