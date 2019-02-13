<template>
  <div>
    <div class="field">
      <label class="label">Add Image</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Insert your image URL here"
          v-model="newImage"/>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-primary"
          @click="submit">Add</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditorImage',
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
