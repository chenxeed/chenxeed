import xs from 'xstream'
import { adapt } from '@cycle/run/lib/adapt'

export function makeVueEmitDriver ($emit) {
  // vueEmitDriver job is to run the side effect of running "$emit" to trigger
  // the emit event based on the key and stream passed from the sink.
  return function vueEmitDriver (sink$) {
    sink$.addListener({
      next: emitEvents => {
        const events = Object.keys(emitEvents)
        events.forEach(event => {
          xs.from(emitEvents[event]).addListener({
            next: value => {
              $emit(event, value)
            },
            error: console.error,
            completed: console.warn
          })
        })
      },
      error: console.error,
      completed: console.warn
    })
  }
}

export function makeVuePropsDriver (propsStream) {
  // Use vue props driver to connect the stream from propsStream to app intent.
  // The propsStream must give specific key as it will be used on function select()
  // Ex:
  // 
  // propsStream = {
  //   myname : new Subject
  // }
  // 
  // const myname$ = vueProps.select('myname')
  // 
  return function vuePropsDriver () {
    return {
      select: function (prop) {
        return adapt(propsStream[prop])
      }
    }
  }
}

export function makeVueDataDriver (vueData) {
  // vueDataDriver job is to run the side effect of manipulating vue data object,
  // based on the object passed from the sink.
  return function vueDataDriver (sink$) {
    sink$.addListener({
      next: state => {
        // The data needs to be mutated here because,
        // that's how vueJS update the templates. The data object
        // has Observer that check and update template whenever
        // the value is mutated
        Object.keys(state).forEach(key => {
          vueData[key] = state[key]
        })
      },
      error: console.error,
      completed: console.warn
    })
  }
}
