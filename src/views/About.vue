<template>
  <div class="container">
    <h1 class="title">ChenXeed Portofolio</h1>
    <div ref="portofolio">Loading...</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})

export default class About extends Vue {
  private mounted() {
    const portofolio: HTMLElement = this.$refs.portofolio as HTMLElement;

    /* tslint:disable */
    // run the script of piktochart embed manually here
    portofolio.innerHTML = '<div class="piktowrapper-embed" style="height: 300px; position: relative;" data-uid="28567575-albert-mulia-shintra-cv"><div class="pikto-canvas-wrap"><div class="pikto-canvas"><div class="embed-loading-overlay" style="width: 100%; height: 100%; position: absolute; text-align: center;"><img width="60px" alt="Loading..." style="margin-top: 100px" src="https://create.piktochart.com/loading.gif"/><p style="margin: 0; padding: 0; font-family: Lato, Helvetica, Arial, sans-serif; font-weight: 600; font-size: 16px">Loading...</p></div></div></div></div>';
    (function(d){var js, id="pikto-embed-js", ref=d.getElementsByTagName("script")[0];if (d.getElementById(id)) { return;}js=d.createElement("script"); js.id=id; js.async=true;js.src="https://create.piktochart.com/assets/embedding/embed.js";ref.parentNode&&ref.parentNode.insertBefore(js, ref);}(document));
    /* tslint:enable */
  }
}
</script>