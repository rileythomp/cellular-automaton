class Turmite {
    constructor(row, col, dir, transition_table, state) {
        this.row = row;
        this.col = col;
        this.cell_view = board_view.children[this.row].children[this.col];
        let data_color = this.cell_view.getAttribute('data-color');
        this.color = colors.indexOf(data_color);
        this.dir = dir;
        this.transition_table = transition_table;
        this.state = state;
    }

    turn_right() {
        this.dir = (this.dir + 1) % 4;
    }

    turn_left() {
        this.dir = (this.dir == directions.north ? directions.west : this.dir - 1);
    }

    turn_backwards() {
        this.dir = (this.dir + 2) % 4;
    }

    move() {
        let transition = this.transition_table[this.state][this.color];
        let write_color = transition.color;
        let turn = transition.turn;
        let new_state = transition.state;

        let color = colors[write_color];
        this.cell_view.style.backgroundColor = color;
        this.cell_view.setAttribute('data-color', color);

        // 1 no turn
        // 2 right
        // 4 u turn
        // 8 left
        if (turn == 1) {
            this.turn_right();
        } else if (turn == 2) {
            this.turn_left();
        } else if (turn == 3) {
            this.turn_backwards();
        }
        this.state = new_state;

        if (this.dir == directions.north) {
            this.row = (this.row == 0 ? board_len - 1 : this.row - 1);
        } else if (this.dir == directions.east) {
            this.col = (this.col + 1) % board_len;
        } else if (this.dir == directions.south) {
            this.row = (this.row + 1) % board_len;
        } else if (this.dir == directions.west) {
            this.col = (this.col == 0 ? board_len - 1 : this.col - 1);
        }

        this.cell_view = board_view.children[this.row].children[this.col];
        let data_color = this.cell_view.getAttribute('data-color');
        this.color = colors.indexOf(data_color);
    }
};

let turmites = [];
let turmite_interval;

let turmite_row = board_len / 2;
let turmite_col = board_len / 2;
let turmite_dir = directions.north;
let turmite_state = 0;

document.getElementById('toggle-ant').addEventListener('click', function () {
    if (this.innerHTML == 'Start') {
        let iterations = Number(document.getElementById('iterations-per-interval').value);
        let interval_time = Number(document.getElementById('interval-time').value);
        let stop = false;
        let transition_table_index = Number(document.getElementById('turmite-config').value);
        let transition_table;
        if (transition_table_index >= transition_tables.length) {
            transition_table = {
                // states
                0: {
                    // colors
                    0: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)},
                    1: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)},
                    2: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)}
                },
                1: {
                    0: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)},
                    1: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)},
                    2: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)}
                },
                2: {
                    0: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)},
                    1: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)},
                    2: {color: getRand(0, 3), turn: getRand(1, 3), state: getRand(0, 3)}
                }
            }
        } else {
            transition_table = transition_tables[transition_table_index];
        }

    if (starting) {
        turmites.push(new Turmite(turmite_row, turmite_col, turmite_dir, transition_table, turmite_state));
        starting = false;
    }

    if(isNaN(iterations)) {
        document.getElementById('iterations-per-interval').style.border = '1px solid red';
        stop = true;
    }

    if (isNaN(interval_time)) {
        document.getElementById('interval-time').style.border = '1px solid red';
        stop = true;
    }

    if (stop) {
        turmites = [];
        return;
    }

    this.innerHTML = 'Stop';
    document.getElementById('reset').style.display = 'inline';

    turmite_interval = setInterval(function () {
        for (let i = 0; i < iterations; ++i) {
            for (let j = 0; j < turmites.length; ++j) {
                let turmite = turmites[j];

                turmite.move();

                if (j == turmites.length - 1) {
                    count++;
                }
                document.getElementById('iterations').innerHTML = count;
            }
        }
    }, interval_time)
        } else {
        clearInterval(turmite_interval);
        this.innerHTML = 'Start';
    }
})

document.getElementById('reset').addEventListener('click', function () {
    clearInterval(turmite_interval);
    document.getElementById('toggle-ant').innerHTML = 'Start';
    let cells = board_view.getElementsByTagName('td');
    for (let i = 0; i < cells.length; ++i) {
        cells[i].style.backgroundColor = '#ffffff';
        cells[i].setAttribute('data-color', '#ffffff');
    }
    this.style.display = 'none';
    count = 0;
    document.getElementById('iterations').innerHTML = count;
    turmites = [];
    starting = true;
})
