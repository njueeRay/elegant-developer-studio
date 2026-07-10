# Elegant Developer Studio

一个面向设计型工程师的优雅个人主页。当前重点是把首页、内容、媒体和交互层逐步沉淀成可追溯、可扩展的个人工作室系统。

## 当前版本

`v0.2.0` - Content Core，第三至九阶段以 Unreleased 切片持续推进。

线上地址：

- 主站：https://raynode.me
- 预览/备用：https://elegant-developer-studio.vercel.app

仓库：

- https://github.com/njueeRay/elegant-developer-studio

已实现：

- Developer Atelier 首页方向。
- `Knowledge` 信息架构，替代早期 `Notes` 概念。
- `/blog`、`/blog/[slug]`、`/projects`、`/projects/[slug]`。
- `/photos`、`/music`、照片灯箱和迷你播放器。
- 项目证据排序、媒体来源说明和 Knowledge 局部关系图层。
- 全站 `Cmd K` Command Center，支持键盘选择、最近访问、分组、高亮、上下文排序和空状态建议。
- `/knowledge`、`/uses`、`/about`、`/lab`、`/contact`、`/collaboration`。
- GitHub Issue Forms、`CONTRIBUTING.md` 和 PR 模板。
- PRD、路线图、IA、设计系统、项目地图、版本追溯和飞书同步文档。

## 本地运行

```bash
npm install --cache .npm-cache
npm run dev
```

打开 `http://localhost:3000`。

## 质量门禁

常规本地检查：

```bash
npm run validate:content
npm run report:command-index
npm run release:evidence -- --local-quality-passed
npm run validate:release-evidence
npm run lint
npm run build
```

E2E 按项目分片执行，避免本地长跑把浏览器资源异常误判为页面缺陷：

```bash
npm run test:e2e:chromium
npm run test:e2e:mobile
```

快速 smoke 与路由耗时观测：

```bash
npm run test:e2e:smoke
npm run perf:routes
npm run perf:routes:raynode
npm run perf:routes:long-tail
npm run perf:routes:long-tail:raynode
```

## 项目文档

- `docs/PRD.md`
- `docs/ROADMAP.md`
- `docs/PROJECT_MAP.md`
- `docs/INFORMATION_ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/CURRENT_CONTEXT.md`
- `docs/AUDIT_ACTION_TODO_2026_07_03.md`
- `docs/PROGRESS_LOG.md`
- `docs/FEISHU_SYNC.md`
- `docs/VERSION_TRACE.md`

历史阶段研究与复盘已逐步归档到 `docs/archive/`。

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

- Phase 42：Homepage Visual Polish。
- 首选切片：OpenProfile 图片移动端裁切、Media 双入口视觉节奏、why.here 显隐、highlight rail 高度和移动端首屏观感。
- 后续队列：Post-16 Content Review Gate、Case Study Diff Specificity Polish、Real Media Replacement Plan、Command Index Threshold Review。
- 暂缓：继续堆首页模块、常驻复杂宠物、大型知识图谱、高强度背景特效，以及没有真实对象来源的新文章。
