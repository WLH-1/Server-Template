<template>
    <div id="articlesAndIndustryUpdates">
        <div class="banner container-fuild text-center">行业动态</div>
        <div class="center-block articlesAndIndustryUpdates-title text-center">Nature Methods | GPT-4与单细胞测序结合：对细胞类型进行注释
        </div>
        <div class="container">
            <!-- title   content -->
            <div class="row articlesAndIndustryUpdates-container center-block">
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <div class="content">
                        在单细胞RNA测序分析中，对不同细胞进行准确的类型注释是非常重要的。这个过程往往需要专业知识，通过对比每个细胞群中高表达的基因与已知的细胞类型标记基因来完成。
                        然而，这一过程不仅繁琐而且耗时。今天要和大家分享的，是在《Nature Methods》新上线的一项研究：
                        <p style="color: red;">使用GPT-4语言模型准确注释单细胞RNA测序（scRNA-seq）分析中的细胞类型。</p>
                    </div>
                        <img src="@/assets/pagesImg/GPT4/GPT4-1.png" class="img-responsive">
                    <div class="content">人工智能特别是语言模型在多个领域显示出了巨大的潜力。GPT-4作为一种先进的生成式预训练转换器（Generative Pre-trained
                        Transformer），它在语言理解和生成方面表现出色。研究表明，GPT-4不仅能够在生物医学领域发挥作用，还能通过自动化流程来完成细胞类型的注释工作。</div>
                        <img src="@/assets/pagesImg/GPT4/GPT4-2.png" class="img-responsive">
                        <div class="title">图1：GPT-4细胞类型注释示例以及与其他方法的比较</div>
                    <div class="content">
                        在对GPT-4的评估过程中，研究团队系统性地评估了它在十个数据集上的细胞类型注释性能。这些数据集涵盖了五个物种以及数百种组织和细胞类型。评估的结果显示，GPT-4的注释与原始研究中提供的手动注释高度一致。此外，GPT-4在注释的精确度上明显超过了其他方法，如GPT-3.5和其他一些自动细胞类型注释方法。研究者们开发了一个R软件包GPTCelltype，专门用于GPT-4的自动细胞类型注释。这一工具的使用，显示出比现有方法更高的准确性和速度。它可以快速区分纯净和混合细胞类型，甚至能在输入基因集包含较少基因或受到噪声干扰时，依然保持较高的性能。
                    </div>
                    <div class="content">
                        研究中还探讨了影响GPT-4注释精度的不同因素。结果显示，当使用前十个差异基因作为输入时，GPT-4表现最佳，尤其是当这些差异基因是通过双侧Wilcoxon检验得出时。GPT-4在不同的提示策略下表现出类似的准确度，包括基本提示策略、包含推理步骤的链式思维提示策略，以及重复提示策略。
                    </div>
                    <div class="content">
                        GPT-4在识别某些细胞类型（如免疫细胞中的粒细胞）时表现更佳，但在识别B淋巴瘤等细胞时则遇到困难，这可能是由于缺乏明确的基因集。此外，GPT-4在小型细胞群体（不超过十个细胞）的性能略有下降，这可能是由于可用信息有限。在主要细胞类型（例如T细胞）上，GPT-4的注释与手动注释的完全匹配率更高，而在亚型（例如CD4记忆T细胞）上，仍然有超过75%的匹配率。
                    </div>
                    <div class="content">
                        对于一些细胞类型，GPT-4与手动注释之间的低一致性并不一定意味着GPT-4的注释是不正确的。例如，在被归类为间质细胞的细胞类型中，GPT-4提供了更高的颗粒度注释（例如纤维细胞和成骨细胞），导致部分匹配和较低的一致性。对于被手动注释为间质细胞但由GPT-4识别为纤维细胞或成骨细胞的情况，一型胶原蛋白基因的表达显著高于二型胶原蛋白基因。这与手动注释为软骨细胞、纤维细胞和成骨细胞的细胞中观察到的模式一致，表明GPT-4对间质细胞提供了更准确的细胞类型注释。
                    </div>
                    <div class="content">
                        GPT-4在平均一致性得分上显著超过其他方法。使用GPTCelltype接口的GPT-4在速度上也显著更快，这部分归功于它对标准单细胞分析流程（如Seurat3）中的差异基因的利用。相比其他免费的方法，GPT-4使用在线Web门户会产生20美元的每月费用，但对于该研究中的所有查询，GPT-4
                        API的成本与查询的细胞类型数量呈线性相关，且不超过0.1美元。</div>
                    <div class="content">
                        在复杂的真实数据场景中，GPT-4展示了出色的鲁棒性。GPT-4能够以93%的准确率区分纯净和混合细胞类型，以99%的准确率区分已知和未知细胞类型。即使输入基因集包含较少的基因或受到噪声污染，GPT-4的性能也依然保持较高。此外，在先前的模拟研究中，GPT-4对相同标记基因生成了85%的相同注释，表明其高度的复现性。两个版本的GPT-4在大多数情况下显示出一致的一致性得分，显示出相当的一致性。
                    </div>
                    <div class="content">
                        尽管GPT-4在细胞类型注释方面取得了显著的成就，但仍存在一些局限性和挑战。首先，GPT-4的训练语料库未公开，这使得验证其注释基础变得具有挑战性。因此，要确保注释的质量和可靠性，还需要进行人类专家的评估。其次，人为参与模型的可选微调可能会影响复现性，因为主观性可能限制了模型在大型数据集中的可扩展性。此外，scRNA-seq数据中的高噪声水平和不可靠的差异基因可能对GPT-4的注释产生不利影响。最后，过分依赖GPT-4可能会导致所谓的“人工智能幻觉”，这是指人工智能产生错误或不准确的信息。因此，在进行下游分析之前，推荐由人类专家验证GPT-4的细胞类型注释。
                    </div>
                    <div class="content">
                        虽然本研究集中在标准版本的GPT-4上，但通过高质量的参考标记基因列表对GPT-4进行微调，可能会进一步提高细胞类型注释性能。利用OpenAI提供的诸如‘GPTs’之类的服务进行微调，可能会在未来的研究中发挥重要作用。
                    </div>
                    <div class="content">
                        总的来说，GPT-4在细胞类型注释方面不仅优于现有方法，而且还提供了一种快速、高效且可扩展的解决方案。它在生物信息学领域的应用预示着人工智能技术在生物医学研究中的广泛应用前景。随着人工智能技术的不断进步，我们有理由期待在未来，GPT-4及其后续版本将在生物学数据分析中发挥更加重要的作用。
                    </div>
                    <div class="content">
                        虽然人工智能在生物医学领域的应用仍然处于起步阶段，但GPT-4的这项研究展示了它在未来可能发挥的重要作用。随着技术的进步和应用的深入，期待看到更多类似的创新，不仅能推动科学研究的边界，还能为解决实际的生物医学问题提供有效的工具。GPT-4在单细胞RNA测序分析中的应用只是开始，它的潜力和未来的应用前景值得我们每一个人关注和期待。
                    </div>
                    <div>
                        1，Hou, W., Ji, Z. Assessing GPT-4 for cell type annotation in single-cell RNA-seq analysis. Nat
                        Methods (2024). https://doi.org/10.1038/s41592-024-02235-4
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
}
</style>

