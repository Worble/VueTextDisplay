<template>
    <div ref="container" id="focus" class="container" tabIndex="0" @keydown.13="onEnter" v-on:click="onEnter">
        <div ref="displayContainer">
            <DisplayText :animateText=animateText :skipText=skipText v-on:animation-complete="setAnimationComplete" />
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
import events from "../events/events";

export default {
  name: "DisplayTextContainer",
  components: {
    DisplayText
  },
  data() {
    return {
      animateText: true,
      animationComplete: false,
      skipText: this.$store.state.options.disableAnimation.value
    };
  },
  computed: {},
  mounted() {
    document.getElementById("focus").focus();
  },
  methods: {
    onEnter: function() {
      if (!this.animationComplete) {
        this.animateText = !this.animateText;
      } else {
        this.animateText = true;
        this.animationComplete = false;
        var ComponentClass = Vue.extend(DisplayText);
        var instance = new ComponentClass({
          parent: this,
          propsData: { animateText: this.animateText, skipText: this.skipText }
        });
        instance.$on(events.animationComplete, this.setAnimationComplete);
        instance.$mount();
        this.$refs.displayContainer.appendChild(document.createElement("br"));
        this.$refs.displayContainer.appendChild(instance.$el);
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
  height: 100vh;
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
