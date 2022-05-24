import Homepage from './homepage.vue'
import { mount, flushPromises } from '@vue/test-utils'
import * as getMovies from '@/api/get-movies'
import { getMoviesMock } from '@/api/__mocks__/get-movies'
import { BASE_IMAGE_URL } from '@/constants'

vi.mock('@/api/get-movies')

describe('Homepage', () => {
  describe('Snapshots', () => {
    it('should mount correctly - with data', async () => {
      const wrapper = mount(Homepage)

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should mount correctly - with just one movie', async () => {
      const getMoviesSpy = vi.spyOn(getMovies, 'default')
      getMoviesSpy.mockImplementationOnce(() => {
        return Promise.resolve([getMoviesMock.results[0]])
      })

      const wrapper = mount(Homepage)

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should mount correctly - without movies results', async () => {
      const getMoviesSpy = vi.spyOn(getMovies, 'default')
      getMoviesSpy.mockImplementationOnce(() => {
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

      expect(getMoviesSpy).toHaveBeenCalled()
      expect(context.data).toEqual(getMoviesMock.results)
    })

    it('should populate data - with error', async () => {
      const context = {
        data: [],
        updateNotificationsTimer: vi.fn(),
      }

      const getMoviesSpy = vi.spyOn(getMovies, 'default')
      // @ts-ignore
      getMoviesSpy.mockImplementationOnce(() => {
        return Promise.reject('Some error')
      })

      try {
        await Homepage.mounted?.call(context)
      } catch (error) {
        expect(getMoviesSpy).toHaveBeenCalled()
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

    it('activeMovieId', () => {
      const context = {
        data: getMoviesMock.results,
        preview: {},
      }
      context.data[0].id = 123

      // @ts-ignore
      Homepage.watch?.activeMovieId?.handler.call(context, 123)

      expect(context.preview).toEqual({
        image: `${BASE_IMAGE_URL}${context.data[0].poster_path}`,
        title: context.data[0].title,
        overview: context.data[0].overview,
      })
    })
  })
})
