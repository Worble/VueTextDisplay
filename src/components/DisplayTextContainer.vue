<template>
    <div ref="container" id="focus" class="container" tabIndex="0" @keydown.13="onEnter" v-on:click="onEnter">
        <div ref="displayContainer">
            <DisplayText :animateText=animateText :skipText=this.$store.state.options.disableAnimation.value v-on:animation-complete="setAnimationComplete" :text="currentMessage.content" />
        </div>
        <br/>
        <div v-if="this.animationComplete">
            <svg width="14" height="14" class="read-more" style="fill:none;stroke:white;stroke-width:2" >
              <polygon points="0,0 14,0 7,14"/>
            </svg>
        </div>
        <div v-if="displayChoices">
          <Choices v-on:choice-selected="choiceSelected"/>
        </div>
    </div>
</template>

<script>
import DisplayText from "./DisplayText.vue";
import Choices from "./Choices.vue";
import Vue from "vue";
import events from "../constants/events";
import actions from "../constants/actions";

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
    document.getElementById("focus").focus();
  },
  methods: {
    onEnter: function() {
      if (!this.animationComplete) {
        this.animateText = !this.animateText;
      } else if (
        this.currentMessage.choices &&
        this.currentMessage.choices.length > 0
      ) {
        this.displayChoices = true;
      } else {
        this.getNextMessage(this.currentMessage.nextMessageId);
      }
    },
    setAnimationComplete: function() {
      this.animationComplete = true;
    },
    appendText: function(text) {
      this.displayChoices = false;
      this.animateText = true;
      this.animationComplete = false;
      var ComponentClass = Vue.extend(DisplayText);
      var instance = new ComponentClass({
        parent: this,
        propsData: {
          animateText: this.animateText,
          skipText: this.$store.state.options.disableAnimation.value,
          text: text
        }
      });
      instance.$on(events.animationComplete, this.setAnimationComplete);
      instance.$mount();
      this.$refs.displayContainer.appendChild(document.createElement("br"));
      this.$refs.displayContainer.appendChild(instance.$el);
    },
    choiceSelected: function(choice) {
      document.getElementById("focus").focus();
      this.$store.dispatch(actions.changeCurrentMessage, {
        content: "[" + choice.content + "]",
        nextMessageId: choice.nextMessageId
      });
      this.appendText(this.currentMessage.content);
      //this.getNextMessage(choice.nextMessageId);
    },
    getNextMessage: function(nextMessageId) {
      var that = this;
      this.$store
        .dispatch(actions.getNextMessage, nextMessageId)
        .then(function() {
          that.appendText(that.currentMessage.content);
        });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.read-more {
  float: right;
  animation: rotate 1s infinite linear;
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
