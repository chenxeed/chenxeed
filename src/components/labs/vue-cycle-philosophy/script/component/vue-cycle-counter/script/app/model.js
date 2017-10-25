import { Observable } from 'rxjs'

export const initialState = {
  count: 0,
  multiplier: 5,
  action: 'start'
}

export function model ({count$, increment$, decrement$, multiplier$}) {
  const reducerCount$ = count$.map(count => state => ({
    ...state,
    count,
    action: 'start'
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
      multiplier: multiplier
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
