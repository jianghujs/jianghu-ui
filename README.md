# JianghuJS UI

> 基于 Vue 2 + Vuetify 2 的现代化 UI 组件库，使用 Storybook 提供交互式文档和在线预览

## 特性

- 🚀 **开箱即用** - 通过 CDN 引入，无需复杂配置
- 🎨 **Material Design** - 基于 Vuetify 2，遵循 Material Design 规范
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 🔧 **高度可定制** - 丰富的 props 和插槽支持
- 📖 **完善的文档** - Storybook 交互式文档
- ⚡ **性能优化** - CDN 加速，按需加载

## 在线预览

### 在线文档

访问在线 Storybook 文档：**https://jianghujs.github.io/jianghu-ui/**

### 本地预览

启动 Storybook 查看组件文档和示例：

```bash
npm run storybook
```

访问 http://localhost:6006 查看完整文档

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run storybook
```

### 3. 构建文档站点

```bash
npm run build-storybook
```

构建完成后，可以使用以下命令预览静态站点：

```bash
npm run serve-storybook
```

## CDN 使用方式

在你的 HTML 文件中引入必要的资源：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>JianghuJS UI Demo</title>

  <!-- Vuetify CSS -->
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <!-- Material Design Icons -->
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  <!-- Roboto 字体 -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <!-- JianghuJS UI 核心样式（锁定具体版本号，如 1.0.0） -->
  <link href="https://jianghujs.github.io/jianghu-ui/cdn/<版本号>/jianghu-ui.css" rel="stylesheet">
</head>
<body>
  <div id="app">
    <v-app>
      <v-container>
        <jh-button label="点击我" color="primary" @click="handleClick" />
      </v-container>
    </v-app>
  </div>

  <!-- Vue 2 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7/dist/vue.js"></script>
  <!-- Vuetify -->
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.js"></script>
  <!-- JianghuJS UI 运行时代码 -->
  <script src="https://jianghujs.github.io/jianghu-ui/cdn/<版本号>/jianghu-ui.js"></script>

  <script>
    Vue.component('jh-button', {
      // 引入你的组件定义
    });

    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
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

> ✅ CDN 产物会被发布到 `https://jianghujs.github.io/jianghu-ui/cdn/<版本号>/` 目录中，示例：`cdn/1.0.0/jianghu-ui.js`。生产环境务必固定具体版本，若仅需查看最新构建可临时使用 `cdn/latest/`。

## 组件列表

### 基础组件

#### JhButton - 按钮组件
支持多种样式、尺寸和状态的按钮组件。

```vue
<jh-button
  label="点击我"
  color="primary"
  size="large"
  @click="handleClick"
/>
```

#### JhCard - 卡片组件
用于展示内容块的卡片容器组件。

```vue
<jh-card title="卡片标题" subtitle="副标题">
  卡片内容
  <template v-slot:actions>
    <jh-button label="操作" />
  </template>
</jh-card>
```

### 数据展示

#### JhTable - 数据表格
功能丰富的数据表格组件，支持排序、搜索、分页等。

```vue
<jh-table
  :headers="headers"
  :items="items"
  :loading="loading"
  @row-click="handleRowClick"
/>
```

### 表单组件

#### JhForm - 表单组件
强大的表单组件，支持多种输入类型和验证。

```vue
<jh-form
  :fields="formFields"
  @submit="handleSubmit"
/>
```

## 项目结构

```
jianghu-ui/
├── .storybook/              # Storybook 配置
│   ├── main.js              # 主配置文件
│   ├── preview.js           # 预览配置
│   ├── preview-head.html    # CDN 资源引入
│   └── manager.js           # 管理界面配置
├── src/
│   ├── components/          # UI 组件
│   │   ├── JhButton/        # 按钮组件
│   │   │   ├── JhButton.vue
│   │   │   └── JhButton.stories.js
│   │   ├── JhCard/          # 卡片组件
│   │   ├── JhTable/         # 表格组件
│   │   └── JhForm/          # 表单组件
│   ├── utils/               # 工具函数
│   │   └── vuetify.js       # Vuetify 实例创建
│   ├── Introduction.stories.mdx   # 介绍文档
│   ├── Design.stories.mdx         # 设计规范
│   └── index.js             # 入口文件
├── package.json
└── README.md
```

## 部署

### 自动部署

推送到 `main` 分支时，GitHub Actions 会自动构建并部署 Storybook 到 GitHub Pages。

```bash
git push origin main
```

### 手动部署

```bash
npm run deploy
```

查看详细部署文档：[DEPLOY.md](./DEPLOY.md)

## 开发指南

### 添加新组件

1. 在 `src/components/` 下创建组件目录
2. 创建 `.vue` 组件文件
3. 创建 `.stories.js` 故事文件
4. 在 `src/index.js` 中导出组件

示例：

```javascript
// src/components/JhNewComponent/JhNewComponent.vue
<template>
  <v-app>
    <!-- 组件实现 -->
  </v-app>
</template>

<script>
export default {
  name: 'JhNewComponent',
  props: {
    // props 定义
  }
}
</script>
```

```javascript
// src/components/JhNewComponent/JhNewComponent.stories.js
import JhNewComponent from './JhNewComponent.vue';

export default {
  title: '基础组件/JhNewComponent',
  component: JhNewComponent,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    // 默认 props
  },
};
```

### 编写文档

使用 MDX 格式编写文档页面：

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="介绍/新页面" />

# 页面标题

页面内容...
```

## 技术栈

- **Vue 2.7** - 渐进式 JavaScript 框架
- **Vuetify 2.x** - Material Design 组件框架
- **Storybook 7.x** - UI 组件开发和文档工具
- **CDN** - 通过 CDN 引入依赖，简化部署

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建新分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -am 'Add some feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 许可证

MIT License

## 相关链接

- [Vue 2 官方文档](https://v2.vuejs.org/)
- [Vuetify 2 官方文档](https://v2.vuetifyjs.com/)
- [Storybook 官方文档](https://storybook.js.org/)
- [Material Design Icons](https://materialdesignicons.com/)

## AI 代码助手支持

本项目为 AI 代码助手（如 Cursor、GitHub Copilot）提供了专门的知识库文档：

### 📚 AI 知识库文件

| 文件 | 说明 | 使用场景 |
|------|------|----------|
| [AI_KNOWLEDGE_BASE.md](./AI_KNOWLEDGE_BASE.md) | 完整的组件库知识库 | 详细了解组件 API 和使用方法 |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | 快速参考手册 | 快速查找组件用法和代码模板 |
| [AI_USAGE_GUIDE.md](./AI_USAGE_GUIDE.md) | AI 工具使用指南 | 了解如何在 AI 工具中使用知识库 |

### 🚀 快速开始使用

#### 在 Cursor 中使用

1. 打开项目根目录，Cursor 会自动读取 `.cursorrules` 文件
2. 在对话中直接引用知识库文件：
   ```
   @AI_KNOWLEDGE_BASE.md 如何使用 JhTable 实现服务端分页？
   ```

#### 在 GitHub Copilot 中使用

1. 打开 `AI_KNOWLEDGE_BASE.md` 或 `QUICK_REFERENCE.md` 文件
2. 开始编写代码，Copilot 会根据知识库提供更准确的建议

详细使用方法请查看 [AI_USAGE_GUIDE.md](./AI_USAGE_GUIDE.md)

---

## 常见问题

### Vuetify 样式不生效？

确保在 HTML 的 `<head>` 中正确引入了 Vuetify CSS 和字体资源。

### 组件无法显示？

检查是否正确创建了 Vuetify 实例并传递给 Vue：

```javascript
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  // ...
});
```

### Storybook 启动失败？

尝试删除 `node_modules` 和 `package-lock.json`，重新安装依赖：

```bash
rm -rf node_modules package-lock.json
npm install
npm run storybook
```

## 更新日志

### v1.0.0 (2025-01-19)

- 初始版本发布
- 基础组件：JhButton, JhCard
- 数据展示：JhTable
- 表单组件：JhForm
- Storybook 文档和示例
