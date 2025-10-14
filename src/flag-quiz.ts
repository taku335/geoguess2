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

const TOTAL_FLAG_QUESTIONS = 10;
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

const flagQuizElement = document.getElementById('flagQuiz') as HTMLDivElement | null;
const submitFlagQuizButton = document.getElementById('submitFlagQuiz') as HTMLButtonElement | null;
const retryFlagQuizButton = document.getElementById('retryFlagQuiz') as HTMLButtonElement | null;
const flagResultElement = document.getElementById('flagQuizResult') as HTMLDivElement | null;
const flagExplanationsElement = document.getElementById('flagQuizExplanations') as HTMLDivElement | null;
const flagProgressElement = document.getElementById('flagQuizProgress') as HTMLDivElement | null;
const flagStatusElement = document.getElementById('flagQuizMessage') as HTMLDivElement | null;

if (!flagQuizElement || !flagResultElement || !flagExplanationsElement) {
  throw new Error('Flag quiz page is missing required elements.');
}

const flagQuizRoot = flagQuizElement;
const flagResultBox = flagResultElement;
const flagExplanationsBox = flagExplanationsElement;

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

function createFlagQuizQuestions(): FlagQuizQuestion[] {
  const selectedCountries = shuffleArray(COUNTRY_FLAGS).slice(0, TOTAL_FLAG_QUESTIONS);

  return selectedCountries.map((country, index) => {
    const optionMap = new Map<string, CountryFlag>();
    optionMap.set(country.name, country);

    while (optionMap.size < OPTIONS_PER_FLAG_QUESTION) {
      const candidate = COUNTRY_FLAGS[Math.floor(Math.random() * COUNTRY_FLAGS.length)];
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

function updateFlagProgress(): void {
  if (!flagProgressElement) {
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

function renderCurrentFlagQuestion(): void {
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

  const correctCount = flagQuizQuestions.reduce((total, question, index) => {
    const selectedIndex = flagUserSelections[index];
    if (typeof selectedIndex !== 'number') {
      return total;
    }
    return total + (selectedIndex === question.correctIndex ? 1 : 0);
  }, 0);

  flagResultBox.textContent = `結果：${correctCount} / ${flagQuizQuestions.length}問 正解`;

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
  flagQuizQuestions = createFlagQuizQuestions();
  currentFlagQuestionIndex = 0;
  flagUserSelections.length = 0;
  flagResultBox.textContent = '';
  flagExplanationsBox.innerHTML = '';
  showFlagStatus('世界中の国旗からランダムに10問を出題します。がんばってください！');
  renderCurrentFlagQuestion();
}

resetFlagQuiz();

submitFlagQuizButton?.addEventListener('click', handleFlagAnswerSubmission);
retryFlagQuizButton?.addEventListener('click', resetFlagQuiz);
