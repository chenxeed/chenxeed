export function intent (source) {
  const count$ = source.props.select('countStart')
  const reset$ = source.props.select('resetCounter')
  const increment$ = source.DOM.clickIncrement$.mapTo(1)
  const decrement$ = source.DOM.clickDecrement$.mapTo(-1)
  const multiplier$ = source.DOM.changeMultiplier$.map(e => e.target.value)
  return {
    count$,
    reset$,
    increment$,
    decrement$,
    multiplier$
  }
}
