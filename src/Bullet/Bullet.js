
export default class Bullet {
    constructor(bulletX, bulletY, damage, speed, theta, id, enemyBulletSprite, playerBulletSprite) {
        this.bulletX = bulletX;
        this.bulletY = bulletY;
        this.damage = damage;
        this.speed = speed;
        this.theta = theta;
        this.id = id;
        this.enemyBulletSprite = enemyBulletSprite;
        this.playerBulletSprite = playerBulletSprite;
        this.diameter = 14;
    }

    draw() {
        this.update();
         if(this.id === 'player'){
            push();
            translate(this.bulletX, this.bulletY)
            rotate(this.theta)
            imageMode(CENTER);
            image(this.playerBulletSprite, 0, 0, this.diameter*2, this.diameter*2);
            pop();
        } else if(this.id === 'enemy'){
            push();
            translate(this.bulletX, this.bulletY)
            rotate(this.theta)
            imageMode(CENTER);
            image(this.enemyBulletSprite, 0, 0, this.diameter + 10, this.diameter);
            pop();
        }
    }

    update() {
        // Calculate the new position of bullet
        if (this.id === 'player') {
            this.bulletY += this.speed * -sin(this.theta);
            this.bulletX += this.speed * -cos(this.theta);
        } else if (this.id === 'enemy') {
            this.bulletY += this.speed * sin(this.theta);
            this.bulletX += this.speed * cos(this.theta);
        }
    }

    collideWith(sprite) {

        if (sprite.id === 'asteroid') {
            let distanceAsteroid = dist(this.bulletX, this.bulletY, sprite.pos.x, sprite.pos.y);
            if (distanceAsteroid <= sprite.diameter) {
                sprite.damageTaken(this.damage);
                return true;
            }
            return false;
        }
        else if (this.id === 'player') {
            let distanceToEnemy = dist(this.bulletX, this.bulletY, sprite.enemyX, sprite.enemyY);
            if (distanceToEnemy <= sprite.diameter / 2 + 10) {
                sprite.damage(this.damage);
                return true;
            }
            return false;
        }
        else if (this.id === 'enemy') {
            let distancePlayer = dist(this.bulletX, this.bulletY, sprite.playerX, sprite.playerY)

            if (distancePlayer <= 30) {
                sprite.damage(this.damage);
                return true;
            }
            return false;
        }
    };
}

