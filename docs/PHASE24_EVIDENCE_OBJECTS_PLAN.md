# 第二十四阶段：项目证据对象升级计划

日期：2026-07-02
状态：已规划，待实现

## 1. 阶段判断

当前站点已经有 `Evidence Pack`、`Case Study Diff`、`SourceReveal`、Knowledge Markdown 引用、URL query 状态和 Personal OS 校准面。问题不再是“有没有证据入口”，而是证据对象还不够硬：

- Evidence Pack 目前主要是标题、说明和链接，缺少 commit、deploymentId、screenshot、metric、route、验证方式等结构化字段。
- `DataSourceBadge` 已经在 Personal OS Zoo 中形成语法，但还没有迁移到项目详情和 Knowledge 详情。
- Knowledge 列表页可以复制 Markdown 引用，详情页还没有同等能力。
- 项目证据可以访问，但证据类型、验证状态和来源粒度还不够清楚。

第二十四阶段的目标不是让页面更密，而是让“证据”从装饰性链接升级为可检查对象。

## 2. 北极星

当用户打开一个项目详情页时，必须能快速回答四个问题：

- 这个项目实际改了什么？
- 我可以在哪里检查源代码、部署、文档或测试？
- 这条证据证明了哪个结论？
- 证据最后一次验证是什么时间、通过什么方式完成的？

## 3. 实现范围

### 3.1 项目证据数据模型

升级 `ProjectMeta.evidencePack`，从轻量链接列表扩展为可选 typed evidence object。

建议字段：

- `type`：`source`、`deployment`、`document`、`test`、`screenshot`、`metric`、`decision`。
- `label`：短标题。
- `description`：解释这条证据证明什么。
- `href`：可访问证据入口。
- `route`：站内相关路由。
- `commit`：Git commit hash 或 permalink。
- `deploymentId`：Vercel deployment id。
- `screenshot`：站内截图或静态资产路径。
- `metric`：轻量指标对象，例如测试数量、构建状态、页面数量。
- `verifiedBy`：验证方式，例如 `npm run test:e2e`、Production e2e、Browser QA。
- `verifiedAt`：验证日期。

原则：字段全部可选，但 `type`、`label`、`description`、`href` 必须存在。

### 3.2 项目详情 Evidence Pack 改版

目标：

- 继续保持中低信息密度。
- 用 evidence type、source、verification、route 建立扫读层级。
- 引入 `DataSourceBadge` 语法，但不能把项目详情变成仪表盘。
- 不做 nested card，不做复杂时间线。

建议组件：

- `EvidenceObjectCard`
- `EvidenceTypeBadge`
- `DataSourceBadge`
- `VerificationStamp`

### 3.3 Knowledge 详情引用能力

目标：

- `/knowledge/[slug]` 增加详情页级 `Copy Markdown ref`。
- 引用格式应能直接用于飞书、GitHub issue、PR 描述和项目文档。
- 复制内容至少包含标题、URL 和一句引用说明。

### 3.4 校验脚本

升级 `npm run validate:content`：

- Evidence Pack 每条 evidence 必须有 `type`、`label`、`description`、`href`。
- `type` 必须来自允许枚举。
- 如果存在 `route`，必须是已知站内路由或以 `/` 开头。
- 如果存在 `screenshot`，必须指向 `public/` 下的可访问资源。
- 如果存在 related slug，继续校验 Blog、Project、Knowledge 关系。

### 3.5 测试与视觉 QA

新增或更新 e2e：

- `/projects/lumen#project-evidence-title` 显示 typed evidence。
- 每个 evidence link 可点击并非空 href。
- Knowledge 详情页可以复制 Markdown ref。
- 桌面与移动端无页面级横向溢出。

## 4. 非目标

本阶段不做：

- 完整证据时间线。
- 自动从 GitHub 或 Vercel API 拉取数据。
- 后台 CMS。
- 项目 dashboard。
- 新首页模块。
- 大型 graph 或复杂搜索。

## 5. 验收标准

- `ProjectMeta.evidencePack` 支持 typed evidence object。
- 至少两个项目详情页展示结构化证据。
- Knowledge 详情页具备 Markdown 引用复制。
- `DataSourceBadge` 语法从 Lab 校准面迁移到真实内容详情页。
- `npm run validate:content`、`npm run lint`、`npm run build`、`npm run test:e2e` 通过。
- 本地和生产至少检查一个项目详情页、一个 Knowledge 详情页的桌面与移动端。
- 文档更新 `PROJECT_MAP.md`、`ROADMAP.md`、`DESIGN_SYSTEM.md`、`PROGRESS_LOG.md`、`VERSION_TRACE.md`。

## 6. 当前用户状态复盘

用户当前需求的核心不是“继续堆页面”，而是要求项目进入可治理状态：

- 每一阶段必须有本地文档追踪。
- 页面必须真实可访问，不能只在内部数据里存在。
- `Knowledge / Uses / Lab / About / Projects / Blog` 的职责边界必须清楚。
- 创意交互可以存在，但必须服务真实个人主页场景。
- 中文是项目记忆和文档的首选语言。

因此第二十四阶段应优先补“证据对象”和“引用对象”，而不是做新的视觉炫技。

## 7. 执行顺序

1. 抽出可复用 `DataSourceBadge`。
2. 升级项目 evidence 数据模型。
3. 改造项目详情 Evidence Pack。
4. 增加 Knowledge 详情 Markdown ref。
5. 更新 `validate:content` 和 e2e。
6. 完成视觉 QA、部署、生产 e2e。
7. 同步本地文档和飞书知识库。

## 8. 后续阶段预告

第二十四阶段完成后，下一阶段更适合做：

- Phase 25：Reference Constellation 的克制版，只展示真实 Blog / Knowledge / Project 关系。
- Phase 26：项目详情截图与版本切片，把 evidence object 接入更直观的前后对比。
- Phase 27：个人内容发布节奏，把中文博客、Knowledge 和 Uses 的更新机制固化为月度维护流程。
