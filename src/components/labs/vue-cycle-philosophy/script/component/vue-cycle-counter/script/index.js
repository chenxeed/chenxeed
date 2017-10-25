import { Subject, BehaviorSubject } from 'rxjs'
import xs from 'xstream'
import { intent } from './app/intent'
import { model, initialState } from './app/model'
import { sink } from './app/sink'
import { makeVueDataDriver, makeVueEmitDriver } from '../../../makeVueDriver'

function sources ({countStart}) {
  const props = {
    countStart$: new BehaviorSubject(countStart)
  }
  const DOM = {
    clickIncrement$: new Subject(),
    clickDecrement$: new Subject(),
    changeMultiplier$: new Subject()
  }

  return {
    props,
    DOM
  }
}

export default {
  name: 'vue-cycle-counter',
  props: {
    'countStart': Number
  },
  data () {
    return {
      source: sources({countStart: this.countStart}),
      viewData: initialState
    }
  },
  watch: {
    countStart (value) {
      this.source.props.countStart$.next(value)
    }
  },
  computed: {
    counts () {
      return `${this.viewData.count}${this.viewData.count > 1 ? ' times' : ' time'}`
    }
  },
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
  created () {
    // get object of data for view and $emit function from vueComponent instance
    const { viewData, $emit } = this
    // connect the component source into intent to get the action
    const action = intent(this.source)
    // connect the action to model to get the state
    const state$ = model(action)
    // generate side effect sinks from action and state
    const {
      vueData$,
      emitEvent$
    } = sink(action, state$)
    // connect to driver to run the side effects
    makeVueDataDriver(viewData)(xs.from(vueData$))
    makeVueEmitDriver($emit.bind(this))(xs.from(emitEvent$))
  }
}
