class Npc extends GridDefinedCharacter {
    constructor(x, y, size) {
        super(x, y)
        this.size = size
        this.direction = 0
        this.speed = 0; // 
        this.target = null
        this.target_grid_x = null
        this.target_grid_y = null

        this.a_star = new Star(GAME_BOARD_1)
        this.my_node = new BetterNode(this.gridPosX, this.gridPosY)
        this.target_node = new BetterNode(this.target_grid_x, this.target_grid_y, null, true)

        this.path = []

        this.move_state = "idle"

        this.my_millis = 0
        this.my_target = null

        this.vulnerable = false
        this.waypoints = []
    }

    updateMyNodes() {
        this.my_node = new BetterNode(this.gridPosX, this.gridPosY)
        this.target_node = new BetterNode(this.target_grid_x, this.target_grid_y, null, true)
    }

    fsm() {
        switch (this.move_state) {
            case "idle":
                // stop moving to recheck the path
                // this.speed = 0
                this.calculateGridPosition()
                this.updateMyNodes()
                this.a_star.calculatePath(this.my_node, this.target_node)
                this.move_state = "checking"
                this.my_millis = millis()
                this.path = [...this.a_star.path]
                break;
            case "checking":
                this.move_state = "moving"

                // write out all waypoints in the path
                for (let i = 0; i < this.path.length; i++) {
                    console.log(this.path[i].x + ", " + this.path[i].y)
                }

                // if (this.path.length == 2 && (this.gridPosX != this.target_grid_x || this.gridPosY != this.target_grid_y)) {
                //     this.path.pop()
                // }

                this.my_target = this.path.pop()
                console.log(this.my_target)
                if (this.my_target != null && this.my_target.x == this.gridPosX && this.my_target.y == this.gridPosY) {
                    this.my_target = this.path.pop()
                }
                if (this.path.length == 0) {
                    // append my target node
                    this.move_state = "idle"
                }
                if (this.my_target != null) {
                    this.move_state = "moving"
                }
                this.calculateGridPosition()

                break;
            case "moving":
                // move to my target
                // this.speed = 1
                this.abstract_move()

                if (this.isFirmlyInGrid()) {
                    this.move_state = "idle"
                    // this.speed = 0
                }
                break;
        }
    }

    abstract_move() {
        if (this.my_target != null) {
            if (this.my_target.x < this.gridPosX) {
                this.direction = PI
            }
            else if (this.my_target.x > this.gridPosX) {
                this.direction = 0
            }
            else if (this.my_target.y < this.gridPosY) {
                this.direction = 3 * PI / 2
            }
            else if (this.my_target.y > this.gridPosY) {
                this.direction = PI / 2

            }
            this.x = this.x + (cos(this.direction) * this.speed)
            this.y = this.y + (sin(this.direction)* this.speed)
        }
    }

    draw() {

        // rect
        fill(color(GAME_YELLOW))
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        noStroke()
        fill(255)
        // text(this.gridPosX + ", " + this.gridPosY, this.x + 20, this.y)
    }

    followPath() {
        // follow the path
        if (this.path.length > 0 && this.isFirmlyInGrid()) {
            let next = this.path.pop()
            // if next is my current node, pop again
            if (next.x == this.gridPosX && next.y == this.gridPosY) {
                next = this.path.pop()
            }
            this.speed = 2
            // move toward the next node
            // slowly move from my current position to the next node
            if (next.x < this.gridPosX) {
                this.direction = PI
            }
            else if (next.x > this.gridPosX) {
                this.direction = 0
            }
            else if (next.y < this.gridPosY) {
                this.direction = 3 * PI / 2
            }
            else if (next.y > this.gridPosY) {
                this.direction = PI / 2
            }

            // create an initial move
            this.x = this.x + (cos(this.direction) * this.speed)
            this.y = this.y + (sin(this.direction) * this.speed)
        }
        if (this.isFirmlyInGrid()) {
            // this.speed = 0
            // this.direction = 0
        }
        else {
            this.x = this.x - (cos(this.direction) * this.speed)
            this.y = this.y - (sin(this.direction) * this.speed)
        }

    }

    move() {
        this.fsm()
        noStroke()
    }

    setFocusGridPosition(x, y) {
        this.target_grid_x = x
        this.target_grid_y = y
    }
}

class ComplexNpc extends Npc
{
    constructor(x, y, size, dir = "TopDownCharacter") {
        super(x, y, size)

        this.rightSwatch = new LoadSwatch(0, 0, 'assets/Characters/TopDownCharacter/Character/Character_Right.png', 2)
        this.leftSwatch = new LoadSwatch(0, 0, 'assets/Characters/' + dir + '/Character/Character_Left.png', 2)
        this.upSwatch = new LoadSwatch(0, 0, 'assets/Characters/' + dir + '/Character/Character_Up.png', 2)
        this.downSwatch = new LoadSwatch(0, 0, 'assets/Characters/' + dir + '/Character/Character_Down.png', 2)

        this.animationCounter = 0
        this.pedometer = 0
        this.pedometer_switch_val = 5
        this.animationStep = 0.1
    }

    draw()
    {
        this.animationCounter = this.animationCounter + this.animationStep
        if (this.animationCounter > 3) {
            this.animationCounter = 0
        }
        // rect
        // noFill()
        // rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        // noStroke()
        // fill(255)
        // text(this.gridPosX + ", " + this.gridPosY, this.x + 20, this.y)

        this.handleAnimation()
    }

    handleAnimation() {
        // draw the imag
        push()
        fill(color(GAME_BLACK))
        translate(this.x - this.size * (3/4), this.y - this.size * (5/6))
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

}

class WaypointNPC extends ComplexNpc
{
    constructor(x, y, size, points = [], dir = "TopDownCharacter") {
        super(x, y, size, dir)
        this.points = points
        this.index = 0
        this.speed = GRID_BOX_SIZE / 10
    }

    move()
    {
        // // if i'm at that point
        // console.log(this.my_node)
        // console.log(this.target_node)
        if (this.points.length > 0 && this.gridPosX == this.points[this.index].x && this.gridPosY == this.points[this.index].y) {
            this.index = this.index + 1
            if (this.index >= this.points.length) {
                this.index = 0 // allows it to loop
                this.path = []
            }
            this.setFocusGridPosition(this.points[this.index].x, this.points[this.index].y)
            this.updateMyNodes()
            if (this.index >= this.points.length) {
                this.index = 0
                this.path = []
            }
        }
        this.updateMyNodes()
        super.move()
    }

}