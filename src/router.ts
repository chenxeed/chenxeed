import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/labs',
      name: 'labs',
      component: () => import('./views/Labs/index.vue'),
      children: [
        {
          path: 'alien-invasion',
          name: 'alien-invasion',
          component: () => import('./views/Labs/AlienInvasion/index.vue')
        }
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 200);
    });
  }
});
