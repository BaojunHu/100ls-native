import { RouterEnum } from '@/router/constants';
import { type CSSProperties, type VNode } from 'vue';

export type TPlainObject = {
  [key: string]: any;
};
export type TErrorInfo = {
  code: number;
  message: string;
};

export type CommonPropsWithChildren = {
  className?: string;
  style?: CSSProperties;
  children?: VNode | undefined;
};

export type TPagingResult<T> = {
  total: number;
  rows: T[];
};

export type TPagingCondition<T> = T & {
  pageNo: number;
  pageSize: number;
};

export type TreeLabelValT<T = string> = {
  label: string;
  value: T;
  children?: TreeLabelValT<T>[];
};

export const LocationCacheKey = '__LOCATION_CACHE__';

export type TUnreadCount = Partial<Record<RouterEnum, number>>;
