# 个人主页开发状态总审查与后续路线图

日期：2026-07-09

适用范围：Ray Studio / Elegant Developer Studio 当前公开个人主页、内容系统、媒体层、交互层、项目证据层和后续阶段规划。

当前结论：这个个人主页已经越过“好看的个人站原型”阶段，进入“公开个人工作室系统”阶段。真正的风险不再是页面不够多、组件不够酷，而是内容对象、证据路径、媒体资产、首页策展和交互装饰之间的优先级开始混在一起。如果继续直接加模块，系统会膨胀；如果先补对象边界和证据，后续的炫酷交互才会有支点。

## 采用的 AI 协作 Reference

本次分析使用 `ai-collaboration-prompts` 中两个 reference：

1. `references/expert-intent-reconstruction.md`
   用于把用户的开放表达重构为专业任务定义。核心启发是：用户给的是线索，不是规格；AI 需要区分愿望、假设、方案、约束、缺口和风险。
2. `references/systems-thinking-for-agents.md`
   用于把个人主页作为一个长期演进系统审查。核心启发是：不要只看单点页面，要看状态、反馈循环、延迟副作用、局部优化和系统杠杆点。

本次没有使用互联网实时调研，因为任务目标是审查当前本地项目状态和规划内部开发路线。外部风格调研适合后续视觉 polish 或媒体层重构阶段单独进行。

## 需求重构

### 字面请求

用户希望我回忆前面对话中发现的问题，继续扩展审查当前个人主页，并产出一份超级详细的 Markdown 文档。用户特别指出 `music` 和 `photos` 可能存在入口不清晰或资产空载问题，希望判断它们应该归入 media 处理，还是需要其他信息架构安排。

### 真实目标

真实目标不是“列问题”本身，而是建立一个可以持续推进的开发诊断文档：

- 明确当前个人主页到底是什么系统。
- 判断哪些问题已经解决，哪些只是局部缓解。
- 找出下一阶段最值得优先解决的问题。
- 把未来开发从“想法驱动”改成“阶段路线驱动”。
- 避免装饰性组件早于真实内容、证据和对象边界。

### 表达中的关键缺口

| 类型 | 当前缺口 | 处理方式 |
|---|---|---|
| 目标缺口 | “问题”可能包括设计、内容、交互、路由、证据、部署和文档，范围很大。 | 按系统层级拆分：可访问性、信息架构、内容对象、证据、媒体、交互、视觉、治理。 |
| 验收缺口 | 不清楚文档是聊天回答还是仓库资产。 | 新建独立 Markdown 文档，并登记到项目文档地图。 |
| 假设缺口 | 用户怀疑 photos/music 空载，但需要基于代码确认。 | 审查 `src/data/media.ts`、`/photos`、`/music`、导航、Command Center、首页媒体入口。 |
| 风险缺口 | 如果直接把 photos/music 提到主导航，可能增加首页和导航负担。 | 先定义 Media Trust Layer，不急于增加一级导航。 |
| 优先级缺口 | 用户希望未来可以扩展 list，但不能变成无限愿望清单。 | 按 Phase 39-45 切成可执行路线。 |

### 重构后的任务定义

| 项 | 内容 |
|---|---|
| 目标 | 产出当前个人主页开发状态总审查，明确问题、优点、缺点、媒体层判断和未来分阶段路线。 |
| 读者 | 用户本人、后续 Codex/Claude/Copilot 协作 agent、未来接手维护者。 |
| 输入 | 当前仓库代码、已有项目文档、Phase 36-38 完成记录、用户关于 media/photos/music 的反馈。 |
| 输出 | 一份仓库内 Markdown 文档，包含系统审查、问题列表、优先级路线和验收标准。 |
| 约束 | 中文优先；不能编造当前页面状态；不能把尚未实现的能力写成已完成；不能用装饰性功能掩盖内容问题。 |
| 验收标准 | 文档能直接指导下一阶段开发；能解释 photos/music 当前状态；能列出从虚到实、从内容到装饰的优先级。 |

## 当前系统目标

Ray Studio 不是单纯的个人简历页，也不是作品集模板。当前更准确的系统定义是：

> 一个公开的设计工程师工作室系统。首页负责表达当前判断力；Blog 负责论证；Projects 负责证据；Knowledge 负责规则；Uses 负责工作流；Lab 负责实验；About 负责人的边界；Photos / Music 负责生活、审美和记忆层；Command Center 负责跨对象导航；文档和 release evidence 负责追溯。

这个定义下，所有开发优先级都应该服从一个问题：

> 这个改动是否让访客更清楚地理解 Ray 是谁、在判断什么、做过什么、证据在哪里、下一步能去哪？

如果不能，它就只是装饰。

## 当前状态摘要

### 已上线状态

- 主站：`https://raynode.me`
- 当前部署源提交：`baececf`
- 当前 GitHub main：`52feaaa`
- 内容规模：15 posts / 5 projects / 17 knowledge entries
- release evidence：54 public routes
- Command Center：112 items，按需加载 JSON
- 线上验证：health 18/18，full routes 55/55，smoke 50/50

### 已实现页面

| 页面 | 职责 | 当前状态 |
|---|---|---|
| `/` | 首页策展面、身份、当前状态、精选对象、Media note、Knowledge signal | Phase 38 后已从自动 featured 转为编辑策略 |
| `/blog` | 写作归档、filter、writing tracks、content scale | 已有 15 篇，进入内容规模审查线 |
| `/blog/[slug]` | 文章阅读、TOC、metadata、related reading、reading focus | 已可用 |
| `/projects` | 项目归档和筛选 | 已可用 |
| `/projects/[slug]` | 项目 case study、证据包、source reveal、case study diff | 已可用，但证据排序仍需强化 |
| `/knowledge` | 知识规则、决策、模式归档 | 已可用 |
| `/knowledge/[slug]` | Knowledge detail、Reference links、backlinks | 已可用 |
| `/uses` | 工具、工作流、实践栈 | 已可用 |
| `/lab` | 组件实验室、Personal OS Zoo、交互组件 | 已可用 |
| `/about` | profile、原则、能力、协作边界 | 已可用 |
| `/photos` | 照片网格、筛选、灯箱 | 已可用，但记忆/来源可信度偏弱 |
| `/music` | mix、mini player、track list、mock playback | 已可用，但仍是 mock 状态 |
| `/collaboration` | 协作、治理、创意 backlog | 已可用 |
| `/contact` | 联系入口 | 已可用 |

## 已记住并已处理的问题

这些是前面对话中已经暴露、并已经不同程度解决的问题。

| 问题 | 当时风险 | 当前状态 | 证据 |
|---|---|---|---|
| 页面存在但外部用户找不到，例如 Uses / Lab / About | 页面只是内部可访问，不是真正公开产品面 | 已解决，主导航包含 Writing / Work / Knowledge / Uses / Lab / About，移动端含 secondary navigation | `src/data/navigation.ts`、e2e primary surfaces |
| Lab / Uses / About 职责混杂 | 信息架构不清，用户不知道该去哪 | 已缓解，职责边界已写入页面和项目地图 | `docs/PROJECT_MAP.md` |
| 首页曾经容易变成高密度控制台 | 违背“优雅个人工作室”方向 | 已多轮收敛，Studio Pulse compact、首页编辑策略已完成 | Phase 32、Phase 38 |
| 公开页面可能只是内部 agent 知道，用户点击不到 | 典型交互级错误 | 已用 e2e 扩大覆盖，公开路由 smoke 与导航测试已稳定 | `tests/site-access.spec.ts` |
| release evidence、部署信息、测试数字可能腐烂 | 精确数字造成虚假可信 | 已建立生成型 release evidence 和校验 | `scripts/write-release-evidence.mjs`、`scripts/validate-release-evidence.mjs` |
| Command Center 初始 HTML 携带完整 index | 首页负载和隐性复杂度增加 | 已改为 `/command-index.json` 懒加载 | Phase 28 |
| 首页 Featured / Latest 逻辑漂移 | 最新内容误替代最强证据 | Phase 38 已解决，新增 `src/data/home-editorial.ts` | `src/data/home-editorial.ts` |
| 媒体卡 Play/Pause 像伪播放 | 交互承诺不诚实 | 已改为 `Preview cue` + `Open mix` | `src/components/studio-home.tsx` |
| 文档和阶段追溯不集中 | 长程协作记忆易丢失 | 已建立 PROJECT_MAP、CURRENT_CONTEXT、VERSION_TRACE、AUDIT TODO | `docs/` |

## 当前仍存在的问题

### P0：暂无阻塞性生产问题

当前没有发现类似“页面不可访问”“主导航断链”“部署不可信”“release evidence 腐烂”的 P0 问题。线上 smoke 和 targeted e2e 通过。

### P1：媒体层索引与可信度不足

用户关于 photos/music 的观察是成立的，但要更精确地表述：

> `photos` 和 `music` 不是空载资产，它们已经有路由、数据、组件、Command Center 入口、sitemap 入口和移动端 secondary nav；但它们在桌面首页和主信息架构中的索引仍偏弱，且媒体对象的真实个人记忆和可信状态不足。

当前事实：

- `/photos` 存在，使用 `PhotoGrid`，支持筛选和灯箱。
- `/music` 存在，使用 `MiniPlayer`，支持播放状态、曲目切换、进度和音量 UI。
- `src/data/media.ts` 中有 6 张照片、4 首 track、1 个 currentMix。
- Command Center 有 `action-photos` 和 `action-music`。
- sitemap 包含 `/photos` 和 `/music`。
- 移动端菜单 secondary navigation 包含 Photos / Music。
- 首页当前只有一个 `Media note`，并且只明确链接到 `/music`。

问题：

- 桌面主导航没有 Photos / Music。
- 首页没有清楚呈现“Media = Photos + Music”的索引结构。
- `/photos` 的若干图片来自 Unsplash 或生成资产，个人记忆感不足。
- `/music` 明确写着 mock playback state，不能假装是真实播放系统。
- Media 当前更像“气质层”，还不是“个人记忆层”。

判断：

- 不建议现在把 Photos / Music 直接塞进桌面主导航。主导航已经有 6 个一级入口，再加会降低主路径清晰度。
- 也不建议马上创建 `/media` 一级页面。除非 photos/music 具备更强对象模型，否则 `/media` 只会变成薄目录。
- 最优策略是 Phase 40 做 `Media Trust Layer`：先在首页或 media 卡片内明确 Photos / Music 双入口，再增强照片和音乐的对象状态。

建议的 Phase 40 最小闭环：

- 首页 Media note 改为 `Media` 小索引，包含 `Open music` 和 `Browse photos` 两个真实入口。
- `src/data/media.ts` 增加 `source`、`personalness`、`status` 或 `origin` 字段，区分 Generated / Unsplash / Personal / Mock。
- `/photos` 每张照片显示“为什么在这里”，而不是只显示 mood/story。
- `/music` 保留 mock 诚实说明，但增加 “why this mix exists” 和 “where this track is used”。
- e2e 增加首页 photos/music 双入口可达断言。

### P1：项目证据排序仍不够锋利

项目页已经有 evidencePack 和 caseStudyDiff，但下一阶段仍应审查：

- 最强证据是否在最上方。
- before/after/proof 是否足够具体。
- proof 是不是能点击到真实页面、repo、文档或测试。
- 项目卡片和详情页是否都能说明“这个项目证明了什么”。
- OpenProfile、AnyReader、Lumen、Studio Knowledge Base、Codex Feishu Bridge 的证据强度是否一致。

Phase 39 应优先做这件事，因为首页 Selected work 已固定为 OpenProfile。首页把它推到前台后，项目详情页必须承接这个承诺。

### P1：Blog 已到内容规模审查线

当前 posts = 15。Phase 37 已公开 `content.scale("watch")`，但这只是提醒，不是治理本身。

风险：

- 第 16 篇文章会让归档、Command Center、首页 latest/featured、Knowledge trails 都进入更高复杂度。
- 如果继续加文章但不强化筛选和引用路径，Blog 会从“思想系统”变成“文章堆”。

建议：

- 新增第 16 篇文章前，必须执行 Phase 43 `Post-16 Content Review Gate`。
- 除非新文章有外部对象、项目证据或 Knowledge 规则，否则不应新增。

### P2：Knowledge 关系强，但可视化仍克制过头

Knowledge 当前不是空壳，已经有 detail、Reference links、Backlinks、Related writing、Project evidence。但对新访客来说，它仍然偏文本列表。

不建议做大型图谱。大型图谱很容易变成炫技背景。

建议做 Phase 41 `Knowledge Graph Thin Layer`：

- 只在 Knowledge detail 或文章底部展示局部关系。
- 每条关系要有理由：为什么这篇文章关联这个 Knowledge。
- 不追求节点多，追求路径清楚。

### P2：首页视觉 polish 仍有残余

Phase 38 本地截图复核时发现：

- OpenProfile 图片在移动端 highlight card 中略窄裁切。
- `why.here(...)` 默认显示后，信息密度略有增加。
- Media card 目前链接到 `/music`，但没有同等暴露 `/photos`。

这些不是阻塞问题，但适合 Phase 42 统一处理。

### P2：装饰性组件仍需要“准入门槛”

用户多次提到想要酷一点、鼠标跟随、宠物、互动感。这些方向不是错，但当前阶段不能优先于对象和证据。

准入门槛应该是：

- 它是否解释了内容对象？
- 它是否提升导航效率？
- 它是否暴露状态？
- 它是否可关闭、可降级、尊重 reduced motion？
- 它是否有测试覆盖？

如果答案是否，它就应该留在 Lab，而不是首页。

## 当前优点

### 1. 系统已经有真实骨架

多数个人主页只有首页、博客、项目三件套。当前站点已经有：

- 内容层：Blog、Knowledge、Projects。
- 证据层：release evidence、ProjectEvidencePack、source reveal。
- 交互层：Command Center、Reading Focus、copy feedback、filters。
- 媒体层：Photos、Music。
- 工作流层：Uses、Collaboration、Contact。
- 治理层：PROJECT_MAP、VERSION_TRACE、CURRENT_CONTEXT、AUDIT TODO。

这不是空皮。

### 2. 可访问性和公开可达性意识较强

过去最大的问题之一是“内部知道有页面，外部用户看不见”。现在主导航、移动导航、Command Center、sitemap、e2e smoke 都在覆盖可达性。

### 3. 首页已经从模板感进入策展感

Phase 38 后，首页不是自动取最新内容，而是由 `homeEditorialPolicy` 明确选择对象。这是非常重要的分水岭。

### 4. 中文内容进入系统记忆

中文不是翻译层，而是用于阶段复盘、产品判断和协作记忆。这符合用户偏好，也让站点更像真实工作系统。

### 5. 部署和追溯比多数个人站强

RayNode、自托管、Vercel fallback、release evidence、health endpoint、版本追溯、e2e 都已经建立。这个项目的工程可信度高于普通作品集。

## 当前缺点

### 1. 媒体层还不像真正的“个人记忆”

它现在更像氛围组件和素材集合。照片缺少真实来源层级，音乐缺少真实播放能力或明确的 mock 边界故事。

### 2. 项目页证明力还不均匀

OpenProfile 是当前首页精选作品，但项目详情页还可以更强地展示：

- 为什么它是 selected work。
- 它解决了什么外部问题。
- repo / docs / tests / release 的证据顺序。
- before/after/proof 的第一屏可读性。

### 3. 首页下半区仍有入口合集感

Knowledge / Lab / Uses / About / Contact 都可用，但下半区仍然像入口网格。它们应该逐步变成“有当前状态的对象入口”，而不只是解释性模块。

### 4. `featured` 语义仍需继续收敛

Phase 38 已经把首页选择从 `featured` 解耦。但内容系统里很多文章仍然 `featured: true`。这不是错误，但未来需要明确：

- `featured` 是归档推荐？
- `homepageEditorial` 是首页策展？
- `pinned` 是长期置顶？
- `draft` 是否允许进入公开列表？

### 5. 装饰性互动还没有明确产品语法

Ambient cursor、Studio Pulse、Ask Me Terminal 都比较成功。但未来如果引入宠物、hover toys、粒子、声音、更多动效，必须有准入制度，否则会从优雅变成玩具柜。

## 从虚到实的开发路线

这里的“虚到实”不是贬义。早期需要视觉、气质和想象力；但越往后，越应该把抽象气质落到真实对象、真实证据、真实交互和真实维护机制。

### 阶段 A：视觉气质层

目标：让首页第一眼成立。

已完成：

- Claude / Primer / Linear / Apple 方向融合。
- Developer Atelier 风格。
- 首屏身份、状态、Read / Work 入口。
- 温暖、克制、低密度的视觉系统。

当前判断：

- 这个阶段已经完成，不应继续反复重做视觉方向。
- 后续视觉优化应该围绕具体问题，例如 OpenProfile 图片裁切、Media card 双入口、why.here 显隐。

### 阶段 B：内容骨架层

目标：让站点从页面变成内容系统。

已完成：

- Blog / Projects / Knowledge。
- MDX 内容注册。
- Writing tracks。
- Related reading。
- Content scale panel。

当前判断：

- 内容骨架成立。
- 新内容必须有外部对象、项目证据或 Knowledge 规则，不接受随手写。

### 阶段 C：证据与可信层

目标：让页面说的话能被验证。

已完成：

- Release evidence。
- Project evidence pack。
- Source reveal。
- Command index report。
- RayNode health。

仍需：

- Phase 39 项目证据排序。
- Case study diff 首屏强化。
- 项目页 evidence 质量分级。

### 阶段 D：媒体与生活层

目标：让个人主页有生活、审美和记忆，但不稀释专业性。

已完成：

- `/photos`。
- `/music`。
- 首页 Media note 到 `/music`。
- Command Center photos/music。

仍需：

- Media Trust Layer。
- 首页同时暴露 Photos / Music 的轻量索引。
- 照片来源与个人记忆强度标注。
- 音乐 mock 状态与真实播放路线明确。

### 阶段 E：交互与探索层

目标：让页面有可探索性，但不抢内容。

已完成：

- Command Center。
- Ask Me Terminal。
- Studio Pulse。
- Reading Focus。
- Copy feedback。
- Ambient cursor。

仍需：

- 交互准入标准。
- Lab 先行机制。
- reduced motion 和移动端触控约束。
- 小型“对象解释型”动效，而不是纯装饰。

### 阶段 F：装饰性组件层

目标：在真实系统成熟后加入更酷的表达。

当前不应优先：

- 常驻宠物。
- 高强度背景特效。
- 复杂 3D 世界。
- 大型图谱动画。

可以探索：

- 只在 Lab 出现的互动玩具。
- 与 Command Center 或 Reading Focus 绑定的微动效。
- Media layer 中的声音/照片状态动效。
- 首页卡片 hover 时的轻量 source trace。

## 分阶段开发路线

### Phase 39：Project Evidence Ranking & Case Study Diff Polish

优先级：P1

目标：让首页 Selected work 的承诺被项目详情页充分承接。

范围：

- 审查 5 个项目的 evidencePack。
- 为 evidencePack 增加排序规则或 `priority`。
- 强化 OpenProfile 项目详情页第一屏。
- 审查 caseStudyDiff 是否具体、可点击、可验证。
- 让项目卡片和项目详情页都能回答“这个项目证明什么”。

验收：

- OpenProfile 详情页第一屏能解释为什么它是 Selected work。
- evidencePack 最强证据排在最前。
- 每个项目至少有 source / document / test / deployment 或明确说明缺口。
- e2e 覆盖 OpenProfile selected work evidence path。

不做：

- 不新增新项目。
- 不重做项目页视觉。
- 不添加虚假的影响数字。

### Phase 40：Media Trust Layer

优先级：P1

目标：解决用户指出的 photos/music 索引不清和媒体资产空载感。

范围：

- 首页 Media note 改成轻量 Media index：Music + Photos。
- `src/data/media.ts` 增加来源与状态字段。
- `/photos` 显示照片来源、个人记忆强度、为什么保留。
- `/music` 显示 mix 目的、mock 状态、track 使用场景。
- Command Center 搜索 media 时能区分 Photos / Music / Track / Photo。

验收：

- 首页能同时进入 `/photos` 和 `/music`。
- `/photos` 不再只是图片网格，而是视觉记忆层。
- `/music` 不再像伪播放器，而是诚实的工作室 mix surface。
- e2e 覆盖首页 Photos / Music 双入口。

不做：

- 不急着创建 `/media`，除非 Media index 内容足够厚。
- 不把 Photos / Music 加进桌面主导航，除非后续使用数据证明它们是主路径。

### Phase 41：Knowledge Graph Thin Layer

优先级：P2

目标：让 Knowledge 的关系更可见，但不做噪音图谱。

范围：

- Knowledge detail 增加局部关系解释。
- Article / Project / Knowledge 之间展示 3-5 条最相关路径。
- 每条路径写清楚 relation reason。

验收：

- 用户能从一篇文章理解它关联哪些 Knowledge 和项目。
- 不出现复杂节点图。
- 移动端无横向溢出。

不做：

- 不做全站大图谱。
- 不做纯视觉星图。

### Phase 42：Homepage Visual Polish

优先级：P2

目标：处理 Phase 38 后遗留的视觉细节。

范围：

- OpenProfile 图片移动端裁切。
- `why.here(...)` 默认显示密度。
- Highlight rail 卡片节奏。
- Media card 与 Photos / Music 双入口视觉平衡。

验收：

- 桌面和移动端首页截图复核。
- Highlight cards 不像说明书。
- Media index 不抢 Featured essay / Selected work。

不做：

- 不换整套视觉风格。
- 不新增大型动效。

### Phase 43：Post-16 Content Review Gate

优先级：P1

目标：新增第 16 篇文章前，先复核内容规模。

范围：

- 审查 Blog filters。
- 审查 Command Center 搜索结果。
- 审查首页 Editorially recent。
- 审查 Knowledge trails。
- 审查 release evidence 和 route count。

验收：

- 第 16 篇文章必须通过新增内容准入：外部对象、项目证据或 Knowledge 规则。
- 不允许纯站内建设日志继续增加归档噪音。

### Phase 44：Current Work / Now Page

优先级：P3

目标：如果 Studio Pulse 继续承载“当前状态”，可以考虑独立出更完整的 `/now` 或 `/status`。

范围：

- 当前写作。
- 当前项目。
- 当前读/听/看。
- 最近发布。
- 近期下一步。

判断：

- 暂不立即做。当前 Studio Pulse 够用。
- 只有当首页状态继续膨胀时，才需要把它拆出去。

### Phase 45：Playful Interaction Lab

优先级：P3

目标：探索用户希望的“更酷”的微交互，但必须先进入 Lab。

候选：

- 鼠标跟随的 source trace。
- 阅读页 subtle cursor lens。
- Command Center 搜索时的 lightweight terminal echo。
- Media page 的音频波形视觉。
- 可关闭、低存在感的 studio companion。

准入条件：

- 必须支持 reduced motion。
- 必须不遮挡内容。
- 必须有移动端降级。
- 必须有 e2e 或截图复核。
- 必须先在 `/lab` 验证，再进入首页。

## 优先级排序

| 优先级 | 类型 | 代表问题 | 应对阶段 |
|---|---|---|---|
| P0 | 可访问、部署、事实源 | 页面不可达、导航断链、release evidence 腐烂 | 当前暂无 |
| P1 | 证据、对象、信息架构 | 项目证据排序、Media 索引、Post-16 内容门禁 | Phase 39 / 40 / 43 |
| P2 | 关系、视觉、体验 polish | Knowledge 局部关系、首页视觉细节 | Phase 41 / 42 |
| P3 | 装饰性探索 | 宠物、动效、趣味交互、Now page | Phase 44 / 45 |

## 对 photos / music 的最终判断

它们不是空载，但还不够实。

更准确地说：

- Photos 是已有页面，不是隐藏资产；但它目前更像视觉素材层，还不是强个人记忆层。
- Music 是已有页面，不是空链接；但它明确是 mock playback state，还不是完整音乐系统。
- 首页已经通过 Media note 挂到了 `/music`，但没有同等暴露 `/photos`。
- 桌面主导航没有 Photos / Music；移动 secondary nav 有。
- Command Center 有 Photos / Music，但这对普通访客来说不是第一认知入口。

所以，下一步不该简单问“要不要把 Photos / Music 放主导航”。更好的问题是：

> Media 是否已经足够有对象厚度，值得变成主路径？

当前答案：还不够。

推荐处理：

1. Phase 40 先做 Media Trust Layer。
2. 首页 Media card 升级为双入口：Music + Photos。
3. Photos/Music 增加来源、状态、保留理由。
4. 如果媒体层变厚，再考虑 `/media` 聚合页。
5. 如果 `/media` 聚合页成立，再考虑桌面导航是否加入 Media。

## 不应该做的事

- 不要现在重做首页。
- 不要把 Photos / Music 直接塞进主导航。
- 不要为了“酷”引入常驻宠物或大型动画。
- 不要继续新增文章绕过 Post-16 审查。
- 不要创建没有真实对象来源的新项目。
- 不要把 mock music 写成真实播放。
- 不要用生成图片伪装成真实摄影记忆。

## 应该立即做的事

下一阶段应锚定 Phase 39：

1. 审查所有项目页 evidencePack。
2. 给项目证据定义排序或优先级。
3. 强化 OpenProfile 详情页，因为首页已经把它作为 Selected work。
4. 检查 caseStudyDiff 的 before / after / proof 是否足够具体。
5. 为 Phase 40 Media Trust Layer 写更细的 TODO。

## 结论

当前个人主页的总体方向是正确的。它已经不是普通作品集，而是一个可追溯的个人工作室系统。

但下一个风险也很清楚：如果继续添加页面、文章、媒体和互动，而不先强化对象边界和证据路径，它会从“系统感”滑向“复杂感”。

最优路线是：

1. 先强化项目证据。
2. 再补媒体层真实索引。
3. 再做轻量 Knowledge 关系。
4. 再做视觉 polish。
5. 最后才允许更炫酷的装饰性互动进入首页。

简短判断：

> 这个站点现在不缺想象力，缺的是继续把想象力落成真实对象的耐心。
