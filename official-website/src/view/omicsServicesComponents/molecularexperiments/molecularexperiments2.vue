<template>
    <div id="molecularexperiments2">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                荧光定量PCR(Real-Time PCR)技术，即是在PCR反应体系中加入荧光物质，利用荧光信号积累实时监测整个PCR进程，对未知模板进行定量分析的方法。
            </div>
           
            <div class="text-center title">服务流程</div>
           <div class="content">
                <div>1、根据基因序列设计特异性的引物和荧光探针</div>
                <div>2、从细胞或特定组织中提取总RNA</div>
                <div>3、 制作标准曲线：使用设计合成的引物，以客户提供的Total RNA样品为模板，进行Real Time PCR反应，确认引物模板的反应性能。然后将模板进行5个浓度梯度稀释，制作标准曲线，以供进一步定量分析使用</div>
                <div>4、Real Time PCR反应及定量分析：对客户提供的RNA Sample，进行Real Time RT-PCR反应，并进行定量分析。用相对定量方法进行定量分析时，要对管家基因等参比基因进行同样操作，用所得到的值进行RNA量的校正，最后求得目的基因的相对表达量</div>
                <div>5、提供实验报告：包括详细的实验方法及实时荧光定量PCR实验结果的相关图表  </div>
            </div>
            <div class="text-center title">实验周期及价格</div>
             <div class="imgClass">
                    <img src="../../../assets/serverImg/molecularexperiments2/molecularexperiments2_1.png"
                        class="img-responsive" alt="Image">
            </div>
            <div class="text-center title">服务流程</div>
               <div class="content">
                    完整的实验报告，包括实验过程、所用仪器试剂、扩增曲线、标准曲线和相关分析数据
                </div>
            <div class="text-center title">服务说明</div>
            <div class="content">
                <div>1、请提供尽量多的实验材料：动物细胞数为106以上，动物组织为100 mg以上</div>
                <div>2、客户须在实验开始前保证其细胞或组织中有目的基因的表达，并提供目的基因的相关信息（基因名称、序列等信息）</div>
                <div>3、客户应对所提供的材料及信息负责，如因客户提供的材料及信息不准确而引起的实验延误或经济损失由客户承担</div>
                <div>4、PCR所需引物/探针（如果用探针法），可以由您自己提供，也可以委托本公司设计合成（费用另计）。如果由您自己提供，是PAGE纯化的干粉，本公司不接受已溶解的引物/探针。</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "molecularexperiments2",
    data() {
        return {
            rightIndex: 0,
            btnList: [
                {
                    name: "产品介绍",
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
