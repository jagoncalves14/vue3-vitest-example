import About from './about.vue'
import { mount } from '@vue/test-utils'

describe('About', () => {
  describe('Snapshots', () => {
    beforeAll(() => {
      vi.useFakeTimers()
      vi.setSystemTime('2022-05-25')
    })

    afterAll(() => {
      vi.useRealTimers()
    })

    it('should mount correctly', () => {
      const wrapper = mount(About)

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    beforeAll(() => {
      vi.useFakeTimers()
      vi.setSystemTime('2022-05-25')
    })

    afterAll(() => {
      vi.useRealTimers()
    })

    it('eventDate', () => {
      const context = {
        activeMovieId: 0,
      }

      const response = About.methods?.eventDate.call(context)

      expect(response).toBe('5/25/2022')
    })
  })

  describe('Computed', () => {
    it('location', () => {
      const response = About.computed?.location.call({})
      
      expect(response).toBe('Lisboa')
    })
  })
})
