<template>
  <div>
    <Navbar />

    <main class="page-container">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
</script>

<style scoped>
.page-container {
  padding: 40px;
}
</style>