<template>
    <div id="microorganism1">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="text-center title">群落多样性组成谱测序</div>
            <div class="content">
                群落多样性组成谱测序以细菌 / 古菌 16S rRNA 基因可变区、真菌 18S r RNA 基因可变区或真菌 ITS（Internal transcribed
                spacer）内转录间隔区等微生物特征序列（Signature sequence）为靶点，通过检测序列的变异和数量，反映群落
                中各类微生物物种的身份和丰度，从而快速解析群落物种分布特征，阐明样本间多样性和组成差异，进而发现差异相 关物种。
            </div>
            <div class="secondTitle">产品特点</div>
            <div class="secondContent">
                <div>1. 直接对群落样本中的微生物特征序列进行扩增检测，简单快速，并克服了大部分微生物无法
                    纯培养的难题；</div>
                <div>2. 自动化、专业的 DNA 提取流程，配合高保真 DNA 聚合酶进行 PCR 扩增，并严格把控扩增循环数，确保
                    群落组成客观真实；</div>
                <div>3. 使用 Illumina NovaSeq/MiSeq 和 PacBio Sequel II 进行测序， 2×250 bp、2×300 bp、>1 kb 的多种长
                    度均可适配，每个样本都能一次性获得数万条序列，即使低丰度物种也能定量；</div>
                <div>4. 采用 QIIME 2 分析流程， DADA2、物种注释、PICRUSt2 功能潜能预测等方法覆盖；</div>
                <div>5. 提供分析结果，和发表等级的动态交互可视化效果。</div>
            </div>
            <div class="secondTitle">项目流程</div>
            <div class="secondContent">
                <div>微生物组总DNA提取→目标片段PCR扩增→扩增产物检测定量→测序文库制备→上机进行高通量测序→生信分析</div>
            </div>
            <div class="secondTitle">分析内容</div>
           <div class="">
                <img src="../../../assets/serverImg/microorganism1/microorganism1_1.png" class="img-responsive" alt="Image">
           </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">典型分析结果展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism1/microorganism1_2.png" class="img-responsive" alt="Image">
                <p>Beta 多样性PCoA分析</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism1/microorganism1_3.png" class="img-responsive" alt="Image">
                <p>关联网络的模块化分析 </p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism1/microorganism1_4.png" class="img-responsive" alt="Image">
                <p>MetagenomeSeq 差异物种曼哈顿图分析</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism1/microorganism1_5.png" class="img-responsive" alt="Image">
                <p>PICRUSt2 功能潜能预测物种组成分层分析</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "microorganism1",
    data() {
        return {
            rightIndex: 0,
            btnList: [
                {
                    name: "产品介绍",
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
    .secondTitle{
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
