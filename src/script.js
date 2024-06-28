let board = []; // 2d array

const ROWS = 8;
const COLUMNS = 8;

const MINE_COUNT = 10;
var minesLocation = []; // 2d array

let tilesClicked = 0; // goes up when tile clicked (goal is to click all tiles)
let flagEnabled = false;

let gameOver = false;   

window.onload = () => {
    startGame();
}

const BombCountToNumberImage = (bombCount) => {
    switch (bombCount) {
        case 1:
            return "NumberOne";
            
        case 2:
            return "NumberTwo";
            
        case 3:
            return "NumberThree";
        
        case 4:
            return "NumberFour";
    
        default:
            break;
    }
}

const setMines = () => {
    minesLocation.push("2-2");
    minesLocation.push("2-3");
    minesLocation.push("5-6");
    minesLocation.push("3-4");
    minesLocation.push("1-1");
}

const startGame = () => {
    setMines();

    for (let r = 0; r < ROWS; r++) {
        let row = [];
        for (let c = 0; c < COLUMNS; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board)
}

function clickTile () {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    if (minesLocation.includes(this.id)) {
        gameOver = true;
        revealTiles();
        return;
    }

    let coords = this.id.split('-'); 
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);

    checkMine(row, col);
}

const revealTiles = () => {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLUMNS; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)){
                document.getElementById(`${tile.id}`).classList.add("Bomb");
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    let minesFound = 0;

    board[r][c].classList.add("tile-clicked");
    tilesClicked++;

    minesFound += checkTile(r-1, c-1);
    minesFound += checkTile(r-1, c);
    minesFound += checkTile(r-1, c+1);

    minesFound += checkTile(r, c-1);
    minesFound += checkTile(r, c+1);

    minesFound += checkTile(r+1, c-1);
    minesFound += checkTile(r+1, c);
    minesFound += checkTile(r+1, c+1);

    if (minesFound > 0) {
        board[r][c].classList.add(BombCountToNumberImage(minesFound));
    }
    else {
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        //left and right
        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        //bottom 3
        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if (tilesClicked == ROWS * COLUMNS - MINE_COUNT) {
        // alert("YOU WIN")
    }
}

function checkTile (r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS) {
        return 0;
    }

    return minesLocation.includes(`${r}-${c}`) ? 1 : 0;
}