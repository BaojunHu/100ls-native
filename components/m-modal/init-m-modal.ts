import Vuex from 'vuex';

export default function initModal(v) {
  // 挂载 store 到全局 Vue 实例
  const modalStore = new Vuex.Store({
    state: {
      show: false,
      title: "标题",
      content: "内容",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "var(--v-color-grey-9)",
      cancelBackgroundColor: "var(--v-color-grey-4)",
      confirmText: "确定",
      confirmColor: "#fff",
      confirmBackgroundColor: "var(--v-color-primary-7)",
      success: null,
    },
    mutations: {
      hideModal(state) {
        // 小程序导航条页面控制
        // #ifndef H5
        if (state.hideTabBar) {
          wx.showTabBar();
        }
        // #endif
        state.show = false;
      },
      showModal(state, data) {
        Object.assign(state, data);
        console.log(state);
        state.show = true;
      },
      success(state, res) {
        const cb = state.success;
        const resObj = {
          cancel: false,
          confirm: false,
        };
        res === "confirm" ? (resObj.confirm = true) : (resObj.cancel = true);
        cb && cb(resObj);
      },
    },
  });

  // 将 modalStore 和 showModal 方法挂载到全局属性
  v.config.globalProperties.$modalStore = modalStore;
  v.config.globalProperties.$showModal = function (option) {
    if (typeof option === "object") {
      // #ifndef H5
      if (option.hideTabBar) {
        wx.hideTabBar();
      }
      // #endif

      modalStore.commit("showModal", option);
    } else {
      throw new Error("配置项必须为对象，传入的值为：" + typeof option);
    }
  };
}