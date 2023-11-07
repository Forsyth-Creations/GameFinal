class Npc extends GridDefinedCharacter {
    constructor(x, y, radius, color, star_delay = 1000) {
        super(x, y)
        this.radius = radius
        this.color = color
        this.vulnerable = false
        this.direction = 0
        this.length = 0
        this.speed = 0; // Ghost's movement speed
        this.pacman = null
        this.dead = false
        this.pacman_x = null
        this.pacman_y = null
        this.pacman_grid_x = null
        this.pacman_grid_y = null
        this.star_delay = star_delay

        this.a_star = new Star(GAME_BOARD_1)
        this.my_node = new BetterNode(this.gridPosX, this.gridPosY)
        this.pacman_node = new BetterNode(this.pacman_grid_x, this.pacman_grid_y, null, true)

        this.path = []

        this.move_state = "idle"

        this.my_millis = 0
        this.my_target = null

        this.vulnerable = false
        this.waypoints = []
    }

    updateMyNodes() {
        this.my_node = new BetterNode(this.gridPosX, this.gridPosY)
        this.pacman_node = new BetterNode(this.pacman_grid_x, this.pacman_grid_y, null, true)
    }

    fsm() {
        switch (this.move_state) {
            case "idle":
                // stop moving to recheck the path
                this.speed = 0
                this.calculateGridPosition()
                this.updateMyNodes()
                this.a_star.calculatePath(this.my_node, this.pacman_node)
                this.move_state = "checking"
                this.my_millis = millis()
                this.path = [...this.a_star.path]
                break;
            case "checking":
                this.move_state = "moving"
                this.my_target = this.path.pop()
                if (this.my_target != null && this.my_target.x == this.gridPosX && this.my_target.y == this.gridPosY) {
                    this.my_target = this.path.pop()
                }
                if (this.path.length == 0) {
                    this.move_state = "idle"
                }
                this.calculateGridPosition()

                break;
            case "moving":
                // move to my target
                this.speed = 1
                this.abstract_move()

                if (this.isFirmlyInGrid()) {
                    this.move_state = "idle"
                    this.speed = 0
                }

                break;
        }
    }

    abstract_move() {
        if (this.my_target != null) {
            if (this.my_target.x < this.gridPosX) {
                this.direction = PI
                this.direction_x = -1;
                this.direction_y = 0;
            }
            else if (this.my_target.x > this.gridPosX) {
                this.direction = 0
                this.direction_x = 1;
                this.direction_y = 0;
            }
            else if (this.my_target.y < this.gridPosY) {
                this.direction = 3 * PI / 2
                this.direction_x = 0;
                this.direction_y = -1;
            }
            else if (this.my_target.y > this.gridPosY) {
                this.direction = PI / 2
                this.direction_x = 0;
                this.direction_y = 1;
            }
            this.x = this.x + (this.direction_x * this.speed)
            this.y = this.y + (this.direction_y * this.speed)
        }
    }

    draw() {

        // rect
        fill(this.color)
        rect(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius)
        noStroke()
    }

    followPath() {
        // follow the path
        if (this.path.length > 0 && this.isFirmlyInGrid()) {
            let next = this.path.pop()
            // if next is my current node, pop again
            if (next.x == this.gridPosX && next.y == this.gridPosY) {
                next = this.path.pop()
            }

            // contrain my x and y to be between my current position and the next node


            this.speed = 2
            // move toward the next node
            // slowly move from my current position to the next node

            if (next.x < this.gridPosX) {
                this.direction = PI
                this.direction_x = 1;
                this.direction_y = 0;
            }
            else if (next.x > this.gridPosX) {
                this.direction = 0
                this.direction_x = -1;
                this.direction_y = 0;
            }
            else if (next.y < this.gridPosY) {
                this.direction = 3 * PI / 2
                this.direction_x = 0;
                this.direction_y = 1;
            }
            else if (next.y > this.gridPosY) {
                this.direction = PI / 2
                this.direction_x = 0;
                this.direction_y = -1;
            }

            // create an initial move
            this.x = this.x + (this.direction_x * this.speed)
            this.y = this.y + (this.direction_y * this.speed)
        }
        if (this.isFirmlyInGrid()) {
            // this.speed = 0
            // this.direction = 0
        }
        else {
            this.x = this.x - (this.direction_x * this.speed)
            this.y = this.y - (this.direction_y * this.speed)
        }

    }

    move() {
        this.fsm()
        noStroke()
    }


    // Set position of hero

    setFocusPosition(x, y) {
        this.pacman_x = x
        this.pacman_y = y
    }

    setFocusGridPosition(x, y) {
        this.pacman_grid_x = x
        this.pacman_grid_y = y
    }

    setWaypoints(waypoints) {
        // must be a list of waypoints
        this.waypoints = waypoints
    }

}