export class ScoreBoard {
    private player1Score: number;
    private player2Score: number;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.player1Score = 0;
        this.player2Score = 0;
    }

    update(player1Score: number, player2Score: number) {
        this.player1Score = player1Score;
        this.player2Score = player2Score;
    }

    draw() {
        this.ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
        this.ctx.font = "80px Arial";
        this.ctx.fillText(`${this.player1Score} - ${this.player2Score}`, this.ctx.canvas.width / 2, 80);
        console.log(this.player1Score, this.player2Score);
    }
}
