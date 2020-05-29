document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10

//the Tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]


const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
]

const zTetromino = [
  [1, 2, width, width + 1],
  [2, width + 1, width + 2, width * 2 + 1],
  [0, 1, width + 1, width + 2],
  [1, width, width + 1, width * 2]
]

const oTetromino = [
  [1, 2, width + 1, width + 2],
  [1, 2, width + 1, width + 2],
  [1, 2, width + 1, width + 2],
  [1, 2, width + 1, width + 2]
]

const tTetromino = [
  [0, 1, 2, width + 1],
  [0, width, width * 2, width + 1],
  [width, width + 1, width + 2, 1],
  [1, width + 1, width * 2 + 1, width]
]

const theTetrominoes = [lTetromino, iTetromino, zTetromino, oTetromino, tTetromino]

let currentPosition = 4;
let currentRotation = 0;

//random spawning
let random = Math.floor(Math.random()*theTetrominoes.length);
console.log(random)
let current = theTetrominoes[random][currentRotation]
//draw the teromino
function draw() {
  current.forEach(index =>{
    squares[currentPosition + index].classList.add('tetromino')
  })
}

draw();
//undraw the tetromino (while it moves down)
function undraw(){
  current.forEach(index =>{
    squares[currentPosition + index].classList.remove('tetromino')
  })
}

//timerId is assigned to the movedown funciton and a time interval
timerId = setInterval(moveDown, 1000)

//assign functions to keys
function control(e){
  if(e.keyCode === 37){
    moveLeft()
  }
  else if(e.keyCode === 39){
    moveRight()
  }
  else if(e.keyCode === 40){
    moveDown()
  }
  else if(keyCode === 38){
    rotate()
  }
}
document.addEventListener('keyup', control)


//moveDown function, undraws the shape, increments the current position and redraws it
function moveDown(){
undraw()
currentPosition += width
draw()
freeze()
}

//freeze function; if some of the indexes of the tetromino reach the bottom, freeze the tetromino
function freeze(){
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //spawn a new Tetromino
    random = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}

//a function that will stop the tetromino from going too far left
function moveLeft(){
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

  if(!isAtLeftEdge) currentPosition -= 1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition += 1
  }

  draw()
}


//move the terominos right unless its at the right edge
function moveRight(){
undraw()
const isAtRightEdge = current.some(index => (currentPosition + index) % width === 9)

  if(!isAtRightEdge) currentPosition += 1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition -= 1
  }
  draw()
}

//rotating the teromino
function rotate(){
  undraw()
  currentRotation++
  if(currentRotation === current.length){ //if currentRotation gets to the last rotation, restart at 0
    currentRotation = 0
  }
  current = theTetrominoes[random][currentRotation]
  draw()
}











})
