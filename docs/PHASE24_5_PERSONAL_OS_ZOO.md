# 第二十四点五阶段 Personal OS Zoo

日期：2026-07-02

## 参考复盘

`ursb.me` 的高价值不在于暗色卡片、绿色文字或 27 个模块，而在于它把个人主页建成一个持续更新的个人数据操作系统。

可迁移内容：

- 当前状态不是静态口号，而是可更新的 pulse。
- 每个模块都是对象：文章、项目、知识、音乐、工具和互动入口。
- 程序员风格来自可执行语法、来源、时间和命令，而不是装饰性代码背景。
- 首页可以承担路由摘要，但不能代替内页。
- 奇趣交互必须收束在局部组件里，先进入 Lab 校准，再进入首页。

不可迁移内容：

- 不复制 20+ 卡片密度。
- 不复制对方的身份、品牌、宠物、内容和数据源。
- 不把首页改成 SaaS dashboard。
- 不做无功能的假终端。

## 本阶段目标

先做一个 `Personal OS Zoo`，再把首页 `StatusPanel` 升级成小切片 `Studio Pulse / Ask Me Terminal`。

本阶段不是 Phase 24 的正式证据对象升级，而是一个插队校准切片：先吸收外部优秀主页的系统逻辑，避免后续盲目加组件。

## 完成内容

- 新增 `src/data/personal-os.ts`。
- 新增 `PersonalOsZoo`，挂载到 `/lab`。
- `PersonalOsZoo` 包含：
  - Personal OS signals。
  - `StudioPulse`、`AskMeTerminal`、`DataSourceBadge`、`TerminalObjectList`、`DensityGuardrail`。
  - prompt terminal 校准面。
  - flaw ledger。
  - copyable command。
- `StatusPanel` 升级为 `Studio Pulse`：
  - Writing。
  - Building。
  - Knowledge。
  - Listening。
  - 每张卡包含 source 和 command。
- 首页新增轻量 `Ask Me Terminal`：
  - “这个站怎么构建的？”
  - “最近在做什么？”
  - “推荐一个入口”
  - 支持复制当前 prompt response。
- Lab 注册 `PersonalOsZoo`。
- e2e 覆盖首页 Studio Pulse、Ask Me Terminal、Lab Personal OS Zoo 和 prompt 切换。

## Style Genome

Intent：

- 产品类型：Developer Personal OS。
- 用户：读者、潜在合作者、未来项目伙伴、自己。
- 核心任务：快速理解当前状态，并进入真实内容、项目、知识或 Lab。
- 核心对象：Pulse、Prompt、Source、Route、Evidence、Flaw。

Visual：

- 沿用本站 warm studio tokens。
- 不把首页切换成纯暗色终端。
- 命令语法使用 Geist Mono，小尺寸、低 chrome。
- 面板使用现有边框和克制圆角。
- 不增加发光、粒子、玻璃和大面积渐变。

Layout：

- 首页：`StatusPanel` 内部增加 stack，不新增大型首屏模块。
- Lab：`PersonalOsZoo` 放在 `LabExplorer` 之前，作为组件校准面。
- 移动端：单列，signal strip 纵向展开，命令按钮不制造横向滚动。

Density：

- 首页只显示四个 pulse。
- prompt 只保留三个。
- Zoo 展示五个对象和三个 flaw，不扩展成完整看板。

## Flaw Ledger

### Flaw：Dashboard gravity

Symptom：

- 参考站点内容很多，直接迁移会把本站从优雅工作室推向高密度仪表盘。

Correction：

- Phase 24.5 只做 Studio Pulse、Ask Me Terminal 和 Lab Zoo。

Status：

- Fixed。

### Flaw：Fake terminal decoration

Symptom：

- 程序员风格容易退化成没有功能的命令行装饰。

Correction：

- 每个 command string 必须导航、解释、复制或揭示来源。

Status：

- Accepted guardrail。

### Flaw：Cute-only interaction

Symptom：

- 宠物、3D、在线人数和光标互动容易抢走内容主线。

Correction：

- 奇趣对象必须先进入 Lab，不直接进入首页首屏。

Status：

- Accepted guardrail。

## 下一阶段建议

Phase 24：项目证据对象升级仍然成立。

调整后的优先级：

1. 为 Evidence Pack 增加 `commit`、`deploymentId`、`screenshot`、`metric` 等字段。
2. 把 `DataSourceBadge` 的语法迁移到项目详情和 Knowledge 详情。
3. 为 Knowledge detail 页增加 Markdown 引用复制。
4. 再评估是否做一个非常小的 studio object，而不是直接做宠物或 3D world。

## 验收标准

- `/lab` 能直接看到 Personal OS Zoo。
- 首页能看到 Studio Pulse。
- prompt 切换有真实响应。
- 每个新增入口可点击或可复制。
- 桌面和移动端不横向溢出。
- 不增加不可访问的内部-only 内容。

## 验证记录

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：4 passed。
- `npm run test:e2e`：108 passed。
- Playwright 本地生产模式视觉检查：
  - `/` 桌面和移动端页面级无横向溢出，Studio Pulse 可见。
  - `/lab#personal-os-zoo-title` 桌面和移动端页面级无横向溢出，Personal OS Zoo 可见。
  - console 无相关 warning/error。
