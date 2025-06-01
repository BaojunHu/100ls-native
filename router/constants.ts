

export enum RouterEnum {
  /**首页 */
  Home = '/views/home/index',
  /**登录 */
  Login = '/views/login/index',
  /**视频 */
  Video = '/views/video-list/index',


}
export type PageRouter = {
  [RouterEnum.Home]: void;
  [RouterEnum.Login]: void;
  [RouterEnum.Video]: {
    categoryNo: string;
    title: string;
  };

};

export type PageRouterBack = {
  [RouterEnum.Home]: void;
  [RouterEnum.Login]: void;
  [RouterEnum.Video]:void
};

export type RouterKey = keyof PageRouter;
