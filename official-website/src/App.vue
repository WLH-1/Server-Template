<template>
  <div @wheel="handleWheel" id="app">
    <Header @toTop="GoTop" @toBottom="GoBottom"></Header>
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
    GoBottom() {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollBottom = scrollHeight - windowHeight;

      const scrollStep = 100; // 每次滚动的距离
      let scrollPosition = window.pageYOffset;

      function smoothScroll() {
        if (scrollPosition < scrollBottom) {
          window.scrollTo(0, scrollPosition);
          scrollPosition += scrollStep;
          if (scrollPosition > scrollBottom) {
            scrollPosition = scrollBottom;
          }
          window.requestAnimationFrame(smoothScroll);
        } else if (scrollPosition >= scrollBottom) {
          window.scrollTo(0, scrollHeight); // 滚动到页面的真正底部
          // 滚动到底部后执行的操作
          // 在这里添加你需要执行的代码
        }
      }

      smoothScroll();
    },
    handleWheel(event) {
      if (event) {
        this.$store.commit('setScrollType', event.deltaY);
      }
    },
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
  padding-bottom: 350px;
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
