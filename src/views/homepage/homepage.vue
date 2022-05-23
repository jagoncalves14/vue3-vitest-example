<template>
  <div class="homepage-container">
    <MovieList @selected-movie="setActiveMovie" :movie-list="data" :active-movie-id="activeMovieId" />
    <MoviePreview :image="preview.image" :title="preview.title" :description="preview.desc" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MovieList from '@/components/movie-list/movie-list.vue'
  import MoviePreview from '@/components/movie-preview/movie-preview.vue'
  import getMoviesList from '@/api/get-movies'
  import { TMovieData, TMoviePreview } from '@/types/api'
  import { BASE_IMAGE_URL } from '@/constants'

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

    async mounted() {
      try {
        this.data = await getMoviesList()
      } catch (error) {
        this.data = []
        throw error
      }
    },

    methods: {
      setActiveMovie(id: number) {
        this.activeMovieId = id
      },
    },

    watch: {
      data: {
        deep: true,
        handler(movieList: TMovieData[]) {
          if (movieList?.length) {
            this.setActiveMovie(movieList[0].id)
          }
        },
      },

      activeMovieId: {
        handler(id: number) {
          const selectedMovie = this.data.find(movie => movie.id === id) as TMovieData
          this.preview = {
            image: `${BASE_IMAGE_URL}${selectedMovie.poster_path}`,
            title: selectedMovie.title,
            overview: selectedMovie.overview,
          }
        },
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
