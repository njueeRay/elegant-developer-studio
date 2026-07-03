# 2026-07-03 个人主页审计行动清单

来源文档：`docs/CLAUDE_CODE_PERSONAL_HOMEPAGE_AUDIT_2026_07_03.md`

生成日期：2026-07-03

状态：P0-P2 已完成，P3 作为长期方向保留

## 1. 结论校准

这份审计的主判断成立：当前站点不是缺工程能力，而是存在“系统骨架成熟度高于公开内容密度”的结构性问题。短期最危险的不是页面不够炫，而是事实源、证据和部署状态可能互相打架。

但审计文档里有一处必须修正：它认为 `raynode.me` 已经上线。根据 2026-07-03 的第一次部署验证，`raynode.me` 当时处于远端用户态无响应状态：

- `47.81.38.236:22` TCP 可连接，但 SSH banner 超时。
- `http://raynode.me` TCP connect 后无 HTTP response。
- `https://raynode.me` SSL handshake timeout。

后续复核确认 RayNode 已恢复：`https://raynode.me/` 返回 200，SSH 可进入，`elegant-developer-studio` 与 Caddy 均为 active。因此可以把 `raynode.me` 作为默认主站事实源，Vercel 保留为 preview / fallback。

## 2. 优先级定义

- P0：会直接损害线上可信度、SEO、部署可用性或项目原则一致性的事项。
- P1：影响个人品牌可信度、质量门禁和核心体验，但不阻断当前访问。
- P2：影响长期维护效率和内容规模化的技术债。
- P3：长期内容资产、风格演进和系统扩展。

## 3. P0：立即处理

### P0-1 恢复 RayNode 服务器部署

必要性：最高。

原因：

- 用户明确要求服务器部署。
- 服务器是未来主站候选，但当前仍不可用。
- 在服务器未恢复前切换 SEO canonical 会把机器世界指向一个不可访问主站。

待办：

- [x] 从阿里云控制台重启 `47.81.38.236`，或等待远端用户态恢复。
- [x] SSH 恢复后检查服务状态。
- [x] 不再远端执行 `npm run build`。
- [x] 服务器使用 Next.js standalone runtime。
- [x] 运行目录为 `/srv/apps/elegant-developer-studio-runtime`。
- [x] `elegant-developer-studio.service` active。
- [x] Caddy active，并对外提供 `https://raynode.me`。
- [x] 验证 `https://raynode.me`、`https://www.raynode.me`、`/rss.xml`、`/sitemap.xml`、`/robots.txt`。

验收：

- `curl -I https://raynode.me` 返回 200 或可解释的 3xx。
- `systemctl status elegant-developer-studio` 为 active。
- `systemctl status caddy` 为 active。
- `npm run test:e2e` 或生产 smoke e2e 对主域名通过。

相关文档：

- `docs/PROGRESS_LOG.md`
- `docs/VERSION_TRACE.md`
- `/Users/ray/Data/Project/Github/Workshop/raynode-elegant-developer-studio-handoff.md`

### P0-2 建立唯一站点事实源

必要性：高。P0-1 已恢复后，本项进入执行。

原因：

- 当前多个文件硬编码 `https://elegant-developer-studio.vercel.app`。
- 如果 `raynode.me` 成为主站，metadata、sitemap、robots、RSS、README 和项目证据必须同步切换。
- 如果 Vercel 仍是主站，RayNode 应被定义为 self-hosted mirror，而不是混乱并存。

待办：

- [x] 新增 `src/lib/site.ts`，导出统一 `siteUrl`。
- [x] 支持 `NEXT_PUBLIC_SITE_URL`，默认值设为 `https://raynode.me`。
- [x] 替换 `src/app/layout.tsx` 的 `metadataBase`。
- [x] 替换 `src/app/sitemap.ts` 的 `siteUrl`。
- [x] 替换 `src/app/robots.ts` 的 sitemap URL。
- [x] 替换 `src/app/rss.xml/route.ts` 的 `siteUrl`。
- [x] 更新 `README.md` 的线上地址说明。
- [x] 更新 `docs/PROJECT_MAP.md` 的线上状态。
- [x] 明确 Vercel 是 preview / fallback，RayNode 是默认主站。

验收：

- `sitemap.xml` 输出的 `<loc>` 与主站一致。
- `robots.txt` 指向主站 sitemap。
- `rss.xml` 的 `<link>` 和 `<guid>` 与主站一致。
- Open Graph metadata 不再指向旧主站。

当前证据：

- `README.md`
- `docs/PROJECT_MAP.md`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/rss.xml/route.ts`

### P0-3 修复假状态与腐烂证据

必要性：高。

原因：

- 项目原则反对 fake terminal aesthetics 和不能执行真实工作的技术表面。
- `Latest commit`、`a7f3c2e / 2h ago` 这类硬编码状态会直接破坏可信度。
- `108 e2e tests passed`、旧 deployment id、旧 verifiedAt 会制造精确幻觉。

待办：

- [x] 处理 `src/data/home.ts` 中的 `Latest commit` 假实时状态。
- [x] 如果短期不能接真实 Git metadata，将该项改成 editorial note 或删除。
- [x] 将 `src/content/projects/lumen.mdx` 中的旧 e2e 数字改成不易腐烂的描述。
- [x] 将 deployment id 从项目展示层降级到 `VERSION_TRACE`，或改为生成化数据。
- [x] 设计 `src/data/release-evidence.ts` 或 `release-evidence.json`，作为后续证据事实源候选。
- [x] 更新 `validate:content`，避免 evidence metric 使用易腐烂的硬编码测试数量。

验收：

- 首页不再展示无法被验证的伪实时 commit。
- 项目详情不再展示过期 e2e 数字。
- 证据系统仍能表达可信度，但不制造过度精确的假象。

当前证据：

- `src/data/home.ts`
- `src/content/projects/lumen.mdx`

### P0-4 清除明显过期文案

必要性：中高。

原因：

- 首页仍出现 “The lab becomes its own surface in Phase 5”，但 `/lab` 已经上线并经过多轮迭代。
- 这种小错误会削弱站点整体的“精确感”。

待办：

- [x] 更新 `src/components/studio-home.tsx` 中的 Lab 文案。
- [x] 全站搜索 Phase、becomes、soon、planned 等容易过期的表述。
- [x] 将“未来态”文案改成当前事实或明确的路线图入口。

验收：

- 首页不再出现已完成阶段的未来式描述。
- 访客不会因为过期文案误判页面状态。

## 4. P1：未来 2-4 周

### P1-1 建立最小 CI 门禁

必要性：高。

原因：

- 项目已有 issue template 和 PR template，但没有 `.github/workflows/*.yml`。
- 当前本地质量保障很强，但缺少 GitHub 层面的自动约束。

待办：

- [x] 新增 GitHub Actions workflow。
- [x] 跑 `npm ci`。
- [x] 跑 `npm run lint`。
- [x] 跑 `npm run validate:content`。
- [x] 跑 `npm run build`。
- [x] 至少跑 Chromium Playwright smoke e2e。
- [x] 记录 CI 策略到 `docs/PROJECT_MAP.md` 或 `docs/ROADMAP.md`。

验收：

- PR 或 main push 自动执行质量门禁。
- CI 失败时能定位 lint、内容关系、构建或 e2e 问题。

### P1-2 修复 Command Center modal 焦点契约

必要性：中高。

原因：

- `GlobalCommandMenu` 使用 `role="dialog"` 和 `aria-modal="true"`。
- 当前已有 autofocus、Escape 和 body scroll lock，但需要明确 focus trap 和 focus restore。

待办：

- [x] 打开 Command Center 后焦点进入 dialog。
- [x] Tab / Shift+Tab 不离开 dialog。
- [x] Escape 关闭后焦点回到触发按钮或最近触发元素。
- [x] 增加 Playwright e2e 覆盖。
- [x] 检查 photo lightbox 的 modal 焦点行为。

验收：

- 键盘用户可以完整打开、浏览、关闭 Command Center。
- 关闭后焦点不会丢失到 body。

当前证据：

- `src/components/global-command-menu.tsx`
- `src/components/media/photo-grid.tsx`

### P1-3 增加真实公开内容资产

必要性：高，但不应压过 P0 的事实修复。

原因：

- 当前公开内容量为 4 篇 posts、2 个 projects、6 条 knowledge entries。
- 系统架构已经足够，下一阶段需要用真实内容证明判断力。

待办：

- [x] 写 2 篇中文判断型长文。
- [x] 写 2 篇真实工程部署或 AI agent 工作流复盘。
- [x] 写 2 篇产品或设计系统 case study。
- [x] 新增至少 1 个非本站项目 case study。
- [x] 每篇内容都要包含真实约束、取舍、失败、证据或结果。

验收：

- posts >= 10。
- projects >= 3，且至少 1 个不是本站自身。
- knowledge entries >= 10。
- 首页精选内容能从“系统自述”转向“外部可判断成果”。

### P1-4 首页减法与第一屏重排

必要性：中高。

原因：

- 首页承担的任务过多：身份、命令入口、社交、状态、项目、知识、媒体、联系。
- 修掉假状态后，需要让首屏只表达最强信号。

待办：

- [x] 首屏聚焦 Ray Studio、定位、一句可信描述、Read / Work 两个主入口。
- [x] 将 Command Center 从主角降为辅助入口。
- [x] 第二屏放精选文章、项目和 Studio Pulse，不再把 Workbench 塞进首屏。
- [x] 第三屏再放 Knowledge / Lab / Uses / Media。
- [x] 保留低强度氛围，不增加新的炫技装饰。

验收：

- 首屏第一判断更清楚。
- 信息密度下降，但专业感不下降。
- 桌面和移动端首屏都成立。

## 5. P2：未来 1-2 个月

### P2-1 建立 `docs/CURRENT_CONTEXT.md`

必要性：中高。

原因：

- `docs/` 文档数量已经明显大于公开内容数量。
- 新对话接手时容易被历史阶段淹没。

待办：

- [x] 新增 `docs/CURRENT_CONTEXT.md`。
- [x] 只保留当前主线目标、线上状态、质量门禁、下一步。
- [x] README 只指向核心文档，不再手工列全量历史文档。
- [x] 后续每阶段优先更新 Current Context，而不是新增多份 research/review。

验收：

- 新 agent 读 `PROJECT_MAP + CURRENT_CONTEXT` 即可进入状态。
- 历史 phase 文档不再是默认入口。

### P2-2 归档早期 phase 文档

必要性：中。

待办：

- [x] 建立 `docs/archive/`。
- [x] 将早期 `PHASE*_RESEARCH.md`、`PHASE*_REVIEW.md` 分批移动。
- [x] 保留 `PRD.md`、`ROADMAP.md`、`PROJECT_MAP.md`、`PROGRESS_LOG.md`、`VERSION_TRACE.md` 在顶层。
- [x] 更新 README 和 PROJECT_MAP 的文档说明。

验收：

- 顶层 docs 更像操作台，而不是历史堆栈。
- 历史仍可追溯，但不干扰当前工作。

### P2-3 Command index 懒加载技术债记录

必要性：中。

原因：

- 当前 Command Center index 在 root layout 组装并传给 client component。
- 内容增长后会进入首屏 payload，未来会成为性能问题。

待办：

- [x] 在技术债文档或 ROADMAP 记录阈值：posts > 15 或 knowledge > 25 时处理。
- [x] 候选方案：打开 Cmd K 时懒加载 static JSON。
- [x] 候选方案：提供 `/api/command-index`。
- [x] posts > 50 时再评估轻量搜索索引。

验收：

- 当前不提前重构。
- 到达内容阈值时有明确触发条件。

### P2-4 完整 metadata 策略

必要性：中。

待办：

- [x] 新增 `src/lib/metadata.ts`。
- [x] 统一 title template、canonical、OG URL、Twitter card。
- [x] 为 post/project/knowledge 生成 canonical。
- [x] 中文文章提供更准确的中文 OG title 和 description。
- [x] 后续评估是否需要 `/zh`，但现在不急。

验收：

- 分享链接时标题、描述、URL 与主站一致。
- 中文内容在社交预览中不显得像英文站的附属内容。

## 6. P3：长期方向

### P3-1 内容网络从“本站建设日志”转向“外部世界问题”

待办：

- [ ] 形成公开 case study 系列。
- [ ] 把服务器部署、Caddy、Codex、Feishu bridge、Hermes/Codex 协作整理成文章。
- [ ] 中文承担判断、复盘、项目记忆。
- [ ] 英文承担开放技术语境、代码、组件和项目说明。

### P3-2 Personal OS 继续扩展，但只在内容证明必要后扩表面

待办：

- [ ] 不再为了“酷”新增孤立组件。
- [ ] 新组件必须服务真实导航、阅读、证据、维护或内容发现。
- [ ] Lab 继续作为奇趣交互试验场，首页只吸收经验证的高价值组件。

## 7. 不采纳或暂缓事项

- 暂不把所有 canonical 立即切到 `raynode.me`：服务器当前不可访问，必须先恢复部署。
- 暂不立即重构 `src/lib/content.ts` 自动发现：内容数量不足，当前瓶颈不是导入方式。
- 暂不立即删除 `AmbientCursorField`：已有 reduced motion 处理，先观察阅读页干扰，再决定按路由弱化。
- 暂不新增大型图谱、宠物、访客光标、粒子世界：这些会加重系统自我展示倾向。

## 8. 推荐执行顺序

1. 恢复 RayNode 服务器部署。
2. 统一 `SITE_URL` 与主域名事实源。
3. 修复假状态、旧 evidence 数字和过期 Lab 文案。
4. 新增最小 CI。
5. 修复 Command Center modal 焦点契约。
6. 补 6 篇真实内容和 1 个非本站项目 case study。
7. 首页减法。
8. 建立 `CURRENT_CONTEXT` 并归档早期 phase 文档。

## 9. 下一阶段建议命名

建议下一阶段命名为：

```text
Phase 25: Truth Source & Public Trust
```

阶段目标：

- 修复主域名、部署、证据、假状态、CI 和可访问性焦点契约。
- 先让站点“说真话、可访问、可验证”，再继续追求更复杂的系统扩展。

## 10. Phase 25 完成后再审视

复核日期：2026-07-03

当前判断：Phase 25 已经把最危险的问题从“线上事实不一致”降到了可控状态。站点现在有主站、有 CI、有 canonical、有 RSS/sitemap/robots 一致性、有更真实的内容样本、有焦点契约测试，也有新的当前上下文入口。

但这不意味着项目已经进入“继续堆功能”的阶段。恰恰相反，Phase 25 把系统可信度补上后，下一个真正风险变成：**内容和证据是否能持续增长，而不是再次回到系统搭建本身。**

### 已明显改善

- 主站事实源从 Vercel 漂移修正为 RayNode 主站 + Vercel preview / fallback。
- 首页从“证明我有很多模块”收敛为 Ray Studio、定位、真实部署状态、Read / Work 主路径。
- Evidence Pack 不再用旧 deployment id 和硬编码 e2e 数字制造精确幻觉。
- Posts / Projects / Knowledge 从 `4 / 2 / 6` 增长到 `10 / 3 / 10`。
- Command Center 和 Photo lightbox 的 modal 焦点契约进入 e2e。
- 文档入口从历史堆栈转向 `PROJECT_MAP + CURRENT_CONTEXT + AUDIT_ACTION_TODO`。

### 仍然存在的问题

- 新增 6 篇文章虽然补了内容密度，但大部分仍围绕本站、部署、审计和 agent workflow，外部世界项目仍偏少。
- `Codex Feishu Bridge` 是非本站项目，但仍和本站工作流强相关；还需要更外部化的产品、工具、开源或真实用户问题 case study。
- CI 已经建立，但 evidence 还没有自动从 CI artifact、Git commit、部署记录生成。
- Command Center index 仍在 root layout 组装；当前可接受，但内容继续增长会变成性能债。
- RayNode 部署流程仍是手动上传 tarball；可追溯，但不够自动化。
- Feishu 尚未同步 Phase 25 结果，云端知识库可能落后于仓库。
- npm audit 仍有 2 个 moderate vulnerabilities，当前未处理是合理的，但不能长期不看。

### 下一阶段总原则

- 不再以“新增页面数量”作为进展。
- 不再优先做宠物、粒子、图谱、访客光标、复杂动效。
- 优先让内容、证据、部署、搜索、性能和外部 case study 更真实。
- 新组件必须服务真实内容发现、阅读、证据、维护或协作。

## 11. 后续阶段总优先级

后续阶段建议从 Phase 26 开始。Phase 26-29 不应并行乱开，应该按依赖顺序推进。

### Phase 26：External Proof & Content Network

状态：已完成并部署到 RayNode，2026-07-04。

优先级：最高。

目标：把个人主页从“Ray Studio 建设日志”推进到“可被外部判断的作品与知识网络”。

为什么排第一：

- 当前最大产品风险已经不是可信度底座，而是外部样本不足。
- 个人主页最终要让访客判断一个人的能力，不能主要证明“我很会建设个人主页系统”。
- 内容增长会反过来验证 Command Center、Knowledge trails、RelatedReading、RSS、sitemap、metadata 是否真的能承载规模。

交付范围：

- 新增 2 个外部化 project case study。
- 新增 4 篇非本站中心文章。
- 新增 6 条 Knowledge，用于连接外部项目、技术判断和产品原则。
- 首页精选内容重新排序，优先展示外部证据更强的内容。
- Project Evidence Pack 增加更可检查的截图、commit、PR、设计引用或部署链接。

候选内容方向：

- 一个小型开源工具或脚本：真实 repo、真实 README、真实使用方式。
- 一个产品拆解：不是临摹 UI，而是分析信息架构、交互取舍、实现边界。
- 一个服务器/自动化工具：RayNode、Feishu bridge、Codex workflow 之外的独立实用工具。
- 一个设计系统 micro-case：从问题、约束、组件、token、测试到结果。

待办：

- [x] 定义“外部化 case study”的最低标准：真实问题、真实约束、真实交付物、真实链接、真实结果。
- [x] 新增外部工具/工作流项目 `openprofile-agent-workflow`，不再只是本站内部页面。
- [x] 新增产品界面拆解项目 `anyreader-interface-teardown`，展示产品判断和 UI/UX 分析能力。
- [x] 每个项目都有 `Evidence Pack`，且 evidence link 指向公开 GitHub、公开部署或可检查研究表面。
- [x] 新增 2 篇中文判断型文章，重点写真实取舍和失败。
- [x] 新增 2 篇英文技术/设计文章，重点服务开放技术语境。
- [x] 为新增内容补 `relatedPostSlugs`、`relatedKnowledgeSlugs`、`relatedProjectSlugs`。
- [x] 更新首页 featured project 和 featured writing，使首页展示外部化项目和外部证据判断。
- [x] 新增 e2e 覆盖新外部项目详情页、首页入口、博客和 Knowledge 关系链。

验收标准：

- Projects = 5。
- Posts = 14。
- Knowledge entries = 16。
- 2 个项目不是本站自身，也不是单纯围绕本站文档系统：`OpenProfile Agent Workflow`、`AnyReader Interface Teardown`。
- 首页第一屏之后的精选内容展示 `OpenProfile Agent Workflow`。
- 新项目 evidence link 经 `curl -I -L` 验证公开可访问：`https://github.com/njueeRay/OpenProfile`、`https://github.com/TeaFishMeow/any-reader-ui`、`https://app.exnju.top`。
- RayNode 已部署提交 `9143bc0`，production smoke e2e 48 passed。

完成说明：

- `OpenProfile Agent Workflow` 提供 AI-native profile workflow、公开仓库、agent workflow docs 和 open source strategy 作为证据。
- `AnyReader Interface Teardown` 提供深度阅读界面拆解、公开应用、公开仓库和本地代码调研作为证据。
- 新增 Knowledge 将外部证据、项目证据标准、Socratic reading surface、selection anchor、agent team surface 和 case study diff 固化为可引用原则。
- 当前内容规模接近 Phase 28 的触发阈值，但尚未达到 posts > 15 或 knowledge entries > 25；下一阶段应优先 Phase 27，而不是立刻重构 Command Center。

### Phase 27：Evidence Automation & Release Discipline

状态：已完成并部署到 RayNode，2026-07-04。

优先级：高。

目标：把 Phase 25 的“不要手写腐烂证据”推进为自动化事实源。

为什么排第二：

- 当前已经有 `src/data/release-evidence.ts` 雏形，但它仍是手写。
- Evidence Pack 的可信度取决于事实更新机制，而不是卡片样式。
- CI 已有，但还没有把 CI 结果、commit、部署时间、主站 smoke 结果沉淀成可消费数据。

交付范围：

- 生成化 release evidence。
- 部署脚本标准化。
- RayNode 部署记录结构化。
- CI artifact 或本地脚本输出可被项目页引用。

待办：

- [x] 新增 `scripts/write-release-evidence.mjs`。
- [x] 生成 `public/release-evidence.json`，并将它作为部署时生成产物，不提交进仓库。
- [x] 写入 `commitSha`、`builtAt`、`siteUrl`、`routesCount`、`contentCounts`、`qualityGates`。
- [x] 部署前自动生成 release evidence。
- [x] 部署脚本使用 `COPYFILE_DISABLE=1 tar --no-xattrs ...`，消除 macOS provenance xattr warning。
- [x] 新增 `scripts/deploy-raynode.mjs`，封装 standalone 打包、上传、远端切换、重启、smoke。
- [x] `ProjectEvidencePack` 支持从 release evidence 读取当前部署状态。
- [x] `validate:content` 校验证据卡不能引用旧 deployment id 或临时 Vercel deployment URL。
- [x] `VERSION_TRACE` 记录 release facts，不再要求人工复制大量命令输出。

验收标准：

- 一条命令可以完成本地打包、上传、远端重启和 smoke：`npm run deploy:raynode`。
- release evidence 文件由脚本生成，不靠手写。
- Lumen 项目页读取 release evidence，并由 e2e 覆盖。
- CI 和本地验证都能发现 release evidence 缺失或过期：`npm run validate:release-evidence`。
- RayNode 线上 `/release-evidence.json` 记录部署提交 `d59bdaf`。
- 生产公开路由可访问性测试通过：`PLAYWRIGHT_BASE_URL=https://raynode.me npx playwright test --project=chromium --grep "serves" --workers=1`，46 passed。

设计决定：

- `public/release-evidence.json` 不提交进 Git。原因是它需要记录当前部署 commit；如果把它提交进同一个 commit，会天然出现“记录自己的 commit hash”悖论。
- 部署脚本在当前 HEAD 上生成 evidence，再打包进 standalone artifact；RayNode 上的 `/release-evidence.json` 才是运行时事实源。
- 项目页渐进读取 evidence。没有 evidence 时页面仍可用，有 evidence 时 Lumen / Studio Knowledge Base 自动显示生成证据卡。

### Phase 28：Content Discovery & Command Index Scale

状态：已完成并部署到 RayNode，2026-07-04。

优先级：中高。

目标：在内容继续增长前，处理 Command Center、内容列表、筛选和 RelatedReading 的规模化路径。

触发条件：

- posts > 15，或
- knowledge entries > 25，或
- command index payload 明显影响首屏 HTML / RSC payload。

当前状态：

- 现在 posts = 14，knowledge = 16，尚未到强制重构阈值。
- 但内容规模已经接近第一道阈值；下一阶段不应先做大重构，应先做测量和边界定义。

待办：

- [x] 先测量当前首页 HTML / RSC payload 和 command item 数量。
- [x] 新增 `scripts/report-command-index.mjs`，输出 command item count、kind 分布和估算 payload。
- [x] 将 `getCommandItems()` 从 `layout.tsx` 拆到独立 server module：`src/lib/command-index.ts`。
- [x] 评估 static JSON：采用 `/command-index.json`，作为公开、可缓存、可测试的轻量索引 payload。
- [x] 评估 route handler：暂不采用 `/api/command-index`。当前 110 items / 35.4KB JSON / 10.4KB gzip，不需要服务端搜索。
- [x] 打开 Cmd K 时再加载 index，未打开时不把完整内容索引塞进首屏。
- [x] 搜索结果增加 top-level 分组权重：External proof、Writing、Projects、Knowledge。
- [x] 为 `GlobalCommandMenu` 增加 loading / error / empty states 的 e2e。

验收标准：

- 首屏不再携带完整 command index。
- Cmd K 首次打开延迟可接受。
- 搜索、最近访问、上下文排序仍保持。
- e2e 覆盖懒加载成功、失败、空查询和 query action。

阶段结果：

- Command index 当前规模：110 items。
- kind 分布：action 7、post 14、project 5、knowledge 17、lab 23、uses 18、about 14、collaboration 7、photo 3、music 1、contact 1。
- 估算 payload：35,413 bytes JSON，10,413 bytes gzip，keywords 6,735 bytes。
- `firstScreenCarriesCommandIndex: false`。
- `npm run test:e2e -- --workers=1`：178 passed。
- RayNode 线上 `/command-index.json` 返回 110 items。
- RayNode 线上 `/release-evidence.json` 记录部署提交 `304c090` 和 51 public routes。
- production targeted smoke：6 passed。
- production public route smoke：47 passed。

### Phase 29：Reading & Knowledge Quality Layer

状态：已完成并部署到 RayNode，2026-07-04。

优先级：中。

目标：让博客和 Knowledge 从“有内容”升级为“有阅读路径、有复用价值、有长期编辑质量”。

为什么需要：

- Phase 26 会增加内容量。
- 如果没有编辑质量层，内容会变成卡片数量增长，而不是认知网络增长。

交付范围：

- 写作栏目规则。
- Knowledge 类型规则。
- RelatedReading 策略升级。
- 中文/英文分工明确化。
- 阅读页更强的“下一步”路径。

待办：

- [x] 定义 4 条长期写作线：产品判断、设计工程、部署/自动化、AI 协作。
- [x] 每篇文章必须声明 `intent`，且 intent 只能来自受控词表。
- [x] 新增 `validate:content` 对 post intent、language、related links 的更严格校验。
- [x] Knowledge `kind` 是否足够，评估是否需要 `Case`, `Principle`, `Runbook`。
- [x] `RelatedReading` 根据语言、intent、项目关系给出更强排序。
- [x] 中文文章至少显示“适合引用到哪里”：飞书、issue、PR、复盘。
- [x] 英文文章至少显示“技术语境”：source、component、API、implementation note。
- [x] 增加 `/blog` 的 writing tracks，而不是只靠 tag filter。

Knowledge kind 评估：

- 暂不扩展 `KnowledgeKind`。当前 `Pattern`、`Snippet`、`Decision`、`Reference` 足够覆盖现有 16 条知识。
- `Case` 已由项目页和文章承载，暂不放进 Knowledge；否则会和 Project Evidence Pack 职能重叠。
- `Principle` 目前可归入 `Decision` 或 `Pattern`；等原则类条目超过 8 条再拆。
- `Runbook` 应进入 Phase 30 运维层，而不是混入当前阅读质量层。

阶段结果：

- 新增 `src/data/writing.ts`，集中管理写作线、intent 词表、intent → track 映射和引用语境。
- `/blog` 新增 writing tracks，并支持 `?track=product-judgment` 这类稳定 URL 状态。
- 文章页新增 `Reading quality context`，中文文章显示引用场景，英文文章显示技术语境。
- `RelatedReading` 增加路径理由：同写作线 / 相邻论点 / 可复用规则 / 项目证据。
- `npm run validate:content` 会阻止失控 intent、非法 language、缺失 citation guide、空 related trail 和空写作线。
- 完整本地质量门禁通过：`report:command-index`、`release:evidence`、`validate:release-evidence`、`validate:content`、`lint`、`build`、`npm run test:e2e -- --workers=1`。
- 完整本地 e2e：180 passed。
- Phase 29 implementation commit：`0f7fa20`。
- RayNode 已部署提交 `f0ff534`。
- 线上 `/release-evidence.json` 返回 `commitSha: f0ff534`、14 posts / 5 projects / 16 knowledge entries / 51 public routes。
- 线上 `https://raynode.me/blog?track=product-judgment` 返回 200。
- production targeted smoke：3 passed，覆盖 `/blog`、writing tracks 和文章 RelatedReading。
- production public route smoke：47 passed。

验收标准：

- 每条内容都有明确写作线。
- RelatedReading 不只是罗列关联，而能形成下一步阅读路径。
- 新增内容不会破坏 sitemap、RSS、Command Center 和 Knowledge trails。

### Phase 30：RayNode Operations Hardening

状态：已实现并完成完整本地回归，2026-07-04；待提交与 RayNode 部署。

优先级：中。

目标：把服务器从“能部署”推进到“可持续运维”。

为什么不是最高：

- 当前 RayNode 已可用，服务 active，主站 smoke 通过。
- 但长期看，手动部署、无监控、无自动备份会成为风险。

待办：

- [x] 确认 systemd service 文件进入仓库文档或 `ops/` 模板。
- [x] 新增 RayNode smoke script：home、rss、sitemap、robots、关键文章、关键项目。
- [x] 新增 uptime / health endpoint 方案评估，不一定立刻做。
- [x] 记录回滚流程：恢复 `/srv/apps/elegant-developer-studio-runtime.prev`。
- [x] 记录 Caddy 配置备份位置。
- [ ] 评估 GitHub Actions 通过 SSH 自动部署的安全边界。
- [x] 建立部署后 5 分钟检查清单。

阶段结果：

- 新增 `/health.json` 动态健康端点，只暴露 `status`、service、site、runtime、版本和检查时间。
- 新增 `scripts/verify-raynode.mjs`，把 release evidence、command index、关键 URL 和可选全量公开路由检查收束为一条命令。
- 新增 `npm run raynode:health`、`npm run raynode:health:full`、`npm run raynode:smoke`。
- `release:evidence`、`validate:release-evidence`、`validate:content` 和 public route e2e 纳入 `/health.json`。
- `deploy:raynode` 远端 smoke 增加 `/health.json`。
- 新增 `ops/raynode-runbook.md`、`ops/raynode-systemd.service`、`ops/Caddyfile.raynode.example`。
- 本地定向验证：`validate:content`、`release:evidence -- --local-quality-passed`、`validate:release-evidence`、`lint`、`build` 通过。
- 本地定向 e2e：8 passed，覆盖桌面和移动端 `/health.json`、`/release-evidence.json`、`/blog` 与主导航。
- 完整本地质量门禁通过：`report:command-index`、`release:evidence`、`validate:release-evidence`、`validate:content`、`lint`、`build`、`npm run test:e2e -- --workers=1`。
- 完整本地 e2e：182 passed。

本阶段暂缓：

- GitHub Actions SSH 自动部署。原因：当前没有必要为了省一次手动发布，引入长期 SSH key、secrets rotation、失败回滚和误触发部署风险。
- 外部 uptime 服务。原因：先用轻量健康端点和脚本明确故障边界，等站点发布节奏稳定后再接入。

验收标准：

- 新 agent 能按文档完成部署、回滚和 smoke。
- RayNode 故障时能区分 DNS、Caddy、systemd、Next runtime、服务器资源耗尽。
- 部署不再依赖散落在对话中的命令。

### Phase 31：Visual System Polish Without Adding Surfaces

优先级：中低。

目标：在不新增页面的前提下，继续打磨视觉层级、移动端、首页节奏和细微交互。

为什么排后：

- 当前视觉不是最大瓶颈。
- 继续“炫酷化”很容易掩盖内容和证据不足。

待办：

- [ ] 对首页首屏做桌面、平板、手机三档视觉 QA。
- [ ] 检查 RayNode 状态 badge 是否过长，移动端是否需要短文案。
- [ ] 检查 Studio Pulse 卡片是否因为新增内容变得过密。
- [ ] 检查 Command Center 在移动端的焦点、滚动和结果高度。
- [ ] 检查文章详情页 AmbientCursorField 是否仍可能干扰长文。
- [ ] 评估是否按路由弱化 AmbientCursorField，而不是全站删除。
- [ ] 增加 screenshots 到 `output/` 仅作为临时 QA，不纳入仓库。

验收标准：

- 不新增 surface。
- 不增加 fake terminal / fake live 状态。
- 所有视觉打磨必须服务可读性、层级、可访问性或内容发现。

## 12. 当前不做事项

这些事项不是永远不做，而是当前阶段不应该做：

- 不做常驻宠物。
- 不做访客光标。
- 不做全站粒子或 3D world。
- 不做大型 Reference Constellation。
- 不做复杂后台 CMS。
- 不做完整双语路由 `/zh`。
- 不做 AI 搜索。
- 不做新的一级导航页面。

理由：

- 当前内容规模还不足以支撑复杂图谱、AI 搜索或 CMS。
- 新一级页面会重新制造 Phase 25 刚压下去的信息架构过载。
- 奇趣交互可以继续留在 Lab，但不应进入首页主体验。

## 13. 推荐执行顺序：Phase 26 起

1. Phase 26：External Proof & Content Network。
2. Phase 27：Evidence Automation & Release Discipline。
3. Phase 28：Content Discovery & Command Index Scale。
4. Phase 29：Reading & Knowledge Quality Layer。
5. Phase 30：RayNode Operations Hardening。
6. Phase 31：Visual System Polish Without Adding Surfaces。

如果只能选一个下一步：选 Phase 26。

原因：Phase 25 已经让站点可信，下一步必须让站点值得被判断。
