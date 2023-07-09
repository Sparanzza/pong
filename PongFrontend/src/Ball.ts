import { Paddle } from "./Paddle";

export class Ball {

    position: {x: number, y: number};
    public dx: number;
    public dy: number;
    paddles: Paddle[];

    constructor(private x: number, private y: number, private radius: number, private ctx: CanvasRenderingContext2D,  paddles : Paddle[]) {
                this.position = { x: x, y: y };
                this.dx = Math.random() < 0.5 ? -5 : 5; // start moving in a random direction
                this.dy = -5; // start moving upwards
                this.paddles = paddles;
     }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'gray';
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fill();
    }


    update(){
        this.handleWallCollision()
        this.handlePaddleCollision()    
    }
    handleWallCollision() {
        // Move the ball
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off the walls
        if (this.x + this.radius > this.ctx.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx; // reverse direction
        }

        if (this.y + this.radius > this.ctx.canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy; // reverse direction
        }

    }

    handlePaddleCollision() {
        this.paddles.forEach(paddle => {
            if (this.x - this.radius < paddle.position.x + paddle.width &&
                this.x + this.radius > paddle.position.x &&
                this.y - this.radius < paddle.position.y + paddle.height &&
                this.y + this.radius > paddle.position.y) {
                this.dx = -this.dx; // reverse direction
            }
        });
    }
}
