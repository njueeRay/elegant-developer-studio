# 第十阶段 Signature Interaction 调研

日期：2026-06-14

## 结论

第十阶段不应该立刻做宠物、粒子跟随、复杂图谱或音乐可视化。当前最值得推进的是两个低噪音、高识别度、可长期复用的程序员风格交互：

- `Command Trace`：让 Command Center 的导航像一次可见的命令执行。
- `Source Hover`：让内容卡片在用户表达意图时露出来源、引用或代码路径。

这两个方向比“看起来很酷”的装饰更适合当前站点，因为它们服务真实任务：导航确认、来源追踪、内容可信度、组件复用和项目维护。

## 上一阶段复盘输入

第九阶段已经完成协作治理和创意 backlog：

- `/collaboration` 已经让反馈、PR、创意想法进入可追踪流程。
- `Command Center` 已经能搜索创意条目。
- Lab 已经有组件注册表，但缺少一个真正可识别的 signature interaction。
- 站点已经明确拒绝假终端、代码雨和高强度赛博朋克。

因此第十阶段的正确方向不是“增加更多页面”，而是在已有页面里植入可复用的技术气质。

## 外部参考

### Raycast

参考：[Raycast Manual](https://manual.raycast.com/) 与 [Keyboard Shortcuts](https://manual.raycast.com/keyboard-shortcuts)。

可借鉴点：

- 命令入口应快速、可键盘操作、可预测。
- 快捷键和命令结果需要形成“执行感”，但不需要模拟终端。
- 搜索结果应该直接通向真实动作。

本项目转译：

- 保留 Command Center 作为主入口。
- 导航完成后显示 `cmd.open("/route")`，让用户感觉自己执行了一条清晰命令。
- 不做全屏控制台，不把首页变成工具面板。

### Apple HIG Motion

参考：[Apple Human Interface Guidelines - Motion](https://developer.apple.com/design/human-interface-guidelines/motion)。

可借鉴点：

- 动效应帮助用户理解状态变化，而不是单纯吸引注意。
- 轻量、短促、语义明确的反馈优于持续动画。
- 可降低或关闭的动效更适合长期阅读型页面。

本项目转译：

- `Command Trace` 使用短促进入动画。
- `Source Hover` 只在 hover/focus 或移动端必要状态出现。
- 继续支持 `prefers-reduced-motion`，避免将效果强加给用户。

### GitHub 贡献健康度

参考：[GitHub Docs - Setting up your project for healthy contributions](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions)。

可借鉴点：

- 公开项目需要清晰的贡献路径和可追踪材料。
- 文档、源码、Issue 和部署记录应该互相指向，而不是散落。

本项目转译：

- `Source Hover` 不只是视觉彩蛋，而是把项目的“可检查性”前置。
- Lab 注册表必须暴露 source、route、reuse target 和 evidence。
- 阶段完成必须更新项目地图、进度日志、版本追溯和飞书。

### Reduced Motion

参考：[MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)。

可借鉴点：

- 系统级 motion preference 应该影响界面动画。
- 非必要动效应允许减少或取消。

本项目转译：

- `Command Trace` 和 `Source Hover` 都在 reduced motion 下取消 transform/transition。
- 不引入持续跟随鼠标的背景效果。

## 实现范围

本阶段只实现两个交互原型：

1. `Command Trace`
   - 从 Command Center 打开内部路由后显示 `cmd.open("/route")`。
   - 使用 `sessionStorage` 保证路由切换后仍能显示。
   - 离开目标路由时清除，避免上下文残影。
   - 仅用于内部路由，不拦截外链或 mailto。

2. `Source Hover`
   - Knowledge card 显示 `ref /knowledge#slug`。
   - Project card 显示 `source src/content/projects/{slug}.mdx`。
   - Lab row 显示组件 source path。
   - 桌面 hover/focus 出现，移动端常驻显示，避免 hover 不可用。

## 暂不做

- 常驻宠物：会抢夺阅读注意力，且当前站点内容还没有足够上下文让它有用。
- 鼠标粒子跟随：短期炫酷，长期廉价。
- 假终端 Hero：违背第一阶段“优雅工作室”的方向。
- 大型 Memory Map：内容量不足，容易变成空壳图谱。
- 音乐可视化：没有真实音频资源前不成立。

## 验收标准

- 命令导航必须通向真实路由。
- 反馈必须在桌面和移动端都可见。
- Source 信息必须是真实 route/ref/source，不允许使用假路径。
- 不得造成横向溢出。
- reduced motion 下不应保留位移动画。
- e2e 必须覆盖新增交互。
- Lab 必须登记新增构件。

## 专家判断

这一步的价值不是“多了两个小效果”，而是把个人主页从漂亮页面推进到“可检查的个人工作室”。好的程序员风格不靠把代码贴满屏幕，而靠让用户感到：每个对象都有来源、每个动作都有结果、每个页面都能追溯到设计和工程决策。
