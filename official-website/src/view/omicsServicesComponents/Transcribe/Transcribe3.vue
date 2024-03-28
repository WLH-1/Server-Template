<template>
    <div id="Transcribe3">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="text-center title">CircRNA测序介绍</div>
            <div class="content">
                CircRNA（Circular RNA），是一类不具有 5' 末端帽子和 3' 末端 poly（A）尾巴、并以共价键形成稳定闭合环状结构的非编码 RNA 分子。 CircRNA 广泛存在于生物细胞中，对 miRNA
                起重要的调控作用，进而调控基因表达。随着高通量测序技术的发展， CircRNA 在多种真核生物体内被大量鉴定出来，利用高通量测序技术，对生物样本中的CircRNA 进行鉴定、表达丰度检测及结构分析，是 RNA
                领域的研究热点，推动更深入的基因表达研究。
            </div>
            <div class="text-center title">CircRNA测序方案设计</div>
            <div class="content">
                CircRNA 实验设计思路为差异比较，常见的类型为实验组与对照组（case VS
                control），进行两两比较；若考虑时空因素，如按照不同生长发育阶段或者疾病发生发展整个过程进行比较，即进行多重比较分析，然后对差异的CircRNA 来源基因进行预测和富集分析。一组样品建议至少 6 个生物学重复。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe3/Transcribe3_1.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe3/Transcribe3_2.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="text-center title">CircRNA测序分析结果展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe3/Transcribe3_3.png" class="img-responsive" alt="Image">
            </div>
            <div class="text-center title">CircRNA分析内容展示</div>
            <div class="imgClass">
                <p>CircRNA 来源基因 KEGG 富集图</p>
                <img src="../../../assets/serverImg/Transcribe3/Transcribe3_4.png" class="img-responsive" alt="Image">
                <p>组间共有特有差异基因可视化</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Transcribe3",
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
}</style>
