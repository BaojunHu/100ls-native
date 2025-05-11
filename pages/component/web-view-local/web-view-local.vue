<template>
    <m-loading v-if="isLoading" text="加载中..." direction="column" />
    <view v-show="!isLoading">
        <web-view style="width: 100vw;height:100vh;" :src="url" @message="getMessage"></web-view>
    </view>
</template>

<script setup lang="ts">
import { HomeHistoryRow } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { paramStrToJson } from '@dimjs/utils'
import { ref, onMounted } from 'vue'
import { usePageInParams } from '@/router/hooks'
const isLoading = ref(true)
const url = ref('')
uni.showNavigationBarLoading()

const getMessage = (event) => {
    // uni.showModal({
    //     content: JSON.stringify(event.detail),
    //     showCancel: false
    // })
    isLoading.value = false
    uni.hideNavigationBarLoading()
}

// const query = usePageInParams()

onLoad((options) => {
    console.log(options, '>options>>>>>');
    const targetUrl = decodeURIComponent(options.url)
    console.log(targetUrl, '>>>>>>>>')
    if (targetUrl) {
        url.value = decodeURIComponent(targetUrl)
    }
})
</script>

<style scoped>
</style>