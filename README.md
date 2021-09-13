# An implementation of Conway's Game of life
## View it [HERE](https://zandersparrow.github.io/GoL/)

## Concept
Conway's Game of Life is a turing-complete simulator of cellular life. Each cell has eight total neighbors, and each cell is either living or dead at the beginning of a round. The cells obey three simple rules:

1. Any living cell with two or three living neighbors lives on
2. Any living cell with more than three neighbors dies from over-population
3. Any dead cell with exactly three living neighbors comes to life

## Implementation
This version was implemented with the p5.js library, which is a port of the Processing language to JavaScript. This library is designed to make creative coding fast and easy. p5.js is designed to run the `draw` function on a loop. The `setup` function runs only once. 

In the `setup` function I draw a board for the cells, with random state for each cell, either alive (in color) or dead (black), which is calculated by the `init` function. Then, on each round of `draw` I cover up the last round (redrawing the background), iterate through the board, and use the `isAlive` function to determine whether the cell should be alive (color) or dead (black). The `isAlive` function is where I implement the rules stated above. 
