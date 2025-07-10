<template>
  <view class="profile-page">
    <!-- 背景装饰 -->
    <view class="bg-decoration">
      <view class="bg-circle bg-circle-1"></view>
      <view class="bg-circle bg-circle-2"></view>
      <view class="bg-circle bg-circle-3"></view>
    </view>

    <!-- 顶部个人信息卡片 -->
    <view class="profile-card">
      <view class="profile-header">
        <view class="profile-avatar-container" @tap="onAvatarTap">
          <image 
            class="profile-avatar" 
            :src="userInfo.avatarImg || '/static/default-avatar.png'" 
            mode="aspectFill"
          />
          <view class="vip-badge" v-if="userInfo.isVip">VIP</view>
        </view>
        
        <view class="profile-info">
          <text class="profile-name">{{ userInfo.memberName || '未设置' }}</text>
          <text class="profile-joined">加入时间 {{ userInfo.crtTime || '' }}</text>
        </view>
        
        <button 
          class="share-button" 
          open-type="share"
          @click="onShareTap"
        >
          <uni-icons type="redo" size="20" color="#666"></uni-icons>
        </button>
      </view>

      <view class="redeem-section">
        <view class="redeem-info">
          <text class="redeem-title">兑换中心</text>
          <text class="redeem-desc">输入激活码开启更多权益</text>
        </view>
        <button class="redeem-button" @tap="onRedeemButtonTap">
          <uni-icons type="gift" size="18" color="#fff"></uni-icons>
        </button>
      </view>
    </view>

    <!-- 数据统计卡片 -->
    <view class="stats-card">
      <view class="stat-item">
        <text class="stat-value">{{ userInfo.coursesAll || 0 }}</text>
        <text class="stat-label">课程</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-value">{{ userInfo.housrsLearn || 0 }}</text>
        <text class="stat-label">学习天数</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-value">{{ courses.length || 0 }}</text>
        <text class="stat-label">收藏</text>
      </view>
    </view>

    <!-- 我的收藏 -->
    <view class="favorites-section">
      <view class="section-header">
        <text class="section-title">我的收藏</text>
        <text class="section-more">查看更多</text>
      </view>
      
      <scroll-view 
        scroll-y 
        class="favorites-scroll"
        :style="{ height: scrollHeight + 'px' }"
        v-if="courses.length > 0"
      >
        <view 
          class="course-card"
          v-for="course in courses" 
          :key="course.resourceCode"
          @tap="onCourseTap"
          :data-id="course.resourceCode"
        >
          <view class="course-image-container">
            <image 
              class="course-image" 
              :src="course.imageUrl || '/static/default-course.png'"
              mode="aspectFill"
            />
            <view class="course-tag">收藏</view>
          </view>
          
          <view class="course-content">
            <text class="course-title">{{ course.title }}</text>
            <text class="course-desc">{{ course.shortDesc }}</text>
            <view class="course-meta">
              <text class="course-time">{{ formatTime(course.createTime) }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
      
      <view class="empty-state" v-else>
        <uni-icons type="star" size="60" color="#e0e0e0"></uni-icons>
        <text class="empty-text">暂无收藏课程</text>
      </view>
    </view>

    <!-- 兑换中心弹窗 -->
    <view class="modal-mask" v-if="showRedeemModal" @tap="toggleRedeemModal">
      <view class="redeem-modal" @tap.stop>
        <view class="modal-header">
          <view class="modal-header-content">
            <view class="modal-icon">
              <uni-icons type="gift" size="24" color="#fff"></uni-icons>
            </view>
            <text class="modal-title">兑换中心</text>
            <text class="modal-subtitle">输入激活码开启更多权益</text>
          </view>
          <view class="modal-close" @tap="toggleRedeemModal">
            <uni-icons type="close" size="18" color="#666"></uni-icons>
          </view>
        </view>
        
        <view class="modal-content">
          <view class="input-group">
            <text class="input-label">
              <uni-icons type="scan" size="16" color="#ff6609"></uni-icons>
              激活码
            </text>
            <view class="input-wrapper">
              <input 
                class="redeem-input"
                v-model="redeemCode"
                placeholder="请输入您的激活码"
                maxlength="20"
                @input="onRedeemInput"
              />
              <view class="input-border"></view>
            </view>
          </view>
          
          <view class="modal-buttons">
            <button class="modal-btn cancel-btn" @tap="toggleRedeemModal">
              <uni-icons type="close" size="16" color="#666"></uni-icons>
              取消
            </button>
            <button class="modal-btn confirm-btn" @tap="confirmRedeem">
              <uni-icons type="checkmarkempty" size="16" color="#fff"></uni-icons>
              确认兑换
            </button>
          </view>
          
          <view class="modal-footer">
            <text class="help-text">遇到问题？</text>
            <text class="contact-link" @tap="contactCustomerService">
              联系客服
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { profileServices } from '@/services/profile'
import { onShow } from '@dcloudio/uni-app'

// 响应式数据
const userInfo = ref({
  memberName: '',
  crtTime: '',
  avatarImg: '',
  isVip: false,
  coursesAll: 0,
  housrsLearn: 0
})

const courses = ref([])
const showRedeemModal = ref(false)
const redeemCode = ref('')
const scrollHeight = ref(0)

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await profileServices.getUserInfo()
    
    // 处理创建时间
    const crtTime = res.crtTime || ''
    const crtYear = typeof crtTime === 'string' && crtTime.length >= 4 
      ? crtTime.substring(0, 4) 
      : '未知'
    
    userInfo.value = {
      memberName: res.memberName || '用户',
      crtTime: crtYear,
      avatarImg: res.avatarImg || '',
      isVip: res.isVip || false,
      coursesAll: res.coursesAll || 0,
      housrsLearn: res.housrsLearn || 0
    }
    
    uni.setStorageSync('userInfo', res)
  } catch (error) {
    console.error('用户信息请求失败:', error)
    uni.showToast({
      title: '获取用户信息失败',
      icon: 'none'
    })
  }
}

// 获取收藏列表
const fetchFavorites = async () => {
  try {
    const data = await profileServices.getFavoritesList({
      pageNo: 1,
      pageSize: 10
    })
    
    courses.value = (data.rows || []).map(item => ({
      resourceCode: item.resourceCode,
      title: item.title,
      shortDesc: item.desc ? item.desc.substring(0, 18) + '...' : '无描述',
      imageUrl: item.imageUrl,
      createTime: item.createTime
    }))
    
    console.log('收藏课程数据:', courses.value)
  } catch (error) {
    console.error('收藏列表请求失败:', error)
    uni.showToast({
      title: '获取收藏列表失败',
      icon: 'none'
    })
  }
}

// 初始化系统信息
const initSystemInfo = () => {
  try {
    const systemInfo = uni.getSystemInfoSync()
    const windowHeight = systemInfo.windowHeight
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const navBarHeight = 44 // 导航栏高度
    
    scrollHeight.value = windowHeight - statusBarHeight - navBarHeight - 400
  } catch (error) {
    console.error('获取系统信息失败:', error)
    uni.showToast({
      title: '系统信息加载失败',
      icon: 'none'
    })
  }
}

// 头像点击事件
const onAvatarTap = () => {
  const token = uni.getStorageSync('authToken')
  if (!token) {
    uni.navigateTo({ url: '/pages/login/login' })
    return
  }
  
  uni.navigateTo({
    url: '/pages/profile/edit'
  })
}

// 分享按钮点击
const onShareTap = () => {
  uni.showShareMenu({
    withShareTicket: true,
    success: () => {
      console.log('分享菜单已显示')
    },
    fail: (error) => {
      console.error('显示分享菜单失败:', error)
      uni.showToast({
        title: '无法显示分享菜单',
        icon: 'none'
      })
    }
  })
}

// 课程点击事件
const onCourseTap = (e) => {
  const id = e.currentTarget.dataset.id
  if (!id) {
    uni.showToast({
      title: '课程ID无效',
      icon: 'none'
    })
    return
  }
  
  uni.navigateTo({
    url: `/pages/course/detail?id=${id}`
  })
}

// 兑换中心按钮点击
const onRedeemButtonTap = () => {
  const token = uni.getStorageSync('authToken')
  if (!token) {
    uni.navigateTo({
      url: '/pages/login/login'
    })
  } else {
    toggleRedeemModal()
  }
}

// 切换兑换弹窗
const toggleRedeemModal = () => {
  showRedeemModal.value = !showRedeemModal.value
  if (!showRedeemModal.value) {
    redeemCode.value = ''
  }
}

// 激活码输入
const onRedeemInput = (e) => {
  redeemCode.value = e.detail.value
}

// 确认兑换
const confirmRedeem = async () => {
  if (!redeemCode.value) {
    uni.showToast({
      title: '请输入激活码',
      icon: 'none'
    })
    return
  }
  
  try {
    const res = await profileServices.activateCode({
      code: redeemCode.value
    })
    
    // 激活成功
    userInfo.value.isVip = true
    showRedeemModal.value = false
    redeemCode.value = ''
    
    uni.showToast({
      title: '激活成功',
      icon: 'success'
    })
    
    // 重新获取用户信息
    await fetchUserInfo()
  } catch (error) {
    console.error('激活码兑换失败:', error)
    uni.showToast({
      title: error.message || '激活失败',
      icon: 'none'
    })
  }
}

// 联系客服
const contactCustomerService = () => {
  uni.showToast({
    title: '正在联系客服...',
    icon: 'none'
  })
  // 这里可以添加联系客服的具体实现
}

// 格式化时间
const formatTime = (time) => {
  if (!time) return ''
  const date = new Date(time)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 分享配置
const onShareAppMessage = () => {
  return {
    title: `${userInfo.value.memberName || '用户'}的个人主页`,
    path: '/pages/profile/index',
    imageUrl: userInfo.value.avatarImg || '/static/default-avatar.png'
  }
}

const onShareTimeline = () => {
  return {
    title: `${userInfo.value.memberName || '用户'}的个人主页`,
    query: '',
    imageUrl: userInfo.value.avatarImg || '/static/default-avatar.png'
  }
}

// 生命周期
onMounted(() => {
  initSystemInfo()
  fetchUserInfo()
  fetchFavorites()
})


onShow(()=>{
   fetchUserInfo()
  fetchFavorites()
})

</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.03;
  background: var(--v-color-primary);
  
  &.bg-circle-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -150px;
    animation: float 8s ease-in-out infinite;
  }
  
  &.bg-circle-2 {
    width: 200px;
    height: 200px;
    bottom: 15%;
    left: -100px;
    animation: float 12s ease-in-out infinite reverse;
  }
  
  &.bg-circle-3 {
    width: 120px;
    height: 120px;
    top: 40%;
    right: 10px;
    animation: float 10s ease-in-out infinite;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(180deg); }
}

.profile-card {
  background: #ffffff;
  border-radius: 24px;
  margin: 20px;
  margin-top: 40px;
  padding: 32px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  border: 1px solid #f5f5f5;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.profile-avatar-container {
  position: relative;
  margin-right: 24px;
}

.profile-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 3px solid #f8f9fa;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
}

.vip-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255, 102, 9, 0.3);
  letter-spacing: 0.5px;
}

.profile-info {
  flex: 1;
}

.profile-name {
  display: block;
  font-size: 26px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}

.profile-joined {
  font-size: 14px;
  color: #8b8b8b;
  font-weight: 400;
}

.share-button {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.redeem-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(255, 102, 9, 0.08) 0%, rgba(255, 133, 51, 0.05) 100%);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 102, 9, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 102, 9, 0.02) 100%);
    pointer-events: none;
  }
}

.redeem-info {
  flex: 1;
}

.redeem-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
}

.redeem-desc {
  font-size: 13px;
  color: #6b6b6b;
  font-weight: 400;
  line-height: 1.4;
}

.redeem-button {
  background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  box-shadow: 0 4px 16px rgba(255, 102, 9, 0.25);
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 24px rgba(255, 102, 9, 0.35);
    
    &::before {
      opacity: 0.1;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
}

.stats-card {
  background: #ffffff;
  border-radius: 24px;
  margin: 20px;
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  border: 1px solid #f5f5f5;
}

.stat-item {
  text-align: center;
  flex: 1;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 3px;
    background: linear-gradient(90deg, var(--v-color-primary) 0%, #ff8533 100%);
    border-radius: 2px;
    opacity: 0.8;
  }
}

.stat-value {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 14px;
  color: #6b6b6b;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, #e9ecef, transparent);
  margin: 0 15px;
}

.favorites-section {
  background: #ffffff;
  border-radius: 24px;
  margin: 20px;
  padding: 28px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  border: 1px solid #f5f5f5;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f8f9fa;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.5px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
    border-radius: 2px;
  }
}

.section-more {
  font-size: 14px;
  color: var(--v-color-primary);
  font-weight: 500;
  padding: 8px 16px;
  background: rgba(255, 102, 9, 0.08);
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 102, 9, 0.12);
    transform: translateY(-1px);
  }
}

.favorites-scroll {
  max-height: 300px;
}

.course-card {
  background: #fafafa;
  border-radius: 16px;
  margin-bottom: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background: #ffffff;
    border-color: rgba(255, 102, 9, 0.15);
  }
}

.course-image-container {
  position: relative;
  margin-right: 20px;
}

.course-image {
  width: 90px;
  height: 68px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #e9ecef;
}

.course-tag {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(255, 102, 9, 0.3);
  letter-spacing: 0.3px;
}

.course-content {
  flex: 1;
}

.course-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 6px;
  letter-spacing: -0.2px;
}

.course-desc {
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 8px;
  line-height: 1.4;
}

.course-meta {
  display: flex;
  align-items: center;
}

.course-time {
  font-size: 12px;
  color: #9b9b9b;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #9b9b9b;
}

.empty-text {
  display: block;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #6b6b6b;
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(4px);
  animation: maskFadeIn 0.3s ease-out;
}

@keyframes maskFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.redeem-modal {
  background: white;
  border-radius: 20px;
  width: 350px;
  max-width: 90vw;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: modalSlideIn 0.3s ease-out;
  border: 1px solid #f0f0f0;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modal-header {
  background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  min-height: 100px;
}

.modal-header-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 3px;
  letter-spacing: 0.3px;
}

.modal-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 1.3;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.modal-content {
  padding: 24px;
  background: white;
}

.input-group {
  margin-bottom: 24px;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
}

.input-wrapper {
  position: relative;
}

.redeem-input {
  width: 100%;
  display: block;
  padding: 6px 16px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 99px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: #fafafa;
  font-weight: 400;
  
  &::placeholder {
    color: #999;
    font-weight: 400;
  }
  
  &:focus {
    border-color: var(--v-color-primary);
    outline: none;
    background: #ffffff;
    box-shadow: 0 0 0 2px rgba(255, 102, 9, 0.1);
  }
}

.input-border {
  display: none;
}

.modal-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.modal-btn {
  flex: 1;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  min-height: 28px;
  line-height:28px;
  position: relative;
  overflow: hidden;
  
  &.cancel-btn {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #555;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover {
      background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
      border-color: rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      background: linear-gradient(135deg, #dee2e6 0%, #ced4da 100%);
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    }
  }
  
  &.confirm-btn {
    background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
    color: white;
    border: 1px solid transparent;
    box-shadow: 0 2px 6px rgba(255, 102, 9, 0.25);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover {
      background: linear-gradient(135deg, #e55a08 0%, #e5752d 100%);
      transform: translateY(-1px);
      box-shadow: 0 3px 8px rgba(255, 102, 9, 0.35);
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      background: linear-gradient(135deg, #d14e07 0%, #d16829 100%);
      transform: translateY(0);
      box-shadow: 0 1px 4px rgba(255, 102, 9, 0.2);
    }
  }
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
  margin: 0 -24px -24px;
  padding: 16px 24px;
  border-radius: 0 0 20px 20px;
}

.help-text {
  font-size: 13px;
  color: #999;
  font-weight: 400;
}

.contact-link {
  font-size: 13px;
  color: var(--v-color-primary);
  font-weight: 500;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 16px;
  transition: all 0.2s ease;
  background: rgba(255, 102, 9, 0.08);
  
  &:hover {
    background: rgba(255, 102, 9, 0.12);
  }
  
  &:active {
    background: rgba(255, 102, 9, 0.15);
  }
}

/* 用户中心页面的默认头像样式 */
.default-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--v-color-primary) 0%, #ff8533 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(255, 102, 9, 0.25);
  letter-spacing: -1px;
}

</style>
