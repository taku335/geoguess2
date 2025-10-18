export interface CountryFlag {
  name: string;
  flag: string;
  isoCode: string;
  imageUrl: string;
}

interface RawCountryFlag {
  name: string;
  flag: string;
  isoCode?: string;
  imageUrl?: string;
}

const FLAG_IMAGE_BASE_URL = 'https://flagcdn.com';

function emojiToIsoCode(flagEmoji: string): string {
  const codePoints = Array.from(flagEmoji);
  if (codePoints.length !== 2) {
    throw new Error(`Invalid flag emoji: "${flagEmoji}"`);
  }
  const base = 0x1f1e6;
  const isoCode = codePoints
    .map((char) => {
      const codePoint = char.codePointAt(0);
      if (!codePoint) {
        throw new Error(`Invalid flag emoji code point: "${flagEmoji}"`);
      }
      return String.fromCharCode(65 + codePoint - base);
    })
    .join('');
  return isoCode;
}

function createCountryFlag(entry: RawCountryFlag): CountryFlag {
  const emoji = entry.flag;
  const isoCode = (entry.isoCode || emojiToIsoCode(emoji)).toUpperCase();
  const imageUrl =
    entry.imageUrl || `${FLAG_IMAGE_BASE_URL}/${isoCode.toLowerCase()}.svg`;
  return {
    name: entry.name,
    flag: emoji,
    isoCode,
    imageUrl
  };
}

const RAW_COUNTRY_FLAGS: RawCountryFlag[] = [
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

const RAW_EXTRA_COUNTRY_FLAGS: RawCountryFlag[] = [
  { name: '台湾', flag: '🇹🇼' },
  { name: 'コソボ', flag: '🇽🇰' },
  { name: 'パレスチナ', flag: '🇵🇸' },
  { name: '西サハラ', flag: '🇪🇭' },
  { name: 'クック諸島', flag: '🇨🇰' },
  { name: 'ニウエ', flag: '🇳🇺' }
];

export const COUNTRY_FLAGS: CountryFlag[] = RAW_COUNTRY_FLAGS.map(createCountryFlag);
export const EXTRA_COUNTRY_FLAGS: CountryFlag[] = RAW_EXTRA_COUNTRY_FLAGS.map(createCountryFlag);
export const ALL_COUNTRY_FLAGS: CountryFlag[] = [...COUNTRY_FLAGS, ...EXTRA_COUNTRY_FLAGS];

const COUNTRY_FLAG_MAP = new Map<string, CountryFlag>(
  ALL_COUNTRY_FLAGS.map((country) => [country.name, country])
);

export function getFlagByName(name: string): CountryFlag {
  const flag = COUNTRY_FLAG_MAP.get(name);
  if (!flag) {
    throw new Error(`Flag data for "${name}" is not defined.`);
  }
  return flag;
}

export function pickFlags(names: readonly string[]): CountryFlag[] {
  return names.map((name) => getFlagByName(name));
}
