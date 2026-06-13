# 第八阶段公开协作与 Issue Template 复盘

日期：2026-06-14

## 1. 结论

第八阶段已把 `/contact` 的“复制 brief”升级为可执行的 GitHub Issue Form 流程。

现在公开协作路径具备三层结构：

1. `/contact`：解释联系路径和边界。
2. GitHub Issue Forms：接收结构化输入。
3. GitHub issue / Feishu / 文档：沉淀追溯。

这比直接加私密表单更稳，因为它延续了当前项目的公开协作和版本追溯机制。

## 2. 已完成

新增：

- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/ISSUE_TEMPLATE/contact.yml`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`

更新：

- `/contact` 主讨论入口从普通 Issues 列表改为 `issues/new?template=contact.yml`。
- `src/data/contact.ts` 新增 `githubIssueTemplateUrl`。
- E2E 增加仓库协作契约测试，验证模板关键字段。

## 3. 模板设计

### 3.1 `contact.yml`

用途：公开协作、项目讨论、设计系统、写作或产品方向反馈。

字段：

- Discussion area
- Context
- Goal
- Surface
- Constraints and references
- Public thread agreement

判断：它对应 `/contact` 的 brief，是本阶段最核心模板。

### 3.2 `bug_report.yml`

用途：页面、路由、链接、布局或交互缺陷。

字段：

- Route or surface
- Observed behavior
- Expected behavior
- Steps to reproduce
- Environment

判断：它直接服务上一轮全站审计暴露出的风险：看得见但点不到、能点但无反馈、移动端溢出。

### 3.3 `feature_request.yml`

用途：有明确 surface 和 first slice 的功能建议。

字段：

- Surface
- Problem or opportunity
- Proposed first slice
- Quality bar

判断：它防止 feature request 变成模糊愿望清单。

## 4. 站点变化

`/contact` 主路由卡已改为：

- 标题：`Open a structured issue`
- URL：`https://github.com/njueeRay/elegant-developer-studio/issues/new?template=contact.yml`
- meta：`Issue form`

保留 `Copy contact brief` 作为备用路径。

## 5. 验证

本地验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：60 passed。
- 本地生产模式视觉复核：`/contact` 桌面和移动端无横向溢出。
- 截图：`/tmp/phase8-contact-desktop.png`、`/tmp/phase8-contact-mobile.png`。

生产验证：

- Vercel deployment：`dpl_HRDcxTSwxDfJAGxWAxGmQPj4LR38`。
- Deployment URL：`https://elegant-developer-studio-eazkr2exm.vercel.app`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/HRDcxTSwxDfJAGxWAxGmQPj4LR38`。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：60 passed。

已新增测试契约：

- Contact 页面结构化 issue 链接必须指向 `contact.yml`。
- `contact.yml` 必须包含 Context、Goal、Surface、Public thread agreement。
- `bug_report.yml` 必须包含 Steps to reproduce。
- `feature_request.yml` 必须包含 Proposed first slice。
- `config.yml` 必须关闭 blank issue，并链接生产 Contact 页。

待完成：

- GitHub / 飞书同步。

## 6. 风险

### 6.1 GitHub Issue Forms 无本地官方预览

当前只能通过文件结构和关键字段测试做本地契约验证，最终样式以 GitHub 渲染为准。

### 6.2 labels 暂未绑定

没有配置 labels、assignees 或 projects。原因是缺少仓库标签体系时，强绑定会增加失败风险。

后续可以在建立标签地图后再补：

- `area/contact`
- `type/bug`
- `type/feature`
- `type/discussion`

### 6.3 仍不是私密联系

GitHub issue 是公开线程。私密协作仍需要真实邮箱或后端消息通道。

## 7. 下一阶段建议

下一阶段建议做 `CONTRIBUTING.md` 与公开协作规则：

- 如何选择 issue template。
- 如何引用页面、组件、route、commit。
- 什么内容不能放进公开 issue。
- Bug、feature、discussion 的处理规则。
- GitHub 与飞书之间如何同步。

## 8. 外部同步

- GitHub issue `#4` comment `4699301750`。
- GitHub issue `#5` comment `4699302265`。
- 飞书调研页：https://scnlb1lk96sb.feishu.cn/wiki/Jtp4wmyfhiHqXQkHbzXcFeEZncb
- 飞书复盘页：https://scnlb1lk96sb.feishu.cn/wiki/RbuowE2dtizYYokv8hwcU1tOn3d
