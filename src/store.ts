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
      },
      {
        title : 'TUI Image Editor',
        link : `/labs/tui-image-editor`,
        icon : 'image-filter'
      }
    ]
  },
  mutations: {

  },
  actions: {

  },
};

export default new Vuex.Store(store);
