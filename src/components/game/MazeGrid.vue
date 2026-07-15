<template>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { generateMaze } from '../../algorithms/mazeGenerator'

const maze = generateMaze()

const exit = {
  row: maze.length - 2,
  col: maze[0].length - 2
}

const player = ref({
  row: 1,
  col: 1
})

function movePlayer(rowOffset, colOffset) {
  const newRow = player.value.row + rowOffset;
  const newCol = player.value.col + colOffset;

  if (maze[newRow][newCol] === 1) {
    return;
  }

  player.value.row = newRow;
  player.value.col = newCol;
  if (
  player.value.row === exit.row &&
  player.value.col === exit.col
) {
  alert("🎉 You escaped the maze!");
}
}

function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowUp':
      movePlayer(-1, 0);
      break;

    case 'ArrowDown':
      movePlayer(1, 0);
      break;

    case 'ArrowLeft':
      movePlayer(0, -1);
      break;

    case 'ArrowRight':
      movePlayer(0, 1);
      break;
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.maze {
  display: inline-block;
}

.row {
  display: flex;
}

.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wall {
  background: #222;
}

.path {
  background: white;
}

.player {
  font-size: 18px;
}
</style>