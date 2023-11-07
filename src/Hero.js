class Pacman extends GridDefinedCharacter {
    constructor(x, y, radius) {
        super(x, y)
        this.radius = radius / 2;
        this.mouthAngle = QUARTER_PI; // Start with an open mouth
        this.speed = GRID_BOX_SIZE / 2; // Pacman's movement speed
        this.mouthSpeed = 5
        this.direction_x = 0; // Direction of movement
        this.direction_y = 0
        this.boundX = null;
        this.boundY = null;
        this.points = 0

        this.state = "alive"
        this.enemies = null
        this.state2 = "idle"

        // possible options for this state:
        // left, down, right, up
        this.directionState = "down"
        this.direction = PI / 2

        this.boundX = ACTUAL_GRID_SIZE
        this.boundY = ACTUAL_GRID_SIZE

        this.image = loadImage('assets/Characters/hero/hero.png');

        this.speaking = false
        this.speech = "Hello there"


        this.rightSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Right.png', 2)
        this.leftSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Left.png', 2)
        this.upSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Up.png', 2)
        this.downSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Down.png', 2)

        this.animationCounter = 0
        this.animationCounter = constrain(this.animationCounter, 0, 3)

        this.pedometer = 0
        this.pedometer_switch_val = 5
        this.animationStep = 0.4

    }

    fsm() {
        switch (this.state2) {
            case "idle":
                this.animationCounter = 0
                // wait until the user presses a key
                if (this.cachedKey != null) {
                    this.state2 = "moving"
                    this.keyCheck()
                }
                else {
                    this.speed = 0
                }
                break;
            case "moving":
                this.x = this.x + this.direction_x * this.speed;
                this.y = this.y + this.direction_y * this.speed;
                this.animationCounter = this.animationCounter + this.animationStep

                this.applyBounds()
                // print out the current grid position
                if (this.isFirmlyInGrid()) {
                    this.speed = 0
                }

                if (this.isFirmlyInGrid() && this.cachedKey == null) {
                    this.state2 = "idle"
                    this.speed = 0
                }
                else if (this.isFirmlyInGrid() && this.cachedKey != null) {
                    this.keyCheck()
                }
                this.cachedKey = null
                break;
            case "simIdle":
                this.animationCounter = 0
                this.pedometer = 0
                this.state2 = "right"
                this.direction = 0
                this.speed = GRID_BOX_SIZE / 10
                break;
            case "right": 
                this.pedometer = this.pedometer + this.speed
                
                this.x = this.x + cos(this.direction) * this.speed;
                this.y = this.y + sin(this.direction) * this.speed;

                this.animationCounter = this.animationCounter + this.animationStep
                if (this.pedometer > this.pedometer_switch_val) {
                    this.state2 = "down"
                    this.direction = 3 * PI / 2
                    this.pedometer = 0
                }
                break;
            case "down":
                this.x = this.x + cos(this.direction) * this.speed;
                this.y = this.y + sin(this.direction) * this.speed;
                this.animationCounter = this.animationCounter + this.animationStep
                this.pedometer = this.pedometer + this.speed
                if (this.pedometer > this.pedometer_switch_val) {
                    this.state2 = "left"
                    this.direction = PI
                    this.pedometer = 0
                }
                break;
            case "left":
                this.x = this.x + cos(this.direction) * this.speed;
                this.y = this.y + sin(this.direction) * this.speed;
                this.animationCounter = this.animationCounter + this.animationStep
                this.pedometer = this.pedometer + this.speed
                if (this.pedometer > this.pedometer_switch_val) {
                    this.state2 = "up"
                    this.direction = PI/2
                    this.pedometer = 0
                }
                break;
            case "up":
                this.x = this.x + cos(this.direction) * this.speed;
                this.y = this.y + sin(this.direction) * this.speed;
                this.animationCounter = this.animationCounter + this.animationStep
                this.pedometer = this.pedometer + this.speed
                if (this.pedometer > this.pedometer_switch_val) {
                    this.state2 = "simIdle"
                    this.pedometer = 0
                }
                break;

        }
    }

    handleAnimation() {
        // draw the imag
        push()
        fill(color(GAME_BLACK))
        translate(this.x - (1.7 * this.radius), this.y - (1.7 * this.radius))
        if (this.direction == PI) {
            this.leftSwatch.draw_index(round(this.animationCounter), 0, 0)
        }
        // right arrow, set direction right and move right
        else if (this.direction == 0) {
            this.rightSwatch.draw_index(round(this.animationCounter), 0, 0)
        }
        // up arrow, set direction up and move up
        else if (this.direction == 3 * PI / 2) {
            // up arrow
            this.upSwatch.draw_index(round(this.animationCounter), 0, 0)
        }
        // down arrow, set direction down and move down
        else if (this.direction == PI / 2) {
            // down arrow
            this.downSwatch.draw_index(round(this.animationCounter), 0, 0)
        }
        pop()
    }

    keyCheck() {
        if (this.cachedKey == LEFT_ARROW) {
            this.direction = PI
        }
        // right arrow, set direction right and move right
        else if (this.cachedKey == RIGHT_ARROW) {
            this.direction = 0
        }
        // up arrow, set direction up and move up
        else if (this.cachedKey == UP_ARROW) {
            this.direction = 3 * PI / 2
        }
        // down arrow, set direction down and move down
        else if (this.cachedKey == DOWN_ARROW) {
            this.direction = PI / 2
        }
        this.cachedKey = null
        this.speed = GRID_BOX_SIZE / 5
        this.direction_x = cos(this.direction);
        this.direction_y = sin(this.direction);
    }

    move() {
        this.checkKeyPressed()
        this.fsm()
    }


    draw() {
        this.handleAnimation()

        if (this.animationCounter > 3) {
            this.animationCounter = 0
        }
        if (this.speaking) {
            // draw a speech bubble
            push()
            fill(color(GAME_WHITE))
            stroke(color(GAME_BLACK))
            strokeWeight(1)
            translate(this.x - this.radius, this.y - this.radius)
            rect(0, -GRID_BOX_SIZE, GRID_BOX_SIZE * 2, GRID_BOX_SIZE)
            fill(color(GAME_BLACK))
            noStroke()
            textSize(10)
            text(this.speech, GRID_BOX_SIZE, -GRID_BOX_SIZE / 2)
            pop()
        }
    }

    updateMouth() {
        // Animate Pacman's mouth
        this.mouthAngle = map(sin(frameCount * (1 / this.mouthSpeed)), -1, 1, QUARTER_PI, 0);
    }

    setEnemies(enemies) {
        this.enemies = enemies
    }

    reset() {
        this.points = 0
        this.state = "alive"
    }

    say(text) {
        this.speaking = true
        this.speech = text
    }
}
