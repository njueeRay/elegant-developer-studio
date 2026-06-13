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

状态：进行中。Knowledge 首个切片和 Uses 首个切片已完成。

交付：

- `/lab` 组件实验室。
- `/about` 简历和经历页。
- `/uses` 工具与工作流。
- `/knowledge` 公开知识库。
- 可选访问统计、文章 reactions、联系表单、后台内容管理。

已完成切片：

- `/knowledge` 公开知识索引。
- `/uses` 工具书架和工作流页面。
- 知识内容模型：`Pattern`、`Snippet`、`Decision`、`Reference`。
- Uses 内容模型：工具、分类、工作流、发布管线。
- `KnowledgeExplorer` 和 `KnowledgeCard`。
- `UsesExplorer`、`UsesShelf`、`ToolCard`、`WorkflowRail`、`PublishingPipeline`。
- `FilterBar` 复用到知识类型筛选。
- `FilterBar` 复用到工具分类筛选。
- 每条知识支持稳定锚点和 `Copy ref`。
- 每个工具支持 `Copy ref`，工具列表支持 `Copy all`。
- Command Center 新增 `knowledge` 类型、真实结果和 `Knowledge context`。
- Command Center 新增 `uses` 类型、真实工具和工作流结果、`Uses context`。
- sitemap 收录 `/knowledge`。
- sitemap 收录 `/uses`。

组件：

- `Timeline`
- `SkillMatrix`
- `UsesShelf`
- `ToolCard`
- `WorkflowRail`
- `PublishingPipeline`
- `KnowledgeCard`
- `KnowledgeExplorer`
- `ReactionBar`
- `ContactPanel`
- `ComponentPreview`

下一片重点：

- 复盘 `/uses` 工具书架、复制引用和工作流模型。
- 判断 `/about` 是否应作为下一切片，用来补上人的经历、原则和联系方式。
- 评估 `Knowledge` 是否需要详情页、反向链接和 local graph。
- 暂不做后台 CMS，继续用本地数据模型保证结构清晰。
