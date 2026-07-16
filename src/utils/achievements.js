export function getAchievements(time, moves, difficulty) {
  const achievements = []

  achievements.push("🏅 First Escape")

  if (time <= 30) {
    achievements.push("⚡ Speed Runner")
  }

  if (moves <= 100) {
    achievements.push("👣 Efficient Explorer")
  }

  if (difficulty === "Hard") {
    achievements.push("🔥 Hard Mode Master")
  }

  if (difficulty === "Hard" && time <= 60) {
    achievements.push("🎯 Perfect Run")
  }

  return achievements
}