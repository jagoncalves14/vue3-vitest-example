<template>
  <div class="homepage-container">
    <MovieList @selected-movie="setActiveMovie" :movie-list="data" :active-movie-id="activeMovieId" />
    <MoviePreview :image="preview.image" :title="preview.title" :description="preview.desc" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import axios, { AxiosResponse } from 'axios'
  import MovieList from '@/components/movie-list/movie-list.vue'
  import MoviePreview from '@/components/movie-preview/movie-preview.vue'

  import { BASE_IMAGE_URL, API_URL } from '@/constants'
  import { TMovieData, TMoviePreview } from 'types/api'

  export default defineComponent({
    name: 'HomePage',

    components: {
      MovieList,
      MoviePreview,
    },

    data() {
      return {
        preview: {} as TMoviePreview,
        data: [] as TMovieData[],
        activeMovieId: 0,
      }
    },

    mounted() {
      axios.get(API_URL).then((response: AxiosResponse) => {
        this.data = response.data.results
      })
    },

    methods: {
      setActiveMovie(id: number) {
        this.activeMovieId = id
      },

      bestLaCroixFlavor() {
        return 'grapefruit'
      },
    },

    watch: {
      data(movieList: TMovieData[]) {
        movieList.length > 0 && this.setActiveMovie(movieList[0].id)
      },

      activeMovieId(id: number) {
        const selectedMovie = this.data.find(movie => movie.id === id) as TMovieData
        this.preview = {
          image: `${BASE_IMAGE_URL}${selectedMovie.poster_path}`,
          title: selectedMovie.title,
          overview: selectedMovie.overview,
        }
      },
    },
  })
</script>

<style lang="scss">
  .homepage-container {
    display: flex;
    justify-content: space-evenly;
    height: inherit;
  }
</style>
