import xs from 'xstream'
import { intent } from './intent'
import { model, initialState } from './model'
import { sink } from './sink'

export function VueCycleApp (source) {
  // connect the component source into intent to get the action
  const action = intent(source)
  // connect the action to model to get the state
  const state$ = model(action)
  // generate side effect sinks from action and state
  const {
    vueData$,
    vueEmit$
  } = sink(action, state$)

  return {
    vueData: xs.from(vueData$),
    vueEmit: xs.from(vueEmit$)
  }
}

export { initialState }
