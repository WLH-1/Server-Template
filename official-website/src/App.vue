<template>
  <div @wheel="handleWheel" id="app">
    <Header @toTop="GoTop"></Header>
    <div id="contentApp">
      <router-view />
    </div>
    <Footer></Footer>
    <GoTop></GoTop>
  </div>
</template>

<script>
import {
  mapState
} from "vuex"

export default {
  name: 'App',
  mounted() {
    const value = sessionStorage.getItem("scrollType")
    this.$store.commit('setScrollType', value);
  },
  destroyed() {
    sessionStorage.setItem('scrollType', this.scrollType)
  },
  computed: {
    ...mapState(['scrollType']),
  },
  methods: {
    GoTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, 0);
        }
      })();
    },
    handleWheel(event) {
      if (event) {
        this.$store.commit('setScrollType', event.deltaY);
      }
    },
    navClick(index, name) {
      this.navIndex = index;
      sessionStorage.setItem('navIndex', index)
      this.menuName = name;
    },
    menuClick() {
      if (this.menuClass == "glyphicon glyphicon-menu-down") {
        this.menuClass = "glyphicon glyphicon-menu-up";
      } else {
        this.menuClass = "glyphicon glyphicon-menu-down";
      }
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body{
  overflow-x: hidden;
}

#contentApp {
  min-height: calc(100% - 300px);
  /* 这里的 [footer-height] 指 footer 的高度，例如 '100px' */
  box-sizing: border-box;
  padding-bottom: 300px;
}
@media screen and (max-width: 997px) {
  #contentApp {
  /* min-height: calc(100% - 300px); */
  /* 这里的 [footer-height] 指 footer 的高度，例如 '100px' */
  box-sizing: border-box;
  padding-bottom: 0px;
}
}
</style>
