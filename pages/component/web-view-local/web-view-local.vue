<template>
	<view>
		<web-view :src="webviewUrl" @message="getMessage"></web-view> 
	</view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { paramStrToJson } from '@dimjs/utils'
import { ref } from 'vue'

const webviewUrl = ref('')
const getMessage = (e: any) => {
	uni.showModal({
		content: JSON.stringify(e.detail),
		showCancel: false
	})
}
onLoad(() => {
	// 从页面参数中获取url
	const url = location.href
	const params = paramStrToJson(url) as {
		url: string
	}

	console.log('params', params)

	webviewUrl.value = params.url

})


</script>

<style></style>
