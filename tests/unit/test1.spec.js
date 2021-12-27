import { mount } from '@vue/test-utils';
import Test1 from '@/views/Test1.vue';

// Add delay for render component
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Test1.vue', () => {
  it('Test rango 1 a 10', async () => {
    const wrapper = mount(Test1);
    await wrapper.vm.$nextTick();

    const input1 = wrapper.find('#input1');
    await input1.setValue(1);

    const input2 = wrapper.find('#input2');
    await input2.setValue(10);

    const button = wrapper.find('#button');
    await button.trigger('click');

    await delay(100);
    expect(wrapper.text()).toMatch(/2,[\s]+3,[\s]+5,[\s]+7/);
  });

  it('Test rango negativo', async () => {
    const wrapper = mount(Test1);
    await wrapper.vm.$nextTick();

    const input1 = wrapper.find('#input1');
    await input1.setValue(-1);

    const input2 = wrapper.find('#input2');
    await input2.setValue(10);

    const button = wrapper.find('#button');
    await button.trigger('click');

    await delay(100);
    expect(wrapper.text()).toContain('Debe ser un número mayor que 0');
  });
});
