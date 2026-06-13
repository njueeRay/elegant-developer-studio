# 第六阶段复盘：可达性与交互契约

日期：2026-06-13

## 完成内容

- 修复首页品牌链接：`#` 改为 `/`。
- 修复首页 `Media` 锚点：媒体卡新增 `id="media"`。
- 替换占位社交链接：只保留真实 repo、issues、About contact。
- 替换占位邮箱：Contact 指向 `/about#contact`，About contact 指向真实 GitHub Issues。
- Command Center 的 Contact 结果改为站内联系区。
- Knowledge 相关链接中的 Contact 改为 `/about#contact`。
- 新增共享剪贴板工具：`src/lib/clipboard.ts`。
- `CodeBlock`、Knowledge、Uses、About、Lab 复制逻辑统一到共享工具。
- 给命令面板、筛选器、复制按钮和首页命令入口增加稳定 `data-testid`。
- 新增 Playwright e2e 配置与全站交互测试。
- 新增 `test:e2e` 脚本和 `@playwright/test`。

## 验证结果

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：52 passed。
- e2e 覆盖：
  - 17 个公开路由。
  - 桌面 Chrome。
  - 移动 Chrome。
  - 首页不暴露占位链接。
  - `#media` 真实存在。
  - Command Center 搜索 `lab` 后真实跳转 `/lab`。
  - Blog 筛选 `Systems`。
  - 文章代码复制反馈。
  - Knowledge 引用复制反馈。
  - Uses stack 复制反馈。
  - About intro 复制反馈。
  - Lab import 复制反馈。
  - Music play/next 状态切换。

## 视觉复核

截图：

- `/tmp/phase-access-prod-home-desktop.png`
- `/tmp/phase-access-prod-home-mobile.png`
- `/tmp/phase-access-prod-about-contact.png`

结论：

- 首页桌面首屏气质保持稳定。
- 移动端首屏仍然成立。
- 社交区从 `GitHub / X / LinkedIn / Email` 收敛为 `GitHub / Issues / About` 后，信息更真实，但两个代码图标视觉略重复；后续可以为 Issues 换更明确的图标。
- About contact 的深色 band 没有溢出，联系入口语义明确。

## 剩余问题

- 暂未新增完整 `/contact` 页面。
- GitHub Issues 是真实可达的项目讨论入口，但不是最终个人联系方案。
- `CodeBlock` 复制 fallback 已统一，但仍依赖浏览器允许 `execCommand("copy")`。
- Playwright 覆盖了主路径，还未覆盖所有键盘导航细节。
- npm audit 仍提示 2 个 moderate vulnerability，本阶段未做破坏性修复。

## 下一步建议

1. 部署本阶段修复，确认生产环境和本地 e2e 一致。
2. 若要公开分享站点，补真实个人联系渠道或 `/contact` 页面。
3. 为 `Issues` 增加更明确的图标或文字，避免移动端两个代码图标重复。
4. 将 e2e 纳入每次阶段完成的固定质量门禁。
5. 下一功能阶段可以进入 `ComponentPreview` 或 `Knowledge` URL query 筛选，但必须先保持 e2e 绿色。

