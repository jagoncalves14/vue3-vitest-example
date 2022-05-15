import { mount } from '@vue/test-utils'
import QuantityComponent from './quantity-component.vue'

describe('QuantityComponent', () => {
  describe('Mount', () => {
    it('should mount correctly', () => {
      const wrapper = mount(QuantityComponent)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
