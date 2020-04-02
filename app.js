//Made by Qilobit
const button = document.querySelector('button');
const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', () => {
    init();
});

button.addEventListener('click', test);

//  Build the table
function init(){
    const cols = 9;
    const rows = 9;
    for(let row = 1; row <= rows; row++){
        for(let col = 1; col <= cols; col++){
            container.appendChild(createBox(col, row, (row == getRandomInt())));
        }
    }
}

function createBox(col, row, fill){
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.className = 'box';
    textBox.id = `${col}_${row}`;
    if(fill){
        textBox.value = getRandomInt();
    }
    textBox.addEventListener('blur', test);
    return textBox;
}

function getRandomInt(){
    return Number.parseInt(Math.random() * 10);
}

function test(){
    console.log('Testing game');
    const boxes = Array.from(document.querySelectorAll('.box'));
    let col = null; 
    let row = null;
    let id = null;
    let boxesSameRow = null;
    let boxesSameCol = null;
    boxes.forEach(box => {
        id = box.id.split('_');
        col = id[0];
        row = id[1];

        boxesSameRow = boxes.filter(b => {
            const id = b.id.split('_');
            return id[1] == row && id[0] != col && !!b.value;
        }).map(node => node.value);

        boxesSameCol = boxes.filter(b => {
            const id = b.id.split('_');
            return id[0] == col && id[1] != row;
        }).map(node => node.value);

        if(boxesSameRow.indexOf(box.value) !== -1){
            box.classList.add('repeated');
            console.log(`${col}_${row} = ${box.value}`);
        }

        if(boxesSameCol.indexOf(box.value) !== -1){
            box.classList.add('repeated');
            console.log(`${col}_${row} = ${box.value}`);
        }
    });
}