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
import actions from "./constants/actions";

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
  created: function() {
    this.$store.dispatch(actions.restoreOptions);
  },
  methods: {
    handleStartNew: function() {
      var that = this;
      this.$store.dispatch(actions.getNextMessage, 1).then(function() {
        var ComponentClass = Vue.extend(DisplayTextContainer);
        var instance = new ComponentClass({ parent: that });
        instance.$on(events.addNoScroll, that.addNoScroll);
        instance.$on(events.removeNoScroll, that.removeNoScroll);
        instance.$mount(that.$refs.main);
      });
    },
    openSettingsMenu: function() {
      this.addNoScroll();
      this.showOptionsModal = true;
    },
    closeSettingsMenu: function() {
      this.removeNoScroll();
      this.showOptionsModal = false;
    },
    addNoScroll: function() {
      document.body.classList.add("no-scroll");
    },
    removeNoScroll: function() {
      document.body.classList.remove("no-scroll");
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
  display: block;
  position: absolute;
  margin: 15px 35px;
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
