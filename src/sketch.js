// Internal dependencies
import Config from "./utils.js";
import Player from "./player.js";
import Earth from "./earth.js";
import Enemy from "./enemy.js";
import BulletController from "./Bullet/BulletController.js";

//objects initialized
const c = new Config()
const earth = new Earth();
const bulletController = new BulletController(earth)
let player = new Player(bulletController);

const enemies = []
let angle = [0, 60, 120, 180, 240, 300];

let score = 0;
function drawCurrentScore() {
  let textToShow = "Score: " + score;
  textSize(32)
  fill(250)
  text(textToShow, 20, 50)
}

function drawHealth(){
  if(player != null && player.health > 0){
    let textToShow = "Health: " + player.health;
    textSize(32)
    fill(250)
    text(textToShow, 1000, 50)
  }
  if(player.health <= 0){
    let textToShow = "You died";
    textSize(32)
    fill(250)
    text(textToShow, 1000, 50)
  }

}

function canvasSize() {
  frameRate(60);
  createCanvas(c.getCanvasWidth(), c.getCanvasHeight());
}

window.windowResized = function windowResized() {
  resizeCanvas(c.getCanvasWidth(), c.getCanvasHeight());
}

function update(delaTime) {
  earth.update();
}

window.setup = function setup() {
  canvasSize();
}

window.draw = function draw() {
  update(deltaTime);
  background(1);

  earth.draw();

  // enemy spaw and delete
  for (let i = 0; i < 6; i++) {
    if (enemies.length < 6) {
      enemies.push(
        new Enemy(angle[Math.floor(Math.random() * angle.length)], earth, player, bulletController)
      )
    }
  }
  enemies.forEach((enemy) => {
    if (bulletController.collidedWith(enemy)) {
      if (enemy.health <= 0) {
        enemies.splice(enemies.indexOf(enemy), 1);
        score += 5;
      }
    } else {
      enemy.update();
      enemy.draw();
    }
  });


  // player damage
    bulletController.collidedWith(player)
      if (player.health <= 0) {
        console.log("Game End")
        player == null;
        
      } else {
        player.update();
        player.shoot()
        player.draw();
      }
      drawHealth();

  bulletController.draw()
  drawCurrentScore();
}

