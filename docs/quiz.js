"use strict";
const quizData = [
    {
        id: 'q1',
        question: 'GeoGuessrまとめWikiの「GeoGuessrとは？」で紹介されているゲームの概要はどれ？',
        options: [
            'Googleストリートビューの映像を手がかりに世界のどこかを推測するブラウザゲーム',
            '各国の国旗を覚えてクイズ形式で答える暗記ゲーム',
            '地図をパズルのように並べ替えて完成させるシングルプレイゲーム'
        ],
        answer: 0,
        explanation: 'トップページ冒頭の「GeoGuessrとは？」では、Googleストリートビューを見ながら現在地を推測するゲームであると説明されています。'
    },
    {
        id: 'q2',
        question: '「ゲームモード紹介」で最後の1人になるまで推測を続けるバトル形式として挙げられているモードは？',
        options: ['Battle Royale', 'Explorer Mode', 'Country Streak'],
        answer: 0,
        explanation: 'Wikiのゲームモード紹介では、Battle Royaleが他プレイヤーと同時に戦い最後の1人を目指すモードとして紹介されています。'
    },
    {
        id: 'q3',
        question: '初心者ガイドのヒントとして強調されている、方角を推測するためにまず確認したい要素はどれ？',
        options: ['太陽の位置と影の向き', 'プレイヤーアバターの服装', '画面左上のタイマー色'],
        answer: 0,
        explanation: '初心者ガイドでは、太陽の位置や影の向きを確認して北半球・南半球を推測する基本テクニックが紹介されています。'
    },
    {
        id: 'q4',
        question: 'トップページの「学習リソース／コミュニティ」欄で案内されている主な参加先として正しいものはどれ？',
        options: ['Discordなどのコミュニティサーバーや配信リンク', '航空会社の公式予約サイト', '家庭用ゲーム機向けのアプリストア'],
        answer: 0,
        explanation: 'GeoGuessrまとめWikiでは、コミュニティ参加先としてDiscordサーバーや配信チャンネルなどのリンク集がまとめられています。'
    }
];
const quizElement = document.getElementById('quiz');
const submitButton = document.getElementById('submitQuiz');
const retryButton = document.getElementById('retryQuiz');
const resultElement = document.getElementById('quizResult');
const explanationsElement = document.getElementById('quizExplanations');
if (!quizElement || !resultElement || !explanationsElement) {
    throw new Error('Quiz page is missing required elements.');
}
const quizRoot = quizElement;
const resultBox = resultElement;
const explanationsBox = explanationsElement;
function renderQuiz() {
    quizRoot.innerHTML = '';
    quizData.forEach((item, index) => {
        const section = document.createElement('section');
        section.className = 'quiz-question';
        const heading = document.createElement('h2');
        heading.textContent = `Q${index + 1}. ${item.question}`;
        section.appendChild(heading);
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
        quizRoot.appendChild(section);
    });
}
function clearStates() {
    const options = quizRoot.querySelectorAll('.quiz-option');
    options.forEach((option) => {
        option.classList.remove('is-correct', 'is-wrong');
    });
}
function evaluateQuiz() {
    clearStates();
    explanationsBox.innerHTML = '';
    let score = 0;
    let answered = 0;
    const explanations = [];
    quizData.forEach((item) => {
        const selected = quizRoot.querySelector(`input[name="${item.id}"]:checked`);
        const correctInput = quizRoot.querySelector(`#${item.id}-option-${item.answer}`);
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
    const total = quizData.length;
    const unanswered = total - answered;
    let resultText = `スコア：${score} / ${total}問`;
    if (unanswered > 0) {
        resultText += `（未回答：${unanswered}問）`;
    }
    resultBox.textContent = resultText;
    explanations.forEach((text, index) => {
        const explanation = document.createElement('div');
        explanation.className = 'quiz-explanation';
        explanation.textContent = `Q${index + 1}: ${text}`;
        explanationsBox.appendChild(explanation);
    });
}
function resetQuiz() {
    renderQuiz();
    resultBox.textContent = '';
    explanationsBox.innerHTML = '';
}
renderQuiz();
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', evaluateQuiz);
retryButton === null || retryButton === void 0 ? void 0 : retryButton.addEventListener('click', resetQuiz);
