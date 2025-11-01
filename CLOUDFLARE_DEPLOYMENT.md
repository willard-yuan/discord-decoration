# Cloudflare Pages 部署配置

## 修复的问题

1. **依赖问题修复**：
   - 添加了 `@babel/core` 到 devDependencies
   - 添加了 `react` 和 `react-dom` 到 dependencies（@giscus/react 需要）
   - 重新生成了 yarn.lock 文件

2. **Cloudflare Pages 配置**：
   - 创建了 `public/_redirects` 文件用于SPA路由配置
   - 创建了 `functions/_routes.json` 文件用于Functions路由配置
   - 添加了 Node.js 版本要求到 package.json
   - 移除了可能导致错误的 wrangler.toml 文件

## Cloudflare Pages 部署设置

### 构建配置
在Cloudflare Pages控制台中设置：
- **框架预设**: 无（或选择Vite）
- **构建命令**: `yarn build`
- **构建输出目录**: `dist`
- **根目录**: `/`（默认）

### 环境变量
在Cloudflare Pages设置中添加以下环境变量：
```
NODE_VERSION=18
YARN_VERSION=4.9.2
```

### 部署步骤
1. 将代码推送到 Git 仓库
2. 在 Cloudflare Pages 控制台中创建新项目
3. 连接你的 Git 仓库
4. 设置构建配置（如上所述）
5. 点击"保存并部署"

## 文件说明

- `public/_redirects`: SPA路由重定向配置
- `functions/_routes.json`: Cloudflare Functions路由配置
- `package.json`: 更新了依赖和 engines 字段
- `yarn.lock`: 重新生成的锁定文件

## 故障排除

### 如果遇到"internal error"：
1. 确保没有 wrangler.toml 文件（已删除）
2. 检查 package.json 格式是否正确
3. 确保所有依赖都已正确安装
4. 在本地运行 `yarn build` 确保构建成功

### 如果路由不工作：
- 检查 `public/_redirects` 文件是否存在
- 确保 `functions/_routes.json` 配置正确

## 注意事项

- Cloudflare Pages 会自动检测并使用正确的 Node.js 版本
- 构建过程中的警告不会影响部署
- 所有依赖问题已解决，应该能够成功部署
- 如果仍有问题，可以联系 Cloudflare 支持：https://cfl.re/3WgEyrH