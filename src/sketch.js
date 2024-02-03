// Internal dependencies
import Config from "./utils.js";
import Player from "./player.js";
import Earth from "./earth.js";
import Enemy from "./enemy.js";
// import { Asteriods } from "./Asteriod.js";

const c = new Config()

//objects initialized
const player = new Player();
const earth = new Earth();
const enemy = new Enemy(30, earth);

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
  enemy.update();
  player.update();
}

window.draw = function draw() {
  update(deltaTime);
  background(1);

  earth.draw();
  enemy.draw();
  player.draw();

}

