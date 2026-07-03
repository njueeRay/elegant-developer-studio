# 第四阶段状态面板与筛选调研

日期：2026-06-13

## 结论

本切片的目标不是增加更多内容，而是补齐两个可长期复用的交互构件：

- `StatusPanel`：让首页表达当前工作状态，而不是只展示静态作品集。
- `FilterBar`：让内容列表的筛选有明确反馈、结果数量和回退路径。

这两个组件都服务“程序员个人主页”的核心气质：状态可见、范围可控、动作可恢复。

## 外部调研

### Raycast

参考：`https://manual.raycast.com/command-aliases-and-hotkeys`

Raycast 的价值在于把常用入口、状态和动作压缩成可靠路径。对本项目的启发：

- 状态面板不需要像 dashboard 一样密集。
- 首页状态应直接映射到可打开的工作流：写作、项目、音乐。
- 程序员风格应来自可操作状态，而不是假终端装饰。

### Linear

参考：

- `https://linear.app/docs/search`
- `https://linear.app/docs/filtering`

Linear 的筛选体验强调轻量、快速、可组合。对本项目的启发：

- 筛选控件应保持低 chrome，但必须有 active 状态。
- 结果数量是筛选反馈的一部分。
- 清除筛选必须显性，避免用户遗忘当前范围。

### GitHub Issues Filtering

参考：`https://docs.github.com/en/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests`

GitHub 的列表筛选把标签、状态和查询组合成可追踪工作流。对本项目的启发：

- 写作和项目列表的筛选应能支撑长期归档。
- `FilterBar` 后续可以复用到 `knowledge`、`photos`、`lab`。
- 筛选组件需要清晰的状态语义，而不是一次性样式。

### Carbon Status 与 Tag Pattern

参考：

- `https://carbondesignsystem.com/patterns/status-indicator-pattern/`
- `https://carbondesignsystem.com/components/tag/usage/`

Carbon 的状态和标签模式强调语义清晰。对本项目的启发：

- 状态面板的三张卡应对应不同语义：writing、building、listening。
- 标签筛选必须可被屏幕阅读器理解，不能只靠颜色。
- 禁用状态、active 状态和结果数量都应有明确语义。

## 产品判断

### StatusPanel

采用首页首屏后的轻量状态带，而不是 hero 内继续堆内容。

理由：

- Hero 已经承担第一印象。
- Workbench 已经表达工程身份。
- 状态面板放在首屏之后，可以连接“身份”与“当前正在发生什么”。
- 三张状态卡足够表达人格和工作流，不需要更多项。

状态项：

- `Writing`：链接到最新精选文章。
- `Building`：链接到精选项目。
- `Listening`：链接到音乐页当前 mix。

### FilterBar

将原来的局部 `FilterBar` 从 `tag-filter.tsx` 提升为正式组件。

新增能力：

- 结果数量：例如 `1 / 3 essays`。
- 显性清除动作：有 active filter 时可用，无筛选时禁用。
- 统一样式和语义：后续可以复用到知识库、照片、Lab。
- 空状态占位：当前数据不会触发，但组件契约已具备。

## 实现范围

- 新增 `src/components/status-panel.tsx`。
- 新增 `src/components/content/filter-bar.tsx`。
- 首页接入 `StatusPanel`。
- `/blog` 和 `/projects` 接入新版 `FilterBar`。
- 增加 `filter-empty` 空状态。
- 增加桌面和移动端样式。
- 生成 QA 截图：
  - `output/phase4-status-filter/status-panel.png`
  - `output/phase4-status-filter/blog-filter.png`
  - `output/phase4-status-filter/mobile-home.png`

## 验收结果

本地验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser 验证：首页存在 `StatusPanel`，3 张状态卡分别指向文章、项目、音乐。
- Browser 验证：首页桌面无横向溢出。
- Browser 验证：博客点击 `Interaction` 后显示 `1 / 3 essays`，卡片数为 1。
- Browser 验证：点击 `Clear` 后恢复 `3 / 3 essays`，清除按钮禁用。
- Browser 验证：项目点击 `React` 后显示 `1 / 2 projects`。
- Browser 验证：移动端 390 x 844 首页和博客均无页面级横向溢出。
- Browser 截图接口在 CDP `Page.captureScreenshot` 上超时；已用本地 Playwright 补充截图文件。

## 暂不做

- 状态面板动态接 GitHub、音乐服务或 CMS。
- 筛选条件 URL 化。
- 多选筛选。
- 全文搜索索引。
- 照片筛选重构。

## 下一步建议

第四阶段下一片应进入更完整的全站搜索/筛选联动评估：

- 评估 `GlobalSearch` 是否需要从 Command Center 中抽象。
- 判断 `/photos` 是否应复用 `FilterBar`。
- 为 `/knowledge` 的未来内容模型预留标签筛选。
- 若内容量仍小，继续避免引入全文搜索库。
