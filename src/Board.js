class Grid {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let x = i * this.cellSize;
                let y = j * this.cellSize;
                stroke(0);
                noFill();
                rect(x, y, this.cellSize, this.cellSize);
            }
        }
    }
}

class GameBoard extends Grid {
    constructor(rows, cols, cellSize) {
        super(rows, cols, cellSize);
        this.grid = [];
        this.rocks = [];
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements();
    }

    createElements() {
        for (let i = 0; i < GAME_BOARD.length; i++) {
            let row = GAME_BOARD[i][0].split("");
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                if (cell == "C") {
                    drawPrize(0, 0)
                }
                else if (cell == "S") {
                    let rock = new Rock(j, i, this.cellSize);
                    rock.setGridPosition(j, i);
                    this.rocks.push(rock);
                }
                else if (cell == "P") {
                    this.pacman.setGridPosition(j, i);
                    this.pacman.setBounds(this.cols * this.cellSize, this.rows * this.cellSize)
                }
            }
        }
        this.pacman.setObstacles(this.rocks);
    }

    draw() {
        super.draw();
        for (let i = 0; i < this.rocks.length; i++) {
            this.rocks[i].draw();
        }
        this.pacman.move();
        this.pacman.draw();
    }

    resetAll() {
        this.rocks = []
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements()
    }
}