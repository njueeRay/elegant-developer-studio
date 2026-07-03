# RayNode 运维手册

更新时间：2026-07-04

## 1. 事实边界

- 主站：`https://raynode.me`
- 预览/备用：`https://elegant-developer-studio.vercel.app`
- 服务器：`ray@47.81.38.236`
- 源码目录：`/srv/apps/elegant-developer-studio`
- 运行目录：`/srv/apps/elegant-developer-studio-runtime`
- 上一版运行目录：`/srv/apps/elegant-developer-studio-runtime.prev`
- systemd service：`elegant-developer-studio`
- Next runtime：`127.0.0.1:3001`
- Caddy：TLS 和反向代理；`/feishu/oauth/*` 保留给本机 `18888`。

## 2. 日常健康检查

轻量检查：

```bash
npm run raynode:health
```

完整公开路由检查：

```bash
npm run raynode:health:full
```

生产 Playwright smoke：

```bash
npm run raynode:smoke
```

检查内容：

- `/health.json` 返回 `status: ok`。
- `/release-evidence.json` 返回当前部署事实。
- `/command-index.json` 返回懒加载命令索引。
- 首页、博客、文章、项目、Knowledge、Uses、Lab、RSS、sitemap、robots 可访问。
- `release-evidence.routesCount` 与 `publicRoutes.length` 一致。

## 3. 部署流程

常规部署：

```bash
npm run deploy:raynode
```

部署脚本会执行：

- `npm run validate:content`
- `npm run lint`
- `npm run build`
- `npm run release:evidence -- --local-quality-passed`
- `npm run validate:release-evidence`
- 打包 Next.js standalone runtime
- 上传 artifact
- 远端 `git merge --ff-only origin/main`
- 切换 runtime 目录
- 重启 systemd
- 检查本机 runtime、主站、release evidence、关键项目页

部署后必须执行：

```bash
npm run raynode:health
npm run raynode:smoke
```

## 4. 回滚流程

只有在新 runtime 已经切换、服务异常且无法快速修复时才回滚。

```bash
ssh ray@47.81.38.236
sudo systemctl stop elegant-developer-studio
rm -rf /srv/apps/elegant-developer-studio-runtime.failed
mv /srv/apps/elegant-developer-studio-runtime /srv/apps/elegant-developer-studio-runtime.failed
mv /srv/apps/elegant-developer-studio-runtime.prev /srv/apps/elegant-developer-studio-runtime
sudo systemctl start elegant-developer-studio
systemctl is-active elegant-developer-studio
curl -fsSI http://127.0.0.1:3001
curl -fsSI https://raynode.me
```

回滚后立刻在本地执行：

```bash
npm run raynode:health
```

## 5. 故障定位

DNS / TLS：

```bash
curl -I https://raynode.me
```

Caddy：

```bash
ssh ray@47.81.38.236 'systemctl is-active caddy && sudo caddy validate --config /etc/caddy/Caddyfile'
```

Next runtime：

```bash
ssh ray@47.81.38.236 'systemctl is-active elegant-developer-studio && curl -fsSI http://127.0.0.1:3001'
```

release evidence：

```bash
curl -fsSL https://raynode.me/release-evidence.json
```

服务器资源：

```bash
ssh ray@47.81.38.236 'df -h && free -h && uptime'
```

## 6. 配置模板

- systemd 模板：[raynode-systemd.service](./raynode-systemd.service)
- Caddy 模板：[Caddyfile.raynode.example](./Caddyfile.raynode.example)

这些文件是仓库内模板，不会自动覆盖服务器配置。修改真实服务器配置前，先复制当前远端文件做时间戳备份。
