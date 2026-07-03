# 第十八阶段博客系统化复盘

日期：2026-06-15

## 结论

第十八阶段不继续堆页面，而是把博客从“已有文章列表”推进到“可持续写作系统”。

本阶段完成了三件事：

- 复盘 Phase 1 至 Phase 17 的全部工作，确认当前站点已经从视觉原型演进为公开可访问的个人 Studio。
- 从专家和真实读者视角审查博客，明确优点、缺点和优先级。
- 落地一个小而关键的结构改进：文章 metadata 增加 `language` 和 `intent`，博客列表增加语言筛选和写作系统说明，文章详情 metadata rail 显示语言和写作意图。

判断：博客现在不是缺“炫酷组件”，而是缺稳定栏目、内容节奏和更强的阅读路径。当前阶段先补信息架构，比继续加视觉特效更有价值。

## 过去全部工作的复盘

### 已经成立的部分

1. 视觉基础已经稳定

首页从最初的 `Primer x Claude x Linear x Apple` 融合方向，落成了偏 `Developer Atelier` 的个人工作室气质。它不像模板站，也没有滑向高密度 SaaS 控制台。

2. 公开路由已经比较完整

当前公开表面包括：

- `/`
- `/blog`
- `/blog/[slug]`
- `/projects`
- `/projects/[slug]`
- `/photos`
- `/music`
- `/knowledge`
- `/uses`
- `/about`
- `/lab`
- `/contact`
- `/collaboration`
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`

这解决了用户之前指出的关键问题：页面不能只在内部存在，必须从公开导航和真实链接进入。

3. 程序员风格已经有真实语义

当前的程序员风格不是假终端，而是由这些东西组成：

- Command Center。
- SourceReveal。
- CommandTraceToast。
- ReadingFocusLens。
- Knowledge backlinks。
- Case Study Diff evidence link。
- Lab ComponentPreview。
- GitHub issue templates。
- 飞书知识库同步记录。

这些构件都服务真实使用路径，而不是只制造“技术感”。

4. 中文内容进入了公开站点

第十七阶段新增：

- 中文博客 `/blog/chinese-as-product-memory`。
- Knowledge 中文条目。
- Uses 中文工作流。
- About 中文原则与协作约定。

这说明中文不再只是飞书里的内部记录，而开始成为公开产品表达的一部分。

### 仍然薄弱的部分

1. 内容量还不足

博客目前只有少量 starter posts。视觉和交互已经超过内容本身的体量，这是当前最大不均衡。

2. 博客栏目规则不足

以前只有 tags，没有明确回答：

- 哪些文章用中文写？
- 哪些文章保留英文？
- 一篇文章属于产品判断、技术原则、交互研究，还是阶段复盘？
- 新文章应该进入哪个长期栏目？

3. 阅读路径还浅

读者可以打开文章，但读完之后还缺少更强的下一步路径：

- 相关文章。
- 关联 Knowledge。
- 关联项目。
- 关联 Lab 组件。
- 文章所属系列。

4. 中文和英文的职责需要系统化

第十七阶段证明中文内容可以进入站点，但还没有把语言本身纳入内容模型。这个阶段已经开始补齐。

## 博客专家审查

### 优点

1. 阅读气质好

页面不是典型技术博客模板，字体、留白、背景和 metadata rail 能支撑较长阅读。文章页有明确的阅读进度、目录和代码块体验。

2. 交互有辨识度

`ReadingFocusLens` 和 `ArticleInteractions` 是有记忆点的。它们有程序员风格，但没有污染正文阅读。

3. 内容源可维护

MDX 注册表、metadata、RSS、sitemap 和静态生成已经建立。对个人站来说，这是正确的技术基座。

4. 与其他页面有初步关联

Knowledge 已经可以反链到博客，Command Center 可以搜索文章，首页可以展示精选文章。博客不是孤岛。

5. 中文试点方向正确

中文文章不是翻译英文，而是在承载产品判断和阶段记忆。这比机械双语更有价值。

### 缺点

1. 内容不足导致可信度还不够

现在的博客像一个优秀系统的样板间，但还不像一个长期写作的人真正留下的思想档案。

优先级：P0。

2. 文章分类的可解释性不足

tags 能过滤，但不能表达写作意图。读者不知道一篇文章是原则、复盘、研究、教程还是随笔。

优先级：P0。第十八阶段已开始修复。

3. 语言策略之前没有进入 UI

中文内容上线后，列表页没有显式语言线索；文章详情也没有展示语言和意图。这会让中文内容看起来像偶然插入。

优先级：P0。第十八阶段已修复首版。

4. 文章详情缺少“读完后继续去哪”

当前文章页的结尾没有 related posts、linked knowledge 或 project references。读者读完后容易断流。

优先级：P1。

5. 搜索和筛选没有 URL 状态

目前筛选是客户端状态，不能复制一个“中文文章筛选结果”链接。

优先级：P1。

6. RSS 和 SEO 的语言表达还可以更细

RSS 已可用，但还没有利用语言、系列、OG 图片等增强订阅和分享质量。

优先级：P2。

## 本阶段实现

### 内容模型

`PostMeta` 新增：

- `language: "English" | "中文"`
- `intent: string`

每篇文章都必须声明语言和写作意图。

### 博客列表

`/blog` 新增：

- 写作系统说明面板。
- 标签筛选。
- 语言筛选。
- 文章卡片显示语言和写作意图。

当前策略：

- 中文承载判断、复盘、协作语境和项目记忆。
- English 保留技术语境、设计工程语义和开源生态表达。

### 文章详情

`/blog/[slug]` 的 metadata rail 新增：

- Language。
- Intent。

### 测试

新增 e2e 覆盖：

- 博客语言筛选能进入中文内容。
- 中文筛选后英文文章不再显示。

顺手修复：

- `FilterBar` 的 `data-testid` 生成支持中文按钮。
- `CommandTraceToast` 改为到达目标路由后再开始清理计时，避免命令跳转成功但目标页追踪反馈消失。

## 优先级路线

### P0：博客内容系统化

下一步必须做：

- 建立 3 条长期写作线：
  - 产品判断：中文为主。
  - 设计工程：英文或中英混合。
  - 项目复盘：中文为主。
- 为每条线补 1 篇真实文章。
- 每篇文章必须有 `language`、`intent`、tags、toc 和至少一个站内关联。

### P1：文章阅读路径增强

需要补：

- `RelatedPosts`。
- `LinkedKnowledge`。
- `NextReading`。
- 文章末尾的项目或 Lab 引用。

目标不是增加推荐算法，而是让读者自然从一篇文章走向一个系统。

### P1：筛选状态可分享

需要把 `/blog` 的筛选状态映射到 URL query：

- `/blog?language=zh`
- `/blog?tag=Product%20Systems`

这会让博客进入更可靠的信息架构，而不是只靠客户端状态。

### P2：分享与订阅增强

需要补：

- 文章 OG 图片。
- RSS item 语言表达。
- 文章 canonical 和更细的 metadata。
- 文章系列页或专题页。

### P3：克制的博客巧思

可以考虑，但不应抢先：

- 代码块旁的 provenance 标记。
- 段落引用 command。
- 文章末尾的 `commit this thought` 小交互。
- 鼠标轻微影响阅读焦点，但仅限文章页边缘区域。

明确不建议：

- 在正文中放强装饰型宠物。
- 大面积粒子、拖尾、炫光。
- 把博客变成展示交互玩具的页面。

## 验收

已通过：

- `npm run lint`
- `npm run build`
- targeted e2e：`command menu opens real lab route|blog language filter reaches Chinese writing`，4 passed。
- `npm run test:e2e`：90 passed。
- 本地生产模式视觉检查：
  - `/blog` desktop：`scrollWidth === clientWidth`。
  - `/blog` mobile：`scrollWidth === clientWidth`。
  - `/blog/chinese-as-product-memory` mobile：`scrollWidth === clientWidth`。
- 截图：
  - `/tmp/phase18-blog-desktop.png`
  - `/tmp/phase18-blog-mobile.png`
  - `/tmp/phase18-zh-article-mobile.png`

部署：

- Primary commit：`6a83294`。
- Vercel deployment：`dpl_AQK2jGhgSEULmsbYdAVDmqyNuzjc`。
- Deployment URL：`https://elegant-developer-studio-krseoboo8.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/AQK2jGhgSEULmsbYdAVDmqyNuzjc`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

生产验证：

- Vercel inspect：deployment `Ready`。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`：90 passed。
- 第一次 production 并发 e2e 前 81 条通过，后续出现 `net::ERR_CONNECTION_CLOSED`。重试式 HTTP 检查核心路由均返回 200，单 worker 全量 e2e 通过，判定为本机到 Vercel alias 的短时连接问题，不是页面功能回归。

外部同步：

- 飞书知识库同步已完成：[51｜第十八阶段博客系统化复盘](https://scnlb1lk96sb.feishu.cn/wiki/UhnbwnuWYiH7lIkmkh4cU1qlnvd)。

## 下一阶段

Phase 19 建议进入“博客阅读路径增强”：

- 为文章页添加 `RelatedReading` 区域。
- 将 Knowledge 与 Blog 建立双向引用。
- 补一篇真实中文文章，主题建议：`为什么个人主页需要项目地图`。
- 把筛选状态推进到 URL query。

这比继续加页面更重要，因为当前站点已经有足够多的表面，下一步要提升的是内容之间的结构密度和读者路径。
