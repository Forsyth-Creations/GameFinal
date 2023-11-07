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

    calculateGridPosition() {
        this.gridPosX = round(this.x / GRID_BOX_SIZE) - 1;
        this.gridPosY = round(this.y / GRID_BOX_SIZE) - 1;
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