<template>
  <view
    :class="[
      'm-btn',
      buttonType,
      buttonSize,
      {
        'm-btn-loading': btnLoading,
        'm-btn-outline': outline,
        'm-btn-ghost': ghost,
        'm-btn-row': row,
        'm-btn-line': !row,
        'm-btn-disabled': disabled || btnLoading,
        'm-btn-circle': circle,
      },
    ]"
    @click="clickDebounceRes.run"
  >
    <template v-if="btnLoading">
      <!-- 在这里可以放置 Loading 图标 -->
      <m-icon
        type="icon-Loading"
        :size="32"
        :color="type === 'default' ? 'grey-9' : 'grey-1'"
        class="anticon anticon-spin block mr-8"
      />
    </template>
    <template v-if="!btnLoading">
      <m-icon
        v-if="icon"
        :type="icon"
        :size="size === 'small' ? 24 : size === 'large' ? 40 : 36"
        :color="type === 'default' ? 'grey-9' : 'grey-1'"
        class="block mr-8 icon-warp"
      />
      <slot name="icon">
        <!-- 在这里可以放置默认图标显示 -->
      </slot>
    </template>
    <template v-if="$slots.default">
      <slot />
    </template>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useDebounceFn } from "vue-hooks-plus";
import type { TIcon } from "../m-icon/icon-map";

const props = withDefaults(
  defineProps<{
    type?:
      | "primary"
      | "default"
      | "danger"
      | "success"
      | "warning"
      | "green"
      | "text";
    size?: "large" | "default" | "small";
    loading?: boolean;
    disabled?: boolean;
    icon?: TIcon;
    outline?: boolean;
    ghost?: boolean;
    row?: boolean;
    // 圓形按鈕
    circle?: boolean;
    handleClick?: (e: any) => void | Promise<void>;
  }>(),
  {
    type: "default",
    size: "default",
    loading: false,
    disabled: false,
    icon: undefined,
    outline: false,
    ghost: false,
    row: true,
    inline: false,
    handleClick: undefined,
  }
);

const buttonType = props.type ? `m-btn-${props.type}` : "";
const buttonSize = props.size ? `m-btn-${props.size}` : "";
const btnLoading = ref(props.loading);

watch(
  () => props.loading,
  (val) => {
    console.log("watch  val", val);

    btnLoading.value = val;
  }
);

const emit = defineEmits(["click"]);

const handleClickBar = async (e: any) => {
  if (btnLoading.value || props.disabled) {
    return;
  }
  btnLoading.value = true;

  if (props.handleClick) {
    try {
      await props?.handleClick?.(e);
    } finally {
      btnLoading.value = false;
    }
  } else {
    emit("click", e);
    btnLoading.value = false;
  }
};

const clickDebounceRes = useDebounceFn(handleClickBar, {
  wait: 500,
  leading: true,
});
</script>

<style scoped lang="scss">
.m-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15rpx;
  height: 64rpx;
  font-size: 24rpx;
  border-radius: 12rpx;
  border: 2rpx solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  border-color: #c4c4c4;
}

.m-btn-default {
  background-color: #fff;
  color: var(--v-color-grey-7);
  border-color: #d9d9d9;

  .anticon {
    color: var(--v-color-grey-7);
  }
}

.m-btn-primary {
  background-color: var(--v-color-primary-7);
  color: #fff;
  border-color: var(--v-color-primary-7);

  .anticon {
    color: #fff;
  }
}

.m-btn-green {
  background-color: var(--v-color-success-7);
  color: #fff;
  border-color: var(--v-color-success-7);

  .anticon {
    color: #fff;
  }
}

.m-btn-danger {
  background-color: var(--v-color-danger-7);
  color: #fff;
  border-color: var(--v-color-danger-7);

  .anticon {
    color: #fff;
  }
}

.m-btn-success {
  background-color: var(--v-color-success-7);
  color: #fff;
  border-color: var(--v-color-success-7);

  .anticon {
    color: #fff;
  }
}

.m-btn-warn {
  background-color: var(--v-color-warn-7);
  color: #fff;
  border-color: var(--v-color-warn-7);

  .anticon {
    color: #fff;
  }
}

.m-btn-text {
  border: 1rpx solid transparent;
  background-color: transparent;
  color: var(--v-color-grey-7);
}

.m-btn-loading {
  cursor: not-allowed;
}

.m-btn-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.m-btn-large {
  height: 80rpx;
  font-size: 30rpx;
  border-radius: 16rpx;
  padding: 0 32rpx;
}

.m-btn-small {
  height: 48rpx;
  font-size: 24rpx;
  border-radius: 8rpx;
}

.anticon {
  font-size: 32rpx;
  line-height: 1;
}

@keyframes anticon-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.anticon-spin {
  animation: anticon-spin 1s infinite linear;
}

.m-btn-outline {
  border: 1rpx solid currentColor;
  background-color: transparent;
  // color: currentColor;

  &.m-btn-primary {
    color: var(--v-color-primary-7);
  }

  &.m-btn-danger {
    color: var(--v-color-danger-7);
  }

  &.m-btn-success {
    color: var(--v-color-success-7);
  }

  &.m-btn-warn {
    color: var(--v-color-warn-7);
  }

  &.m-btn-green {
    color: var(--v-color-success-7);
  }

  &.m-btn-text {
    border: 1rpx solid transparent;
    background-color: transparent;
    color: var(--v-color-grey-7);
  }

  &::v-deep .icon-warp .bta-icon {
    color: currentColor;
  }
}

.m-btn-ghost {
  background-color: transparent;
  border: 1rpx solid transparent;
  color: currentColor;

  &.m-btn-primary {
    color: var(--v-color-primary-8);
    background-color: var(--v-color-primary-3);
  }

  &.m-btn-danger {
    color: var(--v-color-danger-8);
    background-color: var(--v-color-danger-3);
  }

  &.m-btn-success {
    color: var(--v-color-success-8);
    background-color: var(--v-color-success-3);
  }

  &.m-btn-warn {
    color: var(--v-color-warn-8);
    background-color: var(--v-color-warn-3);
  }

  &.m-btn-green {
    color: var(--v-color-success-8);
    background-color: var(--v-color-success-3);
  }

  &::v-deep .icon-warp .bta-icon {
    color: currentColor;
  }
}

.m-btn-circle {
  border-radius: 999rpx;
  padding-left: 24rpx;
  padding-right: 24rpx;
}

.m-btn-line {
  display: inline-flex;
}
</style>
