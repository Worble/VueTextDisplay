import Vue from 'vue'
import Vuex from 'vuex'
import remotedev from 'vuex-remotedev'
import db from '../database/db';

Vue.use(Vuex)

const state = {
  options: {
    animationSpeed: { name: "Animation Speed", value: 0.1 },
    disableAnimation: { name: "Disable All Text Animation", value: false }
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
  changeCurrentMessage(state, message) {
    state.currentMessage = message;
  },
  changeNextMessage(state, message) {
    state.nextMessage = message;
  }
}

const actions = {
  changeAnimationSpeed: ({ commit }, speed) => commit('changeAnimationSpeed', speed),
  toggleDisableAnimation: ({ commit }) => commit('toggleDisableAnimation'),
  getNextMessage: async ({ commit }, nextMessageId) => {
    var message = await db.messages.get(nextMessageId);
    message.choices = await db.choices.where('previousMessageId').equals(message.id).toArray();
    commit('changeCurrentMessage', message);
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