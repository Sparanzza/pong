import { Paddle } from './Paddle';
import { Ball } from './Ball';

export class Game {
    private paddle1: Paddle;
    private paddle2: Paddle;
    private ball: Ball;
    private ctx: CanvasRenderingContext2D;
    private lastUpdate: number;

    keys = {
        up: false,
        down: false
    }

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.paddle1 = new Paddle(30, 0, 20, 100, this.ctx); // Example initial values
        this.paddle2 = new Paddle(this.ctx.canvas.width-50, 100, 20, 100, this.ctx); // Example initial values
        this.ball = new Ball(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, 10, this.ctx, [this.paddle1, this.paddle2]);

        this.handleInput()
        this.lastUpdate = performance.now(); // Initialize lastUpdate

    }

    handleInput() {
        window.addEventListener("keydown", (event) => {
            if (event.key == "ArrowUp") {
                this.keys.up = true;
            } else if (event.key == "ArrowDown") {
                this.keys.down = true;
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.key == "ArrowUp") {
                this.keys.up = false;
            } else if (event.key == "ArrowDown") {
                this.keys.down = false;
            }
        });
    }

    public start() {
        this.draw();
        this.gameLoop();
    }

    private draw() {
        // Clear canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw game objects
        this.paddle1.draw();
        this.paddle2.draw();
        this.ball.draw();

    }

private update() {
    // User controlled paddle
    this.paddle1.update(this.keys);

    // Predictive AI paddle
    let ballPredictedY = this.paddle2.position.y;

    // If the ball is moving towards the AI paddle
    if (this.ball.dx > 0) {
        // Predict where the ball will be when it reaches the paddle
        let framesUntilImpact = (this.paddle2.position.x - this.ball.position.x) / this.ball.dx;
        ballPredictedY = this.ball.position.y + this.ball.dy * framesUntilImpact;
        
        // Limit the prediction to the screen bounds
        ballPredictedY = Math.max(Math.min(ballPredictedY, this.ctx.canvas.height), 0);
    }

    // Move the paddle towards the predicted position
    this.paddle2.update({ up: this.paddle2.position.y > ballPredictedY, down: this.paddle2.position.y < ballPredictedY });

    // Update ball
    this.ball.update();
}



    private gameLoop() {
        // Update the game state
        this.update();

        // Draw the updated state to the screen
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}