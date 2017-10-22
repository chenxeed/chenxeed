import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Load the component with lazy-loading method,
// this will make the component only loads when it's needed
const Home = () => import('@/components/Home')
const Hello = () => import('@/components/Hello')
const Labs = () => import('@/components/Labs')
const VueSplitFiles = () => import('@/components/labs/vue-split-files')
const VueCyclePhilosophy = () => import('@/components/labs/vue-cycle-philosophy')

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/hello',
      component: Hello
    },
    {
      path: '/labs',
      component: Labs,
      children: [
        {
          path: 'vue-split-files',
          component: VueSplitFiles
        },
        {
          path: 'vue-cycle-philosophy',
          component: VueCyclePhilosophy
        }
      ]
    }
  ]
})
