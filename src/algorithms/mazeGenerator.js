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

function getRandomNeighbour(neighbours) {
  const randomIndex = Math.floor(Math.random() * neighbours.length);

  return neighbours[randomIndex];
}

function removeWall(maze, current, next) {
  const wallRow = (current.row + next.row) / 2;
  const wallCol = (current.col + next.col) / 2;

  maze[current.row][current.col] = 0;
  maze[wallRow][wallCol] = 0;
  maze[next.row][next.col] = 0;
}

function carvePath(maze, row, col, rows, cols) {
  maze[row][col] = 0;

const neighbours =
    getNeighbours(maze, row, col, rows, cols);

    if (neighbours.length === 0) {
        return;
    }


  const next = getRandomNeighbour(neighbours);

  removeWall(
    maze,
    { row, col },
    next
  );
    carvePath(
    maze,
    next.row,
    next.col,
    rows,
    cols
  );

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