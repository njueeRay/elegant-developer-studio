# 第十一阶段 Reading Focus Lens 调研

日期：2026-06-14

## 结论

本阶段可以加入“炫酷感”，但不应该做全站粒子、常驻宠物、假终端或大面积视觉特效。当前最值得做的是 `Reading Focus Lens`：让博客文章在阅读时暴露当前小节、稳定引用和代码式状态。

判断依据：

- 它服务真实场景：长文阅读、段落定位、引用分享。
- 它有程序员气质：`read.focus("section-id")`、section ref、TOC id。
- 它不污染主页：只出现在文章页，且可以关闭。
- 它能复用：未来可进入 Knowledge 详情页、项目 case study 和 Lab preview。

## 上一阶段复盘输入

第十阶段已经完成：

- `Command Trace`：命令式导航反馈。
- `Source Hover`：内容来源和路径 reveal。

这两个实验证明了一个方向：程序员风格应该来自“可执行、可追踪、可引用”，而不是来自装饰性代码符号。因此下一步应该沿着阅读和内容对象继续推进。

## 外部参考

### Apple HIG Motion

参考：[Apple Human Interface Guidelines - Motion](https://developer.apple.com/design/human-interface-guidelines/motion)。

可借鉴点：

- 动效应该帮助用户理解状态和空间关系。
- 动效不能抢夺内容注意力。
- 用户不应该被迫接受不必要的运动。

本项目转译：

- 阅读焦点只显示当前 section 状态，不做持续大幅动画。
- `prefers-reduced-motion` 下取消过渡。
- 交互层作为阅读辅助，而不是正文主角。

### NN/g：动效与注意力

参考：[Nielsen Norman Group](https://www.nngroup.com/) 关于动画、注意力和界面反馈的研究文章。

可借鉴点：

- 动效可以解释状态变化，但过量动效会分散注意力。
- 反馈必须接近用户刚刚发生的动作。
- 阅读型页面需要特别克制。

本项目转译：

- 不做全站鼠标粒子。
- 不做持续吸引注意力的宠物。
- 只在阅读页右下角显示轻量 focus layer。

### GitHub Primer

参考：[Primer Design System](https://primer.style/)。

可借鉴点：

- 技术产品的信任感来自清晰 focus、稳定状态和可访问的交互。
- 状态不应该只靠视觉装饰表达。

本项目转译：

- `ReadingFocusLens` 需要真实数据源：文章 TOC，而不是硬编码假状态。
- 复制引用必须有反馈。
- Lab 和 Command Center 必须能发现这个组件。

### MDN：IntersectionObserver 与 reduced motion

参考：[MDN Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 与 [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)。

可借鉴点：

- 可见区域变化适合用 observer 处理。
- 动效需要尊重系统级减少动态偏好。

本项目转译：

- 使用文章 heading 和 TOC id 计算当前阅读小节。
- 同时用滚动位置兜底，避免 observer 在边界视口中不触发。
- reduced motion 下取消标题指示和段落 hover 过渡。

## 实现范围

本阶段只做一个创意切片：

1. `ReadingFocusLens`
   - 出现在博客详情页。
   - 显示当前小节标题。
   - 显示 `read.focus("section-id")`。
   - 支持复制当前小节完整 URL。
   - 桌面和移动端都可见。
   - 可关闭和恢复。

2. Lab 注册
   - 新增 `ReadingFocusLens` 到组件注册表。
   - Command Center 可搜索 `reading focus`。
   - Lab experiment timeline 增加阅读焦点实验。

3. 测试
   - e2e 验证阅读焦点可见。
   - e2e 验证滚动后当前小节更新。
   - e2e 验证复制引用反馈。
   - e2e 验证 Lab 和 Command Center 可发现该组件。

## 暂不做

- 常驻宠物：当前内容对象还不足以支撑它变成有用助理。
- 代码雨：视觉廉价，且与 Claude/Apple/Primer 的克制方向冲突。
- 大型 memory graph：内容关系还不够密集。
- 音乐可视化：没有真实音频分析前容易变成假动效。
- 全站鼠标跟随粒子：短期炫酷，长期干扰。

## 创意判断

可以炫酷，但必须满足三个条件：

1. 炫酷来自真实系统行为，而不是装饰。
2. 炫酷不打断阅读、导航和内容判断。
3. 炫酷可以被关闭、降级、测试和追踪。

因此，当前最好的“酷”不是更亮、更动、更复杂，而是让用户感觉这个站点像一个能被操作、引用和审计的个人工作室。

## 下一步候选

优先级较高：

- GitHub source link：把 `SourceReveal` 从文本升级为可点击源码链接。
- Case Study Diff：项目页展示 before/after、tradeoff、commit proof。
- Knowledge Backlinks：让知识对象之间出现轻量反向链接。

保留观察：

- Studio Companion：只适合在空状态、恢复路径或新访客 onboarding 中出现。
- Memory Map：等文章、项目、知识、照片数量更高后再做。
