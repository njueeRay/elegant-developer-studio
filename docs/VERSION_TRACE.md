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
Primary commit：待提交
Deployment record commit：待提交
Vercel deployment：待部署
Production alias：`https://elegant-developer-studio.vercel.app`
Deployment URL：待部署
Inspect URL：待部署

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
- Playwright 本地生产模式视觉复核：桌面和移动端无横向溢出。
- stale trace：离开目标路由后清理。

外部同步：

- GitHub issue：待同步。
- 飞书：待同步。
