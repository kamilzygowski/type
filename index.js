"use strict";
exports.__esModule = true;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var button = [];
var minBallSize = 80;
var maxBallSize = 120;
var color;
var player = {
    x: 150,
    y: 150,
    speed: 4
};
var pallete = ["#9c88ff", "#0097e6", "#353b48", "#1B1464", "#ED4C67", "#FFC312"];
var playerImg = new Image;
playerImg.src = "images/circle.png";
console.log("canvas width = " + canvas.width + " canvas height = " + canvas.height);
function ballColor() {
    color = pallete[Math.floor(Math.random() * pallete.length)];
    console.log(color);
}
function randomBall() {
    ballColor();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fill();
}
function playerBallArc() {
    ctx.beginPath();
    player = ctx.arc(0 + Math.floor(Math.random() * maxBallSize + minBallSize), 0 + Math.floor(Math.random() * maxBallSize + minBallSize), Math.floor(Math.random() * maxBallSize + minBallSize), 0, Math.PI * 2, true);
    ctx.fillStyle = "pink";
    ctx.fill();
}
function playerBallImg() {
    ctx.drawImage(playerImg, player.x, player.y);
}
playerBallImg();
//randomBall();
setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerBallImg();
    if (button["w"])
        player.y -= player.speed;
    if (button["a"])
        player.x -= player.speed;
    if (button["s"])
        player.y += player.speed;
    if (button["d"])
        player.x += player.speed;
}, 1000 / 60);
window.addEventListener("keydown", function (e) {
    button[e.key] = 1;
});
window.addEventListener("keyup", function (e) {
    delete button[e.key];
});
console.log(player);
