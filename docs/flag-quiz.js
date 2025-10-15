"use strict";
const OPTIONS_PER_FLAG_QUESTION = 4;
const COUNTRY_FLAGS = [
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
const EXTRA_COUNTRY_FLAGS = [
    { name: '台湾', flag: '🇹🇼' },
    { name: 'コソボ', flag: '🇽🇰' },
    { name: 'パレスチナ', flag: '🇵🇸' },
    { name: '西サハラ', flag: '🇪🇭' },
    { name: 'クック諸島', flag: '🇨🇰' },
    { name: 'ニウエ', flag: '🇳🇺' }
];
const ALL_COUNTRY_FLAGS = [...COUNTRY_FLAGS, ...EXTRA_COUNTRY_FLAGS];
const COUNTRY_FLAG_MAP = new Map(ALL_COUNTRY_FLAGS.map((country) => [country.name, country]));
function getFlagByName(name) {
    const flag = COUNTRY_FLAG_MAP.get(name);
    if (!flag) {
        throw new Error(`Flag data for "${name}" is not defined.`);
    }
    return flag;
}
function pickFlags(names) {
    return names.map((name) => getFlagByName(name));
}
const ASIA_FLAGS = pickFlags([
    '日本',
    '中国',
    '韓国',
    '北朝鮮',
    'モンゴル',
    '台湾',
    'インド',
    'インドネシア',
    'タイ',
    'ベトナム',
    'マレーシア',
    'シンガポール',
    'フィリピン',
    'ラオス',
    'カンボジア',
    'ミャンマー'
]);
const OCEANIA_FLAGS = pickFlags([
    'オーストラリア',
    'ニュージーランド',
    'フィジー',
    'パプアニューギニア',
    'ソロモン諸島',
    'バヌアツ',
    'サモア',
    'トンガ',
    'キリバス',
    'ツバル',
    'ナウル',
    'マーシャル諸島',
    'ミクロネシア連邦',
    'パラオ'
]);
const EUROPE_FLAGS = pickFlags([
    'イギリス',
    'アイルランド',
    'フランス',
    'ドイツ',
    'イタリア',
    'スペイン',
    'ポルトガル',
    'オランダ',
    'ベルギー',
    'スイス',
    'オーストリア',
    'スウェーデン',
    'ノルウェー',
    'デンマーク',
    'フィンランド',
    'ポーランド',
    'チェコ',
    'ハンガリー',
    'スロバキア',
    'ギリシャ',
    'ルーマニア',
    'ブルガリア',
    'クロアチア',
    'セルビア'
]);
const AFRICA_FLAGS = pickFlags([
    'エジプト',
    'エチオピア',
    'ケニア',
    'タンザニア',
    'ウガンダ',
    '南アフリカ共和国',
    'ナミビア',
    'ボツワナ',
    'ジンバブエ',
    'モザンビーク',
    'ガーナ',
    'セネガル',
    'ナイジェリア',
    'モロッコ',
    'アルジェリア',
    'チュニジア',
    'マリ',
    'ブルキナファソ',
    'コートジボワール',
    'カメルーン'
]);
const AMERICAS_FLAGS = pickFlags([
    'アメリカ合衆国',
    'カナダ',
    'メキシコ',
    'グアテマラ',
    'コスタリカ',
    'パナマ',
    'キューバ',
    'ドミニカ共和国',
    'ハイチ',
    'ジャマイカ',
    'ブラジル',
    'アルゼンチン',
    'チリ',
    'ペルー',
    'ボリビア',
    'パラグアイ',
    'ウルグアイ',
    'コロンビア',
    'ベネズエラ',
    'エクアドル'
]);
const MIDDLE_CENTRAL_ASIA_FLAGS = pickFlags([
    'サウジアラビア',
    'アラブ首長国連邦',
    'カタール',
    'バーレーン',
    'クウェート',
    'オマーン',
    'イエメン',
    'イラン',
    'イラク',
    'シリア',
    'ヨルダン',
    'レバノン',
    'イスラエル',
    'トルコ',
    'ジョージア',
    'アルメニア',
    'アゼルバイジャン',
    'カザフスタン',
    'ウズベキスタン',
    'キルギス',
    'タジキスタン'
]);
const SMALL_STATE_FLAGS = pickFlags([
    'アイスランド',
    'リヒテンシュタイン',
    'ルクセンブルク',
    'モナコ',
    'サンマリノ',
    'バチカン市国',
    'アンドラ',
    'マルタ',
    'セーシェル',
    'モーリシャス',
    'モルディブ',
    'バルバドス',
    'バハマ',
    'キプロス',
    'カーボベルデ'
]);
const SIMILAR_FLAG_QUESTIONS = [
    {
        answer: getFlagByName('ルーマニア'),
        options: pickFlags(['ルーマニア', 'チャド', 'モルドバ', 'アンドラ'])
    },
    {
        answer: getFlagByName('アイルランド'),
        options: pickFlags(['アイルランド', 'コートジボワール', 'イタリア', 'インド'])
    },
    {
        answer: getFlagByName('インドネシア'),
        options: pickFlags(['インドネシア', 'モナコ', 'ポーランド', 'シンガポール'])
    },
    {
        answer: getFlagByName('カタール'),
        options: pickFlags(['カタール', 'バーレーン', 'オーストリア', 'ラトビア'])
    },
    {
        answer: getFlagByName('ノルウェー'),
        options: pickFlags(['ノルウェー', 'アイスランド', 'デンマーク', 'スウェーデン'])
    },
    {
        answer: getFlagByName('オーストラリア'),
        options: pickFlags(['オーストラリア', 'ニュージーランド', 'フィジー', 'イギリス'])
    }
];
const UN_RECOGNISED_QUESTIONS = [
    {
        answer: getFlagByName('台湾'),
        options: pickFlags(['台湾', '中国', '日本', 'シンガポール'])
    },
    {
        answer: getFlagByName('コソボ'),
        options: pickFlags(['コソボ', 'セルビア', 'アルバニア', 'ボスニア・ヘルツェゴビナ'])
    },
    {
        answer: getFlagByName('パレスチナ'),
        options: pickFlags(['パレスチナ', 'ヨルダン', 'スーダン', 'クウェート'])
    },
    {
        answer: getFlagByName('西サハラ'),
        options: pickFlags(['西サハラ', 'モロッコ', 'アルジェリア', 'モーリタニア'])
    },
    {
        answer: getFlagByName('クック諸島'),
        options: pickFlags(['クック諸島', 'ニュージーランド', 'オーストラリア', 'フィジー'])
    }
];
const FLAG_QUIZ_PRESETS = [
    {
        id: 'global-10',
        label: '10問連続クイズ（全世界）',
        description: '世界195か国の中から10問をランダム出題します。',
        questionCount: 10,
        pool: COUNTRY_FLAGS,
        optionsPool: COUNTRY_FLAGS
    },
    {
        id: 'global-5',
        label: '5問連続クイズ（全世界）',
        description: '短時間で挑戦できる全世界版の5問クイズです。',
        questionCount: 5,
        pool: COUNTRY_FLAGS,
        optionsPool: COUNTRY_FLAGS
    },
    {
        id: 'asia-5',
        label: '地域別（アジア編）',
        description: '東アジアから東南アジアまで幅広くカバーしました。',
        questionCount: 5,
        pool: ASIA_FLAGS,
        optionsPool: ASIA_FLAGS
    },
    {
        id: 'oceania-5',
        label: '地域別（オセアニア編）',
        description: 'オセアニアの島国を中心に5問出題します。',
        questionCount: 5,
        pool: OCEANIA_FLAGS,
        optionsPool: OCEANIA_FLAGS
    },
    {
        id: 'europe-5',
        label: '地域別（ヨーロッパ編）',
        description: 'EU諸国から北欧・東欧まで広くセレクトしました。',
        questionCount: 5,
        pool: EUROPE_FLAGS,
        optionsPool: EUROPE_FLAGS
    },
    {
        id: 'africa-5',
        label: '地域別（アフリカ編）',
        description: 'アフリカ各地の国旗を覚える練習にぴったりです。',
        questionCount: 5,
        pool: AFRICA_FLAGS,
        optionsPool: AFRICA_FLAGS
    },
    {
        id: 'americas-5',
        label: '地域別（南北アメリカ編）',
        description: '北米・中米・南米の代表的な国旗を取り揃えました。',
        questionCount: 5,
        pool: AMERICAS_FLAGS,
        optionsPool: AMERICAS_FLAGS
    },
    {
        id: 'middle-central-5',
        label: '地域別（中東・中央アジア編）',
        description: 'アジア編を細分化したおすすめセットです。',
        questionCount: 5,
        pool: MIDDLE_CENTRAL_ASIA_FLAGS,
        optionsPool: MIDDLE_CENTRAL_ASIA_FLAGS
    },
    {
        id: 'others-5',
        label: '地域別（その他・小さな国編）',
        description: 'ミニ国家や島国を中心にしたバラエティセットです。',
        questionCount: 5,
        pool: SMALL_STATE_FLAGS,
        optionsPool: SMALL_STATE_FLAGS
    },
    {
        id: 'similar',
        label: '似ている国旗クイズ',
        description: '色や模様が似ている国旗だけで構成した実戦向けセットです。',
        questionCount: SIMILAR_FLAG_QUESTIONS.length,
        customQuestions: SIMILAR_FLAG_QUESTIONS
    },
    {
        id: 'unrecognised',
        label: '国連未承認・未加盟編',
        description: '国連で完全承認されていない地域の国旗に挑戦しましょう。',
        questionCount: UN_RECOGNISED_QUESTIONS.length,
        customQuestions: UN_RECOGNISED_QUESTIONS
    }
];
const flagQuizElement = document.getElementById('flagQuiz');
const submitFlagQuizButton = document.getElementById('submitFlagQuiz');
const retryFlagQuizButton = document.getElementById('retryFlagQuiz');
const flagResultElement = document.getElementById('flagQuizResult');
const flagExplanationsElement = document.getElementById('flagQuizExplanations');
const flagProgressElement = document.getElementById('flagQuizProgress');
const flagStatusElement = document.getElementById('flagQuizMessage');
const flagPresetLabelElement = document.getElementById('flagQuizPresetLabel');
const flagDescriptionElement = document.getElementById('flagQuizDescription');
const flagMenuElement = document.getElementById('flagQuizMenu');
const flagPresetButtons = flagMenuElement
    ? Array.from(flagMenuElement.querySelectorAll('[data-flag-preset]'))
    : [];
if (!flagQuizElement ||
    !flagResultElement ||
    !flagExplanationsElement ||
    !flagMenuElement ||
    !flagPresetLabelElement ||
    !flagDescriptionElement) {
    throw new Error('Flag quiz page is missing required elements.');
}
const flagQuizRoot = flagQuizElement;
const flagResultBox = flagResultElement;
const flagExplanationsBox = flagExplanationsElement;
let activePreset = FLAG_QUIZ_PRESETS[0];
let flagQuizQuestions = [];
let currentFlagQuestionIndex = 0;
const flagUserSelections = [];
function shuffleArray(source) {
    const array = [...source];
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function createFlagQuizQuestions(preset) {
    var _a, _b;
    if (preset.customQuestions && preset.customQuestions.length > 0) {
        const questionSpecs = shuffleArray(preset.customQuestions).slice(0, Math.min(preset.questionCount, preset.customQuestions.length));
        return questionSpecs.map((spec, index) => {
            const optionMap = new Map();
            spec.options.forEach((option) => optionMap.set(option.name, option));
            optionMap.set(spec.answer.name, spec.answer);
            const options = shuffleArray(Array.from(optionMap.values()));
            const correctIndex = options.findIndex((item) => item.name === spec.answer.name);
            return {
                id: `flag-question-${preset.id}-${index + 1}`,
                country: spec.answer,
                options,
                correctIndex
            };
        });
    }
    const pool = (_a = preset.pool) !== null && _a !== void 0 ? _a : COUNTRY_FLAGS;
    const availableOptions = (_b = preset.optionsPool) !== null && _b !== void 0 ? _b : ALL_COUNTRY_FLAGS;
    const questionCount = Math.min(preset.questionCount, pool.length);
    const selectedCountries = shuffleArray(pool).slice(0, questionCount);
    return selectedCountries.map((country, index) => {
        const optionMap = new Map();
        optionMap.set(country.name, country);
        const requiredOptions = Math.min(OPTIONS_PER_FLAG_QUESTION, availableOptions.length);
        while (optionMap.size < requiredOptions) {
            const candidate = availableOptions[Math.floor(Math.random() * availableOptions.length)];
            optionMap.set(candidate.name, candidate);
        }
        const options = shuffleArray(Array.from(optionMap.values()));
        const correctIndex = options.findIndex((item) => item.name === country.name);
        return {
            id: `flag-question-${preset.id}-${index + 1}`,
            country,
            options,
            correctIndex
        };
    });
}
function updateFlagProgress() {
    if (!flagProgressElement) {
        return;
    }
    if (flagQuizQuestions.length === 0) {
        flagProgressElement.textContent = '出題準備中';
        return;
    }
    if (currentFlagQuestionIndex < flagQuizQuestions.length) {
        flagProgressElement.textContent = `問題 ${currentFlagQuestionIndex + 1} / ${flagQuizQuestions.length}`;
    }
    else {
        flagProgressElement.textContent = `全${flagQuizQuestions.length}問の結果`;
    }
}
function showFlagStatus(message, isError = false) {
    if (!flagStatusElement) {
        return;
    }
    flagStatusElement.textContent = message;
    if (isError) {
        flagStatusElement.classList.add('is-error');
    }
    else {
        flagStatusElement.classList.remove('is-error');
    }
}
function updatePresetSummary() {
    if (flagPresetLabelElement) {
        flagPresetLabelElement.textContent = `現在のセット：${activePreset.label}`;
    }
    if (flagDescriptionElement) {
        flagDescriptionElement.textContent = activePreset.description;
    }
}
function updateMenuActiveState() {
    flagPresetButtons.forEach((button) => {
        const isActive = button.dataset.flagPreset === activePreset.id;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}
function rebuildFlagQuiz() {
    flagQuizQuestions = createFlagQuizQuestions(activePreset);
    currentFlagQuestionIndex = 0;
    flagUserSelections.length = 0;
    flagResultBox.textContent = '';
    flagExplanationsBox.innerHTML = '';
    updatePresetSummary();
    if (flagQuizQuestions.length === 0) {
        flagQuizRoot.innerHTML = '<p class="quiz-empty">このプリセットには問題が登録されていません。</p>';
        showFlagStatus('問題が登録されていないプリセットです。別のメニューを選んでください。', true);
        updateFlagProgress();
        if (submitFlagQuizButton) {
            submitFlagQuizButton.disabled = true;
        }
        return;
    }
    showFlagStatus(`${activePreset.label}を開始します。${flagQuizQuestions.length}問の4択クイズです。国旗をよく見て答えを選びましょう！`);
    renderCurrentFlagQuestion();
}
function setActivePreset(preset) {
    activePreset = preset;
    updateMenuActiveState();
    rebuildFlagQuiz();
}
function setActivePresetById(presetId) {
    const preset = FLAG_QUIZ_PRESETS.find((item) => item.id === presetId);
    if (preset) {
        setActivePreset(preset);
    }
}
function renderCurrentFlagQuestion() {
    const question = flagQuizQuestions[currentFlagQuestionIndex];
    flagQuizRoot.innerHTML = '';
    if (!question) {
        if (submitFlagQuizButton) {
            submitFlagQuizButton.disabled = true;
        }
        updateFlagProgress();
        return;
    }
    const section = document.createElement('section');
    section.className = 'quiz-question flag-question';
    const heading = document.createElement('h2');
    heading.textContent = `Q${currentFlagQuestionIndex + 1}. この国旗は？`;
    section.appendChild(heading);
    const questionBody = document.createElement('div');
    questionBody.className = 'flag-question-body';
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
    questionBody.appendChild(flagDisplay);
    questionBody.appendChild(optionsContainer);
    section.appendChild(questionBody);
    flagQuizRoot.appendChild(section);
    updateFlagProgress();
    if (submitFlagQuizButton) {
        submitFlagQuizButton.disabled = false;
    }
}
function handleFlagAnswerSubmission() {
    if (currentFlagQuestionIndex >= flagQuizQuestions.length) {
        return;
    }
    const question = flagQuizQuestions[currentFlagQuestionIndex];
    const selected = flagQuizRoot.querySelector(`input[name="${question.id}"]:checked`);
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
    }
    else {
        showFlagStatus(`残念！正解は ${correctOption.flag} ${correctOption.name} です。`);
    }
    currentFlagQuestionIndex += 1;
    if (currentFlagQuestionIndex < flagQuizQuestions.length) {
        renderCurrentFlagQuestion();
    }
    else {
        showFlagFinalResults();
    }
}
function showFlagFinalResults() {
    flagQuizRoot.innerHTML = '';
    flagResultBox.textContent = '';
    flagExplanationsBox.innerHTML = '';
    const correctCount = flagQuizQuestions.reduce((total, question, index) => {
        const selectedIndex = flagUserSelections[index];
        if (typeof selectedIndex !== 'number') {
            return total;
        }
        return total + (selectedIndex === question.correctIndex ? 1 : 0);
    }, 0);
    flagResultBox.textContent = `${activePreset.label}：${correctCount} / ${flagQuizQuestions.length}問 正解`;
    flagQuizQuestions.forEach((question, index) => {
        const explanation = document.createElement('div');
        explanation.className = 'quiz-explanation';
        const selectedIndex = flagUserSelections[index];
        const userChoice = typeof selectedIndex === 'number' ? question.options[selectedIndex] : undefined;
        const correctChoice = question.options[question.correctIndex];
        if (!userChoice) {
            explanation.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — 未回答`;
        }
        else if (selectedIndex === question.correctIndex) {
            explanation.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — あなたの回答：${userChoice.name}（正解）`;
        }
        else {
            explanation.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — あなたの回答：${userChoice.name}（不正解） / 正解：${correctChoice.name}`;
        }
        flagExplanationsBox.appendChild(explanation);
    });
    updateFlagProgress();
    showFlagStatus('お疲れさまでした！結果を確認して、同じセットや別のセットにも挑戦してみましょう。');
    if (submitFlagQuizButton) {
        submitFlagQuizButton.disabled = true;
    }
}
setActivePreset(activePreset);
flagPresetButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const presetId = button.dataset.flagPreset;
        if (presetId) {
            setActivePresetById(presetId);
        }
    });
});
submitFlagQuizButton === null || submitFlagQuizButton === void 0 ? void 0 : submitFlagQuizButton.addEventListener('click', handleFlagAnswerSubmission);
retryFlagQuizButton === null || retryFlagQuizButton === void 0 ? void 0 : retryFlagQuizButton.addEventListener('click', rebuildFlagQuiz);
