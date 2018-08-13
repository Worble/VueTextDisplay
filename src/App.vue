<template>
  <div ref="app" id="app">
    <div ref="main">
    <FrontPage v-on:start-new="handleStartNew"/>
    </div>
  </div>
</template>

<script>
import FrontPage from "./components/FrontPage.vue";
import DisplayText from "./components/DisplayText.vue";
import DisplayTextContainer from "./components/DisplayTextContainer.vue";
import Vue from "vue";

export default {
  name: "app",
  components: {
    DisplayText,
    FrontPage,
    DisplayTextContainer
  },
  methods: {
    handleStartNew: function() {
      var ComponentClass = Vue.extend(DisplayTextContainer);
      var instance = new ComponentClass();
      instance.$mount(this.$refs.main); // pass nothing
      // this.$refs.app.innerHTML = "";
      // this.$refs.app.appendChild(instance.$el);
    }
  }
};
</script>
<style>
body {
  margin: 0;
  background-color: black;
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
