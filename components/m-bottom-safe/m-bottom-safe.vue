<template>
  <!-- 你的组件内容 -->
  <view class="safe-area-placeholder" :style="safeAreaStyle"></view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const safeAreaStyle = ref('height: 64px'); // 默认值

onMounted(() => {
  // 判断是否为iPhone且需要安全距离
  uni.getSystemInfo({
    success: (res) => {
      const isIPhone = /iphone/i.test(res.model);
      const isNewIPhone = res.safeAreaInsets?.bottom > 0; // iPhoneX及以上机型

      if (isIPhone && isNewIPhone) {
        safeAreaStyle.value = 'padding-bottom: env(safe-area-inset-bottom);';
      } else {
        safeAreaStyle.value = 'height: '+uni.upx2px(64)+'px'; // 其他机型使用默认高度
      }
    }
  });
});
</script>

<style scoped>


.safe-area-placeholder {
  width: 100%;
}
</style>