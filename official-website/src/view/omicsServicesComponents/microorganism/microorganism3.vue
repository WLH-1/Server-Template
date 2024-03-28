<template>
    <div id="microorganism3">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="secondTitle">宏基因组测序研究</div>
            <div class="secondContent" style="text-indent: 2em;">
                宏基因组学(Metagenomics)研究通过全基因组鸟枪法(Whole Genome
                Shotgun，WGS)测序策略，将提取获得的微生物组总DNA随机打断为短片段，并构建合适长度的插入片段文库，对这些文库进行双端(Paired-end，PE)高通量测序，从而能精细地展示整个菌群的功能代谢谱和物种精细组成谱，进而在组成和功能水平分别挖掘关键生物
                标记物，从原理上阐明微生物群落在生态系统中发挥作用的根本机制。
            </div>
            <div class="secondTitle">宏基因组测序项目流程</div>
            <div class="secondContent">
                <div>微生物组总DNA提取→DNA片段化→连接接头序列→纯化、富集DNA片段→测序文库定量→上机进行高通量测序→生信分析</div>
            </div>
            <div class="text-center title">宏基因组测序产品特点</div>
            <div class="secondContent" style="margin-top: 20px;">
                <div>1、直接对群落样本中的基因片段进行测序，真实再现群落复杂而精密的生态功能；</div>
                <div>2、样本类型涵盖各类生境，微量提取成功率高；</div>
                <div>3、使用Illumina NovaSeq超高通量测序平台，速度更快周期更短；</div>
                <div>4、功能+物种，双管齐下；拼接+不拼接，各取所长，实现对物种和功能的“高分辨率”定量；</div>
                <div>5、根据样本、数据特征，自动选择分析流程，多种功能注释数据库可选，优化宏基因组功能代谢谱注释；</div>
                <div>6、通过多种多变量统计分析和机器学习方法，系统、深入地挖掘宏基因组大数据中差异相关的关键物种和关键功能，识别关键生物标记物。</div>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism3/microorganism3_1.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism3/microorganism3_2.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism3/microorganism3_3.png" class="img-responsive" alt="Image">
                <p>功能—物种一致性分析</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism3/microorganism3_4.png" class="img-responsive" alt="Image">
                <p>差异KO的代谢通路映射图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism3/microorganism3_5.png" class="img-responsive" alt="Image">
                <p>GO富集网络图</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "microorganism3",
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
   .secondTitle{
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
}
</style>
