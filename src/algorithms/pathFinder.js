export function findPath(maze, start, end) {
  const rows = maze.length
  const cols = maze[0].length

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]

  const queue = [start]
  const visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  )

  const parent = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  )

  visited[start.row][start.col] = true

  while (queue.length) {
    const current = queue.shift()

    if (
      current.row === end.row &&
      current.col === end.col
    ) {
      break
    }

    for (const [dr, dc] of directions) {
      const nr = current.row + dr
      const nc = current.col + dc

      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        maze[nr][nc] === 0 &&
        !visited[nr][nc]
      ) {
        visited[nr][nc] = true

        parent[nr][nc] = current

        queue.push({
          row: nr,
          col: nc
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