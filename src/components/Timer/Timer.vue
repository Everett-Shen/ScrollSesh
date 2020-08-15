/* eslint-disable prettier/prettier */
<template>
  <div style="display: inline-block">
    <timer-setup
      v-if="!time"
      @set-time="setTime"
      ref="timerSetup"
    ></timer-setup>
    <div v-else>
      <timer :time="prettyTime"></timer>
      <div>
        <!-- <button v-if="!isRunning" @click="start">Start</button> -->
        <!-- <button v-if="isRunning" @click="stop">Stop</button>
      <button @click="reset">Reset</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from "./Countdown";
import TimerSetup from "./TimerSetup";
export default {
  name: "Timer",
  components: {
    "timer-setup": TimerSetup,
    timer: Countdown
  },
  data() {
    return {
      isRunning: false,
      minutes: 0,
      secondes: 0,
      time: 0,
      timer: null,
      sound: new Audio(
        "http://s1download-universal-soundbank.com/wav/nudge.wav"
      )
    };
  },
  computed: {
    prettyTime() {
      let time = this.time / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    }
  },
  methods: {
    start() {
      this.isRunning = true;
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
            this.time--;
          } else {
            clearInterval(this.timer);
            this.$emit("timeUp");
            this.reset();
          }
        }, 1000);
      }
    },
    stop() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      this.stop();
      this.time = 0;
      this.secondes = 0;
      this.minutes = 0;
    },
    setTime(payload) {
      this.time = payload.minutes * 60 + parseInt(payload.secondes);
    }
  }
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
}
input[type="number"] {
  height: 30px;
  font-size: inherit;
  width: 100%;
  border: 0px;
}

button {
  padding: 10px;
}

[v-cloak] {
  opacity: 0;
}

label {
  width: 20%;
  padding: 10px 0;
  display: inline-block;
}

.timer {
  font-size: 30px;
}
</style>
