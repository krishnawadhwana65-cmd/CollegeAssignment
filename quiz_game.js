let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;
let quizData = []; // Define quizData at a higher scope

const quizQuestionElement = document.getElementById('quiz-question');
const quizOptionsElement = document.getElementById('quiz-options');
const quizStatusElement = document.getElementById('quiz-status');
const nextQuizButton = document.getElementById('next-quiz-button');

function initializeQuizGame() {
    quizData = [
        // Level 1: Easy
        [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: "4"
            },
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Madrid", "Paris"],
                correctAnswer: "Paris"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Venus", "Jupiter"],
                correctAnswer: "Mars"
            }
        ],
        // Level 2: Medium
        [
            {
                question: "What is the square root of 64?",
                options: ["6", "7", "8", "9"],
                correctAnswer: "8"
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                correctAnswer: "William Shakespeare"
            },
            {
                question: "What is the chemical symbol for water?",
                options: ["O2", "H2O", "CO2", "NaCl"],
                correctAnswer: "H2O"
            }
        ],
        // Level 3: Hard
        [
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                correctAnswer: "Pacific Ocean"
            },
            {
                question: "In which year did the first man walk on the moon?",
                options: ["1965", "1969", "1972", "1975"],
                correctAnswer: "1969"
            },
            {
                question: "What is the speed of light?",
                options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
                correctAnswer: "300,000 km/s"
            }
        ]
    ];

    currentLevel = 0;
    currentQuestionIndex = 0;
    score = 0;
    quizStatusElement.innerText = '';
    displayQuestion();
    nextQuizButton.innerText = 'Next Question';
    nextQuizButton.style.display = 'none'; // Hide next button initially
}

function displayQuestion() {
    const currentQuestion = quizData[currentLevel][currentQuestionIndex];
    quizQuestionElement.innerText = currentQuestion.question;
    quizOptionsElement.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => handleAnswer(option, currentQuestion.correctAnswer));
        quizOptionsElement.appendChild(button);
    });

    quizStatusElement.innerText = ''; // Clear previous status
    nextQuizButton.style.display = 'none'; // Hide next button
}

function handleAnswer(selectedAnswer, correctAnswer) {
    // Disable answer buttons after selection
    Array.from(quizOptionsElement.children).forEach(button => {
        button.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        quizStatusElement.innerText = 'Correct!';
        quizStatusElement.style.color = 'green';
    } else {
        quizStatusElement.innerText = `Incorrect. The correct answer was: ${correctAnswer}`;
        quizStatusElement.style.color = 'red';
    }

    nextQuizButton.style.display = 'block'; // Show next button
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentLevel].length) {
        displayQuestion();
    } else {
        // End of current level
        currentLevel++;
        currentQuestionIndex = 0;
        if (currentLevel < quizData.length) {
            quizStatusElement.innerText = `Level ${currentLevel} completed! Starting next level...`;
             // Delay displaying the next level's first question
             setTimeout(displayQuestion, 1000); // 1 second delay
        } else {
            // End of quiz
            quizQuestionElement.innerText = "Quiz Completed!";
            quizOptionsElement.innerHTML = '';
            quizStatusElement.innerText = `Your final score is: ${score}/${quizData.flat().length}`;
            nextQuizButton.style.display = 'none'; // Hide next button
        }
    }
}

nextQuizButton.addEventListener('click', nextQuestion);

// The initializeQuizGame function will be called from index.html
