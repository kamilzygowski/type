"use strict";
exports.__esModule = true;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var minBallSize = 40;
var maxBallSize = 120;
console.log("canvas width = " + canvas.width + " canvas height = " + canvas.height);
function randomBall() {
    ctx.beginPath();
    ctx.arc(Math.floor(Math.random() * canvas.width + 1), Math.floor(Math.random() * canvas.height + minBallSize + 1), Math.floor(Math.random() * maxBallSize + 1), 0, Math.PI * 2, true);
    ctx.stroke();
}
randomBall();
