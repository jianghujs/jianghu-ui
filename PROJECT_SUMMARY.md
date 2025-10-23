# JianghuJS UI 项目总结

## 项目概述

JianghuJS UI 是一个基于 **Vue 2** 和 **Vuetify 2** 的现代化 UI 组件库，使用 **Storybook** 提供交互式文档和在线预览功能。项目采用 **CDN 引入方式**，无需复杂的构建配置，开箱即用。

## 技术方案

### 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 2.7.16 | 前端框架 |
| Vuetify | 2.x | UI 组件框架 |
| Storybook | 7.6.17 | 组件文档和开发工具 |
| Material Design Icons | 6.x | 图标库 |

### 架构特点

1. **CDN 引入方式**
   - 通过 CDN 引入 Vue、Vuetify 等依赖
   - 减少项目构建复杂度
   - 加快页面加载速度（利用浏览器缓存）

2. **Storybook 集成**
   - 提供可视化组件文档
   - 支持交互式示例和参数调整
   - 自动生成组件 API 文档

3. **组件化设计**
   - 每个组件独立开发和文档
   - 统一的设计规范和 API
   - 支持灵活的自定义和扩展

## 项目结构

```
jianghu-ui/
├── .storybook/                    # Storybook 配置
│   ├── main.js                    # 主配置文件
│   ├── preview.js                 # 预览配置
│   ├── preview-head.html          # CDN 资源引入
│   └── manager.js                 # 管理界面配置
│
├── src/
│   ├── components/                # UI 组件
│   │   ├── JhButton/              # 按钮组件
│   │   │   ├── JhButton.vue       # 组件实现
│   │   │   └── JhButton.stories.js # Storybook 故事
│   │   ├── JhCard/                # 卡片组件
│   │   ├── JhTable/               # 表格组件
│   │   └── JhForm/                # 表单组件
│   │
│   ├── utils/                     # 工具函数
│   │   └── vuetify.js             # Vuetify 实例创建
│   │
│   ├── Introduction.stories.mdx   # 快速开始文档
│   ├── Design.stories.mdx         # 设计规范文档
│   └── index.js                   # 组件库入口
│
├── examples/                      # 使用示例
│   ├── index.html                 # CDN 使用示例
│   └── README.md                  # 示例说明
│
├── public/                        # 静态资源
│
├── package.json                   # 项目配置
├── README.md                      # 项目说明
├── CONTRIBUTING.md                # 贡献指南
└── .gitignore                     # Git 忽略配置
```

## 已实现的组件

### 1. JhButton (按钮组件)

**功能特性：**
- 支持多种颜色：primary, secondary, success, error, warning, info
- 支持多种尺寸：x-small, small, default, large, x-large
- 支持多种样式：默认、边框、文本、圆角
- 支持状态：正常、禁用、加载中
- 支持图标：前置图标、后置图标
- 支持块级按钮

**Props:**
- `label`: 按钮文本
- `color`: 按钮颜色
- `size`: 按钮尺寸
- `disabled`: 禁用状态
- `loading`: 加载状态
- `outlined`: 边框样式
- `text`: 文本样式
- `block`: 块级按钮
- `rounded`: 圆角样式
- `prependIcon`: 前置图标
- `appendIcon`: 后置图标

**事件:**
- `click`: 点击事件

### 2. JhCard (卡片组件)

**功能特性：**
- 支持标题和副标题
- 支持自定义内容区域
- 支持操作按钮区域
- 支持多种样式：默认、边框、形状、悬停效果
- 支持阴影深度调整
- 支持背景色自定义

**Props:**
- `title`: 卡片标题
- `subtitle`: 卡片副标题
- `elevation`: 阴影深度 (0-24)
- `outlined`: 边框样式
- `shaped`: 形状样式
- `tile`: 方形样式
- `hover`: 悬停效果
- `color`: 背景颜色

**插槽:**
- `title`: 自定义标题
- `subtitle`: 自定义副标题
- `default`: 默认内容
- `actions`: 操作按钮区域

### 3. JhTable (数据表格组件)

**功能特性：**
- 支持数据展示和排序
- 支持搜索和过滤
- 支持分页
- 支持行选择（单选/多选）
- 支持自定义表头和单元格
- 支持加载状态
- 支持紧凑模式

**Props:**
- `headers`: 表头配置
- `items`: 数据项
- `loading`: 加载状态
- `search`: 搜索关键词
- `dense`: 紧凑模式
- `itemKey`: 行键名
- `showSelect`: 显示选择框
- `singleSelect`: 单选模式
- `itemsPerPage`: 每页条数

**事件:**
- `row-click`: 行点击事件

**插槽:**
- `header.{name}`: 自定义表头
- `item.{name}`: 自定义单元格
- `top`: 顶部工具栏
- `no-data`: 无数据提示

### 4. JhForm (表单组件)

**功能特性：**
- 支持多种输入类型：文本、邮箱、密码、文本域、选择框、日期、复选框、单选框
- 支持表单验证
- 支持动态字段配置
- 支持响应式布局（栅格系统）
- 支持紧凑和边框样式
- 支持自定义提交和重置按钮

**Props:**
- `fields`: 字段配置数组
- `initialData`: 初始数据
- `lazyValidation`: 延迟验证
- `fluid`: 流式布局
- `dense`: 紧凑模式
- `outlined`: 边框样式
- `showButtons`: 显示按钮
- `submitButtonText`: 提交按钮文本
- `resetButtonText`: 重置按钮文本

**事件:**
- `submit`: 表单提交
- `reset`: 表单重置

**字段配置示例:**
```javascript
{
  name: 'username',
  label: '用户名',
  type: 'text',
  placeholder: '请输入用户名',
  rules: [(v) => !!v || '用户名不能为空'],
  required: true,
  cols: 12,
  md: 6,
}
```

## Storybook 配置说明

### 主要配置文件

1. **main.js** - Storybook 主配置
   - 指定 stories 文件路径
   - 配置插件（essentials, links, docs）
   - 设置 Vue 框架
   - 启用自动文档生成

2. **preview.js** - 预览配置
   - 全局参数设置
   - 装饰器配置
   - 控件和操作配置

3. **preview-head.html** - 头部资源
   - Vuetify CSS CDN
   - Material Design Icons CDN
   - Roboto 字体
   - Vuetify JS CDN

4. **manager.js** - 管理界面配置
   - 自定义主题
   - 品牌信息

## 使用指南

### 开发环境

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动 Storybook**
   ```bash
   npm run storybook
   ```
   访问 http://localhost:6006

3. **构建文档站点**
   ```bash
   npm run build-storybook
   ```

4. **预览构建结果**
   ```bash
   npm run serve-storybook
   ```

### 生产环境

在 HTML 中引入 CDN 资源：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- CSS -->
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
</head>
<body>
  <div id="app">
    <v-app>
      <!-- 组件使用 -->
    </v-app>
  </div>

  <!-- JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.js"></script>

  <script>
    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
    });
  </script>
</body>
</html>
```

## 设计规范

### 颜色系统
- Primary: #1976D2
- Secondary: #424242
- Success: #4CAF50
- Error: #FF5252
- Warning: #FB8C00
- Info: #2196F3

### 间距系统
基于 8px 的间距系统：xs(4px), sm(8px), md(16px), lg(24px), xl(32px), xxl(48px)

### 响应式断点
- xs: 0px (手机竖屏)
- sm: 600px (手机横屏/平板竖屏)
- md: 960px (平板横屏/小屏电脑)
- lg: 1264px (桌面)
- xl: 1904px (大屏)

## 文档系统

### 文档类型

1. **介绍文档** (`Introduction.stories.mdx`)
   - 快速开始指南
   - 安装说明
   - 基本使用示例

2. **设计规范** (`Design.stories.mdx`)
   - 设计原则
   - 组件设计规范
   - 颜色和间距系统

3. **组件文档** (自动生成)
   - 组件 API
   - Props 说明
   - 事件列表
   - 交互式示例

## 下一步计划

### 短期目标
1. 添加更多基础组件（Dialog, Snackbar, Menu 等）
2. 完善组件测试
3. 优化性能和打包体积
4. 添加更多使用示例

### 长期目标
1. 支持 Vue 3
2. 支持主题自定义工具
3. 提供 NPM 包发布
4. 构建组件使用统计和反馈系统

## 贡献指南

欢迎贡献！请查看 `CONTRIBUTING.md` 了解详细的贡献指南。

### 提交规范
- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建或工具相关

## 许可证

MIT License

---

**项目创建时间**: 2025-01-19
**当前版本**: 1.0.0
**维护者**: JianghuJS Team
