import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  scrollType:0,
};

const mutations = {
  setScrollType: (state, info) => {
    state.scrollType = info;
  },
};

export default new Vuex.Store({
  state,
  mutations,
});