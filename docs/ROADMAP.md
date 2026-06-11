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
- `/music` 或扩展首页音乐组件。
- Mini player：播放/暂停、上一首/下一首、进度、音量、当前曲目信息。

组件：

- `PhotoGrid`
- `PhotoLightbox`
- `AlbumCard`
- `MiniPlayer`
- `TrackList`
- `NowPlaying`

状态：准备进入。进入实现前需要完成媒体层调研和 schema 设计。

## 第四阶段：交互层

目标：加入程序员味道和可探索性。

交付：

- 全站命令菜单。
- 全站搜索。
- 写作、项目、knowledge、照片筛选。
- 快捷入口：读文章、看作品、打开音乐、查看照片、联系我。
- 状态面板：正在写什么、最近在做什么、最近听什么。

组件：

- `CommandMenu`
- `GlobalSearch`
- `FilterBar`
- `StatusPanel`
- `QuickAction`
- `KeyboardHint`

## 第五阶段：个人工作室操作系统

目标：扩展成完整个人操作系统。

交付：

- `/lab` 组件实验室。
- `/about` 简历和经历页。
- `/uses` 工具与工作流。
- `/knowledge` 公开知识库。
- 可选访问统计、文章 reactions、联系表单、后台内容管理。

组件：

- `Timeline`
- `SkillMatrix`
- `UsesShelf`
- `KnowledgeCard`
- `ReactionBar`
- `ContactPanel`
- `ComponentPreview`
