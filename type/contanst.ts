function enumToLabelVal<T extends Record<string, string | number>>(
  e: T,
  map: Record<string, string>,
): { label: string; value: T[keyof T] }[] {
  return Object.keys(map).map((val) => ({
    label: map[val] as string,
    value: val as T[keyof T],
  }));
}

/**托盘分类 */
export enum ProductCateEnum {
  /** 木托盘 */
  WoodPallet = 'mtp',
  /** 塑料托盘*/
  PlasticPallet = 'sltp',
  /**周转箱 */
  TurnoverBox = 'zzx',
}

export const ProductCateMap = {
  [ProductCateEnum.PlasticPallet]: '塑料托盘',
  [ProductCateEnum.WoodPallet]: '木托盘',
  [ProductCateEnum.TurnoverBox]: '周转箱',
};

export const ProductCateEnumMap = enumToLabelVal(ProductCateEnum, ProductCateMap);

/** 排序类型（time-时间 price-价格） */
export enum ProductSortTypeEnum {
  /** 时间 */
  TIME = 'time',
  /** 价格 */
  PRICE = 'price',
  /** 销量 */
  SQ = 'sakesQuantity',
}

export const ProductSortTypeMap = {
  [ProductSortTypeEnum.TIME]: '时间',
  [ProductSortTypeEnum.PRICE]: '价格',
  [ProductSortTypeEnum.SQ]: '销量',
};

export const ProductSortTypeEnumMap = enumToLabelVal(ProductCateEnum, ProductCateMap);

/** 升序降序 */
export enum SortDirectionEnum {
  /** 升序 */
  ASC = 'asc',
  /** 降序 */
  DESC = 'desc',
}

export enum ProductBizTypeEnum {
  /** 出售 */
  Sale = '00',
  /** 静租 */
  StaticRent = '01',
  /** 动租 */
  DynamicRent = '02',
  // /** 静租续期订单 */
  // StaticRentRenewal = '0101',
  // /** 动租续期订单 */
  // DynamicRentRenewal = '0201',
}

export const ProductBizTypeTagMap = {
  [ProductBizTypeEnum.Sale]: '购',
  [ProductBizTypeEnum.StaticRent]: '租',
  [ProductBizTypeEnum.DynamicRent]: '租',
};

export const ProductBizTypeMap = {
  [ProductBizTypeEnum.Sale]: '采购',
  [ProductBizTypeEnum.StaticRent]: '静租',
  [ProductBizTypeEnum.DynamicRent]: '动租',
};

export const ProductBizTypeEnumMap = enumToLabelVal(ProductBizTypeEnum, ProductBizTypeMap);

export enum MemberTypeEnum {
  /** 网点会员 */
  Branch = '00',
  /** 普通会员 */
  Normal = '01',
}

/**配送方式 */
export enum DeliveryTypeEnum {
  /** 物流配送 */
  Delivery = '01',
  /** 到店自取 */
  SelfPickup = '00',
}

export const DeliveryTypeMap = {
  [DeliveryTypeEnum.Delivery]: '物流配送',
  [DeliveryTypeEnum.SelfPickup]: '到店自取',
};

export const DeliveryTypeEnumMap = enumToLabelVal(DeliveryTypeEnum, DeliveryTypeMap);

/**合同签约方式 */
export enum ContractTypeEnum {
  /** 线上签约 */
  Online = 'online',
  /** 线下签约 */
  Offline = 'offline',
}

export const ContractTypeMap = {
  [ContractTypeEnum.Online]: '线上签约',
  [ContractTypeEnum.Offline]: '线下签约',
};

export const ContractTypeEnumMap = enumToLabelVal(ContractTypeEnum, ContractTypeMap);

// 定义支付方式枚举
export enum PayMethodEnum {
  /** 微信支付 */
  WeChatPay = '21',
  /** 线下支付 */
  BankTransfer = '11',

  /** 支付宝 */
  // AliPay = '22',
}

export const PayMethodMap = {
  [PayMethodEnum.WeChatPay]: '微信支付',
  [PayMethodEnum.BankTransfer]: '线下支付',
  // [PayMethodEnum.AliPay]: '支付宝支付',
};

export const PayMethodEnumMap = enumToLabelVal(PayMethodEnum, PayMethodMap);

export enum PayEnum {
  /**线下 */
  Offline = 3,
  /** 支付宝 */
  // AliPay = 1,
  /**微信 */
  WeChatPay = 2,
}

export const PayMap = {
  [PayEnum.WeChatPay]: '微信支付',
  [PayEnum.Offline]: '线下支付',
  // [PayMethodEnum.AliPay]: '支付宝支付',
};
export const PayEnumMap = enumToLabelVal(PayEnum, PayMap);

export enum InvoiceTypeEnum {
  /** 普通发票 */
  Normal = '00',
  /** 增值发票 */
  AddValue = '01',
}

export const InvoiceTypeMap = {
  [InvoiceTypeEnum.Normal]: '普通发票',
  [InvoiceTypeEnum.AddValue]: '增值税专用发票',
};

export const InvoiceTypeEnumMap = enumToLabelVal(InvoiceTypeEnum, InvoiceTypeMap);

export enum TitleTypeEnum {
  /** 个人抬头 */
  Personal = 'per',
  /** 企业发票抬头 */
  Enterprise = 'ent',
}

export const TitleTypeMap = {
  [TitleTypeEnum.Enterprise]: '企业单位',
  [TitleTypeEnum.Personal]: '个人/非企业',
};

export const TitleTypeEnumMap = enumToLabelVal(TitleTypeEnum, TitleTypeMap);

export enum MsgTypeEnum {
  /** 通知 */
  notice = 'notice',
  /** 订单 */
  order = 'order',
}

export enum MsgStatusEnum {
  /** 未读 */
  unread = 'unread',
  /** 已读 */
  read = 'read',
}

export enum OrderStatusEnum {
  /** 待确认 */
  WAIT_CONFIRM = '10',
  /** 等待买方签约 */
  WAIT_BUYER_SIGN = '11',
  /** 续租待确认 */
  RENEWAL_WAIT_CONFIRM = '12',
  /** "续租处理中 */
  RENEWAL_WAIT_SIGN = '13',
  /** 已确认待卖方签约 */
  WAIT_SELLER_SIGN = '20',
  /** 签约失败 */
  SIGN_FAIL = '21',
  /** 待支付定金 */
  WAIT_PAYMENT_DEPOSIT = '30',
  /** 租赁续租待支付 */
  WAIT_PAYMENT_RENEWAL = '31',
  /**待平台确认定金 */
  PAYMENT_CONFIRMING = '32',
  /** 待平台确认尾款 */
  WAIT_PLAT_CONFIRM_FINAL = '33',

  /** 待支付 */
  WAIT_PAY = '34',

  /** 待发货 */
  WAIT_DELIVER_GOODS = '40',
  /** 待收货 */
  WAIT_RECEIVE_GOODS = '50',
  /** 待支付尾款 */
  WAIT_PAYMENT_FINAL = '51',
  /** 使用中 */
  IN_USE = '60',
  /** 待归还 */
  WAIT_RETURN = '70',
  /** 归还中 */
  RETURNING = '71',
  /** 已完成 */
  COMPLETED = '80',
  /** 已取消 */
  CANCELED = '90',
}

export const OrderStatusMap = {
  [OrderStatusEnum.WAIT_CONFIRM]: '待确认',
  [OrderStatusEnum.WAIT_BUYER_SIGN]: '待签约',
  [OrderStatusEnum.RENEWAL_WAIT_CONFIRM]: '续确认',
  [OrderStatusEnum.RENEWAL_WAIT_SIGN]: '待签约',
  [OrderStatusEnum.WAIT_SELLER_SIGN]: '待签约',
  [OrderStatusEnum.SIGN_FAIL]: '签约失败',
  [OrderStatusEnum.WAIT_PAYMENT_DEPOSIT]: '待支付',
  [OrderStatusEnum.WAIT_PAY]: '待支付',
  [OrderStatusEnum.WAIT_PAYMENT_RENEWAL]: '待确认定金',
  [OrderStatusEnum.WAIT_PLAT_CONFIRM_FINAL]: '待确认尾款',
  [OrderStatusEnum.PAYMENT_CONFIRMING]: '支付确认中',
  [OrderStatusEnum.WAIT_DELIVER_GOODS]: '待发货',
  [OrderStatusEnum.WAIT_RECEIVE_GOODS]: '待收货',
  [OrderStatusEnum.WAIT_PAYMENT_FINAL]: '待支付尾款',
  [OrderStatusEnum.IN_USE]: '使用中',
  [OrderStatusEnum.WAIT_RETURN]: '待归还',
  [OrderStatusEnum.RETURNING]: '归还中',
  [OrderStatusEnum.COMPLETED]: '交易完成',
  [OrderStatusEnum.CANCELED]: '已取消',
};

// export const BranchOrderStatusMap = {
//   [OrderStatusEnum.WAIT_CONFIRM]: '待确认',
//   [OrderStatusEnum.WAIT_BUYER_SIGN]: '待签约',
//   [OrderStatusEnum.RENEWAL_WAIT_CONFIRM]: '续租待确认',
//   [OrderStatusEnum.RENEWAL_WAIT_SIGN]: '续租处理中',
//   [OrderStatusEnum.WAIT_SELLER_SIGN]: '待签约',
//   [OrderStatusEnum.SIGN_FAIL]: '签约失败',
//   [OrderStatusEnum.WAIT_PAYMENT_DEPOSIT]: '待支付',
//   [OrderStatusEnum.WAIT_PAYMENT_RENEWAL]: '待确认定金',
//   [OrderStatusEnum.WAIT_PLAT_CONFIRM_FINAL]: '待确认尾款',
//   [OrderStatusEnum.PAYMENT_CONFIRMING]: '支付确认中',
//   [OrderStatusEnum.WAIT_DELIVER_GOODS]: '待发货',
//   [OrderStatusEnum.WAIT_RECEIVE_GOODS]: '待收货',
//   [OrderStatusEnum.WAIT_PAYMENT_FINAL]: '待支付尾款',
//   [OrderStatusEnum.IN_USE]: '使用中',
//   [OrderStatusEnum.WAIT_RETURN]: '待归还',
//   [OrderStatusEnum.RETURNING]: '归还中',
//   [OrderStatusEnum.COMPLETED]: '交易完成',
//   [OrderStatusEnum.CANCELED]: '已取消',
// };

export const OrderStatusEnumMap = enumToLabelVal(OrderStatusEnum, OrderStatusMap);
/** */
export enum PurchaseTypeEnum {
  qz = 'qz',
  qg = 'qg',
}
export const PurchaseTypeMap = {
  [PurchaseTypeEnum.qz]: '求租',
  [PurchaseTypeEnum.qg]: '求购',
};

export const PurchaseTypeEnumMap = enumToLabelVal(PurchaseTypeEnum, PurchaseTypeMap);

export const cacnelReasonList = [
  {
    label: '不想要了',
    value: '不想要了',
  },
  {
    label: '商品选错了',
    value: '商品选错了',
  },
  {
    label: '价格有点贵',
    value: '价格有点贵',
  },
  {
    label: '收货地址选错了',
    value: '收货地址选错了',
  },
  {
    label: '价格高于其他平台',
    value: '价格高于其他平台',
  },
  {
    label: '其他',
    value: '其他',
  },
];

/** 需求订单状态 */
export enum WantOrderStatusEnum {
  /**未处理 */
  UNHANDLE = '0',
  /**已处理 */
  HANDLED = '2',
  /**已取消 */
  CANCELED = '3',
  /**处理中 */
  HANDLING = '1',
}

export const WantOrderStatusMap = {
  [WantOrderStatusEnum.UNHANDLE]: '待确认',
  [WantOrderStatusEnum.HANDLED]: '已处理',
  [WantOrderStatusEnum.CANCELED]: '已取消',
  [WantOrderStatusEnum.HANDLING]: '处理中',
};

export const WantOrderStatusColorMap = {
  [WantOrderStatusEnum.UNHANDLE]: 'error-7',
  [WantOrderStatusEnum.HANDLED]: 'grey-7',
  [WantOrderStatusEnum.CANCELED]: 'grey-7',
  [WantOrderStatusEnum.HANDLING]: 'primary-7',
};

export enum ConfirmPayTypeEnum {
  /**支付定金 */
  Deposit = '00',
  /**支付尾款 */
  FinalPayment = '01',

  /**网点确认定金 */
  BranchConfirmDeposit = '03',
  /**网点确认尾款 */
  BranchConfirmFinalPayment = '04',
}

export const GlobalMsgEventName = 'global-msg-event';

/** 代表全国 前端code */
export const GLOBAL_CITY = '00000XX';

export enum ShippingStatusEnum {
  /** 待发货 */
  WAIT_DELIVERY = '1',
  /** 已发货 */
  DELIVERED = '2',
  /** 运输中 */
  TRANSPORTING = '3',
  /** 派送中 */
  DELIVERING = '4',
  /** 已签收 */
  RECEIVED = '5',
}

export const ShippingStatusEnumMap = {
  [ShippingStatusEnum.WAIT_DELIVERY]: '待发货',
  [ShippingStatusEnum.DELIVERED]: '已发货',
  [ShippingStatusEnum.TRANSPORTING]: '运输中',
  [ShippingStatusEnum.DELIVERING]: '派送中',
  [ShippingStatusEnum.RECEIVED]: '已签收',
};
