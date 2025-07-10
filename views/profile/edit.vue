<template>
  <view class="edit-profile-page">
    <view class="header">
      <view class="avatar-section">
        <image 
          class="avatar" 
          :src="userInfo.avatarImg || '/static/default-avatar.png'" 
          mode="aspectFill"
          @tap="chooseAvatar"
        />
        <view class="avatar-overlay">
          <uni-icons type="camera" size="24" color="#fff"></uni-icons>
        </view>
      </view>
    </view>
    
    <view class="form-section">
      <view class="form-item">
        <text class="label">昵称</text>
        <input 
          class="input"
          v-model="userInfo.memberName"
          placeholder="请输入昵称"
        />
      </view>
      
      <view class="form-item">
        <text class="label">英文名</text>
        <input 
          class="input"
          v-model="userInfo.englishName"
          placeholder="请输入英文名"
        />
      </view>
      
      <view class="form-item">
        <text class="label">VIP状态</text>
        <view class="vip-status">
          <text class="vip-text" :class="{ active: userInfo.isVip }">
            {{ userInfo.isVip ? 'VIP会员' : '普通用户' }}
          </text>
        </view>
      </view>
      
      <view class="form-item">
        <text class="label">加入时间</text>
        <text class="readonly-text">{{ userInfo.crtTime }}</text>
      </view>
    </view>
    
    <view class="button-section">
      <button class="save-btn" @tap="saveProfile">
        保存修改
      </button>
      <button class="cancel-btn" @tap="goBack">
        取消
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { homeServices } from '@/services/home'

const userInfo = ref({
  memberName: '',
  englishName: '',
  avatarImg: '',
  isVip: false,
  crtTime: ''
})

const loadUserInfo = async () => {
  try {
    const token = uni.getStorageSync('authToken')
    if (!token) {
      uni.navigateTo({ url: '/pages/login/index' })
      return
    }
    
    const res = await homeServices.getUserInfo(token)
    userInfo.value = {
      memberName: res.memberName,
      englishName: res.englishName || '',
      avatarImg: res.avatarImg,
      isVip: res.isVip,
      crtTime: res.crtTime
    }
  } catch (error) {
    console.error('加载用户信息失败:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  }
}

const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths
      if (tempFilePaths.length > 0) {
        userInfo.value.avatarImg = tempFilePaths[0]
        // 这里可以上传到服务器
        uploadAvatar(tempFilePaths[0])
      }
    },
    fail: (error) => {
      console.error('选择头像失败:', error)
    }
  })
}

const uploadAvatar = (filePath) => {
  // 实际项目中需要上传到服务器
  console.log('上传头像:', filePath)
  uni.showToast({
    title: '头像上传成功',
    icon: 'success'
  })
}

const saveProfile = async () => {
  try {
    // 实际项目中需要调用更新用户信息的API
    console.log('保存用户信息:', userInfo.value)
    
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  } catch (error) {
    console.error('保存失败:', error)
    uni.showToast({
      title: '保存失败',
      icon: 'none'
    })
  }
}

const goBack = () => {
  uni.navigateBack()
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style lang="scss" scoped>
.edit-profile-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 0 40px;
  text-align: center;
}

.avatar-section {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.avatar-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

.form-section {
  background: white;
  margin: 20px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.label {
  width: 80px;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  background: #f9f9f9;
  
  &:focus {
    border-color: #4facfe;
    background: white;
  }
}

.vip-status {
  flex: 1;
}

.vip-text {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  background: #f0f0f0;
  color: #666;
  
  &.active {
    background: linear-gradient(45deg, #ff6b6b, #ffa726);
    color: white;
  }
}

.readonly-text {
  flex: 1;
  color: #666;
  font-size: 16px;
}

.button-section {
  padding: 20px;
  display: flex;
  gap: 15px;
}

.save-btn {
  flex: 1;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
  }
}

.cancel-btn {
  flex: 1;
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background: #e0e0e0;
  }
}
</style>
