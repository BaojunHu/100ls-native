<template>
  <view class="content">
    <m-navbar>
      <m-icon type="icon-whole-arrows-left" size="40" color="var(--v-color-grey-9)" @click="navigateBack"></m-icon>
    </m-navbar>


    <image :src="logo" style="width: 420rpx;height: auto;margin: 60rpx auto;display: block;" mode="widthFix"></image>

    <view class="loginBox">
      <h3>登录</h3>
      <view class="inputBox">
        <view class="ipt">
          <!-- <uni-icons type="contact" size="24" color="var(--v-color-primary-7)"></uni-icons> -->
          <input type="text" v-model="loginForm.account" :maxlength="11" placeholder="请输入手机号" />
        </view>
        <view class="ipt">

          <view class="password-wrapper">
            <input class="uni-input" v-model="loginForm.password" placeholder="请输入密码" :password="!showPassword" />

            <uni-icons type="eye" size="24" :color="showPassword ? 'var(--v-color-primary-7)' : 'var(--v-color-grey-6)'"
              @click="changePassword"></uni-icons>

          </view>

        </view>
        <view class="forgetPwd">
          <span>忘记密码</span>
          <span @click="openRegister">没有账号，去注册</span>
        </view>
        <m-button class="login-button" block :handle-click="handleLogin">登录</m-button>
      </view>
      <view class="tipbox">
        <view class="txt">
          —— 其他账号登录 ——
        </view>
        <view class="otherUser" @click="openOtherLogin">
          <uni-icons type="qq" size="40" color="rgb(66,157,250)"></uni-icons>
          <uni-icons type="weixin" size="40" color="rgb(2,187,17)"></uni-icons>
        </view>
      </view>
    </view>

    <view class="tip">
      百听百说 @2025
    </view>
  </view>
  <uni-drawer ref="registerDrawerRef" mode="right" class="register-drawer">
    <Register @close="closeRegister"></Register>
  </uni-drawer>
  <m-modal />

</template>

<script lang="ts" setup>
//@ts-ignore
import logo from './logo-black.png'
import { memberServices } from '@/services/member';
import { useMRequest } from '@/tools/use-request';
import Register from './register.vue';
import { getCurrentInstance, ref } from 'vue';
import { navigateBack } from '@/router/main';
const loginForm = ref({
  account: '',
  password: '',
});
const showPassword = ref(false);
const changePassword = () => {
  showPassword.value = !showPassword.value;
  console.log('changePassword', showPassword.value);
};

const registerDrawerRef = ref(null);
const openRegister = () => {
  registerDrawerRef.value.open();
  console.log('openRegister', registerDrawerRef.value);
};
const closeRegister = () => {
  registerDrawerRef.value.close();
  console.log('closeRegister', registerDrawerRef.value);
};
const openOtherLogin = () => {
  uni.showToast({
    title: '暂未开放此功能，敬请期待',
    icon: 'none',
  });
};
const { runAsync: requestLogin, loading } = useMRequest(memberServices.login, {
  manual: true,
});

const { proxy } = getCurrentInstance()
const handleLogin = async () => {

  const loginFormValue = loginForm.value;


  if (!loginFormValue.account || !loginFormValue.password) {

    // proxy.$showModal({
    //   title: '提示',
    //   content: '请填写完整信息！',
    //   showCancel: false,
    // });

    uni.showToast({
      title: '请填写完整信息！',
      icon: 'none',
    });

    return;
  }



  const data = await requestLogin({
    loginType: 'paswd',
    account: loginFormValue.account,
    password: loginFormValue.password,
  });


  if (data?.authToken) {


    uni.showToast({
      title: '登录成功',
      icon: 'success',
    });

    uni.setStorageSync("authToken", data.authToken);

    setTimeout(() => {
      uni.navigateBack()
    }, 600);
  } else {

    uni.showToast({
      title: '出错了，请稍后再试',
      icon: 'none',
    });
  }


};


</script>

<style scoped>
::v-deep .register-drawer .uni-drawer--right {
  width: 100vw !important;
}

.content {
  height: 100vh;
  /* background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F10%2F20200510005139_JR8fL.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1714820289&t=e835cde99a094cbd98f9c318f25160ec") no-repeat;
		background-size: 100% 100%; */

  background: linear-gradient(to bottom, var(--v-color-primary-3), var(--v-color-primary-5), rgb(247, 120, 172));
  background-size: 200% 200%;
  animation: gradientFlow 8s ease infinite;
  height: 100vh;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 0%;
  }

  30% {
    background-position: 0% 60%;
  }

  50% {
    background-position: 0% 100%;
  }

  80% {
    background-position: 0% 30%;
  }

  100% {
    background-position: 0% 0%;
  }
}

.loginBox {
  width: 90%;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 60rpx;
  box-sizing: border-box;
  margin: 0 auto;
}

h3 {
  /* color: rgb(247, 120, 172); */
  color: var(--v-color-grey-9);
  font-size: 36rpx;
  letter-spacing: 10rpx;
  margin-bottom: 40rpx;
  padding-left: 12rpx;
}



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
  background-color: #f5f5f5;
  padding: 0;

}


.forgetPwd {
  font-size: 26rpx;
  color: #b5b5b5;
  text-align: end;
  padding: 0 10rpx;
  display: flex;
  justify-content: space-between;
}

.login-button {
  margin-top: 20rpx;
  line-height: 85rpx;
  text-align: center;
  background: linear-gradient(to right, var(--v-color-primary-5), var(--v-color-primary-6));
  border-radius: 40rpx;
  color: #fff;
  margin-top: 40rpx;
  border: none;
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

.password-wrapper {
  flex: 1 1 100%;
  padding-right: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .uni-icon {
    color: var(--v-color-grey-6);
  }

  .uni-eye-active {
    color: var(--v-color-grey-8);
  }
}
</style>