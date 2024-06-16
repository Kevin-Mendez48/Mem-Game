const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];

let firstCard = null;
let secondCard = null;
let preventClick = false;
let score = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  gameContainer.innerHTML = "";  // Clear any existing cards
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, "hidden");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (preventClick) return;
  if (event.target === firstCard) return;

  event.target.classList.remove("hidden");
  event.target.style.backgroundColor = event.target.classList[0];

  if (!firstCard) {
    firstCard = event.target;
  } else {
    secondCard = event.target;
    preventClick = true;

    if (firstCard.className === secondCard.className) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      firstCard.style.backgroundColor = firstCard.classList[0];
      secondCard.style.backgroundColor = secondCard.classList[0];
      resetCards();
    } else {
      setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        firstCard.style.backgroundColor = "gray";
        secondCard.style.backgroundColor = "gray";
        resetCards();
      }, 1000);
    }

    score++;
    scoreDisplay.textContent = score;
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  preventClick = false;
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

startButton.addEventListener("click", startGame);

// Initialize the game for the first time
startGame();
