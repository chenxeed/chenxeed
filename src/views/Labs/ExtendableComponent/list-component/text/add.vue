<template>
  <div>
    <div class="field">
      <label class="label">Add Text List</label>
      <div class="control">
        <textarea
          class="textarea"
          rows="1"
          v-model="newText"/>
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
