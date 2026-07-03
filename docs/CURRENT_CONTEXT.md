# 当前上下文

更新时间：2026-07-04

## 当前主线

Phase 26：External Proof & Content Network。

Phase 25 已完成可信度底座修复。当前主线已经从“站点说真话”转为“站点能被外部判断”：

- 增加外部化项目，而不是继续围绕本站自证。
- 增加非本站中心文章，让 Writing 解释真实产品判断。
- 增加 Knowledge 原则，使外部证据、阅读界面、agent workflow 和 case study diff 可复用。
- 首页精选优先展示外部证据更强的内容。
- 继续避免新增一级页面、宠物、粒子、全站图谱或复杂动效。

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
- 当前服务器源码提交：`9143bc0`。
- Phase 26 新增项目 `/projects/openprofile-agent-workflow` 和 `/projects/anyreader-interface-teardown` 已在 RayNode 返回 200。

## 当前事实源

- `src/lib/site.ts`：主站 URL、预览 URL、仓库 URL。
- `src/lib/metadata.ts`：统一 canonical、Open Graph、Twitter card。
- `src/data/release-evidence.ts`：发布事实源雏形。
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
npm run lint
npm run build
npx playwright test --project=chromium --grep "Phase 26|command menu traps|photo lightbox traps|project case studies"
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

1. 下一阶段优先 Phase 27：Evidence Automation & Release Discipline。
2. 将 release evidence 从手写 TypeScript 推进到脚本生成或 JSON 事实源。
3. 部署脚本应使用 `COPYFILE_DISABLE=1 tar --no-xattrs ...`，消除 macOS provenance xattr 解包噪音。
4. 观察 Command Center payload；posts > 15 或 knowledge entries > 25 时启动懒加载改造。
5. 同步 Feishu 当前上下文、Phase 25 与 Phase 26 结果。
