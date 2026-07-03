# 第五阶段 Uses 调研与首个切片

## 结论

`/uses` 不应该做成工具 Logo 墙，也不应该做成高密度开发者仪表盘。

本轮采用的产品定义是：`Uses` 是个人工作室的工具书架，展示工具、工作流、自动化和发布管线。它回答的不是“我装了哪些软件”，而是“我如何组织注意力、代码、设计和发布”。

## 调研来源

- uses.tech：`/uses` 已经是开发者个人站中成熟的信息形态，常用于描述开发者 setup、工具、技术栈和工作方式。
- Raycast Manual：Raycast 的核心价值是用键盘启动应用、搜索文件、管理窗口、展开 snippets、使用 AI 等，适合作为程序员式快速入口的参考。
- Raycast Quicklinks：Quicklinks 支持把 URL、搜索、项目路径和内部工具变成键盘快捷入口，说明 `/uses` 页面可以展示“如何进入工作流”。
- Raycast Script Commands：脚本命令把本地脚本整合进 UI，证明 automation shelf 应该展示可重复动作，而不是装饰性终端。
- 现有项目文档：用户明确要求 `notes` 替换为 `knowledge`，并要求个人主页逐步扩展成可追溯的 Studio OS。

## 产品判断

### 为什么先做 `/uses`

`/uses` 比 `/lab` 更适合作为 Knowledge 之后的切片。

- `/uses` 能展示程序员身份，但不需要大量组件库存。
- `/uses` 可以承接工具、工作流、发布管线和自动化细节。
- `/uses` 更适合低密度、优雅、可读的视觉系统。
- `/lab` 如果现在做，容易变成半成品组件陈列。

### 为什么不做工具 Logo 墙

Logo 墙的信息密度低，且无法表达用户真正关心的能力。

更好的模型是：

- 工具：当前使用什么。
- 角色：它在系统里负责什么。
- 信号：为什么它值得保留。
- 工作流：一天如何组织。
- 管线：从想法到发布如何闭环。

## 视觉方向

生成参考图：`public/references/uses-page-reference.png`

采用方向：

- Claude Warm：主视觉气质，保持温暖、安静、适合阅读。
- Primer：工具、技术栈、copy ref、命令入口等工程语义。
- Linear / Raycast：局部命令感、筛选、快捷键提示。
- Apple：节制的材质、留白和细腻边界。

避免：

- 假终端。
- 暗色赛博朋克。
- 过密 bento。
- 不可维护的 Logo 展板。
- 和页面语义无关的宠物或强装饰。

## 实现范围

新增：

- `/uses`
- `src/data/uses.ts`
- `UsesExplorer`
- `UsesShelf`
- `ToolCard`
- `WorkflowRail`
- `PublishingPipeline`
- `AutomationShelf`

接入：

- sitemap 增加 `/uses`。
- Command Center 增加 `uses` 类型、真实工具结果和 `/uses` 上下文排序。
- 移除 `Uses is planned`。
- 参考图保存到 `public/references/uses-page-reference.png`。

交互：

- 工具分类筛选：`All`、`Code`、`Writing`、`Automation`、`Design`。
- `Copy all` 复制当前工具引用列表。
- 每个工具支持 `Copy ref`。
- `Open Command Center` 触发全站命令面板。
- Command Center 搜索 `uses` 显示真实结果。

## 质量验收

通过：

- `npm run lint`
- `npm run build`
- `/uses` 标题为 `Uses - Ray Studio`。
- 初始状态显示 `12 / 12 tools`。
- 点击 `Automation` 后显示 `4 / 12 tools`，结果为 `Vercel`、`Raycast`、`Linear`、`Playwright`。
- 点击 `Copy Raycast reference` 后显示 `Copied`。
- Command Center 搜索 `uses` 不显示 `Uses is planned`，并显示真实 Uses 结果。
- 390 x 844 移动端无页面级横向溢出。
- 1440 x 1200 桌面截图无工具卡按钮和正文重叠。

截图：

- `/tmp/uses-desktop.png`
- `/tmp/uses-desktop-1440-fixed.png`
- `/tmp/uses-mobile.png`
- `/tmp/uses-command.png`

## 本轮修正

发现并修复：

- `UsesExplorer` 中 Clipboard API 存在但拒绝写入时不会进入 fallback，导致 `Copied` 反馈不出现。
- 工具卡底部 `Copy ref` 在长文案下会与说明文字重叠。

## 下一步

下一切片建议进入 `/about`，而不是 `/lab`。

理由：

- `/uses` 已经表达工具和工作流。
- `/knowledge` 表达知识结构。
- `/about` 可以补上人的经历、原则、能力边界和联系方式。
- `/lab` 需要更多成熟组件后再做，否则会变成空组件展厅。

