(() => {
  'use strict';
  const navigation = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu-toggle');
  const header = document.querySelector('.site-header');
  const mobile = window.matchMedia('(max-width: 1100px)');
  let menuOpened = false;
  function toggleMenu(open) {
    menuOpened = open;
    navigation.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
    navigation.inert = mobile.matches && !open;
    if (open) navigation.querySelector('a').focus();
    else if (mobile.matches && document.activeElement && navigation.contains(document.activeElement)) menu.focus();
  }
  if (navigation && menu) {
    navigation.inert = mobile.matches;
    menu.addEventListener('click', () => toggleMenu(!menuOpened));
    document.addEventListener('click', (event) => { if (menuOpened && !header.contains(event.target)) toggleMenu(false); });
    mobile.addEventListener('change', () => { toggleMenu(false); navigation.inert = mobile.matches; });
    navigation.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => toggleMenu(false)));
  }

  const dialog = document.querySelector('.search-dialog');
  const input = document.querySelector('#search-input');
  const results = document.querySelector('.search-results');
  const status = document.querySelector('.search-status');
  const root = new URL(document.body.dataset.root || './', window.location.href);
  let indexPromise;
  let searchSequence = 0;
  let debounce;
  const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const getIndex = () => indexPromise ||= fetch(new URL('search-index.json', root)).then((response) => {
    if (!response.ok) throw new Error('No se pudo cargar el índice');
    return response.json();
  });
  const emptyResults = () => results.replaceChildren();
  function highlighted(text, terms) {
    const fragment = document.createDocumentFragment();
    const normalizedText = normalize(text);
    let offset = 0;
    while (offset < text.length) {
      let position = text.length;
      let matched = '';
      for (const term of terms) {
        const found = normalizedText.indexOf(term, offset);
        if (found >= 0 && found < position) { position = found; matched = term; }
      }
      fragment.append(document.createTextNode(text.slice(offset, position)));
      if (!matched) break;
      const mark = document.createElement('mark');
      mark.textContent = text.slice(position, position + matched.length);
      fragment.append(mark);
      offset = position + matched.length;
    }
    return fragment;
  }
  async function search() {
    const sequence = ++searchSequence;
    const query = input.value.trim();
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    emptyResults();
    if (!terms.length) { status.textContent = 'Busca por tema o palabra.'; return; }
    status.textContent = 'Buscando…';
    try {
      const index = await getIndex();
      if (sequence !== searchSequence) return;
      const matches = index.map((page) => {
        const text = normalize(page.text);
        if (!terms.every((term) => text.includes(term))) return null;
        const title = normalize(`${page.title} ${page.label}`);
        const heading = page.headings.find((entry) => terms.some((term) => normalize(entry.title).includes(term)));
        const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 20 : 0) + (heading && normalize(heading.title).includes(term) ? 7 : 0), 0);
        return { page, heading, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12);
      status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'página encontrada' : 'páginas encontradas'} para «${query}».` : `No hay resultados para «${query}». Prueba otra palabra.`;
      for (const { page, heading } of matches) {
        const link = document.createElement('a');
        link.className = 'search-result';
        const url = new URL(page.url || './', root);
        if (heading) url.hash = heading.id;
        link.href = url.href;
        const title = document.createElement('div');
        title.className = 'search-result-title';
        title.append(highlighted(page.title, terms));
        link.append(title);
        if (heading) { const location = document.createElement('div'); location.className = 'search-result-location'; location.append(highlighted(heading.title, terms)); link.append(location); }
        const normalizedText = normalize(page.text);
        const position = Math.max(0, normalizedText.indexOf(terms[0]) - 60);
        const excerpt = `${position > 0 ? '…' : ''}${page.text.slice(position, position + 200)}${position + 200 < page.text.length ? '…' : ''}`;
        const preview = document.createElement('p');
        preview.append(highlighted(excerpt || page.excerpt, terms));
        link.append(preview);
        results.append(link);
      }
    } catch {
      if (sequence === searchSequence) status.textContent = 'La búsqueda no se pudo cargar. Puedes explorar las páginas desde el menú.';
    }
  }
  function openSearch() {
    if (menuOpened) toggleMenu(false);
    if (!dialog.open) dialog.showModal();
    input.focus();
    getIndex().catch(() => {});
  }
  if (dialog) {
    document.querySelectorAll('[data-search-open]').forEach((button) => button.addEventListener('click', openSearch));
    document.querySelector('.search-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
    input.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(search, 120); });
  }
  document.addEventListener('keydown', (event) => {
    const writing = /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable;
    if ((event.key === '/' && !writing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) { event.preventDefault(); openSearch(); }
    if (event.key === 'Escape' && menuOpened) toggleMenu(false);
  });
  document.querySelectorAll('.prose table').forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', 'Tabla: desplazamiento horizontal si es necesario');
    table.before(wrapper); wrapper.append(table);
  });
  document.querySelectorAll('.prose pre').forEach((pre) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'copy-code'; button.textContent = 'Copiar'; button.setAttribute('aria-label', 'Copiar bloque de código');
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(pre.querySelector('code').textContent); button.textContent = 'Copiado'; }
      catch { button.textContent = 'Seleccionar'; const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(pre.querySelector('code')); selection.removeAllRanges(); selection.addRange(range); }
      setTimeout(() => { button.textContent = 'Copiar'; }, 1600);
    });
    pre.append(button);
  });
  const headingLinks = new Map([...document.querySelectorAll('.toc nav a')].map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
  if ('IntersectionObserver' in window && headingLinks.size) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) { headingLinks.forEach((link) => link.classList.remove('is-active')); headingLinks.get(visible.target.id)?.classList.add('is-active'); }
    }, { rootMargin: '0px 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('.prose h2[id],.prose h3[id]').forEach((heading) => observer.observe(heading));
  }
})();
