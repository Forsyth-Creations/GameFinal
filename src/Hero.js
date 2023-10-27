class Pacman extends GridDefinedCharacter {
    constructor(x, y, radius) {
        super(x, y)
        this.radius = radius / 2;
        this.mouthAngle = QUARTER_PI; // Start with an open mouth
        this.speed = GRID_BOX_SIZE / 10; // Pacman's movement speed
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

        this.rockLives = 3

        this.boundX = ACTUAL_GRID_SIZE
        this.boundY = ACTUAL_GRID_SIZE

        this.image = loadImage('assets/Characters/hero/hero.png');
    }

    fsm()
    {
        switch(this.state2)
        {
            case "idle":
                // wait until the user presses a key
                if (this.cachedKey != null)
                {
                    this.state2 = "moving"
                    this.keyCheck()   
                }
                else
                {
                    this.speed = 0
                }
                break;
            case "moving":
                this.x = this.x + this.direction_x * this.speed;
                this.y = this.y + this.direction_y * this.speed;
                this.applyBounds()
                // print out the current grid position
                if (this.isFirmlyInGrid())
                {
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

        }
    }

    keyCheck()
    {
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
        this.speed = GRID_BOX_SIZE / 10
        this.direction_x = cos(this.direction);
        this.direction_y = sin(this.direction);
    }

    move() {
        this.checkKeyPressed()
        this.fsm()
    }


    draw() {
        
        // draw the image
        push()
        fill(color(GAME_BLACK))
        translate(this.x - this.radius, this.y - this.radius)
        // rotate(this.direction)
        image(this.image, 0, 0, GRID_BOX_SIZE, GRID_BOX_SIZE)
        pop()

        // Draw Pacman
        push()
        // draw a circle
        stroke(color(GAME_YELLOW))
        strokeWeight(2)
        noFill()
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
        pop()
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
}
