"use strict";
exports.__esModule = true;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var button = [];
var flyingBullet = [];
var i = 0;
var color;
var player = {
    x: 150,
    y: 150,
    width: 128,
    height: 128,
    speed: 8,
    thisFrame: 0,
    frameTime: 0
};
var pallete = ["#9c88ff", "#0097e6", "#353b48", "#1B1464", "#ED4C67", "#FFC312"];
var playerImg = new Image;
playerImg.src = "images/playerAnim128.png";
var bulletImg = new Image;
bulletImg.src = "images/bullet.png";
var backgroundImg = new Image;
backgroundImg.src = "images/TileCosmos.png";
ctx.canvas.width = window.innerWidth * 4; // HERE is *2 because background is 3840px width, not 1920px
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
function drawPlayer() {
    player.frameTime += 0.9;
    player.frameTime = player.frameTime % 20;
    player.thisFrame = Math.round(player.frameTime / 10);
    ctx.drawImage(playerImg, player.width * player.thisFrame, 0, player.width, player.height, player.x, player.y, player.width, player.height);
}
drawPlayer();
//randomBall();
setInterval(function () {
    ctx.fillStyle = "#1B1464";
    //ctx.clearRect(0,0,canvas.width, canvas.height);                                
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, i, 0, 3840, canvas.height); // Background        
    ctx.drawImage(backgroundImg, i + 3840, 0, 3840, canvas.height); // Second Background 
    ctx.drawImage(backgroundImg, i + 3840 * 2, 0, 3840, canvas.height); //Third Backgorund
    ctx.drawImage(backgroundImg, i + 3840 * 3, 0, 3840, canvas.height); //Fourth Background
    i -= 2; // Speed of scrolling the background
    drawPlayer(); // Spawn Player
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
            x: player.x + player.width / 2 + 50,
            y: player.y + player.height / 2
        });
        console.log('xD');
    }
});
window.addEventListener("click", function (e) {
    flyingBullet.push({
        width: 16,
        height: 10,
        x: player.x + player.width / 2 + 50,
        y: player.y + player.height / 2
    });
    console.log('xD');
});
window.addEventListener("keyup", function (e) {
    delete button[e.key];
});
console.log(canvas.x);
