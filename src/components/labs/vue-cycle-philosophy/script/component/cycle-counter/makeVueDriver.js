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
