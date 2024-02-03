import Config from "./utils";

const c = new Config();

export default class Enemy {

    constructor(angle, earth) {
        this.enemyX = 0;
        this.enemyY = 0;
        this.angle = angle;
        this.theta = 0;
        this.earth = earth;
    }

    update() {
        this.theta = radians(this.angle);
        this.enemyX = this.earth.EarthComponentX + (this.earth.earthDiameter / 2) * Math.cos(this.theta);
        this.enemyY = this.earth.EarthComponentY + (this.earth.earthDiameter / 2) * Math.sin(this.theta);    
    }
    
    draw() {
        fill(240, 248, 255);
        push();
        translate(this.enemyX, this.enemyY);
        rotate(this.theta);
        rect(0, 0, 30, 40);
        pop();
    }

}
