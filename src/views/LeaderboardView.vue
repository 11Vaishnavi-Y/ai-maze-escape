<template>
  <div class="leaderboard">
    <h3>🏆 Leaderboard</h3>

    <div v-if="scores.length === 0">
      No scores yet.
    </div>

    <table v-else>
     <thead>
  <tr>
    <th>#</th>
    <th>Difficulty</th>
    <th>Time</th>
    <th>Moves</th>
    <th>Date</th>
  </tr>
</thead>

     <tbody>
  <tr
    v-for="(score, index) in scores"
    :key="index"
  >
    <td>{{ index + 1 }}</td>
    <td>{{ score.difficulty }}</td>
    <td>{{ score.time }}s</td>
    <td>{{ score.moves }}</td>
    <td>{{ score.date }}</td>
  </tr>
</tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLeaderboard } from '../utils/leaderboard'

const scores = ref([])

onMounted(() => {
  scores.value = getLeaderboard()
})
</script>