export class Paddle {
    speed: number;
    position: {x: number, y: number};

    constructor(x: number, y: number, public width: number, public height: number, private ctx: CanvasRenderingContext2D) {
        this.position = { x: x, y: y };
        this.speed = 15; // You can set any value here for the speed
        this.width = width;
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'gray';
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.fill();
    }

    update(keys: { up: any; down: any; }) {
        if (keys.up) {
            this.position.y -= this.speed;
        }

        if (keys.down) {
            this.position.y += this.speed;
        }

        // Prevent the paddle from going off screen
        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.height > this.ctx.canvas.height) {
            this.position.y = this.ctx.canvas.height - this.height;
        }
    }
}
