const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const gridSize = 40;

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

function clearAll(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function playGame(){
    clearAll();

    drawGameBoard();

    requestAnimationFrame(playGame); 
}


document.querySelector('canvas')

window.onload = () => {
    createLocalStorage();
    drawGameBoard();
    startScreen();
}