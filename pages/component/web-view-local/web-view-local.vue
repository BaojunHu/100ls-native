<template>
  <m-loading v-if="isLoading" text="加载中..." direction="column" />
  <view v-show="!isLoading && !isLoadFailed" class="webview-container">
    <web-view
      style="width: 100vw; height: 100vh"
      :src="url"
      @message="getMessage"
      @error="handleWebViewError"
      :ref="webviewRef"
    ></web-view>
  </view>

  <!-- 加载失败页面 -->
  <view v-if="isLoadFailed" class="load-failed-container">
    <view class="failed-content">
      <view class="failed-icon-placeholder">
        <text class="icon-text">!</text>
      </view>
      <m-text :size="32" class="failed-title" color="grey-8"
        >页面加载失败</m-text
      >
      <m-text :size="28" class="failed-desc" color="grey-6"
        >网络连接异常或页面暂时无法访问</m-text
      >
      <m-button @click="retryLoad" class="retry-btn">重新加载</m-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { HomeHistoryRow } from "@/services/home";
import { onLoad } from "@dcloudio/uni-app";
import { paramStrToJson } from "@dimjs/utils";
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";
import { usePageInParams } from "@/router/hooks";
import { RouterEnum } from "@/router/constants";
import { getAuthToken, getUserInfo } from "@/tools/user-info";
import { navigateTo } from "@/router/main";

// 声明 getCurrentPages 全局函数
declare function getCurrentPages(): any[];
const isLoading = ref(true);
const isLoadFailed = ref(false);
const url = ref("");
const timeoutTimer = ref(null);
const TIMEOUT_DURATION = 60000; // 30秒超时

// #ifndef APP
isLoading.value = false;
// #endif

const webviewRef = ref(null);

const getMessage = (event) => {
  const action = event?.detail?.data?.[0]?.action;

  if (action === "loaded") {
    console.log("WebView 加载完成，开始注入数据");
    handleOnLoad();
  } else if (action === "error") {
    console.error("WebView 加载失败:", event?.detail?.data?.[0]);
    isLoadFailed.value = true;
    isLoading.value = false;
  } else if (action === "back") {
    uni.navigateBack();
  } else if (action === "rotateWindow") {
    // #ifdef APP-PLUS
    plus.screen.lockOrientation("landscape-primary"); // 横屏
    // #endif
  } else if (action === "navigateTo") {
    const options = event?.detail?.data?.[0]?.options;
    handleNavigate(options);
  }
};

const handleNavigate = (options) => {
  // uni.showModal({
  //   title: "navigateTo++++++++++-------",
  //   content: JSON.stringify(options),
  // });
  navigateTo(options);
  // uni.switchTab({
  //   url: "/views/profile/index",
  // });
};

const handleWebViewError = (event) => {
  console.error("WebView 加载错误:", event);
  isLoadFailed.value = true;
  isLoading.value = false;
  clearTimeoutTimer();
};

const startTimeout = () => {
  // 清除之前的定时器
  if (timeoutTimer.value) {
    clearTimeout(timeoutTimer.value);
  }

  // 设置30秒超时
  timeoutTimer.value = setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false;
      isLoadFailed.value = true;
    }
  }, TIMEOUT_DURATION);
};

const clearTimeoutTimer = () => {
  if (timeoutTimer.value) {
    clearTimeout(timeoutTimer.value);
    timeoutTimer.value = null;
  }
};

const retryLoad = () => {
  isLoadFailed.value = false;
  isLoading.value = true;
  startTimeout();

  // 重新加载页面
  // #ifdef APP-PLUS
  if (webviewRef.value) {
    webviewRef.value.reload();
  }
  // #endif
};

const handleOnLoad = () => {
  clearTimeoutTimer();
  isLoading.value = false;
  isLoadFailed.value = false;

  // // 延迟执行数据注入，确保 WebView 完全加载
  // setTimeout(() => {
  //   injectDataToWebView();
  // }, 100); // 延迟 100ms 确保 WebView 完全加载
};

// 数据注入函数，支持重试机制
// const injectDataToWebView = (retryCount = 0) => {
//   const maxRetries = 3;

//   try {
//     const clientInfo = {
//       ...(uni.getSystemInfoSync() || {}),
//       // appVersion:
//     };
//     const appRouterMap = RouterEnum;

//     // 获取 WebView 上下文（兼容多平台）
//     // #ifdef APP-PLUS
//     // 在 Vue 3 Composition API 中，使用 getCurrentPages 获取当前页面实例
//     const pages = getCurrentPages();
//     const currentPage = pages[pages.length - 1];
//     const currentWebview = currentPage.$getAppWebview();

//     // 获取 WebView 子组件实例
//     const webInstance = currentWebview?.children?.()?.[0];
//     webviewRef.value = webInstance;
//     // #endif

//     const authToken = getAuthToken();
//     const userInfo = getUserInfo();

//     const appData = {
//       clientInfo: clientInfo,
//       appRouterMap: appRouterMap,
//       authToken,
//       userInfo: userInfo,
//     };

//     // 安全地注入数据到 WebView
//     if (webviewRef.value && webviewRef.value.evalJS) {
//       try {
//         // 先检查 WebView 是否已经准备好
//         const checkReadyScript = `
//           if (typeof window !== 'undefined' && document.readyState === 'complete') {
//             window.appData = ${JSON.stringify(appData)};
//             console.log('WebView 数据注入成功');
//             true;
//           } else {
//             console.log('WebView 还未完全准备好，延迟注入');
//             false;
//           }
//         `;

//         webviewRef.value.evalJS(checkReadyScript);
//         console.log("WebView 数据注入成功");
//       } catch (evalError) {
//         console.error("WebView evalJS 执行失败:", evalError);

//         // 如果还有重试次数，延迟重试
//         if (retryCount < maxRetries) {
//           console.log(
//             `数据注入失败，${500}ms 后重试 (${retryCount + 1}/${maxRetries})`
//           );
//           setTimeout(() => {
//             injectDataToWebView(retryCount + 1);
//           }, 500);
//         } else {
//           console.error("WebView 数据注入最终失败，已达到最大重试次数");
//           // 尝试其他方式注入数据
//           if (webviewRef.value.postMessage) {
//             webviewRef.value.postMessage({
//               data: {
//                 type: "appData",
//                 payload: appData,
//               },
//             });
//           }
//         }
//       }
//     } else {
//       console.warn("WebView 实例不可用，无法注入数据");

//       // 如果还有重试次数，延迟重试
//       if (retryCount < maxRetries) {
//         console.log(
//           `WebView 实例不可用，${500}ms 后重试 (${
//             retryCount + 1
//           }/${maxRetries})`
//         );
//         setTimeout(() => {
//           injectDataToWebView(retryCount + 1);
//         }, 500);
//       }
//     }
//   } catch (error) {
//     console.error("WebView 数据注入过程中发生错误:", error);
//     // 即使数据注入失败，也不应该影响页面显示

//     // 如果还有重试次数，延迟重试
//     if (retryCount < maxRetries) {
//       console.log(
//         `数据注入出错，${500}ms 后重试 (${retryCount + 1}/${maxRetries})`
//       );
//       setTimeout(() => {
//         injectDataToWebView(retryCount + 1);
//       }, 500);
//     }
//   }
// };

onLoad((options) => {
  const targetUrl = decodeURIComponent(options.url);
  if (targetUrl) {
    url.value = decodeURIComponent(targetUrl);
    // 开始超时计时
    startTimeout();
  }
});

onUnmounted(() => {
  clearTimeoutTimer();
});
</script>

<style scoped>
.webview-container {
  width: 100vw;
  height: 100vh;
}

.load-failed-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.failed-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx;
  text-align: center;
}

.failed-icon-placeholder {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 40rpx;
  background-color: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

.icon-text {
  color: white;
  font-size: 60rpx;
  font-weight: bold;
}

.failed-title {
  margin-bottom: 20rpx;
  font-weight: 500;
}

.failed-desc {
  margin-bottom: 60rpx;
  line-height: 1.5;
}

.retry-btn {
  min-width: 200rpx;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 500;
}
</style>
