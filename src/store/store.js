import Vue from 'vue'
import Vuex from 'vuex'
import remotedev from 'vuex-remotedev'

Vue.use(Vuex)

const state = {
  options: {
    animationSpeed: { name: "Animation Speed", value: 0.1 },
    disableAnimation: { name: "Disable All Text Animation", value: false }
  }
}

const mutations = {
  changeAnimationSpeed(state, speed) {
    state.options.animationSpeed.value = speed;
  },
  toggleDisableAnimation(state) {
    state.options.disableAnimation.value = !state.options.disableAnimation.value;
  }
}

const actions = {
  changeAnimationSpeed: ({ commit }, speed) => commit('changeAnimationSpeed', speed),
  toggleDisableAnimation: ({ commit }) => commit('toggleDisableAnimation'),
}

const getters = {
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

remotedev(store)

export default store;