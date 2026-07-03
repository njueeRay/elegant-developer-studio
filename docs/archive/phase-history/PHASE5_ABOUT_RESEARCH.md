# 第五阶段 About 调研

日期：2026-06-13

## 目标

为第五阶段新增 `/about`，但不做传统简历页。

本轮目标是建立一个 Studio Profile：

- 说明 Ray 如何思考和工作。
- 给出可信的原则、时间线、能力边界和协作方式。
- 给后续 `/lab`、联系、作品、知识库提供人格入口。
- 保持优雅、低到中等信息密度，不堆简历条目。

## 外部参考

1. NN/g 关于 About 页面研究：用户期待 About 内容清晰、真实、透明，并会用它判断是否信任一个组织或个人。
   - 来源：`https://www.nngroup.com/articles/about-us-information-on-websites/`
   - 对本项目的启发：About 不是自夸页，必须能回答“你是谁、做什么、为什么可信、如何联系”。

2. NN/g 关于 About 摘要：顶层 About 应先讲清故事，信任感会影响后续互动。
   - 来源：`https://www.nngroup.com/articles/about-us-summaries/`
   - 对本项目的启发：首屏要先建立个人叙事，不应先堆工作经历表格。

3. Lee Robinson 个人站：一句话身份、工作、写作、音乐等生活信息放在同一语境中。
   - 来源：`https://leerob.com/`
   - 对本项目的启发：个人站的可信度来自真实、具体、可继续探索，而不是形式上的“完整简历”。

4. Josh Comeau 博客构建文章：个人技术站可以把设计细节、MDX、互动组件和实现方式结合起来。
   - 来源：`https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/`
   - 对本项目的启发：程序员风格不等于终端皮肤，而是让内容、组件和实现互相证明。

5. Apple HIG Layout：布局应适配不同上下文，同时保持可识别的一致性。
   - 来源：`https://developer.apple.com/design/human-interface-guidelines/layout`
   - 对本项目的启发：桌面和移动端要保留同一页面气质，不能只在桌面成立。

## 产品判断

`/about` 应该回答四类问题：

1. 这个人做什么：设计和构建冷静、代码支撑的界面。
2. 这个人如何判断：清晰优先、系统但保留人味、代码也是设计材料。
3. 这个人能承担什么：产品界面、前端工程、设计系统、产品判断、写作综合。
4. 如何合作：先定义问题形状，小步交付，交互必须有价值，审美要可追溯。

置信度：高。

## 本轮范围

实现：

- `/about` 页面。
- `src/data/about.ts` 数据模型。
- `AboutProfile` 页面组件。
- 首屏身份、介绍、状态条、命令入口、复制简介。
- 工作台视觉和时间线聚焦。
- 原则选择交互。
- 能力矩阵。
- 工作约定。
- Contact band 和相关路由快捷入口。
- Command Center 新增 `about` 类型、真实结果和 `About context`。
- 移除 `About is planned`。
- sitemap 增加 `/about`。
- 保存视觉参考：`public/references/about-page-reference.png`。

不做：

- 完整履历下载。
- 真实头像或个人照片。
- 联系表单后台。
- 可编辑 CMS。
- 动画宠物、假终端、code rain。

## 组件沉淀

- `AboutProfile`
- `Timeline` 的首版模式：当前先内嵌在 About，后续可抽出。
- `SkillMatrix` 的首版模式：当前先内嵌在 About，后续可抽出。
- `WorkingAgreement` 数据模型。
- `ContactPanel` 的深色 CTA 变体。
- Command Center `about` 类型。

## 视觉方向

采纳 `Warm Studio x Developer Atelier`：

- 大标题和 serif 叙事来自 Claude Warm AI。
- 时间线、能力矩阵、复制引用来自 Primer/开发者语义。
- 命令入口和结果搜索来自 Linear/Raycast 式效率层。
- 材质、光感、适配和低 chrome 来自 Apple 式克制。

参考图：

- `public/references/about-page-reference.png`

## 程序员风格的巧思

本轮采用：

- `Copy intro`：复制稳定 About 引用，方便放入评论、README、飞书或对外介绍。
- 原则选择：用户能看到原则背后的解释，不只是三张静态卡片。
- 时间线聚焦：轻量切换，不展开成完整简历。
- Command Center `about` 搜索：About 内容进入全站命令层，而不是孤立页面。

本轮拒绝：

- 宠物：会抢 `/about` 的信任叙事。
- 跟随鼠标强特效：对 About 不如对博客阅读微光有价值。
- 假终端：与当前工作室审美冲突。

## QA

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser QA：`/about` 标题为 `About - Ray Studio`。
- Browser QA：原则选择从 `Clarity before theatre` 切到 `Code as product material`。
- Browser QA：`Copy intro` 显示 `Copied`。
- Browser QA：Command Center 搜索 `about` 显示真实 About 结果，不再出现 `About is planned`。
- 生产构建移动端 390 x 844：`scrollWidth 390`，`clientWidth 390`。
- 桌面 1440 x 1200：首屏成立，低到中等信息密度，无关键内容遮挡。

截图：

- `/tmp/about-desktop-1440.png`
- `/tmp/about-command.png`
- `/tmp/about-mobile-prod-fixed.png`

## 后续建议

1. 下一阶段优先做 `/lab`，因为 About 已经补上人的可信入口。
2. `/about` 后续可以加入真实经历、精选推荐语、公开演讲/文章链接。
3. 如果要加联系表单，必须先确定反垃圾和数据存储策略。
4. `Timeline` 和 `SkillMatrix` 可以在 `/lab` 中抽成正式组件预览。

