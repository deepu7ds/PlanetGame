let canvasWidthPercentage = 70;
let canvasHeightPercentage = 75;
let earthRadiusPercentage = 25;
let angle1 = 0;
let earthDiameter = 180;
class Enemy{
  
  constructor(angle, WIDTH, HEIGHT){
    this.angle = Math.random()*360;
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
  }

  setup(){
    let theta = radians(this.angle);
    let xCom = circleCoordinateX + (earthDiameter / 2) * Math.cos(theta);
    let yCom = circleCoordinateY + (earthDiameter / 2) * Math.sin(theta);
    
    fill(240, 248, 255);
    push();
    translate(xCom, yCom);
    rotate(theta);
    rect(0, 0, this.WIDTH, this.HEIGHT);
    pop();
  }

}

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
  earthDiameter = (canvasWidthPercentage*windowWidth)/100 * (earthRadiusPercentage/100); 
  fill(30, 144, 255);
  circle(circleCoordinateX, circleCoordinateY, earthDiameter)
}

let playerRadius = earthDiameter/2;

function player() {
  
  let a = mouseX - circleCoordinateX;
  let b = mouseY - circleCoordinateY;


  angle1 = Math.atan2(b,a);
  console.log(angle1)
  let theta = angle1;
  let xCom = circleCoordinateX + (playerRadius  + 120) * Math.cos(theta);
  let yCom = circleCoordinateY + (playerRadius + 120) * Math.sin(theta);

  fill(240, 248, 255);
  push();
  translate(xCom, yCom);
  rotate(theta);
  ellipse(0, 0, 30, 40);
  pop();
}


function setup() {
  canvasSize();
  // noCursor();
}

function draw() {
  // frameRate(1)
  background(1);
  Earth();
  const e1 = new Enemy(30, 20, 30);
  e1.setup();
  player();
} 
