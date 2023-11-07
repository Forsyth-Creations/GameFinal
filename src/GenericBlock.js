class GenericBlock extends GridDefinedCharacter {
    constructor(x, y, size, color = GAME_GRAY) {
        super(x, y)
        this.size = size
        this.shown = true
        this.color = color
    }

    draw() {
        if (this.shown) {
            fill(color(this.color))
            rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size)
        }
    }

    draw2()
    {
        // draw a grid of 10x10, with the color of each square varying slighly from the original color
        // this is to make it seem like an 8-bit game 

        let DIM = 10

        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
                let x = this.x - this.size/2 + i * this.size/DIM
                let y = this.y - this.size/2 + j * this.size/DIM

                // get the r,g,b values of the color
                let r = red(this.color)
                let g = green(this.color)
                let b = blue(this.color)

                // add a random value to each r,g,b value
                r += random(-COLOR_FUDGE_FACTOR, COLOR_FUDGE_FACTOR)
                g += random(-COLOR_FUDGE_FACTOR, COLOR_FUDGE_FACTOR)
                b += random(-COLOR_FUDGE_FACTOR, COLOR_FUDGE_FACTOR)

                // constrain the r,g,b values to 0-255
                r = constrain(r, 0, 255)
                g = constrain(g, 0, 255)
                b = constrain(b, 0, 255)

                // create a new color with the new r,g,b values
                let newColor = color(r, g, b)

                fill(newColor)
                rect(x, y, this.size/DIM, this.size/DIM)
            }
        }
    }
}