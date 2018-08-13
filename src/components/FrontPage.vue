<template>
<div id="focus" class="container" @keydown.40="moveUp" @keydown.38="moveDown" @keydown.13="onEnter" tabIndex="0">
  <div class="main-menu">
    <div class="button active">Start</div>
    <div class="button">Load</div>
  </div>
</div>
</template>

<script>
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
      var buttons = document.getElementsByClassName("button");
      [].forEach.call(buttons, function(el) {
        el.classList.add("leave");
      });
    }
  },
  mounted: function() {
    document.getElementById("focus").focus();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.main-menu {
  margin: auto;
}

.button {
  border: solid grey 1px;
  margin-top: 10px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  animation: button-enter 0.5s;
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
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes button-leave {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
</style>
