<!-- 列表空組件 -->

<template>
  <div class="m-empty" :style="{
    '--imgWidth': imgWidth + 'rpx',
  }">
    <!-- <image class="m-empty__img" src="./list-empty.png" alt="empty" mode="widthFix" /> -->
    <m-icon class="icon-empty"  name="list-empty" :size="imgWidth" color="blue-3" />
    <m-text class="m-empty__title mt-40" v-if="props.title" bold :size="32" color="grey-9" multiple-lines>
      {{ props.title }}
    </m-text>
    <m-text v-if="!!props.desc" class="m-empty__desc" :size="28" color="grey-7" multiple-lines>{{ props.desc }}</m-text>
    <m-button v-if="!!props.btnText" class="mt-24" outline  :handle-click="handleClick" :size="props.btnSize" :type="props.btnType">{{ props.btnText }}</m-button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  desc?: string;
  btnText?: string;
  imgWidth?: number;
  btnSize?: 'large' | 'default' | 'small';
  btnType?: 'primary' | 'default' | 'danger' | 'success' | 'warning' | 'green' | 'text';
}>();

const imgWidth = props.imgWidth || 360;
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
.m-empty {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .m-empty__img {
    width: var(--imgWidth);
  }
}
</style>
