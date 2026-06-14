# 第九阶段协作治理与创意方向调研

## 阶段判断

第八阶段已经把公开协作入口接到 GitHub Issue Forms。下一阶段不应继续增加孤立页面，而应建立一套“想法如何进入项目、如何被评估、如何被验证、如何同步到飞书”的治理层。

本阶段目标：

- 建立 `CONTRIBUTING.md` 和 PR 模板。
- 新增可访问的 `/collaboration` 页面，让站点用户也能看到协作规则。
- 把个人主页当前优缺点和创意方向沉淀为可执行 backlog。
- 继续保持中文为文档首选语言。

## 外部参考

### GitHub Community Health

GitHub 官方文档将 `CONTRIBUTING.md`、Issue Templates、Security Policy、Code of Conduct 等列为 public repository community profile 的核心文件。`CONTRIBUTING.md` 的价值不是仪式感，而是帮助贡献者提交 well-formed issues 和 pull requests，减少维护者反复要求补充信息的成本。

参考：

- https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories
- https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors
- https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file

对本项目的影响：

- 必须新增 `CONTRIBUTING.md`。
- Issue Form 之后，需要 PR 模板承接实际变更。
- 协作规则必须说明“什么反馈有价值”，否则 issue 结构化仍然可能产出低质量输入。

### Raycast

Raycast 的核心启发不是黑色命令框，而是快速、可靠、键盘优先的统一动作入口。它的官方描述强调 productivity tools in an extendable launcher，manual 也强调快捷键、导航和系统命令。

参考：

- https://www.raycast.com/
- https://manual.raycast.com/keyboard-shortcuts
- https://manual.raycast.com/system-commands

对本项目的影响：

- Command Center 应继续作为程序员风格的主交互资产。
- 创意应该围绕“动作、上下文、可追踪性”展开，而不是加入假终端。
- `Command Trace` 是值得优先测试的 signature interaction。

### Apple Human Interface Guidelines

Apple HIG 对 motion 的关键启发是：动效应帮助理解状态变化、保持方向感、表达反馈，而不是制造干扰。对本项目而言，Apple 风格不等于玻璃拟态，也不等于大量模糊层。

参考：

- https://developer.apple.com/design/human-interface-guidelines
- https://developer.apple.com/design/human-interface-guidelines/motion

对本项目的影响：

- 动效必须服务层级、状态和方向感。
- 需要尊重 `prefers-reduced-motion`。
- 博客阅读页不应上强装饰或常驻宠物。

## 对当前个人主页的专家判断

### 优点

- 视觉气质已经稳定：温暖、克制、设计型工程师，而不是模板作品集。
- 信息架构已经有完整骨架：首页、Blog、Projects、Photos、Music、Knowledge、Uses、About、Lab、Contact。
- 程序员风格不是靠代码雨，而是靠 Command Center、可复制引用、Lab 注册表、版本追溯。
- 文档和项目追踪远超普通个人主页，后续演进不会丢上下文。

### 缺点

- 还缺少一个让人离开后仍记住的 signature interaction。
- 项目 case study 还不够硬，缺少真实约束、方案选择、取舍和结果证据。
- Media 层还偏氛围，需要更强照片故事、音乐语境和个人记忆。
- Knowledge 目前是索引型，还缺少反向链接、相关对象和内容之间的关系。

### 关键分歧

用户提出“宠物、鼠标跟随、特效”这类想法时，不应直接照做。当前正确路线是：

- 可以做鼠标和键盘相关的微交互。
- 暂不做持久宠物。
- 不做高强度背景粒子。
- 不做假终端。
- 优先做能增强程序员身份的 inspectable interaction。

## 创意 backlog

### Now

1. `Command Trace`

   Command Center 导航后，在目标页 header 附近短暂显示 `cmd.open('/lab')` 这样的 trace。

   价值：让键盘导航成为站点记忆点。

   风险：过度出现会烦。必须短暂、可降级、尊重 reduced motion。

2. `Source Hover`

   在 Lab、Knowledge、Project 卡片 hover 时显示源路径、引用 token 或 permalink。

   价值：把程序员风格变成可检查性。

   风险：路径过长会破坏移动端，需要截断和移动端替代。

### Next

3. `Reading Focus Lens`

   将现有 reader glow 升级为段落聚焦、复制段落链接和目录同步。

4. `Memory Map`

   在文章、项目、照片、工具、知识之间建立小型 related-object rail。

5. `Case Study Diff`

   项目详情页加入 before/after decision diff：问题、约束、取舍、结果。

### Later

6. `Studio Companion`

   只允许出现在空状态或恢复路径中，不做常驻宠物。

## 本阶段实现标准

- `/collaboration` 必须真实可访问。
- Contact 页面必须能进入协作指南。
- Command Center 必须能搜索协作指南和创意条目。
- `CONTRIBUTING.md` 和 PR 模板必须存在。
- e2e 必须覆盖新路由和仓库治理文件。
- 文档必须同步项目地图、进度日志、版本追溯和飞书索引。

