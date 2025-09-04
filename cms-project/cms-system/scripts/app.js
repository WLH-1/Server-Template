import { categories, statuses } from './data.js';
import { formatDate, getExcerpt, generateId, debounce } from './utils.js';

const { createApp, ref, computed, reactive, onMounted, nextTick } = Vue;

const app = createApp({
    setup() {
        const articles = ref([]);
        // 默认 SEO 配置
        const defaultSeo = ref({});
        const currentArticle = reactive({
            _id: 0,
            title: "",
            content: "",
            category: "",
            status: "draft",
            author: "管理员",
            lastSaved: "",
            wordCount: 0
        });

        const searchText = ref("");
        const categoryFilter = ref("");
        const statusFilter = ref("");
        const showPreviewModal = ref(false);
        const previewHTML = ref("");
        const generateMessage = ref("");    // 生成HTML提示
        const previewMessage = ref("");     // 预览提示
        const isLoading = ref(false);
        const showDefaultSeoModal = ref(false);

        const wordCount = computed(() => {
            if (!currentArticle.content) return 0;

            // 去掉 HTML 标签
            const text = currentArticle.content.replace(/<[^>]*>/g, '').trim();
            if (!text) return 0;

            // 匹配每个中文、英文、数字、标点符号
            const matches = text.match(/[\u4e00-\u9fff]|[a-zA-Z0-9]|[\p{P}]/gu);
            return matches ? matches.length : 0;
        });


        const filteredArticles = computed(() => {
            return articles.value.length;
        });

        const currentPage = ref(1);          // 当前页码
        const pageSize = ref(10);            // 每页文章数量（可以改成 5、20 等）
        const totalPages = ref(0)
        const pagesTotal = ref(0)

        const showImageModal = ref(false);
        const selectedFile = ref(null);

        const insertImage = () => {
            showImageModal.value = true;
        };

        const handleFileChange = (e) => {
            selectedFile.value = e.target.files[0];
        };


        const uploadImage = async () => {
            if (!selectedFile.value) return;

            const formData = new FormData();
            formData.append('file', selectedFile.value);
            console.log(selectedFile.value);

            try {
                const res = await axios.post('http://127.0.0.1:3001/cms/upload/image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                const imgUrl = res.data.payload.url;
                const editor = document.querySelector('.editor');
                editor.focus();

                const range = window.getSelection().getRangeAt(0);

                // 创建居中 figure 包裹 img
                const figure = document.createElement('figure');
                figure.classList.add("image-center"); // 添加类名
                figure.style.textAlign = "center";

                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = "上传图片";

                figure.appendChild(img);

                // 插入图片
                range.insertNode(figure);

                // ✨ 在图片后插入一个空段落
                const br = document.createElement('p');
                br.innerHTML = "<br>";
                figure.insertAdjacentElement("afterend", br);

                // ✨ 把光标移动到空段落里
                const newRange = document.createRange();
                newRange.setStart(br, 0);
                newRange.collapse(true);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(newRange);

                // 更新文章内容
                currentArticle.content = editor.innerHTML;
                showImageModal.value = false;
                selectedFile.value = null;
            } catch (err) {
                console.error('上传失败', err);
            }
        };

        // 保存/恢复光标
        let savedRange = null;
        const saveSelection = () => {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0) {
                savedRange = sel.getRangeAt(0);
            }
        };
        const restoreSelection = () => {
            if (savedRange) {
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(savedRange);
            }
        };

        const updateContent = (event) => {
            saveSelection();
            currentArticle.content = event.target.innerHTML;
            nextTick(() => {
                restoreSelection();
            });
        };


        const loadArticle = async (articleId) => {
            // 1. 先保存当前文章
            await saveCurrentArticle();

            // 2. 加载新文章
            const article = articles.value.find(a => a._id === articleId);
            if (article) {
                Object.assign(currentArticle, { ...article });
                const editor = document.querySelector('.editor');
                if (editor) editor.innerHTML = currentArticle.content;
            }
            await getArticles()
        };

        const saveCurrentArticle = async () => {
            // 简单示例：根据实际接口调整
            if (!currentArticle._id) return; // 新建未保存的不操作
            try {
                await axios.put(`http://127.0.0.1:3001/cms/article/${currentArticle._id}`, {
                    title: currentArticle.title,
                    content: currentArticle.content,
                    category: currentArticle.category,
                    status: currentArticle.status,
                    seoTitle: currentArticle.seoTitle,
                    seoDescription: currentArticle.seoDescription,
                    seoKeywords: currentArticle.seoDescription,
                    wordCount: wordCount.value,
                });
                console.log('文章已保存');
            } catch (err) {
                console.error('保存文章失败:', err);
            }
        };

        const saveArticle = async () => {
            if (!currentArticle.title.trim()) {
                generateMessage.value = "请输入文章标题";
                setTimeout(() => generateMessage.value = "", 3000);
                return;
            }

            isLoading.value = true;  // 显示加载动画

            await new Promise(resolve => setTimeout(resolve, 500)); // 模拟延迟

            await toSaveArticle()
            isLoading.value = false;  // 隐藏加载动画
            generateMessage.value = "文章已保存成功";
            setTimeout(() => generateMessage.value = "", 3000);
            await getArticles()
        };

        const toGetListAdd = async () => { 
            currentPage.value++
            isLoading.value = true;

            try {
                await getArticles();      // 刷新文章列表
                if (articles.value.length > 0) {
                    Object.assign(currentArticle, articles.value[0]);
                }
                const editor = document.querySelector('.editor');
                if (editor && currentArticle.value) {
                    editor.innerHTML = currentArticle.content;
                }
            } catch (err) {
                console.error('创建新文章失败:', err);
            } finally {
                isLoading.value = false;
            }
        }
        const toGetListCut = async () => {
            currentPage.value--
            isLoading.value = true;

            try {
                await getArticles();      // 刷新文章列表
                if (articles.value.length > 0) {
                    Object.assign(currentArticle, articles.value[0]);
                }
                const editor = document.querySelector('.editor');
                if (editor && currentArticle.value) {
                    editor.innerHTML = currentArticle.content;
                }
            } catch (err) {
                console.error('创建新文章失败:', err);
            } finally {
                isLoading.value = false;
            }
        }

        const createNewArticle = async () => {
            isLoading.value = true;

            try {
                await createArticle();    // 调接口创建文章
                await getArticles();      // 刷新文章列表

                if (articles.value.length > 0) {
                    Object.assign(currentArticle, articles.value[0]);
                }
                const editor = document.querySelector('.editor');
                if (editor && currentArticle.value) {
                    editor.innerHTML = currentArticle.content;
                }

            } catch (err) {
                console.error('创建新文章失败:', err);
            } finally {
                isLoading.value = false;
            }
        };

        const showPreview = async () => {
            if (!currentArticle.title.trim()) {
                previewMessage.value = "请输入文章标题";
                setTimeout(() => previewMessage.value = "", 3000);
                return;
            }
            saveArticle();
            await new Promise(resolve => setTimeout(resolve, 500)); // 模拟延迟
            generatePreview();
            showPreviewModal.value = true;
        };

        const generatePreview = () => {
            const description = currentArticle.content
                .replace(/<[^>]+>/g, '') // 去掉 HTML 标签
                .slice(0, 150);          // 截取前150字符作为描述

            previewHTML.value = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${currentArticle.title}</title>
            <meta name="description" content="${description}">
            <meta name="keywords" content="${categories[currentArticle.category] || '文章'},CMS,内容管理">
            <!-- Open Graph -->
            <meta property="og:title" content="${currentArticle.title}">
            <meta property="og:description" content="${description}">
            <meta property="og:type" content="article">
            <meta property="og:image" content="https://你的域名.com/default-cover.png">

            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background: #fff; }
                .article-header { border-bottom: 2px solid #3498db; padding-bottom: 15px; margin-bottom: 25px; }
                .article-title { color: #2c3e50; margin: 0 0 10px 0; font-size: 2em; }
                .article-meta { color: #7f8c8d; font-size: 14px; }
                .article-content { font-size: 16px; line-height: 1.8; }
                .article-content h2 { color: #2c3e50; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
                .article-content p { margin-bottom: 15px; }
                .article-content img { max-width: 100%; height: auto; border-radius: 5px; margin: 15px 0; }
                .article-content blockquote { border-left: 4px solid #3498db; padding-left: 15px; margin-left: 0; color: #555; font-style: italic; background: #f9f9f9; padding: 10px 15px; }
                .article-content ul, .article-content ol { margin: 15px 0; padding-left: 20px; }
                .article-content li { margin-bottom: 5px; }
                .article-footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #eee; font-size: 14px; color: #7f8c8d; }
                .editor img,
.article-content img,
.editor-img {
    display: block;
    margin: 15px auto;
    /* 水平居中 + 上下间距 */
    max-width: 100%;
    height: auto;
}

.image-center {
    display: flex;
    justify-content: center;
    margin: 1em 0;
    /* 上下留点间距 */
}
                </style>

        </head>
        <body>
            <article>
                <header class="article-header">
                    <h1 class="article-title">${currentArticle.title}</h1>
                    <div class="article-meta">
                        <span>分类: ${categories[currentArticle.category] || '未分类'}</span> | 
                        <span>发布时间: ${formatDate(currentArticle.updatedAt)}</span>
                    </div>
                </header>
                <div class="article-content">${currentArticle.content}</div>
                <footer class="article-footer">
                    <p>字数: ${currentArticle.wordCount} | 状态: ${statuses[currentArticle.status]}</p>
                </footer>
            </article>
        </body>
        </html>
    `;
        };

        const generateHTML = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:3001/cms/generateHtml/${currentArticle._id}`);

                // 后端返回的数据结构：{ message: "生成成功", url: "http://127.0.0.1:3001/articles/xxx.html" }
                const fileUrl = res.data.payload.url;

                // 打开新页面预览
                window.open(fileUrl, "_blank");

                generateMessage.value = "HTML 文件生成成功";
                setTimeout(() => generateMessage.value = "", 3000);
                await getArticles()
            } catch (err) {
                console.error("生成失败", err);
            }
        };


        // 替换 execCommand 的方法
        // --- 工具函数 ---
        const getElement = (node) => node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

        const setCaretAfter = (node) => {
            const r = document.createRange();
            r.setStartAfter(node);
            r.collapse(true);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
        };

        const setCaretInsideEnd = (el) => {
            const r = document.createRange();
            r.selectNodeContents(el);
            r.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
        };

        const unwrapElement = (el) => {
            const parent = el.parentNode;
            const lastChild = el.lastChild;
            while (el.firstChild) parent.insertBefore(el.firstChild, el);
            parent.removeChild(el);
            if (lastChild) setCaretAfter(lastChild);
        };

        const wrapSelectionWith = (tagName) => {
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            const wrapper = document.createElement(tagName);
            // 用 extractContents 防止 surroundContents 在跨元素时抛错
            wrapper.appendChild(range.extractContents());
            range.insertNode(wrapper);
            return wrapper;
        };

        // --- 行内样式切换（加粗 / 斜体） ---
        const toggleInline = (tagName) => {
            const editor = document.querySelector('.editor');
            editor.focus();

            const sel = window.getSelection();
            if (!sel || sel.rangeCount === 0) return;
            const range = sel.getRangeAt(0);

            const startHost = getElement(range.startContainer).closest(tagName);
            const endHost = getElement(range.endContainer).closest(tagName);

            // 选区折叠：直接插入一个空标签并把光标放进去
            if (range.collapsed) {
                const el = document.createElement(tagName);
                el.appendChild(document.createTextNode(''));
                range.insertNode(el);
                setCaretInsideEnd(el);
                return;
            }

            // 如果首尾都在同一个包裹元素里 → 取消该样式（拆标签）
            if (startHost && startHost === endHost) {
                unwrapElement(startHost);
            } else {
                // 否则添加样式（包裹选区）
                const el = wrapSelectionWith(tagName);
                setCaretAfter(el);
            }
        };

        // --- 块级样式切换（blockquote） ---
        const toggleBlockquote = () => {
            const editor = document.querySelector('.editor');
            editor.focus();

            const sel = window.getSelection();
            if (!sel || sel.rangeCount === 0) return;
            const range = sel.getRangeAt(0);

            const startBQ = getElement(range.startContainer).closest('blockquote');
            const endBQ = getElement(range.endContainer).closest('blockquote');

            // 选区折叠 → 包裹所在段落
            if (range.collapsed) {
                // 找到最近的块级父元素
                let block = getElement(range.startContainer);
                while (block && block !== editor) {
                    const display = window.getComputedStyle(block).display;
                    if (display !== 'inline' && display !== 'inline-block') break;
                    block = block.parentElement;
                }

                if (block && block !== editor) {
                    const bq = document.createElement('blockquote');
                    block.parentNode.insertBefore(bq, block);
                    bq.appendChild(block);
                    setCaretInsideEnd(bq); // 光标放在 blockquote 内
                } else {
                    const el = wrapSelectionWith('blockquote');
                    setCaretAfter(el);
                }
                return;
            }

            // 选区非折叠 → 如果全在同一个 blockquote 中 → 拆开
            if (startBQ && startBQ === endBQ) {
                unwrapElement(startBQ);
            } else {
                // 否则包裹整个选区
                const el = wrapSelectionWith('blockquote');
                setCaretAfter(el);
            }
        };

        // --- 对外的 formatText（按钮点击入口） ---
        const formatText = (command) => {
            switch (command) {
                case 'bold':
                    toggleInline('strong');
                    break;
                case 'italic':
                    toggleInline('em');
                    break;
                case 'blockquote':
                    toggleBlockquote();
                    break;
            }
            const editor = document.querySelector('.editor');
            // 同步到状态
            currentArticle.content = editor.innerHTML;
        };

        // 保存默认 SEO
        const saveDefaultSeo = async () => {
            try {
                await axios.post(`http://127.0.0.1:3001/cms/seoSetting`, {
                    seoTitle: sanitizeInput(defaultSeo.value.seoTitle),
                    seoDescription: sanitizeInput(defaultSeo.value.seoDescription),
                    seoKeywords: sanitizeInput(defaultSeo.value.seoKeywords),
                });
                console.log('默认 SEO 已保存');
            } catch (err) {
                console.error('保存默认 SEO 失败:', err);
            } finally {
                showDefaultSeoModal.value = false;
                await fetchDefaultSeo();   // 获取默认 SEO
            }
        };

        const insertLink = () => {
            const url = prompt('请输入链接URL:', 'https://');
            if (!url) return;
            const editor = document.querySelector('.editor');
            editor.focus();
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) return;
            const range = selection.getRangeAt(0);
            const a = document.createElement('a');
            a.href = url;
            a.target = "_blank";
            a.appendChild(range.extractContents());
            range.insertNode(a);
            currentArticle.content = editor.innerHTML;
        };

        const filterArticles = debounce(async () => { 
            isLoading.value = true;
            await getArticles()
            isLoading.value = false;
        }, 300);


        // 转义或清理
        const sanitizeInput = (str) => {
            if (!str) return '';
            return str.replace(/[<>&"'\/]/g, s => ({
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;',
                "'": '&#039;',
                '/': '&#x2F;'
            }[s]));
        }


        // ------------------ API 方法 ------------------
        const fetchDefaultSeo = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:3001/cms/seoSetting');
                if (res.data.code == 200) {
                    const seoData = res.data.payload;
                    defaultSeo.value = {
                        seoTitle: seoData.seoTitle || defaultSeo.value.seoTitle,
                        seoDescription: seoData.seoDescription || defaultSeo.value.seoDescription,
                        seoKeywords: seoData.seoKeywords || defaultSeo.value.seoKeywords,
                    };
                } else {
                    console.error('获取默认 SEO 失败:', err);
                }
            } catch (err) {
                console.error('获取默认 SEO 失败:', err);
            }
        };

        const getArticles = async () => {
            try {
                const params = {
                    search: searchText.value,
                    category: categoryFilter.value,
                    status: statusFilter.value,
                    page: currentPage.value,
                    pageSize: pageSize.value
                }
                const res = await axios.get('http://127.0.0.1:3001/cms/article', {
                    params: params   // axios GET 的标准写法
                });
                const data = res.data.payload.data || [];
                pagesTotal.value = res.data.payload.total
                totalPages.value = Math.ceil(pagesTotal.value / pageSize.value); // 总页数
                articles.value = data;
            } catch (err) {
                console.error('查询文章列表失败', err);
            }
        };

        const createArticle = async () => {
            try {
                const res = await axios.post('http://127.0.0.1:3001/cms/article');
                currentArticle.value = res.data.payload;
            } catch (err) {
                console.error('创建文章失败:', err);
            }
        };

        const toSaveArticle = async () => {
            const payload = {
                title: currentArticle.title,
                content: currentArticle.content,
                category: currentArticle.category,
                status: currentArticle.status,
                seoTitle: currentArticle.seoTitle,
                seoDescription: currentArticle.seoDescription,
                seoKeywords: currentArticle.seoKeywords,
                wordCount: wordCount.value,
            };
            try {
                await axios.put(`http://127.0.0.1:3001/cms/article/${currentArticle._id}`, payload);
            } catch (err) {
                console.error('创建文章失败:', err);
            }
        };
        const copyUrl = async (url) => {
            if (!url) return;
            navigator.clipboard.writeText(url).then(() => {
                this.$message.success('网址已复制'); // 如果你用 element-plus 或 vant
            }).catch(() => {
                this.$message.error('复制失败');
            });
        };

        onMounted(async () => {
            await fetchDefaultSeo();   // 获取默认 SEO
            await getArticles()

            if (articles.value.length > 0) {
                loadArticle(articles.value[0]._id);
            }
        });

        return {
            articles,
            defaultSeo,
            currentArticle,
            searchText,
            categoryFilter,
            statusFilter,
            showPreviewModal,
            previewHTML,
            wordCount,
            filteredArticles,
            categories,
            statuses,
            isLoading,
            showDefaultSeoModal,
            currentPage,
            pageSize,
            totalPages,
            pagesTotal,
            showImageModal,
            selectedFile,
            uploadImage,
            handleFileChange,
            loadArticle,
            saveArticle,
            createNewArticle,
            updateContent,
            showPreview,
            generateHTML,
            formatText,
            insertLink,
            insertImage,
            filterArticles,
            formatDate,
            getExcerpt,
            saveDefaultSeo,
            toGetListAdd,
            toGetListCut,
            copyUrl
        };
    }
});

app.mount('#app');
