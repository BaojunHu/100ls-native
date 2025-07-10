import { http } from "./index";
import type { UserInfo, FavoriteItem } from "../type/service";

export const profileServices = {
  // 获取用户信息
  getUserInfo: async () => {
    return await http.get<UserInfo>("/user/info");
  },
  
  // 获取收藏列表
  getFavoritesList: async (param: {
    pageNo: number;
    pageSize: number;
  }) => {
    return await http.post<{
      rows: FavoriteItem[];
      total: number;
    }>("/favorites/list", param);
  },
  
  // 激活会员码
  activateCode: async (param: {
    code: string;
  }) => {
    return await http.post<{
      code: string;
      message: string;
    }>("/member/activate", param);
  }
};
