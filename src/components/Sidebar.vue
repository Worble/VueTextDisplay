<template>
  <div class="sidebar">
      <OptionsMenuIcon v-on:options-menu-clicked="this.openSettingsMenu"/>
      <SaveMenuIcon v-on:save-icon-clicked="this.saveIconClicked"/>
    </div>
</template>
<script>
import OptionsMenuIcon from "../components/OptionsMenuIcon.vue";
import SaveMenuIcon from "../components/SaveMenuIcon.vue";
import events from "../constants/events";
export default {
  name: "sidebar",
  components: {
    OptionsMenuIcon,
    SaveMenuIcon
  },
  methods: {
    openSettingsMenu: function() {
      this.$emit(events.optionsMenuClicked);
    },
    saveIconClicked: function() {
      this.$emit(events.saveIconClicked);
    }
  }
};
</script>
<style scoped>
.sidebar {
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
}
</style>
