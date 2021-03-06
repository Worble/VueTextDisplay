<template>
<div ref="container" class="container" @keydown.40="moveUp" @keydown.38="moveDown" @keydown.13="onEnter" tabIndex="0">
  <div class="main-menu">
    <div class="button active" v-on:click="onNew" v-on:mouseover="hover">Start</div>
    <div class="button" v-on:click="onLoad" v-on:mouseover="hover">Load</div>
  </div>
</div>
</template>

<script>
import events from "../constants/events";
import actions from "../constants/actions";
import listeners from "../helpers/addTransitionListener";

export default {
  name: "FrontPage",
  methods: {
    moveUp: function() {
      var activeButton = document.getElementsByClassName("active")[0];
      activeButton.classList.remove("active");
      var sibling = activeButton.nextSibling;
      if (sibling) {
        sibling.classList.add("active");
      } else {
        document.getElementsByClassName("button")[0].classList.add("active");
      }
    },
    moveDown: function() {
      var activeButton = document.getElementsByClassName("active")[0];
      activeButton.classList.remove("active");
      var sibling = activeButton.previousSibling;
      if (sibling) {
        sibling.classList.add("active");
      } else {
        var buttons = document.getElementsByClassName("button");
        buttons[buttons.length - 1].classList.add("active");
      }
    },
    onEnter: function() {
      var activeButton = document.getElementsByClassName("active")[0];
      if (activeButton.innerHTML == "Start") {
        this.onNew();
      } else {
        this.onLoad();
      }
    },
    onNew: function() {
      var that = this;
      this.exitAnimation(function() {
        that.$emit(events.startNew);
      });
    },
    onLoad: async function() {
      var save = JSON.parse(localStorage.getItem("save"));
      if (save) {
        await this.$store.dispatch(actions.setGameId, save.gameId);
        await this.$store.dispatch(actions.loadEffects);
        var that = this;
        this.exitAnimation(function() {
          that.$emit(events.load, save.messageId);
        });
      } else {
        alert("No save to load!");
      }
    },
    exitAnimation(callback) {
      var activeButton = document.getElementsByClassName("active")[0];
      listeners.addAnimationListener(callback, activeButton);
      var buttons = document.getElementsByClassName("button");
      [].forEach.call(buttons, function(el) {
        el.classList.add("leave");
      });
    },
    hover(e) {
      if (!e.target.classList.contains("active")) {
        var activeChoice = document.getElementsByClassName("active")[0];
        activeChoice.classList.remove("active");
        e.target.classList.add("active");
      }
    }
  },
  mounted: function() {
    this.$refs.container.focus();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

.main-menu {
  margin: auto;
}

.button {
  border: solid grey 1px;
  margin-top: 10px;
  padding: 5px 15px;
  cursor: pointer;
  animation: button-enter 0.5s;
  background-color: black;
}

.button.active {
  animation: button-active 1.5s infinite, button-enter 0.5s;
}

.button.leave {
  animation: button-leave 0.5s;
  transform: scale(0);
}

@keyframes button-active {
  0% {
    background-color: none;
  }
  50% {
    background-color: grey;
  }

  100% {
    background-color: none;
  }
}

@keyframes button-enter {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1, 0.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes button-leave {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1, 0.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
