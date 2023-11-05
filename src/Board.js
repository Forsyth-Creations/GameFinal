class Grid {
    constructor(rows, cols, cellSize, renderDistance) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.renderDistance = renderDistance;

        this.image = loadImage('assets/Scenary/grass.jpg')
        console.log("Render distance: " + this.renderDistance)

        this.x_index = 0
        this.y_index = 0
    }

    draw() {
        // compute starting x and y, contrain to 0 to cols/rows

        let start_x = constrain(this.x_index - this.renderDistance, 0, this.cols - 1)
        let start_y = constrain(this.y_index - this.renderDistance, 0, this.rows - 1)
        let max_x = constrain(this.x_index + this.renderDistance, 0, this.cols)
        let max_y = constrain(this.y_index + this.renderDistance, 0, this.rows)

        for (let i = start_x; i < max_x && i < this.cols; i++) {
            for (let j = start_y; j < max_y && j < this.rows; j++) {
                let x = i * this.cellSize;
                let y = j * this.cellSize;
                stroke(0);
                noFill();
                rect(x, y, this.cellSize, this.cellSize);
                // write the grid location as text
                fill(GAME_GRAY_HOVER);
                textSize(12);
                textAlign(CENTER, CENTER);
                text(i + "," + j, x + this.cellSize / 2, y + this.cellSize / 2);
            }
        }
    }

    setPosition(x, y)
    {
        this.x_index = constrain(x, 0, this.cols - 1);
        this.y_index = constrain(y, 0, this.rows - 1);
    }
}

class GameBoard extends Grid {
    constructor(rows, cols, cellSize, renderDistance) {
        super(rows, cols, cellSize, renderDistance);
        this.grid = [];
        this.rocks = [];
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements();
    }

    createElements() {
        for (let i = 0; i < GAME_BOARD_1.length; i++) {
            let row = GAME_BOARD_1[i][0].split("");
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

        let start_x = constrain(this.x_index - this.renderDistance, 0, this.cols - 1)
        let start_y = constrain(this.y_index - this.renderDistance, 0, this.rows - 1)
        let max_x = constrain(this.x_index + this.renderDistance, 0, this.cols)
        let max_y = constrain(this.y_index + this.renderDistance, 0, this.rows)

        for (let i = start_x; i < max_x && i < this.cols; i++) {
            for (let j = start_y; j < max_y && j < this.rows; j++) {
                // draw the rock if it's grid position is within the render distance
                for (let k = 0; k < this.rocks.length; k++) {
                    if (this.rocks[k].gridPosX == i && this.rocks[k].gridPosY == j) {
                        this.rocks[k].draw();
                    }
                }
            }
        }

        // for (let i = 0; i < this.rocks.length; i++) {
        //     this.rocks[i].draw();
        // }
        this.pacman.move();
        this.pacman.draw();
    }

    resetAll() {
        this.rocks = []
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements()
    }
}