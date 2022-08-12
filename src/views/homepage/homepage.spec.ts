import Homepage from './homepage.vue'
import { mount, flushPromises } from '@vue/test-utils'
import getMovies from '@/api/get-movies/get-movies'
import { getMoviesMock } from '@/api/get-movies/__mocks__/get-movies'
import getMovieDetail from '@/api/get-movie-detail/get-movie-detail'
import { BASE_IMAGE_URL } from '@/constants'

vi.mock('@/api/get-movies/get-movies')
vi.mock('@/api/get-movie-detail/get-movie-detail')

describe('Homepage', () => {
  describe('Snapshots', () => {
    it('should mount correctly - with data', async () => {
      const wrapper = mount(Homepage)

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should mount correctly - with just one movie', async () => {
      // @ts-ignore
      getMovies.mockImplementationOnce(() => {
        return Promise.resolve([getMoviesMock.results[0]])
      })

      const wrapper = mount(Homepage)

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should mount correctly - without movies results', async () => {
      // @ts-ignore
      getMovies.mockImplementationOnce(() => {
        return Promise.resolve([])
      })

      const wrapper = mount(Homepage)

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Mounted', () => {
    it('should populate data - with success', async () => {
      const context = {
        data: [],
        updateNotificationsTimer: vi.fn(),
      }

      const getMoviesSpy = vi.spyOn(getMovies, 'default')

      await Homepage.mounted?.call(context)

      expect(getMovies).toHaveBeenCalled()
      expect(context.data).toEqual(getMoviesMock.results)
    })

    it('should populate data - with error', async () => {
      const context = {
        data: [],
        updateNotificationsTimer: vi.fn(),
      }
      
      // @ts-ignore
      getMovies.mockImplementationOnce(() => {
        return Promise.reject({
          error: 'Some error',
        })
      })

      try {
        await Homepage.mounted?.call(context)
      } catch (_error) {
        expect(getMovies).toHaveBeenCalled()
        expect(context.data).toEqual([])
      }
    })
  })

  describe('Methods', () => {
    it('setActiveMovie', () => {
      const context = {
        activeMovieId: 0,
      }

      Homepage.methods?.setActiveMovie.call(context, 123)

      expect(context.activeMovieId).toBe(123)
    })

    it('updateNotificationsTimer', async () => {
      vi.useFakeTimers()

      const context = {
        timer: 0,
      }

      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

      Homepage.methods?.updateNotificationsTimer.call(context)

      vi.runAllTimers()

      expect(clearTimeoutSpy).toBeCalled()
      expect(context.timer).toBe(100000)

      vi.useRealTimers()
    })
  })

  describe('Watch', () => {
    describe('data', () => {
      it('should call setActiveMovieId when has results', () => {
        const context = {
          setActiveMovie: vi.fn(),
        }

        // @ts-ignore
        Homepage.watch?.data?.handler.call(context, getMoviesMock.results)

        expect(context.setActiveMovie).toBeCalledWith(getMoviesMock.results[0].id)
      })

      it('should NOT call setActiveMovieId when has no results', () => {
        const context = {
          setActiveMovie: vi.fn(),
        }

        // @ts-ignore
        Homepage.watch?.data?.handler.call(context, [])

        expect(context.setActiveMovie).not.toHaveBeenCalled()
      })
    })

    describe('activeMovieId', async () => {
      it('should update preview succesfully', async () => {
        const context = {
          data: getMoviesMock.results,
          preview: {},
        }
        context.data[0].id = 123

        // @ts-ignore
        await Homepage.watch?.activeMovieId?.handler.call(context, 123)

        expect(getMovieDetail).toHaveBeenCalledWith(123)
        expect(context.preview).toEqual({
          image: `${BASE_IMAGE_URL}${context.data[0].poster_path}`,
          title: context.data[0].title,
          overview: context.data[0].overview,
          budget: '70,000,000.00',
        })
      })

      it('should not do anything when API gives error', async () => {
        const context = {
          data: getMoviesMock.results,
          preview: {},
        }
        context.data[0].id = 123

        // @ts-ignore
        getMovieDetail.mockImplementationOnce(() =>
          Promise.reject({
            error: 'Some error',
          })
        )

        try {
          // @ts-ignore
          await Homepage.watch?.activeMovieId?.handler.call(context, 123)
        } catch (_error) {
          expect(getMovieDetail).toHaveBeenCalledWith(123)
          expect(context.preview).toEqual({})
        }
      })
    })
  })
})
