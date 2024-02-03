import Config from "./utils";

const c = new Config();

let playerMajorAxis = c.getCanvasWidth()*.2;
let playerMinorAxis = c.getCanvasHeight() *.2;

export default class Player{
    constructor(){
      this.playerX = 0;
      this.playerY = 0;
      this.theta = 0;
    }
    
    update(){

      let a = mouseX - c.getCenterX();
      let b = mouseY - c.getCenterY();
    
      this.theta =  c.getCenterAngle(c.setCenterAngle(Math.atan2(b, a)));
  
      this.playerX= c.getCenterX() + (playerMajorAxis  + 140) * Math.cos(this.theta);
      this.playerY = c.getCenterY() + (playerMinorAxis + 140) * Math.sin(this.theta);
    }
    
    draw(){
      fill(240, 248, 255);
      push();
      translate(this.playerX, this.playerY);;
      rotate(this.theta);
      ellipse(0, 0, 30, 40);
      pop();
    }
}
