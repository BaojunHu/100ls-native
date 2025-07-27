import { sleep } from "@flatbiz/utils";
import { http } from "./index";

// 单词接口类型定义
export interface WordItem {
  id: number; // 从mock数据看应该是number类型
  word: string;
  phonetic: string;
  meaning: string;
  meaningList: {
    pos: string;
    tran: string;
  }[];
  status: "0" | "1"; // 0-未掌握, 1-已掌握
  audio?: string;
  // 以下是mock数据中的额外字段
  creator?: string; // 创建者
  operator?: string; // 操作者
  deleted?: boolean; // 是否删除
  crtTime?: string; // 创建时间
  uptTime?: string; // 更新时间
  memberNo?: string; // 会员编号
}

export interface WordListResponse {
  rows: WordItem[];
  total: number;
}

export interface WordListParams {
  pageNo: number;
  pageSize: number;
  status?: "0" | "1";
}

export interface WordStatusParams {
  id: number;
  word: string;
  pageSize: number;
  status: "0" | "1";
}

export const wordServices = {
  // 获取单词列表
  getWordList: async (params: WordListParams) => {
    const response = await http.post<WordListResponse>("api/word/list", params);
    // 处理返回的数据，确保 meaning 是数组格式
    const processedRows = response.rows.map((item) => {
      let meaningList: WordItem["meaningList"] = [];
      try {
        meaningList = item.meaning ? JSON.parse(item.meaning as any) : [];
        if (!Array.isArray(meaningList)) {
          meaningList = [{ pos: "", tran: item.meaning as any }];
        }
      } catch (e) {
        meaningList = [{ pos: "", tran: (item.meaning as any) || "" }];
      }

      // 生成有道词典音频链接作为备用
      const youdaoAudioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(
        item.word
      )}&type=2`; // type=2为美音，type=0为英音

      return {
        ...item,
        meaningList,
        status: item.status || "0",
        // 如果原有audio为空，则使用有道词典的音频链接作为备用
        audio: item.audio || youdaoAudioUrl,
      };
    });
    return {
      ...response,
      rows: processedRows,
    } as WordListResponse;
  },

  // 设置单词状态
  setWordStatus: async (params: WordStatusParams) => {
    // 模拟操作延迟
    // await sleep(500);

    // // 使用mock数据 (开发时可以取消注释使用mock数据)
    // return createWordStatusResponse();

    // 真实API调用 (生产环境使用)
    return await http.post("api/word/setStatus", params);
  },

  // 保存单词
  saveWord: async (params: { word: string }) => {
    // 模拟操作延迟
    // await sleep(300);

    // // 使用mock数据 (开发时可以取消注释使用mock数据)
    // return createSaveWordResponse();

    // 真实API调用 (生产环境使用)
    return await http.post("api/word/save", params);
  },
};
