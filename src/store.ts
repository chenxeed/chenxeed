import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

// get the icon list on https://materialdesignicons.com/
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
        icon : 'folder-multiple'
      },
      {
        title : 'Transparent Wrapper',
        link : `/labs/transparent-wrapper-component`,
        icon : 'folder-multiple-outline'
      },
      {
        title : 'TUI Image Editor',
        link : `/labs/tui-image-editor`,
        icon : 'image-filter'
      },
      {
        title : 'Drag Drop Element',
        link : `/labs/drag-drop-element`,
        icon : 'arrow-all'
      },
      {
        title : 'Extendable Component',
        link : `/labs/extendable-component`,
        icon : 'arrow-all'
      }
    ]
  },
  mutations: {

  },
  actions: {

  },
};

export default new Vuex.Store(store);
