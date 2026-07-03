# 第四阶段：键盘与搜索增强调研

日期：2026-06-13  
阶段：第四阶段交互层第二个切片

## 结论

Command Center 的第二个切片应围绕“键盘优先、结果可解释、重复使用更快”展开。当前不需要引入大型搜索库，也不需要做炫技动效；真正有价值的是让用户按下 `Cmd K` 后可以不离开键盘完成选择、打开和再次访问。

## 外部调研参考

- Raycast：强调快捷、可靠、keyboard first 和可扩展 launcher。可借鉴的是“统一入口 + 快速动作 + 最近/快捷路径”，不是照抄视觉。
- VS Code Command Palette：用一个交互窗口统一命令、文件、符号和常用快捷入口，证明命令面板不只是搜索框。
- WAI-ARIA Combobox Pattern：输入保持焦点，列表选项用 active descendant 表达当前选中；`Enter` 接受当前选项，`Escape` 关闭，方向键移动选择。
- Apple Human Interface Guidelines：键盘快捷键需要映射到清晰命令，且焦点、退出路径和可预测行为必须明确。

参考链接：

- `https://www.raycast.com/`
- `https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette`
- `https://www.w3.org/WAI/ARIA/apg/patterns/combobox/`
- `https://developer.apple.com/design/human-interface-guidelines/keyboards`

## 设计原则

- 键盘手感优先。鼠标 hover 只是补充，不应该成为主路径。
- 搜索结果必须解释自己为什么出现。分组和命中高亮比装饰更重要。
- 最近访问只存储 command id 和时间，不存储正文或隐私数据。
- localStorage 失败不能影响导航。
- 交互提示必须低调，只告诉用户必要按键：`↑`、`↓`、`Enter`、`Esc`。
- 移动端不强迫展示 meta，优先保证标题、描述和箭头不挤压。

## 本轮实现范围

实现：

- `ArrowDown` / `ArrowUp` 移动 active result。
- `Home` / `End` 移动到首尾结果。
- `Enter` 打开 active result。
- `aria-activedescendant` 连接输入框和 active option。
- 搜索结果按类型分组。
- 无查询时展示 `Recent`、`Quick actions`、`Writing`、`Projects`。
- 打开结果后记录最近访问。
- 标题和描述中的可见命中词高亮。
- 底部增加低调键盘提示。

暂不做：

- Fuse.js 或更复杂模糊搜索。
- 最近访问管理 UI。
- 命令历史。
- 多级 action panel。
- 权限、登录或服务端同步。

## 验收标准

- 在文章页按 `Cmd K` 能打开 Command Center。
- 初始第一条结果为 active。
- 按 `ArrowDown` 后 active result 改变。
- 输入 `music` 后结果按 `Music` 分组。
- 按 `Enter` 后跳转 `/music`。
- 再次打开 Command Center 后出现 `Recent` 分组。
- 输入 `studio` 后可见命中词高亮。
- 桌面 1280px 无横向溢出。
- 移动端 390 x 844 无横向溢出，Command Center 在视口内。

## 后续候选

1. 结果排序加入当前路由上下文，例如在文章页优先 writing，在音乐页优先 music。
2. 增加 `⌘↵` 打开新标签页。
3. 增加空状态建议，例如搜索 `knowledge` 时提示该路由还在 Phase 5。
4. 增加最近访问清理策略，例如 30 天过期。
5. 等内容量扩大后再引入更强的全文搜索。
