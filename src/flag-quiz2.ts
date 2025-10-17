import { ALL_COUNTRY_FLAGS, CountryFlag } from './flag-data.js';

const FLAGS_PER_PAGE = 10;

function setFlagButtonImage(button: HTMLButtonElement, flag: CountryFlag): void {
  const image = document.createElement('img');
  image.src = flag.imageUrl;
  image.alt = `${flag.name}の国旗`;
  image.className = 'flag-image';
  image.decoding = 'async';
  image.loading = 'lazy';
  image.width = 640;
  image.height = 480;

  const fallback = () => {
    button.classList.add('flag-hold-button--fallback');
    button.innerHTML = '';
    const emoji = document.createElement('span');
    emoji.className = 'flag-emoji flag-emoji-fallback';
    emoji.textContent = flag.flag;
    button.appendChild(emoji);
  };

  image.addEventListener('error', fallback, { once: true });
  image.addEventListener('load', () => {
    button.classList.remove('flag-hold-button--fallback');
  });

  button.innerHTML = '';
  button.appendChild(image);
}

function shuffleArray<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  return items;
}

function sampleFlags(count: number): CountryFlag[] {
  const take = Math.min(count, ALL_COUNTRY_FLAGS.length);
  const pool = shuffleArray([...ALL_COUNTRY_FLAGS]);
  return pool.slice(0, take);
}

function hideName(nameElement: HTMLElement): void {
  nameElement.classList.remove('is-visible');
}

function showName(nameElement: HTMLElement): void {
  nameElement.classList.add('is-visible');
}

function attachHoldHandlers(button: HTMLButtonElement, nameElement: HTMLElement): void {
  button.addEventListener('pointerdown', (event) => {
    showName(nameElement);
    const pointerId = event.pointerId;
    try {
      button.setPointerCapture(pointerId);
    } catch (error) {
      // ignore pointer capture errors
    }

    const endInteraction = () => {
      hideName(nameElement);
      button.removeEventListener('pointerup', handlePointerUp);
      button.removeEventListener('pointercancel', handlePointerCancel);
      button.removeEventListener('pointerleave', handlePointerLeave);
      try {
        button.releasePointerCapture(pointerId);
      } catch (error) {
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

function createFlagCard(flag: CountryFlag): HTMLElement {
  const item = document.createElement('div');
  item.className = 'flag-hold-card';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'flag-hold-button';
  button.setAttribute('aria-label', `${flag.name}の国旗`);
  setFlagButtonImage(button, flag);

  const name = document.createElement('div');
  name.className = 'flag-hold-name';
  name.textContent = flag.name;

  attachHoldHandlers(button, name);

  item.appendChild(button);
  item.appendChild(name);
  return item;
}

function renderFlags(container: HTMLElement, flags: CountryFlag[]): void {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  flags.forEach((flag) => {
    fragment.appendChild(createFlagCard(flag));
  });
  container.appendChild(fragment);
}

function setupFlagQuiz2(): void {
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
