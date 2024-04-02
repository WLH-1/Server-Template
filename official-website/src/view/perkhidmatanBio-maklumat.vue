<template>
    <div id="Service">
        <div class="banner container-fuild text-center">生信服务</div>
        <div class="container text-center">
            <h3>生信服务</h3>
            <p style="color:#b2b2b2">Perkhidmatan Bio-maklumat</p>
        </div>
        <div class="container">
            <div class="Service-container row clearfix">
                <div class="Service-item col-xs-12 col-sm-6 col-md-3 wow " v-for="(item, index) in perkhidmatanBiomaklumat"
                    :key="index">
                    <!-- @click="ServiceClick(item.id)"> -->
                    <div class="Service-item-wrapper">
                        <div class="Service-item-top">
                            <h4>{{ item.title }}</h4>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="(child, childIndex) in item.children" :key="childIndex">
                                <router-link :to="child.path">
                                    <!-- 必须这样写，click写在router-link标签上只有第一次点击才会触发routerClick-->
                                    <div @click="routerClick(item, child)">{{ child.name }}</div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { WOW } from 'wowjs';
import omicsServices from "../data/omicsServices.json";
export default {
    name: 'perkhidmatanbio-maklumat',
    data() {
        return {
            perkhidmatanBiomaklumat: omicsServices.perkhidmatanBiomaklumat,
        }
    },
    mounted() {
        var wow = new WOW();
        wow.init();
    },
    methods: {
        async routerClick(item, child) {
            sessionStorage.setItem("serverItem", JSON.stringify(item))
            sessionStorage.setItem("serverChild", JSON.stringify(child))
        },

    }
}
</script>
<style scoped>
.banner {
    color: #fff;
    font-size: 30px;
    height: 150px;
    line-height: 150px;
    background-image: url('../assets/img/banner_usually.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: scroll;
    background-position: center center;
}

.Service-container {
    padding: 20px 0;
}

.Service-item {
    margin-bottom: 20px;
}

.Service-item-wrapper {
    cursor: pointer;
    background: rgba(244, 244, 244, 1);
    overflow: hidden;
    position: relative;
}

.list-group {
    margin-bottom: 0;
}

.Service-item-top {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}

.Service-item-top>i {
    display: inline-block;
    width: 25px;
    height: 2px;
    background: #28f;
}

.Service-item-top>p {
    color: #b2b2b2;
    opacity: 0;
    transform: translateY(10px);
    transition: all .5s ease;
}

.Service-item-img {
    width: 100%;
    overflow: hidden;
}

.Service-item-img img {
    width: 100%;
    transition: all 0.5s ease;
}

/* .Service-item-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    border: 1px solid #000;
    opacity: 0;
} */

/* .Service-item-wrapper:hover .Service-item-top > i{
    opacity: 0;
}
.Service-item-wrapper:hover .Service-item-top > p{
    opacity: 1;
    transform: translateY(-10px);
}
.Service-item-wrapper:hover .Service-item-img > img{
    transform: scale(1.1,1.1);
}
.Service-item-wrapper:hover > .Service-item-border{
    opacity: 1;
    width: 90%;
    height: 90%;
} */
</style>

