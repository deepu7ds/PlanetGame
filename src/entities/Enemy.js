export default class Enemy {
  constructor(angle, earth, target, bulletController) {
    this.enemyzX = 0;
    this.enemyY = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.target = target;
    this.theta = radians(angle);
    this.earth = earth;
    this.bulletController = bulletController;
    this.color = color(240, 248, 255);
    this.health = 10;
    this.diameter = 40;
    this.id = 'enemy';
  }

  update() {
    this.enemyX =
      this.earth.earthX + (this.earth.earthDiameter / 2) * Math.cos(this.theta);
    this.enemyY =
      this.earth.earthY + (this.earth.earthDiameter / 2) * Math.sin(this.theta);
    this.shoot();
  }

  draw() {
    fill(this.color);
    push();
    translate(this.enemyX, this.enemyY);
    rotate(this.theta);
    circle(0, 0, this.diameter);
    pop();
  }

  damage(damage) {
    this.health -= damage;
  }

  shoot() {
    this.shootPressed = true;
    let speed = 15;
    const damage = 10;
    const delay = 50;

    let playerAngle = degrees(this.target.theta);
    if (playerAngle < 0) {
      playerAngle += 360;
    }

    if (Math.abs(playerAngle - degrees(this.theta)) <= 10) {
      this.bulletController.shoot(
        this.enemyX,
        this.enemyY,
        speed,
        damage,
        delay,
        this.theta,
        this.id
      );
    }
  }
}
