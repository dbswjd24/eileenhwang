// Selecting DOM elements - will be set after DOM loads
let cardsContainer;
let timeTag;
let flipsTag;
let box;

// Game variables
let currentLevel = 1;
let maxTime = 60;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let timer;
let cardOne, cardTwo;
let disableDeck = false;
let cards = [];

// Level configuration: [number of pairs, grid columns, grid rows]
const levels = [
    { pairs: 2, cols: 2, rows: 2 },   // Level 1: 4 cards (2x2)
    { pairs: 4, cols: 4, rows: 2 }, // Level 2: 8 cards (4x2) - wider cards
    { pairs: 6, cols: 4, rows: 3 }, // Level 3: 12 cards (4x3) - wider cards
    { pairs: 8, cols: 4, rows: 4 }, // Level 4: 16 cards (4x4) - wider cards
    { pairs: 10, cols: 5, rows: 4 } // Level 5: 20 cards (5x4)
];

// Creates cards for current level
function createCards() {
    const level = levels[currentLevel - 1];
    const totalCards = level.pairs * 2;
    const dogNames = ['gray', 'purple', 'pink', 'blue', 'yellow', 'orange', 'green', 'brown', 'cyan', 'coral'];
    
    cardsContainer.innerHTML = '';
    cards = [];
    
    // Create card elements
    for (let i = 0; i < totalCards; i++) {
        const li = document.createElement('li');
        li.className = 'card';
        li.innerHTML = `
            <div class="view front-view"></div>
            <div class="view back-view">
                <img src="" alt="dog">
            </div>
        `;
        cardsContainer.appendChild(li);
        cards.push(li);
    }
    
    // Update grid layout
    cardsContainer.style.gridTemplateColumns = `repeat(${level.cols}, 1fr)`;
    cardsContainer.style.gridTemplateRows = `repeat(${level.rows}, 1fr)`;
}

// Initializes the game
function startGame() {
    // Get DOM elements
    cardsContainer = document.querySelector("#cards-container");
    timeTag = document.querySelector(".time b");
    flipsTag = document.querySelector(".flips b");
    box = document.querySelector('.box');
    
    if (!cardsContainer || !timeTag || !flipsTag || !box) {
        console.error("Game elements not found!");
        return;
    }
    
    createCards();
    resetGameVariables();
    shuffleCard();
    // Re-query cards after creation and attach event listeners
    cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", flipCardEvent);
    });
    timer = setInterval(initTimer, 1000);
}

// Resets game variables
function resetGameVariables() {
    timeLeft = maxTime;
    flips = 0;
    matchedCard = 0;
    cardOne = cardTwo = null;
    disableDeck = false;

    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    if(timer) clearInterval(timer);
}

// Ends the game and displays a message
function endGame(didWin) {
    clearInterval(timer);
    cards.forEach(card => card.style.display = 'none');
    box.classList.add('game-over');

    const message = didWin ? document.getElementById('congrats') : document.getElementById('try-again');
    message.style.display = 'block';
}

// Timer function for the game
function initTimer() {
    timeLeft--;
    timeTag.innerText = timeLeft;
    if (timeLeft <= 0) endGame(false);
}

// Flips the card and checks for match
function flipCardEvent(event) {
    let card = event.currentTarget;
    if (disableDeck || card === cardOne || card.classList.contains("flip") || card.classList.contains("matched")) return;
    
    flips++;
    flipsTag.innerText = flips;
    card.classList.add("flip");
    cardOne = cardOne || card;
    cardTwo = card === cardOne ? null : card;

    if (cardOne && cardTwo) {
        disableDeck = true;
        setTimeout(checkMatch, 1000);
    }
}

// Checks if two flipped cards match
function checkMatch() {
    let imgOne = cardOne.querySelector(".back-view img").src;
    let imgTwo = cardTwo.querySelector(".back-view img").src;
    if (imgOne === imgTwo) matchSuccess();
    else matchFail();
}

// Successful match
function matchSuccess() {
    matchedCard++;
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");
    const level = levels[currentLevel - 1];
    if (matchedCard === level.pairs) {
        // Level complete, move to next level
        if (currentLevel < levels.length) {
            currentLevel++;
            setTimeout(() => {
                startGame();
            }, 1000);
        } else {
            endGame(true);
        }
    }
    resetTurn();
}

// Failed match
function matchFail() {
    cardOne.classList.remove("flip");
    cardTwo.classList.remove("flip");
    resetTurn();
}

// Resets the turn
function resetTurn() {
    [cardOne, cardTwo] = [null, null];
    disableDeck = false;
}

// Shuffles the cards
function shuffleCard() {
    const level = levels[currentLevel - 1];
    const dogNames = ['gray', 'purple', 'pink', 'blue', 'yellow', 'orange', 'green', 'brown', 'cyan', 'coral', 'coffee', 'mint', 'black', 'dark purple', 'hot pink', 'light pink', 'light purple'];
    
    // Create array with pairs
    let arr = [];
    for (let i = 0; i < level.pairs; i++) {
        arr.push(i);
        arr.push(i);
    }
    arr.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        let imgTag = card.querySelector(".back-view img");
        card.classList.remove("flip", "matched");
        const dogName = dogNames[arr[index]];
        // Handle spaces in filenames
        const fileName = dogName === 'dark purple' ? 'dark purple' : 
                        dogName === 'hot pink' ? 'hot pink' :
                        dogName === 'light pink' ? 'light pink' :
                        dogName === 'light purple' ? 'light purple' : dogName;
        imgTag.src = `assets/img/${fileName}.png`;
        imgTag.alt = dogName + ' dog';
    });
}

// Resets the game
function resetGame() {
    currentLevel = 1;
    if (cards && cards.length > 0) {
        cards.forEach(card => {
            card.style.display = '';
            card.classList.remove("flip", "matched");
        });
    }
    if (box) box.classList.remove('game-over');
    const tryAgain = document.getElementById('try-again');
    const congrats = document.getElementById('congrats');
    if (tryAgain) tryAgain.style.display = 'none';
    if (congrats) congrats.style.display = 'none';
    startGame();
}

// Starts the game once the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    startGame();
    
    // Set up box click listener after DOM is loaded
    box = document.querySelector('.box');
    if (box) {
        box.addEventListener('click', function(event) {
            if (!event.target.classList.contains('card') && document.querySelector('.message')) {
                resetGame();
            }
        });
    }
});
