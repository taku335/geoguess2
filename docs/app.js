// ========= 設定 =========
const ROUNDS_PER_GAME = 3; // 1ゲームで抽選するラウンド数
const TARGET_POOL_SIZE = 20; // 候補数：20
const COMMONS_CATEGORY = 'Category:360° panoramas with equirectangular projection'; // 取得元
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

// フォールバック（API失敗時に使用）
const FALLBACK_LOCATIONS = [
  {
    id: 'alma',
    name: 'ALMA 観測所（チリ・アタカマ）',
    lat: -23.029,
    lng: -67.755,
    panorama: 'https://pannellum.org/images/alma.jpg',
    credit: 'Pannellum samples',
    sourcePage: 'https://pannellum.org/'
  },
  {
    id: 'cerro_toco',
    name: 'Cerro Toco（チリ・アタカマ）',
    lat: -22.94638,
    lng: -67.777061,
    panorama: 'https://pannellum.org/images/cerro-toco-0.jpg',
    credit: 'Pannellum samples',
    sourcePage: 'https://pannellum.org/'
  },
  {
    id: 'bma',
    name: 'Baltimore Museum of Art（米・ボルチモア）',
    lat: 39.32611,
    lng: -76.61917,
    panorama: 'https://pannellum.org/images/bma-1.jpg',
    credit: 'Pannellum samples',
    sourcePage: 'https://pannellum.org/'
  }
];

// ========= ゲーム状態 =========
let viewer = null;
let map = null;
let guessMarker = null;
let answerMarker = null;
let line = null;

let ROUNDS = ROUNDS_PER_GAME;
let round = 0;
let score = 0;

let POOL = []; // 候補20件
let order = []; // 今回プレイで使う順
let current = null; // 現在のロケーション
let hasGuessed = false;
let selectedLatLng = null;

// ========= 初期化 =========
initMap();
initUI();

function initUI() {
  const roundsInput = document.getElementById('roundsInput');
  roundsInput.value = ROUNDS_PER_GAME;
  roundsInput.disabled = true;
  document.getElementById('poolLabel').textContent = `0 / ${TARGET_POOL_SIZE}`;
  document.getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;
  document.getElementById('scoreLabel').textContent = '0';
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

function initViewer(panoramaUrl) {
  if (viewer) {
    viewer.destroy();
    viewer = null;
  }
  viewer = pannellum.viewer('pano', {
    type: 'equirectangular',
    panorama: panoramaUrl,
    autoLoad: true,
    showFullscreenCtrl: true,
    hfov: 100
  });
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

// ========= Wikimedia Commons から候補20件を作る =========
async function loadCommonsPanoramas(targetCount = TARGET_POOL_SIZE, onProgress = () => {}) {
  const selected = [];
  let gcmcontinue = null;
  let fetchedPages = 0;

  while (selected.length < targetCount) {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'categorymembers',
      gcmtitle: COMMONS_CATEGORY,
      gcmtype: 'file',
      gcmlimit: '50', // 無認証の既定上限
      prop: 'imageinfo|coordinates',
      iiprop: 'url|mime|size|extmetadata',
      iiurlwidth: '4096', // 高解像サムネ（負荷軽減）
      format: 'json',
      origin: '*'
    });
    if (gcmcontinue) params.set('gcmcontinue', gcmcontinue);

    const url = `${COMMONS_API}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) break;
    const data = await res.json();

    const pages = data.query && data.query.pages ? Object.values(data.query.pages) : [];
    fetchedPages += pages.length;

    for (const p of pages) {
      const ii = p.imageinfo && p.imageinfo[0];
      const coord = p.coordinates && p.coordinates[0];
      if (!ii || !coord) continue;
      if (ii.mime !== 'image/jpeg') continue;

      // アスペクト比（2:1前後）判定
      const w = ii.thumbwidth || ii.width || 0;
      const h = ii.thumbheight || ii.height || 0;
      if (w && h) {
        const ratio = w / h;
        if (ratio < 1.95 || ratio > 2.05) continue;
      }

      const title = (p.title || '').replace(/^File:/, '') || 'Untitled panorama';
      const artist = ii.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, '') || 'Unknown';
      const license = ii.extmetadata?.LicenseShortName?.value || '';
      const credit = `${artist} / Wikimedia Commons${license ? ` (${license})` : ''}`;

      selected.push({
        id: `commons_${p.pageid}`,
        name: title,
        lat: coord.lat,
        lng: coord.lon,
        panorama: ii.thumburl || ii.url,
        credit,
        sourcePage: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`
      });

      if (selected.length >= targetCount) break;
    }

    onProgress(Math.min(selected.length, targetCount), targetCount, fetchedPages);

    gcmcontinue = data?.continue?.gcmcontinue;
    if (!gcmcontinue) break;
  }

  return selected;
}

async function ensurePool() {
  if (POOL.length >= TARGET_POOL_SIZE) return;

  // ローディング表示
  const overlay = document.getElementById('loadingOverlay');
  const bar = document.getElementById('loadingBar');
  const text = document.getElementById('loadingText');
  overlay.style.display = 'grid';
  bar.style.width = '0%';
  text.textContent = '候補を探索中…';

  try {
    const results = await loadCommonsPanoramas(TARGET_POOL_SIZE, (ok, target, fetched) => {
      bar.style.width = `${Math.round((ok / target) * 100)}%`;
      text.textContent = `抽出 ${ok} / ${target}　(取得ページ:${fetched})`;
    });

    if (results.length < TARGET_POOL_SIZE) throw new Error('候補が足りません');
    POOL = shuffle(results);
    updateHud();
  } catch (e) {
    console.warn('Wikimedia取得に失敗：', e);
    // フォールバック（3件）
    POOL = [...FALLBACK_LOCATIONS];
    updateHud();
    alert('Wikimediaからの取得に失敗したため、サンプル候補で開始します。');
  } finally {
    overlay.style.display = 'none';
  }
}

// ========= ラウンド管理 =========
async function startGame() {
  document.getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;

  setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: true });
  await ensurePool(); // 候補20件を準備（フォールバックあり）

  // 今回の出題順を作成（候補からランダム抽出）
  order = shuffle([...POOL]).slice(0, ROUNDS_PER_GAME);
  ROUNDS = order.length;
  round = 0;
  score = 0;
  document.getElementById('roundLabel').textContent = `0 / ${ROUNDS}`;
  nextRound();
}

function nextRound() {
  // 片付け
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

  // ラウンド進行
  round += 1;
  if (round > ROUNDS) {
    alert(`ゲーム終了！ 総得点: ${score} pt`);
    round = ROUNDS;
    setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
    return;
  }
  current = order[round - 1];
  initViewer(current.panorama);
  updateHud();
  setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: true });

  // 結果オーバーレイを隠す
  document.getElementById('resultOverlay').style.display = 'none';
}

function makeGuess() {
  if (!selectedLatLng || !current) return;
  hasGuessed = true;

  const answer = L.latLng(current.lat, current.lng);

  // 正解マーカー
  answerMarker = L.marker(answer, { title: '正解' }).addTo(map);

  // ライン（推測 → 正解）
  line = L.polyline([selectedLatLng, answer], { weight: 3, opacity: 0.9, dashArray: '6 6' }).addTo(map);

  // 両点が入るようにズーム
  const bounds = L.latLngBounds([selectedLatLng, answer]).pad(0.5);
  map.fitBounds(bounds, { maxZoom: 6 });

  // スコア計算
  const dKm = haversineKm(selectedLatLng.lat, selectedLatLng.lng, answer.lat, answer.lng);
  const pts = scoreFromDistance(dKm);
  score += pts;
  updateHud();

  // 結果表示
  document.getElementById('resultTitle').textContent = `ラウンド ${round} の結果`;
  document.getElementById('distLabel').textContent = formatKm(dKm);
  document.getElementById('pointsLabel').textContent = pts.toString();
  const nameLine = current.name.length > 120 ? `${current.name.slice(0, 117)}…` : current.name;
  document.getElementById('answerLabel').innerHTML = `${nameLine}`;
  document.getElementById('creditLabel').innerHTML = `Credit: ${current.credit} · <a href="${current.sourcePage}" target="_blank" rel="noopener">File page</a>`;
  document.getElementById('resultOverlay').style.display = 'grid';

  // ボタン状態
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
  if (viewer) {
    viewer.destroy();
    viewer = null;
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
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('guessBtn').addEventListener('click', makeGuess);
document.getElementById('nextBtn').addEventListener('click', nextRound);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('closeResult').addEventListener('click', () => {
  document.getElementById('resultOverlay').style.display = 'none';
});

// 初期ボタン状態
setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
updateHud();
