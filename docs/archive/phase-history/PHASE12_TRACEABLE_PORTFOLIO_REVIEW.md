# 第十二阶段：可追溯作品集层复盘

日期：2026-06-14

## 完成内容

- `SourceReveal` 升级为可点击的 GitHub source link。
- 新增 `src/lib/source-links.ts`，统一生成仓库源码 URL。
- Knowledge 内容模型新增 `backlinks`。
- `KnowledgeCard` 显示反向链接和真实源码入口。
- Project metadata 新增 `caseStudyDiff`。
- 项目详情页新增 `Case Study Diff`：Before、After、Proof。
- `/lab` 新增第一个真实 `ComponentPreview`。
- `ComponentPreview` 支持 `preview / trace / source` 三个 mode。
- Lab 注册 `ComponentPreview`，并把 `SourceReveal` 状态提升为 Stable。
- 修复 Command Center 鼠标点击结果不稳定导航的问题：点击和键盘 `Enter` 现在都走 `openItem`。
- e2e 增加 GitHub href、Knowledge backlinks、Case Study Diff、ComponentPreview 和 Command Center 点击导航覆盖。

## 关键发现

第十二阶段最重要的发现不是新组件，而是 Command Center 的点击路径问题：

- 旧测试只在 Contact 页面验证了命令结果点击，但 Contact 到 Contact 不会暴露导航失败。
- 首页点击 `command-result-action-lab` 后，URL 仍停留在 `/`。
- 这属于用户明确要求避免的交互级错误：界面看起来可以点，但用户没有到达目标页面。

修复方式：

- 命令结果仍保留 `href` 语义。
- 鼠标点击时显式 `preventDefault()` 并调用 `openItem(item)`。
- 键盘 `Enter` 和鼠标点击统一记录 recent、写入 command trace、关闭面板、执行导航。

## 专家审查

### 优点

- 程序员气质更真实：源码、引用、组件、案例证据都能被检查。
- `/lab` 开始从注册表变成组件工作台。
- `/knowledge` 不再只是分类列表，开始形成轻量知识网络。
- 项目详情从“展示成果”走向“解释变化”。
- e2e 覆盖更接近真实用户路径。

### 缺点

- GitHub source link 当前指向 `main`，不是 commit permalink；追溯稳定性还不够强。
- `ComponentPreview` 还只是 metadata preview，不是可交互组件沙箱。
- Knowledge backlinks 是手写关系，后续内容多了以后需要校验工具。
- `Case Study Diff` 目前是文案证据，没有接入截图、commit、PR 或指标。
- Lab 还没有 viewport switch、props controls 或 visual regression 证据。

### 个人意见

继续做“炫酷”是有必要的，但不是粒子、宠物、假终端那种表层酷。这个个人主页最有价值的方向是：

- 像 IDE 一样可追溯。
- 像设计作品集一样克制漂亮。
- 像知识库一样可引用。
- 像组件实验室一样可拆解。

下一步如果要加更强的视觉巧思，我建议做一个 `Reference Constellation`：它不是大型图谱，而是在当前页面右下角或 Lab 中显示当前内容关联的 3 到 5 个节点，例如文章、小节、源码、组件、项目。它要小、可关闭、只在有真实关系时出现。

## 验证记录

- `npm run lint`：通过。
- `npm run build`：通过。
- targeted e2e：`command menu opens real lab route`、`knowledge entries expose backlinks`、`project case studies expose before and after proof`，6 passed。
- `npm run test:e2e`：78 passed。
- `PLAYWRIGHT_BASE_URL=https://elegant-developer-studio.vercel.app npm run test:e2e`：78 passed。
- Playwright 视觉巡检：`/knowledge`、`/projects/lumen`、`/lab` 的桌面和移动端均无横向溢出。
- 截图：`output/phase12-knowledge-desktop.png`、`output/phase12-project-diff-desktop.png`、`output/phase12-lab-preview-desktop.png`、`output/phase12-knowledge-mobile.png`、`output/phase12-project-diff-mobile.png`、`output/phase12-lab-preview-mobile.png`。
- Vercel deployment：`dpl_CJNVnLikDaf6LjhsDSFDTNFXYkaD`。
- Deployment URL：`https://elegant-developer-studio-m2ez8af5j.vercel.app`。
- Inspect URL：`https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/CJNVnLikDaf6LjhsDSFDTNFXYkaD`。
- Production alias：`https://elegant-developer-studio.vercel.app`。

## 下一步

1. 给 `SourceReveal` 增加可选行号和 commit permalink。
2. 给 `ComponentPreview` 增加 viewport switch。
3. 为 `Case Study Diff` 接入真实截图或 PR 链接。
4. 为 Knowledge backlinks 增加 schema 校验。
5. 设计 `Reference Constellation`，但只在真实关系足够时进入实现。
