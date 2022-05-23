import MoviePreview from './movie-preview.vue'
import { mount } from '@vue/test-utils'

describe('MoviePreview', () => {
  describe.skip('Snapshots', () => {
    it('should mount correctly - with data state', () => {
      const wrapper = mount(MoviePreview, {
        props: {
          title: 'The Batman',
          image: 'https://image.tmdb.org/t/p/tlZpSxYuBRoVJBOpUrPdQe9FmFq.jpg',
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should mount correctly - loading state', () => {
      const wrapper = mount(MoviePreview, {
        props: {
          title: '',
          image: '',
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
