<template>
  <scroll-view scroll-y class="video-list-page layout-full" v-show="props.show">
    <uni-swiper-dot
      class="swiper-dot-box"
      :info="data?.banners"
      :current="swiperDotIndex"
      mode="round"
      :dots-styles="dotsStyles"
      field="content"
    >
      <!-- :autoplay="true" :interval="6000" -->
      <swiper
        class="swiper-box"
        :current="swiperDotIndex"
        @change="changeSwiperIndex($event?.detail?.current)"
      >
        <swiper-item v-for="(item, index) in data?.banners" :key="item.sortNo">
          <view
            class="swiper-item"
            :class="'swiper-item' + index"
            @click="handleVideoClick(item)"
          >
            <image
              :src="item.coverImage"
              mode="aspectFill"
              class="swiper-image"
              :lazy-load="true"
            />
            <text class="swiper-text">
              {{ item.title }}
            </text>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <scroll-view
      scroll-x
      :scroll-with-animation="true"
      class="cate-list-scroll"
    >
      <view class="cate-list">
        <div
          class="cate-item"
          v-for="item in data?.categories"
          :key="item.categoryNo"
          @click="handleCateClick(item)"
        >
          <div class="cate-image-warp">
            <image
              :src="item.icon"
              mode="heightFix"
              class="cate-image"
              :lazy-load="true"
            />
          </div>
          <text class="cate-name">
            {{ item.categoryName }}
          </text>
        </div>
      </view>
    </scroll-view>

    <uni-row
      :gutter="22"
      class="history-list"
      :showBorder="false"
      :highlight="false"
      :borderColor="false"
    >
      <uni-col
        :span="12"
        v-for="item in historyData?.rows"
        :key="item.resourceCode"
      >
        <div class="history-item" @click="handleVideoClick(item)">
          <div class="history-image-warp">
            <image
              :src="item.coverImage"
              mode="aspectFill"
              class="history-image"
              :lazy-load="true"
            />
            <view class="learing-tag" v-if="item?.currLearning"
              >你正在学习</view
            >

            <view class="episode-count">
              <m-text
                :size="20"
                color="blue-grey-1"
                v-if="item.currLearningIndex"
                >{{ item.episodeCount - item.currLearningIndex }}集待看</m-text
              >
              <m-text :size="20" color="blue-grey-1" v-else
                >全{{ item.episodeCount }}集</m-text
              >
            </view>
          </div>
          <m-text
            bold
            :size="26"
            color="grey-9"
            class="mt-12 mb-8 mx-20 text-ellipsis"
            >{{ item.title }}</m-text
          >

          <view class="history-info" v-if="item?.currLearning">
            <m-text :size="22" color="grey-7"
              >看至{{ item.currLearningIndex }}集</m-text
            >
            <m-text :size="22" color="grey-7" class="mx-12"> |</m-text>
            <m-text :size="22" color="grey-7">继续观看</m-text>
          </view>
          <view class="history-info" v-else>
            <m-text
              :size="22"
              color="grey-7"
              class="history-info__text"
              v-for="lang in item.languages"
              :key="lang"
              >{{ lang }}</m-text
            >
          </view>
        </div>
      </uni-col>
    </uni-row>

    <template v-for="videoListItem in videoListMap" :key="videoListItem.no">
      <m-text
        v-if="!!videoListItem.data.length"
        bold
        :size="30"
        color="grey-9"
        class="ml-20"
        >{{ videoListItem.name }}</m-text
      >
      <scroll-view
        scroll-x
        :scroll-with-animation="true"
        class="video-list-scroll"
        v-if="!!videoListItem.data.length"
      >
        <view class="video-list">
          <div
            class="video-item"
            v-for="item in videoListItem.data"
            :key="item.resourceCode"
            @click="handleVideoClick(item)"
          >
            <div class="video-image-warp">
              <image
                :src="item.coverImage"
                mode="aspectFill"
                class="video-image"
                :lazy-load="true"
              />
              <view class="episode-count">
                <m-text :size="20" color="blue-grey-1"
                  >全{{ item.episodeCount }}集</m-text
                >
              </view>
            </div>

            <m-text
              bold
              :size="26"
              color="grey-9"
              class="mt-12 mb-8 text-ellipsis"
              >{{ item.title }}</m-text
            >
            <view class="video-info">
              <m-text
                :size="22"
                color="grey-7"
                class="history-info__text"
                v-for="lang in item.languages"
                >{{ lang }}
              </m-text>
            </view>
          </div>
        </view>
        <!-- <view class="empty-box pb-40" v-if="videoListItem.data.length === 0 || videoListItem.data === null">
                    <m-empty desc="来到了知识的荒漠~" :imgWidth="160" />
                </view> -->
      </scroll-view>
    </template>

    <!-- <template v-for="videoListItem in lessonMap" :key="videoListItem.no">  -->
    <m-text bold :size="30" color="grey-9" class="ml-20">优质课程</m-text>
    <view class="lesson-list">
      <div
        class="lesson-item"
        v-for="item in lessonRes?.rows"
        :key="item.resourceCode"
        @click="handleVideoClick(item)"
      >
        <div class="lesson-image-warp">
          <image
            :src="item.coverImage"
            mode="aspectFill"
            class="lesson-image"
            :lazy-load="true"
          />
          <view class="episode-count">
            <!-- <m-text :size="20" color="blue-grey-1">全{{ item.episodeCount }}集</m-text> -->
          </view>
        </div>
        <uni-card
          :is-shadow="false"
          :is-full="true"
          :spacing="0"
          :padding="0"
          :border="false"
          class="lesson-info"
          :title="item.title"
          :sub-title="item.author"
          :extra="`${item.learnNumber}人在学`"
          :thumbnail="
            isUrl(item.authorIcon) ? item.authorIcon : '/static/logo.png'
          "
        />
      </div>
    </view>
    <!-- </template> -->
    <div class="pb-64"></div>
  </scroll-view>
  <m-loading v-if="loading" text="加载中..." direction="column" />
</template>
<script lang="ts" setup>
import { RouterEnum } from "@/router/constants";
import { navigateTo, navigateVideoPlayer } from "@/router/main";
import {
  Catalogue,
  Category,
  HomeData,
  HomeHistoryResponse,
  HomeHistoryRow,
  homeServices,
  LessonListResponse,
  THomeBannerItem,
} from "@/services/home";
import { preloadImage } from "@/tools/preload-img";
import { useMRequest } from "@/tools/use-request";
import { onShow } from "@dcloudio/uni-app";
import { title } from "process";

import { ref, watch } from "vue";

type TVideoListProps = {
  show: boolean;
};
const data = ref<HomeData>({} as HomeData);

const dotsStyles = {
  backgroundColor: "rgba(255, 255, 255, .6)",
  border: "1px rgba(255, 255, 255, .6) solid",
  color: "#fff",
  selectedBackgroundColor: "rgba(255, 255, 255, .8)",
  selectedBorder: "1px rgba(255, 255, 255, .8) solid",
};
const swiperDotIndex = ref(0);
const changeSwiperIndex = (idx: number) => {
  swiperDotIndex.value = idx;
  const list = data.value?.banners || [];
  const lastIdx = list?.length - 1;
  const item = list?.[idx].coverImage || "";
  emit("changeBgImg", item);

  const next = list?.[idx + 1]?.coverImage || "";
  preloadImage(next);
};
const emit = defineEmits<{
  (e: "changeBgImg", src: string): void;
}>();

const handleIntail = async () => {
  if (!props.show) {
    return;
  }
  void requestHistory({
    pageSize: 10,
    pageNo: 1,
    // categoryNo: firstCategory,
  });
  const res = await requestHomeData();

  const newCateList = res.categories?.sort((a, b) => {
    return a.sortNo - b.sortNo;
  });
  data.value = {
    ...res,
    categories: newCateList,
  };

  changeSwiperIndex(0);

  // emit('changeBgImg', data.value?.banners?.[0]?.coverImage || '');

  // handleCateClick(newCateList[0]);
  // reqestLessList({  pageSize: 10, pageNo: 1 });
  requestVideoList(res?.catalogues || []);
  // requestVideoList(res?.categories?.map((item) => {
  //     return {
  //         catalogueNo: item.categoryNo,
  //         catalogueName: item.categoryName,
  //     } as Catalogue;
  // }))
  requestLessonList();
};

const {
  loading,
  runAsync: requestHomeData,
  mutate: mutateCoreData,
} = useMRequest(homeServices.homeCore, {
  manual: true,
});
const { data: videoListMap, runAsync: requestVideoList } = useMRequest(
  async (catalogues: Catalogue[]) => {
    const promiseList = catalogues?.map((item) => {
      return homeServices.videoList({
        // catalogueNo: item.catalogueNo,
        categoryNo: item.catalogueNo,
        pageSize: 10,
        pageNo: 1,
      });
    });
    return Promise.all(promiseList).then((res) => {
      return res.map((item, index) => {
        return {
          no: catalogues?.[index]?.catalogueNo,
          data: (item?.rows || []).sort((a, b) => {
            return a.sortNo - b.sortNo;
          }),
          name: catalogues?.[index]?.catalogueName,
        };
      });
    }) as Promise<
      {
        no: string;
        data: HomeHistoryRow[];
        name: string;
      }[]
    >;
  },
  {
    manual: true,
  }
);

const { data: lessonRes, runAsync: requestLessonList } = useMRequest(
  async () => {
    return homeServices.lessonList({
      // catalogueNo: item.catalogueNo,
      // categoryNo: activedCate.value,
      pageSize: 10,
      pageNo: 1,
    });

    // const promiseList = catalogues?.map((item) => {
    // })
    // return Promise.all(promiseList).then((res) => {
    //     return res.map((item, index) => {
    //         return {
    //             no: catalogues?.[index]?.catalogueNo,
    //             data: (item?.rows || []).sort((a, b) => {
    //                 return (a.sortNo - b.sortNo);
    //             }),
    //             name: catalogues?.[index]?.catalogueName,
    //         }
    //     })
    // }) as Promise<{
    //     no: string;
    //     data: LessonListResponse[];
    //     name: string;
    // }[]>
  },
  {
    manual: true,
  }
);

const { data: historyData, run: requestHistory } = useMRequest(
  homeServices.history,
  {
    manual: true,
    onError: (err) => {
      //@ts-ignore
      if (err.code === "410") {
        hisEmptyErrorMsg.value = {
          title: "",
          desc: "",
          btnText: "点击登录，开始学习吧~",
        };
      } else {
        hisEmptyErrorMsg.value = {
          title: "暂无浏览记录",
          desc: "快去看看视频吧",
          btnText: "",
        };
      }
    },
    onSuccess: (res) => {
      if (!res?.rows?.length) {
        hisEmptyErrorMsg.value = {
          title: "暂无浏览记录",
          desc: "快去看看视频吧",
          btnText: "",
        };
      }
    },
    showErrorMessage: false,
  }
);

const hisEmptyErrorMsg = ref({
  title: "",
  desc: "",
  btnText: "",
});
// const activedCate = ref('')

const props = withDefaults(defineProps<TVideoListProps>(), {
  show: false,
});

const isUrl = (str: string) => {
  return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(str);
};

const handleEmptyClick = () => {
  if (hisEmptyErrorMsg.value.btnText) {
    navigateTo({
      path: RouterEnum.Login,
    });
  }
};

const handleCateClick = (item: Category) => {
  navigateTo({
    path: RouterEnum.Video,
    data: {
      categoryNo: item.categoryNo,
      title: item.categoryName,
    },
  });
};

const handleVideoClick = (
  item: HomeHistoryRow | LessonListResponse | THomeBannerItem
) => {
  navigateVideoPlayer({
    // subtitles: item.subtitles,
    // title: item.title,
    // coverImage: item.coverImage,
    // link: item.link,
    resourceCode: item.resourceCode,
    linkType: item.linkType,
  });
};

onShow(async () => {
  handleIntail();
});
watch(
  () => props.show,
  (newVal) => {
    handleIntail();
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped>
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
    color: #ffffff;
    line-height: 33rpx;

    left: 24rpx;
    bottom: 42rpx;
  }
}

.cate-list-scroll {
  margin-bottom: 40rpx;
}

.cate-list {
  display: flex;
  align-items: flex-end;
  padding: 0 32rpx;
  width: max-content;

  .cate-item {
    display: flex;
    flex-direction: column;
    margin-right: 36rpx;
    align-items: center;
    justify-content: center;
    width: max-content;
    flex: 0 0 auto;

    .cate-image-warp {
      // width: 90rpx;
      // height: 66rpx;
      width: 97rpx;
      height: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f6fb;
      border-radius: 999rpx;
      margin-bottom: 13rpx;
    }

    .cate-image {
      height: 48rpx;
    }

    .cate-name {
      font-weight: 500;
      font-size: 24rpx;
      color: var(--v-color-grey-9);
    }
  }

  // .cate-item__active .cate-image {
  //     width: 97rpx;
  //     height: 71rpx;
  // }

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
    color: #ffffff;
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
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(5, 5, 5, 0.69) 100%
  );
}

.lesson-list-scroll .uni-scroll-view-content,
.video-list-scroll .uni-scroll-view-content {
  //   width: max-content;
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
      background-color: #777;
    }

    .uni-card__header-avatar-image > div {
      background-size: 100% 100% !important;
    }
  }
}

.video-list {
  display: flex;
  flex-wrap: nowrap;
  padding: 16rpx 20rpx;
  width: max-content;
  gap: 12rpx;

  .video-item {
    display: flex;
    width: 228rpx;
    flex: 0 0 228rpx;
    flex-direction: column;
    // margin-right: 12rpx;
    margin-bottom: 24rpx;
  }

  //   .video-item:last-child {
  //     margin-right: 0;
  //   }

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
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(5, 5, 5, 0.69) 100%
  );
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
