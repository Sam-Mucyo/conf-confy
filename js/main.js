const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://sam-mucyo.github.io/conf-confy/'
    : 'http://localhost:8000';


let currentQuestion = 0;
let userAnswers = [];

// fetch calls to the API
async function startQuiz() {
    try {
        const response = await fetch(`${API_BASE_URL}/questions`);
        const data = await response.json();
        window.questions = data.questions;

        document.querySelector('.start-screen').classList.remove('active');
        document.querySelector('.quiz-section').classList.add('active');
        showQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load quiz questions. Please try again.');
    }
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

async function selectOption(philosopher) {
    userAnswers.push(philosopher);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        await showResults();
    }
}

async function showResults() {
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers: userAnswers })
        });
        const results = await response.json();

        const matchElement = document.querySelector('.philosopher-match');
        matchElement.innerHTML = `
            <h3>You align most with ${results.topPhilosopher}</h3>
            <div class="ai-analysis">${results.aiAnalysis}</div>
        `;

        showBarChart(results.scores);
    } catch (error) {
        console.error('Error getting results:', error);
        alert('Failed to analyze results. Please try again.');
    }
}

function showBarChart(scores) {
    const ctx = document.getElementById('barChart').getContext('2d');
    const labels = scores.map(entry => entry[0]);
    const data = scores.map(entry => entry[1]);

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
