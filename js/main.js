const questions = [
    {
        question: "How do you view human nature?",
        options: [
            { text: "People are fundamentally good but require guidance to cultivate virtue.", philosopher: "Confucius" },
            { text: "People are equal and capable of goodness through impartial care.", philosopher: "Mozi" },
            { text: "People are inherently good and possess the sprouts of morality.", philosopher: "Mencius" },
            { text: "People are naturally selfish and must be shaped by rituals and education.", philosopher: "Xunzi" }
        ]
    },
    {
        question: "What is the best way to maintain societal order?",
        options: [
            { text: "Let things follow their natural course; do not interfere unnecessarily.", philosopher: "Laozi" },
            { text: "Harmony is achieved by embracing spontaneity and avoiding rigid structures.", philosopher: "Zhuangzi" },
            { text: "Strict laws and rewards ensure order and discipline.", philosopher: "Lord Shang" },
            { text: "Powerful laws and centralized authority are essential for stability.", philosopher: "Han Feizi" }
        ]
    },
    {
        question: "What is the most important role of a leader?",
        options: [
            { text: "A leader should be a moral example, inspiring others through virtue.", philosopher: "Confucius" },
            { text: "A leader should promote universal benefit and impartiality.", philosopher: "Mozi" },
            { text: "A leader must enforce laws and maintain authority to prevent rebellion.", philosopher: "Han Feizi" },
            { text: "A leader should interfere as little as possible, letting things flow naturally.", philosopher: "Zhuangzi" }
        ]
    },
    {
        question: "What is your opinion on law and punishment?",
        options: [
            { text: "Laws and rituals are necessary to transform human nature and enforce virtue.", philosopher: "Xunzi" },
            { text: "Severe punishments deter crime and maintain discipline in society.", philosopher: "Lord Shang" },
            { text: "A strict legal system is essential for preventing chaos and ensuring loyalty.", philosopher: "Han Feizi" },
            { text: "Law is secondary to cultivating benevolence and moral virtues in people.", philosopher: "Mencius" }
        ]
    },
    {
        question: "How should people seek happiness?",
        options: [
            { text: "Happiness comes from simplicity and following the Dao.", philosopher: "Laozi" },
            { text: "Happiness is found in freedom, spontaneity, and aligning with nature.", philosopher: "Zhuangzi" },
            { text: "True happiness comes from developing one’s innate morality and helping others.", philosopher: "Mencius" },
            { text: "Happiness is achieved through self-improvement and harmonious relationships.", philosopher: "Confucius" }
        ]
    },
    {
        question: "What do you think is the biggest threat to society?",
        options: [
            { text: "Partiality and selfishness undermine societal harmony.", philosopher: "Mozi" },
            { text: "Disloyalty to authority and lack of legal enforcement lead to chaos.", philosopher: "Han Feizi" },
            { text: "Weak leadership and lenient laws threaten stability.", philosopher: "Lord Shang" },
            { text: "Human desires, if unchecked, lead to conflict and disorder.", philosopher: "Xunzi" }
        ]
    },
    {
        question: "How should we approach relationships with others?",
        options: [
            { text: "Relationships should be guided by propriety, respect, and duty.", philosopher: "Confucius" },
            { text: "Impartial love and care for all are the keys to harmonious relationships.", philosopher: "Mozi" },
            { text: "Empathy and benevolence are central to fostering meaningful connections.", philosopher: "Mencius" },
            { text: "Do not force relationships; let them unfold naturally and without control.", philosopher: "Zhuangzi" }
        ]
    },
    {
        question: "How should individuals approach personal growth?",
        options: [
            { text: "Continuous self-cultivation and study lead to personal excellence.", philosopher: "Confucius" },
            { text: "Discipline, hard work, and education are required to overcome natural flaws.", philosopher: "Xunzi" },
            { text: "Align with the Dao by embracing simplicity and letting go of desires.", philosopher: "Laozi" },
            { text: "Personal growth comes from embracing change and flowing with life.", philosopher: "Zhuangzi" }
        ]
    },
    {
        question: "What is the ideal government?",
        options: [
            { text: "A government that promotes equality and benefits all people.", philosopher: "Mozi" },
            { text: "A government with absolute authority and a well-enforced legal code.", philosopher: "Han Feizi" },
            { text: "A government that prioritizes military strength and strict control.", philosopher: "Lord Shang" },
            { text: "A government that governs least, allowing people to live naturally.", philosopher: "Laozi" }
        ]
    },
    {
        question: "What is the ultimate purpose of life?",
        options: [
            { text: "To fulfill one’s role and maintain harmony in society.", philosopher: "Confucius" },
            { text: "To nurture and express one’s innate goodness.", philosopher: "Mencius" },
            { text: "To live freely, embracing the flow of life without attachments.", philosopher: "Zhuangzi" },
            { text: "To align oneself with the Dao and live in harmony with nature.", philosopher: "Laozi" }
        ]
    }
];

let currentQuestion = 0;
let philosopherScores = {};

function startQuiz() {
    document.querySelector('.start-screen').style.display = 'none';
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

    const sortedPhilosophers = Object.entries(philosopherScores)
        .sort((a, b) => b[1] - a[1]);

    const topPhilosopher = sortedPhilosophers[0];

    const philosopherDescriptions = {
        "Confucius": "You value harmony, respect for social roles, and self-cultivation through moral learning.",
        "Mozi": "You advocate for universal love, impartial care, and practical solutions to benefit society.",
        "Mencius": "You believe in the inherent goodness of humanity and value compassion and moral growth.",
        "Laozi": "You trust in simplicity, non-interference, and the natural flow of life according to the Dao.",
        "Zhuangzi": "You embrace spontaneity, freedom, and aligning yourself with the unpredictability of life.",
        "Xunzi": "You value structure, discipline, and the transformative power of education and rituals.",
        "Lord Shang": "You prioritize strict laws, discipline, and the strength of the state for maintaining order.",
        "Han Feizi": "You believe in the necessity of absolute authority, strict laws, and pragmatic governance."
    };

    const matchElement = document.querySelector('.philosopher-match');

    matchElement.innerHTML = `
    <h3>You align most with ${topPhilosopher[0]}</h3>
    <p>${philosopherDescriptions[topPhilosopher[0]]}</p>
    <p>Score: ${topPhilosopher[1]} / ${questions.length}</p>
`;

    showBarChart(sortedPhilosophers);
}

function showBarChart(sortedPhilosophers) {
    const ctx = document.getElementById('barChart').getContext('2d');
    const labels = sortedPhilosophers.map(entry => entry[0]);
    const data = sortedPhilosophers.map(entry => entry[1]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Philosopher Alignment Scores',
                data: data,
                backgroundColor: 'rgba(162, 155, 254, 0.5)',
                borderColor: 'rgba(44, 62, 80, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function restartQuiz() {
    currentQuestion = 0;
    philosopherScores = {};
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.start-screen').style.display = 'block';

    startQuiz();
}
