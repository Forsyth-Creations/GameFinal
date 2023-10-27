// Project Spec
// Starting screen with your Logo from Project 0 (but you may change that Logo if you wish)
// Click "start" button to begin game
// Make the invaders look better (draw a better invader than the one provided in the class sample)
// When the game begins, the invaders move like the ball in Pong. Each invader will start in a random direction and speed.
// The invaders will bounce off of the borders, just like the Pong ball.
// There is a gun at the BOTTOM_OF_SCREEN that you control with keyboard (A + D to move left and right). Spacebar to shoot.
// If an invader is shot, it disappears.
// The gun must avoid getting touched by any of the invaders.
// No collision between the invaders. That is, an invader can pass through one another.
// When an invader is in the top half of the canvas, it will have a small probability to drop a bomb. The initial position of the bomb should be slightly below the invader without touching the invader.
// The bombs cannot kill invaders, but when a bomb hits an invader, the bomb disappears.
// When a bomb touches the gun, game over.
// When an invader touches the gun, game over.
// When all the invaders are gone, you win.
// You should also have a separate  game over screen.
// If your program (1) has syntax errors or (2) cannot run - the grade will be 0. This will be true for all future projects.
// Do NOT use any images, every object must be drawn using functions such as ellipse, rect, etc. This is true for all future projects.


// Constants
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const BOTTOM_OF_SCREEN = SCREEN_HEIGHT - 100;
const BULLET_TIMEOUT = 10
const BULLET_SPEED = 5;
const FUDGE_FACTOR = 10;

const ACTUAL_GRID_SIZE = 1000

const GRID_BOX_SIZE = 25;
const GRID_SIZE_XY = ACTUAL_GRID_SIZE / GRID_BOX_SIZE;

// Color Pallet
// https://colorhunt.co/palette/040d12183d3d5c837493b1a6
// https://colorhunt.co/palette/10316b000000e25822ececeb
const forsyth_blue = "#204d71";
const GAME_GRAY = "#93B1A6";
const GAME_GRAY_HOVER = "#B6D3C9"
const GAME_BLACK = "#040D12";
const GAME_WHITE = "#ffffff";
const GAME_RED = "#E25822";
const GAME_RED_2 = "#F86E38";
const GAME_GREEN = "#658864";
const GAME_DARK_BLUE = "#00008B";
const GAME_YELLOW = "#F0C808";
const GAME_DARK_GRAY = "#317171";

var CUSTOM_ICON = null

const GAME_BOARD =
    [["G        C         G                    "],
    ["         S  G             S S           "],
    [" G                                      "],
    ["    C    S     C                        "],
    ["                                  S     "],
    ["C     G     CS   G                      "],
    ["                                        "],
    ["    C         C                         "],
    ["    S              C        S           "],
    ["             S S                  S S   "],
    ["  G       P                             "],
    ["CS                 C                    "],
    ["    S       C                  S        "],
    ["    C                                   "],
    ["                                        "],
    ["C                                       "],
    ["        C                S S            "],
    [" C                                      "],
    ["     S    S S        S S                "],
    ["G           CS               S          "],
    ["                                        "],
    ["                                        "],
    ["                      G       S         "],
    ["      S                                 "],
    ["             S S S                      "],
    ["                                        "],
    ["                                        "],
    ["     G        S S          S S S        "],
    ["                             C          "],
    ["                                        "],
    ["                                        "],
    ["        S            S S S              "],
    ["                     G               G  "],
    ["                                        "],
    ["            S S                   C     "],
    ["       S                                "],
    ["        C                               "],
    ["    S S                         S S S   "],
    ["                       S          S     "],
    ["                                S SC    "]]
// Variables




// Core Classes

class Bullet {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.speed = BULLET_SPEED
        this.chambered = true
        this.direction = 0
        this.effectiveSize = 5 * this.size
        this.name = "bullet"
    }

    shoot() {
        if (this.chambered === true) {
            this.chambered = false
        }
    }

    draw() {
        if (this.chambered == false) {
            fill(color(GAME_GRAY))
            stroke(color(GAME_BLACK))
            ellipse(this.x, this.y, this.effectiveSize, this.effectiveSize)
            this.y += this.speed * sin(this.direction)
            this.x += this.speed * cos(this.direction)
            if (this.isTouchingBoundary()) {
                this.chambered = true
            }
        }
    }

    isTouchingBoundary() {
        return this.y < 0 || this.y > ACTUAL_GRID_SIZE || this.x < 0 || this.x > ACTUAL_GRID_SIZE
    }

    setPosition(x, y) {
        if (this.chambered === true) {
            this.x = x
            this.y = y
        }
    }

    setHeading(direction) {
        this.direction = direction
    }

    isColliding(enemy) {
        return (dist(this.x, this.y, enemy.x, enemy.y) < enemy.effectiveSize / 2 + this.effectiveSize / 2)
    }

    reset() {
        this.chambered = true
    }

}

class Grid {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;

        console.log("Rows: " + this.rows + " Cols: " + this.cols + " Cell Size: " + this.cellSize);
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
        this.ghosts = [];
        this.coins = [];
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
                    let coin = new Coin(j, i, this.cellSize);
                    coin.setGridPosition(j, i);
                    this.coins.push(coin);
                }
                else if (cell == "S") {
                    let rock = new Rock(j, i, this.cellSize);
                    rock.setGridPosition(j, i);
                    rock.setBullet(this.pacman.myBullet)
                    this.rocks.push(rock);
                }
                else if (cell == "G") {
                    let ghost = new Ghost(j, i, this.cellSize, GAME_RED);
                    ghost.setBounds(this.cols * this.cellSize, this.rows * this.cellSize);
                    ghost.setGridPosition(j, i);
                    ghost.setPacman(this.pacman);
                    ghost.setObstacles(this.rocks);
                    ghost.setCoins(this.coins);
                    ghost.setBullet(this.pacman.myBullet)
                    this.ghosts.push(ghost);
                }
                else if (cell == "P") {
                    this.pacman.setGridPosition(j, i);
                    this.pacman.setBounds(this.cols * this.cellSize, this.rows * this.cellSize)
                }
            }
        }
        this.pacman.setObstacles(this.rocks);
        this.pacman.setCoins(this.coins);
        this.pacman.setEnemies(this.ghosts);
    }

    draw() {
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].draw();
        }
        super.draw();
        for (let i = 0; i < this.rocks.length; i++) {
            this.rocks[i].draw();
        }
        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].move()
            this.ghosts[i].draw();
        }
        this.pacman.move();
        this.pacman.draw();
    }

    resetAll() {
        this.ghosts = []
        this.rocks = []
        this.coins = []
        this.pacman = new Pacman(0, 0, this.cellSize);
        this.createElements()
    }
}

class GridDefinedCharacter {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.lookAheadResult = "all clear"
        this.direction = 0;
        this.speed = 0;
        this.gridPosX = 0;
        this.gridPosY = 0;
        this.direction_x = null
        this.direction_y = null
        this.predictionQuad = new PredictionQuad(0, 0, GRID_BOX_SIZE)
        this.obstacles = []
        this.shownQuad = false
    }

    setPosition(x, y) {
        this.boundX = null
        this.boundY = null
        this.x = x;
        this.y = y;
    }

    setGridPosition(x, y) {
        this.x = x * GRID_BOX_SIZE + GRID_BOX_SIZE / 2;
        this.y = y * GRID_BOX_SIZE + GRID_BOX_SIZE / 2;
        this.gridPosX = x;
        this.gridPosY = y;
    }

    isFirmlyInGrid() {
        if (((this.x + GRID_BOX_SIZE / 2) % GRID_BOX_SIZE == 0) && ((this.y + GRID_BOX_SIZE / 2) % GRID_BOX_SIZE == 0)) {
            this.gridPosX = (this.x + GRID_BOX_SIZE / 2) / GRID_BOX_SIZE - 1;
            this.gridPosY = (this.y + GRID_BOX_SIZE / 2) / GRID_BOX_SIZE - 1;
            return true;
        }
        return false
    }

    setBounds(x, y) {
        this.boundX = x;
        this.boundY = y;
    }

    applyBounds() {
        if (this.boundX != null && this.boundY != null) {
            this.x = constrain(this.x, GRID_BOX_SIZE / 2, this.boundX - GRID_BOX_SIZE / 2);
            this.y = constrain(this.y, GRID_BOX_SIZE / 2, this.boundY - GRID_BOX_SIZE / 2);
        }
    }

    setObstacles(obstacles) {
        this.obstacles = obstacles;
        this.predictionQuad.setObstacles(obstacles)
    }

    safeToMove() {
        if (this.obstacles.length != 0) {
            for (var i = 0; i < this.obstacles.length; i++) {
                if (this.direction == 0 && this.gridPosX + 1 == (this.obstacles[i].gridPosX) && this.gridPosY == this.obstacles[i].gridPosY) {
                    return false
                }
                else if (this.direction == PI && this.gridPosX - 1 == (this.obstacles[i].gridPosX) && this.gridPosY == this.obstacles[i].gridPosY) {
                    return false
                }
                else if (this.direction == (3 * HALF_PI) && this.gridPosY - 1 == (this.obstacles[i].gridPosY) && this.gridPosX == this.obstacles[i].gridPosX) {
                    return false
                }
                else if (this.direction == HALF_PI && this.gridPosY + 1 == (this.obstacles[i].gridPosY) && this.gridPosX == this.obstacles[i].gridPosX) {
                    return false
                }
            }
        }
        return true
    }

    checkKeyPressed() {
        // Check if an arrow key is pressed
        if (keyIsPressed) {
            if (keyIsDown(LEFT_ARROW)) {
                this.cachedKey = LEFT_ARROW;
            } else if (keyIsDown(RIGHT_ARROW)) {
                this.cachedKey = RIGHT_ARROW;
            } else if (keyIsDown(UP_ARROW)) {
                this.cachedKey = UP_ARROW;
            } else if (keyIsDown(DOWN_ARROW)) {
                this.cachedKey = DOWN_ARROW;
            } else if (keyIsDown(32)) {
                this.cachedKey = 32
            }
        }
    }

    setCoins(coins) {
        this.coins = coins
    }

    closeToAnObstacle() {
        if (this.obstacles.length != 0) {
            for (var i = 0; i < this.obstacles.length; i++) {
                if (dist(this.x, this.y, this.obstacles[i].x, this.obstacles[i].y) < GRID_BOX_SIZE && this.obstacles[i].shown) {
                    return true
                }
            }
        }
        return false
    }

    move() {
        //Update the grid position
        if (this.isFirmlyInGrid())
        {
            this.gridPosX = (this.x + GRID_BOX_SIZE / 2) / GRID_BOX_SIZE - 1;
            this.gridPosY = (this.y + GRID_BOX_SIZE / 2) / GRID_BOX_SIZE - 1;
        }
    }

    showPredictionQuad() {
        this.shownQuad = true
    }

    hidePredictionQuad() {
        this.shownQuad = false
    }

    togglePredictions()
    {
        this.shownQuad = !this.shownQuad
    }

}

class Logo {
    constructor(x, y, w, h, c, size) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.size = size;
        this.speed = 100;

        this.y_index = 0;
        this.x_index = 0;
        this.entry = 0;

        this.logo = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    }

    iterate() {
        fill(this.c);
        noStroke();
        for (let i = 0; i < this.logo.length && i < this.entry; i++) {
            for (let j = 0; j < this.logo[i].length; j++) {
                if (this.logo[i][j] == 1) {
                    rect(this.x + (j * this.size), this.y + (i * this.size), this.size / 2, this.size / 1.1)
                }
            }
        }
        this.entry += 1;
    }


    draw() {
        this.iterate()
    }
}

class Button {
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.state = "idle" // options are idle, hover, pressed
        this.locked = false
        this.activeButtonColor = color(GAME_GRAY)
        this.activeTextColor = color(GAME_BLACK)
    }

    fsm() {
        switch (this.state) {
            case "idle":
                this.activeButtonColor = color(GAME_GRAY)
                this.activeTextColor = color(GAME_BLACK)
                if (this.mouseOver()) {
                    this.state = "hover"
                }
                break;
            case "hover":
                this.activeButtonColor = color(GAME_GRAY_HOVER)
                this.activeTextColor = color(GAME_BLACK)
                if (!this.mouseOver()) {
                    this.state = "idle"
                }
                else if (this.mouseOver() && this.mousePressed() && !this.locked) {
                    this.state = "pressed"
                    this.locked = true
                }
                // code block
                break;
            case "pressed":
                break;
            default:
            // code block
        }
    }

    getState() {
        return this.state
    }

    draw() {
        this.fsm()

        this.mousePressed()
        // draw a basic rectangle
        fill(this.activeButtonColor);
        rect(this.x, this.y, this.w, this.h, 5);
        // draw the text
        fill(this.activeTextColor)
        // Align text center
        textAlign(CENTER, CENTER);
        textSize(15);
        text(this.text, this.x + (this.w / 2), this.y + (this.h / 2));
    }

    // Handle when I mouse over the button
    mouseOver() {
        // if the mouse is over the button, change the color
        return (mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.h)
    }

    // Handle when I click the button
    mousePressed() {
        return mouseIsPressed && this.mouseOver()
    }

    reset() {
        this.state = "idle"
        this.locked = false
    }
}

class SkewedCube {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    display() {

        fill(color(GAME_GRAY))
        noStroke()
        push(); // Save the current drawing context

        translate(this.x, this.y);

        // Draw the front face of the cube
        beginShape();
        vertex(0, 0);
        vertex(this.size, -30);
        vertex(this.size, this.size - 30);
        vertex(0, this.size);
        endShape(CLOSE);

        // Draw the back face of the cube
        fill(color(GAME_DARK_BLUE))
        beginShape();
        vertex(this.size, -30);
        vertex(this.size - 30, - 60);
        vertex(-30, - 30);
        vertex(0, 0);
        endShape(CLOSE);

        // Draw the side face of the cube
        fill(color(GAME_BLACK))
        beginShape();
        vertex(0, 0);
        vertex(0, this.size);
        vertex(-30, this.size - 30);
        vertex(-30, - 30);

        endShape(CLOSE);



        pop(); // Restore the previous drawing context
    }
}

class GameState {
    constructor(number_of_enemies) {
        this.state = "start"
        this.logo = new Logo(130, 100, 40, 50, color(GAME_BLACK), 2);
        this.button = new Button(20, BOTTOM_OF_SCREEN - 20, 50, 30, "Play");
        this.button2 = new Button(20, BOTTOM_OF_SCREEN + 15, 90, 30, "Instructions");
        // this.button3 = new Button(20, BOTTOM_OF_SCREEN + 50, 120, 30, "Testing Ground");
        this.predictionsButton = new Button(225, BOTTOM_OF_SCREEN + 50, 160, 30, "See Predictions");

        this.skewedCube = new SkewedCube(100, 100, 150)
        this.backButton = new Button(10, 10, 50, 30, "Back")
        this.number_of_enemies = number_of_enemies

        this.grid = new Grid(GRID_SIZE_XY, GRID_SIZE_XY, GRID_BOX_SIZE)
        this.pacman = new Pacman(SCREEN_WIDTH / 1.2, SCREEN_HEIGHT / 1.2, GRID_BOX_SIZE)
        this.ghost = new Ghost(SCREEN_WIDTH / 1.5, SCREEN_HEIGHT / 1.2, GRID_BOX_SIZE, GAME_RED)
        this.rock = new Rock(SCREEN_WIDTH / 1.35, SCREEN_HEIGHT / 1.5, GRID_BOX_SIZE, GAME_RED)

        this.gameboard = new GameBoard(GRID_SIZE_XY, GRID_SIZE_XY, GRID_BOX_SIZE)
    }

    draw() {
        this.fsm()
    }

    fsm() {
        switch (this.state) {
            case "start":
                background(color(forsyth_blue));
                this.skewedCube.display()
                this.logo.draw();
                this.button.draw();
                this.button2.draw();
                // this.button3.draw();
                this.pacman.setPosition(SCREEN_WIDTH / 1.2, SCREEN_HEIGHT / 1.2)
                this.pacman.draw()
                this.ghost.setPosition(SCREEN_WIDTH / 1.5, SCREEN_HEIGHT / 1.2)
                this.ghost.draw()
                this.rock.draw()
                this.rock.setPosition(SCREEN_WIDTH / 1.35, SCREEN_HEIGHT / 1.5)
                drawPrize(SCREEN_WIDTH / 1.1, SCREEN_HEIGHT / 1.5)
                // reset the fighter 

                if (this.button.getState() == "pressed") {
                    this.state = "game"
                    this.gameboard.resetAll()
                }
                if (this.button2.getState() == "pressed") {
                    this.state = "instructions"
                }

                break;
            case "main_menu":
                // code block
                break;
            case "instructions":
                background(color(forsyth_blue));
                this.backButton.draw()
                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    this.backButton.reset()
                }
                fill(255)
                // align text left
                textAlign(LEFT, CENTER);
                text("Instructions:", 20, 100)
                text("Its pacman. Just play", 20, 150)


                text("Good luck, have fun, don't die", 20, BOTTOM_OF_SCREEN)

                break;
            case "game":
                background(color(forsyth_blue));
                push()
                translate(SCREEN_WIDTH / 2 - this.gameboard.pacman.x, SCREEN_HEIGHT / 2 - this.gameboard.pacman.y)
                this.gameboard.draw()
                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    // this.button3.reset()
                    this.backButton.reset()
                }
                pop()
                this.backButton.draw()
                this.predictionsButton.draw()

                if (this.gameboard.pacman.points == 20) {
                    this.state = "win"
                }

                if (this.gameboard.pacman.state == "dead") {
                    this.state = "game_over"
                }

                if (this.predictionsButton.getState() == "pressed") {
                    this.predictionsButton.reset()
                    // toggle the predictions for all the ghosts
                    this.gameboard.ghosts.forEach(ghost => {
                        ghost.togglePredictions()
                    });
                }

                break;
            case "testing_ground":
                background(color(forsyth_blue));

                push()
                translate(SCREEN_WIDTH / 2 - this.pacman.x, SCREEN_HEIGHT / 2 - this.pacman.y)
                this.grid.draw()
                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    this.button3.reset()
                    this.backButton.reset()
                }

                // if the pacman is on the boundary of the grid, don't let him move
                this.pacman.move()
                this.ghost.move()
                this.ghost.draw()
                this.pacman.draw()
                this.rock.draw()
                pop()
                this.backButton.draw()
                break;
            case "game_over":
                // code block
                // change the font
                background(color(forsyth_blue));
                textAlign(CENTER, CENTER);
                fill(color(GAME_RED))
                text("Game Over. Loser ;)", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)

                this.backButton.draw()

                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    this.backButton.reset()
                }
                break;
            case "win":
                background(color(forsyth_blue));
                textAlign(CENTER, CENTER);
                fill(color(GAME_YELLOW))
                text("WINNER!", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)

                this.backButton.draw()

                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    this.backButton.reset()
                }
                break;
            default:
            // code block
        }
    }
}

const GhostStateEnums = 
{
    WANDER: "2",
    AVOID_ROCK : "1",
    CHASE : "0",
}

class Ghost extends GridDefinedCharacter {
    constructor(x, y, radius, color) {
        super(x, y)
        this.radius = radius
        this.color = color
        this.vulnerable = false
        this.direction = 0
        this.length = 0
        this.speed = GRID_BOX_SIZE / 20; // Ghost's movement speed
        this.pacman = null
        this.dead = false
        this.bullet = null
        this.state = GhostStateEnums.WANDER
        this.life = 2
    }

    setPacman(pacman) {
        this.pacman = pacman
    }

    setBullet(bullet) {
        this.bullet = bullet
    }

    drawNormal() {
        fill(color(this.color))

        noStroke()

        arc(this.x, this.y, this.radius * .9, this.radius, PI, 0, PIE);

        //rect
        rect(this.x - (this.radius * .9) / 2, this.y - .4, this.radius * .9, this.radius / 3)

        // Draw the eyes
        fill(255); // Eye color (white)
        ellipse(this.x - this.radius * .15, this.y - this.radius * .1, this.radius / 4, this.radius / 4);
        ellipse(this.x + this.radius * .15, this.y - this.radius * .1, this.radius / 4, this.radius / 4);

        // Draw the pupils
        // Note: the pupils change direction based on the ghost's direction, which is apart of spec
        fill(0); // Pupil color (black)
        ellipse(this.x - this.radius * .15 + cos(this.direction), this.y - this.radius * .1 + sin(this.direction), this.radius / 8, this.radius / 8);
        ellipse(this.x + this.radius * .15 + cos(this.direction), this.y - this.radius * .1 + sin(this.direction), this.radius / 8, this.radius / 8);

        // draw the tentical things
        fill(color(this.color))
        ellipse(this.x - this.radius * .28, this.y + this.radius * .3, this.radius / 3, this.radius / 2);
        ellipse(this.x, this.y + this.radius * .3, this.radius / 3, this.radius / 2);
        ellipse(this.x + this.radius * .28, this.y + this.radius * .3, this.radius / 3, this.radius / 2);
    }

    drawVulnerable() {
        fill(color(GAME_DARK_BLUE))

        noStroke()

        arc(this.x, this.y, this.radius * .9, this.radius, PI, 0, PIE);

        //rect
        rect(this.x - (this.radius * .9) / 2, this.y - .4, this.radius * .9, this.radius / 3)

        // Draw the eyes
        fill(255); // Eye color (white)
        text("X", this.x - this.radius * .15, this.y - this.radius * .1)
        text("X", this.x + this.radius * .15, this.y - this.radius * .1)

        // draw the tentical things
        fill(color(GAME_DARK_BLUE))
        ellipse(this.x - this.radius * .28, this.y + this.radius * .3, this.radius / 3, this.radius / 2);
        ellipse(this.x, this.y + this.radius * .3, this.radius / 3, this.radius / 2);
        ellipse(this.x + this.radius * .28, this.y + this.radius * .3, this.radius / 3, this.radius / 2);
    }

    checkForBullet() {
        if (this.bullet != null && dist(this.x, this.y, this.bullet.x, this.bullet.y) < this.radius / 2 && !this.bullet.chambered && !this.dead) {
            this.life -= 1
            this.bullet.reset()
        }
    }

    draw() {
        this.applyBounds()
        if (this.showPredictionQuad)

        if (this.shownQuad) {
            this.predictionQuad.setMyPosition(this.gridPosX, this.gridPosY)
            this.predictionQuad.draw()
        }

        this.checkForBullet()
        if (this.life == 2) {
            this.drawNormal()
        }
        else if (this.life == 1) {
            this.drawVulnerable()
        }
        else if (this.state == 0) {
            this.dead = true
            this.shownQuad = false
        }
    }

    // Triangular FSM relationship
    move() {
        super.move()
        if (!this.dead) {
            switch (this.state) {
                case GhostStateEnums.WANDER:
                    this.wander()
                    if (this.closeToAnObstacle() && this.isFirmlyInGrid()) {
                        this.state = GhostStateEnums.AVOID_ROCK
                    }
                    else if (dist(this.x, this.y, this.pacman.x, this.pacman.y) < 150 && this.isFirmlyInGrid()) {
                        this.state = GhostStateEnums.CHASE
                    }
                    break;
                case GhostStateEnums.AVOID_ROCK:
                    this.avoidRock()
                    if (!this.closeToAnObstacle() && this.isFirmlyInGrid()) {
                        this.state = GhostStateEnums.WANDER
                    }
                    break;
                case GhostStateEnums.CHASE:
                    this.chase()
                    if (dist(this.x, this.y, this.pacman.x, this.pacman.y) > 150 && this.isFirmlyInGrid()) {
                        this.state = GhostStateEnums.WANDER
                    }
                    if (this.closeToAnObstacle() && this.isFirmlyInGrid()) {
                        this.state = GhostStateEnums.AVOID_ROCK
                    }
                    break;
                default:
                    console.log("What do I do?")
            }

        }
    }

    avoidRock() {
        if (this.predictionQuad.isOnY()) {
            this.direction = PI
        }
        else if (this.predictionQuad.isOnX()) {
            this.direction = PI /2
        }

        this.direction_x = cos(this.direction);
        this.direction_y = sin(this.direction);
        this.x += this.direction_x * this.speed;
        this.y += this.direction_y * this.speed;
        
    }

    wander() {
        // If I'm firmly in a grid, choose a random direction
        // and a random length
        if (this.isFirmlyInGrid() || this.length == 0) {
            this.direction = random([0, PI / 2, PI, 3 * PI / 2])
            this.length = random([6, 7, 8, 9])
            this.direction_x = cos(this.direction);
            this.direction_y = sin(this.direction);
        }

        if (this.safeToMove()) {
            this.x += this.direction_x * this.speed;
            this.y += this.direction_y * this.speed;
        }
    }

    chase() {
        // follow the pacman
        // if the pacman is to the left of the ghost, move left
        // first, get the vector from the ghost to the pacman
        let vector = createVector(this.pacman.x - this.x, this.pacman.y - this.y)

        // then, get the angle of that vector
        let angle = vector.heading() * 180 / PI

        // if I am firmly in the grid, set my direction to the angle, but map it to one of the four directions
        if (this.isFirmlyInGrid()) {
            if (angle > 0 && angle < 90) {
                this.direction = 0
            }
            else if (angle > 90 && angle < 180) {
                this.direction = PI / 2
            }
            else if (angle > -180 && angle < -90) {
                this.direction = PI
            }
            else if (angle > -90 && angle < 0) {
                this.direction = 3 * PI / 2
            }
        }

        this.direction_x = cos(this.direction);
        this.direction_y = sin(this.direction);

        if (this.safeToMove()) {
            this.x += this.direction_x * this.speed;
            this.y += this.direction_y * this.speed;
        }
    }


    closeToAnObstacle()
    {
        return this.predictionQuad.isDetected()
    }

}

class Pacman extends GridDefinedCharacter {
    constructor(x, y, radius) {
        super(x, y)
        this.radius = radius / 2;
        this.mouthAngle = QUARTER_PI; // Start with an open mouth
        this.speed = GRID_BOX_SIZE / 10; // Pacman's movement speed
        this.direction_x = 1; // Direction of movement
        this.direction_y = 0; // Direction of movement
        this.cachedKey = null;

        this.boundX = null;
        this.boundY = null;

        this.coins = null

        this.points = 0

        this.state = "alive"
        this.enemies = null

        // possible options for this state:
        // left, down, right, up
        this.directionState = "left"

        this.myBullet = new Bullet(this.x, this.y, this.radius / 6)

        this.rockLives = 3
    }

    move() {
        this.checkKeyPressed()
        // Move Pacman

        if (this.cachedKey == UP_ARROW && !this.closeToAnObstacle()) {
            this.x += this.direction_x * this.speed;
            this.y += this.direction_y * this.speed;
            this.cachedKey = null;
        }
        else if (this.cachedKey == DOWN_ARROW && !this.closeToAnObstacle()) {
            this.x -= this.direction_x * this.speed;
            this.y -= this.direction_y * this.speed;
            this.cachedKey = null;
        }

        if (this.cachedKey == LEFT_ARROW) {
            this.direction = this.direction - PI / 20
            this.cachedKey = null;
        }
        else if (this.cachedKey == RIGHT_ARROW) {
            this.direction = this.direction + PI / 20
            this.cachedKey = null;
        }
        else if (this.cachedKey == 32) {
            this.myBullet.setPosition(this.x, this.y)
            this.myBullet.setHeading(this.direction)
            this.myBullet.shoot()
            this.cachedKey = null;
        }

        // If i'm close to a rock, back me up a bit
        if (this.closeToAnObstacle()) {
            this.x -= this.direction_x * this.speed * 12;
            this.y -= this.direction_y * this.speed * 12;
            this.rockLives -= 1
        }
        if (this.rockLives == 0) {
            this.state = "dead"
        }

        this.direction_x = cos(this.direction);
        this.direction_y = sin(this.direction);
    }


    draw() {
        // Draw Pacman
        this.applyBounds()
        push()
        translate(this.x, this.y)
        rotate(this.direction)
        fill(255, 255, 0);
        arc(0, 0, this.radius * 2, this.radius * 2, this.mouthAngle, - this.mouthAngle, PIE);
        this.updateMouth();
        pop()

        this.myBullet.draw()
        // Collect the coins
        if (this.coins != null) {
            for (let i = 0; i < this.coins.length; i++) {
                // If I'm within a certain distance of the coin, collect it
                if (dist(this.x, this.y, this.coins[i].x, this.coins[i].y) < (this.radius / 2 + this.coins[i].radius / 2) && !this.coins[i].collected) {
                    this.coins[i].collect()
                    this.points += 1
                }
                // if (this.coins[i].gridPosX == this.gridPosX && this.coins[i].gridPosY == this.gridPosY && !this.coins[i].collected) {
                //     this.coins[i].collect()
                //     this.points += 1
                // }
            }
        }

        // Deal with a collision with an enemy
        if (this.enemies != null) {
            for (let i = 0; i < this.enemies.length; i++) {
                if (dist(this.x, this.y, this.enemies[i].x, this.enemies[i].y) < this.radius / 2 + this.enemies[i].radius / 2 && !this.enemies[i].dead) {
                    if (this.enemies[i].vulnerable) {
                        this.enemies[i].vulnerable = false
                    }
                    else {
                        this.state = "dead"
                    }
                }
            }
        }
    }

    updateMouth() {
        // Animate Pacman's mouth
        this.mouthAngle = map(sin(frameCount * (1 / this.speed)), -1, 1, QUARTER_PI, 0);
    }

    setEnemies(enemies) {
        this.enemies = enemies
    }

    reset() {
        this.points = 0
        this.state = "alive"
    }
}

class Rock extends GridDefinedCharacter {
    constructor(x, y, size) {
        super(x, y)
        this.size = size
        this.shown = true
    }

    draw() {
        this.checkForBullet()
        if (this.shown) {
            fill(color(GAME_GRAY))
            beginShape();
            vertex(this.x - this.size / 2, this.y + this.size / 2);
            vertex(this.x - this.size / 2, this.y + this.size / 4);
            vertex(this.x - this.size / 4, this.y + this.size / 4);
            vertex(this.x - this.size / 4, this.y);
            vertex(this.x - this.size / 4, this.y - this.size / 2);
            vertex(this.x + this.size / 20, this.y - this.size / 2);
            vertex(this.x + this.size / 20, this.y - this.size / 4);
            vertex(this.x + this.size / 4, this.y - this.size / 4);
            vertex(this.x + this.size / 4, this.y);
            vertex(this.x + this.size / 2, this.y);
            vertex(this.x + this.size / 2, this.y + this.size / 2);
            endShape(CLOSE);

            fill(color(GAME_DARK_GRAY))
            beginShape();
            vertex(this.x + this.size / 2, this.y + this.size / 2);
            vertex(this.x + this.size / 2, this.y);
            vertex(this.x + this.size / 4, this.y);
            vertex(this.x + this.size / 4, this.y + this.size / 4);
            vertex(this.x, this.y + this.size / 4);
            vertex(this.x, this.y + this.size / 2);
            endShape(CLOSE);
        }

    }

    setBullet(bullet) {
        this.bullet = bullet
    }

    checkForBullet() {
        if (this.bullet != null && dist(this.x, this.y, this.bullet.x, this.bullet.y) < this.size / 2 && !this.bullet.chambered && this.shown) {
            console.log("Bullet touching")
            this.shown = false
            this.bullet.reset()
        }
    }
}

class Coin extends GridDefinedCharacter {
    constructor(x, y, size) {
        super(x, y)
        this.size = size
        this.radius = size / 2
        this.collected = false
    }

    draw() {
        if (!this.collected) {
            push()
            translate(-10, -10)
            image(CUSTOM_ICON, this.x, this.y)
            pop()
            // drawPrize(this.x, this.y)
        }
    }

    collect() {
        this.collected = true
    }
}

class PredictionQuad {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.grid_x = x
        this.grid_y = y
        this.size = size
        this.obstacles = null
        this.scanner = [false, false, false, false]
    }

    setObstacles(obstacles) {
        this.obstacles = obstacles
    }

    checkSpots() {
        var response = [false, false, false, false]
        // check if the position is valid
        if (this.obstacles != null) {
            for (let i = 0; i < this.obstacles.length; i++) {
                // if the object is one above the current grid_x, grid_y
                if (this.obstacles[i].gridPosX + 1 == this.grid_x && this.obstacles[i].gridPosY == this.grid_y - 1) {
                    response[0] = true
                }
                // if the object is one below the current grid_x, grid_y
                if (this.obstacles[i].gridPosX + 1 == this.grid_x && this.obstacles[i].gridPosY == this.grid_y + 1) {
                    response[1] = true
                }
                // if the object is one left the current grid_x, grid_y
                if (this.obstacles[i].gridPosX + 1 == this.grid_x - 1 && this.obstacles[i].gridPosY == this.grid_y) {
                    response[2] = true
                }
                // if the object is one right the current grid_x, grid_y
                if (this.obstacles[i].gridPosX + 1 == this.grid_x + 1 && this.obstacles[i].gridPosY == this.grid_y) {
                    response[3] = true
                }
            }
        }
        return response
    }

    setMyPosition(x, y) {
        this.grid_x = x + 1
        this.grid_y = y
        this.x = this.grid_x * this.size
        this.y = this.grid_y * this.size
    }

    helperDraw(bool) {
        noFill()
        if (bool) {
            stroke(255, 0, 0)
        }
        else
        {
            stroke(100, 255, 100)
        }
    }

    draw() {
        // // draw many rects that's neon green in the
        // // grid position above, below, left, and right
        // // of this.gridPosX and this.gridPosY
        this.scanner = this.checkSpots()

        // right
        this.helperDraw(this.scanner[3])
        rect(this.x, this.y, this.size, this.size)

        // left
        this.helperDraw(this.scanner[2])
        rect(this.x - 2*this.size, this.y, this.size, this.size)

        // up
        this.helperDraw(this.scanner[0])
        rect(this.x - this.size, this.y - this.size, this.size, this.size)

        // down
        this.helperDraw(this.scanner[1])
        rect(this.x - this.size, this.y + this.size, this.size, this.size) 
    }

    isDetected() {
        return this.scanner[0] || this.scanner[1] || this.scanner[2] || this.scanner[3]
    }

    isOnY() {
        return this.scanner[0] || this.scanner[1]
    }

    isOnX() {
        return this.scanner[2] || this.scanner[3]
    }
}

function drawPrize(x, y) {
    size = 10
    fill(color(GAME_RED_2))
    noStroke()
    beginShape()
    vertex(x + size / 2, y + size / 2)
    vertex(x + size / 2, y - size / 2)
    vertex(x - size / 2, y - size / 2)
    vertex(x - size / 2, y + size / 2)
    endShape(CLOSE)

    fill(color(GAME_RED))
    beginShape()
    vertex(x + size / 4, y + size / 4)
    vertex(x + size / 4, y - size / 4)
    vertex(x - size / 4, y - size / 4)
    vertex(x - size / 4, y + size / 4)
    endShape(CLOSE)

    TOP_LEFT_CORNER_X = x - size / 2
    TOP_LEFT_CORNER_Y = y - size / 2
}

// Setup the canvas
function setup() {
    // console.log("Grid size is " + GRID_SIZE_XY + "x" + GRID_SIZE_XY)
    frameRate(30)
    // draw the background
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    background(color(forsyth_blue));

    // make object instances
    drawPrize(30, 30)
    CUSTOM_ICON = get(20, 20, 18, 18)

    game = new GameState(5)
}

function draw() {
    game.draw()
    // background(color(forsyth_blue));
    // drawPrize(30, 30)
    // var myImage = get(20, 20, 30, 30)
    // image(myImage, 50, 50)
}