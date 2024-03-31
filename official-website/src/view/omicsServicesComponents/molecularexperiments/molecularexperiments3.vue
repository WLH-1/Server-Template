<template>
    <div id="molecularexperiments3">
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div :class="rightIndex == btnIndex ? 'btnActive' : 'btnUnactive'" class="btn" role="group"
                @click="changeIndex(btnIndex)" v-for="(item, btnIndex) in btnList" :key="btnIndex">
                {{ item.name }}
            </div>
        </div>
        <div class="row" v-if="rightIndex == 0">
            <div class="text-center title">SNPs筛查和鉴定简介</div>
            <div class="content">
                单核苷酸多态性（Single Nucleotide
                Polymorphisms，SNPs），即指由于单个核苷酸碱基的改变而导致的核酸序列的多态性。在不同个体的同一条染色体或同一位点的核苷酸序列中，大多数核苷酸序列一致而只有一个碱基不同的现象，这就是SNP。
            </div>
            <div class="content">
                SNPs所表现的多态性只涉及到单个碱基的变异。一般来说，一个SNPs位点只有两种等位的基因，因此又叫双等位基因。单核苷酸多态性包括单个碱基的缺失和插入，更多情况是单个碱基的置换。通常情况下是一种二等位基因的变异，多为转换，即一种嘧啶碱基换为另一种嘧啶碱基，或一种嘌呤碱基换为另一种嘌呤碱基，转换与颠换之比为2：1。SNP在CG序列上出现频繁，而且多是C→T，因为CG中C即胞嘧啶常为甲基化的，自发脱氨后即变为胸腺嘧啶。SNP的分布不均匀，非转录序列中要多于转录序列，大多数位于蛋白的非编码区。
            </div>
            <div class="content">
                为适应广大用户日益增长的SNPs研究需求，我公司推出的SNPs筛查和鉴定服务，利用以下技术方案为不同客户量身定做个性化的服务。
            </div>
            <div class="text-center title">SNP说明</div>
            <div class="content">
                关于样本质量：在对SNP标记进行基因扫描时，经常会出现某些样本的某些位点无法检出，这通常与样本DNA 的质量有关，可以通过提高样本 DNA
                的质量来避免，但尽管如此，对于每一个样本，尤其是进行大量位点全基因组扫描的样本，仍会有一定比例的未检出现象存在。
            </div>
            <div class="content">
                引物费用：我们推荐的荧光标记有 FAM 、 HEX 、 TAMRA 等，费用请咨询我公司。
            </div>
            <div class="text-center title">客户须知</div>
            <div class="content">
                <div>1、客户尽量保持同一引物的每个模板扩增效率基本一致，我们将每对引物每96孔板随机抽取3个样品进行预实验以确定上样量，如果客户样品扩增效率低或扩增效率不一致导致某些样品未检出信号，我公司仍收取检测费用；
                </div>
                <div>
                    2、为了保持进度，本公司采用批量上样的方法，如果预检测未发现异常，而实际检测后发现异常：如大量样本未扩出或扩增效率低等情况我们会及时通知客户，由客户决定是否继续检测，之前产生的检测费用由客户承担，请客户保持样本质量；
                </div>
                <div>
                    3、客户如果采用一个泳道内放入多个同种标记位点，请确认这些位点的扩增产物大小范围不重叠，以免检测结果无法判读。我们在检测过程中发现问题会及时通知客户，已往检测费用由客户承担。客户如果不知道是否重叠，可以先行提供部分样本分别检测各个位点，根据我们的实验结果来确定，检测费用由客户承担；
                </div>
                <div>
                    4、根据客户提供的信息，软件将自动判读结果，为保证结果的客观性，如客户要求工作人员进行判别，工作人员可以据经验向客户提出意见，此意见仅供参考，公司不为此承担任何责任，请客户根据自己的实验情况判断每个峰的取舍；
                </div>
                <div>5、客户应保持样品的密封性。如需样品返还请提前说明，如无特殊说明，一个月后本公司将处理掉样本，如客户提前未说明返还导致样品丢失本公司不负责任；</div>
                <div>6、对客户的实验结果本公司保留30天，客户如有问题请在30天内提出，30天后将删除试验结果；</div>
                <div>7、为了规范服务流程，避免出现不必要的失误，即使是长期合作项目，客户每次送样必须填写业务订单，谢谢合作，敬请谅解。</div>

            </div>
            <div class="text-center title">SNPs筛查和鉴定的应用领域</div>
            <div class="content">
                由于SNP在人类基因组中数量较多，发生频率较高，因此被认为是继微卫星之后的遗传学标记新方法，在医学遗传学、药物遗传学、疾病遗传学、疾病诊断学、以及人类进化等研究领域都有着很高的研究价值和应用前景。
            </div>
        </div>
        <div class="row" v-if="rightIndex == 1">
            <div class="text-center title">技术线路</div>
            <div class="imgClass">
                <img src="../../../assets/serverImg/molecularexperiments3/molecularexperiments3_1.png"
                    class="img-responsive" alt="Image">
            </div>
        </div>
        <div class="row" v-if="rightIndex == 2">
            <div class="content">
                <div>与我们详细谈论您的要求及提供详细的背景资料，包括SNP位点的选择等；
                </div>
                <div>
                    如果您提供 DNA ：总 DNA 浓度大于 50ng/ μ l ，每个位点需要 200ng ，提供足够使用的 DNA 量，提供有关样品来源及 DNA 提取详细信息；
                </div>
                <div>
                    如果您提供 PCR 产物：产物要通过预实验的电泳检测，特异性要好；
                </div>
                <div>
                    签订委托合同，或者您提供已经标记上荧光的 PCR 产物，我们为您完成其他工作。
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "molecularexperiments3",
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
