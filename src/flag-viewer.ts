import { ALL_COUNTRY_FLAGS, CountryFlag } from './flag-data.js';

function sortFlags(flags: readonly CountryFlag[]): CountryFlag[] {
  const collator = new Intl.Collator('ja', { usage: 'sort', sensitivity: 'base' });
  return [...flags].sort((a, b) => collator.compare(a.name, b.name));
}

function createFlagLink(country: CountryFlag): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'flag-viewer-item';

  const link = document.createElement('a');
  link.className = 'flag-viewer-link';
  link.href = country.imageUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('data-iso', country.isoCode);

  const emoji = document.createElement('span');
  emoji.className = 'flag-viewer-emoji';
  emoji.textContent = country.flag;
  emoji.setAttribute('aria-hidden', 'true');

  const name = document.createElement('span');
  name.className = 'flag-viewer-name';
  name.textContent = country.name;

  const code = document.createElement('span');
  code.className = 'flag-viewer-code';
  code.textContent = country.isoCode;

  link.append(emoji, name, code);
  item.appendChild(link);
  return item;
}

function renderFlagList(flags: readonly CountryFlag[]): void {
  const list = document.getElementById('flagViewerList');
  if (!list) {
    throw new Error('Missing #flagViewerList element');
  }
  list.innerHTML = '';

  const fragment = document.createDocumentFragment();
  sortFlags(flags).forEach((country) => {
    fragment.appendChild(createFlagLink(country));
  });
  list.appendChild(fragment);
}

function ready(fn: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}

ready(() => {
  renderFlagList(ALL_COUNTRY_FLAGS);
});
