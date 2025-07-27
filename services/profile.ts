import { http } from "./index";
import type { UserInfo, FavoriteItem } from "../type/service";

export const profileServices = {
  // 获取用户信息
  getUserInfo: async () => {
    const a = await http.post<UserInfo>("api/member/getInfo");

    return {
      memberName: "15570155773",
      crtTime: "2025-01-24 15:44",
      vipExpiry: "2025-07-31",
      englishName: null,
      avatarImg: null,
      isVip: 1,
      coursesAll: 1,
      housrsLearn: 183,
    };
  },
  saveWord: async (param: { word: string }) => {
    return await http.post("api/word/save", param);
  },

  // 获取收藏列表
  getFavoritesList: async (param: { pageNo: number; pageSize: number }) => {
    return await http.post<{
      rows: FavoriteItem[];
      total: number;
    }>("api/favorites/list", param);
  },

  // 激活会员码
  activateCode: async (param: { code: string }) => {
    return await http.post<{
      code: string;
      message: string;
    }>("api/member/activate", param);
  },

  // 激活VIP会员
  activateVip: async (param: { code: string }) => {
    return await http.post<{
      code: string;
      message: string;
    }>("api/member/activate", param);
  },
};
