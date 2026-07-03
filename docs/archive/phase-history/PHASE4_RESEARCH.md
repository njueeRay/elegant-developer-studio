# 第四阶段：交互层调研与首个实现计划

日期：2026-06-12
阶段：交互层准备

## 结论

第四阶段第一优先级应该是全站 Command Center，而不是继续增加页面装饰。理由很简单：它能立刻降低导航成本，符合程序员风格，并且不会污染写作、照片和音乐的内容体验。

## 外部调研参考

- Raycast：核心价值是 keyboard first、快速、可靠、可扩展。值得参考的是“命令入口统一动作和搜索”，而不是照抄视觉。
- VS Code Command Palette：证明命令、文件、动作可以通过一个稳定入口统一访问。
- Apple HIG Keyboard：键盘交互必须有清晰焦点、可预测快捷键和可退出路径。

参考链接：

- `https://www.raycast.com/`
- `https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette`
- `https://developer.apple.com/design/human-interface-guidelines/keyboard`

## 产品原则

- 命令菜单不是装饰，是导航和动作层。
- 搜索结果必须包含真实内容：文章、项目、照片、音乐、联系入口。
- `Cmd K` 必须全站可用。
- 结果必须能直接跳转，不做只能看的假搜索。
- 视觉要像工作室工具，不像 SaaS dashboard，也不像假终端。

## 首个实现切片

实现：

- `GlobalCommandMenu`
- 全站 `Cmd K`
- 首页命令按钮触发全站菜单
- 搜索写作、项目、照片、音乐和快捷动作
- 结果点击直接导航
- 移动端无横向溢出

暂不做：

- 模糊搜索算法。
- 命令历史。
- 最近打开。
- 键盘上下选择结果。
- 搜索高亮。

## 验收标准

- 任意页面按 `Cmd K` 都能打开。
- 输入 `music` 能找到 studio mix。
- 点击结果能跳转到 `/music`。
- 首页命令按钮打开同一个全站菜单，而不是局部菜单。
- Command Center 不被 reader mode、灯箱、播放器等浮层压住。
- 移动端不横向溢出。
