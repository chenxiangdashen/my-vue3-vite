<template>
  <AppProvider>
    <Login></Login>
  </AppProvider>
</template>

<script setup lang='ts'>
import Login from "@/views/login/index.vue";
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
