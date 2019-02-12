import Vue from 'vue';

export default Vue.extend({
  created() {
    this.$on('add-image', (newImage: string) => {
      // addList are methods that comes from todo-vessel-app,
      // and it's accessed here as this mixin is added into
      // todo-vessel-app component
      // This can be typed more properly if the todo-vessel-app
      // component are written as vue class component.
      (this as any).addList({
        type: 'ListImage',
        src: newImage
      });
    });
  }
});
