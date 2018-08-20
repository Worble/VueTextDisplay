<template>
  <div ref="app" id="app">
    <div ref="main">
      <FrontPage v-on:start-new="handleStartNew"/>
    </div>
    <OptionsMenuIcon v-on:options-menu-clicked="this.openSettingsMenu"/>
    <div v-if="this.showOptionsModal">
      <OptionsContainer v-on:close-settings-menu="closeSettingsMenu"/>
    </div>
  </div>
</template>

<script>
import FrontPage from "./components/FrontPage.vue";
import DisplayTextContainer from "./components/DisplayTextContainer.vue";
import OptionsContainer from "./components/OptionsContainer.vue";
import OptionsMenuIcon from "./components/OptionsMenuIcon";
import Vue from "vue";
import events from "./events/events";

export default {
  name: "app",
  components: {
    FrontPage,
    DisplayTextContainer,
    OptionsMenuIcon,
    OptionsContainer
  },
  data: function() {
    return {
      showOptionsModal: false
    };
  },
  methods: {
    handleStartNew: function() {
      var ComponentClass = Vue.extend(DisplayTextContainer);
      var instance = new ComponentClass({ parent: this });
      instance.$mount(this.$refs.main);
    },
    openSettingsMenu: function() {
      this.showOptionsModal = true;
    },
    closeSettingsMenu: function() {
      this.showOptionsModal = false;
    }
  }
};
</script>
<style>
body {
  margin: 15px 35px;
  background-color: black;
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

* {
  outline: none;
}
</style>
