# 贡献指南

本项目是 `Elegant Developer Studio` 的个人主页与工作室系统。它不是普通模板站，所有贡献都必须服务三个目标：内容可维护、交互有意义、阶段可追溯。

## 首选语言

- 文档、issue 描述、PR 说明首选中文。
- 英文保留在代码路径、组件名、API、品牌名、外部资料标题和必要专有名词中。
- 如果引用英文资料，需要用中文说明它对本项目的实际影响。

## 贡献入口

优先使用结构化入口，不要直接开空白 issue：

- 协作讨论：`https://github.com/njueeRay/elegant-developer-studio/issues/new?template=contact.yml`
- Bug：`https://github.com/njueeRay/elegant-developer-studio/issues/new?template=bug_report.yml`
- 功能建议：`https://github.com/njueeRay/elegant-developer-studio/issues/new?template=feature_request.yml`
- 站点说明：`https://elegant-developer-studio.vercel.app/collaboration`

一个好输入至少包含：

- 背景：你在哪个页面、组件、文档或流程里发现问题。
- 目标：你希望它变得更清楚、更可靠，还是更有表达力。
- 范围：路线、文件、组件、内容、截图或参考链接。
- 约束：不要做什么、必须保留什么、质量标准是什么。

## 变更类型

### 产品与内容

适合：

- 补充真实文章、项目 case study、照片故事、工具说明。
- 修正信息架构、路由命名、页面说明。
- 增加能长期维护的知识条目。

不适合：

- 没有证据的履历包装。
- 泛泛的营销文案。
- 只为了显得丰富而添加页面。

### UI 与交互

适合：

- 降低导航成本的交互。
- 明确状态的反馈。
- 可复用组件。
- 能让站点更有记忆点的克制创意。

不适合：

- 装饰性假终端。
- 只炫不解决问题的动画。
- 会污染阅读、遮挡内容、破坏移动端布局的特效。

### 创意变更

创意不是禁止项，但必须更严：

1. 先说明它服务什么场景。
2. 再说明为什么它符合程序员个人主页。
3. 再说明它可能污染什么。
4. 最后只做最小可验证切片。

当前优先考虑：

- `Command Trace`
- `Source Hover`
- `Reading Focus Lens`
- `Memory Map`
- `Case Study Diff`

暂缓：

- 持久宠物。
- 大型图谱。
- 高强度粒子或赛博朋克背景。

## 本地开发

```bash
npm install --cache .npm-cache
npm run dev
```

常用验证：

```bash
npm run lint
npm run build
npm run test:e2e
```

## 提交前检查

- 新路由必须加入 `src/app/sitemap.ts`。
- 新公开入口必须有 e2e 覆盖。
- 新文档必须更新 `docs/PROJECT_MAP.md` 或对应阶段文档。
- 涉及阶段推进时必须更新 `docs/PROGRESS_LOG.md` 和 `docs/VERSION_TRACE.md`。
- 涉及飞书同步时必须更新 `docs/FEISHU_SYNC.md` 和 `docs/FEISHU_INDEX.md`。
- 视觉或交互改动必须检查桌面和移动端。

## PR 标准

PR 应该回答：

- 改了什么。
- 为什么现在要改。
- 影响哪些页面、组件、文档或协作流程。
- 如何验证。
- 是否需要同步飞书或 GitHub issue。

如果改动只是“看起来更好”，但无法说明它提升了阅读、导航、表达、可信度或维护性，这个改动不应该合并。
