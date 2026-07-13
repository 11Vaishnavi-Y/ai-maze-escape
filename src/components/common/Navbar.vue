<template>
  <nav class="navbar">
    <div class="logo">
      🧩 AI Maze Escape
    </div>

    <div class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Play</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background: #1f2937;
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  color: #38bdf8;
}

.router-link-active {
  color: #38bdf8;
}
</style>