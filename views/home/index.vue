<template>
	<view :class="`page layout-page ${tabsConfig.current == 0 ? 'bg-blue' : 'bg-transparent'}`">
		<m-navbar class="layout-auto page-header" fixed>
			<!-- <m-icon type="icon-huahua" :size="40" bold color="grey-9" /> -->
			<fui-tabs v-bind="tabsConfig" @change="handleTabChange" />
			<!-- <m-icon type="icon-whole-search" :size="40" bold color="grey-9" /> -->
		</m-navbar>
		<VideoList :show="tabsConfig.current  === 0" />
		<SpeackList :show="tabsConfig.current  === 1" @changeTab="handleTabChange" />
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VideoList from './compts/lesson-list.vue';
import SpeackList from './compts/speak-list.vue';
import { onShow } from '@dcloudio/uni-app';
import { getUserInfo } from '@/tools/user-info';
import { navigateTo } from '@/router/main';
import { RouterEnum } from '@/router/constants';


onShow(() => {
	const userInfo = getUserInfo();
	
	if (!userInfo.authToken) {
		navigateTo({
			path:RouterEnum.Login
		})
	}
});


const navbarTabs = ref([
	'看剧',
	'每日金句',
])

const handleTabChange = (item: {
	index: number,
	name: string
}) => {
	// tabsConfig.value.current = item.index;

	// uni.showToast({
	// 	title: `切换到 ${item.index}`,
	// 	icon: 'none',
	// 	duration: 1000
	// });
	if( item.index === 0) {

		tabsConfig.value = videoListCfg
 
		// updateTabsConfig(videoListCfg as Partial<TabsConfig>);
	} else if(item.index === 1) {
		tabsConfig.value = audioListCfg
		// updateTabsConfig(audioListCfg as Partial<TabsConfig>);
	}

}

const videoListCfg = {
	tabs: navbarTabs.value,
	current: 0,
	isSlider: true,
	padding: 12,
	bottom: -12,
	center: true,
	color: 'var(--v-color-grey-8)',
	size: 34,
	fontWeight: 400,
	selectedColor: 'var(--v-color-grey-9)',
	selectedSize: 34,
	selectedFontWeight: 500,
	scale: 1,
	background: 'transparent',
	sliderHeight: 6,
	sliderBackground: 'var(--v-color-grey-9)',
	sliderRadius: 3
}
const audioListCfg = {
	current: 1,
	color: 'var(--v-color-grey-6)',
	selectedColor: 'var(--v-color-grey-1)',
	tabs: navbarTabs.value,
	isSlider: true,
	padding: 12,
	bottom: -12,
	center: true,
	size: 34,
	fontWeight: 400,
	selectedSize: 34,
	selectedFontWeight: 500,
	scale: 1,
	background: 'transparent',
	sliderHeight: 6,
	sliderBackground: 'var(--v-color-grey-9)',
	sliderRadius: 3
}

const tabsConfig = ref(videoListCfg)
type TabsConfig = typeof tabsConfig

// 批量更新多个属性
function updateTabsConfig(newConfig: Partial<TabsConfig>) {
	tabsConfig.value = {
		...tabsConfig.value,
		...newConfig
	}
	// uni.showModal({
	// 	content:JSON.stringify(tabsConfig.value, null, 2),
	// })
}





</script>

<style lang="less">
.page-header {
	position: relative;
	z-index: 9999;
}

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


	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 523rpx;
		background: linear-gradient(188deg, #9BF2FF 0%, rgba(255, 255, 255, 0) 100%);
		z-index: -1;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: -1;
	}

	&.bg-transparent {

		&::after,
		&::before {
			background: transparent
		}
	}
}

::v-deep .uni-navbar__header {
	background: linear-gradient(188deg, #9BF2FF 0%, rgba(255, 255, 255, 0) 960rpx) !important;
}

::v-deep .page.bg-transparent .uni-navbar__header {
	background: transparent !important;
}

::v-deep .uni-navbar__content {
	background-color: transparent !important;
}

</style>