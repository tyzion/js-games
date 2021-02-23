let canvas = document.querySelector('#canvas')
let canvasContext = canvas.getContext('2d')

let ballX = 50;
let ballSpeedX = 10
let ballY = 50;
let ballSpeedY = 10

let framesPerSecond = 30

const ACCELERATION_RATE = 1/3
const PADDLE_HEIGHT = 120
const PADDLE_THICKNESS = 10
const BALL_RADIUS = 10
const BALL_DISTANCE = PADDLE_THICKNESS + BALL_RADIUS

let paddleOneY = 100
let paddleTwoY = 100

let scorePlayer1 = 0
let scorePlayer2 = 0
const winningScore = 4

window.onload = function() {

    ballReset()

    setInterval(() => {
        drawEverything()
        moveEverything()
    }, 1000/framesPerSecond)

    mouseMove()

}

function winner() {
    if (scorePlayer1 == winningScore) {
        alert('Player 1 has won')
        resetScore()
    } else if (scorePlayer2 == winningScore) {
        alert('Player 2 has won')
        resetScore()
    }
}

function resetScore() {
    scorePlayer1 = 0;
    scorePlayer2 = 0;
}

//func to calculate mouse position
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft
    var mouseY = evt.clientY - rect.top - root.scrollTop
    return {
        x: mouseX,
        y: mouseY,
    }
}

//func to move paddles with the mouse
function mouseMove() {
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt)
        if (mousePos.x < canvas.width / 2){
            paddleOneY = mousePos.y - PADDLE_HEIGHT / 2
        } else if (mousePos.x > canvas.width / 2) {
            paddleTwoY = mousePos.y - PADDLE_HEIGHT / 2
        }
    })
}

function ballReset() {
    ballX = canvas.width / 2
    ballY = canvas.height / 2
    ballSpeedX = -ballSpeedX
    ballSpeedY = -ballSpeedY
}

function deltaYSpeed(paddle) {
    var deltaY = ballY - (paddle + PADDLE_HEIGHT / 2)
    ballSpeedY = deltaY * ACCELERATION_RATE
}

function moveEverything() {
    ballX += ballSpeedX
    ballY += ballSpeedY
    if (ballX < BALL_RADIUS) {
        if (ballX < BALL_DISTANCE && ballY > paddleOneY && ballY < paddleOneY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX
            deltaYSpeed(paddleOneY)
            scorePlayer1++
            winner()
        }  else if(scorePlayer1 > 0){
            scorePlayer1--
        } else ballReset()

    }
    if (ballX > canvas.width - BALL_RADIUS) {
        if (ballX > canvas.width - BALL_DISTANCE && ballY > paddleTwoY && ballY < paddleTwoY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX
            deltaYSpeed(paddleTwoY)
            scorePlayer2++
            winner()
        }  else if(scorePlayer2 > 0){
            scorePlayer2--
        } else ballReset()
    } 
    if (ballY > canvas.height - BALL_RADIUS || ballY < BALL_RADIUS) {
        ballSpeedY = -ballSpeedY
    }
}

function drawEverything() {
    //canva
    colorRect(0, 0, canvas.width, canvas.height, 'black')

    //net
    drawNet()

    // paddle left
    colorRect(0, paddleOneY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'red')
    
    // paddle right
    colorRect(canvas.width - PADDLE_THICKNESS, paddleTwoY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'red')

    //ball
    colorCircle(ballX, ballY, BALL_RADIUS, 'white')

    //score
    canvasContext.fillText(scorePlayer1, 100, 100)
    canvasContext.fillText(scorePlayer2, canvas.width - 100, 100)
}

function colorRect(letX, topY, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(letX, topY, width, height, color)
}

function colorCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    canvasContext.fill()
}

function drawNet() {
    for (let i = 10; i < canvas.height; i+=40) {
        colorRect(canvas.width / 2, i, 3, 20, 'white')
    }
}
