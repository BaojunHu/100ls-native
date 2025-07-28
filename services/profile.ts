import { http } from "./index";
import type { UserInfo, FavoriteItem } from "../type/service";
import { sleep } from "@flatbiz/utils";

export const profileServices = {
  // 获取用户信息
  getUserInfo: async () => {
    return await http.post<UserInfo>("api/member/getInfo");

    // await sleep(200);

    // return {
    //   memberName: "张三",
    //   crtTime: "2021-01-01",
    //   avatarImg: "https://example.com/avatar.jpg",
    //   isVip: 1,
    //   coursesAll: 10,
    //   housrsLearn: 100,
    //   englishName: "张三",
    //   vipExpiry: "2021-01-01",
    // };
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
    // await sleep(1000);
    // return {
    //   code: "123456",
    //   message: "激活成功",
    // };

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
