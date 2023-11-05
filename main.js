// Variables
class GameState {
    constructor() {
        this.state = "opening_screen"
        this.logo = new Logo(130, 100, 40, 50, color(GAME_BLACK), 2);
        this.button = new Button(20, BOTTOM_OF_SCREEN - 140, 50, 30, "Play");
        this.button2 = new Button(20, BOTTOM_OF_SCREEN - 100, 90, 30, "Instructions");
        // this.button3 = new Button(20, BOTTOM_OF_SCREEN + 50, 120, 30, "Testing Ground");

        // this.skewedCube = new SkewedCube(100, 100, 150)
        this.backButton = new Button(10, 10, 50, 30, "Back")
        this.number_of_enemies = 0

        // this.grid = new Grid(GRID_SIZE_XY, GRID_SIZE_XY, GRID_BOX_SIZE, 8)
        this.pacman = new Pacman(5, SCREEN_HEIGHT - 50, GRID_BOX_SIZE)
        this.rock = new Rock(SCREEN_WIDTH / 1.35, SCREEN_HEIGHT / 1.5, GRID_BOX_SIZE, GAME_RED)

        this.gameboard = new GameBoard(GRID_SIZE_XY, GRID_SIZE_XY, GRID_BOX_SIZE, 6)

        // import screen 1 from /assets/Screens/Screen1.png
        this.screen1 = new FadeInScreen(loadImage("assets/Screens/Screen1.png"))
        this.hunt_logo = loadImage("assets/Logos/Hunt.png")

        this.gearButton = new IconButton(SCREEN_WIDTH - 50, 10, 40, 40, "assets/Icons/gear2.png")
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
                if (this.screen1.isComplete()) this.state = "start"
                break;
            case "start":
                background(color(GAME_BLACK));
                // this.skewedCube.display()
                // this.logo.draw();
                this.button.draw();
                this.button2.draw();
                // this.button3.draw();
                this.hunt_logo.resize(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
                image(this.hunt_logo, 20, 20)

                // Hacky way of getting it to move
                this.pacman.y = SCREEN_HEIGHT - 50
                this.pacman.state2 = "moving"
                this.pacman.direction = 0
                this.pacman.x = this.pacman.x + 5
                this.pacman.handleAnimation()
                this.pacman.fsm()

                // if the pacman is out of bounds, move it back
                if (this.pacman.x > SCREEN_WIDTH) {
                    this.pacman.x = -100
                }

                this.pacman.draw()
                this.rock.setPosition(SCREEN_WIDTH / 1.35, SCREEN_HEIGHT / 1.5)
                // draw a white recangle at the bottom of the screen
                fill(color(GAME_WHITE))
                rect(0, BOTTOM_OF_SCREEN, SCREEN_WIDTH, SCREEN_HEIGHT - BOTTOM_OF_SCREEN)


                if (this.button.getState() == "pressed") {
                    this.state = "game"
                    this.gameboard.resetAll()
                }
                if (this.button2.getState() == "pressed") {
                    this.state = "instructions"
                    this.pacman.setPosition(SCREEN_WIDTH * (3 / 4), SCREEN_HEIGHT * (3 / 4))
                    this.pacman.state2 = "simIdle"
                }

                text("A game by  Henry Forsyth", SCREEN_WIDTH / 1.3, BOTTOM_OF_SCREEN - 150)
                text("A virtual homage to the", SCREEN_WIDTH / 1.3, BOTTOM_OF_SCREEN - 120)
                text("Virginia Tech Hunt", SCREEN_WIDTH / 1.3, BOTTOM_OF_SCREEN - 90)

                break;
            case "main_menu":
                // code block
                break;
            case "instructions":
                background(color(GAME_BLACK));

                // draw a grid around where I think the character will be walking
                // just a 2x2
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        let x = i * GRID_BOX_SIZE;
                        let y = j * GRID_BOX_SIZE;
                        stroke(2);
                        stroke(color(GAME_WHITE))
                        noFill();
                        rect(x + 355, y + 315, GRID_BOX_SIZE, GRID_BOX_SIZE);
                    }
                }
                noStroke()

                this.backButton.draw()
                if (this.backButton.getState() == "pressed") {
                    this.state = "start"
                    this.button.reset()
                    this.button2.reset()
                    this.backButton.reset()
                }
                this.pacman.draw()
                this.pacman.handleAnimation()
                this.pacman.fsm()

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

                // Note, as seen on the right, this is a grid world
                // you can only move in the grid, using your arrow keys

                text("Note, as seen on the right, this is a grid world", 20, 400)
                text("You can only move in the grid, using your arrow keys", 20, 430)


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
                this.gearButton.draw()

                // feed the pacman grid positiong to the grid
                this.gameboard.setPosition(this.gameboard.pacman.gridPosX, this.gameboard.pacman.gridPosY)

                break;
            case "testing_ground":
                background(color(forsyth_blue));

                push()
                translate(SCREEN_WIDTH / 2 - this.pacman.x, SCREEN_HEIGHT / 2 - this.pacman.y)
                // this.grid.draw()
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

// 
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
        else {
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
        rect(this.x - 2 * this.size, this.y, this.size, this.size)

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
}