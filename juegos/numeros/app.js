// Variables globales
let sequence = [];
let level = 0;
let gamePlaying = false;
let clicked = 0;
let timer;

// Obtener elementos del DOM
const game = document.getElementById("game");
const answer = document.getElementById("answer");
const checkButton = document.getElementById("checkButton");
const timerDisplay = document.getElementById("timer");

// Añadir eventos
checkButton.addEventListener("click", checkAnswer);
game.addEventListener("click", (event) => {
  if (!gamePlaying) return;
  const clickedSquare = event.target.closest(".square");
  if (clickedSquare && !clickedSquare.classList.contains("clicked")) {
    clickedSquare.classList.add("clicked");
    clicked++;
    if (clicked === sequence.length) {
      gamePlaying = false;
      clearInterval(timer);
      setTimeout(nextLevel, 1000);
    }
  }
});

// Función para empezar el juego
function startGame() {
  level = 0;
  sequence = [];
  gamePlaying = true;
  nextLevel();
}

// Función para mostrar la secuencia de números
function showSequence() {
  clicked = 0;
  let i = 0;
  const intervalId = setInterval(() => {
    const square = game.children[sequence[i]];
    square.classList.add("clicked");
    i++;
    if (i === sequence.length) clearInterval(intervalId);
  }, 1000);
}

// Función para mostrar la secuencia de números
function showSequence() {
    clicked = 0;
    let i = 0;
    const intervalId = setInterval(() => {
      const square = game.children[sequence[i]];
      square.classList.add("clicked");
      square.textContent = square.dataset.number;
      i++;
      if (i === sequence.length) clearInterval(intervalId);
    }, 1000);
  }
  

// Función para generar el siguiente nivel
function nextLevel() {
  level++;
  answer.value = "";
  sequence.push(Math.floor(Math.random() * 9));
  showSequence();
  timerDisplay.textContent = "Memoriza por 5 segundos...";
  setTimeout(() => {
    timerDisplay.textContent = "";
    clicked = 0;
    gamePlaying = true;
    timer = startTimer();
  }, 5000);
}

// Función para comprobar la respuesta
function checkAnswer() {
  if (!gamePlaying) return;
  const userAnswer = answer.value;
  if (userAnswer.length !== sequence.length) {
    alert("La respuesta no es correcta");
    return;
  }
  for (let i = 0; i < sequence.length; i++) {
    if (userAnswer[i] !== String(sequence[i])) {
      alert("La respuesta no es correcta");
      return;
    }
  }
  clearInterval(timer);
  alert(`¡Nivel ${level} superado!`);
  nextLevel();
}

// Función para iniciar el temporizador
function startTimer() {
  let seconds = 0;
  return setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Tiempo: ${seconds} seg.`;
  }, 1000);
}

// Iniciar juego al cargar la página
startGame();
