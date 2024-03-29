<template>
  <div id="footer" class="container-fluid">
    <div class="footer-container hidden-xs">
      <div class="flex_tb_c image" style="">
        <img style="width: auto;" src="@/assets/img/qilin_logo.png" alt="">
      </div>
      <div class="flex_tb" style="margin-left: 32px;">
        <p class="" style="font-size: 18px;width: max-content;">产品与服务</p>
        <p class="address_tel_fax">
          <span>转录组</span>
        </p>
        <p class="address_tel_fax">
          <span>微生物组</span>
        </p>
        <p class="address_tel_fax">
          <span>表现基因学</span>
        </p>
        <p class="address_tel_fax">
          <span>蛋白代谢检测</span>
        </p>
        <p class="address_tel_fax">
          <span>单细胞</span>
        </p>
      </div>
      <div class="flex_tb" style="margin-left: 32px;">
        <p class="" style="font-size: 18px;width: max-content;">分子实验</p>
        <p class="address_tel_fax">
          <span>常规分子实验</span>
        </p>
      </div>
      <div class="flex_tb" style="margin-left: 32px;">
        <p class="" style="font-size: 18px;">联系我们</p>
        <p class="address_tel_fax">
          <span>地址：中国（四川）自由贸易试验区成都高新区天府三街69号1栋19层1920号</span>
        </p>
        <p class="address_tel_fax">
          <span>Tel：888-888-888</span>
        </p>
        <p class="address_tel_fax">
          <span>邮箱：xxx@163.com</span>
        </p>
        <p class="address_tel_fax">
          <span>微信号：xxx</span>
        </p>
        <p class="copy">Copyright &copy; 2018 - {{ new Date().getFullYear() }} 成都启林未来科技有限公司
        </p>
      </div>
    </div>
    <div class="footer-container-m visible-xs">
      <div class="flex_tb_c image" style="">
        <img style="width: auto;" src="@/assets/img/qilin_logo.png" alt="">
      </div>
      <p class="flex_tb_c" style="font-size: 18px;padding: 0 20px;margin-top: 20px;">联系我们</p>
      <div class="flex_tb" style="">
        <p class="copy">
          地址：中国（四川）自由贸易试验区成都高新区天府三街69号1栋19层1920号
        </p>
        <p class="copy">
          Tel：888-888-888
        </p>
        <p class="copy">
          邮箱：xxx@163.com
        </p>
        <p class="copy">
          微信号：xxx
        </p>
        <p class="copy">Copyright &copy; 2018 - {{ new Date().getFullYear() }} 成都启林未来科技有限公司
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>
<style scoped>
#footer {
  width: 100%;
  height: 100%;
  color: #fff;
  background: #474747;
  overflow: hidden;
  text-align: center;
  flex-shrink: 0;
  padding: 32px;
}

#footer .footer-container {
  display: flex;
  justify-content: center;
  padding: 0 100px;
}

#footer .footer-container .image>img {
  height: 50px;
}

.flex_tb_c {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.flex_tb {
  display: flex;
  align-items: start;
  flex-direction: column;
}

.logo {
  width: 95px;
  height: 45px;
}

.title {
  font-size: 25px;
  margin-bottom: 20px;
}

.address_tel_fax {
  color: #d3d3d3;
  font-size: 14px;
  width: max-content;
}

.copy {
  color: #d3d3d3;
  font-size: 14px;
}

@media screen and (min-width: 768px) and (max-width: 997px) {
  #footer .footer-container {
    display: flex;
    justify-content: center;
    padding: 0 100px;
  }

  #footer .footer-container .image>img {
    height: 40px;
  }

  .flex_tb_c {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .flex_tb {
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  .logo {
    width: 95px;
    height: 45px;
  }

  .title {
    font-size: 25px;
    margin-bottom: 20px;
  }

  .address_tel_fax {
    color: #d3d3d3;
    font-size: 11px;
    width: max-content;
  }

  .copy {
    color: #d3d3d3;
    font-size: 11px;
  }
}

@media screen and (max-width: 768px) {
  #footer .footer-container-m {
    display: flex;
    justify-content: center;
  }

   #footer .footer-container-m .image>img {
    height: 40px;
  }
  .flex_tb_c {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .flex_tb {
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  .logo {
    width: 95px;
    height: 45px;
  }

  .title {
    font-size: 25px;
    margin-bottom: 20px;
  }

  .address_tel_fax {
    color: #d3d3d3;
    font-size: 12px;
  }

  .copy {
    color: #d3d3d3;
    font-size: 13px;
    text-align: left;
  }
}
</style>

