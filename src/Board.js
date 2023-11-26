class Grid {
    constructor(rows, cols, cellSize, renderDistance, image = null) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.renderDistance = renderDistance;

        this.image = image

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
                if (this.image == null)
                {
                    // stroke(0);
                    // noFill();
                    // rect(x, y, this.cellSize, this.cellSize);
                }
                else
                {
                    image(grass, x, y, this.cellSize, this.cellSize)
                }
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
    constructor(rows, cols, cellSize, renderDistance, bitmap = GAME_BOARD_1) {
        super(rows, cols, cellSize, renderDistance);
        this.grid = [];
        this.rocks = [];
        this.blocks = [];
        this.paths = [];
        this.bitmap = bitmap;
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements();
        this.grass_image = grass
    }

    createElements() {
        for (let i = 0; i < this.bitmap.length; i++) {
            try{
                let row = this.bitmap[i][0].split("");
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
                    else if(cell == "B")
                    {
                        let brick = new ImageBlock(j, i, this.cellSize, BRICK);
                        brick.setGridPosition(j, i);
                        this.blocks.push(brick);
                    }
                    else if(cell == "P")
                    {
                        let path = new ImageBlock(j, i, this.cellSize, PATH);
                        path.setGridPosition(j, i);
                        this.blocks.push(path);
                    }
                    else if(cell == "R")
                    {
                        let path = new GenericBlock(j, i, this.cellSize, GAME_BLACK);
                        path.setGridPosition(j, i);
                        this.blocks.push(path);
                    }
                    else if (cell == "W") {
                        let path = new ImageBlock(j, i, this.cellSize, WATER)
                        path.setGridPosition(j, i);
                        this.blocks.push(path);
                    }
                    else if (cell == "M")
                    {
                        this.pacman.setGridPosition(j, i);
                        this.pacman.setBounds(this.cols * this.cellSize, this.rows * this.cellSize)

                        // add in grass behind him
                        let path = new ImageBlock(j, i, this.cellSize, grass);
                        path.setGridPosition(j, i);
                        this.blocks.push(path);
                    }
                    else
                    {
                        let path = new ImageBlock(j, i, this.cellSize, grass);
                        path.setGridPosition(j, i);
                        this.blocks.push(path);
                    }
                } 
            }
            catch(error)
            {
                console.log("Error in GameBoard.createElements(): " + error)
                console.log("I is: " + i)
            }

        }
        this.pacman.setObstacles(this.rocks);
    }

    draw() {
        super.draw();

        this.pacman.move();
        this.pacman.draw();
        this.pacman.calculateGridPosition();
    }

    resetAll() {
        this.rocks = []
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements()
    }
}

class GridMap extends GameBoard
{
    constructor(bitmap, cellSize, renderDistance)
    {
        super(bitmap.length, bitmap[0][0].length, cellSize, renderDistance, bitmap);
        console.log("GridMap constructor")
        
        // rows and columns
        this.bitmap = bitmap;
        this.grid = [];
        this.rocks = [];
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements();

        this.otherElements = [];
    }

    draw()
    {
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
                // draw the blocks
                for (let k = 0; k < this.blocks.length; k++) {
                    if (this.blocks[k].gridPosX == i && this.blocks[k].gridPosY == j) {
                        this.blocks[k].draw();
                    }
                }
            }
        }

        for (let i = start_x; i < max_x && i < this.cols; i++) {
            for (let j = start_y; j < max_y && j < this.rows; j++) {
                // draw the other elements
                for (let k = 0; k < this.otherElements.length; k++) {
                    if (this.otherElements[k].gridPosX == i && this.otherElements[k].gridPosY == j) {
                        this.otherElements[k].draw();
                    }
                }
            }
        }
        
        this.pacman.draw();
    }

    injectElement(element, x, y)
    {
        // inject an element into the grid
        // x and y are the grid positions
        element.setGridPosition(x, y);
        this.otherElements.push(element);
    }
    
}