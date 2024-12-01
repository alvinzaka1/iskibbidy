let currentQuestionIndex = 0;
let score = 0;
let questions = []; // Will be fetched dynamically

// Select elements
const triviaContainer = document.getElementById("trivia-container");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const playNowButon = document.getElementById("playButton");

// Fetch questions from the API
async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=50&category=18");
        if (response.status === 429) {
            throw new Error("Rate limit exceeded. Please wait and try again.");
        }
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("No trivia questions available.");
        }

        // Format and add questions
        data.results.forEach(apiQuestion => {
            questions.push({
                question: decodeHtml(apiQuestion.question),
                choices: shuffleChoices([...apiQuestion.incorrect_answers, apiQuestion.correct_answer]),
                correctAnswer: apiQuestion.correct_answer,
            });
        });

        displayQuestion();
    } catch (error) {
        console.error(error.message);
        alert(error.message); // Notify the user
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice");
        choiceButton.addEventListener("click", () => handleAnswer(choice));
        choicesEl.appendChild(choiceButton);
    });
}


// Decode HTML entities in the question text
function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Shuffle choices for random order
function shuffleChoices(choices) {
    return choices.sort(() => Math.random() - 0.5);
}

// Handle user's answer
function handleAnswer(selectedChoice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedChoice === currentQuestion.correctAnswer) {
        score++;
        resultEl.textContent = "Correct!";
        resultEl.style.color = "green";
    } else {
        resultEl.textContent = `Wrong! The correct answer was: ${currentQuestion.correctAnswer}`;
        resultEl.style.color = "red";
    }

    nextButton.disabled = false; // Enable the "Next" button
}

// Move to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    resultEl.textContent = "";
    nextButton.disabled = true;

    // Fetch the next question dynamically
    fetchQuestions();
});

playNowButon.addEventListener("click", () => {
    triviaContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
});

// End the quiz
function endQuiz() {
    triviaContainer.innerHTML = `<h2>Quiz Complete!</h2><p>Your score is ${score}/${questions.length}.</p>`;
}

// Initialize the quiz
fetchQuestions();
