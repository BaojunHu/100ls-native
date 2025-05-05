import Mock from "mockjs";

export const createHomeCoreData = () => {
  return {
    banners: Mock.mock({
      "banners|3-5": [
        {
          sortNo: "@integer(1, 10)",
          resourceCode: "@string('upper', 8)",
          title: "@ctitle(5, 10)",
          // 随机颜色
          coverImage: `@image`,
          link: "@url",
          linkType: "@pick(['internal', 'external'])",
        },
      ],
    }).banners,
    categories: Mock.mock({
      "categories|5-10": [
        {
          categoryNo: "@string('number', 6)",
          categoryName: "@ctitle(3, 5)",
          icon: "@image('50x50', '#FFCC33', 'Icon')",
          sortNo: "@integer(1, 10)",
        },
      ],
    }).categories,
    catalogues: Mock.mock({
      "catalogues|5-10": [
        {
          catalogueNo: "@string('number', 6)",
          catalogueName: "@ctitle(3, 5)",
          icon: "@image('50x50', '#FFCC33', 'Icon')",
          sortNo: "@integer(1, 10)",
        },
      ],
    }).catalogues,
  };
};

export const createHomeHistoryData = () => {
  return {
    rows: Mock.mock({
      "rows|4-5": [
        {
          resourceCode: "@string('upper', 10)",
          sortNo: "@integer(1, 100)",
          title: "@ctitle(5, 15)",
          link: "@url",
          linkType: "@pick(['VIDEO', 'ARTICLE', 'EXTERNAL'])",
          coverImage: `@image`,
          episodeCount: "@integer(1, 20)",
          currLearning: "@boolean",
          currLearningIndex: "@integer(1, 10)",
          languages: ["English", "Chinese"],
        },
      ],
    }).rows,
    total: "@integer(10, 50)",
  };
};

export const createHomeLessonListData = () => {
  return {
    rows: Mock.mock({
      "rows|4-5": [
        {
          categoryNo: "@string('number', 6)",
          categoryName: "@ctitle(3, 5)",
          resourceCode: "@string('upper', 10)",
          sortNo: "@integer(1, 100)",
          title: "@ctitle(5, 15)",
          link: "@url",
          linkType: "@pick(['VIDEO', 'ARTICLE', 'EXTERNAL'])",
          coverImage: `@image`,
          authorIcon: `@image`,
          author: "@ctitle(3, 5)",
          description: "@ctitle(10, 20)",
          learnNumber: "@integer(1, 100)",
        },
      ],
    }).rows,
    total: Mock.mock({
      "total|10-50": 1,
    }).total,
  };
};


export const createFollowSentenceList = () => {
  return {
    rows: Mock.mock({
      "rows|9-15": [
        {
          resourceCode: "@string('upper', 10)",
          titleEN: "@ctitle(5, 15)",
          titleCN: "@ctitle(5, 15)",
          link: "@url",
          coverImage: `@image`,
          learnNumber: "@integer(1, 100)",
          tags: ["English", "Chinese"],
        },
      ],
    }).rows,
    total: "@integer(10, 50)",
  };
}