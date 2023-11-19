// when drawn, it shows a letter
// the letter can be opened to reveal a clue
// there are functions to open and close the letter
// as well as to lock it so it can't be opened

class PuzzleIcon extends GridDefinedCharacter {
    constructor(x, y, width, height) {
        super(x, y)
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.isOpened = true
        this.image = LETTER
        this.disabled = false
    }

    draw() {
        //calculate the width based on the frame of the game
        if (!this.disabled) {
            let tempWidth = sin(frameCount / 30) * GRID_BOX_SIZE * (3 / 4)

            // draw the letter
            image(this.image, this.x - tempWidth / 2, this.y - GRID_BOX_SIZE / 2 + 5, tempWidth, GRID_BOX_SIZE * (3 / 4))
        }
    }

    disable() {
        this.disabled = true
    }

    reset() {
        this.disabled = false
    }
}