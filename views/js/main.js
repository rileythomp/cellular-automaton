const board_len = 100;
const directions = {
    north: 0,
    east: 1,
    south: 2,
    west: 3
}
const colors = [
    '#ffffff',
    '#e6194B',
    '#3cb44b',
    '#ffe119',
    '#4363d8',
    '#f58231',
    '#911eb4',
    '#42d4f4',
    '#f032e6',
    '#bfef45',
    '#fabebe',
    '#469990',
    '#e6beff',
    '#9A6324',
    '#fffac8',
    '#800000',
    '#aaffc3',
    '#808000',
    '#ffd8b1',
    '#000075',
    '#a9a9a9',
    '#000000'
]

let board_view = document.getElementById('board');

for (let row = 0; row < board_len; ++row) {
    let row_view = document.createElement('tr');

    for (let col = 0; col < board_len; ++col) {
        let cell_view = document.createElement('td');
        cell_view.setAttribute('data-color', '#ffffff');
        row_view.appendChild(cell_view);
    }

    board_view.appendChild(row_view);
}

function toggle_border() {
    let cells = board_view.getElementsByTagName('td');
    for (let i = 0; i < cells.length; ++i) {
        if (cells[i].style.border == '') {
            cells[i].style.border = '1px solid black'
        } else {
            cells[i].style.border = '';
        }
    }
}

Number.prototype.is_between = function(a, b) {
    return this >= a && this <= b;
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

let count = 0;
let starting = true;