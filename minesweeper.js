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
			}
			//check all cells that are NOT mines are visible
			if(cell.isMine == false && cell.hidden == true){
				win = false;
			}
		}
	);
	
	if(win){
		lib.displayMessage('You win!')
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

function generateCell(row,col,isMine){
	let cell = {
		row: row,
		col: col,
		isMine: isMine,
		isMarked: false,
		hidden: true
	}
	return cell;
}

function calcNumOfMines(cells, dificulty){
	//Calculate number of mines to lay based on deficulty
	switch(dificulty){
		case 'easy':
			return cells.length * 0.2
		break;
		case 'normal':
			return cells.length * 0.3
		break;
		case 'hard':
			return cells.length * 0.4
		break;
		case 'impossible':
			return cells.length
		break;
	}
	
}

function layMines(cells, dificulty){
	//get number of mines
	let numOfMines = calcNumOfMines(cells, dificulty);

	while(numOfMines > 0) {
		//get a random cell
		let randomCell = Math.floor(Math.random()*cells.length);
		//check that there is no mine before laying
		if(cells[randomCell].isMine === false){
			cells[randomCell].isMine = true;
			numOfMines--;
		}
	}
}

function generateBoard(){
	let board = {
		cells: [],
		gridSize: 36
	};
	
	//columns and rows will be equal to the square root of gridSize
	const numOfRows = Math.sqrt(board.gridSize);
	const numOfCols = numOfRows;
	
	//loop to create each row
	for( var row = 0; row < numOfRows; row++) {

		//loop to create a cell for each column in this row
		for (var col = 0; col < numOfCols; col++) {
			if(col > numOfCols){
				col = 0;
			}
			//generate cell
			board.cells.push(generateCell(row,col,false));
		}
	}
	
	// lay mines
	layMines(board.cells, 'normal');

	return board;
}
