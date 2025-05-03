<template>
  <!-- TODO 这里props.style 是一个对象 -->
  <view :class="props.class" class="narbar-box" :style="props.style">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="`padding-top: ${statusBarHeight}px`" />
    <!-- 真正的导航栏内容 -->
    <view :class="['nav-bar', { 'navibar-def-warp': !!title }]">
      <template v-if="!!title">
        <view class="back-warp" @click="back">
          <m-icon :type="leftIcon" :size="40" bold color="grey-9" />
        </view>
        <m-text bold :size="34" color="grey-9">{{ title }}</m-text>
      </template>
      <template v-else>
        <slot />
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
// import { RouterEnum } from '@/router/constants';
// import { navigateBack } from '@/router/main';
import type { TPlainObject } from '@/type/common';
import { ref } from 'vue';

const back = () => {
  if (pagesLen === 1) {
    // 跳转tabbar第一个

    uni.switchTab({
      url: '/pages/home/index',
    });
    return;
  } else {
    uni.navigateBack({
      delta: 1,
    });
  }
};
const pagesLen = getCurrentPages().length;
const leftIcon = ref(pagesLen === 1 ? 'icon-home' : 'icon-whole-arrows-left');

const props = defineProps<{
  title?: string;
  class?: string;
  style?: TPlainObject;
}>();

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0;
</script>
<style lang="scss">
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40rpx;
  height: 88rpx;
}
.navibar-def-warp {
  width: 100%;
  position: relative;
  justify-content: center;

  .back-warp {
    position: absolute;
    left: 32rpx;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
