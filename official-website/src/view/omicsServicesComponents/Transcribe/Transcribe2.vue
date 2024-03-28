<template>
    <div id="Transcribe2">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                长链非编码 RNA（Long non-coding RNA, LncRNA）是长度大于 200 个核苷酸的非编码 RNA（不含 rRNA）。研究表明 , LncRNA
                在剂量补偿效应、表观遗传调控、细胞周期调控和细胞分化调控等众多生命活动中发挥重要作用，成为遗传学研究热点。通过 LncRNA 测序，可以快速获得与其生物学过程或者疾病相关的 LncRNA 表达变化，促进其深入研究。
            </div>
            <div class="text-center title">LncRNA测序方案设计</div>
            <div class="content">
                LncRNA 实验设计思路为差异比较，常见的类型为实验组与对照组（case VS
                control），进行两两比较；若考虑时空因素，如按照不同生长发育阶段或者疾病发生发展整个过程进行比较，即进行多重比较分析，然后对差异的LncRNA 进行靶基因预测和富集分析。一组样品建议至少 6 个生物学重复。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe2/Transcribe2_1.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
             <div class="imgClass">
                    <img src="../../../assets/serverImg/Transcribe2/Transcribe2_2.png" class="img-responsive" alt="Image">
             </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="text-center title">LncRNA测序分析内容</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe2/Transcribe2_3.png" class="img-responsive" alt="Image">
            </div>
            <div class="text-center title">LncRNA测序分析结果展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe2/Transcribe2_4.png" class="img-responsive" alt="Image">
                <p>基因结构及表达图</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe2/Transcribe2_5.png" class="img-responsive" alt="Image">
                <p>GO 有向无环图</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Transcribe2",
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
