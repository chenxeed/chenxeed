<template>
  <div>
    <section class="section">
      <div>The Component</div>
      <div>Name : {{ name }}</div>
      <div>Work : {{ work }}</div>
      <div>Personality : {{ personality }}</div>
      <div><button @click="onClick">Hit Me</button></div>
    </section>
  </div>
</template>
<script>
export default {
  name : 'comp-button',
  props : {
    name : {
      type : String,
      default : 'Albert'
    },
    work : {
      type : String,
      default : 'developer'
    }
  },
  computed : {
    personality() {
      return this.work === 'developer' ? 'Geeks' : 'Normal Human';
    }
  },
  methods : {
    onClick() {
      this.$emit('hit', 'Do not touch me!');
    }
  }
};
</script>
<style lang="scss" scoped>
.section {
  border: 2px solid;
  width: 300px;
  position: relative;
}
</style>