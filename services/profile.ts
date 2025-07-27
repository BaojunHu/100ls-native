import { http } from "./index";
import type { UserInfo, FavoriteItem } from "../type/service";

export const profileServices = {
  // 获取用户信息
  getUserInfo: async () => {
    return await http.post<UserInfo>("api/member/getInfo");
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
