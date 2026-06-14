# 第十三至第十六阶段：Navigation OS 与可追溯交互复盘

日期：2026-06-14

## 总原则

本阶段确认一条硬规则：页面“实现了”不等于用户“能发现、能进入、能理解、能追踪”。

因此后续所有阶段都必须同时满足四个条件：

1. 公开可达：任何被纳入站点地图的页面，都必须有公开入口，不允许只靠内部链接、命令面板或开发者记忆访问。
2. 职责清晰：`Uses`、`Lab`、`About`、`Knowledge` 等页面必须各自承担稳定职责，不能互相替代。
3. 证据可追踪：案例、组件、知识和交互必须尽量连接到源码、文档、部署、Issue、截图或可验证页面。
4. 阶段可回放：每个阶段必须能从仓库文档、测试、提交和部署记录中恢复当时的判断。

置信度：高。

## Phase 13：导航与信息架构修复

问题：

- `/uses`、`/about`、`/lab` 等页面虽然存在，但首页主导航没有给出充分入口。
- 内页主要依赖返回首页的链接，缺少全站导航。
- 移动端首屏没有可见主导航，用户需要猜测站点结构。

交付：

- 新增 `src/data/navigation.ts`。
- 新增 `SiteHeader`，统一桌面主导航、移动菜单、主题切换和联系入口。
- 首页和所有核心页面接入统一全站导航。
- 主导航改为真实路由：`/blog`、`/projects`、`/knowledge`、`/uses`、`/lab`、`/about`。
- 二级移动入口包含 `/photos`、`/music`、`/collaboration`、`/contact`。

判断：

- Anchor nav 适合单页作品集，不适合已经进入 Portfolio OS 的个人站。
- `Uses` 和 `About` 是主信息架构，不应藏在命令面板或某个内部页面。

## Phase 14：页面职责边界

职责定义：

- `Knowledge`：长期知识、引用、代码片段、决策和可复用理解。
- `Uses`：工具、技术栈、工作流、自动化和发布管线。
- `Lab`：组件、交互原型、质量门禁和实验注册表。
- `About`：个人原则、经历、能力边界、协作方式和身份叙事。
- `Collaboration`：贡献流程、治理规则、创意 backlog 和外部协作入口。

交付：

- 首页低部从 `Knowledge / Lab / Contact` 扩展为 `Knowledge / Uses / Lab / About / Contact`。
- `Uses` 与 `About` 在首页获得可见入口，不再是隐藏页面。

判断：

- `Lab` 不负责介绍人；`About` 不负责组件库；`Uses` 不负责知识沉淀；`Knowledge` 不负责工具清单。
- 页面可以互相引用，但不能互相替代。

## Phase 15：内容真实性与证据层

问题：

- `Case Study Diff` 已经有 before/after/proof，但 proof 仍是文本，缺少直接证据入口。

交付：

- Project metadata 的 `caseStudyDiff` 新增 `evidenceHref`。
- 项目详情页的 Case Study Diff 增加 `Open evidence` 链接。
- Lumen 和 Studio Knowledge Base 的证据分别指向 GitHub 源码、组件目录和文档目录。

判断：

- 个人主页可以有叙事，但不能只有叙事。
- 高质量程序员风格来自可验证对象，而不是假终端或装饰代码。

## Phase 16：可检查交互增强

交付：

- `SourceReveal` 支持可选行号，后续可以指向 GitHub 文件具体行。
- `ComponentPreview` 增加 viewport switch，支持 `desktop / mobile` 两种预览状态。
- 移动端长标题增加换行保护，避免 `/collaboration` 这类长英文标题造成横向溢出。
- e2e 增加公共导航、移动菜单、证据链接、移动端横向溢出和 Lab viewport switch 覆盖。

判断：

- 当前最值得做的“炫酷”不是宠物、粒子或大型图谱，而是可切换、可追踪、可验证的小型工作台交互。
- `Reference Constellation` 仍值得做，但必须在真实关系足够丰富后再实现。

## 已知限制

- `SourceReveal` 已支持行号，但还没有 commit permalink。
- `ComponentPreview` 仍是轻量预览，不是完整隔离沙箱。
- `Reference Constellation` 暂缓，避免做成装饰性图谱。
- Feishu 同步需要在本阶段验证和部署后再记录最终节点。

## 验证记录

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：10 passed。
- `npm run test:e2e`：84 passed。
- 本地生产模式视觉巡检：`/`、`/uses`、`/about`、`/lab`、`/collaboration` 桌面与移动端均无横向溢出。
- `/collaboration` 移动端标题修正后不再断成孤立字母。

## 下一步

1. 在 Phase 17 设计 `Reference Constellation` 的真实数据模型。
2. 为 `SourceReveal` 增加 commit hash 或 deployment snapshot。
3. 为 Case Study Diff 增加截图或 PR 链接。
4. 为首页 Studio Map 增加轻量关系提示，但不做高密度控制台。
