# 第二十一阶段 URL Query 筛选与关系校验复盘

日期：2026-06-18

## 结论

第二十一阶段把列表筛选从“页面内临时状态”推进到“可分享、可返回、可测试的路由状态”，同时新增内容关系校验脚本，防止 Blog / Knowledge / Project 之间的显式关系在后续内容增长时悄悄断裂。

上一阶段已经让 Knowledge 成为独立详情节点。随之暴露的新问题是：用户从 `/knowledge?kind=Decision` 进入详情页后，浏览器返回应该保留筛选上下文；读者复制一个筛选后的 Blog 或 Project URL，也应该看到同样的内容状态。

本阶段不新增页面，不做全文搜索，不做图谱。它解决的是内容系统的可维护性和可追溯性。

## 上阶段复盘

第二十阶段完成：

- `/knowledge/[slug]`。
- `KnowledgeTrails`。
- Blog → Knowledge 的详情页链接。
- Knowledge → Blog / Project 的显式关系。
- sitemap 和 Command Center 可达性。

优点：

- Knowledge 成为一等内容节点。
- 文章、知识、项目三层开始有清晰职责。
- 公开可达性进入测试。

遗留问题：

- 列表筛选仍是 `useState`，刷新和分享会丢失。
- 关系 slug 靠人工维护，TypeScript 和 build 不会发现断链。
- 从详情页返回索引页时，只能依赖浏览器历史，页面本身没有 URL 状态表达。

## 本阶段实现

### 1. Query filter hook

新增：

- `src/lib/use-query-filter.ts`

职责：

- 从 URL query 读取筛选状态。
- 点击筛选时写入 URL query。
- `All` 状态不写 query，保持 URL 干净。
- 遇到非法 query 时自动清理回默认状态。
- 保留同页其它 query 参数，例如 Blog 的 `tag` 与 `language` 可以共存。

接入页面：

- `/blog`
  - `tag`
  - `language`
- `/projects`
  - `stack`
- `/knowledge`
  - `kind`

### 2. Suspense boundary

由于 `useSearchParams` 会影响 App Router 静态预渲染，三个页面都为 Explorer 增加了局部 Suspense：

- `src/app/blog/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/knowledge/page.tsx`

判断：

- Header、SEO 和主页面骨架仍保持静态。
- 只有依赖 query 的 Explorer 进入客户端边界。
- 这比把整个页面变成客户端组件更克制。

### 3. 内容关系校验脚本

新增：

- `scripts/validate-content-relations.mjs`
- `npm run validate:content`

校验范围：

- Post 的 `relatedPostSlugs` 必须存在。
- Post 的 `relatedKnowledgeSlugs` 必须存在。
- Post 的 `relatedProjectSlugs` 必须存在。
- Knowledge 的 `relatedPostSlugs` 必须存在。
- Knowledge 的 `relatedProjectSlugs` 必须存在。
- Knowledge 的 related / backlinks 内部链接必须指向真实公开路由。
- Project 的内部 `href` 必须指向真实公开路由。

本脚本不引入依赖，直接读取现有 MDX meta 和 Knowledge 数据。它不是完美 AST，但当前内容规模下足够可靠，且已经在第一次运行时暴露出脚本自身的数组起点误判并修复。

### 4. e2e 覆盖

新增或增强：

- 点击 Blog tag 后 URL 更新。
- 点击 Blog language 后 URL 更新。
- 直接打开 `/blog?tag=Product+Systems&language=中文`，筛选状态正确。
- 直接打开 `/projects?stack=GitHub`，筛选状态正确。
- 直接打开 `/knowledge?kind=Decision`，筛选状态正确。
- 从 Knowledge 筛选列表进入详情，再用浏览器返回，query 状态保留。

## 专家审查

### 优点

1. 列表状态终于成为产品状态

筛选不再只是 React 内存里的 UI 状态，而是 URL 的一部分。用户可以复制、刷新、返回，状态仍然成立。

2. 没有扩大复杂度

没有引入 Zustand、Redux、搜索库或路由状态框架。当前站点只需要一个小 hook。

3. App Router 边界更正确

`useSearchParams` 被限制在 Explorer 内，页面主体仍保持静态生成。

4. 内容关系开始可被机器审查

后续新增文章或 Knowledge 时，如果 slug 拼错，`validate:content` 会失败。这是内容系统从手工维护走向工程化的关键一步。

### 缺点

1. 校验脚本不是完整 TS/MDX AST parser

它采用受控文本提取和 VM 解析对象字面量。当前内容格式稳定时可靠，但如果 meta 变成动态表达式，脚本需要升级。

优先级：P1。

2. Query 参数命名还没有统一文档化到 IA

现在实现里已经稳定，但信息架构文档还需要单独补 URL 参数约定。

优先级：P1。

3. Uses、Photos、Lab 的筛选还没有 query 化

本阶段只做 Blog / Projects / Knowledge，因为它们是内容系统主干。剩余筛选页面后续可以逐步接入。

优先级：P2。

4. Command Center 还不能生成带 query 的快捷结果

例如 “中文博客” 还不能直接从命令菜单打开 `/blog?language=中文`。

优先级：P2。

## 下一阶段规划

Phase 22 建议进入内容深度与 URL IA 文档化：

1. 在 `INFORMATION_ARCHITECTURE.md` 增加 URL query 约定。
2. 将 `validate:content` 纳入常规验证清单。
3. 为每条 Knowledge 补更具体的短正文，减少通用模板文案。
4. 在 Command Center 增加少量高价值 query 快捷入口：
   - 中文博客。
   - Product Systems 文章。
   - Decision Knowledge。
   - GitHub-backed projects。

暂不做：

- 全文搜索库。
- 全局知识图谱。
- 后台 CMS。
- 复杂多选 facets。

## 验收

已通过：

- `npm run validate:content`
- `npm run lint`
- `npm run build`
- targeted e2e：8 passed。
- `npm run test:e2e`：102 passed。
- 本地生产模式渲染检查：
  - `/blog?tag=Product+Systems&language=中文` desktop：无横向溢出，两个筛选 active，只显示中文文章。
  - `/knowledge?kind=Decision` mobile：无横向溢出，Decision 筛选 active，只显示 Decision 条目。
  - console error/warning：无相关错误。
- 截图：
  - `/tmp/phase21-blog-query-desktop.png`
  - `/tmp/phase21-knowledge-query-mobile.png`

待最终阶段收口：

- Vercel 部署。
- Production e2e。
- 飞书知识库同步。
