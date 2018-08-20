<template>
    <div class="modal-container" @click="onClick">
        <div ref="modal" class="modal">
            <div v-for="option in $store.state.options" v-bind:key="option.ordinal">
                {{option.name}}: {{option.value}}
            </div>
        </div>
    </div>
</template>

<script>
import events from "../events/events";
import addTransitionListener from "../helpers/addTransitionListener";

export default {
  name: "OptionsContainer",
  methods: {
    onClick: function(event) {
      if (!event.target.closest(".center")) {
        this.$refs.modal.classList.add("close");
        var that = this;
        addTransitionListener(function() {
          that.$emit(events.closeModal);
        }, this.$refs.modal);
      }
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
