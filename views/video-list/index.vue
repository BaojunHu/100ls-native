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
                        <m-text :size="22" color="grey-7" class="history-info__text" v-for="lang in item.languages"
                            :key="lang">{{ lang }}</m-text>
                    </view>
                </uni-col>
            </uni-row>

            <view class="empty-box pb-40" v-if="isShowEmpty">
                <m-empty desc="来到了知识的荒漠~" :imgWidth="160" />
            </view>
        </scroll-view>
        <!-- {{  isShowEmpty}} -->

    </view>
</template>
<script setup lang="ts">
import { PageRouter, RouterEnum } from '@/router/constants';
import { usePageInParams } from '@/router/hooks';
import { HomeHistoryResponse, HomeHistoryRow, homeServices } from '@/services/home';
import { useMRequest } from '@/tools/use-request';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

const pageParams = usePageInParams<RouterEnum.Video>();


const videoList = ref<HomeHistoryRow[]>([]);

const totalCount = ref(0);
const isFirstLoad = ref(true);
const pageNo = ref(1);

const isShowEmpty = computed(() => {
    console.log('isShowEmpty>>>>>>>>>', pageNo.value, isFirstLoad.value, videoList.value.length, loading.value);

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

const handleVideoClick = (item: HomeHistoryRow) => {
    // PageRouter.push({
    //     name: RouterEnum.VideoDetail,
    //     params: {
    //         resourceCode: item.resourceCode,
    //         title: item.title,
    //         coverImage: item.coverImage,
    //         episodeCount: item.episodeCount,
    //     },
    // });
};

const loadMore = async (nextPageNo: number) => {
    console.log('加载更多>>>>>>>>>>', pageParams.value);

    pageNo.value = nextPageNo;

    const res = await reqestList({
        pageSize: 10,
        pageNo: nextPageNo,
        categoryNo: pageParams.value.categoryNo,
    })
    if (isFirstLoad.value && res?.rows?.length > 0) {
        isFirstLoad.value = false;
    }
    if (nextPageNo === 1) {
        videoList.value = []; // 清空数据
    }
    console.log('加载更多结果>>>>>>>>>', res);
    
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
</style>