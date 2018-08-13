<template>
  <div id="app">
    <DisplayTextContainer></DisplayTextContainer>
  </div>
</template>

<script>
import FrontPage from "./components/FrontPage.vue";
import DisplayText from "./components/DisplayText.vue";
import DisplayTextContainer from "./components/DisplayTextContainer.vue";

export default {
  name: "app",
  components: {
    DisplayText,
    FrontPage,
    DisplayTextContainer
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
