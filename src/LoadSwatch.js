class LoadSwatch {
    constructor(x, y, src, scalar = 1) {
        // upper left, offset

        this.upperLeft = createVector(4, 4)
        this.offset = 32

        this.src = src
        this.x = x
        this.y = y
        this.swatch_x = 140
        this.swatch_y = 50

        this.myImage = loadImage(this.src)

        this.size = 25

        this.scalar = scalar
    }

    draw(){
        //load the image and draw it as the x and y
        image(this.myImage, this.x, this.y)
    }

    draw_index(index, x, y) {
    
        // draw a box at the given index
        noFill();
        stroke(255, 0, 0);

        // copy and display the image
        copy(this.myImage, this.x + (this.offset * index), this.y, this.size, this.swatch_y, 0, 0, this.size * this.scalar, this.swatch_y * this.scalar);        
        noStroke();
    }
}