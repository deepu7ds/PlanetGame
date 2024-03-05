// Internal dependencies
import Config from './constants/utils.js';
import Player from './entities/player.js';
import Earth from './entities/Earth.js';
import Enemy from './entities/enemy.js';
import BulletController from './entities/bullet/BulletController.js';
import AsteroidController from './entities/Asteroid/AsteroidController.js';

//images
let earthSprite;
let playerSprite;
let enemySprite;
let enemyBulletSprite;
let playerBulletSprite;
let asteroidSprite;
//sound
let enemyDied;
let collison;
let backgroundMusic;

window.preload = function preload() {
  earthSprite = loadImage('/assets/images/earthSprite.png');
  playerSprite = loadImage('/assets/images/playerSprite.png');
  enemySprite = loadImage('/assets/images/enemySprite.png');
  enemyBulletSprite = loadImage('/assets/images/enemyBulletSprite.png');
  playerBulletSprite = loadImage('/assets/images/playerBulletSprite.png');
  asteroidSprite = loadImage('/assets/images/asteroidSprite.png');
  enemyDied = loadSound('/assets/sound/enemyDied.wav');
  collison = loadSound('/assets/sound/collision.wav');
  backgroundMusic = loadSound('/assets/sound/background.mp3');
};

//objects initialized
let c;
let earth;
let bulletController;
let player;
let asteroidController;
let enemies;
let enemyAngle;
let score;

function drawCurrentScore() {
  let textToShow = 'Score: ' + score;
  textSize(32);
  fill(250);
  text(textToShow, 20, 50);
}

function drawHealth() {
  let textToShow =
    player && player.health > 0 ? 'Health: ' + player.health : 'You died';
  textSize(32);
  fill(250);
  text(textToShow, 1000, 50);
}

function canvasSize() {
  window.frameRate(60);
  window.createCanvas(c.getCanvasWidth(), c.getCanvasHeight());
}

function updateEntities() {
  earth.update();
  asteroidController.update();
  player.update();
  enemies.forEach((enemy) => enemy.update());
}

function spawnEnemies() {
  for (let i = 0; i < 4; i++) {
    if (enemies.length < 6) {
      enemies.push(
        new Enemy(
          enemyAngle[Math.floor(Math.random() * enemyAngle.length)],
          earth,
          player,
          bulletController
        )
      );
    }
  }
}

function handleCollisions() {
  enemies.forEach((enemy) => {
    if (
      bulletController.collidedWith(enemy) ||
      asteroidController.collideWith(enemy)
    ) {
      collison.play();
      if (enemy.health <= 0) {
        enemyDied.play();
        enemies.splice(enemies.indexOf(enemy), 1);
        score += 5;
      }
    }
  });

  if (bulletController.collidedWith(player)) collison.play();

  if (
    asteroidController.collideWith(player) ||
    asteroidController.collideWith(earth)
  ) {
    collison.play();
  }

  asteroidController.asteroids.forEach((asteroid) => {
    if (bulletController.collidedWith(asteroid)) {
      collison.play();
      if (asteroid.health <= 0) {
        asteroidController.asteroids.splice(
          asteroidController.asteroids.indexOf(asteroid),
          1
        );
      }
    }
  });
}

window.setup = function setup() {
  c = new Config();
  earth = new Earth(earthSprite);
  bulletController = new BulletController(
    earth,
    enemyBulletSprite,
    playerBulletSprite
  );
  player = new Player(bulletController);
  asteroidController = new AsteroidController(asteroidSprite);
  enemies = [];
  enemyAngle = [0, 90, 180, 270];
  score = 0;

  backgroundMusic.loop();
  canvasSize();
};

window.draw = function draw() {
  background(1);
  earth.draw();
  updateEntities();
  spawnEnemies();
  handleCollisions();

  // Draw player
  if (player.health > 0) {
    push();
    translate(player.playerX, player.playerY);
    image(playerSprite, 0, 0, 90, 70);
    pop();
  }

  // Draw enemies
  enemies.forEach((enemy) => {
    push();
    translate(enemy.enemyX, enemy.enemyY);
    image(enemySprite, 0, 0, enemy.diameter + 20, enemy.diameter);
    pop();
  });

  drawHealth();
  drawCurrentScore();
  bulletController.draw();
  asteroidController.draw();
};
