# 设计系统种子

## 视觉 Tokens

色彩：

- 背景：温暖象牙白，但避免过度米色化。
- 主文本：墨黑。
- 次级文本：暖灰石墨色。
- 强调色 1：克制锈红。
- 强调色 2：深开发者蓝。
- 强调色 3：低饱和鼠尾草绿。

字体：

- 展示标题：serif，用于工作室身份和编辑气质。
- UI/正文：Geist Sans。
- 元数据、标签、代码：Geist Mono。
- 字间距默认保持 0；只允许小型大写元数据标签轻微加字距。

界面表面：

- 优先开放式布局。
- 只有在表达工作台、模块边界或内容分组时使用带边框面板。
- 不使用卡片套卡片。
- 圆角保持克制：根据组件尺度控制在 10-20px。
- 半透明只用于局部 chrome 和面板，不作为页面装饰滥用。

动效：

- 只使用微动效：hover lift、命令面板出现、状态切换。
- 动效必须帮助理解层级或状态，不能抢内容。

## 组件库存

Phase 1 已实现：

- `Header`
- `ThemeToggle`
- `StatusBadge`
- `CommandPalette`
- `WorkbenchPanel`
- `WorkbenchRow`
- `HighlightCard`
- `SocialLinks`
- `FloatingPlayer`
- `KnowledgePanel`
- `LabPanel`
- `ContactPanel`

Phase 2 已实现：

- `PostCard`
- `ProjectCard`
- `TagFilter`
- `ReadingProgress`
- `TableOfContents`
- `CodeBlock`
- `MetadataRail`

Phase 3 已实现首版：

- `PhotoGrid`
- `PhotoLightbox`
- `MiniPlayer`
- `TrackList`
- `NowPlaying`
- `ArticleInteractions`

Phase 4 已实现首版：

- `GlobalCommandMenu`
- `GlobalCommandMenu` 键盘选择、结果分组、最近访问和命中高亮
- `GlobalCommandMenu` 当前路由上下文排序、规划页面提示和空状态建议
- `StatusPanel`
- `FilterBar`

Phase 5 已实现首版：

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
- `ExperimentTimeline`
- `QualityGateList`

后续保留：

- `AlbumCard`
- `GlobalSearch`
- `QuickAction`
- `KeyboardHint`
- `ComponentPreview`

## Phase 2 交互细节

- 标签筛选使用低 chrome 圆角控件，有明确 active 状态，不使用厚重 tabs 容器。
- 阅读进度使用顶部 3px 细线，只负责定位，不喧宾夺主。
- 代码块包含紧凑工具栏和复制反馈。
- 代码块显示行数，增强工程阅读质感，但不增加复杂编辑器 chrome。
- 文章标题锚点在桌面端 hover 后才显露，保持阅读安静。
- 文章 reader mode 提示必须可关闭，鼠标跟随微光必须避开正文并尊重 `prefers-reduced-motion`。
- 移动端代码块自动换行，避免看起来像被截断。

## Phase 3 交互细节

- 照片网格使用稳定列布局，不追求复杂瀑布流。
- 灯箱支持关闭、上一张、下一张和键盘操作。
- 迷你播放器使用真实本地状态，不伪装成真实音频流。
- 播放器保留曲目上下文、状态、进度和音量，体现程序员式可观察状态。

## Phase 4 交互细节

- 全站 Command Center 使用 `Cmd K` 打开，`Esc` 关闭。
- 首页命令按钮只触发全站菜单，不再维护局部命令面板。
- 搜索结果来自真实站点内容和真实动作。
- 弹层 z-index 必须高于 reader mode、灯箱以外的普通浮层。
- 结果区内部滚动，避免小屏高度溢出。
- `ArrowDown` / `ArrowUp` 改变 active result，`Enter` 打开选中结果。
- 搜索结果按类型分组，避免结果增长后变成不可扫读列表。
- 最近访问只记录 command id 和时间，不记录正文内容。
- 命中高亮只标记标题和描述里的可见文本，不伪造关键词解释。
- 底部键盘提示保持低调，不能抢占结果列表注意力。
- 默认分组必须理解当前路由：文章页优先写作，项目页优先项目，照片页优先照片，音乐页优先音乐。
- 最近访问不能吞掉当前页面上下文分组。
- 搜索规划中页面时必须解释路线图状态。`Lab` 已经是正式路由，不再显示 planned 状态。
- `Knowledge` 已经是正式路由，不再显示 planned 状态。
- `Uses` 已经是正式路由，不再显示 planned 状态。
- 无结果状态必须给出可点击建议词，不能只显示失败文本。
- 无结果时结果容器不能声明为 `listbox`，除非内部确实有可选择 option。
- `StatusPanel` 只表达当前三类状态：写作、建设、收听；不扩展成首页 dashboard。
- `StatusPanel` 每张卡必须链接到真实页面，不能只是展示文本。
- `FilterBar` 必须显示结果数量、active 状态和清除动作。
- `FilterBar` 移动端允许控件内部横向滚动，但页面本身不能横向溢出。
- `/photos` 使用 `FilterBar` 时，筛选必须同时影响精选区、网格和灯箱导航。
- 灯箱在筛选状态下只能在当前结果内循环，不能跳回全量照片。

## Phase 5 交互细节

- `Knowledge` 首版使用公开索引，不做空白详情页。
- 知识条目必须有稳定 slug、类型、状态、标签、来源和关联链接。
- `KnowledgeCard` 的 `Copy ref` 复制稳定锚点，服务 GitHub、飞书和文档评论。
- `Knowledge` 类型筛选继续复用 `FilterBar`，保持结果数量和清除动作一致。
- 当前内容规模不足时，不做全局 graph、全文搜索库和多选 facets。
- `Uses` 首版不是 Logo 墙，而是工具、角色、信号、工作流和发布管线。
- `Uses` 工具卡必须支持稳定引用，服务 GitHub、飞书和后续文档评论。
- `UsesShelf` 可以有工作台意象，但不能变成不可维护的装饰图。
- `/uses` 的命令入口必须触发全站 Command Center，而不是维护局部命令面板。
- `About` 不是传统简历页，应优先表达原则、能力边界、时间线和协作方式。
- `AboutProfile` 的交互必须服务可信度：原则选择、时间线聚焦和复制简介都要能解释页面内容。
- `/about` 的 Command Center 结果必须来自真实原则、时间线和能力数据，不再显示 planned 状态。
- `SkillMatrix` 只能表达能力边界和证据，不做游戏化评分或夸张数值。
- Contact band 可以使用深色 CTA，但不能与全站温暖纸感割裂。
- `Lab` 首版是组件注册表，不是 Storybook 克隆或空白 gallery。
- `LabExplorer` 必须显示组件状态、来源文件、使用路由、质量证据和可复制 import。
- `Lab` 组件列表中的代码标识可保留 PascalCase；预览标题可用可读名称避免长单词断裂。
- `Lab` 移动端遇到长组件名时必须断词或切换为块级布局，页面级 `scrollWidth` 不得超过 `clientWidth`。
- `ComponentPreview` 只有在真实示例超过静态 metadata 表达能力后再实现。

## 素材规则

- 生产 UI 素材放在 `public/assets`。
- 参考概念图放在 `public/references`。
- 应用代码不得引用临时生成图路径。
- 低信息密度截图不进入正式参考集。
