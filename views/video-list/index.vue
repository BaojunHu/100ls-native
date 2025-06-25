<template>
    <view class="page layout-page">
        <m-navbar class=" layout-auto page-header" fixed :title="pageParams?.title" />
        <scroll-view scroll-y :scroll-with-animation="true" class="video-list-scroll layout-full"
            @scrolltolower="loadMore">
            <uni-row class="video-list" :gutter="12">
                <uni-col :span="8" class="video-item" v-for="(item) in videoList" :key="item.resourceCode"
                    @click="handleVideoClick(item)">
                    <div class="video-image-warp">
                        <image :src="item.coverImage" mode="aspectFill" class="video-image
                        " />
                        <view class="episode-count">
                            <m-text :size="20" color="blue-grey-1">全{{ item.episodeCount }}集</m-text>
                        </view>
                    </div>
                    <m-text bold :size="26" color="grey-9" class="mt-12 mb-8  text-ellipsis">{{ item.title
                    }}</m-text>
                    <view class="video-info">
                        <m-text :size="22" color="grey-7" class="history-info__text">
                            {{ item.languages.join(' | ') }}
                        </m-text>
                    </view>
                </uni-col>
            </uni-row>

            <uni-row class="video-list" :gutter="12" v-if="loading && isFirstLoad">
                <uni-col :span="8" class="video-item" v-for="n in 9" :key="n">
                    <div class="video-image-warp">
                        <view class="video-image skeleton-bg" />
                        <view class="episode-count skeleton-bg" style="height: 32rpx; width: 80rpx;" />
                    </div>
                    <view class="skeleton-bg" style="height: 32rpx; width: 80%; margin: 12rpx 0 8rpx 0;" />
                    <view class="skeleton-bg" style="height: 24rpx; width: 60%;" />
                </uni-col>
            </uni-row>

            <view class="empty-box pb-40" v-if="isShowEmpty">
                <m-empty desc="来到了知识的荒漠~" :imgWidth="160" />
            </view>
            <m-text color="grey-7" :size="24" block align="center" v-if="!isShowEmpty && !hasMore">
                总要有个结尾吧~
            </m-text>
            <m-bottom-safe v-if="!isShowEmpty" />
        </scroll-view>
        <!-- {{  isShowEmpty}} -->

    </view>
</template>
<script setup lang="ts">
import { PageRouter, RouterEnum } from '@/router/constants';
import { usePageInParams } from '@/router/hooks';
import { navigateVideoPlayer } from '@/router/main';
import { HomeHistoryResponse, HomeHistoryRow, homeServices } from '@/services/home';
import { useMRequest } from '@/tools/use-request';
import { onLoad, onPullDownRefresh, onReady } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
const pageSize = 9; // 每页数量
const pageParams = usePageInParams<RouterEnum.Video>();


const videoList = ref<HomeHistoryRow[]>([]);

const totalCount = ref(0);
const isFirstLoad = ref(true);
const pageNo = ref(1);
const hasMore = ref(true);
const isShowEmpty = computed(() => {


    return (
        pageNo.value === 1 &&
        isFirstLoad.value &&
        videoList.value.length === 0 &&
        !loading.value
    );
});



const { runAsync: reqestList, loading } = useMRequest(homeServices.videoList, {
    manual: true,
})


onReady(async () => {
    loadMore(1);
})

// onPullDownRefresh(() => {
//     uni.showToast({
//         title: '正在刷新...',
//         icon: 'loading',
//         duration: 1000,
//     });
//     console.log('下拉刷新>>>>>>>>>>>>>>');
//     pageNo.value = 1; // 重置页码
//     isFirstLoad.value = true; // 重置首次加载状态
//     hasMore.value = true; // 重置是否有更多数据
//     videoList.value = []; // 清空视频列表
//     loadMore(); // 重新加载数据
// });

const handleVideoClick = (item: HomeHistoryRow) => {


    navigateVideoPlayer({
        subtitles: item.subtitles,
        title: item.title,
        coverImage: item.coverImage,
        link: item.link,
    })

};

const loadMore = async (toNo?: number) => {
    if (loading.value || !hasMore.value) {
        return; // 如果正在加载或没有更多数据，则不执行加载
    }
    console.log('加载更多>>>>>>>>>>', pageParams.value);
    const nextPageNo = toNo || (pageNo.value + 1);

    pageNo.value = nextPageNo;

    const res = await reqestList({
        pageSize,
        pageNo: nextPageNo,
        // categoryNo: pageParams.value.categoryNo,
        categoryNo: 'CAT25062501',
    })
    if (isFirstLoad.value && res?.rows?.length > 0) {
        isFirstLoad.value = false;
    }
    if (nextPageNo === 1) {
        videoList.value = []; // 清空数据
    }
    console.log('加载更多结果>>>>>>>>>', res);
    hasMore.value = res?.rows?.length >= pageSize; // 判断是否还有更多数据

    totalCount.value = res?.total as number;
    videoList.value = videoList.value.concat(res?.rows || []); // 合并数据
}




</script>

<style lang="less">
.video-list {
    display: flex;
    flex-wrap: wrap;
    padding: 16rpx 20rpx;

    .video-item {
        display: flex;
        // width: 228rpx;
        // flex: 0 0 228rpx;
        flex-direction: column;
        // margin-right: 12rpx;
        margin-bottom: 24rpx;

    }

    .video-item:last-child {
        margin-right: 0;
    }

    .video-image-warp {
        width: 228rpx;
        height: 304rpx;
        position: relative;
    }

    .video-image {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;

    }


}

.empty-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 75%;
    padding-top: 40rpx;
}

.episode-count {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    border-radius: 0 0 16rpx 16rpx;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 16rpx;
    width: 100%;
    height: 78rpx;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(5, 5, 5, 0.69) 100%);
}

.skeleton-bg {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
    border-radius: 8rpx;
}

@keyframes skeleton-loading {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}
</style>