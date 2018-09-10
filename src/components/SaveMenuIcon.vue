<template>
<div class="save-icon-container" v-on:click="this.onClick">
  <svg class="save-icon" xmlns="http://www.w3.org/2000/svg" id="Layer_1" enable-background="new 0 0 100 100" viewBox="0 0 100 100" width="100px" height="100px" xmlns:xml="http://www.w3.org/XML/1998/namespace" xml:space="preserve" version="1.1" style="fill:white">
    <g>
      <path d="M 83.996 7 h -3.385 H 41.96 H 12.201 C 9.333 7 7 9.333 7 12.201 v 75.6 C 7 90.667 9.333 93 12.201 93 H 15.4 h 69.061 h 3.34 C 90.668 93 93 90.667 93 87.801 V 16.005 L 83.996 7 Z M 78.611 9 v 15.802 c 0 1.764 -1.436 3.198 -3.199 3.198 h -29.25 c -1.766 0 -3.202 -1.435 -3.202 -3.198 V 9 H 78.611 Z M 17.4 91 V 45.749 c 0 -1.764 1.437 -3.199 3.201 -3.199 h 58.66 c 1.764 0 3.199 1.435 3.199 3.199 V 91 H 17.4 Z M 91 87.801 C 91 89.565 89.564 91 87.801 91 h -3.34 V 45.749 c 0 -2.867 -2.332 -5.199 -5.199 -5.199 h -58.66 c -2.868 0 -5.201 2.333 -5.201 5.199 V 91 h -3.199 C 10.437 91 9 89.565 9 87.801 v -75.6 C 9 10.436 10.437 9 12.201 9 H 40.96 v 15.802 c 0 2.866 2.334 5.198 5.202 5.198 h 29.25 c 2.867 0 5.199 -2.332 5.199 -5.198 V 9 h 2.557 L 91 16.833 V 87.801 Z" />
      <rect x="71.352" y="12.201" width="4.209" height="12.473" />
      <rect x="26.375" y="54.25" width="47.25" height="2" />
      <rect x="26.375" y="63.875" width="47.25" height="2" />
      <rect x="26.375" y="72.625" width="47.25" height="2" />
    </g>
  </svg>
</div>
</template>
<script>
import events from "../constants/events";
export default {
  name: "SaveMenuIcon",
  methods: {
    onClick: function() {
      this.$emit(events.saveIconClicked);
    }
  }
};
</script>
<style>
.save-icon-container {
  margin-top: 5px;
  display: flex;
}
.save-icon {
  cursor: pointer;
  height: 30px;
  width: 30px;
  opacity: 0.3;
  transition: 0.2s;
}
.save-icon:hover {
  opacity: 1;
}
</style>