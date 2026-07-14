export function generateMaze(rows = 15, cols = 15) {
  const maze = [];

  // Create all walls
  for (let row = 0; row < rows; row++) {
    const currentRow = [];

    for (let col = 0; col < cols; col++) {
      currentRow.push(1);
    }

    maze.push(currentRow);
  }

  // Carve a simple path
  maze[1][1] = 0;
  maze[1][2] = 0;
  maze[1][3] = 0;
  maze[2][3] = 0;
  maze[3][3] = 0;
  maze[3][4] = 0;
  maze[3][5] = 0;

  return maze;
}