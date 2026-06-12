# 设计 QA

最终结果：通过。

## 参考

- 已采纳概念图：`public/references/developer-atelier-reference.png`
- 桌面实现截图：`output/playwright/home-desktop-final.png`
- 命令面板截图：`output/playwright/home-command-final.png`
- 移动端实现截图：`output/playwright/home-mobile-final.png`

## 方法

- 本地 URL：`http://localhost:3000`
- 浏览器验证方式：由于当前工具集未暴露 in-app Browser 导航/截图工具，使用 Playwright Chromium 作为 fallback。
- 检查视口：
  - 桌面：1440 x 1024
  - 移动端：390 x 844

## 检查项

1. 首屏结构：通过。
   - Hero、状态、命令入口、社交链接和工作台都可见，且不过载。

2. 信息架构：通过。
   - `Notes` 已替换为 `Knowledge`，覆盖导航、命令搜索文案、首页 section、文档和路由命名。

3. 视觉一致性：通过，有一个有意偏差。
   - 保留参考方向：serif 工作室身份、温暖背景、开发者工作台、克制 rust/blue accent、中低信息密度。
   - 有意偏差：实现中使用 `Knowledge`，不使用参考图里的 `Notes`。

4. 布局 QA：通过。
   - 桌面横向溢出：`scrollWidth 1440`，`clientWidth 1440`。
   - 移动端横向溢出：`scrollWidth 390`，`clientWidth 390`。
   - 已修复：桌面 H1 因 stale `.next` CSS 导致换行；清理 `.next` 并重启后确认 `white-space: nowrap`。
   - 已修复：浮动播放器与 featured 内容重叠；移除浮动播放器，保留 media card playback state。

5. 交互 QA：通过。
   - 主题切换能将 document theme 改为 `dark`。
   - 媒体卡片按钮能从 `Play` 变为 `Pause`。
   - `Meta+K` 能打开命令面板。

## 剩余 P3 备注

- 社交 URL 仍是占位。
- 媒体播放仍是 UI 状态，不是真实音频。
- 第三阶段已经建立照片和音乐内容模型。

## 第三阶段首个切片 QA

结果：通过。

方法：

- 本地 URL：`http://127.0.0.1:3000`
- 浏览器验证方式：使用 in-app Browser。
- 检查视口：
  - 桌面：默认 1280 x 720。
  - 移动端：390 x 844。

检查项：

1. `/photos`：通过。
   - 页面标题、内容和照片网格可见。
   - 6 张照片进入网格。
   - 灯箱可打开、切换、关闭。

2. `/music`：通过。
   - 页面标题、播放器和曲目列表可见。
   - 播放按钮能切换为暂停。
   - 下一首能切换到 `Quiet refactor`。
   - 进度条和音量控件存在。

3. 博客互动：通过。
   - reader mode 提示可见。
   - 关闭后折叠为小按钮。
   - 代码块显示行数并保留复制反馈。

4. 移动端布局：通过。
   - `/photos`：`scrollWidth 390`，`clientWidth 390`。
   - `/music`：`scrollWidth 390`，`clientWidth 390`。

## 第四阶段首个切片 QA

结果：通过。

方法：

- 本地 URL：`http://127.0.0.1:3000`
- 浏览器验证方式：使用 in-app Browser。
- 检查视口：
  - 桌面：默认 1280 x 720。
  - 移动端：390 x 844。

检查项：

1. 全站快捷键：通过。
   - 在文章详情页按 `Cmd K` 打开 `Global command center`。

2. 搜索：通过。
   - 输入 `music` 返回 `Play studio mix`。

3. 导航：通过。
   - 点击 `/music` 结果后进入音乐页。

4. 首页入口：通过。
   - 首页 `Search or open...` 按钮打开同一个全站菜单。

5. 浮层层级：通过。
   - Command Center z-index 高于 reader mode。

6. 移动端布局：通过。
   - 首页 390px：`scrollWidth 390`，`clientWidth 390`。

## 第四阶段键盘与搜索增强 QA

结果：通过。

方法：

- 本地 URL：`http://127.0.0.1:3000`
- 浏览器验证方式：使用 in-app Browser。
- 检查视口：
  - 桌面：1280 x 720。
  - 移动端：390 x 844。

检查项：

1. 页面身份和基础健康：通过。
   - `/blog/interface-is-a-promise` 标题为 `The Interface is a Promise - Ray Studio`。
   - 页面包含文章正文。
   - 无相关 runtime error。

2. 键盘打开：通过。
   - 在文章页按 `Cmd K` 打开 `Global command center`。

3. 键盘选择：通过。
   - 初始 active result 为 `Open studio home`。
   - 按 `ArrowDown` 后 active result 变为 `Browse writing`。

4. 搜索分组：通过。
   - 输入 `music` 后出现 `Music` 分组。
   - 结果包含 `Play studio mix`。

5. 命中高亮：通过。
   - 输入 `studio` 后可见命中词出现高亮。

6. Enter 打开：通过。
   - 搜索 `music` 后按 `Enter` 跳转 `/music`。

7. 最近访问：通过。
   - 再次打开 Command Center 后出现 `Recent` 分组。
   - `Recent` 中包含 `Play studio mix`。

8. 桌面布局：通过。
   - 1280px：`scrollWidth 1280`，`clientWidth 1280`。

9. 移动端布局：通过。
   - 390px：`scrollWidth 390`，`clientWidth 390`。
   - Command Center 底部仍在 844px 视口内。

## 第四阶段上下文搜索 QA

结果：通过。

方法：

- 本地 URL：`http://127.0.0.1:3000`
- 浏览器验证方式：使用 in-app Browser。
- 检查视口：
  - 桌面：1280 x 720。
  - 移动端：390 x 844。

检查项：

1. 文章页上下文：通过。
   - `/blog/interface-is-a-promise` 按 `Cmd K` 后出现 `Writing context`。
   - 1280px：`scrollWidth 1280`，`clientWidth 1280`。

2. 规划页面提示：通过。
   - 搜索 `knowledge` 时显示真实项目 `Studio Knowledge Base`。
   - 同时显示 `Knowledge is planned`，说明公开知识库属于 Phase 5。

3. 无结果恢复：通过。
   - 搜索 `uses` 后显示 `Uses is planned`。
   - 建议词包含 `projects`、`writing`、`photos`、`music`。
   - 无 option 时结果容器不再声明 `role="listbox"`。

4. 建议词恢复：通过。
   - 点击 `writing` 后查询变为 `writing`。
   - 结果区恢复为 listbox，并展示可打开结果。

5. 移动端上下文：通过。
   - `/music` 390 x 844：默认显示 `Music context`。
   - `scrollWidth 390`，`clientWidth 390`。
   - Command Center 底部在 844px 视口内。
