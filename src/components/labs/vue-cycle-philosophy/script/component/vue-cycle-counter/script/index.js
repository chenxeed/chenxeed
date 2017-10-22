import { Observable, Subject, BehaviorSubject } from 'rxjs'

const initialState = {
  count: 0,
  multiplier: 5,
  action: 'start'
}

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

function intent (source) {
  const count$ = source.props.countStart$
  const increment$ = source.DOM.clickIncrement$.mapTo(1)
  const decrement$ = source.DOM.clickDecrement$.mapTo(-1)
  const multiplier$ = source.DOM.changeMultiplier$.map(e => e.target.value)
  return {
    count$,
    increment$,
    decrement$,
    multiplier$
  }
}

function model ({count$, increment$, decrement$, multiplier$}) {
  const reducerCount$ = count$.map(count => state => ({
    ...state,
    count
  }))
  const reducerIncCount$ = Observable
    .merge(increment$, decrement$)
    .map(num => state => ({
      ...state,
      count: state.count + num * state.multiplier
    }))
  const reducerMultiplier$ = multiplier$
    .map(multiplier => state => ({
      ...state,
      multiplier
    }))
  const reducerAction$ = Observable.merge(
    increment$.mapTo('increment'),
    decrement$.mapTo('decrement')
  ).map(action => state => ({
    ...state,
    action
  }))

  const reducer$ = Observable.merge(
    reducerCount$,
    reducerIncCount$,
    reducerMultiplier$,
    reducerAction$
  )
  const state$ = reducer$.startWith(initialState)
    .scan((acc, reducer) => reducer(acc))
    .publishReplay(1).refCount()
  return state$
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
  const {increment$, decrement$} = action

  const count$ = state$.map(state => state.count).distinctUntilChanged()
  const act$ = Observable.merge(increment$, decrement$)
    .withLatestFrom(state$, (act, state) => state)
    .map(({action, multiplier}) => ({
      action,
      multiplier
    }))

  count$.subscribe(value => $emit('update:count', value))
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
