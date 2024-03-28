<template>
    <div id="proteinMetabolism1">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                非靶向代谢组学是通过液质联用（LC-MS）方法检测生物体受扰动或刺激前后大量代谢产物的动态变化，进而阐明生物体代谢相关过程的代谢组学技术。
                其研究对象主要是相对分子质量 1000 以下的内源性小分子代谢物。其主要目标是定量的研究生命体对外界刺激、病理生理变化、以及本身基因突变而产生的其体内代谢物水平的多元动态反应。
            </div>
            <div class="text-center title">方案设计</div>
            <div class="content">
                非靶向代谢组学能够体现生物样品体系中总的代谢物信息，尽可能地去定性和定量（相对）所有的代谢物。对不同处理或生理状态的样本代谢产物进行检测，
                可以获得不同状态之间的差异代谢产物，从而探究差异机制，寻找生物标志物，可用于植物抗逆，植物营养和药用价值评价，动物疾病治疗，微生物与发酵工程等领域。对于生物学重复，建议 n≥10，重复样本分析。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism1/proteinMetabolism1_1.png" class="img-responsive"
                    alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism1/proteinMetabolism1_2.png" class="img-responsive"
                    alt="Image">
            </div>
            <div class="text-center title">分析内容展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism1/proteinMetabolism1_3.png" class="img-responsive"
                    alt="Image">
                <p>PCA 分析图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism1/proteinMetabolism1_4.png" class="img-responsive"
                    alt="Image">
                <p>差异性代谢物相关性矩阵图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism1/proteinMetabolism1_5.png" class="img-responsive"
                    alt="Image">
                <p>PCoA 分析图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/proteinMetabolism1/proteinMetabolism1_6.png" class="img-responsive"
                    alt="Image">
                <p>差异性代谢物 metabolome view</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "proteinMetabolism1",
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
}</style>
