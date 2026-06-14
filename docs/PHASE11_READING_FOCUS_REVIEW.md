# 第十一阶段 Reading Focus Lens 复盘

日期：2026-06-14

## 本阶段完成内容

完成 `ReadingFocusLens` 首版：

- 文章页显示当前阅读小节。
- 使用代码风格状态：`read.focus("section-id")`。
- 支持复制当前小节 URL。
- 复制使用现有 `writeToClipboard` 降级工具，避免浏览器权限导致无反馈。
- 文章标题获得当前 section 指示条。
- 正文段落和列表 hover 时有轻微聚焦。
- 移动端保留底部轻量浮层。
- `prefers-reduced-motion` 下取消过渡。

同时完成 Lab 和 Command Center 接入：

- Lab 新增 `ReadingFocusLens` 组件。
- Lab experiment timeline 新增 `Reading focus`。
- Command Center 可通过 `reading focus` 搜索到该组件。

## 代码交付

更新：

- `src/components/content/article-interactions.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/globals.css`
- `src/data/lab.ts`
- `tests/site-access.spec.ts`

新增：

- `docs/PHASE11_READING_FOCUS_RESEARCH.md`
- `docs/PHASE11_READING_FOCUS_REVIEW.md`

## 行为说明

文章页右下角显示当前 section：

```text
reading focus
The technical texture
read.focus("the-technical-texture")
```

用户点击 `Copy ref` 后，复制当前文章 section URL，例如：

```text
https://elegant-developer-studio.vercel.app/blog/interface-is-a-promise#the-technical-texture
```

关键约束：

- 来源必须是文章真实 TOC。
- 不硬编码具体文章标题或小节。
- 不阻塞正文阅读。
- 移动端不依赖 hover。
- 复制失败必须降级处理。

## 优点

- 比宠物或粒子更适合当前站点：它服务阅读和引用。
- 程序员气质更自然：section id、命令式状态、copy ref 都是真实对象。
- 可复用：未来可以进入 Knowledge 详情页和项目 case study。
- 可测试：e2e 覆盖当前小节、复制反馈、Lab 和 Command Center 发现路径。
- 可降级：reduced motion 下不会保留多余动画。

## 缺点

- 当前只在博客详情页生效，Knowledge 还没有详情页，因此复用价值尚未完全释放。
- 当前 focus layer 是浮层，不是 inline reader rail；在更长文章中可能需要更强的段落定位能力。
- section 更新依赖 heading 和滚动位置，复杂 MDX 嵌套后需要继续观察。
- `Copy ref` 只复制 URL，还没有复制 Markdown 引用格式。

## 创意建议

当前个人主页的优势：

- 气质稳定：Claude/Apple 的温和阅读感和 Primer 的技术语义已经建立。
- 路由完整：博客、项目、照片、音乐、知识、Uses、About、Lab、Contact、Collaboration 都可访问。
- 程序员风格开始变真实：Command Trace、Source Reveal、Reading Focus 都是可执行或可追踪的对象。

当前主要问题：

- 内容深度还不够。很多页面结构已经到位，但真实文章、项目 case study 和照片叙事还需要填充。
- Lab 还偏 metadata registry，缺少真正的 isolated interactive preview。
- Source Reveal 还没有变成可点击 GitHub source link。
- 作品页还缺少“工程取舍”的表达，例如 diff、commit、decision、tradeoff。

我建议后续创意不要走“更花”的路，而走“更可操作”的路：

1. `Source Link`
   把 source path 变成 GitHub 文件链接，最好带 commit 或 line anchor。

2. `Case Study Diff`
   在项目详情页展示 before/after、设计取舍、代码取舍和结果证据。

3. `Knowledge Backlinks`
   每个知识对象显示它关联到哪些文章、项目、工具和决策。

4. `Lab ComponentPreview`
   让 Lab 不只是列表，而是能直接操作小组件状态。

5. `Studio Companion`
   不做常驻宠物。可以做一个只在空状态、搜索无结果、第一次进入 Lab 时出现的 contextual helper。

## 验证结果

本地验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `npm run test:e2e`：72 passed。
- targeted e2e：`article reading focus` 和 `lab and command center`，4 passed。
- 生产环境 e2e：`PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`，72 passed。
- Vercel deployment：`dpl_6yfkF68Y9W9CYkURgc4hcCe2XSxL`。
- Production alias：`https://elegant-developer-studio.vercel.app`。
- Deployment URL：`https://elegant-developer-studio-1bar07nc4.vercel.app`。

Playwright 视觉巡检：

- 桌面和移动端文章页均无横向溢出。
- 桌面滚动到第二小节后显示 `read.focus("the-technical-texture")`。
- 移动端显示 `read.focus("a-promise-has-shape")`，底部浮层未越界。
- 截图：`output/phase11-reading-focus-desktop.png`、`output/phase11-reading-focus-technical-desktop.png`、`output/phase11-reading-focus-mobile.png`。

新增测试覆盖：

- 文章页 `ReadingFocusLens` 可见。
- 初始 section 为 `A promise has shape`。
- 滚动到 `The technical texture` 后 focus 更新。
- `Copy ref` 显示 `Copied ref`。
- `/lab` 可见 `ReadingFocusLens`。
- Command Center 搜索 `reading focus` 可见 `command-result-lab-reading-focus-lens`。

## 下一阶段建议

优先：

1. 把 `SourceReveal` 升级为 GitHub source link。
2. 在 Lab 做第一个真正的 `ComponentPreview`。
3. 为项目详情页增加 `Case Study Diff`。

暂缓：

- 全站背景粒子。
- 常驻宠物。
- 大型图谱。
- 高强度音乐可视化。

## 专家判断

第十一阶段的方向是对的。它满足用户希望“有巧思、有交互、有程序员风格”的需求，但没有牺牲阅读页面的主要任务。炫酷不是问题，问题是廉价炫酷。本站更适合做“可检查、可复制、可追踪、可轻微玩”的酷。
