<template>
  <div class="movie-preview">
    <template v-if="title">
      <div class="movie-preview__image">
        <img v-if="image" :src="image" />
      </div>
      <h3 class="movie-preview__title">{{ title }}</h3>
      <p class="movie-preview__title">Budget: ${{ budget }}</p>
    </template>
    <h3 v-else class="movie-preview__loading">Loading...</h3>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MoviePreview',

    props: {
      image: String,
      title: String,
      budget: String,
    },
  })
</script>

<style lang="scss">
  .movie-preview {
    display: block;
    width: 75%;
    margin-right: 0;
    margin-left: auto;
  }

  .movie-preview__image {
    padding: 70px 0 0 0;
  }

  .movie-preview__image img {
    height: 60vh;
    border-radius: 3px;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.15);
  }

  .movie-preview__loading {
    margin-top: 350px;
  }
</style>
