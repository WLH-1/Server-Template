import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/",
    },
    {
      path: "/",
      name: "PageView",
      component: (resolve) => require(["@/view/PageView"], resolve),
      children: [
        {
          path: "/",
          redirect: "/home",
        },
        {
          path: "/home",
          name: "home",
          component: (resolve) => require(["@/view/HomePage"], resolve),
          meta: {
            title: "首页",
          },
        },
        {
          path: "/service",
          name: "service",
          component: (resolve) => require(["@/view/Service"], resolve),
          meta: {
            title: "组学服务",
          },
        },
        {
          path: "/service/serviceDetail",
          name: "serviceDetail",
          component: (resolve) => require(["@/view/ServiceDetail"], resolve),
          meta: {
            title: "相关服务",
          },
          // omicsServicesComponents/Transcribe1
          children: [
            {
              path: "/service/serviceDetail",
              redirect: "/omicsServicesComponents/Transcribe1",
            },
            {
              path: "/omicsServicesComponents/Transcribe1",
              name: "Transcribe1",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Transcribe1",
                ], resolve),
            },
          ],
        },
        {
          path: "/newsinformation",
          name: "newsinformation",
          component: (resolve) => require(["@/view/NewsInformation"], resolve),
          meta: {
            title: "新闻动态",
          },
        },
        {
          path: "/companyintroduction",
          name: "companyintroduction",
          component: (resolve) =>
            require(["@/view/CompanyIntroduction"], resolve),
          meta: {
            title: "公司介绍",
          },
        },
        {
          path: "/jobchance",
          name: "jobchance",
          component: (resolve) => require(["@/view/JobChance"], resolve),
          meta: {
            title: "工作机会",
          },
        },
        {
          path: "/contactus",
          name: "contactus",
          component: (resolve) => require(["@/view/ContactUs"], resolve),
          meta: {
            title: "联系我们",
          },
        },
      ],
    },
  ],
});
