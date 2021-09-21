import * as _ from 'loadash';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let minBallSize: number = 40;
let maxBallSize: number = 120;

console.log("canvas width = " + canvas.width + " canvas height = " + canvas.height);

function randomBall() {

    ctx.beginPath();
    ctx.arc(Math.floor(Math.random()* canvas.width + 1), Math.floor(Math.random()* canvas.height + minBallSize + 1),  Math.floor(Math.random()* maxBallSize + 1), 0, Math.PI * 2, true);
    ctx.stroke();

}

randomBall();