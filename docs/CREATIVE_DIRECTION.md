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
| Shipped / Iterate | Source Hover | UI | 已完成首版；下一步升级为可点击 GitHub source link |
| Next | Reading Focus Lens | Interaction | 增强博客阅读，而不污染正文 |
| Next | Memory Map | Content | 建立文章、项目、照片、知识、工具之间的关系 |
| Next | Case Study Diff | Component | 让作品集体现工程取舍 |
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

### Source Hover

当前行为：

- Knowledge 显示稳定 ref。
- Projects 显示 MDX source path。
- Lab 显示组件 source path。
- 桌面 hover/focus 显示，移动端常驻显示。

下一步：

- 链接到 GitHub 文件。
- 绑定 commit 或版本。
- 在 case study 中显示设计/代码 diff。

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
