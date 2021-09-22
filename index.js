"use strict";
exports.__esModule = true;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var button = [];
var bullet = {};
var flyingBullet = [];
var i = -1;
var bulletBool;
var minBallSize = 80;
var maxBallSize = 120;
var color;
var player = {
    x: 150,
    y: 150,
    width: 155,
    height: 155,
    speed: 8
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
function spawnBullet() {
    var shot = {
        x: player.x,
        y: player.y
    };
    ctx.fillStyle = "red";
    var x = flyingBullet[i];
    ctx.drawImage(playerImg, x, bullet.y, 30, 30);
    bulletBool = true;
}
function adder(number) {
    number++;
}
function playerBallImg() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}
playerBallImg();
//randomBall();
setInterval(function () {
    ctx.fillStyle = "#1B1464";
    //ctx.clearRect(0,0,canvas.width, canvas.height); // Background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    playerBallImg(); // Spawn Player
    //console.log(player.x, player.y);
    if (button["w"] && player.y >= 0)
        player.y -= player.speed;
    if (button["a"] && player.x >= 0)
        player.x -= player.speed;
    if (button["s"] && player.y <= canvas.height - player.height)
        player.y += player.speed;
    if (button["d"] && player.x <= canvas.width - player.width)
        player.x += player.speed;
    /* making shooting animation in rendering */
    if (bulletBool == true) {
        spawnBullet();
        ctx.fillStyle = "red";
        flyingBullet[i] += 50;
    }
}, 1000 / 60);
window.addEventListener("keydown", function (e) {
    button[e.key] = 1;
    if (e.code === 'Space') {
        spawnBullet();
        bulletBool;
        bullet.x = player.x;
        bullet.y = player.y;
        i++;
        flyingBullet.splice(i, 0, player.x);
        console.log(flyingBullet[i]);
    }
});
window.addEventListener("keyup", function (e) {
    delete button[e.key];
});
console.log(canvas.x);
