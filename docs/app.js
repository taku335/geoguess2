// ========= 設定 =========
const ROUNDS_PER_GAME = 3; // 1ゲームで抽選するラウンド数
const TARGET_POOL_SIZE = 10; // 候補数：10

const KEY_STORAGE_KEY = 'gsv_api_key';
const STREET_VIEW_METADATA_ENDPOINT = 'https://maps.googleapis.com/maps/api/streetview/metadata';
const STREET_VIEW_SEARCH_RADIUS = 50000; // m
const MAX_METADATA_ATTEMPTS = TARGET_POOL_SIZE * 60;

// ストリートビューの探索用に、世界中の都市圏をいくつかサンプリング
const STREET_VIEW_SAMPLE_ZONES = [
  { name: '東京都心', lat: 35.6804, lng: 139.769, radiusKm: 60 },
  { name: 'ロンドン', lat: 51.5072, lng: -0.1276, radiusKm: 60 },
  { name: 'ニューヨーク', lat: 40.7128, lng: -74.006, radiusKm: 60 },
  { name: 'パリ', lat: 48.8566, lng: 2.3522, radiusKm: 50 },
  { name: 'シドニー', lat: -33.8688, lng: 151.2093, radiusKm: 70 },
  { name: 'シンガポール', lat: 1.3521, lng: 103.8198, radiusKm: 40 },
  { name: 'サンパウロ', lat: -23.5505, lng: -46.6333, radiusKm: 70 },
  { name: 'ケープタウン', lat: -33.9249, lng: 18.4241, radiusKm: 80 },
  { name: 'バンクーバー', lat: 49.2827, lng: -123.1207, radiusKm: 80 },
  { name: 'レイキャビク', lat: 64.1466, lng: -21.9426, radiusKm: 80 },
  { name: 'ドバイ', lat: 25.2048, lng: 55.2708, radiusKm: 70 },
  { name: 'ロサンゼルス', lat: 34.0522, lng: -118.2437, radiusKm: 70 },
  { name: 'ローマ', lat: 41.9028, lng: 12.4964, radiusKm: 50 },
  { name: 'ソウル', lat: 37.5665, lng: 126.978, radiusKm: 50 }
];

// ========= ゲーム状態 =========
let map = null;
let guessMarker = null;
let answerMarker = null;
let line = null;
let streetViewPanorama = null;
let googleMapsLoadPromise = null;

let googleMapsApiKey = (window.GOOGLE_MAPS_API_KEY || '').trim();
if (!googleMapsApiKey) {
  try {
    const storedKey = localStorage.getItem(KEY_STORAGE_KEY);
    if (storedKey) {
      googleMapsApiKey = storedKey;
      window.GOOGLE_MAPS_API_KEY = storedKey;
    }
  } catch (err) {
    console.warn('APIキーの読み込みに失敗しました', err);
  }
}

let ROUNDS = ROUNDS_PER_GAME;
let round = 0;
let score = 0;

let POOL = [];
let order = [];
let current = null;
let hasGuessed = false;
let selectedLatLng = null;

// ========= 初期化 =========
boot();

function boot() {
  initUI();
  initMap();
  setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
  updateHud();
}

function initUI() {
  const roundsInput = document.getElementById('roundsInput');
  roundsInput.value = ROUNDS_PER_GAME;
  roundsInput.disabled = true;
  document.getElementById('poolLabel').textContent = `0 / ${TARGET_POOL_SIZE}`;
  document.getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;
  document.getElementById('scoreLabel').textContent = '0';

  updateApiKeyUI();

  document.getElementById('apiKeySave').addEventListener('click', handleApiKeySave);
  document.getElementById('apiKeyClear').addEventListener('click', handleApiKeyClear);
  document.getElementById('apiKeyInput').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleApiKeySave();
    }
  });
}

function initMap() {
  map = L.map('map', { worldCopyJump: true, attributionControl: true }).setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', (e) => {
    if (hasGuessed) return; // 既に判定済み
    selectedLatLng = e.latlng;
    if (!guessMarker) {
      guessMarker = L.marker(e.latlng, { title: 'あなたの推測' }).addTo(map);
    } else {
      guessMarker.setLatLng(e.latlng);
    }
    document.getElementById('guessBtn').disabled = false;
  });
}

// ========= APIキー管理 =========
function setApiKey(newKey) {
  const trimmed = (newKey || '').trim();
  googleMapsApiKey = trimmed;
  window.GOOGLE_MAPS_API_KEY = trimmed;
  try {
    if (trimmed) {
      localStorage.setItem(KEY_STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(KEY_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('APIキーの保存に失敗しました', err);
  }
  if (!trimmed) {
    googleMapsLoadPromise = null;
  }
  updateApiKeyUI();
}

function handleApiKeySave() {
  const input = document.getElementById('apiKeyInput');
  const value = input.value.trim();
  if (!value) {
    alert('Google Maps Platform の API キーを入力してください。');
    input.focus();
    return;
  }
  setApiKey(value);
  alert('APIキーを保存しました。');
}

function handleApiKeyClear() {
  setApiKey('');
  const input = document.getElementById('apiKeyInput');
  input.value = '';
  input.focus();
}

function updateApiKeyUI() {
  const input = document.getElementById('apiKeyInput');
  if (!input) return;
  input.value = googleMapsApiKey;
  input.placeholder = googleMapsApiKey ? '設定済み（変更可）' : 'Google Maps API Key';
}

// ========= Google Maps 読み込み =========
async function ensureGoogleMapsReady() {
  if (window.google?.maps?.StreetViewPanorama) return;
  if (!googleMapsApiKey) {
    throw new Error('Google Maps Platform の API キーが設定されていません。');
  }
  if (!googleMapsLoadPromise) {
    googleMapsLoadPromise = loadGoogleMapsScript(googleMapsApiKey);
  }
  await googleMapsLoadPromise;
  if (!window.google?.maps?.StreetViewPanorama) {
    throw new Error('Google Maps JavaScript API の初期化に失敗しました。');
  }
}

function loadGoogleMapsScript(key) {
  if (window.google?.maps?.StreetViewPanorama) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const existing = document.getElementById('google-maps-js');
    if (existing) {
      existing.remove();
    }
    const script = document.createElement('script');
    script.id = 'google-maps-js';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=quarterly`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => {
      googleMapsLoadPromise = null;
      reject(new Error('Google Maps JavaScript API の読み込みに失敗しました。'));
    });
    document.head.appendChild(script);
  });
}

async function initViewer(panoId) {
  await ensureGoogleMapsReady();
  if (!document.getElementById('pano')) {
    throw new Error('ストリートビューを表示する要素が見つかりません。');
  }
  if (!streetViewPanorama) {
    streetViewPanorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
      pano: panoId,
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      visible: true,
      addressControl: false,
      fullscreenControl: true,
      motionTrackingControl: false,
      linksControl: true,
      zoomControl: true,
      scrollwheel: true
    });
  } else {
    streetViewPanorama.setPano(panoId);
  }
  streetViewPanorama.setPov({ heading: 0, pitch: 0 });
  streetViewPanorama.setZoom(1);
  streetViewPanorama.setVisible(true);
}

// ========= ユーティリティ =========
const toRad = (d) => (d * Math.PI) / 180;

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371000; // m
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c) / 1000; // km
}

function formatKm(km) {
  if (km < 1) return `${(km * 1000).toFixed(0)} m`;
  if (km < 100) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

// 0〜5000点（指数減衰）
function scoreFromDistance(km) {
  const raw = 5000 * Math.exp(-km / 2000);
  return Math.max(0, Math.round(raw));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateHud() {
  document.getElementById('roundLabel').textContent = `${round} / ${ROUNDS}`;
  document.getElementById('scoreLabel').textContent = `${score}`;
  document.getElementById('poolLabel').textContent = `${POOL.length} / ${TARGET_POOL_SIZE}`;
}

function setButtons({ startDisabled, guessDisabled, nextDisabled }) {
  document.getElementById('startBtn').disabled = startDisabled ?? false;
  document.getElementById('guessBtn').disabled = guessDisabled ?? true;
  document.getElementById('nextBtn').disabled = nextDisabled ?? true;
}

// ========= Google Street View から候補を作る =========
function randomPointInZone(zone) {
  const radiusMeters = Math.max(1000, Math.min((zone.radiusKm || 50) * 1000, STREET_VIEW_SEARCH_RADIUS));
  const t = 2 * Math.PI * Math.random();
  const u = Math.random();
  const r = Math.sqrt(u) * radiusMeters;
  const dx = r * Math.cos(t);
  const dy = r * Math.sin(t);
  const newLat = zone.lat + (dy / 111320);
  const newLng = zone.lng + (dx / (111320 * Math.cos(toRad(zone.lat))));
  return { lat: newLat, lng: newLng, radiusMeters };
}

async function fetchStreetViewMetadata(lat, lng, radiusMeters) {
  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius: Math.round(radiusMeters ?? STREET_VIEW_SEARCH_RADIUS).toString(),
    source: 'outdoor',
    key: googleMapsApiKey
  });
  const res = await fetch(`${STREET_VIEW_METADATA_ENDPOINT}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Street View metadata の取得に失敗しました (HTTP ${res.status}).`);
  }
  const data = await res.json();
  return data;
}

function metadataToLocation(data, fallbackZone) {
  const loc = data?.location || {};
  const lat = typeof loc.lat === 'number' ? loc.lat : loc.latLng?.lat;
  const lng = typeof loc.lng === 'number' ? loc.lng : loc.latLng?.lng;
  if (typeof lat !== 'number' || typeof lng !== 'number') return null;
  const parts = [loc.description, loc.region, loc.city, loc.country, fallbackZone?.name]
    .filter((part, index, arr) => typeof part === 'string' && part.trim() && arr.indexOf(part) === index);
  const name = parts.length ? parts.join(' · ') : `Street View panorama (${lat.toFixed(2)}, ${lng.toFixed(2)})`;
  return {
    lat,
    lng,
    name
  };
}

async function loadStreetViewPanoramas(targetCount = TARGET_POOL_SIZE, onProgress = () => {}) {
  const selected = [];
  const usedPanos = new Set();
  let attempts = 0;

  while (selected.length < targetCount && attempts < MAX_METADATA_ATTEMPTS) {
    attempts += 1;
    const zone = STREET_VIEW_SAMPLE_ZONES[Math.floor(Math.random() * STREET_VIEW_SAMPLE_ZONES.length)];
    const sample = randomPointInZone(zone);

    let metadata;
    try {
      metadata = await fetchStreetViewMetadata(sample.lat, sample.lng, sample.radiusMeters);
    } catch (err) {
      console.warn('Street View metadata の取得に失敗:', err);
      continue;
    }

    if (!metadata) continue;
    const status = metadata.status;
    if (status === 'OVER_QUERY_LIMIT' || status === 'REQUEST_DENIED') {
      const msg = metadata.error_message || 'Google Street View API から拒否されました。';
      throw new Error(msg);
    }
    if (status !== 'OK') {
      onProgress(selected.length, targetCount, attempts);
      continue;
    }

    const panoId = metadata.pano_id || metadata.panoId;
    if (!panoId || usedPanos.has(panoId)) {
      onProgress(selected.length, targetCount, attempts);
      continue;
    }

    const location = metadataToLocation(metadata, zone);
    if (!location) {
      onProgress(selected.length, targetCount, attempts);
      continue;
    }

    usedPanos.add(panoId);
    selected.push({
      id: `gsv_${panoId}`,
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      panoId,
      credit: metadata.copyright || '© Google',
      sourcePage: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.lat},${location.lng}&pano=${panoId}`
    });

    onProgress(Math.min(selected.length, targetCount), targetCount, attempts);
  }

  return selected;
}

async function ensurePool() {
  if (POOL.length >= TARGET_POOL_SIZE) return;

  const overlay = document.getElementById('loadingOverlay');
  const bar = document.getElementById('loadingBar');
  const text = document.getElementById('loadingText');
  overlay.style.display = 'grid';
  bar.style.width = '0%';
  text.textContent = '候補を探索中…';

  try {
    if (!googleMapsApiKey) {
      throw new Error('Google Maps Platform の API キーが設定されていません。');
    }

    const results = await loadStreetViewPanoramas(TARGET_POOL_SIZE, (ok, target, attempts) => {
      bar.style.width = `${Math.round((ok / target) * 100)}%`;
      text.textContent = `抽出 ${ok} / ${target}　(試行:${attempts})`;
    });

    if (results.length < TARGET_POOL_SIZE) {
      throw new Error('十分な Street View パノラマを見つけられませんでした。');
    }

    POOL = shuffle(results);
    updateHud();
  } finally {
    overlay.style.display = 'none';
  }
}

// ========= ラウンド管理 =========
async function startGame() {
  document.getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;
  setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: true });

  try {
    await ensurePool();
  } catch (err) {
    console.error('候補の準備に失敗:', err);
    alert(err.message || 'Street View から候補を取得できませんでした。APIキーや利用制限を確認してください。');
    setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
    return;
  }

  order = shuffle([...POOL]).slice(0, ROUNDS_PER_GAME);
  ROUNDS = order.length;
  round = 0;
  score = 0;
  document.getElementById('roundLabel').textContent = `0 / ${ROUNDS}`;

  try {
    await nextRound();
  } catch (err) {
    console.error('最初のラウンドの開始に失敗:', err);
    alert(err.message || 'ストリートビューの読み込みに失敗しました。APIキーや利用制限を確認してください。');
    setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
  }
}

async function nextRound() {
  hasGuessed = false;
  selectedLatLng = null;
  if (guessMarker) {
    map.removeLayer(guessMarker);
    guessMarker = null;
  }
  if (answerMarker) {
    map.removeLayer(answerMarker);
    answerMarker = null;
  }
  if (line) {
    map.removeLayer(line);
    line = null;
  }
  map.setView([20, 0], 2);

  round += 1;
  if (round > ROUNDS) {
    alert(`ゲーム終了！ 総得点: ${score} pt`);
    round = ROUNDS;
    setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
    return;
  }

  current = order[round - 1];

  try {
    await initViewer(current.panoId);
  } catch (err) {
    round -= 1;
    current = null;
    updateHud();
    throw err;
  }

  updateHud();
  setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: true });
  document.getElementById('resultOverlay').style.display = 'none';
}

function makeGuess() {
  if (!selectedLatLng || !current) return;
  hasGuessed = true;

  const answer = L.latLng(current.lat, current.lng);

  answerMarker = L.marker(answer, { title: '正解' }).addTo(map);
  line = L.polyline([selectedLatLng, answer], { weight: 3, opacity: 0.9, dashArray: '6 6' }).addTo(map);

  const bounds = L.latLngBounds([selectedLatLng, answer]).pad(0.5);
  map.fitBounds(bounds, { maxZoom: 6 });

  const dKm = haversineKm(selectedLatLng.lat, selectedLatLng.lng, answer.lat, answer.lng);
  const pts = scoreFromDistance(dKm);
  score += pts;
  updateHud();

  document.getElementById('resultTitle').textContent = `ラウンド ${round} の結果`;
  document.getElementById('distLabel').textContent = formatKm(dKm);
  document.getElementById('pointsLabel').textContent = pts.toString();
  const nameLine = current.name.length > 120 ? `${current.name.slice(0, 117)}…` : current.name;
  document.getElementById('answerLabel').innerHTML = `${nameLine}`;
  document.getElementById('creditLabel').innerHTML = `Credit: ${current.credit} · <a href="${current.sourcePage}" target="_blank" rel="noopener">Google マップで見る</a>`;
  document.getElementById('resultOverlay').style.display = 'grid';

  setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: false });
  document.getElementById('nextBtn').textContent = round === ROUNDS ? 'ゲーム終了 ▶' : '次のラウンド ▶';
}

function resetGame() {
  round = 0;
  score = 0;
  current = null;
  ROUNDS = ROUNDS_PER_GAME;
  order = [];
  updateHud();
  if (streetViewPanorama) {
    try {
      streetViewPanorama.setVisible(false);
    } catch (err) {
      console.warn('Street View ビューアのリセット中にエラー:', err);
    }
    document.getElementById('pano').innerHTML = '';
    streetViewPanorama = null;
  }
  if (guessMarker) {
    map.removeLayer(guessMarker);
    guessMarker = null;
  }
  if (answerMarker) {
    map.removeLayer(answerMarker);
    answerMarker = null;
  }
  if (line) {
    map.removeLayer(line);
    line = null;
  }
  map.setView([20, 0], 2);
  setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
  document.getElementById('resultOverlay').style.display = 'none';
  document.getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;
}

// ========= イベント =========
document.getElementById('startBtn').addEventListener('click', () => {
  startGame();
});

document.getElementById('guessBtn').addEventListener('click', makeGuess);

document.getElementById('nextBtn').addEventListener('click', () => {
  nextRound().catch((err) => {
    console.error('ラウンドの読み込みに失敗:', err);
    alert(err.message || 'ストリートビューの読み込みに失敗しました。APIキーや利用制限を確認してください。');
    setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: false });
  });
});

document.getElementById('resetBtn').addEventListener('click', resetGame);

document.getElementById('closeResult').addEventListener('click', () => {
  document.getElementById('resultOverlay').style.display = 'none';
});

// 初期ボタン状態
setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
updateHud();
