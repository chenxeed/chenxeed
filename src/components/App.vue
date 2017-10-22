<template>
  <div id="app">
    <!-- Always shows a header, even in smaller screens. -->
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">ChenXeed</span>
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <router-link class="mdl-navigation__link" to="/">Home</router-link>
            <router-link class="mdl-navigation__link" to="/hello">Hello</router-link>
            <router-link class="mdl-navigation__link" to="/labs">Labs</router-link>
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">ChenXeed</span>
        <nav class="mdl-navigation">
          <router-link class="mdl-navigation__link" to="/">Home</router-link>
          <router-link class="mdl-navigation__link" to="/hello">Hello</router-link>
          <router-link class="mdl-navigation__link" to="/labs">Labs</router-link>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <div class="page-title">
          <h1 class="mdl-typography--display-4">{{ pageTitle }}</h1>
        </div>
        <router-view @update:title="updatePageTitle"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import 'material-design-lite/dist/material.blue_grey-teal.min.css'
import 'material-design-lite/dist/material.min.js'

export default {
  name: 'app',
  data () {
    return { pageTitle: 'Home page' }
  },
  methods: {
    updatePageTitle (title) {
      this.pageTitle = title
    }
  },
  metaInfo () {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.pageTitle,
      // all titles will be injected into this template
      titleTemplate: '%s | ChenXeed'
    }
  }
}
</script>

<style lang='scss'>
/*
  https://fonts.googleapis.com/icon?family=Material+Icons
  fallback
 */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v30/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/*
  Main Application Template Style
 */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .page-title {
    text-align: center;
  }
}

</style>
