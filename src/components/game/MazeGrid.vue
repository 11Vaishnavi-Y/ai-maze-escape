<template>
 <div
  class="game-container"
  :class="{ dark: isDarkMode }"
>
    <!-- Header -->
  <div class="game-info">
  <h2>🧩 AI Maze Escape</h2>

  <div class="stats">
    <div class="stat-item">
      ⏱️ {{ seconds }}
    </div>

    <div class="stat-item">
      👣 {{ moves }}
    </div>

    <button
      class="new-game-btn"
      @click="resetGame"
    >
      🔄 New Game
    </button>

    <button
  class="new-game-btn"
  @click="showHint"
>
  💡 Hint
</button>

    <select
  v-model="difficulty"
  @change="resetGame"
  class="difficulty-select"
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</select>

<button
  class="theme-btn"
  @click="toggleTheme"
>
  {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
</button>

  </div>
</div>

    <!-- Maze -->
    <div class="maze">
      <div
        v-for="(row, rowIndex) in maze"
        :key="rowIndex"
        class="row"
      >
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
         :class="{
  wall: cell === 1,
  path: cell === 0,
  player: player.row === rowIndex && player.col === colIndex,
  hint:
    (hint &&
    hint.row === rowIndex &&
    hint.col === colIndex)
}"
        >
          <span
            v-if="player.row === rowIndex && player.col === colIndex"
          >
            😀
          </span>

          <span
            v-else-if="exit.row === rowIndex && exit.col === colIndex"
          >
            🚪
          </span>
        </div>
      </div>
    </div>

    <div class="mobile-controls">
  <button @click="movePlayer(-1, 0)">⬆️</button>

  <div class="horizontal-controls">
    <button @click="movePlayer(0, -1)">⬅️</button>
    <button @click="movePlayer(0, 1)">➡️</button>
  </div>

  <button @click="movePlayer(1, 0)">⬇️</button>
</div>

     <div class="game-footer">
      <div class="controls">
        <strong>🎮 Controls:</strong>
        Use the Arrow Keys (↑ ↓ ← →) to reach the 🚪 exit.
      </div>
    </div>

    <!-- Victory Modal -->
    <div v-if="gameWon" class="modal-overlay">
      <div class="modal">
        <h2>🎉 Congratulations!</h2>

        <p>You escaped the maze!</p>

     <p>⏱️ Time: {{ seconds }} seconds</p>
     <p>👣 Moves: {{ moves }}</p>

     <div class="achievement-section">
  <h3>🏅 Achievements</h3>

  <ul>
    <li
      v-for="(achievement, index) in achievements"
      :key="index"
    >
      {{ achievement }}
    </li>
  </ul>
</div>

        <button @click="playAgain">
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAchievements } from '../../utils/achivements'
import { findPath } from '../../algorithms/pathFinder'
import { saveScore } from '../../utils/leaderboard'
import { ref, onMounted, onUnmounted } from 'vue'
import { generateMaze } from '../../algorithms/mazeGenerator'

const maze = ref(generateMaze())
console.log(maze.value)

const achievements = ref([])

const exit = ref({
  row: maze.value.length - 2,
  col: maze.value[0].length - 2
})

const player = ref({
  row: 1,
  col: 1
})

const gameWon = ref(false)

const mazeSizes = {
  Easy: 15,
  Medium: 21,
  Hard: 31
}

// Timer
const seconds = ref(0)
const moves = ref(0)
const difficulty = ref('Easy')
const isDarkMode = ref(false)
const hint = ref(null)

let timer = null

function startTimer() {
  timer = setInterval(() => {
    seconds.value++
  }, 1000)
}

function stopTimer() {
  clearInterval(timer)
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value

  localStorage.setItem(
    'maze-theme',
    JSON.stringify(isDarkMode.value)
  )
}

function showHint() {
  const path = findPath(
    maze.value,
    player.value,
    exit.value
  )

  console.log("Path:", path)

  if (path.length > 1) {
    hint.value = path[1]
    console.log("Hint:", hint.value)

    setTimeout(() => {
      hint.value = null
    }, 1000)
  }
}

function resetGame() {
const size = mazeSizes[difficulty.value]

maze.value = generateMaze(size, size)

  exit.value = {
    row: maze.value.length - 2,
    col: maze.value[0].length - 2
  }

  player.value = {
    row: 1,
    col: 1
  }

  seconds.value = 0
  moves.value = 0

  gameWon.value = false

  stopTimer()
  startTimer()
}

function playAgain() {
  resetGame()
}

function movePlayer(rowOffset, colOffset) {
  const newRow = player.value.row + rowOffset
  const newCol = player.value.col + colOffset

if (maze.value[newRow][newCol] === 1) {
  return
}

player.value.row = newRow
player.value.col = newCol

moves.value++
hint.value = null

  if (
player.value.row === exit.value.row &&
player.value.col === exit.value.col
  ) {
    stopTimer()

   stopTimer()

achievements.value = getAchievements(
  seconds.value,
  moves.value,
  difficulty.value
)

saveScore({
  difficulty: difficulty.value,
  time: seconds.value,
  moves: moves.value,
  date: new Date().toLocaleDateString()
})

gameWon.value = true
  }
}

function handleKeyDown(event) {
  if (gameWon.value) return

  switch (event.key) {
    case 'ArrowUp':
      movePlayer(-1, 0)
      break

    case 'ArrowDown':
      movePlayer(1, 0)
      break

    case 'ArrowLeft':
      movePlayer(0, -1)
      break

    case 'ArrowRight':
      movePlayer(0, 1)
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  
  const savedTheme = localStorage.getItem('maze-theme')

if (savedTheme) {
  isDarkMode.value = JSON.parse(savedTheme)
}
  
  startTimer()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  stopTimer()
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.achievement-section {
  margin: 20px 0;
  padding: 15px;
  background: #f8fafc;
  border-radius: 10px;
  text-align: left;
}

.achievement-section h3 {
  margin-bottom: 10px;
  color: #2563eb;
}

.achievement-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement-section li {
  padding: 6px 0;
  font-size: 15px;
}

.dark .achievement-section {
  background: #1f2937;
}

.dark .achievement-section h3 {
  color: #60a5fa;
}

.mobile-controls {
  display: none;
  margin: 20px auto;
  text-align: center;
}

.mobile-controls button {
  width: 60px;
  height: 60px;
  margin: 6px;
  font-size: 24px;
  border: none;
  border-radius: 12px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.horizontal-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 768px) {
  .mobile-controls {
    display: block;
  }
}

.theme-btn {
  height: 46px;
  min-width: 110px;

  border: none;
  border-radius: 10px;

  background: #111827;
  color: white;

  cursor: pointer;

  font-size: 15px;
  font-weight: 600;

  transition: .25s;
}

.theme-btn:hover {
  background: #1f2937;
}

.dark {
  background: #111827;
  color: white;
}

.dark .game-info {
  border-color: #374151;
}


.dark .game-info h2 {
  color: white !important;
}

.dark .stat-item {
  background: #1e3a8a;
  color: white;
}


.dark .maze {
  background: #374151;
}

.dark .wall {
  background: #000;
}

.dark .path {
  background: #d1d5db;
}

.dark .game-footer {
  border-color: #374151;
}

.dark .difficulty-select {
  background: #1f2937;
  color: white;
  border-color: #374151;
}

.new-game-btn {
  height: 46px;
  min-width: 120px;

  border: none;
  border-radius: 10px;

  background: #2563eb;
  color: white;

  cursor: pointer;

  font-size: 15px;
  font-weight: 600;

  transition: .25s;
}

.new-game-btn:hover {
  background: #1d4ed8;
}

.difficulty-select {
  height: 46px;
  min-width: 120px;

  padding: 0 14px;

  border-radius: 10px;
  border: 1px solid #d1d5db;

  font-size: 15px;
  cursor: pointer;
}

.difficulty-select:focus {
  outline: none;
  border-color: #2563eb;
}

.path {
  background: white;
}

.hint {
  background: yellow !important;
  border: 3px solid red !important;
}

.game-container {
  max-width: 1000px;
  width: 95%;
  margin: 40px auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding-bottom: 20px;
  margin-bottom: 25px;
  border-bottom: 2px solid #e5e7eb;
}

.game-info h2 {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
}
.stats {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
  font-size: 16px;
}

.maze {
  display: inline-block;

  margin: 30px auto;

  padding: 24px;

  background: #cbd5e1;

  border-radius: 18px;

  overflow: auto;
}

.maze {
  display: block;
  width: fit-content;
  margin: 30px auto;
}

.row {
  display: flex;
}

.cell {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wall {
  background: #1e293b;
}

.player {
  font-size: 20px;
}

.game-footer {
  margin-top: 24px;
  border-top: 2px solid #f1f5f9;
  padding-top: 18px;
}

.controls {
  text-align: center;

  color: #334155;

  font-size: 17px;

  font-weight: 500;
}

.controls strong {
  color: #0f172a;
}

/* Modal */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 360px;
  max-width: 90%;
  background: white;
  border-radius: 18px;
  padding: 30px;
  text-align: center;
  animation: popup .25s ease;
}

.modal h2 {
  margin-bottom: 15px;
  color: #0f172a;
}

.modal p {
  color: #64748b;
  margin-bottom: 14px;
}

.modal button {
  margin-top: 10px;
  width: 100%;
  padding: 14px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.modal button:hover {
  background: #1d4ed8;
}

@keyframes popup {
  from {
    transform: scale(.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width:768px){

.game-info{
    flex-direction:column;
    align-items:center;
}

.game-info h2{
    font-size:30px;
}

.stats{
    justify-content:center;
}

.new-game-btn,
.theme-btn,
.difficulty-select{
    width:100%;
}

.cell{
    width:24px;
    height:24px;
    font-size:14px;
}

.maze{
    padding:12px;
}

.controls{
    font-size:15px;
}

}
</style>