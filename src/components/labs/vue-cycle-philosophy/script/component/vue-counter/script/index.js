export default {
  name: 'vue-counter',
  // Props value passed from parent
  // Note: Using same props name with data() will bind the value
  props: {
    'countStart': Number
  },
  // State of the component
  data () {
    return {
      count: this.countStart || 10,
      multiplier: 10,
      action: 'start'
    }
  },
  // Use computed as the view model to transform the data value for view purpose
  // Hint: Do not use computed name that's same with data,
  // since the view will get the value from data instead.
  computed: {
    counts () {
      return `${this.count}${this.count > 1 ? ' times' : ' time'}`
    }
  },
  // Component Actions, also the source of side effects
  methods: {
    // DOM Event
    clickIncrement () {
      this.incCount(1)
      this.updateAction('increment')
      this.emitAction()
    },
    clickDecrement () {
      this.incCount(-1)
      this.updateAction('decrement')
      this.emitAction()
    },
    changeMultiplier (e) {
      const value = parseInt(e.target.value)
      this.updateMultiplier(value)
    },
    // State Reducer
    updateCount (num) {
      this.count = num
    },
    incCount (num) {
      this.count += num * this.multiplier
    },
    updateMultiplier (num) {
      this.multiplier = num
    },
    updateAction (action) {
      this.action = action
    },
    // Event Emitter
    emitCount () {
      this.$emit('update:count', this.count)
    },
    emitAction () {
      this.$emit('update:act', {
        action: this.action,
        multiplier: this.multiplier
      })
    }
  },
  // Event Watcher
  created () {
    // Emit initial data to its observer
    // PS: I wish this automatically run on watch T_T
    this.emitCount()
    this.emitAction()
  },
  watch: {
    countStart () {
      this.updateCount(this.countStart)
      this.updateAction('start')
      this.emitAction()
    },
    count () {
      this.emitCount()
    }
  }
}
