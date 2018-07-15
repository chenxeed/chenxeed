<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        Showcasing the behavior of using nested custom component.
      </div>
    </div>
    <div class="columns">
      <div class="column">
        There are 2 custom component here, which is:
        <ul>
          <li><b>&lt;button-main&gt;</b> : Custom component that use native button inside as the parent element</li>
          <li><b>&lt;button-custom&gt;</b> : Custom component that use &lt;button-main&gt; inside as the parent element</li>
        </ul>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        The button here is a <b>custom button component</b> that uses <b>main button component</b> inside.
      </div>
      <div class="column is-centered">
        <div class="notification">
          <button-main @click="alertClick" @click.native="alertClickNative">
            The Main Button
          </button-main>
          <button-custom @click="alertClick" @click.native="alertClickNative">
            The Custom Button
          </button-custom>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        Here are some showcases did:
        <ol>
          <li>
            Using slot on the <b>&lt;button-custom&gt;</b> will goes to the slot on <b>&lt;button-main&gt;</b> as well.
            <pre>
              <code>
              &lt;button-custom&gt;The Custom Button&lt;/button-custom&gt;
              </code>
            </pre>
          </li>
          <li>
            Cannot set native event listener to the custom component, unless added with `.native`.
            <pre>
              <code>
              // NOT WORKING
              &lt;button-custom @click="clickBtn"&gt;The Custom Button&lt;/button-custom&gt;
              // WORKING
              &lt;button-custom @click.native="clickBtn"&gt;The Custom Button&lt;/button-custom&gt;
              </code>
            </pre>
          </li>
          <li>
            Custom component style will replace the style of the nested component inside. In this example, <b>&lt;button-main&gt;</b> color is <span style="color: green">Green</span>, while <b>&lt;button-custom&gt;</b> color is <span style="color: blue">Blue</span>.
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
// global extended components
import ButtonMain from './button-main.vue';
import ButtonCustom from './button-custom.vue';

export default {
  name : 'NestedComponent',
  components : {
    ButtonMain,
    ButtonCustom
  },
  methods : {
    alertClick() {
      window.alert('custom button click triggered without ".native"');
    },
    alertClickNative() {
      window.alert('custom button click triggered with ".native"');
    }
  }
};
</script>