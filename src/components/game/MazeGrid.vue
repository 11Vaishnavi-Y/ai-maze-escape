<template>
  <div class="game-container">
    <!-- Header -->
  <div class="game-info">
  <h2>🧩 AI Maze Escape</h2>

  <div class="stats">
    <div class="stat-item">
      ⏱️ {{ seconds }}s
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

    <select
  v-model="difficulty"
  @change="resetGame"
  class="difficulty-select"
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</select>

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
            player: player.row === rowIndex && player.col === colIndex
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

        <button @click="playAgain">
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { generateMaze } from '../../algorithms/mazeGenerator'

const maze = ref(generateMaze())

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

let timer = null

function startTimer() {
  timer = setInterval(() => {
    seconds.value++
  }, 1000)
}

function stopTimer() {
  clearInterval(timer)
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

  if (
player.value.row === exit.value.row &&
player.value.col === exit.value.col
  ) {
    stopTimer()
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

.new-game-btn {
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.new-game-btn:hover {
  background: #1d4ed8;
}

.difficulty-select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: white;
  font-size: 15px;
  cursor: pointer;
}

.difficulty-select:focus {
  outline: none;
  border-color: #2563eb;
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
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 2px solid #f1f5f9;
}

.game-info h2 {
  margin: 0;
  font-size: 2rem;
  color: #1e293b;
}

.stats {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
}

.maze {
  display: inline-block;
  padding: 20px;
  background: #e2e8f0;
  border-radius: 14px;
  overflow: auto;
  max-width: 100%;
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

.path {
  background: white;
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
  color: #64748b;
  font-size: 15px;
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

@media (max-width: 768px) {

  .game-container {
    padding: 16px;
    margin: 20px auto;
  }

  .new-game-btn {
  width: 100%;
}

.difficulty-select {
  width: 100%;
}

  .game-info {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .game-info h2 {
    font-size: 1.6rem;
  }

  .stats {
     flex-direction: column;
  gap: 8px;
  }

.stat-item {
  font-size: 16px;
}

  .cell {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  .maze {
    padding: 10px;
  }
}
</style>