// Game of life hacked
// from example code

// cell size
let cell_size = 10;
// number of rows and columns based on board size and cell size
let columns;
let rows;
// 2D arrays
let board;
let next;

const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Calculate columns and rows
  columns = floor(width / cell_size);
  rows = floor(height / cell_size);
  // Going to use multiple 2D arrays and swap them
  board = create2DArray(columns, rows);
  next = create2DArray(columns, rows);
  // fill randomly with life
  init();
}

function draw() {
  background(255);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j])) fill(random(COLORS));
      else fill(0);
      stroke(0);
      rect(i * cell_size, j * cell_size, cell_size-1, cell_size-1);
    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) {
        board[i][j] = false;
      } else {
      // Filling the rest randomly
       board[i][j] = Boolean(floor(random(2)));
      }
      // next is all empty
      next[i][j] = false;
    }
  }
}

// The process of creating the new generation
function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // if i and j are 0, we're at the location
          // and it's not a neighbor
          if ( i || j ) {
            neighbors += board[x+i][y+j];
          }
        }
      }

      // Rules of Life
      next[x][y] = isAlive(neighbors, board[x][y]);
    }
  }

  // push the next board and create a new blank for next round
  board = next;
  next = create2DArray(columns, rows);
}

// helper functions
const create2DArray = (columns, rows) => {
  const arr = new Array(columns);
  for (i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// Given n (int) neighbors and s (bool) current state, return current state 
// Returns a Boolean value, true (alive) or false
const isAlive = (n, s) => {
  if (s) {
    // cell succumbs to loneliness or overpopulation
    if ( n  < 2 || n > 3) {
      return false;
    }
  }
  // trinary reproduction
  if (!s && n === 3) {
    return true;
  } 
  // if none of the rules above, stay the same
  return s;
}
