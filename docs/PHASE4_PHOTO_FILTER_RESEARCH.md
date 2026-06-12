# 第四阶段照片筛选调研

日期：2026-06-13

## 结论

本切片的目标是验证 `FilterBar` 是否能离开文章/项目列表，进入更复杂的媒体浏览场景。

选择 `/photos` 而不是先抽象 `GlobalSearch`，原因很直接：

- 当前内容规模仍小，不需要完整全文搜索。
- 照片数据已经有 `tags`、`featured`、`mood`、`aspect`。
- 照片页同时有精选区域、网格和灯箱，能验证筛选状态是否真正贯穿页面。
- 这比继续堆 Command Center 更接近用户可感知的浏览体验。

## 外部调研

### NN/g：Filters vs. Facets

参考：`https://www.nngroup.com/articles/filters-vs-facets/`

NN/g 区分了 filters 和 facets：filters 是排除不满足条件的内容，faceted navigation 则是用多个维度描述内容集合。对本项目的启发：

- 当前照片只有 6 张，不需要完整 faceted navigation。
- 单选标签筛选足够，先不做多维组合。
- 等照片数量增加后，再考虑 facet，例如地点、年份、mood、camera。

### NN/g：Helpful Filter Categories and Values

参考：`https://www.nngroup.com/articles/filter-categories-values/`

NN/g 强调筛选类别和值必须适当、可预测、少术语、优先级明确。对本项目的启发：

- 直接使用照片已有 tags，比临时发明复杂分类更可靠。
- `Featured` 是可预测的首个特殊筛选。
- 不引入 `mood` 作为筛选，避免筛选项过多且语义重叠。

### Baymard：Applied Filters

参考：`https://baymard.com/blog/how-to-design-applied-filters`

Baymard 强调已应用筛选要集中展示，并提供清除路径。对本项目的启发：

- 继续沿用 `FilterBar` 的结果数量和 `Clear`。
- 筛选条放在图片内容之前，不藏在抽屉里。
- 清除筛选后必须恢复完整照片集合。

### Baymard：Promoted Filters

参考：`https://baymard.com/blog/promoting-product-filters`

Baymard 指出移动端上被提升的筛选可以减少用户进入隐藏筛选界面的成本。对本项目的启发：

- 当前不做移动端筛选抽屉。
- 直接展示横向可滚动的 promoted filters，更适合少量标签。
- 小屏允许筛选条内部横向滚动，但页面本身不能横向溢出。

### Carbon Tag Usage

参考：`https://carbondesignsystem.com/components/tag/usage/`

Carbon 将 tags 用于分类、过滤、选择和组织，并强调 selectable tag 的状态和键盘可达性。对本项目的启发：

- 继续使用 button + `aria-pressed` 表达可选择状态。
- 标签文案保持短词，不允许长句撑破 pill。
- `FilterBar` 的清除按钮和 disabled 状态保留明确语义。

## 产品判断

### 为什么不是 GlobalSearch

现在抽象 `GlobalSearch` 会过早：

- 内容数量还不足。
- Command Center 已经能覆盖真实入口。
- 搜索抽象会引入新的 API 边界，但短期没有明显用户收益。

因此先做照片筛选，等 `/knowledge` 和更多内容进入后再拆搜索。

### 为什么筛选影响灯箱

筛选不是只改变网格。用户点击 `Music` 后，心智上只想浏览音乐相关照片。

所以：

- 精选区域跟随筛选结果。
- 网格跟随筛选结果。
- 灯箱左右键只在当前筛选结果内循环。
- 切换筛选时关闭当前灯箱，避免 active photo 和结果集合不一致。

## 实现范围

- `/photos` 复用 `FilterBar`。
- 增加 `Featured` 特殊筛选。
- 使用照片 tags 生成筛选项。
- 筛选后更新精选区域和照片网格。
- 灯箱导航基于当前筛选结果。
- 移动端沿用 `FilterBar` 内部横向滚动。

## 验收结果

本地验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- Browser 验证：`/photos` 标题为 `Photos - Ray Studio`。
- Browser 验证：初始状态显示 `6 / 6 frames`，网格 6 张，精选 2 张。
- Browser 验证：点击 `Music` 后显示 `1 / 6 frames`，网格 1 张，精选 1 张。
- Browser 验证：`Music` 筛选结果为 `Listening corner`。
- Browser 验证：打开灯箱后标题为 `Listening corner`。
- Browser 验证：点击下一张仍停留在 `Listening corner`，说明灯箱在当前筛选结果内循环。
- Browser 验证：点击 `Clear` 后恢复 `6 / 6 frames`。
- Browser 验证：移动端 390 x 844 无页面级横向溢出。
- Browser 截图：桌面筛选和移动端首屏均已捕获。

## 暂不做

- 多选筛选。
- URL query 同步。
- 筛选动画。
- 按地点、年份、mood、camera 的多维 facets。
- 相册/专辑层级。

## 下一步建议

- 评估 `/knowledge` 内容模型和标签体系。
- 判断 `FilterBar` 是否要支持 `mode="single" | "multi"`。
- 继续观察 `GlobalSearch` 是否有真实必要从 Command Center 中抽象。
