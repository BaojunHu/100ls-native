<template>
	<view class="_showModal" v-show="show">
			<view class="_shade"></view>
			<view class="_modalBox">
				<view class="_modal">
					<slot name="title">
						<view class="title" v-show="title">{{title}}</view>
					</slot>
					<slot name="content">
						<view class="content">{{content}}</view>
					</slot>
					<slot name="btn">
						<view class="btnbox">
							<view class="btn" v-if="showCancel" :style="{color:cancelColor,background:cancelBackgroundColor}" @click.stop="clickBtn('cancel')">{{cancelText}}</view>
							<view class="btn" :style="{color:confirmColor,background:confirmBackgroundColor}" @click.stop="clickBtn('confirm')">{{confirmText}}</view>
						</view>
					</slot>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		name:"show-modal",
		computed: {
				show(){
					return this.$modalStore.state.show;
				},
				title(){
					return this.$modalStore.state.title;
				},
				content(){
					return this.$modalStore.state.content;
				},
				showCancel(){
					
					return this.$modalStore.state.showCancel;
				},
				cancelText(){
					return this.$modalStore.state.cancelText;
				},
				cancelColor(){
					return this.$modalStore.state.cancelColor;
				},
				cancelBackgroundColor(){
					return this.$modalStore.state.cancelBackgroundColor;
				},
				confirmText(){
					return this.$modalStore.state.confirmText;
				},
				confirmColor(){
					return this.$modalStore.state.confirmColor;
				},
				confirmBackgroundColor(){
					return this.$modalStore.state.confirmBackgroundColor;
				}
		},
		methods:{
			closeModal(){
				this.$modalStore.commit('hideModal')
			},
			clickBtn(res){
				this.$modalStore.commit('hideModal')
				this.$modalStore.commit('success',res)
			}
		},
		beforeDestroy(){
			this.$modalStore.commit('hideModal')
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
._showModal{
		position: fixed;
		top: 0;
		left:0;
		width: 100%;
		height: 100%;
		z-index:10000;
		._shade{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: #000;
			opacity: .6;
			z-index:11000;
		}
		._modalBox{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index:12000;
			display: flex;
			justify-content: center;
			align-items: center;
			._modal{
				flex: none;
				width:520rpx;
				min-height:350rpx;
				background: #fff;
				border-radius: 16rpx;
				.title{
					text-align: center;
					font-size: 32rpx;
					
					font-weight: bold;
					color: var(--v-color-grey-9);
					margin-top: 20rpx;
				}
				.content{
					min-height: 148rpx;
					width: 86%;
					margin:20rpx auto;
					font-size: 28rpx;
					
					font-weight: 500;
					color: var(--v-color-grey-9);
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
				}
				.btnbox{
					display: flex;
					width: 88%;
					margin: auto;
					margin-bottom: 20rpx;
					flex-direction: row;
					justify-content: space-between;
					gap: 32rpx;
					.btn{
						width: 100rpx;
						flex: 1 1 100%;
						height: 64rpx;
						border-radius: 32rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						
						font-weight: 400;
						font-size: 24rpx;
					}
				}
			}
		}
		
}
</style>
