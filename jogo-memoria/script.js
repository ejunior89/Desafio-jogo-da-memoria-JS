const cardsArray = ['🐱', '🐶', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐵', '🐘', '🦄', '🦊'];

const cardsContainer = document.getElementById('cards');

// Duplica as cartas para formar pares
const cardPairs = cardsArray.concat(cardsArray);

// Embaralha as cartas
cardPairs.sort(() => Math.random() - 0.5);

// Cria as cartas no tabuleiro
for (let i = 0; i < cardPairs.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="front-face"></div>
    <div class="back-face">${cardPairs[i]}</div>
    `;
    cardsContainer.appendChild(card);
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.back-face').innerText === secondCard.querySelector('.back-face').innerText;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));
