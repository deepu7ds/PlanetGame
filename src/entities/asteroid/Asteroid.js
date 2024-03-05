import Config from '../../constants/utils';
const c = new Config();

export default class Asteroid {
  constructor(x, y, damage, asteroidSprite) {
    this.pos = { x: x, y: y };
    this.vel = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    this.acc = { x: 0, y: 0 };
    this.diameter = Math.random() * 40 + 20; // Random size between 40 and 90
    this.damage = damage;
    this.health = 10;
    this.id = 'asteroid';
    this.asteroidSprite = asteroidSprite;
  }

  update() {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // Wrap around edges
    if (this.pos.x > c.canvasWidth * 1.5 + this.diameter) {
      this.pos.x = -this.diameter;
    } else if (this.pos.x < -this.diameter) {
      this.pos.x = c.canvasWidth * 1.5 + this.diameter;
    }
    if (this.pos.y > c.canvasHeight * 1.5 + this.diameter) {
      this.pos.y = -this.diameter;
    } else if (this.pos.y < -this.diameter) {
      this.pos.y = c.canvasHeight + this.diameter;
    }
  }
  display() {
    push();
    imageMode(CENTER);
    image(
      this.asteroidSprite,
      this.pos.x,
      this.pos.y,
      this.diameter,
      this.diameter
    );
    pop();
  }

  damageTaken(damage) {
    this.health -= damage;
  }

  collidesWith(sprite) {
    if (sprite.id === 'player') {
      let distance = dist(
        this.pos.x,
        this.pos.y,
        sprite.playerX,
        sprite.playerY
      );
      if (distance <= sprite.diameter / 2 + this.diameter / 2) {
        sprite.damage(this.damage);
        return true;
      }
      return false;
    } else if (sprite.id === 'earth') {
      let distance = dist(this.pos.x, this.pos.y, sprite.earthX, sprite.earthY);
      if (distance <= sprite.earthDiameter / 2 + this.diameter / 2) {
        //earth diameter change it
        sprite.damage(this.damage);
        return true;
      }
      return false;
    } else if (sprite.id === 'enemy') {
      let distance = dist(this.pos.x, this.pos.y, sprite.enemyX, sprite.enemyY);
      if (distance <= sprite.diameter / 2 + this.diameter / 2) {
        //earth diameter change it
        sprite.damage(this.damage);
        return true;
      }
      return false;
    }
  }
}
