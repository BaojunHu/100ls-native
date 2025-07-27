import type {  UserInfo } from '@/type/service';

export const USER_INFO_KEY = '__lanhai_user_info__';

export function getUserInfo(): UserInfo {
  try {
    const data = uni.getStorageSync(USER_INFO_KEY) as string;
    return JSON.parse(data || '{}') as UserInfo;
  } catch {
    return {} as UserInfo;
  }
}

export function setUserInfo(userInfo: UserInfo) {
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

 const  AutoTokenKey = 'authToken';

export function getAuthToken(): string {
  return uni.getStorageSync(AutoTokenKey) || "";
}
export function setAuthToken(token: string) {
  uni.setStorageSync(AutoTokenKey, token);
}
export function removeAuthToken() {
  uni.removeStorageSync(AutoTokenKey);
}