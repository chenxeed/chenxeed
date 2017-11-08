import { mount } from 'vue-test-utils'
import VueCounter from '../index.vue'
import { Subject } from 'rxjs'

describe('Test suite for VueCounter', () => {
  xit('Test initial value', done => {
    const vm = mount(VueCounter).vm
    const content = vm.$el.querySelector('div').textContent
    expect(vm.count).toBe(10)
    expect(content).toBe('Counter Count: 10 times')
    done()
  })

  it('Test add props', done => {
    const props = {
      countStart: 50,
      resetCounter: new Subject()
    }
    const wrapper = mount(VueCounter, {
      propsData: props
    })
    const vm = wrapper.vm
    const content = vm.$el.querySelector('div').textContent
    expect(vm.count).toBe(50)
    expect(content).toBe('Counter Count: 50 times')
    props.resetCounter.next(100)
    expect(vm.count).toBe(100)
    done()
  })

  xdescribe('Test the button', () => {
    const wrapper = mount(VueCounter)
    const buttons = wrapper.findAll('button')
    const incButton = buttons.at(0)
    const decButton = buttons.at(1)

    it('click increment button', () => {
      incButton.trigger('click')
      incButton.trigger('click')
      incButton.trigger('click')
      const content = wrapper.find('div > div').text()
      expect(wrapper.vm.count).toBe(40)
      expect(content).toBe('Counter Count: 40 times')
    })

    it('click decrement button', () => {
      decButton.trigger('click')
      decButton.trigger('click')
      const content = wrapper.find('div > div').text()
      expect(wrapper.vm.count).toBe(20)
      expect(content).toBe('Counter Count: 20 times')
    })
  })

  xdescribe('Test the multiplier', () => {
    const wrapper = mount(VueCounter)

    it('change the multiplier', () => {
      const multiplierInput = wrapper.find('input')
      multiplierInput.element.value = 50
      multiplierInput.trigger('input')
      expect(wrapper.vm.multiplier).toEqual(50)
      expect(multiplierInput.element.value).toBe('50')
    })

    it('change decrement and increment button value', () => {
      const buttons = wrapper.findAll('button')
      const incButton = buttons.at(0)
      const decButton = buttons.at(1)
      incButton.trigger('click')
      expect(wrapper.vm.count).toBe(60)
      decButton.trigger('click')
      expect(wrapper.vm.count).toBe(10)
    })
  })
})
