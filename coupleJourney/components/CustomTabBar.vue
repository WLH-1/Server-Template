<template>
  <transition :name="transitionName">
    <view 
      v-show="isVisible"
      class="custom-tabbar"
      :class="{ 'dark-mode': isDarkMode }"
      :style="{ borderRadius: `${radius}px` }"
    >
      <!-- TabBar 内容 -->
      <view 
        v-for="(item, index) in tabList" 
        :key="index"
        class="tab-item"
        @click="switchTab(index)"
      >
        <image :src="currentIndex === index ? item.selectedIcon : item.icon" />
        <text>{{ item.text }}</text>
      </view>
    </view>
  </transition>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'

export default {
  props: {
    tabList: {
      type: Array as () => Array<{
        text: string
        icon: string
        selectedIcon: string
        pagePath: string
      }>,
      required: true
    },
    radius: {
      type: Number,
      default: 12
    }
  },

  setup(props) {
    const currentIndex = ref(0)
    const isVisible = ref(true)
    const lastScrollTop = ref(0)
    const transitionName = ref('slide-up')

    // 系统暗黑模式检测
    const isDarkMode = computed(() => {
      return uni.getSystemInfoSync().theme === 'dark'
    })

    // 页面滚动监听
    onPageScroll((e) => {
      const scrollTop = e.scrollTop
      if (scrollTop > lastScrollTop.value && scrollTop > 50) {
        // 向下滑动隐藏
        if (isVisible.value) {
          transitionName.value = 'slide-down'
          isVisible.value = false
        }
      } else if (scrollTop < lastScrollTop.value) {
        // 向上滑动显示
        if (!isVisible.value) {
          transitionName.value = 'slide-up'
          isVisible.value = true
        }
      }
      lastScrollTop.value = scrollTop
    })

    // 切换Tab
    const switchTab = (index: number) => {
      currentIndex.value = index
      uni.switchTab({
        url: props.tabList[index].pagePath
      })
      // 点击时确保TabBar显示
      isVisible.value = true
    }

    return {
      currentIndex,
      isVisible,
      isDarkMode,
      transitionName,
      switchTab
    }
  }
}
</script>

<style lang="scss">
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 10px;
  right: 10px;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  
  &.dark-mode {
    background-color: #1a1a1a;
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    image {
      width: 24px;
      height: 24px;
    }
    
    text {
      font-size: 10px;
      margin-top: 2px;
    }
  }
}

/* 动画效果 */
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(100%);
}
</style>