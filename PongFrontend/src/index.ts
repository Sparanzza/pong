import { Game } from './Game';
console.log("Hi!")
const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// Set the canvas to cover the full viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
})

if (!ctx) {
    throw new Error('Failed to get 2D context');
}
const game = new Game(ctx);

// Start the game loop
game.start();
