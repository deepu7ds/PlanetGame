import Config from '../constants/utils';

const c = new Config();

// let playerMajorAxis = c.getCanvasWidth() * 0.2;
// let playerMinorAxis = c.getCanvasHeight() * 0.2;

export default class Player {
  constructor(bulletController) {
    this.playerX = 0;
    this.playerY = 0;
    this.theta = 0;
    this.bulletController = bulletController;
    this.health = 100;
    this.diameter = 70;
    this.id = 'player';
    this.speed = 10;
  }

  update() {
    // perpendicular and base the find tan inverse
    // making playermovement through keys w s d a

    // checking if player is inside ellipse
    if (
      dist(this.playerX, this.playerY, c.getCenterX(), c.getCenterY()) >
        c.getCanvasWidth() / 2.8 &&
      dist(this.playerX, this.playerY, c.getCenterX(), c.getCenterY()) <
        c.canvasWidth * 1.5
    ) {
      if (window.keyIsDown(87)) {
        // Key W (up)
        this.playerY -= this.speed;
      }
      if (window.keyIsDown(83)) {
        // Key S (down)
        this.playerY += this.speed;
      }
      if (window.keyIsDown(65)) {
        // Key A (left)
        this.playerX -= this.speed;
      }
      if (window.keyIsDown(68)) {
        // Key D (right)
        this.playerX += this.speed;
      }
    } else {
      if (this.playerX > c.getCenterX()) {
        this.playerX += this.speed;
      }
      if (this.playerX < c.getCenterX()) {
        this.playerX -= this.speed;
      }
      if (this.playerY > c.getCenterY()) {
        this.playerY += this.speed;
      }
      if (this.playerY < c.getCenterY()) {
        this.playerY -= this.speed;
      }
    }

    let a = this.playerX - c.canvasWidth / 2;
    let b = this.playerY - c.canvasHeight / 2;

    this.theta = Math.atan2(b, a);

    // this.playerX =
    //   c.getCenterX() + (playerMajorAxis + 400) * Math.cos(this.theta);
    // this.playerY =
    //   c.getCenterY() + (playerMinorAxis + 400) * Math.sin(this.theta);
    this.shoot();
  }

  draw() {
    fill(240, 248, 255);
    push();
    translate(this.playerX, this.playerY);
    rotate(this.theta);
    ellipse(0, 0, this.diameter);
    console.log(this.health);
    pop();
  }

  damage(damage) {
    this.health -= damage;
  }

  shoot() {
    if (window.keyIsPressed && window.keyCode === 32) {
      this.shootPressed = true;
      let speed = 5;
      const damage = 10;
      const delay = 12;
      this.bulletController.shoot(
        this.playerX,
        this.playerY,
        speed,
        damage,
        delay,
        this.theta,
        this.id
      );
    }
  }
}
