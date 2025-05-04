<template>
    <m-loading v-if="isLoading" text="加载中..." direction="column" />
    <view>
        <web-view :src="url" @message="getMessage"></web-view>
    </view>
</template>

<script setup lang="ts">
import { HomeHistoryRow } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { paramStrToJson } from '@dimjs/utils'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const url = ref('')

const getMessage = (event) => {


    uni.showModal({
        content: JSON.stringify(event.detail),
        showCancel: false
    })
}

onLoad(() => {
   const urlParams = paramStrToJson(location.href) as {
		url: string
	}
	
    if (urlParams.url) {
        url.value = decodeURIComponent(urlParams.url)
    }
})
</script>

<style scoped>
/* 添加样式（如果需要） */
</style>