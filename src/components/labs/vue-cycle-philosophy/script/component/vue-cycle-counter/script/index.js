import { Observable, Subject, BehaviorSubject } from 'rxjs'
import { intent } from './app/intent'
import { model, initialState } from './app/model'

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

function subscribeViewData (state$, data) {
  state$.subscribe(({count, multiplier, action}) => {
    // The data needs to be mutated here because,
    // that's how vueJS update the templates. The data object
    // has Observer that check and update template whenever
    // the value is mutated
    data.count = count
    data.multiplier = multiplier
    data.action = action
  })
}

function subscribeEmitEvent (action, state$, $emit) {
  const {increment$, decrement$, count$} = action

  const updateCount$ = state$.map(state => state.count).distinctUntilChanged()
  const act$ = Observable.merge(increment$, decrement$, count$)
    .withLatestFrom(state$, (act, state) => state)
    .map(({action, multiplier}) => ({
      action,
      multiplier
    }))

  updateCount$.subscribe(value => $emit('update:count', value))
  act$.subscribe(value => $emit('update:act', value))
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
  computed: {
    counts () {
      return `${this.viewData.count}${this.viewData.count > 1 ? ' times' : ' time'}`
    },
    multiplier () {
      return this.viewData.multiplier
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
    const vm = this
    const action = intent(this.source)
    const state$ = model(action)
    // Side Effect
    subscribeViewData(state$, vm.viewData)
    subscribeEmitEvent(action, state$, vm.$emit.bind(this))
  },
  watch: {
    countStart (value) {
      this.source.props.countStart$.next(value)
    }
  }
}
