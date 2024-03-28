<template>
    <div id="Unicellular1">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="content">
                10x Genomics的Chromium Controller是基于微流控技术的单细胞文库制备系统，可以同时获得100-80,000个单细胞文库，
                通过高通量测序实现对数百个至数万个细胞进行细胞鉴定和基因表达分析。10x Genomics单细胞转录组测序广泛应用于多种细胞类型，
                如干细胞、肿瘤细胞、免疫细胞、生殖细胞、胚胎细胞等，是研究免疫细胞群体、肿瘤异质性、和胚胎发育等最佳选择之一。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular1/Unicellular1_1.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular1/Unicellular1_2.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 3">
            <div class="text-center title">分析内容展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular1/Unicellular1_3.png" class="img-responsive" alt="Image">
            </div>
            <div class="text-center title">分析结果</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Unicellular1/Unicellular1_4.png" class="img-responsive" alt="Image">
                <img src="../../../assets/serverImg/Unicellular1/Unicellular1_5.png" class="img-responsive" alt="Image">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Unicellular1",
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
