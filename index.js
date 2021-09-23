"use strict";
exports.__esModule = true;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var button = [];
var flyingBullet = [];
var scrollingSpeed = 0; // It is ALWAYS added to an object that is not moving with background
var counter = 0;
var color;
var gameState = false;
var gameInterval;
var player = {
    x: 75,
    y: 445,
    width: 128,
    height: 128,
    speed: 8,
    thisFrame: 0,
    frameTime: 0
};
var floatingEnemy = [{
        x: 1222,
        y: 555,
        width: 128,
        height: 128
    },
    {
        x: 1666,
        y: 366,
        width: 128,
        height: 128
    },
    {
        x: 855,
        y: 129,
        width: 128,
        height: 128
    },
    {
        x: 2050,
        y: 566,
        width: 128,
        height: 128
    },
    {
        x: 2311,
        y: 799,
        width: 128,
        height: 128
    },
    {
        x: 522,
        y: 611,
        width: 128,
        height: 128
    },
    {
        x: 2811,
        y: 419,
        width: 128,
        height: 128
    },
];
var pallete = ["#9c88ff", "#0097e6", "#353b48", "#1B1464", "#ED4C67", "#FFC312"];
/*  IMAGES  */
var playerImg = new Image;
playerImg.src = "images/playerAnim128.png";
var bulletImg = new Image;
bulletImg.src = "images/bullet.png";
var backgroundImg = new Image;
backgroundImg.src = "images/TileCosmos.png";
var floatingEnemyImg = new Image;
floatingEnemyImg.src = "images/enemy.png";
var bombImg = new Image;
bombImg.src = "images/bomb.png";
/* SELECTORS */
var playButton = document.querySelector('#playBtn');
var menuDiv = document.querySelector('.menu');
var pauseDiv = document.querySelector('#pauseScreen');
var mainMenuButton = document.querySelector('.mainMenuButton');
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
function floatingEnemyLogic() {
    var enemiesNr = floatingEnemy.length;
    for (var i = 0; i < enemiesNr; i++) {
        floatingEnemy[i].x += Math.floor(Math.random() * 14 + 1);
        floatingEnemy[i].y += Math.floor(Math.random() * 14 + 1);
        floatingEnemy[i].x -= Math.floor(Math.random() * 14 + 1);
        floatingEnemy[i].y -= Math.floor(Math.random() * 14 + 1);
    }
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
/* Main Functions init BELOW */
// Clicking button PLAY  in menu
playButton.addEventListener('click', function () {
    menuDiv.classList.add('hide');
    gameState = true;
    Game();
    console.log('gamestate = true');
});
//randomBall();
function Game() {
    if (gameState == true) {
        clearInterval(gameInterval);
        gameInterval = setInterval(function () {
            ctx.fillStyle = "#1B1464";
            //ctx.clearRect(0,0,canvas.width, canvas.height);                                
            //ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(backgroundImg, scrollingSpeed, 0, 3840, canvas.height); // Background        
            ctx.drawImage(backgroundImg, scrollingSpeed + 3840, 0, 3840, canvas.height); // Second Background 
            ctx.drawImage(backgroundImg, scrollingSpeed + 3840 * 2, 0, 3840, canvas.height); //Third Backgorund
            ctx.drawImage(backgroundImg, scrollingSpeed + 3840 * 3, 0, 3840, canvas.height); //Fourth Background
            scrollingSpeed -= 2; // Speed of scrolling the background
            drawPlayer(); // Spawn Player
            //playerHitbox();
            // Drawing floating blue enemy
            for (var x = 0; x < floatingEnemy.length; x++) {
                ctx.drawImage(floatingEnemyImg, floatingEnemy[x].x + scrollingSpeed, floatingEnemy[x].y, floatingEnemy[x].width, floatingEnemy[x].height);
            }
            floatingEnemyLogic(); // Apply a logic to the enemy
            ctx.drawImage(bombImg, 755 + scrollingSpeed, 466, 64, 64); // drawing random bomb
            if ((button["w"] || button["W"]) && player.y >= 0)
                player.y -= player.speed;
            if ((button["a"] || button["A"]) && player.x >= 0)
                player.x -= player.speed;
            if ((button["s"] || button["S"]) && player.y <= canvas.height - player.height)
                player.y += player.speed;
            if ((button["d"] || button["D"]) && player.x <= canvas.width - player.width)
                player.x += player.speed;
            if (button["Escape"]) { // On ESCAPE click go back to menu
                clearInterval(gameInterval);
                pauseDiv.classList.remove('hide');
                /*menuDiv.classList.remove('hide');
                gameState = false;*/
            }
            for (var e = 0; e < flyingBullet.length; e++) {
                ctx.fillStyle = "red";
                var bullets = flyingBullet[e];
                ctx.drawImage(bulletImg, bullets.x - bullets.width / 2, bullets.y - bullets.height / 2, bullets.width, bullets.height);
                bullets.x += 35;
            }
        }, 1000 / 60);
    }
}
// Overwrite a char + add creating bullet on Space press
window.addEventListener("keydown", function (e) {
    button[e.key] = 1;
    if (e.code === 'Space') {
        flyingBullet.push({
            width: 16,
            height: 10,
            x: player.x + player.width / 2 + 50,
            y: player.y + player.height / 2
        });
    }
    // If ENTER is pressed when the game is paused, unpause it
    if (e.code == 'Enter') {
        pauseDiv.classList.add('hide');
        gameState = true;
        Game();
    }
});
// Creating bullet on clicking in window
window.addEventListener("click", function (e) {
    flyingBullet.push({
        width: 16,
        height: 10,
        x: player.x + player.width / 2 + 50,
        y: player.y + player.height / 2
    });
});
window.addEventListener("keyup", function (e) {
    delete button[e.key];
});
// When paused, on press main menu display menu and turn the game from hte start
mainMenuButton.addEventListener('click', function () {
    /*clearInterval(gameInterval);
    pauseDiv.classList.add('hide');
    menuDiv.classList.remove('hide');*/
    window.location.reload(); // Reload the page after clicking on mainButton, it's a little hack >:)
});
console.log(canvas.x);
