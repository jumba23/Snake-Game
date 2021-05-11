const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const gridSize = 40;
const outerSegmentSize = 34;
const innerSegmentSize = 28; 
let quadrant = 0;
let gameScore = 0;
let gameOver = false;
let snakeBody = [];

const appleLocation = {
    x: 360,
    y: 320
}

const snakeHead = {
    x: 160,
    y: 120,
    speed: 2,
    dx: 0,
    dy: 2,
}

class SnakeSegment {
    constructor(x, y){
            this.x = x;
            this.y = y;
    }

    createInitialBody(x,y){
        if(!snakeBody.length){
            for (let i=1; i<4; i++){
                this.x = x; 
                this.y -= gridSize;
                snakeBody.push(this.x,this.y);
            }    
        }
    }
    // addSegment(){

    // }    
}

let initialBody = new SnakeSegment(snakeHead.x, snakeHead.y, snakeHead.dx, snakeHead.dy);

initialBody.createInitialBody(snakeHead.x, snakeHead.y);
console.log(snakeBody);


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

function drawSnakeSegment(){
// console.log(snakeBody[5]);

    ctx.fillStyle =  '#ffd900';
    ctx.fillRect(snakeBody[4] + 3, snakeBody[5] + 3, outerSegmentSize, outerSegmentSize);
    // console.log(snakeBody[4] - 3, snakeBody[5] - 83, outerSegmentSize, outerSegmentSize);
    ctx.fillStyle =  '#469223';
    ctx.fillRect(snakeBody[4] + 6, snakeBody[5] + 6, innerSegmentSize, innerSegmentSize);
    ctx.fillStyle =  '#ffd900';
    ctx.fillRect(snakeBody[2] + 3, snakeBody[3] + 3, outerSegmentSize, outerSegmentSize);
    ctx.fillStyle =  '#469223';
    ctx.fillRect(snakeBody[2] + 6, snakeBody[3] + 6, innerSegmentSize, innerSegmentSize);
    ctx.fillStyle =  '#ffd900';
    ctx.fillRect(snakeBody[0] + 3, snakeBody[1] + 3, outerSegmentSize, outerSegmentSize);
    ctx.fillStyle =  '#469223';
    ctx.fillRect(snakeBody[0] + 6, snakeBody[1] + 6, innerSegmentSize, innerSegmentSize);

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
    
    if((snakeHead.x >= appleLocation.x - 10 && appleLocation.x + 10 >= snakeHead.x) && (snakeHead.y >= appleLocation.y - 10 && appleLocation.y + 10 >= snakeHead.y)){

    const boardWidth = Math.floor(Math.random() * 15);
    const boardHeight = Math.floor(Math.random() * 13);

    appleLocation.x = boardWidth * gridSize;
    appleLocation.y = boardHeight * gridSize;
    gameScore ++;  
    score();
    }
}

// setInterval(moveApple, 10000);
 
function score(){
        document.querySelector('#gameScore').textContent = gameScore;
}

function moveSnakeHead (){
        snakeHead.y += snakeHead.dy; 
        snakeHead.x += snakeHead.dx;
        moveSnakeBody();
        moveApple();
        detectWalls(); 
}

function moveSnakeBody(){
    if(snakeHead.dy > 0){
        
        initialBody.createInitialBody(snakeHead.x, snakeHead.y);
    }
    // } else if(snakeHead.dx > 0){
    //     if(snakeSegment.y === snakeHead.y - gridSize){
    //         console.log(snakeSegment.y);
    //         console.log(snakeHead.y);
    //         snakeSegment.dy = 0;  
    //         snakeSegment.dx = snakeHead.dx;
    //         snakeSegment.x = snakeHead.x - gridSize;
    //         console.log('TURN RIGHT');

    //     } else{
    //        do {
    //             snakeSegment.y = snakeHead.y;
    //             snakeSegment.dy = 0;
    //             snakeSegment.dx = snakeHead.dx;
    //             snakeSegment.x = snakeHead.x - gridSize;
    //         } while(snakeSegment.y === snakeSegment.y - gridSize);
    //         console.log('im here');}
 
    // }

}

function detectWalls(){
    if(snakeHead.x < 0 || snakeHead.x + gridSize > canvas.width){
        snakeHead.dx = 0;
    }
    if(snakeHead.y < 0 || snakeHead.y + gridSize > canvas.height){
        snakeHead.dy = 0;
    }
    if(snakeHead.dx === 0 && snakeHead.dy === 0){
        gameOver = true;
    }

}

function resetGame(){
    gameScore = 0;
    appleLocation.x = 360;
    appleLocation.y = 320;
    snakeHead.x = 160;
    snakeHead.y = 120; 
    snakeHead.dy = 2;
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


function arrowKeysAction(e){
    switch(e.key){
        case 'ArrowUp':
            if(snakeHead.dy === 0){
                if (checkTurningPoints(snakeHead.x)){
                    if(snakeHead.dx === -snakeHead.speed){   
                    snakeHead.x = (quadrant - 1) * gridSize; 
                    snakeHead.dx = 0;
                    snakeHead.dy = -snakeHead.speed;
                } else if(snakeHead.dx === +snakeHead.speed){
                    snakeHead.x = quadrant * gridSize;  
                    snakeHead.dx = 0;
                    snakeHead.dy = -snakeHead.speed;
                    }
                }
            }     
            break;
        case 'ArrowDown':
            if(snakeHead.dy === 0){
                if (checkTurningPoints(snakeHead.x)){
                    if(snakeHead.dx === -snakeHead.speed){   
                    snakeHead.x = (quadrant - 1) * gridSize; 
                    snakeHead.dx = 0;
                    snakeHead.dy = +snakeHead.speed;
                } else if(snakeHead.dx === snakeHead.speed){
                    snakeHead.x = quadrant * gridSize; 
                    snakeHead.dx = 0;
                    snakeHead.dy = +snakeHead.speed;
                     }
                }
            }     
            break;
        case 'ArrowLeft':
            if(snakeHead.dx === 0){
                if (checkTurningPoints(snakeHead.y)){
                    if(snakeHead.dy === -snakeHead.speed){
                    snakeHead.y = (quadrant - 1) * gridSize; 
                    snakeHead.dy = 0;
                    snakeHead.dx = -snakeHead.speed;
                } else if(snakeHead.dy === +snakeHead.speed){
                    snakeHead.y = quadrant * gridSize; 
                    snakeHead.dy = 0;
                    snakeHead.dx = -snakeHead.speed;
                    }
                }
            }    
            break;
        case 'ArrowRight':
            if(snakeHead.dx === 0){
                if (checkTurningPoints(snakeHead.y)){
                    if(snakeHead.dy === -snakeHead.speed){
                    snakeHead.y = (quadrant - 1) * gridSize;
                    snakeHead.dy = 0;
                    snakeHead.dx = +snakeHead.speed;
                } else if(snakeHead.dy === +snakeHead.speed){
                    snakeHead.y = quadrant * gridSize; 
                    snakeHead.dy = 0;
                    snakeHead.dx = +snakeHead.speed;
                    }
                }
            }
            break;
    }            
}


function clearAll(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function playGame(){
    if(gameOver){
        resetGame();
        playAgainScreen();
        return;
    }
    clearAll();

    drawGameBoard();
    drawApple();
    drawSnakeHead();
    drawSnakeSegment();
    moveSnakeHead(); 
    requestAnimationFrame(playGame); 
}

document.addEventListener('keydown', arrowKeysAction);

 
window.onload = () => {
    // createLocalStorage();
    drawGameBoard();
    startScreen();
    
    document.addEventListener('keyup', (e) => { 
        if(e.key === ' ' || e.key === 'Space'){
        gameOver = false;
        playGame();
        } 
    });
  }
