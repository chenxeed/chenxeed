import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

const store: StoreOptions<TGlobalStore.IState> = {
  state: {
    labsLists : [
      {
        title : 'Alien Invasion',
        link : '/labs/alien-invasion',
        icon : 'xbox-controller'
      },
      {
        title : 'Nested Components',
        link : `/labs/nested-component`,
        icon : 'xbox-controller'
      }
    ]
  },
  mutations: {

  },
  actions: {

  },
};

export default new Vuex.Store(store);
