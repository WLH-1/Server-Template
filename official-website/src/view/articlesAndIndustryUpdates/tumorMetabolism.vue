<template>
    <div id="articlesAndIndustryUpdates">
        <div class="banner container-fuild text-center">文献解读</div>
        <div class="center-block articlesAndIndustryUpdates-title text-center">肿瘤代谢调控肿瘤免疫的研究策略</div>
        <div class="container">
            <!-- title   content -->
            <div class="row articlesAndIndustryUpdates-container center-block">
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <div class="content">
                        肿瘤代谢是一个研究热点，nature和cell分别推出了代谢的大子刊nature metabolism和cell
                        metabolism，对于代谢组的研究也有非靶代谢、靶向代谢和空间代谢等多个角度的解析。今天以T细胞耗竭这个肿瘤免疫过程的关键表型为例，讲讲代谢组学在肿瘤免疫研究中的研究策略。
                    </div>
                    <div class="titleMargin">关于代谢物调控T细胞耗竭的机制，下述几个问题是重要的问题：</div>
                    <div class="content">1.代谢物是什么？通过哪些方法可以帮助锁定代谢物？</div>
                    <div class="content">
                        2.代谢物对肿瘤生长、对T细胞免疫起什么作用？抑制T细胞的抗肿瘤作用还是促进T细胞的抗肿瘤作用？关于抑制T细胞抗肿瘤作用，如何描述T细胞的表型？T细胞的肿瘤浸润，不同状态细胞的比例差异，杀伤性分子和耗竭分子的表达差异，TCR克隆型扩增等等。
                    </div>
                    <div class="content">3.代谢物的来源？是肿瘤细胞产生还是环境中的免疫抑制细胞产生？也有可能代谢物来源于肠道，通过肠-器官轴影响肿瘤微环境。</div>
                    <div class="content">
                        4.代谢物调控T细胞耗竭的靶点和机制如何？如果关注的是富马酸，可能有一个捷径可循，富马酸在体内维持一个低水平以维持细胞正常状态，因此富马酸在体内很容易转换为琥珀酸而后进行琥珀酰化。
                        琥珀酰化也是当前的一个研究热点，通过对琥珀酰化修饰组学研究鉴定琥珀酰化底物，就可以把代谢物和T细胞靶点联系起来了。
                        另外，乳酸和乳酸化也是一对代谢物与蛋白修饰的组合，当然，乳酸的机制不仅仅局限于乳酸化，它可以通过研究乳酸化摄入蛋白的调控或者细胞内酸化来进行研究。
                        此外还有其它众多机制，详见图1。图1也列出了各篇参考文献，具体的研究方案，请详见文献全文进行仔细学习。
                    </div>
                    <div class="title">图1：代谢物调控T细胞耗竭的机制研究的一些关键问题</div>
                    <div class="content">由于篇幅所限，无法就上述文献一一进行解读。此文仅以一篇文献为例，讲一讲代谢物影响T细胞功能的机制。</div>
                    <div class="content">这篇文章的研究起点是通过蛋白组学数据进行临床结局的相关性分析，机器学习鉴定到DOCK2与不良的预后相关，
                        而后以DOCK2为起点，往下游筛选互作蛋白验证DOCK2调控T细胞功能的依据，往上游通过肿瘤细胞条件培养基处理以及代谢组学分析鉴定到硫酸软骨素（CS）对DOCK2依赖的T细胞功能的调控作用，
                        又进一步地分析了CS代谢酶SULT2B1的功能，建立了SULT2B1-CS-DOCK2轴对HCC的T细胞耗竭机制的研究。</div>
                    <div class="titleMargin">DOCK2表达与HCC的CD8+T肿瘤浸润相关</div>
                    <div class="content">作者首先利用蛋白组数据进行与临床结局的相关性分析。值得注意的是，此处关于临床结局，关注的是T淋巴浸润(T cell score)，而不是患者的预后。而T cell
                        score，因为CD3蛋白的表达很低，
                        因此用用CD4表达和CD8表达作为T cell score。通过随机森林模型鉴定到DOCK2等蛋白表达与T细胞浸润相关（图2）。DOCK2是一个与淋巴细胞迁移相关的胞质分裂相关激酶，参与CD8
                        T细胞浸润和抗肿瘤作用。 </div>
                    <div class="title">图2：机器学习鉴定到DOCK2与T细胞浸润相关</div>
                    <div class="titleMargin">DOCK2失活促进TIL耗竭</div>
                    <div class="content">首先需要明确DOCK2是否在T细胞表达，作者首先分选了小鼠肿瘤和正常肝脏的T细胞，利用wb鉴定DOCK2的表达，
                        在肿瘤区域的表达高于正常肝脏区域，也高于外周血中的T细胞。为了验证DOCK2对CD8 T细胞的功能，作者将外周血中的CD8 T细胞用DOCK2抑制剂CPYPP处理，
                        并进行RNAseq分析，鉴定到一系列T细胞功能相关基因，如CCR5, CX3CR1, CCR2, PRF1,等在CPYPP处理后表达降低，而IFNG,TNF, CTLA4和PD-1等表达提高，
                        KEGG富集分析显示其富集了TCR信号、细胞因子分泌等通路。通过流式鉴定到CPYPP处理提高TCF-TOX+和PD-1+TIM3+CD8+T细胞，
                        说明DOCK2抑制提高了T细胞耗竭，体外T细胞杀伤实验进一步验证DOCK2抑制降低了T细胞杀伤力。
                        CPYPP处理HCC模型小鼠促进肿瘤进展，降低小鼠生存，降低T细胞浸润和增加T细胞耗竭。作者又构建了Dock2基因敲除小鼠，也获得了一致的结论（图3）。 </div>
                    <div class="title">图3：DOCK2失活促进HCC</div>
                    <div class="titleMargin">DOCK2与TFRC互作维持线粒体稳态</div>
                    <div class="content">
                        为了验证DOCK2促进T细胞耗竭的机制，作者用IP-MS筛选DOCK2的互作蛋白，鉴定到一个线粒体相关蛋白TFRC，因此很自然地将研究关注点注意到线粒体功能上。线粒体的最主要功能是有氧呼吸产生能量，进而对DOCK2抑制剂处理的细胞进行ECAR分析和线粒体形态观察，以及线粒体功能相关基因的富集分析。作者也敲除了TFRC基因，同样也因此你T细胞耗竭。而DOCK2活性影响了与TFRC的互作，进而影响TFRC蛋白降解（图4）。此处作者对DOCK2的功能做了深入的分析，A蛋白的活性影响其于B蛋白的互作，进而影响B蛋白的降解，这是一个相当精致的机制。不过总体而言，文章没有进一步地研究线粒体稳态对T细胞耗竭机制的深入分析。当然，其实该研究的重心在DOCK2的上游，关注肿瘤细胞如何影响T细胞的DOCK2，这也是一个不错的策略。
                    </div>
                    <div class="title">图4：DOCK2-TFRC调控线粒体稳态促进T细胞耗竭</div>
                    <div class="titleMargin">肿瘤来源的CS促进DOCK2失活</div>
                    <div class="content">作者将目标聚焦到了DOCK2失活的机制上，因此将目光转移到肿瘤细胞，将肿瘤细胞和T细胞共培养，
                        发现经肿瘤细胞共培养的T细胞DOCK2活性下降。于是重点分析肿瘤细胞引起DOCK2活性下降的机制。
                        作者首先对肿瘤细胞的培养上清做了代谢组学测定，在上调的代谢物中，CS曾被报道可以抑制DOCK2活性，
                        因此将研究靶点落脚在CS上。首先用CS处理T细胞，发现处理后确实可以降低DOCK2活性以及促进T细胞耗竭。
                        而后用CS处理小鼠，确实小鼠的肿瘤生长更快，生存更差；以及T细胞浸润更少，T细胞耗竭更多。而后又用质谱流式进一步验证（图5）。 </div>
                    <div class="title">图5：CS抑制DOCK2活性，引起T细胞耗竭 </div>
                    <div class="titleMargin">CS上游的SULT2B1作为新靶点进行机制和治疗靶点的探索</div>
                    <div class="content">
                        作者进一步地往上游探索。就代谢物而言，往上游探索是相对容易的思路，可以聚焦于代谢酶，分析代谢酶对关注表型，即T细胞耗竭、抗肿瘤作用的影响。作者关注到了SUTL2B1这个CS合成酶，分析了SUTL2B1的蛋白表达以及与预后的关系，然后敲除SUTL2B1，检测CS的含量、T细胞耗竭和小鼠生存等表型，确定SULT2B1的生物学作用（图6）。
                    </div>
                    <div class="title">图6：SULT2B1调控CS合成，促进T细胞耗竭</div>
                    <div class="content">
                        而后作者针对SULT2B1筛选可能的靶向药物和小分子药物，分别明确APAP和THCL作为可能的药物用于靶向CS合成通路，进而促进T细胞浸润和抑制T细胞耗竭。针对这两个药物处理检测了CS含量和小鼠的预后分析，明确其在临床应用的潜在价值（图7）
                    </div>
                    <div class="title">图7：靶向CS合成通路的临床应用探索</div>
                    <div class="content">通过大队列研究进行标志物的筛选，是目前一个重要的研究方向，但是当筛选到标志物后怎么进行后续的机制研究，尝尝困扰很多临床医生。
                        这一篇文章提供了一个很不错的示例。因为临床结局是T细胞浸润，因此机制研究的表型分析就是T细胞的那一套，
                        包括流式鉴定T细胞类别、wb鉴定T细胞各类分子的表达，以及模型小鼠的肿瘤生长等。明确了靶点确实有相关表型后，
                        就可以进行深入的机制研究。关于DOCK2的机制研究，作者通过IP-MS鉴定到了线粒体蛋白TFRC，可以就TFRC和线粒体功能开展深入分析。
                        不过作者另辟蹊径，从肿瘤细胞的上清中鉴定代谢物，将研究落脚到CS这个肿瘤细胞产生的代谢物上，而后分析CS在肿瘤细胞中的产生机制进而探索临床干预方案，
                        不失为一个不错的思路。在肿瘤微环境研究如火如荼的当下，关注肿瘤细胞和T细胞的通讯是一个不错的切入点，而通讯的介质无非是蛋白、
                        代谢物和外泌体几样。关注细胞间通讯，单细胞测序联合空间转录组测序，针对蛋白靶点进行空间蛋白研究，针对代谢物靶点进行空间代谢物研究，
                        多组学的设计让整个课题更加高大上，发表高分文章的概率也大大提高。 </div>
                    <div class="titleMargin">参考文献</div>
                    <div>
                        1，Ma et al., Cholesterol Induces CD8+ T Cell Exhaustion in the Tumor Microenvironment. Cell Metab.
                        2019 Jul 2;30(1):143-156.e5.<br>
                        2，Ge et al., Fumarate inhibits PTEN to promote tumorigenesis and therapeutic resistance of type2
                        papillary renal cell carcinoma. Mol Cell. 2022 Apr 7;82(7):1249-1260.e7.
                        <br>
                        3，Sun et al., CHSY1 promotes CD8+ T cell exhaustion through activation of succinate metabolism
                        pathway leading to colorectal cancer liver metastasis based on CRISPR/Cas9 screening. J Exp Clin
                        Cancer Res. 2023 Sep 25;42(1):248.
                        <br>
                        4，Wang et al., SULT2B1-CS-DOCK2 axis regulates effector T-cell exhaustion in HCC microenvironment.
                        Hepatology. 2023 Oct 1;78(4):1064-1078.
                        <br>
                        5，He et al., Gut microbial metabolites facilitate anticancer therapy efficacy by modulating
                        cytotoxic CD8+ T cell immunity. Cell Metab. 2021 May 4;33(5):988-1000.e7.
                        <br>
                        6，Kumagai et al., Lactic acid promotes PD-1 expression in regulatory T cells in highly glycolytic
                        tumor microenvironments. Cancer Cell. 2022 Feb 14;40(2):201-218.e9.
                        <br>
                        7，Cheng et al., Cancer-cell-derived fumarate suppresses the antitumor capacity of CD8+ T cells in
                        the tumor microenvironment. Cell Metab. 2023 Jun 6;35(6):961-978.e10.
                        <br>
                        8，Gu et al., Tumor metabolite lactate promotes tumorigenesis by modulating MOESIN lactylation and
                        enhancing TGF-b signaling in regulatory T cells. Cell Rep. 2022 Jun 21;39(12):110986.
                        <br>
                        9，Nava Lauson et al., Linoleic acid potentiates CD8+ T cell metabolic fitness and antitumor
                        immunity. Cell Metab. 2023 Apr 4;35(4):633-650.e9.
                        <br>
                        10， Zhang et al., Lactobacillus plantarum-derived indole-3-lactic acid ameliorates colorectal
                        tumorigenesis via epigenetic regulation of CD8+ T cell immunity. Cell Metab. 2023 Jun
                        6;35(6):943-960.e9.
                        <br>
                        11， Kumagai et al., Lactic acid promotes PD-1 expression in regulatory T cells in highly glycolytic
                        tumor microenvironments. Cancer Cell. 2022 Feb 14;40(2):201-218.e9.
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { WOW } from 'wowjs';
export default {
    name: 'articlesAndIndustryUpdates',
    data() {
        return {

        }
    },
    mounted() {
        this.GoTop()
        var wow = new WOW();
        wow.init();
    },
    methods: {
        GoTop() {
            (function smoothscroll() {
                var currentScroll =
                    document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, 0);
                }
            })();
        },
    }
}
</script>
<style scoped>
.banner {
    color: #fff;
    font-size: 30px;
    height: 150px;
    line-height: 150px;
    background-image: url('../../assets/img/banner_usually.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: scroll;
    background-position: center center;
}

.row {
    margin-right: 0;
    margin-left: 0;
}

#articlesAndIndustryUpdates .articlesAndIndustryUpdates-title {
    margin-top: 40px;
    font-size: 28px;
}

#articlesAndIndustryUpdates .container .articlesAndIndustryUpdates-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 100px 0;
    color: #808080;
    transition: all ease 0.5s;
}

#articlesAndIndustryUpdates .container .articlesAndIndustryUpdates-container .title {
    font-size: 16px;
    line-height: 2em;
    word-wrap: break-word;
}

#articlesAndIndustryUpdates .container .articlesAndIndustryUpdates-container .titleMargin {
    font-size: 16px;
    line-height: 2em;
    word-wrap: break-word;
    margin: 20px 0;
}

#articlesAndIndustryUpdates .container .articlesAndIndustryUpdates-container .content {
    font-size: 14px;
    text-indent: 2em;
    line-height: 2em;
    word-wrap: break-word;
}</style>

