<template>
<div class="counter-wrapper">
  <div>Render CycleJS App Here</div>
</div>
</template>
<style scoped>
  .counter-wrapper {
    width: 300px;
    height: 200px;
    padding: 15px;
    border: 1px double grey;
    border-radius: 10px;
    color: grey;
  }
</style>

<script>
import { Observable, Subject } from 'rxjs'
import { App, makeDriver } from './cycleCounterApp'
import { setAdapt } from '@cycle/run/lib/adapt'
import { run } from '@cycle/run'

export default {
  name: 'cycle-counter',
  props: {
    'countStart': Number
  },
  data () {
    return {
      cycleDispose: () => {},
      propsStream: {
        countStart: new Subject()
      }
    }
  },
  methods: {
    triggerCountStart$ (num) {
      this.propsStream.countStart.next(num)
    }
  },
  // Event Watcher
  watch: {
    countStart () {
      this.triggerCountStart$(this.countStart)
    }
  },
  // Initialization
  mounted () {
    //  Initiate CycleJS app when the DOM is ready,
    //  which is when the vue component is "mounted"
    //  and the DOM is rendered in `this.$el`
    setAdapt(Observable.from)
    this.cycleDispose = run(App, makeDriver({
      dom: this.$el.children[0],
      $emit: this.$emit.bind(this),
      propsStream: this.propsStream
    }))
    // Trigger the initial value by the props
    this.triggerCountStart$(this.countStart)
  },
  beforeDestroy () {
    // Dispose the CycleJS app to remove all the listeners
    setAdapt(x => x)
    this.cycleDispose()
  }
}

</script>