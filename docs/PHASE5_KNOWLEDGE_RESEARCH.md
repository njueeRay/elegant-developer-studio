# 第五阶段 Knowledge 首个切片调研

日期：2026-06-13

## 结论

`Knowledge` 首版应该是公开索引页，不是完整知识图谱。

原因：

- 当前内容量仍小，复杂 graph 会变成装饰。
- 用户首先需要知道这里有什么、每条内容能解决什么问题、能否复制引用到别处。
- 之前已经验证 `FilterBar` 可以跨文字、项目和媒体场景复用；本轮应该验证它能否承载知识类型筛选。
- `Knowledge` 是长期 IA，不是临时 notes，因此每条内容需要稳定 slug、类型、状态、标签、来源和关联链接。

## 外部调研

### NN/g：IA vs. Navigation

参考：`https://www.nngroup.com/articles/ia-vs-navigation/`

NN/g 将 IA 定义为站点的信息骨架，而导航只是到达信息的 UI。对本项目的启发：

- `Knowledge` 不应该只是首页上的一个链接。
- 需要先定义内容模型和分类规则，再决定导航和交互。
- 顶层 IA 使用 `Knowledge` 的决定继续成立，`notes` 只能作为内部内容类型。

### NN/g：Information Scent

参考：`https://www.nngroup.com/articles/information-scent/`

Information scent 关注用户能否预测点击后会得到什么。对本项目的启发：

- 卡片标题、summary、signal 必须说明这条知识何时有用。
- 关联链接要指向真实文章、项目或联系入口。
- 不使用模糊分类，例如 `Random`、`Thoughts`、`Misc`。

### NN/g：Filters vs. Facets

参考：`https://www.nngroup.com/articles/filters-vs-facets/`

对本项目的启发：

- 当前 5 条知识不需要多维 faceted navigation。
- 单选类型筛选足够：`Pattern`、`Snippet`、`Decision`、`Reference`。
- 等知识数量增长后，再评估 tags、状态、来源的多维组合。

### GitBook：Documentation Structure

参考：`https://gitbook.com/docs/guides/docs-best-practices/documentation-structure-tips`

GitBook 强调文档 IA 要减少重复、命名清晰、让不同类型内容各归其位。对本项目的启发：

- `Knowledge` 需要稳定类别和简短说明，而不是混成一个日志流。
- 入口页要解释内容边界：模式、片段、决策、引用。
- 组件词汇应少而一致，沿用现有 `FilterBar`、卡片和 tag 样式。

### Diátaxis

参考：`https://diataxis.fr/`

Diátaxis 将文档按用户需要分为 tutorial、how-to、reference、explanation。对本项目的启发：

- 本轮不照搬四象限作为页面结构。
- 可以将其作为背后的内容意图判断，帮助后续区分学习、执行、查阅和理解。
- 对公开个人知识库而言，`Reference` 先作为一种 entry kind，后续再扩展到完整 taxonomy。

### Obsidian Graph View

参考：`https://obsidian.md/help/plugins/graph`

Obsidian 图谱强调 notes、links、tags 和 local graph。对本项目的启发：

- 当前不做全局 graph。
- 先做稳定锚点、关联链接、类型筛选和可复制引用。
- 等真实连接密度足够后，再考虑 local graph 或 related trail 视觉化。

## 产品判断

### 为什么现在进入 Phase 5

第四阶段的核心交互已经有：

- Command Center。
- 当前路由上下文。
- 搜索建议和 planned page 解释。
- 状态面板。
- 可复用筛选条。

继续堆交互会稀释价值。`Knowledge` 是之前用户明确要求从 `notes` 替换而来的长期 IA，现在应该从规划状态变成真实页面。

### 为什么不做详情页

首版没有足够内容支持每条知识一个详情页。先用卡片、锚点和复制引用验证：

- 用户是否能扫读。
- 用户是否能筛选。
- 用户是否能复制到 GitHub、飞书和文档评论。
- Command Center 是否能搜索并跳转到具体知识锚点。

### 为什么加入 Copy ref

这是一个小但高价值的程序员式交互：

- 比装饰动效更有用。
- 能把知识条目变成 issue、PR、飞书评论里的稳定引用。
- 与项目追溯机制一致。

## 实现范围

- 新增 `src/data/knowledge.ts`。
- 新增 `/knowledge` 页面。
- 新增 `KnowledgeExplorer`。
- 新增 `KnowledgeCard`。
- `FilterBar` 支持知识类型筛选。
- Command Center 新增 `knowledge` 类型、图标、上下文排序和真实结果。
- sitemap 增加 `/knowledge`。

## 暂不做

- `/knowledge/[slug]` 详情页。
- 全文搜索库。
- 多选筛选。
- URL query 同步。
- 全局知识图谱。
- 后台内容管理。

## 验收标准

- `/knowledge` 首屏成立，不像空模板页。
- 初始状态显示 `5 / 5 entries`。
- 点击 `Decision` 显示 `1 / 5 entries`。
- `Copy ref` 有真实复制反馈。
- Command Center 搜索 `knowledge` 不再显示 planned 状态，而是显示真实结果。
- 桌面和移动端无横向溢出。
- `npm run lint` 和 `npm run build` 通过。

## 本地验收结果

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser 验证：页面身份、初始状态、无覆盖层和无横向溢出通过。
- Playwright 验证：点击 `Decision` 后显示 `1 / 5 entries`。
- Playwright 验证：`Copy ref` 显示 `Copied`。
- Playwright 验证：Command Center 搜索 `knowledge` 显示真实结果，不再显示 `Knowledge is planned`。
- Playwright 验证：移动端 390 x 844 无页面级横向溢出。
