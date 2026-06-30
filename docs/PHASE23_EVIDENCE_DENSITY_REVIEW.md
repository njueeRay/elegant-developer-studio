# 第二十三阶段 内容证据密度增强

日期：2026-07-01

## 上一阶段复盘

第二十二阶段把 URL query、Command Center 快捷入口和 Knowledge 详情正文补成了公开产品能力。

已完成价值：

- 用户可以直接打开 `/blog?language=中文`、`/knowledge?kind=Decision` 等带状态页面。
- Command Center 可以打开精选 query 状态，而不是只能打开列表页。
- Knowledge 详情页有了 `protects` 和 `citation`，不再只是放大的卡片。
- 内容校验从关系完整性扩展到 Knowledge 正文完整性。

暴露的问题：

- 项目详情虽然有 Case Study Diff，但证据仍偏叙事，用户需要自己判断哪里能验证。
- Knowledge `Copy ref` 只复制裸 URL，不适合直接粘贴到 GitHub、飞书或 PR 说明中。
- 项目 metadata 没有结构化证据字段，后续新增项目容易继续写成“看起来像证明”的文案。

## 本阶段目标

把项目详情从“有叙事的 case study”推进到“有可检查证据的 case study”，并把 Knowledge 引用变成可直接复用的 Markdown 片段。

## 完成内容

- `ProjectMeta` 新增 `evidencePack`。
- 两个项目都补齐结构化证据：
  - Lumen：Component source、Production surface、Regression suite。
  - Studio Knowledge Base：Feishu knowledge base、Sync map、Version trace。
- `/projects/[slug]` 新增 `Evidence Pack` 区块，证据卡直接链接到 GitHub、Vercel 或飞书。
- `validate:content` 增加 Project Evidence Pack 完整性校验。
- `KnowledgeCard` 的 `Copy ref` 改为复制 Markdown link：
  - `[Title](https://.../knowledge/slug) - summary`
- e2e 覆盖 Evidence Pack 可见性、证据链接、Markdown ref 复制结果和移动端路径。
- 修复本机 Playwright 浏览器缓存缺失，重新安装 Chromium cache 后完成测试。

## 产品判断

作品集的可信度不来自更大的图片，而来自可检查证据。

`Case Study Diff` 负责解释变化，`Evidence Pack` 负责给出外部可访问的证据。两者职责不同：前者是叙事，后者是证明。

Knowledge 引用应该服务真实协作。

裸 URL 能访问，但在飞书评论、GitHub issue 和 PR 描述中不够可读。Markdown link 同时保留标题、地址和摘要，更适合成为讨论里的最小引用单位。

## 专家审查

优点：

- 项目详情页的“证明”更具体，用户不必从正文里猜证据在哪里。
- Project metadata 的证据结构可复用，后续项目不会继续靠散文表达证明。
- Knowledge ref 更贴近真实协作场景，可以直接粘贴到云端文档和 GitHub 线程。
- 校验脚本继续从路由关系扩展到内容质量底线。

缺点：

- Evidence Pack 目前仍以链接和文字为主，还没有截图、PR diff、commit hash、指标图这些更强证据。
- 证据卡还没有分类筛选或时间线，但当前项目数量太少，暂时不值得复杂化。
- Markdown ref 只覆盖 KnowledgeCard 列表页，Knowledge detail 页还可以继续增强复制格式。

## 下一阶段建议

Phase 24：项目证据对象升级。

优先级：

1. 为 Evidence Pack 增加可选 `commit`、`deploymentId`、`screenshot`、`metric` 字段。
2. 在项目详情页展示更硬的证据形态：commit permalink、Vercel deployment、截图前后对比。
3. 为 Knowledge detail 页增加同样的 Markdown 引用复制能力。
4. 增加一篇中文项目复盘文章，把 Evidence Pack 的方法论写成真实项目故事。

暂不做：

- 项目后台管理。
- 全量证据时间线。
- 数据可视化仪表盘。
- AI 搜索或自动摘要。

## 验证记录

- 修复本机 Playwright 浏览器缓存缺失：`npx playwright install chromium`。
- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：4 passed。
- `npm run test:e2e`：104 passed。
- Browser QA：`/projects/lumen#project-evidence-title` 桌面与 390px 移动端均无横向溢出，Evidence Pack 可见，console 无相关 warning/error。
- Clipboard e2e：`KnowledgeCard` 复制结果包含 Markdown link 和 `/knowledge/filters-before-search`。
