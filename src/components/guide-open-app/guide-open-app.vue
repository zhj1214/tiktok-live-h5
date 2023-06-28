<template>
  <view class="guide-open-app" v-if="isShow">
    <view class="content">
      <view class="content-item">
        1.点击右上角
        <image class="content-item-icon" :src="guideIcon1"></image>
      </view>
      <view class="content-item"> 2.在默认浏览器打开 </view>
      <view class="content-item">
        <image class="content-item-icon2" :src="guideIcon2"></image>
      </view>
      <view class="content-item"> 3.点击APP内打开 </view>
      <view class="content-item">
        <image class="content-item-icon2" :src="guideIcon3"></image>
      </view>
      <view @click="close" class="content-item-btn"> 我知道了 </view>
      <image class="icon" :src="iconguide"></image>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
const gdp = inject('$gdp') as GeneratorDynamicPicFunc<string[]>
const [guideIcon1, guideIcon2, guideIcon3, iconguide] = gdp(['guide-icon1.png', 'guide-icon2.png', 'guide-icon3.png', 'icon-guide.png'])
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})
const isShow = ref(false)
watch(
  () => props.value,
  (newVal) => {
    isShow.value = newVal
  },
  {
    deep: true,
    immediate: true
  }
)
const emit = defineEmits(['getValue'])
const close = () => {
  isShow.value = false
  emit('getValue', isShow.value)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
