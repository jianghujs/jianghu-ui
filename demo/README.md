# Jianghu UI Dashboard Demo

这是一个纯前端的 Dashboard 示例项目，演示了如何在不使用构建工具的情况下，直接通过 CDN 和本地构建文件使用 `jianghu-ui`。

## 项目结构

```
dashboard-demo/
├── index.html          # 入口文件
├── css/
│   └── style.css       # 自定义样式
├── js/
│   ├── app.js          # Vue 应用入口及路由配置
│   ├── mock-data.js    # 模拟数据
│   └── views/          # 页面组件
│       ├── Dashboard.js    # 仪表盘页面
│       └── ProjectList.js  # 项目列表页面
```

## 如何运行

1. 确保根目录下的 `jianghu-ui` 已经构建（`dist/` 目录存在）。
   - 如果不存在，请在项目根目录运行 `npm run build`。

2. 使用 HTTP 服务器运行此目录。
   - 推荐使用 `http-server`:
     ```bash
     npx http-server ./examples/dashboard-demo
     ```
   - 或者在根目录运行：
     ```bash
     npx http-server .
     ```
     然后访问 `http://127.0.0.1:8080/examples/dashboard-demo/`

## 技术栈

- **Vue 2.7**: 核心框架
- **Vuetify 2.x**: UI 组件库基础
- **Jianghu UI**: 业务组件库
- **Vue Router**: 路由管理
- **ECharts**: 图表展示
- **No Build**: 纯 HTML/JS 实现，无需 Webpack/Vite 打包

## 功能演示

- **JhLayout**: 混合布局（Mix Layout），包含侧边栏和顶部导航。
- **JhStatisticCard**: 顶部指标卡片。
- **JhTable**: 高级数据表格，支持搜索、过滤、分页。
- **JhForm / JhDrawerForm**: 表单和抽屉表单的使用。
- **ECharts**: 集成图表展示。
