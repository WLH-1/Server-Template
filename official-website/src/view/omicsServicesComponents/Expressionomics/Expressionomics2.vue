<template>
    <div id="Expressionomics2">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                染色质免疫共沉淀技术（Chromatin Immunoprecipitation，ChIP）也称结合位点分析法，是研究体内蛋白质与DNA 相互作用的有力工具，
                通常用于转录因子结合位点或组蛋白特异性修饰位点的研究。将ChIP 与二代测序技术相结合的ChIP-Seq 技术，能够检测全基因组范围内与组蛋白、转录因子等互作的DNA区段。
            </div>
            <div class="content">
                ChIP-Seq 的原理是：首先通过染色质免疫共沉淀技术（ChIP）特异性地富集目的蛋白结合的DNA 片段，
                并对其进行纯化与文库构建；然后对富集得到的DNA片段进行高通量测序。研究人员通过将获得的序列标签定位到基因组上，
                从而获得全基因组范围内与组蛋白、转录因子等互作的DNA 区段信息。
            </div>
            <div class="title text-center" style="margin-top: 20px;">推荐平台</div>
            <div class="secondContent" style="margin-top: 20px;">
                <div>Ilumina HiSeq2000、 Ion Proton</div>
            </div>
            <div class="title text-center" style="margin-top: 20px;">生物信息分析</div>
            <div class="secondContent">
                <div>1. 原始数据整理、过滤及质量评估 </div>
                <div>2.ChIP-Seq序列与参考基因组序列的比对</div>
                <div>3.Peak Calling（统计每个样品的Peak片段信息）</div>
                <div>4.Peak Annotation（根据已有的基因组数据库注释信息获得Peak位点信息）</div>
                <div>5.Motif预测、基因集分析</div>
                <div>6.全基因组范围的峰值分布</div>
                <div>7.样品间差异Peak分析</div>
                <div>8.基因组水平和感兴趣区域的数据可视化</div>
            </div>
            <div class="title text-center" style="margin-top: 20px;">启林未来的优势</div>
            <div class="secondContent">
                <div>1.根据实际需求可个性化定制测序及分析方案。</div>
                <div>2.严谨的实验流程和检测结果，数据分析结果可信。</div>
                <div>3.分析结果的图表参考国际期刊设计，可直接用于文章写作。</div>
                <div>4.与转录组等数据进行联合分析，挖掘生物信息资源。</div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics2/Expressionomics2_1.png" class="img-responsive"
                    alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="secondContent" style="margin-top: 20px;">
                <div>只接收ChIP后DNA样本，只需进行建库，要求：DNA总量20ng，浓度0.5ng/ul以上。</div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics2/Expressionomics2_2.png" class="img-responsive"
                    alt="Image">
            </div>

            <div class="secondTitle">Peak Calling</div>
            <div class="secondContent">
                <div>Peak 的长度与蛋白质结合区域大小紧密相关，是非常重要的信息。Peak 在外显子、内含子、5’ UTR、3’ UTR、基因间区等区域上的分布情况如下：</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics2/Expressionomics2_3.png" class="img-responsive"
                        alt="Image">
                    <p>Peak在功能元件上的分布</p>
                </div>
            </div>
            <div class="secondTitle">Peak相关基因GO注释</div>
            <div class="secondContent">
                <div>将 GO 注释结果对应到 GOTerm 上，并统计第二级分类上注释到目标基因的数目</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics2/Expressionomics2_4.png" class="img-responsive"
                        alt="Image">
                    <p>GO注释图</p>
                </div>
            </div>
            <div class="secondTitle">差异Peak相关基因KEGG富集分析</div>
            <div class="secondContent">
                <div>统计各个KEGG Pathway 不同层级上包含的差异表达基因数目，进而确定差异表达基因主要参与的代谢途径和信号通路。</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics2/Expressionomics2_5.png" class="img-responsive"
                        alt="Image">
                    <p>KEGG富集分析</p>
                </div>
            </div>
            <div class="secondTitle">Motif分析</div>
            <div class="secondContent">
                <div>Motif是一些有特征的短序列，在基因组上常常反复出现，经常是一些具有序列特异性的蛋白的结合位点（如转录因子），或者是涉及到一些重要的生物过程（如转录起始，转录终止， RNA 剪切等等）。</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics2/Expressionomics2_6.png" class="img-responsive"
                        alt="Image">
                    <p>motif示意图</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Expressionomics2",
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

    .secondContent {
        line-height: 2em;
        word-wrap: break-word;
        padding: 20px 20px;
    }

    .secondTitle {
        padding: 0 20px;
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
