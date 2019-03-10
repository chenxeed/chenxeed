<template>
  <div>
    <div class="field">
      <label class="label">{{ textLabel }}</label>
      <div class="control">
        <textarea
          class="textarea"
          rows="1"
          v-model="newText"/>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-primary"
          @click="submit">{{ submitButtonText }}</button>
      </div>
      <div class="control">
        <button
          v-if="id"
          class="button is-secondary"
          @click="cancelEdit">Cancel Editing</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditorText',
  data: () => {
    return {
      id: '',
      newText: ''
    };
  },
  computed: {
    textLabel() {
      if (this.id) {
        return `Edit Text List ID: [${this.id}]`;
      } else {
        return 'Add New Text List';
      }
    },
    submitButtonText() {
      return this.id ? 'Edit' : 'Add';
    }
  },
  created() {
    this.$on('edit-text', ({id, text}) => {
      this.id = id;
      this.newText = text;
    });
  },
  methods: {
    submit() {
      if (this.id) {
        this.$emit('update-text', {
          id: this.id,
          text: this.newText
        });
      } else {
        this.$emit('add-text', this.newText);
      }
      this.id = '';
      this.newText = '';
    },
    cancelEdit() {
      this.id = '';
      this.newText = '';
    }
  }
};
</script>
