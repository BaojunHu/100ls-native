/** XX秒内 只执行一次 */
export function firstThrottle<T extends (...args: any[]) => void>(
  func: T,
  interval: number,
): (...args: Parameters<T>) => void {
  let lastCalledTime = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastCalledTime > interval) {
      lastCalledTime = now;
      func(...args);
    }
  };
}
