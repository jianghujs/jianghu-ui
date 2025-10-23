# 快速开始指南

## 5 分钟上手 JianghuJS UI

### 步骤 1: 安装依赖

```bash
npm install
```

预计耗时：1-2 分钟

### 步骤 2: 启动 Storybook

```bash
npm run storybook
```

预计耗时：10-20 秒

### 步骤 3: 访问文档

打开浏览器访问: http://localhost:6006

你将看到：
- 📚 完整的组件文档
- 🎨 交互式组件示例
- 🔧 实时调整组件参数
- 💻 可复制的代码示例

### 步骤 4: 查看示例页面

在浏览器中打开 `examples/index.html` 文件，查看完整的使用示例。

或使用本地服务器：

```bash
# 方式 1: 使用 npx http-server
npx http-server

# 方式 2: 使用 Python
python -m http.server 8080
```

然后访问: http://localhost:8080/examples/index.html

## 在你的项目中使用

### HTML 页面集成

创建一个新的 HTML 文件：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Vuetify CSS -->
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <!-- Material Design Icons -->
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  <!-- Roboto 字体 -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
</head>
<body>
  <div id="app">
    <v-app>
      <v-container>
        <h1>{{ message }}</h1>
        <v-btn color="primary" @click="handleClick">点击我</v-btn>
      </v-container>
    </v-app>
  </div>

  <!-- Vue 2 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7/dist/vue.js"></script>
  <!-- Vuetify -->
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.js"></script>

  <script>
    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
      data: {
        message: 'Hello JianghuJS UI!'
      },
      methods: {
        handleClick() {
          alert('按钮被点击了！');
        }
      }
    });
  </script>
</body>
</html>
```

### 常用组件示例

#### 按钮
```html
<v-btn color="primary">Primary Button</v-btn>
<v-btn color="success" outlined>Success Outlined</v-btn>
<v-btn color="error" text>Error Text</v-btn>
```

#### 卡片
```html
<v-card>
  <v-card-title>卡片标题</v-card-title>
  <v-card-text>卡片内容</v-card-text>
  <v-card-actions>
    <v-btn text>操作</v-btn>
  </v-card-actions>
</v-card>
```

#### 表格
```html
<v-data-table
  :headers="headers"
  :items="items"
  :items-per-page="5"
></v-data-table>
```

#### 表单
```html
<v-form>
  <v-text-field label="用户名" v-model="username"></v-text-field>
  <v-text-field label="密码" type="password" v-model="password"></v-text-field>
  <v-btn color="primary" @click="submit">提交</v-btn>
</v-form>
```

## 常见问题

### Q: Storybook 启动失败？
**A:** 尝试删除 `node_modules` 和重新安装：
```bash
rm -rf node_modules package-lock.json
npm install
npm run storybook
```

### Q: Vuetify 样式不生效？
**A:** 确保在 HTML 的 `<head>` 中正确引入了 Vuetify CSS 和字体资源。

### Q: 组件无法显示？
**A:** 检查是否创建了 Vuetify 实例并传递给 Vue：
```javascript
new Vue({
  el: '#app',
  vuetify: new Vuetify(), // 必须添加这一行
});
```

### Q: 如何自定义主题颜色？
**A:** 在创建 Vuetify 实例时配置主题：
```javascript
new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#your-color',
          secondary: '#your-color',
        },
      },
    },
  }),
});
```

## 下一步

- 📖 查看 [完整文档](./README.md)
- 🎨 学习 [设计规范](./src/Design.stories.mdx)
- 🤝 阅读 [贡献指南](./CONTRIBUTING.md)
- 💡 查看 [项目总结](./PROJECT_SUMMARY.md)

## 获取帮助

- 查看 Storybook 文档中的示例
- 参考 `examples/index.html` 的完整示例
- 查看组件的 `.stories.js` 文件获取更多用法
- 访问 [Vuetify 官方文档](https://v2.vuetifyjs.com/)

## 开始构建你的应用

现在你已经掌握了基础知识，可以开始构建你自己的应用了！祝你开发愉快！🎉
