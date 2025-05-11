import { modifyQueryString, PlainObject, uuid } from "@dimjs/utils";
import type {
  PageRouter,
  PageRouterBack,
  RouterEnum,
  RouterKey,
} from "./constants";
import { isPlainObject } from "@dimjs/lang";
import { HomeHistoryResponse, TSubtitle } from "@/services/home";

export type NavigateToType<
  BC extends keyof ReType & RouterKey,
  T extends PageRouter,
  ReType extends PageRouterBack
> = {
  // 路由路径
  path: BC | RouterEnum;
  // 数据 参数
  data?: T[BC];
  // 分发是否显示loading
  dispatchLoading?: boolean;
  // 有callback，就会使用navigateToWithCallback
  callBack?: (data: ReType[BC]) => void | Promise<void>;
  // 禁用回退手势
  disableGestureBack?: boolean;
  // 跳转模式 默认 navigateTo
  type?: "navigateTo" | "redirectTo" | "reLaunch" | "switchTab";
  // 其他文档中可以实现的属性
  animationType?: UniApp.NavigateToOptions["animationType"];
  animationDuration?: number;
  events?: object;
};

export type NavigateBackType<
  BC extends keyof ReType & RouterKey,
  ReType extends PageRouterBack
> = {
  data: ReType[BC];
  options?: {
    delta?: number;
    animationType?: UniApp.NavigateBackOptions["animationType"];
    animationDuration?: number;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  };
};

const navigateTo = <
  BC extends keyof ReType & RouterKey,
  T extends PageRouter,
  ReType extends PageRouterBack
>({
  path,
  data,
  callBack,
  disableGestureBack,
  type = "navigateTo",
  animationType,
  animationDuration,
  events,
}: NavigateToType<BC, T, ReType>) => {
  const eventID = uuid(); // 事件标识

  const evnentKeys = getRouteEventKey(eventID);

  let url = path as string;
  let routerData: T[BC] | undefined;

  if (!!data && JSON.stringify(data)?.length > 255) {
    routerData = data;
  } else {
    url = modifyQueryString(path, data || {});
  }
  if (typeof disableGestureBack !== "undefined") {
    url = modifyQueryString(url, {
      disableGestureBack: disableGestureBack,
    });
  }

  if (isPlainObject(routerData)) {
    url = modifyQueryString(url, {
      eventID: eventID,
    });
  }
  if (callBack) {
    url = modifyQueryString(url, {
      eventID: eventID,
    });
  }

  switch (type) {
    case "redirectTo":
      void uni.redirectTo({
        url,
      });
      break;
    case "reLaunch":
      void uni.reLaunch({
        url,
      });
      break;
    case "switchTab":
      void uni.switchTab({
        url,
      });
      break;
    default:
      // 页面跳转成功后，我监听一个通知，等待目标页通知我：它准备好接收了，此时我才发送数据
      // 解决目标也尚未开始监听，就发送了数据而导致无法成功接收数据的问题
      if (isPlainObject(routerData)) {
        uni.$once(evnentKeys.get, () => {
          uni.$emit(evnentKeys.post, data);
        });
      }

      uni.navigateTo({
        url,
        animationType,
        animationDuration,
        events,
        success: (res) => {
          if (callBack) {
            uni.$once(evnentKeys.back, (backData: ReType[BC]) => {
              void callBack(backData);
            });
          }
        },
      });
      break;
  }
};

const navigateBack = <
  BC extends keyof ReType & RouterKey,
  ReType extends PageRouterBack
>(
  config?: NavigateBackType<BC, ReType>
) => {
  const { delta = 1, animationType, animationDuration } = config?.options || {};
  const { data } = config || {};

  const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  const curRoute = routes[routes.length - 1]; // 获取当前页面路由，也就是最后一个打开的页面路由
  //@ts-ignore
  const { eventID } = curRoute.options;

  const evnentKeys = getRouteEventKey(eventID);

  uni.navigateBack({
    delta,
    animationType,
    animationDuration,
    success: () => {
      uni.$emit(evnentKeys.back, data);
    },
  });
};

const getRouteEventKey = (id: string) => {
  return {
    get: "get_" + id,
    post: "post_" + id,
    back: "back_" + id,
  };
};

export const navigateToWebview = (targetUrl: string, data: PlainObject) => {
  let webviewUrl = `/pages/component/web-view-local/web-view-local`;

  targetUrl = modifyQueryString(targetUrl, {
    data: encodeURIComponent(JSON.stringify(data)),
  });

  webviewUrl = modifyQueryString(webviewUrl, {
    url: targetUrl,
  });
  console.log(webviewUrl,'webviewUrl>>>>>>')

  uni.navigateTo({
    url: webviewUrl,
  });
};

export type TVideoPlayerParams = {
  /** 字幕列表 */
  subtitles: TSubtitle[];

  coverImage: string;

  link: string;

  title: string;
};

export const navigateVideoPlayer = (data: TVideoPlayerParams) => {
  // let targetUrl = 'http://localhost:8083'
  // let targetUrl = "/hybrid/html/h5/index.html";
  // let targetUrl = "http://1.116.101.175:8092/spa-app/index.html";
  let targetUrl = "http://1.116.101.175/spa-app/index.html";

  navigateToWebview(targetUrl, data);
};

// 示例导出
export { getRouteEventKey, navigateBack, navigateTo };
