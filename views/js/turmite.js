class Turmite {
    constructor(row, col, dir, transition_table, state) {
        this.row = row;
        this.col = col;
        this.cell_view = board_view.children[this.row].children[this.col];
        switch (this.cell_view.getAttribute('data-color')) {
            case '#ffffff':
                this.color = 0;
                break;
            case '#000000':
                    this.color = 1;
                    break;
            case '#add8e6':
                    this.color = 2;
                    break;
        }
        // this.color = color;
        this.dir = dir;
        // this.pattern = pattern;
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

        if (write_color == 0) {
            this.cell_view.style.backgroundColor = '#ffffff';
             this.cell_view.setAttribute('data-color', '#ffffff');
        } else if (write_color == 1) {
            this.cell_view.style.backgroundColor = '#000000'
            this.cell_view.setAttribute('data-color', '#000000');
        } else if (write_color == 2) {
            this.cell_view.style.backgroundColor = '#add836'
            this.cell_view.setAttribute('data-color', '#add8e6');
        }
        // this.cell_view.style.backgroundColor = w;
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
            this.row = (this.row == 0 ? board_len-1 : this.row - 1);
        } else if (this.dir == directions.east) {
            this.col = (this.col + 1) % board_len;
        } else if (this.dir == directions.south) {
            this.row = (this.row + 1) % board_len;
        } else if (this.dir == directions.west) {
            this.col = (this.col == 0 ? board_len-1 : this.col - 1);
        }
    
        this.cell_view = board_view.children[this.row].children[this.col];
        switch (this.cell_view.getAttribute('data-color')) {
            case '#ffffff':
                this.color = 0;
                break;
            case '#000000':
                    this.color = 1;
                    break;
            case '#add8e6':
                    this.color = 2;
                    break;
        }
        // this.color = (this.cell_view.getAttribute('data-color') == '#ffffff' ? 0 : 1)
    }
};