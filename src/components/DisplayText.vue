<template>
    <div class="text-container" ref="animationContainer">
    </div>
</template>
<script>
import events from "../constants/events";
import listeners from "../helpers/addTransitionListener";
export default {
  name: "DisplayText",
  data: function() {
    return {
      skipText: this.$store.state.options.disableAnimation.value
    };
  },
  props: ["animateText", "text"],
  mounted() {
    var node;
    var el = this.$refs.animationContainer;
    if (!this.skipText) {
      var lines = this.text.split("\n");
      var delay = this.$store.state.options.animationSpeed.value;
      for (var i = 0; i < lines.length; i++) {
        var words = lines[i].split(" ");
        for (var j = 0; j < words.length; j++) {
          node = document.createElement("span");
          node.classList.add("animated", "fadeIn", "word");
          node.style["animation-delay"] = delay + "s";
          node.innerHTML = words[j] + "&nbsp";

          if (i == lines.length - 1 && j == words.length - 1) {
            var that = this;
            listeners.addAnimationListener(function() {
              that.$emit(events.animationComplete);
            }, node);
          }

          el.appendChild(node);
          delay += this.$store.state.options.animationSpeed.value;
        }
        el.appendChild(document.createElement("br"));
      }
    } else {
      node = document.createElement("span");
      node.innerHTML = this.text;
      el.appendChild(node);
      this.$emit(events.animationComplete);
    }
    var disableScrollAnimation = this.$store.state.options
      .disableScrollAnimation.value;
    this.$nextTick(() =>
      el.scrollIntoView({
        behavior: disableScrollAnimation ? "instant" : "smooth",
        block: "start",
        inline: "nearest"
      })
    );
  }
};
</script>
<style scoped>
.text-container {
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
<style>
span.word {
  display: inline-block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>