<template>
  <div id="app" :class="{ gradient: playing }">
    <NavBar></NavBar>
    <Main class="main"></Main>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Main from "./components/Main";
import Store from "./store/index"
export default {
  name: "App",
  components: {
    NavBar,
    Main
  },
  data() {
    return {
      playing: false
    };
  },
  computed: {
    paneNumber() {
      return Store.state.windows.length;
    }
  },
  watch: {
    paneNumber() {
      if (this.paneNumber == 0) this.playing = false;
      else this.playing = true;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,900;1,300;1,400;1,700&display=swap");
#app {
  height: 100%;
  width: 100%;
}
html,
body {
  font-family: "Roboto", sans-serif;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  height: 90%;
  width: 100%;
  max-width: none;
}

.gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

input {
  background-color: transparent;
}
</style>
