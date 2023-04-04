const wordList = ['Leo', 'Dibu', 'Scaloneta', 'Fideo', 'Araña', 'Rodri'];

const gameContainer = document.getElementById('game-container');
const wordListElement = document.getElementById('word-list');
const userInput = document.getElementById('user-input');
const checkButton = document.getElementById('check-button');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let currentWordIndex = 0;
let currentWordList = [];
let isShowingWords = false;
let secondsLeft = 3;
let timerIntervalId;

// Function to show a word in the word list
function showWord(word) {
  const wordElement = document.createElement('li');
  wordElement.innerText = word;
  wordListElement.appendChild(wordElement);
}

// Function to show the current sequence of words
function showWords() {
  wordListElement.innerHTML = '';
  for (let i = 0; i < currentWordList.length; i++) {
    showWord(currentWordList[i]);
  }
  isShowingWords = true;
}

// Function to start the next sequence of words
function startNextSequence() {
  currentWordList = wordList.slice(currentWordIndex, currentWordIndex + 3);
  currentWordIndex += 3;
  showWords();
  startTimer();
}

// Function to start the timer
function startTimer() {
  clearInterval(timerIntervalId);
  secondsLeft = 3;
  timerElement.innerText = secondsLeft + ' segundos restantes';
  timerIntervalId = setInterval(() => {
    secondsLeft--;
    timerElement.innerText = secondsLeft + ' segundos restantes';
    if (secondsLeft === 0) {
      clearInterval(timerIntervalId);
      showWords();
      isShowingWords = false; // Reset flag to false
      userInput.value = ''; // Clear user input
    }
  }, 1000);
}

// Function to check the user's input
function checkInput() {
  if (isShowingWords) {
    return;
  }
  const userInputWords = userInput.value.trim().toLowerCase().split(' ');
  const correctWords = currentWordList.map(word => word.toLowerCase());
  let isCorrect = true;
  for (let i = 0; i < userInputWords.length; i++) {
    if (userInputWords[i] !== correctWords[i]) {
      isCorrect = false;
      break;
    }
  }
  if (isCorrect) {
    resultElement.innerText = '¡Correcto!';
    if (currentWordIndex < wordList.length) {
      startNextSequence();
    } else {
      resultElement.innerText = '¡Felicitaciones, has completado el juego!';
      checkButton.disabled = true;
    }
  } else {
    resultElement.innerText = 'Respuesta incorrecta. Inténtalo de nuevo.';
  }
  userInput.value = ''; // Clear user input
}

// Event listener for the start button
startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  startNextSequence();
});

// Event listener for the check button
checkButton.addEventListener('click', checkInput);
