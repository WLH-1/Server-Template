import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  scrollType: 0,
  navName: sessionStorage.getItem("navName")||'首页'
};

const mutations = {
  setScrollType: (state, info) => {
    state.scrollType = info;
  },
  setNavName: (state, info) => {
    state.navName = info;
    sessionStorage.setItem("navName", info);
  }
};

export default new Vuex.Store({
  state,
  mutations,
});