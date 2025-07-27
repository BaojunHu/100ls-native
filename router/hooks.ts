import { onLoad, onReady } from "@dcloudio/uni-app";
import { paramStrToJson } from "@dimjs/utils";
import { ref } from "vue";
import type { PageRouter, RouterKey } from "./constants";
import { getRouteEventKey } from "./main";
// type TUsePageInParamsBack<BC extends RouterKey, T extends PageRouter> = (data: T[BC]) => void;

export const usePageInParams = <
  BC extends RouterKey,
  T extends PageRouter = PageRouter
>() => {
  const pageParams = ref<T[BC] | undefined>(undefined);
  const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  // 获取当前页面路由，也就是最后一个打开的页面路由
  const curRoute = routes[routes.length - 1] as {
    options: T[BC];
    $page: any;
  };

  /**options 异步赋值 */
  onLoad((urlParams) => {
    //@ts-ignore
    const { eventID } = urlParams || curRoute?.$page?.options || {};
    const queryObj = paramStrToJson(curRoute?.$page?.fullPath as string);

    const options = {
      ...(queryObj || {}),
      ...(curRoute?.options || {}),
    };

    if (!eventID) {
      try {
        /**将参数全部 urldecode */
        const newOption = Object.keys(options).reduce((acc, key) => {
          // @ts-ignore
          let val = options?.[key] as string;

          val = decodeURIComponent(decodeURIComponent(val));

          // @ts-ignore
          acc[key] = val;
          return acc;
        }, {} as unknown as T[BC]);
        pageParams.value = newOption;
      } catch (e) {
        console.log("usePageInParams error:>> ", e);
      }
    } else {
      const evnentKeys = getRouteEventKey(eventID);
      // 目标也首先准备好接收数据（监听事件）
      uni.$once(evnentKeys.post, (data: T[BC]) => {
        pageParams.value = data;
      });
      // 通知上一页，我已准备好，让它发送数据
      uni.$emit(evnentKeys.get);
    }
  });

  return pageParams;
};
