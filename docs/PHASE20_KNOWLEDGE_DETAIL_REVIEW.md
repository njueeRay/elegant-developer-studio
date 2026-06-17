# 第二十阶段 Knowledge 详情层复盘

日期：2026-06-18

## 结论

第二十阶段把 Knowledge 从“列表上的可复制卡片”推进到“可独立访问、可引用、可被搜索引擎收录的知识节点”。

上一阶段 `RelatedReading` 已经让文章能指向 Knowledge，但当时 Knowledge 仍然停留在 `/knowledge#slug`。这种做法能用，但不够正式：它适合快速定位卡片，不适合承担长期决策、飞书评论、GitHub issue 和站点内部引用。

本阶段的核心判断：

- Knowledge 应该拥有自己的详情路由。
- 列表页负责浏览，详情页负责引用和解释。
- Blog、Knowledge、Project 的关系必须显式声明，不能靠标签或文本链接猜测。
- 公开可达性必须进入测试和 sitemap，而不是只存在于本地数据结构。

## 上阶段复盘

第十九阶段完成了 Blog → Knowledge → Project 的局部阅读路径，优点明显：

- 文章读完后有下一步。
- 相关阅读由作者显式声明，避免标签推荐的噪音。
- 程序员风格来自 `read.next("slug")` 和证据路径，而不是假终端装饰。

但它留下了一个结构缺口：

- Knowledge 链接仍指向 `/knowledge#slug`。
- Knowledge 没有自己的 metadata、详情布局和 sitemap 条目。
- Knowledge 与文章/项目的关系只在文章侧完整，知识侧不够完整。

本阶段正面修这个缺口。

## 本阶段实现

### 1. Knowledge 数据模型升级

`KnowledgeEntry` 新增：

- `relatedPostSlugs`
- `relatedProjectSlugs`

每条 Knowledge 都能主动声明：

- 相关博客文章。
- 项目证据。
- 原有 backlinks。

这让关系从单向的 Blog → Knowledge，升级为 Knowledge → Blog / Project 的双向路径。

### 2. 新增 Knowledge 详情页

新增路由：

- `/knowledge/[slug]`

实现内容：

- `generateStaticParams` 预生成全部知识详情页。
- `generateMetadata` 输出每条 Knowledge 的 title 和 description。
- 详情页包含：
  - kind / status / source / slug metadata rail。
  - 标题、摘要、标签。
  - `When to use it`。
  - `What it protects`。
  - `How to cite it`。
  - `KnowledgeTrails`。

设计判断：

- 详情页继承文章页的阅读气质，但不伪装成长文。
- 采用 rail + main 布局，强化“这是一个可引用节点”。
- 不做全局知识图谱。当前内容密度还不支持那种展示，强做会变成装饰。

### 3. 新增 KnowledgeTrails

新增组件：

- `src/components/content/knowledge-trails.tsx`

组件包含三条 lane：

- Related writing。
- Project evidence。
- Backlinks。

每条 lane 都有明确 `aria-label`。这是测试失败后反向补出的正确改进：同一个标题可能同时出现在相关文章和反向引用中，必须让用户和测试都能区分上下文。

### 4. 入口升级

已从 hash 锚点升级为正式路由：

- `RelatedReading` 的 Knowledge 链接。
- `KnowledgeCard` 的 `Open detail`。
- `KnowledgeCard` 的 `Copy ref`。
- `GlobalCommandMenu` 的 Knowledge 结果。
- `sitemap.xml` 的 Knowledge 动态路由。

同时顺手修复首页内部路由仍使用 `<a>` 的问题：

- `/knowledge`
- `/lab`
- `/contact`

这些站内路由已改为 Next `Link`。

## 专家审查

### 优点

1. Knowledge 终于成为一等内容资产

现在 Knowledge 不只是索引卡片，而是可以被直接访问、复制、搜索、引用的内容节点。

2. 内容系统更像个人 Studio，而不是普通博客

博客负责叙事，Knowledge 负责沉淀判断，Project 负责证据。这三个层次开始分工。

3. 可达性问题被测试覆盖

新增路由进入公共 routes 测试、移动端溢出测试和详情页路径测试。这个点很关键：页面“开发者自己知道能访问”不算完成，必须能从公开界面和测试里访问。

4. 保持克制

没有急着做图谱、AI 摘要、复杂搜索或视觉炫技。当前阶段最该修的是结构，不是表演。

### 缺点

1. Knowledge 正文仍偏模板化

`What it protects` 和 `How to cite it` 目前是通用解释，不是每条知识的深度正文。

优先级：P1。

2. 关系 slug 仍缺自动校验

`relatedPostSlugs` 和 `relatedProjectSlugs` 现在靠人工维护。内容增长后必须增加 schema 校验脚本。

优先级：P1。

3. 列表页和详情页之间还缺“当前位置感”

列表页可打开详情，但详情页返回后不能恢复筛选状态，因为筛选还没有 URL query。

优先级：P1。

4. Knowledge 还没有真实分类页

当前只有 kind filter，没有 `/knowledge/decisions` 或专题页。内容量尚小，暂不做。

优先级：P2。

## 下一阶段规划

Phase 21 建议进入 URL Query 与内容关系校验：

1. `/blog`、`/projects`、`/knowledge` 的筛选状态进入 URL query。
2. 浏览列表页时，筛选状态可分享、可返回、可由 Command Center 生成。
3. 增加内容关系校验脚本：
   - post related slug 必须存在。
   - knowledge related slug 必须存在。
   - project slug 必须存在。
   - 内部链接不能指向不存在路由。
4. e2e 增加：
   - 直接打开带 query 的列表页。
   - 切换筛选后 URL 更新。
   - 从详情页返回列表时筛选状态仍可恢复。

优先级判断：

- 先做 URL query 和 slug 校验。
- 暂不做全文搜索库。
- 暂不做全局图谱。
- 暂不做更重的视觉动画。

## 验收

已通过：

- `npm run lint`
- `npm run build`
- `npm run test:e2e`：98 passed。
- targeted e2e：
  - `serves /knowledge`
  - `serves /knowledge/public-reachable-before-internal-complete`
  - `serves /knowledge/interfaces-are-promises`
  - `audited pages do not create horizontal overflow on mobile`
  - `knowledge entries expose backlinks to public routes`
  - `knowledge detail pages expose bidirectional public trails`
  - `article related reading exposes public trails`
- 本地生产模式视觉检查：
  - `/knowledge/public-reachable-before-internal-complete` desktop：无横向溢出。
  - `/knowledge/public-reachable-before-internal-complete` mobile：无横向溢出。
- 截图：
  - `/tmp/phase20-knowledge-detail-desktop.png`
  - `/tmp/phase20-knowledge-detail-mobile.png`
- Vercel deployment：`dpl_BQbxSsRHDMh3uCP9TZjX6acTR5vF`。
- Deployment URL：`https://elegant-developer-studio-kr44h847o.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/BQbxSsRHDMh3uCP9TZjX6acTR5vF`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- Production e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`，98 passed。

外部同步：

- 飞书知识库同步：[53｜第二十阶段 Knowledge 详情层](https://scnlb1lk96sb.feishu.cn/wiki/U0XWwA1enitT6Sk6bm8cXpphnbb)。
