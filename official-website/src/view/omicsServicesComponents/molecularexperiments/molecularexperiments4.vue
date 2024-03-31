<template>
    <div id="molecularexperiments4">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="text-center title">甲基化BSP介绍</div>
            <div class="content">
                DNA甲基化是较早发现的修饰途径之一，真核生物中甲基化发生于胞嘧啶，即在DNA甲基化转移酶（DNMTs）的作用下的CpG二核苷酸5’端的胞嘧啶转变为5’-甲基胞嘧啶。大量研究表明，DNA甲基化能引起染色质结构、DNA构象、DNA稳定性及DNA与蛋白质相互作用方式的改变，从而控制基因表达。DNA甲基化通常抑制基因表达，去甲基化则诱导了基因重新活化和表达，这种DNA修饰方式在不改变基因序列的前提下实现对基因表达的调控。BSP（Bisulfite
                Sequencing PCR，BSP）克隆测序法，是目前甲基化检测的通用方法。
            </div>
            <div class="text-center title">甲基化BSP实验原理</div>
            <div class="content">
                用亚硫酸氢盐处理基因组DNA，未发生甲基化的胞嘧啶被转化为尿嘧啶，而甲基化的胞嘧啶不变；随后再CpG岛两端设计引物进行PCR，将目的产物纯化后进行TA克隆，每个克隆挑取阳性克隆测序，最后将测得的序列与原始序列比对，统计甲基化位点及数量，并分析甲基化程度。
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/molecularexperiments4/molecularexperiments4_1.png"
                    class="img-responsive" alt="Image">
                <p>基于重亚硫酸盐转化的甲基化分析原理</p>
            </div>

            <div class="text-center title">甲基化服务特点</div>
            <div class="content">
                <div>1、克服了MSP只能作定性研究，可做定量研究；
                </div>
                <div>
                    2、敏感性高，待测DNA中5-甲基胞嘧啶分布不均衡也可检测；
                </div>
                <div>
                    3、只要客户提供基因名称或序列，我们免费设计引物；
                </div>
                <div>4、周期快：2周出结果。</div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="content">
                <div>1、组织样本：≥50 mg， -20℃保存，冰袋运输；
                </div>
                <div>
                    2、DNA样本：体积≥20ul，浓度≥100ng/ul，DNA总量≥2ug，-20℃保存，低温冰袋运输。 </div>
                <div>
                    3、血液样本：要求保存于抗凝管中或冻存管中，体积大于1ml </div>
                <div>
                    4、细胞样本：10^6个以上 </div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/molecularexperiments4/molecularexperiments4_2.png"
                    class="img-responsive" alt="Image">
                    <p style="margin-top: 50px;"></p>
                <img src="../../../assets/serverImg/molecularexperiments4/molecularexperiments4_3.png"
                    class="img-responsive" alt="Image">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "molecularexperiments4",
    data() {
        return {
            rightIndex: 0,
            btnList: [
                {
                    name: "产品介绍",
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
