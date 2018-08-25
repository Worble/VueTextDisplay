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
    </div>
</template>

<script>
import DisplayText from "./DisplayText.vue";
import Vue from "vue";
import events from "../constants/events";
import actions from "../constants/actions";

export default {
  name: "DisplayTextContainer",
  components: {
    DisplayText
  },
  data() {
    return {
      animateText: true,
      animationComplete: false
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
      } else if (this.currentMessage.choices) {
      } else {
        var that = this;
        this.$store
          .dispatch(actions.getNextMessage, that.currentMessage.nextMessageId)
          .then(function() {
            that.animateText = true;
            that.animationComplete = false;
            var ComponentClass = Vue.extend(DisplayText);
            var instance = new ComponentClass({
              parent: that,
              propsData: {
                animateText: that.animateText,
                skipText: that.$store.state.options.disableAnimation.value,
                text: that.currentMessage.content
              }
            });
            instance.$on(events.animationComplete, that.setAnimationComplete);
            instance.$mount();
            that.$refs.displayContainer.appendChild(
              document.createElement("br")
            );
            that.$refs.displayContainer.appendChild(instance.$el);
          });
      }
    },
    setAnimationComplete: function() {
      this.animationComplete = true;
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
