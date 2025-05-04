<template>
    <scroll-view scroll-y class="video-list-page layout-full " v-show="props.show">
        <uni-swiper-dot class="swiper-dot-box  " :info="data?.banners"
            :current="swiperDotIndex" mode="round" :dots-styles="dotsStyles" field="content">
            <swiper class="swiper-box" :current="swiperDotIndex">
                <swiper-item v-for="(item, index) in data?.banners" :key="item.sortNo">
                    <view class="swiper-item" :class="'swiper-item' + index" @click=clickSwiperItem(item) >
                        <image :src="item.coverImage" mode="aspectFill" class="swiper-image" />
                        <text class="swiper-text">
                            {{ item.title }}
                        </text>
                    </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
        <scroll-view scroll-x :scroll-with-animation="true" class="cate-list-scroll">
            <view class="cate-list">
                <div class="cate-item" v-for="item in data?.categories" :key="item.categoryNo"
                    @click="handleCateClick(item)">
                    <image :src="item.icon" mode="aspectFill" class="cate-image
                        " />
                    <m-text bold :size="24" color="grey-9">{{ item.categoryName }}</m-text>
                </div>
            </view>
        </scroll-view>

        <uni-row :gutter="22" class="history-list" :showBorder="false" :highlight="false" :borderColor="false">
            <uni-col :span="12" v-for="item in historyData?.rows">
                <div class="history-item" @click="handleHistoryClick(item)">
                    <div class="history-image-warp">
                        <image :src="item.coverImage" mode="aspectFill" class="history-image" />
                        <view class="learing-tag" v-if="item?.currLearning">你正在学习</view>

                        <view class="episode-count">
                            <m-text :size="20" color="blue-grey-1" v-if="item.currLearningIndex">{{ item.episodeCount -
                                item.currLearningIndex }}集待看</m-text>
                            <m-text :size="20" color="blue-grey-1" v-else>全{{ item.episodeCount }}集</m-text>
                        </view>
                    </div>
                    <m-text bold :size="26" color="grey-9" class="mt-12 mb-8 mx-20 text-ellipsis">{{ item.title
                        }}</m-text>


                    <view class="history-info" v-if="item?.currLearning">
                        <m-text :size="22" color="grey-7">看至{{ item.currLearningIndex }}集</m-text>
                        <m-text :size="22" color="grey-7" class="mx-12"> |</m-text>
                        <m-text :size="22" color="grey-7">继续观看</m-text>
                    </view>
                    <view class="history-info" v-else>
                        <m-text :size="22" color="grey-7" class="history-info__text" v-for="lang in item.languages">{{
                            lang
                        }}</m-text>
                    </view>
                </div>
            </uni-col>
        </uni-row>

        <m-text bold :size="30" color="grey-9" class="ml-20">5分钟学习区</m-text>

        <scroll-view scroll-x :scroll-with-animation="true" class="video-list-scroll">
            <view class="video-list">
                <div class="video-item" v-for="item in videList?.rows" :key="item.resourceCode"
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
                        <m-text :size="22" color="grey-7" class="history-info__text" v-for="lang in item.languages">{{
                            lang
                        }}
                        </m-text>
                    </view>
                </div>
            </view>
        </scroll-view>
        <div class="pb-64"></div>
    </scroll-view>


    <m-loading v-if="loading" text="加载中..." direction="column" />

</template>
<script lang="ts" setup>

import { homeServices } from '@/services/home';
import { useMRequest } from '@/tools/use-request';
import { onShow } from '@dcloudio/uni-app';
import { modifyQueryString } from '@dimjs/utils';
import { watch } from 'vue';
import { ref } from 'vue';

type TVideoListProps = {
    show: boolean;
};
const { data, loading, runAsync: requestHomeData } = useMRequest(homeServices.homeCore, {
    manual: true,
})
const { data: videList, runAsync: requestVideoList } = useMRequest(homeServices.videoList, {
    manual: true,
})
const { data: historyData, runAsync: requestHistory } = useMRequest(homeServices.history, {
    manual: true,
})

onShow(async () => {
    const data = await requestHomeData();
    const firstCategory = data?.categories[0]?.categoryNo;
    if (firstCategory) {
        await requestVideoList({ categoryNo: firstCategory, pageSize: 10, pageNo: 1 });
        await requestHistory({
            pageSize: 10,
            pageNo: 1,
            categoryNo: firstCategory,
        });
    }

});


const props = withDefaults(defineProps<TVideoListProps>(), {
    show: false,
});

const clickSwiperItem = (item: { index: number; name: string }) => {
    console.log('clickItem', item);
    let url =  `/pages/component/web-view-local/web-view-local`;

    const targetUrl = modifyQueryString('/hybrid/h5/index.html', {
        ...item
    });

    url = modifyQueryString(url, {
        url: targetUrl,
    });

    uni.navigateTo({
        url,
    });
    
    // uni.navigateTo({
    //     url: `/pages/component/web-view-local/web-view-local?url=${'/hybrid/html/local.html'}`,
    // });
};

const handleCateClick = (item: { categoryNo: string }) => {
    console.log('handleCateClick', item);

};
const handleHistoryClick = (item: { resourceCode: string }) => {
    console.log('handleHistoryClick', item);
};
const handleVideoClick = (item: { resourceCode: string }) => {
    console.log('handleVideoClick', item);
};




const dotsStyles = {
    backgroundColor: 'rgba(255, 255, 255, .6)',
    border: '1px rgba(255, 255, 255, .6) solid',
    color: '#fff',
    selectedBackgroundColor: 'rgba(255, 255, 255, .8)',
    selectedBorder: '1px rgba(255, 255, 255, .8) solid'
}
const swiperDotIndex = ref(0);



</script>

<style lang="less">
// .video-list-page {}


::v-deep .swiper-dot-box {
    margin: 30rpx 28rpx 48rpx;

    .uni-swiper__dots-box {
        justify-content: flex-start;
        padding-left: 24rpx;
    }
}

.swiper-box {
    height: 392rpx;
    border-radius: 14rpx;
    overflow: hidden;

    .swiper-image,
    .swiper-item {
        height: 100%;
        width: 100%;
    }

    .swiper-item {
        position: relative;
    }

    .swiper-text {
        position: absolute;


        font-weight: 500;
        font-size: 24rpx;
        color: #FFFFFF;
        line-height: 33rpx;


        left: 24rpx;
        bottom: 42rpx;
    }

}

.cate-list-scroll {
    padding: 0 40rpx 32rpx;
}

.cate-list {
    display: flex;

    .cate-item {
        display: flex;
        flex-direction: column;
        margin-right: 36rpx;
        align-items: center;
        justify-content: center;
        width: max-content;
        flex: 0 0 auto;

        .cate-image {
            width: 97rpx;
            height: 71rpx;
            background: #F5F6FB;
            border-radius: 36rpx;
            margin-bottom: 13rpx;
        }
    }
}



.history-list {
    // display: flex;
    // flex-wrap: wrap;
    // gap: 22rpx 32rpx;
    padding: 0 32rpx 12rpx;

    .history-item {
        display: flex;
        flex-direction: column;
        // flex: 1 1 auto;
        position: relative;
        overflow: hidden;
        border-radius: 16rpx;
        margin-bottom: 32rpx;




    }

    .history-image-warp {
        width: 100%;
        height: 196rpx;
        position: relative;
    }

    .history-image {
        width: 100%;
        height: 196rpx;
        border-radius: 16rpx;
    }


    .learing-tag {
        position: absolute;
        right: 0;
        top: 0;
        background-color: var(--v-color-primary);
        font-size: 20rpx;
        color: #FFFFFF;
        line-height: 24rpx;
        padding: 4rpx 8rpx;
        border-radius: 0 0 0 16rpx;
    }

    .history-info {
        display: flex;
        align-items: center;
        padding-left: 20rpx;
        font-size: 0;
        line-height: 0;
    }

    .history-info__text {
        margin-right: 12rpx;
    }

    .history-info__text:last-child {
        margin-right: 0;
    }



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


.video-list {
    display: flex;
    flex-wrap: nowrap;
    padding: 16rpx 20rpx;

    .video-item {
        display: flex;
        width: 228rpx;
        flex: 0 0 228rpx;
        flex-direction: column;
        margin-right: 12rpx;



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
</style>