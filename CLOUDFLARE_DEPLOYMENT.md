# Cloudflare Pages 部署配置

## 修复的问题

1.  **依赖问题修复**：
    *   添加了 `@babel/core` 到 devDependencies
    *   添加了 `react` 和 `react-dom` 到 dependencies（@giscus/react 需要）
    *   重新生成了 yarn.lock 文件

2.  **Cloudflare Pages 配置**：
    *   创建了 `public/_redirects` 文件用于SPA路由配置。
    *   创建了 `functions/_routes.json` 文件用于Functions路由配置。
    *   添加了 Node.js 版本要求到 package.json。
    *   创建了 `wrangler.toml` 文件以修复 Cloudflare Pages 的 "internal error"。

## Cloudflare Pages 部署设置

### 构建配置
在Cloudflare Pages控制台中设置：
- **框架预设**: 无（重要：不要选择Next.js）
- **构建命令**: `yarn build`
- **构建输出目录**: `dist`
- **根目录**: `/`（默认）

**重要提示**: 如果Cloudflare自动检测为Next.js框架，请手动将框架预设改为"无"或"静态站点"。

### 环境变量
在Cloudflare Pages设置中添加以下环境变量：
```
NODE_VERSION=18
YARN_VERSION=4.9.2
```

### 部署步骤
1.  将代码推送到 Git 仓库。
2.  在 Cloudflare Pages 控制台中创建新项目。
3.  连接你的 Git 仓库。
4.  设置构建配置（如上所述）。
5.  点击"保存并部署"。

## 文件说明

-   `wrangler.toml`: 修复 Cloudflare Pages 部署问题的配置文件。内容如下：
    ```toml
    name = "discord-decoration"
    compatibility_date = "2024-01-01"
    
    [build]
    command = "yarn build"
    cwd = "."
    
    [build.upload]
    format = "directory"
    dir = "dist"
    
    pages_build_output_dir = "dist"
    ```
-   `public/_redirects`: SPA路由重定向配置。
-   `functions/_routes.json`: Cloudflare Functions路由配置。
-   `package.json`: 更新了依赖和 engines 字段。
-   `yarn.lock`: 重新生成的锁定文件。

## 故障排除

### 如果遇到"internal error"：
1.  确保 `wrangler.toml` 文件存在且内容正确。
2.  检查 package.json 格式是否正确。
3.  确保所有依赖都已正确安装。
4.  在本地运行 `yarn build` 确保构建成功。

### 如果遇到"No Next.js version detected"错误：
1.  在Cloudflare Pages控制台中，将**框架预设**设置为"无"或"静态站点"。
2.  确保**构建命令**设置为 `yarn build`。
3.  确保**构建输出目录**设置为 `dist`。
4.  检查 `wrangler.toml` 文件是否正确配置了构建设置。
5.  如果问题持续，删除项目并重新创建，确保不选择Next.js框架。

### 如果路由不工作：
-   检查 `public/_redirects` 文件是否存在。
-   确保 `functions/_routes.json` 配置正确。

## 注意事项

-   Cloudflare Pages 会自动检测并使用正确的 Node.js 版本。
-   构建过程中的警告不会影响部署。
-   所有依赖问题已解决，应该能够成功部署。
-   如果仍有问题，可以联系 Cloudflare 支持：https://cfl.re/3WgEyrH