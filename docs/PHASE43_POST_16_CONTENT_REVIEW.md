# Phase 43：第 16 篇文章内容准入门

日期：2026-07-10

## 结论

现有 15 篇文章已经构成一个可读的写作系统：四条长期写作线、Blog filters、Command Center 延迟索引、首页 editorial slots、Knowledge trails 与 release evidence 都已接入。此时继续以“又一篇站内建设复盘”的方式扩充，只会让归档看起来更勤奋，而不会更有价值。

因此，Phase 43 不新增第 16 篇文章。它把新增内容的判断变成一个可执行门禁。

## 准入规则

第 16 篇及之后的文章必须在 `src/data/content-admission.ts` 的 `postAdmissions` 登记，并且只能选择以下一种可验证基础：

1. `External object`：文章分析可公开访问的外部产品、仓库、页面或行为证据。
2. `Project evidence`：文章引入或深化本站项目页中可点击的证据、变更记录或发布事实。
3. `Knowledge rule`：文章沉淀一个能在公开 Knowledge 中被复用、反链和引用的长期规则。

每条准入记录必须提供 `evidenceHref` 与简短 `reason`。选择项目证据时，文章必须有项目关联；选择 Knowledge 规则时，文章必须有 Knowledge 关联。校验脚本拒绝未登记的新文章、无效基础、空理由、空证据链接与失效关联。

## 本轮复核

| 表面 | 结论 | 证据 |
|---|---|---|
| 首页 | 通过 | Featured、Selected work、Media、Editorially recent 都由 `home-editorial.ts` 的明确策略决定，不取最新内容填充。 |
| Blog filters | 通过 | 内容规模面板显示 15 篇文章、写作线与证据快捷入口；下一篇会触发准入门。 |
| Command Center | 通过 | 120 条对象采用 `/command-index.json` 按需加载，首屏不携带完整索引。 |
| Knowledge trails | 通过 | 17 条 Knowledge 具有关联路径、反链与局部薄图层，不需要用新增文章补数量。 |
| Release evidence | 通过 | 发布证据、公开路由与内容关系校验继续作为上线前事实源。 |

## 操作顺序

1. 先写出候选文章的外部对象、项目证据或 Knowledge 规则。
2. 在 `postAdmissions` 加入准入记录，并把公开证据链接写到文章关联字段。
3. 运行 `npm run validate:content`、`npm run report:command-index`、`npm run release:evidence` 与对应浏览器测试。
4. 复核首页 editorial 策略，而不是自动把新文章放进 Featured 或 Editorially recent。
5. 只有所有公开路由、release evidence 与移动端测试通过后，才部署。

## 不做

- 不把普通开发日志包装成文章来满足数量。
- 不因为文章更新就替换首页最强证据。
- 不在 Command Center 超过当前观察线前继续无约束增长索引对象。
