<template>
  <!-- 自定义头部 -->
  <view class="sp-header" :class="[position]">
    <view :class="['status-bar', statusBarBg]" :style="{ height: statusBarHeight + 'px' }"><!-- 这里是状态栏 --></view>
    <slot></slot>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from '@src/store'

export default defineComponent({
  name: 'SpHeader',
  props: {
    position: {
      type: String,
      default: 'fixed',
      validator: function (val) {
        return val === 'fixed' || val === 'relative'
      }
    },
    statusBarBg: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      statusBarHeight: computed(() => store.state.statusBarHeight)
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
