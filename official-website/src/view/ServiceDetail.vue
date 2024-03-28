<template>
    <div>
        <div class="banner container-fuild text-center">组学服务</div>

        <div id="service" class="container">
            <div class="row">
                <div id="left" class="col-md-4 col-xs-12">
                    <ul class="left-container wow bounceInLeft">
                        <p>{{ serverItem.title }}</p>
                        <li :class="leftIndex == index ? 'liActive' : 'liUnactive'" v-for="(item, index) in serviceList"
                            :key="index">
                            <router-link :to=item.path>
                                <div @click="routerClick(item, index)">{{ item.name }}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div id="right" class="col-md-8 col-xs-12 wow bounceInRight">
                    <div class="text-center centerTitle">{{ serverChild.name }}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { WOW } from "wowjs";
import omicsServices from "../data/omicsServices.json";
export default {
    name: 'service',
    data() {
        return {
            serviceList: [],
            leftIndex: 0,
            serverItem: JSON.parse(sessionStorage.getItem('serverItem')),
            serverChild : JSON.parse(sessionStorage.getItem('serverChild')),
            title: '123'
        }
    },
    mounted() {
        let serverItem = JSON.parse(sessionStorage.getItem('serverItem'))
        let serverChild = JSON.parse(sessionStorage.getItem('serverChild'))
        this.serviceList = serverItem.children
        this.leftIndex = serverItem.children.findIndex(x => {
            return x.name == serverChild.name
        })
        var wow = new WOW();
        wow.init();
        this.GoTop()
    },
    methods: {
        async routerClick(item, index) {
            this.leftIndex = index
            this.serverChild = item
            sessionStorage.setItem("serverChild", JSON.stringify(item))
        },
        GoTop() {
            (function smoothscroll() {
                var currentScroll =
                    document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, 0);
                }
            })();
        },
    }
}
</script>
<style scoped>
.banner {
    color: #fff;
    font-size: 30px;
    height: 300px;
    line-height: 150px;
    background-image: url('../assets/img/banner_usually.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: scroll;
    background-position: center center;
}

#left {
    margin: 50px 0;
}

.liActive {
    background-color: #999999;
}

.liUnactive {
    background-color: #FFFFFF;
}


.left-container {
    width: 60%;
    margin: 0 auto;
    border: 1px solid #474747;
}

.left-container>p {
    text-align: center;
    line-height: 45px;
    padding: 0;
    margin: 0;
    background: #474747;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
}

.left-container>li {
    text-align: center;
    padding: 0 24px;
    height: 38px;
    line-height: 38px;
    margin: 0;
    border-top: 1px solid #474747;
}

.left-container>li>a {
    text-decoration: none;
}

.centerTitle{
    color: #1d9dc2;
    font-size: 26px;
    font-weight: normal;
    text-align: center;
    margin-bottom: 35px;
}

#right {
    padding: 50px 0;
}

@media screen and (max-width: 768px) {
    #right {
        padding: 15px;
    }

    .banner {
        height: 150px;
    }
}
</style>

