<template>
  <div>
    <div>Add Text List</div>
    <div><textarea v-model="newText"/></div>
    <div><button @click="submit">Add</button></div>
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

export default {
  name: 'AddText',
  data: () => {
    return {
      newText: ''
    };
  },
  methods: {
    submit() {
      this.$parent.$emit('add-text', this.newText);
      this.newText = '';
    }
  }
};
</script>
