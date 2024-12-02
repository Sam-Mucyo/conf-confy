const questions = [
    {
        question: "How do you view human nature?",
        options: [
            { text: "People are inherently good and can be guided to virtue", philosopher: "Mencius" },
            { text: "People need education and ritual to become good", philosopher: "Xunzi" },
            { text: "People should follow the natural way without interference", philosopher: "Laozi" },
            { text: "People should focus on practical benefits for society", philosopher: "Mozi" }
        ]
    },
    {
        question: "What is the best approach to governance?",
        options: [
            { text: "Minimal intervention, letting things follow their natural course", philosopher: "Laozi" },
            { text: "Strong institutions and clear social roles", philosopher: "Xunzi" },
            { text: "Moral education and leading by example", philosopher: "Confucius" },
            { text: "Promoting what benefits all people equally", philosopher: "Mozi" }
        ]
    },
    {
        question: "What is the most important virtue?",
        options: [
            { text: "Benevolence and human-heartedness (ren)", philosopher: "Confucius" },
            { text: "Universal love and impartial care", philosopher: "Mozi" },
            { text: "Spontaneity and naturalness", philosopher: "Zhuangzi" },
            { text: "Ritual propriety and social order", philosopher: "Xunzi" }
        ]
    }
];

let currentQuestion = 0;
let philosopherScores = {};

function startQuiz() {
    document.querySelector('.start-screen').classList.remove('active');
    document.querySelector('.quiz-section').classList.add('active');
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    document.querySelector('.question').textContent = questionData.question;

    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option.text;
        optionElement.onclick = () => selectOption(option.philosopher);
        optionsContainer.appendChild(optionElement);
    });

    updateProgress();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function selectOption(philosopher) {
    philosopherScores[philosopher] = (philosopherScores[philosopher] || 0) + 1;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.querySelector('.quiz-section').classList.remove('active');
    document.querySelector('.results').style.display = 'block';

    const topPhilosopher = Object.entries(philosopherScores)
        .sort((a, b) => b[1] - a[1])[0];

    const philosopherDescriptions = {
        "Mencius": "You believe in the inherent goodness of humanity and value compassion and moral growth.",
        "Xunzi": "You value structure, discipline, and the transformative power of education.",
        "Laozi": "You trust in simplicity and the natural flow of life.",
        "Mozi": "You advocate for universal love and practical solutions to benefit society."
    };

    const matchElement = document.querySelector('.philosopher-match');

    matchElement.innerHTML = `
    <h3>You align most with ${topPhilosopher[0]}</h3>
    <p>${philosopherDescriptions[topPhilosopher[0]]}</p>
    <p>Score: ${topPhilosopher[1]} / ${questions.length}</p>
`;
}