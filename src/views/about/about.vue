<template>
  <div class="about-container">
    <h1>ABOUT</h1>
    <h2>Hi Vue.Porto 👋</h2>
    <p>This is a simple <strong>Vite + Vue3 + Vitest App</strong> demo made for {{ eventDate() }}.</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    methods: {
      eventDate() {
        return new Date().toLocaleDateString()
      },
    },
  })
</script>

<style lang="scss">
  .about-container {
    padding: 50px 150px;
  }
</style>
