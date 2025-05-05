import { sleep } from '@flatbiz/utils';
import { useRequest } from 'vue-hooks-plus';
import type {
  UseRequestOptions,
  useRequestResult,
  UseRequestService,
} from 'vue-hooks-plus/lib/useRequest/types';

interface CustomOptions<R, P extends any[]> extends UseRequestOptions<R, P> {}

/**
 * 用于处理请求的 hook，自动处理 loading 和错误提示
 * @param service 请求方法
 * @param options 请求配置
 * @returns 请求结果
 */

export function useMRequest<R, P extends any[]>(
  service: UseRequestService<R, P>,
  options?: CustomOptions<R, P> & {
    showLoading?: boolean;
    showErrorMessage?: boolean;
  },
): useRequestResult<R, P> {
  const { showLoading = false, onBefore, onFinally, onError, showErrorMessage = true } = options || {};

  const customOptions: CustomOptions<R, P> = {
    ...options,
    onBefore: (params: P) => {
      if (showLoading) {
        // 显示全屏 loading
        void uni.showLoading({
          title: 'Loading',
          mask: true,
        });
      }

      onBefore?.(params);
    },
    onFinally: (params: P) => {
      if (showLoading) {
        // 关闭全屏 loading
        uni.hideLoading();
      }
      onFinally?.(params);
    },
    onError: (error: Error, params: P) => {
      if (showErrorMessage) {
        void uni.showToast({
          title: error?.message || '请求失败',
          icon: 'none',
          duration: 500,
        });
      }

      onError?.(error, params);
    },
  };

  return useRequest<R, P>(service, customOptions);
}


