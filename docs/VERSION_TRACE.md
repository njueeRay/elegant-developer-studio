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
Primary commit：`4d020e3`
Deployment record commit：`42bb87f`
Vercel deployment：`dpl_7Zcx4NVajfhYSfhdcxnRbT5VJwE5`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-3xlszryku.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/7Zcx4NVajfhYSfhdcxnRbT5VJwE5`

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
- Production fetch：`/blog/interface-is-a-promise` 返回 `200`，页面数据包含全站 `GlobalCommandMenu` 和音乐、文章、项目入口。

## Unreleased - 第四阶段键盘与搜索增强切片

日期：2026-06-13
Primary commit：`b854f1d`
Deployment record commit：`492a62e`
Vercel deployment：`dpl_3Rvw9VxDNvNwSdRumbhuy6HEUaNq`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-9wopzkbv8.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/3Rvw9VxDNvNwSdRumbhuy6HEUaNq`

范围：

- Command Center 支持 `ArrowDown` / `ArrowUp` / `Home` / `End` 选择结果。
- Command Center 支持 `Enter` 打开 active result。
- 增加 `Recent` 分组和 localStorage 最近访问记录。
- 搜索结果按类型分组。
- 标题和描述中的可见命中词高亮。
- 增加底部键盘提示。
- `<html>` 增加 `data-scroll-behavior="smooth"`。
- 添加 `docs/PHASE4_REVIEW.md` 和 `docs/PHASE4_KEYBOARD_RESEARCH.md`。

产品判断：

- 第四阶段第二个切片先打磨 Command Center 手感，不急于扩展状态面板。
- 程序员风格优先体现在键盘效率、可解释结果和状态记忆，而不是装饰性特效。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器 QA：键盘选择、`Enter` 打开、最近访问、分组、高亮、桌面和移动端无横向溢出均通过。
- Production fetch：`/blog/interface-is-a-promise` 返回 `200`，页面数据包含 `data-scroll-behavior="smooth"` 和全站 `GlobalCommandMenu`。

## Unreleased - 第四阶段上下文搜索与空状态恢复切片

日期：2026-06-13
Primary commit：`732cd49`
Deployment record commit：`1dbfd55`
Context deployment：`dpl_Fn8nL7aj37UiEsbu7Yvzq4LPD8dT`
Hotfix commit：`dff8d6f`
Final deployment：`dpl_4EwLqMkgPKgDqiVcU26ipnbKDFd1`
Production alias：`https://elegant-developer-studio.vercel.app`
Context deployment URL：`https://elegant-developer-studio-n49bqn9bo.vercel.app`
Final deployment URL：`https://elegant-developer-studio-eta61h964.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/4EwLqMkgPKgDqiVcU26ipnbKDFd1`

范围：

- `GlobalCommandMenu` 增加当前路径感知。
- `/blog`、`/projects`、`/photos`、`/music` 默认提升对应上下文。
- 查询评分增加 context boost。
- 搜索 `knowledge` 时保留真实项目结果，同时显示 `Knowledge is planned`。
- 搜索 `uses` 等无结果词时显示规划说明和建议词。
- 建议词支持点击恢复查询。
- 无 option 时结果容器不再声明 `role="listbox"`。
- 修复最近访问吞掉当前页面上下文的问题。
- 添加 `docs/PHASE4_KEYBOARD_REVIEW.md` 和 `docs/PHASE4_CONTEXT_RESEARCH.md`。
- README 改为中文入口，并补齐当前阶段索引。
- 追加修复 `CodeBlock` hydration mismatch：代码块行数和复制文本在挂载后从真实 `<pre>` DOM 读取。

产品判断：

- 当前内容规模还不需要完整全文搜索库。
- 程序员风格继续优先体现在命令效率、上下文意识、可恢复路径和状态解释，而不是装饰性终端效果。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器 QA：文章页上下文、`knowledge` 规划提示、`uses` 空状态、建议词恢复、移动端 `/music` 上下文均通过。
- 浏览器 QA：文章页代码块显示 `5 lines`，控制台 warn/error 为空。
- Vercel inspect：final deployment 状态 `Ready`。
- Production fetch：`/blog/interface-is-a-promise` 返回 `200`，页面数据包含 `data-scroll-behavior="smooth"` 和全站 `GlobalCommandMenu`。

## Unreleased - 第四阶段状态面板与筛选切片

日期：2026-06-13
Primary commit：`53a77f3`
Deployment record commit：`9c4dca0`
Vercel deployment：`dpl_49mRxU3AwqpJZQViZHqicg5D1mD8`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-2lkoc4zhl.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/49mRxU3AwqpJZQViZHqicg5D1mD8`

范围：

- 新增 `StatusPanel`。
- 首页增加最近在写、最近在做、最近在听状态面板。
- 新增可复用 `FilterBar`。
- `/blog` 和 `/projects` 接入新版筛选条。
- 筛选条显示结果数量、active 状态和清除动作。
- 增加筛选空状态。
- 添加 `docs/PHASE4_CONTEXT_REVIEW.md` 和 `docs/PHASE4_STATUS_FILTER_RESEARCH.md`。

产品判断：

- Command Center 已经稳定，下一步应把页面表面的状态和筛选反馈补齐。
- 状态面板不能扩展成高密度 dashboard，只保留三类当前状态。
- 筛选条必须可复用到后续 `/knowledge`、`/photos`、`/lab`，不能是博客列表的一次性控件。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：首页状态面板、博客筛选、项目筛选、桌面和移动端无横向溢出均通过。
- 本地 Playwright QA：生成状态面板、博客筛选条和移动端首页截图。
- Vercel inspect：deployment 状态 `Ready`。
- Production fetch：首页返回 `200`，页面数据包含 `studio-status-panel`、`Current loops`、`Atelier - late night`。
- Production fetch：`/blog` 包含 `Filter writing` 和 `3 / 3 essays`；`/projects` 包含 `Filter work` 和 `2 / 2 projects`。

## Unreleased - 第四阶段照片筛选切片

日期：2026-06-13
Primary commit：`57675ac`
Deployment record commit：`c268b46`
Vercel deployment：`dpl_Fkvk14f2WagC9TGJDcz5DCSP1jiu`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-qhfkj8vir.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/Fkvk14f2WagC9TGJDcz5DCSP1jiu`

范围：

- `/photos` 接入可复用 `FilterBar`。
- 增加 `Featured` 特殊筛选。
- 使用照片 tags 自动生成筛选项。
- 筛选后精选区域、照片网格和灯箱导航都基于当前结果。
- 添加 `docs/PHASE4_STATUS_FILTER_REVIEW.md` 和 `docs/PHASE4_PHOTO_FILTER_RESEARCH.md`。

产品判断：

- 先验证 `FilterBar` 在媒体场景的复用能力，不急于抽象 `GlobalSearch`。
- 当前照片量不需要多维 faceted navigation。
- 灯箱必须跟随当前筛选结果，避免用户在筛选状态下跳回全量照片。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：照片筛选、灯箱联动、清除筛选、桌面和移动端无横向溢出均通过。
- Vercel inspect：deployment 状态 `Ready`。
- Production fetch：`/photos` 返回 `200 OK`，并包含 `photo-explorer`、`Filter photos`、`6 / 6 frames`、`Featured`、`Music`、`Listening corner`。
- Feishu：`23｜第四阶段状态面板与筛选复盘`、`24｜第四阶段照片筛选调研`。
- Feishu fetch：导航页包含 23/24；照片筛选调研页包含 `Music`、`1 / 6 frames`、`Listening corner`。
- GitHub：issue `#3` comment `4694227104`；issue `#5` comment `4694228454`。
