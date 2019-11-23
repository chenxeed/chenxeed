<template>
  <nav class="navbar is-transparent is-fixed-top">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://chenxeed.com">
        <!-- Design by https://designimo.com -->
        <img src="~@/assets/logo.png" alt="Chenxeed - Albert Mulia Shintra Profile Website">
      </a>
      <div
        ref="navbarBurger"
        class="navbar-burger burger"
        :class="{ 'is-active' : isActive }"
        @click.stop="clickBurger"
        >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      ref="menu"
      class="navbar-menu"
      :class="{ 'is-active' : isActive }"
      >
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Home
        </router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link class="navbar-link" to="/labs">
            Labs
          </router-link>
          <div class="navbar-dropdown is-boxed">
            <template v-for="list in labsLists">
              <router-link :key="list.title" class="navbar-item" :to="list.link">
                {{ list.title }}
              </router-link>
            </template>
          </div>
        </div>
        <router-link to="/about" class="navbar-item">
          About
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button"
                target="_blank"
                href="https://github.com/chenxeed">
                <span class="icon">
                  <i class="mdi mdi-github-face"></i>
                </span>
                <span>
                  Github
                </span>
              </a>
            </p>
            <p class="control">
              <a
                class="button is-info"
                target="_blank"
                href="https://www.facebook.com/albert.chenx">
                <span class="icon">
                  <i class="mdi mdi-facebook-box"></i>
                </span>
                <span>Facebook</span>
              </a>
            </p>
            <p class="control">
              <a class="button"
                target="_blank"
                href="https://brave.com/che096">
                <span class="icon">
                  <img src="https://img.icons8.com/wired/64/000000/brave-web-browser.png">
                </span>
                <span>
                  Brave
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({})

export default class Home extends Vue {

  get labsLists() {
    return this.$store.state.labsLists;
  }

  private isActive = false;

  private clickBurger() {
    this.isActive = !this.isActive;
  }

  private checkToHideNavbar( e: Event ) {
    if ( e.target !== this.$refs.navbarBurger ) {
      this.isActive = false;
    }
  }

  private mounted() {
    const html = document.querySelector('html');
    if ( html ) { html.classList.add('has-navbar-fixed-top'); }
    document.body.addEventListener( 'click', this.checkToHideNavbar.bind( this ) );
  }

  private beforeDestroy() {
    const html = document.querySelector('html');
    if ( html) { html.classList.remove('has-navbar-fixed-top'); }
    document.body.removeEventListener( 'click', this.checkToHideNavbar.bind( this ) );
  }
}
</script>