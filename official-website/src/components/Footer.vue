<template>
  <div id="footer" class="container-fluid">
    <div class="footer-container hidden-xs">
      <div class="flex_tb_c image" style="">
        <img style="width: auto;" src="@/assets/img/qilin_logo.png" alt="">
        <img style="width: 100px; height: 100px; margin-top: 24px;" src="@/assets/img/WeChat.png" alt="">
      </div>
      <div class="flex_tb" style="margin-left: 32px;">
        <p class="" style="font-size: 18px;width: max-content;">产品与服务</p>
        <div v-for="(item, index) in customerList" :key="index">
          <router-link :to=item.path>
            <p @click="toServiceDetail(item)" class="address_tel_fax">{{ item.title }}</p>
          </router-link>
        </div>
      </div>
      <div class="flex_tb" style="margin-left: 32px;">
        <!-- toMolecularExperimentsServiceDetail -->
        <p class="" style="font-size: 18px;width: max-content;">分子实验</p>
        <div v-for="(item, index) in customerList2" :key="index">
          <router-link :to=item.path>
            <p @click="toMolecularExperimentsServiceDetail(item)" class="address_tel_fax">{{ item.title }}</p>
          </router-link>
        </div>
      </div>
      <div class="flex_tb" style="margin-left: 32px;">
        <p class="" style="font-size: 18px;">联系我们</p>
        <p class="address_tel_fax">
          <span>地址：中国（四川）成都东部新区养马街道石养路2号7栋（属简州新城范围内）</span>
        </p>
        <p class="address_tel_fax">
          <span>邮箱：huangqy_ql@sina.com</span>
        </p>
        <p class="address_tel_fax">
          <span>微信号：think-more-see-all</span>
        </p>
        <p class="address_tel_fax copyright-line">
          <span class="copy">Copyright &copy; 2021 - {{ new Date().getFullYear() }} 成都启林未来科技有限公司</span>
          <span class="copy">|</span>
          <a href="https://beian.miit.gov.cn" class="copy">蜀ICP备2024067583号-1</a>
        </p>
      </div>
    </div>
    <div class="footer-container-m visible-xs">
      <div class="flex_tb_c image" style="">
        <img style="width: auto;" src="@/assets/img/qilin_logo.png" alt="">
        <img style="width: 100px; height: 100px; margin-top: 24px;" src="@/assets/img/WeChat.png" alt="">
      </div>
      <p class="flex_tb_c" style="font-size: 18px;padding: 0 20px;margin-top: 20px;">联系我们</p>
      <div class="flex_tb" style="">
        <p class="copy">
          地址：中国（四川）成都东部新区养马街道石养路2号7栋（属简州新城范围内）
        </p>
        <p class="copy">
          邮箱：huangqy_ql@sina.com
        </p>
        <p class="copy">
          微信号：think-more-see-all
        </p>
        <p class="copy copyright-line">
          <span>Copyright &copy; 2021 - {{ new Date().getFullYear() }} 成都启林未来科技有限公司</span>
          <span class="copy">|</span>
          <a href="https://beian.miit.gov.cn" class="copy">蜀ICP备2024067583号-1</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import omicsServices from "../data/omicsServices.json";
export default {
  name: "Footer",
  data() {
    return {
      serviceList: omicsServices.serviceList,
      unicellularServiceList: omicsServices.unicellularServiceList,
      MolecularExperimentsList: omicsServices.MolecularExperimentsList,
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
      customerList2: [
        {
          logo: require("@/assets/serverImg/danxibao.png"),
          title: "分子实验",
          content: "分子实验",
          value: "常规分子实验"
        }
      ],
    };
  },
  created() {
    let list = [...this.serviceList, ...this.unicellularServiceList]
    for (const customer of this.customerList) {
      let index = list.findIndex(x => x.title == customer.value)
      customer["index"] = index
      customer["path"] = list[index].children[0].path
    }
    let list2 = [...this.MolecularExperimentsList]
    for (const customer of this.customerList2) {
      let index = list2.findIndex(x => x.title == customer.value)
      customer["index"] = index
      customer["path"] = list[index].children[0].path
    }
  },
  methods: {
    toServiceDetail(item) {
      let list = [...this.serviceList, ...this.unicellularServiceList]
      sessionStorage.setItem("serverItem", JSON.stringify(list[item.index]))
      sessionStorage.setItem("serverChild", JSON.stringify(list[item.index].children[0]))
      this.$store.commit('setNavName', "首页");
      setTimeout(() => {
        this.$store.commit('setNavName', '组学服务');
      }, 100)
    },
    toMolecularExperimentsServiceDetail(item) {
      let list = [...this.MolecularExperimentsList]
      sessionStorage.setItem("serverItem", JSON.stringify(list[item.index]))
      sessionStorage.setItem("serverChild", JSON.stringify(list[item.index].children[0]))
      this.$store.commit('setNavName', "首页");
      setTimeout(() => {
        this.$store.commit('setNavName', '分子实验');
      }, 100)
    },
  }
};
</script>
<style scoped>
#footer {
  width: 100%;
  color: #fff;
  background: #474747;
  overflow: hidden;
  text-align: center;
  flex-shrink: 0;
  padding: 40px 0;
}

#footer .footer-container {
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  max-width: 1200px;
  margin: 0 auto;
}

#footer .footer-container .image {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

#footer .footer-container .image>img {
  height: 45px;
  transition: transform 0.3s ease;
}

#footer .footer-container .image>img:hover {
  transform: scale(1.05);
}

.flex_tb_c {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.flex_tb {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
}

.logo {
  width: 95px;
  height: 45px;
}

.title {
  font-size: 25px;
  margin-bottom: 20px;
  color: #fff;
  font-weight: bold;
}

.address_tel_fax {
  display: flex;
  justify-content: flex-start;
  color: #d3d3d3;
  font-size: 14px;
  width: max-content;
  transition: color 0.3s ease;
}

.address_tel_fax:hover {
  color: #fff;
}

.copy {
  color: #d3d3d3;
  font-size: 14px;
  margin-top: 15px;
}

.copy a {
  color: #d3d3d3;
  text-decoration: none;
  transition: color 0.3s ease;
}

.copy a:hover {
  color: #fff;
}

.copyright-line {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 5px !important;
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
  width: 100% !important;
}

.copyright-line .copy {
  white-space: nowrap !important;
  display: inline-block !important;
}

.separator {
  color: #d3d3d3;
  margin: 0 5px;
  white-space: nowrap !important;
}

.icp-link {
  color: #d3d3d3;
  text-decoration: none;
  transition: color 0.3s ease;
  white-space: nowrap !important;
  display: inline-block !important;
}

.icp-link:hover {
  color: #fff;
}

@media screen and (min-width: 768px) and (max-width: 997px) {
  #footer .footer-container {
    padding: 0 50px;
  }

  #footer .footer-container .image>img {
    height: 40px;
  }

  .address_tel_fax {
    font-size: 12px;
  }

  .copy {
    font-size: 12px;
  }
}

@media screen and (max-width: 768px) {
  #footer {
    padding: 25px 0;
  }

  #footer .footer-container-m {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
  }

  #footer .footer-container-m .image {
    gap: 15px;
  }

  #footer .footer-container-m .image>img {
    height: 35px;
  }

  .flex_tb {
    align-items: center;
    text-align: center;
  }

  .address_tel_fax {
    justify-content: center;
    font-size: 13px;
  }

  .copy {
    font-size: 13px;
    text-align: center;
  }

  .copyright-line {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>

