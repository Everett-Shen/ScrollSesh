<template>
  <div class="main">
    <div class="container">
      <Pane v-for="i in windowNumber" :key="i" class="pane"></Pane>
    </div>
    <div class="footer">
      <b-button
        variant="outline-dark"
        @click="bringAllToFront"
        class="bring-all-to-front"
        ><b-icon-front class="icon"></b-icon-front> bring all to front</b-button
      >
      <span class="attribution">made by everett shen </span>
    </div>
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
  props: {
    windowNumber: {
      type: Number,
      default: 1
    }
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
  margin-bottom: 5px;
}

.pane {
  margin: 20px;
  margin-left: 0.5%;
  margin-right: 0.5%;
}

.main {
  /* display: flex; For some reason getting rid of this messes up the height */

  width: 100%;
  height: 100%;
  max-width: none;
}

.bring-all-to-front {
  margin-left: calc(0.5% + 15px);
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  color: black;
  border: 1px solid black;
}

.attribution {
  float: right;
  margin-right: calc(0.5% + 15px);
  font-weight: 100;
}
.icon {
  margin-left: -5px;
  margin-right: 4px;
}

.footer {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
