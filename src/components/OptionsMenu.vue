<template>
    <div class="modal-container" @click="onClick">
        <div ref="modal" class="modal">
            <div>
              {{$store.state.options.animationSpeed.name}}: <input type="number" :value="$store.state.options.animationSpeed.value" step="0.01" v-on:change="handleAnimationSpeedChange"/>
            </div>
            <br/>
            <div>
              {{$store.state.options.disableAnimation.name}}: <input type="checkbox" :value="$store.state.options.disableAnimation.value" :checked="$store.state.options.disableAnimation.value" v-on:change="handleDisableAnimationChange"/>
            </div>
            <br/>
            <div>
              {{$store.state.options.disableScrollAnimation.name}}: <input type="checkbox" :value="$store.state.options.disableScrollAnimation.value" :checked="$store.state.options.disableScrollAnimation.value" v-on:change="handleDisableScrollAnimationChange"/>
            </div>
        </div>
    </div>
</template>

<script>
import events from "../constants/events";
import actions from "../constants/actions";
import addTransitionListener from "../helpers/addTransitionListener";

export default {
  name: "OptionsMenu",
  methods: {
    onClick: function(event) {
      if (!event.target.closest(".modal")) {
        this.$refs.modal.classList.add("close");
        var that = this;
        addTransitionListener(function() {
          that.$emit(events.closeSettingsModal);
        }, this.$refs.modal);
      }
    },
    handleAnimationSpeedChange: function(event) {
      this.$store.dispatch(
        actions.changeAnimationSpeed,
        new Number(event.target.value)
      );
    },
    handleDisableAnimationChange: function() {
      this.$store.dispatch(actions.toggleDisableAnimation);
    },
    handleDisableScrollAnimationChange: function() {
      this.$store.dispatch(actions.toggleDisableScrollAnimation);
    }
  }
};
</script>

<style scoped>
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
