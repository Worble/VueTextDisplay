<template>
    <div ref="container" class="container" tabIndex="0" @keydown.13="onEnter" v-on:click="onEnter">
        <div ref="displayContainer" class="display-container">
            <!-- <DisplayText :animateText=animateText v-on:animation-complete="setAnimationComplete" :text="currentMessage.content" /> -->
        </div>
        <br/>
        <div v-if="this.animationComplete">
            <svg width="14" height="14" class="read-more" style="fill:none;stroke:white;stroke-width:2" >
              <polygon points="0,0 14,0 7,14"/>
            </svg>
        </div>
        <div v-if="displayChoices">
          <Choices v-on:choice-selected="choiceSelected" v-on:close-choices-menu="closeChoicesMenu"/>
        </div>
    </div>
</template>

<script>
import DisplayText from "./DisplayText.vue";
import Choices from "./Choices.vue";
import Vue from "vue";
import events from "../constants/events";
import actions from "../constants/actions";
import listeners from "../helpers/addTransitionListener";

export default {
  name: "DisplayTextContainer",
  components: {
    DisplayText,
    Choices
  },
  data() {
    return {
      animateText: true,
      animationComplete: false,
      displayChoices: false
    };
  },
  computed: {
    currentMessage: function() {
      return this.$store.state.currentMessage;
    }
  },
  mounted() {
    var that = this;
    listeners.addTransitionListener(function() {
      that.appendText(that.currentMessage.content, that.currentMessage.clear);
    }, this.$refs.container);
    //that.appendText(that.currentMessage.content, that.currentMessage.clear);
    //this.$refs.container.focus;
    // this.$nextTick(() => {
    //   that.$refs.container.style.opacity = 1;
    // });
    window.setTimeout(function() {
      that.$refs.container.style.opacity = 1;
      that.$refs.container.focus;
    }, 100);
  },
  methods: {
    onEnter: function() {
      if (!this.animationComplete) {
        this.completeAnimations();
      } else if (
        this.currentMessage.choices &&
        this.currentMessage.choices.length > 0
      ) {
        this.$emit(events.addNoScroll);
        this.displayChoices = true;
      } else {
        this.getNextMessage(this.currentMessage.nextMessageId);
      }
    },
    setAnimationComplete: function() {
      this.animationComplete = true;
    },
    appendText: function(text, clear) {
      this.displayChoices = false;
      this.animateText = true;
      this.animationComplete = false;
      var ComponentClass = Vue.extend(DisplayText);
      var instance = new ComponentClass({
        parent: this,
        propsData: {
          animateText: this.animateText,
          text: text
        }
      });
      instance.$on(events.animationComplete, this.setAnimationComplete);
      if (clear) {
        this.$refs.displayContainer.innerHTML = "";
      } else {
        this.$refs.displayContainer.appendChild(document.createElement("br"));
      }
      instance.$mount();
      this.$refs.displayContainer.appendChild(instance.$el);
    },
    closeChoicesMenu: function() {
      this.$emit(events.removeNoScroll);
      this.displayChoices = false;
    },
    choiceSelected: function(choice) {
      this.$emit(events.removeNoScroll);
      this.$refs.container.focus();
      if (choice.effects) {
        this.$store.dispatch(actions.applyEffect, choice.effects);
      }
      this.$store.dispatch(actions.changeCurrentMessage, {
        id: choice.nextMessageId,
        content: "[" + choice.content + "]",
        nextMessageId: choice.nextMessageId
      });
      this.appendText(this.currentMessage.content, this.currentMessage.clear);
    },
    getNextMessage: function(nextMessageId) {
      var that = this;
      this.$store
        .dispatch(actions.getNextMessage, nextMessageId)
        .then(function() {
          that.appendText(
            that.currentMessage.content,
            that.currentMessage.clear
          );
        });
    },
    completeAnimations: function() {
      var els = document.getElementsByClassName("animated", "fadeIn");
      this.removeClasses(els);
      this.animationComplete = true;
    },
    removeClasses: function(els) {
      els[0].classList.remove("animated", "fadeIn");
      if (els[0]) this.removeClasses(els);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #00000080;
  opacity: 0;
  transition-duration: 1s;
}
.read-more {
  position: fixed;
  right: 15px;
  bottom: 10px;
  animation: rotate 1s infinite linear;
}
.display-container {
  padding: 15px 15px;
}
@keyframes rotate {
  0% {
    transform: rotate3d(0, 1, 0, 0deg);
  }
  50% {
    transform: rotate3d(0, 1, 0, 180deg);
  }
  100% {
    transform: rotate3d(0, 1, 0, 0deg);
  }
}
</style>
