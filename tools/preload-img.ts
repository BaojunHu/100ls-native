// 预加载图片函数
export async function preloadImage(url?: string) {
  if (!url) return;
  // 使用uni.downloadFile进行预加载
  console.log("预加载图片开始>>>>>: ", url);
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      success: (res) => {
        console.log(`预加载图片成功>>>>>: ${url}`);
        resolve(true);
      },
      fail: (err) => {
        // 失败也无需弹窗，仅做预加载
        reject(`预加载图片失败>>>>>: ${url}, 错误信息: ${err}`);
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
