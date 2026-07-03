# 第七阶段 Contact 与公开信任层调研

日期：2026-06-14

## 1. 上一阶段复盘

第六阶段解决了一个严重问题：页面上不能再出现 `#`、占位邮箱、空社交链接这类“看上去能点，实际不可用”的入口。

但第六阶段留下了一个明确的技术债：

- Contact 主入口临时借用 `/about#contact`。
- About Contact band 直接指向 GitHub Issues。
- 用户能联系到项目，但缺少路由判断、消息预期、适用边界和上下文入口。

结论：下一阶段不应先做新奇动效，而应先把公开联系路径做成可信的产品表面。

## 2. 外部调研

### 2.1 About 与信任信息

NN/g 关于企业/组织信息呈现的研究强调，用户会通过 About、联系、团队和真实性信息判断站点可信度。

来源：

- `https://www.nngroup.com/reports/about-us-presenting-company-information/`

对本项目的启发：

- Contact 不只是一个邮箱链接，它是用户判断“这个人/项目是否真实”的一部分。
- 个人站尤其不能用假表单或空承诺伪装成熟产品。
- 联系入口应该解释适用场景、响应方式和上下文。

### 2.2 联系服务模式

GOV.UK Design System 的联系模式强调：联系入口应告诉用户联系谁、为何联系、需要准备什么信息，以及后续会发生什么。

来源：

- `https://design-system.service.gov.uk/patterns/contact-a-department-or-service-team/`

对本项目的启发：

- Contact 页面需要区分不同路径：项目反馈、源码上下文、个人介绍、写作引用、作品引用。
- 页面应提供“发起讨论前需要准备什么”的 brief。
- 如果没有真实私密渠道，就不应该放一个假表单。

### 2.3 可访问性与表单判断

W3C WCAG 对链接目的、标签和说明有明确要求；联系入口必须让用户知道点击后的结果。

来源：

- `https://www.w3.org/TR/WCAG22/`
- `https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html`

对本项目的启发：

- 外链必须文案明确，例如 `Open a GitHub issue`，而不是泛泛的 `Say hello`。
- 复制按钮必须有可见反馈。
- 路由卡应该具备可读标题、描述和目标语义。

### 2.4 Sitemap 与公开路由

Next.js App Router 的 sitemap 约定要求新增公开页面时同步路由地图。

来源：

- `https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap`

对本项目的启发：

- `/contact` 不能只在客户端链接出现，必须作为真实路由进入 sitemap。
- E2E 测试必须覆盖 `/contact` 本身和入口导航。

## 3. 产品判断

本阶段不做三件事：

1. 不做假邮箱。
2. 不做无后端假表单。
3. 不做“漂亮但没有联系预期”的装饰页面。

本阶段要做的是一个公开 Contact Router：

- 让用户选择正确路径。
- 给出联系 brief。
- 告诉用户当前公开路径是 GitHub Issues。
- 给出边界：私密渠道尚未配置，响应不承诺即时。
- 把上下文入口放在同一页面，减少用户来回找链接。

## 4. 信息架构

新增页面：

- `/contact`

新增数据：

- `contactStatus`
- `contactRoutes`
- `contactFit`
- `contactBoundaries`
- `contactBrief`

页面模块：

- Contact hero：解释页面意图。
- Status strip：当前可用性与响应预期。
- Contact brief terminal：可复制联系模板。
- Route cards：5 个真实入口。
- Best fit：适合联系的主题。
- Boundaries：明确不伪装的能力。
- Next improvement：后续私密渠道规划。

## 5. 组件沉淀

新增高价值组件：

- `ContactHub`

它不是一次性页面装饰，而是后续可扩展成：

- 私密联系表单。
- 日历预约。
- GitHub discussion 路由。
- 项目 brief intake。
- 合作请求分类。

## 6. 验收标准

- `/contact` 是真实可访问路由。
- 首页 Contact 按钮指向 `/contact`。
- Command Center 的 Contact action 指向 `/contact`。
- GitHub Issues 和 repo 链接是真实链接。
- Contact brief 复制按钮有可见反馈。
- sitemap 包含 `/contact`。
- 桌面和移动端无横向溢出。
- 不出现假邮箱、假表单、空链接。

## 7. 后续建议

下一步不应该立刻加复杂 CRM 化表单。更合理的顺序：

1. 配置真实私密邮箱或后端消息存储。
2. 明确隐私与响应预期。
3. 再添加 Contact form。
4. 根据真实使用场景决定是否加预约、附件、项目 brief 分类。
