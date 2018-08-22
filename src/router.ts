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
        },
        {
          path: 'nested-component',
          name: 'nested-component',
          component: () => import('./views/Labs/NestedComponent/index.vue')
        },
        {
          path: 'tui-image-editor',
          name: 'tui-image-editor',
          component: () => import('./views/Labs/TuiImageEditor/index.vue')
        },
        {
          path: 'drag-drop-element',
          name: 'drag-drop-element',
          component: () => import('./views/Labs/DragDropElement/index.vue')
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
