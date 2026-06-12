# 进度日志

本文件是项目执行时间账本，记录做了什么、在哪里追踪、还剩什么。

## 2026-06-11

### 第一阶段：视觉基础

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
- 将第一阶段视觉参考和生成素材插入飞书素材页。

## 2026-06-12

### 第二阶段：内容核心

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
- 添加第二阶段调研/复盘文档。
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

- 复盘第二阶段。
- 统一飞书知识库首选语言为中文。
- 准备第三阶段媒体层调研和 schema。

### 飞书中文化

状态：已完成。

目标：

- 飞书知识库首选语言统一为中文。
- 英文只保留在代码路径、组件名、API、品牌名和必要专有名词中。
- 本地 Markdown 源同步中文化，避免未来覆盖飞书。
- 已创建 `14｜第三阶段媒体层调研` 飞书页面。
- 已覆盖同步全部飞书知识库页面，并重新插入素材页保留图片。

## 2026-06-12

### 第三阶段：媒体层首个实现切片

状态：已部署。

完成：

- 添加 `/photos` 页面。
- 添加 `/music` 页面。
- 建立媒体数据模型：`Photo`、`Track`、`Mix`。
- 添加 `PhotoGrid` 和 `PhotoLightbox`。
- 添加 `MiniPlayer`、曲目列表、播放/暂停、上一首/下一首、进度条、音量状态。
- 首页媒体入口修正为 `/music`。
- sitemap 增加 `/photos` 和 `/music`。
- 博客文章页新增轻量 reader mode 提示和鼠标跟随阅读微光。
- 代码块工具栏新增行数信息，保留复制反馈。

产品判断：

- 博客正文不放宠物或强装饰。当前只做阅读增强型巧思：可关闭、可降级、不会遮挡正文。
- 媒体层先做人格和审美表达，不做完整音乐应用或相册后台。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器验证 `/photos`：页面非空，6 张照片，灯箱可打开、切换、关闭。
- 浏览器验证 `/music`：播放按钮切换为暂停，下一首切到 `Quiet refactor`，进度控件存在。
- 浏览器验证博客文章：reader mode 可关闭并折叠为小按钮。
- 移动端 390px：`/photos` 与 `/music` 无横向溢出。
- Vercel production：`https://elegant-developer-studio.vercel.app`
- Deployment URL：`https://elegant-developer-studio-mb5qmmyhg.vercel.app`
- Production fetch：`/photos` 与 `/music` 均返回 `200`。

### 第四阶段：交互层首个实现切片

状态：已部署。

完成：

- 添加 `GlobalCommandMenu`。
- 在 `RootLayout` 接入全站命令菜单。
- 全站支持 `Cmd K` 打开，`Esc` 关闭。
- 首页命令按钮改为打开全站菜单。
- 搜索文章、项目、照片、音乐和快捷动作。
- 点击搜索结果可直接导航。
- 修复 Command Center 与 reader mode 的 z-index 冲突。

调研依据：

- Raycast：keyboard first、快速可靠的统一入口。
- VS Code：命令面板统一命令和搜索。
- Apple HIG：键盘交互需要清晰焦点和可退出路径。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器验证：文章页 `Cmd K` 可打开全站菜单。
- 浏览器验证：搜索 `music` 返回 studio mix。
- 浏览器验证：点击结果跳转 `/music`。
- 浏览器验证：首页命令按钮打开同一个全站菜单。
- 移动端 390px：首页无横向溢出。
- Vercel production：`https://elegant-developer-studio.vercel.app`
- Deployment URL：`https://elegant-developer-studio-3xlszryku.vercel.app`
- Production fetch：`/blog/interface-is-a-promise` 返回 `200`，页面数据包含全站 `GlobalCommandMenu` 和音乐、文章、项目入口。
