let canvasWidthPercentage = 70;
let canvasHeightPercentage = 75;
let earthRadiusPercentage = 12

function canvasSize() {
  let canvasWidth = (windowWidth * canvasWidthPercentage) / 100;
  let canvasHeight = (windowHeight * canvasHeightPercentage) / 100;
  createCanvas(canvasWidth, canvasHeight);
}

function windowResized() {
  let canvasWidth = (windowWidth * canvasWidthPercentage) / 100;
  let canvasHeight = (windowHeight * canvasHeightPercentage) / 100;
  resizeCanvas(canvasWidth, canvasHeight);
}

function Earth() {
  circleCoordinateX = (windowWidth * canvasWidthPercentage) / 200;
  circleCoordinateY = (windowHeight * canvasHeightPercentage) / 200;
  let earthRadius = (canvasWidthPercentage*windowWidth)/100 * (earthRadiusPercentage/100); 
  fill(30, 144, 255);
  circle(circleCoordinateX, circleCoordinateY, earthRadius)
}

function setup() {
  canvasSize();
}

function draw() {
  background(1);
  Earth();
} 