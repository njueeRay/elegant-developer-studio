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

状态：已完成并部署到 RayNode，2026-07-04。

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
- Phase 30 implementation commit：`87e185c`。
- RayNode 已部署提交 `fee8825`。
- 线上 `/health.json` 返回 `status: ok`。
- 线上 `/release-evidence.json` 返回 `commitSha: fee8825`、14 posts / 5 projects / 16 knowledge entries / 52 public routes。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：53/53 passed，包含 release evidence 的所有公开路由和 query-backed `/blog?track=product-judgment`。
- `npm run raynode:smoke`：48 passed。

本阶段暂缓：

- GitHub Actions SSH 自动部署。原因：当前没有必要为了省一次手动发布，引入长期 SSH key、secrets rotation、失败回滚和误触发部署风险。
- 外部 uptime 服务。原因：先用轻量健康端点和脚本明确故障边界，等站点发布节奏稳定后再接入。

验收标准：

- 新 agent 能按文档完成部署、回滚和 smoke。
- RayNode 故障时能区分 DNS、Caddy、systemd、Next runtime、服务器资源耗尽。
- 部署不再依赖散落在对话中的命令。

### Phase 31：Visual System Polish Without Adding Surfaces

优先级：中低。

状态：已完成并部署到 RayNode。

目标：在不新增页面的前提下，继续打磨视觉层级、移动端、首页节奏和细微交互。

为什么排后：

- 当前视觉不是最大瓶颈。
- 继续“炫酷化”很容易掩盖内容和证据不足。

待办：

- [x] 对首页首屏做桌面和手机视觉 QA。
- [x] 检查 RayNode 状态 badge 是否过长，移动端是否需要短文案。
- [x] 检查 Command Center 在移动端的焦点、滚动和结果高度。
- [x] 检查文章详情页 AmbientCursorField 是否仍可能干扰长文。
- [x] 按路由弱化 AmbientCursorField，而不是全站删除。
- [x] 增加截图到 `/tmp/phase31-after-*.png` 作为临时 QA，不纳入仓库。
- [ ] 补一轮平板宽度视觉 QA。
- [ ] 检查 Studio Pulse 卡片是否因为新增内容变得过密。

本轮审视结论：

- 首页不是信息缺失，而是首屏部署状态文案过硬。将 `Live on RayNode: standalone Next.js behind Caddy` 拆成主状态和工程细节后，保留可信度，同时减少移动端压迫感。
- 阅读详情页已经有 `Reading Focus Lens`，全站 AmbientCursorField 继续参与会造成动效职责重叠。现在 `/blog/[slug]` 和 `/knowledge/[slug]` 使用 `data-cursor-surface="reading"`，关闭全局 cursor 光场，只保留阅读页自己的低强度 spotlight。
- 移动端 Command Center 之前可用但偏满；第一次调小后又牺牲了内容发现，最终调整为顶部 92px、结果区最高 450px，第一屏能看到 Studio Context 与 Writing 内容。
- Command Center 测试改走首页可见 trigger，而不是只依赖 `Meta+K`。快捷键是效率增强，公开可点入口才是可访问性事实源。

已验证：

- `npm run lint`：通过。
- `npm run validate:content`：通过。
- targeted e2e：`PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/site-access.spec.ts --project=chromium --grep "ambient cursor|mobile command center|audited pages|primary surfaces|mobile navigation" --workers=1`，5 passed。
- `npm run build`：通过，53 routes。
- full e2e：`PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npm run test:e2e -- --workers=1`，184 passed。
- `npm run deploy:raynode`：通过，部署源码提交 `f86b134`。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production targeted interaction tests：`PLAYWRIGHT_BASE_URL=https://raynode.me npx playwright test tests/site-access.spec.ts --project=chromium --grep "ambient cursor|mobile command center" --workers=1`，2 passed。

验收标准：

- 不新增 surface。
- 不增加 fake terminal / fake live 状态。
- 所有视觉打磨必须服务可读性、层级、可访问性或内容发现。

下一阶段建议：

- Phase 32：Content Density & Studio Pulse Restraint。
- 优先审查首页中段的 Studio Pulse、Ask Me Terminal、精选内容与 Personal OS 入口是否共同抬高密度。
- 只在必要时调整内容模块顺序；不要新增一级页面，不新增大型奇趣交互。

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
7. Phase 32：Content Density & Studio Pulse Restraint。

如果只能选一个下一步：选 Phase 32。

原因：Phase 31 证明视觉微调有效，但首页继续扩张会损害“优雅工作室”的第一性目标。下一步应该审查密度与内容节奏，而不是继续加 surface。

### Phase 32：Content Density & Studio Pulse Restraint

优先级：高。

状态：已完成并部署到 RayNode。

锚定 milestone：Studio Pulse Compact Mode。

阶段复盘：

- Phase 31 已经把全局动效和移动 Command Center 的职责压住，但首页中段仍有明显“Personal OS 继续膨胀”的风险。
- Studio Pulse 的 4 张卡在桌面上原本以 4 列出现，每张卡高度接近 392px，视觉上像四个窄控制台面板，不像一个优雅个人工作室的状态摘要。
- Ask Me Terminal、DataSourceBadge、命令字符串同时出现时，语义是对的，但局部密度偏高，容易把“可追溯”误读成“仪表盘堆料”。
- 本阶段不应该新增页面、宠物、3D 或大型交互；真正的问题是已有模块的信息节奏。

完成：

- Studio Pulse 从桌面 4 列改为 2 列紧凑卡片；平板保持 2 列，手机降为 1 列。
- 状态卡压缩 icon、padding、装饰圆、摘要行数和 meta 间距，保留可读标题和真实 route。
- 移除卡片内重复的 standalone command 文本，只保留 compact `DataSourceBadge` command chip。
- `DataSourceBadge` 增加 `title`，在卡片内视觉压缩时仍保留 source、route、command、verifiedAt 的可检查信息。
- Ask Me Terminal prompt row 改为横向可滚动，避免小屏按钮换行把响应区向下挤压。
- 缩短 3 条 Ask Me response 文案，保留 Personal OS、trace loop、Knowledge/Blog/Projects/Lab 的核心判断。
- 修复 `CodeBlock` 复制反馈：点击时重新从 `<pre>` 读取代码，避免 hydration 初期 state 为空；剪贴板失败时显示 `Copy failed`，不再静默吞点击。
- e2e 拆分长串页面巡检：Phase 25、Phase 26、source reveal、移动溢出检查从多页面串联改为单页契约，失败时能定位具体 route。
- project source reveal 测试滚动到卡片后 hover，避免视口边界导致误判。

已验证：

- `npm run validate:content`：通过，14 posts / 5 projects / 16 knowledge entries。
- `npm run report:command-index`：通过，110 items，estimated gzip 10,413 bytes，first screen carries index: no。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- targeted e2e：20 passed，覆盖 Studio Pulse compact、Ask Me Terminal、移动溢出、Phase 25/26 public assets、project source reveal、project evidence、article code copy。
- `chromium` 主矩阵：107/107 passed。
- `mobile-chrome` 主矩阵：107/107 passed。
- 一次未分片长跑出现 `ERR_NETWORK_IO_SUSPENDED`、browser launch timeout 和 `newPage` timeout；复核后判定为本机长跑资源状态异常。后续本地质量记录优先按 project 分片执行，而不是把 214 条测试塞进一次长会话。
- `npm run deploy:raynode`：通过，RayNode 远端源码快进到 `b767bd9`，service active。
- `npm run raynode:health`：18/18 passed，commit `b767bd9`。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production targeted interaction tests：4 passed，覆盖首页 Studio Pulse compact、Ask Me Terminal、project source reveal、article code copy。

量化结果：

- Desktop 1280px：Studio Pulse section 约 672px，卡片约 166px。
- Tablet 834px：Studio Pulse section 约 898px，保持 2 列。
- Mobile 390px：Studio Pulse section 约 1293px，单列卡片高度约 164-182px，无横向溢出。
- Studio Pulse 仍保留 9 个可交互入口，不靠隐藏链接降低密度。

验收标准：

- 首页中段不再像控制台或 GitHub clone。
- Studio Pulse 是状态摘要，不是四个信息密集仪表盘。
- source-backed 语义仍然可检查，但默认视觉更安静。
- 桌面、平板、手机都不产生横向溢出。
- 复制、hover、source reveal 必须真实可操作，不能只在组件内部“看得到”。

下一阶段建议：

- Phase 33：Content Performance & Test Sharding Discipline。
- 优先处理本地 dev 长跑里暴露出的测试编排问题：建立稳定的 `test:e2e:chromium`、`test:e2e:mobile` 或 CI shard 入口。
- 继续审查 MDX 静态导入与 dev server 首次渲染长尾，但不要为测试环境过度架构化。

### Phase 33：Content Performance & Test Sharding Discipline

优先级：高。

状态：已完成并部署到 RayNode。

锚定 milestone：E2E Shard Scripts & Dev Route Timing Probe。

阶段复盘：

- Phase 32 已经证明“一次长跑全部项目”会把本机浏览器资源异常、dev server 首编译长尾和页面业务缺陷混在一起。
- 真正要先解决的不是重写内容架构，而是建立可重复、可分片、可观察的质量入口。
- 当前内容规模仍小，直接重构 `src/lib/content.ts` 的收益不确定；但缺少 route timing probe 会让后续性能讨论没有证据。

完成：

- 新增 `npm run test:e2e:chromium`：生成 release evidence 后只跑桌面 Chromium 主矩阵。
- 新增 `npm run test:e2e:mobile`：生成 release evidence 后只跑移动 Chrome 主矩阵。
- 新增 `npm run test:e2e:local`：串行执行桌面和移动分片，作为完整本地回归入口。
- 新增 `npm run test:e2e:smoke`：复用 CI 的 Chromium smoke 范围。
- 新增 `scripts/measure-route-timing.mjs`。
- 新增 `npm run perf:routes`：默认观测本地核心路由。
- 新增 `npm run perf:routes:raynode`：读取 release evidence 的 public routes，观测生产路由耗时。
- CI 的 Chromium smoke step 改为 `npm run test:e2e:smoke`，避免本地和 CI 命令漂移。
- README 新增质量门禁、分片 e2e 和 route timing 命令。
- implementation commit：`de27bd5`。

已验证：

- `npm run validate:content`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- `npm run report:command-index`：通过，110 items，estimated gzip 10,413 bytes。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run test:e2e:smoke`：50 passed。
- `npm run test:e2e:chromium`：107 passed。
- `npm run test:e2e:mobile`：107 passed。
- `npm run perf:routes`：10 routes，p95 625ms，max 625ms，slow routes 0，failed routes 0。
- `npm run perf:routes:raynode`：52 routes，p95 817ms，max 1189ms，slow routes 0，failed routes 0。
- Browser 验证：`/` 页面标题为 `Ray Studio - Elegant Developer Studio`；首页非空；导航与 Command Center 入口可见；console error/warn 0；Command Center 搜索 `lab` 后出现 9 个结果。
- `npm run deploy:raynode`：通过，RayNode 远端源码快进到 `28559a4`，service active。
- `npm run raynode:health`：18/18 passed，commit `28559a4`。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production `npm run perf:routes:raynode`：52 routes，p95 798ms，max 917ms，slow routes 0，failed routes 0。

发现与后续观察：

- 本地 `test:e2e:chromium` 中 `/projects/anyreader-interface-teardown` 曾出现 29.3s 长尾但通过。
- 同一路由在 `mobile-chrome` 分片中约 300ms，生产 route timing 中没有慢路由。
- 当前结论：这是 dev server / 桌面分片偶发长尾，不足以支持立即重构内容加载层。Phase 34 应先做可复现诊断。

验收标准：

- 新 agent 不需要从文档复制长命令，也能执行桌面、移动、smoke、route timing。
- CI 与本地 smoke 使用同一脚本入口。
- 性能讨论至少有 route timing 输出，不再只凭感觉说“慢”。

下一阶段建议：

- Phase 34：Intent-Routed Content Quality Polish。
- 本轮用户明确要求审查博客与 Lab 等文字内容，并调用本地 AI 意图路由 prompt 协作 skill。性能长尾诊断顺延，不应抢占内容质量目标。
- 针对 `/projects/anyreader-interface-teardown` 和其他 MDX detail route 的重复 timing 保留为 Phase 35 候选，判断长尾是否与首编译、MDX 静态导入、图片处理或 Playwright worker 状态相关。
- 暂不引入服务端搜索、CMS 或内容加载重构，除非长尾能稳定复现。

### Phase 34：Intent-Routed Content Quality Polish

优先级：高。

状态：已完成并部署到 RayNode。

锚定 milestone：Blog / Lab Content Contract。

阶段判断：

- 用户提出的“博客、Lab 内文字内容还可以优化”不是单纯改文案，而是要求站点的公开内容更像可执行导航。
- 采用本地 `ai-collaboration-prompts` skill 的两份 reference：
  - `expert-intent-reconstruction.md`：把模糊表达拆成真实目标、约束、缺口和验收。
  - `document-cocreation-protocol.md`：判断目标读者、产物类型、信息密度和读者动作。
- 博客当前强项是观点密度和证据链，短板不是正文弱，而是读后用途还可以更显性。
- Lab 当前强项是 source、route、status 和 import path，短板是说明仍偏内部工程备忘录，访客需要更快知道“这个组件为什么值得看、下一次该怎么复用”。

完成：

- `LabComponent` 内容合约新增 `readerValue` 和 `nextUse`。
- `/lab` 选中预览新增 `Visitor value`，组件详情新增 `next.use`。
- Lab 列表行从展示 evidence 改为展示 visitor-facing value，降低内部证明感。
- `ComponentPreview` trace 模式新增 `Next use`，让预览不只是 metadata。
- Command Center 的 Lab 结果描述改用 `readerValue`，搜索关键词纳入 `nextUse`。
- 博客详情页 `Reading quality context` 新增 writing track promise。
- 博客详情页引用面板从静态 `read.context(...)` 升级为当前文章级 `read.use("slug")`。
- e2e 新增 Lab visitor value / next-use、博客 read.use / promise 断言。

已验证：

- `npm run validate:content`：通过。
- `npm run report:command-index`：通过，110 items，estimated gzip 10,436 bytes。
- `npm run lint`：通过。
- `npm run build`：通过，53 routes。
- targeted e2e：10 passed，覆盖 Lab visitor value / next-use、博客 read.use / promise、移动无溢出和 Command Center Lab 路径。
- `npm run release:evidence -- --local-quality-passed`：通过，52 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run test:e2e:smoke`：50 passed。
- `npm run perf:routes`：10 routes，p95 524ms，max 524ms，slow routes 0，failed routes 0。
- `npm run test:e2e:chromium`：107 passed。
- `npm run test:e2e:mobile`：107 passed。
- Browser rendered check：
  - `/lab`：`Visitor value`、`next.use`、Command Center 入口可见；console error/warn 0。
  - `/blog/agent-handoff-loop`：`read.use("agent-handoff-loop")`、writing track promise、Copy ref 可见；console error/warn 0。
  - Command Center 搜索 `visitor value` 返回 Lab experiment 结果。
  - 390px 移动端 `/lab` 和 `/blog/agent-handoff-loop` 无横向溢出。
- `npm run deploy:raynode`：通过，远端源码与运行产物均为 `1e94875`。
- `npm run raynode:health`：18/18 passed，commit `1e94875`。
- `npm run raynode:health:full`：53/53 passed。
- `npm run raynode:smoke`：48 passed。
- production `npm run perf:routes:raynode`：52 routes，p95 878ms，max 1357ms，slow routes 0，failed routes 0。
- Production fetch：`/lab` 包含 `Visitor value` 和 `next.use`；`/blog/agent-handoff-loop` 包含 `read.use`；`/command-index.json` 包含 Lab visitor value 与 next-use 关键词。

验收标准：

- Lab 组件不再只是作者内部 registry，而是对访客可理解的设计系统工作台。
- 博客读后用途可见，读者能判断该文章适合进入飞书复盘、GitHub issue、PR 说明还是路线图审查。
- Command Center、页面可见文案和 e2e 断言保持一致，避免“内部可见但外部不可达”的错误。
- 新增内容不破坏桌面和移动端布局。

下一阶段建议：

- Phase 35：Dev Route Long-Tail Diagnosis。
- 继续使用 Phase 33 的 timing probe，针对 AnyReader 项目详情与 MDX detail routes 做重复观测。
- 内容侧继续积累“外部证据型文章”，但不再只写站点自述。
