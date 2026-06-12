# 第四阶段上下文搜索调研

日期：2026-06-13

## 结论

这一片的目标不是“做一个搜索引擎”，而是让 Command Center 更像一个懂当前上下文的工作室入口。

判断依据：

- 当前内容量小，搜索召回不是瓶颈。
- 用户主要需要快速抵达文章、项目、照片、音乐和联系入口。
- `/knowledge`、`/lab`、`/uses`、`/about` 仍在后续阶段，搜索这些词时应该解释规划状态，而不是给用户一个死胡同。
- 程序员风格应该体现在命令系统、上下文意识、键盘效率和可恢复路径，而不是终端装饰。

## 外部调研

### Raycast

参考：`https://manual.raycast.com/command-aliases-and-hotkeys`

Raycast 的核心价值不是结果多，而是让常用命令能通过别名、热键和 Root Search 快速抵达。对本项目的启发：

- Command Center 应优先承接动作和路由。
- 用户输入不是单纯检索内容，也是在表达意图。
- 未来可以加入 alias，例如 `w` 打开 writing、`m` 打开 music、`p` 打开 projects。

### Algolia Query Suggestions

参考：`https://algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/query-suggestions/js`

Algolia 的 Query Suggestions 强调：建议词可以减少输入成本，并降低用户走进无结果页面的概率。对本项目的启发：

- 无结果不能只显示空文本。
- 建议词必须指向站内真实可用区域。
- 站点内容少时，建议词比复杂搜索权重更有价值。

### Algolia No Results

参考：`https://www.algolia.com/blog/ux/3-examples-to-help-you-transform-the-no-results-search-results-page`

No results 页面不应该是死路。对本项目的启发：

- 空状态要提供下一步。
- 可以用同义词、建议词和可替代路径恢复。
- 当前阶段先用静态高质量建议，不做 analytics-driven synonym library。

### NN/g Empty States

参考：

- `https://www.nngroup.com/articles/empty-state-interface-design/`
- `https://www.nngroup.com/articles/search-no-results-serp/`

NN/g 的核心建议是：空状态要说明系统状态、提供学习线索和直接路径。对本项目的启发：

- `uses` 没有结果时，要明确说它属于后续阶段。
- 空状态不应该责怪用户，也不应该只显示“Nothing found”。
- 搜索失败后应给出可点的恢复建议。

### Carbon Empty States

参考：`https://carbondesignsystem.com/patterns/empty-states-pattern/`

Carbon 把 empty state 视为产品状态的一部分，不是临时文案。对本项目的启发：

- Command Center 的空状态也应是组件资产。
- 空状态需要标题、说明和后续动作。
- 后续可抽象为 `CommandEmptyState` 或 `SearchRecovery`。

## 本阶段设计原则

1. 当前页面优先。
   - `/blog` 默认提升写作。
   - `/projects` 默认提升项目。
   - `/photos` 默认提升照片。
   - `/music` 默认提升音乐。

2. 最近访问不能吞掉上下文。
   - 如果当前页面主类型已经在 `Recent` 中，也要保留对应上下文分组。

3. 规划路由必须可解释。
   - `knowledge`：公开知识库属于 Phase 5。
   - `lab`：组件实验室属于交互层稳定后的 Portfolio OS。
   - `uses`：工具与工作流属于 Portfolio OS。
   - `about`：经历与简历页属于 Phase 5。

4. 空状态必须可恢复。
   - 提供 `projects`、`writing`、`photos`、`music` 等建议词。
   - 点击建议词直接替换查询并展示结果。

5. 不引入完整搜索库。
   - 当前内容规模不需要 Fuse、FlexSearch 或远程搜索服务。
   - 等文章、项目、照片、knowledge 数量明显增长后再评估。

## 实现范围

- `GlobalCommandMenu` 增加当前路由感知。
- 查询评分增加 context boost。
- 默认分组增加 `Writing context`、`Project context`、`Photo context`、`Music context`、`Studio context`。
- 搜索规划页面时显示 planned note。
- 无结果时显示解释和建议词按钮。
- 修复无结果时 `listbox` 语义，避免没有 option 的容器仍声明为 listbox。
- 保证移动端 390px 宽度不溢出。

## 验收结果

本地验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- 桌面 `/blog/interface-is-a-promise`：`Cmd K` 后显示 `Writing context`，无横向溢出。
- 搜索 `knowledge`：显示 `Studio Knowledge Base` 项目，同时显示 `Knowledge is planned` 提示。
- 搜索 `uses`：无结果状态说明 `Uses is planned`，并显示 `projects`、`writing`、`photos`、`music` 建议词。
- 点击 `writing` 建议词：查询恢复到 `writing`，出现可打开结果。
- 移动端 `/music` 390 x 844：默认显示 `Music context`，无横向溢出，弹层底部在视口内。

## 暂不做

- 全站全文索引。
- 拼写纠错。
- alias 管理 UI。
- command history 管理。
- 多级 action panel。

## 下一步建议

第四阶段下一片应进入 `StatusPanel` 和 `FilterBar`：

- 首页或 Command Center 内增加小型状态面板：最近在写、最近在做、最近在听。
- `/blog` 和 `/projects` 的标签筛选可以统一抽象为 `FilterBar`。
- 搜索仍保持本地轻量，先不引入外部服务。
