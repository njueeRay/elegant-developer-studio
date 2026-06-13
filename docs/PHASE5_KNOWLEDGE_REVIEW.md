# 第五阶段 Knowledge 首个切片复盘

## 结论

`/knowledge` 首版达到了进入第五阶段的目的：它把之前规划中的 `Knowledge` IA 变成了真实公共页面，并验证了稳定引用、类型筛选和 Command Center 集成。

下一步不应该立刻做图谱或全文搜索。更好的推进顺序是先扩展个人工作室 OS 的另一个真实表面：`/uses`。

## 已完成内容

- 新增 `/knowledge` 公开知识索引。
- 新增 `src/data/knowledge.ts`。
- 新增 `KnowledgeExplorer` 和 `KnowledgeCard`。
- 复用 `FilterBar` 做知识类型筛选。
- 每条知识支持稳定 slug、锚点和 `Copy ref`。
- Command Center 新增真实 Knowledge 结果和 `Knowledge context`。
- 移除 `Knowledge is planned`。
- sitemap 收录 `/knowledge`。

## 有效判断

1. `Knowledge` 不是 `notes` 的改名。
   - `notes` 容易变成松散记录。
   - `Knowledge` 更适合作为长期公共信息架构。

2. 首版索引比详情页更重要。
   - 当前只有 5 条内容。
   - 详情页会制造空壳。
   - 索引页能先验证分类、信息气味和引用方式。

3. `Copy ref` 是高价值小交互。
   - 它能直接服务 GitHub issue、飞书评论、PR 说明和文档引用。
   - 这种程序员风格比装饰性动效更有长期价值。

## 暴露的问题

- 初始提交漏暂存了 `src/components/global-command-menu.tsx`，后续用 `ca2df2f` 补齐。
- 本地 QA 使用 `127.0.0.1` 时触发 Next 16 dev resource cross-origin 限制，改用 `localhost:3000` 后通过。
- in-app Browser 某些 CDP 点击和截图动作超时，已记录并用本地 Playwright 补充验证。

## 验证

- `npm run lint`：通过。
- `npm run build`：通过。
- `/knowledge` 初始显示 `5 / 5 entries`。
- 点击 `Decision` 后显示 `1 / 5 entries`。
- 点击 `Copy ref` 后显示 `Copied`。
- Command Center 搜索 `knowledge` 不再显示 planned 状态。
- 移动端 390 x 844 无页面级横向溢出。
- 线上 `/knowledge` 返回 `200 OK`。

## 下一步判断

进入 `/uses`，原因：

- `/uses` 是个人主页常见但容易做俗的页面，适合验证工作室 OS 是否能表达工具、节奏和工作流。
- 它能自然承接用户想要的“程序员技术风格”和“组件巧思”。
- 它比 `/lab` 更接近真实个人表达；`/lab` 可以等组件库存更丰富后再做。

