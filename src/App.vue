<template>
  <div id="app">
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,900;1,300;1,400;1,700&display=swap');
#app {
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
