<template>
  <div>
    <div>Add Image</div>
    <div><input type="text" v-model="newImage"/></div>
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
  name: 'AddImage',
  data: () => {
    return {
      newImage: ''
    };
  },
  methods: {
    submit() {
      this.$parent.$emit('add-image', this.newImage);
      this.newImage = '';
    }
  }
};
</script>
