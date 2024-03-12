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
    gridSize: 20,
    boardSolution: null,
    boardUser: null,
    boardNumbers: null,
    wordsAcross: null,
    wordsDown: null,
    // userAcross: null,
    // userDown: null,
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
    state.gridSize = 5;
    state.boardSolution = createCrossword(state.gridSize);
    state.boardNumbers = createNumbers(state.gridSize);
    state.boardUser = generateBlankBoard(state.gridSize);
    state.wordsAcross = null;
    state.wordsDown = null;
    // state.userAcross = null;
    // state.userDown = null;
    
    render();
}


// Function to generate a blank board at the start of the game:
function generateBlankBoard(gridSize) {
    const blankBoard = [];
    const blankRow = [];

    // Create a blank row of length 'n' (n = gridSize):
    for (let i = 0; i < gridSize; i++) {
        blankRow.push('');
    }
    
    // Add the blank row to the board 'n' number of times (n = gridSize):
    for (let i = 0; i < gridSize; i++) {
        blankBoard.push(blankRow)
    }

    return blankBoard;
}


// Function to create the crossword puzzle:
function createCrossword(gridSize) {
    // Start with a blank board:
    const board = generateBlankBoard(gridSize);
    
    // To be revised with algorithms to pull words from the dictionary:
    for (let i = 0; i < gridSize; i++) {
        console.log('----------------------------------------');
        for (let j = 0; j < gridSize; j++) {
            const test = Math.floor( Math.random() * 1000) / 1000;
            console.log(`the random number is ${ test }`)
            if (test > 0.5) {
                board[i][j] = test;
            } else {
                board[i][j] = test;
            }
        }
    }
    
    return board;
}


// Function to generate a matrix of numbers for the board positions:
function createNumbers(gridSize) {
    // Start with a blank board:
    const board = generateBlankBoard(gridSize);
    
    // To be revised with algorithms to pull words from the dictionary:
    for (let i = 0; i < gridSize; i++) {
        console.log('----------------------------------------');
        for (let j = 0; j < gridSize; j++) {
            board[i][j] = gridSize * i + j;
        }
    }
    
    return board;
}


// Function to retrieve a random word of a given length, return the word and it's definition:
function retrieveWord(length) {
    const word = {};

    // Save ALL of the words with the correct length:
    const wordsCorrectLength = [];
    for (let word in ALL_WORDS) {
        if (word.length == length) {
            wordsCorrectLength.push(word);
            console.log(`${ word } is a word with ${ length } letters`);
        };
    };

    console.log(wordsCorrectLength);

    word['word'] = wordsCorrectLength[ Math.floor( Math.random() * wordsCorrectLength.length ) ];
    word['definition'] = ALL_WORDS[word.word];

    return word;
}


// Function to chcek if the puzzle has been finished:
function checkWinner() {
    // NOTE: TO BE REVISED

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
    // Empty out the board:
    elements.board.innerHTML = '';
    
    // Loop through the rows of the board and make a div for each row:
    for (let i = 0; i < state.gridSize; i++) {
        rowElement = document.createElement('div');
        rowElement.classList.add('flex', 'flex-row', 'justify-center');
        // rowElement.classList.add('key-letter', 'bg-yellow-400');
        
        // Loop through the 'sqaures' on each row and make a div for each square:
        for (let j = 0; j < state.gridSize; j++) {
            squareElement = document.createElement('div');
            squareElement.classList.add('border-solid', 'border', 'border-slate-800', 'h-8', 'w-8', 'py', 'flex', 'justify-center');
            // squareElement.classList.add('key-letter', 'bg-yellow-400');
            squareElement.innerText = state.boardSolution[i][j];

            if (state.boardSolution[i][j] == 'A') {
                squareElement.classList.add('bg-black');
            } else {
                squareElement.classList.add('bg-white');
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