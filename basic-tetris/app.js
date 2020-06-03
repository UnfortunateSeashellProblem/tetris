document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
  ]


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

let current = theTetrominoes[random][currentRotation]
//draw the teromino
function draw() {
  current.forEach(index =>{
    squares[currentPosition + index].classList.add('tetromino')
    squares[currentPosition + index].style.backgroundColor = colors[random]
  })
}


//undraw the tetromino (while it moves down)
function undraw(){
  current.forEach(index =>{
    squares[currentPosition + index].classList.remove('tetromino')
    squares[currentPosition + index].style.backgroundColor = ''
  })
}

//timerId is assigned to the movedown funciton and a time interval
// timerId = setInterval(moveDown, 1000)

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
  else if(e.keyCode === 38){
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
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
    gameOver()
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

//show next Tetromino
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0


//the tetrominoes w/o rotations
const upNext = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
  [1, 2, displayWidth, displayWidth + 1], //zTetromino
  [1, 2, displayWidth + 1, displayWidth + 2],  //oTetromino
  [0, 1, 2, displayWidth + 1], //tTetromino
]


//display nextup in mini-grid
function displayShape(){
//remove previous tetromino from  grid
displaySquares.forEach(square =>{
  square.classList.remove('tetromino')
  square.style.backgroundColor = ''
})
upNext[nextRandom].forEach(index => {
  displaySquares[displayIndex + index].classList.add('tetromino')
  displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
})
}

//add button functionality
startBtn.addEventListener('click', () => {
  if(timerId){
    clearInterval(timerId)
    timerId = null
  }else{
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    displayShape()
  }
})

//add score
function addScore(){
for(i = 0; i < 199; i += width){
  const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

  if(row.every(index => squares[index].classList.contains('taken'))){
    score += 10
    scoreDisplay.innerHTML = score
    row.forEach(index =>{
      squares[index].classList.remove('taken')
      squares[index].classList.remove('tetromino')
      squares[index].style.backgroundColor = ""
    })
    const squaresRemoved = squares.splice(i, width)
    squares = squaresRemoved.concat(squares)
    squares.forEach(cell => grid.appendChild(cell))
  }
  }
}


//game over function
function gameOver(){
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    scoreDisplay.innerHTML = 'end'
    clearInterval(timerId)
  }
}







})

})
