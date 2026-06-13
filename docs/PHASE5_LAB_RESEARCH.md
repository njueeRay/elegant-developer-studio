# 第五阶段 Lab 调研

## 结论

`/lab` 应该是个人主页的组件实验室和 Portfolio OS 注册表，不是 Storybook 克隆，也不是空的 UI gallery。

它要完成三个任务：

- 给已沉淀组件一个公开索引。
- 给后续交互实验一个进入标准。
- 给项目追溯提供组件级证据。

置信度：高。

## 调研参考

### Storybook Showcase

来源：<https://storybook.js.org/showcase/>

启发：

- Storybook Showcase 强调参考领先 UI 工程团队的 Storybook 项目。
- 对本项目有用的不是照搬 Storybook UI，而是“组件应该能被单独看见、验证、比较”。
- 个人站不需要完整 Storybook 运行时；当前更需要一个轻量公开注册表。

### shadcn/ui Registry Directory

来源：<https://ui.shadcn.com/docs/directory>

启发：

- registry 的价值在于可发现、可复制、可分发。
- Lab 应提供 `Copy import` 和 `Copy registry`，让组件不只是视觉展示，而能进入真实开发流。
- 不应把它做成包管理器目录；个人站只需要足够清晰的组件引用。

### Vercel Geist

来源：<https://vercel.com/geist/introduction>

启发：

- Geist 的价值是开发者产品的清晰、克制和语义一致。
- Lab 使用 Geist Sans / Mono 继续强化代码路径、状态、引用、组件名的可读性。
- 页面不使用假终端，也不使用高密度控制台来冒充专业。

### Atlassian Design Components

来源：<https://atlassian.design/components>

启发：

- 成熟设计系统会将组件、模式、内容和基础设施拆成可浏览目录。
- Lab 首版可先记录组件状态和质量门禁，后续再补真实 `ComponentPreview`。

## 本轮产品判断

Lab 首版应具备：

- 页面身份：`Lab - Ray Studio`。
- 状态条：阶段、组件数量、稳定组件数。
- 筛选：复用 `FilterBar`。
- 组件清单：名称、类别、组件模式、状态、证据。
- 精选预览：当前组件、信号、使用路由、源码路径、复制 import。
- 质量门禁：真实使用、响应式证明、决策追溯、交互有用。
- 实验时间线：当前完成和后续计划。
- Command Center：真实 `lab` 类型结果，不再显示 `Lab is planned`。

## 不做什么

- 不引入 Storybook 运行时。
- 不做假终端。
- 不做代码雨、随机打字效果或装饰性宠物。
- 不做低信息密度截图墙。
- 不把 Lab 做成高密度 SaaS dashboard。

## 验收标准

- `/lab` 在桌面和移动端都成立。
- `GlobalCommandMenu`、`FilterBar`、`StatusPanel`、`KnowledgeCard`、`UsesShelf`、`AboutProfile`、`MiniPlayer`、`PhotoGrid`、`CodeBlock` 能被浏览。
- 组件筛选可用，数量反馈正确。
- 复制 import 和 registry 有明确反馈。
- Command Center 搜索 `lab` 出现真实结果，不出现 `Lab is planned`。
- 390px 移动端无页面级横向溢出。
- 文档、素材、GitHub、Vercel、飞书均能追溯。

