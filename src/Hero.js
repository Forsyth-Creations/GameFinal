class Pacman extends GridDefinedCharacter {
    constructor(x, y, radius) {
        super(x, y)
        this.radius = radius / 2;
        this.mouthAngle = QUARTER_PI; // Start with an open mouth
        this.speed = GRID_BOX_SIZE / 5; // Pacman's movement speed
        this.mouthSpeed = 5
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

        // this.image = loadImage('assets/Characters/hero/hero.png');

        this.speaking = false
        this.speech = "Hello there"


        this.rightSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Right.png', 2)
        this.leftSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Left.png', 2)
        this.upSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Up.png', 2)
        this.downSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Down.png', 2)

        this.animationCounter = 0

        this.pedometer = 0
        this.pedometer_switch_val = GRID_BOX_SIZE 
        this.animationStep = 0.3

        this.a_star = new Star(GAME_BOARD_1)

        this.neighbors = []

    }

    somethingInFront() {
        let myNode = new BetterNode(this.gridPosX, this.gridPosY, null)
        let neighbors = this.a_star.getNeighbors(myNode)
        let nothingInFront = false
        // use my current direction to check if there is an obstacle in front of me
        let nextPosX = round(this.gridPosX + cos(this.direction))
        let nextPosY = round(this.gridPosY + sin(this.direction))
        let nextNode = new BetterNode(nextPosX, nextPosY, null)

        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].x == nextNode.x && neighbors[i].y == nextNode.y) {
                nothingInFront = true
            }
        }

        return [!nothingInFront, nextNode]
    }

    fsm() {
        switch (this.state2) {
            case "idle":
                this.checkKeyPressed()
                // allow movement, but not reorientation
                this.rotate_character()

                if (this.cachedKey != null){
                    let check = this.somethingInFront()
                    // console.log(check)
                    // I would like to move to
                    if (!check[0]) {
                        this.x = this.x + round(cos(this.direction)) * this.speed;
                        this.y = this.y + round(sin(this.direction)) * this.speed;
                        this.animationCounter = this.animationCounter + this.animationStep
                        this.state2 = "moving"
                        break;
                    }
                    // // if there is something in front of me, still allow me to rotate my character
                    this.cachedKey = null
                }
                break;
            case "moving":
                if (this.cachedKey == null && this.isFirmlyInGrid()) {
                    this.state2 = "idle"
                }
                
                this.x = this.x + round(cos(this.direction)) * this.speed;
                this.y = this.y + round(sin(this.direction)) * this.speed;
                this.animationCounter = this.animationCounter + this.animationStep

                this.applyBounds()

                if (this.isFirmlyInGrid()) {
                    this.state2 = "idle"
                    this.animationCounter = 0
                }



                this.cachedKey = null
                break;
            case "simIdle":
                this.animationCounter = 0
                this.pedometer = 0
                this.state2 = "right"
                this.direction = 0
                this.speed = GRID_BOX_SIZE / 20
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

    rotate_character() {
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
    }

    move() {

        // check the neigbors
        this.calculateGridPosition()
        let myNode = new BetterNode(this.gridPosX, this.gridPosY, null)
        this.neighbors = this.a_star.getNeighbors(myNode)

        // run the fsm
        this.fsm()

        // write my current grid position
    }


    draw() {
        this.handleAnimation()
        if (this.animationCounter > 3) {
            this.animationCounter = 0
        }
        fill(255)
        // text(this.gridPosX + ", " + this.gridPosY, this.x, this.y)
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
