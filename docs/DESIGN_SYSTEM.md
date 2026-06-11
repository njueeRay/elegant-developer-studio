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

后续保留：

- `PhotoGrid`
- `PhotoLightbox`
- `AlbumCard`
- `MiniPlayer`
- `TrackList`
- `NowPlaying`
- `GlobalSearch`
- `ComponentPreview`

## Phase 2 交互细节

- 标签筛选使用低 chrome 圆角控件，有明确 active 状态，不使用厚重 tabs 容器。
- 阅读进度使用顶部 3px 细线，只负责定位，不喧宾夺主。
- 代码块包含紧凑工具栏和复制反馈。
- 文章标题锚点在桌面端 hover 后才显露，保持阅读安静。
- 移动端代码块自动换行，避免看起来像被截断。

## 素材规则

- 生产 UI 素材放在 `public/assets`。
- 参考概念图放在 `public/references`。
- 应用代码不得引用临时生成图路径。
- 低信息密度截图不进入正式参考集。
