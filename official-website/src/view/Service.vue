<template>
    <div id="Service">
        <div class="banner container-fuild text-center">组学服务</div>
        <div class="container text-center">
            <h3>组学服务</h3>
            <p style="color:#b2b2b2">Omics services</p>
        </div>
        <div class="container">
            <div class="Service-container row clearfix">
                <div class="Service-item col-xs-12 col-sm-6 col-md-3 wow " v-for="(item, index) in serviceList"
                    :key="index">
                    <!-- @click="ServiceClick(item.id)"> -->
                    <div class="Service-item-wrapper">
                        <div class="Service-item-top">
                            <h4>{{ item.title }}</h4>
                        </div>
                        <ul class="list-group">
                            <div class="list-group-item" v-for="(child, childIndex) in item.children" :key="childIndex">
                              <router-link :to="'/service/serviceDetail'"> {{ child.name }}</router-link>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { WOW } from 'wowjs';
export default {
    name: 'Service',
    data() {
        return {
            serviceList: [
                {
                    id: 'section-1',
                    title: '转录组',
                    eng_title: 'Transcriptome',
                    children: [
                        {
                            name: 'SmalI RNA测序'
                        },
                        {
                            name: 'LnCRNA测序'
                        },
                        {
                            name: 'CircRNA测序'
                        },
                        {
                            name: '全转录组测序'
                        },
                        {
                            name: '全长转录组测序'
                        },
                        {
                            name: '真核无参转录组测序'
                        },
                        {
                            name: '真核有参转录组测序'
                        },
                        {
                            name: '原核转录组测序'
                        },
                        {
                            name: '绝对定量转录组测序'
                        }, {
                            name: '外泌体测序'
                        },
                    ]
                }, {
                    id: 'section-3',
                    title: '动植物基因组',
                    eng_title: 'Animal and Plant Genomes',
                    children: [
                        {
                            name: '动植物基因组de novo测序'
                        },
                        {
                            name: '遗传变异检测'
                        },
                        {
                            name: 'BSA性状定位'
                        },
                        {
                            name: '遗传图谱构建'
                        },
                        {
                            name: '群体进化'
                        },
                        {
                            name: '全基因组关联分析'
                        },
                        {
                            name: 'SSR分子标记开发'
                        }
                    ]
                }, {
                    id: 'section-6',
                    title: '表现基因学',
                    eng_title: 'Expressionomics',
                    children: [
                        {
                            name: 'ATAC-seq'
                        },
                        {
                            name: 'Cut&Tag-seq'
                        },
                        {
                            name: 'ChIP-Seg'
                        },
                        {
                            name: 'RNA甲基化测序'
                        },
                        {
                            name: '全慕因组甲某化测序'
                        }
                    ]
                }, {
                    id: 'section-2',
                    title: '微生物组',
                    eng_title: 'Oicrobiome',
                    children: [
                        {
                            name: '群落多样性组成谱测序'
                        },
                        {
                            name: '标记基因全长测序'
                        },
                        {
                            name: '扩增子/功能基因测序'
                        },
                        {
                            name: '宏基因组测序'
                        },
                        {
                            name: '宏转录组测序'
                        }
                    ]
                }
                , {
                    id: 'section-5',
                    title: '代谢组',
                    eng_title: 'Metabolome',
                    children: [
                        {
                            name: '非靶向代谢组'
                        },
                        {
                            name: '靶向代谢组'
                        },
                        {
                            name: '脂质代谢组'
                        }
                    ]
                }
                , {
                    id: 'section-4',
                    title: '人基因组',
                    eng_title: 'Human Genome',
                    children: [
                        {
                            name: '全外显子组测序'
                        },
                        {
                            name: '人基因组重测序'
                        },
                        {
                            name: '目标区域捕获测序'
                        }
                    ]
                }
                , {
                    id: 'section-7',
                    title: '蛋白组',
                    eng_title: 'Proteome',
                    children: [
                        {
                            name: '定量蛋白质组'
                        },
                        {
                            name: '蛋白质定性分析'
                        },
                        {
                            name: '靶向蛋白质组'
                        },
                        {
                            name: '蛋白质翻译后修饰'
                        },
                        {
                            name: '4D-label free定量蛋白组'
                        },
                        {
                            name: '4D-DIA定量蛋白组'
                        }
                    ]
                }
                

            ]
        }
    },
    mounted() {
        var wow = new WOW();
        wow.init();
    },
    methods: {
        serviceClick() {
            console.log(123);
            this.$router.push({
                name: 'service_smartTown',
            })
            this.$emit("toTop")
        }
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
    margin-bottom: 50px;
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

