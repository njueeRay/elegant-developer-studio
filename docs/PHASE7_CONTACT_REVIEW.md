# 第七阶段 Contact 与公开信任层复盘

日期：2026-06-14

## 1. 结论

第七阶段已完成独立 `/contact` 页面，并把原本分散在首页、About 和命令面板里的联系入口统一到真实可访问路由。

核心变化不是“多了一个页面”，而是把 Contact 从临时链接升级为公开信任层：

- 用户知道可以通过什么路径联系。
- 用户知道每条路径适合什么。
- 用户知道当前没有伪装出来的私密表单。
- 用户可以复制一个结构化 contact brief。

## 2. 已完成

新增：

- `src/app/contact/page.tsx`
- `src/components/content/contact-hub.tsx`
- `src/data/contact.ts`

更新：

- 首页 Header Contact 按钮改为 `/contact`。
- 首页 Contact panel 改为 `/contact`。
- 首页社交入口第三项从 About contact 改为 Contact。
- About contact band 改为 `/contact`。
- Knowledge 相关链接改为 `/contact`。
- Command Center `action-contact` 改为 `/contact`。
- sitemap 增加 `/contact`。
- E2E routes 增加 `/contact`。
- E2E 新增 Contact 入口、命令面板和复制反馈测试。

## 3. 交互细节

### 3.1 Contact brief copy

用户可以点击 `Copy contact brief`，按钮反馈变为 `Copied`。

模板内容：

```text
Context: what are we discussing?
Goal: what should change or become clearer?
Surface: page, component, route, document, or repository area.
Constraints: timeline, references, blockers, or quality bar.
```

判断：这是一个低成本但高价值的程序员风格交互。它让联系行为变成结构化输入，而不是让用户面对空白消息框。

### 3.2 命令面板

`action-contact` 现在直接打开 `/contact`，不再跳转到 About 内部锚点。

判断：这符合全站 Command Center 的语义。Contact 已经是一级表面，应作为一级动作存在。

### 3.3 路由卡

当前 5 个入口：

- Open a GitHub issue
- Inspect the repository
- Read the profile
- Reference the writing
- Reference selected work

判断：这些入口全部真实可访问，避免了“页面展示了联系能力，但用户找不到下一步”的错误。

## 4. 视觉复核

桌面：

- 首屏层级清楚。
- 大标题、状态条、brief terminal 和路由卡之间有明确节奏。
- 路由卡在首屏底部露出，提示下一段内容，不造成信息过载。
- 截图：`/tmp/contact-desktop-1440.png`

移动端：

- `390 x 844` 下无横向溢出。
- `scrollWidth 390`，`clientWidth 390`。
- Contact 状态条、标题、说明和两个主按钮均可见。
- brief terminal 下移到后续滚动区域，这是合理的信息顺序。
- 截图：`/tmp/contact-mobile-390.png`

## 5. 验证

本地验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：58 passed。

Browser QA：

- URL：`http://localhost:3100/contact`
- Title：`Contact - Ray Studio`
- H1：唯一 `Contact`
- `Open a GitHub issue` 链接为真实 GitHub Issues。
- `Copy contact brief` 点击后按钮显示 `Copied`。
- 控制台 error/warn：无。
- 移动端无横向溢出。

截图兜底：

- 内置浏览器截图接口在本轮超时。
- 已用项目 Playwright 生成 `/tmp/contact-desktop-1440.png` 和 `/tmp/contact-mobile-390.png` 做视觉复核。

## 6. 缺点与风险

### 6.1 仍缺少私密联系渠道

当前公开路径是 GitHub Issues。它适合项目讨论，但不适合私密合作、个人信息或非公开请求。

建议：

- 配置真实邮箱或消息后端后，再新增私密 Contact form。
- 表单上线前必须定义响应预期、隐私边界和失败状态。

### 6.2 Contact brief 仍是英文

原因：模板主要服务于代码、repo 和 issue 语境。

建议：

- 后续可增加中英文切换。
- 飞书文档继续使用中文首选语言。

### 6.3 页面还没有与 GitHub issue 模板联动

当前 brief 只能复制，不会自动带入 GitHub issue URL。

建议：

- 后续可以增加 `Open issue with template`。
- 也可以新增 `.github/ISSUE_TEMPLATE/contact.yml`。

## 7. 下一阶段建议

下一阶段可进入“公开协作与 Issue 模板层”：

- 新增 GitHub issue template。
- 新增 Contact 页面到 issue template 的直达链接。
- 在 `/contact` 中加入“复制 brief”和“带模板打开 issue”两个路径。
- 把项目地图、阶段反馈、bug、feature request 分成不同 issue 类型。

这个方向比直接加表单更稳，因为它延续了当前 GitHub + Vercel + Feishu 的追溯机制。
