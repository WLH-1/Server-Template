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
            title: "启林未来",
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
          // omicsServicesComponents/Transcribe/Transcribe1
          children: [
            {
              path: "/service/serviceDetail",
              redirect: "/omicsServicesComponents/Transcribe/Transcribe1",
            },
            {
              path: "/omicsServicesComponents/Transcribe/Transcribe1",
              name: "Transcribe1",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Transcribe/Transcribe1",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Transcribe/Transcribe2",
              name: "Transcribe2",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Transcribe/Transcribe2",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Transcribe/Transcribe3",
              name: "Transcribe3",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Transcribe/Transcribe3",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Transcribe/Transcribe4",
              name: "Transcribe4",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Transcribe/Transcribe4",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Transcribe/Transcribe5",
              name: "Transcribe5",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Transcribe/Transcribe5",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Transcribe/Transcribe6",
              name: "Transcribe6",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Transcribe/Transcribe6",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/microorganism/microorganism1",
              name: "microorganism1",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/microorganism/microorganism1",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/microorganism/microorganism2",
              name: "microorganism2",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/microorganism/microorganism2",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/microorganism/microorganism3",
              name: "microorganism3",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/microorganism/microorganism3",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/microorganism/microorganism4",
              name: "microorganism4",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/microorganism/microorganism4",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Expressionomics/Expressionomics1",
              name: "Expressionomics1",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Expressionomics/Expressionomics1",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Expressionomics/Expressionomics2",
              name: "Expressionomics2",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Expressionomics/Expressionomics2",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Expressionomics/Expressionomics3",
              name: "Expressionomics3",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Expressionomics/Expressionomics3",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/proteinMetabolism/proteinMetabolism1",
              name: "proteinMetabolism1",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/proteinMetabolism/proteinMetabolism1",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/proteinMetabolism/proteinMetabolism2",
              name: "proteinMetabolism2",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/proteinMetabolism/proteinMetabolism2",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/proteinMetabolism/proteinMetabolism3",
              name: "proteinMetabolism3",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/proteinMetabolism/proteinMetabolism3",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Unicellular/Unicellular1",
              name: "Unicellular1",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Unicellular/Unicellular1",
                ], resolve),
            },
            {
              path: "/omicsServicesComponents/Unicellular/Unicellular2",
              name: "Unicellular2",
              component: (resolve) =>
                require([
                  "@/view/omicsServicesComponents/Unicellular/Unicellular2",
                ], resolve),
            },
          ],
          // ,
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
