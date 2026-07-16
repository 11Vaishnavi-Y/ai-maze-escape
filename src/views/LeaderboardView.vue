<template>
  <div class="leaderboard">
    <h3>🏆 Leaderboard</h3>

  <div v-if="scores.length === 0" class="empty">
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

<style scoped>
.leaderboard {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,.1);
}

.leaderboard h3 {
  margin-bottom: 25px;
  font-size: 2rem;
  color: #1e293b;
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 12px;
}

thead {
  background: #2563eb;
  color: white;
}

th,
td {
  padding: 16px;
  text-align: center;
}

tbody tr:nth-child(even) {
  background: #f8fafc;
}

tbody tr:hover {
  background: #dbeafe;
}

th {
  font-size: 17px;
}

td {
  color: #475569;
  font-weight: 500;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #64748b;
  font-size: 18px;
}

@media (max-width: 768px) {

  .leaderboard {
    width: 95%;
    padding: 20px;
  }

  h3 {
    text-align: center;
    font-size: 1.6rem;
  }

  table {
    font-size: 14px;
  }

  th,
  td {
    padding: 10px;
  }
}
</style>