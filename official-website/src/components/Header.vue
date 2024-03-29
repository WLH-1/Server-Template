<template>
  <!-- 头部整体盒子 -->
  <div id="header" class="container-fuild">
    <!-- 头部顶部 -->
    <!-- <div class="header-top container-fuild hidden-xs">
      <div class="container">
        <div class="server pull-left">
          <span class="glyphicon glyphicon-earphone"></span>888-888-888
          <span class="glyphicon glyphicon-envelope"></span>xxx@163.com
          <span class="glyphicon glyphicon-time"></span>7x24小时为您服务
        </div>
        <div class="shejiao pull-right">
          <span class="glyphicon glyphicon-hand-right"></span>赶快联系我们吧！
          <span class="glyphicon glyphicon-hand-left"></span>
        </div>
      </div>
    </div> -->
    <!-- 电脑导航 -->
    <div class="header-nav container hidden-xs">
      <!-- 导航logo -->
      <div class="header-nav-logo">
        <router-link :to="'/'">
          <img src="@/assets/img/qilin_logo.png" @click="toHome">
        </router-link>
      </div>
      <!-- 导航内容 -->
      <ul class="header-nav-wrapper">
        <li v-for="(item, index) in navList" :key="index" :class="index == navIndex ? 'active' : ''"
          @click="navClick(index, item.name)">
          <router-link :to="item.path">
            {{ item.name }}
            <span v-if="item.children.length > 0" class="glyphicon glyphicon-chevron-up"></span>
            <i class="underline"></i>
          </router-link>
          <dl v-if="item.children.length > 0">
              <dt v-for="(i, n) in item.children" :key="n">
                <router-link :to="i.path">{{ i.name }}</router-link>
              </dt>
          </dl>
        </li>
      </ul>
    </div>
    <!-- 手机导航 -->
    <div class="header-nav-m container-fuild visible-xs">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 30px;">
        <div class="header-nav-m-logo" >
          <router-link :to="'/'">
          <img class="center-block" src="@/assets/img/qilin_logo.png" alt="logo" @click="toHome">
          </router-link>
        </div>
        <div data-toggle="collapse" data-target="#menu" @click="menuClick">
            <span :class="menuClass"></span>
        </div>
      </div>
      <!-- 导航栏 -->
      <div class="header-nav-m-menu text-center">
        <!-- 导航内容 -->
        <ul id="menu" class="header-nav-m-wrapper collapse">
          <li v-for="(item, index) in navList" :key="index" :class="index == navIndex ? 'active' : ''"
            @click="navClick(index, item.name)" data-toggle="collapse" data-target="#menu">
            <router-link :to="item.path">
              {{ item.name }}
              <i class="underline"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapState
} from "vuex"
export default {
  name: "Header",
  data() {
    return {
      navIndex: sessionStorage.getItem('navIndex') ? sessionStorage.getItem('navIndex') : 0,
      menuClass: "glyphicon glyphicon-align-justify",
      navList: [
        {
          name: "首页",
          path: "/",
          children: []
        },
        {
          name: "组学服务",
          path: "/service",
          children: []
        },
        {
          name: "分子实验",
          path: "/newsinformation",
          children: []
        },
        // {
        //   name: "生信服务",
        //   path: "/newsinformation",
        //   children: []
        // },
        {
          name: "关于我们",
          path: "/companyintroduction",
          children: []
        },
        // {
        //   name: "行业动态",
        //   path: "/newsinformation",
        //   children: []
        // },
      ]
    };
  },
  computed: {
    ...mapState(['scrollType']),
  },
  watch: {
    scrollType(old, val) {
      this.handleScroll(val)
    }
  },
  mounted() {
   
  },
  destroyed() {
  },
  methods: {
    handleScroll(val) {
      // 处理滚动事件
      var contentElement = document.getElementById('header');
      if (val > 0 && document.documentElement.scrollTop != 0 || document.documentElement.scrollTop>0) {
        // 向下滚
        contentElement.style.position = '';
        contentElement.style.padding = '';
      }
      if (val <= 0) {
        // 向上滚
        contentElement.style.position = 'sticky';
        contentElement.style.top = '0';
        contentElement.style.zIndex = '2';
        contentElement.style.left = '0';
        contentElement.style.right = '0';

      }
      // 在这里执行其他操作，根据需要更新页面内容或执行特定的逻辑
    },
    toHome() {
      this.navIndex = 0;
      sessionStorage.setItem('navIndex', 0)
      this.$emit('toTop')
    },
    navClick(index, name) {
      this.menuClick()
      this.navIndex = index;
      sessionStorage.setItem('navIndex', index)
      this.$emit('toTop')
    },
    menuClick() {
      if (this.menuClass == "glyphicon glyphicon-align-justify") {
        this.menuClass = "glyphicon glyphicon-remove";
      } else {
        this.menuClass = "glyphicon glyphicon-align-justify";
      }
    }
  }
};
</script>
<style scoped>
/* 顶部 */
#header {
  background: #f4f4f4;
  transition: all ease 0.6s;
}

#header .header-top {
  height: 50px;
  color: #fff;
  font-size: 12px;
  line-height: 50px;
  background: #474747
}

/* 顶部的图标 */
#header .header-top span {
  margin: 0 8px;
}

/* 导航栏 */
#header .header-nav {
  height: 110px;
}

/* 导航栏logo */
#header .header-nav .header-nav-logo {
  height: 100%;
  float: left;
  position: relative;
}

/* 导航栏logo图片 */
#header .header-nav .header-nav-logo img {
  width: auto;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

/* 导航栏 导航容器 */
#header .header-nav-fixed .header-nav-wrapper {
  line-height: 50px;
}

#header .header-nav .header-nav-wrapper {
  line-height: 110px;
  float: right;
  margin: 0;
  max-width: 800px;
}

/* 导航栏 每个导航 */
#header .header-nav .header-nav-wrapper>li {
  float: left;
  margin: 0 15px;
  position: relative;
}

/* 导航栏 每个导航下面的 a 链接 */
#header .header-nav .header-nav-wrapper>li>a {
  color: #000;
  font-size: 15px;
  font-weight: bold;
  padding: 15px 0;
  position: relative;
}

/* 导航栏 每个导航下面的 a 链接的下划线 */
#header .header-nav .header-nav-wrapper>li>a>i {
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  transition: all 0.6s ease;
  background-color: #1e73be;
}

/* 导航栏 每个导航下面的 a 链接的右侧小三角 */
#header .header-nav .header-nav-wrapper>li>a>span {
  font-size: 12px;
  transition: transform ease 0.5s;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去的样式 */
#header .header-nav .header-nav-wrapper>li>a:hover {
  color: #1e73be;
  text-decoration: none;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去下划线的样式 */
#header .header-nav .header-nav-wrapper>li>a:hover .underline {
  opacity: 1;
  width: 100%;
  left: 0;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去三角标的样式 */
#header .header-nav .header-nav-wrapper>li>a:hover span {
  transform: rotate(180deg);
}

/* 导航栏 每个导航下面的 a 链接 鼠标点击后的样式 */
#header .header-nav .header-nav-wrapper>li.active>a {
  color: #1e73be;
  text-decoration: none;
  border-bottom: 2px solid #1e73be;
}

/* 导航栏 每个导航下面的二级导航容器 */
#header .header-nav .header-nav-wrapper>li>dl {
  display: none;
  position: absolute;
  width: 168px;
  top: 80%;
  left: 0;
  z-index: 999999;
  box-shadow: 0 0 3px 1px #ccc;
  background: #fff;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 */
#header .header-nav .header-nav-wrapper>li>dl>dt {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 当鼠标滑上时的样式*/
#header .header-nav .header-nav-wrapper>li>dl>dt>a:hover {
  text-decoration: none;
}

/* 导航栏 滑上一级导航显示二级导航 */
#header .header-nav .header-nav-wrapper>li:hover dl {
  display: block;
}

#header .header-nav .header-nav-wrapper>li>dl>dt:hover {
  cursor: pointer;
  background: #ccc;
}

@media screen and (min-width: 768px) and (max-width: 996px) {
    #header .header-nav .header-nav-logo img {
    width: auto;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}

@media screen and (max-width: 997px) {
  #header .header-nav-m {
    position: relative;
  }

  /* 导航栏logo容器 */
  #header .header-nav-m .header-nav-m-logo {
    height: 80px;
    position: relative;
  }

  /* 导航栏logo图片 */
  #header .header-nav-m .header-nav-m-logo img {
    width: auto;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  /* 导航栏  菜单容器 */
  #header .header-nav-m .header-nav-m-menu {
    color: #fff;
    font-size: 20px;
    line-height: 50px;
    background: #474747;
    position: relative;
  }

  /* 导航栏 菜单图标 */
  #header .header-nav-m .header-nav-m-menu-wrapper {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -20px;
    width: 50px;
    height: 40px;
    color: #fff;
    z-index: 999999;
    font-size: 12px;
  }

  /* 导航栏 */
  #header .header-nav-m .header-nav-m-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    background: #474747;
    z-index: 9999999;
  }

  /* 导航栏 每个导航 */
  #header .header-nav-m .header-nav-m-wrapper>li {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }

  /* 导航栏 每个导航下面的 a 链接 */
  #header .header-nav-m .header-nav-m-wrapper>li>a {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 15px 0;
    position: relative;
  }

  /* 导航栏 每个导航下面的 a 链接的右侧小三角 */
  #header .header-nav .header-nav-wrapper>li>a>span {
    font-size: 10px;
  }
}</style>
