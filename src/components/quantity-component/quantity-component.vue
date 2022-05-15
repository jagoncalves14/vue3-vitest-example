<template>
  <input
    class="quantity-component"
    type="text"
    @keydown.prevent="onKeydown"
    v-model="quantity"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      quantity: 0
    }
  },

  methods: {
    onKeydown(e) {
      if (e.key === 'a') {
        this.quantity = 13
      }
    }
  }
})
</script>
