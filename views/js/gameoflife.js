const board_len = 50;

let board_view = document.getElementById('board');

let board_model = [];

let white = 'rgb(255,255,255)';
let green = 'rgb(163, 190, 140)';

Number.prototype.is_between = function (lower, upper) {
    return this >= lower && this <= upper;
};

function birth_cell(ev) {
    let row = Number(ev.target.getAttribute('data-row'));
    let col = Number(ev.target.getAttribute('data-col'));
    if (ev.target.style.backgroundColor == green) {
        ev.target.style.backgroundColor = white;
        board_model[row][col].alive = false;
    } else {
        ev.target.style.backgroundColor = green;
        board_model[row][col].alive = true;
    }
}

function build_board_view() {
    for (let row = 0; row < board_len; ++row) {
        let row_view = document.createElement('tr');
    
        for (let col = 0; col < board_len; ++col) {
            let cell_view = document.createElement('td');
            cell_view.setAttribute('data-row', row);
            cell_view.setAttribute('data-col', col);
            cell_view.addEventListener('click', birth_cell);
    
            row_view.appendChild(cell_view);
        }
        board_view.appendChild(row_view);
    }    
}

function build_board_model() {
    for (let row = 0; row < board_len; ++row) {
        let row_model = [];
    
        for (let col = 0; col < board_len; ++col) {
            let cell_view = document.createElement('td');
            let cell_model = new CellModel(board_model, row, col);
    
            row_model.push(cell_model)
        }
        board_model.push(row_model);
    }
}

build_board_view();
build_board_model();

let generation_interval;

// 0 north, 1 east, 2 south, 3 west
let direction = 0;
let count = 0;

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(generation_interval);
    document.getElementById('toggle-start').innerHTML = 'Start';
    let cells = board_view.getElementsByTagName('td');
    for (let i = 0; i < cells.length; ++i) {
        cells[i].style.backgroundColor = '#ffffff';
        cells[i].addEventListener('click', birth_cell);
    }
    board_model = [];
    build_board_model();
    this.style.display = 'none';
    count = 0;
    document.getElementById('iterations').innerHTML = count;
    starting = true;
})

document.getElementById('toggle-start').addEventListener('click', function(_ev) {
    if (this.innerHTML == 'Start') {
        let iterations = Number(document.getElementById('iterations-per-interval').value);
        let interval_time = Number(document.getElementById('interval-time').value);
        this.innerHTML = 'Stop';     
        document.getElementById('reset').style.display = 'inline';   
        let cells = document.getElementsByTagName('td');
        for (let i = 0; i < cells.length; ++i) {
            cells[i].removeEventListener('click', birth_cell);
        }
        count = 0;
    
        generation_interval = setInterval(function() {
            for (let i = 0; i < iterations; ++i) {
                // update the view;
                for (let row = 0; row < board_len; ++row) {
                    for (let col = 0; col < board_len; ++col) {
                        let cell_view = board_view.children[row].children[col];
                        let cell_model = board_model[row][col];
                        if (cell_model.alive && cell_model.neighbours() < 2) {
                            cell_view.style.backgroundColor = white;
                        } else if (cell_model.alive && cell_model.neighbours() > 3) {
                            cell_view.style.backgroundColor = white;
                        } else if (!cell_model.alive && cell_model.neighbours() == 3) {
                            cell_view.style.backgroundColor = green;                
                        }
                        
                    }
                }
        
                // update the model
                for (let row = 0; row < board_len; ++row) {
                    for (let col = 0; col < board_len; ++col) {
                        let cell_view = board_view.children[row].children[col];
        
                        if (cell_view.style.backgroundColor == green) {
                            board_model[row][col].alive = true;
                        } else {
                            board_model[row][col].alive = false;
                        }
                    }
                }
                count += 1;
            }
            document.getElementById('iterations').innerHTML = count;
        }, interval_time)
    } else {
        clearInterval(generation_interval);
        this.innerHTML = 'Start';
    }

})


