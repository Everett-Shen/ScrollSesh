<template>
  <div id="app" :class="{ gradient: playing }">
    <b-overlay :show="showInfo" class="overlay" :blur="blur">
      <img
        class="exit"
        v-show="showInfo"
        @click="showInfo = false"
        src="@/assets/plus2.svg"
        @keyup.esc="showInfo = false"
      />
      <NavBar @update="update" @help="showInfo = true"></NavBar>
      <Main class="main" :windowNumber="windowNumber"></Main>

      <template v-slot:overlay>
        <div ref="dialog" class="text-center p-3" :style="infoStyle">
          <div class="content">
            <h1><strong>scrollsesh</strong></h1>

            <p>
              ver. 1.0<br />
              developed by
              <a href="https://github.com/Everett-Shen" target="_blank">
                everett shen</a
              >
            </p>
            <br />
            <div class="how-to-use">
              <h3>how to use</h3>
              <ol style="float: left; margin-left: 15px">
                <li style="float: left">
                  Open the desired number of browsing windows (panes) by
                  clicking on the plus signs
                </li>
                <br />
                <li style="float: left">
                  Type in the URLs of the sites you wish to browse
                </li>
                <br />
                <li style="float: left">
                  Determine how long you want your session to be by adjusting
                  the timer on the top
                </li>
                <br />
                <li style="float: left">
                  Press "start" on the top right to begin your session. All
                  panes will automatically be closed when you close Scrollsesh,
                  or if the time runs out.
                </li>
                <br />
                <li style="float: left">
                  If your panes get hidden by other windows, click “bring all to
                  front” to bring them back into view
                </li>
              </ol>
            </div>

            <div class="how-to-use">
              <h3>notes</h3>

              <ul style="float: left; margin-left: 15px">
                <li style="float: left">
                  Scrollsesh adapts to the size of your display and
                  automatically determines the optimal number of panes for your
                  screen
                </li>
                <br />
                <li style="float: left">
                  To open additional panes during your session, type in a URL
                  and hit enter
                </li>
                <br />
                <li style="float: left">
                  Scrollsesh is best suited for browsing mobile sites on desktop
                  monitors
                </li>
                <br /><br />
                <li style="float: left">
                  Gradient animation by
                  <a href="https://manuelpinto.in/" target="_blank">
                    Manuel Pinto</a
                  >
                </li>
              </ul>
            </div>

            <div class="how-to-use">
              <h3>why scrollsesh?</h3>
              <p>
                Today’s social media platforms are designed to get users hooked,
                to occupy every moment of our free time and yet still leave us
                depressed and dissatisfied if unchecked. Scrollsesh was created
                with the belief that limits are necessary, empowering users to
                consume social media in a controlled and conscious manner. By
                splitting your browsing into timed sessions and providing
                multiple panes to jump back and forth from, Scrollsesh allows
                you to remain conscious of the world outside your social media,
                controlling your content instead of the other way around.
                Scrollsesh brings together the best of both worlds, combining
                the larger display of desktop with the simplicity and design of
                mobile sites, simulating the experience of browsing on multiple
                phones at the same time while protecting your eyes.
              </p>
            </div>
            <br /><br /><br />
            <p>
              <em style="float: right"
                >&ldquo;a better way to browse social media. period&rdquo;</em
              >
            </p>
            <!-- <div class="d-flex">
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              close
            </b-button>
          </div> -->
          </div>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Main from "./components/Main";
import Store from "./store/index";
export default {
  name: "App",
  components: {
    NavBar,
    Main
  },
  created() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("beforeunload", this.closeWindows);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    this.onResize();
  },

  data() {
    return {
      playing: false,
      windowNumber: 1,
      showInfo: true,
      blur: "1px"
    };
  },
  computed: {
    paneNumber() {
      return Store.state.windows.length;
    },
    minWidth() {
      return Store.state.minWidth;
    },
    panes() {
      return Store.state.windows;
    },
    infoStyle() {
      return (
        "overflow: auto; height: " +
        window.innerHeight * 0.8 +
        "px; width: 100%; "
        // "px; width: " +
        // width * 0.8 +
        // "px"
      );
    }
  },
  methods: {
    update() {
      if (this.paneNumber == 0) this.playing = false;
      else this.playing = true;
    },
    closeWindows() {
      Store.commit("closeWindows");
    },
    onResize() {
      this.windowNumber = Math.floor(window.innerWidth / this.minWidth);
      if (this.windowNumber == 0) this.windowNumber = 1;
      document.getElementById("app").height = window.innerHeight;
    }
  },
  watch: {
    paneNumber() {
      if (this.paneNumber == 0) this.playing = false;
      else this.playing = true;
    }

    // openPanes() {
    //   if (this.openPanes == 0) this.playing = false;
    //   else this.playing = true;
    // }
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
  height: calc(100%);
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  height: 100%;
  width: 100%;
  max-width: none;
}

.gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 500% 500%;
  animation: gradient 30s ease infinite;
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

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 5px;
  height: 5px;
  border: none;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #e6e6e6;
}

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1000;
}

.how-to-use {
  max-width: 700px;
  width: 100%;
  text-align: left;
  display: block;
  padding: 5px;
  margin: 0px auto;
}

.exit {
  position: absolute;
  right: 2px;
  width: 120px;
  height: 120px;
  top: 2px;
  z-index: 2000;
  cursor: pointer;
  transform: rotate(45deg);
}

.content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
