<template>
	<view :class="`page layout-page ${tabActive == 0 ? 'bg-blue' : 'bg-green'}`">
		<uni-nav-bar class="layout-auto"  left-icon="medal" fixed :border="false">
			<fui-tabs v-bind="tabsConfig" @change="handleTabChange" />
		</uni-nav-bar>
		<VideoList :show="tabActive === 0" />
	</view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import VideoList from './compts/video-list.vue';
import { useMRequest } from '@/tools/use-request';
import { homeServices } from '@/services/home';

const navbarTabs = ref([
	'看剧',
	'一句跟读',
])
const tabActive = ref(0)
const handleTabChange = (item: {
	index: number,
	name: string

}) => {
	tabActive.value = item.index
}
const tabsConfig = ref({
	tabs: navbarTabs.value,
	current: tabActive.value,
	isSlider: true,
	padding: 12,
	bottom: -12,
	center: true,
	color: 'var(--v-color-grey-8)',
	size: 34,
	fontWeight: 500,
	selectedColor: 'var(--v-color-grey-9)',
	selectedSize: 34,
	scale: 1,
	background: 'transparent',
	sliderHeight: 6,
	sliderBackground: 'var(--v-color-grey-9)',
	sliderRadius: 3
})
type TabsConfig = typeof tabsConfig

// 批量更新多个属性
function updateTabsConfig(newConfig:TabsConfig) {
	tabsConfig.value = {
		...tabsConfig.value,
		...newConfig
	}
}





</script>

<style lang="less">
::v-deep.fui-tabs__item {
	padding: 0 12px !important;
	width: max-content !important;
	flex: 0 0 auto !important;
}

::v-deep .fui-scroll__view {
	width: 100% !important;
	display: flex !important;
	justify-content: center !important;
	flex: 1;
}


::v-deep .page {
	position: relative;


	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 523rpx;
		background: linear-gradient(188deg, #9BF2FF 0%, rgba(255, 255, 255, 0) 100%);
		z-index: -1;
	}
}

::v-deep .uni-navbar__header {
	background: linear-gradient(188deg, #9BF2FF 0%, rgba(255, 255, 255, 0) 523rpx) !important;
}

::v-deep .uni-navbar__content {
	background-color: transparent !important;
}
</style>