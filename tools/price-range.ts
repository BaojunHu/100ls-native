import { ProductBizTypeEnum } from '@/type/contanst';
import type { TProductDetailRes, TProductListRes } from '@/type/service';

/**
 * 获取商品价格范围
 * @param item
 * @returns
 */
export const getPriceRange = (item?: TProductListRes | TProductDetailRes) => {
  if (!item) return '';
  // 静租显示价格区间 ，其他显示单个价格
  if (item.productBizType !== ProductBizTypeEnum.StaticRent) return item.priceDetailData?.[0]?.salePrice;

  const sortNum = item.priceDetailData?.sort((a, b) => a.salePrice - b.salePrice);

  return `${sortNum?.[0].salePrice}-${sortNum?.[sortNum.length - 1].salePrice}`;
};
