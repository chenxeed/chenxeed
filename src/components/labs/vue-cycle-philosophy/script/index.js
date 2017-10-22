import VueCounter from './component/vue-counter'
import CycleCounter from './component/cycle-counter'
import VueCycleCounter from './component/vue-cycle-counter'

export default {
  name: 'vue-cycle-philosophy',
  components: {
    VueCounter,
    CycleCounter,
    VueCycleCounter
  },
  data () {
    return {
      counterStart: 5678,
      vueCounterCount: 0,
      vueCounterAction: {action: 'start', multiplier: 0},
      cycleCounterCount: 0,
      cycleCounterAction: {action: 'start', num: 0}
    }
  },
  computed: {
    vueCounterMessage () {
      const count = this.vueCounterCount
      const act = this.vueCounterAction
      const actMessage = (({action, multiplier}) => {
        if (action === 'increment' || action === 'decrement') {
          return `Yes, it's ${action} by ${multiplier} to ${count}.`
        } else if (action === 'start') {
          return `Currently it start at ${count}.`
        }
      })(act)
      return `${actMessage}`
    },
    cycleCounterMessage () {
      const count = this.cycleCounterCount
      const act = this.cycleCounterAction
      const actMessage = (({action, multiplier}) => {
        if (action === 'increment' || action === 'decrement') {
          return `Also can! Now it's ${action} by ${multiplier} to ${count}.`
        } else if (action === 'start') {
          return `Currently it start at ${count}.`
        }
      })(act)
      return `${actMessage}`
    }
  },
  methods: {
    // State Reducer
    vueCounterChange (count) {
      this.vueCounterCount = count
    },
    vueCounterActionChange (action) {
      this.vueCounterAction = action
    },
    cycleCounterChange (count) {
      this.cycleCounterCount = count
    },
    cycleCounterActionChange (action) {
      this.cycleCounterAction = action
    }
  }
}
