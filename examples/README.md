# 使用示例

这个目录包含了 JianghuJS UI 的使用示例。

## index.html

完整的 CDN 使用示例，展示了如何在 HTML 页面中使用 JianghuJS UI 组件。

### 运行示例

1. 直接在浏览器中打开 `index.html` 文件
2. 或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8080

# 使用 Node.js (需要先安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8080
```

然后访问 http://localhost:8080/examples/index.html

## 示例内容

- 按钮组件的各种样式和状态
- 卡片组件的不同变体
- 数据表格的使用和搜索功能
- 表单组件的验证和提交

## 集成到你的项目

参考 `index.html` 中的代码，你可以轻松地将 JianghuJS UI 集成到你的项目中：

1. 在 HTML 中引入必要的 CDN 资源
2. 创建 Vue 实例并初始化 Vuetify
3. 使用 Vuetify 组件构建你的界面

更多详情请参考项目根目录的 README.md 文件。
