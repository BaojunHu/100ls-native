<template>
    <scroll-view scroll-y class="video-list-page layout-full " v-show="props.show">
        <uni-swiper-dot class="swiper-dot-box" :info="data?.banners" :current="swiperDotIndex" mode="round"
            :dots-styles="dotsStyles" field="content">
            <swiper class="swiper-box" :current="swiperDotIndex" @change="swiperDotIndex = $event.detail.current">
                <swiper-item v-for="(item, index) in data?.banners" :key="item.sortNo">
                    <view class="swiper-item" :class="'swiper-item' + index" @click=clickSwiperItem(item)>
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
                <div class="cate-item" :class="activedCate === item.categoryNo ? 'cate-item__active' : ''"
                    v-for="item in data?.categories" :key="item.categoryNo" @click="handleCateClick(item)">
                    <image :src="item.icon" mode="aspectFill" class="cate-image
                        " />
                    <text class="cate-name">
                        {{ item.categoryName }}
                    </text>
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
        <view class="empty-box pb-40" v-if="!historyData?.rows?.length">
            <m-empty :title="hisEmptyErrorMsg.title" :desc="hisEmptyErrorMsg.desc" :imgWidth="120"
                :btnText="hisEmptyErrorMsg.btnText" @click="handleEmptyClick" btnSize="small" btnType="text" />
        </view>

        <template v-for="videoListItem in videoListMap" :key="videoListItem.no">


            <m-text bold :size="30" color="grey-9" class="ml-20">{{ videoListItem.name }}</m-text>
            <scroll-view scroll-x :scroll-with-animation="true" class="video-list-scroll">
                <view class="video-list">
                    <div class="video-item" v-for="item in videoListItem.data" :key="item.resourceCode"
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
                            <m-text :size="22" color="grey-7" class="history-info__text "
                                v-for="lang in item.languages">{{
                                    lang
                                }}
                            </m-text>
                        </view>
                    </div>
                </view>
            </scroll-view>
        </template>
        <m-text bold :size="30" color="grey-9" class="ml-20 mt-24">学习技巧</m-text>

        <view class="lesson-list">
            <div class="lesson-item" v-for="item in lessonList?.rows" :key="item.resourceCode"
                @click="handleVideoClick(item)">
                <div class="lesson-image-warp">
                    <image :src="item.coverImage" mode="aspectFill" class="lesson-image
                        " />
                    <view class="episode-count">
                        <!-- <m-text :size="20" color="blue-grey-1">全{{ item.episodeCount }}集</m-text> -->
                    </view>
                </div>
                <uni-card :is-shadow="false" :is-full="true" :spacing="0" :padding="0" :border="false"
                    class="lesson-info" :title="item.title" :sub-title="item.author" :extra="`${item.learnNumber}人在学`"
                    :thumbnail="item.authorIcon" />
            </div>
        </view>
        <div class="pb-64"></div>
    </scroll-view>


    <m-loading v-if="loading" text="加载中..." direction="column" />

</template>
<script lang="ts" setup>

import { RouterEnum } from '@/router/constants';
import { navigateTo, navigateVideoPlayer } from '@/router/main';
import { Catalogue, HomeData, HomeHistoryResponse, HomeHistoryRow, homeServices, LessonListResponse, THomeBannerItem } from '@/services/home';
import { useMRequest } from '@/tools/use-request';
import { onShow } from '@dcloudio/uni-app';
import awaitTo from 'await-to-ts';

import { ref, watch } from 'vue';

type TVideoListProps = {
    show: boolean;
};
const { data, loading, runAsync: requestHomeData } = useMRequest(homeServices.homeCore, {
    manual: true,
})
const { data: videoListMap, runAsync: requestVideoList } = useMRequest(async (catalogues: Catalogue[]) => {

    const promiseList = catalogues?.map((item) => {
        return homeServices.videoList({
            catalogueNo: item.catalogueNo,
            pageSize: 10,
            pageNo: 1,
        })
    })
    return Promise.all(promiseList).then((res) => {

        return res.map((item, index) => {
            return {
                no: catalogues[index].catalogueNo,
                data: item.rows,
                name: catalogues[index].catalogueName,
            }
        })
    }) as Promise<{
        no: string;
        data: HomeHistoryRow[];
        name: string;
    }[]>
}, {
    manual: true,
})
const { data: historyData, run: requestHistory } = useMRequest(homeServices.history, {
    manual: true,
    onError: (err) => {
        //@ts-ignore
        if (err.code === '410') {
            hisEmptyErrorMsg.value = {
                title: '',
                desc: '',
                btnText: '点击登录，开始学习吧~',
            };
        } else {
            hisEmptyErrorMsg.value = {
                title: '暂无浏览记录',
                desc: '快去看看视频吧',
                btnText: '',
            };
        }
    },
    showErrorMessage: false
})
const { data: lessonList, run: reqestLessList } = useMRequest(homeServices.lessonList, {
    manual: true,
})
const hisEmptyErrorMsg = ref({
    title: '',
    desc: '',
    btnText: '',
});
const activedCate = ref('')

const props = withDefaults(defineProps<TVideoListProps>(), {
    show: false,
});





const handleEmptyClick = () => {
    console.log('handleEmptyClick', props.show);
    if (hisEmptyErrorMsg.value.btnText) {
        navigateTo({
            path: RouterEnum.Login
        })
    }
};

const clickSwiperItem = (item: THomeBannerItem) => {
    navigateVideoPlayer({
        subtitles: item.subtitles,
        title: item.title,
        coverImage: item.coverImage,
        link: item.link,
    })
};

const handleCateClick = (item: { categoryNo: string }) => {
    activedCate.value = item.categoryNo;

    void requestHistory({
        pageSize: 10,
        pageNo: 1,
        categoryNo: item.categoryNo,
    })


};
const handleHistoryClick = (item: { resourceCode: string }) => {
    console.log('handleHistoryClick', item);
};
const handleVideoClick = (item: HomeHistoryRow | LessonListResponse) => {

    console.log('handleVideoClick', item);

    navigateVideoPlayer({
        subtitles: item.subtitles,
        title: item.title,
        coverImage: item.coverImage,
        link: item.link,
    })
};


const dotsStyles = {
    backgroundColor: 'rgba(255, 255, 255, .6)',
    border: '1px rgba(255, 255, 255, .6) solid',
    color: '#fff',
    selectedBackgroundColor: 'rgba(255, 255, 255, .8)',
    selectedBorder: '1px rgba(255, 255, 255, .8) solid'
}
const swiperDotIndex = ref(0);


const handleIntail = async () => {
    if (!props.show) {
        return;
    }
    const data = await requestHomeData();
    const firstCategory = data?.categories?.[0]?.categoryNo;
    activedCate.value = firstCategory;
    void requestHistory({
        pageSize: 10,
        pageNo: 1,
        categoryNo: firstCategory,
    })
    if (firstCategory) {
        reqestLessList({ categoryNo: firstCategory, pageSize: 10, pageNo: 1 });
        requestVideoList(data?.catalogues || [])
    }
}


onShow(async () => {
    handleIntail();
});
watch(() => props.show, (newVal) => {
    handleIntail();
}, {
    deep: true,
});




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
		border-radius: 14rpx;
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
    align-items: flex-end;

    .cate-item {
        display: flex;
        flex-direction: column;
        margin-right: 36rpx;
        align-items: center;
        justify-content: center;
        width: max-content;
        flex: 0 0 auto;

        .cate-image {
            // width: 90rpx;
            // height: 66rpx;
            width: 97rpx;
            height: 71rpx;
            background: #F5F6FB;
            border-radius: 999rpx;
            margin-bottom: 13rpx;
        }

        .cate-name {
            font-weight: 500;
            font-size: 24rpx;
            color: var(--v-color-grey-9);
        }
    }



    .cate-item__active .cate-image {
        width: 97rpx;
        height: 71rpx;
    }

    .cate-item__active .cate-name {
        // font-size: 26rpx;
        color: var(--v-color-zlv-7);
    }
}



::v-deep .history-info__text {
    margin-right: 12rpx;
}

::v-deep .history-info__text:last-child {
    margin-right: 0;
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

.lesson-list-scroll .uni-scroll-view-content,
.video-list-scroll .uni-scroll-view-content {
    width: max-content;

    padding-bottom: 40rpx;
}

.lesson-list {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 16rpx 20rpx;



    .lesson-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 24rpx;
        border-radius: 16rpx;
        background: #f2f2f2;

        overflow: hidden;
    }

    .lesson-image-warp {
        height: 392rpx;
        position: relative;
    }

    .lesson-image {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;

    }

}

::v-deep .uni-card {
    background-color: transparent !important;
}

::v-deep .uni-card__header {
    .uni-card__header-extra {
        align-self: flex-start !important;
        margin-top: 6rpx !important;
    }

    .uni-card__header-avatar {

        border-radius: 50% !important;
        overflow: hidden !important;

        .uni-card__header-avatar-image,
        img {
            width: 100%;
            height: 100%;
        }

        .uni-card__header-avatar-image>div {
            background-size: 100% 100% !important;

        }


    }
}
</style>