<template>
  <div ref="app" id="app">
    <div ref="main" class="container">
      <FrontPage v-on:start-new="handleStartNew"/>
    </div>
    <OptionsMenuIcon v-on:options-menu-clicked="this.openSettingsMenu"/>
    <div v-if="this.showOptionsModal">
      <OptionsMenu v-on:close-settings-menu="closeSettingsMenu"/>
    </div>
  </div>
</template>

<script>
import FrontPage from "./components/FrontPage.vue";
import DisplayTextContainer from "./components/DisplayTextContainer.vue";
import OptionsMenu from "./components/OptionsMenu.vue";
import OptionsMenuIcon from "./components/OptionsMenuIcon";
import Vue from "vue";
import events from "./constants/events";

export default {
  name: "app",
  components: {
    FrontPage,
    DisplayTextContainer,
    OptionsMenuIcon,
    OptionsMenu
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
      this.$refs.app.classList.add("no-scroll");
      this.showOptionsModal = true;
    },
    closeSettingsMenu: function() {
      this.$refs.app.classList.remove("no-scroll");
      this.showOptionsModal = false;
    }
  }
};
</script>
<style>
body {
  background-color: black;
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  height: 100vh;
  margin: 0;
}

#app {
  height: auto;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: 15px 35px;
  display: block;
  position: absolute;
}

.container {
  height: 100%;
  width: 100%;
}

* {
  outline: none;
}

.no-scroll {
  overflow: hidden;
}
</style>
