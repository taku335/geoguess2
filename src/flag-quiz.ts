/* eslint-disable no-alert */
interface CountryFlag {
  name: string;
  flag: string;
}

interface FlagQuizQuestion {
  id: string;
  country: CountryFlag;
  options: CountryFlag[];
  correctIndex: number;
}

const OPTIONS_PER_FLAG_QUESTION = 4;

const COUNTRY_FLAGS: CountryFlag[] = [
  { name: 'アフガニスタン', flag: '🇦🇫' },
  { name: 'アルバニア', flag: '🇦🇱' },
  { name: 'アルジェリア', flag: '🇩🇿' },
  { name: 'アンドラ', flag: '🇦🇩' },
  { name: 'アンゴラ', flag: '🇦🇴' },
  { name: 'アンティグア・バーブーダ', flag: '🇦🇬' },
  { name: 'アルゼンチン', flag: '🇦🇷' },
  { name: 'アルメニア', flag: '🇦🇲' },
  { name: 'オーストラリア', flag: '🇦🇺' },
  { name: 'オーストリア', flag: '🇦🇹' },
  { name: 'アゼルバイジャン', flag: '🇦🇿' },
  { name: 'バハマ', flag: '🇧🇸' },
  { name: 'バーレーン', flag: '🇧🇭' },
  { name: 'バングラデシュ', flag: '🇧🇩' },
  { name: 'バルバドス', flag: '🇧🇧' },
  { name: 'ベラルーシ', flag: '🇧🇾' },
  { name: 'ベルギー', flag: '🇧🇪' },
  { name: 'ベリーズ', flag: '🇧🇿' },
  { name: 'ベナン', flag: '🇧🇯' },
  { name: 'ブータン', flag: '🇧🇹' },
  { name: 'ボリビア', flag: '🇧🇴' },
  { name: 'ボスニア・ヘルツェゴビナ', flag: '🇧🇦' },
  { name: 'ボツワナ', flag: '🇧🇼' },
  { name: 'ブラジル', flag: '🇧🇷' },
  { name: 'ブルネイ', flag: '🇧🇳' },
  { name: 'ブルガリア', flag: '🇧🇬' },
  { name: 'ブルキナファソ', flag: '🇧🇫' },
  { name: 'ブルンジ', flag: '🇧🇮' },
  { name: 'カーボベルデ', flag: '🇨🇻' },
  { name: 'カンボジア', flag: '🇰🇭' },
  { name: 'カメルーン', flag: '🇨🇲' },
  { name: 'カナダ', flag: '🇨🇦' },
  { name: '中央アフリカ共和国', flag: '🇨🇫' },
  { name: 'チャド', flag: '🇹🇩' },
  { name: 'チリ', flag: '🇨🇱' },
  { name: '中国', flag: '🇨🇳' },
  { name: 'コロンビア', flag: '🇨🇴' },
  { name: 'コモロ', flag: '🇰🇲' },
  { name: 'コンゴ共和国', flag: '🇨🇬' },
  { name: 'コンゴ民主共和国', flag: '🇨🇩' },
  { name: 'コスタリカ', flag: '🇨🇷' },
  { name: 'コートジボワール', flag: '🇨🇮' },
  { name: 'クロアチア', flag: '🇭🇷' },
  { name: 'キューバ', flag: '🇨🇺' },
  { name: 'キプロス', flag: '🇨🇾' },
  { name: 'チェコ', flag: '🇨🇿' },
  { name: 'デンマーク', flag: '🇩🇰' },
  { name: 'ジブチ', flag: '🇩🇯' },
  { name: 'ドミニカ国', flag: '🇩🇲' },
  { name: 'ドミニカ共和国', flag: '🇩🇴' },
  { name: 'エクアドル', flag: '🇪🇨' },
  { name: 'エジプト', flag: '🇪🇬' },
  { name: 'エルサルバドル', flag: '🇸🇻' },
  { name: '赤道ギニア', flag: '🇬🇶' },
  { name: 'エリトリア', flag: '🇪🇷' },
  { name: 'エストニア', flag: '🇪🇪' },
  { name: 'エスワティニ', flag: '🇸🇿' },
  { name: 'エチオピア', flag: '🇪🇹' },
  { name: 'フィジー', flag: '🇫🇯' },
  { name: 'フィンランド', flag: '🇫🇮' },
  { name: 'フランス', flag: '🇫🇷' },
  { name: 'ガボン', flag: '🇬🇦' },
  { name: 'ガンビア', flag: '🇬🇲' },
  { name: 'ジョージア', flag: '🇬🇪' },
  { name: 'ドイツ', flag: '🇩🇪' },
  { name: 'ガーナ', flag: '🇬🇭' },
  { name: 'ギリシャ', flag: '🇬🇷' },
  { name: 'グレナダ', flag: '🇬🇩' },
  { name: 'グアテマラ', flag: '🇬🇹' },
  { name: 'ギニア', flag: '🇬🇳' },
  { name: 'ギニアビサウ', flag: '🇬🇼' },
  { name: 'ガイアナ', flag: '🇬🇾' },
  { name: 'ハイチ', flag: '🇭🇹' },
  { name: 'ホンジュラス', flag: '🇭🇳' },
  { name: 'ハンガリー', flag: '🇭🇺' },
  { name: 'アイスランド', flag: '🇮🇸' },
  { name: 'インド', flag: '🇮🇳' },
  { name: 'インドネシア', flag: '🇮🇩' },
  { name: 'イラン', flag: '🇮🇷' },
  { name: 'イラク', flag: '🇮🇶' },
  { name: 'アイルランド', flag: '🇮🇪' },
  { name: 'イスラエル', flag: '🇮🇱' },
  { name: 'イタリア', flag: '🇮🇹' },
  { name: 'ジャマイカ', flag: '🇯🇲' },
  { name: '日本', flag: '🇯🇵' },
  { name: 'ヨルダン', flag: '🇯🇴' },
  { name: 'カザフスタン', flag: '🇰🇿' },
  { name: 'ケニア', flag: '🇰🇪' },
  { name: 'キリバス', flag: '🇰🇮' },
  { name: 'クウェート', flag: '🇰🇼' },
  { name: 'キルギス', flag: '🇰🇬' },
  { name: 'ラオス', flag: '🇱🇦' },
  { name: 'ラトビア', flag: '🇱🇻' },
  { name: 'レバノン', flag: '🇱🇧' },
  { name: 'レソト', flag: '🇱🇸' },
  { name: 'リベリア', flag: '🇱🇷' },
  { name: 'リビア', flag: '🇱🇾' },
  { name: 'リヒテンシュタイン', flag: '🇱🇮' },
  { name: 'リトアニア', flag: '🇱🇹' },
  { name: 'ルクセンブルク', flag: '🇱🇺' },
  { name: 'マダガスカル', flag: '🇲🇬' },
  { name: 'マラウイ', flag: '🇲🇼' },
  { name: 'マレーシア', flag: '🇲🇾' },
  { name: 'モルディブ', flag: '🇲🇻' },
  { name: 'マリ', flag: '🇲🇱' },
  { name: 'マルタ', flag: '🇲🇹' },
  { name: 'マーシャル諸島', flag: '🇲🇭' },
  { name: 'モーリタニア', flag: '🇲🇷' },
  { name: 'モーリシャス', flag: '🇲🇺' },
  { name: 'メキシコ', flag: '🇲🇽' },
  { name: 'ミクロネシア連邦', flag: '🇫🇲' },
  { name: 'モルドバ', flag: '🇲🇩' },
  { name: 'モナコ', flag: '🇲🇨' },
  { name: 'モンゴル', flag: '🇲🇳' },
  { name: 'モンテネグロ', flag: '🇲🇪' },
  { name: 'モロッコ', flag: '🇲🇦' },
  { name: 'モザンビーク', flag: '🇲🇿' },
  { name: 'ミャンマー', flag: '🇲🇲' },
  { name: 'ナミビア', flag: '🇳🇦' },
  { name: 'ナウル', flag: '🇳🇷' },
  { name: 'ネパール', flag: '🇳🇵' },
  { name: 'オランダ', flag: '🇳🇱' },
  { name: 'ニュージーランド', flag: '🇳🇿' },
  { name: 'ニカラグア', flag: '🇳🇮' },
  { name: 'ニジェール', flag: '🇳🇪' },
  { name: 'ナイジェリア', flag: '🇳🇬' },
  { name: '北朝鮮', flag: '🇰🇵' },
  { name: '北マケドニア', flag: '🇲🇰' },
  { name: 'ノルウェー', flag: '🇳🇴' },
  { name: 'オマーン', flag: '🇴🇲' },
  { name: 'パキスタン', flag: '🇵🇰' },
  { name: 'パラオ', flag: '🇵🇼' },
  { name: 'パナマ', flag: '🇵🇦' },
  { name: 'パプアニューギニア', flag: '🇵🇬' },
  { name: 'パラグアイ', flag: '🇵🇾' },
  { name: 'ペルー', flag: '🇵🇪' },
  { name: 'フィリピン', flag: '🇵🇭' },
  { name: 'ポーランド', flag: '🇵🇱' },
  { name: 'ポルトガル', flag: '🇵🇹' },
  { name: 'カタール', flag: '🇶🇦' },
  { name: 'ルーマニア', flag: '🇷🇴' },
  { name: 'ロシア', flag: '🇷🇺' },
  { name: 'ルワンダ', flag: '🇷🇼' },
  { name: 'セントクリストファー・ネーヴィス', flag: '🇰🇳' },
  { name: 'セントルシア', flag: '🇱🇨' },
  { name: 'セントビンセントおよびグレナディーン諸島', flag: '🇻🇨' },
  { name: 'サモア', flag: '🇼🇸' },
  { name: 'サンマリノ', flag: '🇸🇲' },
  { name: 'サントメ・プリンシペ', flag: '🇸🇹' },
  { name: 'サウジアラビア', flag: '🇸🇦' },
  { name: 'セネガル', flag: '🇸🇳' },
  { name: 'セルビア', flag: '🇷🇸' },
  { name: 'セーシェル', flag: '🇸🇨' },
  { name: 'シエラレオネ', flag: '🇸🇱' },
  { name: 'シンガポール', flag: '🇸🇬' },
  { name: 'スロバキア', flag: '🇸🇰' },
  { name: 'スロベニア', flag: '🇸🇮' },
  { name: 'ソロモン諸島', flag: '🇸🇧' },
  { name: 'ソマリア', flag: '🇸🇴' },
  { name: '南アフリカ共和国', flag: '🇿🇦' },
  { name: '韓国', flag: '🇰🇷' },
  { name: '南スーダン', flag: '🇸🇸' },
  { name: 'スペイン', flag: '🇪🇸' },
  { name: 'スリランカ', flag: '🇱🇰' },
  { name: 'スーダン', flag: '🇸🇩' },
  { name: 'スリナム', flag: '🇸🇷' },
  { name: 'スウェーデン', flag: '🇸🇪' },
  { name: 'スイス', flag: '🇨🇭' },
  { name: 'シリア', flag: '🇸🇾' },
  { name: 'タジキスタン', flag: '🇹🇯' },
  { name: 'タンザニア', flag: '🇹🇿' },
  { name: 'タイ', flag: '🇹🇭' },
  { name: '東ティモール', flag: '🇹🇱' },
  { name: 'トーゴ', flag: '🇹🇬' },
  { name: 'トンガ', flag: '🇹🇴' },
  { name: 'トリニダード・トバゴ', flag: '🇹🇹' },
  { name: 'チュニジア', flag: '🇹🇳' },
  { name: 'トルコ', flag: '🇹🇷' },
  { name: 'トルクメニスタン', flag: '🇹🇲' },
  { name: 'ツバル', flag: '🇹🇻' },
  { name: 'ウガンダ', flag: '🇺🇬' },
  { name: 'ウクライナ', flag: '🇺🇦' },
  { name: 'アラブ首長国連邦', flag: '🇦🇪' },
  { name: 'イギリス', flag: '🇬🇧' },
  { name: 'アメリカ合衆国', flag: '🇺🇸' },
  { name: 'ウルグアイ', flag: '🇺🇾' },
  { name: 'ウズベキスタン', flag: '🇺🇿' },
  { name: 'バヌアツ', flag: '🇻🇺' },
  { name: 'バチカン市国', flag: '🇻🇦' },
  { name: 'ベネズエラ', flag: '🇻🇪' },
  { name: 'ベトナム', flag: '🇻🇳' },
  { name: 'イエメン', flag: '🇾🇪' },
  { name: 'ザンビア', flag: '🇿🇲' },
  { name: 'ジンバブエ', flag: '🇿🇼' }
];

const COUNTRY_FLAG_MAP = new Map<string, CountryFlag>(
  COUNTRY_FLAGS.map((entry) => [entry.name, entry])
);

const ADDITIONAL_FLAGS: CountryFlag[] = [
  { name: '台湾（中華民国）', flag: '🇹🇼' },
  { name: 'コソボ', flag: '🇽🇰' },
  { name: 'パレスチナ', flag: '🇵🇸' },
  { name: '西サハラ', flag: '🇪🇭' },
  { name: 'クック諸島', flag: '🇨🇰' },
  { name: 'ニウエ', flag: '🇳🇺' },
  { name: 'マカオ', flag: '🇲🇴' },
  { name: '香港', flag: '🇭🇰' }
];

const ALL_FLAG_OPTIONS: CountryFlag[] = [...COUNTRY_FLAGS];

ADDITIONAL_FLAGS.forEach((flag) => {
  if (!COUNTRY_FLAG_MAP.has(flag.name)) {
    COUNTRY_FLAG_MAP.set(flag.name, flag);
    ALL_FLAG_OPTIONS.push(flag);
  }
});

const flagQuizElement = document.getElementById('flagQuiz') as HTMLDivElement | null;
const submitFlagQuizButton = document.getElementById('submitFlagQuiz') as HTMLButtonElement | null;
const retryFlagQuizButton = document.getElementById('retryFlagQuiz') as HTMLButtonElement | null;
const backToMenuButton = document.getElementById('backToFlagQuizMenu') as HTMLButtonElement | null;
const flagResultElement = document.getElementById('flagQuizResult') as HTMLDivElement | null;
const flagExplanationsElement = document.getElementById('flagQuizExplanations') as HTMLDivElement | null;
const flagProgressElement = document.getElementById('flagQuizProgress') as HTMLDivElement | null;
const flagStatusElement = document.getElementById('flagQuizMessage') as HTMLDivElement | null;
const flagQuizMenuElement = document.getElementById('flagQuizMenu') as HTMLDivElement | null;
const flagQuizMenuContentElement = document.getElementById('flagQuizMenuContent') as HTMLDivElement | null;
const flagQuizPlayAreaElement = document.getElementById('flagQuizPlayArea') as HTMLDivElement | null;

if (
  !flagQuizElement ||
  !flagResultElement ||
  !flagExplanationsElement ||
  !flagQuizMenuElement ||
  !flagQuizMenuContentElement ||
  !flagQuizPlayAreaElement
) {
  throw new Error('Flag quiz page is missing required elements.');
}

const flagQuizRoot = flagQuizElement;
const flagResultBox = flagResultElement;
const flagExplanationsBox = flagExplanationsElement;
const flagQuizMenuBox = flagQuizMenuElement;
const flagQuizMenuContentBox = flagQuizMenuContentElement;
const flagQuizPlayAreaBox = flagQuizPlayAreaElement;

let flagQuizQuestions: FlagQuizQuestion[] = [];
let currentFlagQuestionIndex = 0;
const flagUserSelections: number[] = [];
let activeFlagQuizMode: FlagQuizMode | null = null;

function shuffleArray<T>(source: readonly T[]): T[] {
  const array = [...source];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type FlagQuizModeGroup = 'global' | 'region-standard' | 'region-detailed' | 'special';

interface FlagQuizMode {
  id: string;
  group: FlagQuizModeGroup;
  label: string;
  description: string;
  questionCount: number;
  pool?: CountryFlag[];
  optionPool?: CountryFlag[];
  questionBuilder?: () => FlagQuizQuestion[];
}

function resolveCountryFlags(names: readonly string[]): CountryFlag[] {
  const resolved: CountryFlag[] = [];
  const missing: string[] = [];

  names.forEach((name) => {
    const entry = COUNTRY_FLAG_MAP.get(name);
    if (entry) {
      resolved.push(entry);
    } else {
      missing.push(name);
    }
  });

  if (missing.length > 0) {
    console.warn(`Flag dataset is missing entries for: ${missing.join(', ')}`);
  }

  return resolved;
}

const REGION_STANDARD_POOLS = {
  asia: resolveCountryFlags([
    'アフガニスタン',
    'アルメニア',
    'アゼルバイジャン',
    'バーレーン',
    'バングラデシュ',
    'ブータン',
    'ブルネイ',
    'カンボジア',
    '中国',
    'キプロス',
    'ジョージア',
    'インド',
    'インドネシア',
    'イラン',
    'イラク',
    'イスラエル',
    '日本',
    'ヨルダン',
    'カザフスタン',
    'クウェート',
    'キルギス',
    'ラオス',
    'レバノン',
    'マレーシア',
    'モルディブ',
    'モンゴル',
    'ミャンマー',
    'ネパール',
    '北朝鮮',
    'オマーン',
    'パキスタン',
    'フィリピン',
    'カタール',
    'サウジアラビア',
    'シンガポール',
    '韓国',
    'スリランカ',
    'シリア',
    'タジキスタン',
    'タイ',
    '東ティモール',
    'トルクメニスタン',
    'アラブ首長国連邦',
    'ウズベキスタン',
    'ベトナム',
    'イエメン'
  ]),
  oceania: resolveCountryFlags([
    'オーストラリア',
    'フィジー',
    'キリバス',
    'マーシャル諸島',
    'ミクロネシア連邦',
    'ナウル',
    'ニュージーランド',
    'パラオ',
    'パプアニューギニア',
    'サモア',
    'ソロモン諸島',
    'トンガ',
    'ツバル',
    'バヌアツ'
  ]),
  europe: resolveCountryFlags([
    'アルバニア',
    'アンドラ',
    'オーストリア',
    'ベラルーシ',
    'ベルギー',
    'ボスニア・ヘルツェゴビナ',
    'ブルガリア',
    'クロアチア',
    'キプロス',
    'チェコ',
    'デンマーク',
    'エストニア',
    'フィンランド',
    'フランス',
    'ドイツ',
    'ギリシャ',
    'ハンガリー',
    'アイスランド',
    'アイルランド',
    'イタリア',
    'ラトビア',
    'リヒテンシュタイン',
    'リトアニア',
    'ルクセンブルク',
    'マルタ',
    'モルドバ',
    'モナコ',
    'モンテネグロ',
    '北マケドニア',
    'オランダ',
    'ノルウェー',
    'ポーランド',
    'ポルトガル',
    'ルーマニア',
    'ロシア',
    'サンマリノ',
    'セルビア',
    'スロバキア',
    'スロベニア',
    'スペイン',
    'スウェーデン',
    'スイス',
    'ウクライナ',
    'イギリス',
    'バチカン市国'
  ]),
  africa: resolveCountryFlags([
    'アルジェリア',
    'アンゴラ',
    'ベナン',
    'ボツワナ',
    'ブルキナファソ',
    'ブルンジ',
    'カーボベルデ',
    'カメルーン',
    '中央アフリカ共和国',
    'チャド',
    'コモロ',
    'コンゴ共和国',
    'コンゴ民主共和国',
    'ジブチ',
    'エジプト',
    '赤道ギニア',
    'エリトリア',
    'エスワティニ',
    'エチオピア',
    'ガボン',
    'ガンビア',
    'ガーナ',
    'ギニア',
    'ギニアビサウ',
    'コートジボワール',
    'ケニア',
    'レソト',
    'リベリア',
    'リビア',
    'マダガスカル',
    'マラウイ',
    'マリ',
    'モーリタニア',
    'モーリシャス',
    'モロッコ',
    'モザンビーク',
    'ナミビア',
    'ニジェール',
    'ナイジェリア',
    'ルワンダ',
    'サントメ・プリンシペ',
    'セネガル',
    'セーシェル',
    'シエラレオネ',
    'ソマリア',
    '南アフリカ共和国',
    '南スーダン',
    'スーダン',
    'タンザニア',
    'トーゴ',
    'チュニジア',
    'ウガンダ',
    'ザンビア',
    'ジンバブエ'
  ]),
  americas: resolveCountryFlags([
    'アンティグア・バーブーダ',
    'バハマ',
    'バルバドス',
    'ベリーズ',
    'カナダ',
    'コスタリカ',
    'キューバ',
    'ドミニカ国',
    'ドミニカ共和国',
    'エルサルバドル',
    'グレナダ',
    'グアテマラ',
    'ハイチ',
    'ホンジュラス',
    'ジャマイカ',
    'メキシコ',
    'ニカラグア',
    'パナマ',
    'セントクリストファー・ネーヴィス',
    'セントルシア',
    'セントビンセントおよびグレナディーン諸島',
    'トリニダード・トバゴ',
    'アメリカ合衆国',
    'アルゼンチン',
    'ボリビア',
    'ブラジル',
    'チリ',
    'コロンビア',
    'エクアドル',
    'ガイアナ',
    'パラグアイ',
    'ペルー',
    'スリナム',
    'ウルグアイ',
    'ベネズエラ'
  ]),
  others: resolveCountryFlags([
    'アンティグア・バーブーダ',
    'ブータン',
    'ボツワナ',
    'ブルンジ',
    'カーボベルデ',
    'ドミニカ国',
    'フィジー',
    'ガボン',
    'キリバス',
    'ラオス',
    'レソト',
    'リヒテンシュタイン',
    'ルクセンブルク',
    'マラウイ',
    'モルディブ',
    'モルドバ',
    'モンゴル',
    'ナミビア',
    'サントメ・プリンシペ',
    'セーシェル'
  ])
} as const;

const REGION_DETAILED_POOLS = {
  northCentralAmerica: resolveCountryFlags([
    'カナダ',
    'アメリカ合衆国',
    'メキシコ',
    'ベリーズ',
    'コスタリカ',
    'エルサルバドル',
    'グアテマラ',
    'ホンジュラス',
    'ニカラグア',
    'パナマ',
    'バハマ',
    'キューバ',
    'ドミニカ共和国',
    'ハイチ',
    'ジャマイカ',
    'トリニダード・トバゴ',
    'グレナダ',
    'セントルシア',
    'セントビンセントおよびグレナディーン諸島',
    'アンティグア・バーブーダ',
    'セントクリストファー・ネーヴィス',
    'バルバドス',
    'ドミニカ国'
  ]),
  southAmerica: resolveCountryFlags([
    'アルゼンチン',
    'ボリビア',
    'ブラジル',
    'チリ',
    'コロンビア',
    'エクアドル',
    'ガイアナ',
    'パラグアイ',
    'ペルー',
    'スリナム',
    'ウルグアイ',
    'ベネズエラ'
  ]),
  middleEastArab: resolveCountryFlags([
    'バーレーン',
    'イラン',
    'イラク',
    'イスラエル',
    'ヨルダン',
    'クウェート',
    'レバノン',
    'オマーン',
    'カタール',
    'サウジアラビア',
    'シリア',
    'トルコ',
    'アラブ首長国連邦',
    'イエメン',
    'パレスチナ'
  ]),
  nordicBaltic: resolveCountryFlags([
    'デンマーク',
    'エストニア',
    'フィンランド',
    'アイスランド',
    'ラトビア',
    'リトアニア',
    'ノルウェー',
    'スウェーデン'
  ]),
  caucasusCentralAsia: resolveCountryFlags([
    'アルメニア',
    'アゼルバイジャン',
    'ジョージア',
    'カザフスタン',
    'キルギス',
    'タジキスタン',
    'トルクメニスタン',
    'ウズベキスタン'
  ])
} as const;

const NON_UN_MEMBER_FLAGS = resolveCountryFlags([
  '台湾（中華民国）',
  'コソボ',
  'パレスチナ',
  '西サハラ',
  'クック諸島',
  'ニウエ',
  'マカオ',
  '香港'
]);

const SIMILAR_FLAG_SETS: readonly string[][] = [
  ['ルーマニア', 'チャド', 'モルドバ', 'アンドラ'],
  ['アイルランド', 'コートジボワール', 'イタリア', 'ハンガリー'],
  ['インドネシア', 'モナコ', 'ポーランド', 'シンガポール'],
  ['マリ', 'セネガル', 'カメルーン', 'ギニア'],
  ['ノルウェー', 'アイスランド', 'フィンランド', 'デンマーク'],
  ['オーストラリア', 'ニュージーランド', 'フィジー', 'イギリス'],
  ['グアテマラ', 'エルサルバドル', 'ニカラグア', 'ホンジュラス']
];

const FLAG_QUIZ_MODE_GROUPS: Record<FlagQuizModeGroup, { title: string; description?: string; order: number }> = {
  global: {
    title: '人気のモード',
    description: '全世界の国旗を対象にした定番セットです。',
    order: 1
  },
  'region-standard': {
    title: '地域別クイズ（標準）',
    description: 'ご要望いただいた地域区分ごとに5問ずつ挑戦できます。',
    order: 2
  },
  'region-detailed': {
    title: '地域別クイズ（おすすめの細分化）',
    description: '北・中米と南米を分け、中東や北欧など学習しやすいまとまりで出題します。',
    order: 3
  },
  special: {
    title: 'テーマ別チャレンジ',
    description: '似ている国旗や国連未承認国など、ひと味違うモードです。',
    order: 4
  }
};

function createSimilarFlagQuestions(questionCount: number): FlagQuizQuestion[] {
  const pickedSets = shuffleArray(SIMILAR_FLAG_SETS);
  const questions: FlagQuizQuestion[] = [];

  for (let i = 0; i < pickedSets.length && questions.length < questionCount; i += 1) {
    const options = resolveCountryFlags(pickedSets[i]);
    if (options.length < 2) {
      continue;
    }

    const answer = options[Math.floor(Math.random() * options.length)];
    const shuffledOptions = shuffleArray(options);
    const correctIndex = shuffledOptions.findIndex((option) => option.name === answer.name);

    questions.push({
      id: `flag-question-similar-${questions.length + 1}`,
      country: answer,
      options: shuffledOptions,
      correctIndex
    });
  }

  return questions;
}

const FLAG_QUIZ_MODES: FlagQuizMode[] = [
  {
    id: 'global-10',
    group: 'global',
    label: '10問連続クイズ（全世界）',
    description: '世界中の国旗からランダムに10問出題します。',
    questionCount: 10,
    pool: COUNTRY_FLAGS
  },
  {
    id: 'global-5',
    group: 'global',
    label: '5問連続クイズ（全世界）',
    description: '忙しいときにぴったりのショートバージョンです。',
    questionCount: 5,
    pool: COUNTRY_FLAGS
  },
  {
    id: 'region-asia',
    group: 'region-standard',
    label: 'アジア編（5問）',
    description: 'アジア諸国の国旗から5問出題します。',
    questionCount: 5,
    pool: REGION_STANDARD_POOLS.asia
  },
  {
    id: 'region-oceania',
    group: 'region-standard',
    label: 'オセアニア編（5問）',
    description: '太平洋の島国やオーストラリア・ニュージーランドを中心に出題します。',
    questionCount: 5,
    pool: REGION_STANDARD_POOLS.oceania
  },
  {
    id: 'region-europe',
    group: 'region-standard',
    label: 'ヨーロッパ編（5問）',
    description: 'ヨーロッパの国旗からピックアップした5問に挑戦。',
    questionCount: 5,
    pool: REGION_STANDARD_POOLS.europe
  },
  {
    id: 'region-africa',
    group: 'region-standard',
    label: 'アフリカ編（5問）',
    description: 'アフリカ大陸の国旗を集中的に学べます。',
    questionCount: 5,
    pool: REGION_STANDARD_POOLS.africa
  },
  {
    id: 'region-americas',
    group: 'region-standard',
    label: '南北アメリカ編（5問）',
    description: '北米・中米・南米を横断的に出題します。',
    questionCount: 5,
    pool: REGION_STANDARD_POOLS.americas
  },
  {
    id: 'region-others',
    group: 'region-standard',
    label: 'その他（5問）',
    description: '世界の島国や小さな国を中心にしたセレクションです。',
    questionCount: 5,
    pool: REGION_STANDARD_POOLS.others
  },
  {
    id: 'region-north-central-america',
    group: 'region-detailed',
    label: '北・中米編（5問）',
    description: '北米と中米・カリブの国旗を丁寧に覚えたい方に。',
    questionCount: 5,
    pool: REGION_DETAILED_POOLS.northCentralAmerica
  },
  {
    id: 'region-south-america',
    group: 'region-detailed',
    label: '南米編（5問）',
    description: '南米12か国の国旗からランダムに5問出題します。',
    questionCount: 5,
    pool: REGION_DETAILED_POOLS.southAmerica
  },
  {
    id: 'region-middle-east',
    group: 'region-detailed',
    label: '中東・アラブ編（5問）',
    description: '中東地域をテーマに国旗を出題。類似国旗の違いにも注目です。',
    questionCount: 5,
    pool: REGION_DETAILED_POOLS.middleEastArab
  },
  {
    id: 'region-nordic-baltic',
    group: 'region-detailed',
    label: '北欧・バルト編（5問）',
    description: '北欧とバルト諸国の十字旗を中心にまとめました。',
    questionCount: 5,
    pool: REGION_DETAILED_POOLS.nordicBaltic
  },
  {
    id: 'region-caucasus-central-asia',
    group: 'region-detailed',
    label: 'コーカサス・中央アジア編（5問）',
    description: 'シルクロード沿いの国々を一気に覚えられるセットです。',
    questionCount: 5,
    pool: REGION_DETAILED_POOLS.caucasusCentralAsia
  },
  {
    id: 'similar-flags',
    group: 'special',
    label: '似ている国旗クイズ',
    description: '見た目がそっくりな国旗だけを集めた集中トレーニング（5問）です。',
    questionCount: 5,
    questionBuilder: () => createSimilarFlagQuestions(5)
  },
  {
    id: 'non-un-states',
    group: 'special',
    label: '国連未承認国編',
    description: '国連未承認・非加盟の地域や国家をテーマにした5問セットです。',
    questionCount: Math.min(5, NON_UN_MEMBER_FLAGS.length),
    pool: NON_UN_MEMBER_FLAGS,
    optionPool: ALL_FLAG_OPTIONS
  }
];

function createFlagQuizQuestionsFromPool(
  pool: readonly CountryFlag[],
  desiredCount: number,
  optionPool: readonly CountryFlag[] = pool
): FlagQuizQuestion[] {
  const trimmedCount = Math.min(desiredCount, pool.length);
  if (trimmedCount <= 0) {
    return [];
  }

  const selectedCountries = shuffleArray(pool).slice(0, trimmedCount);

  return selectedCountries.map((country, index) => {
    const optionMap = new Map<string, CountryFlag>();
    optionMap.set(country.name, country);

    while (
      optionMap.size < OPTIONS_PER_FLAG_QUESTION &&
      optionMap.size < optionPool.length
    ) {
      const candidate = optionPool[Math.floor(Math.random() * optionPool.length)];
      optionMap.set(candidate.name, candidate);
    }

    const options = shuffleArray(Array.from(optionMap.values()));
    const correctIndex = options.findIndex((item) => item.name === country.name);

    return {
      id: `flag-question-${index + 1}`,
      country,
      options,
      correctIndex
    };
  });
}

function buildQuestionsForMode(mode: FlagQuizMode): FlagQuizQuestion[] {
  if (mode.questionBuilder) {
    return mode.questionBuilder();
  }

  const pool = mode.pool ?? COUNTRY_FLAGS;
  const optionPool = mode.optionPool ?? pool;
  return createFlagQuizQuestionsFromPool(pool, mode.questionCount, optionPool);
}

function updateFlagProgress(): void {
  if (!flagProgressElement) {
    return;
  }

  if (!flagQuizQuestions.length) {
    flagProgressElement.textContent = '';
    return;
  }

  if (currentFlagQuestionIndex < flagQuizQuestions.length) {
    flagProgressElement.textContent = `問題 ${currentFlagQuestionIndex + 1} / ${flagQuizQuestions.length}`;
  } else {
    const label = activeFlagQuizMode ? activeFlagQuizMode.label : '選択したモード';
    flagProgressElement.textContent = `${label}：全${flagQuizQuestions.length}問の結果`;
  }
}

function showFlagStatus(message: string, isError = false): void {
  if (!flagStatusElement) {
    return;
  }

  flagStatusElement.textContent = message;
  if (isError) {
    flagStatusElement.classList.add('is-error');
  } else {
    flagStatusElement.classList.remove('is-error');
  }
}

function renderCurrentFlagQuestion(): void {
  if (currentFlagQuestionIndex >= flagQuizQuestions.length) {
    showFlagFinalResults();
    return;
  }

  const question = flagQuizQuestions[currentFlagQuestionIndex];
  flagQuizRoot.innerHTML = '';

  const section = document.createElement('section');
  section.className = 'quiz-question flag-question';

  const heading = document.createElement('h2');
  heading.textContent = `Q${currentFlagQuestionIndex + 1}. この国旗はどこの国？`;
  section.appendChild(heading);

  const flagDisplay = document.createElement('div');
  flagDisplay.className = 'flag-display';
  flagDisplay.setAttribute('role', 'img');
  flagDisplay.setAttribute('aria-label', `${question.country.name}の国旗`);

  const flagSpan = document.createElement('span');
  flagSpan.className = 'flag-emoji';
  flagSpan.textContent = question.country.flag;
  flagDisplay.appendChild(flagSpan);

  const srText = document.createElement('span');
  srText.className = 'sr-only';
  srText.textContent = `${question.country.name}の国旗`;
  flagDisplay.appendChild(srText);

  section.appendChild(flagDisplay);

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'quiz-options';

  question.options.forEach((option, optionIndex) => {
    const optionId = `${question.id}-option-${optionIndex}`;

    const label = document.createElement('label');
    label.className = 'quiz-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = question.id;
    input.id = optionId;
    input.value = String(optionIndex);

    const span = document.createElement('span');
    span.textContent = option.name;

    label.appendChild(input);
    label.appendChild(span);
    optionsContainer.appendChild(label);
  });

  section.appendChild(optionsContainer);
  flagQuizRoot.appendChild(section);

  updateFlagProgress();

  if (submitFlagQuizButton) {
    submitFlagQuizButton.disabled = false;
  }
}

function handleFlagAnswerSubmission(): void {
  if (!activeFlagQuizMode || !flagQuizQuestions.length) {
    showFlagStatus('先にクイズモードを選択してください。', true);
    return;
  }

  if (currentFlagQuestionIndex >= flagQuizQuestions.length) {
    showFlagFinalResults();
    return;
  }

  const question = flagQuizQuestions[currentFlagQuestionIndex];
  const selected = flagQuizRoot.querySelector<HTMLInputElement>(`input[name="${question.id}"]:checked`);

  if (!selected) {
    showFlagStatus('選択肢を選んでから回答してください。', true);
    return;
  }

  const selectedIndex = Number(selected.value);
  flagUserSelections[currentFlagQuestionIndex] = selectedIndex;

  const isCorrect = selectedIndex === question.correctIndex;
  const correctOption = question.options[question.correctIndex];
  if (isCorrect) {
    showFlagStatus(`正解です！${correctOption.flag} ${correctOption.name}`);
  } else {
    showFlagStatus(`残念！正解は ${correctOption.flag} ${correctOption.name} です。`);
  }

  currentFlagQuestionIndex += 1;

  if (currentFlagQuestionIndex < flagQuizQuestions.length) {
    renderCurrentFlagQuestion();
  } else {
    showFlagFinalResults();
  }
}

function showFlagFinalResults(): void {
  flagQuizRoot.innerHTML = '';
  flagResultBox.textContent = '';
  flagExplanationsBox.innerHTML = '';

  if (!flagQuizQuestions.length) {
    updateFlagProgress();
    return;
  }

  const correctCount = flagQuizQuestions.reduce((total, question, index) => {
    const selectedIndex = flagUserSelections[index];
    if (typeof selectedIndex !== 'number') {
      return total;
    }
    return total + (selectedIndex === question.correctIndex ? 1 : 0);
  }, 0);

  const label = activeFlagQuizMode ? `${activeFlagQuizMode.label} の結果` : '結果';
  flagResultBox.textContent = `${label}：${correctCount} / ${flagQuizQuestions.length}問 正解`;

  flagQuizQuestions.forEach((question, index) => {
    const explanation = document.createElement('div');
    explanation.className = 'quiz-explanation';

    const selectedIndex = flagUserSelections[index];
    const userChoice = typeof selectedIndex === 'number' ? question.options[selectedIndex] : undefined;
    const correctChoice = question.options[question.correctIndex];

    if (!userChoice) {
      explanation.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — 未回答`;
    } else if (selectedIndex === question.correctIndex) {
      explanation.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — あなたの回答：${userChoice.name}（正解）`;
    } else {
      explanation.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — あなたの回答：${userChoice.name}（不正解） / 正解：${correctChoice.name}`;
    }

    flagExplanationsBox.appendChild(explanation);
  });

  updateFlagProgress();
  showFlagStatus('お疲れさまでした！結果を確認して、もう一度挑戦してみましょう。');

  if (submitFlagQuizButton) {
    submitFlagQuizButton.disabled = true;
  }
}

function resetFlagQuiz(): void {
  if (!activeFlagQuizMode) {
    showFlagStatus('メニューからモードを選択してください。', true);
    return;
  }

  flagQuizQuestions = buildQuestionsForMode(activeFlagQuizMode);
  currentFlagQuestionIndex = 0;
  flagUserSelections.length = 0;
  flagResultBox.textContent = '';
  flagExplanationsBox.innerHTML = '';

  if (!flagQuizQuestions.length) {
    showFlagStatus('このモードで出題できる問題がありません。別のモードを選択してください。', true);
    showFlagQuizMenu();
    return;
  }

  showFlagStatus(`${activeFlagQuizMode.label} をリセットしました。がんばってください！`);
  renderCurrentFlagQuestion();
}

function startFlagQuiz(modeId: string): void {
  const mode = FLAG_QUIZ_MODES.find((item) => item.id === modeId);
  if (!mode) {
    showFlagStatus('選択したモードが見つかりませんでした。', true);
    return;
  }

  const questions = buildQuestionsForMode(mode);
  if (!questions.length) {
    showFlagStatus('このモードで出題できる問題がありません。別のモードを選択してください。', true);
    return;
  }

  activeFlagQuizMode = mode;
  flagQuizQuestions = questions;
  currentFlagQuestionIndex = 0;
  flagUserSelections.length = 0;
  flagResultBox.textContent = '';
  flagExplanationsBox.innerHTML = '';

  flagQuizMenuBox.classList.add('is-hidden');
  flagQuizPlayAreaBox.classList.remove('is-hidden');

  if (retryFlagQuizButton) {
    retryFlagQuizButton.disabled = false;
  }
  if (backToMenuButton) {
    backToMenuButton.disabled = false;
  }

  showFlagStatus(`${mode.label} を開始します。がんばってください！`);
  renderCurrentFlagQuestion();
}

function showFlagQuizMenu(): void {
  activeFlagQuizMode = null;
  flagQuizQuestions = [];
  currentFlagQuestionIndex = 0;
  flagUserSelections.length = 0;
  flagQuizRoot.innerHTML = '';
  flagResultBox.textContent = '';
  flagExplanationsBox.innerHTML = '';
  updateFlagProgress();

  flagQuizMenuBox.classList.remove('is-hidden');
  flagQuizPlayAreaBox.classList.add('is-hidden');

  if (submitFlagQuizButton) {
    submitFlagQuizButton.disabled = true;
  }
  if (retryFlagQuizButton) {
    retryFlagQuizButton.disabled = true;
  }

  showFlagStatus('挑戦したいクイズモードを選んでください。');
}

function renderFlagQuizMenu(): void {
  flagQuizMenuContentBox.innerHTML = '';

  const groupEntries = Object.entries(FLAG_QUIZ_MODE_GROUPS).sort(
    (a, b) => a[1].order - b[1].order
  );

  groupEntries.forEach(([groupId, meta]) => {
    const modes = FLAG_QUIZ_MODES.filter((mode) => mode.group === groupId);
    if (!modes.length) {
      return;
    }

    const section = document.createElement('section');
    section.className = 'quiz-menu-group';

    const heading = document.createElement('h2');
    heading.textContent = meta.title;
    section.appendChild(heading);

    if (meta.description) {
      const description = document.createElement('p');
      description.textContent = meta.description;
      section.appendChild(description);
    }

    const list = document.createElement('ul');
    list.className = 'quiz-menu-list';

    modes.forEach((mode) => {
      const item = document.createElement('li');
      item.className = 'quiz-menu-item';

      const title = document.createElement('strong');
      title.textContent = mode.label;
      item.appendChild(title);

      const description = document.createElement('span');
      description.textContent = mode.description;
      item.appendChild(description);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn';
      button.textContent = 'このモードで遊ぶ';
      button.addEventListener('click', () => startFlagQuiz(mode.id));
      item.appendChild(button);

      list.appendChild(item);
    });

    section.appendChild(list);
    flagQuizMenuContentBox.appendChild(section);
  });
}

renderFlagQuizMenu();
showFlagQuizMenu();

submitFlagQuizButton?.addEventListener('click', handleFlagAnswerSubmission);
retryFlagQuizButton?.addEventListener('click', resetFlagQuiz);
backToMenuButton?.addEventListener('click', showFlagQuizMenu);
