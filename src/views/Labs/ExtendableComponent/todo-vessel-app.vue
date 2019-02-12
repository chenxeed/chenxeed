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
            :is="component"
            v-on="$listeners"/>
        </div>
      </template>
    </div>
    <div class="column">
      <div class="title is-1">Lists</div>
      <div v-if="!lists.length">List are empty!</div>
      <ul v-if="lists.length">
        <li
          v-for="list in lists"
          :key="list.id">
          <div class="box">
            <div class="tag is-light">Component: {{ list.type }}</div>
            <button class="delete" @click="removeList(list.id)"></button>
            <component :is="list.type" :item="list" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


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
    addList(list) {
      const newList = {
        ...list,
        id: `${Math.round(Math.random() * 10000000)}`
      };
      this.lists.push(newList);
      this.$emit('list-added', newList);
    },
    removeList(id) {
      const removedList = this.lists.find((list) => {
        return list.id === id;
      });
      this.lists.splice(this.lists.indexOf(removedList), 1);
      this.$emit('list-removed', removedList);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
