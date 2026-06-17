# 第二十二阶段 URL IA 与命令快捷入口

日期：2026-06-18

## 上一阶段复盘

第二十一阶段解决了一个关键基础问题：筛选状态不再只是页面内的临时状态，而是进入 URL。

已完成价值：

- `/blog?tag=&language=` 可以表达写作主题和语言状态。
- `/projects?stack=` 可以表达项目技术栈状态。
- `/knowledge?kind=` 可以表达知识类型状态。
- 浏览器刷新和返回能保留用户所处的内容视图。
- `validate:content` 开始把内容关系纳入自动校验。

暴露的问题：

- query 参数还没有写入信息架构文档，属于“代码已经支持，但产品承诺不够清晰”。
- Command Center 只能打开列表或详情，不能打开一些高价值的筛选视图。
- Knowledge 详情页虽然可访问，但 `What it protects` 和 `How to cite it` 仍是通用模板，引用价值不足。
- 内容关系校验还没有约束 Knowledge 详情正文完整性。

## 本阶段目标

把 query-backed content views 变成正式信息架构能力，并让 Knowledge 详情页真正成为可引用的知识节点。

## 完成内容

- `INFORMATION_ARCHITECTURE.md` 新增 URL Query 约定。
- Command Center 新增 4 个精选 query 快捷入口：
  - `Open Chinese writing`：`/blog?language=中文`
  - `Open Product Systems essays`：`/blog?tag=Product+Systems`
  - `Open Decision knowledge`：`/knowledge?kind=Decision`
  - `Open GitHub-backed projects`：`/projects?stack=GitHub`
- `KnowledgeEntry` 新增 `protects` 和 `citation`。
- `/knowledge/[slug]` 使用每条知识自己的 `protects` 和 `citation`，不再使用通用模板说明。
- `npm run validate:content` 增加 Knowledge 正文完整性校验。
- e2e 覆盖 Command Center 打开 query 视图，并断言 active filter 与 command trace。

## 产品判断

query 是产品状态，不是实现细节。

一个用户能把 `/blog?language=中文` 发给别人，并预期对方看到同一类内容，这就是公开产品承诺。它必须被 IA 文档、Command Center、测试和内容校验共同保护。

Command Center 不应该承载所有筛选组合。

如果把全部 tags、stacks、kinds 都变成命令，命令中心会退化成第二套筛选器。当前只保留 4 个高价值入口，分别覆盖语言、主题、知识类型和项目证据来源。

Knowledge 详情页不能只是一张放大的卡片。

详情页必须回答两个问题：

- 这条规则保护什么？
- 在什么语境下引用它？

没有这两个字段，详情页只是路由层面的形式主义。

## 专家审查

优点：

- 当前站点的信息架构已经从“页面集合”进化为“可分享状态集合”。
- Command Center 开始能表达真实任务：不是只打开 `/blog`，而是打开“中文写作”这种更接近用户意图的视图。
- Knowledge 详情页更像长期决策库，能服务 GitHub、飞书和 PR 讨论。
- 校验脚本开始从链接完整性扩展到内容完整性。

缺点：

- 目前 query 仍是单选模型，未来内容量变大后可能不够。
- 命令入口还没有 preview，用户打开前只能通过标题和描述判断。
- Knowledge 详情仍是短正文，不是完整文章；它适合引用，不适合深度阅读。
- 项目详情的证据密度仍不足，很多 proof 还是叙事多于真实 commit、PR、截图或指标。

## 下一阶段建议

Phase 23：内容证据密度增强。

优先级：

1. 为项目详情补更真实的证据对象：commit、PR、截图、部署链接、前后变化。
2. 为 Knowledge 的 `Copy ref` 增加更适合飞书和 GitHub 的 Markdown link 格式。
3. 为 Command Center 结果增加轻量 preview 或 secondary meta，但暂不做复杂 action panel。
4. 增加一篇中文项目复盘文章，把“产品判断 → 实现 → 验证 → 部署”串成真实案例。

暂不做：

- 全文搜索库。
- 全局 graph。
- 全量 query 命令生成。
- 后台 CMS。
