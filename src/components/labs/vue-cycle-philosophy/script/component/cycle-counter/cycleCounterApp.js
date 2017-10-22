import xs from 'xstream'
import { Observable } from 'rxjs'
import { makeDOMDriver, div, h3, button, p, label, input } from '@cycle/dom'
import { makeVueEmitDriver, makeVuePropsDriver } from './makeVueDriver'

export function App (source) {
  // intent
  const clickIncrement$ = source.DOM.select('.increment')
    .events('click')
  const clickDecrement$ = source.DOM.select('.decrement')
    .events('click')
  const changeMultiplier$ = source.DOM.select('.multiplier')
    .events('change')
  const changeCountStart$ = source.vueProps.select('countStart')
  // action
  const increment$ = clickIncrement$.mapTo(1).share()
  const decrement$ = clickDecrement$.mapTo(-1).share()
  const multiplier$ = changeMultiplier$.map(e => e.target.value).share()
  // model
  const initialState = {
    count: 10,
    multiplier: 1,
    action: 'start'
  }
  const reducerCount$ = changeCountStart$.map(count => state => ({
    ...state,
    count
  }))
  const reducerIncCount$ = Observable.merge(increment$, decrement$).map(num => state => ({
    ...state,
    count: state.count + num * state.multiplier
  }))
  const reducerMultiplier$ = multiplier$
    .map(num => state => ({
      ...state,
      multiplier: num
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

  // published events
  const count$ = state$.map(state => state.count).distinctUntilChanged()
  const act$ = Observable.merge(increment$, decrement$)
    .withLatestFrom(state$, (act, state) => state)
    .map(({action, multiplier}) => ({
      action,
      multiplier
    }))
  const vueEmit$ = Observable.of({
    'update:count': xs.from(count$),
    'update:act': xs.from(act$)
  })

  const view$ = state$.map(view)
  return {
    DOM: xs.from(view$),
    vueEmit: xs.from(vueEmit$)
  }
}

function view ({count, multiplier} = {}) {
  const countTime = count > 1 ? 'times' : 'time'
  return div([
    h3('Cycle Counter'),
    p([
      label(String(`Counter Count: ${count} ${countTime}`))
    ]),
    button('.increment', '(+)'),
    button('.decrement', '(-)'),
    label(String(` by `)),
    input('.multiplier', {attrs: {type: 'number', value: multiplier}}),
    label(String(` times.`))
  ])
}

export function makeDriver ({dom, $emit, propsStream}) {
  return {
    DOM: makeDOMDriver(dom),
    vueEmit: makeVueEmitDriver($emit),
    vueProps: makeVuePropsDriver(propsStream)
  }
}
