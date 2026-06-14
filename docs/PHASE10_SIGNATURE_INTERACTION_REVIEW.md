# 第十阶段 Signature Interaction 复盘

日期：2026-06-14

## 本阶段完成内容

完成两个 signature interaction 原型：

- `Command Trace`：Command Center 打开内部路由后显示代码风格执行痕迹。
- `Source Hover`：Knowledge、Projects、Lab 暴露真实来源或引用路径。

同时修复两个基础质量问题：

- ESLint 忽略测试产物目录，避免 `test-results` 被并发测试清理时导致 lint 崩溃。
- 移除 `next/font/google` 构建期网络依赖，改用系统字体变量，避免本地构建被 fonts.gstatic.com 可用性影响。

## 代码交付

新增：

- `src/lib/command-trace.ts`
- `src/components/command-trace-toast.tsx`

更新：

- `src/components/global-command-menu.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/content/knowledge-card.tsx`
- `src/components/content/project-card.tsx`
- `src/components/content/lab-explorer.tsx`
- `src/data/lab.ts`
- `tests/site-access.spec.ts`
- `eslint.config.mjs`

## 行为说明

### Command Trace

当用户通过 Command Center 打开内部路由，例如 `/lab`：

```text
cmd.open("/lab")
```

页面右上角或移动端底部会出现一条短暂反馈，显示命令和上下文元数据。

关键约束：

- 使用 `sessionStorage` 保存最近一次命令，让 trace 能跨路由切换显示。
- 只在当前 pathname 与命令目标一致时显示。
- 离开目标路由会清理 trace，避免旧命令残留。
- 外链和 `mailto:` 不写入 trace。

### Source Hover

可检查来源现在进入三个页面：

- `/knowledge`：`ref /knowledge#filters-before-search`
- `/projects`：`source src/content/projects/lumen.mdx`
- `/lab`：`source src/components/...`

桌面端在 hover/focus 时出现，移动端直接可见。

## 验证结果

本地验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：68 passed。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，68 passed。
- Vercel deployment：`dpl_BAvc9wkG9cRr9XbC3WzDWoyxCRrZ`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

Playwright 视觉巡检：

- 桌面 `/lab`：Command Trace 可见。
- 桌面 `/knowledge`：Source Hover 可见。
- 移动 `/projects`：Source 信息可见。
- 桌面和移动端 `scrollWidth > innerWidth` 均为 `false`。
- 离开 `/lab` 后 stale trace 数量为 `0`。

截图：

- `output/phase10-command-trace-desktop.png`
- `output/phase10-source-hover-desktop.png`
- `output/phase10-projects-mobile.png`

## 优点

- 程序员气质更真实：不是假终端，而是命令、路径、来源和反馈。
- 对信息密度的控制合理：source 信息不永久压迫桌面布局。
- 可复用性高：Command Trace 可用于后续 QuickAction、GlobalSearch；Source Reveal 可用于 case study、knowledge detail、component preview。
- 可测试：新增 e2e 覆盖真实路由、真实 source/ref 文本。
- 架构更稳：移除远程字体构建依赖后，本地和 CI 构建更可靠。

## 缺点

- `Command Trace` 还只是导航反馈，不支持复制命令、回放命令或显示命令历史。
- `Source Hover` 目前主要是文本 reveal，尚未和 GitHub 文件链接、MDX frontmatter 或具体 commit 绑定。
- 移动端项目筛选条虽然没有页面级横向溢出，但芯片滚动提示不够优雅。
- Lab 仍是元数据型注册表，还没有真正的 isolated preview。

## 下一阶段建议

优先级最高：

1. 改善移动端筛选条：增加边缘淡出提示，或在窄屏切换为两行 wrap。
2. 把 `Source Reveal` 升级为可点击 source link，指向 GitHub 对应文件。
3. 在 Lab 为 `CommandTraceToast` 和 `SourceReveal` 增加真实 preview，而不是只登记元数据。

中期：

1. `Reading Focus Lens`：用于博客阅读页的低噪音段落聚焦。
2. `Case Study Diff`：让项目页展示 before/after、tradeoff、commit/proof。
3. `Memory Map`：等内容对象足够多后再做，而不是现在做空图谱。

继续暂缓：

- 常驻宠物。
- 粒子跟随。
- 假终端 hero。
- 大型图谱。

## 专家判断

第十阶段是正确的“小而硬”的推进。它没有显著增加页面数量，但增加了站点的识别度和可信度。当前最值得警惕的是：不要把 `Source Hover` 停留在装饰层。下一步如果能把 source path 绑定到 GitHub 文件、commit 或文档锚点，它会从微交互变成真正的个人知识与工程追踪系统。
