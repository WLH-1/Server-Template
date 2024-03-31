<template>
    <div id="molecularexperiments1">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                DNA技术以其几乎可以对生物类材料进行鉴定而被广泛应用于动植物物种鉴定。
                DNA技术鉴定动植物物种是物种识别的技术手段。动物种属鉴定是基于动物mtDNA
                中的保守序列COI和植物cpDNA中的保守序列rbcL或matK的PCR扩增和测序，
                将测序结果与公共数据库中的已知序列进行比较后，判定动植物种类，讲未知物种划分到属或种。
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/molecularexperiments1/molecularexperiments1_1.png"
                    class="img-responsive" alt="Image">
                <p>图1、不同条形码和条形码组合的物种分辨率比较</p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/molecularexperiments1/molecularexperiments1_2.png"
                    class="img-responsive" alt="Image">
                <p>图2、不同条形码和条形码组合基于四种分析方法的物种分辨率比较</p>
            </div>
            <div class="text-center title">服务说明</div>
            <div class="content">
                <div>1、标准服务：物种鉴定</div>
                <div>2、升级服务：构建系统发育树、序列上传等</div>
            </div>
            <div class="text-center title">服务内容</div>
                <div class="content">
                    <div>1、我们目前接收的样品形式为：基因组DNA、新鲜的动植物组织。</div>
                    <div>2、基因组DNA的浓度不低于20ng/μl,总体积不少于20μl。</div>
                    <div>3、样品建议您低温运输。</div>
                    <div>4、如果测序结果出现背景峰或套峰，原因为样品不纯，本公司将收取全额实验费用。</div>
                    <div>5、交货内容（标准服务）。</div>
                    <div>6、实验报告（包括PCR产物照片，物种鉴定参考结果等）、测序彩色波形图、序列碱基图。</div>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "molecularexperiments1",
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
