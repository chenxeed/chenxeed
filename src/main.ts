import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// we use bulma as our CSS framework
// https://bulma.io
import 'bulma/css/bulma.css';
// we load icons from materialdesignicons
// https://materialdesignicons.com
import 'mdi/css/materialdesignicons.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
