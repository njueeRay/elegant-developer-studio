# 第六阶段调研：可达性与交互契约

日期：2026-06-13

## 阶段背景

全站审计确认当前版本页面结构已经完整，但存在一类更危险的问题：界面呈现了入口，用户点击后却可能无法到达真实目标。第六阶段不新增大页面，而是修复链接承诺、复制反馈和测试契约，让后续功能迭代建立在可验证基础上。

## 调研基准

### W3C WCAG 2.2

要点：

- 内容需要可操作、可理解。
- 链接目的和交互控件必须对用户清晰。
- 键盘路径和可访问名称不能依赖视觉猜测。

落地：

- 去掉指向平台首页的社交链接。
- 去掉未知邮箱 `mailto`。
- 修复 `#media` 无目标锚点。
- 给核心交互提供稳定测试锚点。

### W3C Link Purpose

要点：

- 用户应能从链接文本或上下文理解点击后会去哪里。
- “Contact” 如果打开的是邮箱、表单、GitHub Issues 或站内联系区，语义必须一致。

落地：

- `Contact` 先指向 `/about#contact`。
- About contact 明确写成 `Open a GitHub issue`。
- 社交区仅保留真实可达的 `GitHub`、`Issues`、`About`。

### web.dev / MDN Clipboard API

要点：

- `navigator.clipboard.writeText` 受权限、安全上下文和浏览器策略影响。
- 复制动作应有 fallback 和可见反馈。

落地：

- 新增共享 `writeToClipboard`。
- `CodeBlock`、Knowledge、Uses、About、Lab 共用复制策略。
- e2e 验证复制后出现 `Copied` 状态。

### Playwright Locator

要点：

- 自动化优先使用 role/text/test id 等稳定 locator。
- 当 UI 文案重复或组件内有相似文本时，测试应有明确契约。

落地：

- 增加 `data-testid` 给命令入口、命令搜索、命令结果、筛选器和复制按钮。
- 新增 `tests/site-access.spec.ts`，覆盖桌面和移动端。

## 产品判断

这一阶段的核心不是“让页面更好看”，而是让页面更诚实：

- 不知道真实账号，就不展示假账号。
- 不知道真实邮箱，就不展示假邮箱。
- 播放器如果还没有真实音频，就继续明确为状态演示。
- 交互如果重要，就必须能被测试复现。

## 非目标

- 不新增完整 `/contact` 页面。
- 不引入真实音频。
- 不重做视觉系统。
- 不修复所有未来内容深度问题。
- 不执行破坏性 `npm audit fix --force`。

