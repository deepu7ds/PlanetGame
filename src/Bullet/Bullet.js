
export default class Bullet {
    constructor(bulletX, bulletY, damage, speed, theta, id) {
        this.bulletX = bulletX;
        this.bulletY = bulletY;
        this.damage = damage;
        this.speed = speed;
        this.theta = theta;
        this.id = id;

        this.width = 15;
        this.height = 2;
    }

    draw() {
        this.update();
        fill(240, 1, 255)
        push();
        translate(this.bulletX, this.bulletY)
        rotate(this.theta)
        rect(0, 0, this.width, this.height)
        pop();
    }

    update() {
        // Calculate the new position of bullet
        if (this.id == 1) {
            this.bulletY += this.speed * -sin(this.theta);
            this.bulletX += this.speed * -cos(this.theta);
        } else {
            this.bulletY += this.speed * sin(this.theta);
            this.bulletX += this.speed * cos(this.theta);
        }
    }

    collideWith(sprite) {
        if (this.id === 1) {
            let distanceToEarth = dist(this.bulletX, this.bulletY, sprite.enemyX, sprite.enemyY);
        
            if(distanceToEarth <= sprite.diameter/2+10){
                sprite.damage(this.damage);
                return true;
            }
            return false;
        } 
        if(this.id == 0){
            let distancePlayer = dist(this.bulletX, this.bulletY, sprite.playerX, sprite.playerY)

            if(distancePlayer <= 30){
                sprite.damage(this.damage);
                return true;
            }
            return false;
        }
    };
}

