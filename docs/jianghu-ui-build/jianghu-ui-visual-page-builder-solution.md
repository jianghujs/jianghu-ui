# Jianghu-UI 可视化拖拽页面构建器方案

## 一、项目概述

### 1.1 目标
构建一个基于 Vue.js 的可视化拖拽页面构建器，允许用户通过拖拽 jianghu-ui 组件和 Vuetify 2 组件来快速创建页面。

### 1.2 核心价值
- **降低开发门槛**：非技术人员也能快速搭建页面
- **提升开发效率**：减少重复性的页面布局工作
- **标准化输出**：确保生成的代码符合 jianghu-ui 规范
- **灵活扩展**：支持自定义组件和第三方组件库集成

### 1.3 参考开源方案

| 方案 | 技术栈 | 优势 | 适用场景 |
|------|--------|------|----------|
| **Craft.js** | React | 高度可扩展、组件驱动、序列化状态 | 构建自定义编辑器框架 |
| **Vuegg** | Vue 2 | Vue 生态、Material Design、代码导出 | Vue 项目快速原型 |
| **GrapesJS** | 原生 JS | 成熟稳定、插件丰富、框架无关 | 通用页面构建 |
| **Vue Designer** | Vue 3 | 专业级、Vuetify 支持、实时预览 | 商业项目（付费） |
| **vue-drag-and-drop-page-builder** | Vue 3 + Vite | 现代化、Tailwind CSS、简洁设计 | 轻量级页面构建 |

---

## 二、技术架构设计

### 2.1 架构选型：Editor -> JSON -> Code

采用 **Editor -> JSON -> Code** 架构：

```
┌─────────────────┐
│  Visual Editor  │  可视化编辑器
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   JSON Schema   │  中间数据模型
└────────┬────────┘
         │
         ├──────────────┐
         ▼              ▼
┌──────────────┐  ┌──────────────┐
│  Vue Code    │  │  Runtime     │
│  Generator   │  │  Renderer    │
└──────────────┘  └──────────────┘
```

**选择理由**：
1. **灵活性高**：JSON 作为中间层，可生成多种目标代码
2. **易于扩展**：新增组件只需定义 JSON Schema
3. **版本控制友好**：JSON 易于版本管理和协作
4. **支持导入导出**：方便页面模板分享和复用
5. **适合 jianghu-ui**：与现有数据驱动理念一致

### 2.2 核心模块划分

```
jianghu-ui-builder/
├── packages/
│   ├── core/                    # 核心引擎
│   │   ├── editor/              # 编辑器核心
│   │   ├── renderer/            # 渲染引擎
│   │   └── schema/              # Schema 定义
│   ├── editor-ui/               # 编辑器 UI
│   │   ├── canvas/              # 画布区域
│   │   ├── panels/              # 面板组件
│   │   └── toolbar/             # 工具栏
│   ├── components/              # 组件适配器
│   │   ├── jianghu-ui/          # jianghu-ui 组件适配
│   │   ├── vuetify/             # Vuetify 组件适配
│   │   └── registry.js          # 组件注册中心
│   └── plugins/                 # 插件系统
├── examples/                    # 示例项目
└── docs/                        # 文档
```

---

## 三、核心功能设计

### 3.1 组件 Schema 规范

每个组件需要定义 Schema 描述其在编辑器中的行为：

```javascript
export const JhTableSchema = {
  type: 'JhTable',
  name: '江湖表格',
  category: 'data-display',
  icon: 'mdi-table',
  
  defaultProps: {
    columns: [],
    data: [],
    headerTitle: '数据表格',
    showPagination: true
  },
  
  propSchema: {
    headerTitle: {
      type: 'string',
      label: '表格标题',
      control: 'input'
    },
    columns: {
      type: 'array',
      label: '列配置',
      control: 'column-editor'
    }
  },
  
  eventSchema: {
    'row-click': {
      label: '行点击',
      params: ['row', 'index']
    }
  },
  
  isContainer: false,
  canDrag: true,
  canResize: true
}
```

### 3.2 页面 JSON Schema

编辑器生成的页面结构：

```json
{
  "version": "1.0.0",
  "meta": {
    "title": "用户管理页面",
    "author": "admin"
  },
  "tree": {
    "id": "root",
    "type": "VContainer",
    "children": [
      {
        "id": "node-1",
        "type": "JhTable",
        "props": {
          "headerTitle": "用户列表",
          "columns": []
        },
        "events": {
          "row-click": "handleRowClick"
        }
      }
    ]
  },
  "scripts": {
    "data": {},
    "methods": {},
    "lifecycle": {}
  }
}
```

### 3.3 状态管理

使用 Pinia 管理编辑器状态：

```javascript
export const useEditorStore = defineStore('editor', {
  state: () => ({
    componentTree: null,
    selectedNodeId: null,
    history: {
      past: [],
      present: null,
      future: []
    },
    config: {
      device: 'desktop',
      zoom: 1
    }
  }),
  
  actions: {
    addComponent(parentId, type, props) {},
    removeComponent(nodeId) {},
    updateProps(nodeId, props) {},
    undo() {},
    redo() {},
    exportJSON() {},
    importJSON(json) {}
  }
})
```

---

## 四、用户界面设计

### 4.1 编辑器布局

```
┌────────────────────────────────────────────────────┐
│  Toolbar                                           │
├──────────┬────────────────────────┬────────────────┤
│ Component│      Canvas            │   Property     │
│  Panel   │                        │    Panel       │
│          │  [拖拽组件到这里]      │                │
├──────────┴────────────────────────┴────────────────┤
│  Layer Panel / Code Panel                         │
└────────────────────────────────────────────────────┘
```

### 4.2 主要面板功能

**组件面板 (Component Panel)**
- 分类展示 jianghu-ui 和 Vuetify 组件
- 搜索过滤功能
- 拖拽到画布

**画布 (Canvas)**
- 实时预览
- 拖拽放置组件
- 选中/悬停高亮
- 响应式预览（桌面/平板/手机）

**属性面板 (Property Panel)**
- 基础属性配置
- 样式配置
- 事件绑定
- 数据绑定

**图层面板 (Layer Panel)**
- 树形结构展示组件层级
- 拖拽调整顺序
- 显示/隐藏/锁定

**代码面板 (Code Panel)**
- 实时生成 Vue 代码
- 语法高亮
- 一键复制/下载

---

## 五、实现路线图

### Phase 1: 核心框架 (4-6周)
- [ ] 搭建项目结构
- [ ] 实现基础状态管理
- [ ] 实现拖拽系统
- [ ] 实现画布渲染
- [ ] 实现撤销/重做

### Phase 2: 组件适配 (4-6周)
- [ ] 定义组件 Schema 规范
- [ ] 适配 jianghu-ui 核心组件（10+）
- [ ] 适配 Vuetify 常用组件（20+）
- [ ] 实现组件注册机制

### Phase 3: 编辑器 UI (3-4周)
- [ ] 实现组件面板
- [ ] 实现属性配置面板
- [ ] 实现图层面板
- [ ] 实现工具栏

### Phase 4: 代码生成 (2-3周)
- [ ] 实现 Vue 代码生成器
- [ ] 实现 JSON 导入导出
- [ ] 实现代码预览和下载

### Phase 5: 高级功能 (4-6周)
- [ ] 实现数据绑定
- [ ] 实现事件系统
- [ ] 实现模板市场
- [ ] 实现插件系统

### Phase 6: 优化和文档 (2-3周)
- [ ] 性能优化
- [ ] 编写使用文档
- [ ] 编写组件适配指南
- [ ] 准备示例项目

**总计：19-28周**

---

## 六、技术选型

### 6.1 核心技术栈
- **Vue 2.6+**：与 jianghu-ui 保持一致
- **Vuetify 2**：UI 框架
- **Pinia**：状态管理
- **Vite**：构建工具
- **Monaco Editor**：代码编辑器

### 6.2 拖拽方案
- **HTML5 Drag & Drop API**：原生拖拽
- **Vue 自定义指令**：封装拖拽逻辑
- **@vueuse/core**：工具函数库

### 6.3 代码生成
- **@babel/parser**：解析 JavaScript
- **@babel/generator**：生成代码
- **prettier**：代码格式化

---

## 七、关键技术难点

### 7.1 组件嵌套和插槽处理
**问题**：如何正确处理组件的插槽和嵌套关系

**解决方案**：
- 在 Schema 中明确定义 `slotSchema`
- 使用虚拟节点表示插槽内容
- 代码生成时正确转换为 `<template #slot-name>`

### 7.2 响应式布局
**问题**：不同设备下的布局适配

**解决方案**：
- 使用 Vuetify 的响应式系统
- 支持为不同断点设置不同属性
- 提供响应式预览模式

### 7.3 数据绑定
**问题**：如何在可视化编辑器中配置数据绑定

**解决方案**：
- 提供数据源管理面板
- 支持表达式编辑器
- 实现双向绑定配置

### 7.4 性能优化
**问题**：大量组件时的性能问题

**解决方案**：
- 虚拟滚动
- 组件懒加载
- 使用 Web Worker 处理代码生成
- 节流和防抖

---

## 八、扩展性设计

### 8.1 插件系统

```javascript
// 插件 API
export const MyPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  
  install(builder) {
    // 注册自定义组件
    builder.registerComponent(MyComponent)
    
    // 添加工具栏按钮
    builder.toolbar.addButton({
      icon: 'mdi-star',
      tooltip: '我的功能',
      onClick: () => {}
    })
    
    // 监听事件
    builder.on('component:add', (component) => {})
    
    // 添加面板
    builder.panels.add({
      name: 'my-panel',
      component: MyPanel
    })
  }
}
```

### 8.2 自定义组件适配

```javascript
// 适配自定义组件
import MyCustomComponent from './MyCustomComponent.vue'

export const MyCustomAdapter = {
  component: MyCustomComponent,
  schema: {
    type: 'MyCustom',
    name: '自定义组件',
    category: 'custom',
    propSchema: {
      // 定义属性配置
    }
  }
}

// 注册
builder.registerComponent(MyCustomAdapter)
```

---

## 九、部署方案

### 9.1 独立应用
作为独立的 Web 应用部署，提供完整的编辑器功能。

### 9.2 嵌入式
作为 SDK 嵌入到现有系统中：

```javascript
import { JianghuBuilder } from 'jianghu-ui-builder'

const builder = new JianghuBuilder({
  container: '#builder',
  components: [...],
  onSave: (json) => {
    // 保存到服务器
  }
})
```

### 9.3 在线服务
提供在线编辑器服务，支持：
- 用户账号系统
- 项目管理
- 模板市场
- 协作编辑

---

## 十、总结

本方案提供了一个完整的可视化拖拽页面构建器设计，核心特点：

1. **架构清晰**：采用 Editor -> JSON -> Code 架构，易于扩展
2. **组件驱动**：基于 Schema 的组件系统，标准化组件适配
3. **功能完整**：涵盖拖拽、配置、预览、代码生成等核心功能
4. **扩展性强**：插件系统支持自定义扩展
5. **技术成熟**：基于成熟的开源方案和最佳实践

建议采用迭代开发方式，先实现核心功能，再逐步完善高级特性。
