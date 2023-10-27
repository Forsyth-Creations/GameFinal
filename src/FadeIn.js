class FadeInScreen {
    constructor(src) {
        this.src = src
        this.alpha = 0
        this.fadeIn = true
        this.fadeOut = false
    }

    draw() {
        if (this.fadeIn) {
            this.alpha += 5
            if (this.alpha >= 255) {
                this.fadeIn = false
                this.fadeOut = true
            }
        }
        else if (this.fadeOut) {
            this.alpha -= 5
            if (this.alpha <= 0) {
                this.fadeIn = false
                this.fadeOut = false
            }
        }
        tint(255, this.alpha)
        image(this.src, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

        if (this.isComplete)
        {
            // reset hte tint
            tint(255, 255)
        }
    }

    isComplete()
    {
        return !this.fadeIn && !this.fadeOut
    }
}