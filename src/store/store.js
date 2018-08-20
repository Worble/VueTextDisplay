import Vue from 'vue'
import Vuex from 'vuex'
import remotedev from 'vuex-remotedev'

Vue.use(Vuex)

const state = {
  options: {
    animationSpeed: { name: "Animation Speed", value: 0.1, ordinal: 0 },
    disableAnimation: { name: "Disable All Animation", value: false, ordinal: 1 }
  }
}

const mutations = {
  changeAnimationSpeed(state, speed) {
    state.options.animationSpeed = speed;
  },
  toggleDisableAnimation(state) {
    state.options.disableAnimation = !state.options.disableAnimation;
  }
}

const actions = {
  changeAnimationSpeed: ({ commit }) => commit('changeAnimationSpeed'),
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