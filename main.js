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

let field = creatingField()

function creatingField(){
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

resetingButton.addEventListener('click', () => {
    field = creatingField();
    for (let i = 0; i < box.length; i++) {
        const element = box[i];
        element.style.backgroundImage = '';
    }
    cross.style.visibility = 'hidden'
    nought.style.visibility = 'hidden'
})

board.addEventListener('click', (event) => {
    const selectedItem = event.target;
    changes(selectedItem);
})

function makeTurn(selectedItem) {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y].indexOf(selectedItem.id) != -1) {
                let x = field[y].indexOf(selectedItem.id);
                if (isCross === true) {
                    selectedItem.style.backgroundImage = 'url(images/cross.png)';
                    field[y][x] = 'x';
                    isCross = false;
                } else {
                    selectedItem.style.backgroundImage = 'url(images/nought.png)';
                    field[y][x] = 'o';
                    isCross = true;
                }
                break
            }
        }
    }
}

function changes(selectedItem) {
    makeTurn(selectedItem);   
    endGameLogic();
}

function endGameLogic () {
    isWonRow();
    isWonCoulumn();
    isWonDiaganal();
    isWonDiaganalSecond();
}

function isWonRow() {
    let countWin = 0;
    for(let i = 0; i < field.length; i++) {
        for(let j = 0; j < field[i].length; j++){
            if (field[i][j] === 'x'){
                countWin += 1;
            }
            if (field[i][j] === 'o'){
                countWin -= 1;
            }
        }
        if (countWin === 3) {
            alertWin(3)
            break
        }
        if (countWin === -3) {
            alertWin(-3)
            break
        }
        else{
            countWin = 0;
        }
    }
}

function isWonCoulumn() {
    let countWin = 0;
    for(let i = 0; i < field.length; i++) {
        for(let j = 0; j < field[i].length; j++){
            if (field[j][i] === 'x'){
                countWin += 1;
            }
            if (field[j][i] === 'o'){
                countWin -= 1;
            }
        }
        if (countWin === 3) {
            alertWin(3)
            break
        }
        if (countWin === -3) {
            alertWin(-3)
            break
        }
        else{
            countWin = 0;
        }
    }
}

function isWonDiaganal(){
    let countWin = 0;
    for (let i = 0; i < field.length; i++){
        if (field[i][i] === 'x'){
            countWin += 1;
        }
        if (field[i][i] === 'o'){
            countWin -= 1;
        }
    }
    alertWin(countWin)
}

function isWonDiaganalSecond(){
    let countWin = 0;
    for (let i = 0; i < field.length; i++){
        if (field[i][2 - i] === 'x'){
            countWin += 1;
        }
        if (field[i][2 - i] === 'o'){
            countWin -= 1;
        }
    }
    alertWin(countWin)
}

function alertWin(countWin){
    if (countWin === 3) {
        cross.style.visibility = 'visible'
        nought.style.visibility = 'hidden'
    }
    if (countWin === -3) {
        nought.style.visibility = 'visible'
        cross.style.visibility = 'hidden'
    }
}