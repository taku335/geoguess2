/* eslint-disable no-alert */
import { ALL_COUNTRY_FLAGS, COUNTRY_FLAGS, CountryFlag, getFlagByName, pickFlags } from './flag-data.js';

interface FlagQuizQuestion {
  id: string;
  country: CountryFlag;
  options: CountryFlag[];
  correctIndex: number;
}

const OPTIONS_PER_FLAG_QUESTION = 4;


interface FlagQuizQuestionSpec {
  answer: CountryFlag;
  options: CountryFlag[];
}

interface FlagQuizPreset {
  id: string;
  label: string;
  description: string;
  questionCount: number;
  pool?: CountryFlag[];
  optionsPool?: CountryFlag[];
  customQuestions?: FlagQuizQuestionSpec[];
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

const SIMILAR_FLAG_QUESTIONS: FlagQuizQuestionSpec[] = [
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

const UN_RECOGNISED_QUESTIONS: FlagQuizQuestionSpec[] = [
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

const FLAG_REGION_LABELS = new Map<string, string>();

function registerFlagRegion(flags: CountryFlag[], label: string) {
  flags.forEach((country) => {
    if (!FLAG_REGION_LABELS.has(country.name)) {
      FLAG_REGION_LABELS.set(country.name, label);
    }
  });
}

registerFlagRegion(ASIA_FLAGS, 'アジア');
registerFlagRegion(OCEANIA_FLAGS, 'オセアニア');
registerFlagRegion(EUROPE_FLAGS, 'ヨーロッパ');
registerFlagRegion(AFRICA_FLAGS, 'アフリカ');
registerFlagRegion(AMERICAS_FLAGS, '南北アメリカ');
registerFlagRegion(MIDDLE_CENTRAL_ASIA_FLAGS, '中東・中央アジア');
registerFlagRegion(SMALL_STATE_FLAGS, '小さな国や島国');

const FLAG_TRIVIA = new Map<string, string>(Object.entries({
  日本: '白地に赤い円を配した日の丸は、太陽を象徴するシンプルながらも印象的なデザインです。',
  中国: '赤地に五つの星が描かれた五星紅旗は、中国共産党と人民の団結を表しています。',
  アメリカ合衆国: '星条旗の星は州の数、縞は独立当初の13植民地を表しています。',
  イギリス: 'ユニオンジャックは、イングランド・スコットランド・アイルランドの旗を重ね合わせたものです。',
  フランス: 'トリコロールの青・白・赤は自由・平等・博愛の理念を象徴しています。',
  ドイツ: '黒・赤・金の3色は、19世紀の自由主義運動を起源とする伝統的な配色です。',
  イタリア: '緑・白・赤の三色旗は、統一運動リソルジメントの象徴として広まりました。',
  スペイン: '中央の紋章にはスペイン王国を構成する歴史的諸王国の紋章が描かれています。',
  ポルトガル: '旗の中央に描かれた航海球は、大航海時代の海洋国家としての歴史を示しています。',
  ブラジル: '緑と黄色は皇帝家の色、青い円内の星は独立宣言時の星空を表現しています。',
  メキシコ: '中央の鷲が蛇をくわえる紋章は、アステカ伝説に登場する建国の地を象徴します。',
  カナダ: 'メープルリーフ旗は、赤いカエデの葉がカナダの自然と団結を象徴しています。',
  オーストラリア: '左上のユニオンジャックと南十字星が英国との歴史と南半球を表します。',
  ニュージーランド: '南十字星の赤い星が南半球の夜空を、ユニオンジャックが英国とのつながりを示します。',
  インド: '中央のチャクラ（法輪）は24本のスポークを持ち、進歩と正義を意味します。',
  韓国: '太極旗は陰陽の太極と四隅の卦で宇宙の調和を表現しています。',
  ロシア: '白・青・赤の三色は旧モスクワ公国の色に由来し、スラヴ諸国にも影響を与えました。',
  ウクライナ: '青と黄の二色旗は、青い空と黄金の小麦畑というウクライナの風景を表現しています。',
  スイス: '正方形の赤地に白い十字は、中世から続くスイス連邦軍の紋章を引き継いでいます。',
  スウェーデン: '青地に黄色の北欧十字は、王家ヴァーサ家の紋章色をもとにしています。',
  ノルウェー: 'ノルウェー旗の赤・白・青はフランス革命の自由の理念を象徴し、北欧十字で地域の一体感を示します。',
  フィンランド: '白地に青い北欧十字は、雪と湖に覆われたフィンランドの自然を表しています。',
  デンマーク: '世界最古とされるダンネブロ旗は、13世紀の戦いで天から降ったと伝えられます。',
  ベルギー: '黒・黄・赤の3色は、ベルギー独立時の国章の色から採用されました。',
  オランダ: 'オランダ国旗は17世紀のネーデルラント独立戦争を象徴するオレンジ・白・青が原型です。',
  南アフリカ共和国: '多彩な6色は、多民族国家の融和と未来への希望を表現しています。',
  ナイジェリア: '緑・白・緑の縦三色は農業の豊かさと平和への願いを示します。',
  ケニア: '黒・赤・緑の帯と中央の盾と槍は、独立闘争と伝統文化を象徴します。',
  アルゼンチン: '中央の「五月の太陽」は独立運動の象徴であるインカの太陽神インティに由来します。',
  チリ: '「星の旗」と呼ばれ、白はアンデスの雪、青は空、赤は独立の犠牲を意味します。',
  ペルー: '赤は独立の戦い、白は平和を表し、中央の国章は豊かな自然資源を象徴します。'
}));

function getFlagTrivia(name: string, flagEmoji: string) {
  const fact = FLAG_TRIVIA.get(name);
  if (fact) {
    return fact;
  }
  const region = FLAG_REGION_LABELS.get(name);
  if (region) {
    return `${flagEmoji} ${name}は${region}に属する国の国旗です。色や紋章の意味も調べてみましょう。`;
  }
  return `${flagEmoji} ${name}の国旗については、由来や歴史を調べるとさらに理解が深まります。`;
}

const FLAG_QUIZ_PRESETS: FlagQuizPreset[] = [
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
    id: 'single-shot',
    label: '一問一答（全世界）',
    description: 'ランダムに1問だけ出題するスキマ時間向けモードです。',
    questionCount: 1,
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

const flagQuizElement = document.getElementById('flagQuiz') as HTMLDivElement | null;
const submitFlagQuizButton = document.getElementById('submitFlagQuiz') as HTMLButtonElement | null;
const retryFlagQuizButton = document.getElementById('retryFlagQuiz') as HTMLButtonElement | null;
const flagResultElement = document.getElementById('flagQuizResult') as HTMLDivElement | null;
const flagExplanationsElement = document.getElementById('flagQuizExplanations') as HTMLDivElement | null;
const flagProgressElement = document.getElementById('flagQuizProgress') as HTMLDivElement | null;
const flagStatusElement = document.getElementById('flagQuizMessage') as HTMLDivElement | null;
const flagPresetLabelElement = document.getElementById('flagQuizPresetLabel') as HTMLDivElement | null;
const flagDescriptionElement = document.getElementById('flagQuizDescription') as HTMLParagraphElement | null;
const flagMenuElement = document.getElementById('flagQuizMenu');
const flagPresetButtons: HTMLButtonElement[] = flagMenuElement
  ? Array.from(flagMenuElement.querySelectorAll<HTMLButtonElement>('[data-flag-preset]'))
  : [];

if (
  !flagQuizElement ||
  !flagResultElement ||
  !flagExplanationsElement ||
  !flagMenuElement ||
  !flagPresetLabelElement ||
  !flagDescriptionElement
) {
  throw new Error('Flag quiz page is missing required elements.');
}

const flagQuizRoot = flagQuizElement;
const flagResultBox = flagResultElement;
const flagExplanationsBox = flagExplanationsElement;

let activePreset = FLAG_QUIZ_PRESETS[0];

let flagQuizQuestions: FlagQuizQuestion[] = [];
let currentFlagQuestionIndex = 0;
const flagUserSelections: number[] = [];

function shuffleArray<T>(source: readonly T[]): T[] {
  const array = [...source];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createFlagQuizQuestions(preset: FlagQuizPreset): FlagQuizQuestion[] {
  if (preset.customQuestions && preset.customQuestions.length > 0) {
    const questionSpecs = shuffleArray(preset.customQuestions).slice(
      0,
      Math.min(preset.questionCount, preset.customQuestions.length)
    );

    return questionSpecs.map((spec, index) => {
      const optionMap = new Map<string, CountryFlag>();
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

  const pool = preset.pool ?? COUNTRY_FLAGS;
  const availableOptions = preset.optionsPool ?? ALL_COUNTRY_FLAGS;
  const questionCount = Math.min(preset.questionCount, pool.length);
  const selectedCountries = shuffleArray(pool).slice(0, questionCount);

  return selectedCountries.map((country, index) => {
    const optionMap = new Map<string, CountryFlag>();
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

function updateFlagProgress(): void {
  if (!flagProgressElement) {
    return;
  }

  if (flagQuizQuestions.length === 0) {
    flagProgressElement.textContent = '出題準備中';
    return;
  }

  if (currentFlagQuestionIndex < flagQuizQuestions.length) {
    flagProgressElement.textContent = `問題 ${currentFlagQuestionIndex + 1} / ${flagQuizQuestions.length}`;
  } else {
    flagProgressElement.textContent = `全${flagQuizQuestions.length}問の結果`;
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

function renderFlagAnswerFeedback(
  question: FlagQuizQuestion,
  selectedIndex: number
): void {
  if (!flagStatusElement) {
    return;
  }

  const correctChoice = question.options[question.correctIndex];
  const userChoice = question.options[selectedIndex];
  const isCorrect = selectedIndex === question.correctIndex;

  flagStatusElement.classList.toggle('is-error', !isCorrect);
  flagStatusElement.innerHTML = '';

  const list = document.createElement('ul');
  list.className = 'flag-feedback';

  const statusItem = document.createElement('li');
  statusItem.className = `flag-feedback-status ${isCorrect ? 'is-correct' : 'is-incorrect'}`;
  statusItem.textContent = isCorrect ? '◯ 正解' : '× 不正解';
  list.appendChild(statusItem);

  const correctItem = document.createElement('li');
  correctItem.className = 'flag-feedback-answer';
  correctItem.textContent = `正しい答え：${correctChoice.flag} ${correctChoice.name}`;
  list.appendChild(correctItem);

  if (!isCorrect && userChoice) {
    const userItem = document.createElement('li');
    userItem.className = 'flag-feedback-user-answer';
    userItem.textContent = `あなたの回答：${userChoice.flag} ${userChoice.name}`;
    list.appendChild(userItem);
  }

  flagStatusElement.appendChild(list);
}

function updatePresetSummary(): void {
  if (flagPresetLabelElement) {
    flagPresetLabelElement.textContent = `現在のセット：${activePreset.label}`;
  }

  if (flagDescriptionElement) {
    flagDescriptionElement.textContent = activePreset.description;
  }
}

function updateMenuActiveState(): void {
  flagPresetButtons.forEach((button) => {
    const isActive = button.dataset.flagPreset === activePreset.id;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function rebuildFlagQuiz(): void {
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

  showFlagStatus(
    `${activePreset.label}を開始します。${flagQuizQuestions.length}問の4択クイズです。国旗をよく見て答えを選びましょう！`
  );
  renderCurrentFlagQuestion();
}

function setActivePreset(preset: FlagQuizPreset): void {
  activePreset = preset;
  updateMenuActiveState();
  rebuildFlagQuiz();
}

function setActivePresetById(presetId: string): void {
  const preset = FLAG_QUIZ_PRESETS.find((item) => item.id === presetId);
  if (preset) {
    setActivePreset(preset);
  }
}

function renderCurrentFlagQuestion(): void {
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

function handleFlagAnswerSubmission(): void {
  if (currentFlagQuestionIndex >= flagQuizQuestions.length) {
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

  renderFlagAnswerFeedback(question, selectedIndex);

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

    const card = document.createElement('div');
    card.className = 'flag-result-card';

    const flagDisplay = document.createElement('div');
    flagDisplay.className = 'flag-display flag-result-display';
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

    const details = document.createElement('div');
    details.className = 'flag-result-details';

    const summary = document.createElement('p');
    summary.className = 'quiz-explanation-summary';
    if (!userChoice) {
      summary.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — 未回答`;
    } else if (selectedIndex === question.correctIndex) {
      summary.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — あなたの回答：${userChoice.name}（正解）`;
    } else {
      summary.textContent = `Q${index + 1}: ${question.country.flag} ${question.country.name} — あなたの回答：${userChoice.name}（不正解） / 正解：${correctChoice.name}`;
    }

    const trivia = document.createElement('p');
    trivia.className = 'flag-trivia';
    trivia.textContent = `ミニ蘊蓄：${getFlagTrivia(question.country.name, question.country.flag)}`;

    details.appendChild(summary);
    details.appendChild(trivia);

    card.appendChild(flagDisplay);
    card.appendChild(details);
    explanation.appendChild(card);
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

submitFlagQuizButton?.addEventListener('click', handleFlagAnswerSubmission);
retryFlagQuizButton?.addEventListener('click', rebuildFlagQuiz);
