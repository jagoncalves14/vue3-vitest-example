import MovieList from './movie-list.vue'
import { mount, flushPromises } from '@vue/test-utils'
import { getMoviesMock } from '@/api/get-movies/__mocks__/get-movies'

vi.mock('@/api/get-movies/get-movies')

describe('MovieList', () => {
  describe('Snapshots', () => {
    it('should mount correctly - with data', async () => {
      const wrapper = mount(MovieList, {
        props: {
          movieList: getMoviesMock.results,
          activeMovieId: getMoviesMock.results[0].id,
        },
      })

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should mount correctly - with just one movie', async () => {
      const wrapper = mount(MovieList, {
        props: {
          movieList: [getMoviesMock.results[0]],
          activeMovieId: getMoviesMock.results[0].id,
        },
      })

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should mount correctly - without movies results', async () => {
      const wrapper = mount(MovieList, {
        props: {
          movieList: [],
          activeMovieId: 0,
        },
      })

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Computed', () => {
    describe('filteredMovies', () => {
      it('should return all movies when searchQuery is empty', () => {
        const context = {
          searchQuery: '',
          movieList: getMoviesMock.results,
        }

        const response = MovieList.computed?.filteredMovies.call(context)

        expect(response).toEqual(getMoviesMock.results)
      })

      it('should return empty array when searchQuery has no matches', () => {
        const context = {
          searchQuery: 'zzzzzzzzzzz',
          movieList: getMoviesMock.results,
        }

        const response = MovieList.computed?.filteredMovies.call(context)

        expect(response).toEqual([])
      })

      it('should return movies that match search query', () => {
        const context = {
          searchQuery: 'morbius',
          movieList: getMoviesMock.results,
        }

        const response = MovieList.computed?.filteredMovies.call(context)

        expect(response).toEqual([getMoviesMock.results[0]])
      })
    })

    describe('isActiveMovieOnFilteredList', () => {
      it('should return true when activeMovieId is present in movie list', () => {
        const context = {
          activeMovieId: 123,
          filteredMovies: getMoviesMock.results,
        }
        context.filteredMovies[0].id = 123

        const response = MovieList.computed?.isActiveMovieOnFilteredList.call(context)

        expect(response).toBe(true)
      })

      it('should return false when activeMovieId is NOT present in movie list', () => {
        const context = {
          activeMovieId: 0,
          filteredMovies: getMoviesMock.results,
        }

        const response = MovieList.computed?.isActiveMovieOnFilteredList.call(context)

        expect(response).toBe(false)
      })
    })
  })

  describe('Methods', () => {
    it('previewMovie', () => {
      const context = {
        $emit: vi.fn(),
      }

      MovieList.methods?.previewMovie.call(context, getMoviesMock.results[0])

      expect(context.$emit).toHaveBeenCalledWith('selected-movie', getMoviesMock.results[0].id)
    })

    describe('updateSearchQuery', () => {
      it('should change searchQuery to event target value when has value', () => {
        const context = {
          searchQuery: '',
        }

        const event = {
          target: {
            value: 'Morbius',
          },
        }

        // @ts-ignore
        MovieList.methods?.updateSearchQuery.call(context, event)

        expect(context.searchQuery).toBe('Morbius')
      })

      it('should change searchQuery to empty string when event target has NO value', () => {
        const context = {
          searchQuery: 'Morbius',
        }

        const event = {
          target: {},
        }

        // @ts-ignore
        MovieList.methods?.updateSearchQuery.call(context, event)

        expect(context.searchQuery).toBe('')
      })
    })
  })

  describe('Watch', () => {
    describe('filteredMovies', () => {
      it('should set first movie in list as previewMovie', () => {
        const context = {
          previewMovie: vi.fn(),
          isActiveMovieOnFilteredList: false,
        }

        // @ts-ignore
        MovieList.watch?.filteredMovies.handler.call(context, getMoviesMock.results)

        expect(context.previewMovie).toHaveBeenCalledWith(getMoviesMock.results[0])
      })

      it('should not change previewMovie when isActiveMovieOnFilteredList is true', () => {
        const context = {
          previewMovie: vi.fn(),
          isActiveMovieOnFilteredList: true,
        }

        // @ts-ignore
        MovieList.watch?.filteredMovies.handler.call(context, getMoviesMock.results)

        expect(context.previewMovie).not.toHaveBeenCalled()
      })

      it('should not change previewMovie when moviesList is an empty array', () => {
        const context = {
          previewMovie: vi.fn(),
          isActiveMovieOnFilteredList: false,
        }

        // @ts-ignore
        MovieList.watch?.filteredMovies.handler.call(context, [])

        expect(context.previewMovie).not.toHaveBeenCalled()
      })
    })
  })
})
