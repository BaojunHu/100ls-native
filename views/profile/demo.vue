<template>
  <view class="demo-container">
    <view class="demo-header">
      <text class="demo-title">用户中心演示</text>
      <text class="demo-desc">展示uniapp + Vue3 用户中心功能</text>
    </view>
    
    <view class="demo-features">
      <view class="feature-card" @tap="navigateToProfile">
        <uni-icons type="person" size="30" color="#4facfe"></uni-icons>
        <text class="feature-title">个人中心</text>
        <text class="feature-desc">查看个人信息、收藏课程</text>
      </view>
      
      <view class="feature-card" @tap="navigateToEdit">
        <uni-icons type="compose" size="30" color="#ff6b6b"></uni-icons>
        <text class="feature-title">编辑资料</text>
        <text class="feature-desc">修改头像、昵称等信息</text>
      </view>
      
      <view class="feature-card" @tap="showMockData">
        <uni-icons type="list" size="30" color="#ffa726"></uni-icons>
        <text class="feature-title">模拟数据</text>
        <text class="feature-desc">查看测试数据</text>
      </view>
    </view>
    
    <view class="demo-info">
      <text class="info-title">功能特点</text>
      <view class="info-list">
        <text class="info-item">• 响应式设计，适配各种屏幕</text>
        <text class="info-item">• 清新立体的UI设计</text>
        <text class="info-item">• Vue3 Composition API</text>
        <text class="info-item">• 类型安全的TypeScript</text>
        <text class="info-item">• 模块化的服务架构</text>
        <text class="info-item">• 优雅的动画效果</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const navigateToProfile = () => {
  uni.navigateTo({
    url: '/pages/profile/index'
  })
}

const navigateToEdit = () => {
  uni.navigateTo({
    url: '/pages/profile/edit'
  })
}

const showMockData = () => {
  uni.showModal({
    title: '模拟数据',
    content: `用户名: 测试用户\n加入时间: 2024\n课程数: 12\n学习天数: 156\n收藏数: 8`,
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
.demo-container {
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
}

.demo-title {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.demo-desc {
  font-size: 16px;
  color: #666;
}

.demo-features {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.feature-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.feature-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.demo-info {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.info-title {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
