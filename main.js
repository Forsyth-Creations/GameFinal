// Variables
let grass = null
let LETTER = null
let BRICK = null

class GameState {
    constructor() {
        this.state = "opening_screen"
        // this.state = "game"
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

        this.gameboard = new GridMap(GAME_BOARD_1, GRID_BOX_SIZE, 8)

        // import screen 1 from /assets/Screens/Screen1.png
        this.screen1 = new FadeInScreen(loadImage("assets/Screens/Screen1.png"))
        this.hunt_logo = loadImage("assets/Logos/Hunt.png")

        this.gearButton = new IconButton(SCREEN_WIDTH - 50, 10, 40, 40, "assets/Icons/gear2.png")

        this.textarea_name = new TextArea(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 200, 30, 20, "Enter your name")
        // submit name button
        this.submit_name = new Button(SCREEN_WIDTH / 2 - 100, SCREEN_HEIGHT / 2 + 30, 100, 30, "Submit")
        this.name = ""

        // basic npc
        let pos1 = new BetterNode(12, 12, null, null)
        let pos2 = new BetterNode(30, 12, null, null)
        let pos3 = new BetterNode(30, 20, null, null)
        let pos5 = new BetterNode(25, 30, null, null)
        let pos4 = new BetterNode(14, 20, null, null)


        this.npc = new WaypointNPC(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, GRID_BOX_SIZE, [pos1, pos2, pos3, pos5, pos4])
        this.gameboard.injectElement(this.npc, 12, 12)

        // ------------------------------- Puzzles -------------------------------
        this.which_puzzle = 0

        this.fullPuzzle1 = new FullPuzzle(["Hello Adventurer,",
            "",
            "It's good to meet you. My name is Overseer",
            "Never have I seen such a worthy foe to take on my game!",
            "",
            "The game is simple: solve my puzzles",
            "Hard? Oh yeah. But we have to keep you interested",
            "Exciting, isn't it?",
            "",
            "Put your skills to the test, I know you can",
            "Or fail. That's kinda your choice",
            "Need help? You're not getting it",
            "Do you know where the next puzzle is?",
            "---------------------------------------",
            "I've just told you above. Provide your answer below",
            "All lower case, one word, please!"], "pond", "")
        this.gameboard.injectElement(this.fullPuzzle1.myIcon, 10, 10)

        // Puzzle 2
        this.fullPuzzle2 = new FullPuzzle(
            ["I am like a glass of water",
                "sometimes empty, sometimes not",
                "I'm like a flashlight",
                "I'm old but only recently explored",
                "What am I? One word"], "moon", "Hurry, to the pond!!")
        this.gameboard.injectElement(this.fullPuzzle2.myIcon, 0, 13)

        // Puzzle 3
        this.fullPuzzle3 = new FullPuzzle(
            ["Hello adventurer!",
        "Great news! You're getting closer to finding me",
        "But you're still too slow. Solving this next puzzle",
        "might get you closer:",
        "",
        "Who, what, when? That's the question",
        "One is missing, can you guess the direction?",
        "One word, capitalization is considered for answer"], "Ware", "Great work! Head on over to Hoge Hall. I hear there's a puzzle there")
        this.gameboard.injectElement(this.fullPuzzle3.myIcon, 22, 38)

        // Puzzle 4
        this.fullPuzzle4 = new FullPuzzle(
            ["Great work, you've solved all my puzzles",
            "Remind me, who put you up to all this?",
            "One name, 8 letters, capitalized.",
            "Don't get it wrong"], "Overseer", "Good. To Ware Lab!")
        this.gameboard.injectElement(this.fullPuzzle4.myIcon, 38, 3)

        this.winner_counter = 0

    }

    draw() {
        this.fsm()
    }


    puzzleFSM() {
        switch (this.which_puzzle) {
            case 0:
                this.fullPuzzle1.checkDist(this.gameboard.pacman)
                this.fullPuzzle1.enable()
                this.fullPuzzle1.subtext = "Welcome, " + this.name + ". Overseer has left you a letter. Go find it"
                // draw a button bar with the name
                if (this.fullPuzzle1.isCorrect()) {
                    this.fullPuzzle1.reset()
                    this.which_puzzle = 1
                }

                else if (this.fullPuzzle1.isIncorrect()) {
                    this.state = "game_over"
                }

                this.fullPuzzle1.draw()

                break;
            case 1:
                this.fullPuzzle2.checkDist(this.gameboard.pacman)
                this.fullPuzzle2.enable()
                // draw a button bar with the name
                if (this.fullPuzzle2.isCorrect()) {
                    this.fullPuzzle2.reset()
                    this.which_puzzle = 2
                }

                else if (this.fullPuzzle2.isIncorrect()) {
                    this.state = "game_over"
                }
                this.fullPuzzle2.draw()
                break;
            case 2:
                this.fullPuzzle3.checkDist(this.gameboard.pacman)
                this.fullPuzzle3.enable()
                // draw a button bar with the name
                if (this.fullPuzzle3.isCorrect()) {
                    this.fullPuzzle3.reset()
                    this.which_puzzle = 3
                }

                else if (this.fullPuzzle3.isIncorrect()) {
                    this.state = "game_over"
                }
                this.fullPuzzle3.draw()

                break;
            case 3:
                this.fullPuzzle4.checkDist(this.gameboard.pacman)
                this.fullPuzzle4.enable()
                // draw a button bar with the name
                if (this.fullPuzzle4.isCorrect()) {
                    this.fullPuzzle4.reset()
                    this.which_puzzle = 4
                }

                else if (this.fullPuzzle4.isIncorrect()) {
                    this.state = "game_over"
                }
                this.fullPuzzle4.draw()

                break;
            case 4:
                console.log("Find Overseer")
                break;
        }
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
                this.pacman.speed = .5
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
                    this.state = "intro"
                    this.gameboard.resetAll()
                    // this.puzzle1.reset()
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
            case "intro":
                background(color(GAME_BLACK));
                this.textarea_name.draw()
                this.state = "waiting_for_name"
                break;
            case "waiting_for_name":
                if (this.textarea_name.getValue() != "") {
                    this.submit_name.draw()
                }

                if (this.submit_name.getState() == "pressed" || this.textarea_name.locked) {
                    this.name = this.textarea_name.getValue()
                    this.state = "game"
                    this.button.reset()
                    this.button2.reset()
                    this.backButton.reset()
                    this.submit_name.reset()
                    this.textarea_name.reset()
                }
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
                // this.npc.setFocusGridPosition(this.gameboard.pacman.gridPosX, this.gameboard.pacman.gridPosY)
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
                    // this.puzzle1.remove()
                    this.winner_counter = 0
                    this.which_puzzle = 0
                    this.fullPuzzle1.reset()
                    this.fullPuzzle2.reset()
                    this.fullPuzzle3.reset()
                    this.fullPuzzle4.reset()
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
                this.puzzleFSM()

                // if the distance between the npc and the pacman is less than 5, then stop the npc
                let distance = dist(this.npc.x, this.npc.y, this.gameboard.pacman.x, this.gameboard.pacman.y)
                if (distance < GRID_BOX_SIZE* 2 && this.npc.isFirmlyInGrid()) {
                    this.npc.stop()
                    if (this.which_puzzle == 4) {
                        this.npc.say("Congrats on finishing my game. You're a winner! I'll give you some time to read this, but then I'll gift you a wonderful winners screen!")
                        this.winner_counter += 1
                        if (this.winner_counter > 100) {
                            this.state = "win"
                        }
                    }
                    else
                    {
                        this.npc.say("Hello there! Have you seen my dog? Here Cipher! Here boy!")
                    }
                }
                else {
                    this.npc.go()
                    this.npc.move()
                }

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

function preload() {
    grass = loadImage('assets/Scenary/grass.jpg');
    LETTER = loadImage("assets/Icons/letter.png")
    BRICK = loadImage("assets/Scenary/brick_3.png")
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
    frameRate(30)
    game.draw()
}