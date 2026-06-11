# 版本追溯

## v0.1.0 - Phase 1 视觉基础

日期：2026-06-11
Commit：`2efc984`
Vercel deployment：`dpl_2ZjdT9MsLJRd8CJH7CvyqJsbcGNF`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-1txtubuvl.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/2ZjdT9MsLJRd8CJH7CvyqJsbcGNF`
GitHub：`https://github.com/njueeRay/elegant-developer-studio`

范围：

- 创建 Next.js 项目和本地 Git repository。
- 实现 Developer Atelier 首页方向。
- 将 `notes` 替换为 `knowledge`。
- 添加生成项目/媒体素材。
- 保存已选视觉参考。
- 添加 PRD、路线图、IA、设计系统和版本追溯。

参考：

- `public/references/developer-atelier-reference.png`

关键决策：

- 使用 Next.js App Router 作为 MDX、SEO、RSS 和 Vercel 的长期基础。
- Phase 1 只做单页首页。
- 将 `knowledge` 视为长期公开记忆系统。
- 媒体先做呈现，不做真实播放。

已知限制：

- 社交链接是占位。
- `/blog`、`/projects`、`/knowledge` 当时还是未来路由。
- 媒体播放器当时只是状态交互，不是真实音频。

## v0.1.1 - 项目追踪地图

日期：2026-06-11
Primary commit：`0c3b4da`
Tag：`v0.1.1`

范围：

- 添加项目总地图。
- 添加进度日志。
- 添加决策记录。
- 添加 Phase 2-5 和交互研究 GitHub milestones。
- 将已有 GitHub issues 分配到 milestones。
- 更新 README 文档索引。

目的：

- 让后续工作能按阶段、路由、组件、issue、milestone 和部署追溯。

## v0.1.2 - 飞书知识库

日期：2026-06-12
Primary commit：`65f74de`
Tag：`v0.1.2`

范围：

- 创建飞书 Wiki 空间：`Elegant Developer Studio｜个人主页项目知识库`。
- 发布项目导航、项目地图、PRD、路线图、IA、设计系统、进度、ADR、版本追溯、设计 QA、素材、执行复核。
- 将关键视觉素材插入飞书素材页。
- 添加 `docs/FEISHU_SYNC.md` 同步地图。

飞书入口：

- `https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

## v0.2.0 - 内容核心

日期：2026-06-12
Primary commit：`8aab6cb`
Tag：`v0.2.0`
Deployment record commit：`fee2b31`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-ai7ak3mvh.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/6KTTFoihvwDadaByRcQV9q6Cp2wm`

范围：

- 添加 MDX 写作和项目内容。
- 添加 `/blog`、`/blog/[slug]`、`/projects`、`/projects/[slug]`。
- 添加内容组件：`PostCard`、`ProjectCard`、`TagFilter`、`ReadingProgress`、`TableOfContents`、`CodeBlock` 和 metadata rail 样式。
- 添加 RSS、sitemap、robots、metadata base。
- 首页接入真实内容 metadata。
- 添加 `docs/PHASE2_RESEARCH.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Production Playwright QA：桌面和移动端无横向溢出。
- 标签筛选、代码复制、RSS 检查通过。

追踪：

- GitHub issue `#1` 已关闭。
- GitHub milestone `Phase 2: Content Core` 已关闭。
