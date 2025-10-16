import { ALL_COUNTRY_FLAGS } from './flag-data.js';
const FLAGS_PER_PAGE = 10;
function shuffleArray(items) {
    for (let i = items.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
    return items;
}
function sampleFlags(count) {
    const take = Math.min(count, ALL_COUNTRY_FLAGS.length);
    const pool = shuffleArray([...ALL_COUNTRY_FLAGS]);
    return pool.slice(0, take);
}
function hideName(nameElement) {
    nameElement.classList.remove('is-visible');
}
function showName(nameElement) {
    nameElement.classList.add('is-visible');
}
function attachHoldHandlers(button, nameElement) {
    button.addEventListener('pointerdown', (event) => {
        showName(nameElement);
        const pointerId = event.pointerId;
        try {
            button.setPointerCapture(pointerId);
        }
        catch (error) {
            // ignore pointer capture errors
        }
        const endInteraction = () => {
            hideName(nameElement);
            button.removeEventListener('pointerup', handlePointerUp);
            button.removeEventListener('pointercancel', handlePointerCancel);
            button.removeEventListener('pointerleave', handlePointerLeave);
            try {
                button.releasePointerCapture(pointerId);
            }
            catch (error) {
                // ignore pointer capture errors
            }
        };
        const handlePointerUp = () => {
            endInteraction();
        };
        const handlePointerCancel = () => {
            endInteraction();
        };
        const handlePointerLeave = () => {
            endInteraction();
        };
        button.addEventListener('pointerup', handlePointerUp, { once: true });
        button.addEventListener('pointercancel', handlePointerCancel, { once: true });
        button.addEventListener('pointerleave', handlePointerLeave, { once: true });
    });
    button.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            showName(nameElement);
        }
    });
    button.addEventListener('keyup', (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            hideName(nameElement);
        }
    });
    button.addEventListener('blur', () => {
        hideName(nameElement);
    });
}
function createFlagCard(flag) {
    const item = document.createElement('div');
    item.className = 'flag-hold-card';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'flag-hold-button';
    button.textContent = flag.flag;
    button.setAttribute('aria-label', `${flag.flag} ${flag.name}`);
    const name = document.createElement('div');
    name.className = 'flag-hold-name';
    name.textContent = flag.name;
    attachHoldHandlers(button, name);
    item.appendChild(button);
    item.appendChild(name);
    return item;
}
function renderFlags(container, flags) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    flags.forEach((flag) => {
        fragment.appendChild(createFlagCard(flag));
    });
    container.appendChild(fragment);
}
function setupFlagQuiz2() {
    const container = document.getElementById('flagQuiz2Grid');
    const refreshButton = document.getElementById('refreshFlagQuiz2');
    if (!(container instanceof HTMLElement) || !(refreshButton instanceof HTMLButtonElement)) {
        return;
    }
    const refresh = () => {
        const flags = sampleFlags(FLAGS_PER_PAGE);
        renderFlags(container, flags);
    };
    refreshButton.addEventListener('click', refresh);
    refresh();
}
document.addEventListener('DOMContentLoaded', () => {
    setupFlagQuiz2();
});
