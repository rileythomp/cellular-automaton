class Ant {
    constructor(row, col, dir, pattern) {
        this.row = row;
        this.col = col;
        this.cell_view = board_view.children[this.row].children[this.col];
        this.color = this.cell_view.getAttribute('data-color');
        this.dir = dir;
        this.pattern = pattern;
    }

    turn_right() {
        this.dir = (this.dir + 1) % 4;
    }

    turn_left() {
        this.dir = (this.dir == directions.north ? directions.west : this.dir - 1);
    }

    move(color) {
        this.cell_view.style.backgroundColor = color;
        this.cell_view.setAttribute('data-color', color);
    
        if (this.dir == directions.north) {
            this.row = (this.row == 0 ? board_len-1 : this.row - 1);
        } else if (this.dir == directions.east) {
            this.col = (this.col + 1) % board_len;
        } else if (this.dir == directions.south) {
            this.row = (this.row + 1) % board_len;
        } else if (this.dir == directions.west) {
            this.col = (this.col == 0 ? board_len-1 : this.col - 1);
        }
    
        this.cell_view = board_view.children[this.row].children[this.col];
        this.color = this.cell_view.getAttribute('data-color');
    }
};

let ants = [];
let ant_interval;

function remove_ant_row() {
    let row = this;
    while (row.tagName != 'TR') {
        row = row.parentElement;
    }
    row.remove();
}

let removes = document.getElementsByClassName('fa-times');

for (let i = 0; i < removes.length; ++i) {
    removes[i].addEventListener('click', remove_ant_row);
}

String.prototype.valid_ant_pattern = function() {
    for (let i = 0; i < this.length; ++i) {
        if (this[i] != 'L' && this[i] != 'R') {
            return false;
        }
    }

    return this.length <= 22;
}

document.getElementById('toggle-ant').addEventListener('click', function() {
    if (this.innerHTML == 'Start') {
        let iterations = Number(document.getElementById('iterations-per-interval').value);
        let interval_time = Number(document.getElementById('interval-time').value);
        let ant_rows = document.getElementsByClassName('ant');
        let stop = false;

        for (let i = ants.length; i < ant_rows.length; ++i) {
            let ant_row = ant_rows[i];
            let pattern = ant_row.children[1].children[0].value.toUpperCase();
            let row = Number(ant_row.children[2].children[0].value);
            let col = Number(ant_row.children[3].children[0].value);
            let dir = ant_row.children[4].children[0].value;
            if (!pattern.valid_ant_pattern()) {
                stop = true;
            }
            if (!row.is_between(0, board_len - 1) || !col.is_between(0, board_len - 1)) {
                stop = true;
            }
            ants.push(new Ant(row, col, dir, pattern));
        }

        if (starting) {
            starting = false;
        }
    
        if (isNaN(iterations)) {
            document.getElementById('iterations-per-interval').style.border = '1px solid red';
            stop = true;
        }

        if (isNaN(interval_time)) {
            document.getElementById('interval-time').style.border = '1px solid red';
            stop = true;
        }

        if (stop) {
            ants = [];
            return;
        }

        this.innerHTML = 'Stop';     
        document.getElementById('reset').style.display = 'inline';   

        ant_interval = setInterval(function() {
            for (let i = 0; i < iterations; ++i) {
                for (let j = 0; j < ants.length; ++j) {
                    let ant = ants[j];
                    let cur_index = Number(colors.indexOf(ant.color));
            
                    if (ant.pattern[cur_index] == 'R') {
                        ant.turn_right();
                    } else {
                        ant.turn_left();
                    }
                
                    let new_color = colors[(cur_index + 1) % ant.pattern.length];
                    ant.move(new_color);
                    if (j == ants.length - 1) {
                        count++;
                    }
                    document.getElementById('iterations').innerHTML = count;
                }
            }
        }, interval_time)
    } else {
        clearInterval(ant_interval);
        this.innerHTML = 'Start';
    }
})

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(ant_interval);
    document.getElementById('toggle-ant').innerHTML = 'Start';
    let cells = board_view.getElementsByTagName('td');
    for (let i = 0; i < cells.length; ++i) {
        cells[i].style.backgroundColor = '#ffffff';
        cells[i].setAttribute('data-color', '#ffffff');
    }
    this.style.display = 'none';
    count = 0;
    document.getElementById('iterations').innerHTML = count;
    ants = [];
    starting = true;
})

document.getElementById('add-ant').addEventListener('click', function() {
    let row = document.createElement('tr');
    row.innerHTML = "<td>" + (document.getElementById('ant-table').children[0].children.length) + ".</td>" +
                    "<td>" +
                        "<input type='text' value='LR'>" +
                    "</td>" +
                    "<td>" +
                        "<input type='number' max='119' min='0' value='50'>" +
                    "</td>" +
                    "<td>" +
                        "<input type='number' max='119' min='0' value='50'>" +
                    "</td>" +
                    "<td>" +
                        "<select>" +
                            "<option value='0'>North</option>" +
                            "<option value='1'>East</option>" +
                            "<option value='2'>South</option>" +
                            "<option value='3'>West</option>" +
                        "</select>" +
                    "</td>" +
                    "<td><i class='fa fa-times'></i></td>";
    document.getElementById('ant-table').children[0].insertAdjacentElement('beforeend', row);
    row.children[5].addEventListener('click', remove_ant_row);
    row.classList.add('ant');
})
