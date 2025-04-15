// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  let horizonY = height / 3;
  let skyTop = color(64, 156, 255);   
  let skyBottom = color(201, 245, 255); 
  for (let y = 0; y <= horizonY; y++) {
    let inter = map(y, 0, horizonY, 0, 1);
    let c = lerpColor(skyTop, skyBottom, inter);
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();
  fill(90, 80, 120);
  triangle(0, horizonY, 300, horizonY, 150, 100);
  triangle(250, horizonY, 480, horizonY, 370, 130);

  fill(70, 130, 180);
  rect(0, horizonY, 0.6 * width, height - horizonY);

  fill(238, 214, 175);
  rect(0.6 * width, horizonY, width - 0.6 * width, height - horizonY);

  fill(34, 139, 34);
  noStroke();
  ellipse(700, 520, 40, 20);
  ellipse(770, 580, 60, 30);
  ellipse(650, 450, 20, 10);

  let flowerCount = 3; 
  stroke(0, 128, 0);
  strokeWeight(4);
  for (let i = 0; i < flowerCount; i++) {
    let flowerX = random(30, 150);
    let flowerStemTopY = random(height - 150, height - 80);
    
    line(flowerX, height, flowerX, flowerStemTopY);
    
    noStroke();
    fill(128, 0, 128);
    ellipse(flowerX, flowerStemTopY, 10, 20);
    
    stroke(0, 128, 0);
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}