const board = document.querySelector('.board')
const box = document.querySelectorAll('.box')

const CrossWin = document.querySelector('#countWinCross');
const NoughtWin = document.querySelector('#countWinNought');
const resetingButton = document.querySelector('.reset');
const newgameButton = document.querySelector('.newGame')

const cross = document.querySelector('#cross')
const nought = document.querySelector('#nought')

const CrossCount = document.querySelector('#crossCount')
const NoughtCount = document.querySelector('#noughtCount')

let countWinCross = 0;
let countWinNought = 0;

let isCross = false
let won = false

let field = creatingField()

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

function updateWinCount() {
    CrossCount.textContent = countWinCross
    NoughtCount.textContent = countWinNought
}

function reset() {
    field = creatingField();
    for (let i = 0; i < box.length; i++) {
        const element = box[i];
        element.style.backgroundImage = '';
    }
    won = false
}

function newGame() {
    reset()
    countWinCross = 0
    countWinNought = 0
    updateWinCount()
}

resetingButton.addEventListener('click', reset)
newgameButton.addEventListener('click', newGame)

box.forEach(element => {
    element.addEventListener("click", (event) => {
        const selectedItem = event.target;
        changes(selectedItem);
    })
})

function makeTurn(selectedItem) {
    if (won) {
        return
    }
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field.length; y++) {
            if (field[x][y] === selectedItem.id) {
                if (isCross) {
                    field[x][y] = 1;
                    selectedItem.style.backgroundImage = 'url(images/newNought.jpg)';
                    isCross = false;
                }
                else {
                    selectedItem.style.backgroundImage = 'url(images/newCross.jpg)';
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
        for (let j = 0; j < field.length; j++) {
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

function Draw_win_line(type, pos) {
    switch (type) {
        case 'row':
            console.log(pos, 'row won')
            break;
        case 'col':
            console.log(pos, 'col won')
            break;
        case 'main_diag':
            console.log('main_diag won')
            break;
        case 'side_diag':
            console.log('side_diag won')
            break;
    }
}

function endGameLogic() {
    if (isAnyFreeCell()) {
        isWonRow();
        isWonCoulumn();
        isWonDiaganal();
        isWonDiaganalSecond();
    }
    if (!won && !isAnyFreeCell()) {
        // need create visual for tie
        countWinCross += 1
        countWinNought += 1
        updateWinCount()
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
            Draw_win_line('row', i)
            return
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
            Draw_win_line('col', i)
            return
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
        Draw_win_line('main_diag')
        return
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
        Draw_win_line('side_diag')
        return
    }
}

function alertWin(countWin) {
    if (countWin === 3 && won === false) {
        countWinCross += 1
        won = true
    }
    if (countWin === -3 && won === false) {
        countWinNought += 1
        won = true
    }
    updateWinCount()
}