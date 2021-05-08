const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const gridSize = 40;
let quadrant = 0;


const appleLocation = {
    x: 360,
    y: 320
}

const snakeHead = {
    x: 160,
    y: 120,
    speed: 1.75,
    dx: 1.75,
    dy: 0,
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: true,
}

function drawApple() {
    const apple = document.getElementById("apple");
       apple.style.display = 'show'; 
    ctx.drawImage(apple, appleLocation.x, appleLocation.y);
}

function drawSnakeHead() {
    const snake = document.getElementById("snake-head");
    snake.style.display = 'show'; 
    ctx.drawImage(snake, snakeHead.x, snakeHead.y);
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
    
    document.addEventListener('keyup', (e) => { 
        if(e.key === ' ' || e.key === 'Space'){
        playGame();
        } 
    });

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
    const boardWidth = Math.floor(Math.random() * 15);
    const boardHeight = Math.floor(Math.random() * 13);
    appleLocation.x = boardWidth * gridSize;
    appleLocation.y = boardHeight * gridSize;
}

// setInterval(moveApple, 10000);



function moveSnakeHead (){
        if(snakeHead.moveUp){
            snakeHead.y -= snakeHead.dy; 
        } else if(snakeHead.moveDown){
            snakeHead.y += snakeHead.dy;
        } else if(snakeHead.moveLeft){
            snakeHead.x -= snakeHead.dx;
        } else if(snakeHead.moveRight){
            snakeHead.x += snakeHead.dx; 
        }
        detectWalls(); 
}

function detectWalls(){
    if(snakeHead.x < 0 || snakeHead.x + gridSize > canvas.width){
        snakeHead.dx = 0;
    }

    if(snakeHead.y < 0 || snakeHead.y + gridSize > canvas.height){
        snakeHead.dy = 0;
    }
}

// debugger;

function checkTurningPoints(X){
    const lowValue = 0;
    const highValue = gridSize;
    quadrant = Math.ceil(X/ gridSize); 
 
    let turnLocation = ((quadrant * gridSize) - X);
 
    if(turnLocation > lowValue && turnLocation < highValue){ 
            return true;
        }   
}


function verticalControl(){
        if (checkTurningPoints(snakeHead.x)){
            snakeHead.dx = 0;
            snakeHead.dy = +snakeHead.speed;
            snakeHead.x = quadrant * gridSize; 
            snakeHead.moveLeft = false;
            snakeHead.moveRight = false; 
        } 
}    
    
function horizontalControl(){
        if(checkTurningPoints(snakeHead.y)){
            snakeHead.dy = 0;
            snakeHead.dx = +snakeHead.speed;
            snakeHead.y = quadrant * gridSize; 
            snakeHead.moveUp = false;
            snakeHead.moveDown = false;
        }
}


function arrowKeys(e){
    if (e.key === 'ArrowUp'){
            if(!snakeHead.moveDown){
                snakeHead.moveUp = true;
                snakeHead.dx = 0;
                console.log('im here');
                verticalControl();
            }
    } else if (e.key === 'ArrowDown'){
            if(!snakeHead.moveUp){
                snakeHead.moveDown = true;
                verticalControl();
            }
    } else if (e.key === 'ArrowLeft'){
            if(!snakeHead.moveRight){        
                snakeHead.moveLeft = true;
                horizontalControl();
            }
    } else if (e.key === 'ArrowRight'){
                
            if(!snakeHead.moveLeft){
                snakeHead.moveRight = true;
                horizontalControl();
            }
    }
}


function clearAll(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function playGame(){
    clearAll();

    drawGameBoard();
    // drawApple();
    drawSnakeHead();
    moveSnakeHead(); 
    requestAnimationFrame(playGame); 
}

document.addEventListener('keydown', arrowKeys);

 
window.onload = () => {
    // createLocalStorage();
    drawGameBoard();
    startScreen();
  }

