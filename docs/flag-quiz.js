"use strict";
const flagQuizData = [
    {
        id: 'flag1',
        flag: '🇯🇵',
        description: '白地に中央の赤い円が描かれた国旗',
        options: ['日本', '韓国', '中国'],
        answer: 0,
        explanation: '白地の中央に太陽を表す赤い円があるのは日本の日章旗（ひのまる）です。'
    },
    {
        id: 'flag2',
        flag: '🇫🇷',
        description: '青・白・赤の縦三色旗',
        options: ['フランス', 'イタリア', 'オランダ'],
        answer: 0,
        explanation: '左から青・白・赤の縦三色はフランス国旗。イタリアは緑・白・赤の配色です。'
    },
    {
        id: 'flag3',
        flag: '🇧🇷',
        description: '緑地に黄色いひし形と青い地球が描かれた国旗',
        options: ['ブラジル', 'ボリビア', 'ナイジェリア'],
        answer: 0,
        explanation: 'ブラジル国旗は緑と黄色の中に青い地球儀と「秩序と進歩」の標語が描かれています。'
    },
    {
        id: 'flag4',
        flag: '🇮🇳',
        description: '橙・白・緑の横三色に中央の紺色の法輪',
        options: ['インド', 'ハンガリー', 'コートジボワール'],
        answer: 0,
        explanation: 'インド国旗は橙・白・緑の横三色で、中央にはアショーカ・チャクラと呼ばれる24本スポークの紺色の法輪があります。'
    },
    {
        id: 'flag5',
        flag: '🇸🇪',
        description: '青地に黄色の北欧十字が入った国旗',
        options: ['スウェーデン', 'ノルウェー', 'フィンランド'],
        answer: 0,
        explanation: 'スウェーデン国旗は青地に黄色い北欧十字。ノルウェーは赤地に青と白の十字です。'
    },
    {
        id: 'flag6',
        flag: '🇲🇽',
        description: '緑・白・赤の縦三色に中央の国章',
        options: ['メキシコ', 'イタリア', 'ハンガリー'],
        answer: 0,
        explanation: 'メキシコ国旗は緑・白・赤の縦三色に、中央の白帯へ鷲と蛇を描いた国章が入ります。'
    },
    {
        id: 'flag7',
        flag: '🇳🇿',
        description: '紺地にユニオンジャックと4つの赤い星',
        options: ['ニュージーランド', 'オーストラリア', 'イギリス'],
        answer: 0,
        explanation: 'ニュージーランド国旗は南十字座を表す4つの赤い星が特徴。オーストラリアは星が白色で5つ描かれています。'
    },
    {
        id: 'flag8',
        flag: '🇰🇪',
        description: '黒・白・赤・緑の帯に中央のマサイの盾',
        options: ['ケニア', 'ウガンダ', 'ガーナ'],
        answer: 0,
        explanation: 'ケニア国旗は黒・赤・緑の横帯と白い細帯に、中央へマサイ族の盾と槍が配されています。'
    },
    {
        id: 'flag9',
        flag: '🇻🇳',
        description: '赤地に大きな黄色の星が中央にある国旗',
        options: ['ベトナム', '中国', 'カメルーン'],
        answer: 0,
        explanation: '中央の大きな黄色い星が目立つのはベトナム国旗。中国国旗は星が5つ配置されています。'
    },
    {
        id: 'flag10',
        flag: '🇨🇭',
        description: '赤地に中央の白い正方形の十字',
        options: ['スイス', 'デンマーク', 'トルコ'],
        answer: 0,
        explanation: 'スイス国旗は赤地に白い十字で正方形の形状。デンマーク国旗は横長で白い十字です。'
    }
];
const flagQuizElement = document.getElementById('flagQuiz');
const submitFlagQuizButton = document.getElementById('submitFlagQuiz');
const retryFlagQuizButton = document.getElementById('retryFlagQuiz');
const flagResultElement = document.getElementById('flagQuizResult');
const flagExplanationsElement = document.getElementById('flagQuizExplanations');
if (!flagQuizElement || !flagResultElement || !flagExplanationsElement) {
    throw new Error('Flag quiz page is missing required elements.');
}
const flagQuizRoot = flagQuizElement;
const flagResultBox = flagResultElement;
const flagExplanationsBox = flagExplanationsElement;
function renderFlagQuiz() {
    flagQuizRoot.innerHTML = '';
    flagQuizData.forEach((item, index) => {
        const section = document.createElement('section');
        section.className = 'quiz-question flag-question';
        const heading = document.createElement('h2');
        heading.textContent = `Q${index + 1}. この国旗はどこの国？`;
        section.appendChild(heading);
        const flagDisplay = document.createElement('div');
        flagDisplay.className = 'flag-display';
        flagDisplay.setAttribute('role', 'img');
        flagDisplay.setAttribute('aria-label', item.description);
        const flagSpan = document.createElement('span');
        flagSpan.className = 'flag-emoji';
        flagSpan.textContent = item.flag;
        flagDisplay.appendChild(flagSpan);
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = item.description;
        flagDisplay.appendChild(srText);
        section.appendChild(flagDisplay);
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';
        item.options.forEach((optionText, optionIndex) => {
            const optionId = `${item.id}-option-${optionIndex}`;
            const label = document.createElement('label');
            label.className = 'quiz-option';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = item.id;
            input.id = optionId;
            input.value = String(optionIndex);
            const span = document.createElement('span');
            span.textContent = optionText;
            label.appendChild(input);
            label.appendChild(span);
            optionsContainer.appendChild(label);
        });
        section.appendChild(optionsContainer);
        flagQuizRoot.appendChild(section);
    });
}
function clearFlagStates() {
    const options = flagQuizRoot.querySelectorAll('.quiz-option');
    options.forEach((option) => {
        option.classList.remove('is-correct', 'is-wrong');
    });
}
function evaluateFlagQuiz() {
    clearFlagStates();
    flagExplanationsBox.innerHTML = '';
    let score = 0;
    let answered = 0;
    const explanations = [];
    flagQuizData.forEach((item) => {
        const selected = flagQuizRoot.querySelector(`input[name="${item.id}"]:checked`);
        const correctInput = flagQuizRoot.querySelector(`#${item.id}-option-${item.answer}`);
        if (correctInput) {
            const correctOption = correctInput.closest('.quiz-option');
            if (correctOption) {
                correctOption.classList.add('is-correct');
            }
        }
        if (selected) {
            answered += 1;
            const selectedOption = selected.closest('.quiz-option');
            const selectedIndex = Number(selected.value);
            if (selectedIndex === item.answer) {
                score += 1;
            }
            else if (selectedOption) {
                selectedOption.classList.add('is-wrong');
            }
        }
        explanations.push(item.explanation);
    });
    const total = flagQuizData.length;
    const unanswered = total - answered;
    let resultText = `スコア：${score} / ${total}問`;
    if (unanswered > 0) {
        resultText += `（未回答：${unanswered}問）`;
    }
    flagResultBox.textContent = resultText;
    explanations.forEach((text, index) => {
        const explanation = document.createElement('div');
        explanation.className = 'quiz-explanation';
        explanation.textContent = `Q${index + 1}: ${text}`;
        flagExplanationsBox.appendChild(explanation);
    });
}
function resetFlagQuiz() {
    renderFlagQuiz();
    flagResultBox.textContent = '';
    flagExplanationsBox.innerHTML = '';
}
renderFlagQuiz();
submitFlagQuizButton === null || submitFlagQuizButton === void 0 ? void 0 : submitFlagQuizButton.addEventListener('click', evaluateFlagQuiz);
retryFlagQuizButton === null || retryFlagQuizButton === void 0 ? void 0 : retryFlagQuizButton.addEventListener('click', resetFlagQuiz);
