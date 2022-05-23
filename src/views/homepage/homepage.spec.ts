import Homepage from './homepage.vue'
import { mount, flushPromises } from '@vue/test-utils'
import * as getMovies from '@/api/get-movies'
import { getMoviesMock } from '@/api/__mocks__/get-movies'

vi.mock('@/api/get-movies')

describe('Homepage', () => {
  describe('Mount - with data', () => {
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
})
