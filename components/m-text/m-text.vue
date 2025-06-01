<template>
  <span :class="computedClassNames" :style="computedStyle.style" @click="handleClick">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { isEmpty } from '@dimjs/lang';
import { classNames, price } from '@dimjs/utils';
import type { TPlainObject } from '@flatbiz/utils';
import type { CSSProperties } from 'vue';
import { computed } from 'vue';
import { ColorMap } from './contanst';

export type ColorT = keyof typeof ColorMap;

const DEFAULT_FS = 24;

interface IBtaTezxtProps {
  size?: number;
  color?: ColorT;
  colorOpacity?: number;
  bold?: boolean;
  number?: boolean;
  multipleLines?: boolean;
  style?: CSSProperties;
  block?: boolean;
  align?: CSSProperties['textAlign'];
  class?: string;
  cls?: string;
  flex?: boolean | 'column' | 'row';
  inflex?: boolean;
}
const props = defineProps<IBtaTezxtProps>();

const flex = typeof props.flex === 'string' ? props.flex : !!props.flex ? 'row' : '';

const lhRatio = (_size: number) => {
  const numCompute = price(_size);
  let lh = numCompute.multiply(1.2).value;
  let baseNum = 1;
  if (Math.round(lh) > lh) {
    baseNum = -1;
  }
  lh = Math.round(lh);
  if (lh % 2 === 1) {
    lh += 1 * baseNum;
  }
  const resLh = !props.multipleLines ? lh : lh + 8;

  if ((resLh / 2) % 2 === 1) {
    return resLh + 2;
  }
  return resLh;
};

const size = computed(() => Math.floor(props.size ?? DEFAULT_FS));

const computedStyle = computed(() => {
  const inputSize = size.value;
  const lh = lhRatio(inputSize);
  let clses: string[] = [
    `u-fs_${inputSize}`,
    props.bold && !props.number ? 'u-fw_500 ' : 'u-fw_nor',
    props.number ? 'u-ff_num' : '',
    props.color ? 'bta-text-color' : '',
  ];

  if (props.flex) {
    const flexcls = flex === 'column' ? '-column' : '';
    const hcls = flex === 'column' ? '' : `u-h_${lh}`;

    clses = [...clses, `u-dis_flex${flexcls}`, hcls];
  } else if (props.inflex) {
    clses = [...clses, 'u-dis_inflex', `u-h_${lh}`];
  } else {
    clses = [...clses, props.block ? 'u-dis_block' : '', `u-lh_${lh}`];
  }

  const innerColor = props.color
    ? isEmpty(props.colorOpacity)
      ? `var(--v-color-${props.color})`
      : hexToRGBA(ColorMap[props.color], props.colorOpacity)
    : '';

  const style: TPlainObject = {
    '--inner-color': innerColor,
    '--inner-align': props.align || '',
    ...(props.style || {}),
  };

  const styleArr = Object.keys(style).map((key) => {
    const value = (style[key] || '').trim();
    if (!value) {
      return '';
    }
    return `${key}:${value}`;
  });

  return {
    style: styleArr.filter(Boolean).join(';'),
    clses: clses.filter(Boolean),
  };
});

const computedClassNames = computed(() =>
  classNames('bta-text-warp', computedStyle.value.clses, props.class, props.cls),
);
const emit = defineEmits(['click']);
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

function hexToRGBA(hex: string, alpha = 1) {
  // 移除颜色值中的 # 符号
  hex = hex.replace('#', '');

  // 检查颜色值的长度
  const isShortHex = hex.length === 3;
  const hexLength = isShortHex ? 1 : 2;

  // 拆分颜色值的红、绿、蓝通道
  const red = parseInt(hex.substring(0, hexLength), 16);
  const green = parseInt(hex.substring(hexLength, hexLength * 2), 16);
  const blue = parseInt(hex.substring(hexLength * 2, hexLength), 16);

  // 返回 RGBA 格式的颜色值
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
</script>

<style lang="scss">
/* 这里可以加入你在 text.less 文件中的内容 */

@mixin create_num($attr, $cls, $max, $min) {
  @if ($min <= $max) {
    .#{$cls}_#{$min} {
      #{$attr}: $min + 0rpx;
    }
    @include create_num($attr, $cls, $max, ($min + 2));
  }
}

@include create_num(line-height, u-lh, 100, 20);
@include create_num(height, u-h, 100, 20);
@include create_num(font-size, u-fs, 100, 16);
@include create_num(font-size, u-fs, 100, 17);

.bta-text-warp {
  display: inline-block;
  word-break: break-all;
  vertical-align: middle;
  text-align: var(--inner-align);
  > span {
    display: block !important;
  }
}

// m-text {
//   line-height: 0;
// }

.u-ta_right {
  text-align: right;
}

.u-dis_flex-row,
.u-dis_flex {
  display: flex;
  align-items: center;
  // line-height: 0;
  // height: max-content;
  // > span {
  //   display: flex !important;
  //   align-items: center;
  //   line-height: 0;
  //   height: max-content;
  // }
}
.u-dis_flex-column {
  display: flex;
  align-items: center;
  flex-direction: column;
  // > span {
  //   display: flex !important;
  //   align-items: center;
  //   flex-direction: column;
  // }
}

.bta-text-warp.u-dis_inflex {
  display: inline-flex;
  align-items: center;
  line-height: 0;
  > span {
    display: inline-flex !important;
    align-items: center;
    line-height: 0;
  }
}

.u-ta_left {
  text-align: left;
}

.u-ta_center {
  text-align: center;
}

.u-fw_nor {
  font-weight: normal;
}

.u-fw_500 {
  font-weight: 500;
}

.u-ff_bold {
  font-family: var(--v-font-family-bold);
}

.u-ff_nor {
  font-family: var(--v-font-family);
}

.u-ff_num {
  font-family: var(--v-font-family-number);
}

.bta-text-color {
  color: var(--inner-color);
}

.u-dis_block {
  display: block;
}

.bta-text-warp-ghost {
  position: relative;
  z-index: -1;
  transform: translate3d(0, -100%, -10rpx);
  opacity: 0;
}
</style>
