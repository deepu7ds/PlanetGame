import Config from "../utils";
const c = new Config();

export default class Asteroid {
  constructor(x, y, damage) {
    this.pos = { x: x, y: y };
    this.vel = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    this.acc = { x: 0, y: 0 };
    this.diameter = Math.random() * 30 + 20; // Random size between 20 and 50
    this.damage = damage
    this.health = 10;
    this.id = 'asteroid';
  }
  
  update() {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // Wrap around edges
    if (this.pos.x > c.canvasWidth + this.diameter) {
      this.pos.x = -this.diameter;
    } else if (this.pos.x < -this.diameter) {
      this.pos.x = c.canvasWidth + this.diameter;
    }
    if (this.pos.y > c.canvasHeight + this.diameter) {
      this.pos.y = -this.diameter;
    } else if (this.pos.y < -this.diameter) {
      this.pos.y = c.canvasHeight + this.diameter;
    }
  }
  display() {
    push();
    fill(255,255,255);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    pop();
  }

  damageTaken(damage) {
    this.health -= damage;
  }

  collidesWith(sprite) {
    
    if(sprite.id === 'player'){
      let distance = dist(this.pos.x, this.pos.y, sprite.playerX, sprite.playerY )
      if(distance <= sprite.diameter){
        sprite.damage(this.damage);
        return true;
      }
      return false;
    }else if(sprite.id === 'earth'){
      let distance = dist(this.pos.x, this.pos.y, sprite.earthX, sprite.earthY )
      if(distance <= 160){ //earth diameter change it 
        sprite.damage(this.damage);
        return true;
      }
      return false;
    }
    else if(sprite.id === 'enemy'){
      let distance = dist(this.pos.x, this.pos.y, sprite.enemyX, sprite.enemyY )
      if(distance <= sprite.diameter){ //earth diameter change it 
        sprite.damage(this.damage);
        return true;
      }
      return false;
    }
  }
}
