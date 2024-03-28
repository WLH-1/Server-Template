<template>
    <div id="microorganism2">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                扩增子/功能基因测序借助合适的类群特异性引物，可以检测菌群中特定种类/功能微生物的特征序列，反映菌群中该特定类群微生物的组成结构，从而发现它们的分布特征，阐明样本间多样性和组成差异，进而揭示该类群微生物中与差异相关联的关键成员。
            </div>
            <div class="secondTitle">项目流程</div>
            <div class="secondContent">
                <div>微生物组总DNA提取→目标片段PCR扩增→扩增产物检测定量→测序文库制备→上机进行高通量测序 →生信分析</div>
            </div>
            <div class="secondTitle">产品特点</div>
                <div class="secondContent">
                    <div>对特定种类/功能的微生物群落进行研究，比如产甲烷微生物、硝化/反硝化微生物等特定的微生物类群等，好比拿了一把“放大镜”，而消除了其它不相干微生物类群的干扰。</div>
                </div>
                <div class="">
                    <img src="../../../assets/serverImg/microorganism2/microorganism2_1.png" class="img-responsive" alt="Image">
                </div>
            <div class="secondTitle">实验经验丰富：</div>
            <div class="secondContent">
                <div>样本类型全。涵盖动植物、土壤、水体等各类生境；
    基因种类多。涵盖碳氮磷硫代谢、线粒体、叶绿体、重金属抗性等；</div>
            </div>
             <div class="secondTitle">派森诺分析深入：</div>
                <div class="secondContent">
                    <div>FrameBot校正。纠正移码错误，去除非目的序列；BROCC注释算法。替代BLAST，确保“真阳性”；NCBI-nt/nr数据库、功能基因限定参考子集。</div>
                </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/microorganism2/microorganism2_2.png" class="img-responsive" alt="Image">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "microorganism2",
    data() {
        return {
            rightIndex: 0,
            btnList: [
                {
                    name: "产品介绍",
                },
                {
                    name: "技术路线",
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
