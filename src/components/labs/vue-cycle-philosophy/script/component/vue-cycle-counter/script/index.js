import { Subject, BehaviorSubject } from 'rxjs'
import { VueCycleApp, initialState } from './app'
import run from '@cycle/rxjs-run'
import { makeVueDataDriver, makeVueEmitDriver, makeVuePropsDriver, makeVueEventDriver } from '../../../makeVueDriver'

// Vue-Cycle-Counter
// The proof concept of building Vue Component with Cycle Philosophy,
// by using Cycle.run library to organize the stream.
// The driver of the dom will be using vueDataDriver to mutate the vue data
// and it will automatically update the template.

export default {
  name: 'vue-cycle-counter',
  // Props value passed from parent
  // Note: Using same props name with data() will bind the value
  props: {
    'countStart': {
      type: Number,
      default: 10
    },
    'resetCounter': {
      type: Subject,
      default: () => new Subject()
    }
  },
  // The vue component "data()" is generally used for component state internally.
  // 
  // In this cycle-philosophy-based-vue component, I would recommend to
  // only create specific object here for the needs of connecting the
  // cycle source and viewData only, as the main component state will be
  // handled in the app model().
  // 
  // Create object "source" to be filled in later on "created()"
  // and create "viewData" to group the object used on the template.
  // (It's recommended to group the view object to avoid keyname conflict
  // with the reserved keyname like "source", and any future new keys)
  data () {
    return {
      source: {
        event: {
          clickIncrement: new Subject(),
          clickDecrement: new Subject(),
          changeMultiplier: new Subject()
        }
      },
      // initialState is needed to be passed to the data(),
      // as vue component will convert the object passed here
      // into their observable object.
      viewData: initialState
    }
  },
  // "watch" is meant to be the subscriber of the value in "data()" and
  // "props" so it can run a function when the value changed.
  // 
  // In this cycle-philosophy-based-vue component, I would recommend to
  // only use "watch" to watch the props value changed from the parent,
  // and connect the changed value to the props streams in source.
  watch: {
    countStart (value) {
      this.source.props.select('countStart').next(value)
    }
  },
  // "computed" is meant to be the getter and setter for the data().
  // 
  // In this cycle-philosophy-based-vue component, I would recommend
  // computed to be ONLY USED FOR the getter of the viewData, since the setter
  // is already defined in the app model().
  // You can think of "computed" as "viewModel", to transform the raw value
  // of viewData into more informative value for the template.
  computed: {
    counts () {
      return `${this.viewData.count}${this.viewData.count > 1 ? ' times' : ' time'}`
    }
  },
  // "method" is meant to be the shared function in the vue component,
  // and basically used to trigger side effect of component (update data,
  // run AJAX, run DOM event, etc...)
  // 
  // In this cycle-philosophy-based-vue component, I would recommend
  // method to be ONLY USED FOR run DOM event, mapped from the template.
  // And the DOM event should directly trigger the source DOM streams
  // to be processed in the intent().
  // 
  // Should not run any other side effect in methods, as the side effect
  // should be handled by driver, as per cycle philosophy that logic and
  // side effect must be separated.
  methods: {
    clickIncrement (e) {
      this.source.event.clickIncrement.next(e)
    },
    clickDecrement (e) {
      this.source.event.clickDecrement.next(e)
    },
    changeMultiplier (e) {
      this.source.event.changeMultiplier.next(e)
    }
  },
  // The initialization of the Component streams starts here,
  // The process inside the VueCycleApp basically is:
  // 1. Initialize source
  // 2. Connect source to intent to generate action
  // 3. Connect action to model to generate state
  // 4. Connect action and state to generate sink
  // 5. Connect sink to drivers to trigger the side effects
  // 
  // Looks familiar? Yes that's usually how we do it in every cycle app :)
  created () {
    // Initialize the cycle drivers to generate the source needed
    const drivers = {
      vueEvent: makeVueEventDriver(this.source.event),
      vueData: makeVueDataDriver(this.viewData),
      vueProps: makeVuePropsDriver({
        countStart: new BehaviorSubject(this.countStart),
        resetCounter: this.resetCounter
      }),
      vueEmit: makeVueEmitDriver(this.$emit.bind(this))
    }
    // Shamelessly run the Cycle App!
    run(VueCycleApp, drivers)
  }
}
