let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

const quizQuestionElement = document.getElementById('quiz-question');
const quizOptionsElement = document.getElementById('quiz-options');
const quizStatusElement = document.getElementById('quiz-status');
const nextQuizButton = document.getElementById('next-quiz-button');

console.log("quiz_game.js loaded"); // Log script load

function initializeQuizGame() {
    console.log("initializeQuizGame called"); // Log function call
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
    nextQuizButton.innerText = 'Next Question';
    nextQuizButton.style.display = 'none'; // Hide next button initially

    console.log("Quiz data initialized. Calling displayQuestion..."); // Log before calling display
    displayQuestion();
}

function displayQuestion() {
    console.log(`displayQuestion called for Level ${currentLevel}, Question ${currentQuestionIndex}`); // Log function call and state
    if (!quizData[currentLevel] || !quizData[currentLevel][currentQuestionIndex]) {
        console.error("Error: Quiz data not found for current level/question index."); // Log error if data is missing
        return;
    }

    const currentQuestion = quizData[currentLevel][currentQuestionIndex];
    console.log("Current Question:", currentQuestion); // Log the question object

    if (quizQuestionElement) {
        quizQuestionElement.innerText = currentQuestion.question;
        console.log("Question element updated:", quizQuestionElement.innerText); // Log element update
    } else {
        console.error("Error: quizQuestionElement not found."); // Log error if element is missing
    }


    if (quizOptionsElement) {
        quizOptionsElement.innerHTML = ''; // Clear previous options
        console.log("Options element cleared."); // Log element clear

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.addEventListener('click', () => handleAnswer(option, currentQuestion.correctAnswer));
            quizOptionsElement.appendChild(button);
             console.log("Added option button:", option); // Log button creation
        });
         console.log("All option buttons added."); // Log completion of button adding
    } else {
         console.error("Error: quizOptionsElement not found."); // Log error if element is missing
    }


    if (quizStatusElement) {
        quizStatusElement.innerText = ''; // Clear previous status
        console.log("Status element cleared."); // Log element clear
    } else {
        console.error("Error: quizStatusElement not found."); // Log error if element is missing
    }


    if (nextQuizButton) {
        nextQuizButton.style.display = 'none'; // Hide next button
         console.log("Next button hidden."); // Log button hide
    } else {
         console.error("Error: nextQuizButton not found."); // Log error if element is missing
    }
}

function handleAnswer(selectedAnswer, correctAnswer) {
     console.log(`handleAnswer called. Selected: ${selectedAnswer}, Correct: ${correctAnswer}`); // Log function call and answers
    // Disable answer buttons after selection
    if (quizOptionsElement) {
        Array.from(quizOptionsElement.children).forEach(button => {
            button.disabled = true;
        });
        console.log("Answer buttons disabled."); // Log button disable
    } else {
         console.error("Error: quizOptionsElement not found in handleAnswer."); // Log error if element is missing
    }


    if (selectedAnswer === correctAnswer) {
        score++;
        if (quizStatusElement) {
            quizStatusElement.innerText = 'Correct!';
            quizStatusElement.style.color = 'green';
             console.log("Answer: Correct. Score:", score); // Log correct answer
        } else {
             console.error("Error: quizStatusElement not found in handleAnswer (correct)."); // Log error if element is missing
        }
    } else {
        if (quizStatusElement) {
            quizStatusElement.innerText = `Incorrect. The correct answer was: ${correctAnswer}`;
            quizStatusElement.style.color = 'red';
             console.log("Answer: Incorrect. Correct answer was:", correctAnswer); // Log incorrect answer
        } else {
             console.error("Error: quizStatusElement not found in handleAnswer (incorrect)."); // Log error if element is missing
        }
    }

    if (nextQuizButton) {
         nextQuizButton.style.display = 'block'; // Show next button
         console.log("Next button displayed."); // Log button display
    } else {
         console.error("Error: nextQuizButton not found in handleAnswer."); // Log error if element is missing
    }
}

function nextQuestion() {
     console.log("nextQuestion called."); // Log function call
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentLevel].length) {
        console.log("Moving to next question in current level."); // Log level progress
        displayQuestion();
    } else {
        // End of current level
        currentLevel++;
        currentQuestionIndex = 0;
        if (currentLevel < quizData.length) {
             if (quizStatusElement) {
                quizStatusElement.innerText = `Level ${currentLevel} completed! Starting next level...`;
                console.log(`Level ${currentLevel} completed. Starting next level...`); // Log level completion
             } else {
                 console.error("Error: quizStatusElement not found in nextQuestion (level complete)."); // Log error if element is missing
             }
             // Delay displaying the next level's first question
             setTimeout(displayQuestion, 1000); // 1 second delay
        } else {
            // End of quiz
             console.log("Quiz completed!"); // Log quiz completion
            if (quizQuestionElement) {
                quizQuestionElement.innerText = "Quiz Completed!";
            } else {
                 console.error("Error: quizQuestionElement not found in nextQuestion (quiz complete)."); // Log error if element is missing
            }

            if (quizOptionsElement) {
                 quizOptionsElement.innerHTML = '';
            } else {
                 console.error("Error: quizOptionsElement not found in nextQuestion (quiz complete)."); // Log error if element is missing
            }


            if (quizStatusElement) {
                quizStatusElement.innerText = `Your final score is: ${score}/${quizData.flat().length}`;
                console.log("Final Score:", score); // Log final score
            } else {
                 console.error("Error: quizStatusElement not found in nextQuestion (quiz complete)."); // Log error if element is missing
            }


            if (nextQuizButton) {
                nextQuizButton.style.display = 'none'; // Hide next button
            } else {
                 console.error("Error: nextQuizButton not found in nextQuestion (quiz complete)."); // Log error if element is missing
            }
        }
    }
}

if (nextQuizButton) {
    nextQuizButton.addEventListener('click', nextQuestion);
     console.log("Next button event listener added."); // Log event listener
} else {
    console.error("Error: nextQuizButton not found when adding event listener."); // Log error if element is missing
}


// The initializeQuizGame function will be called from index.html
