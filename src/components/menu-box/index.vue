<template>
  <div
    class="button boxes has-text-centered is-primary"
    :class="mainClass">
    <div class="boxes__icon">
      <i
        class="icon mdi"
        :class="chosenIcon"/>
    </div>
    <div
      class="boxes__title"
      :class="fontSize">
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

  @Prop({ default : 'medium' })
  public size: string;

  @Prop({ default : false })
  public active: boolean;

  get mainClass() {
    return [
      this.size,
      { 'is-active' : this.active }
    ];
  }

  get chosenIcon() {
    return 'mdi-' + this.icon;
  }

  get fontSize() {
    switch (this.size) {
      case 'xsmall' : return 'is-size-7';
      case 'small' : return 'is-size-6';
      case 'medium' : return 'is-size-4';
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/tokens";

.boxes {
  display: inline-flex;
  flex-direction: column;
  white-space: normal;
  transition: 0.2s all;

  &.xsmall {
    height: 100px;
    width: 100px;

    .boxes__icon {
      margin-top: 20%;
      margin-bottom: 10%;

      .icon {
        font-size: 40px;
        width: 20px;
        height: 20px;
      }      
    }
  }

  &.small {
    height: 150px;
    width: 150px;

    .boxes__icon {
      margin-top: 20%;
      margin-bottom: 10%;

      .icon {
        font-size: 40px;
        width: 50px;
        height: 50px;
      }      
    }
  }

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