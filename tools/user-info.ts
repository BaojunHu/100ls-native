import type { TGetUsesrInfoRes } from '@/type/service';

export const USER_INFO_KEY = '__lanhai_user_info__';

export function getUserInfo(): TGetUsesrInfoRes {
  try {
    const data = uni.getStorageSync(USER_INFO_KEY) as string;
    return JSON.parse(data || '{}') as TGetUsesrInfoRes;
  } catch {
    return {} as TGetUsesrInfoRes;
  }
}

export function setUserInfo(userInfo: TGetUsesrInfoRes) {
  try {
    const data = JSON.stringify(userInfo);
    uni.setStorageSync(USER_INFO_KEY, data);
  } catch (e) {
    console.error(e);
  }
}
export function removeUserInfo() {
  uni.removeStorageSync(USER_INFO_KEY);
}
