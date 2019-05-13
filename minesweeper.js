document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
 var board = generateBoard();

function startGame () {
	//loop through cells and label surrounding mines
	board.cells.forEach(
		function(cell){
			cell.surroundingMines = countSurroundingMines(cell);
		}
	);

	//Check for win
	document.addEventListener("click", function(event){checkForWin()});
	document.addEventListener("contextmenu", function(event){checkForWin()});

	//Initialise board
	lib.initBoard()
}

function checkForWin () {
	var win = true;

	board.cells.forEach(
		function(cell){
			//check all of the mines are marked
			if(cell.isMine == true && cell.isMarked == false){
				win = false;
				console.log ('there are mines that are not marked')
			}
			//check all cells that are NOT mines are visible
			if(cell.isMine == false && cell.hidden == true){
				win = false;
				console.log ('there are still hidden cells that are not mines')
			}
		}
	);
	
	if(win){
		lib.displayMessage('You win!')
		console.log(board);
	}
}

function countSurroundingMines (cell) {
	//get surrounding cells
	var surroundingCells = getSurroundingCells(cell.row, cell.col);

	//loop though surrounding cells to count surrounding mines
	var count = 0;
	surroundingCells.forEach(
		function(cell){
			if(cell.isMine){
				count++;
			}
		}
	);
	return count;
}

function generateBoard(){
	let board = {};
	// define board size
	// lay mines

	/*
	let board = {
		cells: [
			{row: 0, col: 0, isMine: false, hidden: true}, 
			{row: 0, col: 1, isMine: false, hidden: true}, 
			{row: 0, col: 2, isMine: false, hidden: true}, 
			{row: 1, col: 0, isMine: true, isMarked: false, hidden: true}, 
			{row: 1, col: 1, isMine: false, hidden: true}, 
			{row: 1, col: 2, isMine: false, hidden: true}, 
			{row: 2, col: 0, isMine: false, hidden: true}, 
			{row: 2, col: 1, isMine: true, isMarked: false, hidden: true}, 
			{row: 2, col: 2, isMine: false, hidden: true}
		]
	}
	*/
	return board;
}
