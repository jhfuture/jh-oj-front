<template>
  <div id="userRegisterView">
    <!-- 背景图片轮播 -->
    <div class="slidershow">
      <div
        v-for="(image, index) in backgroundImages"
        :key="index"
        class="slidershow--image"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>

    <!-- 注册表单 -->
    <a-form
      style="max-width: 480px; margin: 130px auto; padding-top: 120px"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userAccount"
        style="font: 100 22px 'font'"
        label="账号"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        tooltip="密码不少于 8 位"
        style="font: 100 22px 'font'"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="userPasswordConfirm"
        tooltip="请再次输入密码"
        style="font: 100 22px 'font'"
        label="确认密码"
      >
        <a-input-password
          v-model="form.userPasswordConfirm"
          placeholder="请确认密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          class="btn-login"
          html-type="submit"
          style="width: 120px"
        >
          注册
        </a-button>
        <span style="color: white; margin-left: 54px">已有账号？</span>
        <a-button
          type="text"
          class="btn-login"
          style="color: white; margin-left: 10px; width: 140px"
          @click="goToLogin"
          >去登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { UserControllerService } from "../../../generated";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  userPasswordConfirm: "",
});

const router = useRouter();

/**
 * 提交表单
 */
const handleSubmit = async () => {
  // 验证用户名长度
  if (form.userAccount.length < 4) {
    message.error("用户账号过短");
    return;
  }

  // 验证密码长度
  if (form.userPassword.length < 8 || form.userPasswordConfirm.length < 8) {
    message.error("密码长度不能少于8位");
    return;
  }

  // 验证两次密码是否一致
  if (form.userPassword !== form.userPasswordConfirm) {
    message.error("两次输入的密码不一致");
    return;
  }

  try {
    await UserControllerService.userRegisterUsingPost({
      userAccount: form.userAccount,
      userPassword: form.userPassword,
      checkPassword: form.userPasswordConfirm, // 确保包含 checkPassword 字段
    });
    // 如果没有抛出异常，说明注册成功
    message.success("注册成功，请登录");
    router.push({
      path: "/login",
      replace: true,
    });
  } catch (error) {
    console.error("注册请求失败:", error);
    message.error("注册失败，请稍后再试");
  }
};

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push("/login");
};

const backgroundImages = [
  "/login/login1.jpg",
  "/login/login2.jpg",
  "/login/login3.jpg",
  "/login/login4.jpg",
  // "/login/login5.jpg",
];
</script>

<style scoped>
.slidershow {
  margin-top: -145px;
  position: absolute;
  width: 100vw;
  height: 90vh;
  overflow: hidden;
  z-index: -1;
}

.slidershow--image {
  position: absolute;
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50%;
  background-size: cover;
  -webkit-animation-name: kenburns;
  animation-name: kenburns;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-duration: 16s;
  animation-duration: 16s;
  opacity: 1;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

.slidershow--image:nth-child(1) {
  -webkit-animation-name: kenburns-1;
  animation-name: kenburns-1;
  z-index: 3;
}

.slidershow--image:nth-child(2) {
  -webkit-animation-name: kenburns-2;
  animation-name: kenburns-2;
  z-index: 2;
}

.slidershow--image:nth-child(3) {
  -webkit-animation-name: kenburns-3;
  animation-name: kenburns-3;
  z-index: 1;
}

.slidershow--image:nth-child(4) {
  -webkit-animation-name: kenburns-4;
  animation-name: kenburns-4;
  z-index: 0;
}

@-webkit-keyframes kenburns-1 {
  0% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  1.5625% {
    opacity: 1;
  }
  23.4375% {
    opacity: 1;
  }
  26.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  98.4375% {
    opacity: 0;
    -webkit-transform: scale(1.21176);
    transform: scale(1.21176);
  }
  100% {
    opacity: 1;
  }
}

@keyframes kenburns-1 {
  0% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  1.5625% {
    opacity: 1;
  }
  23.4375% {
    opacity: 1;
  }
  26.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  98.4375% {
    opacity: 0;
    -webkit-transform: scale(1.21176);
    transform: scale(1.21176);
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes kenburns-2 {
  23.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  26.5625% {
    opacity: 1;
  }
  48.4375% {
    opacity: 1;
  }
  51.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@keyframes kenburns-2 {
  23.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  26.5625% {
    opacity: 1;
  }
  48.4375% {
    opacity: 1;
  }
  51.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@-webkit-keyframes kenburns-3 {
  48.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  51.5625% {
    opacity: 1;
  }
  73.4375% {
    opacity: 1;
  }
  76.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@keyframes kenburns-3 {
  48.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  51.5625% {
    opacity: 1;
  }
  73.4375% {
    opacity: 1;
  }
  76.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@-webkit-keyframes kenburns-4 {
  73.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  76.5625% {
    opacity: 1;
  }
  98.4375% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes kenburns-4 {
  73.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  76.5625% {
    opacity: 1;
  }
  98.4375% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@font-face {
  font-family: "font";
  src: url("/public/优设标题黑_猫啃网.ttf");
}

.btn-login {
  background-image: linear-gradient(
    to right,
    #3a7bd5 0%,
    #3a6073 51%,
    #3a7bd5 100%
  );
}
.btn-login {
  margin: 0px;
  padding: 4px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 5px;
  display: block;
}

.btn-login:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

/* .slidershow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; 
} */

/* .slidershow--image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: fadeSlide 6s infinite;
}

.slidershow--image:nth-child(1) {
  animation-delay: 0s;
}
.slidershow--image:nth-child(2) {
  animation-delay: 6s;
}
.slidershow--image:nth-child(3) {
  animation-delay: 12s;
}
.slidershow--image:nth-child(4) {
  animation-delay: 18s;
}
.slidershow--image:nth-child(5) {
  animation-delay: 24s;
}

@keyframes fadeSlide {
  0% {
    opacity: 1;
  }
  16.67% {
    opacity: 1;
  }
  33.33% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
} */
</style>
