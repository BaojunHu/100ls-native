

export enum RouterEnum {
  /**首页 */
  Home = '/views/home/index',
  /**登录 */
  Login = '/views/login/index',
  /**视频 */
  Video = '/views/video-list/index',

  Profile = '/views/profile/index',
  /**课程 */
  ProfileEdit = '/views/profile/edit',



}
export type PageRouter = {
  [RouterEnum.Home]: void;
  [RouterEnum.Login]: void;
  [RouterEnum.Video]: {
    categoryNo: string;
    title: string;
  };
  [RouterEnum.Profile]: void;
  [RouterEnum.ProfileEdit]: void;

};

export type PageRouterBack = {
  [RouterEnum.Home]: void;
  [RouterEnum.Login]: void;
  [RouterEnum.Video]:void
  [RouterEnum.Profile]: void;
  [RouterEnum.ProfileEdit]: void;
};

export type RouterKey = keyof PageRouter;
