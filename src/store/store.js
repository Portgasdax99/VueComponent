import Vue from "vue";
import Vuex from "vuex";
import { navigation } from "../store/modules/navigation";
import { crawl } from "../store/modules/crawl"

Vue.use(Vuex);

export const store = new Vuex.Store({
  // state: {
  //   isCollapse: true,
  // }
  modules: {
    navigation,
    crawl,
  },
});
