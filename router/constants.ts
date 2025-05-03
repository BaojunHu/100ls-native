

export enum RouterEnum {
  /**首页 */
  Home = '/views/home/index',
  /**登录 */
  Login = '/views/login/index',


}
export type PageRouter = {
  [RouterEnum.Home]: void;

};

export type PageRouterBack = {

};

export type RouterKey = keyof PageRouter;
