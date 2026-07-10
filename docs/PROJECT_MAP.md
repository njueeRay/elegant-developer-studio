# 项目地图

本文件是 Elegant Developer Studio 的操作地图，定义当前已有内容、后续规划、目录结构、阶段追踪和质量门禁。

## 1. 北极星

构建一个像“优雅开发者工作室”的个人站：

- 有编辑气质，适合写作。
- 有技术语义，能体现工程可信度。
- 有视觉空间，能承载照片、音乐和作品。
- 有结构能力，能逐步扩展成个人操作系统。

必须避免三种失败：

- 泛泛的作品集模板。
- 高密度 SaaS dashboard。
- 装饰性假终端。

## 2. 当前状态

版本：`v0.2.0`

线上：

- Production：`https://raynode.me`
- Preview / fallback：`https://elegant-developer-studio.vercel.app`
- GitHub：`https://github.com/njueeRay/elegant-developer-studio`
- 飞书知识库：`https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

当前审计行动入口：

- `docs/AUDIT_ACTION_TODO_2026_07_03.md`：基于 `CLAUDE_CODE_PERSONAL_HOMEPAGE_AUDIT_2026_07_03.md` 形成的 P0-P3 行动清单。
- `docs/HOMEPAGE_DEVELOPMENT_STATE_REVIEW_2026_07_09.md`：当前个人主页开发状态总审查、问题清单、媒体层判断和 Phase 39-45 路线。
- RayNode 部署已恢复；当前最优先事项不是继续扩新表面，而是统一站点事实源、修复假状态和腐烂证据。

已实现：

- 第一阶段首页。
- Developer Atelier 视觉方向。
- `Knowledge` 信息架构。
- 主题切换。
- 命令面板。
- 工作台面板。
- 首页写作、作品、媒体、Knowledge、Lab、Contact 模块。
- 第二阶段内容核心：blog、文章详情、projects、项目详情、MDX 注册表、RSS、sitemap、robots。
- 第三阶段媒体层首版：photos、music、灯箱、迷你播放器。
- 第四阶段交互层首版：全站 Command Center。
- 第四阶段交互层增强：键盘选择、最近访问、上下文排序、规划页面提示、空状态建议。
- 第四阶段交互层状态与筛选切片：`StatusPanel`、可复用 `FilterBar`、结果数量和筛选清除。
- 第四阶段照片筛选切片：`/photos` 复用 `FilterBar`，筛选联动精选、网格和灯箱。
- 第五阶段 Knowledge 首个切片：`/knowledge` 公开索引、知识类型筛选、可复制引用和 Command Center 知识结果。
- 第五阶段 Uses 首个切片：`/uses` 工具书架、工具筛选、复制引用、工作流和发布管线。
- 第五阶段 About 首个切片：`/about` Studio Profile、原则选择、时间线聚焦、能力矩阵、协作约定和 Contact band。
- 第五阶段 Lab 首个切片：`/lab` 组件注册表、组件筛选、精选预览、复制 import、实验时间线和质量门禁。
- 第七阶段 Contact 与公开信任层：`/contact` 独立页面、公开路由、联系 brief、边界说明和真实入口。
- 第八阶段公开协作层：GitHub Issue Forms、结构化协作入口和 Contact 到 issue template 的直达链接。
- 第九阶段协作治理与创意方向层：`/collaboration`、`CONTRIBUTING.md`、PR 模板、创意 backlog 和专家审查。
- 第十阶段签名交互层：`CommandTraceToast`、`SourceReveal`、命令执行痕迹和来源 reveal。
- 第十一阶段阅读焦点层：`ReadingFocusLens`、当前小节追踪、`read.focus("section-id")` 和小节引用复制。
- 第十二阶段可追溯作品集层：可点击 GitHub source link、Knowledge backlinks、Case Study Diff、Lab ComponentPreview 和 Command Center 点击导航修复。
- 第十八阶段博客系统化：文章语言和写作意图 metadata、博客语言筛选、写作系统说明、中文筛选 e2e、Command Trace 跨路由反馈修复。
- 第十九阶段博客阅读路径增强：`PRODUCT.md`、impeccable live config、文章 related metadata、`RelatedReading`、Blog → Knowledge → Project 局部路径。
- 第二十阶段 Knowledge 详情层：`/knowledge/[slug]`、`KnowledgeTrails`、Knowledge → Blog / Project 双向路径、Knowledge 详情进入 Command Center 与 sitemap。
- 第二十一阶段 URL Query 筛选与关系校验：`useQueryFilter`、Blog/Projects/Knowledge query 状态、`validate:content`、内容关系断链检查。
- 第二十二阶段 URL IA 与命令快捷入口：query 参数写入 IA、Command Center query 快捷入口、Knowledge 详情正文结构化和正文完整性校验。
- 第二十三阶段内容证据密度增强：Project Evidence Pack、Knowledge Markdown ref、项目证据完整性校验。
- 第二十四点五阶段 Personal OS Zoo：`/lab` 新增 Personal OS 校准面，首页 `StatusPanel` 升级为 Studio Pulse 和 Ask Me Terminal。
- 第二十六阶段外部证据网络：新增 OpenProfile 与 AnyReader 两个外部化项目、4 篇非本站中心文章、6 条 Knowledge，并让首页精选转向外部证据。
- 第二十七阶段证据自动化与发布纪律：新增 release evidence 生成/校验、RayNode 一键部署脚本和项目页生成证据卡。
- 第二十八阶段内容发现规模化：Command Center 索引从 root layout 移出，改为 `/command-index.json` 按需加载，并新增规模报告。
- 第二十九阶段阅读质量层：新增 writing tracks、受控 intent、文章引用语境、RelatedReading 路径理由和内容质量校验。
- 第三十八阶段首页编辑策略：新增 `src/data/home-editorial.ts`，首页重点对象改为明确策展，并建立 `why.here(...)` 理由。
- 2026-07-09 总审查：新增 `docs/HOMEPAGE_DEVELOPMENT_STATE_REVIEW_2026_07_09.md`，明确媒体层、项目证据、Post-16 内容门禁和装饰性交互的后续优先级。
- 生成项目/媒体素材。
- PRD、路线图、IA、设计系统、版本追溯、QA、飞书知识库。

## 3. 产品表面地图

| 表面 | 路由 | 阶段 | 状态 | 作用 |
| --- | --- | --- | --- | --- |
| 首页 | `/` | 1 | 已实现 | 第一印象和精选工作室入口 |
| 博客列表 | `/blog` | 2 | 已实现 | 长文和写作归档 |
| 博客筛选状态 | `/blog?tag=&language=` | 21 | 已实现 | 可分享、可刷新、可返回的写作筛选 |
| 博客 query 快捷入口 | `/blog?tag=` `/blog?language=` | 22 | 已实现 | Command Center 打开精选写作状态 |
| 博客 writing tracks | `/blog?track=` | 29 | 已实现 | 产品判断、设计工程、部署自动化、AI 协作四条长期写作线 |
| 文章详情 | `/blog/[slug]` | 2/19 | 已实现 | MDX 阅读体验、语言与写作意图、相关阅读路径 |
| 文章阅读质量上下文 | `/blog/[slug]` | 29 | 已实现 | 显示 writing track、中文引用场景或英文技术语境 |
| 项目列表 | `/projects` | 2 | 已实现 | 精选作品和 case study |
| 项目筛选状态 | `/projects?stack=` | 21 | 已实现 | 可分享的项目技术栈筛选 |
| 项目 query 快捷入口 | `/projects?stack=GitHub` | 22 | 已实现 | Command Center 打开 GitHub-backed projects |
| 项目详情 | `/projects/[slug]` | 2 | 已实现 | MDX 项目 case study |
| OpenProfile Agent Workflow | `/projects/openprofile-agent-workflow` | 26 | 已实现 | 外部 AI-native profile workflow case study |
| AnyReader Interface Teardown | `/projects/anyreader-interface-teardown` | 26 | 已实现 | 外部深度阅读产品界面拆解 |
| 项目证据包 | `/projects/[slug]#project-evidence-title` | 23 | 已实现 | GitHub、Vercel、飞书和测试证据入口 |
| 项目证据对象 | `/projects/[slug]#project-evidence-title` | 24 | 已实现待部署 | 证据升级为 typed object：source、deployment、document、test、screenshot、metric |
| Release evidence | `/release-evidence.json` | 27 | 已实现 | 部署时生成的运行时发布事实源 |
| Command index | `/command-index.json` | 28 | 已实现 | Command Center 按需加载的公开索引 payload |
| Health endpoint | `/health.json` | 30 | 已实现 | RayNode 轻量健康检查，供脚本和人工排障使用 |
| Studio Pulse | `/#studio-pulse` | 24.5 | 已实现 | 首页 Personal OS 小切片：写作、建设、Knowledge、音乐和 prompt |
| RSS | `/rss.xml` | 2 | 已实现 | 写作订阅源 |
| Sitemap | `/sitemap.xml` | 2 | 已实现 | 搜索引擎路由地图 |
| Knowledge | `/knowledge` | 5 | 已实现首版 | 长期知识、片段、学习记录 |
| Knowledge 筛选状态 | `/knowledge?kind=` | 21 | 已实现 | 可分享的知识类型筛选 |
| Knowledge query 快捷入口 | `/knowledge?kind=Decision` | 22 | 已实现 | Command Center 打开决策知识 |
| Knowledge 详情 | `/knowledge/[slug]` | 20 | 已实现 | 可独立访问、引用和追踪的知识节点 |
| Knowledge 详情引用 | `/knowledge/[slug]` | 24 | 已实现待部署 | 详情页级 Markdown ref，服务飞书、GitHub issue、PR 和项目文档 |
| Photos | `/photos` | 3 | 已实现首版 | 照片档案和灯箱 |
| Music | `/music` | 3 | 已实现首版 | 工作室歌单和收听状态 |
| Lab | `/lab` | 5 | 已实现首版 | 实验、原型、组件注册表和质量门禁 |
| Personal OS Zoo | `/lab#personal-os-zoo-title` | 24.5 | 已实现 | 外部参考迁移后的组件校准面和 flaw ledger |
| About | `/about` | 5 | 已实现首版 | 个人介绍、时间线、原则、能力与联系方式 |
| Contact | `/contact` | 7 | 已实现首版 | 公开联系路由、项目讨论入口、联系 brief 与边界说明 |
| GitHub Issues | `.github/ISSUE_TEMPLATE/*` | 8 | 已实现首版 | 公开协作、bug、feature request 的结构化输入 |
| Collaboration | `/collaboration` | 9 | 已实现首版 | 贡献流程、治理表面、创意评估和后续 idea backlog |
| Uses | `/uses` | 5 | 已实现首版 | 工具、技术栈、工作流 |

## 4. 阶段地图

### 第一阶段：视觉基础

状态：完成。

追踪：

- Commit：`2efc984`
- 部署记录：`docs/VERSION_TRACE.md`
- QA：`design-qa.md`

完成标准：

- 首页桌面和移动端可用。
- 首屏建立审美和身份。
- 核心组件能延续到后续阶段。
- 构建和视觉 QA 通过。

### 第二阶段：内容核心

状态：完成。

追踪：

- GitHub issue：`#1`，已关闭。
- Milestone：`Phase 2: Content Core`，已关闭。
- 版本：`v0.2.0`

完成内容：

- MDX 内容注册表。
- 3 篇 starter posts。
- 2 个 starter project case studies。
- 标签筛选。
- 阅读进度。
- 文章目录。
- 代码复制交互。
- Metadata rail。
- RSS、sitemap、robots、metadata base。
- 首页接入真实内容 metadata。

主要风险：

- 后续新增内容时破坏 schema 纪律。新增内容必须遵守 MDX metadata 合约。

### 第三阶段：媒体层

状态：进行中。

追踪：

- GitHub issue：`#2`
- Milestone：`https://github.com/njueeRay/elegant-developer-studio/milestone/2`

范围：

- `/photos`
- 照片网格和灯箱。
- `/music` 音乐表面。
- 迷你播放器和真实 UI 状态控制。
- 首页媒体入口接入 `/music`。

已实现：

- `src/data/media.ts`
- `src/app/photos/page.tsx`
- `src/app/music/page.tsx`
- `PhotoGrid`
- `PhotoLightbox`
- `MiniPlayer`
- `TrackList`
- `NowPlaying` 状态区
- 文章阅读微光和 reader mode 提示。

主要风险：

- 媒体变成装饰。照片和音乐必须表达记忆、过程和审美，而不是填充页面。
- 博客互动污染阅读。当前只做可关闭、可降级的阅读增强，不做宠物或重装饰。

### 第四阶段：交互层

状态：进行中。

追踪：

- GitHub issue：`#3`
- Research issue：`#5`

范围：

- 全站命令菜单。
- 全站搜索。
- 筛选。
- 快捷动作。
- 状态面板。

已实现：

- `GlobalCommandMenu`
- 全站 `Cmd K`
- 首页命令按钮触发全站菜单
- 文章、项目、照片、音乐和快捷动作搜索
- 结果点击导航
- Command Center z-index 高于 reader mode
- 键盘上下选择结果
- `Enter` 打开 active result
- 最近访问分组
- 搜索结果类型分组
- 标题和描述命中高亮
- 当前路由上下文分组：`Writing context`、`Project context`、`Photo context`、`Music context`
- 当前路由上下文分组新增：`Knowledge context`
- 历史规划页面提示；`knowledge`、`uses`、`about`、`lab` 已陆续升级为真实结果
- 无结果恢复建议词
- 首页 `StatusPanel`
- 可复用 `FilterBar`
- 筛选结果数量和显性清除动作

主要风险：

- 交互聪明但无用。每个交互必须减少导航成本或揭示有用上下文。
- 搜索变成假入口。结果必须来自真实站点内容或真实动作。

### 第五阶段：个人工作室操作系统

状态：进行中。

追踪：

- GitHub issue：`#4`

范围：

- `/lab`
- `/about`
- `/uses`
- `/knowledge`
- 可选 analytics、reactions、联系表单、admin。

已实现：

- `/knowledge`
- `/uses`
- `/lab`
- `src/data/knowledge.ts`
- `src/data/uses.ts`
- `src/data/lab.ts`
- `KnowledgeExplorer`
- `KnowledgeCard`
- `UsesExplorer`
- `UsesShelf`
- `ToolCard`
- `WorkflowRail`
- `PublishingPipeline`
- `AboutProfile`
- `Timeline` 首版模式
- `SkillMatrix` 首版模式
- `WorkingAgreement`
- `ContactPanel` 深色 CTA 变体
- `LabExplorer`
- `ComponentRegistry` 首版模式
- `ComponentPreview` 首版模式
- `ExperimentTimeline`
- `QualityGateList`
- 知识类型筛选：`Pattern`、`Snippet`、`Decision`、`Reference`
- 可复制知识引用
- Command Center 真实知识结果和 `Knowledge context`
- Uses 工具分类筛选、复制引用和 `Copy all`
- Command Center 真实 Uses 结果和 `Uses context`
- Command Center 真实 Lab 结果和 `Lab context`
- Knowledge backlinks
- 可点击 GitHub source link
- Project `Case Study Diff`
- Command Center 鼠标点击结果真实导航
- sitemap 收录 `/knowledge`
- sitemap 收录 `/uses`
- sitemap 收录 `/lab`

主要风险：

- 扩展成大量半成品页面。第五阶段应该基于稳定基础组件扩展。

### 第二十四阶段：项目证据对象升级

状态：已实现，已本地验证，待部署，待外部同步。

追踪：

- 计划文档：`docs/PHASE24_EVIDENCE_OBJECTS_PLAN.md`
- 前置阶段：第二十三阶段内容证据密度增强、第二十四点五阶段 Personal OS Zoo。

范围：

- 将 `ProjectMeta.evidencePack` 从轻量链接列表升级为 typed evidence object。
- Evidence Pack 支持 `type`、`route`、`commit`、`deploymentId`、`screenshot`、`metric`、`verifiedBy`、`verifiedAt` 等可选字段。
- 将 Personal OS Zoo 中形成的 `DataSourceBadge` 语法迁移到项目详情和 Knowledge 详情。
- `/knowledge/[slug]` 增加详情页级 Markdown 引用复制。
- `validate:content` 增加 evidence object 完整性校验。
- 新增 `AmbientCursorField`、`Command Echo` copy trace、阅读 signal 扫描线、首页 `pulse.live("studio")` 和移动端 viewport 配置。

非目标：

- 不做证据 dashboard。
- 不做 GitHub/Vercel API 自动抓取。
- 不做后台 CMS。
- 不做新的首页模块。
- 不做大型关系图谱。

验收：

- 至少两个项目详情页展示结构化证据：已完成。
- Evidence link 指向真实可访问地址，不能只是当前页面锚点：已完成。
- Knowledge 详情页可以复制 Markdown ref：已完成。
- 桌面和移动端项目详情、Knowledge 详情均无页面级横向溢出：targeted e2e 已覆盖。
- `npm run validate:content`、`npm run lint`、`npm run build`、`npm run test:e2e -- --workers=1`：已通过。

### 第九阶段：协作治理与创意方向

状态：完成首版。

范围：

- `/collaboration`
- `CONTRIBUTING.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- 创意 backlog 和专家审查。
- Contact、Command Center、sitemap 和测试接入。

已实现：

- `src/data/collaboration.ts`
- `src/app/collaboration/page.tsx`
- Contact 页面新增协作指南入口。
- Command Center 新增 `Collaboration` 类型和创意条目。
- Lab 注册 `CollaborationGuide`。
- e2e 覆盖新路由、Contact 链接、Command Center 创意搜索和仓库治理文件。

主要判断：

- 当前不做常驻宠物或高强度特效。
- 下一步优先做 `Command Trace` 和 `Source Hover`。

### 第十阶段：Signature Interaction Prototype

状态：完成首版。

范围：

- 命令执行痕迹。
- 来源 reveal。
- Lab 注册和 e2e 覆盖。

已实现：

- `CommandTraceToast`
- `SourceReveal`
- `src/lib/command-trace.ts`
- Command Center 内部路由导航后显示 `cmd.open("/route")`。
- Knowledge、Projects、Lab 显示真实 ref/source path。
- Lab 注册 `CommandTraceToast` 和 `SourceReveal`。
- e2e 覆盖命令 trace、source reveal 和 stale trace 清理。

主要判断：

- 程序员风格应来自真实命令、真实来源和可检查路径。
- `SourceReveal` 下一步应该变成 GitHub source link。

### 第十一阶段：Reading Focus Lens

状态：完成首版。

范围：

- 博客详情页阅读焦点。
- 当前小节追踪。
- 小节引用复制。
- Lab 和 Command Center 接入。

已实现：

- `ArticleInteractions` 接收文章 slug、title 和 TOC。
- 当前小节显示为 `read.focus("section-id")`。
- 使用 heading/TOC 和滚动位置追踪当前阅读段落。
- 复制当前小节 URL，使用 `writeToClipboard` 降级。
- 文章 heading 当前态指示和段落 hover 聚焦。
- 移动端底部轻量浮层。
- Lab 注册 `ReadingFocusLens`。
- e2e 覆盖阅读焦点、复制反馈和 Command Center 搜索。

主要判断：

- 本站可以炫酷，但应该选择可执行、可追踪、可引用的酷。
- 当前仍不建议做常驻宠物、全站粒子或假终端。

### 第十二阶段：可追溯作品集层

状态：完成首版。

范围：

- `SourceReveal` 升级为真实 GitHub source link。
- `/knowledge` 增加 backlinks。
- `/projects/[slug]` 增加 `Case Study Diff`。
- `/lab` 增加第一个真实 `ComponentPreview`。
- Command Center 点击结果和键盘打开路径统一。

已实现：

- `src/lib/source-links.ts`
- `src/components/content/source-reveal.tsx`
- Knowledge 数据模型新增 `backlinks`。
- 项目 MDX metadata 新增 `caseStudyDiff`。
- `ComponentPreview` 支持 `preview / trace / source` 三种模式。
- Lab 注册 `ComponentPreview`。
- e2e 覆盖真实 GitHub href、backlinks、case diff、component preview 和命令菜单点击导航。

主要判断：

- 这轮最有价值的不是视觉装饰，而是把“界面、内容、源码、组件、证据”连成可验证链条。
- 下一步创意可以做 `Reference Constellation`，但必须只展示真实关系，不做空图谱。

## 5. 仓库地图

```text
docs/
  PRD.md                         产品需求文档
  ROADMAP.md                     阶段计划和组件 backlog
  PROJECT_MAP.md                 产品、仓库、阶段、追踪总地图
  CURRENT_CONTEXT.md             当前主线、线上状态、质量门禁和下一步
  AUDIT_ACTION_TODO_2026_07_03.md Phase 25 审计行动清单
  INFORMATION_ARCHITECTURE.md    导航、路由和命名决策
  DESIGN_SYSTEM.md               视觉 tokens 和组件库存
  DECISIONS.md                   产品/架构决策记录
  PROGRESS_LOG.md                阶段进度账本
  FEISHU_SYNC.md                 飞书同步地图和节点 token
  VERSION_TRACE.md               版本、部署、commit 追溯
  archive/phase-history/         历史阶段 research / review 文档

public/
  assets/                        生产 UI 使用的生成素材
  references/                    已采纳视觉参考

src/
  app/                           Next.js App Router 入口
  components/                    可复用交互组件
  content/                       MDX 文章和项目 case study
  data/                          首页、媒体、Knowledge、Uses、Lab、发布证据数据
  lib/                           内容注册表和工具函数
```

## 6. 组件地图

已实现：

- `StudioHome`
- `Header`
- `HighlightCard`
- `SocialLinks`
- `CommandPalette`
- `GlobalCommandMenu`
- `GlobalCommandMenu` 上下文排序、规划提示、空状态建议
- `StatusPanel`
- `FilterBar`
- `PhotoGrid` 筛选联动
- `KnowledgeExplorer`
- `KnowledgeCard`
- `UsesExplorer`
- `UsesShelf`
- `ToolCard`
- `WorkflowRail`
- `PublishingPipeline`
- `PostCard`
- `ProjectCard`
- `ReadingProgress`
- `TableOfContents`
- `CodeBlock`
- `MetadataRail`
- `ReadingFocusLens`
- `SourceReveal`
- `ComponentPreview`
- `PhotoGrid`
- `PhotoLightbox`
- `MiniPlayer`
- `TrackList`
- `NowPlaying`
- `ArticleInteractions`

下一批目标：

- `AlbumCard`
- `GlobalSearch`
- `QuickAction`
- `KeyboardHint`

组件规则：

每个新组件实现前必须回答两个问题：

- 当前由哪个路由或工作流使用？
- 后续哪个阶段能复用，而不是重写？

## 7. 交互地图

当前交互：

- 主题切换。
- 命令面板打开/关闭。
- 媒体 play/pause 状态。
- 锚点导航。
- 卡片 hover。
- 标签筛选。
- 阅读进度。
- 代码复制反馈。
- 文章标题锚点。
- 全站 Command Center 键盘选择、Enter 打开、最近访问、分组和高亮。
- 全站 Command Center 当前路由上下文排序、规划页面提示和空状态建议。
- 首页状态面板：最近在写、最近在做、最近在听。
- 博客和项目列表筛选：结果数量、active filter、清除动作。
- 照片筛选：`Featured` 和 tags，精选区、网格、灯箱跟随当前结果。
- Knowledge 筛选：类型筛选、结果数量、关联链接、复制引用反馈。
- Uses 筛选：工具分类筛选、复制引用、工作流展示和 Command Center 入口。
- About 交互：原则选择、时间线聚焦、复制简介、Command Center 入口和 About 结果搜索。
- Lab 交互：组件分类筛选、组件预览选择、复制 import、复制 registry、Command Center 真实 Lab 结果。
- 第六阶段交互契约：全站路由 e2e、占位链接防回归、Command Center 真实跳转、复制反馈、筛选反馈和音乐状态均纳入 Playwright 测试。
- 第十阶段签名交互：Command Center 导航后显示 `cmd.open("/route")`，Knowledge/Projects/Lab 暴露真实 ref/source path。
- 第十一阶段阅读焦点：博客详情页显示当前小节、`read.focus("section-id")` 和小节引用复制。
- 第十二阶段可追溯交互：SourceReveal 可点击到 GitHub 文件，Knowledge backlinks 指向真实页面或小节，项目详情展示 before/after/proof，Lab ComponentPreview 可切换 preview/trace/source，Command Center 鼠标点击和键盘打开一致。

研究轨道：

- 项目卡片的 deploy、version、commit、changelog affordances。
- 类似 build pipeline 的阅读进度语义。
- Knowledge 详情页、反向链接、local graph。
- Lab 卡片的状态、最近运行、branch、preview URL。
- 键盘优先 focus state 和快捷键语法。
- Source Reveal 指向 GitHub 文件、commit 或文档锚点。
- Command Trace 的复制、历史和回放是否真的有用。

非目标：

- 假终端。
- 随机打字效果。
- code rain。
- 首页高密度 dashboard。

## 8. 进度追踪协议

每个有意义阶段必须更新：

1. GitHub issue 或 milestone。
2. `docs/PROGRESS_LOG.md`。
3. 有部署或 release 时更新 `docs/VERSION_TRACE.md`。
4. 有长期决策时更新 `docs/DECISIONS.md`。
5. 同步飞书 Wiki。

每次实现提交应说明：

- 阶段。
- 范围。
- 改动文件。
- 测试或 QA。
- 已知限制。

## 9. 质量门禁

阶段完成前必须确认：

- `npm run validate:content` 通过。
- `npm run lint` 通过。
- `npm run build` 通过。
- 关键 Chromium smoke e2e 通过。
- 桌面和移动端视觉检查完成。
- 无横向溢出。
- 核心交互已验证。
- 项目地图和进度日志已更新。
- GitHub issue/milestone 状态与仓库一致。
- 飞书知识库已同步，且使用中文为主。

GitHub Actions：

- `.github/workflows/quality.yml` 在 push 到 `main` 和 pull request 时运行。
- CI 覆盖 `npm ci`、`npm run validate:content`、`npm run lint`、`npm run build` 和 Chromium smoke e2e。
- `NEXT_PUBLIC_SITE_URL` 在 CI 中显式设为 `https://raynode.me`，避免主域名事实源漂移。

## 10. 下一步

当前主线是 Phase 30：RayNode Operations Hardening。下面这段 Phase 25 记录保留为历史阶段入口。

1. 完成主域名事实源、metadata、RSS、sitemap、robots 和 README 一致性。
2. 修复证据卡中的腐烂数字和假实时状态。
3. 建立最小 CI 和 modal 焦点契约。
4. 增加真实内容资产，降低“系统大于内容”的风险。
5. 建立 `CURRENT_CONTEXT` 并归档早期 phase 文档。
6. 验证 RayNode 主站并同步飞书。

## 10.1 当前 Phase 30 运维地图

新增入口：

- `/health.json`：公开轻量健康端点。
- `npm run raynode:health`：检查 health、release evidence、command index 和关键公开 URL。
- `npm run raynode:health:full`：在轻量检查基础上遍历 release evidence 的所有公开路由。
- `npm run raynode:smoke`：生产 Playwright 公开路由 smoke。
- `ops/raynode-runbook.md`：RayNode 部署、健康检查、回滚和故障定位。
- `ops/raynode-systemd.service`：systemd 模板。
- `ops/Caddyfile.raynode.example`：Caddy 模板。

阶段边界：

- 本阶段不引入外部 uptime 服务。
- 本阶段不启用 GitHub Actions SSH 自动部署。
- 本阶段优先让人工部署后的验证更短、更可靠、更可追溯。

## 11. 第十三至第十六阶段增量地图

本次阶段把项目从“多页面已实现”推进到“多页面可发现、可进入、可追踪”。

新增原则：

- 公开可达优先于内部存在。
- 主导航承载主信息架构，命令面板只做加速器。
- 页面职责边界必须先定义，再继续增加组件。
- 证据链接、源码链接、文档链接和测试覆盖是程序员风格的一部分。

新增构件：

- `SiteHeader`
- `primaryNavigation`
- `secondaryNavigation`
- `ComponentPreview viewport switch`
- `Case Study Diff evidence link`

已提升的页面：

- `/uses`：进入主导航和首页 Studio Map。
- `/about`：进入主导航和首页 Studio Map。
- `/lab`：从首页锚点升级为主路由入口。
- `/collaboration`：进入移动二级导航，并修复长标题移动端溢出风险。

验证状态：

- `npm run lint`、`npm run build` 和 `npm run test:e2e` 已通过。
- 当前 e2e 总量为 84 tests。
- Playwright 视觉巡检确认首页、Uses、About、Lab、Collaboration 在桌面和移动端均无横向溢出。

下一步：

1. 设计 `Reference Constellation` 的真实数据模型。
2. 给 `SourceReveal` 增加 commit permalink。
3. 给 `Case Study Diff` 增加截图、PR 或 commit 证据。
4. 继续保持飞书知识库中文优先。

## 12. 第十七阶段中文内容试点

本阶段把中文内容从飞书和阶段文档推进到公开站点。

新增内容：

- 中文博客：`/blog/chinese-as-product-memory`。
- Knowledge 条目：`公开可达优先于内部完成`。
- Uses 工作流：`中文复盘`。
- About 原则：`中文承载判断`。
- About 协作约定：`中文优先记录判断`。

阶段判断：

- 中文不应该只是英文内容的翻译层。
- 中文更适合承载产品判断、协作语境、阶段复盘和长期记忆。
- 当前不做整站机械双语，先做少量高价值试点。

下一步：

1. Phase 18：中文内容系统化。
2. Phase 19：真实证据增强。
3. Phase 20：Knowledge 详情层。
4. Phase 21：Reference Constellation。
5. Phase 22：个人真实层。

## 13. 第十八阶段博客系统化

本阶段把博客从“文章列表”推进到“可维护写作系统”。

完成内容：

- `PostMeta` 新增 `language` 和 `intent`。
- 所有现有文章补齐语言和写作意图。
- `/blog` 新增写作系统说明。
- `/blog` 新增语言筛选。
- `PostCard` 显示语言和写作意图。
- `/blog/[slug]` metadata rail 显示 Language 与 Intent。
- `FilterBar` 的测试 ID 生成支持中文按钮。
- `CommandTraceToast` 修复跨路由追踪反馈过早消失的问题。
- 新增阶段复盘文档，现已归档到 `docs/archive/phase-history/PHASE18_BLOG_SYSTEM_REVIEW.md`。

专家审查结论：

- 博客优势是阅读气质、MDX 基座、程序员式阅读辅助和站内关联雏形。
- 博客弱点是内容量不足、栏目规则不足、读完后的路径不足、筛选状态不可分享。
- 下一阶段优先做文章阅读路径增强，而不是继续堆独立页面。

下一步：

1. 建立长期写作线：产品判断、设计工程、项目复盘。
2. 增加 `RelatedReading`。
3. 建立 Blog 与 Knowledge 的双向引用。
4. 将筛选状态映射到 URL query。
5. 补一篇真实中文文章。

## 14. 第十九阶段博客阅读路径增强

本阶段把文章详情页从“阅读终点”推进为“内容系统入口”。

完成内容：

- 新增 `PRODUCT.md`，作为 impeccable 和后续设计判断的产品上下文。
- 新增 `.impeccable/live/config.json`。
- `PostMeta` 新增 `relatedPostSlugs`、`relatedKnowledgeSlugs`、`relatedProjectSlugs`。
- 所有现有文章补齐显式阅读路径。
- 新增 `RelatedReading` 组件。
- `/blog/[slug]` 正文后接入 Essays、Knowledge、Projects 三条局部路径。
- 移动端文章页增加底部安全留白，避免 fixed `ReadingFocusLens` 遮挡相关阅读。
- 新增 e2e：文章相关阅读必须指向公开路由。

阶段判断：

- Tags 适合过滤，不适合表达作者判断。
- 当前内容规模下，局部路径优于全局图谱。
- 技术风格来自可追溯阅读路径，而不是装饰。

下一步：

1. Phase 20：Knowledge 详情页。
2. 将 `/knowledge#slug` 升级为 `/knowledge/[slug]`。
3. 为 Knowledge 建立反向 related posts/projects。
4. 再补真实中文长文。

## 15. 第二十阶段 Knowledge 详情层

本阶段把 Knowledge 从“列表上的可复制卡片”推进到“可独立访问的知识节点”。

完成内容：

- 新增 `/knowledge/[slug]`。
- 新增 `KnowledgeTrails`。
- `KnowledgeEntry` 新增 `relatedPostSlugs` 和 `relatedProjectSlugs`。
- `RelatedReading` 的 Knowledge 链接从 hash 锚点升级为详情页。
- `KnowledgeCard` 增加 `Open detail`，`Copy ref` 复制详情页 URL。
- `GlobalCommandMenu` 的 Knowledge 结果指向详情页。
- `sitemap.xml` 包含所有 Knowledge 详情路由。
- 首页内部站内路由改用 Next `Link`。
- 新增 e2e 覆盖 Knowledge 详情公开可达、双向路径和移动端无横向溢出。

阶段判断：

- 列表页负责浏览，详情页负责引用和解释。
- Knowledge 是项目记忆，不是普通博客分类。
- 当前内容规模下，局部 trails 比全局 graph 更诚实。
- 可达性必须通过公开路由、sitemap、命令菜单和测试共同证明。

下一步：

1. Phase 21：筛选状态 URL query。
2. 增加内容关系 slug 校验脚本。
3. 让列表页筛选状态可分享、可返回、可从 Command Center 进入。
4. 补每条 Knowledge 的真实短正文，减少通用模板文案。

## 16. 第二十一阶段 URL Query 筛选与关系校验

本阶段把列表筛选从页面内临时状态推进到公开 URL 状态。

完成内容：

- 新增 `useQueryFilter`。
- `/blog` 支持 `tag` 与 `language` query。
- `/projects` 支持 `stack` query。
- `/knowledge` 支持 `kind` query。
- Blog / Projects / Knowledge Explorer 增加局部 Suspense，避免 App Router 静态预渲染被整个页面拖入 CSR。
- 新增 `scripts/validate-content-relations.mjs`。
- 新增 `npm run validate:content`。
- e2e 覆盖直接打开 query URL、点击筛选更新 URL、Knowledge 筛选后进入详情再返回。

阶段判断：

- 筛选状态是产品状态，不只是组件状态。
- 当前内容规模不需要全文搜索库，但需要 URL 可分享和关系校验。
- 内容关系必须能被脚本审查，不能只靠记忆维护。

下一步：

1. Phase 22：URL IA 文档化与内容深度增强。
2. 将 query 参数约定写入 `INFORMATION_ARCHITECTURE.md`。
3. Command Center 增加少量高价值 query 快捷入口。
4. 为 Knowledge 详情补更具体的短正文。

## 17. 第二十二阶段 URL IA 与命令快捷入口

本阶段把第二十一阶段的 query 能力从“已实现功能”推进为“被信息架构承诺的公开状态”。

完成内容：

- `INFORMATION_ARCHITECTURE.md` 新增 URL Query 约定，明确 `/blog`、`/projects`、`/knowledge` 的合法 query、值来源和验收规则。
- Command Center 新增精选 query 快捷入口：
  - `Open Chinese writing`
  - `Open Product Systems essays`
  - `Open Decision knowledge`
  - `Open GitHub-backed projects`
- `KnowledgeEntry` 新增 `protects` 和 `citation`。
- `/knowledge/[slug]` 用真实 entry 正文替换通用模板说明。
- `validate:content` 增加 Knowledge 详情正文完整性检查。
- e2e 覆盖 Command Center 打开 query-backed content views。

阶段判断：

- query 是公开产品状态，不是组件内部状态。
- Command Center 只放高价值 query 入口，不复制整套筛选器。
- Knowledge 详情页必须能被引用；没有正文的详情页只是更漂亮的空壳。
- 当前仍不引入全文搜索库，先把 URL、关系和引用稳定下来。

下一步：

1. Phase 23：内容证据密度增强。
2. 为项目详情补真实 commit、PR、截图或变更说明证据。
3. 为 Knowledge 增加更好的“引用复制”格式，例如 Markdown link 或 `knowledge.trace(...)`。
4. 评估是否为 Command Center 增加 action preview，但不做复杂二级 action panel。

## 18. 第二十三阶段内容证据密度增强

本阶段把项目详情从“有叙事的 case study”推进到“有可检查证据的 case study”。

完成内容：

- `ProjectMeta` 新增 `evidencePack`。
- Lumen 和 Studio Knowledge Base 都补齐结构化证据项。
- `/projects/[slug]` 新增 `Evidence Pack` 区块。
- Evidence Pack 直接链接到 GitHub、Vercel 或飞书。
- `validate:content` 增加 Project Evidence Pack 完整性校验。
- `KnowledgeCard` 的 `Copy ref` 改为复制 Markdown link。
- e2e 覆盖项目证据包、证据链接和 Knowledge Markdown ref。

阶段判断：

- `Case Study Diff` 负责解释变化，`Evidence Pack` 负责提供可检查证据。
- Knowledge 引用必须服务 GitHub、飞书、PR 和路线图评论，而不是只复制裸 URL。
- 当前证据包仍保持轻量，不做证据时间线或仪表盘。

下一步：

1. Phase 24.5：先吸收 `ursb.me` 的 Personal OS 语法，做 Lab zoo 和首页小切片。
2. Phase 24：项目证据对象升级。
3. 为 Evidence Pack 增加 commit、deploymentId、screenshot、metric 等可选字段。
4. 为 Knowledge detail 页增加 Markdown 引用复制。
5. 增加中文项目复盘文章，展示“判断 → 实现 → 证据 → 验证”的完整路径。

## 19. 第二十四点五阶段 Personal OS Zoo

本阶段吸收 `ursb.me` 的个人数据操作系统逻辑，但不复制其高密度内容量。

完成内容：

- 新增 `src/data/personal-os.ts`。
- 新增 `PersonalOsZoo`，挂载到 `/lab`。
- `StatusPanel` 升级为 `Studio Pulse`，包含 Writing、Building、Knowledge、Listening 四个 source-backed pulse。
- 首页新增轻量 `Ask Me Terminal` prompt 交互。
- Lab 注册 `PersonalOsZoo`。
- e2e 覆盖首页 pulse、prompt 切换和 Lab zoo 可访问性。

阶段判断：

- `ursb.me` 最值得学的是对象模型、数据来源、命令语法和生命迹象，不是暗色卡片外观。
- 本站仍保持 Elegant Developer Studio 的暖色、克制、低中密度方向。
- 宠物、3D world、在线人数、访客光标等奇趣交互暂不进入首页，必须先在 Lab 证明有真实作用。

下一步：

1. Phase 24：项目证据对象升级。
2. 把 Personal OS 的 `DataSourceBadge` 语法迁移到项目详情和 Knowledge 详情。
3. 为 Evidence Pack 增加更硬证据字段。
4. 继续观察首页密度，避免把 Studio Pulse 扩张成仪表盘。

## 20. 第三十一阶段视觉系统克制打磨

本阶段不新增页面和 surface，只处理已有体验中的职责重叠与移动端细节。

完成内容：

- 首页部署状态从长句改为两层结构：
  - 主状态：`Live on RayNode`
  - 工程细节：`Next.js standalone / Caddy`
- `AmbientCursorField` 不再无差别覆盖全站。文章和 Knowledge 详情页进入 reading surface，避免全局 cursor 光场干扰长文阅读。
- `reader-spotlight` 在 reading surface 下弱化，保留阅读页自己的 Reading Focus Lens 作为主交互。
- Command Center 移动端弹层重新定义高度和滚动边界，确保第一屏能看到 Studio Context 与 Writing 内容，同时不越出 viewport。
- Command Center 输入文案改为更短的 `Search or jump anywhere...`，避免小屏挤压。
- 测试新增两条硬约束：阅读页 cursor surface、移动端 Command Center viewport 边界。

阶段判断：

- 炫酷不等于动效叠加。阅读页已经有 Reading Focus Lens，全局 ambient cursor 在这里是噪声。
- 首页状态可以提供可信度，但不应该把部署语句作为首屏视觉主角。
- 用户能看到、能点击的入口优先于快捷键；快捷键是高级路径，不是唯一可达路径。
- 视觉打磨必须服务可读性、层级、可访问性或内容发现，否则应该留在 Lab，而不是进入主页主体验。

下一步：

1. Phase 32：Content Density & Studio Pulse Restraint。
2. 审查首页中段密度：Studio Pulse、Ask Me Terminal、精选文章、精选作品、媒体入口之间是否互相抢注意力。
3. 检查 Studio Pulse 是否需要减少默认可见信息，或改成更明确的“状态摘要 + 可展开细节”。
4. 不新增一级导航，不新增大型奇趣交互，优先优化现有内容节奏。

## 21. 第三十二阶段内容密度与 Studio Pulse 克制

本阶段锚定一个小但关键的 milestone：Studio Pulse Compact Mode。

完成内容：

- 首页 Studio Pulse 从 4 列窄卡改成 2 列紧凑状态摘要。
- 平板维持 2 列，手机改为 1 列，避免卡片互相挤压。
- 状态卡减少摘要行数、padding、装饰圆和重复 command 文本。
- `DataSourceBadge` 在 Studio Pulse 内转为 compact command chip，同时用 `title` 保留完整追溯上下文。
- Ask Me Terminal prompt row 支持横向滚动，避免移动端按钮换行破坏节奏。
- Ask Me response 文案整体缩短，保留判断密度，降低视觉密度。
- 修复文章代码块复制反馈，保证点击后有明确成功或失败状态。
- e2e 拆分多页面串联巡检，避免一个慢 route 污染整条契约。

阶段判断：

- 首页的专业感不能靠堆信息制造。真正高级的程序员主页应该让访客一眼看见判断、气质和可检查证据，而不是被密集卡片逼着读完所有 metadata。
- source-backed 设计不是把所有 provenance 文字同时展示出来；默认层只需要给出可追踪线索，完整证据应该在 route、source link、release evidence 和项目详情里展开。
- 测试也属于产品架构。把 7 个公开页面塞进一个 30 秒测试，会让“页面是否可达”和“本地 dev 首编译是否抖动”混在一起，失去诊断价值。

下一步：

1. Phase 33：Content Performance & Test Sharding Discipline。
2. 增加明确脚本或文档入口：桌面 e2e、移动 e2e、生产 smoke、release evidence 校验分开执行。
3. 审查 `src/lib/content.ts` 的 MDX 静态导入策略是否会继续导致 dev server 长尾。
4. 只在真实瓶颈稳定复现时优化内容加载，不为偶发本机资源异常重写架构。

## 22. 第三十三阶段内容性能与测试分片纪律

本阶段把 Phase 32 的经验固化成可执行质量入口。

完成内容：

- 新增桌面 e2e 分片：`npm run test:e2e:chromium`。
- 新增移动 e2e 分片：`npm run test:e2e:mobile`。
- 新增完整本地分片串行入口：`npm run test:e2e:local`。
- 新增 CI/本地共用 smoke：`npm run test:e2e:smoke`。
- 新增路由耗时观测脚本：`scripts/measure-route-timing.mjs`。
- 新增本地核心路由观测：`npm run perf:routes`。
- 新增生产 release routes 观测：`npm run perf:routes:raynode`。
- CI smoke 不再硬编码 Playwright 命令，改用项目脚本。
- README 记录新的质量门禁和分片策略。

阶段判断：

- 测试脚本也是产品架构的一部分。质量入口如果只存在于阶段文档里，新 agent 很容易回到一次长跑全部项目的旧习惯。
- route timing probe 当前只负责观测，不默认失败。原因是本地 dev 首编译和网络抖动会制造噪音，严格失败应由 `--fail-on-slow` 显式开启。
- 当前 production route timing 健康，暂不支持马上重构内容加载层。

下一步：

1. Phase 34：Intent-Routed Content Quality Polish。
2. 先响应用户对博客和 Lab 文字内容的审查要求，把内容从“作者内部描述”推进到“访客可执行导航”。
3. Dev Route Long-Tail Diagnosis 顺延为 Phase 35。

## 23. 第三十四阶段意图路由内容质量打磨

本阶段把用户对“博客、Lab 内文字内容还可以优化”的模糊反馈，重构为读者动作和内容合约问题。

完成内容：

- 调用本地 `ai-collaboration-prompts` skill，并选取两份 reference：
  - `expert-intent-reconstruction.md`
  - `document-cocreation-protocol.md`
- `LabComponent` 新增 `readerValue` 和 `nextUse`。
- `/lab` 预览卡展示 `Visitor value`，详情面板展示 `next.use`。
- Lab 列表行优先展示 visitor-facing value，而不是内部 evidence 摘要。
- `ComponentPreview` trace 模式新增 `Next use`。
- Command Center 的 Lab 结果描述改用 `readerValue`，搜索关键词纳入 `nextUse`。
- 博客详情页 `Reading quality context` 新增 writing track promise。
- 博客详情页引用面板显示当前文章级 `read.use("slug")`。
- e2e 覆盖 Lab visitor value / next-use 和博客 read.use / promise。

阶段判断：

- 博客当前不是缺“观点”，而是需要更清楚地告诉读者这些文章可用于飞书阶段复盘、GitHub issue、PR 说明和路线图审查。
- Lab 当前不是缺“组件”，而是组件说明需要从内部 registry 语言转成访客能理解的设计系统工作台语言。
- 工程对象仍保留英文命名，例如组件名、import path、route 和 command；中文优先用于项目文档和长期判断。
- 任何看起来像程序员命令的文案都必须对应真实 slug、route、source 或交互，不能成为假技术装饰。

下一步：

1. Phase 35：Dev Route Long-Tail Diagnosis。
2. 对 AnyReader 项目详情和 MDX detail routes 做重复 timing。
3. 继续增加外部证据型文章，但每篇必须有真实对象、问题、取舍和证据入口。

## 24. 第三十五阶段 Dev Route Long-Tail Diagnosis

本阶段把 Phase 33 留下的 `/projects/anyreader-interface-teardown` 偶发 29.3s dev 长尾，转化为可重复诊断入口，而不是直接重构内容加载层。

完成内容：

- 新增 `scripts/diagnose-route-long-tail.mjs`。
- 新增 `npm run perf:routes:long-tail`，默认重复测量 AnyReader、OpenProfile、Lumen、相关博客和 Knowledge 详情路由。
- 新增 `npm run perf:routes:long-tail:raynode`，对生产 release detail routes 做重复测量。
- 诊断输出每条路由的 `first / p50 / p95 / max / warm max / slow / failed`。
- 支持 `ROUTE_LONG_TAIL_ROUNDS`、`ROUTE_LONG_TAIL_DELAY_MS`、`ROUTE_TIMING_THRESHOLD_MS`、`--release-routes`、`--routes=` 和 `--fail-on-slow`。
- README 增加 long-tail 诊断命令。

阶段判断：

- 当前证据不支持重构 `src/lib/content.ts` 或 MDX 静态导入策略。
- 默认本地 10 条重点路由、6 轮、60 个样本：max 870ms，slow 0，failed 0；AnyReader 项目首轮 870ms，warm max 61ms。
- 全部 release detail routes 本地 35 条、3 轮、105 个样本：max 235ms，slow 0，failed 0。
- 生产 release detail routes 35 条、2 轮、70 个样本：max 1351ms，slow 0，failed 0。
- 可疑慢样本都表现为 first-hit 或网络首轮成本，不是持续应用慢。

下一步：

1. Phase 36：External Proof Content Slice。
2. 继续增加外部证据型内容，但只接受有真实对象、问题、取舍和证据入口的文章或项目。
3. 只有当 `perf:routes:long-tail -- --fail-on-slow` 稳定失败时，才重新讨论内容加载架构。

## 25. 第三十六阶段外部参考内容切片

本阶段把 `ursb.me` 从“值得参考的网站”转化为站内可访问、可引用、可追踪的内容资产。

新增产品表面：

- `/blog/ursb-personal-site-object-grammar`：中文外部参考拆解文章。
- `/knowledge/personal-site-object-grammar`：个人站对象语法规则。
- Knowledge 详情 `Reference links`：显示 Knowledge 条目的外部参考和内部关联入口。

系统理解：

- 个人主页的高级感不来自模块数量，而来自对象边界。
- Blog、Projects、Knowledge、Uses、About、Lab、Photos、Music 都必须逐步回答“对象是什么、来源是什么、状态是什么、下一步是什么、证据在哪里”。
- `ursb.me` 可作为对象语法参考，但不能成为 Ray Studio 扩张首页密度的理由。

质量状态：

- 内容关系校验通过：15 posts / 5 projects / 17 knowledge entries。
- Command Center 索引：112 items，仍适合 JSON 按需加载。
- release evidence：54 public routes。
- build：55 routes。
- smoke e2e：52 passed。
- Chromium e2e：110 passed。
- Mobile e2e：112 passed。
- 移动无溢出审计覆盖新增 Blog 和 Knowledge 详情；文章 inline code 长路由已允许断行。
- RayNode 部署：`2c52c49`。
- 线上 health：18/18；线上 full routes：55/55；线上 smoke：50/50。
- 线上 Phase 36 targeted interaction：1 passed。

下一步：

1. Phase 37：Content Scale & Evidence Navigation Review。
2. posts 已到 15，继续加内容前先审查 Command Center 阈值、首页精选密度和 evidence navigation。
3. 暂缓大型知识图谱和新首页模块，优先让现有对象更可验证。

## 26. 第三十七阶段内容规模与证据导航审查

本阶段没有继续增加内容，而是把内容增长的守门状态公开化。

新增产品表面：

- `/blog` Content Scale Panel。
- `content.scale("watch")` 状态。
- Evidence navigation shortcuts：External proof essays、Object grammar rule、Evidence standard、Command payload。

新增事实源：

- `src/lib/content-scale.ts`：posts、projects、knowledge、command items、featured posts、external proof posts、review trigger。

系统理解：

- posts = 15，下一篇文章会越过 posts > 15 审查线。
- 当前 Command Center 112 items，仍适合 JSON 懒加载，不需要升级为服务端搜索。
- 内容增长前更应该审查首页 Featured 策略，而不是继续扩写。

质量状态：

- `validate:content`：通过。
- `report:command-index`：112 items，estimated gzip 10,708 bytes。
- `lint`：通过。
- `build`：55 routes。
- smoke e2e：52 passed。
- Chromium e2e：114 passed。
- Mobile e2e：114 passed。
- 移动端 collaboration command 测试使用可见首页 trigger，避免把移动键盘快捷键不稳定误判为产品缺陷。
- `/blog` mobile overflow：通过。
- RayNode 已部署 `9950eeb`。
- 线上 health：18/18；线上 full routes：55/55；线上 smoke：50/50。
- 线上 Content Scale targeted e2e：1 passed。

下一步：

1. Phase 38：Homepage Featured Editorial Policy。
2. 明确首页 Featured essay / Selected work / Latest writing 的编辑规则。
3. 避免首页自动变成“最新内容列表”，优先展示最能证明判断力和外部证据的对象。

## 27. 第三十八阶段首页编辑策略

本阶段修正首页最危险的隐性漂移：把首页重点对象从 `featured: true + date order` 中解耦，改为明确的编辑策略。

新增产品表面：

- 首页 `why.here(...)` 编辑理由。
- `Editorially recent` 写作区块，替代语义不准的 `Latest from the studio`。
- 媒体卡 `Preview cue` 与真实 `Open mix` 路径。
- Knowledge signal 使用真实 Knowledge 链接，而不是静态文案列表。

新增事实源：

- `src/data/home-editorial.ts`：首页编辑原则、槽位、slug、proof href、reasonCode、reason、selectionRule。

系统理解：

- 首页是策展面，不是自动内容索引。
- `featured: true` 只能说明内容有展示价值，不能等同于“首页第一优先级”。
- 首页槽位必须能回答：为什么是它、证明什么、替换规则是什么、证据入口在哪里。

质量状态：

- `validate:content`：通过，并校验首页编辑策略。
- `report:command-index`：112 items，estimated gzip 10,708 bytes。
- `release:evidence` + `validate:release-evidence`：通过，54 public routes。
- `lint`：通过。
- `build`：55 routes。
- smoke e2e：52 passed。
- Chromium e2e：115 passed。
- Mobile e2e：115 passed。
- 本地桌面和移动截图复核：highlight rail 无明显溢出；OpenProfile 图像移动端略窄裁切，记录为后续视觉 polish。
- RayNode 已部署 `baececf`。
- 线上 health：18/18；线上 full routes：55/55；线上 smoke：50/50。
- 线上 Phase 38 homepage editorial targeted e2e：1 passed。

未来推进队列：

1. Phase 39：Project Evidence Ranking & Case Study Diff Polish。审查项目页证据排序、case study diff 和首页 Selected work 对应证明力。
2. Phase 40：Media Trust Layer。让音乐/照片从“生活质感入口”升级为可信媒体对象，重点处理真实播放状态、照片叙事和媒体来源。
3. Phase 41：Knowledge Graph Thin Layer。只做轻量局部图谱和关系说明，不做大型知识图谱。
4. Phase 42：Homepage Visual Polish。处理 OpenProfile 图片移动端裁切、why.here 默认显隐、highlight rail 节奏。
5. Phase 43：Post-16 Content Review Gate。新增第 16 篇文章前必须复核首页、Command Center、Blog filters 和 Knowledge trails。

## 28. 第三十九至四十一阶段证据、媒体和知识薄图层

本阶段一次性完成三个相邻的小阶段，但没有扩张页面数量；它把现有对象补成更可信、更可解释、更可访问的系统。

新增产品表面：

- `/projects/openprofile-agent-workflow` Selected work proof 面板。
- Project Evidence Pack 的 `Proof #N / proofRole` 排序展示。
- 首页 Media 卡的 Music + Photos 双入口。
- `/photos` source / memory strength / why preserved。
- `/music` mock playback boundary / track usage / trust note。
- Knowledge detail 的 `knowledge.graph("thin")` 局部关系图层。

新增事实源与约束：

- `ProjectMeta.evidencePack.priority`：证据强度排序。
- `ProjectMeta.evidencePack.proofRole`：Primary / Supporting / Context。
- `ProjectMeta.evidencePack.why`：为什么这条证据值得保留。
- `Photo.origin`、`Photo.sourceLabel`、`Photo.memoryStrength`、`Photo.whyPreserved`。
- `Track.sourceState`、`Track.usage`、`Track.whyQueued`。
- `Mix.purpose`、`Mix.playbackState`、`Mix.trustBoundary`。
- `validate:content` 负责拒绝缺少上述字段的项目证据和媒体对象。

系统理解：

- 作品集项目的可信度不来自漂亮项目卡，而来自最强证据能否排在最前、能否被打开、能否解释为什么强。
- 媒体层可以使用参考图和 mock 音乐，但必须清楚标注来源和状态，否则会变成伪个人资产。
- Knowledge 不需要大型图谱；当前更需要局部关系和关系理由。
- Command Center 是对象索引，不是只放页面入口；照片和 track 都应该能被搜索到。

质量状态：

- `validate:content`：通过。
- `report:command-index`：120 items，estimated gzip 11,584 bytes，first screen carries index: no。
- `lint`：通过。
- `build`：55 routes。
- targeted Chromium e2e：4 passed。
- targeted Mobile e2e：3 passed。
- 完整 Chromium e2e：118 passed。
- 完整 Mobile e2e：118 passed。
- RayNode 部署：`d129772`。
- 线上 health：18/18；线上 full routes：55/55；线上 smoke：50/50。
- 线上 Phase 38-41 targeted e2e：4 passed。

下一步：

1. Phase 42：Homepage Visual Polish。
2. 处理 OpenProfile 图片移动端裁切、Media 双入口布局、why.here 信息显隐和 highlight rail 视觉节奏。
3. 暂缓新增大型组件，直到当前首页第一屏更稳定。
