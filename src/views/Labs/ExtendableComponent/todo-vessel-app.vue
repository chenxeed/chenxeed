<template>
  <div>
    <div>
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
    <div>
      <ul>
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
      this.lists.push({
        ...list,
        id: `${Math.round(Math.random() * 10000000)}`
      });
    },
    removeList(id) {
      this.lists = this.lists.filter((list) => {
        return list.id !== id;
      });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
