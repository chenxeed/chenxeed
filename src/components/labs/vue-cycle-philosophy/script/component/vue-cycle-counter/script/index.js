import { Subject, BehaviorSubject } from 'rxjs'
import xs from 'xstream'
import { intent } from './app/intent'
import { model, initialState } from './app/model'
import { sink } from './app/sink'
import { makeVueDataDriver, makeVueEmitDriver, makeVuePropsDriver } from '../../../makeVueDriver'

// Vue-Cycle-Counter
// The proof concept of building Vue Component with Cycle Philosophy,
// without the need of using Cycle.run library and the domDriver for the template.
// The driver of the dom will be using vueDataDriver to mutate the vue data
// and it will automatically update the template.

// Initialize the proxy streams of the source needed for the app flows,
// which also initialize the cycle drivers to generate the source needed
function makeSource ({countStart, viewData, $emit}) {
  // Use vue props driver to create the proxy streams to connect the component
  // props to app intent.
  // The props will be connected on the component "watch".
  // To get the initial value of the props, pass the initial value on
  // run function makeSource() in "created()"
  const props = makeVuePropsDriver({
    countStart: new BehaviorSubject(countStart)
  })()

  // Create each DOM event streams proxy to connect the DOM event from vue template.
  // The streams will be connected on the component "methods".
  const DOM = {
    clickIncrement$: new Subject(),
    clickDecrement$: new Subject(),
    changeMultiplier$: new Subject()
  }

  // Initialize the vueDataDriver by passing the viewData,
  // which is the object viewData from vue "data()".
  // vueDataDriver job is to run the side effect of manipulating vue data object,
  // based on the object passed from the sink.
  const vueData$ = new Subject()
  const vueData = makeVueDataDriver(viewData)(xs.from(vueData$))

  // Initialize the vueEmitDriver by passing the $emit,
  // which is the vue component "this.$emit" method to trigger emit event.
  // vueEmitDriver job is to run the side effect of running "$emit" to trigger
  // the emit event based on the key and stream passed from the sink.
  const emitEvent$ = new Subject()
  const emitEvent = makeVueEmitDriver($emit)(xs.from(emitEvent$))

  // Split the returned value to source and proxy, to differentiate
  // between the object of source for intent(), and object of proxy
  // for triggering the side effect from sink().
  return {
    source: {
      props,
      DOM,
      vueData,
      emitEvent
    },
    proxy: {
      vueData$,
      emitEvent$
    }
  }
}

export default {
  name: 'vue-cycle-counter',
  // the props retrieved from parent
  props: {
    'countStart': Number
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
      source: {},
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
      this.source.DOM.clickIncrement$.next(e)
    },
    clickDecrement (e) {
      this.source.DOM.clickDecrement$.next(e)
    },
    changeMultiplier (e) {
      this.source.DOM.changeMultiplier$.next(e)
    }
  },
  // The initialization of the Component streams starts here,
  // The process basically is:
  // 1. Initialize source
  // 2. Connect source to intent to generate action
  // 3. Connect action to model to generate state
  // 4. Connect action and state to generate sink
  // 5. Connect sink to drivers to trigger the side effects
  // 
  // Looks familiar? Yes that's usually how we do it in every cycle app :)
  created () {
    // initialize source
    const { source, proxy } = makeSource({
      countStart: this.countStart,
      viewData: this.viewData,
      $emit: this.$emit.bind(this)
    })
    this.source = source
    // connect the component source into intent to get the action
    const action = intent(this.source)
    // connect the action to model to get the state
    const state$ = model(action)
    // generate side effect sinks from action and state
    const {
      vueData$,
      emitEvent$
    } = sink(action, state$)
    // connect to driver proxy to run the side effects
    vueData$.subscribe(proxy.vueData$)
    emitEvent$.subscribe(proxy.emitEvent$)
  }
}
