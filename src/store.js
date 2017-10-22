import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Essential State for the global app
const state = {
  pageTitle: 'Home'
}

const mutations = {
  updatePageTitle (state, { title }) {
    state.pageTitle = title
  }
}

export default new Vuex.Store({
  state,
  mutations
})
