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

const FLAG_IMAGE_BASE_URL = 'https://cdn.jsdelivr.net/gh/emcrisostomo/flags@master/4x3';

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

export const COUNTRY_FLAGS: CountryFlag[] = [
  createCountryFlag({ name: 'アフガニスタン', flag: '🇦🇫' }),
  createCountryFlag({ name: 'アルバニア', flag: '🇦🇱' }),
  createCountryFlag({ name: 'アルジェリア', flag: '🇩🇿' }),
  createCountryFlag({ name: 'アンドラ', flag: '🇦🇩' }),
  createCountryFlag({ name: 'アンゴラ', flag: '🇦🇴' }),
  createCountryFlag({ name: 'アンティグア・バーブーダ', flag: '🇦🇬' }),
  createCountryFlag({ name: 'アルゼンチン', flag: '🇦🇷' }),
  createCountryFlag({ name: 'アルメニア', flag: '🇦🇲' }),
  createCountryFlag({ name: 'オーストラリア', flag: '🇦🇺' }),
  createCountryFlag({ name: 'オーストリア', flag: '🇦🇹' }),
  createCountryFlag({ name: 'アゼルバイジャン', flag: '🇦🇿' }),
  createCountryFlag({ name: 'バハマ', flag: '🇧🇸' }),
  createCountryFlag({ name: 'バーレーン', flag: '🇧🇭' }),
  createCountryFlag({ name: 'バングラデシュ', flag: '🇧🇩' }),
  createCountryFlag({ name: 'バルバドス', flag: '🇧🇧' }),
  createCountryFlag({ name: 'ベラルーシ', flag: '🇧🇾' }),
  createCountryFlag({ name: 'ベルギー', flag: '🇧🇪' }),
  createCountryFlag({ name: 'ベリーズ', flag: '🇧🇿' }),
  createCountryFlag({ name: 'ベナン', flag: '🇧🇯' }),
  createCountryFlag({ name: 'ブータン', flag: '🇧🇹' }),
  createCountryFlag({ name: 'ボリビア', flag: '🇧🇴' }),
  createCountryFlag({ name: 'ボスニア・ヘルツェゴビナ', flag: '🇧🇦' }),
  createCountryFlag({ name: 'ボツワナ', flag: '🇧🇼' }),
  createCountryFlag({ name: 'ブラジル', flag: '🇧🇷' }),
  createCountryFlag({ name: 'ブルネイ', flag: '🇧🇳' }),
  createCountryFlag({ name: 'ブルガリア', flag: '🇧🇬' }),
  createCountryFlag({ name: 'ブルキナファソ', flag: '🇧🇫' }),
  createCountryFlag({ name: 'ブルンジ', flag: '🇧🇮' }),
  createCountryFlag({ name: 'カーボベルデ', flag: '🇨🇻' }),
  createCountryFlag({ name: 'カンボジア', flag: '🇰🇭' }),
  createCountryFlag({ name: 'カメルーン', flag: '🇨🇲' }),
  createCountryFlag({ name: 'カナダ', flag: '🇨🇦' }),
  createCountryFlag({ name: '中央アフリカ共和国', flag: '🇨🇫' }),
  createCountryFlag({ name: 'チャド', flag: '🇹🇩' }),
  createCountryFlag({ name: 'チリ', flag: '🇨🇱' }),
  createCountryFlag({ name: '中国', flag: '🇨🇳' }),
  createCountryFlag({ name: 'コロンビア', flag: '🇨🇴' }),
  createCountryFlag({ name: 'コモロ', flag: '🇰🇲' }),
  createCountryFlag({ name: 'コンゴ共和国', flag: '🇨🇬' }),
  createCountryFlag({ name: 'コンゴ民主共和国', flag: '🇨🇩' }),
  createCountryFlag({ name: 'コスタリカ', flag: '🇨🇷' }),
  createCountryFlag({ name: 'コートジボワール', flag: '🇨🇮' }),
  createCountryFlag({ name: 'クロアチア', flag: '🇭🇷' }),
  createCountryFlag({ name: 'キューバ', flag: '🇨🇺' }),
  createCountryFlag({ name: 'キプロス', flag: '🇨🇾' }),
  createCountryFlag({ name: 'チェコ', flag: '🇨🇿' }),
  createCountryFlag({ name: 'デンマーク', flag: '🇩🇰' }),
  createCountryFlag({ name: 'ジブチ', flag: '🇩🇯' }),
  createCountryFlag({ name: 'ドミニカ国', flag: '🇩🇲' }),
  createCountryFlag({ name: 'ドミニカ共和国', flag: '🇩🇴' }),
  createCountryFlag({ name: 'エクアドル', flag: '🇪🇨' }),
  createCountryFlag({ name: 'エジプト', flag: '🇪🇬' }),
  createCountryFlag({ name: 'エルサルバドル', flag: '🇸🇻' }),
  createCountryFlag({ name: '赤道ギニア', flag: '🇬🇶' }),
  createCountryFlag({ name: 'エリトリア', flag: '🇪🇷' }),
  createCountryFlag({ name: 'エストニア', flag: '🇪🇪' }),
  createCountryFlag({ name: 'エスワティニ', flag: '🇸🇿' }),
  createCountryFlag({ name: 'エチオピア', flag: '🇪🇹' }),
  createCountryFlag({ name: 'フィジー', flag: '🇫🇯' }),
  createCountryFlag({ name: 'フィンランド', flag: '🇫🇮' }),
  createCountryFlag({ name: 'フランス', flag: '🇫🇷' }),
  createCountryFlag({ name: 'ガボン', flag: '🇬🇦' }),
  createCountryFlag({ name: 'ガンビア', flag: '🇬🇲' }),
  createCountryFlag({ name: 'ジョージア', flag: '🇬🇪' }),
  createCountryFlag({ name: 'ドイツ', flag: '🇩🇪' }),
  createCountryFlag({ name: 'ガーナ', flag: '🇬🇭' }),
  createCountryFlag({ name: 'ギリシャ', flag: '🇬🇷' }),
  createCountryFlag({ name: 'グレナダ', flag: '🇬🇩' }),
  createCountryFlag({ name: 'グアテマラ', flag: '🇬🇹' }),
  createCountryFlag({ name: 'ギニア', flag: '🇬🇳' }),
  createCountryFlag({ name: 'ギニアビサウ', flag: '🇬🇼' }),
  createCountryFlag({ name: 'ガイアナ', flag: '🇬🇾' }),
  createCountryFlag({ name: 'ハイチ', flag: '🇭🇹' }),
  createCountryFlag({ name: 'ホンジュラス', flag: '🇭🇳' }),
  createCountryFlag({ name: 'ハンガリー', flag: '🇭🇺' }),
  createCountryFlag({ name: 'アイスランド', flag: '🇮🇸' }),
  createCountryFlag({ name: 'インド', flag: '🇮🇳' }),
  createCountryFlag({ name: 'インドネシア', flag: '🇮🇩' }),
  createCountryFlag({ name: 'イラン', flag: '🇮🇷' }),
  createCountryFlag({ name: 'イラク', flag: '🇮🇶' }),
  createCountryFlag({ name: 'アイルランド', flag: '🇮🇪' }),
  createCountryFlag({ name: 'イスラエル', flag: '🇮🇱' }),
  createCountryFlag({ name: 'イタリア', flag: '🇮🇹' }),
  createCountryFlag({ name: 'ジャマイカ', flag: '🇯🇲' }),
  createCountryFlag({ name: '日本', flag: '🇯🇵' }),
  createCountryFlag({ name: 'ヨルダン', flag: '🇯🇴' }),
  createCountryFlag({ name: 'カザフスタン', flag: '🇰🇿' }),
  createCountryFlag({ name: 'ケニア', flag: '🇰🇪' }),
  createCountryFlag({ name: 'キリバス', flag: '🇰🇮' }),
  createCountryFlag({ name: 'クウェート', flag: '🇰🇼' }),
  createCountryFlag({ name: 'キルギス', flag: '🇰🇬' }),
  createCountryFlag({ name: 'ラオス', flag: '🇱🇦' }),
  createCountryFlag({ name: 'ラトビア', flag: '🇱🇻' }),
  createCountryFlag({ name: 'レバノン', flag: '🇱🇧' }),
  createCountryFlag({ name: 'レソト', flag: '🇱🇸' }),
  createCountryFlag({ name: 'リベリア', flag: '🇱🇷' }),
  createCountryFlag({ name: 'リビア', flag: '🇱🇾' }),
  createCountryFlag({ name: 'リヒテンシュタイン', flag: '🇱🇮' }),
  createCountryFlag({ name: 'リトアニア', flag: '🇱🇹' }),
  createCountryFlag({ name: 'ルクセンブルク', flag: '🇱🇺' }),
  createCountryFlag({ name: 'マダガスカル', flag: '🇲🇬' }),
  createCountryFlag({ name: 'マラウイ', flag: '🇲🇼' }),
  createCountryFlag({ name: 'マレーシア', flag: '🇲🇾' }),
  createCountryFlag({ name: 'モルディブ', flag: '🇲🇻' }),
  createCountryFlag({ name: 'マリ', flag: '🇲🇱' }),
  createCountryFlag({ name: 'マルタ', flag: '🇲🇹' }),
  createCountryFlag({ name: 'マーシャル諸島', flag: '🇲🇭' }),
  createCountryFlag({ name: 'モーリタニア', flag: '🇲🇷' }),
  createCountryFlag({ name: 'モーリシャス', flag: '🇲🇺' }),
  createCountryFlag({ name: 'メキシコ', flag: '🇲🇽' }),
  createCountryFlag({ name: 'ミクロネシア連邦', flag: '🇫🇲' }),
  createCountryFlag({ name: 'モルドバ', flag: '🇲🇩' }),
  createCountryFlag({ name: 'モナコ', flag: '🇲🇨' }),
  createCountryFlag({ name: 'モンゴル', flag: '🇲🇳' }),
  createCountryFlag({ name: 'モンテネグロ', flag: '🇲🇪' }),
  createCountryFlag({ name: 'モロッコ', flag: '🇲🇦' }),
  createCountryFlag({ name: 'モザンビーク', flag: '🇲🇿' }),
  createCountryFlag({ name: 'ミャンマー', flag: '🇲🇲' }),
  createCountryFlag({ name: 'ナミビア', flag: '🇳🇦' }),
  createCountryFlag({ name: 'ナウル', flag: '🇳🇷' }),
  createCountryFlag({ name: 'ネパール', flag: '🇳🇵' }),
  createCountryFlag({ name: 'オランダ', flag: '🇳🇱' }),
  createCountryFlag({ name: 'ニュージーランド', flag: '🇳🇿' }),
  createCountryFlag({ name: 'ニカラグア', flag: '🇳🇮' }),
  createCountryFlag({ name: 'ニジェール', flag: '🇳🇪' }),
  createCountryFlag({ name: 'ナイジェリア', flag: '🇳🇬' }),
  createCountryFlag({ name: '北朝鮮', flag: '🇰🇵' }),
  createCountryFlag({ name: '北マケドニア', flag: '🇲🇰' }),
  createCountryFlag({ name: 'ノルウェー', flag: '🇳🇴' }),
  createCountryFlag({ name: 'オマーン', flag: '🇴🇲' }),
  createCountryFlag({ name: 'パキスタン', flag: '🇵🇰' }),
  createCountryFlag({ name: 'パラオ', flag: '🇵🇼' }),
  createCountryFlag({ name: 'パナマ', flag: '🇵🇦' }),
  createCountryFlag({ name: 'パプアニューギニア', flag: '🇵🇬' }),
  createCountryFlag({ name: 'パラグアイ', flag: '🇵🇾' }),
  createCountryFlag({ name: 'ペルー', flag: '🇵🇪' }),
  createCountryFlag({ name: 'フィリピン', flag: '🇵🇭' }),
  createCountryFlag({ name: 'ポーランド', flag: '🇵🇱' }),
  createCountryFlag({ name: 'ポルトガル', flag: '🇵🇹' }),
  createCountryFlag({ name: 'カタール', flag: '🇶🇦' }),
  createCountryFlag({ name: 'ルーマニア', flag: '🇷🇴' }),
  createCountryFlag({ name: 'ロシア', flag: '🇷🇺' }),
  createCountryFlag({ name: 'ルワンダ', flag: '🇷🇼' }),
  createCountryFlag({ name: 'セントクリストファー・ネーヴィス', flag: '🇰🇳' }),
  createCountryFlag({ name: 'セントルシア', flag: '🇱🇨' }),
  createCountryFlag({ name: 'セントビンセントおよびグレナディーン諸島', flag: '🇻🇨' }),
  createCountryFlag({ name: 'サモア', flag: '🇼🇸' }),
  createCountryFlag({ name: 'サンマリノ', flag: '🇸🇲' }),
  createCountryFlag({ name: 'サントメ・プリンシペ', flag: '🇸🇹' }),
  createCountryFlag({ name: 'サウジアラビア', flag: '🇸🇦' }),
  createCountryFlag({ name: 'セネガル', flag: '🇸🇳' }),
  createCountryFlag({ name: 'セルビア', flag: '🇷🇸' }),
  createCountryFlag({ name: 'セーシェル', flag: '🇸🇨' }),
  createCountryFlag({ name: 'シエラレオネ', flag: '🇸🇱' }),
  createCountryFlag({ name: 'シンガポール', flag: '🇸🇬' }),
  createCountryFlag({ name: 'スロバキア', flag: '🇸🇰' }),
  createCountryFlag({ name: 'スロベニア', flag: '🇸🇮' }),
  createCountryFlag({ name: 'ソロモン諸島', flag: '🇸🇧' }),
  createCountryFlag({ name: 'ソマリア', flag: '🇸🇴' }),
  createCountryFlag({ name: '南アフリカ共和国', flag: '🇿🇦' }),
  createCountryFlag({ name: '韓国', flag: '🇰🇷' }),
  createCountryFlag({ name: '南スーダン', flag: '🇸🇸' }),
  createCountryFlag({ name: 'スペイン', flag: '🇪🇸' }),
  createCountryFlag({ name: 'スリランカ', flag: '🇱🇰' }),
  createCountryFlag({ name: 'スーダン', flag: '🇸🇩' }),
  createCountryFlag({ name: 'スリナム', flag: '🇸🇷' }),
  createCountryFlag({ name: 'スウェーデン', flag: '🇸🇪' }),
  createCountryFlag({ name: 'スイス', flag: '🇨🇭' }),
  createCountryFlag({ name: 'シリア', flag: '🇸🇾' }),
  createCountryFlag({ name: 'タジキスタン', flag: '🇹🇯' }),
  createCountryFlag({ name: 'タンザニア', flag: '🇹🇿' }),
  createCountryFlag({ name: 'タイ', flag: '🇹🇭' }),
  createCountryFlag({ name: '東ティモール', flag: '🇹🇱' }),
  createCountryFlag({ name: 'トーゴ', flag: '🇹🇬' }),
  createCountryFlag({ name: 'トンガ', flag: '🇹🇴' }),
  createCountryFlag({ name: 'トリニダード・トバゴ', flag: '🇹🇹' }),
  createCountryFlag({ name: 'チュニジア', flag: '🇹🇳' }),
  createCountryFlag({ name: 'トルコ', flag: '🇹🇷' }),
  createCountryFlag({ name: 'トルクメニスタン', flag: '🇹🇲' }),
  createCountryFlag({ name: 'ツバル', flag: '🇹🇻' }),
  createCountryFlag({ name: 'ウガンダ', flag: '🇺🇬' }),
  createCountryFlag({ name: 'ウクライナ', flag: '🇺🇦' }),
  createCountryFlag({ name: 'アラブ首長国連邦', flag: '🇦🇪' }),
  createCountryFlag({ name: 'イギリス', flag: '🇬🇧' }),
  createCountryFlag({ name: 'アメリカ合衆国', flag: '🇺🇸' }),
  createCountryFlag({ name: 'ウルグアイ', flag: '🇺🇾' }),
  createCountryFlag({ name: 'ウズベキスタン', flag: '🇺🇿' }),
  createCountryFlag({ name: 'バヌアツ', flag: '🇻🇺' }),
  createCountryFlag({ name: 'バチカン市国', flag: '🇻🇦' }),
  createCountryFlag({ name: 'ベネズエラ', flag: '🇻🇪' }),
  createCountryFlag({ name: 'ベトナム', flag: '🇻🇳' }),
  createCountryFlag({ name: 'イエメン', flag: '🇾🇪' }),
  createCountryFlag({ name: 'ザンビア', flag: '🇿🇲' }),
  createCountryFlag({ name: 'ジンバブエ', flag: '🇿🇼' })
];

const RAW_EXTRA_COUNTRY_FLAGS: RawCountryFlag[] = [
  createCountryFlag({ name: '台湾', flag: '🇹🇼' }),
  createCountryFlag({ name: 'コソボ', flag: '🇽🇰' }),
  createCountryFlag({ name: 'パレスチナ', flag: '🇵🇸' }),
  createCountryFlag({ name: '西サハラ', flag: '🇪🇭' }),
  createCountryFlag({ name: 'クック諸島', flag: '🇨🇰' }),
  createCountryFlag({ name: 'ニウエ', flag: '🇳🇺' })
];

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
