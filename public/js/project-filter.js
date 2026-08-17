const filterContainer = document.querySelector('[data-filters]');
const cards = [...document.querySelectorAll('[data-project-card]')];
const emptyMessage = document.querySelector('[data-filter-empty]');
const statusMessage = document.querySelector('[data-filter-status]');

if (filterContainer && cards.length) {
  filterContainer.classList.add('is-enhanced');

  filterContainer.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-filter]');
    if (!selected) return;

    const filter = selected.dataset.filter;
    let visibleCount = 0;

    filterContainer.querySelectorAll('[data-filter]').forEach((button) => {
      const isActive = button === selected;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach((card) => {
      const isVisible = filter === 'all' || card.dataset.type.includes(filter);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    if (statusMessage) {
      const label = selected.textContent.trim();
      statusMessage.textContent = filter === 'all'
        ? `Showing all ${visibleCount} projects.`
        : `Showing ${visibleCount} ${label.toLowerCase()} ${visibleCount === 1 ? 'project' : 'projects'}.`;
    }
  });
}
