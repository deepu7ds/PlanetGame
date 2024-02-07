import Config from "./utils";

const c = new Config();

let playerMajorAxis = c.getCanvasWidth()*.2;
let playerMinorAxis = c.getCanvasHeight() *.2;

export default class Player{
    constructor(bulletController){
      this.playerX = 0;
      this.playerY = 0;
      this.theta = 0;
      this.bulletController = bulletController;
      this.health = 50;
    }
    
    update(){
      // perpendicular and base the find tan inverse
      let a = mouseX - c.getCenterX();
      let b = mouseY - c.getCenterY();
    
      this.theta =  c.getCenterAngle(c.setCenterAngle(Math.atan2(b, a)));
  
      this.playerX= c.getCenterX() + (playerMinorAxis  + 140) * Math.cos(this.theta);
      this.playerY = c.getCenterY() + (playerMinorAxis + 140) * Math.sin(this.theta);
      this.shoot();
    }
    
    draw(){
      fill(240, 248, 255);
      push();
      translate(this.playerX, this.playerY);;
      rotate(this.theta);
      ellipse(0, 0, 30);
      console.log(this.health)
      pop();
    }

    damage(damage){
      this.health -= damage;
    }

    shoot(){
      if(keyIsPressed && keyCode === 32){
        this.shootPressed = true;
        let speed = 5;
        const damage = 5;
        const delay =10;
        const id = 1;
        this.bulletController.shoot(this.playerX, this.playerY, speed, damage, delay, this.theta, id)
      }
    }

}
