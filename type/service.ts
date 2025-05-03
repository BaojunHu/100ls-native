import type {
  ConfirmPayTypeEnum,
  ContractTypeEnum,
  DeliveryTypeEnum,
  InvoiceTypeEnum,
  MemberTypeEnum,
  MsgTypeEnum,
  OrderStatusEnum,
  PayEnum,
  PayMethodEnum,
  ProductBizTypeEnum,
  ProductCateEnum,
  ProductSortTypeEnum,
  PurchaseTypeEnum,
  ShippingStatusEnum,
  SortDirectionEnum,
  TitleTypeEnum,
  WantOrderStatusEnum,
} from './contanst';

/** 请求参数类型 */
export type TMemberLoginParam = {
  code: string;
  nickName: string;
  phone: string;
};

/** 响应数据类型 */
export type TMemberLoginData = {
  authToken: string;
};

export type TProductListReq = {
  /** 市code */
  cityCode?: string;
  /** 产品分类编码 */
  categoryCode?: ProductCateEnum;
  /**00 - 出售 01-静租 02-租赁 */
  productBizType?: ProductBizTypeEnum;
  /** 是否为促销产品 */
  isPromotion: boolean;
  searchCondDTOS?: TSearchCondDTOS[];
  sortTypes?: TSortTypes[];
  /**产品来源 00 平台 01网点*/
  productType?: '00' | '01';
  /** 产品名称 */
  productName?: string;

  /**是否网点用户 */
  branchBuyFlag?: boolean;
};

export type TSortTypes = {
  /** 排序类型 */
  type: ProductSortTypeEnum;
  /** 排序值 */
  direction: SortDirectionEnum;
};

export type TSearchCondDTOS = {
  /** 分组名称 */
  groupName?: string;
  /** 分组键值 */
  groupKey?: string;
  conditions?: TProductListConditions[];
};

export type TProductListConditions = {
  /** 条件编码 */
  conditionCode?: string;
  /** 条件值 */
  conditionValue?: string;
};

export type TProductListRes = {
  productBizType: ProductBizTypeEnum;
  skuCode: string;
  /** code 唯一标识 */
  productId: string;
  /** 产品㔹行  */
  productStyle: string;
  /** 产品尺寸 */
  productSize: string;
  /** 产品名称 */
  productName: string;
  /** 图片URL */
  imgUrl: string;
  /** 省名称 */
  provinceName?: string;
  /** 市名称 */
  cityName: string;
  /** 价格 */
  price: number;
  /** 库存 */
  stockQuantity: number;
  /** 数量 */
  quantity: number;
  /** 出租最短时间 */
  rentalMinDays: 1;
  /** 出租最小数量 */
  rentalMinQuantity: 1;
  /** 产品标签 */
  productTag?: string[];
  /** 价格详情 */
  priceDetailData?: TProductPriceDetail[];
  productCode: string;
};

export type TProductDetailReq = {
  /** sku编码 */
  skuCode: string;
  productCode: string;
};

export type TProductPriceDetail = {
  /** 结束天数 */
  endDay: number;
  /** 开始天数 */
  startDay: number;
  /** 成本价格 */
  costPrice: number;
  /** 平台价格 */
  platPrice: number;
  /** 销售价格 */
  salePrice: number;
};

export type TProductDetailRes = {
  categoryCode: ProductCateEnum;

  /** 仓库编号 */
  warehouseNo: string;

  /** 产品名称 */
  productName: string;
  /** 主标题 */
  mainTitle: string;
  /** 副标题 */
  subTitle: string;
  /** sku编码 */
  skuCode: string;
  /** 数量 */
  quantity: number;
  /** 价格详情 */
  priceDetailData: TProductPriceDetail[];
  /** 库存 */
  stock: number;
  /** 销售最小数量 */
  saleMinQuantity: number;
  /** 销售押金比例 */
  saleDepositRate: number;
  /** 省名称 */
  provinceName: string;
  /** 市名称 */
  cityName: string;
  /** 区名称 */
  distName: string;

  /** 运输方式 */
  shippingMethod: DeliveryTypeEnum;
  /** 产品标签 */
  productTags: string[];
  /** 产品属性 */
  productAttrs: TProductAttr[];
  /** 产品图片 */
  productImages: Array<{
    /** 图片URL */ imageUrl: string /** 是否主图 */;
    isPrimary: boolean;
  }>;
  /** 产品编码 */
  productCode: string;
  /** 产品业务类型 */
  productBizType: ProductBizTypeEnum;
  /** 押金 */
  deposit: number;
  /** 租赁最短天数 */
  rentalMinDays: number;
  /** 租赁最小数量 */
  rentalMinQuantity: number;
  /** 发货地址 */
  shipmentAddress: string;
  /** skuId */
  skuId: number;
  /**租赁商品 出售价格 */
  compensationPrice: number;
};

export type TProductAttr = {
  /** 属性值id */
  attrValId: number;
  /** 属性值编码 */
  attrValCode: string;
  /** 属性值 */
  attrVal: string;
  /** 分类编码 */
  categoryCode: string;
  /** 分类名称 */
  categoryName: string;
  /** 产品名称 */
  productName: string;
  /** 属性名称 */
  attributeName: string;
  /** 属性编码 */
  attributeCode: AttrEnum;
};

export type TOrderShipReq = {
  orderNo: string;
  /**物流单号 (商家配送必填)*/
  logisticsNumber?: string;
  /**运费 (商家配送必填)*/
  freightAmount?: number;
  /**提货地址 (自提必填)*/
  pickupAddress?: string;
};
export type TReturnGoodsReq = {
  orderNo: string;
  returnBranchNo?: string;
  returnBranchAddr?: string;
  returnAddr?: string;
};

export type TMemberAddressesItem = {
  memberAddrNo: string;
  /** 收件人 */
  recipientName: string;
  /** 收件人电话 */
  recipientPhone: string;
  /** 省 */
  provinceName: string;
  /** 市 */
  cityName: string;
  /** 区 */
  districtName: string;
  /** 省编码 */
  provinceCode: string;
  /** 市编码 */
  cityCode: string;
  /** 区编码 */
  districtCode: string;
  /** 地址明细 */
  streetAddress: string;
  /** 收件地址 */
  receiverAddress: string;
  /** 标签（home company） */
  addrLabel: string;
  /** 备注 */
  remark: string;
};

/** 删除用户地址的ts类型 */
export type TDeleteAddressReq = {
  /** 地址id */
  memberAddrNo: string;
};

export type TUpdateUserInfoParam = {
  /** 会员名称 (可选) */
  memberName?: string;
  /** 头像地址 (可选) */
  avatarUrl?: string;
  /** 手机号 (可选) */
  phone?: string;
  /** 性别可选
   * 0-未知
   * 1-男
   * 2-女
   * 3-保密
   * */
  gender: '0' | '1' | '2' | '3';
  /** 邮箱 (可选) */
  email?: string;
  /** 省 (必填) */
  provinceName: string;
  /** 市 (必填) */
  cityName: string;
  /** 区 (必填) */
  districtName: string;
  /** 省编码 (必填) */
  provinceCode: string;
  /** 市编码 (必填) */
  cityCode: string;
  /** 区编码 (必填) */
  districtCode: string;
};

export type TGetPhoneNumberReq = {
  /** 加密数据 */
  encryptedData: string;
  /** 加密算法的初始向量 */
  iv: string;
  /** 登录凭证 */
  code: string;
};

export type TGetPhoneNumberRes = {
  /** 手机号 */
  phone: string;
};

export type TGetScreenCondReq = {
  /** 分类编码（如 木托盘, 塑料托盘, 周转箱） */
  categoryCode?: ProductCateEnum;
};

export type TGetScreenCondRes = {
  /** 分组名称 */
  groupName: string;
  /** 分组键值 */
  groupKey: string;
  conditions: Array<TProductListConditions>;
};

export type TAreaListRes = {
  /** 地区名称 */
  name: string;
  /** 地区编码 */
  code: string;
  /** 父级地区编码 (optional) */
  parentCode?: string;
  children: TAreaListRes[];
};

export type TSearchProductNameReq = {
  /** 城市编码 */
  cityCode?: string;
  /** 产品名称关键字 */
  productName: string;
};

export type TProductAttributes = {
  /** 样式列表，可选 */
  style?: string[];
  /** 尺寸列表，可选 */
  size?: string[];
};

export enum AttrEnum {
  /**颜色 */
  COLOR = 'color',
  /**尺寸 */
  SIZE = 'size',
  /**材质 */
  MATERIAL = 'materialType',
  /**款式 */
  STYLE = 'style',
}

export const AttrEnumMap = {
  [AttrEnum.COLOR]: '颜色',
  [AttrEnum.SIZE]: '尺寸',
  [AttrEnum.MATERIAL]: '材质',
  [AttrEnum.STYLE]: '款式',
};

export type TAttrs = {
  attrValId: string | null;
  attrValCode: string;
  attrVal: string;
  categoryCode: string | null;
  categoryName: string | null;
  productName: string | null;
  attributeName: string;
  attributeCode: string;
};

export type TRecycleSubmitReq = {
  /** 产品名称 */
  productName: string;
  /** 产品主图链接 */
  productUrl: string;
  /** 分类名称 */
  categoryName: string;
  /** 分类code */
  // categoryCode: ProductCateEnum;
  // categoryCode: string;
  // /** 产品样式 */
  // style: string;
  // /** 产品尺寸|规格 */
  // size: string;
  /** 数量 */
  quantity: number;
  /** 联系电话 */
  contactPhone: string;
  /** 联系人姓名 */
  contactName: string;
  /** 回收地址 */
  recoveryAddr: string;
  /** 备注（可选） */
  remark?: string;
};

export type TRecycleSubmitResItem = {
  /** 回收编号 */
  recycleNo: string;
  /** 会员编号 */
  memberNo: string;
  /** 产品名称 */
  productName: string;
  /** 分类名称 */
  categoryName: string;
  /** 产品链接 */
  productUrl: string;
  /** 产品样式 */
  style: string;
  /** 产品尺寸 */
  size: string;
  /** 回收地址 */
  recoveryAddr: string;
  /** 联系电话 */
  contactPhone: string;
  /** 联系人姓名 */
  contactName: string;
  /** 状态码，例如 "0" */
  status: WantOrderStatusEnum;
  /** 数量 */
  quantity: number;
  /** 备注（可选） */
  remark?: string;
  /** 创建者 */
  creator: string;
  /** 操作者 */
  operator: string;
  /** 是否已删除 */
  deleted: boolean;
  /** 创建时间 */
  crtTime: string;
  /** 更新时间 */
  uptTime: string;
};

export type TPurchaseItem = {
  /** 采购编号 */
  purchaseNo: string;
  /** 产品名称 */
  productName: string;
  /** 产品链接 */
  productUrl: string;
  /** 分类名称 */
  categoryName: string;
  /** 数量 */
  quantity: number;
  /** 联系电话 */
  contactPhone: string | null;
  /** 联系人姓名 */
  contactName: string | null;
  /** 尺寸 */
  size: string;
  /** 样式 */
  style: string;
  /** 静载 */
  staticLoad: string;
  /** 动载 */
  dynamicLoad: string;
  /** 超载 */
  overload: string;
  /** 备注 */
  remark: string | null;
  /** 状态 */
  status: WantOrderStatusEnum;
  /** 价格 */
  price: number;
  /** 采购类型 */
  purchaseType: string;
  /** 创建时间 */
  crtTime: string;
};

export type TMegListItem = {
  /** 消息编号 */
  messageNo: string;
  /** 通知类别 */
  category: MsgTypeEnum;
  /** 通知标题 */
  title: string;
  /** 通知内容 */
  content: string;
  /** 发送者 */
  sender: string;
  /** 接收者 */
  receiver: string;
  /** 阅读状态 0未读 1已读*/
  readStatus: 0 | 1;
  /** 发送时间 */
  sendTime: string;
  /** 扩展数据 */
  extData: TMsgOrderInfo;
};
export type TMsgOrderInfo = {
  /** 订单号 */
  orderNo: string;
  /** 订单日期 */
  orderDate: string;
  /** 订单消息类型 */
  orderMsgType: PurchaseTypeEnum;
  /** 跳转链接 */
  jumpUrl: string;
  /** 产品名称 */
  productName: string;
  /** 数量 */
  quantity: number;
  /** 尺寸 */
  size: string;
  /** 样式 */
  style: string;
};
/**
 *  更新消息状态的参数类型
 */
export type TUpdateMsgStatusPrams = { messageNo: string; messageType: 'todo-message' | 'message' };

// 定义消息待办项的接口
export interface TMsgToDoListItem {
  /** 类别，可能用于区分不同类型的消息 */
  category: string;

  /** 消息内容，描述具体的待办事项 */
  content: string;

  /** 创建者的标识，通常是用户ID */
  creator: string;

  /** 创建时间，表示消息创建的时间 */
  crtTime: string;

  /** 删除标志，指示消息是否已被删除 */
  deleted: boolean;

  /** 截止时间，指示任务的到期时间 */
  dueTime: string;

  /** 唯一标识符，标识每个消息的唯一ID */
  id: number;

  /** 消息编号，可能用于消息的唯一追踪 */
  messageNo: string;

  /** 操作员，通常是执行操作的用户ID */
  operator: string;

  /** 订单编号，关联的订单的唯一标识 */
  orderNo: string;

  /** 优先级，指示任务的优先级别 */
  priority: number;

  /** 接收者的标识，通常是用户ID */
  receiver: string;

  /** 发送者的标识，通常是用户ID */
  sender: string;

  /** 状态码，是否已完成 */
  status: 0 | 1;
  /**
   * 阅读状态（0：未读，1：已读）
   */
  readStatus: 0 | 1;
  /** 标题，简要描述消息的内容或主题 */
  title: string;

  /** 更新时间，指示消息最后更新的时间 */
  uptTime: string;

  /** 扩展数据 */
  extData: TMsgOrderInfo;
}

export type TBranchOpenReq = {
  /** 网点名称 */
  branchName: string;
  /** 联系人 */
  contactName: string;
  /** 联系电话 */
  contactPhone?: string;
  /** 省 */
  province: string;
  /** 市 */
  city: string;
  /** 区 */
  district: string;
  /** 省编码 */
  provinceCode: string;
  /** 市编码 */
  cityCode: string;
  /** 区编码 */
  distCode: string;
  /** 地址 */
  address: string;
  /** 银行账户名 */
  bankAccountName: string;
  /** 银行账号 */
  bankAccountNo: string;
  /** 银行名称 */
  bankName: string;
  bankCode: string;
  /** 发票抬头 */
  invoiceTitle: string;
  /** 营业执照 */
  creditCode: string;
  /** 法人身份证号码*/
  idNumber: string;
};

export type TGetUsesrInfoRes = {
  /** 会员编号 */
  memberNo: string;
  /** 会员名称 */
  memberName: string;
  /** 昵称 */
  nickname: string;
  /** 头像地址 */
  avatarUrl: string;
  /** 性
   * 0-未知
   * 1-男
   * 2-女
   * 3-保密
   * */
  gender: '0' | '1' | '2' | '3';
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 会员类型
   * 00-网点会员
   * 01-普通会员
   * */
  memberType: MemberTypeEnum;
  /** 会员等级 */
  level: string;
  /** 积分 */
  points: string;
  /** 状态
   * 1-有效
   * 0-无效
   * */
  status: string;
  /** 生日 */
  birthdate: string;
  /** 网点编号 */
  branchNo: string;
};

// 提交订单接口
export type TSubmitOrderReq = {
  productCode: string;
  /** 商品SKU编码 */
  skuCode: string;
  /** 购买或租赁的数量 */
  quantity: number;
  /** 支付方式 */
  payMethod: PayMethodEnum;
  /** 订单备注 */
  remark?: string;
  /** 配送方式 */
  distributionType: DeliveryTypeEnum;

  /** 该笔订单开发票时使用的会员发票编号 */
  invoiceId?: string;
  /** 该笔订单使用的会员地址编号 */
  memberAddrNo?: string;
  /** 租赁天数，动租和静租订单使用 */
  rentDays?: number;
  /** 订单总金额，单位元，精确到分 */
  // totalAmount: string;
  /** 订单类型 */
  /** 配送费，单位元，精确到分 */
  // distributionAmount: string;
  orderType: ProductBizTypeEnum;
  /** 合同主体 */
  esaNo?: string;
  /** 归还日期 */
  returnCityCode?: string;
  /** 租赁开始时间 */
  rentStartDate?: string;
  /** 合同签约方式 */
  contractType?: ContractTypeEnum;
};

export type TOrderContractListReq = {
  orderNo?: string;
  orderSource?: string;
  orderType?: ProductBizTypeEnum;
};

export type TOrderContractListRes = {
  /** 合同编号 */
  contractNo: string;
  /** 合同标题 */
  contractTitle: string;
  /** 签约时间 */
  signDate: string;
  /** 金额 */
  amount: number;
  /** 状态 */
  status: string;
  /** 下载地址 */
  downloadUrl: string;
  /** 备注 */
  remark: string;
};

export type TInvoiceListRes = {
  /** 发票类型 */
  invoiceType: InvoiceTypeEnum;
  /** 抬头类型 */
  titleType: TitleTypeEnum;
  /** 抬头名称 */
  titleName: string;
  /** 纳税人识别号 */
  taxpayerId: string;
  /** 注册地址 */
  address: string;
  /** 注册邮箱 */
  email: string;
  /** 注册电话 */
  phone: string;
  /** 开户银行 */
  bankName: string;
  /** 银行账号 */
  bankAccount: string;
  /** 发票ID */
  invoiceId?: string;
};

export type TInvoiceOrderListReq = {
  orderNo?: string;
  orderSource?: string;
  orderType?: ProductBizTypeEnum;
};

export type TInvoiceOrderListRes = {
  /** 发票类型 */
  invoiceType: InvoiceTypeEnum;
  /** 抬头类型 */
  titleType: TitleTypeEnum;
  /** 抬头名称 */
  titleName: string;
  /** 纳税人识别号 */
  taxpayerId: string;
  /** 注册地址 */
  address: string;
  /** 注册邮箱 */
  email: string;
  /** 注册电话 */
  phone: string;
  /** 开户银行 */
  bankName: string;
  /** 银行账号 */
  bankAccount: string;
  /** 发票ID */
  invoiceId?: string;
  /** 发票金额 */
  amount: number;
  /** 创建方式 */
  creator: string;
  operator: string;
  /** 创建时间 */
  crtTime: string;
  /** 是否删除 */
  deleted: boolean;
  /** id */
  id: number;
  /** 发票编号 */
  invoiceNo: string;

  downloadUrl?: string;
  /** 订单编号 */
  orderNo: string;
  /** 订单状态 */
  status: string;
  /** 税额 */
  taxAmount: number;
  /** 税率 */
  taxRate: number;
  /** 更新时间 */
  uptTime: string;
};

export type TOrderListReq = {
  /**订单号 */
  orderNo?: string;
  /**订单状态 */
  orderStatus?: OrderStatusEnum;
  /**订单类型 */
  orderType?: ProductBizTypeEnum;
  /**订单来源 */
  orderSource?: '00' | '01';
  /**是否是网点订单 */
  branchOrderFlag?: boolean;
  // /**订单创建时间 */
  // createTime?: string;
  // /**订单结束时间 */
  // endTime?: string;
};

export enum PayStatusEnum {
  /** 未支付 */
  UNPAID = '00',
  /** 待支付 */
  PAID = '20',
  /** 支付中 */
  REFUNDED = '21',
  /** 已支付 */
  PAYED = '22',
  /** 支付失败 */
  PAY_FAILED = '23',
}

export type TOrderListRes = {
  /** 订单号 */
  orderNo: string;
  /** 归还倒计时 */
  remainingDays?: number;
  /** 会员编号 */
  memberNo: string;
  /** 会员名称 */
  memberName: string;
  /** 产品名称 */
  productName: string;

  /**订单类型 */
  // orderTupe：ProductBizTypeEnum;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 支付方式 */
  payMethod: PayMethodEnum;
  /** 发票状态 0未开具 1 已开具 */
  invoiceStatus: '0' | '1';
  /** 合同状态 0未开具 1 签约成功 */
  contractStatus: '0' | '1';
  /** 支付状态 */
  payStatus: PayStatusEnum;
  /** 订单类型 */
  orderType: ProductBizTypeEnum;
  /** 数量 */
  quantity: number;
  /** 订单总金额 */
  totalAmount: number;
  /** 支付押金 */
  payDeposit: number;
  /** 支付押金比例 */
  payDepositRate: number;
  /** 折扣金额 */
  discountAmount: number;
  /** 合同编号 */
  contractNo: string;

  /**合同签约方式 */
  contractType: ContractTypeEnum;

  /** 发票编号 */
  invoiceNo: string;
  /** 合同标题 */
  contractTitle: string;
  /** 订单状态 */
  status: OrderStatusEnum;
  /** 备注 */
  remark: string;
  /** sku编码 */
  skuCode: string;
  /** 租赁开始时间 */
  rentStartDate: string;
  /** 租赁结束时间 */
  rentEndDate: string;
  /** 租赁天数 */
  rentDays: number;
  /** 单价 */
  price: number;
  /** 已归还数量 */
  returnedQuantity: number;
  /** 待归还数量 */
  pendingReturnQuantity: number;
  /** 待归还金额 */
  pendingReturnAmount: number;
  /** 订单来源 */
  orderSource: '00' | '01'; // 00-平台 01- 网点
  /** 父订单号 */
  parentOrderNo: string;
  /** 网点编号 */
  branchNo: string;
  /** 网点名称 */
  branchName: string;
  /** 配送方式 */
  shippingMethod: DeliveryTypeEnum;
  /** 物流号 */
  logisticsNumber: string;
  /** 租赁物流号 */
  rentLogisticsNumber: string;
  /**提货地址 */
  pickupAddress?: string;
  /** 收件人 */
  recipientName: string;
  /** 收件人电话 */
  recipientPhone: string;
  /** 省 */
  provinceName: string;
  /** 市 */
  cityCode: string;
  /** 市 */
  cityName: string;
  /** 区 */
  districtName: string;
  /** 收件地址 */
  receiverAddress: string;
  /** 破损违约金 */
  damagePenaltyAmount?: number;
  /** 延迟违约金 */
  delayAmount?: number;
  /** 运费 */
  freightAmount: number;
  /** 是否可以续约 （租期结束30天前会显示）*/
  renewalFlag: boolean;
  /** 创建时间 */
  crtTime: string;
  /** 签约时间 */
  signDate: string;
  /**关闭时间 */
  completionDate: string;
  /**取消时间 */
  cancelDate: string;
  /**归还时间 */
  returnDate: string;
  /**e签宝流程id */
  fowId: string;
  /**e签宝 用户id */
  accountId: string;

  /**支付編號 */
  payNo?: string;
  /**支付渠道 */
  payModel?: PayEnum;

  dataJson: {
    productBaseInfoDTO: TProductBaseInfoDTO;
    productTags: Array<{ tagName: string }>;
    priceDetails: Array<{
      startDay: number;
      endDay: number;
      costPrice: number;
      platPrice: number;
      salePrice: number;
    }>;
  };
  orderLogisticsDTO: TOrderLogisticsDTO;
};

// const orderLogisticsDTO = {
//   "logisticsCompany":"物流公司名称",
//   "logisticsNumber":"物流号码",
//   "shippingAddress":"地址",
//   "shippingMethod":"01",// 配送
//   "shippingStatus":"1",//1-待发货 2-已发货 3-运输中 4-派送中 5-已签收
//   "driverName":"司机姓名",
//     "driverPhone":"司机手机号",
//         "freightAmount":100,
//   }

export type TOrderLogisticsDTO = {
  /** 物流公司名称 */
  logisticsCompany: string;
  /** 物流号码 */
  logisticsNumber: string;
  /** 地址 */
  shippingAddress: string;
  /** 配送 */
  shippingMethod: DeliveryTypeEnum;
  /** 1-待发货 2-已发货 3-运输中 4-派送中 5-已签收 */
  shippingStatus: ShippingStatusEnum;
  /** 司机姓名 */
  driverName: string;
  /** 司机手机号 */
  driverPhone: string;
  /** 运费 */
  freightAmount: number;
};

export type TProductBaseInfoDTO = {
  /** 产品编码 */
  productCode: string;
  /** 产品名称 */
  productName: string;
  /** 产品业务类型 */
  productBizType: string;
  /** 主标题 */
  mainTitle: string;
  /** 图片URL */
  imgUrl: string;
  /** 押金 */
  deposit: number;
  /** 销售押金比例 */
  saleDepositRate: number;
  /** 租赁最短天数 */
  rentalMinDays: number;
  /** 租赁最小数量 */
  rentalMinQuantity: number;
  /** 销售最小数量 */
  saleMinQuantity: number;
  /** 产品尺寸 */
  productSize: string;
  /** 产品风格 */
  productStyle: string;
  /** 产品颜色 */
  color: string;
};

export type TOrderCancelReq = {
  orderNo: string;
  reason?: string;
};

export type TPublishWantReq = {
  /** 产品名称 */
  productName: string;

  /** 产品所属类别名称 */
  categoryName: string;

  /** 产品类别代码 */
  // categoryCode: ProductCateEnum;
  categoryCode: string;

  /** 产品网页的 URL */
  productUrl: string;

  /** 产品的风格或设计 */
  style: string;

  /** 产品的尺寸规格 */
  size: string;

  /** 希望的产品数量 */
  quantity: number;

  /** 联系电话 */
  contactPhone: string;

  /** 联系人姓名 */
  contactName: string;

  /** 产品的静载能力 */
  staticLoad: string;
  /** 产品的动载能力 */
  dynamicLoad: string;
  /** 产品的载重 */
  overload: string;

  /** 产品价格 */
  price: number;

  /** 额外的备注或说明 */
  remark: string;

  /** 采购类型，由枚举定义 */
  purchaseType: PurchaseTypeEnum;
};

export type TBuyMostBranchRes = {
  /**网点编号 */
  branchNo: string;
  /**网点名称 */
  branchName: string;
  /**省 */
  province: string;
  /**城市 */
  city: string;
  /**地区 */
  district: string;
  /**详细地址 */
  address: string;
};

export type TOrderDetailRes = {
  mallOrderInvoice: TInvoiceOrderListRes;
  memberOrderAddress: TMemberAddressesItem;
  /** 订单编号 */
  orderNo: string;
  /** 订单类型 */
  orderType: ProductBizTypeEnum;
  /**产品名称 */
  productName: string;
  /** 交易数量 */
  quantity: number;
  /**b备注 */
  remark: string;
  /** 租借天数 */
  rentDays: number;
  /**租借金额 */
  rentPrice: number;
  /**配送方式 */
  shippingMethod: DeliveryTypeEnum;
  /**订单状态 */
  status: OrderStatusEnum;
  /**订单总金额 */
  totalAmount: number;
  /** 0201-动租续租 0101-静租续租 */
  orderSubType: '0101' | '0201';
};

export type TCalcPriceReq = {
  skuCode: string;
  productCode: string;
  /** 产品数量 */
  quantity: number;
  rentalDays?: number;
  productBizType: ProductBizTypeEnum;
};

/**
 * 添加产品的参数类型
 */
export type TProductAddReq = {
  productCode?: string;
  /**仓库编号 */
  warehouseNo: string;

  /** 产品名称 */
  productName: string;
  /** 产品图片 URL 列表 */
  imageUrls: string[];
  /** 产品类别编码 */
  categoryCode: ProductCateEnum;
  /** 产品业务类型 */
  productBizType: ProductBizTypeEnum;
  /** 产品类型（可选） */
  productType?: string;
  /** 产品副标题 */
  subTitle: string;
  /** 产品数量 */
  quantity: number | string;
  /** 产品属性模型 */
  attributeModelDTO: {
    /** 颜色  */
    color: string;
    /** 尺寸  */
    size: string;
    /** 风格  */
    style: string;
    /** 静载  */
    staticLoad: string;
    /** 动载  */
    dynamicLoad: string;
    /** 超载  */
    overload: string;
    /** 死载  */
    deadLoad: string;
    /** 钢管数量  */
    steelPipeNum: number;
    /** 材质类型  */
    materialType: string;
  };
  /** 价格详情列表 */
  priceDetails: {
    /** 开始日期  */
    startDay?: number;
    /** 结束日期  */
    endDay?: number;
    /** 成本价  */
    costPrice?: number;
    /** 平台价  */
    platPrice?: number;
    /** 销售价  */
    salePrice?: number;
  }[];
  /** 前端定义的价格 方便存储 */
  price: number;
  /**出售价格 */
  compensationPrice?: number;
};

/** 主体信息  */
export type TEASListRes = {
  /**主体信息类型 */
  type: TitleTypeEnum;
  /**企业名称 */
  entName?: string;
  /**企业地址 */
  entAddress?: string;
  /**统一社会信用代码 */
  creditCode?: string;
  /**法人姓名 */
  legalPersonName?: string;
  /**法人身份证号 */
  legalPersonIdNumber?: string;
  /**代理人姓名 */
  agentName: string;
  /**代理人手机号 */
  agentPhone: string;
  /**代理人证件号 */
  // agentNumber: string;

  esaNo?: string;
  email?: string;
};

export type TConfirmPayReq = {
  /**订单号 */
  orderNo: string;
  /**支付凭证  网点调用是选填*/
  payVoucherUrl?: string;
  /**支付方式  00-用户支付定金,01-用户支付尾款
   */
  payType: ConfirmPayTypeEnum;
};

/**仓库item */
export type TWarehouseItem = {
  /** 仓库编号 */
  warehouseNo: string;
  /** 仓库名称 */
  warehouseName: string;
  /** 省份 */
  province: string;
  /** 城市 */
  city: string;
  /** 区 */
  district: string;
  /** 省份编码 */
  provinceCode: string;
  /** 城市编码 */
  cityCode: string;
  /** 区编码 */
  distCode: string;
  /** 详细地址 */
  address: string;
};
