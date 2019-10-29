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