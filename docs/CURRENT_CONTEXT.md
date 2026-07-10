# 当前上下文

更新时间：2026-07-10

## 当前主线

Phase 42-45：Homepage Visual Polish、Post-16 Content Review Gate、Case Study Diff Specificity、Real Media Replacement Plan 已完成本地实现与验证，等待本轮 RayNode 部署记录。

当前主线转入 Phase 46：Command Index Threshold Review。Phase 42-45 的核心结论是：视觉收束、内容扩张、项目叙事和个人媒体都必须有明确准入与事实边界，不能靠继续堆页面或素材解决。

- `public/release-evidence.json` 由脚本生成，不提交进 Git。
- `ProjectEvidencePack` 渐进读取运行时 release evidence。
- `deploy:raynode` 封装 build、evidence、standalone artifact、上传、远端切换、重启和 smoke。
- `validate:release-evidence` 检查 evidence 是否缺失、过期或内容规模不一致。
- `validate:content` 拦截旧 Vercel deployment id 和临时 deployment URL。
- `src/lib/command-index.ts` 是 Command Center 索引事实源。
- `/command-index.json` 是 Command Center 按需加载的公开索引 payload。
- `scripts/report-command-index.mjs` 输出 command item count、kind 分布和 payload 估算。
- `src/lib/content-scale.ts` 是内容规模守门事实源，当前服务 `/blog` 的 Content Scale Panel。
- `src/data/home-editorial.ts` 是首页编辑策略事实源，定义 Featured essay、Selected work、Editorially recent、Media note 和 Knowledge signal。
- `src/data/content-admission.ts` 是 Post-16 内容准入事实源，固定当前 15 篇文章基线并要求未来文章登记可公开证据基础。
- `ProjectMeta.evidencePack` 已具备 `priority`、`proofRole` 和 `why`，项目证据必须说明强度、角色和保留理由。
- `ProjectMeta.caseStudyDiff` 具备 `title`、`before`、`constraint`、`after`、`proof` 和 evidence link，项目页以变更记录而非简介补充展示它。
- `src/data/media.ts` 已具备媒体 trust 字段：照片来源、memory strength、保留理由；音乐 mock 状态、usage 和 trust boundary。
- `docs/PHASE45_REAL_MEDIA_REPLACEMENT.md` 约束真实照片/音频替换，不允许用 reference 或 mock 素材伪造个人媒体层。
- `src/components/content/knowledge-trails.tsx` 已具备 `knowledge.graph("thin")` 局部关系图层，Knowledge 详情必须说明关联理由。
- `scripts/measure-route-timing.mjs` 是单轮 route timing 观测脚本。
- `scripts/diagnose-route-long-tail.mjs` 是重复 route timing 诊断脚本，用于判断 detail route 长尾是否稳定复现。
- `src/data/writing.ts` 是写作线、intent 词表、intent → track 映射和引用语境事实源。
- `src/components/content/knowledge-trails.tsx` 是 Knowledge 详情关系轨道事实源，当前包含 Related writing、Project evidence、Reference links 和 Backlinks。
- `/health.json` 是公开轻量健康端点。
- `scripts/verify-raynode.mjs` 是 RayNode HTTP health 检查脚本。
- `AmbientCursorField` 在首页等探索页保留 cursor 光场，在 `/blog/[slug]` 和 `/knowledge/[slug]` 自动进入 reading surface，避免与 Reading Focus Lens 抢注意力。

## 线上状态

- 主站：`https://raynode.me`
- 预览/备用：`https://elegant-developer-studio.vercel.app`
- GitHub：`https://github.com/njueeRay/elegant-developer-studio`
- Feishu Wiki：`https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

RayNode 当前状态：

- SSH 可用。
- `elegant-developer-studio` systemd service 为 active。
- Caddy 为 active。
- `https://raynode.me/` 返回 200。
- 当前服务器源码提交：`d129772`。
- `/release-evidence.json` 返回部署提交 `d129772`，内容规模为 15 posts / 5 projects / 17 knowledge entries / 54 public routes。
- `/health.json` 返回 `status: ok`。
- `/command-index.json` 返回 120 command items。
- `npm run raynode:health`：18/18 passed。
- `npm run raynode:health:full`：55/55 passed。
- `npm run raynode:smoke`：50 passed。
- Phase 39-41 production targeted e2e：4 passed。

## 当前事实源

- `src/lib/site.ts`：主站 URL、预览 URL、仓库 URL。
- `src/lib/metadata.ts`：统一 canonical、Open Graph、Twitter card。
- `src/data/release-evidence.ts`：release evidence 类型和路径定义。
- `public/release-evidence.json`：部署时生成的运行时发布事实源。
- `scripts/write-release-evidence.mjs`：生成 release evidence。
- `scripts/validate-release-evidence.mjs`：校验 release evidence。
- `scripts/deploy-raynode.mjs`：RayNode standalone 部署脚本。
- `src/lib/command-index.ts`：Command Center 索引构建器。
- `src/app/command-index.json/route.ts`：Command Center 懒加载 JSON endpoint。
- `scripts/report-command-index.mjs`：Command index 规模报告。
- `src/data/home-editorial.ts`：首页编辑策略、why.here 理由和替换规则。
- `src/data/media.ts`：照片、音乐、mix 的来源、状态和媒体 trust boundary。
- `src/components/content/project-evidence-pack.tsx`：项目证据排序与证据卡展示。
- `src/components/content/knowledge-trails.tsx`：Knowledge 详情关联路径和薄图层。
- `src/data/writing.ts`：Writing tracks、受控 intent 和 citation guide。
- `src/app/health.json/route.ts`：公开健康端点。
- `scripts/verify-raynode.mjs`：RayNode health CLI。
- `scripts/measure-route-timing.mjs`：单轮 route timing CLI。
- `scripts/diagnose-route-long-tail.mjs`：重复 route timing CLI。
- `ops/raynode-runbook.md`：部署、健康检查、回滚和故障定位手册。
- `ops/raynode-systemd.service`：systemd 模板。
- `ops/Caddyfile.raynode.example`：Caddy 模板。
- `docs/AUDIT_ACTION_TODO_2026_07_03.md`：Phase 25 P0-P3 执行队列。
- `docs/PROJECT_MAP.md`：产品表面、阶段、目录和质量门禁地图。
- `docs/ROADMAP.md`：阶段路线。
- `docs/HOMEPAGE_DEVELOPMENT_STATE_REVIEW_2026_07_09.md`：当前个人主页状态总审查、问题清单、媒体层判断和 Phase 39-45 路线。
- `docs/PROGRESS_LOG.md`：阶段进度。
- `docs/VERSION_TRACE.md`：提交、部署和验证追溯。

## 已完成的 Phase 39-41 切片

- Phase 39：项目 evidencePack 增加 `priority`、`proofRole`、`why`，五个项目完成证据排序；OpenProfile 项目详情新增 Selected work proof；e2e 覆盖 OpenProfile ranked evidence。
- Phase 40：首页 Media 卡升级为 Music + Photos 双入口；照片页显示 source / memory strength / why preserved；音乐页显示 mock playback、track usage 和 trust boundary；Command Center 纳入所有 photo 对象和 track 对象。
- Phase 41：Knowledge 详情新增 `knowledge.graph("thin")` 关系薄图层，显示 3-5 条最相关路径和关联理由；移动端关系图层使用单列防溢出。
- `validate:content`：通过，新增 evidence priority / proofRole / why、media trust 字段和 currentMix boundary 校验。
- `report:command-index`：通过，120 items，estimated gzip 11,584 bytes，first screen carries index: no。
- `lint`：通过。
- `build`：通过，55 routes。
- targeted Chromium e2e：4 passed，覆盖 Phase 38、Phase 39、Phase 40、Phase 41。
- targeted Mobile e2e：3 passed，覆盖 Phase 40、Phase 41 和 mobile command center。
- 完整 Chromium e2e：118 passed。
- 完整 Mobile e2e：118 passed。
- Primary implementation commit：`54357ca`。
- Deployed source commit：`d129772`。
- 下一阶段：Phase 42，首页视觉 polish，优先处理 OpenProfile 图像裁切、Media 卡双入口视觉节奏、why.here 文案显隐和移动端细节。

## 已完成的 Phase 36 切片

- 新增中文外部参考文章 `/blog/ursb-personal-site-object-grammar`。
- 新增 Knowledge 规则 `/knowledge/personal-site-object-grammar`。
- `KnowledgeTrails` 新增 `Reference links` 轨道，Knowledge 详情页可以直接暴露外部参考入口。
- 新文章接入 `src/lib/content.ts`、博客列表、相关阅读、Knowledge 反链、Command Center 和 release evidence。
- e2e 增加 Phase 36 公共可达断言，覆盖博客详情、Knowledge 详情和外部参考链接。
- `npm run validate:content`：通过，15 posts / 5 projects / 17 knowledge entries。
- `npm run report:command-index`：通过，112 items，estimated gzip 10,708 bytes。
- `npm run release:evidence -- --local-quality-passed`：通过，54 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，55 routes。
- `npm run test:e2e:smoke`：52 passed。
- `npm run test:e2e:chromium`：110 passed。
- `npm run test:e2e:mobile`：112 passed。
- 移动审计已覆盖 `/blog/ursb-personal-site-object-grammar` 和 `/knowledge/personal-site-object-grammar`；新增文章 inline code 溢出已修复。
- RayNode 已部署 `2c52c49`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 55/55，`raynode:smoke` 50/50，Phase 36 production targeted interaction 1 passed。
- 下一阶段：Phase 37，先审查内容规模和 evidence navigation，再继续批量加文章。

## 已完成的 Phase 37 切片

- 新增 `src/lib/content-scale.ts`，集中计算 posts、projects、knowledge、command items、featured posts、external proof posts 和 scale review gate。
- 新增 `/blog` 的 `ContentScalePanel`，公开显示 `content.scale("watch")`、15 posts、17 knowledge、112 command items 和下一篇文章触发审查。
- `/blog` 新增 Evidence navigation shortcuts：External proof essays、Object grammar rule、Evidence standard、Command payload。
- `/blog` 被加入移动无横向溢出审计。
- `npm run validate:content`：通过。
- `npm run report:command-index`：通过，112 items，estimated gzip 10,708 bytes。
- `npm run lint`：通过。
- `npm run build`：通过，55 routes。
- `npm run test:e2e:smoke`：52 passed。
- `npm run test:e2e:chromium`：114 passed。
- `npm run test:e2e:mobile`：114 passed。
- 移动端 Command Center 协作页测试改为使用可见首页 trigger，不再依赖移动端键盘快捷键。
- RayNode 已部署 `9950eeb`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 55/55，`raynode:smoke` 50/50，Phase 37 production targeted Content Scale 1 passed。
- 下一阶段：Phase 38，审查首页 Featured / Latest 的编辑策略，不再默认以最新内容替代最强证据。

## 已完成的 Phase 38 切片

- 新增 `src/data/home-editorial.ts`，把首页定义为 editorial surface，而不是 latest-content feed。
- 首页 Featured essay 固定为 `/blog/external-proof-over-portfolio-theater`，选择理由为 `why.here("external-proof")`。
- 首页 Selected work 固定为 `/projects/openprofile-agent-workflow`，选择理由为 `why.here("openprofile")`。
- 首页 `Latest from the studio` 改为 `Editorially recent`，只展示策略指定文章，不再自动取最近 featured。
- 首页 Knowledge signal 使用策略指定 Knowledge 条目，并显示 `why.here("knowledge-signal")`。
- 媒体卡从含糊 Play/Pause 改成 `Preview cue` + 真实 `/music` 入口。
- `validate:content` 增加首页编辑策略校验：slot slug、proof route、why.here reason、selectionRule 和旧 `home.ts` highlights 禁止项。
- e2e 增加 Phase 38 首页编辑槽位测试，覆盖 why-here 理由、OpenProfile 精选作品、Lumen 不再作为首页精选、媒体真实入口。
- 本地视觉复核：桌面 highlight rail、移动 highlight rail 截图通过，无明显横向溢出或注释压迫。
- `npm run validate:content`：通过。
- `npm run report:command-index`：通过，112 items，estimated gzip 10,708 bytes。
- `npm run release:evidence -- --local-quality-passed`：通过，54 public routes。
- `npm run validate:release-evidence`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，55 routes。
- `npm run test:e2e:smoke`：52 passed。
- `npm run test:e2e:chromium`：115 passed。
- `npm run test:e2e:mobile`：115 passed。
- RayNode 已部署 `baececf`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 55/55，`raynode:smoke` 50/50，Phase 38 production targeted homepage editorial 1 passed。
- 下一阶段：Phase 39，审查项目页证据排序与 case study diff，优先提升 OpenProfile / AnyReader / Lumen 等项目的证明力。

## 已完成的 Phase 26 切片

- 新增外部项目 `OpenProfile Agent Workflow`。
- 新增产品拆解项目 `AnyReader Interface Teardown`。
- 新增 4 篇非本站中心文章：
  - `外部证据比作品集叙事更重要`
  - `AnyReader 深度阅读界面拆解`
  - `OpenProfile as Agentic Profile Infrastructure`
  - `Case Study Diff as a Portfolio Format`
- 新增 6 条 Knowledge：
  - `外部证据优先于自指叙事`
  - `项目证据最低标准`
  - `Socratic reading surfaces`
  - `Selection anchors are product state`
  - `Agent team as product surface`
  - `Case study diff format`
- 首页 Featured essay 指向外部证据文章。
- 首页 Selected work 指向 `OpenProfile Agent Workflow`。
- e2e 增加 Phase 26 外部证据网络可达性检查。
- `npm run validate:content` 通过，内容规模为 14 posts / 5 projects / 16 knowledge entries。
- 已部署到 RayNode，production smoke e2e 48 passed。

## 已完成的 Phase 27 切片

- 新增 `npm run release:evidence`。
- 新增 `npm run validate:release-evidence`。
- 新增 `npm run deploy:raynode`。
- `public/release-evidence.json` 加入 `.gitignore`，由部署时生成。
- CI 增加 release evidence 生成与校验。
- Lumen / Studio Knowledge Base 项目详情可读取生成证据。
- e2e 覆盖 `/release-evidence.json` 和 Lumen 的 generated release evidence card。
- 内容校验拦截旧 Vercel deployment id 和临时 deployment URL。
- 部署 artifact 使用 `COPYFILE_DISABLE=1 tar --no-xattrs ...`。
- 已部署到 RayNode，部署源码提交为 `d59bdaf`。
- 生产定向 smoke 2 passed，生产公开路由可访问性 46 passed。

## 已完成的 Phase 28 切片

- `getCommandItems()` 从 root layout 拆到 `src/lib/command-index.ts`。
- 新增 `/command-index.json`，Command Center 首次打开时按需加载索引。
- `GlobalCommandMenu` 增加 loading、error 和 retry 状态。
- 搜索排序增加 External proof、Writing、Projects、Knowledge 的 top-level intent boost。
- 新增 `npm run report:command-index`。
- 当前 command index：110 items，35,413 bytes JSON，10,413 bytes gzip。
- 首页初始 HTML 不再携带 `action-writing-product-systems` / `command-result-action-lab` 等完整索引标记。
- 完整本地 e2e：178 passed。
- 已部署到 RayNode，部署源码提交为 `304c090`。
- 生产定向 smoke 6 passed，生产公开路由可访问性 47 passed。

## 已完成的 Phase 29 切片

- 新增 `src/data/writing.ts`。
- 定义 4 条长期写作线：产品判断、设计工程、部署与自动化、AI 协作。
- `/blog` 新增 Writing tracks 面板和 `track` query 筛选。
- `PostCard` 显示写作线 + intent。
- 文章详情页新增 `Reading quality context`。
- 中文文章显示“适合引用到哪里”：飞书阶段复盘、GitHub issue、PR 说明、路线图审查。
- 英文文章显示 Technical context：Source notes、Component decisions、API / route contracts、Implementation review。
- `RelatedReading` 根据当前文章 track / language 重排相关文章，并显示路径理由。
- `validate:content` 增加 writing intent、language、citation guide、related trails 和 writing track 校验。
- targeted e2e：6 passed。
- 完整本地 e2e：180 passed。
- 已部署到 RayNode，部署源码提交为 `f0ff534`。
- production targeted smoke：3 passed。
- production public route smoke：47 passed。

## 已完成的 Phase 25 切片

- RayNode 部署恢复确认。
- `raynode.me` 成为默认 `SITE_URL`。
- sitemap、robots、RSS、layout metadata 接入统一事实源。
- 动态文章、项目、Knowledge 详情页接入 canonical / OG helper。
- 首页移除伪实时 latest commit，改为 RayNode release channel。
- Lumen Evidence Pack 移除旧 Vercel deployment id 和硬编码 e2e 数字。
- `validate:content` 阻止 evidence metric 手写易腐烂测试数量。
- README 和 GitHub issue contact links 切到 RayNode 主站。
- 新增 GitHub Actions 最小质量门禁。
- Command Center 和 Photo lightbox 增加 focus trap / focus restore。
- 新增 6 篇文章、1 个非本站项目 case study、4 条 Knowledge。
- README 文档入口收敛。
- RayNode 已部署 `cb968a4`。
- 主站 smoke e2e 37 passed。

## 当前内容规模

- Posts：14。
- Projects：5。
- Knowledge entries：16。
- Public routes：52，包含 `/health.json`。

## 已完成的 Phase 32 切片

- Studio Pulse 完成 compact mode：桌面 2 列、平板 2 列、手机 1 列。
- 状态卡降低默认密度：更短摘要、更小 icon、更少装饰、更紧凑 badge。
- 卡片中重复 command 文本已移除，保留 compact `DataSourceBadge` command chip。
- `DataSourceBadge` 增加 `title`，视觉压缩后仍可追溯 source / route / command。
- Ask Me Terminal prompt row 改为横向滚动，移动端不再因按钮换行挤压响应区。
- Ask Me response 文案缩短，保留 Personal OS 和 trace loop 判断。
- `CodeBlock` 复制反馈修复：点击时从 DOM 读取代码，失败时显示 `Copy failed`。
- e2e 长串页面巡检拆分为单页契约，source reveal 和 Phase 25/26 public assets 失败时可定位具体页面。
- implementation commit：`018bab2`。
- RayNode 已部署 `b767bd9`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 53/53，`raynode:smoke` 48/48，Phase 32 targeted production tests 4/4。

## 已完成的 Phase 33 切片

- 新增 `test:e2e:chromium`、`test:e2e:mobile`、`test:e2e:local`。
- 新增 `test:e2e:smoke`，CI smoke 复用该脚本。
- 新增 `scripts/measure-route-timing.mjs`。
- 新增 `perf:routes` 和 `perf:routes:raynode`。
- README 已记录质量门禁、e2e 分片和 route timing 入口。
- 本地 `perf:routes`：10 routes，p95 625ms，max 625ms，0 slow，0 failed。
- RayNode `perf:routes:raynode`：52 routes，p95 817ms，max 1189ms，0 slow，0 failed。
- 本地 `test:e2e:chromium`：107/107 passed。
- 本地 `test:e2e:mobile`：107/107 passed。
- 观察到 `/projects/anyreader-interface-teardown` 在桌面 dev 分片中曾出现 29.3s 长尾；移动和生产未复现。
- implementation commit：`de27bd5`。
- RayNode 已部署 `28559a4`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 53/53，`raynode:smoke` 48/48，production `perf:routes:raynode` p95 798ms / max 917ms / 0 slow / 0 failed。

## 已完成的 Phase 34 切片

- 阶段名：Intent-Routed Content Quality Polish。
- 使用本地 `ai-collaboration-prompts` skill。
- 已读取 reference：
  - `expert-intent-reconstruction.md`
  - `document-cocreation-protocol.md`
- 阶段判断：用户对博客和 Lab 文字内容的反馈，本质是公开内容缺少更明确的读者动作，而不是需要增加更多页面。
- `LabComponent` 新增 `readerValue` 和 `nextUse`，让每个组件回答“访客为什么要看”和“下一次怎么复用”。
- `/lab` 页面新增 `Visitor value` 和 `next.use` 可见信号。
- Command Center 的 Lab 结果描述改用 visitor-facing value，关键词纳入 `nextUse`。
- 博客详情页 `Reading quality context` 新增 writing track promise，并显示当前文章级 `read.use("slug")`。
- e2e 已补充 Lab visitor value / next-use 与博客 read.use / promise 断言。
- 本地已验证：`validate:content`、`report:command-index`、`lint`、`build`、release evidence、smoke、route timing、`test:e2e:chromium` 和 `test:e2e:mobile` 通过。
- `npm run test:e2e:chromium`：107/107 passed。
- `npm run test:e2e:mobile`：107/107 passed。
- `npm run perf:routes`：10 routes，p95 524ms，max 524ms，0 slow，0 failed。
- Browser rendered check 已验证 `/lab`、`/blog/agent-handoff-loop` 和 Command Center 搜索 `visitor value`；390px 移动端无横向溢出。
- RayNode 已部署 `1e94875`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 53/53，`raynode:smoke` 48/48，production `perf:routes:raynode` p95 878ms / max 1357ms / 0 slow / 0 failed。
- Production fetch 确认 `/lab`、`/blog/agent-handoff-loop` 和 `/command-index.json` 均包含本阶段新增内容信号。

## 已完成的 Phase 35 切片

- 阶段名：Dev Route Long-Tail Diagnosis。
- 新增 `scripts/diagnose-route-long-tail.mjs`。
- 新增 `npm run perf:routes:long-tail`。
- 新增 `npm run perf:routes:long-tail:raynode`。
- 诊断默认聚焦 AnyReader、OpenProfile、Lumen、相关博客和 Knowledge 详情路由。
- 诊断输出 route 级 `first / p50 / p95 / max / warm max / slow / failed`。
- 本地默认诊断：10 routes，6 rounds，60 samples，p95 126ms，max 870ms，0 slow，0 failed。
- 本地 release detail 诊断：35 routes，105 samples，p95 146ms，max 235ms，0 slow，0 failed。
- 生产 release detail 诊断：35 routes，70 samples，p95 354ms，max 1351ms，0 slow，0 failed。
- RayNode 已部署 `bd826a8`。
- 线上验证：`raynode:health` 18/18，`raynode:health:full` 53/53，`raynode:smoke` 48/48。
- 部署后生产 long-tail：35 routes，70 samples，p95 335ms，max 948ms，0 slow，0 failed。
- 结论：AnyReader 没有稳定长尾；当前不应重构 `src/lib/content.ts`、MDX 静态导入或内容注册表。

## 已完成的 Phase 31 切片

- 首页 RayNode 状态 badge 拆成主状态 `Live on RayNode` 和工程细节 `Next.js standalone / Caddy`，移动端更短、更稳。
- `AmbientCursorField` 接入 pathname 判断，阅读详情页设置 `data-cursor-surface="reading"`，不再激活全站 cursor 光场。
- 阅读页 `reader-spotlight` 在 reading surface 下进一步降噪。
- Command Center 移动端弹层明确约束 top padding、结果区高度、footer 换行和输入 placeholder。
- 新增 e2e：阅读详情页不激活全局 cursor、移动端 Command Center 保持在 viewport 内。
- 本地截图 QA：`/tmp/phase31-after-home-mobile.png`、`/tmp/phase31-after-command-mobile-2.png`、`/tmp/phase31-after-article-mobile.png`。
- 本地完整 e2e：184 passed。
- 已部署到 RayNode，部署源码提交为 `f86b134`。
- production targeted interaction tests：2 passed。
- production route smoke：48 passed。

## 质量门禁

本地改动至少运行：

```bash
npm run validate:content
npm run report:command-index
npm run release:evidence -- --local-quality-passed
npm run validate:release-evidence
npm run lint
npm run build
npx playwright test --project=chromium --grep "command index|release evidence|health|command menu traps|photo lightbox traps|project case studies"
```

完整回归建议按项目分片执行：

```bash
npm run test:e2e:chromium
npm run test:e2e:mobile
```

说明：Phase 32 本地一次未分片长跑出现过 `ERR_NETWORK_IO_SUSPENDED`、browser launch timeout 和 `newPage` timeout；拆分为 project 后，`chromium` 107/107、`mobile-chrome` 107/107 均通过。后续不要把本机长跑资源异常误判为页面业务失败。

生产主站 smoke：

```bash
npm run raynode:health
npm run raynode:health:full
npm run raynode:smoke
npm run perf:routes:raynode
```

## 当前技术债触发条件

Command Center index 已经从 root layout 移出。当前规模适合按需加载 JSON，暂不需要服务端搜索。

触发条件：

- posts > 15，或
- knowledge entries > 25。

到达阈值后，评估是否从 `/command-index.json` 升级为 `/api/command-index` 或服务端搜索。

## 下一步建议

1. Phase 38：Homepage Featured Editorial Policy。
2. 明确首页 Featured essay、Selected work、Latest writing 的编辑规则，不要让最新内容自动替代最强证据。
3. 只有当 `perf:routes:long-tail -- --fail-on-slow` 稳定失败时，才重新审查 MDX 静态导入、图片处理或 Next dev 编译链路。
