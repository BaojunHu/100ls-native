<template>
  <view class="content">
    <m-navbar ></m-navbar>
    <view class="loginBox">
      <h3>登录</h3>
      <view class="inputBox">
        <view class="ipt">
          <uni-icons type="contact" size="24" color="var(--v-color-primary-7)"></uni-icons>
          <input type="text" value="" placeholder="请输入账号" />
        </view>
        <view class="ipt">
          <uni-icons type="eye" size="24" color="var(--v-color-primary-7)"></uni-icons>
          <input type="passsword" value="" placeholder="请输入密码" />
        </view>
        <view class="forgetPwd">
          <span>忘记密码</span>
          <span @click="openRegister">没有账号，去注册</span>
        </view>
        <button>登录</button>
      </view>
      <view class="tipbox">
        <view class="txt">
          —— 其他账号登录 ——
        </view>
        <view class="otherUser">
          <uni-icons type="qq" size="40" color="rgb(66,157,250)"></uni-icons>
          <uni-icons type="weixin" size="40" color="rgb(2,187,17)"></uni-icons>
        </view>
      </view>
    </view>

    <view class="tip">
      某某应用 2024
    </view>
  </view>
  <uni-drawer ref="registerDrawerRef" mode="right" class="register-drawer" >
      <Register @close="closeRegister"></Register>
  </uni-drawer>
  
</template>

<script lang="ts" setup>
import Register from './register.vue';
import { ref } from 'vue';

const registerDrawerRef = ref(null);
const openRegister = () => {
  registerDrawerRef.value.open();
  console.log('openRegister', registerDrawerRef.value);
};
const closeRegister = () => {
  registerDrawerRef.value.close();
  console.log('closeRegister', registerDrawerRef.value);
};


</script>

<style scoped>

::v-deep .register-drawer .uni-drawer--right{
  width: 100vw!important;
}

.content {
  height: 100vh;
  /* background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F10%2F20200510005139_JR8fL.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1714820289&t=e835cde99a094cbd98f9c318f25160ec") no-repeat;
		background-size: 100% 100%; */

  background: linear-gradient(to bottom,
      #FFF4E6, #FFB38A, #FFE0CC);
  background-size: 200% 200%;
  animation: gradientFlow 8s ease infinite;
  height: 100vh;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 0% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}

.loginBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 90%;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 60rpx;
  box-sizing: border-box;
}

h3 {
  color: rgb(247, 120, 172);
  font-size: 40rpx;
  letter-spacing: 10rpx;
  margin-bottom: 40rpx;
}

.inputBox {}

.ipt {
  height: 86rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  padding-left: 10rpx;
}

.ipt input {
  margin-left: 20rpx;
  font-size: 28rpx;
}

.ipt input {
  margin-left: 20rpx;
}

.forgetPwd {
  font-size: 26rpx;
  color: #b5b5b5;
  text-align: end;
  padding: 0 10rpx;
  display: flex;
  justify-content: space-between;
}

button {
  margin-top: 20rpx;
  line-height: 85rpx;
  text-align: center;
  background: linear-gradient(to right, rgb(255, 170, 127), rgb(247, 120, 172));
  border-radius: 40rpx;
  color: #fff;
  margin-top: 40rpx;
}

.tip {
  text-align: center;
  font-size: 28rpx;
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f4f4f4;
}

.tipbox {
  text-align: center;
  margin-top: 100rpx;
}

.otherUser {
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
}

.txt {
  font-size: 28rpx;
  color: #cbcbcb;
}

.otherUser .uni-icons {
  margin-left: 20rpx;
}
</style>