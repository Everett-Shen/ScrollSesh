<template>
  <div class="pane" ref="pane">
    <div v-show="!clicked" class="before-clicked">
      <img class="plus" @click="clicked = true" src="@/assets/plus2.svg" />
    </div>

    <div v-show="clicked" class="after-clicked">
      <label for="url" class="label">url</label> <br /><br />
      <input
        type="text"
        class="url"
        ref="url"
        @focus="fill"
        @keydown.enter="openPane"
      />
    </div>
  </div>
</template>

<script>
import Store from "@/store/index.js";
export default {
  name: "Pane",
  components: {},
  data() {
    return {
      clicked: false
    };
  },
  methods: {
    fill(e) {
      if (e.target.value == "") e.target.value = "https://www.";
    },
    openPane() {
      let url = this.$refs.url.value;
      let pane = this.$refs.pane;
      if (url == "") return;
      let height = pane.scrollHeight - 60;
      let width = pane.scrollWidth - (window.outerWidth - window.innerWidth);
      let left = this.offset(pane).left;
      let top = this.offset(pane).top;
      let args =
        "height=" +
        height +
        ",width=" +
        width +
        ",left=" +
        left +
        ",top=" +
        top +
        ",resizable=no, toolbar=no,menubar=no,location=no,directories=no,status=no,titlebar=no";
      let newWin = window.open(url, url, args);

      var loop = setInterval(function() {
        if (newWin.closed) {
          clearInterval(loop);
          Store.commit("removeWindow", newWin);
        }
      }, 500);
      Store.commit("addWindow", newWin);
    },
    offset(el) {
      var rect = el.getBoundingClientRect();
      // scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      // scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top:
          rect.top + window.screenY + (window.outerHeight - window.innerHeight),
        left:
          rect.left +
          window.screenX +
          (window.outerWidth - window.innerWidth) -
          10
      };
    }
  }
};
</script>

<style scoped>
.pane {
  width: 100%;
  height: 100%;
  /* margin: auto; */
  border: 1px solid black;
  position: relative;
}

.plus {
  height: 100%;
  width: 100%;
  margin: 0px auto;
  cursor: pointer;
  position: relative;
  bottom: 50px;
  z-index: 100;
}

.label {
  font-size: 2em;
  width: 100%;
  height: 30px;
  font-weight: 100;
  text-align: center;
}

.url {
  margin: 0px auto;
  width: 80%;
  height: 40px;
  display: block;
  text-align: center;
  font-weight: 100;
  border: 1px solid black;
}

.url:focus {
  outline: none;
}

.before-clicked {
  width: 40%;
  width: 40%;
  position: absolute;
  top: 40%;
  left: 50%;
  z-index: 10000;
  transform: translateX(-50%);
}

.after-clicked {
  position: absolute;
  width: 100%;
  top: 40%;
}
</style>
