<template>

    <div class="layout-page speak-page" v-show="props.show" :style="{
        '--bg-img': `url(${list?.rows[current].coverImage})`,
    }">
        <m-navbar class="layout-auto"> </m-navbar>
        <!--  -->
        <swiper class="full-swiper" :vertical="true" @change="onSwiperChange" :next-margin="offsetBottom">
            <swiper-item class="full-swiper-item" v-for="(item, index) in list?.rows" :key="index">
                <view class="swiper-item ">

                    <view class="speak-item__img-warp">

                        <image :src="item.coverImage" mode="aspectFill" class="speak-item__img" />
                        <view class="speak-item__img-mask">
                            <m-text bold :size="42" color="blue-grey-1" multipleLines>{{ item.titleEN }}</m-text>
                            <m-text :size="24" color="blue-grey-1" class="mt-24" multipleLines>{{ item.titleCN
                                }}</m-text>
                            <view class="flex-between mt-50">
                                <m-text :size="24" color="blue-grey-1" multipleLines># {{ item.tags.join('、')
                                    }}</m-text>
                                <view class="speak-btn">
                                    <m-icon type="icon-shengyin" color="grey-1" size="32" />
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="flex al-c mt-20 w-full">
                        <m-button type="primary" circle>
                            跟读 · {{ item.learnNumber }}人
                        </m-button>
                        <div class="flex al-c js-e flex-1 mr-56">
                            <image :src="FlowReadImg" style="width: 36rpx;height:36rpx;" class="mr-4"></image>
                            <m-text :size="24" color="grey-1">跟读辑</m-text>
                        </div>

                        <div class="flex al-c mr-24">
                            <m-icon type="icon-fenxiang" color="grey-1" class="mr-4" :size="24"></m-icon>
                            <m-text :size="24" color="grey-1">分享</m-text>
                        </div>
                    </view>

                </view>
            </swiper-item>
        </swiper>
    </div>
    <m-modal />
</template>
<script setup lang="ts">
import { homeServices } from '@/services/home';
import { getCurrentInstance, ref, watch } from 'vue';
import { useMRequest } from '@/tools/use-request';
//@ts-ignore
import FlowReadImg from './flow-read.png';
import { onShow } from '@dcloudio/uni-app';
import { navigateTo } from '@/router/main';
import { RouterEnum } from '@/router/constants';

type TPageProps = {
    show: boolean
}
const props = withDefaults(defineProps<TPageProps>(), {
    show: false,
});

const isTriggerAuthError = ref(false);

const { data: list, runAsync: requestList } = useMRequest(homeServices.followSentenceList, {
    manual: true,
    showErrorMessage: false,
    onError: (err: any) => {
        if (err.code == 410) {
            console.log();

            // 如果第一次进来 但是没登录 则自动跳转登录页
            if (!isTriggerAuthError.value) {
                navigateTo({
                    path: RouterEnum.Login
                })
                isTriggerAuthError.value = true;
            } else {
                // 如果是登录后跳转过来 但是没有登录 则弹出登录提示
                showLoginModal({
                    onCancel() {
                        backVideoList();
                        isTriggerAuthError.value = false;
                    }
                });
            }

        }
    },
    onSuccess: (res) => {
        if (!res?.rows?.length) {
            PageInstance.proxy.$showModal({
                title: '提示',
                content: '来到了知识的荒漠，快去看看别的吧~',
                confirmText: '返回',
                showCancel: false,
                success: (res) => {
                    if (res.confirm) {
                        backVideoList();
                    }
                }
            })
        }

    }
});


const pxToRpx = (px: number) => {
    const screenWidth = uni.getSystemInfoSync().screenWidth
    return (750 * Number.parseInt(px.toString())) / screenWidth
}

const winHeight = uni.getSystemInfoSync().screenHeight;
const winHeightRPX = pxToRpx(winHeight);
const offsetBottom = parseInt((winHeightRPX - 200 - 964).toString()) + 'rpx';

const PageInstance = getCurrentInstance();

const showLoginModal = (config: {
    onCancel?: () => void
    onConfirm?: () => void
}) => {
    PageInstance.proxy.$showModal({
        title: '提示',
        content: '访问【一句跟读】，需要您先完成登录。',
        confirmText: '去登录',
        cancelText: '再逛逛',
        success: (res) => {
            if (res.confirm) {
                navigateTo({
                    path: RouterEnum.Login
                });
            } else {
                config?.onCancel?.();
            }
        }
    });
}



watch(() => props.show, (newVal) => {
    
    if (newVal && !list.value) {
        requestList({
            pageNo: 1,
            pageSize: 10,
        })
    }
});
onShow(() => {
    if (props.show && !list.value) {
        requestList({
            pageNo: 1,
            pageSize: 10,
        })
    }
});



const emit = defineEmits(['changeTab']);
const backVideoList = () => {
    emit('changeTab', {
        index: 0,
    });
}




const current = ref(0);
const onSwiperChange = (e: any) => {
    const { current } = e.detail;
    console.log('onSwiperChange', current);
    current.value = current;
    // uni.showToast({
    //     title: `当前索引：${current}`,
    //     icon: 'none',
    // });
};


</script>

<style lang="less" scoped>
.speak-page {


    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: var(--bg-img);
        background-size: cover;
        background-position: center;
        filter: blur(40rpx);
    }
}


.full-swiper {
    flex: 1;
    height: 100%;
    width: 100%;
    margin-top: 24rpx;
    z-index: 99;
}

.full-swiper-item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 30rpx;
    color: #000;
}

.swiper-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    color: #000;
}

::v-deep .speak-item__img-warp {
    width: 670rpx;
    height: 880rpx;

    border-radius: 14rpx;
    position: relative;


}

.speak-item__img {
    width: 100%;
    height: 100%;
    border-radius: 14rpx;
}

.speak-item__img-mask {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32rpx 40rpx;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
    border-radius: 14rpx;
}

.speak-btn {
    width: 104rpx;
    height: 48rpx;
    background: #727B88;
    border-radius: 35rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>