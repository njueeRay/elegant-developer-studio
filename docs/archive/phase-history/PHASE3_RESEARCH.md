# 第三阶段：媒体层调研与进入计划

日期：2026-06-12
阶段：媒体层准备

## 结论

第三阶段不应该做一个普通相册模板，也不应该把音乐模块做成完整音乐应用。对这个个人主页来说，照片和音乐的作用是让工作室有生活、记忆和审美线索，同时继续服务“设计型工程师”的主叙事。

## 第二阶段复盘结论

第二阶段已经完成内容核心，补充价值主要在内容质量，而不是继续扩功能。

不建议继续塞进第二阶段的内容：

- 全站搜索：应放到第四阶段。
- 反馈按钮：应放到第五阶段。
- 内容管理后台：应放到第五阶段。
- 复杂相关内容图谱：应等 `knowledge` 路由成型后再做。

可以保留为后续增强：

- 自动阅读时间。
- 文章相关链接。
- 项目案例研究的更完整模板。
- 文章封面系统。

## 外部调研参考

本轮调研重点不是照抄视觉，而是提炼个人媒体层的模式：

- Apple Human Interface Guidelines：媒体展示应有清晰层级、可理解控制、可访问交互和足够留白。
- Raycast：快捷入口的价值在于低阻力动作，不在于把界面做成命令行。
- Linear：系统状态和上下文动作应当克制，帮助用户保持节奏，而不是制造噪音。
- Josh W. Comeau 个人站：个人站的差异化来自内容、解释能力和精心设计的阅读体验，不来自套模板。
- 优秀个人摄影站：照片要有精选、分组和灯箱，不应该全部平铺。
- 开发者个人站：媒体模块应该补充人格和审美，不应压过写作与作品。
- Web 灯箱模式：灯箱必须支持键盘关闭、上一张/下一张和移动端安全布局。

参考链接：

- `https://developer.apple.com/design/human-interface-guidelines/accessibility`
- `https://developer.apple.com/design/Human-Interface-Guidelines/materials`
- `https://www.raycast.com/`
- `https://linear.app/docs/conceptual-model`
- `https://linear.app/now/how-we-redesigned-the-linear-ui`
- `https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/`
- `https://www.joshwcomeau.com/`

需要继续深挖的方向：

- `photos` 的信息密度：精选大图优先，还是瀑布流网格优先？
- `music` 的真实程度：先做 now-playing，还是直接接真实音频？
- 媒体与文章/project 的关联方式：按标签、时间线还是手动精选？

## 产品定位

照片层：

- 不是 Instagram。
- 不是摄影商业作品集。
- 是工作室视觉记忆：地点、过程、桌面、旅行、光线、现场观察。

音乐层：

- 不是播放器产品。
- 是工作室氛围层：最近在听、写作歌单、深度工作循环。
- 真实音频播放可以做，但不应该让控制复杂度抢过页面。

## 内容模型草案

### Photo

字段：

- `slug`
- `title`
- `date`
- `location`
- `camera`
- `image`
- `alt`
- `tags`
- `mood`
- `featured`
- `story`

### Album

字段：

- `slug`
- `title`
- `description`
- `cover`
- `dateRange`
- `photos`
- `tags`

### Track

字段：

- `slug`
- `title`
- `artist`
- `album`
- `duration`
- `cover`
- `audioSrc`
- `mood`
- `context`
- `tags`

### Mix

字段：

- `slug`
- `title`
- `description`
- `cover`
- `tracks`
- `duration`
- `context`

## 第三阶段首轮实现建议

优先级：

1. `/photos`：精选照片 + 网格 + 灯箱。
2. `/music`：当前歌单 + 曲目列表 + 迷你播放器。
3. 首页媒体卡接入真实 media metadata。

先不做：

- 上传后台。
- 大规模相册管理。
- 音频可视化。
- 第三方音乐账号集成。

## 组件设计原则

`PhotoGrid`：

- 支持精选图和普通图。
- 移动端使用稳定单列/双列，不追求复杂瀑布流。
- 图片必须有真实 `alt`。

`PhotoLightbox`：

- 支持关闭、上一张、下一张。
- 支持键盘 `Esc`、左右方向键。
- 背景应安静，不做花哨动效。

`MiniPlayer`：

- 控制少而稳：播放/暂停、上一首、下一首、进度、音量。
- 当前曲目信息清晰。
- 可以保留轻微程序员语义，例如曲目 ID、歌单上下文、状态。

## 验收标准

- 媒体层增强人格和审美，而不是制造噪音。
- `/photos` 移动端无横向溢出。
- 灯箱不遮挡关键控制。
- `/music` 控制真实可点击，状态可见。
- 首页媒体入口能从 mock 迁移到真实 media 数据。
- 新组件能进入长期组件库存。
