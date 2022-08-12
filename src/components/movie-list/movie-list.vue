<template>
  <div class="movie-list">
    <input class="movie-list__search" type="text" placeholder="Search for a movie" @change="updateSearchQuery" />
    <ul v-if="filteredMovies.length">
      <li
        v-for="(item, index) in filteredMovies"
        :key="index"
        :class="{ active: item.id === activeMovieId }"
        @click="previewMovie(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { TMovieData } from '@/types/api'

  export default defineComponent({
    name: 'MovieList',

    emits: ['selected-movie'],

    props: {
      movieList: {
        type: Array as () => TMovieData[],
        default: [],
      },
      activeMovieId: {
        type: Number,
        default: 0,
      },
    },

    data() {
      return {
        searchQuery: '',
      }
    },

    mounted() {
      const onScrollToBottom = this.$el

      /* c8 ignore end */
      const observer = new IntersectionObserver(onIntersection, { threshold: 1 })
      observer.observe(this.$el)

      const observer = new IntersectionObserver(onIntersection, { threshold: 1 })
      observer.observe(onScrollToBottom)
      /* c8 ignore end */
    },

    computed: {
      filteredMovies(): TMovieData[] {
        if (!this.searchQuery) return this.movieList

        return this.movieList.filter((movie: TMovieData) => {
          const searchQuery = this.searchQuery.toLowerCase()
          const movieTitle = movie.title.toLowerCase()
          const titleMatchesQuery = movieTitle.includes(searchQuery)

          return titleMatchesQuery
        })
      },

      isActiveMovieOnFilteredList(): boolean {
        return this.filteredMovies.some((movie: TMovieData) => movie.id === this.activeMovieId)
      },
    },

    methods: {
      previewMovie(data: TMovieData) {
        this.$emit('selected-movie', data.id)
      },

      updateSearchQuery(event: Event) {
        const target = event?.target as HTMLInputElement
        this.searchQuery = (target?.value as string) || ''
      },
    },

    watch: {
      filteredMovies: {
        deep: true,
        handler(movieList: TMovieData[]) {
          if (movieList.length >= 1 && !this.isActiveMovieOnFilteredList) {
            this.previewMovie(movieList[0])
          }
        },
      },
    },
  })
</script>

<style lang="scss">
  $header-height: 83px;
  $input-height: 48px;

  .movie-list {
    position: fixed;
    top: $header-height;
    left: 0;
    width: 25%;
    height: calc(100% - $header-height);
    color: black;
    background-color: white;
    border-right: 1px solid black;

    &.seen {
      background-color: rgba(0, 0, 0, 0.02);
    }

    &__search {
      box-sizing: border-box;
      width: 100%;
      padding: 15px 30px;
      font-size: 16px;
      color: rgba(blue, 0.5);
      background: rgba(blue, 0.1);
      border: none;
      border-radius: none;

      &::placeholder {
        color: rgba(blue, 0.5);
      }

      &:focus {
        background: rgba(blue, 0.05);
        outline: none;
      }
    }

    ul {
      position: relative;
      height: calc(100% - $input-height);
      padding: 0;
      margin: 0;
      overflow: hidden;
      overflow-y: auto;
      border-top: 1px solid rgba(black, 1);
    }

    ul li {
      padding: 15px 30px;
      text-align: left;
      cursor: pointer;
      border-bottom: 1px solid rgba(black, 1);

      &:hover {
        background: rgba(black, 0.05);
      }

      &.active {
        color: white;
        background: rgba(blue, 0.5);
      }
    }
  }
</style>
