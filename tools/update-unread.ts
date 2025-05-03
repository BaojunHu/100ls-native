import { messageServices } from '@/service/message';
import { useMRequest } from './use-request';

// const { data: unreadMsg } =

useMRequest(
  () => {
    if (!uni.getStorageSync('authToken')) {
      return Promise.resolve(
        [] as {
          unreadCount: number;
        }[],
      );
    }

    if (!uni.getStorageSync('authToken')) {
      return Promise.resolve([] as { unreadCount: number }[]);
    }

    return Promise.all([
      messageServices.unreadCount({
        messageType: 'message',
      }),
      messageServices.unreadCount({
        messageType: 'todo-message',
      }),
    ]).then((res) => {
      const data = {
        todoMsgNum: res?.[1]?.unreadCount,
        msgNum: res?.[0]?.unreadCount,
      };
      uni.setStorageSync('unreadMsg', data);

      return res;
    });
  },
  {
    pollingInterval: 3000,
    pollingErrorRetryCount: 2,
    showErrorMessage: false,
    // pollingWhenHidden:false
  },
);

// export const updateUnreadMsg = () => {
//   const data = {
//     todoMsgNum: unreadMsg.value?.[1]?.unreadCount,
//     msgNum: unreadMsg.value?.[0]?.unreadCount,
//   };
//   uni.setStorageSync('unreadMsg', data);
//   // uni.$emit(GlobalMsgEventName, data);
// };
