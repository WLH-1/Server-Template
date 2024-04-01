<template>
  <div id="HomePage">
    <!-- 轮播图 -->
    <div id="swiper" class="container-fuild">
      <div class="swiper-container banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide-title"
            style="display: flex;align-items: center;flex-direction: column;justify-content: center;">
            <h1>{{ swiperList[0].title }}</h1>
            <p>{{ swiperList[0].content }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 关于我们 -->
    <div id="bigData" class="container-fuild">
      <div class="row bigData-container">
        <div class="col-xs-12 col-sm-12 col-md-6 wow zoomIn" style="display: flex;justify-content: center;">
          <img class="img-responsive" style="" src="@/assets/img/home-banner-bg6.png" alt="">
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <h2 class="bigData-title">
            关于我们
            <small>/ About Us</small>
          </h2>
          <div class="bigData-content">成都启林未来科技有限公司, 成立于2021年, 是一家锐意进取的生物科技企业, 专注于运用最前沿的分子生物学检测技术和先进的生物信息分析技术,
            为全球科研机构及企业提供一站式、全方位的生命科学科研解决方案。公司矢志不渝地追求科技创新,
            旨在成为生命科学研究领域以及人类健康事业的卓越贡献者, 提供领先且具有影响力的科技产品与专业服务, 赋能科研进步, 共筑健康未来。</div>
          <a href="/#/companyintroduction" @click="changeNav('关于我们')" class="btn btn-lg btn-block btn-info">了解更多</a>
        </div>
      </div>
    </div>
    <!-- 客户评价 -->
    <div id="customer" class="container-fuild">
      <div class="container customer-container">
        <p class="customer-title text-center">重点产品及服务</p>
        <div class="swiper-container customer-swiper hidden-xs" style="background-color: #FFFFFF;">
          <div class="swiper-wrapper">
            <div class="swiper-slide customer-block" v-for="(item, index) in customerList" :key="index">
              <router-link :to=item.path tag="span">
                <div @click="toServiceDetail(item)">
                  <div class="customer-logo">
                    <img class="center-block" :src="item.logo" alt="logo">
                  </div>
                  <div class="customer-content1 text-center">
                    <div>{{ item.title }}</div>
                  </div>
                  <div class="customer-content2">{{ item.content }}</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="swiper-container visible-xs customer-swiper ">
          <div class="swiper-wrapper">
            <div class="customer-block swiper-slide" v-for="(item, index) in customerList" :key="index">
              <router-link :to=item.path tag="span">
                <div @click="toServiceDetail(item)">

                  <div class="customer-logo">
                    <img class="center-block" :src="item.logo" alt="logo">
                  </div>
                  <div class="customer-content1 text-center">
                    <div>{{ item.title }}</div>
                  </div>
                  <div class="customer-content2">
                    <div>{{ item.content }}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 为什么选择我们 -->
    <div id="whyChooseUs" class="conatiner-fuild center-block">
      <div class="container">
        <div class="whyChooseUs-title text-center">
          <p>文献解读</p>
          <!-- <p>PARTNER</p> -->
        </div>
        <div class="row" style="display: flex; justify-content: center;">
          <div class="col-xs-12 col-md-6 col-md-3 server-wrapper" v-for="(item, index) in industryTrends" :key="index"
            @click="toArticlesAndIndustryUpdates(item.path)">
            <div class="server-block wow slideInUp" onmouseenter="this.style.color='#28f';this.style.borderColor='#28f'"
              onmouseleave="this.style.color='#666';this.style.borderColor='#ccc'">
              <div class="center-block"
                style="width: 100px;height: 100px;background: #F7F7F7;color: #10ccd2;display: flex;align-items: center;justify-content: center; border-radius: 50px;padding: 10px;">
                <div style="font-size: 16px;text-align: center;">{{ item.imgTitle }}</div>
              </div>
              <p class="text-center">{{ item.title }}</p>
              <div class="text-center" v-html="item.content" onmouseenter="this.style.color='#28f'"
                onmouseleave="this.style.color='#ccc'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="whyChooseUs" class="conatiner-fuild">
      <div class="container">
        <div class="whyChooseUs-title text-center">
          <p>行业动态</p>
          <!-- <p>PARTNER</p> -->
        </div>
        <div class="row" style="display: flex; justify-content: center;">
          <div class="col-xs-12 col-md-6 col-md-3 server-wrapper" v-for="(item, index) in literatureInterpretation"
            :key="index" @click="toArticlesAndIndustryUpdates(item.path)">
            <div class="server-block wow slideInUp" onmouseenter="this.style.color='#28f';this.style.borderColor='#28f'"
              onmouseleave="this.style.color='#666';this.style.borderColor='#ccc'">
              <div class="center-block"
                style="width: 100px;height: 100px;background: #F7F7F7;color: #10ccd2;display: flex;align-items: center;justify-content: center; border-radius: 50px;padding: 10px;">
                <div style="font-size: 16px;text-align: center;">{{ item.imgTitle }}</div>
              </div>
              <p class="text-center">{{ item.title }}</p>
              <div class="text-center" v-html="item.content" onmouseenter="this.style.color='#28f'"
                onmouseleave="this.style.color='#ccc'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import omicsServices from "../data/omicsServices.json";
import Swiper from "swiper";
import { WOW } from 'wowjs';
export default {
  name: "HomePage",
  data() {
    return {
      cantReset: true,
      serviceList: omicsServices.serviceList,
      unicellularServiceList: omicsServices.unicellularServiceList,
      swiperList: [
        {
          img: require("@/assets/img/home-banner-bg.jpg"),
          path: "",
          title: '专业分子生物学检测',
          content: '致力于为生命科学研究和人类健康提供领先的科技产品和服务',
        },
      ],
      customerList: [
        {
          logo: require("@/assets/serverImg/danxibao.png"),
          title: "单细胞",
          content: "10X 单细胞转录组、空间转录组",
          value: "单细胞"
        },
        {
          logo: require("@/assets/serverImg/zhuanluzu.png"),
          title: "转录组",
          content: "真核有参、真核无参测序，Small RNA、LnCRNA、CircRNA测序",
          value: "转录组"
        },
        {
          logo: require("@/assets/serverImg/weishenwu.png"),
          title: "微生物组",
          content: "宏转录组、宏基因组测序，扩增子/功能基因测序，群落多样性组成谱测序",
          value: "微生物组"
        },
        {
          logo: require("@/assets/serverImg/biaoxianjiyin.png"),
          title: "表现基因学",
          content: "Cut&Tag-seq、ChIP-Seg、全基因组甲基化测序",
          value: "表现基因学"
        },
        {
          logo: require("@/assets/serverImg/daixiedanbai.png"),
          title: "蛋白代谢检测",
          content: "非靶向代谢组、靶向代谢组、4D-DIA定量蛋白组",
          value: "蛋白代谢检测"
        }
      ],
      literatureInterpretation: [
        {
          title: "GPT-4与单细胞测序结合：对细胞类型进行注释",
          content: "使用GPT-4语言模型准确注释单细胞RNA测序（scRNA-seq）分析中的细胞类型",
          imgTitle: "GPT-4",
          path: "/GPT-4"
        }
      ],
      industryTrends: [
        {
          title: "肿瘤代谢调控肿瘤免疫的研究策略",
          content: "以T细胞耗竭这个肿瘤免疫过程的关键表型为例，讲讲代谢组学在肿瘤免疫研究中的研究策略。",
          imgTitle: "肿瘤代谢",
          path: "/tumorMetabolism"
        }
      ]
    };
  },
  async created() {
    let list = [...this.serviceList, ...this.unicellularServiceList]
    for (const customer of this.customerList) {
      let index = list.findIndex(x => x.title == customer.value)
      customer["index"] = index
      customer["path"] = list[index].children[0].path
    }
    await this.$nextTick()
    await this.getWindowSize()
  },
  mounted() {
    /* wowjs动画 */
    window.addEventListener('resize', this.getWindowSize); // 监听窗口变化
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
    })
    wow.init();
  },
  methods: {
    changeNav(name) {
      this.$store.commit('setNavName', "首页");
      setTimeout(() => {
        this.$store.commit('setNavName', name);
      }, 100)
    },
    toArticlesAndIndustryUpdates(path) {
      this.$router.push(path);
    },
    toServiceDetail(item) {
      // sessionStorage.setItem('navIndex', 1)
      // this.$emit('toTop')
      let list = [...this.serviceList, ...this.unicellularServiceList]
      sessionStorage.setItem("serverItem", JSON.stringify(list[item.index]))
      sessionStorage.setItem("serverChild", JSON.stringify(list[item.index].children[0]))
      this.$store.commit('setNavName', "首页");
      setTimeout(() => {
        this.$store.commit('setNavName', '组学服务');
      }, 100)
    },
    getWindowSize() {
      let num = 3
      if (window.matchMedia("(min-width: 768px)").matches) {
        // 在屏幕宽度大于等于 768px 时执行的代码
        num = 3
      } else {
        // 在屏幕宽度小于 768px 时执行的代码
        num = 1
        if (!this.cantReset) return
        this.cantReset = false
      }
      /* customer-swiper */
      new Swiper(".customer-swiper", {
        loop: true, // 循环模式选项
        slidesPerView: num,
        //自动播放
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    }
  }
};
</script>
<style scoped>
/* 整体盒子 */
#HomePage {
  width: 100%;
}

/* 轮播图 */
#swiper {
  height: 100vh;
}

#swiper .banner-swiper {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/home-banner-bg5.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

#swiper .banner-swiper .swiper-wrapper .swiper-slide-title {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(51, 51, 51, 0.534);
  text-align: center;
  line-height: 80px;
}

#swiper .banner-swiper .swiper-slide-title>h1 {
  font-size: 60px;
}

#swiper .banner-swiper .swiper-slide-title>p {
  font-size: 30px;
  margin-top: 1%;
  font-weight: 700;
}

.swiper-button-next,
.swiper-button-prev {
  width: 30px;
  height: 20px;
}

/* 大数据管理系统 */
#bigData {
  padding: 100px 100px;
  transition: all ease 0.6s;
  box-sizing: border-box;
  background-color: #F7F7F7;
}

#bigData .bigData-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

#bigData .bigData-content {
  font-size: 16px;
  color: #999999;
  line-height: 2em;
  text-indent: 2em;
}

#bigData .bigData-container {
  display: flex;
  align-items: center;
}
#bigData .bigData-container>div>img {
  width: 500px;
  height: 350px;
}

#bigData a {
  margin-top: 20px;
}

#bigData .bigData-device {
  margin: 50px 0 20px;
}

/* 您身边的IT专家 */
#contactUs {
  color: #fff;
  height: 400px;
  background: url("../assets/img/contact_us_bg.jpg") 0 0 no-repeat;
  background-size: 100% 100%;
  transition: all ease 0.6s;
}

#contactUs .contactUs-container {
  padding-top: 50px;
}

#contactUs .contactUs-container button {
  width: 300px;
  height: 50px;
  margin-top: 40px;
}

#contactUs .contactUs-container .contactUs-contactWay span {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin: 30px;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(1) {
  background: url("../assets/img/weixin.png") 0 0 no-repeat;
  background-size: 100% 100%;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(2) {
  background: url("../assets/img/weibo.png") 0 0 no-repeat;
  background-size: 100% 100%;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(3) {
  background: url("../assets/img/twitter.png") 0 0 no-repeat;
  background-size: 100% 100%;
}

/* 客户评价 */
#customer {
  padding: 50px 0;
  box-sizing: border-box;
  background: #efefef;
  transition: all ease 0.6s;
}

#customer .customer-title {
  font-size: 30px;
  color: rgb(102, 102, 102);
  margin: 0 0 30px;
}

#customer .customer-block {
  background: #fff;
  padding: 30px 80px;
}



#customer .customer-logo img {
  width: 140px;
  height: 140px;
}

#customer .customer-yh img {
  width: 34px;
  height: 34px;
}

#customer .customer-content1 {
  padding-top: 20px;
  padding-bottom: 10px;
  color: #10ccd2;
  font-size: 24px;
  border-bottom: 1px solid #999999;
}

#customer .customer-content2 {
  padding-top: 20px;
  color: #999999;
}

#customer .customer-block:hover .customer-content2 {
  color: #10ccd2;
}

/* 为什么选择我们 */
#whyChooseUs {
  padding: 50px 0;
}

#whyChooseUs .whyChooseUs-title {
  margin-bottom: 50px;
}

#whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
  font-size: 25px;
  font-weight: 500;
}

#whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
  font-size: 14px;
}

#whyChooseUs .server-block {
  padding: 50px 20px;
  border: 1px solid #ccc;
  border-bottom: 5px solid #ccc;
}

#whyChooseUs .server-block img {
  width: 48px;
  height: 48px;
}

#whyChooseUs .server-block>p {
  font-size: 20px;
  margin: 30px 0;
}

#whyChooseUs .server-block>div {
  color: #ccc;
}

/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
  #swiper {
    height: 220px;
    width: auto;
  }

  #swiper .banner-swiper .swiper-slide-title>h1 {
    font-size: 24px;
  }

  #swiper .banner-swiper .swiper-slide-title>p {
    font-size: 11px;
    margin-top: 1%;
    font-weight: 700;
  }

  #bigData {
    padding: 30px;
  }

  #bigData .bigData-title {
    font-size: 20px;
  }

  #bigData .bigData-device {
    font-size: 20px;
    margin: 10px 0 10px;
  }

  #bigData .bigData-container {
    display: block;
  }

  #bigData .bigData-container>div>img {
    width: auto;
    height: auto;
  }


  #contactUs {
    height: 200px;
    transition: all ease 0.6s;
  }

  #contactUs .contactUs-container {
    padding-top: 0;
  }

  #contactUs .contactUs-container h1 {
    font-size: 25px;
  }

  #contactUs .contactUs-container h3 {
    font-size: 18px;
  }

  #contactUs .contactUs-container button {
    width: 200px;
    height: 30px;
    margin-top: 20px;
  }

  #customer .customer-block:hover {}

  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin: 10px;
  }

  #customer {
    padding: 30px 0;
    box-sizing: border-box;
    background: #efefef;

  }

  #customer .customer-title {
    font-size: 16px;
    font-weight: bold;
  }

  #customer .customer-logo img {
    width: 48px;
    height: 48px;
  }

  #customer .customer-block {
    padding: 30px;
  }

  #customer .customer-block>div {
    padding: 30px 0;
  }

  #whyChooseUs {
    padding: 20px 0;
    transition: all ease 0.6s;
  }

  #whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 700;
  }

  #whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
    font-size: 12px;
  }

  #whyChooseUs .server-block {
    padding: 50px 20px;
    border: 1px solid #ccc;
    border-bottom: 5px solid #ccc;
  }

  #whyChooseUs .server-block img {
    width: 48px;
    height: 48px;
  }

  #whyChooseUs .server-block>p {
    font-size: 20px;
    margin: 30px 0;
  }

  #whyChooseUs .server-block>div {
    color: #ccc;
  }
}

/* 媒体查询（平板） */
@media screen and (min-width: 768px) and (max-width: 996px) {
  #swiper {
    height: 400px;
  }

  #bigData {
    padding: 60px;
  }

  #bigData .bigData-title {
    font-size: 30px;
  }

  #bigData .bigData-device {
    font-size: 30px;
    margin: 30px 0 15px;
  }

  #bigData .bigData-container {}

    #bigData .bigData-container>div>img {
    width: auto;
    height: auto;
  }

  #contactUs {
    height: 300px;
  }

  #contactUs .contactUs-container {
    padding-top: 50px;
  }

  #contactUs .contactUs-container h1 {
    font-size: 30px;
  }

  #contactUs .contactUs-container h3 {
    font-size: 20px;
  }

  #contactUs .contactUs-container button {
    width: 300px;
    height: 50px;
    margin-top: 30px;
  }

  #customer .customer-block:hover {}

  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 15px;
  }

  #customer .customer-title {
    font-size: 24px;
  }

  #whyChooseUs {
    padding: 20px 0;
  }
}
</style>

