<template>
    <m-loading v-if="isLoading" text="加载中..." direction="column" />
    <view v-show="!isLoading">
        <web-view style="width: 100vw;height:100vh;" :src="url" @message="getMessage"></web-view>
    </view>
    <!-- <m-modal/> -->
</template>

<script setup lang="ts">
import { HomeHistoryRow } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { paramStrToJson } from '@dimjs/utils'
import { ref, onMounted } from 'vue'
import { usePageInParams } from '@/router/hooks'
const isLoading = ref(true)
const url = ref('')
// #ifndef APP
isLoading.value = false
// #endif

const getMessage = (event) => {
	
	const action = event.detail.data[0].action
	

	if(action==='loaded'){
		isLoading.value = false
	}else if(action==='back'){
		uni.navigateBack()
	}
}

onLoad((options) => {
    const targetUrl = decodeURIComponent(options.url)
    if (targetUrl) {
        url.value = decodeURIComponent(targetUrl)
    }
})
</script>

<style scoped>
</style>