// p5js
// import and draw some images

let img1;
let img2;

function preload() {
    img1 = loadImage('assets/Screens/Screen1.png');
    img2 = loadImage('assets/Characters/hero/hero.png');
}

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    image(img1, 0, 0, 200, 200);
    image(img2, 200, 0, 200, 200);
}