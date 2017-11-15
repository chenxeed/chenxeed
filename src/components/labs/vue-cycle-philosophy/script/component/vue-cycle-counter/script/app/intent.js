export function intent (source) {
  const count$ = source.vueProps.select('countStart')
  const reset$ = source.vueProps.select('resetCounter')
  const increment$ = source.vueEvent.select('clickIncrement').mapTo(1)
  const decrement$ = source.vueEvent.select('clickDecrement').mapTo(-1)
  const multiplier$ = source.vueEvent.select('changeMultiplier').map(e => e.target.value)
  return {
    count$,
    reset$,
    increment$,
    decrement$,
    multiplier$
  }
}
