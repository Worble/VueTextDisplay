<template>
  <div>
    <div ref="app" id="app">
      <div ref="main" class="container">
        <FrontPage v-on:start-new="handleStartNew" v-on:load="handleStart"/>
      </div>
      <div v-if="this.showOptionsModal">
        <OptionsMenu v-on:close-settings-menu="closeSettingsMenu" />
      </div>
      <div class="game-save" ref="gameSave">
        Game Saved
      </div>
    </div>
    <SideBar v-on:options-menu-clicked="this.openSettingsMenu" v-on:save-icon-clicked="saveIconClicked"/>
  </div>
</template>

<script>
import FrontPage from "./components/FrontPage.vue";
import DisplayTextContainer from "./components/DisplayTextContainer.vue";
import OptionsMenu from "./components/OptionsMenu.vue";
import SideBar from "./components/Sidebar.vue";
import Vue from "vue";
import events from "./constants/events";
import actions from "./constants/actions";
import generateGuid from "./helpers/generateGuid";
import image from "./assets/background2.jpg";

export default {
  name: "app",
  components: {
    FrontPage,
    DisplayTextContainer,
    OptionsMenu,
    SideBar
  },
  data: function() {
    return {
      showOptionsModal: false
    };
  },
  created: function() {
    this.$store.dispatch(actions.restoreOptions);
  },
  mounted: function() {
    document.body.style.backgroundImage = "url(" + image + ")";
  },
  methods: {
    handleStartNew: function() {
      var guid = generateGuid();
      this.$store.dispatch(actions.setGameId, guid);
      this.handleStart(1);
    },
    handleStart: function(id) {
      var that = this;
      this.$store.dispatch(actions.getNextMessage, id).then(function() {
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
    },
    saveIconClicked: async function() {
      var id = this.$store.state.currentMessage.id;
      var gameId = this.$store.state.gameId;
      if (id && gameId) {
        await this.$store.dispatch(actions.saveEffects);
        localStorage.setItem(
          "save",
          JSON.stringify({ gameId: gameId, messageId: id })
        );
        this.$refs.gameSave.style.transitionDuration = "0s";
        this.$refs.gameSave.style.opacity = 1;
        var that = this;
        window.setTimeout(function() {
          that.$refs.gameSave.style.transitionDuration = "2s";
          that.$refs.gameSave.style.opacity = 0;
        }, 100);
      }
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
  background-size: cover;
}

#app {
  height: auto;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
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

.game-save {
  opacity: 0;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 7px 15px;
  margin: 10px 20px;
  border: solid white 1px;
  border-radius: 3px;
  text-align: center;
  z-index: 10;
  background: black;
}
</style>
