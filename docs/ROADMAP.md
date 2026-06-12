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

状态：进行中。首个实现切片和键盘增强切片已完成。

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

暂不做：

- 命令历史。
- 多级 action panel。
- 复杂模糊搜索库。
- 最近访问管理 UI。

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
