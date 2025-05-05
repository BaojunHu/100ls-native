<template>
  <text
    :class="classNameStr"
    :style="styleStr"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import './icon.less';
import { computed } from 'vue';

const props = defineProps<{
  type: string;
  size?: number;
  color?: string;
  className?: string;
}>();

const classNameStr = computed(() => {
  return ['iconfont bta-icon', `u-lh_${props.size}`, `${props.type}`, props.className]
    .filter(Boolean)
    .join(' ');
});

const styleStr = computed(() => {
  
  const color = `var(--v-color-${props.color || 'grey-9'})`;
  const size = props.size ? `${props.size}rpx` : '';

  return `color: ${color}; --bta-icon-size: ${size};`;
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style scoped lang="scss">

/* 你的样式 */

.iconfont.bta-icon {
  font-size: var(--bta-icon-size);
  display: inline-block;
  line-height: normal;

  text {
    display: block;
  }
}
</style>
