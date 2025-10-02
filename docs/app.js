"use strict";
// ========= 設定 =========
const ROUNDS_PER_GAME = 3;
const TARGET_POOL_SIZE = 10;
const KEY_STORAGE_KEY = 'gsv_api_key';
const STREET_VIEW_METADATA_ENDPOINT = 'https://maps.googleapis.com/maps/api/streetview/metadata';
const STREET_VIEW_SEARCH_RADIUS = 50000;
const MAX_METADATA_ATTEMPTS = TARGET_POOL_SIZE * 60;
const WIKIMEDIA_IMAGEINFO_ENDPOINT = 'https://commons.wikimedia.org/w/api.php';
const wikimediaImageCache = new Map();
const OPEN_PANORAMAS = [
    {
        id: 'alma_observatory',
        name: 'ALMA Observatory — San Pedro de Atacama, Chile',
        lat: -23.0293,
        lng: -67.7535,
        panoramaUrl: 'https://cdn.eso.org/images/large/potw1340a.jpg',
        credit: 'ESO / Babak Tafreshi (CC BY 4.0)',
        sourcePage: 'https://www.eso.org/public/images/potw1340a/',
        fallbackUrls: ['https://pannellum.org/images/alma.jpg']
    },
    {
        id: 'cerro_toco_summit',
        name: 'Cerro Toco Summit — Antofagasta Region, Chile',
        lat: -22.9459,
        lng: -67.7733,
        credit: 'Petr Brož (CC BY-SA 4.0)',
        sourcePage: 'https://commons.wikimedia.org/wiki/File:Cerro_Toco_Atacama_Desert_360_Panorama.jpg',
        wikimediaFile: 'Cerro_Toco_Atacama_Desert_360_Panorama.jpg',
        fallbackUrls: ['https://pannellum.org/images/cerro-toco-0.jpg']
    },
    {
        id: 'cerro_toco_ridge',
        name: 'Cerro Toco Ridge — Antofagasta Region, Chile',
        lat: -22.9494,
        lng: -67.7817,
        credit: 'Petr Brož (CC BY-SA 4.0)',
        sourcePage: 'https://commons.wikimedia.org/wiki/File:Cerro_Toco_Atacama_Desert_360_Panorama_2.jpg',
        wikimediaFile: 'Cerro_Toco_Atacama_Desert_360_Panorama_2.jpg',
        fallbackUrls: ['https://pannellum.org/images/cerro-toco-1.jpg']
    },
    {
        id: 'valle_de_la_luna',
        name: 'Valle de la Luna — San Pedro de Atacama, Chile',
        lat: -22.9605,
        lng: -67.7839,
        credit: 'Petr Brož (CC BY-SA 4.0)',
        sourcePage: 'https://commons.wikimedia.org/wiki/File:Atacama_Desert_Moon_Valley_360_Panorama.jpg',
        wikimediaFile: 'Atacama_Desert_Moon_Valley_360_Panorama.jpg',
        fallbackUrls: ['https://pannellum.org/images/cerro-toco-2.jpg']
    },
    {
        id: 'blue_mosque_istanbul',
        name: 'Sultan Ahmed Mosque — Istanbul, Turkey',
        lat: 41.0054,
        lng: 28.9768,
        credit: 'Benh LIEU SONG (CC BY-SA 3.0)',
        sourcePage: 'https://commons.wikimedia.org/wiki/File:Sultan_Ahmed_Mosque_Interior_360_Panorama.jpg',
        wikimediaFile: 'Sultan_Ahmed_Mosque_Interior_360_Panorama.jpg',
        fallbackUrls: ['https://commons.wikimedia.org/wiki/Special:FilePath/Sultan_Ahmed_Mosque_Interior_360_Panorama.jpg']
    },
    {
        id: 'matterhorn_gornergrat',
        name: 'Matterhorn from Gornergrat — Valais, Switzerland',
        lat: 45.9826,
        lng: 7.7833,
        credit: 'Michael Clarke Stuff (CC BY-SA 2.0)',
        sourcePage: 'https://commons.wikimedia.org/wiki/File:Matterhorn_from_Gornergrat_360_panorama.jpg',
        wikimediaFile: 'Matterhorn_from_Gornergrat_360_panorama.jpg',
        fallbackUrls: ['https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_from_Gornergrat_360_panorama.jpg']
    },
    {
        id: 'grand_canyon_toroweap',
        name: 'Toroweap Overlook — Grand Canyon, USA',
        lat: 36.2113,
        lng: -113.0608,
        credit: 'Tuxyso (CC BY-SA 4.0)',
        sourcePage: 'https://commons.wikimedia.org/wiki/File:Grand_Canyon_at_Toroweap_Overlook_-_360_panorama.jpg',
        wikimediaFile: 'Grand_Canyon_at_Toroweap_Overlook_-_360_panorama.jpg',
        fallbackUrls: ['https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Canyon_at_Toroweap_Overlook_-_360_panorama.jpg']
    },
    {
        id: 'mont_saint_michel',
        name: 'Mont-Saint-Michel — Normandy, France',
        lat: 48.636,
        lng: -1.5115,
        credit: 'Selbymay (CC BY-SA 4.0)',
        sourcePage: 'https://commons.wikimedia.org/wiki/File:Mont_Saint-Michel_360_panorama.jpg',
        wikimediaFile: 'Mont_Saint-Michel_360_panorama.jpg',
        fallbackUrls: ['https://commons.wikimedia.org/wiki/Special:FilePath/Mont_Saint-Michel_360_panorama.jpg']
    }
];
const OPEN_PANORAMA_POOL_SIZE = OPEN_PANORAMAS.length;
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
// ========= DOM ユーティリティ =========
function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Required element #${id} not found`);
    }
    return element;
}
function querySelector(root, selector) {
    return root.querySelector(selector);
}
// ========= ゲーム状態 =========
let map = null;
let guessMarker = null;
let answerMarker = null;
let line = null;
let streetViewPanorama = null;
let googleMapsLoadPromise = null;
let photoSphereViewer = null;
let googleMapsApiKey = (window.GOOGLE_MAPS_API_KEY || '').trim();
if (!googleMapsApiKey) {
    try {
        const storedKey = localStorage.getItem(KEY_STORAGE_KEY);
        if (storedKey) {
            googleMapsApiKey = storedKey;
            window.GOOGLE_MAPS_API_KEY = storedKey;
        }
    }
    catch (err) {
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
let openPanoramaTargetSize = OPEN_PANORAMA_POOL_SIZE;
function getTargetPoolSize() {
    const fallback = Math.min(TARGET_POOL_SIZE, openPanoramaTargetSize);
    return googleMapsApiKey ? TARGET_POOL_SIZE : fallback;
}
// ========= 初期化 =========
boot();
function boot() {
    initUI();
    initMap();
    updateViewerHint(googleMapsApiKey ? 'google' : 'photosphere');
    setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
    updateHud();
}
function initUI() {
    const roundsInput = getElementById('roundsInput');
    roundsInput.value = String(ROUNDS_PER_GAME);
    roundsInput.disabled = true;
    getElementById('poolLabel').textContent = `0 / ${getTargetPoolSize()}`;
    getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;
    getElementById('scoreLabel').textContent = '0';
    updateApiKeyUI();
    getElementById('apiKeySave').addEventListener('click', handleApiKeySave);
    getElementById('apiKeyClear').addEventListener('click', handleApiKeyClear);
    getElementById('apiKeyInput').addEventListener('keydown', (ev) => {
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
        if (hasGuessed)
            return;
        selectedLatLng = e.latlng;
        if (!guessMarker) {
            guessMarker = L.marker(e.latlng, { title: 'あなたの推測' }).addTo(map);
        }
        else {
            guessMarker.setLatLng(e.latlng);
        }
        getElementById('guessBtn').disabled = false;
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
        }
        else {
            localStorage.removeItem(KEY_STORAGE_KEY);
        }
    }
    catch (err) {
        console.warn('APIキーの保存に失敗しました', err);
    }
    if (!trimmed) {
        googleMapsLoadPromise = null;
    }
    POOL = [];
    updateApiKeyUI();
    updateHud();
    updateViewerHint(trimmed ? 'google' : 'photosphere');
}
function handleApiKeySave() {
    const input = getElementById('apiKeyInput');
    const value = input.value.trim();
    if (!value) {
        setApiKey('');
        alert('APIキーを未設定にしました。内蔵の 360° 画像のみでプレイします。');
        return;
    }
    setApiKey(value);
    alert('Google Street View を利用するための API キーを保存しました。');
}
function handleApiKeyClear() {
    setApiKey('');
    const input = getElementById('apiKeyInput');
    input.value = '';
    input.focus();
}
function updateApiKeyUI() {
    const input = getElementById('apiKeyInput');
    input.value = googleMapsApiKey;
    input.placeholder = googleMapsApiKey ? '設定済み（変更可）' : 'Google Maps API Key (任意)';
}
// ========= Google Maps 読み込み =========
async function ensureGoogleMapsReady() {
    var _a, _b, _c, _d;
    if ((_b = (_a = window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.StreetViewPanorama)
        return;
    if (!googleMapsApiKey) {
        throw new Error('Google Maps Platform の API キーが設定されていません。');
    }
    if (!googleMapsLoadPromise) {
        googleMapsLoadPromise = loadGoogleMapsScript(googleMapsApiKey);
    }
    await googleMapsLoadPromise;
    if (!((_d = (_c = window.google) === null || _c === void 0 ? void 0 : _c.maps) === null || _d === void 0 ? void 0 : _d.StreetViewPanorama)) {
        throw new Error('Google Maps JavaScript API の初期化に失敗しました。');
    }
}
function loadGoogleMapsScript(key) {
    var _a, _b;
    if ((_b = (_a = window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.StreetViewPanorama) {
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
async function initViewer(scene) {
    var _a;
    const panoContainer = getElementById('pano');
    if (!scene) {
        throw new Error('表示する候補が取得できませんでした。');
    }
    if (scene.type === 'google') {
        if (photoSphereViewer) {
            try {
                photoSphereViewer.destroy();
            }
            catch (err) {
                console.warn('Photo Sphere Viewer の破棄に失敗:', err);
            }
            photoSphereViewer = null;
            panoContainer.innerHTML = '';
        }
        await ensureGoogleMapsReady();
        if (!scene.panoId) {
            throw new Error('Street View パノラマ ID が取得できませんでした。');
        }
        if (!streetViewPanorama) {
            streetViewPanorama = new google.maps.StreetViewPanorama(panoContainer, {
                pano: scene.panoId,
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
        }
        else {
            streetViewPanorama.setPano(scene.panoId);
        }
        streetViewPanorama.setPov({ heading: 0, pitch: 0 });
        streetViewPanorama.setZoom(1);
        streetViewPanorama.setVisible(true);
    }
    else if (scene.type === 'photosphere') {
        if (streetViewPanorama) {
            try {
                streetViewPanorama.setVisible(false);
            }
            catch (err) {
                console.warn('Street View ビューアの非表示化に失敗:', err);
            }
            streetViewPanorama = null;
            panoContainer.innerHTML = '';
        }
        if (!((_a = window.PhotoSphereViewer) === null || _a === void 0 ? void 0 : _a.Viewer)) {
            throw new Error('Photo Sphere Viewer の読み込みに失敗しました。');
        }
        if (!scene.panoramaUrl) {
            throw new Error('360° 画像の URL が指定されていません。');
        }
        if (!photoSphereViewer) {
            photoSphereViewer = new PhotoSphereViewer.Viewer({
                container: panoContainer,
                panorama: scene.panoramaUrl,
                defaultLong: '0deg',
                touchmoveTwoFingers: true,
                mousewheelCtrlKey: false,
                navbar: ['zoom', 'fullscreen'],
                loadingTxt: '読み込み中…'
            });
        }
        else {
            await photoSphereViewer.setPanorama(scene.panoramaUrl, { showLoader: true });
        }
    }
    else {
        throw new Error('サポートされていないビューアタイプです。');
    }
    updateViewerHint(scene.type);
}
// ========= ユーティリティ =========
const toRad = (deg) => (deg * Math.PI) / 180;
function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c) / 1000;
}
function formatKm(km) {
    if (km < 1)
        return `${(km * 1000).toFixed(0)} m`;
    if (km < 100)
        return `${km.toFixed(1)} km`;
    return `${Math.round(km)} km`;
}
function scoreFromDistance(km) {
    const raw = 5000 * Math.exp(-km / 2000);
    return Math.max(0, Math.round(raw));
}
function shuffle(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
function updateHud() {
    getElementById('roundLabel').textContent = `${round} / ${ROUNDS}`;
    getElementById('scoreLabel').textContent = `${score}`;
    getElementById('poolLabel').textContent = `${POOL.length} / ${getTargetPoolSize()}`;
}
function setButtons({ startDisabled, guessDisabled, nextDisabled }) {
    getElementById('startBtn').disabled = startDisabled !== null && startDisabled !== void 0 ? startDisabled : false;
    getElementById('guessBtn').disabled = guessDisabled !== null && guessDisabled !== void 0 ? guessDisabled : true;
    getElementById('nextBtn').disabled = nextDisabled !== null && nextDisabled !== void 0 ? nextDisabled : true;
}
function updateViewerHint(type) {
    const panel = document.querySelector('.panel');
    if (!panel)
        return;
    panel.textContent =
        type === 'google'
            ? 'Google ストリートビュー：ドラッグで見回す／スクロールでズーム'
            : '360°ビュー：ドラッグで見回す／スクロールでズーム';
}
// ========= Google Street View から候補を作る =========
function randomPointInZone(zone) {
    const radiusMeters = Math.max(1000, Math.min((zone.radiusKm || 50) * 1000, STREET_VIEW_SEARCH_RADIUS));
    const t = 2 * Math.PI * Math.random();
    const u = Math.random();
    const r = Math.sqrt(u) * radiusMeters;
    const dx = r * Math.cos(t);
    const dy = r * Math.sin(t);
    const newLat = zone.lat + dy / 111320;
    const newLng = zone.lng + dx / (111320 * Math.cos(toRad(zone.lat)));
    return { lat: newLat, lng: newLng, radiusMeters };
}
async function fetchStreetViewMetadata(lat, lng, radiusMeters) {
    const params = new URLSearchParams({
        location: `${lat},${lng}`,
        radius: String(Math.min(radiusMeters, STREET_VIEW_SEARCH_RADIUS)),
        key: googleMapsApiKey,
        source: 'outdoor'
    });
    const response = await fetch(`${STREET_VIEW_METADATA_ENDPOINT}?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Street View metadata API returned ${response.status}`);
    }
    const data = await response.json();
    if (data.status !== 'OK') {
        return null;
    }
    return data;
}
async function loadStreetViewPanoramas(targetCount = getTargetPoolSize(), onProgress = () => { }) {
    var _a, _b;
    const zones = shuffle(STREET_VIEW_SAMPLE_ZONES);
    const selected = [];
    let attempts = 0;
    for (const zone of zones) {
        if (selected.length >= targetCount)
            break;
        for (let i = 0; i < MAX_METADATA_ATTEMPTS && selected.length < targetCount; i += 1) {
            attempts += 1;
            const { lat, lng, radiusMeters } = randomPointInZone(zone);
            try {
                const metadata = await fetchStreetViewMetadata(lat, lng, radiusMeters);
                if (!metadata || !((_a = metadata.location) === null || _a === void 0 ? void 0 : _a.lat) || !((_b = metadata.location) === null || _b === void 0 ? void 0 : _b.lng)) {
                    continue;
                }
                const location = metadata.location;
                const panoId = metadata.pano_id || metadata.panoId;
                if (!panoId)
                    continue;
                selected.push({
                    id: `gsv_${panoId}`,
                    type: 'google',
                    name: location.description || `${zone.name} 付近`,
                    lat: location.lat,
                    lng: location.lng,
                    panoId,
                    panoramaUrl: null,
                    credit: metadata.copyright || '© Google',
                    sourcePage: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.lat},${location.lng}&pano=${panoId}`
                });
                onProgress(Math.min(selected.length, targetCount), targetCount, attempts);
            }
            catch (err) {
                console.warn('Street View metadata fetch failed:', err);
            }
        }
    }
    return selected;
}
async function loadOpenPanoramas(targetCount = getTargetPoolSize(), onProgress = () => { }) {
    const poolSize = Math.min(targetCount, OPEN_PANORAMA_POOL_SIZE);
    const shuffled = shuffle(OPEN_PANORAMAS);
    const selected = [];
    let attempts = 0;
    for (const item of shuffled) {
        if (selected.length >= poolSize)
            break;
        attempts += 1;
        try {
            const panoramaUrl = await resolveOpenPanoramaUrl(item);
            if (!panoramaUrl)
                continue;
            if (/\.png($|\?)/i.test(panoramaUrl)) {
                console.warn('Skipping PNG panorama URL', panoramaUrl);
                continue;
            }
            selected.push({
                id: `open_${item.id}`,
                type: 'photosphere',
                name: item.name,
                lat: item.lat,
                lng: item.lng,
                credit: item.credit,
                sourcePage: item.sourcePage,
                panoId: null,
                panoramaUrl
            });
            onProgress(selected.length, poolSize, attempts);
        }
        catch (err) {
            console.warn(`Failed to resolve panorama for ${item.id}:`, err);
        }
    }
    return selected;
}
async function resolveOpenPanoramaUrl(item) {
    if (item.panoramaUrl)
        return item.panoramaUrl;
    if (item.wikimediaFile) {
        try {
            return await resolveWikimediaImageUrl(item.wikimediaFile);
        }
        catch (err) {
            const fallbackUrl = pickFallbackUrl(item);
            if (fallbackUrl) {
                console.warn(`Falling back to alternate panorama for ${item.id}:`, err);
                return fallbackUrl;
            }
            throw err;
        }
    }
    const fallbackUrl = pickFallbackUrl(item);
    if (fallbackUrl)
        return fallbackUrl;
    throw new Error(`No panorama resolver available for ${item.id}`);
}
function pickFallbackUrl(item) {
    if (!Array.isArray(item.fallbackUrls))
        return null;
    return item.fallbackUrls.find((url) => url && !/\.png($|\?)/i.test(url)) || null;
}
async function resolveWikimediaImageUrl(fileName) {
    var _a, _b, _c;
    if (wikimediaImageCache.has(fileName)) {
        return wikimediaImageCache.get(fileName);
    }
    const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        origin: '*',
        prop: 'imageinfo',
        iiprop: 'url',
        titles: `File:${fileName}`
    });
    const response = await fetch(`${WIKIMEDIA_IMAGEINFO_ENDPOINT}?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Wikimedia API responded with ${response.status}`);
    }
    const payload = (await response.json());
    const pages = (_a = payload === null || payload === void 0 ? void 0 : payload.query) === null || _a === void 0 ? void 0 : _a.pages;
    const pageList = Array.isArray(pages) ? pages : Object.values(pages || {});
    const imageInfo = (_c = (_b = pageList[0]) === null || _b === void 0 ? void 0 : _b.imageinfo) === null || _c === void 0 ? void 0 : _c[0];
    const imageUrl = imageInfo === null || imageInfo === void 0 ? void 0 : imageInfo.url;
    if (!imageUrl) {
        throw new Error(`Image URL not found for File:${fileName}`);
    }
    if (/\.png($|\?)/i.test(imageUrl)) {
        throw new Error(`PNG assets are not allowed (${imageUrl})`);
    }
    wikimediaImageCache.set(fileName, imageUrl);
    return imageUrl;
}
async function ensurePool() {
    if (POOL.length >= getTargetPoolSize())
        return;
    const overlay = getElementById('loadingOverlay');
    const bar = getElementById('loadingBar');
    const text = getElementById('loadingText');
    const title = document.getElementById('loadingTitle');
    const note = document.getElementById('loadingNote');
    overlay.style.display = 'grid';
    bar.style.width = '0%';
    text.textContent = '候補を探索中…';
    try {
        const targetCount = getTargetPoolSize();
        let results = [];
        if (googleMapsApiKey) {
            if (title)
                title.textContent = 'Google Street View から候補を収集中…';
            if (note) {
                note.textContent = '※ 利用には Google Maps Platform の API キーが必要です';
                note.style.display = '';
            }
            results = await loadStreetViewPanoramas(targetCount, (ok, target, attempts) => {
                bar.style.width = `${Math.round((ok / target) * 100)}%`;
                text.textContent = `抽出 ${ok} / ${target}　(試行:${attempts})`;
            });
            if (results.length < targetCount) {
                throw new Error('十分な Street View パノラマを見つけられませんでした。');
            }
        }
        else {
            if (title)
                title.textContent = 'オープンデータの 360° 画像から候補を準備中…';
            if (note) {
                note.textContent = '※ APIキーなしで遊べるサンプル画像セットを使用します';
                note.style.display = '';
            }
            results = await loadOpenPanoramas(targetCount, (ok, target) => {
                bar.style.width = `${Math.round((ok / target) * 100)}%`;
                text.textContent = `読み込み ${ok} / ${target}`;
            });
            openPanoramaTargetSize = results.length || OPEN_PANORAMA_POOL_SIZE;
            if (results.length === 0) {
                throw new Error('十分な 360° 画像候補を用意できませんでした。');
            }
        }
        POOL = shuffle(results);
        updateHud();
    }
    finally {
        overlay.style.display = 'none';
    }
}
// ========= ラウンド管理 =========
async function startGame() {
    getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;
    setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: true });
    try {
        await ensurePool();
    }
    catch (err) {
        console.error('候補の準備に失敗:', err);
        alert(err.message || '候補の取得に失敗しました。ネットワーク状況や API キー設定を確認してください。');
        setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
        return;
    }
    order = shuffle([...POOL]);
    ROUNDS = Math.min(ROUNDS_PER_GAME, order.length);
    round = 0;
    score = 0;
    updateHud();
    if (ROUNDS === 0) {
        alert('利用可能な候補が見つかりませんでした。');
        setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
        return;
    }
    try {
        await nextRound();
    }
    catch (err) {
        console.error('最初のラウンドの開始に失敗:', err);
        alert(err.message || 'パノラマの読み込みに失敗しました。ネットワーク状況や API キー設定を確認してください。');
        setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
    }
}
async function nextRound() {
    var _a;
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
    getElementById('resultOverlay').style.display = 'none';
    if (round >= ROUNDS) {
        alert(`ゲーム終了！ 総得点: ${score} pt`);
        setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
        return;
    }
    while (order.length > 0) {
        const candidate = (_a = order.shift()) !== null && _a !== void 0 ? _a : null;
        try {
            await initViewer(candidate);
            current = candidate;
            round += 1;
            updateHud();
            setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: true });
            return;
        }
        catch (err) {
            console.error('パノラマの読み込みに失敗:', err);
        }
    }
    current = null;
    ROUNDS = round;
    updateHud();
    alert('利用可能なパノラマを読み込めませんでした。ゲームを終了します。');
    setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
}
function makeGuess() {
    if (!selectedLatLng || !current)
        return;
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
    getElementById('resultTitle').textContent = `ラウンド ${round} の結果`;
    getElementById('distLabel').textContent = formatKm(dKm);
    getElementById('pointsLabel').textContent = pts.toString();
    const nameLine = current.name.length > 120 ? `${current.name.slice(0, 117)}…` : current.name;
    getElementById('answerLabel').innerHTML = `${nameLine}`;
    const creditLabel = document.getElementById('creditLabel');
    if (creditLabel) {
        const linkLabel = current.type === 'google' ? 'Google マップで見る' : 'ソースを開く';
        const linkPart = current.sourcePage
            ? ` · <a href="${current.sourcePage}" target="_blank" rel="noopener">${linkLabel}</a>`
            : '';
        creditLabel.innerHTML = `Credit: ${current.credit}${linkPart}`;
    }
    getElementById('resultOverlay').style.display = 'grid';
    setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: false });
    getElementById('nextBtn').textContent = round === ROUNDS ? 'ゲーム終了 ▶' : '次のラウンド ▶';
}
function resetGame() {
    round = 0;
    score = 0;
    current = null;
    ROUNDS = ROUNDS_PER_GAME;
    order = [];
    updateHud();
    const panoContainer = getElementById('pano');
    if (streetViewPanorama) {
        try {
            streetViewPanorama.setVisible(false);
        }
        catch (err) {
            console.warn('Street View ビューアのリセット中にエラー:', err);
        }
        streetViewPanorama = null;
    }
    if (photoSphereViewer) {
        try {
            photoSphereViewer.destroy();
        }
        catch (err) {
            console.warn('Photo Sphere Viewer のリセット中にエラー:', err);
        }
        photoSphereViewer = null;
    }
    panoContainer.innerHTML = '';
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
    getElementById('resultOverlay').style.display = 'none';
    getElementById('roundLabel').textContent = `0 / ${ROUNDS_PER_GAME}`;
    updateViewerHint(googleMapsApiKey ? 'google' : 'photosphere');
}
// ========= イベント =========
getElementById('startBtn').addEventListener('click', () => {
    startGame().catch((err) => {
        console.error('ゲーム開始に失敗:', err);
        alert(err.message || 'ゲームを開始できませんでした。');
    });
});
getElementById('guessBtn').addEventListener('click', makeGuess);
getElementById('nextBtn').addEventListener('click', () => {
    nextRound().catch((err) => {
        console.error('ラウンドの読み込みに失敗:', err);
        alert(err.message || 'パノラマの読み込みに失敗しました。ネットワーク状況や API キー設定を確認してください。');
        setButtons({ startDisabled: true, guessDisabled: true, nextDisabled: false });
    });
});
getElementById('resetBtn').addEventListener('click', resetGame);
getElementById('closeResult').addEventListener('click', () => {
    getElementById('resultOverlay').style.display = 'none';
});
setButtons({ startDisabled: false, guessDisabled: true, nextDisabled: true });
updateHud();
