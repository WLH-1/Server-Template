<template>
    <div id="Expressionomics1">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                CUT&Tag（Cleavage Under Targets and
                Tagmentation）是蛋白质-DNA互作关系研究的新方法，是新一代超微量ChIP-Seq技术，适用于无ChIP级别抗体的蛋白研究。与传统的ChIP-Seq研究方法相比，
                该技术无需交联、超声打断、末端抹平和接头连接等操作，因此具有省时高效、所需的样品量少、背景信号低和可重复性好等优点，甚至可用于单细胞水平测序。
                CUT&Tag有望将蛋白质-DNA互作的研究变成一种类似PCR反应的常规操作，对基因调控、表观遗传等领域的研究具有革命性的意义。
            </div>
            <div class="content">
                技术原理：CUT&Tag（Cleavage Under Targets and Tagmentation）技术，该技术利用一抗靶向结合目的蛋白，二抗孵育放大信号，
                创新性的pA-Tn5融合蛋白与一抗和二抗中的Fc区结合，Mg2+激活pA-Tn5的Tn5酶活性后切割目标区域并加上接头，
                经PCR扩增就可获得目标蛋白结合区域的文库。简化建库操作，提高了信噪比，实现了低细胞量样本研究组蛋白修饰和转录因子的目标。
            </div>
            <div class="secondContent" style="margin-top: 20px;">
                <div>推荐平台：Novaseq 6000 PE150</div>
            </div>
            <div class="secondContent" style="margin-top: 20px;">生物信息分析</div>
            <div class="secondContent">
                <div>1.原始数据整理、过滤及质量评估</div>
                <div>2.与参考基因组序列比对</div>
                <div>3.Peak Calling（统计每个样品的Peak片段信息）</div>
                <div>4.基因附近及Peak中心信号分布图</div>
                <div>5.Peak序列Motif及注释分析</div>
                <div>6.Peak邻近基因功能分析</div>
                <div>7.差异Peak序列Motif及注释分析</div>
                <div>8.差异Peak邻近基因功能分析</div>
                <div>9.Overlap基因功能分析</div>
            </div>
            <div class="secondContent" style="margin-top: 20px;">启林未来的优势</div>
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
                <img src="../../../assets/serverImg/Expressionomics1/Expressionomics1_1.png" class="img-responsive"
                    alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="secondContent" style="margin-top: 20px;">
                <div>1. DNA文库样本：总体积≥25ul，浓度≥2ng/ul，总量≥50ng</div>
                <div>2. 细胞样本：要求冻存前细胞活率≥90%，并且复苏后细胞活率≥85%，每个细胞样本准备2份，每份冻存的细胞量≥100万个</div>
                <div>3. 动物组织样本：要求每个样本准备2份，每份≥200mg</div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="imgClass">
                <img src="../../../assets/serverImg/Expressionomics1/Expressionomics1_2.png" class="img-responsive"
                    alt="Image">
            </div>
            
            <div class="secondTitle">Peak Calling</div>
            <div class="secondContent">
                <div>使用统计学方法计算出参考基因组上比对上的 Reads 显著富集的区域（称为 Peak），这些区域在不同的实验中表示不同的研究重点，获得 Peak 后，可对 Peak 进行后续的 Peak 序列 Motif
                    分析、 Peak 注释等分析，进一步挖掘感兴趣的方向。Peak 在外显子、内含子、5’UTR、3’UTR、基因间区等区域上的分布情况如下：</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics1/Expressionomics1_3.png" class="img-responsive"
                        alt="Image">
                    <p>功能性区域Peak分布</p>
                </div>
            </div>
            <div class="secondTitle">Peak序列Motif分析</div>
                <div class="secondContent">
                    <div>转录因子往往倾向于结合在特定的 DNA 序列上，这些 DNA 序列通常具有高度相似的核苷酸序列模式，即每个转录因子都有一个目标 DNA 序列的 Motif，
                        公开发表的转录因子数据库中一般记录了转录因子对应的 Motif 信息。对 Peak 序列计算 Motif，
                        在公共数据库中搜索这些 Motif 对应的转录因子，即可得到此种状态下染色质开放区可能结合的转录因子。</div>
                    <div class="imgClass">
                        <img src="../../../assets/serverImg/Expressionomics1/Expressionomics1_4.png" class="img-responsive"
                            alt="Image">
                        <p>Motif分析示意图</p>
                    </div>
                </div>
            <div class="secondTitle">Peak邻近基因GO富集分析</div>
            <div class="secondContent">
                <div>统计Peak邻近基因显著富集的GO条目，从而展示可能被转录因子调控的基因功能，对每个Peak邻近基因进行GO注释，得到其所有的GO功能条目。</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics1/Expressionomics1_5.png" class="img-responsive"
                        alt="Image">
                    <p>GO富集柱状图</p>
                </div>
            </div>
            <div class="secondTitle">差异Peak邻近基因Pathway富集分析</div>
            <div class="secondContent">
                <div>统计各个KEGG Pathway上包含的差异Peak邻近基因数目及富集程度，进而确定差异Peak邻近基因主要参与的代谢途径和信号通路。</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics1/Expressionomics1_6.png" class="img-responsive"
                        alt="Image">
                    <p>KEGG富集分析</p>
                </div>
            </div>
            <div class="secondTitle">Overlap基因分析</div>
            <div class="secondContent">
                <div>为了研究转录因子/组蛋白修饰是如何调控下游基因，通常要结合表达数据 RNA-seq 分析，进一步研究转录因子/组蛋白修饰的调控作用，即促进或抑制基因表达。</div>
                <div class="imgClass">
                    <img src="../../../assets/serverImg/Expressionomics1/Expressionomics1_7.png" class="img-responsive"
                        alt="Image">
                    <p>韦恩图</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Expressionomics1",
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
