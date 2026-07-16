export function findShortestPath(maze, start, end) {
  const rows = maze.length
  const cols = maze[0].length

  const directions = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1]   // Right
  ]

  const queue = []
  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  )

  const parent = Array.from(
    { length: rows },
    () => Array(cols).fill(null)
  )

  queue.push(start)
  visited[start.row][start.col] = true

  while (queue.length > 0) {
    const current = queue.shift()

    if (
      current.row === end.row &&
      current.col === end.col
    ) {
      break
    }

    for (const [dr, dc] of directions) {
      const newRow = current.row + dr
      const newCol = current.col + dc

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol] &&
        maze[newRow][newCol] === 0
      ) {
        visited[newRow][newCol] = true

        parent[newRow][newCol] = current

        queue.push({
          row: newRow,
          col: newCol
        })
      }
    }
  }

  const path = []

  let current = end

  while (current) {
    path.unshift(current)

    current = parent[current.row][current.col]
  }

  return path
}