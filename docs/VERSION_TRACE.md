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
- `npm run test:e2e`：60 passed。
- 本地生产模式视觉复核：`/contact` 桌面和移动端无横向溢出。
- `npm run build`：通过。
- Browser QA：`/knowledge` 页面身份、初始状态、无覆盖层和无横向溢出通过。
- Playwright QA：知识类型筛选、复制引用、Command Center 搜索和移动端布局通过。
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

## Unreleased - 第五阶段 Knowledge 首个切片

日期：2026-06-13
Primary commit：`6cc9fda`
Command menu wiring commit：`ca2df2f`
Deployment record commit：`11fc0d5`
Feishu sync commit：`3503eff`
GitHub trace commit：本记录所在提交
Vercel deployment：`dpl_8F8o7UHhon7spUfpzVtoLn1e217i`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-j4uvj1xbl.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/8F8o7UHhon7spUfpzVtoLn1e217i`

范围：

- 新增 `/knowledge` 页面。
- 新增 `src/data/knowledge.ts` 内容模型。
- 新增 `KnowledgeExplorer` 和 `KnowledgeCard`。
- `FilterBar` 复用到知识类型筛选。
- 每条知识支持稳定锚点和 `Copy ref`。
- Command Center 新增 `knowledge` 类型、真实知识结果和 `Knowledge context`。
- 移除 `Knowledge is planned` 状态。
- sitemap 增加 `/knowledge`。
- 添加 `docs/PHASE4_PHOTO_FILTER_REVIEW.md` 和 `docs/PHASE5_KNOWLEDGE_RESEARCH.md`。

产品判断：

- 第五阶段先打开 `Knowledge`，因为它是长期 IA 的基础。
- 当前不做详情页、全文搜索、多选 facets 和全局图谱。
- `Copy ref` 是本轮最小但高价值的程序员式交互。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：`/knowledge` 页面身份、初始状态、无覆盖层和无横向溢出通过。
- Playwright QA：知识类型筛选、复制引用、Command Center 搜索和移动端布局通过。
- Vercel inspect：deployment 状态 `Ready`。
- Production fetch：`/knowledge` 返回 `200 OK`，并包含 `Knowledge - Ray Studio`、`Filter knowledge`、`5 / 5 entries`、`Copy ref`、`Filters before full search`。
- Production sitemap：包含 `/knowledge`。
- Feishu：`25｜第四阶段照片筛选复盘`、`26｜第五阶段 Knowledge 调研`。
- Feishu fetch：导航页包含 25/26；Knowledge 调研页包含 `Copy ref`、`5 / 5 entries`、`Decision`、`Knowledge is planned` 变更记录。
- GitHub：issue `#4` comment `4697691422`；issue `#5` comment `4697691502`。

## Unreleased - 第五阶段 Uses 首个切片

日期：2026-06-13
Primary commit：`070b9f5`
Deployment record commit：`eb28cb3`
GitHub trace commit：本记录所在提交
Vercel deployment：`dpl_53zPmqkRZvhssJURGiHE1PrWWy8y`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-egeyv7n0r.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/53zPmqkRZvhssJURGiHE1PrWWy8y`

范围：

- 新增 `/uses` 页面。
- 新增 `src/data/uses.ts`。
- 新增 `UsesExplorer`。
- 新增工具书架、工具卡、工作流、发布管线和自动化 shelf。
- `FilterBar` 复用到工具分类筛选。
- 工具支持 `Copy ref`，工具列表支持 `Copy all`。
- Command Center 新增 `uses` 类型、真实工具结果、工作流结果和 `Uses context`。
- 移除 `Uses is planned` 状态。
- sitemap 增加 `/uses`。
- 添加 `docs/PHASE5_KNOWLEDGE_REVIEW.md` 和 `docs/PHASE5_USES_RESEARCH.md`。
- 保存视觉参考：`public/references/uses-page-reference.png`。

产品判断：

- `/uses` 是工具书架，不是 Logo 墙。
- 本轮重点展示工具、角色、信号、工作流和发布管线。
- 下一切片优先考虑 `/about`，暂不做 `/lab`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：`/uses` 页面身份、工具筛选、复制反馈、Command Center 搜索和移动端布局通过。
- 视觉 QA：参考图和 1440 x 1200 实现截图对照通过；已修复工具卡底部重叠。
- Vercel inspect：deployment 状态 `Ready`。
- Production fetch：`/uses` 返回 `200 OK`，并包含 `Uses - Ray Studio`、`Filter tools`、`12 / 12 tools`、`Open Command Center`、`Workspace rhythm`、`Publishing pipeline`。
- Production sitemap：包含 `/uses`。
- Feishu：`27｜第五阶段 Knowledge 复盘`、`28｜第五阶段 Uses 调研`。
- Feishu fetch：导航页包含 27/28；Uses 调研页包含 `12 / 12 tools`、`Copy Raycast reference`、`Uses is planned` 变更记录。
- GitHub：issue `#4` comment `4697820505`；issue `#5` comment `4697820783`。

## Unreleased - 第五阶段 About 首个切片

日期：2026-06-13
Primary commit：`f8f9cd8`
Deployment record commit：本记录所在提交
GitHub trace commit：本记录所在提交
Vercel deployment：`dpl_eLddAkLRyfEqKAgUMfPCqUS36sFa`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-g852ukupb.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/eLddAkLRyfEqKAgUMfPCqUS36sFa`

范围：

- 新增 `/about` 页面。
- 新增 `src/data/about.ts`。
- 新增 `AboutProfile`。
- 实现 Studio Profile、状态条、时间线聚焦、原则选择、能力矩阵、协作约定和 Contact band。
- 添加 `Copy intro`，复制稳定 About 引用。
- Command Center 新增 `about` 类型、真实原则/时间线/能力结果和 `About context`。
- 移除 `About is planned` 状态。
- sitemap 增加 `/about`。
- 保存视觉参考：`public/references/about-page-reference.png`。
- 添加 `docs/PHASE5_USES_REVIEW.md` 和 `docs/PHASE5_ABOUT_RESEARCH.md`。

产品判断：

- `/about` 应该先表达个人判断系统和合作边界，而不是做高密度简历。
- 程序员风格用原则选择、复制简介、时间线聚焦和 Command Center 结果表达，不用假终端或宠物。
- 下一切片优先考虑 `/lab`，把已沉淀组件变成可浏览实验室。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：`/about` 页面身份、原则选择、复制简介、Command Center 搜索和移动端布局通过。
- 生产构建移动端 390 x 844：`scrollWidth 390`，`clientWidth 390`。
- Vercel inspect：deployment 状态 `Ready`。
- Production fetch：`/about` 返回 `200 OK`，并包含 `About - Ray Studio`、`I design and build calm`、`Code as product material`。
- Production sitemap：包含 `/about`。
- Feishu：`29｜第五阶段 Uses 复盘`、`30｜第五阶段 About 调研`。
- Feishu fetch：导航页包含 29/30；About 调研页包含 `Copy intro`、`About is planned` 变更记录和 `scrollWidth 390`；素材页包含 `about-page-reference.png`。
- GitHub：issue `#4` comment `4697902514`；issue `#5` comment `4697902594`。

## Unreleased - 第五阶段 Lab 首个切片

日期：2026-06-13
Primary commit：`4c4ec8a`
Deployment record commit：`ad095fa`
GitHub trace commit：本记录所在提交
Vercel deployment：`dpl_FRvaS6k35CWuuYShEvxS6eDgFgbN`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-57vn0qx3p.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/FRvaS6k35CWuuYShEvxS6eDgFgbN`

范围：

- 新增 `/lab` 页面。
- 新增 `src/data/lab.ts`。
- 新增 `LabExplorer`。
- 实现组件注册表、组件筛选、精选预览、复制 import、复制 registry、实验时间线和质量门禁。
- Command Center 新增 `lab` 类型、真实组件和实验结果、`Lab context`。
- 移除 `Lab is planned` 状态。
- sitemap 增加 `/lab`。
- 保存视觉参考：`public/references/lab-page-reference.png`。
- 添加 `docs/PHASE5_ABOUT_REVIEW.md` 和 `docs/PHASE5_LAB_RESEARCH.md`。

产品判断：

- `/lab` 是 Portfolio OS 的组件注册表，不是 Storybook 克隆或空白组件画廊。
- 程序员风格体现在源码路径、import 复制、registry 复制、质量门禁和命令入口。
- `ComponentPreview` 暂不实现；等真实示例超过静态 metadata 表达能力后再做。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：组件筛选、复制 import、Command Center 搜索、桌面和移动端无横向溢出均通过。
- 已修复移动端 grid 被长内容撑宽的问题。
- 已修复预览长组件名断裂问题。
- Vercel inspect：deployment 状态 `Ready`。
- Production fetch：`/lab` 返回页面内容，包含 `Lab - Ray Studio`、`Filter components`、`GlobalCommandMenu` 和 `Quality gates`。
- Production sitemap：包含 `/lab`。
- Feishu：`31｜第五阶段 About 复盘`、`32｜第五阶段 Lab 调研`。
- Feishu fetch：导航页包含 31/32；Lab 调研页包含 `Storybook Showcase`、`shadcn/ui Registry Directory` 和 `390px 移动端`；素材页包含 `lab-page-reference.png`。
- GitHub：issue `#4` comment `4697990453`；issue `#5` comment `4697991038`。

## Unreleased - 第六阶段可达性与交互契约

日期：2026-06-13
Primary commit：`be7f5bf`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_A9hwKUEZNYsbL1grYaWxuj4v99EX`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-84jah2zwx.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/A9hwKUEZNYsbL1grYaWxuj4v99EX`

范围：

- 修复首页占位社交链接、占位邮箱、品牌 `#` 链接和 `#media` 缺失。
- 新增共享剪贴板 fallback 工具。
- 统一 CodeBlock、Knowledge、Uses、About、Lab 复制反馈。
- 增加命令面板、筛选器和复制交互的稳定测试锚点。
- 新增 Playwright e2e 配置和 `test:e2e` 脚本。
- 新增全站审计、Phase 6 调研和 Phase 6 复盘文档。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：52 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：52 passed。
- 本地生产模式截图复核：首页桌面、首页移动端、About contact。

部署：

- Vercel inspect：deployment 状态 `READY`。
- Production alias 已指向本阶段部署。

外部同步：

- GitHub issue `#4` comment `4699034933`。
- GitHub issue `#5` comment `4699035053`。
- 飞书：[33｜全站产品与交互审计](https://scnlb1lk96sb.feishu.cn/wiki/LoNqwp5igiui2skcSThc2iPHn3g)。
- 飞书：[34｜第六阶段可达性调研](https://scnlb1lk96sb.feishu.cn/wiki/CFtQwXanFizQVBkfTT1czPh4nEg)。
- 飞书：[35｜第六阶段可达性复盘](https://scnlb1lk96sb.feishu.cn/wiki/G47Bwwl2FiuJsYkQtZKcEpgtn4c)。

## Unreleased - 第七阶段 Contact 与公开信任层

日期：2026-06-14
Primary commit：`1e61b5e`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_GTGZWzVKHkSaXt2R9TsBbrfjVcRk`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-kjne04d8h.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/GTGZWzVKHkSaXt2R9TsBbrfjVcRk`

范围：

- 新增 `/contact` 页面。
- 新增 `src/data/contact.ts`。
- 新增 `ContactHub`，包含公开路由、联系 brief、适用主题和边界说明。
- 首页、About、Knowledge、Command Center 的 Contact 入口统一到 `/contact`。
- sitemap 增加 `/contact`。
- Playwright E2E 增加 Contact 访问和交互契约。
- 新增第七阶段调研与复盘文档。

产品判断：

- Contact 是公开信任层，不是伪表单。
- 没有真实私密渠道前，不展示假邮箱或假提交。
- GitHub Issues 继续作为公开讨论路径，但由 `/contact` 解释适用范围和上下文。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：58 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：58 passed。
- Browser QA：页面身份、唯一 H1、真实 GitHub Issues 链接、复制反馈、控制台健康通过。
- 移动端无横向溢出：`scrollWidth 390`，`clientWidth 390`。
- Vercel inspect：deployment 状态 `Ready`。
- Production alias 已指向本阶段部署。

外部同步：

- GitHub issue `#4` comment `4699086363`。
- GitHub issue `#5` comment `4699086922`。
- 飞书：[36｜第七阶段 Contact 调研](https://scnlb1lk96sb.feishu.cn/wiki/XAwGwIpJ2iVUE8k4Mjfcmw6yn8e)。
- 飞书：[37｜第七阶段 Contact 复盘](https://scnlb1lk96sb.feishu.cn/wiki/QiYew1iOhic5YkkZ6KicjZ4OnAb)。

## Unreleased - 第八阶段公开协作与 Issue Template 层

日期：2026-06-14
Primary commit：`866c410`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_HRDcxTSwxDfJAGxWAxGmQPj4LR38`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-eazkr2exm.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/HRDcxTSwxDfJAGxWAxGmQPj4LR38`

范围：

- 新增 GitHub Issue Forms。
- 新增 `config.yml` 关闭 blank issues，并提供 Contact 与项目地图外部链接。
- `/contact` 主讨论入口改为结构化 issue form。
- Playwright 增加仓库协作契约测试。
- 新增第八阶段调研与复盘文档。

产品判断：

- 公开协作优先结构化 GitHub issue，而不是未配置的私密表单。
- Contact brief 应变成可执行的 GitHub Issue Form。
- 不绑定 labels/assignees/projects，避免缺少仓库标签体系时造成配置失败。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：60 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：60 passed。
- 本地生产模式视觉复核：`/contact` 桌面和移动端无横向溢出。
- Vercel inspect：deployment 状态 `Ready`。
- Production alias 已指向本阶段部署。

外部同步：

- GitHub issue `#4` comment `4699301750`。
- GitHub issue `#5` comment `4699302265`。
- 飞书：[38｜第八阶段 Issue Template 调研](https://scnlb1lk96sb.feishu.cn/wiki/Jtp4wmyfhiHqXQkHbzXcFeEZncb)。
- 飞书：[39｜第八阶段 Issue Template 复盘](https://scnlb1lk96sb.feishu.cn/wiki/RbuowE2dtizYYokv8hwcU1tOn3d)。

## Unreleased - 第九阶段协作治理与创意方向

日期：2026-06-14
Primary commit：`748eb94`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_6LRU2cxFSJS3uTPpoJVbQAtcLzLQ`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-blgy772e9.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/6LRU2cxFSJS3uTPpoJVbQAtcLzLQ`

范围：

- 新增 `/collaboration` 页面。
- 新增 `src/data/collaboration.ts`。
- Contact 页面新增协作指南入口。
- Command Center 新增 `Collaboration` 类型和创意条目搜索。
- sitemap 增加 `/collaboration`。
- Lab 注册 `CollaborationGuide`。
- 新增 `CONTRIBUTING.md`。
- 新增 `.github/PULL_REQUEST_TEMPLATE.md`。
- 新增第九阶段调研、复盘和创意方向文档。

产品判断：

- 当前不做持久宠物或高强度特效。
- 优先推进 `Command Trace` 和 `Source Hover`，因为它们更符合程序员个人主页的技术气质。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：66 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：66 passed。
- Playwright 本地生产模式视觉复核：`/collaboration` 桌面 `scrollWidth 1440`、移动端无横向溢出。
- 截图：`/tmp/phase9-collaboration-desktop.png`、`/tmp/phase9-collaboration-mobile.png`。
- Production curl：`/collaboration` 包含 `Collaboration - Ray Studio`、`Command Trace`、`Source Hover` 和 `issues/new?template=contact.yml`。
- Vercel inspect：deployment 状态 `Ready`。
- Production alias 已指向本阶段部署。

外部同步：

- GitHub issue `#4` comment `4700751204`。
- GitHub issue `#5` comment `4700751288`。
- 飞书：[40｜第九阶段协作治理调研](https://scnlb1lk96sb.feishu.cn/wiki/EsfZw9eIIieatLkruPRcvM9jnXf)。
- 飞书：[41｜第九阶段协作治理复盘](https://scnlb1lk96sb.feishu.cn/wiki/NsDgwc0lsiEBBNkYnFtcdoHcnmf)。
- 飞书：[42｜创意方向与交互 Backlog](https://scnlb1lk96sb.feishu.cn/wiki/TXViwYd2TiDvA7kGqs5czJifnSg)。

## Unreleased - 第十阶段 Signature Interaction Prototype

日期：2026-06-14
Primary commit：`fffa2b9`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_BAvc9wkG9cRr9XbC3WzDWoyxCRrZ`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-dx2h0nnk6.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/BAvc9wkG9cRr9XbC3WzDWoyxCRrZ`

范围：

- 新增 `CommandTraceToast`。
- Command Center 内部路由导航后显示 `cmd.open("/route")`。
- Knowledge、Projects、Lab 新增真实 ref/source reveal。
- Lab 注册 `CommandTraceToast` 和 `SourceReveal`。
- 移除 `next/font/google` 构建期网络依赖。
- 修复 ESLint 测试产物目录忽略。
- 新增第十阶段调研与复盘文档。

产品判断：

- 当前站点需要真实的程序员风格 signature，而不是装饰型特效。
- `Command Trace` 和 `Source Hover` 是正确的第一批实验，因为它们提升导航确认、可检查性和长期维护性。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：68 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：68 passed。
- Playwright 本地生产模式视觉复核：桌面和移动端无横向溢出。
- stale trace：离开目标路由后清理。
- Vercel inspect：deployment 状态 `READY`。
- Production alias 已指向本阶段部署。

外部同步：

- GitHub issue `#4` comment `4701201385`。
- GitHub issue `#5` comment `4701203356`。
- 飞书：[43｜第十阶段 Signature Interaction 调研](https://scnlb1lk96sb.feishu.cn/wiki/DRRVwNzmoieq3TkBpgVcxJ2Pnhg)。
- 飞书：[44｜第十阶段 Signature Interaction 复盘](https://scnlb1lk96sb.feishu.cn/wiki/FTCPwMMMli8mMskzh3uctZjynGb)。

## Unreleased - 第十一阶段 Reading Focus Lens

日期：2026-06-14
Primary commit：`27c34f2`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_6yfkF68Y9W9CYkURgc4hcCe2XSxL`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-1bar07nc4.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/6yfkF68Y9W9CYkURgc4hcCe2XSxL`

范围：

- 博客详情页新增当前阅读小节追踪。
- 显示 `read.focus("section-id")`。
- 支持复制当前小节 URL。
- 当前 heading 和正文 hover 获得轻量阅读焦点反馈。
- Lab 注册 `ReadingFocusLens`。
- Command Center 可搜索 `reading focus`。
- 新增第十一阶段调研与复盘文档。

产品判断：

- 本站可以炫酷，但当前最适合的是可执行、可追踪、可引用的低噪音交互。
- 继续暂缓常驻宠物、全站粒子、假终端和大型图谱。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：4 passed。
- `npm run test:e2e`：90 passed。
- 本地生产模式视觉检查：`/blog` 桌面、`/blog` 移动端、中文博客移动端均无横向溢出。
- `npm run test:e2e`：72 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：72 passed。
- Playwright 视觉巡检：桌面和移动端文章页无横向溢出。
- Vercel inspect：deployment 状态 `READY`。
- Production alias 已指向本阶段部署。

外部同步：

- GitHub issue `#4` comment `4701358081`。
- GitHub issue `#5` comment `4701358538`。
- 飞书：[45｜第十一阶段 Reading Focus 调研](https://scnlb1lk96sb.feishu.cn/wiki/Xhp5w6OntinAWMkHtofcd9RVnAe)。
- 飞书：[46｜第十一阶段 Reading Focus 复盘](https://scnlb1lk96sb.feishu.cn/wiki/X6qRwjnsLi02JNkUT5Pc2S3CnUg)。

## Unreleased - 第十二阶段可追溯作品集层

日期：2026-06-14
Primary commit：`7de408a`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_CJNVnLikDaf6LjhsDSFDTNFXYkaD`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-m2ez8af5j.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/CJNVnLikDaf6LjhsDSFDTNFXYkaD`

范围：

- `SourceReveal` 升级为可点击 GitHub source link。
- Knowledge 新增 backlinks。
- 项目详情页新增 `Case Study Diff`。
- Lab 新增 `ComponentPreview`。
- 修复 Command Center 鼠标点击导航路径。
- 新增第十二阶段调研与复盘文档。

产品判断：

- 本阶段的“炫酷”来自真实可追溯链条，而不是装饰。
- 站点必须保证公开入口真实可达，不能出现只在端侧看得到、用户点不到的交互。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：6 passed。
- `npm run test:e2e`：78 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：78 passed。
- Playwright 视觉巡检：`/knowledge`、`/projects/lumen`、`/lab` 的桌面和移动端均无横向溢出。
- Vercel deployment：`dpl_CJNVnLikDaf6LjhsDSFDTNFXYkaD`。
- Vercel inspect：deployment 状态 `Ready`。
- Production alias 已指向本阶段部署。

GitHub 推送：

- HTTPS remote 推送出现网络层空响应/超时。
- SSH 认证可用。
- 已将 `origin` 切换为 `git@github.com:njueeRay/elegant-developer-studio.git`。
- 切换后已成功推送上一批提交。

外部同步：

- GitHub issue `#4` comment `4701510690`。
- GitHub issue `#5` comment `4701510805`。
- 飞书：[47｜第十二阶段可追溯作品集调研](https://scnlb1lk96sb.feishu.cn/wiki/D7rSwIo6jiGQFHkpuPWcmav2nuX)。
- 飞书：[48｜第十二阶段可追溯作品集复盘](https://scnlb1lk96sb.feishu.cn/wiki/OpBJwaM06i19GCkPAYzcbFB8nuc)。

## Unreleased - 第十三至第十六阶段 Navigation OS

日期：2026-06-14
Primary commit：`f2ea9fa`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_B4tu25Li2odMD2iz4J7gQKvkR8g4`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-pu7nr8w6g.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/B4tu25Li2odMD2iz4J7gQKvkR8g4`

范围：

- 统一全站 `SiteHeader`。
- 主导航公开 `Writing / Work / Knowledge / Uses / Lab / About`。
- 移动菜单公开主导航和二级入口。
- 首页 Studio Map 补齐 `Uses` 与 `About`。
- Project Case Study Diff 增加 evidence link。
- SourceReveal 支持行号。
- Lab ComponentPreview 增加 viewport switch。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：10 passed。
- `npm run test:e2e`：84 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：84 passed。
- Playwright 本地生产模式视觉检查：`/`、`/uses`、`/about`、`/lab`、`/collaboration` 桌面与移动端均无横向溢出。
- `/collaboration` 移动端标题宽度 362px，390px 视口内无横向溢出。

外部同步：

- 飞书：[49｜第十三至第十六阶段 Navigation OS 复盘](https://scnlb1lk96sb.feishu.cn/wiki/XKS9wKn5Diutm1kKly4cDBwsnJe)。
- 飞书导航首页已更新并验证包含 49 号节点。

## Unreleased - 第十七阶段中文内容试点

日期：2026-06-15
Primary commit：`01122c9`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_4DqXDZMd2S8RWhsHhU128ZKSPEkW`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-8ojizsxr6.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/4DqXDZMd2S8RWhsHhU128ZKSPEkW`

范围：

- 新增中文博客 `/blog/chinese-as-product-memory`。
- Knowledge 新增中文决策条目。
- Uses 新增中文复盘工作流。
- About 新增中文原则和协作约定。
- 新增第十七阶段全站复盘和下一阶段规划文档。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：`Chinese pilot content`，2 passed。
- `npm run test:e2e`：88 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：88 passed。
- 本地生产模式视觉检查：中文博客、Blog、Knowledge、Uses、About 的桌面与移动端均无横向溢出。

外部同步：

- 飞书：[50｜第十七阶段中文内容试点与全站复盘](https://scnlb1lk96sb.feishu.cn/wiki/OeZqwkMvFiiQYFkLvKLcQlmOnid)。
- 飞书导航首页已更新并验证包含 50 号节点。

## Unreleased - 第十八阶段博客系统化

日期：2026-06-15
Primary commit：`6a83294`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_AQK2jGhgSEULmsbYdAVDmqyNuzjc`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-krseoboo8.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/AQK2jGhgSEULmsbYdAVDmqyNuzjc`

范围：

- 博客文章 metadata 新增语言和写作意图。
- `/blog` 新增写作系统说明和语言筛选。
- `PostCard` 与文章详情页显示语言和写作意图。
- `FilterBar` 的测试 ID 生成支持中文按钮。
- `CommandTraceToast` 修复跨路由清理过早导致目标页反馈消失的问题。
- 新增第十八阶段博客系统化复盘文档。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：4 passed。
- `npm run test:e2e`：90 passed。
- 本地生产模式视觉检查：`/blog` 桌面、`/blog` 移动端、中文博客移动端均无横向溢出。
- Vercel inspect：deployment `Ready`。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，90 passed。

外部同步：

- 飞书：[51｜第十八阶段博客系统化复盘](https://scnlb1lk96sb.feishu.cn/wiki/UhnbwnuWYiH7lIkmkh4cU1qlnvd)。
- 飞书导航首页已更新并验证包含 51 号节点。

## Unreleased - 第十九阶段博客阅读路径增强

日期：2026-06-18
Primary commit：`d405cfe`
Deployment record commit：本记录所在提交
Vercel deployment：`dpl_A2uGZkzjiPA15xGy8AbrjAxp4uvd`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-hy7v9mlcu.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/A2uGZkzjiPA15xGy8AbrjAxp4uvd`

范围：

- 新增 impeccable `PRODUCT.md` 和 live config。
- 文章 metadata 新增 related posts、related knowledge、related projects。
- 新增 `RelatedReading` 组件。
- `/blog/[slug]` 接入 Essays、Knowledge、Projects 三条阅读路径。
- 移动端文章页增加底部安全留白，避免 fixed `ReadingFocusLens` 遮挡相关阅读。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：6 passed。
- `npm run test:e2e`：92 passed。
- 本地生产模式视觉检查：中文文章移动端、英文文章桌面均无横向溢出。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，92 passed。

外部同步：

- 飞书：[52｜第十九阶段博客阅读路径增强](https://scnlb1lk96sb.feishu.cn/wiki/S0KHwktcKiC1VIkIqkdcE6J6nhm)。
- 飞书导航首页已更新并验证包含 52 号节点。

## Unreleased - 第二十阶段 Knowledge 详情层

日期：2026-06-18
Primary commit：`c4e0e23`
Deployment record commit：`022df12`
Vercel deployment：`dpl_BQbxSsRHDMh3uCP9TZjX6acTR5vF`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-kr44h847o.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/BQbxSsRHDMh3uCP9TZjX6acTR5vF`

范围：

- 新增 `/knowledge/[slug]` 静态详情页。
- 新增 `KnowledgeTrails`。
- `KnowledgeEntry` 新增 `relatedPostSlugs` 和 `relatedProjectSlugs`。
- Blog `RelatedReading` 的 Knowledge 链接从 hash 锚点升级为详情页。
- `KnowledgeCard` 增加 `Open detail`，`Copy ref` 复制详情页 URL。
- Command Center 的 Knowledge 结果指向详情页。
- `sitemap.xml` 包含 Knowledge 详情路由。
- 首页站内链接改用 Next `Link`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：14 passed。
- `npm run test:e2e`：98 passed。
- 本地生产模式视觉检查：Knowledge 详情页桌面和移动端无横向溢出。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，98 passed。

外部同步：

- 飞书：[53｜第二十阶段 Knowledge 详情层](https://scnlb1lk96sb.feishu.cn/wiki/U0XWwA1enitT6Sk6bm8cXpphnbb)。

## Unreleased - 第二十一阶段 URL Query 筛选与关系校验

日期：2026-06-18
Primary commit：`bc4f1fe`
Deployment record commit：`0cc1326`
Vercel deployment：`dpl_Ba29BZBkotJogLaaAFL8eTL37Hbs`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-iwkpljhgs.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/Ba29BZBkotJogLaaAFL8eTL37Hbs`

范围：

- 新增 `useQueryFilter`。
- `/blog` 支持 `tag` 与 `language` query。
- `/projects` 支持 `stack` query。
- `/knowledge` 支持 `kind` query。
- Blog / Projects / Knowledge Explorer 增加 Suspense 边界。
- 新增 `scripts/validate-content-relations.mjs`。
- 新增 `npm run validate:content`。
- e2e 覆盖 query URL 直达、筛选写 URL 和 Knowledge 详情返回保留 query。

验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：8 passed。
- `npm run test:e2e`：102 passed。
- 本地生产模式渲染检查：Blog query 桌面和 Knowledge query 移动端均无横向溢出，console 无相关错误。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，102 passed。

外部同步：

- 飞书：[54｜第二十一阶段 URL Query 筛选与关系校验](https://scnlb1lk96sb.feishu.cn/wiki/URFOwJV9bi2GVJkNNxTcNkMfnbc)。

## Unreleased - 第二十二阶段 URL IA 与命令快捷入口

日期：2026-06-18
Primary commit：`43d6ffb`
Vercel deployment：`dpl_5EXf8SBZL1F6dF7zaSpLoxNRTDi8`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-exx94q177.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/5EXf8SBZL1F6dF7zaSpLoxNRTDi8`

范围：

- `INFORMATION_ARCHITECTURE.md` 新增 URL Query 约定。
- Command Center 新增精选 query 快捷入口：中文写作、Product Systems、Decision knowledge、GitHub-backed projects。
- `KnowledgeEntry` 新增 `protects` 和 `citation`。
- `/knowledge/[slug]` 使用每条知识自己的 `protects` 和 `citation`。
- `validate:content` 增加 Knowledge 正文完整性校验。
- 修复 query 命令导航后 `CommandTraceToast` 不显示的问题。
- e2e 覆盖 Command Center 打开 query-backed content views。

产品判断：

- query 是公开产品状态，不是组件内部状态。
- Command Center 只放高价值 query 入口，不复制整套筛选器。
- Knowledge 详情页必须能被引用；没有正文的详情页只是路由层面的形式主义。

验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：6 passed。
- `npm run test:e2e`：104 passed。
- 本地生产模式视觉检查：Command Center query 入口桌面、Blog query 桌面、Knowledge 详情移动端均无横向溢出，console 无相关错误。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，104 passed。

外部同步：

- 飞书：[55｜第二十二阶段 URL IA 与命令快捷入口](https://scnlb1lk96sb.feishu.cn/wiki/GwHwwdiFeiEb3lkbHDXcs2Mgnbc)。

## Unreleased - 第二十三阶段内容证据密度增强

日期：2026-07-01
Primary commit：`019a5c3`
Vercel deployment：`dpl_3SdSD4vTLuXUrQARLXpK9aUS5ZXx`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-h0ppnsud6.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/3SdSD4vTLuXUrQARLXpK9aUS5ZXx`

范围：

- `ProjectMeta` 新增 `evidencePack`。
- Lumen 和 Studio Knowledge Base 补齐结构化 Evidence Pack。
- `/projects/[slug]` 新增 Evidence Pack 区块。
- `validate:content` 增加 Project Evidence Pack 完整性校验。
- `KnowledgeCard` 的 `Copy ref` 改为复制 Markdown link。
- e2e 覆盖项目证据包、证据链接和 Knowledge Markdown ref。

产品判断：

- `Case Study Diff` 负责解释变化，`Evidence Pack` 负责提供可检查证据。
- Knowledge 引用必须服务飞书、GitHub issue、PR 和路线图评论，而不是只复制裸 URL。

验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：4 passed。
- `npm run test:e2e`：104 passed。
- Browser QA：`/projects/lumen#project-evidence-title` 桌面与 390px 移动端均无横向溢出，Evidence Pack 可见，console 无相关 warning/error。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，104 passed。

外部同步：

- 飞书：[56｜第二十三阶段 内容证据密度增强](https://scnlb1lk96sb.feishu.cn/wiki/Gz6RwlWCliND0bkV5Z1cLfk0n1d)。

## Unreleased - 第二十四点五阶段 Personal OS Zoo

日期：2026-07-02
Primary commit：`03f2cac`
Vercel deployment：`dpl_AFdKdXk3heycQR32WWMBBffzrSMe`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-4pimef4a2.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/AFdKdXk3heycQR32WWMBBffzrSMe`

范围：

- 新增 `src/data/personal-os.ts`。
- 新增 `PersonalOsZoo` 并挂载到 `/lab`。
- `StatusPanel` 升级为 `Studio Pulse`，增加 source-backed pulse 和 guided prompt。
- Lab 注册 `PersonalOsZoo`。
- e2e 覆盖首页 Studio Pulse、Ask Me Terminal 和 Lab Personal OS Zoo。

产品判断：

- 迁移 `ursb.me` 的对象模型和生命迹象，不迁移其高密度卡片规模。
- Personal OS 扩展先进入 Lab 校准，再进入首页。

验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：4 passed。
- `npm run test:e2e`：108 passed。
- Playwright 本地生产模式视觉检查：`/` 和 `/lab#personal-os-zoo-title` 的桌面与移动端均无页面级横向溢出，console 无相关 warning/error。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，108 passed。

外部同步：

- 飞书：[57｜第二十四点五阶段 Personal OS Zoo](https://scnlb1lk96sb.feishu.cn/wiki/KJu3wcx4tiuoYBk6GuPcZRDFnLd)。

## Server Deployment Attempt - raynode.me

日期：2026-07-03
Server target：`raynode.me` / `47.81.38.236`
Prepared commit：`6278958`
Server status：阻塞，远端 SSH banner、HTTP response 和 HTTPS handshake 均超时。

范围：

- 根据 `/Users/ray/Data/Project/Github/Workshop/raynode-elegant-developer-studio-handoff.md` 启动服务器部署。
- 远端 clone 到 `/srv/apps/elegant-developer-studio`。
- 远端 `npm ci` 完成，`npm run validate:content` 通过。
- 远端 `npm run build` 长时间卡在 Next.js production build。
- 本地启用 Next.js standalone output，提交并推送 `6278958 chore: enable standalone server output`。
- 本地生成 `/tmp/elegant-developer-studio-standalone.tgz`，用于恢复后直接上传运行。

验证：

- `47.81.38.236:22` TCP 端口可连接，但 SSH 不返回 banner。
- `http://raynode.me` 连接后无响应，HTTP code `000`。
- `https://raynode.me` SSL 握手超时。
- 本机无可用阿里云 CLI 或凭证，无法从云 API 侧强制重启。

结论：

- 当前不能宣称服务器部署完成。
- 下一步需要先通过阿里云控制台重启实例，或等待远端用户态恢复。
- 恢复后必须使用本地 standalone artifact 部署，不再在服务器上执行 `npm run build`。

## Unreleased - 第二十五阶段 Truth Source & Public Trust

日期：2026-07-03
Primary commit：`cb968a4`
Production host：`https://raynode.me`
Preview / fallback：`https://elegant-developer-studio.vercel.app`
Deployment target：RayNode `/srv/apps/elegant-developer-studio-runtime`

范围：

- 将 Claude Code 审计转化为 `docs/AUDIT_ACTION_TODO_2026_07_03.md`。
- 新增 `docs/CURRENT_CONTEXT.md`。
- 归档历史 phase research/review 文档到 `docs/archive/phase-history/`。
- 统一 `SITE_URL`、canonical、Open Graph、Twitter card、sitemap、robots 和 RSS。
- 将 RayNode 设为默认主站，Vercel 设为 preview / fallback。
- 修复首页假状态、过期 Lab 文案、旧 Vercel evidence 和硬编码 e2e 数字。
- 新增 release evidence 事实源雏形和 content validation 防线。
- 新增 GitHub Actions 最小质量门禁。
- 增加 Command Center 与 Photo lightbox modal focus trap / focus restore。
- 新增 6 篇文章、1 个非本站项目 case study、4 条 Knowledge。
- 首页首屏减法：Read / Work 成为主入口，Command Center 降为辅助入口。

验证：

- `npm ci`：通过。
- `npm run validate:content`：通过，10 posts / 3 projects / 10 knowledge entries。
- `npm run lint`：通过。
- `npm run build`：通过，40 routes。
- targeted e2e：4 passed。
- 本地完整 e2e：140 passed。
- RayNode deploy：源码与 runtime 均对应 `cb968a4`。
- `https://raynode.me/`：200。
- `https://www.raynode.me/`：200。
- `robots.txt` 指向 `https://raynode.me/sitemap.xml`。
- `sitemap.xml` 和 `rss.xml` 均输出 RayNode URL。
- Production smoke e2e：37 passed。

残余风险：

- npm audit 仍有 2 个 moderate vulnerabilities；未执行 `npm audit fix --force`。
- 当前 Command Center index 仍在 root layout 组装；触发阈值为 posts > 15 或 knowledge entries > 25。
- 飞书尚待同步本阶段结果。

## Unreleased - 第二十六阶段 External Proof & Content Network

日期：2026-07-04
Primary implementation commit：`7ef4a2d`
RayNode deployed source commit：`9143bc0`
Production host：`https://raynode.me`
Preview / fallback：`https://elegant-developer-studio.vercel.app`

范围：

- 新增外部项目 `OpenProfile Agent Workflow`。
- 新增产品拆解项目 `AnyReader Interface Teardown`。
- 新增 4 篇非本站中心文章。
- 新增 6 条 Knowledge。
- 首页精选写作和精选作品转向外部证据。
- e2e 增加 Phase 26 外部证据网络检查。

验证：

- `curl -I -L https://github.com/njueeRay/OpenProfile`：200。
- `curl -I -L https://github.com/TeaFishMeow/any-reader-ui`：200。
- `curl -I -L https://app.exnju.top`：200。
- `npm run validate:content`：通过，14 posts / 5 projects / 16 knowledge entries。
- `npm run lint`：通过。
- `npm run build`：通过，52 routes。
- targeted e2e：2 passed。
- `npm run test:e2e -- --workers=1`：166 passed。
- RayNode systemd：active。
- `https://raynode.me/`：200。
- `https://raynode.me/projects/openprofile-agent-workflow`：200。
- `https://raynode.me/projects/anyreader-interface-teardown`：200。
- Production smoke e2e：48 passed。

残余风险：

- Posts 已到 14，接近 Phase 28 的 command index 规模触发线 posts > 15。
- Evidence Pack 仍是手写事实源；下一阶段应进入 Phase 27 自动化 release evidence。
- 当前手动部署流程仍有打包细节债；已验证后续应使用 `tar --no-xattrs` 消除 macOS provenance xattr 解包噪音。

## Unreleased - 第二十七阶段 Evidence Automation & Release Discipline

日期：2026-07-04
Primary implementation commit：`9e454a2`
Production host：`https://raynode.me`
Release evidence：`/release-evidence.json`
Deployed source commit：`d59bdaf`

范围：

- 新增 release evidence 生成脚本。
- 新增 release evidence 校验脚本。
- 新增 RayNode standalone 部署脚本。
- Lumen / Studio Knowledge Base 项目页渐进读取生成证据。
- CI 增加 release evidence 生成与校验。
- 内容校验拦截旧 Vercel deployment id 和临时 deployment URL。

验证：

- `npm run release:evidence -- --local-quality-passed`：通过。
- `npm run validate:release-evidence`：通过。
- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run deploy:raynode -- --dry-run --skip-quality`：通过。
- targeted e2e：4 passed。
- full local gate：`npm run release:evidence -- --local-quality-passed && npm run validate:release-evidence && npm run validate:content && npm run lint && npm run build && npm run test:e2e -- --workers=1`：170 passed。
- RayNode scripted deploy：通过，远端源码为 `d59bdaf`，service active。
- production targeted smoke：2 passed。
- production public route smoke：46 passed。
- `https://raynode.me/release-evidence.json`：commit `d59bdaf`，14 posts / 5 projects / 16 knowledge entries / 50 public routes。

残余风险：

- `public/release-evidence.json` 是部署产物，不提交进 Git；新 agent 必须知道先运行 `npm run release:evidence` 或 `npm run deploy:raynode`。
- Production smoke 已覆盖公开路由可访问性；仍未把 production Playwright 全量回归接入 CI。

## Unreleased - 第二十八阶段 Content Discovery & Command Index Scale

日期：2026-07-04
Primary implementation commit：`a3f5f78`
Production host：`https://raynode.me`
Command index：`/command-index.json`
Release evidence：`/release-evidence.json`
Deployed source commit：`304c090`

范围：

- 将 Command Center 索引构建器从 root layout 拆到 `src/lib/command-index.ts`。
- 新增 `/command-index.json`，作为 Command Center 按需加载 payload。
- `GlobalCommandMenu` 增加 loading、error、retry 状态。
- 搜索排序增加 External proof、Writing、Projects、Knowledge 的 top-level intent boost。
- 新增 `scripts/report-command-index.mjs` 和 `npm run report:command-index`。
- release evidence、content validation 和 e2e 纳入 `/command-index.json`。

测量：

- command items：110。
- estimated JSON：35,413 bytes。
- estimated gzip：10,413 bytes。
- keyword bytes：6,735 bytes。
- first screen carries command index：false。

验证：

- `npm run report:command-index`：通过。
- `npm run validate:content`：通过。
- `npm run release:evidence -- --local-quality-passed`：通过。
- `npm run validate:release-evidence`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- targeted e2e：8 passed。
- full e2e：178 passed。
- RayNode scripted deploy：通过，远端源码为 `304c090`，service active。
- production targeted smoke：6 passed。
- production public route smoke：47 passed。
- `https://raynode.me/command-index.json`：110 items。
- `https://raynode.me/release-evidence.json`：commit `304c090`，14 posts / 5 projects / 16 knowledge entries / 51 public routes。

残余风险：

- `/command-index.json` 当前是全量 JSON；当 items > 120 或 gzip payload 明显增长时，应评估 `/api/command-index` 或服务端搜索。
- Production smoke 已覆盖 command index、release evidence、Command Center 懒加载和公开路由可访问性。

## Released - 第二十九阶段 Reading & Knowledge Quality Layer

日期：2026-07-04
Primary implementation commit：`0f7fa20`
Deployment record commit：`94e3b0b`
Deployed source commit：`f0ff534`
Production host：`https://raynode.me`

范围：

- 新增 writing tracks 和受控 intent 事实源：`src/data/writing.ts`。
- `/blog` 新增 writing tracks 面板和 `track` query 筛选。
- 文章卡显示 writing track / intent。
- 文章详情页新增 `Reading quality context`。
- 中文文章显示引用场景，英文文章显示技术语境。
- `RelatedReading` 增加路径理由和基于 track/language 的排序。
- `validate:content` 增加文章 intent、language、citation guide、related trails 和 writing track 覆盖校验。

验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- targeted e2e：6 passed。
- full e2e：180 passed。
- RayNode scripted deploy：通过，远端源码为 `f0ff534`，service active。
- production targeted smoke：3 passed。
- production public route smoke：47 passed。
- `https://raynode.me/release-evidence.json`：commit `f0ff534`，14 posts / 5 projects / 16 knowledge entries / 51 public routes。

残余风险：

- Writing tracks 当前是人工维护的编辑模型；后续新增内容必须由 `validate:content` 保护。
- Knowledge kind 暂不扩展；Phase 30 如新增运维 runbook，再评估是否引入 `Runbook`。

## Released - 第三十阶段 RayNode Operations Hardening

日期：2026-07-04
Primary implementation commit：`87e185c`
Deployment record commit：`344f76f`
Deployed source commit：`fee8825`
Production host：`https://raynode.me`

范围：

- 新增 `/health.json` 公开轻量健康端点。
- 新增 `scripts/verify-raynode.mjs`。
- 新增 `npm run raynode:health`、`npm run raynode:health:full`、`npm run raynode:smoke`。
- release evidence、content validation、public route e2e 和 deploy smoke 纳入 `/health.json`。
- 新增 RayNode runbook、systemd 模板和 Caddy 模板。

验证：

- `npm run validate:content`：通过。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：8 passed。
- full e2e：182 passed。
- RayNode scripted deploy：通过，远端源码为 `fee8825`，service active。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- `https://raynode.me/health.json`：`status: ok`。
- `https://raynode.me/release-evidence.json`：commit `fee8825`，14 posts / 5 projects / 16 knowledge entries / 52 public routes。

残余风险：

- `/health.json` 是应用层健康，不替代外部 uptime 监控。
- GitHub Actions SSH 自动部署暂缓；后续如启用，必须先设计 key scope、manual approval 和 rollback policy。

## Released - 第三十一阶段 Visual System Polish Without Adding Surfaces

日期：2026-07-04
Primary implementation commit：`def8dbd`
Deployment record commit：`4723965`
Deployed source commit：`f86b134`
Production host：`https://raynode.me`

范围：

- 首页 RayNode 状态 badge 从长句改为主状态和工程细节两层。
- `/blog/[slug]` 与 `/knowledge/[slug]` 进入 reading cursor surface，关闭全站 AmbientCursorField 光场。
- reading surface 下弱化 `reader-spotlight`，避免与 Reading Focus Lens 争夺注意力。
- Command Center 移动端尺寸、结果区高度、footer 和 placeholder 完成一轮可用性打磨。
- e2e 增加阅读页 cursor surface 与移动端 Command Center viewport 边界检查。

验证：

- `npm run lint`：通过。
- `npm run validate:content`：通过。
- `npm run report:command-index`：通过，110 items，estimated gzip 10,413 bytes，first screen carries index: no。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- targeted e2e：5 passed。
- `npm run build`：通过，53 routes。
- full e2e：184 passed。
- 本地 Playwright 视觉 QA：移动首页、移动 Command Center、移动中文文章详情均无横向溢出；Command Center dialog 位于 viewport 内。
- `npm run deploy:raynode`：通过，远端源码为 `f86b134`，service active。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production targeted interaction tests：2 passed。
- `https://raynode.me/release-evidence.json`：commit `f86b134`，14 posts / 5 projects / 16 knowledge entries / 52 public routes。

残余风险：

- 本阶段尚未做平板宽度视觉 QA。
- Studio Pulse 密度未在本阶段重排，留给 Phase 32。

## Released - 第三十二阶段 Content Density & Studio Pulse Restraint

日期：2026-07-04
Primary implementation commit：`018bab2`
Deployment record commit：`71e1623`
Deployed source commit：`b767bd9`
Production host：`https://raynode.me`

范围：

- Studio Pulse 从桌面 4 列窄卡改为 2 列紧凑摘要，平板 2 列，手机 1 列。
- 状态卡压缩 icon、padding、装饰圆、摘要行数和 badge 占位，降低首页中段密度。
- 移除重复 standalone command 文本，保留 compact `DataSourceBadge` command chip。
- `DataSourceBadge` 增加 `title`，视觉压缩后仍保留 source / route / command / verifiedAt。
- Ask Me Terminal prompt row 支持横向滚动，Ask Me response 文案缩短。
- `CodeBlock` 复制反馈改为点击时从 DOM 读取代码，并在剪贴板失败时显示 `Copy failed`。
- e2e 拆分多页面串联巡检，Phase 25/26 public assets、source reveal、移动无溢出变为单页契约。

验证：

- `npm run validate:content`：通过。
- `npm run report:command-index`：通过，110 items，estimated gzip 10,413 bytes，first screen carries index: no。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- targeted e2e：20 passed。
- `chromium` 主矩阵：107/107 passed。
- `mobile-chrome` 主矩阵：107/107 passed。
- `npm run deploy:raynode`：通过，远端源码为 `b767bd9`，service active。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production targeted interaction tests：4 passed。
- `https://raynode.me/release-evidence.json`：commit `b767bd9`，14 posts / 5 projects / 16 knowledge entries / 52 public routes。

残余风险：

- 未分片长跑在本机曾触发浏览器资源异常；后续应把本地质量门禁固化为 project/shard 执行。
- MDX 静态导入在 dev server 首次渲染中仍可能有长尾，需要 Phase 33 观察和治理。

## Released - 第三十三阶段 Content Performance & Test Sharding Discipline

日期：2026-07-06
Primary implementation commit：`de27bd5`
Deployment record commit：`513d583`
Deployed source commit：`28559a4`
Production host：`https://raynode.me`

范围：

- 新增 `test:e2e:chromium`、`test:e2e:mobile`、`test:e2e:local`。
- 新增 `test:e2e:smoke`，CI smoke 复用项目脚本。
- 新增 `scripts/measure-route-timing.mjs`。
- 新增 `perf:routes` 和 `perf:routes:raynode`。
- README 补齐质量门禁、分片 e2e 和 route timing 命令。
- GitHub Actions Chromium smoke step 改为 `npm run test:e2e:smoke`。

验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- `npm run report:command-index`：通过，110 items，estimated gzip 10,413 bytes。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run test:e2e:smoke`：50 passed。
- `npm run test:e2e:chromium`：107 passed。
- `npm run test:e2e:mobile`：107 passed。
- `npm run perf:routes`：10 routes，p95 625ms，max 625ms，0 slow，0 failed。
- `npm run perf:routes:raynode`：52 routes，p95 817ms，max 1189ms，0 slow，0 failed。
- Browser rendered check：home page identity、console health、Command Center search `lab` results passed；Browser DOM snapshot blocked by current `incrementalAriaSnapshot` runtime issue.
- `npm run deploy:raynode`：通过，远端源码为 `28559a4`，service active。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production `npm run perf:routes:raynode`：52 routes，p95 798ms，max 917ms，0 slow，0 failed。
- `https://raynode.me/release-evidence.json`：commit `28559a4`，52 public routes。

残余风险：

- 桌面 dev 分片中 `/projects/anyreader-interface-teardown` 曾出现 29.3s 长尾，但移动分片和生产 route timing 未复现。
- Phase 34 应先做重复 timing 诊断，不直接重构内容加载层。

## Released - 第三十四阶段 Intent-Routed Content Quality Polish

日期：2026-07-08
Primary implementation commit：`1e94875`
Deployment record commit：`c3a30e4`
Deployed source commit：`1e94875`
Production host：`https://raynode.me`

范围：

- 使用本地 `ai-collaboration-prompts` skill 的 `expert-intent-reconstruction.md` 与 `document-cocreation-protocol.md`。
- `LabComponent` 新增 `readerValue` 和 `nextUse`。
- `/lab` 预览卡展示 `Visitor value`，详情面板展示 `next.use`。
- Lab 列表行和 Command Center Lab 结果改用 visitor-facing value。
- `ComponentPreview` trace 模式新增 `Next use`。
- 博客详情页 `Reading quality context` 新增 writing track promise。
- 博客详情页引用面板显示当前文章级 `read.use("slug")`。
- e2e 覆盖 Lab visitor value / next-use 和博客 read.use / promise。

验证：

- `npm run validate:content`：通过。
- `npm run report:command-index`：通过，110 items，estimated gzip 10,436 bytes。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- targeted e2e：10 passed，覆盖 Lab visitor value / next-use、博客 read.use / promise、移动无溢出和 Command Center Lab 路径。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run test:e2e:smoke`：50 passed。
- `npm run perf:routes`：10 routes，p95 524ms，max 524ms，0 slow，0 failed。
- `npm run test:e2e:chromium`：107 passed。
- `npm run test:e2e:mobile`：107 passed。
- Browser rendered check：`/lab`、`/blog/agent-handoff-loop`、Command Center 搜索 `visitor value` 均正常，console error/warn 0。
- 390px 移动端 `/lab` 和 `/blog/agent-handoff-loop` 无横向溢出。
- `npm run deploy:raynode`：通过，远端源码与运行产物均为 `1e94875`。
- `npm run raynode:health`：18/18 passed，commit `1e94875`。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production `npm run perf:routes:raynode`：52 routes，p95 878ms，max 1357ms，0 slow，0 failed。
- Production fetch：`/lab` 包含 `Visitor value` 和 `next.use`；`/blog/agent-handoff-loop` 包含 `read.use`；`/command-index.json` 包含 Lab visitor value 与 next-use 关键词。

残余风险：

- 本阶段没有重写文章正文，优先修读后用途和 Lab 组件语义；后续仍需要继续增加外部证据型内容。
- Dev Route Long-Tail Diagnosis 顺延为 Phase 35。

## Unreleased - 第三十五阶段 Dev Route Long-Tail Diagnosis

日期：2026-07-08
Primary implementation commit：待记录
Deployment record commit：待记录
Deployed source commit：待记录
Production host：`https://raynode.me`

范围：

- 新增 `scripts/diagnose-route-long-tail.mjs`。
- 新增 `npm run perf:routes:long-tail`。
- 新增 `npm run perf:routes:long-tail:raynode`。
- 支持默认重点 detail routes、release detail routes、显式 `--routes=`、轮次、延迟、阈值和 fail-on-slow。
- README、项目地图、审计 TODO、进度日志和当前上下文记录 Phase 35 判断。

验证：

- `npm run lint`：通过。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run perf:routes:long-tail`：10 routes，6 rounds，60 samples，p95 126ms，max 870ms，0 slow，0 failed。
- `ROUTE_LONG_TAIL_ROUNDS=3 npm run perf:routes:long-tail -- --release-routes`：35 routes，105 samples，p95 146ms，max 235ms，0 slow，0 failed。
- `ROUTE_LONG_TAIL_ROUNDS=2 npm run perf:routes:long-tail:raynode`：35 routes，70 samples，p95 354ms，max 1351ms，0 slow，0 failed。

结论：

- AnyReader 项目详情没有稳定长尾；本轮本地默认诊断首轮 870ms，warm max 61ms。
- 生产最大样本 `/blog/agent-handoff-loop` 为 1351ms，第二轮 276ms，低于 3000ms 阈值。
- 当前不应重构 `src/lib/content.ts`、MDX 静态导入或内容注册表。

残余风险：

- 诊断脚本使用 HTTP fetch，不覆盖浏览器 hydration 和客户端交互耗时；UI 行为仍由 Playwright 分片负责。
- 如果未来 `--fail-on-slow` 稳定失败，再进入内容加载架构重审。

## Unreleased - 第二十四阶段项目证据对象升级

日期：2026-07-02
Primary commit：`f2f7774`
Deployment record commit：待记录
Vercel deployment：`dpl_Cyu6PVJdcqehP5xCLGQYComca8au`
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：`https://elegant-developer-studio-439dz7q0z.vercel.app`
Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/Cyu6PVJdcqehP5xCLGQYComca8au`

范围：

- `ProjectMeta.evidencePack` 从轻量链接升级为 typed evidence object。
- 项目详情页 Evidence Pack 显示 source、deployment、document、test、screenshot、metric 等证据类型。
- `DataSourceBadge` 从 Personal OS Zoo 迁移到真实内容详情页。
- Knowledge 详情页增加 Markdown ref 复制。
- `validate:content` 增加证据对象完整性校验。
- 新增 `AmbientCursorField`、source glow、command echo、reading signal 和 Personal OS pulse 微交互。
- 新增显式 viewport 配置，修复移动端 viewport 失真。

产品判断：

- 第二十四阶段必须补齐第二十三阶段留下的证据硬度，而不是继续增加页面数量。
- 证据对象要提高可信度，但不能制造 dashboard 感。
- 当前阶段以本地文档和代码可追溯为主，完成后再同步飞书。

验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：10 passed。
- `npm run test:e2e -- --workers=1`：112 passed。
- 额外验证：命令入口在 hydration 前 disabled，避免首页和 Lab 的 Command Center 触发器出现早点击无反馈。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，112 passed。
