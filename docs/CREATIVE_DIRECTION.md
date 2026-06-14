# 创意方向与交互 backlog

## 创意原则

这个站点可以炫酷，但不能喧哗。程序员风格不应该靠假终端、代码雨、随机粒子或过度赛博朋克来表达，而应该靠：

- 可检查的来源。
- 快速的命令入口。
- 清晰的状态反馈。
- 能被复制、引用、追踪的对象。
- 克制但有记忆点的微交互。

## 当前最值得做的创意

| 优先级 | 名称 | 类型 | 价值 |
| --- | --- | --- | --- |
| Shipped / Iterate | Command Trace | Interaction | 已完成首版；下一步评估复制、历史和回放是否有价值 |
| Shipped / Iterate | Source Reveal | UI | 已升级为可点击 GitHub source link；下一步支持行号和 commit permalink |
| Shipped / Iterate | Reading Focus Lens | Interaction | 已完成首版；下一步评估 Knowledge/Project 复用和 Markdown 引用复制 |
| Shipped / Iterate | Case Study Diff | Component | 已进入项目详情页；下一步接入截图、PR、commit 或指标证据 |
| Shipped / Iterate | ComponentPreview | Lab | 已进入 `/lab`；下一步支持 viewport switch 和更真实的组件状态 |
| Next | Reference Constellation | Interaction | 在当前页面展示 3 到 5 个真实关联节点，不做大型空图谱 |
| Later | Studio Companion | Interaction | 只在空状态或恢复路径中提供帮助 |

## 已落地实验

### Command Trace

当前行为：

- Command Center 打开内部路由后显示 `cmd.open("/route")`。
- trace 在路由切换后显示，离开目标路由后清理。
- 不处理外链或 `mailto:`。

下一步只在证明有价值时增加：

- 复制命令。
- 最近命令历史。
- 命令回放。

### Source Reveal

当前行为：

- Knowledge、Projects、Lab 显示 source path。
- Source path 可点击到 GitHub `blob/main` 文件。
- 桌面 hover/focus 显示，移动端常驻显示。

下一步：

- 支持行号。
- 支持 commit permalink。
- 在 case study 中显示 PR、commit 或截图证据。

### Reading Focus Lens

当前行为：

- 博客详情页显示当前小节标题。
- 显示 `read.focus("section-id")`。
- 支持复制当前小节 URL。
- 当前 heading 显示轻量指示。
- 移动端保留底部浮层。

下一步：

- 支持复制 Markdown 引用。
- 复用到 Knowledge 详情页。
- 在项目 case study 中显示当前决策段落。

### Case Study Diff

当前行为：

- 项目详情页显示 Before、After、Proof。
- 数据来自项目 MDX metadata。
- e2e 覆盖可见性和真实文案。

下一步：

- 接入对应 commit、PR 或截图。
- 允许对单个 diff 复制引用。
- 只在有真实前后差异时展示，不做营销式夸张。

### ComponentPreview

当前行为：

- `/lab` detail panel 中显示第一个真实 preview。
- 支持 `preview / trace / source` 三种模式。
- source mode 可点击到 GitHub 文件。

下一步：

- 支持 desktop/mobile viewport switch。
- 对适合的组件增加真实状态预览。
- 将 `trace` 扩展为 route、source、test、docs 的完整证据链。

## 当前不建议做

- 常驻宠物：风险高，容易幼稚化。
- 全站粒子跟随：容易廉价化。
- 假终端 hero：已经被明确排除。
- 大型知识图谱：当前内容量不足，会显得空。
- 复杂音乐可视化：没有真实音频前不成立。

## 下一步实验标准

每个创意进入实现前必须回答：

1. 它服务哪个真实场景？
2. 它是否提升阅读、导航、表达、可信度或维护性？
3. 它会污染哪些页面？
4. 它能否在移动端成立？
5. 它能否降级或关闭？
6. 它是否能被 `/lab` 和文档追踪？
