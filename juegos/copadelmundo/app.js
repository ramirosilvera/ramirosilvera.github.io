// Preguntas y respuestas del juego
const questions = [
  {
    question: "¿En qué país se celebró la primera Copa del Mundo en 1930?",
    answers: [
      { text: "Uruguay", correct: true },
      { text: "Brasil", correct: false },
      { text: "Argentina", correct: false },
      { text: "España", correct: false },
    ],
  },
  {
    question: "¿Cuántas veces ha ganado Brasil la Copa del Mundo?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    question: "¿Quién es el máximo goleador de la historia de la Copa del Mundo?",
    answers: [
      { text: "Pele", correct: false },
      { text: "Diego Maradona", correct: false },
      { text: "Ronaldo", correct: false },
      { text: "Miroslav Klose", correct: true },
    ],
  },
  {
    question: "¿En qué año España ganó su primera Copa del Mundo?",
    answers: [
      { text: "2006", correct: false },
      { text: "2010", correct: true },
      { text: "2014", correct: false },
      { text: "2018", correct: false },
    ],
  },
  {
    question: "¿Quién es el actual campeón de la Copa del Mundo?",
    answers: [
      { text: "Francia", correct: false },
      { text: "Alemania", correct: false },
      { text: "Brasil", correct: false },
      { text: "Argentina", correct: true },
    ],
  },
  {
    question: "¿Qué selección ha participado en todas las ediciones de la Copa del Mundo?",
    answers: [
    { text: "Italia", correct: false },
    { text: "Brasil", correct: true },
    { text: "Alemania", correct: false },
    { text: "Argentina", correct: false },
    ],
    },
    {
      question: "¿Qué jugador ha ganado la Copa del Mundo más veces?",
      answers: [
      { text: "Pelé", correct: true },
      { text: "Maradona", correct: false },
      { text: "Zidane", correct: false },
      { text: "Cristiano Ronaldo", correct: false },
      ],
      },
      {
        question: "¿Cuál ha sido la mayor goleada en la historia de la Copa del Mundo?",
        answers: [
        { text: "Alemania - Brasil, 2014", correct: false },
        { text: "España - Hungria, 1982", correct: true },
        { text: "Hungría - Corea del Sur, 1954", correct: false },
        { text: "Portugal - Corea del Norte, 1966", correct: false },
        ],
        },
];

// Variables globales
const startBtn = document.getElementById("start").querySelector("button");
const gameContainer = document.getElementById("game");
const questionContainer = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const levelContainer = document.getElementById("level");
const scoreContainer = document.getElementById("score");
const timeContainer = document.getElementById("time");
const resultContainer = document.getElementById("result");
const finalResultContainer = document.getElementById("final-result");
let shuffledQuestions, currentQuestionIndex;
let score=0;

// Al cargar la página, se muestra la pantalla de inicio
window.onload = function () {
  showStartScreen();
};

// Función para mostrar la pantalla de inicio
function showStartScreen() {
  startBtn.addEventListener("click", startGame);
  gameContainer.style.display = "none";
  resultContainer.style.display = "none";
}

// Función para comenzar el juego
function startGame() {
  startBtn.removeEventListener("click", startGame);
  startBtn.style.display = "none";
  gameContainer.style.display = "block";
  resultContainer.style.display = "none";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  levelContainer.innerText = `Pregunta ${currentQuestionIndex + 1} de ${shuffledQuestions.length}`;
  scoreContainer.innerText = `Puntuación ${score}`;
  timeContainer.innerText = "Tiempo restante: 30";
  setNextQuestion();
  startCountdown();
}

// Función para mostrar la siguiente pregunta
function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length > currentQuestionIndex) {
    currentQuestionIndex++
  } else {
    showResults()
  }
  shuffledQuestions = questions.sort(() => currentQuestionIndex);
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  const nextBtn = document.getElementById("next");
  nextBtn.classList.add("hide");
nextBtn.innerText = "Siguiente";
nextBtn.addEventListener("click", setNextQuestion);
}

// Función para mostrar la pregunta actual
function showQuestion(question) {
  levelContainer.innerText = `Pregunta ${currentQuestionIndex} de ${shuffledQuestions.length-1}`;
  questionContainer.innerText = question.question;
  question.answers.forEach(answer => {
  const button = document.createElement("button");
  button.innerText = answer.text;
  button.classList.add("btn");
  if (answer.correct) {
  button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);
  answersContainer.appendChild(button);
  });
  }
  
  // Función para reiniciar el estado de los botones de respuesta
  function resetState() {
  clearStatusClass(document.body);
  const nextBtn = document.getElementById("next");
  nextBtn.classList.add("hide");
  while (answersContainer.firstChild) {
  answersContainer.removeChild(answersContainer.firstChild);
  }
  }
  
  // Función para seleccionar una respuesta
  function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  score--
  setStatusClass(document.body, correct);
  Array.from(answersContainer.children).forEach(button => {
  setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
  nextBtn.classList.remove("hide");
  } else {
  setTimeout(showResults, 1000);
  }
  }
  
  // Función para marcar el estado de las respuestas
  function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    score++
  scoreContainer.innerText = `Puntuación ${score}`;
  element.classList.add("correct");
  } else {
  element.classList.add("wrong");
  }
  }
  
  // Función para limpiar las clases de estado de un elemento
  function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
  }
  
// Función para mostrar los resultados del juego
function showResults() {
  gameContainer.style.display = "none";
  resultContainer.style.display = "block";
  finalResultContainer.innerText = `Tu puntuación final es ${score} de ${shuffledQuestions.length-1}`;
  startBtn.style.display = "block";
  startBtn.innerText = "Volver a jugar";
  startBtn.addEventListener("click", showStartScreen);
  startBtn.addEventListener("click", startGame);
}

// Función para iniciar la cuenta atrás
function startCountdown() {
  let time = 30;
  const countdown = setInterval(() => {
    timeContainer.innerText = `Tiempo restante: ${time}`;
    time--;
    if (time < 0) {
      clearInterval(countdown);
      showResults();
    }
  }, 1000);
}

// Botón para pasar a la siguiente pregunta
const nextBtn = document.createElement("button");
nextBtn.innerText = "Siguiente";
nextBtn.classList.add("btn", "hide");
nextBtn.addEventListener("click", handleNextQuestion);

// Función para manejar el evento click del botón de siguiente pregunta
function handleNextQuestion() {
  currentQuestionIndex++;
  levelContainer.innerText = `Pregunta ${currentQuestionIndex + 1} de ${shuffledQuestions.length}`;
  setNextQuestion();
}

// Añadir el botón de siguiente pregunta al contenedor de respuestas
answersContainer.appendChild(nextBtn);
