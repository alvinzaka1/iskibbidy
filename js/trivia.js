const questions = [
    {
        question: "What does 'HTML' stand for?",
        choices: ["HyperText Markup Language", "HighTech Machine Learning", "Hyperlink Text Management Language", "Home Tool Markup Language"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is NOT a programming language?",
        choices: ["Python", "JavaScript", "HTML", "Ruby"],
        correctAnswer: 2
    },
    {
        question: "What is the output of `console.log(typeof NaN)` in JavaScript?",
        choices: ["undefined", "NaN", "number", "object"],
        correctAnswer: 2
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        choices: [".push()", ".pop()", ".shift()", ".unshift()"],
        correctAnswer: 0
    },
    {
        question: "What is the time complexity of binary search?",
        choices: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Select elements
const triviaContainer = document.getElementById("trivia-container");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const playNowButon = document.getElementById("playButton");

// Display the current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    // Clear previous choices
    choicesEl.innerHTML = "";

    // Add new choices
    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice");
        choiceButton.addEventListener("click", () => handleAnswer(index));
        choicesEl.appendChild(choiceButton);
    });
}

// Handle user's answer
function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        resultEl.textContent = "Correct!";
        resultEl.style.color = "green";
    } else {
        resultEl.textContent = "Wrong! The correct answer was: " + currentQuestion.choices[currentQuestion.correctAnswer];
        resultEl.style.color = "red";
    }

    nextButton.disabled = false; // Enable the "Next" button
}

// Move to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    resultEl.textContent = "";
    nextButton.disabled = true;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
});

playNowButon.addEventListener("click", () => {
    triviaContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
})

// End the quiz
function endQuiz() {
    triviaContainer.innerHTML = `<h2>Quiz Complete!</h2><p>Your score is ${score}/${questions.length}.</p>`;
}

// Initialize the quiz
displayQuestion();
