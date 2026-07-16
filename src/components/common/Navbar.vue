<template>
  <nav class="navbar">
    <div class="logo">
      🧩 AI Maze Escape
    </div>

    <button
      class="menu-btn"
      @click="isOpen = !isOpen"
    >
      ☰
    </button>

    <div
      class="nav-links"
      :class="{ active: isOpen }"
    >
      <RouterLink to="/" @click="closeMenu">
        🏠 Home
      </RouterLink>

      <RouterLink to="/game" @click="closeMenu">
        🎮 Play
      </RouterLink>

      <RouterLink to="/leaderboard" @click="closeMenu">
        🏆 Leaderboard
      </RouterLink>

      <RouterLink to="/settings" @click="closeMenu">
        ⚙️ Settings
      </RouterLink>

      <RouterLink to="/about" @click="closeMenu">
        ℹ️ About
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 30px;
  background: #1f2937;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 18px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  transition: .3s;
  font-weight: 600;
}

.nav-links a:hover {
  background: #374151;
}

.router-link-active {
  background: #38bdf8;
  color: #111827;
}

.menu-btn {
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

/* Mobile */

@media (max-width:768px) {

  .menu-btn {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 68px;
    left: 0;
    width: 100%;
    background: #1f2937;
    flex-direction: column;
    gap: 0;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    padding: 16px;
    border-radius: 0;
    border-top: 1px solid #374151;
  }
}
</style>