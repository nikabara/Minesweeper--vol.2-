let board = []; // 2d array

const ROWS = 8;
const COLUMNS = 8;

const MINE_COUNT = 8;
var minesLocation = []; // 2d array

let tilesClicked = 0; // goes up when tile clicked (goal is to click all tiles)
let flagEnabled = false;

let gameOver = false;   

window.onload = () => {
    startGame();
}

document.getElementById("restart").onclick = () => {
    location.reload();
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
    let minesLeft = MINE_COUNT;

    while (minesLeft > 0) {
        let rndR = Math.floor(Math.random() * ROWS);
        let rndC = Math.floor(Math.random() * COLUMNS);
        
        let randomId = `${rndR}-${rndC}`;
        
        if (!minesLocation.includes(randomId)) {
            minesLocation.push(randomId);
            minesLeft--;
        }
    }
}

const startGame = () => {
    // hide context menu on right click over game-board
    document.getElementById("game").addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    setMines();

    for (let r = 0; r < ROWS; r++) {
        let row = [];
        for (let c = 0; c < COLUMNS; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add("Hidden");
            tile.addEventListener("click", clickTile);
            tile.addEventListener("contextmenu", markTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board)
}

function markTile () 
{
    if (this.classList.contains("Hidden")) {
        this.classList.toggle("Marked");
    }
}

function clickTile () {
    if (gameOver || this.classList.contains("tile-clicked") || this.classList.contains("Marked")) {
        return;
    }

    this.classList.remove("Hidden");

    if (minesLocation.includes(this.id)) {
        document.getElementById("restart").style.backgroundImage = 'url("../images/Dead.png")';
        this.classList.add("TrippedBomb");
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
                document.getElementById(`${tile.id}`).classList.remove("Hidden");
            }
            // Detect falsly marked tiles
            if (tile.classList.contains("Marked") && !tile.classList.contains("Bomb")) {
                tile.classList.add("FalseMarked");
                tile.classList.remove("Makred");
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
    board[r][c].classList.remove("Hidden");
    board[r][c].classList.remove("Marked");

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

    // Win condition
    if (tilesClicked == ROWS * COLUMNS - MINE_COUNT) {
        document.getElementById("board").style.pointerEvents = "none";
        document.getElementById("restart").style.backgroundImage = 'url("../images/Win.png")';
        
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLUMNS; c++) {
                let tile = board[r][c];
                
                if (minesLocation.includes(tile.id)) {
                    tile.classList.add("Marked");
                }
            }
        }
    }
}

function checkTile (r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS) {
        return 0;
    }

    return minesLocation.includes(`${r}-${c}`) ? 1 : 0;
}