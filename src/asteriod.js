export class Asteriods{
    constructor(radius){
        this.radius = radius
        this.pos= createVector(200, 200)
        this.vel = createVector(10,10)
    }

    render(){
        
        fill(240, 1, 255)
        circle(this.pos.x, this.pos.y, this.radius)
        console.log(this.pos.x)
    }

    update(){
        this.pos.add(this.vel)
    }
}