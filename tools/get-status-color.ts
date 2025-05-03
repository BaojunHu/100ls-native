import { OrderStatusEnum } from '@/type/contanst';

export const getStatusColor = (status: OrderStatusEnum) => {
  switch (status) {
    case OrderStatusEnum.WAIT_PAYMENT_DEPOSIT:
    case OrderStatusEnum.WAIT_PAYMENT_FINAL:
    case OrderStatusEnum.WAIT_PAYMENT_RENEWAL:
      return 'error-7';
    case OrderStatusEnum.COMPLETED:
      return 'grey-9';
    case OrderStatusEnum.CANCELED:
      return 'grey-7';
    default:
      return 'zlv-7';
  }
};
