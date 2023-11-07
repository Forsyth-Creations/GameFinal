// write a text area that a user can input text into

class TextArea {
    constructor(x, y, width, height, fontSize, placeholder) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.fontSize = fontSize
        this.placeholder = placeholder
        this.text = ""
        this.locked = false
        this.myKey = null

        this.myTextArea = document.createElement("textarea")
        this.myTextArea.style.position = "absolute"
        this.myTextArea.style.left = this.x + - this.width/2 + "px"
        this.myTextArea.style.top = this.y - this.height/2 + "px"
        this.myTextArea.style.width = this.width + "px"
        this.myTextArea.style.height = this.height + "px"
        this.myTextArea.style.fontSize = this.fontSize + "px"
        this.myTextArea.style.border = "none"

        // make it a single line
        this.myTextArea.style.resize = "none"
        this.myTextArea.style.overflow = "hidden"
        

        this.myTextArea.placeholder = this.placeholder
        this.state = "idle"
    }

    fsm()
    {
        // the text area only needs to be appended once
        // so we can use a finite state machine to handle this
        if (this.state == "idle")
        {
            document.body.appendChild(this.myTextArea)
            this.state = "waiting"
        }

    }

    draw()
    {
        this.fsm()
    }

    getValue()
    {
        return this.myTextArea.value
    }

    //reset and remove
    reset()
    {
        this.myTextArea.value = ""
        this.myTextArea.remove()
        this.state = "idle"
    }

}