# Elegant Developer Studio｜项目知识库导航

> 结论：这个知识库是个人主页 Studio 项目的云端协作层。仓库仍是事实源，飞书负责阅读、评论、复盘和阶段协同。

首选语言：中文。英文只保留在代码路径、组件名、API、品牌名、外部链接标题和必要专有名词中。

## 快速入口

| 模块 | 页面 | 用途 |
| --- | --- | --- |
| 项目地图 | [01｜项目地图](https://scnlb1lk96sb.feishu.cn/wiki/PG7ew3DRviyumekYTSec9n4znWf) | 项目总地图：产品、路由、阶段、组件、质量门禁 |
| PRD | [02｜PRD 与产品定义](https://scnlb1lk96sb.feishu.cn/wiki/K71jwiNDeiq1WBkmAxfcQkDKnWe) | 产品目标、范围、验收标准 |
| 路线图 | [03｜路线图与阶段计划](https://scnlb1lk96sb.feishu.cn/wiki/TwvowNrUpiTyFekUU5mcJ4vBn2f) | Phase 1-5 的交付计划 |
| 信息架构 | [04｜信息架构 IA](https://scnlb1lk96sb.feishu.cn/wiki/H8O7wIK0pibqivk6SIAcp72Xnob) | 顶层导航、路由、命名决策 |
| 设计系统 | [05｜设计系统](https://scnlb1lk96sb.feishu.cn/wiki/HrgcweuFCiL5E8kOdQPcOsXtnyg) | 视觉 tokens、组件库存、资产规则 |
| 开发进度 | [06｜开发进度](https://scnlb1lk96sb.feishu.cn/wiki/CKEKwH6vriYZMOkyPnDcDMvYn1d) | 每阶段进展、验证、提交记录 |
| 决策记录 | [07｜决策记录 ADR](https://scnlb1lk96sb.feishu.cn/wiki/D67twGhp5izbt1kk7olc6TyunZf) | 长期产品/架构决策 |
| 版本追溯 | [08｜版本追溯](https://scnlb1lk96sb.feishu.cn/wiki/G8nwwns5ii1JZtkw77GcB5Y0nob) | 版本、部署、commit、tag |
| 质量验收 | [09｜质量验收 Design QA](https://scnlb1lk96sb.feishu.cn/wiki/HLO5waemhiXD24kyfuXc7WXFnGe) | QA 方法、截图、交互验证 |
| 素材参考 | [10｜素材与参考](https://scnlb1lk96sb.feishu.cn/wiki/BTdhw9uB9iLBuik767Gcjiv7nUb) | 视觉参考、生成资产、后续素材策略 |
| 执行复核 | [11｜执行复核](https://scnlb1lk96sb.feishu.cn/wiki/VkYEwYWeli09ZTkDtxYchYyHn1f) | 用户建议与实际执行证据对照 |
| 同步协议 | [12｜同步协议](https://scnlb1lk96sb.feishu.cn/wiki/KJT5wmMo7iWpInk2XgMcw9NhnXe) | 飞书节点、文档 token、媒体插入和同步命令 |
| 第二阶段复盘 | [13｜第二阶段复盘](https://scnlb1lk96sb.feishu.cn/wiki/BewGwyWMriSmq6ksOTGcCFGinke) | 内容核心阶段复盘、调研参考和后续问题 |
| 第三阶段调研 | [14｜第三阶段媒体层调研](https://scnlb1lk96sb.feishu.cn/wiki/BhgywbF5DiIe5ykU8ZCcERVvnTc) | 媒体层调研、产品判断、组件进入计划 |

## 当前项目状态

| 项 | 当前值 |
| --- | --- |
| 当前版本 | `v0.2.0` |
| GitHub | `https://github.com/njueeRay/elegant-developer-studio` |
| Vercel | `https://elegant-developer-studio.vercel.app` |
| 主追踪文档 | `docs/PROJECT_MAP.md` |
| 进度账本 | `docs/PROGRESS_LOG.md` |
| 决策记录 | `docs/DECISIONS.md` |

## 使用方式

1. 看方向：先读项目地图。
2. 看为什么：读 PRD、信息架构、决策记录。
3. 看当前进度：读开发进度和版本追溯。
4. 看质量：读质量验收。
5. 提需求或评论：优先评论对应飞书页面；下一轮开发会同步回 GitHub issue 和仓库文档。

## 同步规则

- 仓库文档是事实源。
- 飞书是协作层。
- 每个阶段完成后必须同步：
  - `PROJECT_MAP.md`
  - `PROGRESS_LOG.md`
  - `VERSION_TRACE.md`
  - 对应阶段页面或 issue
- durable decision 必须写入 `DECISIONS.md`。
