import * as _ from 'loadash';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const button = [];
let minBallSize: number = 80;
let maxBallSize: number = 120;
let color: string;
let player = {
    x : 150,
    y : 150,
    speed : 4,
};
const pallete: string[] = ["#9c88ff", "#0097e6", "#353b48", "#1B1464", "#ED4C67", "#FFC312"];
const playerImg = new Image;
playerImg.src = "images/circle.png";

console.log("canvas width = " + canvas.width + " canvas height = " + canvas.height);

function ballColor() {
    color = pallete[Math.floor(Math.random() * pallete.length)];
    console.log(color);
}

function randomBall() {

    ballColor()
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fill();

}

function playerBallArc() {
    ctx.beginPath();
    player = ctx.arc(0 + Math.floor(Math.random()* maxBallSize + minBallSize) ,0 + Math.floor(Math.random()* maxBallSize + minBallSize) ,  Math.floor(Math.random()* maxBallSize + minBallSize), 0, Math.PI * 2, true);
    ctx.fillStyle = "pink";
    ctx.fill();
}

function playerBallImg() {
    ctx.drawImage(playerImg, player.x, player.y);
}

playerBallImg();
//randomBall();

setInterval(function() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    playerBallImg();

    if (button["w"]) player.y-= player.speed;
    if (button["a"]) player.x-= player.speed;
    if (button["s"]) player.y+= player.speed;
    if (button["d"]) player.x+= player.speed;

}, 1000/60);

window.addEventListener("keydown", function(e){
    button[e.key] = 1;
})

window.addEventListener("keyup", function(e){
    delete button[e.key];
})

console.log(player);