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
const BOTTOM_OF_SCREEN = SCREEN_HEIGHT - 50;
const BULLET_TIMEOUT = 10
const BULLET_SPEED = 5;
const FUDGE_FACTOR = 10;

const BUILDING_SPACING = 200
const BUILDING_WIDTH = 60

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
const GAME_DARK_GREEN = "#056608";

// Global Score
let score = 0;

// Core Classes

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
    constructor(x, y, size_x, size_y) {
        this.x = x;
        this.y = y;
        this.size_x = size_x;
        this.size_y = size_y;

        this.color1 = color(GAME_GRAY)
        this.color2 = color(GAME_DARK_BLUE)
        this.color3 = color(GAME_BLACK)
    }

    draw() {

        fill(this.color1)
        noStroke()
        push(); // Save the current drawing context

        translate(this.x, this.y);

        // Draw the front face of the cube
        beginShape();
        vertex(0, 0);
        vertex(this.size_x, -30);
        vertex(this.size_x, this.size_y - 30);
        vertex(0, this.size_y);
        endShape(CLOSE);

        // Draw the back face of the cube
        fill(this.color2)
        beginShape();
        vertex(this.size_x, -30);
        vertex(this.size_x - 30, - 60);
        vertex(-30, - 30);
        vertex(0, 0);
        endShape(CLOSE);

        // Draw the side face of the cube
        fill(this.color3)
        beginShape();
        vertex(0, 0);
        vertex(0, this.size_y);
        vertex(-30, this.size_y - 30);
        vertex(-30, - 30);

        endShape(CLOSE);



        pop(); // Restore the previous drawing context
    }
}

class SkewedCube2 {
    constructor(x, y, size_x, size_y) {
        this.x = x;
        this.y = y;
        this.size_x = size_x;
        this.size_y = size_y;

        this.color1 = color(GAME_GRAY)
        this.color2 = color(GAME_DARK_BLUE)
        this.color3 = color(GAME_BLACK)
    }

    setColorPallet(color1, color2, color3) {
        this.color1 = color1
        this.color2 = color2
        this.color3 = color3
    }

    draw() {

        fill(this.color1)
        noStroke()
        push(); // Save the current drawing context

        translate(this.x, this.y);

        // Draw the front face of the cube
        beginShape();
        vertex(0, 0);
        vertex(this.size_x, 0);
        vertex(this.size_x, this.size_y);
        vertex(0, this.size_y);
        endShape(CLOSE);

        // Draw the back face of the cube
        fill(this.color2)
        beginShape();
        vertex(0, 0);
        vertex(this.size_x, 0);
        vertex(this.size_x - 10, - 10);
        vertex(-10, -10);
        endShape(CLOSE);

        // Draw the side face of the cube
        fill(this.color3)
        beginShape();
        vertex(0, 0);
        vertex(-10, -10);
        vertex(-10, this.size_y - 10);
        vertex(0, this.size_y);

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

        this.skewedCube = new SkewedCube(100, 100, 150, 150)
        this.backButton = new Button(10, 10, 50, 30, "Back")

        this.ground = new SkewedCube2(0, BOTTOM_OF_SCREEN, SCREEN_WIDTH + 10, 60)
        this.ground.setColorPallet(color(GAME_DARK_GREEN), color(GAME_GREEN), color(GAME_BLACK))

        this.flappy = new FlappyBird(50, 200, 50)

        this.pane = new SinglePane(100, 150)
        this.pane.setBird(this.flappy)

        this.latestPaneAddition = null

        this.mainScreenFlappy = new FlappyBird(SCREEN_WIDTH / 1.2, SCREEN_HEIGHT / 1.4, 50)
        this.mainScreenEnemy = new AntiGravEnemy(SCREEN_WIDTH / 1.2, SCREEN_HEIGHT / 1.4, 20)

        this.allPanes = []
        // add 5 panes to the list
        for (let i = 0; i < 3; i++) {
            var element = new SinglePane(SCREEN_WIDTH, 150)
            element.setBird(this.flappy)
            this.allPanes.push(element)
        }

    }

    draw() {
        this.fsm()
    }

    endGame() {
        console.log("Game Over")
        this.state = "game_over"
    }

    fsm() {
        switch (this.state) {
            case "start":
                background(color(forsyth_blue));
                this.skewedCube.draw()
                this.logo.draw();
                this.button.draw();
                this.button2.draw();

                if (this.button.getState() == "pressed") {
                    this.state = "game"
                    for (let i = 0; i < this.allPanes.length; i++) {
                        this.allPanes[i].reset()
                    }
                    this.flappy.reset()
                    this.latestPaneAddition = null

                }
                if (this.button2.getState() == "pressed") {
                    this.state = "instructions"
                }
                this.mainScreenFlappy.draw()
                // this.mainScreenEnemy.draw()
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
                text("It's flappy bird. Dont crash", 20, 150)
                text("Good luck, have fun, don't die", 20, BOTTOM_OF_SCREEN)

                break;
            case "game":
                background(color(forsyth_blue));
                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    this.backButton.reset()
                    for (let i = 0; i < this.allPanes.length; i++) {
                        this.allPanes[i].reset()
                    }
                    this.flappy.reset()
                    this.latestPaneAddition = null
                }

                this.ground.draw()
                fill(255)

                // find any of the idle panes and draw it
                for (let i = 0; i < this.allPanes.length; i++) {
                    if (this.allPanes[i].state == "idle" && (this.latestPaneAddition == null || this.latestPaneAddition.building.x <= SCREEN_WIDTH - BUILDING_SPACING)) {
                        this.latestPaneAddition = this.allPanes[i]
                        this.latestPaneAddition.reset()
                        this.latestPaneAddition.start()
                        break;
                    }
                }
                // draw all the panes regardless of state
                for (let i = 0; i < this.allPanes.length; i++) {
                    this.allPanes[i].draw()

                    if (this.allPanes[i].touchingBird) {
                        this.endGame()
                    }

                }

                if (this.flappy.dead) {
                    this.endGame()
                }

                // Print the score on screen
                fill(255)
                textAlign(LEFT, CENTER);
                text("Score: " + score, 20, BOTTOM_OF_SCREEN + 25)
                this.flappy.draw()
                this.backButton.draw()

                break;
            case "testing_ground":
                background(color(forsyth_blue));

                push()
                this.grid.draw()
                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    this.button3.reset()
                    this.backButton.reset()
                }
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

                this.backButton.draw() + 5

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

class GravityBoundElement {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gravity = 0.5
        this.velocity = 0
        this.lift = -5
        this.hasLanded = false
    }

    move() {
        this.velocity += this.gravity
        this.y += this.velocity
        if (this.y > BOTTOM_OF_SCREEN - this.size && this.y > 0) {
            this.y = BOTTOM_OF_SCREEN - this.size
            this.velocity = 0
            // this.hasLanded = true
        }
        else if (this.y <= 0) {
            this.y = 0
            this.velocity = 0
            // this.hasLanded = true
        }
    }

    draw() {
        this.move()
    }

    jump() {
        this.velocity += this.lift
    }

    reset() {
        this.y = 100
        this.velocity = 0
    }

}

class RandomBuilding extends GravityBoundElement {
    constructor(x, y, size) { // size defines the height
        super(x, y, size)
        this.height = size
        this.skewedCube = new SkewedCube2(x, y, BUILDING_WIDTH, this.height)
        this.speed = 3
        this.bird = null
        this.touchingBird = false

        // Variables for making the windows:
        this.randomOdd = random([3, 5, 7, 9])
        this.window_spacing_y = this.height / this.randomOdd
        this.window_spacing_x = BUILDING_WIDTH / 10
    }

    randomize() {
        // randomizes the height of the building
        this.height = random(50, 250)
        this.skewedCube.size_y = this.height
        this.y = BOTTOM_OF_SCREEN - this.height

        // randomize the color of the building
        var r = random(255)
        var g = random(255)
        var b = random(255)

        this.skewedCube.setColorPallet(color(r, g, b), color(r - 50, g - 50, b - 50), color(r - 100, g - 100, b - 100))

        // also give it random windows
        this.randomOdd = random([3, 5, 7, 9])
        this.window_spacing_y = this.height / this.randomOdd
        this.window_spacing_x = BUILDING_WIDTH / 10
    }

    move() {
        // super.move()
        this.x -= this.speed
    }

    draw() {
        this.move()
        this.skewedCube.x = this.x
        this.skewedCube.y = this.y
        this.skewedCube.draw()
        if (this.bird != null && this.state == "moving") {
            this.touchingBird = this.checkForBird()
            if (this.touchingBird) {
                console.log("Touching Building")
                // Print out the x and y of the bird
                console.log("Bird X: " + this.bird.x)
                console.log("Bird Y: " + this.bird.y)
                // Print out the x and y of the building
                console.log("Building X: " + this.x)
                console.log("Building Y: " + this.y)
                // Print out the size
                console.log("Building Size: " + BUILDING_WIDTH)
            }
        }
        // draw the windows, using the top left corner as the origin
        for (let i = 0; i < this.randomOdd; i++) {
            for (let j = 0; j < 10; j++) {
                var window_x = this.x + this.window_spacing_x * j
                var window_y = this.y + this.window_spacing_y * i
                var window_size = this.window_spacing_x / 2
                fill(color(GAME_YELLOW))
                rect(window_x, window_y, window_size, window_size)
            }
        }
    }

    isOffScreen() {
        return (this.x < -BUILDING_WIDTH)
    }

    setBird(bird) {
        this.bird = bird
    }

    checkForBird() {
        // check if the bird is in my hitbox
        // return (this.bird.y > this.y && this.bird.x > this.x - this.bird.size / 2 && this.bird.x < this.x + this.size + this.bird.size / 2)
        return (this.bird.x + this.bird.size / 2 >= this.x) && (this.bird.x - this.bird.size / 2 <= this.x + BUILDING_WIDTH) && (this.bird.y + this.bird.size / 2 >= this.y)
    }

    reset() {
        this.x = SCREEN_WIDTH
        this.touchingBird = false
        this.state = "idle"

    }

    start() {
        this.state = "moving"
    }
}

class FlappyBird extends GravityBoundElement {
    constructor(x, y) {
        super(x, y, 30)
        this.state = "idle"
        this.lift = -10
        this.dead = false
    }

    drawEye() {
        fill(color(GAME_WHITE))
        ellipse(+ 10, - 5, 10, 10)
        fill(color(GAME_BLACK))
        ellipse(+ 13, - 3, 7, 7)
    }

    drawTail() {
        fill(color(GAME_YELLOW))
        triangle(-10, 0, -20, 0, -15, 10)
    }

    drawWing() {
        var absVelocity = abs(this.velocity)
        var angle = 0
        if (absVelocity != 0) {
            angle = PI / (absVelocity * 2)
        }
        fill(color(GAME_YELLOW))
        push()
        // Stroke
        stroke(color(GAME_BLACK))
        translate(0, 0 + this.velocity/1.5 + 4)
        // ellipse
        ellipse(0, 0, 20, 10)
        noStroke()
        pop()
    }



    draw() {
        this.fsm()
        this.move()
        this.checkIfDead()
        push()
        fill(color(GAME_YELLOW))
        translate(this.x, this.y)

        var angle = map(this.velocity, -10, 10, -PI / 6, PI / 6) 

        rotate(angle)
        ellipse(0, 0, this.size, this.size)
        this.drawEye()
        this.drawTail()
        this.drawWing()
        pop()
    }

    checkSpaceBar() {
        return (keyIsDown(32))
    }

    jump() {
        super.jump()
        this.state = "rising"
    }

    fsm() {
        switch (this.state) {
            case "idle":
                this.state = "falling"
                break;
            case "falling":
                if (this.checkSpaceBar()) {
                    this.jump()
                }
                break;
            case "rising":
                if (this.velocity > 0) {
                    this.state = "falling"
                }
                break;
            default:
            // code block
        }
    }

    checkIfDead() {
        this.dead = (this.y >= BOTTOM_OF_SCREEN - this.size) || (this.y - this.size / 2 <= 0)
    }

    reset() {
        this.y = 200
        this.velocity = 0
        this.dead = false
    }

}

class AntiGravEnemy extends GravityBoundElement {
    constructor(x, y, size) {
        super(x, y, size)
        this.gravity = -0.5
        this.lift = 5
        this.touchingBird = false
        this.bird = null
        this.maxJump = 0
        this.jumpingState = "idle"
        this.count = 0 // count will go up to 20
    }

    // compute my initial velocity to reach the max height
    computeInitialVelocity() {
        var value = sqrt(2 * abs(this.gravity) * this.maxJump)
        return value
    }

    // fsm to track on when it is in the air, when it has landed, and when is jumps again
    // it should wait a few frames between landing and jumping again
    fsm() {
        fill(color(GAME_RED_2))
        switch (this.jumpingState) {
            case "idle":
                rect(this.x, this.y, this.size, this.size)
                this.jumpingState = "waiting"
                break;
            case "waiting":
                rect(this.x, this.y, this.size, this.size)
                this.drawEye(this.x + 3, this.y + 10)
                this.drawEye(this.x + 15, this.y + 10)
                this.count += 1
                if (this.count > 20) {
                    this.jumpingState = "jump"
                    this.count = 0
                }
                break;
            case "jump":
                this.jump()
                this.jumpingState = "falling"
                break;
            case "falling":
                ellipse(this.x + 10, this.y, this.size, this.size)
                this.drawEye(this.x + 3, this.y)
                this.drawEye(this.x + 15, this.y)
                if (this.velocity == 0) {
                    this.jumpingState = "rising"
                }
                break;
            case "rising":
                ellipse(this.x + 10, this.y, this.size, this.size)
                this.drawEye(this.x + 3, this.y)
                this.drawEye(this.x + 15, this.y)
                if (this.velocity == 0) {
                    this.jumpingState = "idle"
                }
                break;
            
            default:
            // code block

        }
        console.log(this.jumpingState)
    }

    drawEye(x, y) {
        fill(color(GAME_WHITE))
        ellipse(x, y, 10, 10)
        fill(color(GAME_BLACK))
        ellipse(x - 3, y + 2, 7, 7)
    }

    draw() {
        this.fsm()
        this.move()
        fill(color(GAME_RED))

        if (this.bird != null) {
            this.touchingBird = this.checkForBird()
            if (this.touchingBird) {
                console.log("Touching Enemy")
            }
        }
    }

    jump() {
        this.velocity = round(this.computeInitialVelocity())
    }

    checkForBird() {
        // check if the bird is in my hitbox
        return dist(this.x, this.y, this.bird.x, this.bird.y) < this.size / 2 + this.bird.size / 2
    }

    setBird(bird) {
        this.bird = bird
    }

    reset() {
        this.y = 0
        this.velocity = 0
        this.touchingBird = false
    }

    setJumpHeight(height) {
        this.maxJump = height
    }
}

class SinglePane {
    constructor(x, y) {
        // draw a building
        this.x = x;
        this.y = y;
        this.building = new RandomBuilding(x, y + 100, 50) // 50 is given as a default height
        this.enemy = new AntiGravEnemy(x, 0, 20)
        this.touchingBird = false
        this.state = "idle"
    }

    computeJumpHeight() {
        // compute the jump height of the enemy
        // there must always be a space of 60 between the building rooftop and the enemy
        return this.building.y - 60 // the max height the enemy can jump to
    }


    draw() {
        if (this.state != "idle") {
            this.building.draw()
            this.enemy.draw()
            this.enemy.x = this.building.x

            // if (this.enemy.y == 0) {
            //     this.enemy.jump()
            // }
            // if (this.enemy.y > BOTTOM_OF_SCREEN - this.building.height - this.enemy.size) {
            //     this.enemy.velocity = 0
            //     this.enemy.y = BOTTOM_OF_SCREEN - this.building.height - this.enemy.size
            // }

            this.touchingBird = this.building.touchingBird || this.enemy.touchingBird

            if (this.isOffScreen()) {
                this.state = "idle"
                score += 1
            }
        }
    }

    isOffScreen() {
        return this.building.isOffScreen()
    }

    reset() {
        this.building.reset()
        this.enemy.reset()
        this.state = "idle"
    }

    setBird(bird) {
        this.building.setBird(bird)
        this.enemy.setBird(bird)
    }

    start() {
        this.building.randomize()
        this.state = "moving"
        this.building.start()
        this.enemy.setJumpHeight(this.computeJumpHeight())
    }
}

const GhostStateEnums =
{
    WANDER: "2",
    AVOID_ROCK: "1",
    CHASE: "0",
}

// Setup the canvas
function setup() {
    // console.log("Grid size is " + GRID_SIZE_XY + "x" + GRID_SIZE_XY)
    frameRate(30)
    // draw the background
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    background(color(forsyth_blue));

    // make object instances
    CUSTOM_ICON = get(20, 20, 18, 18)

    game = new GameState(5)
}

function draw() {
    game.draw()
}