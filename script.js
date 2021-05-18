const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const highScore = JSON.parse(localStorage.getItem('highScore'));

const gridSize = 40;
let gameScore = 0;
let localHighScore = 0;
let gameOver = false;

const appleLocation = {
    x: 360,
    y: 320
}

const snake = {
    body: [
        {x: 160, y: 120},
        {x: 160, y: 80},
        {x: 160, y: 40}
    ],
    speed: 40,
    dx: 0,
    dy: 40,
} 

class snakeSegment  {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function drawApple() { 
    const apple = document.getElementById("apple");
    apple.style.display = 'show'; 
    ctx.drawImage(apple, appleLocation.x, appleLocation.y);
}

function drawSnake(){
    const snakeImage = document.getElementById("snake-head");
    const outerSegmentSize = 34;
    const innerSegmentSize = 28;
    snakeImage.style.display = 'show'; 
    ctx.drawImage(snakeImage, snake.body[0].x, snake.body[0].y);
    for (let i=1; i < snake.body.length ; i ++){
            ctx.fillStyle =  '#ffd900';
            ctx.fillRect(snake.body[i].x + 3, snake.body[i].y + 3, outerSegmentSize, outerSegmentSize);
            ctx.fillStyle =  '#469223';
            ctx.fillRect(snake.body[i].x + 6, snake.body[i].y + 6, innerSegmentSize, innerSegmentSize);
    }
}

function startScreen(){
    ctx.fillStyle = 'grey';
    ctx.fillRect(60, 170, 480, 250);
    ctx.fillStyle = '#00ff62';
    ctx.font ='bold 30px Arial';
    ctx.fillText("PRESS SPACEBAR TO START", 80, 250);
    ctx.fillStyle = '047c32';
    ctx.font ='15px Arial';
    ctx.fillText("Use ARROWS to move the snake", 80,350);
    const arrowsPicture = document.getElementById("arrows");
    ctx.drawImage(arrowsPicture, 350, 300);   
 }

function drawGameBoard(){
    for (let i = 0; i < canvas.height / gridSize; i++) {
        for (let j = 0; j < canvas.width / gridSize; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 1) {
                    ctx.fillStyle = 'rgb(2, 44, 2)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(1, 161, 1)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            } else if (i % 2 === 1) {
                if (j % 2 === 0) {
                    ctx.fillStyle = 'rgb(2, 44, 2)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(1, 161, 1)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            }
        }
    }
}

function moveApple(){  
    if((snake.body[0].x === appleLocation.x && snake.body[0].y === appleLocation.y)){
        getRadomNumbers();
        for(i=0; i<snake.body.length; i++){
                while (snake.body[i].x === appleLocation.x && snake.body[i].y === appleLocation.y){
                    getRadomNumbers();
                } 
        }
        gameScore ++; 
        growSnake();
    }   

   
}

function getRadomNumbers(){
    appleLocation.x = Math.floor(Math.random() * 15) * gridSize;
    appleLocation.y = Math.floor(Math.random() * 13) * gridSize;
}

function score(){
    document.querySelector('#gameScore').textContent = gameScore;
}

function moveSnake(){
    const snakeHead = snake.body.pop();
    snakeHead.x = snake.body[0].x + snake.dx;
    snakeHead.y = snake.body[0].y + snake.dy;
    snake.body.unshift(snakeHead);
    moveApple();
    detectWalls(); 
    checkBodyContact();
    score();
}

function growSnake(){
    const newSegment = new snakeSegment(snake.body[1].x, snake.body[1].y, gridSize);
    return snake.body.push(newSegment);  
 }

function checkBodyContact(){
    for(i=1; i<snake.body.length; i++){
            if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y){
                gameOver = true;
                resetGame();
            }
    }
}
 
function detectWalls(){
    if(snake.body[0].x < 0 || snake.body[0].x + gridSize > canvas.width){
        snake.dx = 0;
    }
    if(snake.body[0].y < 0 || snake.body[0].y + gridSize > canvas.height){
        snake.dy = 0;
    }
    if(snake.dx === 0 && snake.dy === 0){
        gameOver = true;
    }
}

function resetGame(){
    gameScore = 0;
    appleLocation.x = 360;
    appleLocation.y = 320;
    snake.body[0].x = 160;
    snake.body[0].y = 120;
    snake.body[1].x = 160;
    snake.body[1].y = 80;
    snake.body[2].x = 160;
    snake.body[2].y = 40;
    snake.dy = 40;
    snake.dx = 0;
    snake.body.length = 3;
}

function playAgainScreen(){
    ctx.fillStyle = 'grey';
    ctx.fillRect(60, 170, 480, 250); 
    ctx.fillStyle = 'maroon';  
    ctx.font ='bold 30px Arial';
    ctx.fillText("PLAY SOME MORE?", 150, 250);
    ctx.fillStyle = 'aqua';
    ctx.font ='25px Arial';
    ctx.fillText("< --- When ready, press SPACEBAR --- >", 70,350);
}

function arrowKeysAction(e){
    switch(e.key){
        case 'ArrowUp':
            if(snake.dx != 0){
                snake.dx = 0;
                snake.dy = -snake.speed;
            }
            break;
        case 'ArrowDown':
            if(snake.dx != 0){
                snake.dx = 0;
                snake.dy = +snake.speed;
            }
            break;
        case 'ArrowLeft':
            if(snake.dy != 0){
                snake.dy = 0;
                snake.dx = -snake.speed;
            }
            break;
        case 'ArrowRight':
            if(snake.dy != 0){
                snake.dy = 0;
                snake.dx = +snake.speed;
          
            }
            break;
    }            
}

function createLocalStorage() {
    if (highScore === null) {
        localStorage.setItem('localHighScore', JSON.stringify(localHighScore));
    }
}

function clearAll(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkGameOver(){
    if(gameOver){
        if(gameScore > localHighScore){
            localHighScore = gameScore;
            document.querySelector('#highScore').textContent = localHighScore;
            localStorage.setItem('localHighScore', JSON.stringify(localHighScore));
        }
    localStorage.setItem('localHighScore', JSON.stringify(localHighScore)) 
    }
}

function playGame(){
    if(gameOver){
        resetGame();
        playAgainScreen();
        return;
    }
    setTimeout(() =>{
        clearAll();
        drawGameBoard(); 
        drawApple(); 
        drawSnake();  
        moveSnake(); 
        checkGameOver();
        requestAnimationFrame(playGame); 
    },200)
}

document.addEventListener('keydown', arrowKeysAction);
 
window.onload = () => {
    createLocalStorage();
    drawGameBoard();
    startScreen();
    document.addEventListener('keyup', (e) => { 
        if(e.key === ' ' || e.key === 'Space'){
        gameOver = false;
        playGame();
        } 
    });
}
