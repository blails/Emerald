(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const statusNodes = [document.getElementById('bot-status'), document.getElementById('bot-status-docs')].filter(Boolean);
  const statusDetails = [document.getElementById('status-detail'), document.getElementById('status-detail-docs')].filter(Boolean);
  const statusLabels = {
    operational: 'All systems operational', online: 'All systems operational', ok: 'All systems operational',
    degraded: 'Some features may be affected', maintenance: 'Maintenance in progress',
    outage: 'Service disruption', offline: 'Service disruption', down: 'Service disruption',
    unknown: 'Status not connected'
  };
  async function refreshStatus() {
    try {
      const response = await fetch(`status.json?t=${Date.now()}`, {cache: 'no-store'});
      if (!response.ok) throw new Error('Status file unavailable');
      const data = await response.json();
      const status = String(data.status || 'unknown').toLowerCase();
      const known = Object.prototype.hasOwnProperty.call(statusLabels, status);
      const label = known ? statusLabels[status] : 'Status not connected';
      const detail = String(data.message || (status === 'unknown' ? 'Live monitoring has not been connected yet.' : 'Status feed updated.')).slice(0, 180);
      statusNodes.forEach(node => { node.dataset.status = ['operational','online','ok'].includes(status) ? 'operational' : ['degraded','maintenance'].includes(status) ? status : ['outage','offline','down'].includes(status) ? 'outage' : 'unknown'; const text = node.querySelector('.status-label'); if (text) text.textContent = label; });
      statusDetails.forEach(node => { node.textContent = detail; });
    } catch (error) {
      statusNodes.forEach(node => { node.dataset.status = 'unknown'; const text = node.querySelector('.status-label'); if (text) text.textContent = 'Status feed unavailable'; });
      statusDetails.forEach(node => { node.textContent = 'The public status feed could not be reached.'; });
    }
  }
  if (statusNodes.length) { refreshStatus(); window.setInterval(refreshStatus, 60000); }

  const search = document.getElementById('command-search');
  const category = document.getElementById('command-category');
  const list = document.getElementById('command-list');
  const count = document.getElementById('command-count');
  if (search && category && list && count) {
    let commands = [];
    const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const render = () => {
      const term = search.value.trim().toLowerCase();
      const group = category.value;
      const filtered = commands.filter(command => (group === 'all' || command.category === group) && (!term || `${command.name} ${command.description} ${command.category}`.toLowerCase().includes(term)));
      count.textContent = `${filtered.length} of ${commands.length} commands`;
      if (!filtered.length) { list.innerHTML = '<div class="command-empty">No commands match. Try a different search or category.</div>'; return; }
      list.innerHTML = filtered.map(command => `<article class="command-item"><div class="command-item-top"><code>/${escapeHtml(command.name)}</code><button type="button" data-copy="/${escapeHtml(command.name)}" aria-label="Copy /${escapeHtml(command.name)}">Copy</button></div><p>${escapeHtml(command.description)}</p><span class="command-category">${escapeHtml(command.category)}</span></article>`).join('');
    };
    fetch('commands.json', {cache: 'no-cache'}).then(response => { if (!response.ok) throw new Error('Could not load command list'); return response.json(); }).then(data => {
      commands = Array.isArray(data) ? data : [];
      const categories = [...new Set(commands.map(item => item.category))].sort((a,b) => a.localeCompare(b));
      categories.forEach(item => { const option = document.createElement('option'); option.value = item; option.textContent = item; category.appendChild(option); });
      render();
    }).catch(() => { list.innerHTML = '<div class="command-empty">The command reference could not be loaded. Please refresh the page.</div>'; count.textContent = 'Command list unavailable'; });
    search.addEventListener('input', render);
    category.addEventListener('change', render);
    list.addEventListener('click', async event => {
      const button = event.target.closest('button[data-copy]');
      if (!button) return;
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        const old = button.textContent; button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = old; }, 1200);
      } catch {
        button.textContent = 'Select text';
        window.setTimeout(() => { button.textContent = 'Copy'; }, 1200);
      }
    });
  }
})();
