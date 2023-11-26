class PuzzleModal
{
    constructor(x, y, textArray, answer)
    {
        this.x = x
        this.y = y
        this.textArray = textArray
        this.answer = answer

        this.width = SCREEN_WIDTH * (3/4)

        this.offset = 55

        this.textArea = new TextArea(this.offset + this.width/2, BOTTOM_OF_SCREEN - 50, this.width, 20, 20, "Enter Answer Here")

        this.button = new Button(this.offset, BOTTOM_OF_SCREEN - 35, 50, 30, "Submit");

        this.state = "idle"
    }

    draw()
    {
        if (this.state == "idle")

        {
        let totalHeight = this.textArray.length * 20 + 20

        // draw a rectangle to hold it all
        fill(255)
        rect(this.offset, this.offset, SCREEN_WIDTH - 2*this.offset, totalHeight)

        let height = 0
        push()
        // align text on the left
        textAlign(LEFT, TOP)
        for (let i = 0; i < this.textArray.length; i++)
        {
            fill(0)
            text(this.textArray[i], this.offset + 5, this.offset + height + 10)
            height += 20
        }

        this.textArea.draw()
        this.button.draw()
        pop()

        // if the button is clicked, compare the value in the text area to the answer
        if (this.button.isClicked() || this.textArea.locked)
        {
            if (this.textArea.getValue() == this.answer)
            {
                // if it's correct, then close the modal
                this.state = "correct"
                console.log("Correct!")
                this.textArea.reset()
                this.button.reset()
                return true
            }
            else
            {
                console.log("Incorrect!")
                this.state = "incorrect"
                // if it's incorrect, then reset the text area
                this.textArea.reset()
            }
        }
    
        }
    }

    reset()
    {
        this.state = "idle"
    }

    isCorrect()
    {
        return this.state == "correct"
    }

    isIncorrect()
    {
        return this.state == "incorrect"
    }

    remove()
    {
        this.textArea.reset()
    }
}