import { Subject, BehaviorSubject } from 'rxjs'
import xs from 'xstream'
import { intent } from './app/intent'
import { model, initialState } from './app/model'
import { sink } from './app/sink'
import { makeVueDataDriver, makeVueEmitDriver, makeVuePropsDriver } from '../../../makeVueDriver'

function makeSource ({countStart, viewData, $emit}) {
  const props = makeVuePropsDriver({
    countStart: new BehaviorSubject(countStart)
  })()
  const DOM = {
    clickIncrement$: new Subject(),
    clickDecrement$: new Subject(),
    changeMultiplier$: new Subject()
  }

  const vueData$ = new Subject()
  const vueData = makeVueDataDriver(viewData)(xs.from(vueData$))

  const emitEvent$ = new Subject()
  const emitEvent = makeVueEmitDriver($emit)(xs.from(emitEvent$))

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
  props: {
    'countStart': Number
  },
  data () {
    return {
      source: {},
      viewData: initialState
    }
  },
  watch: {
    countStart (value) {
      this.source.props.select('countStart').next(value)
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
