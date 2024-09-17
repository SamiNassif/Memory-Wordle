document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const easyButton = document.getElementById('easy-button');
    const mediumButton = document.getElementById('medium-button');
    const hardButton = document.getElementById('hard-button');
    const attemptsDisplay = document.getElementById('attempts-display');
    const mainScreen = document.getElementById('main-screen');

    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let flippedCards = [];
    let matchedPairs = 0;
    let attemptsLeft = 0;

    easyButton.addEventListener('click', () => startGame(7));
    mediumButton.addEventListener('click', () => startGame(5));
    hardButton.addEventListener('click', () => startGame(3));

    function startGame(attempts) {
        mainScreen.style.display = 'none';
        gameBoard.style.display = 'grid';

        flippedCards = [];
        matchedPairs = 0;
        attemptsLeft = attempts;
        updateAttemptsDisplay();

        shuffleArray(cardValues);

        gameBoard.innerHTML = ''; // Clear any existing cards
        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            this.innerText = this.dataset.value;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === cardValues.length / 2) {
                setTimeout(() => {
                    alert('You won!');
                    showMainScreen();
                }, 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = card1.dataset.value;
            card2.innerText = card2.dataset.value;
            attemptsLeft--;
            updateAttemptsDisplay();

            if (attemptsLeft === 0) {
                setTimeout(() => {
                    alert('Game over! You ran out of attempts.');
                    showMainScreen();
                }, 500);
            }
        }
        flippedCards = [];
    }

    function updateAttemptsDisplay() {
        attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
    }

    function showMainScreen() {
        mainScreen.style.display = 'block';
        gameBoard.style.display = 'none';
        gameBoard.innerHTML = '';
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    updateAttemptsDisplay();
});
