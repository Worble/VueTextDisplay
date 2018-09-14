import Vue from 'vue'
import Vuex from 'vuex'
import db from '../database/db';

Vue.use(Vuex)

const state = {
  options: {
    animationSpeed: { name: "Animation Speed", value: 0.1 },
    disableAnimation: { name: "Disable All Text Animation", value: false },
    disableScrollAnimation: { name: "Disable Scroll Animation", value: false }
  },
  effects: [],
  gameId: null,
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
  },
  setGameId(state, id) {
    state.gameId = id;
  },
  loadEffects(state, effects) {
    state.effects = effects;
  },
  editEffect(state, effect) {
    var index = state.effects.findIndex((stateEffect) => { return stateEffect.name == effect.name });
    state.effects[index] = effect;
  },
  addEffect(state, effect) {
    state.effects.push(effect);
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
    async function getMessage(nextId) {
      var messagePrerequisiteFailed = false;
      message = await db.messages.get(nextId);
      if (message.prerequisites) {
        message.prerequisites.values.forEach(async (prerequisite) => {
          var effect = state.effects.find((effect) => { return effect.name == prerequisite.name }) || { value: 0 }
          if (!eval(effect.value + prerequisite.comparator + prerequisite.value)) {
            messagePrerequisiteFailed = true;
          }
        })
      }
      if (messagePrerequisiteFailed) {
        message = await getMessage(message.prerequisites.alternativeMessageId || message.nextMessageId);
      }
      return message;
    }
    var message = await getMessage(nextMessageId);
    var choices = await db.choices.where('previousMessageId').equals(message.id).toArray();
    message.choices = [];
    if (choices) {
      choices.forEach(function (choice) {
        var choicePrerequisiteFailed = false;
        if (choice.prerequisites) {
          choice.prerequisites.values.forEach(async (prerequisite) => {
            var effect = state.effects.find((effect) => { return effect.name == prerequisite.name }) || { value: 0 }
            if (!eval(effect.value + prerequisite.comparator + prerequisite.value)) {
              choicePrerequisiteFailed = true;
            }
          })
        }
        if (!choicePrerequisiteFailed) {
          message.choices.push(choice)
        }
      });
    }
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
  },
  loadEffects: async ({ commit }) => {
    var effects = await db.effects.where({ gameId: state.gameId }).toArray();
    if (effects) {
      commit('loadEffects', effects)
    }
  },
  saveEffects: async ({ commit }) => {
    await db.effects.bulkPut(state.effects);
  },
  applyEffect: async ({ commit }, effects) => {
    effects.forEach(function (effect) {
      if (state.effects) {
        var stateEffect = state.effects.find((stateEffect) => { return stateEffect.name == effect.name });
      }
      switch (effect.effectType.toLowerCase()) {
        case "increment":
          if (stateEffect) {
            stateEffect.value += effect.value;
            commit('editEffect', stateEffect);
          } else {
            commit('addEffect', { name: effect.name, value: effect.value, gameId: state.gameId })
          }
          break;
        case "decrement":
          if (stateEffect) {
            stateEffect.value -= effect.value;
            commit('editEffect', stateEffect);
          } else {
            commit('addEffect', { name: effect.name, value: -effect.value, gameId: state.gameId })
          }
          break;
        case "set":
          if (stateEffect) {
            stateEffect.value = effect.value;
            commit('editEffect', stateEffect);
          } else {
            commit('addEffect', { name: effect.name, value: effect.value, gameId: state.gameId })
          }
          break;
        default:
          break;
      }
    })
  },
  setGameId: ({ commit }, id) => {
    commit('setGameId', id);
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

export default store;