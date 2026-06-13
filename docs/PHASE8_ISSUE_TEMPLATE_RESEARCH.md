# 第八阶段公开协作与 Issue Template 调研

日期：2026-06-14

## 1. 上一阶段复盘

第七阶段把 Contact 从临时 `/about#contact` 升级为独立 `/contact` 页面，解决了“用户能不能真实抵达联系路径”的问题。

剩余问题也很明确：

- Contact brief 只能复制，无法直接变成结构化 GitHub issue。
- GitHub Issues 入口仍是普通列表或普通新建页，缺少信息结构。
- 不同类型反馈混在一起：项目讨论、bug、功能建议没有分流。

结论：本阶段应该把公开协作路径结构化，而不是直接做私密表单。

## 2. 外部调研

### 2.1 GitHub Issue Forms

GitHub 官方文档说明，Issue Forms 可以通过 YAML 表单定义字段、校验、默认标题和说明；用户提交后会转成 Markdown issue body。

来源：

- `https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms`
- `https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository`
- `https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema`

对本项目的启发：

- 公开协作不应该依赖用户自由发挥。
- 表单字段应对应 `/contact` 里的 brief：Context、Goal、Surface、Constraints。
- 表单必须提醒用户不要放私密信息。

### 2.2 Issue 创建 URL

GitHub 官方文档说明，可以通过 URL query 打开带参数的新 issue 页面；模板也可以通过 query 选择。

来源：

- `https://docs.github.com/enterprise-cloud@latest/issues/tracking-your-work-with-issues/creating-an-issue`

对本项目的启发：

- `/contact` 主入口可以直接打开 `issues/new?template=contact.yml`。
- 这样用户不需要先进入 Issues 列表再猜该选哪个模板。
- URL 不能过长，复杂预填仍应交给 GitHub Issue Form 字段。

### 2.3 空白 issue 与外部链接

GitHub issue template config 支持 `blank_issues_enabled` 和 `contact_links`。

对本项目的启发：

- 关闭 blank issue 更符合当前追溯机制。
- Contact 页面和项目地图应作为 issue chooser 的外部参考入口。
- 这不是客服系统，而是公开协作入口。

## 3. 产品判断

本阶段做三类模板：

1. `contact.yml`：公开协作、项目讨论、设计判断。
2. `bug_report.yml`：可复现页面、路由、链接、布局、交互问题。
3. `feature_request.yml`：有明确 surface 和 first slice 的改进建议。

不做：

- 不创建 labels 或 assignees 的强绑定，避免仓库缺少 label 时造成无效配置。
- 不把私密联系塞进 GitHub issue。
- 不把 `/contact` 变成重表单页面。

## 4. 验收标准

- `.github/ISSUE_TEMPLATE` 存在。
- `contact.yml` 包含 Context、Goal、Surface、Constraints 和 public thread agreement。
- `bug_report.yml` 包含 route、observed、expected、reproduction、environment。
- `feature_request.yml` 包含 surface、problem、proposal、quality bar。
- `config.yml` 关闭 blank issue，并提供 Contact 与项目地图链接。
- `/contact` 主讨论入口指向 `issues/new?template=contact.yml`。
- E2E 覆盖模板文件存在与关键字段。

## 5. 后续建议

下一阶段可以做两个方向之一：

1. **Issue URL 预填增强**：从页面或组件生成带 title/body 的 issue URL。
2. **贡献者体验层**：新增 `CONTRIBUTING.md`，解释如何提交反馈、如何引用页面、如何写可复现问题。

我倾向于先做 `CONTRIBUTING.md`，因为模板已经解决输入结构，下一步应该解决协作规则和维护边界。
