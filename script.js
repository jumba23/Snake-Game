const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const gridSize = 40;

const appleLocation = {
    x: 360,
    y: 320
}

const snakeHead = {
    x: 160,
    y: 120,
    speed: 4,
    dx: 40,
    dy: 40

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
    
        snakeHead.y -= snakeHead.dy;
  
        snakeHead.y += snakeHead.dy;
   
        snakeHead.x -= snakeHead.dx;
  
        snakeHead.x += snakeHead.dx;

        // detectWallsBall();
}

function snakeDirection(e){
    if (e.key === 'ArrowUp'){
        snakeHead.dy = -snakeHead.speed;
     } else if (e.key === 'ArrowDown'){ 
        snakeHead.dy = snakeHead.speed;
    } else if (e.key === 'ArrowLeft'){
        snakeHead.dx = snakeHead.speed;
    } else if (e.key === 'ArrowRight'){
        snakeHead.dx = snakeHead.speed;
    }
    // snakeHead.dy = -snakeHead.speed;
}

function moveDown(){
    snakeHead.dy = snakeHead.speed;
}


function clearAll(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function playGame(){
    clearAll();

    drawGameBoard();
    drawApple();
    drawSnakeHead();
    moveSnakeHead (); 
    requestAnimationFrame(playGame); 
}

// document.addEventListener('keyup', moveSnakeHead);
document.addEventListener('keydown', snakeDirection);



window.onload = () => {
    // createLocalStorage();
    drawGameBoard();
    startScreen();

    document.addEventListener('keyup', (e) => { 
        if(e.key === ' ' || e.key === 'Space'){
        playGame();
        } 
    });
}

