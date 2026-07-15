function getNeighbours(maze, row, col, rows, cols) {
  const neighbours = [];

  const directions = [
    { row: -2, col: 0 }, // Up
    { row: 2, col: 0 },  // Down
    { row: 0, col: -2 }, // Left
    { row: 0, col: 2 }   // Right
  ];

  for (const direction of directions) {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

   if (
  newRow > 0 &&
  newRow < rows &&
  newCol > 0 &&
  newCol < cols &&
  maze[newRow][newCol] === 1
) {
      neighbours.push({
        row: newRow,
        col: newCol
      });
    }
  }

  return neighbours;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}

function removeWall(maze, current, next) {
  const wallRow = (current.row + next.row) / 2;
  const wallCol = (current.col + next.col) / 2;

  maze[current.row][current.col] = 0;
  maze[wallRow][wallCol] = 0;
  maze[next.row][next.col] = 0;
}

function carvePath(maze, row, col, rows, cols) {
  // Mark current cell as a path
  maze[row][col] = 0;

  while (true) {
    // Get current unvisited neighbours
    const neighbours = getNeighbours(maze, row, col, rows, cols);

    // No neighbours? Backtrack
    if (neighbours.length === 0) {
      return;
    }

    // Randomize the order
    shuffle(neighbours);

    // Pick the first neighbour after shuffling
    const next = neighbours[0];

    // Remove the wall
    removeWall(
      maze,
      { row, col },
      next
    );

    // Continue from that neighbour
    carvePath(
      maze,
      next.row,
      next.col,
      rows,
      cols
    );
  }
}

export function generateMaze(rows = 15, cols = 15) {
  const maze = [];

  for (let row = 0; row < rows; row++) {
    const currentRow = [];

    for (let col = 0; col < cols; col++) {
      currentRow.push(1);
    }

    maze.push(currentRow);
  }

  carvePath(maze, 1, 1, rows, cols);

  return maze;
}