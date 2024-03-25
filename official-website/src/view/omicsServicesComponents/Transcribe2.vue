<template>
    <div id="Transcribe1">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="text-center title">Small RNA介绍11111</div>
            <div class="content">
                Small RNA ，长度在 18-30nt，主要包括 miRNA、 siRNA 和
                piRNA。在基因表达调控、生物个体发育、代谢及疾病的发生等生理过程中起着重要的作用。Small
                RNA 测序采用 Illumina 测序平台，研究某一物种特定组织在特定状态下的已知
                Small RNA，也可发现新的物种或组织特异Small RNA并预测其靶基因，为研究
                Small RNA
                的功能及此物种的基因调控机制提供了有力工具，已广泛应用于动植物的研究和医学领域。
            </div>
            <div class="text-center title">Small RNA测序方案设计</div>
            <div class="content">
                Small RNA 实验设计思路为差异比较，常见的类型为实验组与对照组（case VS
                control），进行两两比较；若考虑时空因素，如按照不同生长发育阶段或者疾病发生发展整个过程进行比较，即进行多重比较分析，然后对差异的miRNA
                进行靶基因预测和富集分析。一组样品建议至少 6 个生物学重复。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="content">
                <div>一、RNA提取</div>
                <div>二、3'和5'RNA接头连接</div>
                <div>三、PCR扩增</div>
                <div>四、文库定量</div>
                <div>五、上机测序</div>
                <div>六、数据质控</div>
                <div>七、生信分析</div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="text-center title">技术线路</div>
            <div class="subtitle">Small RNA测序样本要求</div>
            <div class="content">
                动物RNA测序样品、动物细胞样本RNA测序样品、动物血液样品、植物RNA测序样品都有具体的样品要求。
                藻类样品：收集新鲜藻类样本（无培养基残留），大于200mg。12000rpm离心，弃上清（无培养基残留），取样后液氮快速冷冻，-80℃冻存，干冰运输，不建议使用RNAlater。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../assets/serverImg/Transcribe1/Transcribe1_1.png" class="img-responsive" alt="Image">
            </div>
            <div class="text-center title">Small RNA测序分析结果展示</div>
            <div class="imgClass">
                <img src="../../assets/serverImg/Transcribe1/Transcribe1_2.png" class="img-responsive" alt="Image">
                <p>共有 miRNA 和特有 miRNA 分析</p>
            </div>
            <div class="imgClass">
                <img src="../../assets/serverImg/Transcribe1/Transcribe1_3.png" class="img-responsive" alt="Image">
                <p>miRNA 基因组分布</p>
            </div>
            <div class="imgClass">
                <img src="../../assets/serverImg/Transcribe1/Transcribe1_4.png" class="img-responsive" alt="Image">
                <p>差异 miRNA 分析</p>
            </div>
            <div class="imgClass">
                <img src="../../assets/serverImg/Transcribe1/Transcribe1_5.png" class="img-responsive" alt="Image">
                <p>miRNA 碱基偏好性分析</p>
            </div>
            <div class="imgClass">
                <img src="../../assets/serverImg/Transcribe1/Transcribe1_6.png" class="img-responsive" alt="Image">
                <p>miRNA- 基因调控网络</p>
            </div>
            <div class="imgClass">
                <img src="../../assets/serverImg/Transcribe1/Transcribe1_7.png" class="img-responsive" alt="Image">
                <p>miRNA- 转录因子调控网络</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Transcribe1",
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
}

.btnActive {
    background-color: #999999;
}

.btnUnactive {
    background-color: #ffffff;
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
