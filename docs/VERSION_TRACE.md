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

## Unreleased - 第三阶段媒体层首个切片

日期：2026-06-12
Primary commit：`1146723`
Deployment record commit：`6ee64bd`
Vercel deployment：`dpl_E1t2f8VZKqCD3Kx9iBtMP72ZfJ17`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-mb5qmmyhg.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/E1t2f8VZKqCD3Kx9iBtMP72ZfJ17`

范围：

- 添加 `/photos`。
- 添加 `/music`。
- 添加媒体数据模型：`Photo`、`Track`、`Mix`。
- 添加 `PhotoGrid`、`PhotoLightbox`、`MiniPlayer`、`TrackList`、`NowPlaying`。
- 首页媒体入口指向 `/music`。
- sitemap 增加 `/photos` 和 `/music`。
- 博客文章页新增 reader mode 提示、鼠标跟随阅读微光。
- 代码块工具栏新增行数信息。

产品判断：

- 博客正文不放宠物或强装饰，避免污染阅读。
- 程序员风格互动优先服务阅读、状态可见性和可操作反馈。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器 QA：照片灯箱、音乐播放器、博客 reader mode、移动端无横向溢出均通过。
- Production fetch：`/photos` 和 `/music` 均返回 `200`。

## Unreleased - 第四阶段交互层首个切片

日期：2026-06-12
Primary commit：待提交

范围：

- 添加 `GlobalCommandMenu`。
- 在 `RootLayout` 接入全站命令菜单。
- 全站支持 `Cmd K` 打开，`Esc` 关闭。
- 首页命令按钮改为触发全站菜单。
- 搜索文章、项目、照片、音乐和快捷动作。
- 点击结果直接导航。
- 修复 Command Center 与 reader mode 的浮层层级冲突。
- 添加 `docs/PHASE3_REVIEW.md` 和 `docs/PHASE4_RESEARCH.md`。

产品判断：

- 第四阶段优先做降低导航成本的交互，不做装饰性动效。
- Command Center 作为全站动作层，承接程序员风格和可探索性。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器 QA：`Cmd K`、搜索 `music`、结果跳转、首页按钮、移动端无横向溢出均通过。
