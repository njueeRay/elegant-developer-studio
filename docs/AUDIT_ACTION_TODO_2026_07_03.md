# 2026-07-03 个人主页审计行动清单

来源文档：`docs/CLAUDE_CODE_PERSONAL_HOMEPAGE_AUDIT_2026_07_03.md`

生成日期：2026-07-03

状态：执行中

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
- [ ] 验证 `https://raynode.me`、`https://www.raynode.me`、`/rss.xml`、`/sitemap.xml`、`/robots.txt`。

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
