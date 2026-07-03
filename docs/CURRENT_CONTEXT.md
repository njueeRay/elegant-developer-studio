# 当前上下文

更新时间：2026-07-03

## 当前主线

Phase 25：Truth Source & Public Trust。

本阶段不继续扩新页面表面，优先修复可信度底座：

- RayNode 主站事实源。
- 证据一致性。
- 首页假状态和过期文案。
- 最小 CI。
- Command Center 与 Photo lightbox 的 modal 焦点契约。
- 真实内容资产。
- 文档入口收敛。

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

## 当前事实源

- `src/lib/site.ts`：主站 URL、预览 URL、仓库 URL。
- `src/lib/metadata.ts`：统一 canonical、Open Graph、Twitter card。
- `src/data/release-evidence.ts`：发布事实源雏形。
- `docs/AUDIT_ACTION_TODO_2026_07_03.md`：Phase 25 P0-P3 执行队列。
- `docs/PROJECT_MAP.md`：产品表面、阶段、目录和质量门禁地图。
- `docs/ROADMAP.md`：阶段路线。
- `docs/PROGRESS_LOG.md`：阶段进度。
- `docs/VERSION_TRACE.md`：提交、部署和验证追溯。

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

- Posts：10。
- Projects：3。
- Knowledge entries：10。

## 质量门禁

本地改动至少运行：

```bash
npm run validate:content
npm run lint
npm run build
npx playwright test --project=chromium --grep "Phase 25|command menu traps|photo lightbox traps|project case studies"
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

1. 同步 Feishu 当前上下文和 Phase 25 结果。
2. 下一轮优先继续生产真实内容，而不是扩新页面表面。
3. 观察 Command Center payload；posts > 15 或 knowledge entries > 25 时启动懒加载改造。
