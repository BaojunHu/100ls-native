import { date } from '@dimjs/utils';

/**
 * 相对时间
 * @param time 时间
 */
export const relativeTime = (time: string) => {
  if (!time) return '';

  const today = new Date().setHours(0, 0, 0, 0);
  const itemDate = date.dateNormalize(time).setHours(0, 0, 0, 0);
  const isToday = today === itemDate;

  const isYesterday = new Date(today - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0) === itemDate;
  const isPrevYesterday = new Date(today - 2 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0) === itemDate;

  const prefix = isToday
    ? '今天'
    : isYesterday
      ? '昨天'
      : isPrevYesterday
        ? '前天'
        : date.dateFormat(time, 'MM-DD');

  return `${prefix} ${date.dateFormat(time, 'hh:mm')}`;
};
