# JianghuJS UI - AI 开发提示词

> **目标**: 为 AI 编程助手提供完整的 jianghu-ui 组件库上下文，实现快速、准确的页面开发

## 📁 文件说明

### 1. jianghu-ui-context.md
**核心上下文文件** - AI 必读

包含:
- 技术栈信息 (Vue 2.7 + Vuetify 2.x)
- 组件命名规范
- 组件分类速查
- 必须遵守的规则
- 常用字段类型
- 响应式布局
- 验证规则
- 常见错误避免

**适用场景**: 
- 开始新项目前阅读
- 不确定如何使用组件时查阅
- 遇到错误需要排查时参考

### 2. page-development-patterns.md
**页面开发模式** - 完整代码模板

包含:
- 标准 CRUD 页面（列表+新增+编辑+删除）
- 表单页面（复杂表单+字段联动+动态列表）
- 详情页面（描述列表+操作记录）
- 列表页面（JhList 组件）
- 仪表盘页面（统计卡片+图表）

**适用场景**:
- 需要快速搭建标准页面
- 学习完整的页面结构
- 参考最佳实践

### 3. quick-reference.md
**快速参考手册** - 代码片段速查

包含:
- JhTable 快速参考
- JhForm 快速参考
- JhDescriptions 快速参考
- JhLayout 快速参考
- 常用代码片段（弹窗、确认框、API 请求等）
- 常用图标

**适用场景**:
- 需要快速查找某个组件的用法
- 复制粘贴常用代码片段
- 查找常用图标名称

### 4. component-api-cheatsheet.md
**组件 API 速查表** - Props/Events/Slots 快速查询

包含:
- 所有核心组件的 Props 列表
- Events 事件列表
- Slots 插槽列表
- Methods 方法列表
- 常用组合模式

**适用场景**:
- 需要查看组件的完整 API
- 不确定某个 prop 的类型或默认值
- 查找可用的事件或插槽

## 🚀 使用方式

### 在 Cursor 中使用

#### 方式一: 自动加载（推荐）
Cursor 会自动读取 `.cursor` 目录下的文件作为上下文。

#### 方式二: 手动引用
在对话中使用 `@` 引用文件:
```
@jianghu-ui-context.md 如何创建一个用户管理页面？
@page-development-patterns.md 给我一个标准 CRUD 页面的代码
@quick-reference.md JhTable 如何实现服务端分页？
@component-api-cheatsheet.md JhForm 有哪些 props？
```

### 在其他 AI 工具中使用

#### GitHub Copilot
1. 打开对应的 `.md` 文件
2. 开始编写代码，Copilot 会根据上下文提供建议

#### Claude / ChatGPT
1. 复制对应文件的内容
2. 粘贴到对话中作为上下文
3. 提出你的需求

## 💡 最佳实践

### 开发新页面时

1. **先阅读上下文**
   ```
   @jianghu-ui-context.md 我要开发一个用户管理页面
   ```

2. **选择合适的模板**
   ```
   @page-development-patterns.md 给我标准 CRUD 页面的代码
   ```

3. **查询具体用法**
   ```
   @quick-reference.md JhTable 如何配置操作列？
   ```

4. **查看完整 API**
   ```
   @component-api-cheatsheet.md JhTable 的所有 props
   ```

### 遇到问题时

1. **检查规范**
   ```
   @jianghu-ui-context.md 为什么我的组件不工作？
   ```

2. **查看示例**
   ```
   @quick-reference.md 给我一个字段联动的例子
   ```

3. **确认 API**
   ```
   @component-api-cheatsheet.md JhForm 的 validate 方法怎么用？
   ```

## 📝 提示词示例

### 创建 CRUD 页面
```
@page-development-patterns.md 
创建一个商品管理页面，包含：
- 商品列表（名称、价格、库存、状态）
- 新增/编辑商品
- 删除商品
- 按名称和状态筛选
```

### 创建复杂表单
```
@page-development-patterns.md 
创建一个订单表单，包含：
- 客户信息（个人/企业切换）
- 订单明细（动态添加商品）
- 支付方式选择
- 备注信息
```

### 创建详情页面
```
@page-development-patterns.md 
创建一个用户详情页面，包含：
- 基本信息（可编辑）
- 账户信息
- 操作记录表格
```

### 查询具体用法
```
@quick-reference.md 
JhTable 如何实现：
1. 服务端分页
2. 批量删除
3. 自定义状态列显示
```

### 解决错误
```
@jianghu-ui-context.md 
我的表单验证不生效，帮我检查代码
```

## 🎯 开发流程建议

1. **明确需求** - 确定要开发的页面类型
2. **选择模板** - 从 `page-development-patterns.md` 选择合适的模板
3. **查阅 API** - 从 `component-api-cheatsheet.md` 查看组件 API
4. **参考示例** - 从 `quick-reference.md` 复制代码片段
5. **遵循规范** - 确保符合 `jianghu-ui-context.md` 中的规范
6. **测试验证** - 运行代码并验证功能

## ⚠️ 重要提醒

### 技术栈限制
- ✅ 使用 Vue 2.7 Options API
- ❌ 不要使用 Vue 3 Composition API
- ✅ 使用 Vuetify 2.x API
- ❌ 不要使用 Vuetify 3 API

### 必须遵守
- 所有组件必须包裹在 `<v-app>` 中
- 组件名以 `Jh` 开头
- 服务端分页使用 `request` 而非 `items`
- 字段联动使用函数而非布尔值

## 📚 更多资源

- **在线文档**: https://jianghujs.github.io/jianghu-ui/
- **组件 README**: `src/components/*/README.md`
- **Storybook 示例**: `src/components/*/*.stories.js`
- **项目根目录**: `.cursorrules` 文件

## 🤝 贡献

如果发现文档有误或需要补充，欢迎提交 PR 或 Issue。

---

**Happy Coding with JianghuJS UI! 🎉**
