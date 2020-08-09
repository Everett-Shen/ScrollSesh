<template>
  <div id="navbar">
    <p id="logo">scrollsesh!</p>
    <Timer class="timer" ref="timer"></Timer>
    <b-button v-show="!isTiming" variant="outline-dark" class="start-button" @click="toggleTimer">Start</b-button>
    <b-button v-show="isTiming"  variant="outline-danger" class="start-button end-button" @click="toggleTimer">End</b-button>
  </div>
</template>

<script>
import Timer from "./Timer/Timer";
export default {
  name: "NavBar",
  components: {
    Timer
  },
  data() {
    return {
      isTiming: false
    }
  },
  methods: {
    toggleTimer() {
      this.isTiming = ! this.isTiming;
      if (this.isTiming) {
        this.$refs.timer.$refs.timerSetup.sendTime();
        this.$refs.timer.start();
      }
      else {
        this.$refs.timer.reset();
      }
    }
  }
};
</script>

<style scoped>
#navbar {
  /* background-color: greenyellow; */
  height: 60px;
  width: 100%;
  border-bottom: 1px solid black;
  color: black;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
#logo {
  font-size: 30px;
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
}

.start-button {
  float: right;
  margin-right: 20px;
  font-weight: 800;
  display: block;
  margin-top: 0;
  color: black;
}

.end-button {
  color: #dc3545;
}

.timer {
  display: inline-block;
  width: 500px;
  text-align: center;
  margin: auto;
}
</style>
