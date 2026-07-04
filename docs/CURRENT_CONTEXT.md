# 当前上下文

更新时间：2026-07-04

## 当前主线

Phase 31：Visual System Polish Without Adding Surfaces 已完成并部署到 RayNode。

Phase 31 不新增页面，只处理视觉系统里真实影响用户体验的细节：移动端 RayNode 状态 badge、Command Center 小屏高度与滚动、阅读详情页全局 cursor 光场降噪。当前主线可以转入 Phase 32：Content Density & Studio Pulse Restraint。

- `public/release-evidence.json` 由脚本生成，不提交进 Git。
- `ProjectEvidencePack` 渐进读取运行时 release evidence。
- `deploy:raynode` 封装 build、evidence、standalone artifact、上传、远端切换、重启和 smoke。
- `validate:release-evidence` 检查 evidence 是否缺失、过期或内容规模不一致。
- `validate:content` 拦截旧 Vercel deployment id 和临时 deployment URL。
- `src/lib/command-index.ts` 是 Command Center 索引事实源。
- `/command-index.json` 是 Command Center 按需加载的公开索引 payload。
- `scripts/report-command-index.mjs` 输出 command item count、kind 分布和 payload 估算。
- `src/data/writing.ts` 是写作线、intent 词表、intent → track 映射和引用语境事实源。
- `/health.json` 是公开轻量健康端点。
- `scripts/verify-raynode.mjs` 是 RayNode HTTP health 检查脚本。
- `AmbientCursorField` 在首页等探索页保留 cursor 光场，在 `/blog/[slug]` 和 `/knowledge/[slug]` 自动进入 reading surface，避免与 Reading Focus Lens 抢注意力。

## 线上状态

- 主站：`https://raynode.me`
- 预览/备用：`https://elegant-developer-studio.vercel.app`
- GitHub：`https://github.com/njueeRay/elegant-developer-studio`
- Feishu Wiki：`https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

RayNode 当前状态：

- SSH 可用。
- `elegant-developer-studio` systemd service 为 active。
- Caddy 为 active。
- `https://raynode.me/` 返回 200。
- 当前服务器源码提交：`f86b134`。
- `/release-evidence.json` 返回部署提交 `f86b134`，内容规模为 14 posts / 5 projects / 16 knowledge entries / 52 public routes。
- `/health.json` 返回 `status: ok`。
- `/command-index.json` 返回 110 command items。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：53/53 passed。
- 生产公开路由可访问性测试通过：48 passed。
- Phase 31 production targeted interaction tests：2 passed。

## 当前事实源

- `src/lib/site.ts`：主站 URL、预览 URL、仓库 URL。
- `src/lib/metadata.ts`：统一 canonical、Open Graph、Twitter card。
- `src/data/release-evidence.ts`：release evidence 类型和路径定义。
- `public/release-evidence.json`：部署时生成的运行时发布事实源。
- `scripts/write-release-evidence.mjs`：生成 release evidence。
- `scripts/validate-release-evidence.mjs`：校验 release evidence。
- `scripts/deploy-raynode.mjs`：RayNode standalone 部署脚本。
- `src/lib/command-index.ts`：Command Center 索引构建器。
- `src/app/command-index.json/route.ts`：Command Center 懒加载 JSON endpoint。
- `scripts/report-command-index.mjs`：Command index 规模报告。
- `src/data/writing.ts`：Writing tracks、受控 intent 和 citation guide。
- `src/app/health.json/route.ts`：公开健康端点。
- `scripts/verify-raynode.mjs`：RayNode health CLI。
- `ops/raynode-runbook.md`：部署、健康检查、回滚和故障定位手册。
- `ops/raynode-systemd.service`：systemd 模板。
- `ops/Caddyfile.raynode.example`：Caddy 模板。
- `docs/AUDIT_ACTION_TODO_2026_07_03.md`：Phase 25 P0-P3 执行队列。
- `docs/PROJECT_MAP.md`：产品表面、阶段、目录和质量门禁地图。
- `docs/ROADMAP.md`：阶段路线。
- `docs/PROGRESS_LOG.md`：阶段进度。
- `docs/VERSION_TRACE.md`：提交、部署和验证追溯。

## 已完成的 Phase 26 切片

- 新增外部项目 `OpenProfile Agent Workflow`。
- 新增产品拆解项目 `AnyReader Interface Teardown`。
- 新增 4 篇非本站中心文章：
  - `外部证据比作品集叙事更重要`
  - `AnyReader 深度阅读界面拆解`
  - `OpenProfile as Agentic Profile Infrastructure`
  - `Case Study Diff as a Portfolio Format`
- 新增 6 条 Knowledge：
  - `外部证据优先于自指叙事`
  - `项目证据最低标准`
  - `Socratic reading surfaces`
  - `Selection anchors are product state`
  - `Agent team as product surface`
  - `Case study diff format`
- 首页 Featured essay 指向外部证据文章。
- 首页 Selected work 指向 `OpenProfile Agent Workflow`。
- e2e 增加 Phase 26 外部证据网络可达性检查。
- `npm run validate:content` 通过，内容规模为 14 posts / 5 projects / 16 knowledge entries。
- 已部署到 RayNode，production smoke e2e 48 passed。

## 已完成的 Phase 27 切片

- 新增 `npm run release:evidence`。
- 新增 `npm run validate:release-evidence`。
- 新增 `npm run deploy:raynode`。
- `public/release-evidence.json` 加入 `.gitignore`，由部署时生成。
- CI 增加 release evidence 生成与校验。
- Lumen / Studio Knowledge Base 项目详情可读取生成证据。
- e2e 覆盖 `/release-evidence.json` 和 Lumen 的 generated release evidence card。
- 内容校验拦截旧 Vercel deployment id 和临时 deployment URL。
- 部署 artifact 使用 `COPYFILE_DISABLE=1 tar --no-xattrs ...`。
- 已部署到 RayNode，部署源码提交为 `d59bdaf`。
- 生产定向 smoke 2 passed，生产公开路由可访问性 46 passed。

## 已完成的 Phase 28 切片

- `getCommandItems()` 从 root layout 拆到 `src/lib/command-index.ts`。
- 新增 `/command-index.json`，Command Center 首次打开时按需加载索引。
- `GlobalCommandMenu` 增加 loading、error 和 retry 状态。
- 搜索排序增加 External proof、Writing、Projects、Knowledge 的 top-level intent boost。
- 新增 `npm run report:command-index`。
- 当前 command index：110 items，35,413 bytes JSON，10,413 bytes gzip。
- 首页初始 HTML 不再携带 `action-writing-product-systems` / `command-result-action-lab` 等完整索引标记。
- 完整本地 e2e：178 passed。
- 已部署到 RayNode，部署源码提交为 `304c090`。
- 生产定向 smoke 6 passed，生产公开路由可访问性 47 passed。

## 已完成的 Phase 29 切片

- 新增 `src/data/writing.ts`。
- 定义 4 条长期写作线：产品判断、设计工程、部署与自动化、AI 协作。
- `/blog` 新增 Writing tracks 面板和 `track` query 筛选。
- `PostCard` 显示写作线 + intent。
- 文章详情页新增 `Reading quality context`。
- 中文文章显示“适合引用到哪里”：飞书阶段复盘、GitHub issue、PR 说明、路线图审查。
- 英文文章显示 Technical context：Source notes、Component decisions、API / route contracts、Implementation review。
- `RelatedReading` 根据当前文章 track / language 重排相关文章，并显示路径理由。
- `validate:content` 增加 writing intent、language、citation guide、related trails 和 writing track 校验。
- targeted e2e：6 passed。
- 完整本地 e2e：180 passed。
- 已部署到 RayNode，部署源码提交为 `f0ff534`。
- production targeted smoke：3 passed。
- production public route smoke：47 passed。

## 已完成的 Phase 25 切片

- RayNode 部署恢复确认。
- `raynode.me` 成为默认 `SITE_URL`。
- sitemap、robots、RSS、layout metadata 接入统一事实源。
- 动态文章、项目、Knowledge 详情页接入 canonical / OG helper。
- 首页移除伪实时 latest commit，改为 RayNode release channel。
- Lumen Evidence Pack 移除旧 Vercel deployment id 和硬编码 e2e 数字。
- `validate:content` 阻止 evidence metric 手写易腐烂测试数量。
- README 和 GitHub issue contact links 切到 RayNode 主站。
- 新增 GitHub Actions 最小质量门禁。
- Command Center 和 Photo lightbox 增加 focus trap / focus restore。
- 新增 6 篇文章、1 个非本站项目 case study、4 条 Knowledge。
- README 文档入口收敛。
- RayNode 已部署 `cb968a4`。
- 主站 smoke e2e 37 passed。

## 当前内容规模

- Posts：14。
- Projects：5。
- Knowledge entries：16。
- Public routes：52，包含 `/health.json`。

## 已完成的 Phase 32 切片

- Studio Pulse 完成 compact mode：桌面 2 列、平板 2 列、手机 1 列。
- 状态卡降低默认密度：更短摘要、更小 icon、更少装饰、更紧凑 badge。
- 卡片中重复 command 文本已移除，保留 compact `DataSourceBadge` command chip。
- `DataSourceBadge` 增加 `title`，视觉压缩后仍可追溯 source / route / command。
- Ask Me Terminal prompt row 改为横向滚动，移动端不再因按钮换行挤压响应区。
- Ask Me response 文案缩短，保留 Personal OS 和 trace loop 判断。
- `CodeBlock` 复制反馈修复：点击时从 DOM 读取代码，失败时显示 `Copy failed`。
- e2e 长串页面巡检拆分为单页契约，source reveal 和 Phase 25/26 public assets 失败时可定位具体页面。
- implementation commit：`018bab2`。
- RayNode 已部署 `b767bd9`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 53/53，`raynode:smoke` 48/48，Phase 32 targeted production tests 4/4。

## 已完成的 Phase 31 切片

- 首页 RayNode 状态 badge 拆成主状态 `Live on RayNode` 和工程细节 `Next.js standalone / Caddy`，移动端更短、更稳。
- `AmbientCursorField` 接入 pathname 判断，阅读详情页设置 `data-cursor-surface="reading"`，不再激活全站 cursor 光场。
- 阅读页 `reader-spotlight` 在 reading surface 下进一步降噪。
- Command Center 移动端弹层明确约束 top padding、结果区高度、footer 换行和输入 placeholder。
- 新增 e2e：阅读详情页不激活全局 cursor、移动端 Command Center 保持在 viewport 内。
- 本地截图 QA：`/tmp/phase31-after-home-mobile.png`、`/tmp/phase31-after-command-mobile-2.png`、`/tmp/phase31-after-article-mobile.png`。
- 本地完整 e2e：184 passed。
- 已部署到 RayNode，部署源码提交为 `f86b134`。
- production targeted interaction tests：2 passed。
- production route smoke：48 passed。

## 质量门禁

本地改动至少运行：

```bash
npm run validate:content
npm run report:command-index
npm run release:evidence -- --local-quality-passed
npm run validate:release-evidence
npm run lint
npm run build
npx playwright test --project=chromium --grep "command index|release evidence|health|command menu traps|photo lightbox traps|project case studies"
```

完整回归建议按项目分片执行：

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/site-access.spec.ts --project=chromium --workers=1
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/site-access.spec.ts --project=mobile-chrome --workers=1
```

说明：Phase 32 本地一次未分片长跑出现过 `ERR_NETWORK_IO_SUSPENDED`、browser launch timeout 和 `newPage` timeout；拆分为 project 后，`chromium` 107/107、`mobile-chrome` 107/107 均通过。后续不要把本机长跑资源异常误判为页面业务失败。

生产主站 smoke：

```bash
npm run raynode:health
npm run raynode:smoke
```

## 当前技术债触发条件

Command Center index 已经从 root layout 移出。当前规模适合按需加载 JSON，暂不需要服务端搜索。

触发条件：

- posts > 15，或
- knowledge entries > 25。

到达阈值后，评估是否从 `/command-index.json` 升级为 `/api/command-index` 或服务端搜索。

## 下一步建议

1. 启动 Phase 33：Content Performance & Test Sharding Discipline。
2. 把本地质量门禁固化为桌面、移动、生产 smoke、release evidence 的可复现分片。
3. 审查 MDX 静态导入和 dev server 长尾，但只修稳定复现的真实瓶颈。
