# 第十二阶段：可追溯作品集层调研

日期：2026-06-14

## 结论

这一阶段不应该继续加“更炫”的装饰，而应该把已经出现的程序员风格变成可验证的作品集基础设施。

优先级如下：

1. `SourceReveal` 从静态文字升级为真实 GitHub 源码链接。
2. `/knowledge` 增加反向链接，让知识条目不是孤立卡片。
3. 项目详情增加 `Case Study Diff`，把“做了什么”转成“前后差异和证据”。
4. `/lab` 做第一个真实 `ComponentPreview`，让组件注册表不只是 metadata。
5. 修复 Command Center 鼠标点击导航的真实风险：点击结果必须和键盘 `Enter` 走同一条导航路径。

## 为什么是这一阶段

前面几轮已经建立了：

- `CommandTraceToast`：用户知道自己打开了什么。
- `SourceReveal`：用户知道这个表面来自哪里。
- `ReadingFocusLens`：用户知道当前读到哪个小节，并能复制引用。
- `/lab`：组件已有注册表，但还缺真正的预览和追踪。

现在最大缺口不是“视觉不够酷”，而是“可追溯链条还不完整”。一个优秀的程序员个人主页应该让访问者能从界面一路追到内容、源码、组件、证据和阶段记录。

## 外部参考

### GitHub：源码链接必须是真链接

参考：<https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files>

吸收点：

- 用户看到 `source src/...` 时，应该能打开对应仓库文件。
- 长期可进一步支持 commit permalink 或 line-level permalink。
- 当前阶段先使用 `blob/main/path`，因为项目仍在快速迭代，主分支链接更符合“当前事实源”。

### Storybook：组件说明要同时有 preview、source、controls/trace

参考：<https://storybook.js.org/docs/writing-docs>
参考：<https://storybook.js.org/docs/writing-stories/args>

吸收点：

- `/lab` 不应该变成完整 Storybook 克隆，但应该借鉴组件文档的三层结构：看样子、看参数/证据、看源码。
- 第一版 `ComponentPreview` 使用 `preview / trace / source` 三个 mode。
- 当前站点组件不是通用 UI library，所以 `trace` 比 `controls` 更有价值：它解释组件在哪个路由使用、能复用到哪里、证据是什么。

### Obsidian Backlinks：知识不是目录，而是关系

参考：<https://help.obsidian.md/plugins/backlinks>

吸收点：

- `/knowledge` 的条目不能只靠分类筛选。
- 反向链接能把文章、项目、Lab 组件和决策连接起来。
- 当前阶段不做大型 local graph，因为内容密度还不够；先做显式 backlinks，信息密度更高。

### MDN Fragment：深链是可复制引用的基础

参考：<https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment>

吸收点：

- `#section-id` 和 `/knowledge#slug` 是当前站点最轻量、稳定的引用结构。
- Backlinks 可以直接指向文章小节，而不只是页面顶部。

## 产品判断

### 应该做

- 真实 GitHub source link。
- 真实 backlinks。
- 项目 case study 的 before/after/proof。
- Lab 内部组件预览。
- 修复 Command Center 鼠标点击导航，使点击和键盘行为一致。

### 不应该做

- 全站 3D 粒子。
- 常驻宠物。
- 大型知识图谱。
- 假终端命令回放。
- 为了“炫”而把博客阅读打碎。

## 创意建议

这个站点可以继续更酷，但必须沿着“可追溯、可引用、可探索”的方向酷：

- `SourceReveal` 后续支持行号和 commit hash，例如 `source src/...:42`。
- `Case Study Diff` 后续可以支持交互式 before/after slider，但只用于真实视觉或代码差异。
- `Knowledge` 后续可以在卡片 hover 时显示 `linked.from(["blog", "project", "lab"])` 这样的技术化关系提示。
- `/lab` 后续可以把 ComponentPreview 做成可切换 viewport 的小舞台，但不做复杂拖拽。
- Command Center 后续可以增加 `copy.currentRef()`，复制当前页面、组件或小节引用。

## 本阶段验收标准

- Source link 必须能打开 GitHub 文件。
- Knowledge backlinks 必须指向真实可访问路由或 hash。
- 项目详情必须可见 before/after/proof。
- Lab 组件预览必须能切换 preview、trace、source。
- Command Center 鼠标点击和键盘打开必须一致。
- 桌面和移动端 e2e 都要覆盖新增交互。
