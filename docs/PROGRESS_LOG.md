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
