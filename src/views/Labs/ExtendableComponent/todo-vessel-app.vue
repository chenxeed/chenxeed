<template>
  <div class="columns">
    <div class="column">
      <div class="title is-1">Add New List</div>
      <template v-if="addComponents">
        <div
          v-for="component in addComponents"
          :key="component"
          class="box">
          <component
            :ref="component"
            :is="component"/>
        </div>
      </template>
    </div>
    <div class="column">
      <div class="title is-1">Lists</div>
      <div v-if="!lists.length">List are empty!</div>
      <div
        class="box"
        v-if="lists.length">
        <div class="media"
          v-for="list in lists"
          :key="list.id">
          <div class="media-left">
            <div class="tag is-light">Component: {{ list.type }}</div>
          </div>
          <div class="media-content">
            <component
              :ref="list.type"
              :is="list.type"
              :item="list"
              @dblclick.native="onDoubleClickList(list)" />
          </div>
          <div class="media-right">
            <button
              class="delete"
              @click="removeList(list.id)"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListComponent from './list-component/components';
import MixinList from './list-component/mixins';

export default {
  name: 'TodoVesselApp',
  mixins: [...MixinList],
  components: {
    ...ListComponent
  },
  data: () => {
    return {
      lists: []
    };
  },
  methods: {
    // public methods to be accessible by the list mixins
    addList(list) {
      const newList = {
        ...list,
        id: `${Math.round(Math.random() * 10000000)}`
      };
      this.lists.push(newList);
      this.$emit('list-added', newList);
    },
    modifyList(id, update) {
      const modifiedList = this.lists.find((list) => {
        return list.id === id;
      });
      const beforeModified = JSON.parse(JSON.stringify(modifiedList));
      Object.assign(modifiedList, update);
      this.$emit('list-modified', {
        before: beforeModified,
        after: modifiedList,
        change: update
      });
    },
    removeList(id) {
      const removedList = this.lists.find((list) => {
        return list.id === id;
      });
      this.lists.splice(this.lists.indexOf(removedList), 1);
      this.$emit('list-removed', removedList);
    },
    // event listeners
    onDoubleClickList(list) {
      this.$emit('list-dblclicked', list);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
