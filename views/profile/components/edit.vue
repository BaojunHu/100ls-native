<template>
  <uni-popup
    ref="editPopup"
    type="center"
    :mask-click="false"
    background-color="transparent"
    @change="onPopupChange"
  >
    <view class="edit-drawer">
      <!-- 头部 -->
      <view class="drawer-header">
        <view class="header-content">
          <text class="header-title">编辑资料</text>
          <view class="close-btn" @tap="closeDrawer">
            <uni-icons
              type="close"
              size="20"
              color="var(--v-color-grey-1)"
            ></uni-icons>
          </view>
        </view>
      </view>

      <!-- 内容区域 -->
      <scroll-view class="drawer-content" scroll-y="true">
        <!-- 头像区域 -->
        <view class="avatar-section">
          <view class="avatar-container" @tap="chooseAvatar">
            <image
              class="avatar"
              :src="userInfo.avatarImg || '/static/default-avatar.png'"
              mode="aspectFill"
            />
            <view class="avatar-overlay">
              <uni-icons
                type="camera"
                size="18"
                color="var(--v-color-grey-1)"
              ></uni-icons>
            </view>
          </view>
          <text class="avatar-tip">点击更换头像</text>
        </view>

        <!-- 表单区域 -->
        <view class="form-section">
          <view class="form-item">
            <text class="label">昵称</text>
            <input
              class="input"
              v-model="userInfo.memberName"
              placeholder="请输入昵称"
              placeholder-style="color: var(--v-color-grey-6)"
            />
          </view>

          <view class="form-item">
            <text class="label">英文名</text>
            <input
              class="input"
              v-model="userInfo.englishName"
              placeholder="请输入英文名"
              placeholder-style="color: var(--v-color-grey-6)"
            />
          </view>

          <view class="form-item">
            <text class="label">VIP状态</text>
            <view class="vip-status">
              <text class="vip-text" :class="{ active: userInfo.isVip }">
                {{ userInfo.isVip ? "VIP会员" : "普通用户" }}
              </text>
            </view>
          </view>

          <view class="form-item">
            <text class="label">加入时间</text>
            <text class="readonly-text">{{ userInfo.crtTime }}</text>
          </view>
        </view>
      </scroll-view>

      <!-- 底部按钮 -->
      <view class="drawer-footer">
        <view class="button-group">
          <m-button
            type="default"
            size="large"
            outline
            @click="closeDrawer"
            class="cancel-btn"
          >
            取消
          </m-button>
          <m-button
            type="primary"
            size="large"
            @click="saveProfile"
            class="save-btn"
          >
            保存修改
          </m-button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { homeServices } from "@/services/home";
import { getAuthToken } from "@/tools/user-info";

const editPopup = ref(null);

const userInfo = ref({
  memberName: "",
  englishName: "",
  avatarImg: "",
  isVip: false,
  crtTime: "",
});

// 打开抽屉
const openDrawer = () => {
  editPopup.value.open();
  loadUserInfo();
};

// 关闭抽屉
const closeDrawer = () => {
  editPopup.value.close();
};

// 弹窗状态变化
const onPopupChange = (e) => {
  console.log("弹窗状态:", e.show);
};

const loadUserInfo = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      uni.navigateTo({ url: "/pages/login/index" });
      return;
    }

    const res = await homeServices.getUserInfo(token);
    userInfo.value = {
      memberName: res.memberName,
      englishName: res.englishName || "",
      avatarImg: res.avatarImg,
      isVip: res.isVip,
      crtTime: res.crtTime,
    };
  } catch (error) {
    console.error("加载用户信息失败:", error);
    uni.showToast({
      title: "加载失败",
      icon: "none",
    });
  }
};

const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths;
      if (tempFilePaths.length > 0) {
        userInfo.value.avatarImg = tempFilePaths[0];
        // 这里可以上传到服务器
        uploadAvatar(tempFilePaths[0]);
      }
    },
    fail: (error) => {
      console.error("选择头像失败:", error);
    },
  });
};

const uploadAvatar = (filePath) => {
  // 实际项目中需要上传到服务器
  console.log("上传头像:", filePath);
  uni.showToast({
    title: "头像上传成功",
    icon: "success",
  });
};

const emit = defineEmits(["save-success"]);

const saveProfile = async () => {
  try {
    // 实际项目中需要调用更新用户信息的API
    console.log("保存用户信息:", userInfo.value);

    uni.showToast({
      title: "保存成功",
      icon: "success",
    });

    // 通知父组件保存成功
    emit("save-success", userInfo.value);

    setTimeout(() => {
      closeDrawer();
    }, 1000);
  } catch (error) {
    console.error("保存失败:", error);
    uni.showToast({
      title: "保存失败",
      icon: "none",
    });
  }
};

// 暴露方法给父组件
defineExpose({
  openDrawer,
  closeDrawer,
});
</script>

<style lang="scss" scoped>
.edit-drawer {
  width: 90vw;
  max-width: 600rpx;
  height: 65vh;
  background: var(--v-color-grey-1);
  display: flex;
  flex-direction: column;
  border-radius: 32rpx;
  overflow: hidden;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20rpx);
}

/* 头部样式 */
.drawer-header {
  background: linear-gradient(
    135deg,
    var(--v-color-primary-7) 0%,
    var(--v-color-primary-5) 100%
  );
  padding: 36rpx 40rpx 24rpx;
  position: relative;
  border-radius: 32rpx 32rpx 0 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  font-size: 36rpx;
  font-weight: 600;
  color: var(--v-color-grey-1);
  letter-spacing: 1rpx;
}

.close-btn {
  width: 56rpx;
  height: 56rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10rpx);
  transition: all 0.3s ease;

  &:active {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(0.95);
  }
}

/* 内容区域 */
.drawer-content {
  flex: 1;
  padding: 24rpx 40rpx;
  background: var(--v-color-grey-1);
}

/* 头像区域 */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28rpx;
}

.avatar-container {
  position: relative;
  margin-bottom: 24rpx;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  border: 3rpx solid var(--v-color-grey-1);
  box-shadow: 0 6rpx 24rpx rgba(255, 102, 9, 0.15);
  transition: all 0.3s ease;
}

.avatar-overlay {
  position: absolute;
  bottom: 4rpx;
  right: 4rpx;
  width: 40rpx;
  height: 40rpx;
  background: var(--v-color-primary-7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid var(--v-color-grey-1);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

.avatar-tip {
  font-size: 24rpx;
  color: var(--v-color-grey-6);
  font-weight: 400;
}

/* 表单区域 */
.form-section {
  background: var(--v-color-grey-2);
  border-radius: 16rpx;
  padding: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.form-item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 1rpx solid var(--v-color-grey-4);

  &:last-child {
    border-bottom: none;
  }
}

.label {
  width: 120rpx;
  font-size: 26rpx;
  color: var(--v-color-grey-8);
  font-weight: 500;
}

.input {
  flex: 1;
  padding: 20rpx 24rpx;
  border: 1rpx solid var(--v-color-grey-4);
  border-radius: 8rpx;
  font-size: 26rpx;
  background: var(--v-color-grey-1);
  color: var(--v-color-grey-9);
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: var(--v-color-primary-6);
    background: var(--v-color-grey-1);
    box-shadow: 0 0 0 2rpx rgba(255, 102, 9, 0.1);
  }

  &::placeholder {
    color: var(--v-color-grey-5);
    font-size: 24rpx;
  }
}

.vip-status {
  flex: 1;
}

.vip-text {
  display: inline-block;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  font-size: 22rpx;
  background: var(--v-color-grey-3);
  color: var(--v-color-grey-6);
  font-weight: 500;

  &.active {
    background: linear-gradient(
      45deg,
      var(--v-color-primary-6),
      var(--v-color-warning-6)
    );
    color: var(--v-color-grey-1);
    box-shadow: 0 2rpx 8rpx rgba(255, 102, 9, 0.15);
  }
}

.readonly-text {
  flex: 1;
  color: var(--v-color-grey-6);
  font-size: 26rpx;
}

/* 底部按钮 */
.drawer-footer {
  padding: 16rpx 40rpx 24rpx;
  background: var(--v-color-grey-1);
  border-top: 1rpx solid var(--v-color-grey-3);
}

.button-group {
  display: flex;
  gap: 20rpx;
}

.cancel-btn {
  flex: 1;
}

.save-btn {
  flex: 1;
}
</style>
