import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $modalStore: Store<any>;
    $showModal: (option: {
      title: string;
      content: string;
      showCancel?: boolean;
      cancelText?: string;
      confirmText?: string;
      success?: (res: { confirm: boolean; cancel: boolean }) => void;
    }) => void;
  }
}

// 圖片png jpeg 
declare module "*.jpg";
declare module "*.jpeg";

declare module '*.png' {
  const value: string;
  export default value;
}