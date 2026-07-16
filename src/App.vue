<template>
  <RouterView />
</template>

<script setup>
import Navbar from './components/common/Navbar.vue'
import { RouterView } from 'vue-router'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f4f4;
}
</style>