# 第十九阶段博客阅读路径增强复盘

日期：2026-06-18

## 结论

第十九阶段把博客文章从“读完即结束”推进到“读完后进入系统”。本阶段没有新增独立页面，而是在文章页尾部加入 `RelatedReading`，把文章、Knowledge 和 Project 连成局部阅读路径。

判断：当前站点的表面已经足够多，下一步价值不在继续铺页面，而在提高内容之间的结构密度。读者读完一篇文章后，应该自然知道下一篇文章是什么、哪个知识条目可以引用、哪个项目证明了这套系统不是空谈。

## Impeccable 初始化

本阶段按用户要求接入 `impeccable`。

完成：

- 新增根目录 `PRODUCT.md`。
- Register 确认为 `brand`，因为这是个人 Studio / portfolio / long-form content，设计本身承担信任表达。
- 新增 `.impeccable/live/config.json`。
- CSP 检测结果：`shape: null`，无需额外 patch。

阶段原则：

- Public reachability beats internal completeness。
- Technical style must be earned by function。
- Writing is the spine。
- 中文承载判断和项目记忆，英文保留技术语境。
- Restraint must still have a point of view。

## 本阶段实现

### 1. 文章关系模型

`PostMeta` 新增：

- `relatedPostSlugs`
- `relatedKnowledgeSlugs`
- `relatedProjectSlugs`

每篇文章显式声明自己的阅读路径，不用 tags 自动猜。

原因：

- Tags 适合过滤，不适合表达作者判断。
- 相关阅读应该是编辑选择，而不是算法噪音。
- 内容量还小时，显式关系比搜索和图谱更可靠。

### 2. RelatedReading 组件

新增组件：

- `src/components/content/related-reading.tsx`

组件分成三条 lane：

- Essays：下一篇或相关论点。
- Knowledge：可复用知识条目。
- Projects：项目证据或系统来源。

它避免做成复杂图谱，也没有做成大面积装饰卡片。当前阶段更需要局部路径，而不是全局关系可视化。

### 3. 文章页接入

`/blog/[slug]` 在正文后接入：

- 当前文章。
- 全部文章 metadata。
- Knowledge entries。
- Project metadata。

这让文章详情页变成站点系统的一部分，而不是孤立 MDX 页面。

### 4. 移动端安全区

视觉检查发现：固定的 `ReadingFocusLens` 可能遮住文章尾部的相关阅读。已在移动端文章布局增加底部安全留白，确保最后一个 related project 不被固定面板遮挡。

## 专家审查

### 优点

1. 读者路径明显变强

文章读完后不再停在结尾，而是有明确下一步：继续读、引用知识、打开项目证据。

2. 程序员风格更真实

`read.next("slug")`、Knowledge permalink、Project evidence 共同构成可追溯语义，比装饰性终端更有技术质感。

3. 内容系统更可维护

关系写在 metadata 里，后续新增文章时可以逐步补路径，不依赖外部搜索基础设施。

4. 保持了克制

没有上全局图谱、复杂推荐、AI 摘要或多层卡片。当前内容规模下，这是正确取舍。

### 缺点

1. 关系仍然是手工维护

这在当前阶段是优点，但当文章超过 20 篇后，需要增加校验脚本，防止 slug 失效。

优先级：P1。

2. RelatedReading 还没有 URL query 联动

博客列表语言筛选仍是客户端状态，文章关系也还不能生成可分享过滤视图。

优先级：P1。

3. Knowledge 仍缺详情页

目前 Knowledge 通过 hash 定位卡片，已经可用，但还不如 `/knowledge/[slug]` 稳定。

优先级：P1。

4. 文章页还没有系列感

`RelatedReading` 是局部路径，不是 series 或专题页。后续可以加 `series` metadata。

优先级：P2。

## 验收

已通过：

- `npm run lint`
- `npm run build`
- targeted e2e：
  - `article related reading exposes public trails`
  - `audited pages do not create horizontal overflow`
  - `article reading focus exposes active section refs`
- `npm run test:e2e`：92 passed。
- 本地生产模式视觉检查：
  - `/blog/chinese-as-product-memory` mobile：无横向溢出。
  - `/blog/interface-is-a-promise` desktop：无横向溢出。
  - 中文文章尾部 related project 与 fixed ReadingFocusLens 不重叠。
- 截图：
  - `/tmp/phase19-related-zh-mobile-fixed.png`
  - `/tmp/phase19-related-interface-desktop.png`

部署：

- Primary commit：`d405cfe`。
- Vercel deployment：`dpl_A2uGZkzjiPA15xGy8AbrjAxp4uvd`。
- Deployment URL：`https://elegant-developer-studio-hy7v9mlcu.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/A2uGZkzjiPA15xGy8AbrjAxp4uvd`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

生产验证：

- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npx playwright test --workers=1 --retries=1`：92 passed。

待补充：

- 飞书知识库同步。

## 下一阶段建议

Phase 20 建议进入 Knowledge 详情层：

- 新增 `/knowledge/[slug]`。
- 将现有 hash 卡片升级为可独立访问的知识详情。
- 文章 `RelatedReading` 中的 Knowledge 链接改为详情页。
- 为 Knowledge 增加 `relatedPostSlugs` 和 `relatedProjectSlugs`，形成 Blog ↔ Knowledge 的双向路径。

这一步比继续增加博客文章更优先，因为它会把知识系统从“卡片索引”推进到“可引用文档节点”。
