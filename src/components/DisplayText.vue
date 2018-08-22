<template>
    <div class="text-container" ref="animationContainer">
    </div>
</template>
<script>
import events from "../constants/events";
import addTransitionListener from "../helpers/addTransitionListener";
export default {
  name: "DisplayText",
  props: ["animateText", "skipText"],
  data: function() {
    return {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nibh justo, cursus non lacus id, cursus scelerisque nulla. Vestibulum id lectus eu sapien pulvinar venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse lobortis elit augue, in lobortis risus gravida dapibus. Pellentesque vitae mollis est. Praesent eu ligula a mauris porta euismod. Vivamus porta ante mauris, vitae aliquam tellus sodales at. Vestibulum mollis rutrum elementum. Nunc dapibus porttitor urna, ut iaculis metus fringilla non.

Sed non ligula id ex rutrum porta. Cras vel ultrices nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed nec neque nec quam placerat gravida a vel ligula. Donec elit urna, vulputate sit amet hendrerit et, iaculis ut nunc. Praesent arcu libero, fermentum eu cursus sit amet, rutrum vel felis. Ut aliquam ut ante in sollicitudin. Mauris in aliquam ex.`
    };
  },
  watch: {
    animateText: function() {
      if (this.animateText == false) {
        var els = document.getElementsByClassName("animated", "fadeIn");
        this.removeClasses(els);
        this.$emit(events.animationComplete);
      }
    }
  },
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
            addTransitionListener(function() {
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
    this.$nextTick(() =>
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
    );
  },
  methods: {
    removeClasses: function(els) {
      els[0].classList.remove("animated", "fadeIn");
      if (els[0]) this.removeClasses(els);
    }
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
</style>