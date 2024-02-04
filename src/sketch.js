// Internal dependencies
import Config from "./utils.js";
import Player from "./player.js";
import Earth from "./earth.js";
import Enemy from "./enemy.js";
// import { Asteriods } from "./Asteriod.js";
import BulletController from "./Bullet/BulletController.js";
const c = new Config()

//objects initialized
const earth = new Earth();
const bulletController = new BulletController(earth)
const player = new Player(bulletController);

const enemies = [
  new Enemy(40, earth),
  new Enemy(270, earth),
  new Enemy(90, earth),
  new Enemy(180, earth),
  new Enemy(0, earth)
]

function canvasSize() {
  frameRate(60);
  createCanvas(c.getCanvasWidth(), c.getCanvasHeight());
}

window.windowResized = function windowResized() {
  resizeCanvas(c.getCanvasWidth(), c.getCanvasHeight());
}

window.setup = function setup() {
  canvasSize();
}

function update(delaTime) {
  earth.update();
  player.update();
}

window.draw = function draw() {
  update(deltaTime);
  background(1);
  
  earth.draw();
  enemies.forEach((enemy)=> {
    if(bulletController.collidedWith(enemy)){
      if(enemy.health <= 0){
        enemies.splice(enemies.indexOf(enemy), 1); 
      }
    }else{
      enemy.update();
      enemy.draw();
    }
  });
  player.draw();
  player.shoot()
  bulletController.draw()
  
}

