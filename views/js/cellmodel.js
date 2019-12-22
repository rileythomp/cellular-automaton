class CellModel {
    constructor(board_model, row, col) {
        this.row = row;
        this.col = col;
        this.alive = false;

        this.board_model = board_model;
    }

    birth() {
        this.alive = true;
    }

    kill() {
        this.alive = false;
    }

    update() {
        if (this.alive && this.neighbours() < 2) {
            this.kill();
        } else if (this.alive && this.neighbours() > 3) {
            this.kill();
        } else if (!this.alive && this.neighbours() == 3) {
            this.birth();
        }
    }

    neighbours() {
        let neighbours = 0;
        if (this.row > 0 && this.col > 0 && this.board_model[this.row-1][this.col-1].alive) {
            neighbours += 1;
        }
        if (this.row > 0 && this.board_model[this.row-1][this.col].alive) {
            neighbours += 1;
        }
        if (this.row > 0 && this.col < this.board_model.length-1 && this.board_model[this.row-1][this.col+1].alive) {
            neighbours += 1;
        }
        if (this.col > 0 && this.board_model[this.row][this.col-1].alive) {
            neighbours += 1;
        }
        if (this.col < this.board_model.length - 1 && this.board_model[this.row][this.col+1].alive) {
            neighbours += 1;
        }
        if (this.row < this.board_model.length - 1 && this.col > 0 && this.board_model[this.row+1][this.col-1].alive) {
            neighbours += 1;
        }
        if (this.row < this.board_model.length - 1 && this.board_model[this.row+1][this.col].alive) {
            neighbours += 1;
        }
        if (this.row < this.board_model.length - 1 && this.col < this.board_model.length - 1 && this.board_model[this.row+1][this.col+1].alive) {
            neighbours += 1;
        } 
        return neighbours;
    }

    update_board(board_model) {
        this.board_model = board_model;
    }
};