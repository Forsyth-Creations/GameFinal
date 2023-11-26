class FullPuzzle {
    constructor(array_puzzle, answer, subtext) {
        this.myIcon = new PuzzleIcon(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 200, 200)
        this.myIcon.disabled = true
        this.myPuzzle = new PuzzleModal(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2,
            array_puzzle, answer)
        this.myPuzzle.button.disabled = true
        this.isActive = false
        this.subtext = subtext
    }

    checkDist(me) {
        // see if the grid position of the pacman is the same as the puzzle
        this.isActive = (me.x == this.myIcon.x && me.y == this.myIcon.y)
        return this.isActive
    }

    draw() {
        // this.myIcon.draw()
        push()
        if (this.isActive) {
            this.myPuzzle.draw()
        }
        else {
            this.myPuzzle.remove()
        }
        pop()

        push()
        fill(color(GAME_BLACK))
        rect(0, BOTTOM_OF_SCREEN, SCREEN_WIDTH, 30)
        fill(color(GAME_WHITE))
        textAlign(LEFT, CENTER);
        text(this.subtext, 10, BOTTOM_OF_SCREEN + 15)
        pop()
    }

    reset() {
        this.myPuzzle.remove()
        this.myIcon.disabled = true
    }

    enable() {
        this.myPuzzle.button.disabled = false
        this.myIcon.disabled = false
    }

    isCorrect()
    {
        return this.myPuzzle.state == "correct"
    }

    isIncorrect()
    {
        return this.myPuzzle.state == "incorrect"
    }
}