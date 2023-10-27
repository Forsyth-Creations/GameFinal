// Import a separate file for each class


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
const FUDGE_FACTOR = 10;

const ACTUAL_GRID_SIZE = 1000

const GRID_BOX_SIZE = 40;
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

// Image
let screen_img1 

const GAME_BOARD =
    [["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["          P                             "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "],
    ["                                        "]]
// Variables
class GameState {
    constructor() {
        this.state = "opening_screen"
        this.logo = new Logo(130, 100, 40, 50, color(GAME_BLACK), 2);
        this.button = new Button(20, BOTTOM_OF_SCREEN - 20, 50, 30, "Play");
        this.button2 = new Button(20, BOTTOM_OF_SCREEN + 15, 90, 30, "Instructions");
        // this.button3 = new Button(20, BOTTOM_OF_SCREEN + 50, 120, 30, "Testing Ground");

        this.skewedCube = new SkewedCube(100, 100, 150)
        this.backButton = new Button(10, 10, 50, 30, "Back")
        this.number_of_enemies = 0

        this.grid = new Grid(GRID_SIZE_XY, GRID_SIZE_XY, GRID_BOX_SIZE)
        this.pacman = new Pacman(SCREEN_WIDTH / 1.2, SCREEN_HEIGHT / 1.2, GRID_BOX_SIZE)
        this.rock = new Rock(SCREEN_WIDTH / 1.35, SCREEN_HEIGHT / 1.5, GRID_BOX_SIZE, GAME_RED)

        this.gameboard = new GameBoard(GRID_SIZE_XY, GRID_SIZE_XY, GRID_BOX_SIZE)

        // import screen 1 from /assets/Screens/Screen1.png
        this.screen1 = new FadeInScreen(screen_img1)
    }

    draw() {
        this.fsm()
    }

    fsm() {
        switch (this.state) {
            case "opening_screen":
                // draw screen1
                background(color(GAME_BLACK));
                this.screen1.draw()

                if(this.screen1.isComplete()) this.state = "start"

                
                break;
            case "start":
                background(color(forsyth_blue));
                this.skewedCube.display()
                this.logo.draw();
                this.button.draw();
                this.button2.draw();
                // this.button3.draw();
                this.pacman.setPosition(SCREEN_WIDTH / 1.2, SCREEN_HEIGHT / 1.2)
                this.pacman.draw()
                this.rock.draw()
                this.rock.setPosition(SCREEN_WIDTH / 1.35, SCREEN_HEIGHT / 1.5)
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
                text("Hello weary traveler! Welcome to Virginia Tech!", 20, 150)
                text("You are a freshman, headed to class with finals right around the corner", 20, 180)
                text("When you begin to see strange symbols around campus", 20, 210)
                text("IS THAT OHIO?? IS THAT A FRAT?? NO, IT'S VT HUNT!", 20, 240)

                text("You know what you must do... win. But, ya know, also have fun with it ;)", 20, 270)

                text("Rekam demands it", 20, 330)


                text("Good luck, have fun, don't die", 20, BOTTOM_OF_SCREEN)

                break;
            case "game":
                background(color(GAME_GREEN));
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

                if (this.gameboard.pacman.points == 20) {
                    this.state = "win"
                }

                if (this.gameboard.pacman.state == "dead") {
                    this.state = "game_over"
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

const GhostStateEnums = 
{
    WANDER: "2",
    AVOID_ROCK : "1",
    CHASE : "0",
}

class Rock extends GridDefinedCharacter {
    constructor(x, y, size) {
        super(x, y)
        this.size = size
        this.shown = true
    }

    draw() {
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

function preload() {
    screen_img1 = loadImage("assets/Screens/Screen1.png")
}

// Setup the canvas
function setup() {
    // console.log("Grid size is " + GRID_SIZE_XY + "x" + GRID_SIZE_XY)
    frameRate(30)
    // draw the background
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    background(color(GAME_GREEN));

    // make object instances
    CUSTOM_ICON = get(20, 20, 18, 18)

    game = new GameState()
}

function draw() {
    game.draw()

    // draw both preloaded images
    // image(screen_img1, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    // image(hero_img1, 0, 0, 50, 50)
}