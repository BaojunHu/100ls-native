import { sleep } from "@flatbiz/utils";
import { http } from "./index";
import { createFollowSentenceList, createHomeCoreData, createHomeHistoryData, createHomeLessonListData } from "./mock";

export const homeServices = {
  homeCore: async () => {
    // await sleep(200);

    // return createHomeCoreData();

    return await http.post<HomeData>("/home/core");
  },
  history: async (param: {
    // categoryNo: string;
    pageNo: number;
    pageSize: number;
  }) => {
    // await sleep(200);
    // return createHomeHistoryData();
    return await http.post<HomeHistoryResponse>("/home/history", param);
  },
  videoList: async (param: {
    catalogueNo: string;
    categoryNo:string;
    pageNo: number;
    pageSize: number;
  }) => {
    // await sleep(200);
    // return createHomeHistoryData();
    return await http.post<HomeHistoryResponse>("/video/list", param);
  },
  lessonList: async (param: {
    categoryNo: string;
    pageNo: number;
    pageSize: number;
  }) => {
    // await sleep(200);
    // return createHomeLessonListData() as {
    //   rows: LessonListResponse[];
    //   total: number;
    // }
    return await http.post<{
      rows: LessonListResponse[];
      total: number;
    }>("/lesson/list", param);
  },
  followSentenceList : async (param: {
    pageNo: number;
    pageSize: number;
  }) => {
    // await sleep(200);
    // return  createFollowSentenceList() as unknown as {
    //   rows: FollowSentenceRows[];
    //   total: number;
    // }

    return await http.post<{
      rows: FollowSentenceRows[];
      total: number;
    }>("/followSentence/list", param);
  }
};

export interface HomeData {
  /** 轮播图列表 */
  banners: THomeBannerItem[];
  /** 分类列表 */
  categories: Category[];
  /** 目录列表 */
  catalogues: Catalogue[];
}

export interface THomeBannerItem {
  /** 排序号 */
  sortNo: number;
  /** 资源编码 */
  resourceCode: string;
  /** 标题 */
  title: string;
  /** 封面图片 */
  coverImage: string;
  /** 链接地址 */
  link: string;
  /** 链接类型 */
  linkType: string;

  subtitles :TSubtitle[]
}

export interface Category {
  /** 分类编号 */
  categoryNo: string;
  /** 分类名称 */
  categoryName: string;
  /** 图标地址 */
  icon: string;
  /** 排序号 */
  sortNo: number;
}

export interface Catalogue {
  /** 目录编号 */
  catalogueNo: string;
  /** 目录名称 */
  catalogueName: string;
  /** 图标地址 */
  icon: string;
  /** 排序号 */
  sortNo: number;
}

export interface HomeHistoryResponse {
  rows: HomeHistoryRow[];
  total: number;
}

export interface HomeHistoryRow {
  /** 资源编码 */
  resourceCode: string;
  /** 排序号 */
  sortNo: number;
  /** 标题 */
  title: string;
  /** 链接地址 */
  link: string;
  /** 链接类型 */
  linkType: "VIDEO" | "ARTICLE" | "EXTERNAL";
  /** 封面图片 */
  coverImage: string;
  /** 集数 */
  episodeCount: number;
  /** 是否正在学习 */
  currLearning: boolean;
  /** 当前学习索引 */
  currLearningIndex: number;
  /** 支持的语言 */
  languages: string[];
  subtitles :TSubtitle[]
}

export type TSubtitle = {
  /** 语言 */
  language: string;
  /** 字幕地址 */
  subtitleLink: string;
}

export interface LessonListResponse {
  /** 分类编号 */
  categoryNo: string;
  /** 分类名称 */
  categoryName: string;
  /** 资源编码 */
  resourceCode: string;
  /** 排序号 */
  sortNo: number;
  /** 标题 */
  title: string;
  /** 链接地址 */
  link: string;
  /** 链接类型 */
  linkType: "VIDEO" | "ARTICLE" | "EXTERNAL";
  /** 封面图片 */
  coverImage: string;
  /** 作者头像 */
  authorIcon: string;
  /** 作者名称 */
  author: string;
  /** 描述 */
  description: string;
  /** 学习人数 */
  learnNumber: number;

  subtitles :TSubtitle[]
}

export interface FollowSentenceRows {
  /** 资源编码 */
  resourceCode: string;
  /** 英文标题 */
  titleEN: string;
  /** 中文标题 */
  titleCN: string;
  /** 链接地址 */
  link: string;
  /** 封面图片 */
  coverImage: string;
  /** 学习人数 */
  learnNumber: number;
  /** 标签列表 */
  tags: string[];
}

