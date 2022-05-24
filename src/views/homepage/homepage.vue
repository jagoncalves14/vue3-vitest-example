<template>
  <div class="homepage-container">
    <MovieList @selected-movie="setActiveMovie" :movie-list="data" :active-movie-id="activeMovieId" />
    <MoviePreview :image="preview.image" :title="preview.title" :budget="preview.budget" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MovieList from '@/components/movie-list/movie-list.vue'
  import MoviePreview from '@/components/movie-preview/movie-preview.vue'
  import getMovies from '@/api/get-movies/get-movies'
  import getMovieDetail from '@/api/get-movie-detail/get-movie-detail'
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
        timer: 0,
      }
    },

    async mounted() {
      try {
        this.data = await getMovies()
      } catch (error) {
        this.data = []
        throw error
      }

      this.updateNotificationsTimer()
    },

    methods: {
      setActiveMovie(id: number) {
        this.activeMovieId = id
      },

      updateNotificationsTimer() {
        clearTimeout(this.timer)

        // @ts-ignore
        this.timer = setTimeout(() => {
          this.timer = 100000
        }, 100000)

        return this.timer
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
        async handler(id: number) {
          try {
            const { budget } = await getMovieDetail(id)
            const selectedMovie = this.data.find(movie => movie.id === id) as TMovieData
            this.preview = {
              image: `${BASE_IMAGE_URL}${selectedMovie.poster_path}`,
              title: selectedMovie.title,
              overview: selectedMovie.overview,
              budget: Number(budget.toFixed(2)).toLocaleString('en', {
                minimumFractionDigits: 2,
              }),
            }
          } catch (error) {
            throw error
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
