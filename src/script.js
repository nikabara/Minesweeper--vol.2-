let board = []; // 2d array

const ROWS = 8;
const COLUMNS = 8;

const MINE_COUNT = 8;
var minesLocation = []; // 2d array

let tilesClicked = 0; // goes up when tile clicked (goal is to click all tiles)
let flagEnabled = false;

let gameOver = false;

let startTimer = false;

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
    document.getElementById("game").addEventListener('contextmenu', function (event) {
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

function markTile() {
    if (this.classList.contains("Hidden")) {
        this.classList.toggle("Marked");
    }
}



function clickTile() {
    if (startTimer == false) {
        startTimer = true;
        digitalTimer(1000, startTimer);
    }
    console.log(startTimer);

    if (gameOver || this.classList.contains("tile-clicked") || this.classList.contains("Marked")) {
        return;
    }

    this.classList.remove("Hidden");

    if (minesLocation.includes(this.id)) {
        document.getElementById("restart").style.backgroundImage = 'url("../images/Dead.png")';
        this.classList.add("TrippedBomb");
        gameOver = true;
        startTimer = false;
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
            if (minesLocation.includes(tile.id)) {
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

    minesFound += checkTile(r - 1, c - 1);
    minesFound += checkTile(r - 1, c);
    minesFound += checkTile(r - 1, c + 1);

    minesFound += checkTile(r, c - 1);
    minesFound += checkTile(r, c + 1);

    minesFound += checkTile(r + 1, c - 1);
    minesFound += checkTile(r + 1, c);
    minesFound += checkTile(r + 1, c + 1);

    if (minesFound > 0) {
        board[r][c].classList.add(BombCountToNumberImage(minesFound));
    }
    else {
        checkMine(r - 1, c - 1);    //top left
        checkMine(r - 1, c);      //top
        checkMine(r - 1, c + 1);    //top right

        //left and right
        checkMine(r, c - 1);      //left
        checkMine(r, c + 1);      //right

        //bottom 3
        checkMine(r + 1, c - 1);    //bottom left
        checkMine(r + 1, c);      //bottom
        checkMine(r + 1, c + 1);    //bottom right
    }

    // Win condition
    if (tilesClicked == ROWS * COLUMNS - MINE_COUNT) {
        startTimer = true;
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

function checkTile(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS) {
        return 0;
    }

    return minesLocation.includes(`${r}-${c}`) ? 1 : 0;
}

const numericToDigital = (number) => {
    switch (number) {
        case 0:
            return "url(https://minesweeper.online/img/skins/hd/d0.svg?v=14)";
        case 1:
            return "url(https://minesweeper.online/img/skins/hd/d1.svg?v=14)";
        case 2:
            return "url(https://minesweeper.online/img/skins/hd/d2.svg?v=14)";
        case 3:
            return "url(https://minesweeper.online/img/skins/hd/d3.svg?v=14)";
        case 4:
            return "url(https://minesweeper.online/img/skins/hd/d4.svg?v=14)";
        case 5:
            return "url(https://minesweeper.online/img/skins/hd/d5.svg?v=14)";
        case 6:
            return "url(https://minesweeper.online/img/skins/hd/d6.svg?v=14)";
        case 7:
            return "url(https://minesweeper.online/img/skins/hd/d7.svg?v=14)";
        case 8:
            return "url(https://minesweeper.online/img/skins/hd/d8.svg?v=14)";
        case 9:
            return "url(https://minesweeper.online/img/skins/hd/d9.svg?v=14)";
    }
}

const displayDigitalNumber = (array) => { // ['1', '2', '3']
    console.log(array);
    document.getElementById("time-count-digit-0").style.backgroundImage = numericToDigital(array[0]);
    document.getElementById("time-count-digit-1").style.backgroundImage = numericToDigital(array[1]);
    document.getElementById("time-count-digit-2").style.backgroundImage = numericToDigital(array[2]);
}

function digitalTimer (interval, start) {
    console.log(start)
    if (start) {
        let time = -1;
            setInterval(() => {
                time++;
                if (time < 10) {
                    displayDigitalNumber([0, 0, time]);
                }
                else if (time >= 10 && time < 100) {
                    displayDigitalNumber([0, Number(time.toString().split("")[0]), Number(time.toString().split("")[1])]);
                }
                else if (time >= 100 && time < 1000){
                    displayDigitalNumber([Number(time.toString().split("")[0]), Number(time.toString().split("")[1]), Number(time.toString().split("")[2])]);
                }
                else {
                    console.log(time);
                }
            }, interval);
    }
}