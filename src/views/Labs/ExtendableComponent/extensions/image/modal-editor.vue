<template>
  <div :class="modalClass">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="field">
          <label class="label">Edit Image [{{id}}]</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="imageUrl"/>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-primary"
              @click="submit">Update</button>
          </div>
          <div class="control">
            <button
              class="button is-secondary"
              @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalEditorImage',
  data: () => {
    return {
      id: '',
      imageUrl: '',
      visible: false
    };
  },
  computed: {
    modalClass() {
      return {
        'modal': true,
        'is-active': this.visible
      };
    }
  },
  created() {
    this.$on('edit-image', ({id, imageUrl}) => {
      this.id = id;
      this.imageUrl = imageUrl;
      this.visible = true;
    });
  },
  methods: {
    submit() {
      this.$emit('update-image', {
        id: this.id,
        imageUrl: this.imageUrl
      });
      this.closeModal();
    },
    closeModal() {
      this.id = '';
      this.imageUrl = '';
      this.visible = false;
    }
  }
};
</script>
