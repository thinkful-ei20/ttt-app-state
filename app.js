const state = {
	xIsNext: true,
	board: Array(9).fill(null),
	winPattern: undefined,
};

function createElement (cell, index) {
	if(state.winPattern && state.winPattern.includes(index)){
		return `<div class="cell win" id="${index}">
    <p>${ state.board[index] ? state.board[index] : '&nbsp;' }</p>
  </div>`;
	}
	return `<div class="cell" id="${index}">
      <p>${ state.board[index] ? state.board[index] : '&nbsp;' }</p>
    </div>
  `;
}


function createHTML (array) {
	let html = '<div class="row">';
	array.forEach((cell, index) => {
		if(index % 3 === 2) {
			html += createElement(cell, index);
			html += (index < 8 ) ? '</div> <div class="row">' : '</div>';
		} else {
			html += createElement(cell, index);
		}
	});
	return html;
}

// State modification functions

function setMove(cellNo) {
	// convert cellNo to integer in case it's still a string from DOM
	const cell = Math.abs(cellNo);

	// if there is a winner, this action must do nothing and return
	if (state.winPattern) return;

	// if something is already in the cell, do nothing and return
	if (state.board[cell] !== null) return;

	// if xIsNext, then place 'X'; otherwise, place 'O'
	state.board[cell] = state.xIsNext ? 'X' : 'O';

	// set xIsNext to the *opposite* boolean value of current xIsNext
	state.xIsNext = !state.xIsNext;

	const winPattern = checkWinner(state.board);
	if (winPattern) {
		state.winPattern = winPattern;
	}
}

function newGame() {
	state.xIsNext = true;
	state.board = Array(9).fill(null);
	state.winPattern = null;
}

function checkWinner(board){
	const winPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];

	for (let i = 0; i < winPatterns.length; i++) {
		const winPattern = winPatterns[i];

		// Prevent win with three nulls by checking first cell isn't null
		if ( !board[winPattern[0]] ) continue;

		if ( board[winPattern[0]] === board[winPattern[1]] && board[winPattern[1]] === board[winPattern[2]] ) {
			return winPattern;
		}
	}

	return null;
}

// Render functions
function renderBoard() {
	$('.board').html(createHTML(state.board));
	console.log('render ran');
}

// Event Listeners
function onCellClick(event) {
	const cellId = $(event.target).closest('.cell').attr('id');
	setMove(cellId);
	renderBoard();
}

function onNewGameClick() {
	newGame();
	renderBoard();
}

function bindListeners() {
	$('.board').on('click', '.cell', onCellClick);
	$('#new-game').click(onNewGameClick);
}


$(() => {
	bindListeners();
	renderBoard();
});