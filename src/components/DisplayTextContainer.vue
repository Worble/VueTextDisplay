<template>
    <div id="focus" class="container" tabIndex="0" @keydown.13="onEnter" v-on:click="onEnter">
        <div ref="displayContainer">
            <DisplayText :animateText=animateText v-on:animation-complete="setAnimationComplete" />
        </div>
        <br/>
        <div v-if="this.animationComplete">
            Read More
        </div>
    </div>
</template>

<script>
import DisplayText from "./DisplayText.vue";
import Vue from "vue";

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
          propsData: { animateText: this.animateText }
        });
        instance.$mount(); // pass nothing
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
</style>
