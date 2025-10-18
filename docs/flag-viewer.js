import { ALL_COUNTRY_FLAGS } from './flag-data.js';
function sortFlags(flags) {
    const collator = new Intl.Collator('ja', { usage: 'sort', sensitivity: 'base' });
    return [...flags].sort((a, b) => collator.compare(a.name, b.name));
}
function createFlagLink(country) {
    const item = document.createElement('li');
    item.className = 'flag-viewer-item';
    const link = document.createElement('a');
    link.className = 'flag-viewer-link';
    link.href = country.imageUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('data-iso', country.isoCode);
    const image = document.createElement('img');
    image.className = 'flag-viewer-image';
    image.src = country.imageUrl;
    image.alt = `${country.name}の国旗`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 60;
    image.height = 45;
    image.onerror = () => {
        const fallback = document.createElement('span');
        fallback.className = 'flag-viewer-emoji';
        fallback.textContent = country.flag;
        fallback.setAttribute('aria-hidden', 'true');
        image.replaceWith(fallback);
    };
    const name = document.createElement('span');
    name.className = 'flag-viewer-name';
    name.textContent = country.name;
    const code = document.createElement('span');
    code.className = 'flag-viewer-code';
    code.textContent = country.isoCode;
    link.append(image, name, code);
    item.appendChild(link);
    return item;
}
function renderFlagList(flags) {
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
function ready(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
    }
    else {
        fn();
    }
}
ready(() => {
    renderFlagList(ALL_COUNTRY_FLAGS);
});
