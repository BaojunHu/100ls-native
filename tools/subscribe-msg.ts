/** 订阅消息 */
export const subscribeMsgPromise = () => {
  return new Promise((res) => {
    wx.requestSubscribeMessage({
      tmplIds: [
        // 'mGBa4uSXX4eUnXyPLiJ5adIYFIT9OsBxbPq48lAGUXA',
        'DS65vlCFakl1SCRZO3wqNlLrTZIZ08x__W1syGN4er8',
      ],
      success() {
        res(true);
      },
      fail: () => {
        res(false);
      },
    });
  });
};
