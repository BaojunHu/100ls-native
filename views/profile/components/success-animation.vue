<template>
  <view v-if="show" :class="`success-animation-wrapper ${show ? 'show' : ''}`">
    <!-- 背景遮罩 -->
    <view
      :class="`success-backdrop ${animationStep >= 1 ? 'fade-in' : ''}`"
      @click="onBackdropTap"
    ></view>

    <!-- 粒子效果 -->
    <view v-if="showParticles" class="particles-container">
      <view
        v-for="item in particles"
        :key="item.id"
        class="particle"
        :style="`
          background-color: ${item.color};
          width: ${item.size}rpx;
          height: ${item.size}rpx;
          left: ${item.startX}rpx;
          top: ${item.startY}rpx;
          animation-delay: ${item.delay}ms;
          animation-duration: ${item.duration}ms;
          --end-x: ${item.endX}rpx;
          --end-y: ${item.endY}rpx;
        `"
      >
      </view>
    </view>

    <!-- 主要内容 -->
    <view
      v-if="showContent"
      :class="`success-content ${animationStep >= 2 ? 'slide-up' : ''}`"
    >
      <!-- 成功图标 -->
      <view class="success-icon-container">
        <view class="success-icon-bg"></view>
        <view class="success-icon">
          <text class="icon-check">✓</text>
        </view>
        <!-- 光环效果 -->
        <view class="halo halo-1"></view>
        <view class="halo halo-2"></view>
        <view class="halo halo-3"></view>
      </view>

      <!-- 成功文字 -->
      <view class="success-text">
        <text class="success-title">{{ message }}</text>
        <text class="success-subtitle">{{ subtitle }}</text>
      </view>

      <!-- VIP徽章动画 -->
      <view class="vip-badge-container">
        <view class="vip-badge">
          <text class="vip-crown">👑</text>
          <text class="vip-text">VIP</text>
        </view>
        <view class="vip-glow"></view>
      </view>

      <!-- 权益提示 -->
      <view class="benefits-preview">
        <view v-for="item in featureCards" :key="item.type" class="benefit-tag">
          {{ item.emoji }} {{ item.text }}
        </view>
      </view>

      <!-- 关闭按钮 -->
      <view class="close-button" @click="onClose">
        <text class="close-text">开启旅程</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted } from "vue";

// Props
interface Props {
  show: boolean;
  message?: string;
  subtitle?: string;
  featureCards?: Array<{
    type: string;
    emoji: string;
    text: string;
    icon: string;
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  message: "激活成功！",
  subtitle: "恭喜您成为VIP会员",
  featureCards: () => [],
});

// Emits
const emit = defineEmits<{
  animationEnd: [];
}>();

// 响应式数据
const animationStep = ref(0); // 动画步骤：0-隐藏，1-背景渐入，2-内容弹出，3-完成
const particles = ref<any[]>([]); // 粒子效果数据
const showContent = ref(false); // 是否显示内容
const showParticles = ref(false); // 是否显示粒子效果

let timers: NodeJS.Timeout[] = [];

// 初始化粒子效果数据
const initParticles = () => {
  const particlesData = [];
  const colors = [
    "var(--v-color-warning-7)", // 金色
    "var(--v-color-primary-7)", // 主色调
    "var(--v-color-success-7)", // 成功色
    "var(--v-color-blue-7)", // 蓝色
    "var(--v-color-purple-7)", // 紫色
    "var(--v-color-warning-5)", // 浅黄色
    "var(--v-color-purple-5)", // 浅紫色
    "var(--v-color-blue-5)", // 浅蓝色
  ];

  for (let i = 0; i < 20; i++) {
    particlesData.push({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 10, // 10-30rpx
      startX: Math.random() * 600 + 75, // 75-675rpx
      startY: Math.random() * 400 + 200, // 200-600rpx
      endX: Math.random() * 800, // 0-800rpx
      endY: Math.random() * 800, // 0-800rpx
      delay: Math.random() * 800, // 0-800ms延迟
      duration: Math.random() * 1000 + 1500, // 1.5-2.5s持续时间
    });
  }

  particles.value = particlesData;
};

// 清理定时器
const clearTimers = () => {
  timers.forEach((timer) => clearTimeout(timer));
  timers = [];
};

// 开始成功动画
const startAnimation = () => {
  if (!props.show) return;

  // 清理之前的定时器
  clearTimers();

  // 步骤1：背景渐入
  animationStep.value = 1;

  const timer1 = setTimeout(() => {
    // 步骤2：内容弹出
    animationStep.value = 2;
    showContent.value = true;

    const timer2 = setTimeout(() => {
      // 步骤3：粒子效果
      showParticles.value = true;

      const timer3 = setTimeout(() => {
        // 步骤4：完成
        animationStep.value = 3;
      }, 500);

      timers.push(timer3);
    }, 300);

    timers.push(timer2);
  }, 200);

  timers.push(timer1);
};

// 重置动画状态
const resetAnimation = () => {
  clearTimers();
  animationStep.value = 0;
  showContent.value = false;
  showParticles.value = false;
};

// 点击背景遮罩
const onBackdropTap = () => {
  if (animationStep.value >= 3) {
    onClose();
  }
};

// 关闭动画
const onClose = () => {
  resetAnimation();
  emit("animationEnd");
};

// 监听show属性变化
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      initParticles();
      startAnimation();
    } else {
      resetAnimation();
    }
  }
);

// 组件销毁时清理定时器
onUnmounted(() => {
  clearTimers();
});
</script>

<style lang="scss" scoped>
.success-animation-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: auto;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.success-animation-wrapper.show {
  opacity: 1;
}

.success-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.95),
    rgba(255, 102, 9, 0.95)
  );
  backdrop-filter: blur(10rpx);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.success-backdrop.fade-in {
  opacity: 1;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation-name: particle-float;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes particle-float {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0);
  }
  10% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--end-x), var(--end-y)) scale(0.5);
  }
}

.success-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 3;
  opacity: 0;
  transform: translate(-50%, -50%) translateY(100rpx);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.success-content.slide-up {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}

.success-icon-container {
  position: relative;
  animation: success-icon-appear 0.8s ease-out 0.3s both;
  width: max-content;
  margin: 0 auto 60rpx;
}

@keyframes success-icon-appear {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(-90deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.success-icon-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200rpx;
  height: 200rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-primary-6) 0%,
    var(--v-color-primary-5) 100%
  );
  border-radius: 50%;
  box-shadow: 0 20rpx 60rpx rgba(255, 102, 9, 0.3);
}

.success-icon {
  position: relative;
  z-index: 2;
  width: 200rpx;
  height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--v-color-primary-7) 0%,
    var(--v-color-primary-8) 100%
  );
  border-radius: 50%;
  box-shadow: 0 20rpx 60rpx rgba(255, 102, 9, 0.4),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.3);
}

.icon-check {
  font-size: 120rpx;
  font-weight: bold;
  color: var(--v-color-grey-1);
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}

.halo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: halo-pulse 2s ease-in-out infinite;
}

.halo-1 {
  width: 240rpx;
  height: 240rpx;
  animation-delay: 0s;
}

.halo-2 {
  width: 280rpx;
  height: 280rpx;
  animation-delay: 0.3s;
}

.halo-3 {
  width: 320rpx;
  height: 320rpx;
  animation-delay: 0.6s;
}

@keyframes halo-pulse {
  0%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.success-text {
  margin-bottom: 60rpx;
  animation: success-text-appear 0.6s ease-out 0.6s both;
}

@keyframes success-text-appear {
  0% {
    opacity: 0;
    transform: translateY(40rpx);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: var(--v-color-grey-1);
  margin-bottom: 20rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}

.success-subtitle {
  display: block;
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  max-width: 500rpx;
  margin: 0 auto;
}

.vip-badge-container {
  position: relative;
  margin-bottom: 60rpx;
  animation: vip-badge-appear 0.8s ease-out 0.9s both;
}

@keyframes vip-badge-appear {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate(-90deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.vip-badge {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(
    45deg,
    var(--v-color-warning-7),
    var(--v-color-primary-7)
  );
  color: var(--v-color-grey-1);
  padding: 20rpx 40rpx;
  border-radius: 50rpx;
  font-weight: bold;
  box-shadow: 0 10rpx 30rpx rgba(255, 102, 9, 0.4);
  position: relative;
  z-index: 2;
}

.vip-crown {
  font-size: 36rpx;
  margin-right: 16rpx;
}

.vip-text {
  font-size: 32rpx;
  letter-spacing: 4rpx;
}

.vip-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200rpx;
  height: 80rpx;
  background: linear-gradient(
    45deg,
    var(--v-color-warning-7),
    var(--v-color-primary-7)
  );
  border-radius: 50rpx;
  opacity: 0.3;
  filter: blur(20rpx);
  animation: vip-glow-pulse 2s ease-in-out infinite;
}

@keyframes vip-glow-pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.benefits-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20rpx;
  margin-bottom: 80rpx;
  max-width: 600rpx;
  animation: benefits-appear 0.6s ease-out 1.2s both;
}

@keyframes benefits-appear {
  0% {
    opacity: 0;
    transform: translateY(40rpx);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.benefit-tag {
  background: rgba(255, 255, 255, 0.2);
  color: var(--v-color-grey-1);
  padding: 16rpx 24rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  font-weight: 500;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  animation: benefit-tag-float 3s ease-in-out infinite;
}

.benefit-tag:nth-child(1) {
  animation-delay: 0s;
}
.benefit-tag:nth-child(2) {
  animation-delay: 0.2s;
}
.benefit-tag:nth-child(3) {
  animation-delay: 0.4s;
}
.benefit-tag:nth-child(4) {
  animation-delay: 0.6s;
}
.benefit-tag:nth-child(5) {
  animation-delay: 0.8s;
}
.benefit-tag:nth-child(6) {
  animation-delay: 1s;
}
.benefit-tag:nth-child(7) {
  animation-delay: 1.2s;
}
.benefit-tag:nth-child(8) {
  animation-delay: 1.4s;
}
.benefit-tag:nth-child(9) {
  animation-delay: 1.6s;
}
.benefit-tag:nth-child(10) {
  animation-delay: 1.8s;
}

@keyframes benefit-tag-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
}

.close-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 50rpx;
  padding: 24rpx 60rpx;
  backdrop-filter: blur(10rpx);
  transition: all 0.3s ease;
  animation: close-button-appear 0.4s ease-out 1.5s both;
}

@keyframes close-button-appear {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.close-button:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.3);
}

.close-text {
  color: var(--v-color-grey-1);
  font-size: 32rpx;
  font-weight: 500;
}
</style>
