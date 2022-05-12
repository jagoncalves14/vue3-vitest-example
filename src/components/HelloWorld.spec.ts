// @ts-ignore
import HelloWorld from 'components/HelloWorld.vue';
import { mount } from '@vue/test-utils';

describe('Component: HelloWorld', () => {
  it('Mounts properly', () => {
    const wrapper = mount(HelloWorld);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Mounts properly - shallow mount', () => {
    const wrapper = mount(HelloWorld, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('mounted - updates hasMounted value', () => {
    const context = {
      hasMounted: false,
    };

    HelloWorld.mounted.call(context);

    expect(context.hasMounted).toBe(true);
  });
});
