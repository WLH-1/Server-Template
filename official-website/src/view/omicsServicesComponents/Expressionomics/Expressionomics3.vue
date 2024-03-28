<template>
    <div id="Expressionomics3">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="secondContent" style="text-indent: 2em;margin-top: 20px;">
                DNA 甲基化对生命活动重要，是基因调控的手段之一 ( 即通过对位于启动子及第一外显子区的 CpG 岛的甲基化而抑制基因的表达 )，
                它在基因表达调控、肿瘤研究、染色质重塑、遗传印记、疾病研究、胚胎发育、环境与表观遗传和表观异质性等方面起重要的作用，是表观遗传学研究的热点。
            </div>
            <div class="text-center title">方案设计</div>
            <div class="secondContent" style="text-indent: 2em;margin-top: 20px;">
                <div>全基因组甲基化实验设计思路为差异比较，常见的类型为实验组与对照组 (case VS control)，进行两两比较。
                    通过重亚硫酸盐对基因组 DNA 进行处理，将未甲基化的 C 碱基转化为 U 碱基，而甲基化的 C 则不会改变，进行 PCR扩增后 U 碱基会变成 T，
                    与原本具有甲基化修饰的 C 碱基区分开来。 WGBS 精密度高，可以得到单个碱基，获得单碱基精度生物甲基化图谱。建议设置 3-6 个生物学重复，以减少组内误差并增强结果的可靠性。</div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics3/Expressionomics3_1.png" class="img-responsive"
                    alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics3/Expressionomics3_2.png" class="img-responsive"
                    alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="text-center title">分析内容</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics3/Expressionomics3_3.png" class="img-responsive"
                    alt="Image">
            </div>
            <div class="text-center title">分析内容展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics3/Expressionomics3_4.png" class="img-responsive"
                    alt="Image">
                <p>单染色体水平甲基化比例分布</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics3/Expressionomics3_5.png" class="img-responsive"
                    alt="Image">
                <p>甲基化圈图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics3/Expressionomics3_6.png" class="img-responsive"
                    alt="Image">
                <p>发生显著差异甲基化位置</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Expressionomics3",
    data() {
        return {
            rightIndex: 0,
            btnList: [
                {
                    name: "产品介绍",
                },
                {
                    name: "技术路线",
                },
                {
                    name: "样本要求",
                },
                {
                    name: "分析内容及结果",
                }
            ],
        };
    },
    methods: {
        changeIndex(index) {
            this.rightIndex = index;
        },
    },
};
</script>
<style scoped>
* {
    word-wrap: break-word;
}

.title {
    margin-top: 40px;
    font-size: 18px;
    padding: 12px 0;
    border-bottom: 2px solid #333333;
}

.secondTitle {
    font-size: 16px;
    margin-top: 20px;
}

.imgClass {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
}

.imgClass>p {
    margin-top: 10px;
    font-size: 12px;
}

.subtitle {
    padding-top: 20px;
    font-size: 16px;
}

.content {
    text-indent: 2em;
    line-height: 2em;
    word-wrap: break-word;
    padding-top: 20px;
    color: #666;
}

.secondContent {
    line-height: 2em;
    word-wrap: break-word;
    color: #666;
}

.btnActive {
    background-color: #999999;
}

.btnUnactive {
    background-color: #F7F7F7;
}

@media screen and (max-width: 768px) {
    .content {
        text-indent: 2em;
        line-height: 2em;
        word-wrap: break-word;
        padding: 20px 20px;
    }

    .secondTitle {
        padding: 0 20px;
    }

    .secondContent {
        line-height: 2em;
        word-wrap: break-word;
        padding: 20px 20px;
    }

    .btnActive {
        background-color: #999999;
        font-size: 11px;
        text-align: center;
        padding: 10px 0;
    }

    .btnUnactive {
        background-color: #F7F7F7;
        font-size: 11px;
        text-align: center;
        padding: 10px 0;
    }

    .imgClass {
        width: 100%;
    }

    .subtitle {
        padding-left: 20px;
        padding-right: 20px;
    }
}</style>
