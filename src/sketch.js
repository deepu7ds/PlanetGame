// Internal dependencies
import Config from './constants/utils.js';
import Player from './entities/Player.js';
import Earth from './entities/Earth.js';
import Enemy from './entities/enemy/Enemy.js';
import BulletController from './entities/bullet/BulletController.js';
import AsteroidController from './entities/asteroid/AsteroidController.js';
import Zombie from './entities/enemy/Zombie.js'; // Import Zombie class

let earthSprite;
let playerSprite;
let enemySprite;
let enemyBulletSprite;
let playerBulletSprite;
let asteroidSprite;
let zombieSprite;

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
  zombieSprite = loadImage('/assets/images/zombieSprite.gif');
  enemyDied = loadSound('/assets/sound/enemyDied.wav');
  collison = loadSound('/assets/sound/collision.wav');
  backgroundMusic = loadSound('/assets/sound/background.mp3');
};

//objects initialized
//fucked

let c;
let earth;
let bulletController;
let player;
let asteroidController;
let enemies;
let zombies; // Add a variable for zombies
let enemyAngle;
let zombieAngle; // Create an angle array for zombies

//gloabl variables
window.score = 0;

window.playerHealth = 100;
window.earthHealth = 500;
window.playerCoordinates = { x: 0, y: 0 };

function updateEntities() {
  earth.update();
  asteroidController.update();
  player.update();
  enemies.forEach((enemy) => enemy.update());
  zombies.forEach((zombie) => zombie.update()); // Update zombies
  window.earthHealth = earth.health;
}

function spawnEnemies() {
  for (let i = 0; i < 4; i++) {
    if (enemies.length < 4) {
      enemies.push(
        new Enemy(
          enemyAngle[Math.floor(Math.random() * enemyAngle.length)],
          earth,
          player,
          bulletController
        )
      );
    }
    if (zombies.length < 4) {
      // Spawn zombies
      zombies.push(
        new Zombie(
          zombieAngle[Math.floor(Math.random() * zombieAngle.length)],
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
        localStorage.setItem('score', (window.score += 5));
        earth.health += 10;
        player.health += 1;
      }
    }
  });

  zombies.forEach((zombie) => {
    // Handle collisions for zombies
    if (
      bulletController.collidedWith(zombie) ||
      asteroidController.collideWith(zombie)
    ) {
      collison.play();
      if (zombie.health <= 0) {
        enemyDied.play();
        zombies.splice(zombies.indexOf(zombie), 1);
        localStorage.setItem('score', (window.score += 5));
        earth.health += 10;
        player.health += 1;
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

let targetX, targetY;
let smoothX;
let smoothY;
let cameraZoom;

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
  zombies = []; // Initialize zombies array
  enemyAngle = [0, 60, 120, 180, 240, 300];
  zombieAngle = [45, 135, 225, 315]; // Create an angle array for zombies
  window.score = 0;

  window.frameRate(120);
  window.createCanvas(c.getCanvasWidth(), c.getCanvasHeight(), WEBGL);
  smoothX = player.playerX;
  smoothY = player.playerY;
  cameraZoom = height / 2 / tan(PI / 12);
  backgroundMusic.loop();
};

let targetCamera = window.height / 2 / Math.tan(Math.PI / 12);
window.draw = function draw() {
  //gloaval
  window.playerCoordinates.x = player.playerX;
  window.playerCoordinates.y = player.playerY;

  //camera
  let angle = degrees(player.theta);
  // console.log(angle);

  if (angle > -40 && angle < 40) {
    targetX = player.playerX - 200;
    targetY = player.playerY;
  } else if (angle > -130 && angle < -40) {
    targetX = player.playerX;
    targetY = player.playerY + 200;
  } else if (angle > 40 && angle < 130) {
    targetX = player.playerX;
    targetY = player.playerY - 200;
  } else {
    targetX = player.playerX + 200;
    targetY = player.playerY;
  }

  if (
    dist(player.playerX, player.playerY, width / 2, height / 2) >
    width / 1.5
  ) {
    targetCamera = height / 2 / tan(PI / 20);
  } else {
    targetCamera = height / 2 / tan(PI / 14);
  }
  // Use lerp to smoothly transition the camera position
  cameraZoom = lerp(cameraZoom, targetCamera, 0.02);
  smoothX = lerp(smoothX, targetX, 0.02);
  smoothY = lerp(smoothY, targetY, 0.02);

  camera(width / 2, height / 2, cameraZoom, smoothX, smoothY, 0, 0, 1, 0);
  background(1);
  earth.draw();
  updateEntities();
  spawnEnemies();
  handleCollisions();

  // Draw player
  window.playerHealth = player.health;
  if (player.health > 0) {
    push();
    translate(player.playerX, player.playerY);
    image(playerSprite, 0, 0, 90, 70);
    pop();
  }

  // Dr   zombies
  enemies.forEach((enemy) => {
    push();
    translate(enemy.enemyX, enemy.enemyY);
    image(enemySprite, 0, 0, enemy.diameter + 20, enemy.diameter);
    pop();
  });

  zombies.forEach((zombie) => {
    push();
    translate(zombie.zombieX, zombie.zombieY);
    if (zombie.zombieX > width / 2) {
      image(zombieSprite, 0, 0, zombie.diameter, zombie.diameter);
    } else {
      image(zombieSprite, 0, 0, -zombie.diameter, zombie.diameter);
    }
    pop();
  });

  // Draw enemies

  bulletController.draw();
  asteroidController.draw();
};
