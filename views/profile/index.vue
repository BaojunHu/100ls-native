<template>
  <view class="page">
    <!-- 个人资料 - VIP用户 -->
    <view
      v-if="isVip"
      :class="`profile-container ${isNight ? 'night-mode' : 'day-mode'}`"
    >
      <!-- 夜晚背景：星空+月亮+流星 -->
      <view v-if="isNight" class="starry-background">
        <view class="star star-1"></view>
        <view class="star star-2"></view>
        <view class="star star-3"></view>
        <view class="star star-4"></view>
        <view class="star star-5"></view>
        <view class="star star-6"></view>
        <view class="moon"></view>
        <!-- 流星 -->
        <view class="meteor meteor-1"></view>
        <view class="meteor meteor-3"></view>
      </view>
      <!-- 白天背景：可自定义样式 -->
      <view v-else class="day-background">
        <!-- 太阳 -->
        <view class="sun"></view>
        <!-- 云朵 -->
        <view class="cloud cloud-1"></view>
        <view class="cloud cloud-2"></view>
        <view class="cloud cloud-3"></view>
        <!-- 小鸟群 -->
        <view class="birds">
          <view class="bird bird-1"></view>
          <view class="bird bird-2"></view>
          <view class="bird bird-3"></view>
        </view>
      </view>

      <!-- 导航栏 -->
      <view class="nav-bar" :style="`padding-top: ${statusBarHeight + 40}rpx;`">
        <m-button
          type="text"
          size="small"
          :handleClick="onShareTap"
          class="share-button"
        >
          <image src="/static/icons/share.png" class="share-icon" />
        </m-button>
      </view>

      <!-- 用户信息区域 -->
      <view class="user-info-section">
        <view class="user-main-info">
          <!-- 用户头像 -->
          <view class="profile-avatar-container">
            <view
              class="profile-avatar"
              :style="`background-image: url(${avatarImg});`"
              @click="onAvatarTap"
            ></view>
            <view v-if="isVip" class="vip-badge">VIP</view>
          </view>

          <!-- 用户详细信息 -->
          <view class="user-details">
            <view class="user-name-row">
              <view class="user-name-edit-group">
                <view class="user-name" @click="onAvatarTap">{{
                  memberName
                }}</view>
                <m-icon
                  type="icon-edit"
                  :size="36"
                  :color="isNight ? 'grey-1' : 'grey-9'"
                />
              </view>
              <view class="vip-status">
                <view class="vip-dot"></view>
                <text class="vip-text">LV 1</text>
                <!-- <text class="vip-level"> - lv1</text> -->
              </view>
            </view>

            <view v-if="isVip && vipExpiry" class="vip-expiry-row">
              <text class="vip-expiry-text">VIP：{{ vipExpiry }} 到期</text>
            </view>
          </view>
        </view>

        <!-- 功能卡片区域 - 支持横向滚动 -->
        <scroll-view scroll-x class="feature-cards-scroll">
          <view class="feature-cards-inline">
            <view
              v-for="item in featureCards"
              :key="item.type"
              class="feature-card-inline"
              @click="onFeatureTap(item.type)"
            >
              <view :class="`card-icon-inline ${item.icon}`">
                <text class="benefit-emoji">{{ item.emoji }}</text>
              </view>
              <text class="card-text-inline">{{ item.text }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 非VIP用户简约资料区域 -->
    <view v-if="!isVip" class="simple-profile-container">
      <view class="nav-bar" :style="`padding-top: ${statusBarHeight + 40}rpx;`">
        <m-button
          type="text"
          size="small"
          :handleClick="onShareTap"
          class="share-button"
        >
          <image src="/static/icons/share.png" class="share-icon" />
        </m-button>
      </view>
      <view class="simple-user-info">
        <view class="simple-avatar-container">
          <view
            class="simple-avatar"
            :style="`background-image: url(${avatarImg});`"
            @click="onAvatarTap"
          ></view>
        </view>
        <view class="simple-details">
          <view class="user-name-edit-group">
            <view class="simple-name" @click="onAvatarTap">{{
              memberName
            }}</view>
            <image
              src="/static/icons/edit.png"
              class="user-edit-icon"
              @click="onAvatarTap"
            />
          </view>
          <view class="simple-desc">欢迎加入，开启你的学习之旅</view>
        </view>
      </view>
      <m-button
        size="large"
        :handleClick="onUpgradeTap"
        class="upgrade-svip-btn"
      >
        兑换中心·激活VIP
      </m-button>
    </view>

    <!-- 统计数据 -->
    <view class="stats-container">
      <view class="stat-item">
        <text class="stat-value">{{ coursesAll || 0 }}</text>
        <text class="stat-label">课程</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ housrsLearn || 0 }}</text>
        <text class="stat-label">加入天</text>
      </view>
    </view>

    <!-- 收藏课程 -->
    <view class="enrolled-section">
      <view class="enrolled-title">我的收藏</view>
      <scroll-view scroll-y class="enrolled-scroll">
        <view class="enrolled-container">
          <!-- 骨架屏 loading -->
          <template v-if="isEnrolledLoading || favoritesLoading">
            <view
              v-for="index in 3"
              :key="index"
              class="skeleton-item improved-skeleton"
            >
              <view class="skeleton-image improved-skeleton-image"></view>
              <view class="skeleton-info improved-skeleton-info">
                <view class="skeleton-line improved-skeleton-title"></view>
                <view class="skeleton-line improved-skeleton-desc"></view>
              </view>
            </view>
          </template>
          <!-- 空态 -->
          <template v-else-if="!courses || courses.length === 0">
            <view class="empty-state improved-empty-state">
              <image
                class="empty-image"
                src="/static/icons/empty.png"
                mode="aspectFit"
              />
              <view class="empty-text">暂无收藏课程</view>
            </view>
          </template>
          <!-- 正常数据 -->
          <template v-else>
            <view
              v-for="item in courses"
              :key="item.resourceCode"
              class="course-item"
              @click="onCourseTap(item)"
            >
              <view class="course-image-container">
                <view
                  class="course-image"
                  :style="`background-image: url(${item.imageUrl});`"
                ></view>
                <view class="play-overlay">
                  <view class="play-icon">▶</view>
                </view>
              </view>
              <view class="course-details">
                <text class="course-name">{{ item.title }}</text>
                <text class="course-desc">{{ item.shortDesc || "" }}</text>
              </view>
              <view class="course-arrow">
                <text class="arrow-icon">›</text>
              </view>
            </view>
          </template>
        </view>
      </scroll-view>
    </view>

    <!-- 会员激活中心 -->
    <RedeemModal
      :show="showRedeemModal"
      :featureCards="featureCards"
      @close="toggleRedeemModal"
      @success="handleRedeemSuccess"
    />

    <!-- 激活成功动画组件 -->
    <SuccessAnimation
      :show="showSuccessAnimation"
      message="激活成功！"
      subtitle="恭喜您成为VIP会员，现在可以享受所有专属权益"
      :featureCards="featureCards"
      @animationEnd="onSuccessAnimationEnd"
    />

    <!-- 编辑资料抽屉组件 -->
    <EditModal ref="editDrawerRef" @save-success="handleEditSaveSuccess" />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { getAuthToken, getUserInfo, setUserInfo } from "@/tools/user-info";
import { navigateTo, navigateVideoPlayer } from "@/router/main";
import { RouterEnum } from "@/router/constants";
import { profileServices } from "@/services/profile";
import { useMRequest } from "@/tools/use-request";
import SuccessAnimation from "./components/success-animation.vue";
import MButton from "@/components/m-button/m-button.vue";
import MIcon from "@/components/m-icon/m-icon.vue";
import EditModal from "./components/edit.vue";
import RedeemModal from "./components/redeem-modal.vue";
import { HomeHistoryRow, LinkTypeEnum } from "@/services/home";

// 响应式数据
const statusBarHeight = ref(0); // 状态栏高度（rpx）
const scrollHeight = ref(0); // 滚动区域高度（rpx）
const courses = ref<any[]>([]); // 收藏课程列表
const isVip = ref(false); // 是否为VIP用户
const showRedeemModal = ref(false); // 是否显示兑换中心弹窗
const showSuccessAnimation = ref(false); // 是否显示成功动画
const userInfo = ref<any>(null); // 用户信息
const memberName = ref(""); // 用户名
const crtTime = ref(""); // 加入时间
const englishName = ref(""); // 英文名
const avatarImg = ref(""); // 头像
const isNight = ref(false); // 是否夜晚，默认夜晚
const vipExpiry = ref(""); // VIP过期时间
const coursesAll = ref(0); // 总课程数
const housrsLearn = ref(0); // 学习天数
const isEnrolledLoading = ref(false); // 收藏列表加载状态

// 功能卡片数据
const featureCards = ref([
  {
    type: "classic",
    emoji: "🎵",
    text: "全课程点播",
    icon: "classic-icon",
  },
  {
    type: "grammar",
    emoji: "📝",
    text: "语法分析",
    icon: "grammar-icon",
  },
  {
    type: "translate",
    emoji: "🔤",
    text: "单词翻译",
    icon: "translate-icon",
  },
  {
    type: "repeat",
    emoji: "🔄",
    text: "A/B复读",
    icon: "repeat-icon",
  },
  {
    type: "subtitle",
    emoji: "💬",
    text: "字幕切换",
    icon: "subtitle-icon",
  },
]);

// 初始化系统信息
const initSystemInfo = () => {
  try {
    const systemInfo = uni.getSystemInfoSync();
    const rpxRatio = 750 / systemInfo.windowWidth; // 计算rpx转换比例
    const statusBarHeightValue = systemInfo.statusBarHeight * rpxRatio; // 状态栏高度（rpx）
    const windowHeight = systemInfo.windowHeight * rpxRatio; // 窗口高度（rpx）
    const navBarHeight = 80; // 导航栏高度（rpx）

    statusBarHeight.value = statusBarHeightValue;
    scrollHeight.value = windowHeight - statusBarHeightValue - navBarHeight;
  } catch (e) {
    console.error("获取系统信息失败:", e);
    uni.showToast({
      title: "系统信息加载失败",
      icon: "none",
      duration: 2000,
    });
  }
};

// 判断当前时间是白天还是夜晚
const setDayNightMode = () => {
  const hour = new Date().getHours();
  // 6点-18点为白天，其余为夜晚
  const isNightVal = !(hour >= 6 && hour < 18);

  isNight.value = isNightVal;

  // 根据日夜模式设置状态栏颜色

  uni.setNavigationBarColor({
    frontColor: isNight.value ? "#ffffff" : "#000000", // 状态栏文字颜色（仅支持 black/white）
  });
};

// 获取用户信息
const { runAsync: fetchUserInfoRequest, loading: userInfoLoading } =
  useMRequest(profileServices.getUserInfo, {
    manual: true,
    showErrorMessage: false,
  });

const fetchUserInfo = async () => {
  const token = getAuthToken();

  if (!token) {
    console.log("未登录，跳过用户信息查询");
    return;
  }

  try {
    const res = await fetchUserInfoRequest();
    // 预处理 crtTime，提取年份
    const crtTimeValue = res.crtTime || "";
    const crtYear =
      typeof crtTimeValue === "string" && crtTimeValue.length >= 4
        ? crtTimeValue.substring(0, 4)
        : "未知";

    memberName.value = res.memberName;
    crtTime.value = crtYear;
    avatarImg.value = res.avatarImg;
    isVip.value = !!res.isVip;
    vipExpiry.value = res.vipExpiry;
    coursesAll.value = res.coursesAll;
    housrsLearn.value = res.housrsLearn;

    // 转换数据类型以匹配 UserInfo 接口
    const userInfoForStorage = {
      ...res,
      isVip: !!res.isVip, // 确保 isVip 是 boolean 类型
    };
    setUserInfo(userInfoForStorage);
  } catch (err) {
    console.error("用户信息请求失败:", err);
  }
};

// 获取收藏列表
const { runAsync: fetchFavoritesRequest, loading: favoritesLoading } =
  useMRequest(
    async (params: { pageNo: number; pageSize: number }) => {
      return await profileServices.getFavoritesList(params);
    },
    {
      manual: true,
      showErrorMessage: false,
    }
  );

const fetchFavorites = async () => {
  const token = getAuthToken();
  if (!token) {
    console.log("未登录，跳过收藏列表查询");
    return;
  }

  isEnrolledLoading.value = true;
  try {
    const data = await fetchFavoritesRequest({
      pageNo: 1,
      pageSize: 10,
    });
    const coursesList = (data.rows || []).map((item: any) => ({
      ...item,
      shortDesc:
        typeof item.desc === "string" && item.desc
          ? item.desc.substring(0, 18) + "..."
          : "无描述",
    }));
    courses.value = coursesList;
  } catch (err) {
    console.error("收藏列表请求失败:", err);
  } finally {
    isEnrolledLoading.value = false;
  }
};

// 处理分享按钮点击
const onShareTap = () => {
  uni.share({
    provider: "weixin",
    type: 0,
    title: `${memberName.value || "用户"}的个人主页`,
    success: () => {
      console.log("分享成功");
    },
    fail: (err: any) => {
      console.error("分享失败:", err);
      uni.showToast({
        title: "分享失败",
        icon: "none",
        duration: 2000,
      });
    },
  });
};

// 编辑资料抽屉引用
const editDrawerRef = ref(null);

// 点击头像跳转逻辑
const onAvatarTap = () => {
  if (!getAuthToken()) {
    navigateTo({ path: RouterEnum.Login });
    return false;
  }
  // 显示编辑资料抽屉
  editDrawerRef.value?.openDrawer();
};

// 点击收藏课程跳转逻辑
const onCourseTap = (item: HomeHistoryRow) => {
  if (!item.resourceCode) {
    uni.showToast({
      title: "课程ID无效",
      icon: "none",
      duration: 2000,
    });
    return;
  }
  navigateVideoPlayer({
    resourceCode: item.resourceCode,
    linkType: item.linkType || LinkTypeEnum.VIDEO,
  });
};

// 功能卡片点击
const onFeatureTap = (type: string) => {
  const token = getAuthToken();

  if (!token) {
    navigateTo({ path: RouterEnum.Login });
    return;
  }

  // switch (type) {
  //   case "classic":
  //   case "grammar":
  //   case "translate":
  //   case "repeat":
  //   case "subtitle":
  //     uni.showToast({
  //       title: `${type}功能开发中`,
  //       icon: "none",
  //     });
  //     break;
  //   default:
  //     break;
  // }
};

// 升级按钮点击处理
const onUpgradeTap = () => {
  const token = getAuthToken();

  if (!token) {
    navigateTo({ path: RouterEnum.Login });
    return;
  }

  // 显示兑换弹窗
  toggleRedeemModal();
};

// 处理编辑资料保存成功
const handleEditSaveSuccess = (updatedUserInfo: any) => {
  // 更新本地用户信息
  memberName.value = updatedUserInfo.memberName;
  avatarImg.value = updatedUserInfo.avatarImg;
  isVip.value = updatedUserInfo.isVip;

  // 重新获取用户信息
  fetchUserInfo();

  uni.showToast({
    title: "资料更新成功",
    icon: "success",
  });
};

// 处理激活成功
const handleRedeemSuccess = () => {
  // 关闭激活弹窗
  toggleRedeemModal();
  // 显示成功动画
  showSuccessAnimation.value = true;
  // 重新获取用户信息
  fetchUserInfo();
};

// 切换兑换中心弹窗显示状态
const toggleRedeemModal = () => {
  showRedeemModal.value = !showRedeemModal.value;
};

// 成功动画结束回调
const onSuccessAnimationEnd = () => {
  showSuccessAnimation.value = false;
};

// 页面加载时初始化
onMounted(() => {
  initSystemInfo();
  setDayNightMode();
  fetchUserInfo();
  fetchFavorites();
});

// 页面显示时刷新
onShow(() => {
  setDayNightMode(); // 重新设置日夜模式和状态栏颜色
  fetchUserInfo();
  fetchFavorites();
});
</script>

<style lang="scss" scoped>
/* 页面整体样式 */
.page {
  background-color: var(--v-color-grey-3);
  // min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
  color: var(--v-color-grey-9);
}

/* 原生button样式 */
.page button:not(.m-btn) {
  height: auto;
  width: max-content;
  line-height: normal;
  margin: 0;
  padding: 12rpx 16rpx;
}

/* 个人资料容器 - 深色渐变背景 */
.profile-container {
  position: relative;
  height: max-content;
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 30%,
    #0f3460 70%,
    #0e4b99 100%
  );
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20rpx 32rpx 40rpx;
}

/* 夜晚模式 */
.night-mode {
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 30%,
    #0f3460 70%,
    #0e4b99 100%
  );
}

/* 白天模式 */
.day-mode {
  background: linear-gradient(180deg, #87ceeb 0%, #b0e0e6 50%, #e0f6ff 100%);
}

/* 星空背景 */
.starry-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.star {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
  box-shadow: 0 0 6rpx rgba(255, 255, 255, 0.5);
}

.star::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 1rpx;
  background: rgba(255, 255, 255, 0.6);
  animation: sparkle 0.4s infinite ease-in-out;
}

.star::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  width: 200%;
  height: 1rpx;
  background: rgba(255, 255, 255, 0.6);
  animation: sparkle 0.6s infinite ease-in-out;
}

.star-1 {
  width: 4rpx;
  height: 4rpx;
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.star-2 {
  width: 3rpx;
  height: 3rpx;
  top: 30%;
  left: 70%;
  animation-delay: 0.8s;
}

.star-3 {
  width: 2rpx;
  height: 2rpx;
  top: 15%;
  left: 85%;
  animation-delay: 1.5s;
}

.star-4 {
  width: 3rpx;
  height: 3rpx;
  top: 45%;
  left: 25%;
  animation-delay: 2.2s;
}

.star-5 {
  width: 4rpx;
  height: 4rpx;
  top: 60%;
  left: 80%;
  animation-delay: 0.3s;
}

.star-6 {
  width: 2rpx;
  height: 2rpx;
  top: 25%;
  left: 45%;
  animation-delay: 1.8s;
}

.moon {
  position: absolute;
  top: 80rpx;
  right: 200rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--v-color-warning-1) 0%,
    var(--v-color-warning-3) 70%,
    var(--v-color-warning-5) 100%
  );
  box-shadow: 0 0 20rpx rgba(255, 234, 167, 0.4),
    0 0 60rpx rgba(255, 234, 167, 0.2), inset -20rpx -20rpx 0 rgba(0, 0, 0, 0.1);
  animation: moonGlow 4s ease-in-out infinite alternate;
}

.moon::before {
  content: "";
  position: absolute;
  top: 15rpx;
  right: 25rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: -15rpx 10rpx 0 -2rpx rgba(0, 0, 0, 0.08),
    -30rpx 25rpx 0 -4rpx rgba(0, 0, 0, 0.06);
}

/* 流星样式 */
.meteor {
  position: absolute;
  width: 3rpx;
  height: 3rpx;
  background: var(--v-color-grey-1);
  border-radius: 50%;
  box-shadow: 0 0 6rpx rgba(255, 255, 255, 0.9),
    0 0 12rpx rgba(135, 206, 250, 0.6), 0 0 18rpx rgba(135, 206, 250, 0.3);
  opacity: 0;
}

.meteor::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120rpx;
  height: 2rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.8) 20%,
    rgba(135, 206, 250, 0.3) 80%,
    transparent
  );
  transform: translateY(-50%) translateX(0) rotate(-50deg);
  transform-origin: left center;
  border-radius: 1rpx;
}

.meteor::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80rpx;
  height: 1rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.6) 60%,
    transparent
  );
  transform: translateY(-50%) translateX(0) rotate(-50deg);
  transform-origin: left center;
  border-radius: 1rpx;
}

.meteor-1 {
  top: 8%;
  left: 92%;
  animation: meteorFall1 4s linear infinite;
  animation-delay: 1s;
}

.meteor-1::before {
  transform: translateY(-50%) translateX(0) rotate(-48deg);
}

.meteor-1::after {
  transform: translateY(-50%) translateX(0) rotate(-48deg);
}

.meteor-3 {
  top: 15%;
  left: 95%;
  animation: meteorFall3 3.5s linear infinite;
  animation-delay: 4s;
}

.meteor-3::before {
  transform: translateY(-50%) translateX(0) rotate(-58deg);
}

.meteor-3::after {
  transform: translateY(-50%) translateX(0) rotate(-58deg);
}

@keyframes moonGlow {
  0% {
    box-shadow: 0 0 20rpx rgba(255, 234, 167, 0.3),
      0 0 60rpx rgba(255, 234, 167, 0.15),
      inset -20rpx -20rpx 0 rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0 0 30rpx rgba(255, 234, 167, 0.5),
      0 0 80rpx rgba(255, 234, 167, 0.25),
      inset -20rpx -20rpx 0 rgba(0, 0, 0, 0.1);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 流星动画 */
@keyframes meteorFall1 {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0);
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-285rpx) translateY(295rpx);
  }
}

@keyframes meteorFall3 {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-265rpx) translateY(445rpx);
  }
}

/* 白天背景样式 */
.day-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #87ceeb 0%, #b0e0e6 50%, #e0f6ff 100%);
  overflow: hidden;
  pointer-events: none;
}

/* 太阳样式 */
.sun {
  position: absolute;
  top: 50rpx;
  right: 80rpx;
  width: 100rpx;
  height: 100rpx;
  background: radial-gradient(
    circle at 50rpx 50rpx,
    var(--v-color-warning-1) 0%,
    var(--v-color-warning-3) 40%,
    var(--v-color-warning-5) 80%,
    var(--v-color-warning-7) 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 60rpx 15rpx rgba(255, 160, 0, 0.6),
    0 0 120rpx 30rpx rgba(255, 160, 0, 0.4),
    0 0 180rpx 45rpx rgba(255, 160, 0, 0.2);
  animation: sunPulse 6s ease-in-out infinite;
  z-index: 2;
}

.sun::before {
  content: "";
  position: absolute;
  top: -40rpx;
  left: -40rpx;
  right: -40rpx;
  bottom: -40rpx;
  background: radial-gradient(
    circle,
    transparent 60%,
    rgba(255, 255, 255, 0.1) 70%,
    transparent 80%
  );
  border-radius: 50%;
  animation: sunRays 8s linear infinite;
}

/* 云朵样式 */
.cloud {
  position: absolute;
  background: linear-gradient(
    135deg,
    var(--v-color-grey-1) 0%,
    var(--v-color-grey-2) 100%
  );
  border-radius: 50rpx;
  opacity: 0.9;
  z-index: 3;
  filter: drop-shadow(0 4rpx 8rpx rgba(0, 0, 0, 0.1));
  animation: cloudFloat 15s ease-in-out infinite;
}

.cloud::before {
  content: "";
  position: absolute;
  background: inherit;
  border-radius: 50%;
}

.cloud::after {
  content: "";
  position: absolute;
  background: inherit;
  border-radius: 50%;
}

.cloud-1 {
  top: 80rpx;
  left: 160rpx;
  width: 80rpx;
  height: 40rpx;
  animation-delay: 0s;
}

.cloud-1::before {
  top: -20rpx;
  left: 10rpx;
  width: 60rpx;
  height: 40rpx;
}

.cloud-1::after {
  top: -15rpx;
  right: 15rpx;
  width: 40rpx;
  height: 30rpx;
}

.cloud-2 {
  top: 45rpx;
  left: 280rpx;
  width: 100rpx;
  height: 50rpx;
  animation-delay: -5s;
}

.cloud-2::before {
  top: -25rpx;
  left: 15rpx;
  width: 70rpx;
  height: 50rpx;
}

.cloud-2::after {
  top: -20rpx;
  right: 20rpx;
  width: 50rpx;
  height: 40rpx;
}

/* 增加更多云朵 */
.cloud-3 {
  top: 120rpx;
  left: 50rpx;
  width: 60rpx;
  height: 30rpx;
  animation-delay: -10s;
}

.cloud-3::before {
  top: -15rpx;
  left: 8rpx;
  width: 45rpx;
  height: 30rpx;
}

.cloud-3::after {
  top: -12rpx;
  right: 12rpx;
  width: 30rpx;
  height: 25rpx;
}

/* 小鸟群 */
.birds {
  position: absolute;
  top: 60rpx;
  left: 20rpx;
  z-index: 4;
}

.bird {
  position: absolute;
  width: 12rpx;
  height: 2rpx;
  background: var(--v-color-grey-9);
  border-radius: 1rpx;
  animation: birdFly 8s ease-in-out infinite;
}

.bird::before {
  content: "";
  position: absolute;
  top: 0;
  left: -8rpx;
  width: 8rpx;
  height: 2rpx;
  background: var(--v-color-grey-9);
  border-radius: 1rpx;
  transform: rotate(-20deg);
}

.bird::after {
  content: "";
  position: absolute;
  top: 0;
  right: -8rpx;
  width: 8rpx;
  height: 2rpx;
  background: var(--v-color-grey-9);
  border-radius: 1rpx;
  transform: rotate(20deg);
}

.bird-1 {
  animation-delay: 0s;
}
.bird-2 {
  top: 8rpx;
  left: 20rpx;
  animation-delay: -1s;
}
.bird-3 {
  top: 16rpx;
  left: 40rpx;
  animation-delay: -2s;
}

/* 动画效果 */
@keyframes sunPulse {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05) rotate(180deg);
    filter: brightness(1.1);
  }
}

@keyframes sunRays {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes cloudFloat {
  0%,
  100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(20rpx) translateY(-10rpx);
  }
  50% {
    transform: translateX(0) translateY(-5rpx);
  }
  75% {
    transform: translateX(-15rpx) translateY(-8rpx);
  }
}

@keyframes birdFly {
  0%,
  100% {
    transform: translateX(0) translateY(0) scale(1);
  }
  25% {
    transform: translateX(100rpx) translateY(-20rpx) scale(0.8);
  }
  50% {
    transform: translateX(200rpx) translateY(-10rpx) scale(1);
  }
  75% {
    transform: translateX(300rpx) translateY(-25rpx) scale(0.9);
  }
  100% {
    transform: translateX(400rpx) translateY(-15rpx) scale(0.7);
  }
}

/* 导航栏 */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 0 0;
  z-index: 10;
  position: relative;
}

/* 分享按钮 */
.share-button {
  position: absolute !important;
  width: 48rpx !important;
  height: 48rpx !important;
  background: transparent !important;
  border: none !important;
  right: 12rpx;
  bottom: -72rpx;
  padding: 0 !important;
  border-radius: 0 !important;
}

.share-button::after {
  content: none;
}

.share-icon {
  width: 32rpx;
  height: 32rpx;
  filter: brightness(0) invert(1);
}

/* 用户信息区域 */
.user-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-main-info {
  display: flex;
  align-items: flex-start;
  gap: 32rpx;
  margin-bottom: 24rpx;
}

/* 用户头像容器 */
.profile-avatar-container {
  position: relative;
  flex-shrink: 0;
  width: 140rpx;
  height: 140rpx;
}

.profile-avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.25),
    0 6rpx 12rpx rgba(255, 255, 255, 0.1),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.2),
    0 0 0 4rpx rgba(255, 102, 9, 0.1);
  border: 4rpx solid rgba(255, 255, 255, 0.2);
  animation: avatarFloat 3s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.profile-avatar::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(255, 102, 9, 0.1),
    transparent,
    rgba(255, 102, 9, 0.05),
    transparent
  );
  animation: avatarRotate 8s linear infinite;
  z-index: -1;
}

.profile-avatar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.1) 0%,
    transparent 50%,
    rgba(255, 102, 9, 0.05) 100%
  );
  pointer-events: none;
}

.vip-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-primary-7) 0%,
    var(--v-color-warning-7) 50%,
    var(--v-color-success-7) 100%
  );
  color: var(--v-color-grey-1);
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
  animation: vipPulse 2s ease-in-out infinite;
  z-index: 10;
  border: 2rpx solid var(--v-color-grey-1);
}

@keyframes avatarFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8rpx) scale(1.02);
  }
}

@keyframes avatarRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes vipPulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6rpx 12rpx rgba(255, 102, 9, 0.4);
  }
}

/* 用户详细信息 */
.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  padding-top: 8rpx;
  position: relative;
  z-index: 10;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.user-name-edit-group {
  display: inline-flex;
  align-items: center;
  gap: 6rpx;
  vertical-align: middle;
}

.user-name {
  font-size: 40rpx;
  font-weight: 700;
  position: relative;
  z-index: 999;
  color: var(--v-color-grey-1);
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.user-edit-icon {
  width: 24rpx;
  height: 24rpx;
  margin-left: 2rpx;
  opacity: 0.8;
  cursor: pointer;
  transition: opacity 0.2s;
  vertical-align: middle;
  position: relative;
  top: 1rpx;
}

.user-edit-icon:active {
  opacity: 1;
}

.vip-status {
  display: flex;
  align-items: center;
  gap: 6rpx;
  background: rgba(255, 255, 255, 0.12);
  padding: 6rpx 12rpx;
  border-radius: 14rpx;
  backdrop-filter: blur(10rpx);
  position: relative;
  z-index: 10;
}

.vip-dot {
  width: 8rpx;
  height: 8rpx;
  background: var(--v-color-success-7);
  border-radius: 50%;
  box-shadow: 0 0 6rpx rgba(0, 209, 110, 0.5);
  animation: pulse 2s infinite;
  margin-right: 8rpx;
}

.vip-text {
  font-size: 22rpx;
  font-weight: 600;
  color: var(--v-color-grey-1);
}

.vip-level {
  font-size: 18rpx;
  color: var(--v-color-grey-1);
  opacity: 0.8;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.vip-expiry-row {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 4rpx 0;
  border-radius: 18rpx;
  backdrop-filter: blur(10rpx);
  align-self: flex-start;
}

.vip-expiry-text {
  font-size: 24rpx;
  color: var(--v-color-grey-1);
  opacity: 0.9;
}

/* 横向滚动容器 */
.feature-cards-scroll {
  margin-top: 24rpx;
  white-space: nowrap;
}

/* 内联功能卡片区域 - 横向滚动布局 */
.feature-cards-inline {
  display: flex;
  flex-direction: row;
  gap: 12rpx;
  padding: 0;
  width: max-content;
}

.feature-card-inline {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rpx;
  min-width: max-content;
  padding: 12rpx 16rpx;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12rpx;
  transition: all 0.3s ease;
  backdrop-filter: blur(5rpx);
  flex-shrink: 0;
}

.feature-card-inline:active {
  transform: scale(0.95);
  background: rgba(0, 0, 0, 0.4);
}

.card-icon-inline {
  width: 40rpx;
  height: 40rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 表情符号图标样式 */
.benefit-emoji {
  font-size: 20rpx;
  line-height: 1;
}

.card-text-inline {
  font-size: 22rpx;
  color: var(--v-color-grey-1);
  font-weight: 500;
  text-align: left;
  line-height: 1.2;
  white-space: nowrap;
  flex-shrink: 0;
}

/* 非VIP简约资料样式 */
.simple-profile-container {
  background: var(--v-color-grey-1);
  border-radius: 24rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.04);
  padding: 0 0 32rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.simple-profile-container .nav-bar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 88rpx;
  box-sizing: border-box;
}

.simple-profile-container .share-button {
  background: none;
  border: none;
  padding: 0 32rpx 0 0;
  margin: 0;
  box-shadow: none;
}

.simple-profile-container .share-icon {
  width: 48rpx;
  height: 48rpx;
  display: block;
}

.simple-user-info {
  margin-top: 0;
  margin-bottom: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24rpx;
}

.simple-avatar-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.simple-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 3rpx solid var(--v-color-primary-5);
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 102, 9, 0.15),
    0 2rpx 6rpx rgba(255, 102, 9, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.simple-avatar::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(255, 102, 9, 0.08),
    transparent,
    rgba(255, 102, 9, 0.04),
    transparent
  );
  animation: avatarRotate 12s linear infinite;
  z-index: -1;
}

.simple-avatar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.08) 0%,
    transparent 50%,
    rgba(255, 102, 9, 0.04) 100%
  );
  pointer-events: none;
}

.simple-avatar:active {
  transform: scale(0.95);
  border-color: var(--v-color-primary-7);
  box-shadow: 0 6rpx 16rpx rgba(255, 102, 9, 0.25),
    0 3rpx 8rpx rgba(255, 102, 9, 0.15);
}

.simple-details {
  text-align: center;
}

.simple-name {
  font-size: 36rpx;
  font-weight: 600;
  color: var(--v-color-grey-9);
  margin-bottom: 8rpx;
}

.simple-desc {
  font-size: 24rpx;
  color: var(--v-color-grey-7);
}

/* 升级SVIP按钮 */
.simple-profile-container .upgrade-svip-btn {
  margin: 32rpx auto 0 auto !important;
  border-radius: 99rpx !important;
  font-size: 26rpx !important;
  font-weight: 500 !important;
  height: 72rpx !important;
  width: max-content !important;
  letter-spacing: 1rpx !important;
  background: linear-gradient(
    135deg,
    var(--v-color-primary-7),
    var(--v-color-primary-8)
  ) !important;
  color: var(--v-color-grey-1) !important;
  border: none !important;
  box-shadow: 0 8rpx 24rpx rgba(255, 102, 9, 0.3),
    0 4rpx 12rpx rgba(255, 102, 9, 0.2) !important;
  transition: all 0.3s ease !important;
  position: relative !important;
  overflow: hidden !important;
}

.simple-profile-container .upgrade-svip-btn::before {
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

.simple-profile-container .upgrade-svip-btn:active {
  transform: translateY(2rpx) scale(0.98) !important;
  box-shadow: 0 4rpx 12rpx rgba(255, 102, 9, 0.4),
    0 2rpx 6rpx rgba(255, 102, 9, 0.3) !important;
}

.simple-profile-container .upgrade-svip-btn:active::before {
  left: 100%;
}

/* 统计数据 */
.stats-container {
  display: flex;
  gap: 16rpx;
  padding: 20rpx 24rpx 24rpx;
  background-color: var(--v-color-grey-1);
  margin-bottom: 8rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 20rpx 12rpx;
  border: 1rpx solid rgba(255, 102, 9, 0.2);
  border-radius: 12rpx;
  text-align: center;
  transition: all 0.2s ease;
  background: linear-gradient(
    135deg,
    var(--v-color-grey-1) 0%,
    rgba(255, 102, 9, 0.02) 100%
  );
}

.stat-item:hover {
  transform: translateY(-1rpx);
  box-shadow: 0 2rpx 8rpx rgba(255, 102, 9, 0.1);
  border-color: rgba(255, 102, 9, 0.4);
}

.stat-value {
  font-size: 36rpx;
  font-weight: 700;
  color: var(--v-color-primary-7);
  line-height: 1.2;
}

.stat-label {
  font-size: 24rpx;
  color: var(--v-color-grey-7);
  line-height: 1.4;
}

/* 收藏课程 */
.enrolled-section {
  display: flex;
  flex-direction: column;
  padding: 24rpx 24rpx 0 24rpx;
  flex: 1;
  background: linear-gradient(
    135deg,
    var(--v-color-grey-1) 0%,
    rgba(255, 102, 9, 0.02) 100%
  );
  border-radius: 24rpx 24rpx 0 0;
  margin-top: 8rpx;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.enrolled-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4rpx;
  background: linear-gradient(
    90deg,
    var(--v-color-primary-7),
    var(--v-color-primary-8),
    var(--v-color-primary-7)
  );
}

.enrolled-title {
  font-size: 32rpx;
  font-weight: 700;
  padding: 32rpx 0 20rpx;
  line-height: 1.2;
  color: var(--v-color-primary-7);
  position: relative;
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.enrolled-title::before {
  content: "📚";
  font-size: 28rpx;
}

.enrolled-scroll {
  background: transparent;
  border-radius: 12rpx;
  flex: 1;
  height: 100%;
  min-height: 200rpx;
  padding: 8rpx 0;
}

.enrolled-container {
  padding-bottom: 16rpx;
}

.course-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 16rpx;
  border-radius: 16rpx;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 12rpx;
  background: linear-gradient(
    135deg,
    var(--v-color-grey-1) 0%,
    rgba(255, 102, 9, 0.02) 100%
  );
  border: 1rpx solid rgba(255, 102, 9, 0.08);
  position: relative;
  overflow: hidden;
}

.course-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 102, 9, 0.03) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.course-item:active {
  transform: translateY(2rpx) scale(0.98);
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.05) 0%,
    rgba(255, 102, 9, 0.08) 100%
  );
  border-color: rgba(255, 102, 9, 0.2);
  box-shadow: 0 4rpx 16rpx rgba(255, 102, 9, 0.15),
    0 2rpx 8rpx rgba(255, 102, 9, 0.1);
}

.course-item:active::before {
  opacity: 1;
}

.course-image {
  width: 140rpx;
  height: 84rpx;
  min-width: 140rpx;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1), 0 2rpx 6rpx rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.course-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.course-item:active .course-image {
  transform: scale(1.05);
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.15), 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.course-item:active .course-image::before {
  opacity: 1;
}

.course-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8rpx;
  min-width: 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.course-name {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--v-color-grey-9);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.05);
}

.course-desc {
  font-size: 24rpx;
  color: var(--v-color-grey-7);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
  opacity: 0.85;
}

.course-item:active .course-name {
  color: var(--v-color-primary-7);
}

.course-item:active .course-desc {
  color: var(--v-color-primary-6);
  opacity: 1;
}

/* 课程图片容器 */
.course-image-container {
  position: relative;
  width: 140rpx;
  height: 84rpx;
  min-width: 140rpx;
  border-radius: 12rpx;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 播放覆盖层 */
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(2rpx);
}

.play-icon {
  width: 32rpx;
  height: 32rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--v-color-primary-7);
  font-size: 16rpx;
  font-weight: bold;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.course-item:active .play-overlay {
  opacity: 1;
  background: rgba(0, 0, 0, 0.4);
}

.course-item:active .play-icon {
  transform: scale(1);
  background: var(--v-color-primary-7);
  color: white;
  box-shadow: 0 4rpx 12rpx rgba(255, 102, 9, 0.4);
}

/* 箭头指示器 */
.course-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.arrow-icon {
  font-size: 32rpx;
  color: var(--v-color-grey-6);
  font-weight: 300;
  transition: all 0.3s ease;
}

.course-item:active .course-arrow {
  opacity: 1;
  transform: translateX(4rpx);
}

.course-item:active .arrow-icon {
  color: var(--v-color-primary-7);
  font-weight: 500;
}

/* 课程项动画效果 */
@keyframes courseItemFadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.course-item {
  animation: courseItemFadeIn 0.6s ease-out;
}

.course-item:nth-child(1) {
  animation-delay: 0.1s;
}
.course-item:nth-child(2) {
  animation-delay: 0.2s;
}
.course-item:nth-child(3) {
  animation-delay: 0.3s;
}
.course-item:nth-child(4) {
  animation-delay: 0.4s;
}
.course-item:nth-child(5) {
  animation-delay: 0.5s;
}

/* 优化后的骨架屏样式 */
.improved-skeleton {
  background: linear-gradient(
    90deg,
    var(--v-color-grey-3) 25%,
    var(--v-color-grey-5) 50%,
    var(--v-color-grey-3) 75%
  );
  animation: skeleton-loading 1.2s infinite linear;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
}

.improved-skeleton-image {
  width: 120rpx;
  height: 72rpx;
  background: var(--v-color-grey-5);
  border-radius: 10rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.improved-skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.improved-skeleton-title {
  width: 65%;
  height: 22rpx;
  background: var(--v-color-grey-5);
  border-radius: 6rpx;
}

.improved-skeleton-desc {
  width: 45%;
  height: 18rpx;
  background: var(--v-color-grey-5);
  border-radius: 6rpx;
}

/* 我的收藏骨架屏 */
.skeleton-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 12rpx 8rpx;
  border-radius: 8rpx;
  margin-bottom: 8rpx;
  background: var(--v-color-grey-3);
  animation: skeleton-loading 1.2s infinite linear;
}

.skeleton-image {
  width: 120rpx;
  height: 72rpx;
  background: var(--v-color-grey-5);
  border-radius: 6rpx;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.skeleton-line {
  height: 22rpx;
  background: var(--v-color-grey-5);
  border-radius: 4rpx;
}

.skeleton-title {
  width: 60%;
}

.skeleton-desc {
  width: 40%;
}

@keyframes skeleton-loading {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* 优化后的空态样式 */
.improved-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0 40rpx 0;
  color: var(--v-color-grey-6);
}

.empty-image {
  width: 180rpx;
  height: 180rpx;
  margin-bottom: 18rpx;
  opacity: 0.85;
  transform: translateX(15%);
}

/* 我的收藏空态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx 0 32rpx 0;
  color: var(--v-color-grey-6);
}

.empty-icon {
  font-size: 80rpx;
  color: var(--v-color-grey-5);
  margin-bottom: 16rpx;
}

.empty-text {
  font-size: 26rpx;
  color: var(--v-color-grey-6);
  margin-top: 8rpx;
}

/* 白天模式样式适配 */
.profile-container.day-mode .user-name {
  color: var(--v-color-grey-9) !important;
  text-shadow: 0 2rpx 4rpx rgba(255, 255, 255, 0.8) !important;
}

.profile-container.day-mode .vip-status {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20rpx);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.profile-container.day-mode .vip-text {
  color: var(--v-color-grey-9);
}

.profile-container.day-mode .vip-level {
  color: var(--v-color-grey-7);
  opacity: 0.8;
}

.profile-container.day-mode .vip-expiry-text {
  color: var(--v-color-grey-9);
  opacity: 0.8;
}

.profile-container.day-mode .share-icon {
  filter: brightness(0) invert(0);
}

.profile-container.day-mode .feature-card-inline {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20rpx);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.profile-container.day-mode .card-text-inline {
  color: var(--v-color-grey-9);
}

.profile-container.day-mode .profile-avatar {
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.15),
    0 6rpx 12rpx rgba(255, 102, 9, 0.1),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.8),
    0 0 0 4rpx rgba(255, 102, 9, 0.15);
  border: 4rpx solid rgba(255, 255, 255, 0.8);
}

.profile-container.day-mode .profile-avatar::before {
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(255, 102, 9, 0.15),
    transparent,
    rgba(255, 102, 9, 0.08),
    transparent
  );
}

.profile-container.day-mode .profile-avatar::after {
  background: linear-gradient(
    135deg,
    rgba(255, 102, 9, 0.15) 0%,
    transparent 50%,
    rgba(255, 102, 9, 0.08) 100%
  );
}

.profile-container.day-mode .vip-badge {
  background: linear-gradient(
    135deg,
    var(--v-color-warning-1) 0%,
    var(--v-color-warning-3) 20%,
    var(--v-color-warning-5) 50%,
    var(--v-color-warning-7) 80%,
    var(--v-color-warning-9) 100%
  );
  box-shadow: 0 0 36rpx 12rpx rgba(255, 160, 0, 0.55),
    0 0 72rpx 24rpx rgba(255, 255, 200, 0.22),
    0 8rpx 32rpx rgba(255, 160, 0, 0.45), 0 4rpx 16rpx rgba(191, 160, 70, 0.22);
  border: 3rpx solid var(--v-color-warning-1);
  color: var(--v-color-warning-9);
  text-shadow: 0 4rpx 16rpx rgba(255, 160, 0, 0.45),
    0 2rpx 4rpx var(--v-color-warning-1), 0 0 20rpx var(--v-color-warning-5);
  font-weight: bold;
  font-size: 20rpx;
  padding: 0rpx 12rpx;
  line-height: 32rpx;
  border-radius: 16rpx;
  position: absolute;
  top: -12rpx;
  right: -12rpx;
  z-index: 10;
  overflow: visible;
  animation: goldPulse 2.2s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-container.day-mode .vip-badge::after {
  content: "";
  position: absolute;
  top: -16rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 150%;
  height: 150%;
  border-radius: 28rpx;
  background: radial-gradient(
    circle,
    rgba(255, 255, 200, 0.22) 0%,
    rgba(255, 255, 255, 0.1) 60%,
    transparent 100%
  );
  z-index: 0;
  pointer-events: none;
  filter: blur(4rpx);
  animation: goldShine 3.5s linear infinite;
}

@keyframes goldPulse {
  0%,
  100% {
    box-shadow: 0 0 24rpx 8rpx rgba(255, 160, 0, 0.45),
      0 0 48rpx 16rpx rgba(255, 255, 200, 0.18),
      0 4rpx 16rpx rgba(255, 160, 0, 0.35), 0 2rpx 8rpx rgba(191, 160, 70, 0.18);
    filter: brightness(1);
  }
  50% {
    box-shadow: 0 0 36rpx 16rpx rgba(255, 160, 0, 0.65),
      0 0 64rpx 24rpx rgba(255, 255, 200, 0.28),
      0 8rpx 32rpx rgba(255, 160, 0, 0.45),
      0 4rpx 16rpx rgba(191, 160, 70, 0.28);
    filter: brightness(1.12) saturate(1.2);
  }
}

@keyframes goldShine {
  0% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.08);
  }
  100% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1);
  }
}
</style>
