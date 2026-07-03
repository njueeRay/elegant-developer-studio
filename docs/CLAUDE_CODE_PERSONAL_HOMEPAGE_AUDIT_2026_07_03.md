# Ray Studio 个人主页全面审视报告

> 生成日期：2026-07-03  
> 审视对象：`elegant-developer-studio` / Ray Studio 个人主页  
> 审视方式：Claude Code 切换 `glm-5.2` 后独立评审 + Codex 本地验证复核  
> 置信度：高

## 0. 方法与边界

本报告不是单纯的 UI 观感反馈，而是从产品定位、个人品牌、信息架构、内容策略、前端工程、SEO、部署运维和后续路线图八个层面审视这个个人主页。

本次已完成的客观验证：

- Claude Code 已通过 Packy API 切换到 `glm-5.2` 并连通，最小测试返回 `GLM_5_2_CLAUDE_CODE_OK`。
- `npm run validate:content` 通过：当前内容量为 4 篇 posts、2 个 projects、6 条 knowledge entries。
- `npm run lint` 通过。
- `npm run build` 通过，Next.js 16.2.9 使用 Turbopack 成功生成 29 个路由。
- 已读取并抽查：`package.json`、`README.md`、`PRODUCT.md`、`src/app/*`、`src/components/*`、`src/data/*`、`src/lib/content.ts`、`docs/*`。

需要说明：第一次让 Claude Code 自主使用工具扫描仓库时，进程长时间无可靠输出后被中断；第二次采用“事实包输入 + 无工具模式”完成独立审阅。因此，本报告中的 Claude Code 独立意见基于仓库事实、关键源码摘录和验证结果，而不是一次完整的工具遍历会话。这个边界不影响核心判断，因为关键证据已经由 Codex 本地命令验证。

## 1. 执行摘要

这个项目的工程能力、文档意识、审美控制和系统化思维，在个人主页项目里明显处于上游水平。它不是一个套模板的 portfolio，而是在尝试构建一个“个人工作室操作系统”：写作、作品、知识库、媒体、工具、协作入口、命令中心和证据链都被纳入同一套叙事。

但当前最大问题也正来自这里：系统骨架已经接近一个成熟工作室，真实公开内容资产却远远不足。现在的比例很不健康：

- `docs/` 下有 60+ 份阶段研究、复盘、计划和同步文档。
- 面向访客的核心内容只有 4 篇博客、2 个项目、6 条知识条目。
- 首页、Command Center、Knowledge、Lab、Uses、Collaboration 等表面已经为一个“几十到上百条内容”的系统做了准备。

一句话结论：**这是一个工程和系统设计很强、但内容样本密度不足的个人主页。它不是缺技术，而是有明显的“用系统化替代持续表达”的风险。**

最尖锐的问题有三个：

1. **高结构，低样本密度**：架构像成熟内容系统，内容量像早期 demo。
2. **自我指涉过强**：项目、知识、博客大量围绕“这个站本身如何建设”，外部可验证作品还不够。
3. **首页存在硬编码状态信号**：`src/data/home.ts` 里的 latest commit、draft essay、music cue 并非真实动态数据，这与项目自己反对的 “fake terminal aesthetics” 冲突。

## 2. 当前系统事实

### 2.1 技术栈

见 `package.json`：

- Next.js `16.2.9`
- React `19.2.4`
- TypeScript
- Tailwind CSS v4
- MDX
- Playwright
- ESLint 9
- lucide-react

脚本：

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run validate:content`
- `npm run test:e2e`

工程状态良好：lint、内容关系校验、生产构建均通过。

### 2.2 路由结构

核心路由：

- `/`
- `/blog`
- `/blog/[slug]`
- `/projects`
- `/projects/[slug]`
- `/knowledge`
- `/knowledge/[slug]`
- `/uses`
- `/about`
- `/lab`
- `/photos`
- `/music`
- `/contact`
- `/collaboration`
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`

这是一个完整的个人工作室 IA，而不是普通个人主页。

### 2.3 内容资产

来自 `src/lib/content.ts` 和 `npm run validate:content`：

- Posts：4 篇
- Projects：2 个
- Knowledge entries：6 条

这个内容量不能支撑当前这么重的信息架构。它能证明系统设计能力，但还不能充分证明长期输出能力、项目经验密度和个人主页的公共价值。

## 3. 产品定位判断

`PRODUCT.md` 里的定位非常清楚：

- 不是简历模板。
- 不是 GitHub clone。
- 不是 SaaS dashboard。
- 不是 generic portfolio。
- 是一个 public personal studio。

这个判断是对的。Ray Studio 的优势不应该是“我会做网页”，而应该是：

- 我如何思考产品；
- 我如何把设计判断变成代码；
- 我如何维护长期知识；
- 我如何让协作、证据、文档、界面形成一套可靠系统；
- 我如何在 AI-native 工作流里保持判断力。

问题在于，当前站点更像是在证明“我能构建一个表达这些能力的系统”，还没有充分证明“我已经持续生产了足够多值得被这个系统承载的内容”。

判断：**定位成立，但内容厚度还没有跟上定位。**

置信度：高。

## 4. 信息架构审视

### 4.1 做得好的地方

`Knowledge` 替代早期 `Notes` 是正确的。`src/data/knowledge.ts` 把每条知识定义为：

- `kind`
- `status`
- `signal`
- `protects`
- `citation`
- `related`
- `backlinks`
- `relatedPostSlugs`
- `relatedProjectSlugs`

这说明项目没有把知识库当成“卡片墙”，而是把它看作可引用、可追溯、可连接的工作记忆。

`src/lib/content.ts` 的内容注册表也有清晰模型：

- `PostMeta`
- `ProjectMeta`
- `evidencePack`
- `caseStudyDiff`
- related links
- static generation support

这套结构适合长期扩展。

### 4.2 核心问题：IA 过载

当前路由和组件数量已经非常丰富，但内容量偏小：

- 为 4 篇文章准备了完整博客 archive、tag filter、language filter、related reading。
- 为 2 个项目准备了 evidence pack、case study diff、project explorer。
- 为 6 条知识准备了 knowledge explorer、backlinks、copy refs、Command Center indexing。
- 为个人站准备了 `/collaboration`、Issue Forms、PR template、Feishu sync、phase docs。

这不是错误，但顺序有问题。现在不是“系统不够”，而是“系统过早成熟”。

建议：

- 暂停继续扩张新 surface。
- 把未来 4-6 周的主目标从“新增交互/新增架构”改为“填充高质量内容”。
- 等 posts > 15、projects > 5、knowledge entries > 25 后，再考虑引入更复杂的信息组织。

置信度：高。

## 5. 内容策略审视

### 5.1 当前内容的优势

已有内容主题是统一的：

- interface as promise
- calm systems
- commands that respect attention
- Chinese as product memory
- Lumen design system
- studio knowledge base

它们都围绕一个清晰人格：设计工程、系统感、克制、可追溯、中文作为判断层、AI-native 工作流。

这个方向是有辨识度的，不像常见个人主页那样堆技能标签。

### 5.2 致命弱点：自我指涉闭环

当前很多内容在讨论“这个站点如何成为一个系统”：

- `studio-knowledge-base` 是本站本身的项目。
- 多数 knowledge entries 是本站构建原则。
- phase docs 大量记录本站演进。
- 博客也有相当比例在论证本站的工作方法。

这会造成一个外部访客视角下的问题：**Ray 看起来很会建设个人系统，但我还没有看到足够多来自外部世界的复杂问题、真实约束和实际交付。**

个人主页可以自我指涉，但不能主要自我指涉。否则它会从“工作室”变成“工作室建设日志”。

建议新增三类内容：

1. **外部项目 case study**
   - 不一定是商业机密项目，可以是公开 demo、开源贡献、复盘过的产品拆解。
   - 重点不是项目多大，而是要有真实约束、取舍、失败和结果。

2. **判断型中文长文**
   - 既然 `PRODUCT.md` 强调“Chinese carries judgment and project memory”，就应该让中文成为公开判断资产。
   - 目标不是翻译英文内容，而是写中文里更锋利、更真实的工作判断。

3. **可复用技术笔记**
   - 例如 Next.js standalone 部署、Caddy 反代、个人服务器安全、Feishu bridge、Codex/Hermes 协作等。
   - 这些内容与你最近实际做的服务器工作高度相关，比抽象原则更能建立可信度。

置信度：高。

## 6. 首页体验审视

### 6.1 优点

`src/components/studio-home.tsx` 的首页不是普通 hero + projects 列表，而是有明显的工作台感：

- hero copy
- command strip
- social links
- workbench panel
- status panel
- highlights
- knowledge/lab/uses/about/contact lower grid
- latest writing

它传达的不是“我是谁”，而是“这是一个正在运行的工作室”。这个方向是成立的。

### 6.2 问题：首屏信号过密

首页同时承担了太多任务：

- 品牌识别
- 个人定位
- 命令中心入口
- 社交入口
- 当前工作状态
- 内容导航
- 项目展示
- 知识库入口
- 工具流入口
- 联系入口

这种密度会削弱第一个判断：访客到底应该先相信什么？

当前更像“我构建了很多东西，你可以都看看”，而不是“这是我最强的三个证据”。

建议首页重新排序：

1. 首屏只保留：
   - Ray Studio
   - 一句明确定位
   - 2 个主入口：Read / Work
   - 一个真实状态信号

2. 第二屏放：
   - 2 篇最强文章
   - 2 个最强项目

3. 第三屏再放：
   - Knowledge / Lab / Uses / Media

这样会更有力量。

置信度：中高。

## 7. 重大原则性问题：硬编码“假工作台状态”

`src/data/home.ts` 中：

```ts
export const workbenchItems: WorkbenchItem[] = [
  {
    label: "Latest commit",
    title: "ray-studio/design-system",
    detail: "feat: add color scales and elevation tokens",
    meta: "main / a7f3c2e / 2h ago",
    status: "healthy",
  },
  ...
];
```

这类内容如果不是动态来源，就是假状态。

这不是小问题。因为 `PRODUCT.md` 明确反对：

- fake terminal aesthetics
- decorative command UI
- technical surfaces that do not perform real work

而硬编码 latest commit 正好踩中了这个红线。

处理方式只有两个：

1. **真实化**
   - build-time 读取 Git commit；
   - 或接 GitHub API；
   - 或部署时注入 `NEXT_PUBLIC_COMMIT_SHA`；
   - 或把状态改成明确的 editorial note，不伪装成实时数据。

2. **删除**
   - 如果现在不打算维护动态数据，直接删除 workbench latest commit 这一项。

建议优先级：P0。

置信度：高。

## 8. 前端架构审视

### 8.1 强项

工程基础是稳的：

- TypeScript 类型较完整。
- MDX 内容与 meta 注册清楚。
- App Router 路由组织清晰。
- `validate:content` 能防止关系断裂。
- `sitemap.ts`、`robots.ts`、`rss.xml/route.ts` 齐全。
- 构建通过，29 个页面生成成功。
- `output: standalone` 已适配服务器部署路线。

### 8.2 弱项

#### 8.2.1 内容注册手工维护

`src/lib/content.ts` 目前需要手动 import 每篇 MDX：

```ts
import InterfacePromiseContent, { meta as interfacePromiseMeta } from "@/content/posts/interface-is-a-promise.mdx";
```

内容少时没问题；内容超过 20 篇后，这会变成摩擦。

建议：

- 短期可以保留。
- 当 posts > 12 时，引入文件系统自动发现或内容索引生成脚本。
- 不建议现在立刻重构，因为当前瓶颈不是工程，而是内容量。

#### 8.2.2 根布局数据过多

`src/app/layout.tsx` 中 `getCommandItems()` 汇集了大量数据：

- posts
- projects
- knowledge
- uses
- lab
- media
- about
- collaboration

当前体量下没问题；但内容增长后，根布局会变重。Command Center 可以逐步拆成懒加载或按需加载。

#### 8.2.3 全站 AmbientCursorField 风险

`AmbientCursorField` 被挂在 root layout：

```tsx
<AmbientCursorField />
```

它对首页可能有氛围价值，但对长文阅读页可能是干扰。建议至少在文章详情页、知识详情页弱化或关闭。

置信度：中高。

## 9. SEO 与可发现性

### 9.1 已具备基础

- metadata 有全局 title/description。
- sitemap、robots、RSS 已有。
- 文章和项目静态生成。
- 内容结构利于搜索引擎抓取。

### 9.2 当前 SEO 杠杆偏弱

根本原因不是技术，而是内容太少。4 篇文章无法形成搜索入口矩阵。

另外，`src/app/layout.tsx` 里：

```tsx
<html lang="en">
```

但站点已有中文内容，并且中文被定义为“判断和项目记忆”的承载语言。长期看，中文页面应该有更准确的 language 标记。Next.js App Router 下单独切换 `<html lang>` 不总是简单，但至少应在中文文章 metadata、Open Graph、页面结构里更明确标识语言。

建议：

- 中文文章至少形成 8-12 篇专题簇。
- 每篇中文文章有明确中文标题、摘要、OG。
- RSS 中保留 language 信息。
- 以后考虑 `/zh` 不一定必要，但中文内容页的元数据要更认真。

置信度：中。

## 10. 部署与运维

当前项目已能：

- Vercel 部署。
- 本地构建。
- standalone 输出并部署到 RayNode 服务器。
- Caddy 反向代理线上域名。

这说明项目已经从纯前端 demo 进入“可自托管应用”的阶段。

但 README 仍主要指向：

```md
https://elegant-developer-studio.vercel.app
```

现在 `raynode.me` 已经上线，文档应补齐：

- Vercel 作为预览/备用？
- RayNode 作为主站？
- 部署脚本如何生成 standalone 包？
- systemd 服务名是什么？
- Caddy 如何保留 `/feishu/oauth/*`？

建议新增：

- `docs/DEPLOYMENT_RAYNODE.md`
- 或更新 `docs/VERSION_TRACE.md` / `README.md`

置信度：高。

## 11. 文档系统审视

`docs/` 下的文档非常丰富，但已经接近过载。

典型文档包括：

- `PRD.md`
- `ROADMAP.md`
- `PROJECT_MAP.md`
- `PROGRESS_LOG.md`
- `VERSION_TRACE.md`
- `FEISHU_SYNC.md`
- 大量 `PHASE*_RESEARCH.md`
- 大量 `PHASE*_REVIEW.md`

这对个人项目有双刃剑效应：

好处：

- 决策可追溯。
- AI agent 接手容易。
- 项目演进有上下文。

坏处：

- 文档数量远高于公开内容数量。
- 维护成本吞噬创作时间。
- 新对话接手时容易被历史阶段淹没。

建议：

- 保留 `PRD.md`、`ROADMAP.md`、`PROJECT_MAP.md`、`PROGRESS_LOG.md`、`VERSION_TRACE.md`。
- 把早期 phase 文档归档到 `docs/archive/`。
- 新增一个 `docs/CURRENT_CONTEXT.md`，只保留当前项目状态、主线目标、下一步。
- 以后每个 phase 不再同时写 research + review，改成一个轻量 `PHASE_LOG.md` 条目。

置信度：高。

## 12. 风险清单

| 风险 | 严重度 | 证据 | 建议 |
|---|---:|---|---|
| 内容密度不足 | 高 | 4 posts / 2 projects / 6 knowledge entries | 未来 4-6 周优先写内容 |
| 首页硬编码假状态 | 高 | `src/data/home.ts` 的 latest commit/draft | 删除或接真实数据 |
| 自我指涉过强 | 高 | 项目和知识大量围绕本站本身 | 增加外部项目 case study |
| 文档数量压过公开资产 | 中高 | `docs/` 60+ 文件 | 归档 phase docs |
| 首页信息过载 | 中高 | `src/components/studio-home.tsx` | 首屏减法 |
| 全站氛围动效可能干扰阅读 | 中 | `AmbientCursorField` root layout | 详情页禁用或弱化 |
| 内容注册手工维护 | 中 | `src/lib/content.ts` | 内容增长后自动索引 |
| 中英文语言策略未完全落地 | 中 | `html lang="en"` + 中文内容偏少 | 增加中文判断型内容 |
| `/collaboration` 对当前阶段偏重 | 中低 | solo 项目治理 surface 过大 | 合并或降权 |
| 测试覆盖不明确 | 中低 | 有 Playwright 但未确认关键路径覆盖 | 增加 4 条核心 e2e |

## 13. 优先级路线图

### P0：立刻修

1. 处理 `src/data/home.ts` 的假 workbench 状态。
   - 如果不能真实化，删除 latest commit 伪实时文案。
   - 如果要保留，接 GitHub commit 或 build-time git metadata。

2. 更新部署文档。
   - README 增加 `raynode.me`。
   - 记录 RayNode standalone 部署路径、systemd、Caddy、回滚方式。

3. 清除过期文案。
   - 首页 `/lab` 面板仍写 “The lab becomes its own surface in Phase 5”，现在已经不合时宜。

### P1：未来 2-4 周

1. 写 6 篇高价值内容，而不是继续加系统。
   - 2 篇中文判断型长文。
   - 2 篇真实工程部署/AI agent 工作流复盘。
   - 2 篇产品/设计系统 case study。

2. 新增至少 1 个非本站项目 case study。
   - 哪怕是小项目，也要有真实约束、代码、截图、结果。

3. 首页减法。
   - 降低首屏密度。
   - 把 Command Center 从首屏主角降为辅助入口。
   - 保留最强证据而不是铺满入口。

### P2：未来 1-2 个月

1. 归档 `docs/PHASE*`。
2. 建立 `docs/CURRENT_CONTEXT.md`。
3. 给 Command Center、filter、photo lightbox、music player 增加 Playwright e2e。
4. 当 posts 超过 12 篇，再考虑内容自动发现。

### P3：长期

1. 把 Ray Studio 变成真正的个人知识与作品网络。
2. 形成中英文内容分工：
   - 中文：判断、复盘、项目记忆、AI 协作实践。
   - 英文：开放技术语境、代码、组件、项目说明。
3. 将服务器、Codex、Feishu、Hermes/Codex 协作实践变成公开系列文章。

## 14. 最终判断

Ray Studio 当前不是失败项目，而是一个典型的“高能力建造者陷阱”：你已经把未来个人工作室的系统骨架建得很漂亮，但公开内容还没有足够多、足够真实、足够外部化。

这个项目现在最需要的不是再加一个交互、再做一个组件、再写一份 phase research，而是停止扩建脚手架，开始往里面放真正能让别人判断你的东西：

- 真实项目；
- 真实问题；
- 真实约束；
- 真实失败；
- 真实取舍；
- 真实部署；
- 真实协作记录；
- 真实文章。

如果接下来继续扩系统，站点会变成一个精致但空旷的“个人主页基础设施展厅”。如果接下来转向内容和外部案例，它会成为一个很有辨识度、并且真正能建立信任的个人工作室。

最终优先级判断：

1. **先修假状态。**
2. **再补真实内容。**
3. **然后减首页密度。**
4. **最后才继续扩展系统。**

置信度：高。

## 15. Codex 交叉审视补充：Claude Code 漏掉或判断不够精确的部分

> 补充时间：2026-07-03  
> 补充方式：Codex 复查源码、线上输出、Playwright、Next.js 官方文档与 WAI-ARIA/WCAG 资料。  
> 总体判断：Claude Code 的主结论成立，但它低估了测试系统的成熟度，同时漏掉了一个比“内容不足”更靠近线上风险的点：**raynode.me 已经上线，但 SEO、RSS、sitemap、robots、项目证据仍停留在 Vercel 旧域名与旧测试数字。**

### 15.1 对 Claude Code 结论的修正

Claude Code 把测试覆盖描述得偏保守。实际情况不是“缺少测试”，而是：

- `tests/site-access.spec.ts` 很强，覆盖了公开路由、导航、移动端、中文内容、Command Center、query-backed filters、source reveal、knowledge backlinks、copy feedback、music controls、issue template 和 repository governance。
- 本次实测 `npm run test:e2e`：**112 passed**。
- `npm run lint`、`npm run validate:content`、`npm run build` 也均通过。

因此，工程健康度应上调：这个项目不是“有脚本但测试薄”，而是“本地测试已经相当扎实，但自动化门禁和证据同步不够扎实”。

更精确的判断：

- 本地质量保障：高。
- CI 门禁：低到未知，因为 `.github/` 只有 Issue/Pull Request 模板，没有 workflow。
- 线上证据同步：中低，因为项目页面仍写旧的 Vercel deployment 和旧的 e2e 数字。

置信度：高。

### 15.2 P0 新风险：主域名和 SEO 事实源已经漂移

现在 `raynode.me` 已经部署上线，但代码和线上输出仍把 `https://elegant-developer-studio.vercel.app` 当作主站。

证据：

- `src/app/layout.tsx`：
  - `metadataBase: new URL("https://elegant-developer-studio.vercel.app")`
- `src/app/sitemap.ts`：
  - `const siteUrl = "https://elegant-developer-studio.vercel.app"`
- `src/app/robots.ts`：
  - `sitemap: "https://elegant-developer-studio.vercel.app/sitemap.xml"`
- `src/app/rss.xml/route.ts`：
  - `const siteUrl = "https://elegant-developer-studio.vercel.app"`
- `README.md`：
  - 线上地址仍是 Vercel。
- 线上 `https://raynode.me/sitemap.xml` 实际输出的 `<loc>` 仍全部是 Vercel URL。
- 线上 `https://raynode.me/rss.xml` 的 `<link>` 和 `<guid>` 仍全部是 Vercel URL。
- 线上 `https://raynode.me/robots.txt` 指向 Vercel sitemap。

这不是文档小错，而是搜索引擎和订阅系统层面的主权错位。Next.js 官方文档明确把 Metadata API、sitemap、robots 作为 SEO 与社交分享的基础能力：见 [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)、[Next.js sitemap file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)、[Next.js robots file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。

如果 `raynode.me` 是未来主站，那么 P0 应改为：

1. 定义唯一 `SITE_URL`。
2. 用环境变量或单一配置文件驱动 `metadataBase`、sitemap、robots、RSS、project externalUrl。
3. 明确 Vercel 是 preview/backup，还是历史旧主站。
4. 更新 README、VERSION_TRACE、PROGRESS_LOG 里 “server deployment attempt failed” 的历史状态，追加“已修复并上线”的事实。

建议实现形态：

```ts
// src/lib/site.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://raynode.me";
```

然后替换：

- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/rss.xml/route.ts`
- `src/content/projects/*.mdx` 中的线上入口

置信度：高。

### 15.3 “证据系统”现在最大的问题不是字段太多，而是证据会过期

Claude Code 批评 `evidencePack` 字段过重，这个判断部分成立，但还不够尖锐。更根本的问题是：**证据系统被手工写进 MDX 后，会迅速腐烂。**

最直接证据：

- `src/content/projects/lumen.mdx` 写着：
  - `metric: "108 e2e tests passed"`
  - `deploymentId: "dpl_AFdKdXk3heycQR32WWMBBffzrSMe"`
  - `verifiedAt: "2026-07-02"`
- 但本次实测：
  - `npm run test:e2e` 是 **112 passed**。
- `docs/PROGRESS_LOG.md` 最新记录也已经出现：
  - `Production e2e ... 112 passed`
  - `Vercel deployment：dpl_Cyu6PVJdcqehP5xCLGQYComca8au`

结论：项目有“证据 UI”，但没有“证据事实源”。这会比没有证据更危险，因为它制造了精确幻觉。

更好的结构不是删除 evidencePack，而是把 evidencePack 降级为展示层，事实来自单一来源：

- `docs/VERSION_TRACE.md` 或 `docs/PROGRESS_LOG.md` 的结构化条目；
- 或 `src/data/evidence.ts`；
- 或构建时读取 `playwright-report` / CI artifact；
- 或部署时注入 `DEPLOYMENT_ID`、`COMMIT_SHA`、`E2E_TOTAL`。

短期务实方案：

1. 把 `108 e2e tests passed` 改成不带数量的事实：
   - “Playwright covers public routes, interaction contracts, and mobile overflow.”
2. 把 deployment id 从展示卡移到 `VERSION_TRACE`，项目页只显示“latest verified deployment”链接。
3. 若坚持显示数字，就生成 `src/data/release-evidence.json`，不要手写在 MDX。

置信度：高。

### 15.4 可访问性：Claude Code 对动效批评偏重，但漏掉了 modal 焦点问题

Claude Code 说 `AmbientCursorField` 全站挂载可能干扰阅读，这成立，但它漏掉一个反向事实：项目已经处理了 reduced motion。

证据：

- `src/components/ambient-cursor-field.tsx`：
  - 使用 `window.matchMedia("(prefers-reduced-motion: reduce)")`，用户开启 reduced motion 时直接返回。
- `src/app/globals.css`：
  - 有 `@media (prefers-reduced-motion: reduce)`；
  - 会关闭多处 animation/transition；
  - 会隐藏 cursor glow 和 reader spotlight。

这符合 W3C/WCAG 对 reduced motion 的方向：见 [W3C Technique C39: Using prefers-reduced-motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39)。

但另一个问题更值得修：

`src/components/global-command-menu.tsx` 中 Command Center 使用：

```tsx
role="dialog"
aria-modal="true"
aria-label="Global command center"
```

它有 `autoFocus`，有 Escape 关闭，有 body scroll lock，但没有看到明确的：

- Tab / Shift+Tab focus trap；
- 关闭后 focus restore 到触发按钮；
- background inert；
- modal 内初始焦点与返回焦点的测试。

WAI-ARIA Authoring Practices 对 modal dialog 的核心要求是：Tab 与 Shift+Tab 不应把焦点移出 dialog，modal 关闭前键盘焦点应被包含在 dialog 内。见 [W3C WAI-ARIA APG Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)。

建议新增 e2e：

- 打开 Command Center；
- 连续按 Tab，确认焦点仍在 dialog 内；
- Escape 关闭后，焦点回到 `home-command-trigger` 或最近触发元素；
- 移动端菜单也加类似测试。

如果不想自己维护焦点细节，可以考虑把 Command Center 的 dialog 层换成成熟无障碍 primitive，而不是手写。

置信度：中高。

### 15.5 `GlobalCommandMenu` 的根布局序列化风险比 Claude 说得更具体

Claude Code 提到 `getCommandItems()` 在 `RootLayout` 同步调用可能变重，这个方向对，但更具体的问题是：**Command Center 的 index 被根布局组装并传给 client component，内容增长后会进入初始 HTML/RSC payload。**

线上 `https://raynode.me` 的 HTML 中已经能看到大量 serialized command items，包括：

- posts；
- projects；
- evidencePack；
- about timeline；
- capabilities；
- creative ideas；
- media；
- knowledge；
- uses；
- lab components。

当前体量可接受，但当内容增长到目标状态时，这会变成首屏负担。尤其讽刺的是：你越解决“内容不足”，这个架构越会暴露性能问题。

建议分三阶段：

1. 当前：保留现状，不急着重构。
2. posts > 15 / knowledge > 25 时：
   - Command index 从 root layout 移出；
   - 打开 Cmd K 时再懒加载 index；
   - 或提供 `/api/command-index` / static JSON。
3. posts > 50 时：
   - 引入轻量搜索索引；
   - recent/context ranking 仍在 client；
   - 内容 metadata 走 build artifact。

判断：这不是 P0，但应该写入技术债。

置信度：中高。

### 15.6 “没有 CI”比“没有测试”更危险

仓库有：

- `.github/ISSUE_TEMPLATE/*`
- `.github/PULL_REQUEST_TEMPLATE.md`

但未看到：

- `.github/workflows/*.yml`

这意味着项目花了很多精力建设协作入口和治理表面，但缺少真正约束质量的自动门禁。

这正好呼应项目自身问题：**治理表面比治理机制更先成熟。**

建议新增最小 GitHub Actions：

- install；
- `npm run lint`；
- `npm run validate:content`；
- `npm run build`；
- `npx playwright test --project=chromium`；
- 可选：每晚或 main merge 后跑 full `npm run test:e2e` 双浏览器项目。

优先级：P1，不是 P0。P0 仍是域名/证据一致性。

置信度：高。

### 15.7 `metadata` 不只是域名问题，还缺 canonical/OG URL 策略

动态详情页已经有 `generateMetadata`：

- `src/app/blog/[slug]/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/knowledge/[slug]/page.tsx`

但当前返回主要是：

- title；
- description；
- openGraph title/description/type；
- project image。

缺少更完整的策略：

- canonical URL；
- `openGraph.url`；
- `twitter` card；
- 中文文章 language/locale；
- 首页和列表页的 OG image；
- `alternates`。

Next.js Metadata API 本身支持这些能力，问题不是框架缺失，而是站点还没有把“可分享性”当成内容产品的一部分。

建议：

1. 增加 `src/lib/metadata.ts`：
   - 统一 title template；
   - 统一 canonical；
   - 统一 OG；
   - 统一 `siteUrl`。
2. 为每个 post/project/knowledge 生成 canonical。
3. 中文文章至少设置可读的 OG title/description；如果未来做 `/zh` 再上 alternates。

置信度：中高。

### 15.8 另一个细节：`README` 的项目文档列表已经过期

`README.md` 的“项目文档”列出很多早期文档，例如：

- `docs/PHASE4_RESEARCH.md`
- `docs/PHASE4_REVIEW.md`
- `docs/CREATIVE_DIRECTION.md`
- `docs/DECISIONS.md`

但实际 `docs/` 里已经有更多 Phase 10-24 文档，且本报告也新增了一份审计文档。这个 README 列表不是错，但已经不能代表当前文档体系。

建议 README 不再手工列所有文档，而是改成：

- `docs/PRD.md`：产品原则；
- `docs/ROADMAP.md`：路线；
- `docs/PROJECT_MAP.md`：结构；
- `docs/CURRENT_CONTEXT.md`：当前事实；
- `docs/archive/`：历史 phase；
- “完整清单见 `docs/`”。

这会降低 README 腐烂速度。

置信度：高。

## 16. Codex 修订后的优先级

Claude Code 的优先级是：

1. 修假状态；
2. 补真实内容；
3. 减首页密度；
4. 再扩系统。

Codex 交叉审视后，我会调整为：

1. **修主域名事实源**：`raynode.me`、Vercel、metadataBase、sitemap、robots、RSS、README、project externalUrl 必须统一。
2. **修证据一致性**：删除或生成化 `108 e2e tests passed`、旧 deployment id、假 latest commit。
3. **保留并强化测试体系**：当前 112 e2e 是资产，不是问题；新增 CI workflow 才是下一步。
4. **修 Command Center 可访问性焦点契约**：modal focus trap / focus restore / e2e。
5. **再补真实内容**：内容不足仍是长期最大问题，但在上线后，事实源漂移是更紧急的短期问题。
6. **首页减法**：在修掉假状态之后再做，否则只是美学整理。

最终判断：

Claude Code 抓住了“内容不足和系统过度”的主矛盾；Codex 补充的是“上线后的事实一致性和证据可信度”。如果只按 Claude Code 的路线去补内容，短期会忽略一个更危险的问题：**用户已经在 `raynode.me` 看到了站点，但站点自己仍在告诉机器世界：我的主站是 Vercel。**

置信度：高。
