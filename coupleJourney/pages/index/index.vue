<template>
  <view class="container">
    <view class="content">
      <image v-if="showLogo" class="logo" src="/static/logo.png"></image>
      <view class="text-area">
        <text class="title">{{title}}</text>
      </view>
    </view>
    <!-- 添加自定义TabBar -->
    <CustomTabBar />
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      showLogo: true
    }
  },
  onLoad() {
    // 检查是否在TabBar页面
    if (this.$mp.page.route === 'pages/index/index') {
      this.showLogo = true
    }
  }
}
</script>

<style>
.container {
  padding-bottom: 60px; /* 给TabBar留出空间 */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>