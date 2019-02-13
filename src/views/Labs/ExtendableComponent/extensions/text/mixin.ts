import Vue from 'vue';

export default Vue.extend({
  created() {
    this.$on('add-text', (newText: string) => {
      // addList are methods that comes from todo-vessel-app,
      // and it's accessed here as this mixin is added into
      // todo-vessel-app component
      // This can be typed more properly if the todo-vessel-app
      // component are written as vue class component.
      const newList = {
        type: 'ListText',
        content: newText
      };
      (this as any).addList(newList, true);
    });

    this.$on('update-text', ({id, text}: {id: string, text: string}) => {
      // modifyList are methods that comes from todo-vessel-app,
      // and it's accessed here as this mixin is added into
      // todo-vessel-app component
      // This can be typed more properly if the todo-vessel-app
      // component are written as vue class component.
      const update = {
        content: text
      };
      (this as any).modifyList(id, update, true);
    });

    this.$on('list-dblclicked', (list: any) => {
      // the refs EditorText is an array because the component
      // is mounted inside v-for
      if (list.type === 'ListText') {
        const EditorText = (this.$refs.EditorText as Vue[])[0];
        EditorText.$emit('edit-text', {
          id: list.id,
          text: list.content
        });
      }
    });
  }
});
