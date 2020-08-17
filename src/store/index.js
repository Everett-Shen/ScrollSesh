import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windows: []
  },
  mutations: {
    addWindow(state, val) {
      state.windows.push(val);
    },
    closeWindows(state) {
      for (let i = 0; i < state.windows.length; i++) {
        state.windows[i].close();
      }
      state.windows = [];
    },
    removeWindow(state, window) {
      for (let i = 0; i < state.windows.length; i++) {
        if (state.windows[i] == window) {
          state.windows.splice(i, 1);
          break
        }
      }
    }
  },
  actions: {
    bringAllToFront() {
      for (let i = 0; i < this.state.windows.length; i++) {
        this.state.windows[i].focus();
      }
    }
  },
  modules: {}
});
