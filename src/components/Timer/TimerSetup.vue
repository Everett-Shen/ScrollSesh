<template>
  <div>
    <input
      type="number"
      v-model="minutes"
      name="time_m"
      id="min"
      min="0"
      max="59"
    />
    
    : <span v-show="!showInput" @click="showInput = true" style="position: relative; top: 2px;  left: 7px">00</span>
    <input
      v-show="showInput"
      type="number"
      v-model="secondes"
      name="time_s"
      id="sec"
      max="59"
      min="0"
    />
  </div>
</template>

<script>
export default {
  name: "TimerSetup",
  data() {
    return {
      minutes: 10,
      secondes: 0,
      showInput: false
    };
  },
  methods: {
    sendTime() {
      this.$emit("set-time", {
        minutes: this.minutes,
        secondes: this.secondes
      });
    }
  }
};
</script>

<style>
input {
    border: 0px;
    text-align: end;
    width: 70px;
    height: 30px;
    position: relative;
    top: 2px;
    
}

#min {
    position: relative;
    left: 8px;
}

#sec {
    text-align: start;
    position: relative;
    left: 5px;
    width: 50px;
}

input:focus {
    outline: 0;
}

</style>
