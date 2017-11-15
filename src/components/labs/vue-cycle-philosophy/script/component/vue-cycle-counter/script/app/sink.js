import { Observable } from 'rxjs'

export function sink (action, state$) {
  // sink for vueData driver
  const vueData$ = state$

  // sink for emitEvent driver
  const {increment$, decrement$, count$} = action
  const updateCount$ = state$.map(state => state.count).distinctUntilChanged()
  const act$ = Observable.merge(increment$, decrement$, count$)
    .withLatestFrom(state$, (act, state) => state)
    .map(({action, multiplier}) => ({
      action,
      multiplier
    }))
  const vueEmit$ = Observable.merge(
    updateCount$.map(value => ({event: 'update:count', value})),
    act$.map(value => ({event: 'update:act', value}))
  )

  return {
    vueData$,
    vueEmit$
  }
}
