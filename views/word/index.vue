<template>
  <m-loading v-if="loading" text="正在加载单词..." direction="column" />

  <view class="page">
    <!-- 分类导航 -->
    <view
      class="category-nav"
      :style="{ 'padding-top': statusBarHeight + 'px' }"
    >
      <view class="category-scroll">
        <view
          class="category-item"
          :class="{ active: currentTab === 'unlearned' }"
          @tap="switchTab('unlearned')"
        >
          <text>未掌握</text>
        </view>
        <view
          class="category-item"
          :class="{ active: currentTab === 'learned' }"
          @tap="switchTab('learned')"
        >
          <text>已掌握</text>
        </view>
      </view>
    </view>

    <!-- 词汇列表 -->
    <scroll-view :scroll-y="true" class="word-list-container">
      <view class="word-list">
        <view
          class="word-item"
          v-for="(item, index) in wordListData?.rows || []"
          :key="item.id"
          :data-index="index"
        >
          <view class="word-content">
            <view class="word-icon" @tap="playAudio(item.audio)">
              <image src="/static/play.png" class="icon" />
            </view>
            <view class="word-info" @tap="showMeaningModal(item)">
              <view class="word-header">
                <text class="word-title">{{ item.word }}</text>
                <text class="word-status">显示释义</text>
              </view>
              <view class="word-pronunciation">{{ item.phonetic }}</view>
            </view>
          </view>
          <view class="word-actions">
            <button
              v-if="item.status === '0'"
              class="action-button"
              @tap="markAsLearned(item)"
            >
              已掌握
            </button>
            <button
              v-if="item.status === '1'"
              class="action-button"
              @tap="markAsUnlearned(item)"
            >
              重新学
            </button>
          </view>
        </view>
      </view>
      <!-- 空状态 -->
      <m-empty
        v-if="!wordListData?.rows?.length && currentTab === 'unlearned'"
        title="暂无未掌握的单词"
        desc="在播放页中选择生词添加吧"
        :img-width="320"
      />
      <m-empty
        v-if="!wordListData?.rows?.length && currentTab === 'learned'"
        title="暂无已掌握的单词"
        desc="请先学习一些单词"
        :img-width="320"
      />
    </scroll-view>

    <!-- 释义模态框 -->
    <view class="modal" :class="{ show: showMeaningModalFlag }">
      <view class="modal-content meaning-modal">
        <view class="modal-header">
          <text>{{ selectedWord?.word || "" }}</text>
          <m-icon
            type="icon-close"
            :size="48"
            color="grey-7"
            class="close-icon"
            @click="hideMeaningModal"
          />
        </view>
        <view class="modal-body">
          <view
            class="meaning-item"
            v-for="(meaning, index) in selectedWord?.meaningList || []"
            :key="index"
          >
            <text class="meaning-pos" v-if="meaning.pos">{{
              meaning.pos
            }}</text>
            <text class="meaning-tran">{{ meaning.tran }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 练习悬浮按钮 -->
    <!-- <view class="practice-button-section">
      <button class="practice-button" @tap="goToPractice">
        <image src="/static/play.png" class="practice-icon" />
        <text class="practice-button-text">
          {{ currentTab === "learned" ? "复习" : "练习" }}
        </text>
      </button>
   -->
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { onShow, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { useMRequest } from "@/tools/use-request";
import {
  wordServices,
  type WordItem,
  type WordListParams,
} from "@/services/word";

// 响应式数据
const currentTab = ref<"unlearned" | "learned">("unlearned");
const showMeaningModalFlag = ref(false);
const selectedWord = ref<WordItem>();
const pageNo = ref(1);
const pageSize = ref(10);
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0;

// 请求参数
const getRequestParams = (): WordListParams => ({
  pageNo: pageNo.value,
  pageSize: pageSize.value,
  status: currentTab.value === "unlearned" ? "0" : "1",
});

// 单词列表数据
const wordListData = ref<{
  rows: WordItem[];
  total: number;
} | null>(null);

// 获取单词列表
const {
  loading,
  runAsync: fetchWordListRequest,
  mutate,
} = useMRequest(
  async () => {
    const params = getRequestParams();
    const response = await wordServices.getWordList(params);

    return response;
  },
  {
    manual: true,
  }
);

// 封装获取数据的方法
const fetchWordList = async (isRefresh: boolean = false) => {
  const response = await fetchWordListRequest();
  if (response) {
    if (isRefresh || pageNo.value === 1) {
      // 刷新或第一页时替换数据
      wordListData.value = response;
    } else {
      // 加载更多时追加数据
      if (wordListData.value) {
        wordListData.value = {
          ...response,
          rows: [
            ...(wordListData.value?.rows || []),
            ...(response?.rows || []),
          ],
        };
      } else {
        wordListData.value = response;
      }
    }
  }
};

// 设置单词状态（乐观更新）
const updateWordStatus = async (params: {
  item: WordItem;
  newStatus: "0" | "1";
}) => {
  const currentData = wordListData.value;
  if (!currentData) return;

  // 保存原始数据用于回滚
  const originalData = { ...currentData };

  // 乐观更新：先更新UI
  const updatedRows = currentData.rows.filter(
    (row) => row.id !== params.item.id
  );

  const optimisticData = {
    ...currentData,
    rows: updatedRows,
    total: Math.max(0, currentData.total - 1), // 减少总数
  };

  // 立即更新UI
  mutate(optimisticData);
  wordListData.value = optimisticData;

  try {
    // 发送网络请求
    await wordServices.setWordStatus({
      id: params.item.id,
      word: params.item.word,
      pageSize: pageSize.value,
      status: params.newStatus,
    });

    // 成功提示
    const message = params.newStatus === "1" ? "已标记为已学" : "已移至未学";
    uni.showToast({
      title: message,
      icon: "success",
    });
  } catch (err: any) {
    // 请求失败，回滚UI更改
    mutate(originalData);
    wordListData.value = originalData;

    uni.showToast({
      title: err?.message || "操作失败",
      icon: "none",
    });
  }
};

// 切换标签页
const switchTab = async (tab: "unlearned" | "learned") => {
  // 添加触觉反馈
  uni.vibrateShort({
    type: "light",
  });

  currentTab.value = tab;
  pageNo.value = 1;
  await fetchWordList(true);
};

// 显示释义模态框
const showMeaningModal = (word: WordItem) => {
  selectedWord.value = word;
  showMeaningModalFlag.value = true;
};

// 关闭释义模态框
const hideMeaningModal = () => {
  showMeaningModalFlag.value = false;
  selectedWord.value = null;
};

// 标记为已学
const markAsLearned = async (item: WordItem) => {
  // 添加触觉反馈
  uni.vibrateShort({
    type: "light",
  });

  await updateWordStatus({ item, newStatus: "1" });
};

// 标记为未学
const markAsUnlearned = async (item: WordItem) => {
  // 添加触觉反馈
  uni.vibrateShort({
    type: "light",
  });

  await updateWordStatus({ item, newStatus: "0" });
};

// 播放音频
const playAudio = (audioUrl?: string) => {
  if (!audioUrl) {
    uni.showToast({
      title: "暂无音频",
      icon: "none",
    });
    return;
  }

  const audioContext = uni.createInnerAudioContext();
  audioContext.src = audioUrl;

  audioContext.onPlay(() => {
    uni.showToast({
      title: "正在播放",
      icon: "none",
      duration: 1000,
    });
  });

  audioContext.onError((err) => {
    console.error("音频播放失败:", err);
    uni.showToast({
      title: "播放失败",
      icon: "none",
    });
  });

  audioContext.play();
};

// 跳转到练习页面
const goToPractice = () => {
  const currentWordList = wordListData.value?.rows || [];

  if (currentWordList.length === 0) {
    const message =
      currentTab.value === "unlearned"
        ? "暂无未掌握的单词，请在播放页中选择生词添加吧"
        : "暂无已掌握的单词，请先学习一些单词";

    uni.showToast({
      title: message,
      icon: "none",
      duration: 2000,
    });
    return;
  }

  // 根据当前tab传递不同的来源参数
  //   const source = currentTab.value === "learned" ? "review" : "practice";
  //   uni.navigateTo({
  //     url: `/pages/practice/practice?source=${source}`,
  //   });
};

// 生命周期
onShow(async () => {
  await fetchWordList(true);
});

onPullDownRefresh(async () => {
  pageNo.value = 1;
  await fetchWordList(true);
  uni.stopPullDownRefresh();
});

onReachBottom(async () => {
  const currentData = wordListData.value;
  if (loading.value || !currentData) return;

  const totalPages = Math.ceil(currentData.total / pageSize.value);
  if (pageNo.value >= totalPages) return;

  pageNo.value = pageNo.value + 1;
  await fetchWordList(false);
});
</script>

<style lang="scss" scoped>
/* 页面整体样式 */
.page {
  background: linear-gradient(
    to bottom,
    var(--v-color-primary-1),
    var(--v-color-primary-2)
  );
  //   height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
  color: var(--v-color-grey-9);
}

/* 分类导航 */
.category-nav {
  padding: 24rpx 16rpx;
  background-color: #ffffff;
  border-bottom: 2rpx solid var(--v-color-grey-4);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 10;
}

.category-scroll {
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  width: calc(100% + 16rpx);
  margin: 0 -8rpx;
  box-sizing: border-box;
  height: 80rpx;
  display: flex;
  align-items: center;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 64rpx;
  padding: 0 32rpx;
  background-color: var(--v-color-primary-2);
  border-radius: 32rpx;
  margin: 0 12rpx;
  font-size: 30rpx;
  color: var(--v-color-primary-7);
  font-weight: 500;
  transition: all 0.3s ease;
}

.category-item.active {
  background-color: var(--v-color-primary-7);
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(255, 102, 9, 0.3);
  transform: scale(1.05);
  border-radius: 32rpx;
}

.word-list-container {
  flex: 1 1 100%;
  height: 0;
}

/* 词汇列表 */
.word-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 16rpx;
  padding: 24rpx;
  padding-bottom: 64rpx;
}

.word-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.word-item:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.12);
}

.word-content {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.word-icon {
  width: 88rpx;
  height: 88rpx;
  background-color: var(--v-color-primary-2);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.word-icon:hover {
  background-color: var(--v-color-primary-3);
}

.word-info {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  flex: 1;
}

.word-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.word-title {
  font-size: 36rpx;
  font-weight: bold;
  color: var(--v-color-grey-9);
  margin-right: 12rpx;
}

.word-status {
  font-size: 24rpx;
  color: var(--v-color-primary-7);
  background: var(--v-color-primary-2);
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  transition: all 0.3s ease;
}

.word-status:hover {
  background: var(--v-color-primary-3);
}

.word-pronunciation {
  font-size: 28rpx;
  color: var(--v-color-grey-7);
}

.word-actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.action-button {
  height: 56rpx;
  padding: 0 20rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-primary-7),
    var(--v-color-primary-8)
  );
  color: #ffffff;
  border-radius: 28rpx;
  font-size: 26rpx;
  line-height: 56rpx;
  border: none;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: linear-gradient(
    135deg,
    var(--v-color-primary-8),
    var(--v-color-primary-9)
  );
  box-shadow: 0 4rpx 12rpx rgba(255, 102, 9, 0.3);
}

.icon {
  width: 48rpx;
  height: 48rpx;
}

/* 模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
}

.modal.show {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: #ffffff;
  border-radius: 24rpx;
  width: 600rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.meaning-modal {
  max-height: 80vh;
  overflow-y: auto;
  background: linear-gradient(to bottom, #ffffff, var(--v-color-primary-1));
}

.modal-header {
  font-size: 36rpx;
  font-weight: bold;
  color: var(--v-color-grey-9);
  margin-bottom: 24rpx;
  text-align: center;
  position: relative;
  padding-bottom: 16rpx;
  border-bottom: 2rpx solid var(--v-color-primary-2);
}

.close-icon {
  position: absolute;
  right: 8rpx;
  top: 0rpx;
  transition: all 0.2s ease;
  cursor: pointer;
}

.close-icon:hover {
  transform: translateY(-50%) scale(1.1);
  opacity: 0.8;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.meaning-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  padding: 16rpx;
  background: var(--v-color-primary-1);
  border-radius: 12rpx;
  transition: all 0.3s ease;
}

.meaning-item:hover {
  background: var(--v-color-primary-2);
  transform: translateY(-2rpx);
}

.meaning-pos {
  font-size: 28rpx;
  font-weight: bold;
  color: var(--v-color-grey-9);
}

.meaning-tran {
  font-size: 28rpx;
  color: var(--v-color-grey-8);
  line-height: 1.5;
}

@keyframes slideIn {
  from {
    transform: translateY(50rpx);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 练习悬浮按钮 */
.practice-button-section {
  position: fixed;
  bottom: 120rpx; /* 调整位置避免覆盖 tabbar，tabbar 通常高度为 100rpx */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.practice-button {
  width: 160rpx;
  height: 88rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-primary-6),
    var(--v-color-primary-7)
  );
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(255, 102, 9, 0.4),
    0 0 0 3rpx rgba(255, 255, 255, 0.8),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;
  border: none;
  backdrop-filter: blur(10rpx);
  position: relative;
  overflow: hidden;
}

.practice-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.practice-button:hover::before {
  left: 100%;
}

.practice-button:hover {
  background: linear-gradient(
    135deg,
    var(--v-color-primary-7),
    var(--v-color-primary-8)
  );
  transform: translateY(-6rpx) scale(1.08);
  box-shadow: 0 12rpx 32rpx rgba(255, 102, 9, 0.5),
    0 0 0 4rpx rgba(255, 255, 255, 0.9),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.4);
  animation: pulse 2s infinite;
}

.practice-button:active {
  transform: translateY(-2rpx) scale(1.02);
}

.practice-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 8rpx;
  filter: brightness(0) invert(1);
  transition: all 0.3s ease;
}

.practice-button-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  letter-spacing: 1rpx;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 12rpx 32rpx rgba(255, 102, 9, 0.5),
      0 0 0 4rpx rgba(255, 255, 255, 0.9),
      inset 0 2rpx 4rpx rgba(255, 255, 255, 0.4);
  }

  50% {
    box-shadow: 0 12rpx 32rpx rgba(255, 102, 9, 0.7),
      0 0 0 5rpx rgba(255, 255, 255, 1),
      inset 0 2rpx 4rpx rgba(255, 255, 255, 0.5);
  }
}
</style>
