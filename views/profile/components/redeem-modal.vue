<template>
  <!-- 会员激活中心 -->
  <view v-if="show" class="modern-modal-wrapper">
    <view class="modern-modal-backdrop" @click="handleClose"></view>
    <view class="modern-modal-panel">
      <!-- 头部区域 -->
      <view class="modal-header">
        <view class="header-icon">
          <text class="icon-vip">👑</text>
        </view>
        <view class="header-content">
          <text class="header-title">升级会员</text>
          <text class="header-subtitle">输入激活码享受专属权益</text>
        </view>
        <view class="header-close" @click="handleClose">
          <text class="close-icon">✕</text>
        </view>
      </view>

      <!-- 激活码输入区域 -->
      <view class="activation-section">
        <view class="section-label">
          <text class="label-text">激活码</text>
          <text class="label-tip">请输入4位激活码</text>
        </view>
        <view
          class="code-input-group"
          :class="{ 'shake-animation': redeemError }"
        >
          <input
            v-for="(item, index) in 4"
            :key="index"
            :class="`code-input-box ${
              redeemCode.length === index && isCodeFocus ? 'is-input' : ''
            } ${redeemCode.length >= index + 1 ? 'has-value' : ''} ${
              redeemError ? 'has-error' : ''
            }`"
            placeholder="-"
            type="text"
            disabled
            :value="redeemCode.length >= index + 1 ? redeemCode[index] : ''"
            @click="onCodeTap"
          />
        </view>

        <!-- 客服联系内嵌 -->
        <view class="support-inline">
          <text class="support-text">没有激活码？</text>
          <m-button
            type="text"
            size="small"
            :handleClick="contactCustomerService"
            class="support-link"
          >
            联系客服获取
          </m-button>
        </view>

        <!-- 错误提示区域 -->
        <view
          v-if="redeemError"
          :class="`error-message ${redeemError ? 'show-error' : ''}`"
        >
          <text class="error-text">{{ redeemErrorMessage }}</text>
        </view>
        <!-- 隐藏的真实输入框 -->
        <input
          class="hidden-input"
          type="text"
          maxlength="4"
          :focus="isCodeFocus"
          @input="onHiddenInput"
          @blur="onHiddenBlur"
          v-model="redeemCode"
        />
      </view>

      <!-- 快捷操作区域 -->
      <view class="quick-actions">
        <view class="action-item paste-item" @click="onPasteFromClipboard">
          <view class="action-icon-wrapper paste-icon-wrapper">
            <m-icon
              type="icon-copy"
              :size="32"
              color="primary-7"
              class="action-icon"
            />
          </view>
          <text class="action-text">粘贴</text>
        </view>
        <view class="action-item clear-item" @click="onClearCode">
          <view class="action-icon-wrapper clear-icon-wrapper">
            <m-icon
              type="icon-whole-delete2"
              :size="32"
              color="danger-7"
              class="action-icon"
            />
          </view>
          <text class="action-text">清空</text>
        </view>
      </view>

      <!-- 权益展示 -->
      <view class="benefits-section">
        <text class="benefits-title">🌟 专属会员特权</text>

        <view class="benefits-list">
          <view
            v-for="item in featureCards"
            :key="item.type"
            class="benefit-item"
          >
            <text class="benefit-text">{{ item.text }}</text>
          </view>
        </view>
      </view>

      <!-- 底部操作按钮 -->
      <view class="modal-footer">
        <m-button
          type="default"
          size="large"
          :handleClick="handleClose"
          class="action-btn secondary-btn"
        >
          稍后再说
        </m-button>
        <m-button
          type="primary"
          size="large"
          :handleClick="confirmRedeem"
          :loading="activateLoading"
          class="action-btn primary-btn"
        >
          立即激活
        </m-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { profileServices } from "@/services/profile";
import { useMRequest } from "@/tools/use-request";
import MButton from "@/components/m-button/m-button.vue";
import MIcon from "@/components/m-icon/m-icon.vue";

// Props
interface Props {
  show: boolean;
  featureCards: Array<{
    type: string;
    emoji: string;
    text: string;
    icon: string;
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  featureCards: () => [],
});

// Emits
const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void;
}>();

// 响应式数据
const redeemCode = ref(""); // 激活码输入值
const isCodeFocus = ref(true); // 是否聚焦激活码输入框
const redeemError = ref(false); // 是否有激活码错误
const redeemErrorMessage = ref(""); // 错误信息

// 确认激活码
const { runAsync: activateCodeRequest, loading: activateLoading } = useMRequest(
  async (code: string) => {
    return await profileServices.activateCode({ code });
  },
  {
    manual: true,
    showLoading: true,
    showErrorMessage: false,
    onError: (err) => {
      setRedeemError(err.message || "网络连接失败，请检查网络后重试");
    },
  }
);

// 监听show变化，重置状态
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      resetState();
    }
  }
);

// 重置状态
const resetState = () => {
  redeemCode.value = "";
  isCodeFocus.value = true;
  clearRedeemError();
};

// 关闭弹窗
const handleClose = () => {
  emit("close");
};

// 设置激活码错误状态
const setRedeemError = (errorMessage: string) => {
  // 先清除错误状态，然后重新设置，确保动画能够触发
  redeemError.value = false;
  redeemErrorMessage.value = "";

  // 使用 setTimeout 确保 DOM 更新后再设置错误状态
  setTimeout(() => {
    redeemError.value = true;
    redeemErrorMessage.value = errorMessage;
  }, 10);
};

// 清除激活码错误状态
const clearRedeemError = () => {
  redeemError.value = false;
  redeemErrorMessage.value = "";
};

// 处理隐藏输入框的输入
const onHiddenInput = (e: any) => {
  const value = e.detail.value;
  // 只允许输入数字和字母，并转为大写，限制4位
  const filteredValue = value
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 4);

  // 清除错误状态（当用户开始输入新内容时）
  if (redeemError.value && filteredValue !== redeemCode.value) {
    clearRedeemError();
  }

  redeemCode.value = filteredValue;
};

// 处理隐藏输入框失去焦点
const onHiddenBlur = () => {
  isCodeFocus.value = false;
};

// 处理点击显示框重新聚焦
const onCodeTap = () => {
  isCodeFocus.value = true;
};

// 从剪贴板粘贴激活码
const onPasteFromClipboard = () => {
  uni.getClipboardData({
    success: (res: any) => {
      const clipboardText = res.data || "";
      // 去除前后空格
      const trimmedText = clipboardText.trim();
      // 只允许数字和字母，并转为大写，限制4位
      const filteredText = trimmedText
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 4);

      if (filteredText.length === 0) {
        setRedeemError("剪贴板中没有有效的激活码");
        return;
      }

      // 清除错误状态
      clearRedeemError();

      redeemCode.value = filteredText;
      isCodeFocus.value = true;

      uni.showToast({
        title: "已粘贴激活码",
        icon: "success",
        duration: 1000,
      });
    },
    fail: (err: any) => {
      console.error("获取剪贴板内容失败:", err);
      setRedeemError("无法获取剪贴板内容");
    },
  });
};

// 清空激活码输入
const onClearCode = () => {
  redeemCode.value = "";
  isCodeFocus.value = true;

  // 清除错误状态
  clearRedeemError();
};

// 确认激活码
const confirmRedeem = async () => {
  // 清除之前的错误状态
  clearRedeemError();

  if (!redeemCode.value || redeemCode.value.length < 4) {
    setRedeemError("请输入完整的4位激活码");
    return;
  }

  try {
    const res = await activateCodeRequest(redeemCode.value);

    if (res.code !== "000") {
      // 激活成功
      emit("success");
    } else {
      // 显示详细的错误信息
      let errorMessage = res.message || "无效的激活码";
      setRedeemError(errorMessage);
    }
  } catch (err) {
    console.error("激活码请求失败:", err);
    setRedeemError("网络连接失败，请检查网络后重试");
  }
};

// 联系客服
const contactCustomerService = () => {
  uni.showToast({
    title: "正在联系客服...",
    icon: "none",
    duration: 2000,
  });
};
</script>

<style lang="scss" scoped>
/* 现代化模态框样式 */
.modern-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
  animation: modalFadeIn 0.3s ease-out;
}

.modern-modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(8rpx);
}

.modern-modal-panel {
  background: linear-gradient(
    145deg,
    var(--v-color-grey-1),
    var(--v-color-grey-2)
  );
  border-radius: 24rpx;
  width: 100%;
  max-width: 600rpx;
  position: relative;
  z-index: 1001;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.15), 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 动画效果 */
@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(60rpx) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 32rpx 32rpx 24rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-primary-7),
    var(--v-color-primary-8)
  );
  color: white;
  position: relative;
}

.modal-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rpx;
  background: linear-gradient(
    90deg,
    var(--v-color-primary-7),
    var(--v-color-primary-8),
    var(--v-color-primary-7)
  );
}

.header-icon {
  width: 56rpx;
  height: 56rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
}

.icon-vip {
  font-size: 28rpx;
}

.header-content {
  flex: 1;
}

.header-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 4rpx;
}

.header-subtitle {
  display: block;
  font-size: 24rpx;
  opacity: 0.9;
}

.header-close {
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.header-close:active {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.95);
}

.close-icon {
  font-size: 24rpx;
  font-weight: 500;
}

.activation-section {
  padding: 40rpx;
}

.section-label {
  margin-bottom: 30rpx;
}

.label-text {
  font-size: 32rpx;
  font-weight: 500;
  color: var(--v-color-grey-9);
  display: block;
  margin-bottom: 8rpx;
}

.label-tip {
  font-size: 24rpx;
  color: var(--v-color-grey-7);
  display: block;
}

.code-input-group {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.code-input-box {
  flex: 1;
  height: 100rpx;
  border: 2rpx solid var(--v-color-grey-5);
  border-radius: 16rpx;
  text-align: center;
  font-size: 36rpx;
  font-weight: bold;
  color: var(--v-color-grey-9);
  background: var(--v-color-grey-2);
  transition: all 0.3s ease;
}

.code-input-box.is-input {
  border-color: var(--v-color-primary-7);
  background: white;
  box-shadow: 0 0 0 6rpx rgba(255, 102, 9, 0.1);
}

.code-input-box.has-value {
  border-color: var(--v-color-primary-7);
  background: white;
  color: var(--v-color-primary-7);
}

.code-input-box.has-error {
  border-color: var(--v-color-danger-7);
  background: var(--v-color-danger-1);
  color: var(--v-color-danger-7);
  box-shadow: 0 0 0 6rpx rgba(255, 77, 79, 0.1);
}

/* 晃动动画 */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-8rpx);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(8rpx);
  }
}

.shake-animation {
  animation: shake 0.6s ease-in-out;
}

.support-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}

.support-text {
  font-size: 26rpx;
  color: var(--v-color-grey-7);
  margin-right: 20rpx;
}

.support-link {
  background: none !important;
  border: none !important;
  color: var(--v-color-primary-7) !important;
  font-size: 26rpx !important;
  text-decoration: underline !important;
  padding: 0 !important;
  height: auto !important;
}

.error-message {
  display: flex;
  align-items: center;
  background: var(--v-color-danger-1);
  border: 1rpx solid var(--v-color-danger-3);
  border-radius: 12rpx;
  padding: 10rpx 20rpx;
  opacity: 0;
  transform: translateY(-20rpx);
  transition: all 0.3s ease;
  text-align: center;
}

.error-message.show-error {
  opacity: 1;
  transform: translateY(0);
}

.error-text {
  font-size: 26rpx;
  color: var(--v-color-danger-7);
  flex: 1;
}

.hidden-input {
  position: absolute;
  left: -9999rpx;
  opacity: 0;
}

.quick-actions {
  display: flex;
  gap: 16rpx;
  margin-bottom: 40rpx;
  padding: 0 32rpx;
}

.action-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 16rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-grey-1) 0%,
    var(--v-color-grey-2) 100%
  );
  border: 1rpx solid var(--v-color-grey-4);
  border-radius: 20rpx;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.action-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.action-item:active {
  transform: translateY(2rpx) scale(0.98);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.action-item:active::before {
  left: 100%;
}

.action-icon-wrapper {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.action-icon-wrapper::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  opacity: 0;
}

.action-item:active .action-icon-wrapper {
  transform: scale(0.9);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.12);
}

.action-item:active .action-icon-wrapper::after {
  width: 80rpx;
  height: 80rpx;
  opacity: 1;
}

.action-icon {
  transition: all 0.3s ease;
}

.action-text {
  font-size: 24rpx;
  font-weight: 500;
  color: var(--v-color-grey-8);
  transition: color 0.3s ease;
  position: relative;
}

.action-text::after {
  content: "";
  position: absolute;
  bottom: -4rpx;
  left: 50%;
  width: 0;
  height: 2rpx;
  background: currentColor;
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 1rpx;
}

.action-item:active .action-text {
  color: var(--v-color-grey-9);
}

.action-item:active .action-text::after {
  width: 60%;
}

/* 粘贴按钮特殊样式 */
.paste-item {
  border-color: rgba(255, 102, 9, 0.2);
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.05) 0%,
    rgba(255, 102, 9, 0.02) 100%
  );
}

.paste-item:active {
  border-color: rgba(255, 102, 9, 0.4);
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.1) 0%,
    rgba(255, 102, 9, 0.05) 100%
  );
  box-shadow: 0 4rpx 12rpx rgba(255, 102, 9, 0.15);
}

.paste-icon-wrapper {
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.1) 0%,
    rgba(255, 102, 9, 0.05) 100%
  );
  border: 1rpx solid rgba(255, 102, 9, 0.2);
}

.paste-item:active .paste-icon-wrapper {
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.15) 0%,
    rgba(255, 102, 9, 0.08) 100%
  );
  border-color: rgba(255, 102, 9, 0.3);
  box-shadow: 0 2rpx 8rpx rgba(255, 102, 9, 0.2);
}

/* 清空按钮特殊样式 */
.clear-item {
  border-color: rgba(255, 77, 79, 0.2);
  background: linear-gradient(
    135deg,
    rgba(255, 77, 79, 0.05) 0%,
    rgba(255, 77, 79, 0.02) 100%
  );
}

.clear-item:active {
  border-color: rgba(255, 77, 79, 0.4);
  background: linear-gradient(
    135deg,
    rgba(255, 77, 79, 0.1) 0%,
    rgba(255, 77, 79, 0.05) 100%
  );
  box-shadow: 0 4rpx 12rpx rgba(255, 77, 79, 0.15);
}

.clear-icon-wrapper {
  background: linear-gradient(
    135deg,
    rgba(255, 77, 79, 0.1) 0%,
    rgba(255, 77, 79, 0.05) 100%
  );
  border: 1rpx solid rgba(255, 77, 79, 0.2);
}

.clear-item:active .clear-icon-wrapper {
  background: linear-gradient(
    135deg,
    rgba(255, 77, 79, 0.15) 0%,
    rgba(255, 77, 79, 0.08) 100%
  );
  border-color: rgba(255, 77, 79, 0.3);
  box-shadow: 0 2rpx 8rpx rgba(255, 77, 79, 0.2);
}

.benefits-section {
  padding: 28rpx 32rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-grey-2),
    var(--v-color-grey-3)
  );
  position: relative;
  overflow: hidden;
}

.benefits-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2rpx;
  background: linear-gradient(
    90deg,
    var(--v-color-primary-7),
    var(--v-color-primary-8),
    var(--v-color-primary-7)
  );
}

.benefits-title {
  font-size: 28rpx;
  font-weight: 500;
  color: var(--v-color-grey-9);
  display: block;
  margin-bottom: 20rpx;
}

.benefits-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  justify-content: center;
  padding: 0 8rpx;
}

.benefit-item {
  border: 1rpx solid var(--v-color-primary-5);
  flex: 0 0 calc(33.333% - 11rpx);
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 12rpx;
  border-radius: 16rpx;
  font-size: 24rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 12rpx rgba(255, 102, 9, 0.2);
  background: linear-gradient(
    135deg,
    var(--v-color-grey-1) 0%,
    var(--v-color-grey-2) 100%
  );
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.benefit-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 102, 9, 0.1),
    transparent
  );
  transition: left 0.6s ease;
}

.benefit-item:active {
  transform: translateY(-2rpx) scale(1.02);
  box-shadow: 0 6rpx 20rpx rgba(255, 102, 9, 0.3);
  border-color: var(--v-color-primary-7);
}

.benefit-item:active::before {
  left: 100%;
}

.benefit-text {
  color: var(--v-color-primary-7);
  text-align: center;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  transition: color 0.3s ease;
}

.benefit-item:active .benefit-text {
  color: var(--v-color-primary-8);
}

/* 权益卡片动画效果 */
@keyframes benefitItemFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1rpx);
  }
}

.benefit-item:nth-child(1) {
  animation: benefitItemFloat 4s ease-in-out infinite;
  animation-delay: 0s;
}

.benefit-item:nth-child(2) {
  animation: benefitItemFloat 4s ease-in-out infinite;
  animation-delay: 0.8s;
}

.benefit-item:nth-child(3) {
  animation: benefitItemFloat 4s ease-in-out infinite;
  animation-delay: 1.6s;
}

.benefit-item:nth-child(4) {
  animation: benefitItemFloat 4s ease-in-out infinite;
  animation-delay: 2.4s;
}

.benefit-item:nth-child(5) {
  animation: benefitItemFloat 4s ease-in-out infinite;
  animation-delay: 3.2s;
}

.modal-footer {
  display: flex;
  gap: 20rpx;
  padding: 40rpx;
  border-top: 1rpx solid var(--v-color-grey-4);
}

.action-btn {
  flex: 1 !important;
  height: 88rpx !important;
  border-radius: 20rpx !important;
  font-size: 32rpx !important;
  font-weight: 500 !important;
}
</style>
