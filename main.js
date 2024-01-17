const board = document.querySelector('.board')
const box = document.querySelectorAll('.box')

const CrossWin = document.querySelector('#countWinCross');
const NoughtWin = document.querySelector('#countWinNought');
const resetingButton = document.querySelector('.reset');

const cross = document.querySelector('#cross')
const nought = document.querySelector('#nought')

let countWinCross = 0;
let countWinNought = 0;

let isCross = false
let won = false

let field = creatingField()

function reset() {
    console.log(field)
    field = creatingField();
    for (let i = 0; i < box.length; i++) {
        const element = box[i];
        element.style.backgroundImage = '';
    }
    cross.style.visibility = 'hidden'
    nought.style.visibility = 'hidden'
    won = false
}

function creatingField() {
    let techField = []
    let len = 0
    for (i = 0; i < 3; i++) {
        techField.push([]);
        for (j = 0; j < 3; j++) {
            techField[i].push(box[len].id)
            len++
        }
    }
    return techField;
}

resetingButton.addEventListener('click', reset)

board.addEventListener('click', (event) => {
    const selectedItem = event.target;
    changes(selectedItem);
})

function makeTurn(selectedItem) {
    if (won === true) {
        return
    }
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[0].length; y++) {
            if (field[x][y] === selectedItem.id) {
                if (isCross === true) {
                    field[x][y] = 1;
                    selectedItem.style.backgroundImage = 'url(images/cross.png)';
                    isCross = false;
                }
                else {
                    selectedItem.style.backgroundImage = 'url(images/nought.png)';
                    field[x][y] = -1;
                    isCross = true;
                }
            }
        }
    }
}

function isAnyFreeCell() {
    let counter = 0
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === -1 || field[i][j] === 1) {
                counter += 1
            }
        }
    }
    if (counter === 9) {
        return false
    }
    return true
}

function changes(selectedItem) {
    makeTurn(selectedItem);
    endGameLogic();
}

function endGameLogic() {
    if (isAnyFreeCell()) {
        const won_row = isWonRow();
        const won_col = isWonCoulumn();
        const main_diagon_won = isWonDiaganal();
        const addied_diag_won = isWonDiaganalSecond();
    }
    if(won === false && !isAnyFreeCell()) {
        // need create visual for tie
        console.log(1)
    }
}

function isWonRow() {
    let countWin = 0;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === -1 || field[i][j] === 1) {
                countWin += field[i][j];
            }
        }
        if (countWin === 3 || countWin === -3) {
            alertWin(countWin)
            return i
        }
        countWin = 0
    }
}

function isWonCoulumn() {
    let countWin = 0;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[j][i] === -1 || field[j][i] === 1) {
                countWin += field[j][i];
            }
        }
        if (countWin === 3 || countWin === -3) {
            alertWin(countWin)
            return i
        }
        countWin = 0
    }
}

function isWonDiaganal() {
    let countWin = 0;
    for (let i = 0; i < field.length; i++) {
        if (field[i][i] === -1 || field[i][i] === 1) {
            countWin += field[i][i];
        }
    }
    if (countWin === 3 || countWin === -3) {
        alertWin(countWin)
        return countWin
    }
}

function isWonDiaganalSecond() {
    let countWin = 0;
    for (let i = 0; i < field.length; i++) {
        if (field[i][2 - i] === -1 || field[i][2 - i] === 1) {
            countWin += field[i][2 - i];
        }
    }
    if (countWin === 3 || countWin === -3) {
        alertWin(countWin)
        return countWin
    }
}

function alertWin(countWin) {
    if (countWin === 3 && won === false) {
        cross.style.visibility = 'visible'
        nought.style.visibility = 'hidden'
        won = true
    }
    if (countWin === -3 && won === false) {
        nought.style.visibility = 'visible'
        cross.style.visibility = 'hidden'
        won = true
    }
}