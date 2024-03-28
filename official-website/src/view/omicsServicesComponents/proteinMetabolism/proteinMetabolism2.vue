<template>
    <div id="proteinMetabolism2">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                靶向代谢组学分析主要是以标准品为参照，对特定的代谢物群进行有针对性地、特异性地检测与分析。通常采用的技术方案包括常规的液质联用（LC-MS）分析技术， 以及选择性反应 / 多反应监测技术（MRM/ SRM）。
            </div>
            <div class="text-center title">方案设计</div>
            <div class="content">
                靶向代谢组分析具有特异性强，检测灵敏度高和定量准确等几个特点。通过对血液、 尿液或其他体液以及组织中某一特定的代谢物的富集与准确定量定性分析，
                一方面可以结合其它实验数据展示相关的分子生物学作用机制，另一方面，也可以为后续代谢分子标志物的深入研究和开发利用提供有力支持。
                靶向代谢组学可以用于验证有非靶向代谢组学实验提出的假说：也可以进行基于假说的探索性实验，针对特定代谢物， 研究代谢模型。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism2/proteinMetabolism2_1.png" class="img-responsive"
                    alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism2/proteinMetabolism2_2.png" class="img-responsive"
                    alt="Image">
            </div>
            <div class="text-center title">分析内容展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism2/proteinMetabolism2_3.png" class="img-responsive"
                    alt="Image">
                <p>标准品色谱峰图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism2/proteinMetabolism2_4.png" class="img-responsive"
                    alt="Image">
                <p>代谢物聚类热图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism2/proteinMetabolism2_5.png" class="img-responsive"
                    alt="Image">
                <img src="../../../assets/serverImg/proteinMetabolism2/proteinMetabolism2_6.png" class="img-responsive"
                        alt="Image">
                <p>标准曲线</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "proteinMetabolism2",
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
