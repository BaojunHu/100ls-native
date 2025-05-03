export const copyText = (text?: string) => {
  if (!text) {
    return;
  }

  // #ifndef H5
  //uni.setClipboardData方法就是讲内容复制到粘贴板
  uni.setClipboardData({
    data: text, //要被复制的内容
    success: () => {
      //复制成功的回调函数
      void uni.showToast({ title: '复制成功' });
    },
  });
  // #endif

  // #ifdef H5
  void copyTextToClipboard(text);
  // #endif
};

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      void uni.showToast({ title: '复制成功' });
    } catch (err) {
      console.error('复制文本失败: ', err);
    }
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

// 备用实现，使用 document.execCommand
function fallbackCopyTextToClipboard(text: string) {
  // 创建一个临时的文本域
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // 避免移动端自动滚动到文本域
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';

  document.body.appendChild(textArea);

  // 选择文本域中的文本
  textArea.focus();
  textArea.select();

  try {
    // 执行复制命令
    const successful = document.execCommand('copy');
    const msg = successful ? '成功' : '失败';
    console.log('复制文本命令执行：' + msg);
  } catch (err) {
    console.error('无法复制文本：', err);
  }

  // 移除临时的文本域
  document.body.removeChild(textArea);
}
