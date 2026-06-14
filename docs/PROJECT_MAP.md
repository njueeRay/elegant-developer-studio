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

- Production：`https://elegant-developer-studio.vercel.app`
- GitHub：`https://github.com/njueeRay/elegant-developer-studio`
- 飞书知识库：`https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

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
- 生成项目/媒体素材。
- PRD、路线图、IA、设计系统、版本追溯、QA、飞书知识库。

## 3. 产品表面地图

| 表面 | 路由 | 阶段 | 状态 | 作用 |
| --- | --- | --- | --- | --- |
| 首页 | `/` | 1 | 已实现 | 第一印象和精选工作室入口 |
| 博客列表 | `/blog` | 2 | 已实现 | 长文和写作归档 |
| 文章详情 | `/blog/[slug]` | 2 | 已实现 | MDX 阅读体验 |
| 项目列表 | `/projects` | 2 | 已实现 | 精选作品和 case study |
| 项目详情 | `/projects/[slug]` | 2 | 已实现 | MDX 项目 case study |
| RSS | `/rss.xml` | 2 | 已实现 | 写作订阅源 |
| Sitemap | `/sitemap.xml` | 2 | 已实现 | 搜索引擎路由地图 |
| Knowledge | `/knowledge` | 5 | 已实现首版 | 长期知识、片段、学习记录 |
| Photos | `/photos` | 3 | 已实现首版 | 照片档案和灯箱 |
| Music | `/music` | 3 | 已实现首版 | 工作室歌单和收听状态 |
| Lab | `/lab` | 5 | 已实现首版 | 实验、原型、组件注册表和质量门禁 |
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
  INFORMATION_ARCHITECTURE.md    导航、路由和命名决策
  DESIGN_SYSTEM.md               视觉 tokens 和组件库存
  DECISIONS.md                   产品/架构决策记录
  PROGRESS_LOG.md                阶段进度账本
  PHASE2_RESEARCH.md             第二阶段复盘和调研
  PHASE3_RESEARCH.md             第三阶段媒体层调研和计划
  PHASE3_REVIEW.md               第三阶段媒体层复盘
  PHASE4_RESEARCH.md             第四阶段交互层调研和计划
  PHASE4_REVIEW.md               第四阶段首个切片复盘
  PHASE4_KEYBOARD_RESEARCH.md    第四阶段键盘与搜索增强调研
  PHASE4_KEYBOARD_REVIEW.md      第四阶段键盘与搜索增强复盘
  PHASE4_CONTEXT_RESEARCH.md     第四阶段上下文搜索调研和计划
  PHASE4_CONTEXT_REVIEW.md       第四阶段上下文搜索复盘
  PHASE4_STATUS_FILTER_RESEARCH.md 第四阶段状态面板与筛选调研
  PHASE4_STATUS_FILTER_REVIEW.md  第四阶段状态面板与筛选复盘
  PHASE4_PHOTO_FILTER_RESEARCH.md 第四阶段照片筛选调研
  PHASE4_PHOTO_FILTER_REVIEW.md 第四阶段照片筛选复盘
  PHASE5_KNOWLEDGE_REVIEW.md    第五阶段 Knowledge 首个切片复盘
  PHASE5_KNOWLEDGE_RESEARCH.md  第五阶段 Knowledge 首个切片调研
  PHASE5_USES_RESEARCH.md       第五阶段 Uses 调研与首个切片
  PHASE11_READING_FOCUS_RESEARCH.md 第十一阶段阅读焦点调研
  PHASE11_READING_FOCUS_REVIEW.md   第十一阶段阅读焦点复盘
  PHASE12_TRACEABLE_PORTFOLIO_RESEARCH.md 第十二阶段可追溯作品集调研
  PHASE12_TRACEABLE_PORTFOLIO_REVIEW.md   第十二阶段可追溯作品集复盘
  FEISHU_SYNC.md                 飞书同步地图和节点 token
  VERSION_TRACE.md               版本、部署、commit 追溯

public/
  assets/                        生产 UI 使用的生成素材
  references/                    已采纳视觉参考

src/
  app/                           Next.js App Router 入口
  components/                    可复用交互组件
  content/                       MDX 文章和项目 case study
  data/                          首页 mock 和未来数据契约
  lib/                           内容注册表和工具函数
```

## 6. 组件地图

已实现：

- `StudioHome`
- `Header`
- `WorkbenchPanel`
- `WorkbenchRow`
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

- `npm run lint` 通过。
- `npm run build` 通过。
- 桌面和移动端视觉检查完成。
- 无横向溢出。
- 核心交互已验证。
- 项目地图和进度日志已更新。
- GitHub issue/milestone 状态与仓库一致。
- 飞书知识库已同步，且使用中文为主。

## 10. 下一步

下一步是第十二阶段之后的 Portfolio OS 继续推进：

1. 给 `SourceReveal` 增加可选行号和 commit permalink。
2. 给 `ComponentPreview` 增加 viewport switch 和更真实的组件状态。
3. 为 `Case Study Diff` 接入截图、PR、commit 或指标证据。
4. 为 Knowledge backlinks 增加 schema 校验。
5. 设计 `Reference Constellation`，只展示真实关系，不做装饰性大图谱。
6. 继续观察 `GlobalSearch` 是否有必要从 Command Center 中抽象。
7. 第三阶段并行决定是否引入真实音频文件。

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
