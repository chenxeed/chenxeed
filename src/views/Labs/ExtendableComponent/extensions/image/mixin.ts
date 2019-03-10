import Vue from 'vue';
import ModalEditor from './modal-editor.vue';

export default Vue.extend({
  mounted() {
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

    (this.$refs.EditorImage as Vue[])[0].$on('add-image', (newImage: string) => {
      // addList are methods that comes from todo-vessel-app,
      // and it's accessed here as this mixin is added into
      // todo-vessel-app component
      // This can be typed more properly if the todo-vessel-app
      // component are written as vue class component.
      const newList = {
        type: 'ListImage',
        src: newImage
      };
      (this as any).addList(newList, null, true);
    });

    modalEditor.$on('update-image', ({id, imageUrl}: {id: string, imageUrl: string}) => {
      // modifyList are methods that comes from todo-vessel-app,
      // and it's accessed here as this mixin is added into
      // todo-vessel-app component
      // This can be typed more properly if the todo-vessel-app
      // component are written as vue class component.
      const update = {
        src: imageUrl
      };
      (this as any).modifyList(id, update, true);
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
