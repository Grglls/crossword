/*------------------------- version -------------------------*/
console.log('version 1.0');

/*------------------------- constants -------------------------*/
// Word list sourced from:
// https://github.com/dariusk/corpora/blob/master/data/words/common.json
// https://github.com/rsms/inter/blob/master/docs/lab/words-google-10000-english-usa-no-swears.json
// https://gist.github.com/BideoWego/60fbd40d5d1f0f1beca11ba95221dd38#file-dictionary-json


/*------------------------- state variables -------------------------*/
const state = {
    result: null,
    points: 0,
    gridSize: 10,
    board: null,
    wordsAcross: null,
    wordsDown: null,
    userAcross: null,
    userDown: null,
};


/*------------------------- cached elements -------------------------*/
const elements = {
    // diagramContainer: document.getElementById('diagram-container'),
    message: document.getElementById('message-container'),
    points: document.getElementById('points-container'),
    board: document.getElementById('board-container'),
    playAgain: document.getElementById('play-again'), // The play again button
};


/*------------------------- event listeners -------------------------*/
elements.playAgain.addEventListener('click', init);


/*------------------------- functions -------------------------*/
init();


function init () {
    state.result = null;
    state.points = 0;
    state.gridSize = 10;
    state.board = null;
    state.wordsAcross = null;
    state.wordsDown = null;
    state.userAcross = null;
    state.userDown = null;
    
    render();
}


// Add generate board function?


function checkWinner() {
    // Check if all the words have been guessed:
    result = state.validWords.every(word => state.correctGuesses.includes(word));
    return result ? true : null;
}


function render() {
    renderBoard();
    // renderMessage();
    renderPoints();
}


function renderBoard() {
    // Note: to be refactored to use the actual board not the grid size.

    for (let i = 0; i < state.gridSize; i++) {
        rowElement = document.createElement('div');
        rowElement.classList.add('flex', 'flex-row', 'justify-center');
        // rowElement.classList.add('key-letter', 'bg-yellow-400');

        for (let j = 0; j < state.gridSize; j++) {
            squareElement = document.createElement('div');
            squareElement.classList.add('border-solid', 'border', 'border-slate-800', 'h-8', 'w-8', 'flex', 'justify-center');
            // squareElement.classList.add('key-letter', 'bg-yellow-400');
            
            if (Math.random() > 0.5) {
                squareElement.classList.add('bg-black');
                squareElement.innerText = '_';
            } else {
                squareElement.classList.add('bg-white');
                squareElement.innerText = 'A';
            }

            rowElement.appendChild(squareElement);
        }

        elements.board.appendChild(rowElement);
    }
}


function renderMessage() {
    // Clear out the previous message:
    elements.message.innerHTML = '';

    // Render the number of correctly guessed words and the total possible:
    const text = `${state.correctGuesses.length} out of ${state.validWords.length} words`;
    messageElement = document.createElement('div');
    messageElement.innerText = text;
    elements.message.appendChild(messageElement);
}


function renderPoints() {
    // Clear out the previous message:
    elements.points.innerHTML = '';

    // Render the number of points:
    pointsElement = document.createElement('div');
    pointsElement.innerText = `${state.points} points`;
    elements.points.appendChild(pointsElement);
}