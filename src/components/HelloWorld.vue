<template>
  <div class="title">Hello World</div>
  <Bye />
</template>

<script>
import Bye from './Bye.vue';

export default {
  data() {
    return {
      hasMounted: false,
    };
  },

  components: {
    Bye,
  },

  mounted() {
    this.hasMounted = true;
  },
};
</script>
