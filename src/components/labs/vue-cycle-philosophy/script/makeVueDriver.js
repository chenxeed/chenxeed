export function makeVueEmitDriver ($emit) {
  return function vueEmitDriver (sink$) {
    sink$.addListener({
      next: emitEvents => {
        const events = Object.keys(emitEvents)
        events.forEach(event => {
          emitEvents[event].addListener({
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
  return function vuePropsDriver () {
    return {
      select: function (prop) {
        return propsStream[prop]
      }
    }
  }
}

export function makeVueDataDriver (vueData) {
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
