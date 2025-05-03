/** 判断是否是图片  */
export const jugdePictrue = (type: string): boolean => {
  const reg = ['image', 'IMAGE', 'bmp', 'jpg', 'png', 'gif', 'jpeg'];
  return reg.some((item) => type.toLocaleLowerCase().includes(item));
};
/** 判断是否是视频  */
export const jugdeVideo = (type: string): boolean => {
  const reg = ['video', 'VIDEO', 'mp4', 'avi', 'wmv', '3gp', 'flv'];
  return reg.some((item) => type.toLocaleLowerCase().includes(item));
};

export const jugdePdf = (type: string): boolean => {
  const reg = ['pdf', 'PDF'];
  return reg.some((item) => type.includes(item));
};
