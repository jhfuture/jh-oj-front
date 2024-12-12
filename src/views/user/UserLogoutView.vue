<template>
  <div>
    <h1>退出登录</h1>
    <button @click="logout">确认退出</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // 调用 Vuex 中的 logout action
      this.$store.dispatch("logout").then(() => {
        // 重定向到登录页面
        this.$router.push("/login");
      });
    },
  },
};
</script>
