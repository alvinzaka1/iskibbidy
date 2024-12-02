const data = [
  {
      question: "Fill in the blank: I _______ now",
      a: "understand it",
      b: "rizz her up",
      c: "skibidy",
      d: "get it",
      correct: "a",
  },
  {
      question: "What do you lose if you fall infront of a 100 people?",
      a: "rizz",
      b: "negative aura",
      c: "mewing",
      d: "aura",
      correct: "d",
  },
  {
      question: "What brainrot ruined generation alpha?",
      a: "skibidy toilet",
      b: "harambe",
      c: "the rizzler",
      d: "sonic",
      correct: "a",
  },
  {
      question: "What the sussy character from among us?",
      a: "imposter",
      b: "knuckles",
      c: "the rizzler",
      d: "didler",
      correct: "a",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const submitBtn = document.getElementById("submit");
const successImage = "img/dancinggibby.gif";
const failImage = "img/sadgibby.png";

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = data[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  optionA.innerText = currentQuizData.a;
  optionB.innerText = currentQuizData.b;
  optionC.innerText = currentQuizData.c;
  optionD.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
      answerEl.checked = false;
  });
}

function getSelected() {
  let answer = null;
  answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
          answer = answerEl.id;
      }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
      if (answer === data[currentQuiz].correct) {
          score++;
      }
      currentQuiz++;
      if (currentQuiz < data.length) {
          loadQuiz();
      } else {
        let resultMessage = `You answered ${score}/${data.length} questions correctly.`;
        let imageToShow = score === data.length ? successImage : failImage;

        quiz.innerHTML = `
            <h2>${resultMessage}</h2>
            <img src="${imageToShow}" alt="Result Image" style="max-width: 300px; margin-top: 20px;">
            <button onclick="location.reload()">Reload</button>
        `;
    }
  }
});

/*photo album & song*/
document.getElementById('show-images').addEventListener('click', function() {
  const gallery = document.getElementById('gallery');
  const audio = document.getElementById('my-audio');
  
  if (gallery.style.display === 'none' || gallery.style.display === '') {
      gallery.style.display = 'block';
  } else {
      gallery.style.display = 'none';
  }
  
  audio.play();
});

document.getElementById('show-more').addEventListener('click', function() {
  const gallery = document.getElementById('gallery');
  if (gallery.style.display === 'none') {
      gallery.style.display = 'block';
  } else {
      gallery.style.display = 'none';
  }
});

