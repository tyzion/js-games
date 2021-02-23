let canvas;
let canvasContext;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddleOneY = 250
var paddleTwoY = 250
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var scorePlayer1 = 0;
var scorePlayer2 = 0;
const winningScore = 10;


function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft
    var mouseY = evt.clientY - rect.top - root.scrollTop
    return {
        x: mouseX,
        y: mouseY
    }
}

window.onload = function() {
    canvas = document.getElementById('canvas')
    canvasContext = canvas.getContext('2d')

    var framesPerSecond = 30
    setInterval(() => {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

    mouseMove()
}

function resetGame() {
        scorePlayer1 = 0
        scorePlayer2 = 0
}

function endGame() {
    if (scorePlayer1 == winningScore) {
        alert('Player 1 won \nDo you want to start again?')
        resetGame()
    } else if (scorePlayer2 == winningScore) {
        alert('Player 2 won \nDo you want to start again?')
        resetGame()
    }
}

function mouseMove() {
    canvas.addEventListener('mousemove', (evt) => {
        var mousePos = calculateMousePos(evt)
        if (mousePos.x < canvas.width / 2) {
            paddleOneY = mousePos.y - (PADDLE_HEIGHT / 2)
        }
        if (mousePos.x > canvas.width / 2) {
            paddleTwoY = mousePos.y - (PADDLE_HEIGHT / 2)
        }
    })
}

function ballReset() {
    ballSpeedX = -ballSpeedX
    ballSpeedY = -ballSpeedY
    ballX = canvas.width / 2
    ballY = canvas.height / 2
}

function deltaSpeed(paddle) {
    var deltaY = ballY - (paddle + PADDLE_HEIGHT/2)
    ballSpeedY = deltaY * 0.35
}

function moveEverything() {
    ballX += ballSpeedX
    ballY += ballSpeedY
    if(ballX > canvas.width) {
        if (ballY > paddleTwoY && ballY < paddleTwoY + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX
                deltaSpeed(paddleTwoY)
                scorePlayer2++
                endGame()
        } else {
            ballReset()
            if (scorePlayer2 > 0) {
                scorePlayer2--
            }
        }
    }
    if(ballX < 0) {
        if (ballY > paddleOneY && ballY < paddleOneY + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX
                deltaSpeed(paddleOneY)
                scorePlayer1++
                endGame()
        } else {
            ballReset()
            if (scorePlayer1 > 0) {
                scorePlayer1--
            }
        }
    }
    if(ballY > canvas.height || ballY < 0) {
        ballSpeedY = -ballSpeedY
    }
}

function drawNet() {
    for (let i = 10; i < canvas.height; i+=40) {
        colorRect(canvas.width / 2 - 1, i, 3, 20, 'white')
    }
}

function drawEverything() {
    
    //black canvas
    colorRect(0, 0, canvas.width, canvas.height, 'black')
    
    drawNet()
    //players paddle
    colorRect(0, paddleOneY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    colorRect(canvas.width - PADDLE_THICKNESS, paddleTwoY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    //ball
    colorCircle(ballX, ballY, 10, 'red')

    //score
    canvasContext.fillText(scorePlayer1, 100, 100)
    canvasContext.fillText(scorePlayer2, canvas.width - 100, 100)
}

function colorCircle(centerX, centerY, radius, drawColor) {
    
    //red ball
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    canvasContext.fill()
}


function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}
