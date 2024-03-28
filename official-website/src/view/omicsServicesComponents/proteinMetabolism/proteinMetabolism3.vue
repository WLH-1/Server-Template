<template>
    <div id="proteinMetabolism3">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                4D-DIA蛋白质组学是基于timsTOF Pro离子淌度平台的DIA技术，通过数据非依赖采集-同步累积连续碎裂（diaPASEF）扫描模式进行差异定量蛋白质组学分析。
                将DIA技术与基于timsTOF Pro上的diaPASEF技术相结合，具有高扫描速度和高灵敏度优势的同时，外加第四维离子淌度分离，
                使DIA数据在采集时不牺牲窗口循环速度的同时，降低谱图复杂度和提高离子利用率，实现了蛋白质组学在覆盖深度、灵敏度、通量方面的全面性提升。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="content">
                蛋白质提取、肽段酶解、色谱分级、液相色谱-串联质谱（LC-MS/MS）DDA建库、DIA分析
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_1.png" class="img-responsive"
                    alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_2.png" class="img-responsive"
                    alt="Image">
            </div>
            <div class="text-center title">分析内容展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_3.png" class="img-responsive"
                    alt="Image">
                <p>差异蛋白火山图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_4.png" class="img-responsive"
                    alt="Image">
                <p>差异蛋白聚类热图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_5.png" class="img-responsive"
                    alt="Image">
                <p>GO 富集分析图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_6.png" class="img-responsive"
                    alt="Image">
                <p>KEGG富集气泡图</p>
            </div>
            <div class="imgClass">
                    <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_7.png" class="img-responsive"
                        alt="Image">
                    <p>蛋白网络互作图</p>
                </div>
            <div class="imgClass">
                    <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_8.png" class="img-responsive"
                        alt="Image">
                </div>
            <div class="imgClass">
                    <img src="../../../assets/serverImg/proteinMetabolism3/proteinMetabolism3_9.png" class="img-responsive"
                        alt="Image">
                    <p>WGCNA 分析</p>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "proteinMetabolism3",
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
                },
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
}
</style>
