import Vue from 'vue'
import Vuex from 'vuex'
import remotedev from 'vuex-remotedev'
import db from '../database/db';

Vue.use(Vuex)

const state = {
  options: {
    animationSpeed: { name: "Animation Speed", value: 0.1 },
    disableAnimation: { name: "Disable All Text Animation", value: false },
    disableScrollAnimation: { name: "Disable Scroll Animation", value: false }
  },
  currentMessage: { id: null, content: null, nextMessageId: null }
}

const mutations = {
  changeAnimationSpeed(state, speed) {
    state.options.animationSpeed.value = speed;
  },
  toggleDisableAnimation(state) {
    state.options.disableAnimation.value = !state.options.disableAnimation.value;
  },
  toggleDisableScrollAnimation(state) {
    state.options.disableScrollAnimation.value = !state.options.disableScrollAnimation.value;
  },
  changeCurrentMessage(state, message) {
    state.currentMessage = message;
  },
  restoreOptions(state, options) {
    state.options = options;
  }
}

const actions = {
  changeAnimationSpeed: ({ commit }, speed) => {
    commit('changeAnimationSpeed', speed);
    localStorage.setItem('options', JSON.stringify(state.options));
  },
  toggleDisableAnimation: ({ commit }) => {
    commit('toggleDisableAnimation');
    localStorage.setItem('options', JSON.stringify(state.options));
  },
  toggleDisableScrollAnimation: ({ commit }) => {
    commit('toggleDisableScrollAnimation');
    localStorage.setItem('options', JSON.stringify(state.options));
  },
  getNextMessage: async ({ commit }, nextMessageId) => {
    var message = await db.messages.get(nextMessageId);
    message.choices = await db.choices.where('previousMessageId').equals(message.id).toArray();
    commit('changeCurrentMessage', message);
  },
  changeCurrentMessage: ({ commit }, message) => {
    commit('changeCurrentMessage', message);
  },
  restoreOptions: ({ commit }) => {
    var options = localStorage.getItem('options');
    if (options) {
      commit('restoreOptions', JSON.parse(options));
    }
  }
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