<template>
    <div ref="focus" class="modal-container" @keydown.40="moveUp" @keydown.38="moveDown" tabIndex="0" @keydown.13="onEnter"  @click="clickOff">
        <div ref="modal" class="modal">
          <div v-for="choice in choices" :key="choice.id" class="selection" v-bind:class="{ active: choice.active }" v-bind:data-id="choice.id" v-on:click="onChoiceClick" v-on:mouseover="choiceHover">
            {{choice.content}}
          </div>
        </div>
    </div>
</template>

<script>
import addTransitionListener from "../helpers/addTransitionListener";
import events from "../constants/events";
export default {
  name: "Choices",
  data: function() {
    return {
      choices: null
    };
  },
  created: function() {
    var choices = this.$store.state.currentMessage.choices;
    this.choices = choices.sort((a, b) => a.ordinal - b.ordinal);
    this.choices[0].active = true;
  },
  mounted: function() {
    this.$refs.focus.focus();
  },
  methods: {
    clickOff: function(event) {
      if (!event.target.closest(".modal")) {
        this.$refs.modal.classList.add("close");
        var that = this;
        addTransitionListener(function() {
          that.$emit(events.closeChoicesModal);
        }, this.$refs.modal);
      }
    },
    moveUp: function(e) {
      e.preventDefault();
      var activeButton = document.getElementsByClassName("active")[0];
      activeButton.classList.remove("active");
      var sibling = activeButton.nextSibling;
      if (sibling) {
        sibling.classList.add("active");
      } else {
        document.getElementsByClassName("selection")[0].classList.add("active");
      }
    },
    moveDown: function(e) {
      e.preventDefault();
      var activeButton = document.getElementsByClassName("active")[0];
      activeButton.classList.remove("active");
      var sibling = activeButton.previousSibling;
      if (sibling) {
        sibling.classList.add("active");
      } else {
        var buttons = document.getElementsByClassName("selection");
        buttons[buttons.length - 1].classList.add("active");
      }
    },
    onEnter: function() {
      var activeButton = document.getElementsByClassName("active")[0];
      this.selectChoice(activeButton.dataset.id);
    },
    onChoiceClick: function(e) {
      this.selectChoice(e.target.dataset.id);
    },
    selectChoice(id) {
      var choice = this.choices.find(choice => choice.id == id);
      var that = this;
      var modal = this.$refs.modal;
      addTransitionListener(function() {
        that.$emit(events.choiceSelected, choice);
      }, modal);
      modal.classList.add("close");
    },
    choiceHover(e) {
      if (!e.target.classList.contains("active")) {
        var activeChoice = document.getElementsByClassName("active")[0];
        activeChoice.classList.remove("active");
        e.target.classList.add("active");
      }
    }
  }
};
</script>

<style>
.modal-container {
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}
.modal {
  margin: auto;
  padding: 20px 20px;
  border: solid grey 1px;
  background: black;
  opacity: 1;
  animation: enter 0.5s;
}
.close {
  animation: leave 0.5s;
}
.selection {
  border: solid grey 1px;
  margin-top: 10px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
}
.selection:first-child {
  margin-top: 0;
}
.selection.active {
  animation: active 1.5s infinite;
}
@keyframes active {
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
@keyframes enter {
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
@keyframes leave {
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
