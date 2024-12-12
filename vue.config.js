const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.163.128:8101/api", // 您的后端服务地址
        changeOrigin: true, // 必须设置为true，才能避免cors issues
        pathRewrite: {
          "^/api": "", // 重写路径，去掉路径中的/api
        },
      },
    },
  },
});
