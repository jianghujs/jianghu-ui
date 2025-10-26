# 部署指南

本文档说明如何将 JianghuJS UI Storybook 部署到 GitHub Pages 进行在线预览。

## 📦 部署方式

### 方式一：自动部署（推荐）

使用 GitHub Actions 自动部署，每次推送到 `main` 分支时自动触发。

#### 配置步骤

1. **启用 GitHub Pages**
   - 进入 GitHub 仓库 → Settings → Pages
   - Source 选择 "GitHub Actions"

2. **推送代码**
   ```bash
   git add .
   git commit -m "feat: 添加 GitHub Pages 自动部署"
   git push origin main
   ```

3. **等待部署完成**
   - 进入 GitHub 仓库 → Actions 标签页
   - 查看 "Deploy Storybook to GitHub Pages" 工作流运行状态
   - 部署成功后，访问 `https://jianghujs.github.io/jianghu-ui/`

#### 手动触发部署

也可以在 Actions 页面手动触发部署：
- 进入 GitHub 仓库 → Actions → "Deploy Storybook to GitHub Pages"
- 点击 "Run workflow" 按钮

### 方式二：手动部署

使用命令行手动部署到 GitHub Pages。

#### 前置条件

安装依赖：
```bash
npm install
```

#### 部署命令

```bash
# 构建并部署
npm run deploy
```

该命令会：
1. 构建 Storybook 静态文件到 `storybook-static/` 目录
2. 使用 `gh-pages` 工具将文件推送到 `gh-pages` 分支
3. GitHub 会自动将 `gh-pages` 分支发布到 GitHub Pages

## 🔧 配置说明

### package.json 脚本

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "serve-storybook": "npx http-server storybook-static",
    "deploy": "npm run build-storybook && npx gh-pages -d storybook-static"
  }
}
```

### GitHub Actions 工作流

工作流文件位于 `.github/workflows/deploy-storybook.yml`

**触发条件：**
- 推送到 `main` 分支
- 手动触发

**部署流程：**
1. 检出代码
2. 设置 Node.js 环境
3. 安装依赖
4. 构建 Storybook
5. 上传构建产物
6. 部署到 GitHub Pages

## 🌐 访问地址

部署成功后，可以通过以下地址访问：

```
https://jianghujs.github.io/jianghu-ui/
```

## 📝 注意事项

### 1. 分支保护

如果仓库设置了分支保护规则，确保 GitHub Actions 有权限推送到 `gh-pages` 分支。

### 2. 自定义域名

如果需要使用自定义域名：
1. 在仓库根目录创建 `public/CNAME` 文件
2. 文件内容为你的域名，例如：`ui.jianghujs.org`
3. 在域名服务商处配置 DNS CNAME 记录

### 3. Base URL 配置

如果 Storybook 部署在子路径下（如 `/jianghu-ui/`），需要在 `.storybook/main.js` 中配置：

```javascript
module.exports = {
  // ...其他配置
  viteFinal: async (config) => {
    config.base = '/jianghu-ui/';
    return config;
  },
};
```

### 4. 构建失败排查

如果部署失败，检查：
- GitHub Actions 日志中的错误信息
- 本地构建是否成功：`npm run build-storybook`
- 依赖是否正确安装
- Node.js 版本是否兼容（建议使用 Node.js 18+）

## 🚀 本地预览构建结果

在部署前，可以本地预览构建结果：

```bash
# 构建
npm run build-storybook

# 预览
npm run serve-storybook

# 访问 http://localhost:8080
```

## 📚 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Storybook 部署文档](https://storybook.js.org/docs/sharing/publish-storybook)
- [gh-pages 工具](https://github.com/tschaub/gh-pages)

## 🔄 更新流程

每次修改组件或文档后：

1. 本地测试：`npm run storybook`
2. 提交代码：`git commit -m "feat: xxx"`
3. 推送到 GitHub：`git push origin main`
4. GitHub Actions 自动部署
5. 几分钟后访问在线地址查看更新

## ⚠️ 常见问题

### Q: 部署后页面显示 404

**A:** 检查以下几点：
- GitHub Pages 是否已启用
- 源分支是否设置正确（应该选择 "GitHub Actions"）
- 工作流是否运行成功

### Q: 样式丢失或资源加载失败

**A:** 可能是路径问题，检查：
- 是否配置了正确的 base URL
- 静态资源路径是否正确

### Q: 手动部署命令失败

**A:** 确保：
- 已安装 `gh-pages` 依赖：`npm install`
- 本地 git 配置正确
- 有权限推送到远程仓库

### Q: GitHub Actions 权限错误

**A:** 在仓库设置中：
- Settings → Actions → General
- Workflow permissions 选择 "Read and write permissions"
- 勾选 "Allow GitHub Actions to create and approve pull requests"
