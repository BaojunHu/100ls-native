// 综合判断方案
export function getEnvironment() {
  // 1. 优先使用条件编译
  // #ifdef APP-PLUS && DEBUG
  return "debug";
  // #endif

  // 2. 次选环境变量
  if (process.env.NODE_ENV === "development") {
    return "development";
  }

  // 3. 兜底判断
  try {
    const systemInfo = uni.getSystemInfoSync();
    if (systemInfo.platform === "devtools") {
      return "debug";
    }
  } catch (e) {}

  return "production";
}
