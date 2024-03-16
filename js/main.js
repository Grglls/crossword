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
    activeSquare: null,
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
elements.board.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeypress);
// document.addEventListener('keypress', handleLetterKeypress);


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
    state.activeSquare = null;
    // state.userAcross = null;
    // state.userDown = null;
    
    render();
}


// Function to set the highlighted square when a sqaure is clicked:
function handleClick(event) {
    console.log(event.target.id);
    
    // If the id is a number, exit the function:
    if (parseInt(event.target.id) >= 0) {
        // Save the id of the clicked square as the active square:
        state.activeSquare = event.target.id;
        console.log(`active square is currently: ${state.activeSquare}`);

        // Re-render the board:
        render();
    }
}


function handleKeypress(event) {
    console.log(event.keyCode);
    // Convert the index number of the active square into i and j indices:
    let indexJ = state.activeSquare % state.gridSize;
    let indexI = (state.activeSquare - indexJ )/ state.gridSize;
    console.log(`The i index is: ${ indexI }`);
    console.log(`The j index is: ${ indexJ }`);
    
    // First handle the arrow keys, for navigation:
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        console.log('Key was an arrow');
        // Handle left arrow key:
        if (event.keyCode == 37) {
            if (indexJ == 0){
                indexJ = state.gridSize - 1;
            } else {
                indexJ -= 1;
            }
            // Handle right arrow key:
        } else if (event.keyCode == 39) {
            if (indexJ == state.gridSize - 1) {
                indexJ = 0;
            } else {
                indexJ += 1;
            }
            // Handle up arrow key:
        } else if (event.keyCode == 38) {
            if (indexI == 0) {
                indexI = state.gridSize - 1;
            } else {
                indexI -= 1;
            }
            // Handle down arrow key:
        } else if (event.keyCode == 40) {
            if (indexI == state.gridSize - 1) {
                indexI = 0;
            } else {
                indexI += 1;
            }
        } 
        
        // Recalculate the active square index number:
        state.activeSquare = state.gridSize * indexI + indexJ;
    }
    
    // Then handle the letter keys, for typing a letter:
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        console.log('Key was a letter');
        
        // Set the active square to the letter pressed by the user:
        state.boardUser[indexI][indexJ] = String.fromCharCode(event.keyCode);
        
        console.table(state.boardUser);
    }
    
    // Re-render the board:
    render();
}


// Function to generate a blank board at the start of the game:
function generateBlankBoard(gridSize) {
    const blankBoard = [];
    
    // Add the blank row to the board 'n' number of times (n = gridSize):
    for (let i = 0; i < gridSize; i++) {
        const blankRow = [];
        
        // Create a blank row of length 'n' (n = gridSize):
        for (let i = 0; i < gridSize; i++) {
            blankRow.push('_');
        }
        
        blankBoard.push(blankRow)
    }

    return blankBoard;
}


// Function to create the crossword puzzle:
function createCrossword(gridSize) {
    // Start with a blank board:
    const board = generateBlankBoard(gridSize);

    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    
    // To be revised with algorithms to pull words from the dictionary:
    // Assign random letter to each square for testing purposes:
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if ( Math.random() > 0.1 ) {
                const randomNum = Math.floor( Math.random() * 26 );
                // const randomNum = Math.floor( Math.random() * 1000) / 1000;
                board[i][j] = alphabet[randomNum];
            } else {
                board[i][j] = '_';
            }
        }
    }
    
    return board;
}


// Function to generate a matrix of numbers for the board positions:
function createNumbers(gridSize) {
    // Start with a blank board:
    const boardNumbers = generateBlankBoard(gridSize);
    
    // Assign an integer to each square:
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            boardNumbers[i][j] = gridSize * i + j;
        }
    }
    
    return boardNumbers;
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
    renderMessage();
    renderPoints();
}


function renderBoard() {
    // Empty out the board each render:
    elements.board.innerHTML = '';
    
    // Loop through the rows of the board and make a div for each row:
    for (let i = 0; i < state.gridSize; i++) {
        rowElement = document.createElement('div');
        rowElement.classList.add('flex', 'flex-row', 'justify-center');
        
        // Loop through the 'sqaures' on each row and make a div for each square:
        for (let j = 0; j < state.gridSize; j++) {
            squareElement = document.createElement('div');
            squareElement.classList.add('border-solid', 'border', 'border-slate-800', 'h-10', 'w-10', 'py', 'space-y-0');
            squareElement.id = state.boardNumbers[i][j];
            
            // If the square is the active square, highlight it in yellow:
            if (state.boardNumbers[i][j] == state.activeSquare) {
                squareElement.classList.add('bg-yellow-400');
            }
            
            numberElement = document.createElement('div');
            numberElement.innerText = state.boardNumbers[i][j];
            numberElement.classList.add('leading-none', 'text-xs');
            numberElement.id = state.boardNumbers[i][j];
            
            letterElement = document.createElement('div');
            letterElement.innerText = state.boardUser[i][j];
            letterElement.classList.add('text-center', 'p-0', 'm-0');
            letterElement.classList.add('leading-none', 'text-xl', 'font-bold');
            letterElement.id = state.boardNumbers[i][j];
            
            squareElement.appendChild(numberElement);
            squareElement.appendChild(letterElement);

            // To be revised in future to use 'blank' value to trigger black background.
            if (state.boardSolution[i][j] == '_') {
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

    // Create the message in a new element:
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