export default class Enemy {
  constructor(angle, earth, target, bulletController) {
    this.enemyX = 0;
    this.enemyY = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.target = target;
    this.theta = radians(angle);
    this.earth = earth;
    this.bulletController = bulletController;
    this.color = color(240, 248, 255);
    this.health = 20;
    this.diameter = 50;
    this.id = 'enemy';
    this.speed = 0.002;
  }

  update() {
    this.enemyX =
      this.earth.earthX +
      (this.earth.earthDiameter / 2 + 70) * Math.cos(this.theta);
    this.enemyY =
      this.earth.earthY +
      (this.earth.earthDiameter / 2 + 70) * Math.sin(this.theta);
    this.shoot();
    this.theta += this.speed;
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
    const targetDiameter = this.diameter - this.diameter / 1.5; // Calculate the target diameter

    // Interpolate between current diameter and target diameter
    this.diameter = lerp(this.diameter, targetDiameter, 0.2);

    // Decrease health
    this.health -= damage;
  }

  shoot() {
    this.shootPressed = true;
    let speed = 10;
    const damage = 10;
    const delay = 40;

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
