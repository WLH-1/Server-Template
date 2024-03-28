<template>
    <div id="Transcribe4">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="text-center title">真核无参转录组测序产品介绍</div>
            <div class="content">
                指利用高通量测序技术进行cDNA测序，较快地获取某一种特定器官或组织在某一状态下的转录本。目前转录组测序产品有真核有参转录组测序、真核无参转录组测序和原核转录组测序。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe4/Transcribe4_1.png" class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="content">
                <div class="">
                    福尔马林固定石蜡包埋。
                </div>
                <div class="">
                    测序送样要求：新鲜FFPE组织切片，厚度不超过10um（过厚会导致RNA得率低），每次用量大约8片，表面积不超过250mm2。
                </div>
                <div class="">
                    常温运输保存。
                </div>
            </div>
        </div>
        <div class="row" style="padding: 0 10px;" v-if="rightIndex == 3">
            <div class="text-center title">真核无参转录组测序分析内容</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe4/Transcribe4_2.png" class="img-responsive" alt="Image">
            </div>
            <div class="text-center title">真核无参转录组测序分析结果展示</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe4/Transcribe4_3.png" class="img-responsive" alt="Image">
                <p>图1  NR注释统计 </p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe4/Transcribe4_4.png" class="img-responsive" alt="Image">
                <p>图2  KEGG注释 </p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe4/Transcribe4_5.png" class="img-responsive" alt="Image">
                <p>图3  差异表达基因聚类 </p>
            </div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/Transcribe4/Transcribe4_6.png" class="img-responsive" alt="Image">
                <p>图4  SNP 和 InDel 统计</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Transcribe4",
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
