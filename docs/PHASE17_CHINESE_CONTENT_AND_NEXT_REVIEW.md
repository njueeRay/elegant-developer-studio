# 第十七阶段：中文内容试点与全站复盘

日期：2026-06-15

## 本阶段判断

个人主页已经不再只是英文作品集，而是一个长期维护的 Studio OS。既然项目讨论、阶段复盘、飞书知识库和用户需求都主要使用中文，中文内容必须进入公开站点，否则站点会和真实工作流脱节。

但当前不应该做整站机械双语。更合适的策略是试点式引入中文内容：少量、可验证、有明确页面职责。

置信度：高。

## 本阶段新增内容

### 博客

新增中文文章：

- `/blog/chinese-as-product-memory`
- 标题：`把中文作为产品记忆`
- 作用：解释为什么中文不是翻译层，而是产品判断、协作和复盘的记忆层。

### Knowledge

新增知识条目：

- `公开可达优先于内部完成`
- 作用：把 Phase 13-16 的硬规则沉淀为可引用决策。

### Uses

新增工作流：

- `中文复盘`
- 作用：把“先本地 Markdown，再同步飞书”的工作方式显性化。

### About

新增原则和协作约定：

- `中文承载判断`
- `中文优先记录判断`
- 作用：让 About 不只是英文身份页，而能表达真实工作方式。

## 对过去全部工作的审查

### 已经做对的部分

1. 视觉气质稳定

站点已经形成了 `Claude Warm AI x Primer x Linear x Apple` 的融合气质：温暖、克制、开发者语义明确，不像模板站，也没有落入假终端或廉价赛博朋克。

2. 信息架构开始成型

`Blog / Projects / Knowledge / Uses / Lab / About / Photos / Music / Contact / Collaboration` 已经不是零散页面，而是一个可扩展的 Studio OS。

3. 追溯机制扎实

GitHub、Vercel、飞书、本地 Markdown、阶段文档、版本追踪和 e2e 测试已经形成闭环。这是项目最大的长期优势。

4. 程序员风格没有跑偏

目前最好的交互不是装饰，而是：

- Command Center。
- Reading Focus。
- SourceReveal。
- Case Study Diff。
- ComponentPreview。
- Copy ref。
- Evidence link。

这些都服务真实使用场景。

5. 飞书知识库开始有云端协作价值

飞书不是文档备份，而是评论、维护和阶段回看的协作层。中文优先规则已经落地。

### 当前明显短板

1. 内容还偏 mock

博客、项目、Uses、About 都已经能跑，但真实个人经历、真实项目指标、真实照片和真实音乐还不足。站点目前“系统感”强于“个人真实感”。

2. Knowledge 还没有详情页

当前 Knowledge 是索引卡片，适合早期规模。但如果中文内容继续增加，后续需要条目详情页或轻量 drawer，否则长解释只能塞在 summary/context 中。

3. Projects 仍缺更强证据

Case Study Diff 已有证据链接，但还没有截图、PR、commit permalink、指标对比或真实 before/after 图。

4. ComponentPreview 还不是完整沙箱

Viewport switch 是正确方向，但它仍是 metadata preview，不是 isolated component playground。

5. 中英文策略尚未系统化

本阶段只是试点。后续需要定义哪些内容必须中文、哪些内容保留英文、哪些内容需要双语摘要。

6. 首屏个人叙事仍偏抽象

Ray Studio 的气质很强，但用户还不能快速知道“这个人具体做过什么、正在追求什么、有哪些真实作品证据”。

## 下一阶段规划

### Phase 18：中文内容系统化

目标：把中文从试点变成可持续内容规则。

范围：

- 定义中文内容策略。
- 为 Blog 增加中文标签策略。
- 为 Knowledge 增加中文决策条目模板。
- 为 About 增加中文短介绍或中文工作原则小节。
- 在 Command Center 中确保中文关键词可被搜索。

验收：

- 中文内容不是散点。
- 中文和英文不会互相污染职责。
- 中文内容在移动端阅读自然。

### Phase 19：真实证据增强

目标：让 Projects 和 Lab 更像可信作品集，而不是漂亮陈述。

范围：

- Case Study Diff 增加截图证据。
- SourceReveal 支持 commit permalink。
- 项目详情增加 `Evidence Rail`。
- Lab preview 增加真实组件状态和更多 source anchors。

验收：

- 每个重点项目至少有 2-3 个可点击证据。
- 证据能被普通用户访问，而不是只有开发者知道路径。

### Phase 20：Knowledge 详情层

目标：让 Knowledge 成为真正的公开知识系统。

范围：

- `/knowledge/[slug]`。
- Backlinks 详情。
- Related entries。
- Copy ref。
- SourceReveal。
- 中文/英文内容标记。

验收：

- Knowledge 不再只是卡片墙。
- 每条知识能被单独分享和评论。

### Phase 21：Reference Constellation

目标：做真实关系驱动的轻量图谱。

原则：

- 只展示真实关系。
- 不做全屏大图谱。
- 不做装饰性节点动画。
- 优先服务“从文章到知识、从项目到组件、从组件到源码”的跳转。

### Phase 22：个人真实层

目标：让站点更像真实的人，而不只是高级系统。

范围：

- 真实照片精选。
- About 增加更具体经历。
- Projects 增加真实背景。
- Uses 增加真实工作台细节。
- 可选：一篇中文自述。

## 创意建议

1. `Margin Notes`

中文博客可以在正文右侧或段落间加入轻量 margin note，用来记录“判断”“反例”“下一步”。这比花哨动效更适合中文长文。

2. `Evidence Rail`

项目详情页右侧放一条证据轨：commit、PR、screenshot、deployment、Feishu review。它会比普通作品集更有可信度。

3. `Knowledge Trail`

在博客底部显示文章产生的 Knowledge 条目，让读者看到“这篇文章留下了什么可复用知识”。

4. `Chinese Studio Note`

首页不必大面积中文化，但可以加一条小型中文 Studio Note，表达当前正在推进的阶段和判断。

5. `Bilingual Command`

Command Center 支持中文关键词，例如搜索 `中文`、`复盘`、`公开可达`，直接进入相关博客和 Knowledge。

## 本阶段验证

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：`Chinese pilot content`，2 passed。
- `npm run test:e2e`：88 passed。
- 本地生产模式视觉检查：中文博客、Blog、Knowledge、Uses、About 的桌面和移动端均无横向溢出。
- 截图：
  - `/tmp/phase17-zh-blog-desktop.png`
  - `/tmp/phase17-zh-blog-mobile.png`
  - `/tmp/phase17-knowledge-desktop.png`
  - `/tmp/phase17-about-mobile.png`

## 结论

中文内容可以进入这个站点，而且应该进入。但它必须服务产品记忆、知识沉淀、阶段复盘和真实协作，不应该变成全站机械翻译。

下一阶段最值得做的是 Phase 18：中文内容系统化，然后再进入真实证据增强和 Knowledge 详情页。
