# 进度日志

本文件是项目执行时间账本，记录做了什么、在哪里追踪、还剩什么。

## 2026-06-11

### Phase 1：视觉基础

状态：完成。

已完成：

- 创建 Next.js App Router 项目。
- 实现第一版首页。
- 选择并实现 Developer Atelier 方向。
- 将 `Notes` 替换为 `Knowledge`。
- 加入生成媒体/项目素材。
- 添加 PRD、路线图、IA、设计系统、版本追溯和设计 QA。
- 部署到 Vercel。
- 创建 GitHub repository 并推送 `main`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 桌面视觉 QA：1440 x 1024 通过。
- 移动端视觉 QA：390 x 844 通过。
- Vercel fetch：返回 `200 OK`。

产物：

- GitHub：`https://github.com/njueeRay/elegant-developer-studio`
- Vercel：`https://elegant-developer-studio.vercel.app`
- QA：`design-qa.md`

提交：

- `2efc984` - `feat: scaffold elegant developer studio`
- `e93429d` - `docs: record vercel deployment`
- `b6d30c6` - `docs: record github repository`

### 项目地图和飞书知识库

状态：完成。

已完成：

- 添加 `docs/PROJECT_MAP.md`。
- 添加 `docs/PROGRESS_LOG.md`。
- 添加 `docs/DECISIONS.md`。
- 创建 GitHub milestones。
- 将 issues `#1` 到 `#5` 分配到 milestones。
- 创建飞书 Wiki 空间。
- 发布核心项目文档到飞书。
- 将 Phase 1 视觉参考和生成素材插入飞书素材页。

## 2026-06-12

### Phase 2：内容核心

状态：完成。

已完成：

- 添加 `@next/mdx` 和 MDX 内容支持。
- 添加 `src/content/posts` 下的 MDX 文章。
- 添加 `src/content/projects` 下的 MDX 项目 case study。
- 添加 `src/lib/content.ts` 内容注册表和 metadata 工具。
- 实现 `/blog`、`/blog/[slug]`、`/projects`、`/projects/[slug]`。
- 实现 `PostCard`、`ProjectCard`、`TagFilter`、`ReadingProgress`、`TableOfContents`、`CodeBlock` 和 metadata rail 样式。
- 首页 latest writing 和 selected work 接入真实内容 metadata。
- 添加 RSS、sitemap、robots、metadata base。
- 添加 Phase 2 调研/复盘文档。
- 关闭 GitHub issue `#1`。
- 关闭 GitHub milestone `Phase 2: Content Core`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Playwright production QA：
  - `/blog` 桌面：无横向溢出。
  - `/blog/interface-is-a-promise` 桌面：无横向溢出。
  - `/projects` 桌面：无横向溢出。
  - `/blog/interface-is-a-promise` 移动端：无横向溢出。
- 标签筛选：点击 `Interaction` 后返回 1 篇文章。
- 代码复制：复制 TypeScript snippet，并显示 `Copied`。
- RSS：包含 `Ray Studio Writing`。

截图：

- `output/playwright/phase2-production/blog-desktop.png`
- `output/playwright/phase2-production/article-desktop.png`
- `output/playwright/phase2-production/projects-desktop.png`
- `output/playwright/phase2-production/article-mobile-final.png`

部署：

- Production alias：`https://elegant-developer-studio.vercel.app`
- Deployment URL：`https://elegant-developer-studio-ai7ak3mvh.vercel.app`

下一步：

- 复盘 Phase 2。
- 统一飞书知识库首选语言为中文。
- 准备 Phase 3 媒体层调研和 schema。

### 飞书中文化

状态：进行中。

目标：

- 飞书知识库首选语言统一为中文。
- 英文只保留在代码路径、组件名、API、品牌名和必要专有名词中。
- 本地 Markdown 源同步中文化，避免未来覆盖飞书。
