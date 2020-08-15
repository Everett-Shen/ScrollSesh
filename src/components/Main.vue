<template>
  <div class="main">
    <div class="container">
      <Pane class="pane"></Pane>
      <Pane class="pane"></Pane>
      <Pane class="pane"></Pane>
      <Pane class="pane"></Pane>
      <Pane class="pane"></Pane>
    </div>
    <b-button
      variant="outline-dark"
      @click="bringAllToFront"
      class="bring-all-to-front"
      >bring all to front</b-button
    >
    <span class="attribution">made by everett shen </span>
  </div>
</template>

<script>
import Pane from "./Pane";
import Store from "@/store/index.js";
export default {
  name: "Main",
  components: {
    Pane
  },
  methods: {
    bringAllToFront() {
      Store.dispatch("bringAllToFront");
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  max-width: none;
}

.pane {
  margin: 20px;
  margin-left: 0.5%;
  margin-right: 0.5%;
}

.main {
  /* display: flex; For some reason getting rid of this messes up the height */
  flex-direction: column;
  width: 100%;
  max-width: none;
}

.bring-all-to-front {
  margin-left: 1%;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  margin-top: 10px;
  color: black;
  border: 1px solid black;
}

.attribution {
  float: right;
  margin-top: 10px;
  margin-right: 1%;
  font-weight: 100;
}
</style>
