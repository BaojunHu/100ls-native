<template>
  <view class="content">
     <m-navbar>
      <m-icon type="icon-whole-arrows-left" size="40" color="var(--v-color-grey-9)" @click="backLogin"></m-icon>
    </m-navbar>
    <view class="registerBox">
      <h3>注册</h3>
      <view class="inputBox">
        <view class="ipt">
          <uni-icons type="contact" size="24" color="var(--v-color-primary-7)"></uni-icons>
          <input v-model="username" type="text" :maxlength="11" placeholder="请输入手机号" />
        </view>
        <view class="ipt">
          <uni-icons type="eye" size="24" color="var(--v-color-primary-7)"></uni-icons>
          <input v-model="password" type="password" placeholder="请输入密码" />
        </view>
        <view class="ipt">
          <uni-icons type="eye" size="24" color="var(--v-color-primary-7)"></uni-icons>
          <input v-model="confirmPassword" type="password" placeholder="请再次输入密码" />
        </view>
        <!-- <view class="ipt">
          <uni-icons type="email" size="24" color="var(--v-color-primary-7)"></uni-icons>
          <input v-model="email" type="email" placeholder="请输入邮箱" />
        </view> -->
        <button @click="register">注册</button>
      </view>
      <view class="tip">
        已有账号？<span @click="backLogin">去登录</span>
      </view>
      <m-modal />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { memberServices } from "@/services/member";
import { useMRequest } from "@/tools/use-request";
import { getCurrentInstance, ref } from "vue";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");

const emit = defineEmits(["close"]);

const backLogin = () => {
  emit("close");
  console.log("backLogin", emit);
};

const { data, runAsync: requestRegister } = useMRequest(memberServices.register, {
  manual: true,
});
const {proxy} = getCurrentInstance();

const register = async () => {
  if (!username.value || !password.value || !confirmPassword.value) {

    uni.showToast({
      title: "提示",
      content: "请填写完整信息！",
      showCancel: false,
    });

    return;
  }

  if (password.value !== confirmPassword.value) {
    uni.showModal({
      title: "提示",
      content: "两次输入的密码不一致！",
      showCancel: false,
    });
    return;
  }

  await requestRegister({
    account: username.value,
    password: password.value,
  });

  if (data.value) {

    uni.showModal({
      title: "提示",
      content: "注册成功，请登录！",
      showCancel: false,
    });



    setTimeout(() => {
      backLogin();
    }, 1000);
  } else {
    proxy.$showModal({
      title: "提示",
      content: "注册成功，请登录！",
      showCancel: false,
    });

  }


};


</script>

<style scoped>
.content {
  height: 100vh;
  background: linear-gradient(to bottom, #FFF4E6, #FFB38A, #FFE0CC);
  background-size: 200% 200%;
  animation: gradientFlow 8s ease infinite;
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

.registerBox {
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
  color: #b5b5b5;
  margin-top: 20rpx;
}

.tip span {
  color: rgb(247, 120, 172);
  cursor: pointer;
}
</style>