import Vue from 'vue';
import ModalEditor from './modal-editor.vue';

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

    this.$on('update-image', ({id, imageUrl}: {id: string, imageUrl: string}) => {
      // modifyList are methods that comes from todo-vessel-app,
      // and it's accessed here as this mixin is added into
      // todo-vessel-app component
      // This can be typed more properly if the todo-vessel-app
      // component are written as vue class component.
      const update = {
        src: imageUrl
      };
      (this as any).modifyList(id, update);
    });

    // mount the modal editor component to be used later
    const mountPoint = document.createElement('div');
    mountPoint.id = 'image-modal-editor-mount-point';
    mountPoint.innerHTML = `<modal-editor ref="modalEditor"/>`;
    document.body.appendChild(mountPoint);

    const vm = new Vue({
      el: mountPoint,
      render: (h) => {
        return h(ModalEditor, {
          ref: 'modalEditor'
        });
      }
    });

    const modalEditor = vm.$refs.modalEditor as Vue;
    modalEditor.$on('update-image', (params: any) => {
      this.$emit('update-image', params);
    });
    this.$on('list-dblclicked', (list: any) => {
      // the refs EditorImage is an array because the component
      // is mounted inside v-for
      if (list.type === 'ListImage') {
        modalEditor.$emit('edit-image', {
          id: list.id,
          imageUrl: list.src
        });
      }
    });
  }
});
