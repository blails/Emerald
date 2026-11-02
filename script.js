(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const search = document.querySelector('#command-search');
  const grid = document.querySelector('#command-grid');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  const filters = [...document.querySelectorAll('.filter-button')];
  const commands = grid ? [...grid.querySelectorAll('.command-item')] : [];
  let activeFilter = 'all';

  function updateCommands() {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    commands.forEach((card) => {
      const category = card.dataset.category || '';
      const searchable = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
      const categoryMatch = activeFilter === 'all' || category === activeFilter;
      const queryMatch = !query || searchable.includes(query);
      const show = categoryMatch && queryMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `Showing ${visible} of ${commands.length} commands`;
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filters.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updateCommands();
    });
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  });
  search?.addEventListener('input', updateCommands);

  // The shortcut focuses the command search without interfering with typing.
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      if (!search) return;
      event.preventDefault();
      search.focus();
      search.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    if (event.key === 'Escape' && document.activeElement === search) search.blur();
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  updateCommands();
})();
