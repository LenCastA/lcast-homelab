import { readFile, writeFile, readdir, mkdir, rm, copyFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = join(root, 'docs');
const distDir = join(root, 'dist');
const gitHub = 'https://github.com/LenCastA/lcast-homelab';
const pages = [
  { slug: 'index', label: 'Introducción', group: 'El homelab' },
  { slug: 'arquitectura', label: 'Arquitectura', group: 'El homelab' },
  { slug: 'hardware', label: 'Hardware', group: 'El homelab' },
  { slug: 'servicios', label: 'Servicios', group: 'El homelab' },
  { slug: 'replicar', label: 'Cómo replicarlo', group: 'La guía' },
  { slug: 'operacion', label: 'Operación', group: 'La guía' },
  { slug: 'backups', label: 'Copias de seguridad', group: 'La guía' },
  { slug: 'decisiones', label: 'Decisiones', group: 'Referencia' },
  { slug: 'recursos', label: 'Recursos', group: 'Referencia' },
];
const escape = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const plain = (value = '') => String(value)
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/<[^>]+>/g, ' ')
  .replace(/[#*_`>|~]/g, '')
  .replace(/\s+/g, ' ').trim();
const slugify = (value) => plain(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seccion';

let available = [];
try { available = await readdir(docsDir); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const sourcePages = [];
for (const page of pages) {
  if (!available.includes(`${page.slug}.md`)) continue;
  const markdown = await readFile(join(docsDir, `${page.slug}.md`), 'utf8');
  if (!markdown.trim()) continue;
  sourcePages.push({ ...page, markdown });
}

// The output location is fixed inside this project, never derived from content.
if (distDir !== join(root, 'dist')) throw new Error('Directorio de salida inválido');
await rm(distDir, { recursive: true, force: true });
await mkdir(join(distDir, 'assets'), { recursive: true });
for (const file of ['styles.css', 'app.js', 'favicon.svg', 'server.svg']) {
  await copyFile(join(root, 'web', file), join(distDir, 'assets', file));
}
await writeFile(join(distDir, '.nojekyll'), '');
const template = await readFile(join(root, 'web', 'template.html'), 'utf8');
const searchIndex = [];

function renderPage(page, index) {
  const home = page.slug === 'index';
  const base = home ? '.' : '..';
  const headingIds = new Map();
  const toc = [];
  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({ renderer: {
    heading({ tokens, depth, text }) {
      const baseId = slugify(text);
      const count = headingIds.get(baseId) || 0;
      headingIds.set(baseId, count + 1);
      const id = count ? `${baseId}-${count + 1}` : baseId;
      if (depth === 2 || depth === 3) toc.push({ id, title: plain(text), depth });
      return `<h${depth} id="${id}" tabindex="-1">${this.parser.parseInline(tokens)}<a class="heading-anchor" href="#${id}" aria-label="Enlace a ${escape(plain(text))}">#</a></h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      let destination = href || '#';
      const external = /^https?:\/\//i.test(destination);
      if (/^(?:javascript|data|vbscript):/i.test(destination)) destination = '#';
      if (!external && !destination.startsWith('#') && !/^[a-z][a-z0-9+.-]*:/i.test(destination)) {
        const docMatch = destination.match(/^(?:\.\/)?(?:docs\/)?([a-z0-9-]+)\.md(#[^\s]*)?$/i);
        if (docMatch) destination = `${base}/${docMatch[1] === 'index' ? '' : `${docMatch[1]}/`}${docMatch[2] || ''}`;
      }
      return `<a href="${escape(destination)}"${title ? ` title="${escape(title)}"` : ''}${external ? ' rel="noopener noreferrer"' : ''}>${this.parser.parseInline(tokens)}</a>`;
    },
    html({ text }) { return escape(text); },
  }});
  const tokens = marked.lexer(page.markdown);
  const firstHeading = tokens.findIndex((token) => token.type !== 'space');
  const topHeading = tokens[firstHeading];
  const title = topHeading?.type === 'heading' && topHeading.depth === 1 ? plain(topHeading.text) : page.label;
  if (topHeading?.type === 'heading' && topHeading.depth === 1) tokens.splice(firstHeading, 1);
  const content = marked.parser(tokens);
  const firstParagraph = tokens.find((token) => token.type === 'paragraph');
  const description = plain(firstParagraph?.text || 'Documentación pública y guía del homelab LCast.').slice(0, 170);
  const navigation = sourcePages.map((nav, navIndex) => {
    const group = navIndex === 0 || sourcePages[navIndex - 1].group !== nav.group ? `<p class="nav-group">${escape(nav.group)}</p>` : '';
    return `${group}<a class="nav-link${nav.slug === page.slug ? ' is-current' : ''}" href="${base}/${nav.slug === 'index' ? '' : `${nav.slug}/`}"${nav.slug === page.slug ? ' aria-current="page"' : ''}><span class="nav-number">${String(navIndex + 1).padStart(2, '0')}</span><span>${escape(nav.label)}</span></a>`;
  }).join('');
  const hero = home
    ? `<div class="home-hero"><div class="hero-copy"><p class="eyebrow"><span></span>Un servidor en casa</p><h1>${escape(title)}</h1><p class="hero-lead">Documentación del homelab LCast y una guía para construir tu propia versión.</p><div class="hero-actions">${sourcePages.some((p) => p.slug === 'replicar') ? `<a class="button button-primary" href="${base}/replicar/">Cómo replicarlo <span aria-hidden="true">↗</span></a>` : ''}<a class="button button-secondary" href="${gitHub}">Ver en GitHub <span aria-hidden="true">↗</span></a></div></div><figure class="hero-figure"><img src="${base}/assets/server.svg" alt="Ilustración de un servidor doméstico conectado a servicios y almacenamiento" width="490" height="430"><figcaption>Ilustración conceptual de un servidor casero</figcaption></figure></div>`
    : `<header class="page-hero"><p class="eyebrow">${escape(page.group)} <span class="eyebrow-line"></span> ${String(index + 1).padStart(2, '0')}</p><h1>${escape(title)}</h1></header>`;
  const previous = sourcePages[index - 1];
  const next = sourcePages[index + 1];
  const pageNavigation = (previous || next) ? `<nav class="page-navigation" aria-label="Página anterior y siguiente">${previous ? `<a href="${base}/${previous.slug === 'index' ? '' : `${previous.slug}/`}"><span>← Anterior</span><strong>${escape(previous.label)}</strong></a>` : '<span></span>'}${next ? `<a class="next-page" href="${base}/${next.slug}/"><span>Siguiente →</span><strong>${escape(next.label)}</strong></a>` : '<span></span>'}</nav>` : '';
  const tableOfContents = toc.length ? `<aside class="toc" aria-label="En esta página"><p class="toc-title">En esta página</p><nav>${toc.map((entry) => `<a class="${entry.depth === 3 ? 'toc-child' : ''}" href="#${entry.id}">${escape(entry.title)}</a>`).join('')}</nav><a class="toc-top" href="#top">Volver arriba ↑</a></aside>` : '';
  const values = {
    BASE: base, TITLE: escape(home ? title : `${title} · LCast Homelab`), DESCRIPTION: escape(description),
    NAVIGATION: navigation, HERO: hero, CONTENT: content, TOC: tableOfContents,
    PAGE_NAVIGATION: pageNavigation, GITHUB: gitHub, PAGE_CLASS: home ? 'home-page' : 'document-page',
    BREADCRUMB: home ? 'Documentación pública' : `<a href="${base}/">Documentación</a><span aria-hidden="true">/</span><span>${escape(page.label)}</span>`,
  };
  searchIndex.push({ title, label: page.label, url: home ? '' : `${page.slug}/`, excerpt: description, text: plain(page.markdown), headings: toc });
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => values[key] ?? '');
}

for (let index = 0; index < sourcePages.length; index += 1) {
  const page = sourcePages[index];
  const pageDir = page.slug === 'index' ? distDir : join(distDir, page.slug);
  await mkdir(pageDir, { recursive: true });
  await writeFile(join(pageDir, 'index.html'), renderPage(page, index));
}
if (!sourcePages.some((page) => page.slug === 'index')) {
  await writeFile(join(distDir, 'index.html'), '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LCast Homelab</title><link rel="stylesheet" href="./assets/styles.css"><main class="preparation"><h1>LCast Homelab</h1><p>La documentación se está preparando.</p></main></html>');
}
await writeFile(join(distDir, 'search-index.json'), JSON.stringify(searchIndex));
console.log(`Documentación generada: ${sourcePages.length} páginas → dist/`);
