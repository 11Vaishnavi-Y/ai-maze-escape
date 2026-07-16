const STORAGE_KEY = 'ai-maze-leaderboard'

export function getLeaderboard() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveScore(score) {
  const scores = getLeaderboard()

  scores.push(score)

  scores.sort((a, b) => {
    if (a.time === b.time) {
      return a.moves - b.moves
    }

    return a.time - b.time
  })

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(scores)
  )
}