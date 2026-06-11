# 决策记录

这里记录长期有效的产品、架构和流程决策。凡是改变路由结构、内容模型、部署策略、交互模式、设计系统方向的事项，都应该进入本文件。

## ADR-0005：内容核心采用 MDX 注册表

日期：2026-06-12

决策：

- 使用 `@next/mdx`。
- 用 `src/lib/content.ts` 维护静态内容注册表。
- 文章放在 `src/content/posts`。
- 项目 case study 放在 `src/content/projects`。
- 每个 MDX 文件导出 `meta`，暂不引入 frontmatter 解析器。

理由：

- 当前内容规模小，适合精确维护。
- 静态导入让构建期路由明确、可类型检查。
- MDX 同时支持长文、代码和自定义组件。
- 飞书是协作层，仓库仍是事实源。

影响：

- 新增文章时需要同步加入注册表。
- 如果内容量明显增长，再评估文件系统自动发现或 CMS。

## ADR-0001：使用 Next.js App Router

日期：2026-06-11

决策：

- 使用 Next.js App Router 和 TypeScript。

理由：

- 项目需要 MDX、SEO、RSS、静态生成和 Vercel 部署。
- Next.js 是完成这些目标的最短路径。

影响：

- 页面放在 `src/app`。
- 内容管线优先围绕静态生成设计。

## ADR-0002：顶层信息架构使用 `Knowledge`，不使用 `Notes`

日期：2026-06-11

决策：

- 长期顶层 IA 使用 `Knowledge`。

理由：

- `Notes` 更像临时、私人、低置信度材料。
- `Knowledge` 可以包含笔记、引用、代码片段、书签和长期学习材料。
- 它更适合一个公开的个人操作系统。

影响：

- 路由、文档、命令动作和未来内容 schema 都应使用 `knowledge`。
- `notes` 可以作为 `knowledge` 内部内容类型存在，但不作为顶层 IA。

## ADR-0003：Phase 1 只做单页首页

日期：2026-06-11

决策：

- Phase 1 只实现首页。

理由：

- 第一优先级是视觉气质、组件方向和 IA。
- 提前创建空路由会制造虚假进度。

影响：

- Phase 1 中 `/blog`、`/projects`、`/knowledge`、`/lab`、媒体路线只作为未来入口。
- Phase 2 从真实内容结构开始，而不是空页面。

## ADR-0004：同时使用仓库文档和 GitHub Issues 追踪

日期：2026-06-11

决策：

- 仓库文档保存项目记忆。
- GitHub Issues/Milestones 追踪执行进度。
- 飞书 Wiki 作为云端阅读、评论和复盘层。

理由：

- 文档解释系统。
- Issues 提供可执行工作单元。
- 飞书方便异步评论和云端维护。

影响：

- 重要阶段必须同步更新 GitHub、仓库文档和飞书。
- `PROJECT_MAP.md` 是总地图。
- `PROGRESS_LOG.md` 是时间账本。
