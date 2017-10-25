<template>
<div class="counter-wrapper">
  <div>This DIV is only used to render CycleJS App inside it</div>
</div>
</template>
<style scoped>
  .counter-wrapper {
    width: 250px;
    height: 200px;
    padding: 15px;
    border: 1px double grey;
    border-radius: 10px;
    color: grey;
  }
</style>

<script>
import { Observable, BehaviorSubject } from 'rxjs'
import { App, makeDriver } from './cycleCounterApp'
import { setAdapt } from '@cycle/run/lib/adapt'
import { run } from '@cycle/run'

// Cycle-Counter
// The proof concept of building Vue Component with pure CycleJS application,
// by using the Cycle.run library except domDriver for the template.
// The driver of the dom will be using vueDataDriver to mutate the vue data
// and it will automatically update the template.
// (vueDataDriver is initialized in cycleCounterApp.js)

export default {
  name: 'cycle-counter',
  props: {
    'countStart': Number
  },
  // The vue component "data()" is generally used for component state internally.
  // 
  // In this cycle-app inside vue component, I would recommend to
  // only create specific object here for the needs of storing the cycle instance
  // and props stream only, as the main component state will be
  // handled in the app model().
  // 
  // Create object "cycleDispose" to be filled in later on "created()"
  // and going to be used in "beforeDestroy()" to dispose the cycle app.
  // "propsStream" will be the proxy for the props value.
  data () {
    return {
      cycleDispose: () => {},
      propsStream: {
        countStart: new BehaviorSubject(this.countStart || 10)
      }
    }
  },
  // "watch" is meant to be the subscriber of the value in "data()" and
  // "props" so it can run a function when the value changed.
  // 
  // In this cycle-app inside vue component, I would recommend to
  // only use "watch" to watch the props value changed from the parent,
  // and send the changed value to the stream of props
  watch: {
    countStart (value) {
      this.propsStream.countStart.next(value)
    }
  },
  // "method" is meant to be the shared function in the vue component,
  // and basically used to trigger side effect of component (update data,
  // run AJAX, run DOM event, etc...)
  // 
  // In this cycle-philosophy-based-vue component, I would recommend
  // to not use methods as all the side effect will be handled by cycle drivers
  methods: {},
  // Initialization
  // Initiate CycleJS app when the DOM is ready,
  // which is when the vue component is "mounted"
  // and the DOM is rendered in `this.$el`
  mounted () {
    setAdapt(Observable.from)
    // Store the returned method from cycle run() to the shared object
    // created in data() so it can be disposed later.
    // Pass all the variable and methods from the vue component instance (this)
    // in the makeDriver(), so inside the cycle app, it's pure and doesn't
    // handle any "this" instance from vue component. Maximum Purity yo!
    this.cycleDispose = run(App, makeDriver({
      dom: this.$el.children[0],
      $emit: this.$emit.bind(this),
      propsStream: this.propsStream
    }))
  },
  // beforeDestroy() will run before the component is destroyed,
  // usually this happens when page changed and this component is not used anymore.
  beforeDestroy () {
    // Dispose the CycleJS app to remove all the listeners
    setAdapt(x => x)
    this.cycleDispose()
  }
}
</script>