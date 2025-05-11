import App from "./App";
import store from "./store";

import "./styles";
import initModal from "@/components/m-modal/init-m-modal";

import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import Vuex from "vuex";
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.use(Pinia.createPinia());
  app.config.globalProperties.$adpid = "1111111111";
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00",
  };
  // 调用 initModal 并绑定到 Vue 实例  可以自定义样式的Modal
  initModal(app);
  return {
    app,
    Vuex, // 如果 nvue 使用 vuex 的各种map工具方法时，必须 return Vuex
    Pinia, // 此处必须将 Pinia 返回
  };
}
