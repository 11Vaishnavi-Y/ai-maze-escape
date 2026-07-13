<template>
  <AppLayout>
    <section class="hero">

      <h1>🧩 AI Maze Escape</h1>

      <p>
        Escape randomly generated mazes using your skills.
        Challenge the AI and discover the shortest path!
      </p>

      <RouterLink to="/game" class="play-btn">
        ▶ Start Game
      </RouterLink>

    </section>
  </AppLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AppLayout from '../components/common/AppLayout.vue'
</script>

<style scoped>
.hero{
    height:75vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
}

h1{
    font-size:56px;
    margin-bottom:20px;
}

p{
    max-width:700px;
    font-size:20px;
    line-height:1.6;
    margin-bottom:40px;
}

.play-btn{
    background:#2563eb;
    color:white;
    text-decoration:none;
    padding:16px 32px;
    border-radius:10px;
    font-size:20px;
    transition:.3s;
}

.play-btn:hover{
    background:#1d4ed8;
    transform:translateY(-3px);
}
</style>