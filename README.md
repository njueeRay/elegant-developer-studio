# Elegant Developer Studio

一个面向设计型工程师的优雅个人主页。当前重点是把首页、内容、媒体和交互层逐步沉淀成可追溯、可扩展的个人工作室系统。

## 当前版本

`v0.2.0` - Content Core，第四阶段交互层仍在 Unreleased 切片中推进。

线上地址：

- https://elegant-developer-studio.vercel.app

仓库：

- https://github.com/njueeRay/elegant-developer-studio

已实现：

- Developer Atelier 首页方向。
- `Knowledge` 信息架构，替代早期 `Notes` 概念。
- `/blog`、`/blog/[slug]`、`/projects`、`/projects/[slug]`。
- `/photos`、`/music`、照片灯箱和迷你播放器。
- 全站 `Cmd K` Command Center，支持键盘选择、最近访问、分组、高亮、上下文排序和空状态建议。
- PRD、路线图、IA、设计系统、项目地图、版本追溯和飞书同步文档。

## 本地运行

```bash
npm install --cache .npm-cache
npm run dev
```

打开 `http://localhost:3000`。

## 项目文档

- `docs/PRD.md`
- `docs/ROADMAP.md`
- `docs/PROJECT_MAP.md`
- `docs/INFORMATION_ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/PHASE2_RESEARCH.md`
- `docs/PHASE3_RESEARCH.md`
- `docs/PHASE3_REVIEW.md`
- `docs/PHASE4_RESEARCH.md`
- `docs/PHASE4_REVIEW.md`
- `docs/PHASE4_KEYBOARD_RESEARCH.md`
- `docs/PHASE4_KEYBOARD_REVIEW.md`
- `docs/PHASE4_CONTEXT_RESEARCH.md`
- `docs/DECISIONS.md`
- `docs/PROGRESS_LOG.md`
- `docs/FEISHU_SYNC.md`
- `docs/VERSION_TRACE.md`

## 目录结构

```text
src/app             Next.js App Router 入口
src/components      可复用组件和交互 UI
src/content         MDX 文章和项目 case study
src/data            首页、媒体和 IA 数据
src/lib             内容注册表和工具函数
public/assets       项目使用的生成图片
public/references   已采纳视觉参考
docs                产品、路线图、IA、追溯和阶段文档
```

## 下一阶段

- 第四阶段继续：`StatusPanel`、`FilterBar`、更强的全站搜索判断。
- 第五阶段：`/lab`、`/about`、`/uses`、`/knowledge`、reactions、联系和可选后台。
