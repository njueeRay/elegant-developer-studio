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

### 第四阶段：键盘与搜索增强切片

状态：已部署。

完成：

- Command Center 支持 `ArrowDown` / `ArrowUp` 移动 active result。
- Command Center 支持 `Home` / `End` 移动到首尾结果。
- Command Center 支持 `Enter` 打开 active result。
- 输入框增加 `aria-activedescendant`，结果使用 `role="listbox"` / `role="option"`。
- 无查询时展示 `Recent`、`Quick actions`、`Writing`、`Projects` 分组。
- 搜索结果按类型分组。
- 打开结果后记录最近访问。
- 标题和描述中的可见命中词高亮。
- 底部增加低调键盘提示。
- `<html>` 增加 `data-scroll-behavior="smooth"`，消除 Next.js smooth-scroll 警告。
- 添加 `docs/PHASE4_REVIEW.md` 和 `docs/PHASE4_KEYBOARD_RESEARCH.md`。

调研依据：

- Raycast：统一入口必须快速、可靠、keyboard first。
- VS Code Command Palette：命令面板可以统一命令、文件、符号和常用动作。
- WAI-ARIA Combobox Pattern：输入保持焦点，方向键移动 active option，`Enter` 接受选项，`Escape` 关闭。
- Apple HIG：键盘快捷键需要映射到清晰命令，并保持可预测焦点和退出路径。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器验证：文章页 `Cmd K` 可打开全站菜单。
- 浏览器验证：初始 active result 为 `Open studio home`。
- 浏览器验证：`ArrowDown` 后 active result 变为 `Browse writing`。
- 浏览器验证：输入 `music` 后出现 `Music` 分组和 `Play studio mix`。
- 浏览器验证：输入 `studio` 后出现命中高亮。
- 浏览器验证：`Enter` 跳转 `/music`。
- 浏览器验证：再次打开 Command Center 后出现 `Recent` 分组。
- 桌面 1280px：无横向溢出。
- 移动端 390 x 844：Command Center 在视口内，且无横向溢出。
- Vercel production：`https://elegant-developer-studio.vercel.app`
- Deployment URL：`https://elegant-developer-studio-9wopzkbv8.vercel.app`
- Production fetch：`/blog/interface-is-a-promise` 返回 `200`，页面数据包含 `data-scroll-behavior="smooth"` 和全站 `GlobalCommandMenu`。

### 第四阶段：上下文搜索与空状态恢复切片

状态：已部署。

复盘：

- 上一个键盘增强切片已经让 Command Center 具备基础效率。
- 仍缺少当前页面上下文意识。
- 搜索 `knowledge`、`lab`、`uses`、`about` 这类规划页面时，需要解释路线图状态。
- 无结果状态不能是死胡同，必须提供可执行建议。

调研依据：

- Raycast：命令入口应快速、可靠，并支持用户以别名或短语表达意图。
- Algolia Query Suggestions：建议词能减少输入成本并降低无结果概率。
- NN/g：空状态要说明系统状态、提供学习线索和直接路径。
- Carbon：empty state 是产品状态的一部分，不是临时文案。

完成：

- `GlobalCommandMenu` 增加当前路径感知。
- `/blog`、`/projects`、`/photos`、`/music` 默认提升对应上下文。
- 查询评分增加 context boost。
- 搜索 `knowledge` 时保留真实项目结果，同时显示 `Knowledge is planned`。
- 搜索 `uses` 等无结果词时显示规划说明和建议词。
- 建议词支持点击恢复查询。
- 无 option 时结果容器不再声明 `role="listbox"`。
- 修复最近访问吞掉当前页面上下文的问题。
- 添加 `docs/PHASE4_KEYBOARD_REVIEW.md` 和 `docs/PHASE4_CONTEXT_RESEARCH.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 浏览器验证：文章页 `Cmd K` 后出现 `Writing context`。
- 浏览器验证：搜索 `knowledge` 显示 `Knowledge is planned` 与真实项目结果。
- 浏览器验证：搜索 `uses` 显示 `Uses is planned` 和建议词。
- 浏览器验证：点击 `writing` 建议词后恢复结果列表。
- 移动端 390 x 844：`/music` 默认出现 `Music context`，无横向溢出。
- 追加修复：`CodeBlock` 行数从真实 `<pre>` DOM 读取，消除服务端 5 行、客户端 0 行的 hydration mismatch。
- 追加浏览器验证：文章页代码块显示 `5 lines`，控制台 warn/error 为空。

部署：

- Production alias：`https://elegant-developer-studio.vercel.app`
- Context deployment URL：`https://elegant-developer-studio-n49bqn9bo.vercel.app`
- Context deployment：`dpl_Fn8nL7aj37UiEsbu7Yvzq4LPD8dT`
- Final hotfix deployment URL：`https://elegant-developer-studio-eta61h964.vercel.app`
- Final hotfix deployment：`dpl_4EwLqMkgPKgDqiVcU26ipnbKDFd1`
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/4EwLqMkgPKgDqiVcU26ipnbKDFd1`
- Production fetch：`/blog/interface-is-a-promise` 返回 `200`，页面数据包含 `data-scroll-behavior="smooth"` 和全站 `GlobalCommandMenu`。

下一步：

- 进入 `StatusPanel` 和 `FilterBar` 切片。

### 第四阶段：状态面板与筛选切片

状态：已部署。

复盘：

- 上一个上下文搜索切片已经让 Command Center 理解当前页面。
- 仍缺少首页当前状态表达，以及内容列表筛选反馈。
- 下一步不应继续堆搜索功能，而应把状态和筛选沉淀成可复用组件。

调研依据：

- Raycast：常用入口应快速、可靠，并映射到真实动作。
- Linear：筛选需要轻量、可扫读、可恢复。
- GitHub Issues：标签和状态筛选需要长期可追踪。
- Carbon：状态和标签必须有清晰语义，而不是只靠颜色。

完成：

- 新增 `src/components/status-panel.tsx`。
- 首页接入 `StatusPanel`：最近在写、最近在做、最近在听。
- 新增 `src/components/content/filter-bar.tsx`。
- `/blog` 和 `/projects` 接入新版 `FilterBar`。
- 筛选条增加结果数量、active 状态和显性清除动作。
- 增加筛选空状态。
- 添加 `docs/PHASE4_CONTEXT_REVIEW.md` 和 `docs/PHASE4_STATUS_FILTER_RESEARCH.md`。
- 更新项目地图、路线图、设计系统和 QA 文档。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser 验证：首页存在 3 张状态卡，分别链接文章、项目、音乐。
- Browser 验证：博客点击 `Interaction` 后显示 `1 / 3 essays`，清除后恢复 `3 / 3 essays`。
- Browser 验证：项目点击 `React` 后显示 `1 / 2 projects`。
- Browser 验证：桌面与移动端均无页面级横向溢出。
- 本地 Playwright 生成截图：
  - `output/phase4-status-filter/status-panel.png`
  - `output/phase4-status-filter/blog-filter.png`
  - `output/phase4-status-filter/mobile-home.png`

下一步：

部署：

- Production alias：`https://elegant-developer-studio.vercel.app`
- Deployment URL：`https://elegant-developer-studio-2lkoc4zhl.vercel.app`
- Deployment：`dpl_49mRxU3AwqpJZQViZHqicg5D1mD8`
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/49mRxU3AwqpJZQViZHqicg5D1mD8`
- Production fetch：首页、`/blog`、`/projects` 均返回新内容。

飞书同步：

- 21｜第四阶段上下文搜索复盘：`https://scnlb1lk96sb.feishu.cn/wiki/JbkzwpGGDi1qb0klokDcR2T0n0b`
- 22｜第四阶段状态面板与筛选调研：`https://scnlb1lk96sb.feishu.cn/wiki/K5rQw97FZiSMCvkiIYFceAY7nzf`
- 已更新导航、项目地图、路线图、设计系统、进度、版本追溯、QA、同步协议。

下一步：

- 同步 GitHub issue。
- 评估 `GlobalSearch` 是否需要从 Command Center 中抽象。

### 第四阶段：照片筛选切片

状态：已部署，已同步飞书和 GitHub。

复盘：

- 上一切片已经证明 `FilterBar` 可服务文章和项目列表。
- 仍需要验证 `FilterBar` 是否能服务媒体浏览，而不是只适合文字列表。
- `/photos` 有 tags、featured、grid、lightbox，是最合适的复用压力测试。

调研依据：

- NN/g：当前照片数量不需要完整 faceted navigation，单选 filters 足够。
- NN/g：筛选值必须可预测，优先使用已有 tags。
- Baymard：已应用筛选需要集中展示，并提供清除路径。
- Baymard：移动端可以提升常用筛选，避免藏进复杂抽屉。
- Carbon：selectable tags 需要明确状态和语义。

完成：

- `/photos` 接入可复用 `FilterBar`。
- 增加 `Featured` 特殊筛选。
- 使用照片 tags 自动生成筛选项。
- 筛选后精选区域、照片网格和灯箱导航都基于当前结果。
- 切换筛选时关闭当前灯箱，避免 active photo 和结果集合不一致。
- 添加 `docs/PHASE4_STATUS_FILTER_REVIEW.md` 和 `docs/PHASE4_PHOTO_FILTER_RESEARCH.md`。
- 更新项目地图、路线图、设计系统和 QA 文档。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser 验证：`/photos` 初始状态显示 `6 / 6 frames`，网格 6 张，精选 2 张。
- Browser 验证：点击 `Music` 后显示 `1 / 6 frames`，网格 1 张，精选 1 张。
- Browser 验证：打开 `Listening corner` 灯箱后，点击下一张仍停留在当前筛选结果内。
- Browser 验证：点击 `Clear` 后恢复 `6 / 6 frames`。
- Browser 验证：移动端 390 x 844 无页面级横向溢出。
- Browser 截图：桌面 `Music` 筛选状态和移动端 `/photos` 首屏。

下一步：

- 下一切片建议进入 `Knowledge` 信息架构和筛选模式，而不是立刻堆全站搜索。

部署：

- Vercel production：`https://elegant-developer-studio.vercel.app`
- Vercel deployment：`https://elegant-developer-studio-qhfkj8vir.vercel.app`
- Deployment id：`dpl_Fkvk14f2WagC9TGJDcz5DCSP1jiu`
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/Fkvk14f2WagC9TGJDcz5DCSP1jiu`
- Production fetch：`/photos` 返回 `200 OK`，并包含本轮照片筛选内容。

飞书：

- [23｜第四阶段状态面板与筛选复盘](https://scnlb1lk96sb.feishu.cn/wiki/A4FFwPC4qiod5lkcPascxE4KnHc)
- [24｜第四阶段照片筛选调研](https://scnlb1lk96sb.feishu.cn/wiki/JA2jw4JSHiZWHnkMHfXc7Zamnlh)
- 验证：导航页包含 23/24；照片筛选调研页包含 `Music`、`1 / 6 frames`、`Listening corner`。

GitHub：

- Issue `#3` 追加 Phase 4 照片筛选交付记录：comment `4694227104`。
- Issue `#5` 追加照片筛选调研记录：comment `4694228454`。

### 第五阶段：Knowledge 首个切片

状态：已部署，已同步飞书和 GitHub。

复盘：

- 上一切片已经证明 `FilterBar` 可跨文章、项目和照片复用。
- `/knowledge` 是此前从 `notes` 修正而来的长期 IA，但仍停留在规划入口。
- 继续堆 Command Center 价值不高，应把规划中的知识表面变成真实页面。

调研依据：

- NN/g：IA 是信息骨架，不是导航控件本身。
- NN/g：信息气味决定用户是否敢点击；知识卡必须说明何时有用。
- NN/g：当前内容量不需要完整 facets。
- GitBook：文档 IA 要命名清晰、减少重复、保持组件一致。
- Diátaxis：内容意图可帮助区分学习、执行、查阅和理解。
- Obsidian：当前更适合 local trails 和关联链接，不适合全局图谱。

完成：

- 新增 `/knowledge` 页面。
- 新增 `src/data/knowledge.ts` 内容模型。
- 新增 `KnowledgeExplorer` 和 `KnowledgeCard`。
- `FilterBar` 复用到知识类型筛选。
- 每条知识支持稳定锚点和 `Copy ref`。
- Command Center 新增 `knowledge` 类型、真实知识结果和 `Knowledge context`。
- 移除 `Knowledge is planned` 状态。
- sitemap 增加 `/knowledge`。
- 添加 `docs/PHASE4_PHOTO_FILTER_REVIEW.md` 和 `docs/PHASE5_KNOWLEDGE_RESEARCH.md`。

提交：

- `6cc9fda` - `feat: add knowledge index workflow`
- `ca2df2f` - `fix: wire knowledge into command menu`

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser 验证：`/knowledge` 初始状态显示 `5 / 5 entries`，知识卡片 5 张，无框架错误覆盖层。
- Playwright 验证：点击 `Decision` 后显示 `1 / 5 entries`，结果为 `Filters before full search`。
- Playwright 验证：点击 `Copy ref` 后显示 `Copied`。
- Playwright 验证：Command Center 搜索 `knowledge` 不再出现 `Knowledge is planned`，并显示真实 Knowledge 结果。
- Playwright 验证：移动端 390 x 844 无页面级横向溢出。
- 截图：`/tmp/knowledge-desktop.png`、`/tmp/knowledge-command.png`、`/tmp/knowledge-mobile.png`。

部署：

- Vercel production：`https://elegant-developer-studio.vercel.app`
- Vercel deployment：`https://elegant-developer-studio-j4uvj1xbl.vercel.app`
- Deployment id：`dpl_8F8o7UHhon7spUfpzVtoLn1e217i`
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/8F8o7UHhon7spUfpzVtoLn1e217i`
- Production fetch：`/knowledge` 返回 `200 OK`，并包含本轮 Knowledge 内容。
- Production sitemap：包含 `/knowledge`。

飞书：

- [25｜第四阶段照片筛选复盘](https://scnlb1lk96sb.feishu.cn/wiki/RaP7wMXZxiELyvkTSg5cZmh3nlc)
- [26｜第五阶段 Knowledge 调研](https://scnlb1lk96sb.feishu.cn/wiki/QLohw7hBqi5CYpkIe6PciYhdnDv)
- 验证：导航页包含 25/26；Knowledge 调研页包含 `Copy ref`、`5 / 5 entries`、`Decision`、`Knowledge is planned` 变更记录。

GitHub：

- Issue `#4` 追加 Phase 5 Knowledge 交付记录：comment `4697691422`。
- Issue `#5` 追加 Phase 5 Knowledge 调研记录：comment `4697691502`。

### 第五阶段：Uses 首个切片

状态：已部署，已同步飞书和 GitHub。

复盘：

- `/knowledge` 已证明第五阶段应该优先打开真实表面，而不是堆规划入口。
- `/uses` 比 `/lab` 更适合当前阶段，因为它能表达工具、工作流、审美和发布习惯。
- `/lab` 需要更多成熟组件库存后再做，否则容易变成空展厅。

调研依据：

- uses.tech：`/uses` 是开发者个人站中成熟的信息形态。
- Raycast Manual：优秀工具入口应强调 keyboard-first 和快速进入工作流。
- Raycast Quicklinks：工具页可以展示深链、项目路径和搜索入口，而不是只展示软件名。
- Raycast Script Commands：automation shelf 应展示可重复动作，而不是假终端。

完成：

- 新增 `/uses` 页面。
- 新增 `src/data/uses.ts` 工具、工作流和发布管线模型。
- 新增 `UsesExplorer`。
- 新增 `UsesShelf`、`ToolCard`、`WorkflowRail`、`PublishingPipeline`、`AutomationShelf` 这一组页面构件。
- `FilterBar` 复用到工具分类筛选。
- 工具支持 `Copy ref`，工具列表支持 `Copy all`。
- `Open Command Center` 触发全站命令面板。
- Command Center 新增 `uses` 类型、真实工具结果、工作流结果和 `Uses context`。
- 移除 `Uses is planned` 状态。
- sitemap 增加 `/uses`。
- 保存视觉参考：`public/references/uses-page-reference.png`。
- 添加 `docs/PHASE5_KNOWLEDGE_REVIEW.md` 和 `docs/PHASE5_USES_RESEARCH.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser 验证：`/uses` 标题为 `Uses - Ray Studio`，初始状态显示 `12 / 12 tools`。
- Browser 验证：点击 `Automation` 后显示 `4 / 12 tools`，结果为 `Vercel`、`Raycast`、`Linear`、`Playwright`。
- Browser 验证：点击 `Copy Raycast reference` 后显示 `Copied`。
- Browser 验证：Command Center 搜索 `uses` 不再出现 `Uses is planned`，并显示真实 Uses 结果。
- Browser 验证：移动端 390 x 844 无页面级横向溢出。
- 视觉复核：1440 x 1200 下工具卡文案与 `Copy ref` 不重叠。

截图：

- `/tmp/uses-desktop.png`
- `/tmp/uses-desktop-1440-fixed.png`
- `/tmp/uses-mobile.png`
- `/tmp/uses-command.png`

部署：

- Vercel production：`https://elegant-developer-studio.vercel.app`
- Vercel deployment：`https://elegant-developer-studio-egeyv7n0r.vercel.app`
- Deployment id：`dpl_53zPmqkRZvhssJURGiHE1PrWWy8y`
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/53zPmqkRZvhssJURGiHE1PrWWy8y`
- Production fetch：`/uses` 返回 `200 OK`，并包含本轮 Uses 内容。
- Production sitemap：包含 `/uses`。

飞书：

- [27｜第五阶段 Knowledge 复盘](https://scnlb1lk96sb.feishu.cn/wiki/Vl0twcEuYi0aBHk5FIOcu6W3nVf)
- [28｜第五阶段 Uses 调研](https://scnlb1lk96sb.feishu.cn/wiki/ZuFswpj8ci6SmFksRrSckuaNnVc)
- 验证：导航页包含 27/28；Uses 调研页包含 `12 / 12 tools`、`Copy Raycast reference`、`Uses is planned` 变更记录。

GitHub：

- Issue `#4` 追加 Phase 5 Uses 交付记录：comment `4697820505`。
- Issue `#5` 追加 Phase 5 Uses 调研记录：comment `4697820783`。

### 第五阶段：About 首个切片

状态：已部署，已同步飞书和 GitHub。

复盘：

- `/uses` 已经说明工具和工作流，但还缺“人如何判断、适合怎样合作”的入口。
- 继续做 `/lab` 会需要更多组件库存；先做 `/about` 能补齐个人站的信任层。
- About 不应做传统简历页，而应做 Studio Profile。

调研依据：

- NN/g：About 内容应清晰、真实、透明，帮助建立信任。
- NN/g：顶层 About 应先讲清故事，不应只堆组织或个人信息。
- Lee Robinson：个人站可以把职业身份、写作、生活兴趣和最近状态放在同一语境中。
- Josh Comeau：优秀技术个人站可以把设计、MDX、互动组件和实现细节结合。
- Apple HIG：布局应适配不同上下文并保持一致性。

完成：

- 新增 `/about` 页面。
- 新增 `src/data/about.ts`。
- 新增 `AboutProfile`。
- 实现 Studio Profile、状态条、命令入口、复制简介。
- 实现时间线聚焦、原则选择、能力矩阵、工作约定和 Contact band。
- Command Center 新增 `about` 类型、真实结果和 `About context`。
- 移除 `About is planned` 状态。
- sitemap 增加 `/about`。
- 保存视觉参考：`public/references/about-page-reference.png`。
- 添加 `docs/PHASE5_USES_REVIEW.md` 和 `docs/PHASE5_ABOUT_RESEARCH.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：`/about` 页面身份、原则选择、复制简介、Command Center 搜索通过。
- 生产构建移动端 390 x 844：无横向溢出。
- 桌面 1440 x 1200：首屏成立，低到中等信息密度。

截图：

- `/tmp/about-desktop-1440.png`
- `/tmp/about-command.png`
- `/tmp/about-mobile-prod-fixed.png`

部署：

- Vercel production：`https://elegant-developer-studio.vercel.app`
- Vercel deployment：`https://elegant-developer-studio-g852ukupb.vercel.app`
- Deployment id：`dpl_eLddAkLRyfEqKAgUMfPCqUS36sFa`
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/eLddAkLRyfEqKAgUMfPCqUS36sFa`
- Production fetch：`/about` 返回 `200 OK`，并包含本轮 About 内容。
- Production sitemap：包含 `/about`。

飞书：

- [29｜第五阶段 Uses 复盘](https://scnlb1lk96sb.feishu.cn/wiki/A0i0wPS74i4WyjkKO0RcOMWKngd)
- [30｜第五阶段 About 调研](https://scnlb1lk96sb.feishu.cn/wiki/TAWHwObsji30i1kaJmfc3Wylnne)
- 验证：导航页包含 29/30；About 调研页包含 `Copy intro`、`About is planned` 变更记录和移动端 QA；素材页包含 `about-page-reference.png`。

GitHub：

- Issue `#4` 追加 Phase 5 About 交付记录：comment `4697902514`。
- Issue `#5` 追加 Phase 5 About 调研记录：comment `4697902594`。

### 第五阶段：Lab 首个切片

状态：已部署，已同步飞书和 GitHub。

复盘：

- `/about` 已补齐信任层，但组件和交互证据缺少统一公开索引。
- 下一步不应继续堆页面，而应先把已沉淀组件做成可浏览、可复制、可追溯的 Lab。

调研依据：

- Storybook Showcase：组件应可被单独看见、验证和比较。
- shadcn/ui Registry Directory：组件目录的价值在可发现、可复制、可分发。
- Vercel Geist：开发者产品应保持清晰、克制和语义一致。
- Atlassian Design Components：成熟设计系统会把组件、模式和基础设施组织成可浏览目录。

完成：

- 新增 `/lab` 页面。
- 新增 `src/data/lab.ts` 组件注册表、实验时间线和质量门禁模型。
- 新增 `LabExplorer`。
- 实现状态条、组件分类筛选、精选组件预览、组件清单、复制 import、复制 registry、实验时间线和质量门禁。
- Command Center 新增 `lab` 类型、真实组件结果、实验结果和 `Lab context`。
- 移除 `Lab is planned` 状态。
- sitemap 增加 `/lab`。
- 保存视觉参考：`public/references/lab-page-reference.png`。
- 添加 `docs/PHASE5_ABOUT_REVIEW.md` 和 `docs/PHASE5_LAB_RESEARCH.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：`/lab` 页面身份、组件筛选、复制 import、Command Center 搜索和移动端布局通过。
- 点击 `System` 后显示 `2 / 9 components`，结果为 `FilterBar` 和 `StatusPanel`。
- 点击 `Copy import` 后显示 `Copied import`。
- Command Center 搜索 `lab` 出现真实 Lab 结果，不再出现 `Lab is planned`。
- 移动端 390 x 844：已修复组件列表被长内容撑宽的问题，最终 `scrollWidth 390`，`clientWidth 390`。
- 桌面 1440 x 1200：无页面级横向溢出。
- 视觉复核：已修复 `GlobalCommandMenu` 在预览标题中断成 `Me / nu` 的问题，预览标题改为可读名称 `Global Command Menu`，列表仍保留代码标识 `GlobalCommandMenu`。

截图：

- `/tmp/lab-desktop-1440.png`
- `/tmp/lab-mobile-390.png`

部署：

- Vercel production：`https://elegant-developer-studio.vercel.app`
- Vercel deployment：`https://elegant-developer-studio-57vn0qx3p.vercel.app`
- Deployment id：`dpl_FRvaS6k35CWuuYShEvxS6eDgFgbN`
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/FRvaS6k35CWuuYShEvxS6eDgFgbN`
- Production fetch：`/lab` 返回页面内容，包含 `Lab - Ray Studio`、`Filter components`、`GlobalCommandMenu` 和 `Quality gates`。
- Production sitemap：包含 `/lab`。

飞书：

- [31｜第五阶段 About 复盘](https://scnlb1lk96sb.feishu.cn/wiki/EBUawLknuizjB2k73ORcGAhlnBg)
- [32｜第五阶段 Lab 调研](https://scnlb1lk96sb.feishu.cn/wiki/VcJLwI0mLinio6kuJ1xchFt9nEd)
- 已覆盖同步正文和素材页，并重新插入 `lab-page-reference.png`。
- 验证：导航页包含 31/32；Lab 调研页包含 `Storybook Showcase`、`shadcn/ui Registry Directory` 和 `390px 移动端`；素材页包含 `lab-page-reference.png`。

GitHub：

- Issue `#4` 追加 Phase 5 Lab 交付记录：comment `4697990453`。
- Issue `#5` 追加 Phase 5 Lab 调研记录：comment `4697991038`。

### 第六阶段：可达性与交互契约

状态：已部署，已同步 GitHub 和飞书。

复盘：

- 全站审计确认页面已完整，但占位链接和复制反馈存在信任风险。
- 本阶段优先修复“看起来能点但无法到达真实目标”的问题。

调研依据：

- W3C WCAG 2.2：链接目的、键盘可操作、可访问名称。
- W3C Link Purpose：用户需要理解点击后的结果。
- web.dev / MDN Clipboard API：剪贴板写入受权限和安全上下文影响，需要 fallback。
- Playwright Locator：重复文案下需要稳定 locator 和测试契约。

完成：

- 首页社交链接改为真实 repo、issues 和 About contact。
- Contact 从未知邮箱改为 `/about#contact` 和 GitHub Issues。
- 首页 Logo 改为真实 `/` 链接。
- 首页 `Media` 锚点修复。
- 新增共享剪贴板工具。
- CodeBlock、Knowledge、Uses、About、Lab 复制逻辑统一。
- 增加命令面板、筛选、复制按钮的 `data-testid`。
- 新增 Playwright e2e 配置、`test:e2e` 脚本和 52 个测试结果。
- 新增 `docs/SITE_AUDIT_2026_06_13.md`、`docs/PHASE6_ACCESSIBILITY_RESEARCH.md`、`docs/PHASE6_ACCESSIBILITY_REVIEW.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：52 passed。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，52 passed。
- 生产模式本地截图：桌面首页、移动首页、About contact 通过视觉复核。
- Vercel deployment：`dpl_A9hwKUEZNYsbL1grYaWxuj4v99EX`。
- Deployment URL：`https://elegant-developer-studio-84jah2zwx.vercel.app`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

剩余：

- 可考虑新增 `/contact` 页面。

外部同步：

- GitHub issue `#4` comment `4699034933`。
- GitHub issue `#5` comment `4699035053`。
- 飞书：[33｜全站产品与交互审计](https://scnlb1lk96sb.feishu.cn/wiki/LoNqwp5igiui2skcSThc2iPHn3g)。
- 飞书：[34｜第六阶段可达性调研](https://scnlb1lk96sb.feishu.cn/wiki/CFtQwXanFizQVBkfTT1czPh4nEg)。
- 飞书：[35｜第六阶段可达性复盘](https://scnlb1lk96sb.feishu.cn/wiki/G47Bwwl2FiuJsYkQtZKcEpgtn4c)。

### 第七阶段：Contact 与公开信任层

状态：已部署，已同步 GitHub 和飞书。

复盘：

- 第六阶段已修复假链接和占位邮箱，但 Contact 仍借用 `/about#contact`。
- 本阶段将 Contact 升级为独立公开路由，避免用户只能通过 About 锚点或临时 Issues 链接联系。

调研依据：

- NN/g About 与信任信息研究。
- GOV.UK 联系服务模式。
- W3C WCAG 2.2 与 labels/instructions。
- Next.js sitemap file convention。

完成：

- 新增 `/contact` 页面。
- 新增 `ContactHub`。
- 新增 `src/data/contact.ts`。
- 首页 Header Contact、首页 Contact panel、首页社交入口改为 `/contact`。
- About contact band 改为 `/contact`。
- Knowledge 相关链接改为 `/contact`。
- Command Center `action-contact` 改为 `/contact`。
- sitemap 增加 `/contact`。
- E2E 增加 `/contact` 路由、入口、命令面板、真实外链和复制反馈测试。
- 新增 `docs/PHASE7_CONTACT_RESEARCH.md` 和 `docs/PHASE7_CONTACT_REVIEW.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：58 passed。
- Browser QA：`/contact` URL、title、唯一 H1、GitHub Issues 链接、复制反馈、控制台健康通过。
- 移动端 `390 x 844`：`scrollWidth 390`，无横向溢出。
- 截图：`/tmp/contact-desktop-1440.png`、`/tmp/contact-mobile-390.png`。
- Vercel deployment：`dpl_GTGZWzVKHkSaXt2R9TsBbrfjVcRk`。
- Deployment URL：`https://elegant-developer-studio-kjne04d8h.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/GTGZWzVKHkSaXt2R9TsBbrfjVcRk`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，58 passed。

剩余：

- 后续可新增 GitHub issue template 与私密联系渠道。

外部同步：

- GitHub issue `#4` comment `4699086363`。
- GitHub issue `#5` comment `4699086922`。
- 飞书：[36｜第七阶段 Contact 调研](https://scnlb1lk96sb.feishu.cn/wiki/XAwGwIpJ2iVUE8k4Mjfcmw6yn8e)。
- 飞书：[37｜第七阶段 Contact 复盘](https://scnlb1lk96sb.feishu.cn/wiki/QiYew1iOhic5YkkZ6KicjZ4OnAb)。

### 第八阶段：公开协作与 Issue Template 层

状态：已部署，已同步 GitHub 和飞书。

复盘：

- 第七阶段完成 `/contact`，但 GitHub Issues 仍缺少结构化输入。
- 本阶段将 Contact brief 落地为 GitHub Issue Form，让公开协作可执行、可追溯。

调研依据：

- GitHub Issue Forms syntax。
- GitHub issue template configuration。
- GitHub form schema。
- GitHub issue URL query。

完成：

- 新增 `.github/ISSUE_TEMPLATE/config.yml`。
- 新增 `.github/ISSUE_TEMPLATE/contact.yml`。
- 新增 `.github/ISSUE_TEMPLATE/bug_report.yml`。
- 新增 `.github/ISSUE_TEMPLATE/feature_request.yml`。
- `/contact` 主讨论入口改为 `issues/new?template=contact.yml`。
- 新增仓库协作契约测试，覆盖模板关键字段。
- 新增 `docs/PHASE8_ISSUE_TEMPLATE_RESEARCH.md` 和 `docs/PHASE8_ISSUE_TEMPLATE_REVIEW.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：60 passed。
- 本地生产模式视觉复核：`/contact` 桌面 `scrollWidth 1440`、移动端 `scrollWidth 390`，无横向溢出。
- 截图：`/tmp/phase8-contact-desktop.png`、`/tmp/phase8-contact-mobile.png`。
- Vercel deployment：`dpl_HRDcxTSwxDfJAGxWAxGmQPj4LR38`。
- Deployment URL：`https://elegant-developer-studio-eazkr2exm.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/HRDcxTSwxDfJAGxWAxGmQPj4LR38`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，60 passed。

剩余：

- 后续可新增 `CONTRIBUTING.md` 与公开协作规则。

外部同步：

- GitHub issue `#4` comment `4699301750`。
- GitHub issue `#5` comment `4699302265`。
- 飞书：[38｜第八阶段 Issue Template 调研](https://scnlb1lk96sb.feishu.cn/wiki/Jtp4wmyfhiHqXQkHbzXcFeEZncb)。
- 飞书：[39｜第八阶段 Issue Template 复盘](https://scnlb1lk96sb.feishu.cn/wiki/RbuowE2dtizYYokv8hwcU1tOn3d)。

### 第九阶段：协作治理与创意方向

状态：已部署，已同步 GitHub 和飞书。

复盘：

- 第八阶段让公开协作可以通过 Issue Forms 进入，但缺少贡献指南、PR 模板和创意判断标准。
- 本阶段补齐“反馈如何进入、变更如何评估、创意如何排期、阶段如何追踪”的治理层。

调研依据：

- GitHub Community Health 与 `CONTRIBUTING.md` 官方文档。
- GitHub repository contributor guidelines。
- Raycast keyboard-first command surface。
- Apple HIG motion guidance。

完成：

- 新增 `/collaboration` 页面。
- 新增 `src/data/collaboration.ts`。
- Contact 页面新增 `Read collaboration guide` 入口。
- Command Center 新增 `Collaboration` 类型和创意条目搜索。
- sitemap 增加 `/collaboration`。
- Lab 注册 `CollaborationGuide`。
- 新增 `CONTRIBUTING.md`。
- 新增 `.github/PULL_REQUEST_TEMPLATE.md`。
- 新增 `docs/PHASE9_COLLABORATION_RESEARCH.md`。
- 新增 `docs/PHASE9_COLLABORATION_REVIEW.md`。
- 新增 `docs/CREATIVE_DIRECTION.md`。
- e2e 增加 `/collaboration`、Contact 链接、Command Center 创意搜索和仓库治理文件检查。

当前专家判断：

- 优点：站点结构稳定，Command Center 和 Lab 已经形成程序员风格骨架。
- 缺点：还缺一个强 signature interaction；项目 case study 和媒体记忆层需要真实内容加深。
- 下一步：优先做 `Command Trace` 和 `Source Hover`，暂缓常驻宠物、大型图谱和高强度背景特效。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：66 passed。
- Playwright 本地生产模式视觉复核：`/collaboration` 桌面 `scrollWidth 1440`、移动端无横向溢出。
- Command Center 搜索 `source hover` 能显示 `creative-source-hover` 结果。
- `/collaboration` 公开 Issue Form 链接指向 `issues/new?template=contact.yml`。
- 截图：`/tmp/phase9-collaboration-desktop.png`、`/tmp/phase9-collaboration-mobile.png`。
- Vercel deployment：`dpl_6LRU2cxFSJS3uTPpoJVbQAtcLzLQ`。
- Deployment URL：`https://elegant-developer-studio-blgy772e9.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/6LRU2cxFSJS3uTPpoJVbQAtcLzLQ`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，66 passed。
- Production curl：`/collaboration` 包含 `Collaboration - Ray Studio`、`Command Trace`、`Source Hover` 和 `issues/new?template=contact.yml`。

外部同步：

- GitHub issue `#4` comment `4700751204`。
- GitHub issue `#5` comment `4700751288`。
- 飞书：[40｜第九阶段协作治理调研](https://scnlb1lk96sb.feishu.cn/wiki/EsfZw9eIIieatLkruPRcvM9jnXf)。
- 飞书：[41｜第九阶段协作治理复盘](https://scnlb1lk96sb.feishu.cn/wiki/NsDgwc0lsiEBBNkYnFtcdoHcnmf)。
- 飞书：[42｜创意方向与交互 Backlog](https://scnlb1lk96sb.feishu.cn/wiki/TXViwYd2TiDvA7kGqs5czJifnSg)。

### 第十阶段：Signature Interaction Prototype

状态：已部署，已同步 GitHub 和飞书。

复盘：

- 第九阶段已经明确优先做 `Command Trace` 和 `Source Hover`，暂缓宠物、粒子、大型图谱和高强度特效。
- 本阶段把这两个创意从 backlog 推进到可测试、可追踪、可复用的站点构件。

调研依据：

- Raycast：命令式导航和键盘优先行为。
- Apple HIG Motion：动效服务状态理解，不抢内容。
- GitHub healthy contributions：公开项目应暴露贡献路径、来源和维护上下文。
- MDN `prefers-reduced-motion`：动效需要尊重系统偏好。

完成：

- 新增 `CommandTraceToast`。
- 新增 `src/lib/command-trace.ts`。
- Command Center 内部路由打开后写入并展示 `cmd.open("/route")`。
- Command Trace 路由不匹配时清理，避免上下文残影。
- Knowledge 卡片新增 `ref /knowledge#slug`。
- Project 卡片新增 `source src/content/projects/{slug}.mdx`。
- Lab row 新增 `source` reveal。
- Lab 注册 `CommandTraceToast` 和 `SourceReveal`，组件总数增加到 12。
- `SourceReveal` 桌面 hover/focus 显示，移动端常驻显示。
- `prefers-reduced-motion` 下关闭位移动画。
- 移除 `next/font/google` 构建期网络依赖，改为系统字体变量。
- ESLint 忽略 `test-results`、`playwright-report` 和 `output`。
- e2e 增加命令 trace 和 source reveal 检查。
- 新增 `docs/PHASE10_SIGNATURE_INTERACTION_RESEARCH.md`。
- 新增 `docs/PHASE10_SIGNATURE_INTERACTION_REVIEW.md`。

专家判断：

- 优点：程序员气质来自真实命令、真实来源和可检查路径，而不是假终端。
- 缺点：`SourceReveal` 还不是 GitHub 可点击链接；移动端筛选条的横向滚动提示还不够优雅；Lab 仍缺 isolated component preview。
- 下一步：优先做 GitHub source link、移动端筛选条 polish、`ComponentPreview`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：68 passed。
- Vercel deployment：`dpl_BAvc9wkG9cRr9XbC3WzDWoyxCRrZ`。
- Deployment URL：`https://elegant-developer-studio-dx2h0nnk6.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/BAvc9wkG9cRr9XbC3WzDWoyxCRrZ`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，68 passed。
- Playwright 本地生产模式视觉复核：桌面和移动端无横向溢出。
- Command Trace：`cmd.open("/lab")` 可见。
- Source Reveal：`ref /knowledge#filters-before-search` 和 `source src/content/projects/...` 可见。
- stale trace：离开 `/lab` 后数量为 `0`。
- 截图：`output/phase10-command-trace-desktop.png`、`output/phase10-source-hover-desktop.png`、`output/phase10-projects-mobile.png`。

外部同步：

- GitHub issue `#4` comment `4701201385`。
- GitHub issue `#5` comment `4701203356`。
- 飞书：[43｜第十阶段 Signature Interaction 调研](https://scnlb1lk96sb.feishu.cn/wiki/DRRVwNzmoieq3TkBpgVcxJ2Pnhg)。
- 飞书：[44｜第十阶段 Signature Interaction 复盘](https://scnlb1lk96sb.feishu.cn/wiki/FTCPwMMMli8mMskzh3uctZjynGb)。

### 第十一阶段：Reading Focus Lens

状态：已部署，已同步 GitHub 和飞书。

复盘：

- 第十阶段已经完成 `Command Trace` 和 `SourceReveal`，站点开始拥有真实的程序员风格 signature。
- 用户希望继续探索更有创意、更炫酷的交互，但不能污染整体优雅气质。
- 本阶段选择博客阅读页作为创意入口，因为它服务真实阅读、引用和内容追踪。

调研依据：

- Apple HIG Motion：动效应该服务状态理解，不能抢内容。
- NN/g：动画和反馈需要贴近用户动作，阅读型页面必须克制。
- GitHub Primer：技术产品的可信度来自清晰 focus、稳定状态和可访问交互。
- MDN IntersectionObserver 与 `prefers-reduced-motion`：可见区域追踪和动效降级。

完成：

- `ArticleInteractions` 升级为 `ReadingFocusLens`。
- 文章页显示当前小节标题。
- 显示 `read.focus("section-id")`。
- 支持复制当前小节 URL。
- 复制使用 `writeToClipboard` 降级工具。
- 当前 heading 显示轻量 focus 指示。
- 正文段落和列表 hover 时有轻微阅读聚焦。
- 移动端保留底部轻量浮层。
- `prefers-reduced-motion` 下取消过渡。
- Lab 注册 `ReadingFocusLens`。
- Lab experiment timeline 新增 `Reading focus`。
- Command Center 可搜索 `reading focus`。
- 新增 `docs/PHASE11_READING_FOCUS_RESEARCH.md`。
- 新增 `docs/PHASE11_READING_FOCUS_REVIEW.md`。

专家判断：

- 优点：炫酷感来自真实阅读状态和可复制引用，不是装饰。
- 缺点：目前只在博客页生效，还没有复用到 Knowledge 详情页或项目 case study。
- 下一步：优先做 GitHub source link、ComponentPreview 和 Case Study Diff。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：`article reading focus` 和 `lab and command center`，4 passed。
- `npm run test:e2e`：72 passed。
- Playwright 视觉巡检：桌面和移动端文章页无横向溢出。
- 桌面滚动到第二小节后显示 `read.focus("the-technical-texture")`。
- 移动端显示 `read.focus("a-promise-has-shape")`，底部浮层未越界。
- 截图：`output/phase11-reading-focus-desktop.png`、`output/phase11-reading-focus-technical-desktop.png`、`output/phase11-reading-focus-mobile.png`。
- Vercel deployment：`dpl_6yfkF68Y9W9CYkURgc4hcCe2XSxL`。
- Deployment URL：`https://elegant-developer-studio-1bar07nc4.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/6yfkF68Y9W9CYkURgc4hcCe2XSxL`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，72 passed。

外部同步：

- GitHub issue `#4` comment `4701358081`。
- GitHub issue `#5` comment `4701358538`。
- 飞书：[45｜第十一阶段 Reading Focus 调研](https://scnlb1lk96sb.feishu.cn/wiki/Xhp5w6OntinAWMkHtofcd9RVnAe)。
- 飞书：[46｜第十一阶段 Reading Focus 复盘](https://scnlb1lk96sb.feishu.cn/wiki/X6qRwjnsLi02JNkUT5Pc2S3CnUg)。

### 第十二阶段：可追溯作品集层

状态：已实现，已部署，待外部同步。

阶段判断：

- 第十一阶段后，站点已经有 `Command Trace`、`SourceReveal` 和 `ReadingFocusLens`。
- 用户明确要求避免“能看到但点不到”的交互错误。
- 因此本阶段优先补可追溯链条和真实点击验证，而不是继续堆装饰。

完成：

- `SourceReveal` 升级为可点击 GitHub source link。
- 新增 `src/lib/source-links.ts`。
- Knowledge 数据模型新增 backlinks。
- Project metadata 新增 `caseStudyDiff`。
- 项目详情页新增 `Case Study Diff`。
- `/lab` 新增 `ComponentPreview`，支持 `preview / trace / source`。
- Lab 注册 `ComponentPreview`。
- 修复 Command Center 鼠标点击导航：点击结果和键盘 `Enter` 统一走 `openItem`。
- 新增 `docs/PHASE12_TRACEABLE_PORTFOLIO_RESEARCH.md`。
- 新增 `docs/PHASE12_TRACEABLE_PORTFOLIO_REVIEW.md`。

专家判断：

- 优点：界面、源码、知识、组件和证据之间开始形成可验证链条。
- 缺点：source link 还不是 commit permalink；ComponentPreview 还不是交互沙箱；Case Study Diff 还缺截图/PR/commit 证据。
- 创意建议：下一步优先设计 `Reference Constellation`，但必须只展示真实关系。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：6 passed。
- `npm run test:e2e`：78 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：78 passed。
- Playwright 视觉巡检：`/knowledge`、`/projects/lumen`、`/lab` 的桌面和移动端均无横向溢出。
- Vercel deployment：`dpl_CJNVnLikDaf6LjhsDSFDTNFXYkaD`。
- Deployment URL：`https://elegant-developer-studio-m2ez8af5j.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/CJNVnLikDaf6LjhsDSFDTNFXYkaD`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

GitHub 推送修复：

- 问题：HTTPS remote 推送出现网络层空响应/超时。
- 诊断：SSH 认证 `git@github.com` 成功。
- 处理：`origin` 从 HTTPS 切换为 `git@github.com:njueeRay/elegant-developer-studio.git`。
- 结果：上一批提交已成功推送到 `main`。

外部同步：

- GitHub issue `#4` comment `4701510690`。
- GitHub issue `#5` comment `4701510805`。
- 飞书：[47｜第十二阶段可追溯作品集调研](https://scnlb1lk96sb.feishu.cn/wiki/D7rSwIo6jiGQFHkpuPWcmav2nuX)。
- 飞书：[48｜第十二阶段可追溯作品集复盘](https://scnlb1lk96sb.feishu.cn/wiki/OpBJwaM06i19GCkPAYzcbFB8nuc)。

### 第十三至第十六阶段：Navigation OS 与可追溯交互

状态：已实现，已验证，已部署，已外部同步。

阶段判断：

- 页面存在不等于用户可达。
- 主信息架构必须进入公开导航，命令面板只能作为加速器。
- 页面职责边界必须先定义清楚，再继续堆组件。
- 程序员风格的高级感应来自可验证证据、源码路径、组件状态和真实交互。

完成：

- 新增 `src/data/navigation.ts`。
- 新增 `SiteHeader`，统一桌面导航、移动菜单、主题切换和联系入口。
- 首页和核心页面接入统一全站导航。
- 首页低部补充 `Uses` 与 `About` 入口。
- `Case Study Diff` 新增 `evidenceHref` 与 `Open evidence`。
- `SourceReveal` 支持可选行号。
- `ComponentPreview` 新增 `desktop / mobile` viewport switch。
- 移动端长标题增加换行保护。
- 新增 `docs/PHASE13_16_NAVIGATION_OS_REVIEW.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：`primary surfaces`、`mobile navigation`、`horizontal overflow`、`lab component preview`、`project case studies`，10 passed。
- `npm run test:e2e`：84 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：84 passed。
- Playwright 本地生产模式视觉检查：`/`、`/uses`、`/about`、`/lab`、`/collaboration` 桌面与移动端均无横向溢出。
- `/collaboration` 移动端标题修正后，`h1` 宽度 362px，390px 视口内不再拆成孤立字母。
- 截图：`/tmp/phase13-16-home-desktop.png`、`/tmp/phase13-16-home-mobile.png`、`/tmp/phase13-16-lab-desktop.png`、`/tmp/phase13-16-collaboration-mobile-fixed.png`。

部署：

- Primary commit：`f2ea9fa`。
- Vercel deployment：`dpl_B4tu25Li2odMD2iz4J7gQKvkR8g4`。
- Deployment URL：`https://elegant-developer-studio-pu7nr8w6g.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/B4tu25Li2odMD2iz4J7gQKvkR8g4`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

外部同步：

- 飞书：[49｜第十三至第十六阶段 Navigation OS 复盘](https://scnlb1lk96sb.feishu.cn/wiki/XKS9wKn5Diutm1kKly4cDBwsnJe)。
- 飞书核心页已同步：导航首页、项目地图、路线图、信息架构、设计系统、开发进度、版本追溯、同步协议。
- 飞书 live verification：新阶段页包含 `公开可达`、`Phase 16`、`84 passed`、`Reference Constellation`；导航首页包含 49 号节点链接。

### 第十七阶段：中文内容试点与全站复盘

状态：已实现，已验证，已部署，待外部同步。

阶段判断：

- 中文内容应该进入公开站点，而不是只留在飞书和聊天历史中。
- 当前不做整站机械双语，先在高价值页面做小范围试点。
- 中文主要承担产品判断、协作语境、阶段复盘和长期记忆。

完成：

- 新增中文博客 `/blog/chinese-as-product-memory`。
- Knowledge 新增 `公开可达优先于内部完成`。
- Uses 新增 `中文复盘` 工作流。
- About 新增 `中文承载判断` 原则。
- About 新增 `中文优先记录判断` 协作约定。
- 新增 `docs/PHASE17_CHINESE_CONTENT_AND_NEXT_REVIEW.md`。
- e2e 新增中文内容可见性测试。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：`Chinese pilot content`，2 passed。
- `npm run test:e2e`：88 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：88 passed。
- 本地生产模式视觉检查：中文博客、Blog、Knowledge、Uses、About 的桌面与移动端均无横向溢出。
  - `/blog/chinese-as-product-memory` 桌面和移动端 `scrollWidth === clientWidth`。
  - `/knowledge`、`/uses`、`/about` 均可检索到中文内容。

部署：

- Primary commit：`01122c9`。
- Vercel deployment：`dpl_4DqXDZMd2S8RWhsHhU128ZKSPEkW`。
- Deployment URL：`https://elegant-developer-studio-8ojizsxr6.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/4DqXDZMd2S8RWhsHhU128ZKSPEkW`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

外部同步：

- 飞书：[50｜第十七阶段中文内容试点与全站复盘](https://scnlb1lk96sb.feishu.cn/wiki/OeZqwkMvFiiQYFkLvKLcQlmOnid)。
- 飞书核心页已同步：导航首页、项目地图、路线图、开发进度、版本追溯、同步协议。
- 飞书 live verification：50 号阶段页包含 `把中文作为产品记忆`、`Phase 18`、`Phase 22`、`88 passed`；导航首页包含 50 号节点链接。

下一步建议：

- Phase 18：中文内容系统化。
- Phase 19：真实证据增强。
- Phase 20：Knowledge 详情层。

### 第十八阶段：博客系统化复盘

状态：已实现，已验证，已部署，待外部同步。

阶段判断：

- 博客当前最大的缺口不是组件数量，而是内容语言、写作意图、栏目规则和读完后的路径。
- 中文内容不能只是偶然插入，它必须进入 metadata、筛选、卡片和文章详情。
- 程序员风格的博客应该让系统状态可读，而不是靠假终端增加技术感。

完成：

- `PostMeta` 新增 `language` 和 `intent`。
- 所有现有文章补齐语言和写作意图。
- `/blog` 新增写作系统说明面板。
- `/blog` 新增语言筛选。
- `PostCard` 显示语言和写作意图。
- `/blog/[slug]` metadata rail 显示 Language 与 Intent。
- `FilterBar` 的 `data-testid` 生成支持中文按钮。
- `CommandTraceToast` 修复跨路由跳转时追踪 toast 过早消失的问题。
- 新增 `docs/PHASE18_BLOG_SYSTEM_REVIEW.md`。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：`command menu opens real lab route|blog language filter reaches Chinese writing`，4 passed。
- `npm run test:e2e`：90 passed。
- 本地生产模式视觉检查：`/blog` 桌面、`/blog` 移动端、中文博客移动端均无横向溢出。
  - `/tmp/phase18-blog-desktop.png`
  - `/tmp/phase18-blog-mobile.png`
  - `/tmp/phase18-zh-article-mobile.png`
- Vercel inspect：deployment `Ready`。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`：90 passed。

部署：

- Primary commit：`6a83294`。
- Vercel deployment：`dpl_AQK2jGhgSEULmsbYdAVDmqyNuzjc`。
- Deployment URL：`https://elegant-developer-studio-krseoboo8.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/AQK2jGhgSEULmsbYdAVDmqyNuzjc`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

生产验证备注：

- 第一次 production 并发 e2e 前 81 条通过，后续出现 `net::ERR_CONNECTION_CLOSED`。
- 重试式 HTTP 检查核心路由均返回 200。
- 单 worker 全量 production e2e 通过，判定为短时连接问题，不是页面功能回归。

外部同步：

- 飞书：[51｜第十八阶段博客系统化复盘](https://scnlb1lk96sb.feishu.cn/wiki/UhnbwnuWYiH7lIkmkh4cU1qlnvd)。
- 飞书核心页已同步：导航首页、项目地图、路线图、设计系统、开发进度、版本追溯、同步协议。

下一步建议：

- Phase 19：博客阅读路径增强。
- Phase 20：Knowledge 详情与 Blog 双向引用。
- Phase 21：筛选状态 URL query。
- Phase 22：补真实中文长文与项目复盘。

### 第十九阶段：博客阅读路径增强

状态：已实现，待全量验证、部署和外部同步。

阶段判断：

- 文章页不能只负责展示正文，还要负责把读者带入站点系统。
- 当前内容规模下，局部 related trails 比全局图谱更诚实。
- Tags 适合筛选，相关阅读必须由作者显式声明。

完成：

- 新增 `PRODUCT.md`。
- 新增 `.impeccable/live/config.json`。
- `PostMeta` 新增 `relatedPostSlugs`、`relatedKnowledgeSlugs`、`relatedProjectSlugs`。
- 所有现有文章补齐 related metadata。
- 新增 `RelatedReading` 组件。
- `/blog/[slug]` 正文后接入 Essays、Knowledge、Projects 三条路径。
- 移动端文章布局增加底部安全留白，避免 `ReadingFocusLens` 遮挡尾部内容。
- 新增相关阅读 e2e 覆盖。

验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：6 passed。
- `npm run test:e2e`：92 passed。
- 本地生产模式视觉检查：中文文章移动端、英文文章桌面均无横向溢出；中文文章尾部 related project 与 fixed ReadingFocusLens 不重叠。

下一步建议：

- Phase 20：Knowledge 详情层。
- 将 Blog 的 Knowledge related links 从 hash 升级到详情页。
- 建立 Knowledge ↔ Blog ↔ Project 双向路径。
