<template>
  <div id="GoTop" @click="GoTop()">
    <span class="glyphicon glyphicon-chevron-up"></span>
  </div>
</template>
<script>
import store from '@/store/index.js';
export default {
  name: "GoTop",
  data() {
    return {
      flag: false
    };
  },
  methods: {
    GoTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 10);
          store.commit('setScrollType', currentScroll<110 && currentScroll > 1 ? 0 : -currentScroll);
        } 
      })();
    }
  }
};
</script>
<style scoped>
#GoTop {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 99999999;
  cursor: pointer;
}
#GoTop > span {
  display: block;
  width: 100%;
  height: 100%;
  color: rgb(8, 162, 233);
  font-size: 30px;
}
</style>
