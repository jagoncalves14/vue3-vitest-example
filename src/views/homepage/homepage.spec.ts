import Homepage from './homepage.vue'
import { mount } from '@vue/test-utils'

describe('Homepage', () => {
  describe('Mount', () => {
    it('should mount correctly', () => {
      const wrapper = mount(Homepage)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
