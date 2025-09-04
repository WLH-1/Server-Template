const {
  Article,
  SeoSetting,
} = require("../../app");
const Code = require("../../util/code.util");
const { createResponse } = require("../../util/response.util");
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const path = require('path');
const moment = require("moment");

module.exports = {
  getSeoSetting: async () => {
    let ifExit = await SeoSetting.findOne().lean()
    if (ifExit) {
      return createResponse(Code.OK, "查询SEO默认配置成功", ifExit);
    } else {
      return createResponse(Code.OK, "查询SEO默认配置成功", null);
    }
  },
  setSeo: async (body) => {
    let { seoTitle, seoDescription, seoKeywords } = body;

    // 后端二次防护
    seoTitle = sanitizeHtml(seoTitle || '', { allowedTags: [], allowedAttributes: {} });
    seoDescription = sanitizeHtml(seoDescription || '', {
      allowedTags: ['b', 'i', 'strong', 'em', 'p', 'br'], // 允许少量安全标签
      allowedAttributes: {}
    });
    seoKeywords = sanitizeHtml(seoKeywords || '', { allowedTags: [], allowedAttributes: {} });

    let ifExit = await SeoSetting.findOne().lean();

    if (ifExit) {
      await SeoSetting.updateOne({ _id: ifExit._id }, { seoTitle, seoDescription, seoKeywords });
    } else {
      let newSeoSetting = new SeoSetting({ seoTitle, seoDescription, seoKeywords });
      await newSeoSetting.save();
    }

    return createResponse(Code.OK, "SEO默认配置更新成功");
  },

  // 查询文章
  getArticles: async (query) => {
    let { search, category, status, page, pageSize } = query
    let skip = (parseInt(page) - 1) * parseInt(pageSize) || 0;
    let limit = parseInt(pageSize) || 10;
    let queryPayload = {}

    if (category) {
      queryPayload['category'] = category
    }
    if (status) {
      queryPayload['status'] = status
    }

    if (search) {
      queryPayload["$or"] = [
        { title: { $regex: search, $options: "i" } },
      ];
    }
    const total = await Article.countDocuments(queryPayload);
    data = await Article.find({ ...queryPayload })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    return createResponse(Code.OK, "查询成功", {
      total,
      data
    });
  },
  // 创建新文章
  createArticle: async () => {
    let ifExit = await SeoSetting.findOne().lean()

    let newArticle = new Article({
      title:"新文章",
      content: "<p>在这里输入文章内容...</p>",
      category: "news",
      status:"draft",
      seoTitle: ifExit.seoTitle || "",
      seoDescription: ifExit.seoDescription || "",
      seoKeywords: ifExit.seoKeywords || "",
      wordCount: 12,
      updatedAt: new Date()
    })

    await newArticle.save()
    return createResponse(Code.OK, "新文章创建成功", newArticle);
  },

  updateArticle: async (body, id) => {
    let { title, content, category, status, seoTitle, seoDescription, seoKeywords, wordCount } = body;
    // 后端消毒内容，只允许安全的标签和属性
    const safeContent = sanitizeHtml(content, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'img', 'p', 'br', 'ul', 'ol', 'li'],
      allowedAttributes: {
        'a': ['href', 'target'],
        'img': ['src', 'alt']
      },
      allowedSchemes: ['http', 'https', 'data']
    });

    await Article.updateOne(
      { _id: id },
      { title, content: safeContent, category, status, seoTitle, seoDescription, seoKeywords, wordCount, updatedAt:new Date() }
    );
    return createResponse(Code.OK, "文章保存成功");
  },

  uploadImage: async (file) => {
    if (!file) return createResponse(Code.CONFLICT, '未上传文件');

    const uploadDir = path.resolve(__dirname, '../../static/picture'); // 项目根目录
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const ext = path.extname(file.originalFilename);
    const filename = `${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    fs.renameSync(file.filepath, filepath);

    const fileUrl = `http://127.0.0.1:3001/picture/${filename}`;
    return createResponse(Code.OK, '图片上传成功', { url: fileUrl });
  },

  generateHTML: async (id) => { 
    // 查数据库
    const article = await Article.findById(id);
    const categories = {
      'news': '新闻',
      'tech': '技术',
      'life': '生活',
      'sports': '体育'
    };
    const statuses = {
      'draft': '草稿',
      'published': '已发布',
      'archived': '已归档'
    };
    if (!article) {
      return createResponse(Code.CONFLICT, '文章不存在');
    }
    const description = article.content.replace(/<[^>]+>/g, '').slice(0, 150);
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
      <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${article.seoTitle}</title>
            <meta name="description" content="${article.seoDescription}">
            <meta name="keywords" content="${article.seoKeywords}">

            <!-- Open Graph -->
            <meta property="og:title" content="${article.title}">
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
                    <h1 class="article-title">${article.title}</h1>
                    <div class="article-meta">
                        <span>分类: ${categories[article.category] || '未分类'}</span> | 
                        <span>发布时间: ${moment(new Date()).format('YYYY/MM/DD HH:mm:ss')}</span>
                    </div>
                </header>
                <div class="article-content">${article.content}</div>
                <footer class="article-footer">
                    <p>字数: ${article.wordCount} | 状态: ${statuses[article.status]}</p>
                </footer>
            </article>
        </body>
    </html>
    `;
    //  ✅ 跟上传图片一样的路径规则
    const outputDir = path.resolve(__dirname, '../../public/articles');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const fileName = `${article._id}.html`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, htmlContent, 'utf-8');

    // ✅ 跟上传图片一样拼接访问地址
    const fileUrl = `http://127.0.0.1:3001/articles/${fileName}`;

    await Article.updateOne({ _id: id }, { slug: fileUrl });

    return createResponse(Code.OK, 'HTML生成成功', { url: fileUrl });
  }
}