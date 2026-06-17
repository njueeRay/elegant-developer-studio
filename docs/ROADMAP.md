# 产品路线图

## 第一阶段：视觉基础

目标：建立站点的气质、结构和首屏可信度。

交付：

- 单页首页原型。
- Hero、状态、主要入口、工作台、写作/作品/媒体亮点。
- 导航、主题切换、命令菜单、社交链接。
- 使用 `Knowledge` 替代早期 `notes` 概念。
- PRD、路线图、IA、设计系统和版本追溯。

状态：已在 `v0.1.0` 完成。

## 第二阶段：内容核心

目标：让首页背后有真实、可维护的个人发布系统。

交付：

- `/blog` 和 `/blog/[slug]`。
- `/projects` 和 `/projects/[slug]`。
- MDX 内容结构。
- 标签、阅读时间、代码块、文章目录。
- SEO metadata、RSS、sitemap、robots。
- 首页接入真实内容数据。

组件：

- `PostCard`
- `ProjectCard`
- `TagFilter`
- `ReadingProgress`
- `TableOfContents`
- `CodeBlock`
- `MetadataRail`
- `ReadingFocusLens`

状态：已在 `v0.2.0` 完成。

剩余打磨：

- 增加更多真实文章和 case study。
- 第四阶段增加更强的搜索。
- 内容量超过约 20 篇后，将手动阅读时间替换为自动计算。

## 第三阶段：媒体层

目标：让个人主页有生活、审美和记忆，不只是简历和文章。

交付：

- `/photos`。
- 照片网格、精选照片、灯箱浏览。
- `/music` 音乐表面。
- 迷你播放器：播放/暂停、上一首/下一首、进度、音量、当前曲目信息。
- 首页媒体入口接入 `/music`。

组件：

- `PhotoGrid`
- `PhotoLightbox`
- `MiniPlayer`
- `TrackList`
- `NowPlaying`

状态：进行中。首个实现切片已完成，本阶段尚未关闭。

已完成切片：

- 媒体内容模型：`Photo`、`Track`、`Mix`。
- `/photos`、照片网格、精选照片、灯箱。
- `/music`、当前歌单、曲目列表、迷你播放器。
- 博客 reader mode 提示、鼠标跟随阅读微光、代码块行数。
- 博客 `ReadingFocusLens`：当前小节、`read.focus("section-id")` 和小节引用复制。
- 博客系统化：文章语言、写作意图、语言筛选和写作系统说明。
- 博客阅读路径：`RelatedReading` 将文章、Knowledge 和 Project 连接成局部路径。

下一步：

- `/blog`、`/projects`、`/knowledge` 筛选状态进入 URL query。
- 内容关系 slug 校验，防止 related posts / knowledge / projects 失效。
- 补真实中文文章，优先写产品判断和项目复盘。

暂不做：

- 上传后台。
- 第三方音乐账号集成。
- 真实音频文件和可视化。
- 复杂相册管理。

风险控制：

- 媒体不能变成装饰。照片和音乐必须表达记忆、过程和审美。
- 博客互动不能变成玩具。阅读页只接受增强阅读的微交互，不放干扰正文的宠物或强装饰。

## 第四阶段：交互层

目标：加入程序员味道和可探索性。

交付：

- 全站命令菜单。
- 全站搜索。
- 写作、项目、照片筛选。
- 快捷入口：读文章、看作品、打开音乐、查看照片、联系我。
- 状态面板：正在写什么、最近在做什么、最近听什么。

组件：

- `CommandMenu`
- `GlobalSearch`
- `FilterBar`
- `StatusPanel`
- `QuickAction`
- `KeyboardHint`

状态：进行中。首个实现切片、键盘增强切片、上下文搜索切片、状态面板与筛选切片、照片筛选切片已完成。

已完成切片：

- `GlobalCommandMenu`
- 全站 `Cmd K`
- 首页命令按钮触发全站菜单
- 搜索文章、项目、照片、音乐和快捷动作
- 结果点击导航
- 键盘上下选择结果
- `Enter` 打开选中结果
- 最近访问分组
- 搜索结果类型分组
- 标题和描述命中高亮
- 底部键盘提示
- 当前路由上下文分组和排序
- `lab`、`uses`、`about` 规划提示
- 无结果状态的恢复建议词
- `StatusPanel`：首页最近在写、最近在做、最近在听
- `FilterBar`：写作和项目列表统一筛选、结果数量、清除动作
- `/photos` 复用 `FilterBar`，筛选联动精选、网格和灯箱
- `Knowledge` 从规划提示升级为真实 Command Center 结果

暂不做：

- 命令历史。
- 多级 action panel。
- 复杂模糊搜索库。
- 最近访问管理 UI。

下一片重点已转入第五阶段：

- 复盘 `/knowledge` 首版内容模型和标签体系。
- 判断 `FilterBar` 是否需要支持单选/多选模式或 URL query 同步。
- 继续观察 `GlobalSearch` 是否需要从 Command Center 中抽象。
- 在内容规模证明必要前，不引入完整搜索库。

## 第五阶段：个人工作室操作系统

目标：扩展成完整个人操作系统。

状态：进行中。Knowledge、Uses、About 和 Lab 首个切片已完成。

交付：

- `/lab` 组件实验室。
- `/about` Studio Profile、原则、能力边界和经历入口。
- `/uses` 工具与工作流。
- `/knowledge` 公开知识库。
- `/lab` 组件注册表和实验室。
- 可选访问统计、文章 reactions、联系表单、后台内容管理。

已完成切片：

- `/knowledge` 公开知识索引。
- `/knowledge/[slug]` 详情页，Knowledge 从列表卡片升级为可引用节点。
- `/uses` 工具书架和工作流页面。
- `/about` Studio Profile。
- `/lab` 组件注册表。
- 知识内容模型：`Pattern`、`Snippet`、`Decision`、`Reference`。
- 知识关系模型：`relatedPostSlugs`、`relatedProjectSlugs`、backlinks。
- Uses 内容模型：工具、分类、工作流、发布管线。
- About 内容模型：个人介绍、原则、时间线、能力、工作约定。
- `KnowledgeExplorer` 和 `KnowledgeCard`。
- `UsesExplorer`、`UsesShelf`、`ToolCard`、`WorkflowRail`、`PublishingPipeline`。
- `AboutProfile`、原则选择、时间线聚焦、能力矩阵、协作约定、Contact band。
- `FilterBar` 复用到知识类型筛选。
- `FilterBar` 复用到工具分类筛选。
- 每条知识支持稳定锚点和 `Copy ref`。
- Knowledge 条目支持 backlinks。
- 每个工具支持 `Copy ref`，工具列表支持 `Copy all`。
- Command Center 新增 `knowledge` 类型、真实结果和 `Knowledge context`。
- Command Center 新增 `uses` 类型、真实工具和工作流结果、`Uses context`。
- Command Center 新增 `about` 类型、真实原则、时间线和能力结果、`About context`。
- Command Center 新增 `lab` 类型、真实组件和实验结果、`Lab context`。
- sitemap 收录 `/knowledge`。
- sitemap 收录 `/uses`。
- sitemap 收录 `/about`。
- sitemap 收录 `/lab`。
- `SourceReveal` 可点击到 GitHub 文件。
- 项目详情页新增 `Case Study Diff`。
- `/lab` 新增 `ComponentPreview`，支持 `preview / trace / source`。
- Command Center 点击结果和键盘打开结果统一导航路径。

组件：

- `Timeline`
- `SkillMatrix`
- `UsesShelf`
- `ToolCard`
- `WorkflowRail`
- `PublishingPipeline`
- `AboutProfile`
- `Timeline`
- `SkillMatrix`
- `WorkingAgreement`
- `KnowledgeCard`
- `KnowledgeExplorer`
- `LabExplorer`
- `ComponentRegistry`
- `ExperimentTimeline`
- `ReactionBar`
- `ContactPanel`
- `ComponentPreview`

下一片重点：

- 给 `SourceReveal` 增加行号和 commit permalink。
- 给 `ComponentPreview` 增加 viewport switch 和更真实的可交互状态。
- 为 `Case Study Diff` 接入截图、PR、commit 或指标证据。
- 为 Knowledge backlinks 增加 schema 校验。
- 暂不做后台 CMS，继续用本地数据模型保证结构清晰。

## 第九阶段：协作治理与创意方向

目标：让公开反馈、PR、飞书评论和创意想法进入同一套可追踪系统。

状态：已完成首版。

交付：

- `/collaboration`。
- `CONTRIBUTING.md`。
- `.github/PULL_REQUEST_TEMPLATE.md`。
- Contact 到协作指南的入口。
- Command Center 搜索协作指南和具体创意条目。
- 创意 backlog：`Command Trace`、`Source Hover`、`Reading Focus Lens`、`Memory Map`、`Case Study Diff`、`Studio Companion`。

组件：

- `CollaborationGuide`
- `CreativeBacklog`
- `GovernanceSurface`

下一阶段：

- Phase 10：Signature Interaction Prototype。
- 优先实现 `Command Trace` 和 `Source Hover`。
- 暂缓宠物、大型图谱和高强度视觉特效。

## 第十阶段：Signature Interaction Prototype

目标：让个人主页拥有可识别、可复用、不过度喧哗的程序员风格交互。

状态：已完成首版，进入迭代观察。

交付：

- `Command Trace`：Command Center 打开内部路由后显示 `cmd.open("/route")`。
- `Source Hover`：Knowledge、Projects、Lab 显示真实 ref/source path。
- Lab 新增 `CommandTraceToast` 与 `SourceReveal` 两个构件。
- e2e 覆盖命令 trace 和 source reveal。
- 移除 `next/font/google` 构建期网络依赖，提升本地构建稳定性。
- ESLint 忽略测试产物目录，避免测试并发清理产物时影响 lint。

组件：

- `CommandTraceToast`
- `SourceReveal`

本阶段判断：

- 程序员风格应来自可执行命令、真实来源、可复制引用和可追踪对象。
- 当前不做常驻宠物、粒子跟随、假终端、大型图谱或音乐可视化。
- 微交互必须服务导航、阅读、可信度或维护性，不能只是装饰。

下一阶段：

- 优先改进移动端筛选条的横向滚动提示。
- 将 `SourceReveal` 升级为可点击 GitHub source link。
- 为 Lab 增加真实 `ComponentPreview`，让组件注册表从元数据走向可操作预览。

## 第十一阶段：Reading Focus Lens

目标：在不污染博客阅读的前提下，为长文增加当前小节追踪、代码式阅读状态和稳定引用能力。

状态：已完成首版，进入迭代观察。

交付：

- `ReadingFocusLens`：博客详情页显示当前小节。
- 显示 `read.focus("section-id")`。
- 支持复制当前小节 URL。
- 当前 heading 显示轻量 focus 指示。
- 正文段落 hover 时有轻微阅读聚焦。
- 移动端保留底部轻量浮层。
- Lab 注册 `ReadingFocusLens`。
- Command Center 可搜索 `reading focus`。
- e2e 覆盖阅读焦点、滚动更新、复制反馈、Lab 和 Command Center 发现路径。

组件：

- `ReadingFocusLens`
- `ArticleInteractions`

本阶段判断：

- 可以炫酷，但炫酷必须来自真实阅读状态和可引用对象。
- 当前仍不做常驻宠物、全站粒子、假终端或大型图谱。
- 更适合本站的创意方向是 `Source Link`、`Case Study Diff`、`Knowledge Backlinks` 和 `ComponentPreview`。

下一阶段：

- 将 `SourceReveal` 升级为 GitHub source link。
- 为 Lab 增加第一个真实 `ComponentPreview`。
- 为项目详情页增加 `Case Study Diff`。

## 第十三至第十六阶段：Navigation OS 与可追溯交互

目标：修复页面“存在但不可发现”的信息架构问题，并把导航、职责边界、证据层和 Lab 预览推进到可验证状态。

范围：

- Phase 13：统一全站导航，主导航改为真实路由，移动端提供完整菜单。
- Phase 14：明确 `Knowledge / Uses / Lab / About / Collaboration` 的职责边界。
- Phase 15：Case Study Diff 增加可点击 evidence link。
- Phase 16：SourceReveal 支持行号，ComponentPreview 增加 viewport switch。

验收：

- `/uses`、`/about`、`/lab` 不再是隐藏页面。
- 首页和内页都能进入主信息架构。
- 移动端导航可发现主要页面和二级页面。
- `/collaboration` 等长标题页面无横向溢出。
- e2e 覆盖导航、证据链接、移动菜单和 Lab viewport switch。

当前状态：已实现，已通过本地与生产验证，已部署，待外部同步。

下一阶段：

- Phase 17：设计真实关系驱动的 `Reference Constellation`。
- Phase 18：SourceReveal commit permalink。
- Phase 19：Case Study Diff 截图、PR、commit 证据。

## 第十七阶段：中文内容试点与全站复盘

目标：让中文内容进入公开站点，同时审查过去阶段的系统优缺点，为下一阶段建立清晰路线。

范围：

- 新增一篇中文博客。
- 新增一条中文 Knowledge 决策。
- 新增 Uses 中文复盘工作流。
- 新增 About 中文原则和协作约定。
- 新增全站复盘与下一阶段规划文档。

验收：

- 中文内容在博客、Knowledge、Uses、About 都能访问。
- 中文内容不造成移动端横向溢出。
- 中文不是机械翻译，而是服务产品记忆和阶段复盘。
- e2e 覆盖中文内容可见性。

下一阶段：

- Phase 18：中文内容系统化。
- Phase 19：真实证据增强。
- Phase 20：Knowledge 详情页。
- Phase 21：Reference Constellation。
- Phase 22：个人真实层。
