// 预加载图片函数
export async function preloadImage(url?: string) {
  if (!url) return;
  // 使用uni.downloadFile进行预加载
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      success: (res) => {
        resolve(true);
      },
      fail: (err) => {
        // 失败也无需弹窗，仅做预加载
      },
    });
  });
}

/**传入列表递归预加载图片 */
export async function preloadImageList(list: string[]) {
  if (!list || !Array.isArray(list)) return;

  for (const url of list) {
    try {
      await preloadImage(url);
    } catch (error) {
      console.error(error);
    }
  }
}
