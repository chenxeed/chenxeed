<template>
  <div class="boxes medium has-text-centered">
    <div class="boxes__icon">
      <i
        class="icon mdi"
        :class="chosenIcon"/>
    </div>
    <div class="boxes__title is-size-4">
      <slot name="label"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MenuBox extends Vue {
  @Prop({ default : 'bell' })
  public icon: string;

  get chosenIcon() {
    return 'mdi-' + this.icon;
  }
}
</script>
<style lang="scss">
@import "~bulma/sass/utilities/_all";

.boxes {
  border: 1px $grey-light solid;
  background: $turquoise;
  color: $white-ter;
  display: inline-flex;
  flex-direction: column;

  &.medium {
    height: 300px;
    width: 300px;

    .boxes__icon {
      margin-top: 20%;
      margin-bottom: 10%;

      .icon {
        font-size: 100px;
        width: 110px;
        height: 110px;
      }      
    }


  }

}
</style>