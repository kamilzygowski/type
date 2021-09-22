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
    width: 65,
    height: 65,
    speed: 8
};
var pallete = ["#9c88ff", "#0097e6", "#353b48", "#1B1464", "#ED4C67", "#FFC312"];
var playerImg = new Image;
playerImg.src = "images/circle.png";
var bulletImg = new Image;
bulletImg.src = "images/bullet.png";
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight - 20;
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
function playerHitbox() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.width / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = "pink";
    ctx.fill();
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
    //playerHitbox();
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
    /*if (bulletBool == true) {
        spawnBullet();
        ctx.fillStyle = "red";
        flyingBullet[i] += 50;
    }*/
    for (var e = 0; e < flyingBullet.length; e++) {
        ctx.fillStyle = "red";
        var bullets = flyingBullet[e];
        ctx.drawImage(bulletImg, bullets.x - bullets.width / 2, bullets.y - bullets.height / 2, bullets.width, bullets.height);
        bullets.x += 35;
    }
}, 1000 / 60);
window.addEventListener("keydown", function (e) {
    button[e.key] = 1;
    if (e.code === 'Space') {
        flyingBullet.push({
            width: 16,
            height: 10,
            x: player.x + player.width / 2,
            y: player.y + player.height / 2
        });
    }
});
window.addEventListener("keyup", function (e) {
    delete button[e.key];
});
console.log(canvas.x);
