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
              @click="removeList(list.id, true)"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListComponent from './extensions/components';
import MixinList from './extensions/mixins';

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
    addList(list, index = null, transactional = false) {
      const newList = {
        ...list,
        id: list.id || `${Math.round(Math.random() * 10000000)}`
      };
      if (index === null) {
        this.lists.push(newList);
      } else {
        this.lists.splice(index, 0, newList);
      }
      this.$emit('list-added', {
        newList,
        index,
        transactional
      });
    },
    modifyList(id, update, transactional = false) {
      const modifiedList = this.lists.find((list) => {
        return list.id === id;
      });
      const beforeModified = JSON.parse(JSON.stringify(modifiedList));
      Object.assign(modifiedList, update);
      const afterModified = JSON.parse(JSON.stringify(modifiedList));
      this.$emit('list-modified', {
        before: beforeModified,
        after: afterModified,
        change: update,
        transactional
      });
    },
    removeList(id, transactional = false) {
      const removedList = this.lists.find((list) => {
        return list.id === id;
      });
      const index = this.lists.indexOf(removedList);
      this.lists.splice(index, 1);
      this.$emit('list-removed', {
        removedList,
        index,
        transactional
      });
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
