const board_len = 180;
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

String.prototype.valid_ant_pattern = function() {
    for (let i = 0; i < this.length; ++i) {
        if (this[i] != 'L' && this[i] != 'R') {
            return false;
        }
    }

    return this.length <= 22;
}

Number.prototype.is_between = function(a, b) {
    return this >= a && this <= b;
}

function remove_ant_row() {
    let row = this;
    while (row.tagName != 'TR') {
        row = row.parentElement;
    }
    row.remove();
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

let ants = [];
let ant_interval;
let turmite_interval;
let count = 0;

let removes = document.getElementsByClassName('fa-times');

for (let i = 0; i < removes.length; ++i) {
    removes[i].addEventListener('click', remove_ant_row);
}

document.getElementById('add-ant').addEventListener('click', function() {
    let row = document.createElement('tr');
    row.innerHTML = "<td>" + (document.getElementById('ant-table').children[0].children.length) + ".</td>" +
                    "<td>" +
                        "<input type='text' value='LR'>" +
                    "</td>" +
                    "<td>" +
                        "<input type='number' max='119' min='0' value='60'>" +
                    "</td>" +
                    "<td>" +
                        "<input type='number' max='119' min='0' value='60'>" +
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
    document.getElementById('ant-table').insertAdjacentElement('beforeend', row);
    row.children[5].addEventListener('click', remove_ant_row);
    row.classList.add('ant');
})

let turmites = [];

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let starting = true;

document.getElementById('toggle-ant').addEventListener('click', function() {
    if (this.innerHTML == 'Start') {
        let iterations = Number(document.getElementById('iterations-per-interval').value);
        let interval_time = Number(document.getElementById('interval-time').value);
        let ant_rows = document.getElementsByClassName('ant');
        let stop = false;

        // for (let i = ants.length; i < ant_rows.length; ++i) {
        //     let ant_row = ant_rows[i];
        //     let pattern = ant_row.children[1].children[0].value.toUpperCase();
        //     let row = Number(ant_row.children[2].children[0].value);
        //     let col = Number(ant_row.children[3].children[0].value);
        //     let dir = ant_row.children[4].children[0].value;
        //     if (!pattern.valid_ant_pattern()) {
        //         stop = true;
        //     }
        //     if (!row.is_between(0, 149) || !col.is_between(0, 149)) {
        //         stop = true;
        //     }
        //     ants.push(new Ant(row, col, dir, pattern));
        // }

        // let transition_table = {
        //     // states
        //     0: {
        //         // colors
        //         0: {
        //             color: 1,
        //             turn: 2,
        //             state: 0
        //         },
        //         1: {
        //             color: 1,
        //             turn: 2,
        //             state: 1
        //         }
        //     },
        //     1: {
        //         0: {
        //             color: 0,
        //             turn: 1,
        //             state: 0
        //         },
        //         1: {
        //             color: 0,
        //             turn: 1,
        //             state: 1
        //         }
        //     }
        // }

        // let transition_table = {
        //     // states
        //     0: {
        //         // colors
        //         0: {
        //             color: 1,
        //             turn: 1,
        //             state: 1
        //         },
        //         1: {
        //             color: 1,
        //             turn: 8,
        //             state: 0
        //         }
        //     },
        //     1: {
        //         0: {
        //             color: 1,
        //             turn: 2,
        //             state: 1
        //         },
        //         1: {
        //             color: 0,
        //             turn: 1,
        //             state: 0
        //         }
        //     }
        // }

        // let transition_table = {
        //     // states
        //     0: {
        //         // colors
        //         0: {
        //             color: 1,
        //             turn: 2,
        //             state: 1
        //         },
        //         1: {
        //             color: 0,
        //             turn: 2,
        //             state: 1
        //         }
        //     },
        //     1: {
        //         0: {
        //             color: 1,
        //             turn: 1,
        //             state: 0
        //         },
        //         1: {
        //             color: 1,
        //             turn: 1,
        //             state: 1
        //         }
        //     }
        // }

        // let transition_table = {
        //     // states
        //     0: {
        //         // colors
        //         0: {
        //             color: 1,
        //             turn: 2,
        //             state: 1
        //         },
        //         1: {
        //             color: 1,
        //             turn: 8,
        //             state: 1
        //         }
        //     },
        //     1: {
        //         0: {
        //             color: 1,
        //             turn: 2,
        //             state: 1
        //         },
        //         1: {
        //             color: 0,
        //             turn: 2,
        //             state: 0
        //         }
        //     }
        // }

        // let transition_table = {
        //     // states
        //     0: {
        //         // colors
        //         0: {
        //             color: 1,
        //             turn: 8,
        //             state: 0
        //         },
        //         1: {
        //             color: 1,
        //             turn: 2,
        //             state: 1
        //         }
        //     },
        //     1: {
        //         0: {
        //             color: 0,
        //             turn: 2,
        //             state: 0
        //         },
        //         1: {
        //             color: 0,
        //             turn: 8,
        //             state: 1
        //         }
        //     }
        // }

        // let transition_table = {
        //     // states
        //     0: {
        //         // colors
        //         0: {
        //             color: 1,
        //             turn: 8,
        //             state: 1
        //         },
        //         1: {
        //             color: 1,
        //             turn: 8,
        //             state: 1
        //         }
        //     },
        //     1: {
        //         0: {
        //             color: 1,
        //             turn: 2,
        //             state: 1
        //         },
        //         1: {
        //             color: 0,
        //             turn: 1,
        //             state: 0
        //         }
        //     }
        // }

        // let transition_table = {
        //     // states
        //     0: {
        //         // colors
        //         0: {
        //             color: 1,
        //             turn: 8,
        //             state: 1
        //         },
        //         1: {
        //             color: 1,
        //             turn: 2,
        //             state: 0
        //         }
        //     },
        //     1: {
        //         0: {
        //             color: 1,
        //             turn: 4,
        //             state: 1
        //         },
        //         1: {
        //             color: 1,
        //             turn: 4,
        //             state: 2
        //         }
        //     },
        //     2: {
        //         0: {
        //             color: 0,
        //             turn: 0,
        //             state: 0
        //         },
        //         1: {
        //             color: 0,
        //             turn: 4,
        //             state: 0
        //         }
        //     }
        // }

        
        let transition_table = {
            // states
            0: {
                // colors
                0: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                },
                1: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                },
                2: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                }
            },
            1: {
                0: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                },
                1: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                },
                2: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                }
            },
            2: {
                0: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                },
                1: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                },
                2: {
                    color: getRand(0, 3),
                    turn: getRand(1, 3),
                    state: getRand(0, 3)
                }
            }
        }

        if (starting) {
            turmites.push(new Turmite(90, 90, 0, transition_table, 0));
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
            // ants = [];
            turmites = [];
            return;
        }

        this.innerHTML = 'Stop';     
        document.getElementById('reset').style.display = 'inline';   

        // ant_interval = setInterval(function() {
        //     for (let i = 0; i < iterations; ++i) {
        //         for (let j = 0; j < ants.length; ++j) {
        //             let ant = ants[j];
        //             let cur_index = Number(colors.indexOf(ant.color));
            
        //             if (ant.pattern[cur_index] == 'R') {
        //                 ant.turn_right();
        //             } else {
        //                 ant.turn_left();
        //             }
                
        //             let new_color = colors[(cur_index + 1) % ant.pattern.length];
        //             ant.move(new_color);
        //             if (j == ants.length - 1) {
        //                 count++;
        //             }
        //             document.getElementById('iterations').innerHTML = count;
        //         }
        //     }
        // }, interval_time)

        turmite_interval = setInterval(function() {
            for (let i = 0; i < iterations; ++i) {
                for (let j = 0; j < turmites.length; ++j) {
                    let turmite = turmites[j];

                    // let cur_index = Number(colors.indexOf(turmite.color));
            
                    // if (ant.pattern[cur_index] == 'R') {
                    //     ant.turn_right();
                    // } else {
                    //     ant.turn_left();
                    // }
                
                    // let new_color = colors[(cur_index + 1) % ant.pattern.length];
                    // ant.move(new_color);

                    turmite.move();

                    if (j == turmites.length - 1) {
                        count++;
                    }
                    document.getElementById('iterations').innerHTML = count;

                    // if (count >= 306000) {
                    //     clearInterval(turmite_interval);
                    // }
                }
            }
        }, interval_time)
    } else {
        // clearInterval(ant_interval);
        clearInterval(turmite_interval);
        this.innerHTML = 'Start';
    }
})

document.getElementById('reset').addEventListener('click', function() {
    // clearInterval(ant_interval);
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
    // ants = [];
    turmites = [];
    starting = true;
})
