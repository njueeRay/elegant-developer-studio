# 当前上下文

更新时间：2026-07-04

## 当前主线

Phase 28：Content Discovery & Command Index Scale。

Phase 27 已完成 evidence automation 与 RayNode 脚本化部署。当前主线转为：在内容继续增长前，先测量 Command Center / 内容发现层的规模边界，再决定是否懒加载 command index。

- `public/release-evidence.json` 由脚本生成，不提交进 Git。
- `ProjectEvidencePack` 渐进读取运行时 release evidence。
- `deploy:raynode` 封装 build、evidence、standalone artifact、上传、远端切换、重启和 smoke。
- `validate:release-evidence` 检查 evidence 是否缺失、过期或内容规模不一致。
- `validate:content` 拦截旧 Vercel deployment id 和临时 deployment URL。
- Phase 28 的第一步不是重构，而是测量：command item count、payload、kind 分布、首屏是否携带过多索引。

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
- 当前服务器源码提交：`d59bdaf`。
- `/release-evidence.json` 返回部署提交 `d59bdaf`，内容规模为 14 posts / 5 projects / 16 knowledge entries / 50 public routes。
- 生产公开路由可访问性测试通过：46 passed。

## 当前事实源

- `src/lib/site.ts`：主站 URL、预览 URL、仓库 URL。
- `src/lib/metadata.ts`：统一 canonical、Open Graph、Twitter card。
- `src/data/release-evidence.ts`：release evidence 类型和路径定义。
- `public/release-evidence.json`：部署时生成的运行时发布事实源。
- `scripts/write-release-evidence.mjs`：生成 release evidence。
- `scripts/validate-release-evidence.mjs`：校验 release evidence。
- `scripts/deploy-raynode.mjs`：RayNode standalone 部署脚本。
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

## 质量门禁

本地改动至少运行：

```bash
npm run validate:content
npm run release:evidence -- --local-quality-passed
npm run validate:release-evidence
npm run lint
npm run build
npx playwright test --project=chromium --grep "release evidence|command menu traps|photo lightbox traps|project case studies"
```

完整回归：

```bash
npm run test:e2e -- --workers=1
```

生产主站 smoke：

```bash
PLAYWRIGHT_BASE_URL=https://raynode.me npx playwright test --project=chromium --grep "serves|primary surfaces|command menu opens real lab route"
```

## 当前技术债触发条件

Command Center index 现在仍在 root layout 组装。当前内容量可接受，不提前重构。

触发条件：

- posts > 15，或
- knowledge entries > 25。

到达阈值后，将 command index 从 root layout 移出，改为打开 Cmd K 时懒加载 static JSON 或 `/api/command-index`。

## 下一步建议

1. 启动 Phase 28：先新增 command index 测量脚本，不先动交互。
2. 根据测量结果决定是否将 command index 改为 `/command-index.json` 或 `/api/command-index` 懒加载。
3. 同步 Feishu 当前上下文、Phase 25-27 结果。
