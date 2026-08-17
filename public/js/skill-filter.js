const skillFilters = document.querySelector('[data-skill-filters]');
const skillCards = [...document.querySelectorAll('[data-skill-card]')];

if (skillFilters && skillCards.length) {
  skillFilters.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-skill-filter]');
    if (!selected) return;
    const category = selected.dataset.skillFilter;

    skillFilters.querySelectorAll('[data-skill-filter]').forEach((button) => {
      const active = button === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    skillCards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
}

