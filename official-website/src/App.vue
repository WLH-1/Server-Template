<template>
  <div @wheel="handleWheel" id="app">
    <Header @toTop="GoTop"></Header>
    <router-view/>
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
</style>
