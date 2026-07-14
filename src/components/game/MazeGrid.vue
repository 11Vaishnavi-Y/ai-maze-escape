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
    path: cell === 0
}"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { generateMaze } from '../../algorithms/mazeGenerator'

const maze = generateMaze()
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
}

.wall {
  background: #222;
}

.path {
  background: white;
}

</style>