# 全站产品与交互审计：2026-06-13

## 审计结论

当前版本已经具备完整的个人 Studio 骨架：公开路由可访问、视觉气质统一、桌面与移动端没有明显横向溢出，核心页面不是空壳。问题不在“有没有页面”，而在“入口承诺是否真实”：首页社交链接、邮箱、首页 `Media` 锚点、部分复制反馈和命令面板测试契约需要尽快收紧。

## 验证范围

- 生产环境：`https://elegant-developer-studio.vercel.app`
- 路由状态：17 个公开入口全部返回 `200`
- DOM 扫描：14 个 HTML 页面，桌面 `1440x900` 与移动 `390x844`
- 静态资源：截图抽检首页桌面、首页移动端、Lab 桌面
- 代码审查：重点检查链接、锚点、剪贴板、命令面板、筛选、媒体组件
- Lint：`npm run lint` 通过

## 外部参考基准

- W3C WCAG 2.2：键盘可操作、无键盘陷阱、链接目的清晰。
- W3C Link Purpose：链接文本应让用户理解点击后的结果。
- WebAIM Keyboard Accessibility：交互应优先使用原生链接、按钮和表单控件。
- Nielsen Norman Group Menu Design Checklist：导航必须帮助用户可靠找到内容与功能。
- Nielsen Norman Group UX Portfolio：作品集不应只有最终截图，还要呈现过程、角色、结果和反思。

## 阻断性问题

### P0：首页社交链接仍是占位目标

证据：
- `src/data/home.ts` 中 `GitHub`、`X`、`LinkedIn` 分别指向平台首页。
- DOM 扫描显示这些链接在首页桌面和移动端均可见。

影响：
- 用户点击后不会到达个人账号或作品入口。
- 移动端只显示图标，错误目标更难被用户预判。

建议：
- 只有真实账号才上线。
- 没有真实账号时先移除对应入口，或替换成 `/about`、`/projects`、真实 GitHub repo。

### P0：联系邮箱是占位式邮箱

证据：
- 首页、Knowledge、About、全局命令面板 metadata 均出现 `mailto:hello@ray.studio`。

影响：
- 用户可能无法真实联系到站点所有者。
- 这是比视觉缺陷更严重的信任缺陷。

建议：
- 替换成真实邮箱。
- 增加 `/contact` 页面，提供邮箱、GitHub issue、表单或日历链接，并说明响应预期。

### P1：首页 `Media` 导航锚点失效

证据：
- 首页 nav 中 `Media -> #media`。
- DOM 扫描确认 `#media` 目标不存在。

影响：
- 用户点击看似有效，但页面不会到达对应模块。

建议：
- 给媒体卡或媒体 section 添加 `id="media"`。
- 或把导航改为 `/music` / `/photos` 的真实页面入口。

## 高优先级问题

### P1：Logo 链接为 `#`

证据：
- 首页品牌链接 `href="#"`。

影响：
- 在首页效果类似回到顶部，但语义不清。
- 在长期复用 Header 时容易变成跨页错误。

建议：
- 改成 `/`。

### P1：`CodeBlock` 复制缺少 fallback

证据：
- `CodeBlock` 直接调用 `navigator.clipboard.writeText`。
- Uses、Lab、About、Knowledge 已经有 textarea fallback，CodeBlock 没有。

影响：
- 在权限受限、非安全上下文、浏览器策略变化时，代码复制没有稳定反馈。

建议：
- 抽一个共享 `writeToClipboard` 工具。
- 所有复制组件共用 fallback 和可测试反馈状态。

### P1：命令面板可用，但缺少稳定测试契约

证据：
- 搜索 `lab` 后 DOM 中存在真实 `<a href="/lab">`。
- 但自动化测试多次需要依赖文本猜测，选择器不够稳。

影响：
- 用户大概率可用，但后续回归测试脆弱。

建议：
- 给命令入口、搜索框、结果项增加 `data-testid`。
- 对 `Cmd+K -> 输入 -> Enter -> 路由变化` 建立 e2e 用例。

## 逐页评价

| 页面 | 优点 | 问题 | 改进方向 |
| --- | --- | --- | --- |
| `/` | 首屏高级，信息密度克制，身份明确，桌面/移动端成立 | 占位社交、占位邮箱、`#media` 缺失、Logo `#` | 先修真实链接，再加真实 Contact 与媒体锚点 |
| `/blog` | 标签筛选结构清楚，文章入口真实 | 标签过多时自动化选择器有歧义 | 给筛选项加稳定 id，支持 URL query |
| `/blog/[slug]` | TOC、锚点、代码块、阅读辅助已形成内容体验 | CodeBlock 复制无 fallback，文章案例还偏少 | 统一复制工具，补真实长文、SEO、OG |
| `/projects` | 项目列表可筛选，详情页可达 | 当前项目数量少，案例结果弱 | 给每个项目补角色、过程、结果、证据 |
| `/projects/[slug]` | 详情页面存在真实内容与 repo 链接 | 更像说明文，缺少 case-study 深度 | 增加问题、约束、方案、指标、复盘 |
| `/photos` | 筛选、精选、灯箱、上一张/下一张成立 | 仍是概念资产，缺少真实相册层级 | Phase 3 后补 album、EXIF、地点、故事 |
| `/music` | 播放/暂停/下一首状态真实，文案声明 mock audio | 没有真实音频，会降低“播放器”承诺 | 要么接入音频，要么定位为 Now Playing 状态卡 |
| `/knowledge` | 已替代 notes，卡片、引用、关联链接清楚 | Contact 关联仍指占位邮箱 | 补真实引用来源、公开 permalink、搜索 |
| `/uses` | 工具栈、分类、复制、工作流很适合程序员主页 | 复制反馈依赖浏览器权限但已有 fallback | 做成可分享 `/uses?category=code` 状态 |
| `/about` | 个人定位、原则、时间线、能力和路线完整 | 邮箱占位，履历仍偏抽象 | 加真实头像/照片、真实经历、联系方式 |
| `/lab` | 组件注册表价值高，可追踪、可复用 | Planned 组件可点击到泛锚点，复制需测试锚点 | Planned 项要有禁用/说明状态，组件加 preview |
| `/rss.xml` | 返回 200，支持订阅 | 需确认真实文章增长后稳定 | 加到 footer 或 blog 页明显入口 |
| `/sitemap.xml` | 返回 200 | 需持续随路由更新 | 纳入部署检查 |
| `/robots.txt` | 返回 200 | 当前足够 | 后续补 sitemap 显式引用 |

## 优点总结

- 信息架构从 `notes` 调整为 `knowledge`，符合之前偏好。
- Phase 1 到 Phase 5 的路线已经被页面结构承接：Home、Blog、Projects、Media、Interaction、Portfolio OS 都有入口。
- 视觉方向没有滑向模板站，也没有变成密集控制台。
- 组件资产开始具备复用价值：FilterBar、CommandMenu、PhotoGrid、MiniPlayer、KnowledgeCard、UsesShelf、AboutProfile、LabExplorer。
- 桌面与移动端未发现横向溢出。
- 没有发现空按钮名或空链接名。
- 未发现控制台 error/warn。

## 下一步建议

1. 先修真实可达性：社交链接、邮箱、`#media`、Logo 链接。
2. 建立 Playwright e2e：路由 200、所有内部链接、命令面板、筛选、复制、灯箱、音乐状态。
3. 把 `writeToClipboard` 抽成共享工具，修复 CodeBlock fallback。
4. 建立 `/contact` 页面，避免把联系能力压在 `mailto` 上。
5. 给 Lab 的组件注册表增加稳定测试锚点和真实预览。
6. 把项目详情升级为 case study，而不是项目摘要。
7. 对 Blog 增加真实内容密度、文章目录状态、分享链接、OG 图。
8. 对 Media 做承诺分级：真实音频/照片才叫播放器与相册，否则明确为状态卡或视觉记忆层。

