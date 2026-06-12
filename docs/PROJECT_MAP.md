# 项目地图

本文件是 Elegant Developer Studio 的操作地图，定义当前已有内容、后续规划、目录结构、阶段追踪和质量门禁。

## 1. 北极星

构建一个像“优雅开发者工作室”的个人站：

- 有编辑气质，适合写作。
- 有技术语义，能体现工程可信度。
- 有视觉空间，能承载照片、音乐和作品。
- 有结构能力，能逐步扩展成个人操作系统。

必须避免三种失败：

- 泛泛的作品集模板。
- 高密度 SaaS dashboard。
- 装饰性假终端。

## 2. 当前状态

版本：`v0.2.0`

线上：

- Production：`https://elegant-developer-studio.vercel.app`
- GitHub：`https://github.com/njueeRay/elegant-developer-studio`
- 飞书知识库：`https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

已实现：

- 第一阶段首页。
- Developer Atelier 视觉方向。
- `Knowledge` 信息架构。
- 主题切换。
- 命令面板。
- 工作台面板。
- 首页写作、作品、媒体、Knowledge、Lab、Contact 模块。
- 第二阶段内容核心：blog、文章详情、projects、项目详情、MDX 注册表、RSS、sitemap、robots。
- 第三阶段媒体层首版：photos、music、灯箱、迷你播放器。
- 第四阶段交互层首版：全站 Command Center。
- 生成项目/媒体素材。
- PRD、路线图、IA、设计系统、版本追溯、QA、飞书知识库。

## 3. 产品表面地图

| 表面 | 路由 | 阶段 | 状态 | 作用 |
| --- | --- | --- | --- | --- |
| 首页 | `/` | 1 | 已实现 | 第一印象和精选工作室入口 |
| 博客列表 | `/blog` | 2 | 已实现 | 长文和写作归档 |
| 文章详情 | `/blog/[slug]` | 2 | 已实现 | MDX 阅读体验 |
| 项目列表 | `/projects` | 2 | 已实现 | 精选作品和 case study |
| 项目详情 | `/projects/[slug]` | 2 | 已实现 | MDX 项目 case study |
| RSS | `/rss.xml` | 2 | 已实现 | 写作订阅源 |
| Sitemap | `/sitemap.xml` | 2 | 已实现 | 搜索引擎路由地图 |
| Knowledge | `/knowledge` | 5 | 规划中 | 长期知识、片段、学习记录 |
| Photos | `/photos` | 3 | 已实现首版 | 照片档案和灯箱 |
| Music | `/music` | 3 | 已实现首版 | 工作室歌单和收听状态 |
| Lab | `/lab` | 5 | 规划中 | 实验、原型、组件预览 |
| About | `/about` | 5 | 规划中 | 个人介绍、时间线、原则 |
| Uses | `/uses` | 5 | 规划中 | 工具、技术栈、工作流 |

## 4. 阶段地图

### 第一阶段：视觉基础

状态：完成。

追踪：

- Commit：`2efc984`
- 部署记录：`docs/VERSION_TRACE.md`
- QA：`design-qa.md`

完成标准：

- 首页桌面和移动端可用。
- 首屏建立审美和身份。
- 核心组件能延续到后续阶段。
- 构建和视觉 QA 通过。

### 第二阶段：内容核心

状态：完成。

追踪：

- GitHub issue：`#1`，已关闭。
- Milestone：`Phase 2: Content Core`，已关闭。
- 版本：`v0.2.0`

完成内容：

- MDX 内容注册表。
- 3 篇 starter posts。
- 2 个 starter project case studies。
- 标签筛选。
- 阅读进度。
- 文章目录。
- 代码复制交互。
- Metadata rail。
- RSS、sitemap、robots、metadata base。
- 首页接入真实内容 metadata。

主要风险：

- 后续新增内容时破坏 schema 纪律。新增内容必须遵守 MDX metadata 合约。

### 第三阶段：媒体层

状态：进行中。

追踪：

- GitHub issue：`#2`
- Milestone：`https://github.com/njueeRay/elegant-developer-studio/milestone/2`

范围：

- `/photos`
- 照片网格和灯箱。
- `/music` 音乐表面。
- 迷你播放器和真实 UI 状态控制。
- 首页媒体入口接入 `/music`。

已实现：

- `src/data/media.ts`
- `src/app/photos/page.tsx`
- `src/app/music/page.tsx`
- `PhotoGrid`
- `PhotoLightbox`
- `MiniPlayer`
- `TrackList`
- `NowPlaying` 状态区
- 文章阅读微光和 reader mode 提示。

主要风险：

- 媒体变成装饰。照片和音乐必须表达记忆、过程和审美，而不是填充页面。
- 博客互动污染阅读。当前只做可关闭、可降级的阅读增强，不做宠物或重装饰。

### 第四阶段：交互层

状态：进行中。

追踪：

- GitHub issue：`#3`
- Research issue：`#5`

范围：

- 全站命令菜单。
- 全站搜索。
- 筛选。
- 快捷动作。
- 状态面板。

已实现：

- `GlobalCommandMenu`
- 全站 `Cmd K`
- 首页命令按钮触发全站菜单
- 文章、项目、照片、音乐和快捷动作搜索
- 结果点击导航
- Command Center z-index 高于 reader mode

主要风险：

- 交互聪明但无用。每个交互必须减少导航成本或揭示有用上下文。
- 搜索变成假入口。结果必须来自真实站点内容或真实动作。

### 第五阶段：个人工作室操作系统

状态：规划中。

追踪：

- GitHub issue：`#4`

范围：

- `/lab`
- `/about`
- `/uses`
- `/knowledge`
- 可选 analytics、reactions、联系表单、admin。

主要风险：

- 扩展成大量半成品页面。第五阶段应该基于稳定基础组件扩展。

## 5. 仓库地图

```text
docs/
  PRD.md                         产品需求文档
  ROADMAP.md                     阶段计划和组件 backlog
  PROJECT_MAP.md                 产品、仓库、阶段、追踪总地图
  INFORMATION_ARCHITECTURE.md    导航、路由和命名决策
  DESIGN_SYSTEM.md               视觉 tokens 和组件库存
  DECISIONS.md                   产品/架构决策记录
  PROGRESS_LOG.md                阶段进度账本
  PHASE2_RESEARCH.md             第二阶段复盘和调研
  PHASE3_RESEARCH.md             第三阶段媒体层调研和计划
  PHASE3_REVIEW.md               第三阶段媒体层复盘
  PHASE4_RESEARCH.md             第四阶段交互层调研和计划
  FEISHU_SYNC.md                 飞书同步地图和节点 token
  VERSION_TRACE.md               版本、部署、commit 追溯

public/
  assets/                        生产 UI 使用的生成素材
  references/                    已采纳视觉参考

src/
  app/                           Next.js App Router 入口
  components/                    可复用交互组件
  content/                       MDX 文章和项目 case study
  data/                          首页 mock 和未来数据契约
  lib/                           内容注册表和工具函数
```

## 6. 组件地图

已实现：

- `StudioHome`
- `Header`
- `WorkbenchPanel`
- `WorkbenchRow`
- `HighlightCard`
- `SocialLinks`
- `CommandPalette`
- `PostCard`
- `ProjectCard`
- `TagFilter`
- `ReadingProgress`
- `TableOfContents`
- `CodeBlock`
- `MetadataRail`

下一批目标：

- `PhotoGrid`
- `PhotoLightbox`
- `AlbumCard`
- `MiniPlayer`
- `TrackList`
- `NowPlaying`
- `GlobalSearch`
- `StatusPanel`

组件规则：

每个新组件实现前必须回答两个问题：

- 当前由哪个路由或工作流使用？
- 后续哪个阶段能复用，而不是重写？

## 7. 交互地图

当前交互：

- 主题切换。
- 命令面板打开/关闭。
- 媒体 play/pause 状态。
- 锚点导航。
- 卡片 hover。
- 标签筛选。
- 阅读进度。
- 代码复制反馈。
- 文章标题锚点。

研究轨道：

- 带上下文排名的命令面板。
- 项目卡片的 deploy、version、commit、changelog affordances。
- 类似 build pipeline 的阅读进度语义。
- Knowledge 卡片的复制、反向链接、关联链接。
- Lab 卡片的状态、最近运行、branch、preview URL。
- 键盘优先 focus state 和快捷键语法。

非目标：

- 假终端。
- 随机打字效果。
- code rain。
- 首页高密度 dashboard。

## 8. 进度追踪协议

每个有意义阶段必须更新：

1. GitHub issue 或 milestone。
2. `docs/PROGRESS_LOG.md`。
3. 有部署或 release 时更新 `docs/VERSION_TRACE.md`。
4. 有长期决策时更新 `docs/DECISIONS.md`。
5. 同步飞书 Wiki。

每次实现提交应说明：

- 阶段。
- 范围。
- 改动文件。
- 测试或 QA。
- 已知限制。

## 9. 质量门禁

阶段完成前必须确认：

- `npm run lint` 通过。
- `npm run build` 通过。
- 桌面和移动端视觉检查完成。
- 无横向溢出。
- 核心交互已验证。
- 项目地图和进度日志已更新。
- GitHub issue/milestone 状态与仓库一致。
- 飞书知识库已同步，且使用中文为主。

## 10. 下一步

下一步是第三阶段媒体层继续打磨：

1. 为 Command Center 增加键盘上下选择和回车打开。
2. 为搜索结果增加高亮和最近访问。
3. 决定是否引入真实音频文件。
4. 补充照片素材质量和 attribution 策略。
5. 继续打磨灯箱移动端手势和焦点管理。
