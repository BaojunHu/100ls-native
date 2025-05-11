// 定义接口来描述通用的API响应
// import { UniApp} from "@dcloudio/types"
import { TPlainObject } from "@flatbiz/utils";
import { firstThrottle } from "@/tools/first-throttle";
import { RouterEnum } from "@/router/constants";
import { navigateTo } from "@/router/main";
import { NO_AUTH_API } from "./constant";

interface ApiResponse<T = any> {
  code: string;
  message: string;
  data: T;
}

// 基础URL，根据环境变量来设置
// export let baseUrl =  'https://100ls.com.cn/api'
export let baseUrl = "http://1.116.101.175:8092/api";

// if(process.env.NODE_ENV === 'development'){
//     baseUrl = '/proxy-api/' // 开发环境使用代理
// }else{
//     baseUrl = 'https://100ls.com.cn' // 生产环境使用真实的API地址
// }

const exceptionHandler = (
  res: UniApp.RequestSuccessCallbackResult,
  reject: (reason?: any) => void
) => {
  const { statusCode, data } = res;

  if (statusCode >= 500) {
    reject({ code: "500", message: "服务器错误，请稍后再试" });
    return;
  }

  if (statusCode >= 400) {
    reject({ code: statusCode.toString(), message: "请求错误，请检查参数" });
    return;
  }

  // 其他未知错误
  reject({ code: "unknown", message: "未知错误，请稍后再试" });
};

/** 清空登录缓存 */
export const logout = async (isRelunch?: boolean) => {
  uni.removeStorageSync("authToken");
  //   removeUserInfo();

  if (isRelunch) {
    // 清空所有页面栈
    void uni.reLaunch({
      url: "/pages/login/index",
    });
  }
};

/**​ 防止同一时间打开多个登录页 */
const handleLoginStatus = firstThrottle(async (code: string) => {
  // 判断第一张页面是否是登录页

  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];

  if (RouterEnum.Login.includes(currentPage.route as string)) {
    return false;
  }
  // void logout();
  navigateTo({
    path: RouterEnum.Login,
  });
}, 3000);

/**​
 * 检查登录状态
 * @param response
 * @returns
 */
export const checkAuth = <T>(
  response: UniApp.RequestSuccessCallbackResult,
  url: string,
  reject: (reason?: any) => void
) => {
  const { code } = (response.data || {}) as ApiResponse<T>;
  if (code && ["410", "402"].includes(code)) {
    reject({ code: "410", message: "登录失效" });
    // 检查是否是白名单
    if (!NO_AUTH_API.includes(url)) {
      handleLoginStatus(code);
    }
    return false;
  }
  return true;
};

/**​a
 * 基础请求方法
 * @param url 请求地址
 * @param method 请求方法
 * @param data 请求数据
 * @param headers 请求头
 * @returns Promise<T>
 */
const request = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: TPlainObject,
  headers?: TPlainObject
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const authToken = uni.getStorageSync("authToken") || "";

    const requestConfig: UniApp.RequestOptions = {
      url: baseUrl + url,
      method,
      data: method === "GET" ? data : { param: data },
      header: {
        "auth-token": authToken,
        ...headers,
      },
      timeout: 20000,
      success: (res) => {
        const { statusCode } = res;
        const responseData = res.data as ApiResponse<T>;

        if (statusCode !== 200) {
          exceptionHandler(
            res as unknown as UniApp.RequestSuccessCallbackResult,
            reject
          );
          return;
        }

        if (
          !checkAuth(res as UniApp.RequestSuccessCallbackResult, url, reject)
        ) {
          return;
        }

        if (responseData.code === "000") {
          resolve(responseData.data);
        } else {
          uni.showToast({
            title: responseData?.message || "请求错误",
            icon: "none",
          });
          reject(responseData);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: "网络错误，请检查网络连接",
          icon: "none",
        });
        reject(err);
      },
    };

    uni.request(requestConfig);
  });
};

/**​
 * GET请求
 * @param url 请求地址
 * @param data 请求数据
 * @param headers 请求头
 * @returns Promise<T>
 */
const get = <T>(
  url: string,
  data?: TPlainObject,
  headers?: TPlainObject
): Promise<T> => {
  return request<T>(url, "GET", data, headers);
};

/**​
 * POST请求
 * @param url 请求地址
 * @param data 请求数据
 * @param headers 请求头
 * @returns Promise<T>
 */
const post = <T>(
  url: string,
  data?: TPlainObject,
  headers?: TPlainObject
): Promise<T> => {
  return request<T>(url, "POST", data, headers);
};

/**​
 * 文件上传
 * @param url 上传地址
 * @param filePath 文件路径
 * @param name 文件对应的key
 * @param formData 其他表单数据
 * @param headers 请求头
 * @returns Promise<T>
 */
const upload = <T>(
  url: string,
  filePath: string,
  name: string,
  formData?: TPlainObject,
  headers?: TPlainObject
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const authToken = uni.getStorageSync("authToken") || "";

    uni.uploadFile({
      url: baseUrl + url,
      filePath,
      name,
      formData,
      header: {
        "auth-token": authToken,
        ...headers,
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          exceptionHandler(
            res as unknown as UniApp.RequestSuccessCallbackResult,
            reject
          );
          return;
        }

        try {
          const data = JSON.parse(res.data) as ApiResponse<T>;

          if (
            !checkAuth(
              res as unknown as UniApp.RequestSuccessCallbackResult,
              url,
              reject
            )
          ) {
            return;
          }

          if (data.code === "000") {
            resolve(data.data);
          } else {
            uni.showToast({
              title: data?.message || "上传失败",
              icon: "none",
            });
            reject(data);
          }
        } catch (e) {
          reject({ code: "500", message: "解析响应数据失败" });
        }
      },
      fail: (err) => {
        uni.showToast({
          title: "上传失败，请检查网络连接",
          icon: "none",
        });
        reject(err);
      },
    });
  });
};

export const http = {
  get,
  post,
  upload,
  request,
};
