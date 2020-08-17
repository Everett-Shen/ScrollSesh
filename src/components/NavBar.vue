<template>
  <div id="navbar">
    <p id="logo">scrollsesh!</p>
    <Timer class="timer" ref="timer" @timeUp="toggleTimer"></Timer>
    <b-button
      v-show="!isTiming"
      variant="outline-dark"
      class="start-button"
      @click="toggleTimer"
    >
      <b-icon-play-fill class="icon"></b-icon-play-fill>
      start</b-button
    >
    <b-button
      v-show="isTiming"
      variant="outline-danger"
      class="start-button end-button"
      @click="toggleTimer"
      ><b-icon-stop-fill class="icon"></b-icon-stop-fill> End</b-button
    >
  </div>
</template>

<script>
import Timer from "./Timer/Timer";
import Store from "@/store/index.js";

export default {
  name: "NavBar",
  components: {
    Timer
  },
  data() {
    return {
      isTiming: false,
      windows: []
    };
  },
  methods: {
    toggleTimer() {
      this.isTiming = !this.isTiming;
      this.$emit("toggleGradient"); // toggle gradient animation
      if (this.isTiming) {
        // open panes
        this.$refs.timer.$refs.timerSetup.sendTime();
        this.$refs.timer.start();
        let panes = document.getElementsByClassName("pane");
        for (let i = 0; i < panes.length; i++) {
          let pane = panes[i];
          let url = pane.getElementsByClassName("url")[0].value;
          if (url == "") continue;
          let height = pane.scrollHeight - 60;
          let width =
            pane.scrollWidth - (window.outerWidth - window.innerWidth);
          let position = this.offset(pane)
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
          Store.commit("addWindow", window.open(url, url, args));
          this.$emit("update")
        }
      } else {
        this.$refs.timer.reset();
        Store.commit("closeWindows");
        this.$emit("update")
      }
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
    },
//   getPosition(el) {
//     var xPos = 0;
//     var yPos = 0;
//    
//     while (el) {
//       if (el.tagName == "BODY") {
//         // deal with browser quirks with body/window/document and page scroll
//         var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
//         var yScroll = el.scrollTop || document.documentElement.scrollTop;
//    
//         xPos += (el.offsetLeft - xScroll + el.clientLeft);
//         yPos += (el.offsetTop - yScroll + el.clientTop);
//       } else {
//         // for all other non-BODY elements
//         xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//         yPos += (el.offsetTop - el.scrollTop + el.clientTop);
//       }
//    
//       el = el.offsetParent;
//     }
//     return {
//       x: xPos,
//       y: yPos
//     };
// },
    getScrollbarWidth() {
      return window.innerWidth - document.clientWidth;
    }
    // closeWindows() {
    //   Store.commit("closeWindows");
    // }
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
  justify-content: space-between;
  align-items: center;
}
#logo {
  font-size: 30px;
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
}

.start-button {
  float: right;
  margin-right: 20px;
  font-weight: 800;
  display: block;
  margin-top: 0;
  color: black;
  border: 1px solid black;
}

.end-button {
  color: #dc3545;
  border: 1px solid #dc3545;
}

.timer {
  display: inline-block;
  width: 150px;
  text-align: center;
  position: absolute;
  left: 50%;
  margin-left: -90px;
}

.icon {
  margin-left: -5px;
}
</style>
