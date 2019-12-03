const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let rightSound = document.getElementById("rightSound");
let wrongSound =  document.getElementById("wrongSound");
let numberOfCards = 0;
let matchedCards = 0;
let gameOver = false;

function setupGame(){
  numberOfCards = document.getElementsByClassName("memory-card").length/2;
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
  
}

function checkGameOver(){
  if(matchedCards >= numberOfCards){
    gameOver = true;
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
  if(isMatch){
    matchedCards ++;
    checkGameOver();
    if(!gameOver){ 
      rightSound.play(); 
    } else {
      alert("Great job!");
       //TODO: do other cleanup here
    }
    
  } else {
    //wrongSound.play();
  }
 
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 14);
    card.style.order = randomPos;
  });
})();

setupGame();

