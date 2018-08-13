<template>
    <div class="text-container">
        <div ref="animationContainer">
        </div>
    </div>
</template>
<script>
export default {
  name: "DisplayText",
  props: ["animateText"],
  data: function() {
    return {
      animationComplete: false,
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nibh justo, cursus non lacus id, cursus scelerisque nulla. Vestibulum id lectus eu sapien pulvinar venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse lobortis elit augue, in lobortis risus gravida dapibus. Pellentesque vitae mollis est. Praesent eu ligula a mauris porta euismod. Vivamus porta ante mauris, vitae aliquam tellus sodales at. Vestibulum mollis rutrum elementum. Nunc dapibus porttitor urna, ut iaculis metus fringilla non.

Sed non ligula id ex rutrum porta. Cras vel ultrices nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed nec neque nec quam placerat gravida a vel ligula. Donec elit urna, vulputate sit amet hendrerit et, iaculis ut nunc. Praesent arcu libero, fermentum eu cursus sit amet, rutrum vel felis. Ut aliquam ut ante in sollicitudin. Mauris in aliquam ex.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at ligula id tellus dictum cursus eu sit amet erat. Maecenas luctus accumsan quam quis lacinia. Nullam pulvinar, nibh scelerisque efficitur pharetra, velit orci ornare velit, suscipit vestibulum lacus purus quis nulla. Praesent vel auctor justo. Proin et suscipit metus. Mauris et luctus odio. Cras et velit tortor. Cras vestibulum, ipsum eget fringilla rhoncus, augue erat bibendum turpis, in euismod sapien sapien nec massa. Sed id iaculis quam. In placerat leo quis erat vestibulum egestas. Donec in lacus congue, tempus nibh at, vehicula turpis. Phasellus mollis lacus non lacinia viverra. Proin ut lorem massa. Nullam consequat imperdiet nisl et vulputate. Donec volutpat risus sed dolor aliquam finibus.

Nulla nec dictum mauris. Curabitur sit amet consectetur nulla, vitae sagittis quam. Praesent ac finibus tortor. Proin felis elit, molestie id ornare at, mattis non ligula. Morbi id dictum orci, at sagittis sapien. Nam eget ante turpis. In hac habitasse platea dictumst. Ut semper nulla in elit imperdiet aliquam. Nunc porttitor malesuada arcu, vitae pharetra arcu porttitor sed. Vestibulum interdum, sem sit amet eleifend tempor, velit velit viverra felis, a feugiat nibh mi at ex. Donec mattis ipsum tellus, vitae varius dolor auctor in. Morbi tincidunt condimentum accumsan. Nunc pretium dolor eu lacus pellentesque commodo. Fusce eget mollis neque.

Etiam non est id odio tempor porttitor ac a justo. Donec eget laoreet velit. Nulla sit amet mauris sed elit suscipit varius. Proin leo velit, pulvinar in dapibus quis, molestie id ex. Fusce ut mattis mauris. Vivamus tincidunt turpis ac consectetur consectetur. Sed eget nibh tellus. Sed maximus eleifend arcu pulvinar tristique. Phasellus vitae blandit ante. Curabitur quis semper eros. Aenean ultrices sit amet dolor a suscipit. Phasellus pellentesque auctor nisi, in tincidunt quam vehicula id. Nullam leo nulla, laoreet at eros a, hendrerit egestas tortor. Nullam congue arcu eu lorem cursus molestie. Aenean molestie cursus lorem, a molestie ipsum laoreet ut.`
    };
  },
  watch: {
    animateText: function() {
      if (this.animateText == false) {
        var els = document.getElementsByClassName("animated", "fadeIn");
        this.removeClasses(els);
        this.$emit("animation-complete");
      }
    }
  },
  mounted() {
    if (!this.skipText) {
      var el = this.$refs.animationContainer;
      var lines = this.text.split("\n");
      var delay = 0.1;
      for (var i = 0; i < lines.length; i++) {
        var words = lines[i].split(" ");
        for (var j = 0; j < words.length; j++) {
          var node = document.createElement("div");
          node.classList.add("animated", "fadeIn", "word");
          node.style.display = "inline-block";
          node.style["animation-delay"] = delay + "s";
          node.innerHTML = words[j] + "&nbsp";

          if (i == lines.length - 1 && j == words.length - 1) {
            this.addTransitionListener(node);
          }

          el.appendChild(node);
          delay += 0.1;
        }
        el.appendChild(document.createElement("br"));
      }
    }
  },
  methods: {
    removeClasses: function(els) {
      els[0].classList.remove("animated", "fadeIn");
      if (els[0]) this.removeClasses(els);
    },

    addTransitionListener: function(node) {
      function whichTransitionEvent() {
        var t;
        var el = document.createElement("fakeelement");
        var transitions = {
          transition: "animationend",
          OTransition: "oAnimationEnd",
          MozTransition: "animationend",
          WebkitTransition: "webkitAnimationEnd"
        };

        for (t in transitions) {
          if (el.style[t] !== undefined) {
            return transitions[t];
          }
        }
      }

      var that = this;
      var transitionEvent = whichTransitionEvent();
      transitionEvent &&
        node.addEventListener(transitionEvent, function() {
          that.$emit("animation-complete");
        });
    }
  }
};
</script>
<style scoped>
.text-container {
  word-wrap: break-word;
  white-space: pre-line;
}

.word {
  display: inline-block;
}
</style>
