class Rock extends GridDefinedCharacter {
    constructor(x, y, size) {
        super(x, y)
        this.size = size
        this.shown = true
    }

    draw() {
        if (this.shown) {
            fill(color(GAME_GRAY))
            beginShape();
            vertex(this.x - this.size / 2, this.y + this.size / 2);
            vertex(this.x - this.size / 2, this.y + this.size / 4);
            vertex(this.x - this.size / 4, this.y + this.size / 4);
            vertex(this.x - this.size / 4, this.y);
            vertex(this.x - this.size / 4, this.y - this.size / 2);
            vertex(this.x + this.size / 20, this.y - this.size / 2);
            vertex(this.x + this.size / 20, this.y - this.size / 4);
            vertex(this.x + this.size / 4, this.y - this.size / 4);
            vertex(this.x + this.size / 4, this.y);
            vertex(this.x + this.size / 2, this.y);
            vertex(this.x + this.size / 2, this.y + this.size / 2);
            endShape(CLOSE);

            fill(color(GAME_DARK_GRAY))
            beginShape();
            vertex(this.x + this.size / 2, this.y + this.size / 2);
            vertex(this.x + this.size / 2, this.y);
            vertex(this.x + this.size / 4, this.y);
            vertex(this.x + this.size / 4, this.y + this.size / 4);
            vertex(this.x, this.y + this.size / 4);
            vertex(this.x, this.y + this.size / 2);
            endShape(CLOSE);
        }

    }
}