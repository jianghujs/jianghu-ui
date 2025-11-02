# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

JianghuJS UI 是一个基于 Vue 2 + Vuetify 2 的现代化 UI 组件库，使用 Storybook 提供交互式文档和在线预览。项目采用 CDN 引入方式，无需复杂配置即可开箱即用。

## 常用命令

### 开发与预览

```bash
# 启动 Storybook 开发服务器（端口 6006）
npm run storybook

# 构建 Storybook 静态站点
npm run build-storybook

# 本地预览构建后的静态站点
npm run serve-storybook

# 部署到 GitHub Pages
npm run deploy
```

### 注意事项

- 项目没有测试、构建或 lint 命令
- 主要通过 Storybook 进行开发和预览
- 推送到 main 分支会自动触发 GitHub Actions 部署到 GitHub Pages

## 核心架构

### 技术栈

- **Vue 2.7** - 核心框架
- **Vuetify 2.x** - Material Design 组件库
- **Storybook 7.x** - 组件开发和文档工具
- **Tailwind CSS 3.x** - 工具类 CSS 框架
- **Webpack 5** - 通过 Storybook Vue Webpack5 集成

### 样式系统设计

项目采用多层样式系统，按以下顺序加载：

1. **Vuetify 基础样式** (`vuetify/dist/vuetify.min.css`)
2. **Material Design Icons** (`@mdi/font`)
3. **全局 Vuetify 覆写** (`globalCSSVuetifyV4.css`) - 覆盖 Vuetify 默认样式
4. **JianghuJS 样式规范** (`globalCSSJHV4.css`) - 项目特定样式（如 `.jh-v-input`, `.jh-input-label`）
5. **Tailwind CSS** (`tailwind.css`) - 工具类样式
6. **Storybook 特定样式** (`storybook.css`)

**重要**：Tailwind 配置设置了 `important: true` 以提高优先级，但 `preflight: true` 保持启用。新增样式时需注意与 Vuetify 的兼容性。

### 组件结构

所有组件遵循统一的目录结构：

```
src/components/
├── Jh[ComponentName]/
│   ├── Jh[ComponentName].vue       # 组件实现
│   └── Jh[ComponentName].stories.js # Storybook 故事
```

### 组件分类

**基础组件**：
- `JhMenu` - 菜单导航
- `JhScene` - 场景容器
- `JhDateRangePicker` - 日期范围选择器
- `JhQueryFilter` - 查询筛选器
- `JhTable` - 高级数据表格（带筛选、工具栏、分页等）

**布局组件**：
- `JhPageContainer` - 页面容器

**反馈组件**：
- `JhMask` - 遮罩层
- `JhToast` - 消息提示
- `JhConfirmDialog` - 确认对话框

**高级表单组件**：
- `JhForm` - 表单容器（支持水平/垂直布局、字段分组、动态显示隐藏等）
- `JhModalForm` - 模态框表单
- `JhDrawerForm` - 抽屉表单
- `JhStepsForm` - 分步表单

### Storybook 配置

- **主配置** (`.storybook/main.js`)：
  - 集成 PostCSS 以支持 Tailwind CSS
  - 自动发现 `src/**/*.stories.@(js|jsx|ts|tsx|mdx)` 文件
  - 启用自动文档生成（`autodocs: 'tag'`）

- **预览配置** (`.storybook/preview.js`)：
  - 全局装饰器包裹所有组件在 `<v-app>` 中
  - 统一创建 Vuetify 实例并配置主题色
  - 预览布局设置为 `fullscreen`

### 组件注册系统

组件通过 `src/index.js` 统一导出，支持两种使用方式：

1. **Vue 插件方式**：`Vue.use(JianghuUI)`
2. **按需导入**：`import { JhForm, JhTable } from '@jianghujs/jianghu-ui'`

浏览器环境下会自动安装到 `window.Vue`。

## 开发规范

### 添加新组件

1. 在 `src/components/` 创建组件目录（如 `JhNewComponent/`）
2. 创建 `.vue` 文件实现组件逻辑
3. 创建 `.stories.js` 文件编写 Storybook 示例
4. 在 `src/index.js` 中导入并导出组件
5. 确保组件包裹在 `<v-app>` 或继承 Vuetify 上下文

### Storybook Stories 规范

```javascript
export default {
  title: '基础组件/JhComponentName', // 分类路径
  component: JhComponentName,
  tags: ['autodocs'], // 启用自动文档
};

export const Default = {
  args: {
    // 默认 props
  },
};
```

### 样式开发建议

- 优先使用 Vuetify 内置组件和 props
- 使用 Tailwind 工具类处理布局和间距（如 `flex`, `gap-2`, `px-3`）
- 项目特定样式使用 `.jh-` 前缀类名（如 `.jh-v-input`）
- 避免直接修改 Vuetify 组件样式，优先通过 `globalCSSVuetifyV4.css` 全局覆写

### 响应式设计

- 组件支持 Vuetify 网格系统（cols, sm, md, lg, xl）
- 使用 `$vuetify.breakpoint` 判断屏幕尺寸
- 移动端优先考虑触摸交互和简化布局

## 部署流程

### 自动部署

- 推送到 `main` 分支触发 GitHub Actions
- 自动执行 `npm install` → `npm run build-storybook`
- 部署到 GitHub Pages：https://jianghujs.github.io/jianghu-ui/

### 手动部署

```bash
npm run deploy
```

该命令会构建 Storybook 并使用 gh-pages 工具推送到 gh-pages 分支。

## 特殊注意事项

### JhForm 组件核心特性

- 支持 `layout` 属性：`horizontal`（水平）、`vertical`（垂直）、`inline`（行内）
- 支持字段分组（`type: 'group'`）
- 支持动态显示隐藏字段（`visible` 函数）
- 支持只读模式（`readonly` 属性）
- 内置多种字段类型：text, textarea, number, select, date, switch, checkbox, radio 等

### JhTable 组件核心特性

- 集成 `JhQueryFilter` 高级筛选
- 工具栏功能：搜索、刷新、密度切换、列设置
- 支持行选择、排序、分页
- 高度可定制的插槽系统（toolbar-actions, filter-buttons, 列插槽等）

### PostCSS & Tailwind 集成

- Tailwind 通过 PostCSS 在 Storybook 的 Webpack 配置中集成
- `.storybook/main.js` 的 `webpackFinal` 钩子动态注入 postcss-loader
- 确保在 CSS 规则链中位于 css-loader 之后

### CDN 使用场景

虽然项目本身使用 npm 管理依赖，但组件设计考虑了 CDN 使用场景：
- 组件可独立在浏览器环境通过 script 标签引入
- 依赖 Vue 2 和 Vuetify 2 的 CDN 版本
- 适合快速原型开发和简单页面集成
