
class Button {
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.state = "idle" // options are idle, hover, pressed
        this.locked = false
        this.activeButtonColor = color(GAME_GRAY)
        this.activeTextColor = color(GAME_BLACK)
    }

    fsm() {
        switch (this.state) {
            case "idle":
                this.activeButtonColor = color(GAME_GRAY)
                this.activeTextColor = color(GAME_BLACK)
                if (this.mouseOver()) {
                    this.state = "hover"
                }
                break;
            case "hover":
                this.activeButtonColor = color(GAME_GRAY_HOVER)
                this.activeTextColor = color(GAME_BLACK)
                if (!this.mouseOver()) {
                    this.state = "idle"
                }
                else if (this.mouseOver() && this.mousePressed() && !this.locked) {
                    this.state = "pressed"
                    this.locked = true
                }
                // code block
                break;
            case "pressed":
                break;
            default:
            // code block
        }
    }

    getState() {
        return this.state
    }

    draw() {
        this.fsm()

        this.mousePressed()
        // draw a basic rectangle
        fill(this.activeButtonColor);
        rect(this.x, this.y, this.w, this.h, 5);
        // draw the text
        fill(this.activeTextColor)
        // Align text center
        textAlign(CENTER, CENTER);
        textSize(15);
        text(this.text, this.x + (this.w / 2), this.y + (this.h / 2));
    }

    // Handle when I mouse over the button
    mouseOver() {
        // if the mouse is over the button, change the color
        return (mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.h)
    }

    // Handle when I click the button
    mousePressed() {
        return mouseIsPressed && this.mouseOver()
    }

    reset() {
        this.state = "idle"
        this.locked = false
    }

    isClicked()
    {
        if (this.state == "pressed")
        {
            this.reset()
            return true
        }
        else
        {
            return false
        }
    }
}
