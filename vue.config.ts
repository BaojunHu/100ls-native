import path = require("path");

export default {
  baseUrl: './',
  // devServer: {
  //   proxy: {
  //     "/proxy-api": {
  //       target: "https://100ls.com.cn", // 替换为你的后端API地址
  //       changeOrigin: true,
  //       // pathRewrite: {
  //       //   "^/proxy-api": "",
  //       // },
  //       rewrite: (path) => {
  //         console.log(`Rewriting path>>>>>>>>>>>>>>>>>>>>: ${path}`);
          
  //         return path.replace(/^\/proxy-api/, '');
  //       },
  //       // 打印日志
  //       logLevel: "debug",
  //       // onProxyRes: (proxyRes, req, res) => {
  //       //   // 打印日志
  //       //   console.log(
  //       //     `Proxying request>>>>>>>>>>>>>: ${req.method} ${req.url} -> ${proxyRes.statusCode}`
  //       //   );
  //       // }
  //     },
  //   },
  // },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"), // 设置路径别名
        "@components": path.resolve(__dirname, "src/components"), // 示例：添加更多别名
      },
    },
  },
};
