<template>
    <div id="Unicellular2">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                10x Genomics Visium空间转录组可将完整组织切片中细胞的基因表达数据与其所在的空间位置信息相结合，
                在识别不同细胞群的同时保留其原有的空间位置，这有助于理解细胞如肿瘤微环境中细胞功能、表型和位置的关系，
                其广泛应用于神经科学、发育生物学、肿瘤等多种研究领域。
            </div>
            <div style="color: #666666; margin-top: 20px; padding: 0 20px;">
                <div>标准分析</div>
                <div>
                    1. 测序结果统计
                </div>
                <div>
                    2. 数据质控统计
                </div>
                <div>
                    3. 比对结果统计
                </div>
                <div>
                    4. 基因表达定量分析
                </div>
                <div>
                    5. Marker基因鉴定
                </div>
                <div>
                    6. 细胞类型注释
                </div>
                <div>
                    7. 单样本/多样本细胞聚类分析
                </div>
                <div>
                    8. 特异marker基因差异分析
                </div>
                <div>
                    9. 样本间相同cluster基因差异分析
                </div>
                <div>
                    10. cluster差异表达基因GO功能分析
                </div>
                <div>
                    11. cluster差异表达基因Pathway功能分析
                </div>
                <div>
                    12. cluster差异表达基因TF编码能力预测
                </div>
                <div>
                    13. cluster差异表达基因蛋白互作分析
                </div>
                <div>
                    14. cluster基因相关性网络分析
                </div>
                <div>
                    15. 表型和位置关系分析
                </div>
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular2/Unicellular2_1.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular2/Unicellular2_2.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="text-center title">分析内容展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular2/Unicellular2_3.png" class="img-responsive" alt="Image">
            </div>
            <div class="text-center title">分析结果</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular2/Unicellular2_4.png" class="img-responsive" alt="Image">
                <img src="../../../assets/serverImg/Unicellular2/Unicellular2_5.png" class="img-responsive" alt="Image">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Unicellular2",
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
