// Internal dependencies
import Config from "./utils.js";
import Player from "./player.js";
import Earth from "./earth.js";
import Enemy from "./enemy.js";
import BulletController from "./Bullet/BulletController.js";
import AsteroidController from "./Asteroid/AsteroidController.js";

//images
let earthSprite;
let playerSprite;
let enemySprite;
let enemyBulletSprite;
let playerBulletSprite;
let canvas;
let asteroidSprite;
//sound 
let enemyDied;
let collison;

window.preload = function preload() {
  earthSprite = loadImage('earthSprite.png')
  playerSprite = loadImage('playerSprite.png')
  enemySprite = loadImage('enemySprite.png')
  enemyBulletSprite = loadImage('enemyBulletSprite.png')
  playerBulletSprite= loadImage('playerBulletSprite.png')
  canvas = loadImage('canvas.jpg')
  asteroidSprite = loadImage('asteroidSprite.png')
  enemyDied = loadSound('enemyDied.wav')
  collison = loadSound('collision.wav')
}


window.setup = function setup() {
  //objects initialized
  const c = new Config();
  const earth = new Earth(earthSprite);
  const bulletController = new BulletController(earth, enemyBulletSprite, playerBulletSprite);
  let player = new Player(bulletController);
  const asteroidController = new AsteroidController(asteroidSprite);
  
  const enemies = [];
  let angle = [0, 60, 120, 180, 240, 300];

  let score = 0;
  function drawCurrentScore() {
    let textToShow = "Score: " + score;
    textSize(32)
    fill(250)
    text(textToShow, 20, 50)
  }

  function drawHealth() {
    if (player != null && player.health > 0) {
      let textToShow = "Health: " + player.health;
      textSize(32)
      fill(250)
      text(textToShow, 1000, 50)

    }
    if (player.health <= 0) {
      let textToShow = "You died";
      textSize(32)
      fill(250)
      text(textToShow, 1000, 50)
    }

  }

  function canvasSize() {
    window.frameRate(60);
    window.createCanvas(c.getCanvasWidth(), c.getCanvasHeight());
  }

  function update() {
    earth.update();
    asteroidController.update();
  }

  canvasSize();

  window.draw = function draw() {
    update();
    background(1);
    earth.draw();

    // Spawn enemies
    for (let i = 0; i < 4; i++) {
      if (enemies.length < 6) {
        enemies.push(
          new Enemy(angle[Math.floor(Math.random() * angle.length)], earth, player, bulletController)
        );
      }
    }

    // Update and draw enemies
    enemies.forEach((enemy) => {
      if (bulletController.collidedWith(enemy) || asteroidController.collideWith(enemy)) {
        collison.play()
        if (enemy.health <= 0) {
          enemyDied.play();
          enemies.splice(enemies.indexOf(enemy), 1);
          score += 5;
        }
      } else {
        enemy.update();
        push();
        translate(enemy.enemyX, enemy.enemyY);
        // rotate(enemy.theta);
        image(enemySprite, 0, 0, enemy.diameter + 20, enemy.diameter);
        pop();
      }
    });

    // Update and draw player

    if (bulletController.collidedWith(player)) collison.play();
    if (player.health > 0) {
      player.update();
      player.shoot();
      push();
      translate(player.playerX, player.playerY);
      image(playerSprite, 0, 0, 90, 70);
      pop();
    }

    // Draw health and score
    drawHealth();
    drawCurrentScore();

    // Draw and handle collisions with bullets
    bulletController.draw();

    // Draw and handle collisions with asteroids
    asteroidController.draw();
    if (asteroidController.collideWith(player) || asteroidController.collideWith(earth)) {
      collison.play()
    }

    // Handle asteroid collisions with bullets
    asteroidController.asteroids.forEach((asteroid) => {
      if (bulletController.collidedWith(asteroid)) {
        collison.play()
        if (asteroid.health <= 0) {
          asteroidController.asteroids.splice(asteroidController.asteroids.indexOf(asteroid), 1);
        }
      }
    })
  }
}


